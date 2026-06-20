import { Pokemon, PokemonData, resolvePokemon } from "@site/src/utils/pokemon";

export type PartialPokemonData = { name: string } & Partial<Omit<PokemonData, "name">>;

export type TeamEntry = string | { name: string; extra: true };

export function teamEntryName(entry: TeamEntry): string {
  return typeof entry === "string" ? entry : entry.name;
}

export function isExtraEntry(entry: TeamEntry): boolean {
  return typeof entry !== "string";
}

export interface BoxData {
  pokemon: Pokemon[];
  team?: TeamEntry[];
  renames?: Record<string, string>;
  removed?: string[];
}

export interface PartialBoxData {
  pokemon?: PartialPokemonData[];
  cap?: { level: number; exclude?: string[] };
  renames?: Record<string, string>;
  removed?: string[];
}

export interface Box {
  base: BoxData;
  updates?: PartialBoxData[];
}

export function findPokemon(boxData: BoxData, name: string): Pokemon | undefined {
  return boxData.pokemon.find((p) => resolvePokemon(p).name === name);
}

export function getCanon(boxData: BoxData | null): (name: string) => string {
  const renames = boxData?.renames ?? {};
  const canon = (name: string, visited = new Set<string>()): string => {
    if (!renames[name] || visited.has(name)) return name;
    visited.add(name);
    return canon(renames[name], visited);
  };
  return (name: string) => canon(name);
}

function applyStep(working: BoxData, step: PartialBoxData): BoxData {
  let pokemon = [...working.pokemon];
  const renames = { ...(working.renames ?? {}) };
  const removed = [...(working.removed ?? [])];

  if (step.removed?.length) {
    const removalOrder = new Map(step.removed.map((name, i) => [name, removed.length + i]));
    removed.push(...step.removed);
    pokemon = pokemon.map((p) => {
      const order = removalOrder.get(resolvePokemon(p).name);
      return order !== undefined ? { ...p, update: { ...p.update, removeOrder: order } } : p;
    });
  }

  if (step.renames) {
    pokemon = pokemon.map((p) => {
      const currentName = resolvePokemon(p).name;
      const newName = step.renames![currentName];
      return newName ? { ...p, update: { ...p.update, name: newName } } : p;
    });
    for (const [old, newName] of Object.entries(step.renames)) {
      if (renames[newName] === old) {
        delete renames[newName];
      }
      renames[old] = newName;
    }
  }

  if (step.pokemon?.length) {
    const nameIndex = new Map(pokemon.map((p, i) => [resolvePokemon(p).name, i]));
    const result = [...pokemon];
    for (const { name, ...partial } of step.pokemon) {
      const idx = nameIndex.get(name);
      if (idx !== undefined) {
        const existing = result[idx];
        result[idx] = { ...existing, update: { ...existing.update, ...partial } };
      } else {
        result.push({ base: { name, ...partial } as PokemonData });
      }
    }
    pokemon = result;
  }

  if (step.cap) {
    const excludeSet = new Set([...(step.cap.exclude ?? []), ...removed]);
    pokemon = pokemon.map((p) => {
      const current = resolvePokemon(p);
      return !excludeSet.has(current.name) && current.level !== step.cap!.level
        ? { ...p, update: { ...p.update, level: step.cap!.level } }
        : p;
    });
  }

  return {
    ...working,
    pokemon,
    renames: Object.keys(renames).length ? renames : undefined,
    removed: removed.length ? removed : undefined,
  };
}

export function resolveBox(box: Box): BoxData {
  return (box.updates ?? []).reduce(applyStep, box.base);
}

export function getBox({
  box,
  remove = [],
  add = [],
  cap,
  update = [],
  team,
}: {
  box?: Box;
  remove?: string[];
  add?: PokemonData[];
  cap?: number | { level: number; exclude?: string[] };
  update?: Record<string, Partial<PokemonData>> | Record<string, Partial<PokemonData>>[];
  team?: TeamEntry[];
}): Box {
  const updateSteps = Array.isArray(update) ? update : [update];
  const rawResolved: BoxData = box ? resolveBox(box) : { pokemon: [] };
  const resolvedBase: BoxData = {
    ...rawResolved,
    pokemon: rawResolved.pokemon.map((p) => ({ base: resolvePokemon(p) })),
  };
  const steps: PartialBoxData[] = [];

  {
    const step: PartialBoxData = {};

    if (remove.length) {
      const valid = remove.filter((name) => {
        if (!resolvedBase.pokemon.some((p) => resolvePokemon(p).name === name)) {
          console.error(`getBox: "${name}" not found — skipping remove.`);
          return false;
        }
        return true;
      });
      if (valid.length) step.removed = valid;
    }

    if (add.length) {
      const entries: PartialPokemonData[] = [];
      let size = resolvedBase.pokemon.length;
      for (const data of add) {
        if (resolvedBase.pokemon.some((p) => resolvePokemon(p).name === data.name)) {
          console.error(`getBox: "${data.name}" already exists — skipping add.`);
          continue;
        }
        entries.push({ ...data, addOrder: size++ });
      }
      if (entries.length) step.pokemon = entries;
    }

    if (cap !== undefined) {
      const level = typeof cap === "number" ? cap : cap.level;
      const exclude = typeof cap === "number" ? undefined : cap.exclude;
      step.cap = exclude ? { level, exclude } : { level };
    }

    if (Object.keys(step).length) steps.push(step);
  }

  let working = steps.length ? applyStep(resolvedBase, steps[0]) : resolvedBase;
  for (const u of updateSteps) {
    if (!Object.keys(u).length) continue;
    const stepRenames: Record<string, string> = {};
    const stepPokemon: PartialPokemonData[] = [];

    for (const [key, partial] of Object.entries(u) as [string, PartialPokemonData][]) {
      if (!working.pokemon.some((p) => resolvePokemon(p).name === key)) {
        console.error(`getBox: "${key}" not found — skipping update.`);
        continue;
      }
      const { name: newName, ...rest } = partial;
      if (newName && newName !== key) {
        stepRenames[key] = newName;
        stepPokemon.push({ name: newName, ...rest } as PartialPokemonData);
      } else {
        stepPokemon.push({ name: key, ...rest } as PartialPokemonData);
      }
    }

    const step: PartialBoxData = {};
    if (Object.keys(stepRenames).length) step.renames = stepRenames;
    if (stepPokemon.length) step.pokemon = stepPokemon;
    if (Object.keys(step).length) {
      steps.push(step);
      working = applyStep(working, step);
    }
  }

  return {
    base: {
      ...resolvedBase,
      team: team ?? resolvedBase.team,
    },
    updates: steps.length ? steps : undefined,
  };
}
