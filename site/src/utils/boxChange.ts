import { Box, BoxData, findPokemon, resolveBox } from "@site/src/utils/box";
import { Pokemon, PokemonData, Stats, resolvePokemon } from "@site/src/utils/pokemon";

export function getLevelCap(
  box: Box
): { level: number; excluded: Array<{ name: string; level: string | number }> } | null {
  const step = box.updates?.find((s) => s.cap);
  if (!step?.cap) return null;

  const excluded = (step.cap.exclude ?? [])
    .map((name) => findPokemon(box.base, name))
    .filter((p): p is Pokemon => p !== undefined)
    .map((p) => {
      const data = resolvePokemon(p);
      return { name: data.name, level: data.level };
    });

  return { level: step.cap.level, excluded };
}

export function getRemovals(box: Box): string[] {
  return box.updates?.flatMap((s) => s.removed ?? []) ?? [];
}

const RENDERED_FIELDS = new Set<keyof PokemonData>(["name", "level", "moves"]);

function hasRenderedField(partial: Omit<PokemonData, "name">): boolean {
  return (Object.keys(partial) as (keyof PokemonData)[]).some((k) => RENDERED_FIELDS.has(k));
}

function flattenWorking(working: BoxData): BoxData {
  return { ...working, pokemon: working.pokemon.map((p) => ({ base: resolvePokemon(p) })) };
}

// Builds Pokemon {base, update} objects for each update step, using the pre-step
// base state so highlights show what changed relative to before that step.
export function getChanges(box: Box): Pokemon[] {
  const result: Pokemon[] = [];
  let working = box.base;

  for (const step of box.updates ?? []) {
    const invertedRenames: Record<string, string> = {};
    for (const [old, newName] of Object.entries(step.renames ?? {}) as [string, string][]) {
      invertedRenames[newName] = old;
    }

    for (const partial of step.pokemon ?? []) {
      const { name, ...rest } = partial;
      const preName = invertedRenames[name] ?? name;
      const isRenamed = preName !== name;
      // Include name in update when renamed so expandPokemon can display it
      const update = isRenamed ? { ...rest, name } : rest;
      if (!isRenamed && !hasRenderedField(rest as Omit<PokemonData, "name">)) continue;
      const basePokemon = findPokemon(working, preName);
      if (!basePokemon) continue;
      result.push({ base: resolvePokemon(basePokemon), update });
    }

    working = flattenWorking(resolveBox({ base: working, updates: [step] }));
  }

  return result;
}

export function getAbilityChanges(box: Box): { name: string; ability: string }[] {
  const result: { name: string; ability: string }[] = [];
  for (const step of box.updates ?? []) {
    const renamedTo = new Set(Object.values(step.renames ?? {}));
    for (const partial of step.pokemon ?? []) {
      if (!partial.ability) continue;
      if (renamedTo.has(partial.name)) continue;
      if (!findPokemon(box.base, partial.name)) continue;
      result.push({ name: partial.name, ability: partial.ability });
    }
  }
  return result;
}

export function getIVChanges(box: Box): { name: string; ivs?: Partial<Stats> }[] {
  const result: { name: string; ivs?: Partial<Stats> }[] = [];
  for (const step of box.updates ?? []) {
    for (const partial of step.pokemon ?? []) {
      if (partial.ivs) {
        result.push({ name: partial.name, ivs: partial.ivs });
      }
    }
  }
  return result;
}

export function getRemoveItemsChanges(box: Box): boolean {
  return box.updates?.some(step => step.removeItems);
}
