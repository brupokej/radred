import {
  changePokemon,
  Pokemon,
  PokemonData,
  PokemonOverrides,
  resolve,
} from "@site/src/utils/pokemon";

type BoxOp =
  | { type: "add"; pokemon: Record<string, Pokemon> }
  | { type: "update"; changes: Record<string, PokemonOverrides> }
  | { type: "remove"; names: string[] }
  | { type: "levelcap"; level: number; exclude?: string[] };

export interface Box {
  ops: BoxOp[];
}

// Replays all ops up to (but not including) `version`, returning the live state as a Map.
// Handles renames naturally: state.delete(oldName), state.set(newName, updated).
// Clears `update` for pokemon that were not touched in an update op, so that stale
// warning highlights don't carry forward into subsequent versions.
function replayBox(box: Box, version: number): Map<string, Pokemon> {
  const state = new Map<string, Pokemon>();

  for (let i = 0; i < version; i++) {
    const op = box.ops[i];
    if (op.type === "add") {
      for (const [name, pokemon] of Object.entries(op.pokemon)) {
        state.set(name, pokemon);
      }
    } else if (op.type === "update") {
      const touched = new Set<string>();
      for (const [name, changes] of Object.entries(op.changes)) {
        const current = state.get(name);
        if (current) {
          const updated = changePokemon(current, changes);
          const updatedName = resolve(updated).name;
          state.delete(name);
          state.set(updatedName, updated);
          touched.add(updatedName);
        }
      }
      // Clear stale update for pokemon not touched in this op
      for (const [name, current] of state) {
        if (!touched.has(name) && current.update !== undefined) {
          state.set(name, {
            base: { ...current.base, ...current.update },
            update: undefined,
            index: current.index,
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
        if (!excludeSet.has(name) && resolve(current).level !== op.level) {
          state.set(name, changePokemon(current, { level: op.level }));
          touched.add(name);
        }
      }
      for (const [name, current] of state) {
        if (!touched.has(name) && current.update !== undefined) {
          state.set(name, {
            base: { ...current.base, ...current.update },
            update: undefined,
            index: current.index,
          });
        }
      }
    }
  }

  return state;
}

export function createBox(): Box {
  return { ops: [] };
}

// Adds new pokemon to the box.
// Returns the new op count (1-based version number of the snapshot just created).
export function addToBox(box: Box, initial: Record<string, PokemonData>): number {
  const currentState = replayBox(box, box.ops.length);

  const toAdd = Object.fromEntries(
    Object.entries(initial)
      .filter(([name]) => {
        if (currentState.has(name)) {
          console.error(`addToBox: "${name}" already exists — skipping.`);
          return false;
        }
        return true;
      })
      .map(([name, data], i) => [name, { base: data, index: currentState.size + i }])
  );

  box.ops.push({ type: "add", pokemon: toAdd });
  return box.ops.length;
}

// Updates existing pokemon in the box. Only the changed fields need to be specified.
// Returns the new op count (1-based version number of the snapshot just created).
export function updateBox(box: Box, changes: Record<string, PokemonOverrides> = {}): number {
  const currentState = replayBox(box, box.ops.length);

  const validChanges = Object.fromEntries(
    Object.entries(changes).filter(([name]) => {
      if (!currentState.has(name)) {
        console.error(`updateBox: "${name}" not found — skipping.`);
        return false;
      }
      return true;
    })
  );

  box.ops.push({ type: "update", changes: validChanges });
  return box.ops.length;
}

// Removes pokemon from the box.
// Returns the new op count (1-based version number of the snapshot just created).
export function removeFromBox(box: Box, names: string[]): number {
  const currentState = replayBox(box, box.ops.length);

  const validNames = names.filter((name) => {
    if (!currentState.has(name)) {
      console.error(`removeFromBox: "${name}" not found — skipping.`);
      return false;
    }
    return true;
  });

  box.ops.push({ type: "remove", names: validNames });
  return box.ops.length;
}

// Creates a new Box containing only the resolved final state, with `update` cleared.
// Pokemon that were removed are omitted.
// Intended for use at the end of a file to pass a clean starting state to the next file.
export function exportBox(box: Box): Box {
  const state = replayBox(box, box.ops.length);
  const pokemon: Record<string, Pokemon> = {};
  for (const [name, p] of state) {
    pokemon[name] = { base: resolve(p), index: p.index };
  }
  return { ops: Object.keys(pokemon).length > 0 ? [{ type: "add", pokemon }] : [] };
}

// Retrieves the pokemon at a given version by replaying the op log.
// Version is 1-based (matching the return value of addToBox/updateBox).
// Returns null if the pokemon did not exist at that version.
export function getFromBox(box: Box, version: number, name: string): Pokemon | null {
  return replayBox(box, version).get(name) ?? null;
}

// Sets all active pokemon to the given level, optionally excluding some by name.
// Returns the new op count (1-based version number of the snapshot just created).
export function setLevelCap(box: Box, level: number, exclude?: string[]): number {
  const currentState = replayBox(box, box.ops.length);

  const validExclude = (exclude ?? []).filter((name) => {
    if (!currentState.has(name)) {
      console.error(`setLevelCap: "${name}" not found — skipping exclusion.`);
      return false;
    }
    return true;
  });

  box.ops.push({
    type: "levelcap",
    level,
    ...(validExclude.length > 0 ? { exclude: validExclude } : {}),
  });
  return box.ops.length;
}

// Returns rendering info for a levelcap op at the given version, or null if the op is not a
// levelcap. Provides the cap level and the pre-cap name/level of any excluded pokemon.
// Used by BoxChange to render the summary rows.
export function getLevelCapAtVersion(
  box: Box,
  version: number
): { level: number; excluded: Array<{ name: string; level: number }> } | null {
  const op = box.ops[version - 1];
  if (!op || op.type !== "levelcap") return null;

  const stateBefore = replayBox(box, version - 1);
  const excluded = (op.exclude ?? [])
    .map((name) => stateBefore.get(name))
    .filter((p): p is Pokemon => p !== undefined)
    .map((p) => {
      const r = resolve(p);
      return { name: r.name, level: r.level };
    });

  return { level: op.level, excluded };
}

// Returns the display names of pokemon removed at the given version.
// Only meaningful for versions created by removeFromBox. Used by BoxChange.
export function getRemovalsAtVersion(box: Box, version: number): string[] {
  const op = box.ops[version - 1];
  if (!op || op.type !== "remove") return [];

  const stateBefore = replayBox(box, version - 1);
  return op.names
    .map((name) => stateBefore.get(name))
    .filter((p): p is Pokemon => p !== undefined)
    .map((p) => resolve(p).name);
}

// Returns the pokemon that visibly changed (with `update` populated) at the given version.
// Only meaningful for versions created by updateBox. Used by BoxChange.
export function getChangesAtVersion(box: Box, version: number): Pokemon[] {
  const op = box.ops[version - 1];
  if (!op || op.type !== "update") return [];

  const state = replayBox(box, version);
  return [...state.values()].filter((p) => p.update !== undefined);
}
