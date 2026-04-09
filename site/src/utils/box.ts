import { Pokemon, PokemonData, resolvePokemon } from "@site/src/utils/pokemon";

type BoxChange =
  | { type: "remove"; names: string[] }
  | { type: "add"; pokemon: Record<string, Pokemon> }
  | { type: "cap"; level: number; exclude?: string[] }
  | { type: "update"; changes: Record<string, Partial<PokemonData>> };

export interface Box {
  base: PokemonData[];
  changes: BoxChange[];
  team: string[];
}

// Replays changes on top of base, returning the live state as a Map.
// Handles renames: delete old name, set new name.
// Clears `update` for pokemon not touched in a change, so stale highlights don't carry forward.
function replayBox(box: Box, version: number): Map<string, Pokemon> {
  const state = new Map<string, Pokemon>();

  for (const data of box.base) {
    state.set(data.name, { base: data });
  }

  for (let i = 0; i < version; i++) {
    const change = box.changes[i];
    if (change.type === "remove") {
      for (const name of change.names) {
        state.delete(name);
      }
    } else if (change.type === "add") {
      for (const [name, pokemon] of Object.entries(change.pokemon)) {
        state.set(name, pokemon);
      }
    } else if (change.type === "cap") {
      const excludeSet = new Set(change.exclude ?? []);
      const touched = new Set<string>();
      for (const [name, current] of state) {
        if (!excludeSet.has(name) && resolvePokemon(current).level !== change.level) {
          state.set(name, {
            base: resolvePokemon(current),
            update: { level: change.level },
          });
          touched.add(name);
        }
      }
      for (const [name, current] of state) {
        if (!touched.has(name) && current.update !== undefined) {
          state.set(name, {
            base: { ...current.base, ...current.update },
            update: undefined,
          });
        }
      }
    } else if (change.type === "update") {
      const touched = new Set<string>();
      for (const [name, changes] of Object.entries(change.changes)) {
        const current = state.get(name);
        if (current) {
          const updated: Pokemon = {
            base: resolvePokemon(current),
            update: changes,
          };
          const updatedName = resolvePokemon(updated).name;
          state.delete(name);
          state.set(updatedName, updated);
          touched.add(updatedName);
        }
      }
      for (const [name, current] of state) {
        if (!touched.has(name) && current.update !== undefined) {
          state.set(name, {
            base: { ...current.base, ...current.update },
            update: undefined,
          });
        }
      }
    }
  }

  return state;
}

function stateToBase(state: Map<string, Pokemon>): PokemonData[] {
  return [...state.values()].map(resolvePokemon);
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
  cap?: number;
  update?: Record<string, Partial<PokemonData>> | Record<string, Partial<PokemonData>>[];
  team?: string[];
}): Box {
  const updates = Array.isArray(update) ? update : [update];

  // Resolve the full current state from the input box without mutating it.
  const inputResolved = box ?? { base: [], changes: [], team: [] };
  const inputBase = stateToBase(replayBox(inputResolved, inputResolved.changes.length));

  // Build changes on a local working state — never touches the input box.
  const newChanges: BoxChange[] = [];
  const working: Box = { base: inputBase, changes: newChanges };

  if (remove.length > 0) {
    const state = replayBox(working, working.changes.length);
    const validNames = remove.filter((name) => {
      if (!state.has(name)) {
        console.error(`getBox: "${name}" not found — skipping remove.`);
        return false;
      }
      return true;
    });
    if (validNames.length > 0) {
      newChanges.push({ type: "remove", names: validNames });
    }
  }

  for (const data of add) {
    const { name } = data;
    if (replayBox(working, working.changes.length).has(name)) {
      console.error(`getBox: "${name}" already exists — skipping add.`);
      continue;
    }
    newChanges.push({ type: "add", pokemon: { [name]: { base: data } } });
  }

  if (cap !== undefined) {
    newChanges.push({ type: "cap", level: cap });
  }

  for (const u of updates) {
    const state = replayBox(working, working.changes.length);
    const validChanges = Object.fromEntries(
      Object.entries(u).filter(([name]) => {
        if (!state.has(name)) {
          console.error(`getBox: "${name}" not found — skipping.`);
          return false;
        }
        return true;
      })
    );
    newChanges.push({ type: "update", changes: validChanges });
  }

  const inferredTeam = [...replayBox(working, working.changes.length).keys()];
  return { base: inputBase, changes: newChanges, team: team ?? box?.team ?? inferredTeam };
}

// Returns the fully resolved state of the box including all changes applied.
// Used by components to resolve team names to Pokemon objects.
export function resolveBox(box: Box): Map<string, Pokemon> {
  return replayBox(box, box.changes.length);
}

// Returns rendering info for a cap change in a box, or null if not a cap.
// `box.base` is the state before the cap, so pre-cap levels are read directly from it.
// Used by BoxChange to render the summary rows.
export function getLevelCap(
  box: Box
): { level: number; excluded: Array<{ name: string; level: number }> } | null {
  const change = box.changes[0];
  if (!change || change.type !== "cap") return null;

  const excluded = (change.exclude ?? [])
    .map((name) => box.base.find((p) => p.name === name))
    .filter((p): p is PokemonData => p !== undefined)
    .map((p) => ({ name: p.name, level: p.level ?? 0 }));

  return { level: change.level, excluded };
}

// Returns the display names of pokemon removed in a box.
// Used by BoxChange.
export function getRemovals(box: Box): string[] {
  const change = box.changes[0];
  if (!change || change.type !== "remove") return [];
  return change.names;
}

// Returns the pokemon that visibly changed (with `update` populated) in a box.
// Used by BoxChange.
export function getChanges(box: Box): Pokemon[] {
  const change = box.changes[0];
  if (!change || change.type !== "update") return [];

  const state = replayBox(box, box.changes.length);
  return [...state.values()].filter((p) => p.update !== undefined);
}

// Splits a multi-change box into multiple single-change boxes for the display helpers.
// Used by BoxChange to iterate changes when update was passed as an array.
export function splitChanges(box: Box): Box[] {
  const result: Box[] = [];
  for (let i = 0; i < box.changes.length; i++) {
    const base = i === 0 ? box.base : stateToBase(replayBox(box, i));
    result.push({ base, changes: [box.changes[i]], team: [] });
  }
  return result;
}
