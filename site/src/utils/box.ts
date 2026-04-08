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

// Adds a new pokemon to the box.
// Returns a snapshot Box: prior state as base, the add op as the single change.
export function addToBox(box: Box, data: PokemonData): Box {
  const { name } = data;
  const currentState = replayBox(box, box.changes.length);

  if (currentState.has(name)) {
    console.error(`addToBox: "${name}" already exists — skipping.`);
    return { base: stateToBase(currentState), changes: [], team: [] };
  }

  const priorBase = stateToBase(currentState);
  const newOp: BoxOp = { type: "add", pokemon: { [name]: { base: data } } };
  box.changes.push(newOp);
  return { base: priorBase, changes: [newOp], team: [] };
}

// Updates existing pokemon in the box. Only the changed fields need to be specified.
// Returns a snapshot Box: prior state as base, the update op as the single change.
// Pass `team` to embed the active team in the snapshot for use with Battle/Encounter.
export function changeBox({
  box,
  update = {},
  team,
}: {
  box: Box;
  update?: Record<string, Partial<PokemonData>>;
  team?: string[];
}): Box {
  const currentState = replayBox(box, box.changes.length);

  const validChanges = Object.fromEntries(
    Object.entries(update).filter(([name]) => {
      if (!currentState.has(name)) {
        console.error(`changeBox: "${name}" not found — skipping.`);
        return false;
      }
      return true;
    })
  );

  const priorBase = stateToBase(currentState);
  const newOp: BoxOp = { type: "update", changes: validChanges };
  box.changes.push(newOp);
  return { base: priorBase, changes: [newOp], team: team ?? [] };
}

// Removes pokemon from the box.
// Returns a snapshot Box: prior state as base, the remove op as the single change.
export function removeFromBox(box: Box, names: string[]): Box {
  const currentState = replayBox(box, box.changes.length);

  const validNames = names.filter((name) => {
    if (!currentState.has(name)) {
      console.error(`removeFromBox: "${name}" not found — skipping.`);
      return false;
    }
    return true;
  });

  const priorBase = stateToBase(currentState);
  const newOp: BoxOp = { type: "remove", names: validNames };
  box.changes.push(newOp);
  return { base: priorBase, changes: [newOp], team: [] };
}

// Sets all active pokemon to the given level, optionally excluding some by name.
// Returns a snapshot Box: prior state as base, the levelcap op as the single change.
// Pass `team` to embed the active team in the snapshot for use with Battle/Encounter.
export function setLevelCap(
  box: Box,
  level: number,
  options?: { exclude?: string[]; team?: string[] }
): Box {
  const currentState = replayBox(box, box.changes.length);

  const validExclude = (options?.exclude ?? []).filter((name) => {
    if (!currentState.has(name)) {
      console.error(`setLevelCap: "${name}" not found — skipping exclusion.`);
      return false;
    }
    return true;
  });

  const priorBase = stateToBase(currentState);
  const newOp: BoxOp = {
    type: "levelcap",
    level,
    ...(validExclude.length > 0 ? { exclude: validExclude } : {}),
  };
  box.changes.push(newOp);
  return { base: priorBase, changes: [newOp], team: options?.team ?? [] };
}

// Creates a clean Box from the fully resolved current state (for cross-file transitions).
export function exportBox(box: Box): Box {
  return createBox(stateToBase(replayBox(box, box.changes.length)));
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
