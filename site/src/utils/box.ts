import { Pokemon, PokemonData, resolvePokemon } from "@site/src/utils/pokemon";

type BoxOp =
  | { type: "add"; pokemon: Record<string, Pokemon> }
  | { type: "update"; changes: Record<string, Partial<PokemonData>> }
  | { type: "remove"; names: string[] }
  | { type: "levelcap"; level: number; exclude?: string[] };

export interface Box {
  base: PokemonData[];
  changes: BoxOp[];
  team?: string[];
}

// Replays changes on top of base, returning the live state as a Map.
// Handles renames: delete old name, set new name.
// Clears `update` for pokemon not touched in an op, so stale highlights don't carry forward.
function replayBox(box: Box, version: number): Map<string, Pokemon> {
  const state = new Map<string, Pokemon>();

  for (const data of box.base) {
    state.set(data.name, { base: data });
  }

  for (let i = 0; i < version; i++) {
    const op = box.changes[i];
    if (op.type === "add") {
      for (const [name, pokemon] of Object.entries(op.pokemon)) {
        state.set(name, pokemon);
      }
    } else if (op.type === "update") {
      const touched = new Set<string>();
      for (const [name, changes] of Object.entries(op.changes)) {
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
    } else if (op.type === "remove") {
      for (const name of op.names) {
        state.delete(name);
      }
    } else if (op.type === "levelcap") {
      const excludeSet = new Set(op.exclude ?? []);
      const touched = new Set<string>();
      for (const [name, current] of state) {
        if (!excludeSet.has(name) && resolvePokemon(current).level !== op.level) {
          state.set(name, {
            base: resolvePokemon(current),
            update: { level: op.level },
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
    }
  }

  return state;
}

function stateToBase(state: Map<string, Pokemon>): PokemonData[] {
  return [...state.values()].map(resolvePokemon);
}

// Creates a Box from a base list of PokemonData.
// For the MDX accumulator, pass []. For opponent teams, pass the full team.
export function createBox(base: PokemonData[]): Box {
  return { base, changes: [], team: base.map((p) => p.name) };
}

// Adds, levels, and/or updates pokemon in the box.
// Operations are applied in order: `remove` first, then `add`, then `cap`, then `update`(s).
// Returns a snapshot Box: prior state as base, all ops as changes.
// Pass `team` to embed the active team in the snapshot for use with Battle/Encounter.
export function changeBox({
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

  // Build ops on a local working state — never touches the input box.
  const newOps: BoxOp[] = [];
  const working: Box = { base: inputBase, changes: newOps };

  if (remove.length > 0) {
    const state = replayBox(working, working.changes.length);
    const validNames = remove.filter((name) => {
      if (!state.has(name)) {
        console.error(`changeBox: "${name}" not found — skipping remove.`);
        return false;
      }
      return true;
    });
    if (validNames.length > 0) {
      newOps.push({ type: "remove", names: validNames });
    }
  }

  for (const data of add) {
    const { name } = data;
    if (replayBox(working, working.changes.length).has(name)) {
      console.error(`changeBox: "${name}" already exists — skipping add.`);
      continue;
    }
    newOps.push({ type: "add", pokemon: { [name]: { base: data } } });
  }

  if (cap !== undefined) {
    newOps.push({ type: "levelcap", level: cap });
  }

  for (const u of updates) {
    const state = replayBox(working, working.changes.length);
    const validChanges = Object.fromEntries(
      Object.entries(u).filter(([name]) => {
        if (!state.has(name)) {
          console.error(`changeBox: "${name}" not found — skipping.`);
          return false;
        }
        return true;
      })
    );
    newOps.push({ type: "update", changes: validChanges });
  }

  return { base: inputBase, changes: newOps, team: team ?? box?.team ?? [] };
}

// Returns the fully resolved state of the box including all changes applied.
// Used by components to resolve team names to Pokemon objects.
export function resolveBox(box: Box): Map<string, Pokemon> {
  return replayBox(box, box.changes.length);
}

// Returns rendering info for a levelcap op in a snapshot, or null if not a levelcap.
// `snapshot.base` is the state before the cap, so pre-cap levels are read directly from it.
// Used by BoxChange to render the summary rows.
export function getLevelCap(
  snapshot: Box
): { level: number; excluded: Array<{ name: string; level: number }> } | null {
  const op = snapshot.changes[0];
  if (!op || op.type !== "levelcap") return null;

  const excluded = (op.exclude ?? [])
    .map((name) => snapshot.base.find((p) => p.name === name))
    .filter((p): p is PokemonData => p !== undefined)
    .map((p) => ({ name: p.name, level: p.level ?? 0 }));

  return { level: op.level, excluded };
}

// Returns the display names of pokemon removed in a snapshot.
// Used by BoxChange.
export function getRemovals(snapshot: Box): string[] {
  const op = snapshot.changes[0];
  if (!op || op.type !== "remove") return [];
  return op.names;
}

// Returns the pokemon that visibly changed (with `update` populated) in a snapshot.
// Used by BoxChange.
export function getChanges(snapshot: Box): Pokemon[] {
  const op = snapshot.changes[0];
  if (!op || op.type !== "update") return [];

  const state = replayBox(snapshot, snapshot.changes.length);
  return [...state.values()].filter((p) => p.update !== undefined);
}

// Splits a multi-op snapshot into single-op sub-snapshots for the display helpers.
// Used by BoxChange to iterate changes when update was passed as an array.
export function splitSnapshot(snapshot: Box): Box[] {
  const result: Box[] = [];
  for (let i = 0; i < snapshot.changes.length; i++) {
    const base = i === 0 ? snapshot.base : stateToBase(replayBox(snapshot, i));
    result.push({ base, changes: [snapshot.changes[i]], team: [] });
  }
  return result;
}
