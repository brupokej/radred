import { Pokemon } from "@site/src/components/Team";
import { changePokemon, PokemonOverrides } from "@site/src/utils/pokemon";

export interface Box {
  slots: Record<string, (Pokemon | null)[]>;
}

function slotLength(box: Box): number {
  return Object.values(box.slots)[0]?.length ?? 0;
}

export function createBox(): Box {
  return { slots: {} };
}

// Adds new pokemon to the box. Existing slots are extended with a copy of their latest entry.
// New slots are padded with nulls to match the current version length.
// Returns the new slot length (1-based version number of the snapshot just created).
export function addToBox(box: Box, initial: Record<string, Pokemon>): number {
  const len = slotLength(box);

  for (const name of Object.keys(initial)) {
    if (box.slots[name] !== undefined) {
      throw new Error(
        `addToBox: "${name}" already exists. Use updateBox to modify existing pokemon.`
      );
    }
  }

  for (const history of Object.values(box.slots)) {
    const latest = history[history.length - 1];
    history.push(latest === null ? null : { ...latest, previous: undefined });
  }

  const baseIndex = Object.keys(box.slots).length;
  let i = 0;
  for (const [name, pokemon] of Object.entries(initial)) {
    box.slots[name] = [
      ...new Array<Pokemon | null>(len).fill(null),
      { ...pokemon, index: baseIndex + i },
    ];
    i++;
  }

  return len + 1;
}

// Updates existing pokemon in the box. All slots are extended: changed ones get new versions,
// unchanged ones get copies of their latest entry. If a pokemon's name changes, the old slot
// key gets its new entry replaced with null (treated as removed), and a new slot key is created
// padded with nulls up to the rename point — keeping all slots the same length.
// Returns the new slot length (1-based version number of the snapshot just created).
export function updateBox(box: Box, changes: Record<string, PokemonOverrides> = {}): number {
  const len = slotLength(box);

  for (const name of Object.keys(changes)) {
    const history = box.slots[name];
    if (!history) {
      throw new Error(`updateBox: "${name}" not found. Use addToBox to add new pokemon.`);
    }
    if (history[history.length - 1] === null) {
      throw new Error(`updateBox: "${name}" has been removed from the box.`);
    }
  }

  const renames: [string, string, Pokemon][] = [];

  for (const [slotKey, history] of Object.entries(box.slots)) {
    const latest = history[history.length - 1];
    const overrides = changes[slotKey];

    if (latest === null || !overrides) {
      history.push(latest === null ? null : { ...latest, previous: undefined });
    } else {
      const updated = changePokemon(latest, overrides);
      history.push(updated);
      if (updated.name !== latest.name) {
        renames.push([slotKey, updated.name, updated]);
      }
    }
  }

  for (const [oldKey, newKey, renamedEntry] of renames) {
    if (box.slots[newKey]) {
      throw new Error(`updateBox: cannot rename "${oldKey}" to "${newKey}" — key already exists.`);
    }
    // Null out the renamed entry on the old key (it no longer exists under this name)
    const oldHistory = box.slots[oldKey];
    oldHistory[oldHistory.length - 1] = null;
    // Create the new key padded with nulls for all versions before the rename
    box.slots[newKey] = [...new Array<Pokemon | null>(len).fill(null), renamedEntry];
  }

  return len + 1;
}

// Removes pokemon from the box. Removed slots get null appended; all others are extended
// with copies of their latest entry.
// Returns the new slot length (1-based version number of the snapshot just created).
export function removeFromBox(box: Box, names: string[]): number {
  const len = slotLength(box);
  const keysToRemove = new Set(names);

  for (const key of keysToRemove) {
    if (!box.slots[key]) {
      throw new Error(`removeFromBox: "${key}" not found.`);
    }
  }

  for (const [key, history] of Object.entries(box.slots)) {
    if (keysToRemove.has(key)) {
      history.push(null);
    } else {
      const latest = history[history.length - 1];
      history.push(latest === null ? null : { ...latest, previous: undefined });
    }
  }

  return len + 1;
}

// Creates a new Box containing only the final non-null version of each slot, with
// the `previous` field cleared. Pokemon that ended as null (removed) are omitted.
// Intended for use at the end of a file to pass a clean starting state to the next file.
export function exportBox(box: Box): Box {
  const slots: Record<string, (Pokemon | null)[]> = {};

  for (const [key, history] of Object.entries(box.slots)) {
    let latest: Pokemon | null = null;
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i] !== null) {
        latest = history[i];
        break;
      }
    }
    if (latest !== null) {
      const { previous: _prev, ...pokemon } = latest;
      slots[key] = [pokemon as Pokemon];
    }
  }

  return { slots };
}

// Retrieves the pokemon at a given version by name. Version is 1-based (matching the return
// value of addToBox/updateBox), so version 1 is the first snapshot, version 2 the second, etc.
// Returns null if the pokemon did not exist at that version.
export function getFromBox(box: Box, version: number, name: string): Pokemon | null {
  return box.slots[name]?.[version - 1] ?? null;
}
