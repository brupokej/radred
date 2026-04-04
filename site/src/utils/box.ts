import { Pokemon } from "@site/src/components/Team";
import { changePokemon, PokemonOverrides } from "@site/src/utils/pokemon";

export interface Box {
  slots: Record<string, (Pokemon | PokemonOverrides | null)[]>;
}

function slotLength(box: Box): number {
  return Object.values(box.slots)[0]?.length ?? 0;
}

export function createBox(): Box {
  return { slots: {} };
}

// Adds new pokemon to the box. Existing slots are extended with an empty diff.
// New slots are padded with nulls to match the current version length.
// Returns the new slot length (1-based version number of the snapshot just created).
export function addToBox(box: Box, initial: Record<string, Pokemon>): number {
  const len = slotLength(box);

  const toAdd = Object.entries(initial).filter(([name]) => {
    if (box.slots[name] !== undefined) {
      return false;
    }
    return true;
  });

  for (const history of Object.values(box.slots)) {
    history.push(history[history.length - 1] === null ? null : {});
  }

  const baseIndex = Object.keys(box.slots).length;
  toAdd.forEach(([name, pokemon], i) => {
    box.slots[name] = [
      ...new Array<Pokemon | null>(len).fill(null),
      { ...pokemon, index: baseIndex + i },
    ];
  });

  return len + 1;
}

// Updates existing pokemon in the box. All slots are extended: changed ones store the raw
// overrides as a diff, unchanged ones store an empty diff {}. If a pokemon's name changes,
// the old slot key gets null (treated as removed) and a new slot key is created with the
// resolved Pokemon, padded with nulls — keeping all slots the same length.
// Returns the new slot length (1-based version number of the snapshot just created).
export function updateBox(box: Box, changes: Record<string, PokemonOverrides> = {}): number {
  const len = slotLength(box);

  const validChanges = Object.fromEntries(
    Object.entries(changes).filter(([name]) => {
      const history = box.slots[name];
      if (!history) {
        return false;
      }
      if (history[history.length - 1] === null) {
        return false;
      }
      return true;
    })
  );

  const renames: [string, string, PokemonOverrides][] = [];

  for (const [slotKey, history] of Object.entries(box.slots)) {
    const overrides = validChanges[slotKey];

    if (history[history.length - 1] === null) {
      history.push(null);
    } else if (!overrides) {
      history.push({});
    } else if (overrides.name !== undefined && overrides.name !== slotKey) {
      // Rename: mark old slot as removed at this version
      history.push(null);
      renames.push([slotKey, overrides.name, overrides]);
    } else {
      history.push(overrides);
    }
  }

  for (const [oldKey, newKey, overrides] of renames) {
    if (box.slots[newKey]) {
      continue;
    }
    const currentPokemon = getFromBox(box, len, oldKey)!;
    const resolved = changePokemon(currentPokemon, overrides);
    box.slots[newKey] = [...new Array<Pokemon | null>(len).fill(null), resolved];
  }

  return len + 1;
}

// Removes pokemon from the box. Removed slots get null appended; all others are extended
// with an empty diff.
// Returns the new slot length (1-based version number of the snapshot just created).
export function removeFromBox(box: Box, names: string[]): number {
  const len = slotLength(box);
  const keysToRemove = new Set(names);

  for (const key of keysToRemove) {
    if (!box.slots[key]) {
      keysToRemove.delete(key);
    }
  }

  for (const [key, history] of Object.entries(box.slots)) {
    if (keysToRemove.has(key)) {
      history.push(null);
    } else {
      history.push(history[history.length - 1] === null ? null : {});
    }
  }

  return len + 1;
}

// Creates a new Box containing only the resolved final state of each active slot, with
// the `previous` field cleared. Pokemon that ended as null (removed) are omitted.
// Intended for use at the end of a file to pass a clean starting state to the next file.
export function exportBox(box: Box): Box {
  const slots: Record<string, (Pokemon | null)[]> = {};
  const version = slotLength(box);

  for (const key of Object.keys(box.slots)) {
    const pokemon = getFromBox(box, version, key);
    if (pokemon !== null) {
      const { previous: _prev, ...fresh } = pokemon;
      slots[key] = [fresh as Pokemon];
    }
  }

  return { slots };
}

// Retrieves the pokemon at a given version by replaying diffs from the slot history.
// Version is 1-based (matching the return value of addToBox/updateBox).
// Returns null if the pokemon did not exist at that version.
export function getFromBox(box: Box, version: number, name: string): Pokemon | null {
  const history = box.slots[name];
  if (!history) return null;

  let current: Pokemon | null = null;
  for (let i = 0; i < version; i++) {
    const entry = history[i];
    if (entry === null) {
      current = null;
    } else if (current === null) {
      // First non-null entry is always a full Pokemon (from addToBox or a rename)
      current = entry as Pokemon;
    } else {
      // Subsequent non-null entries are PokemonOverrides diffs
      current = changePokemon(current, entry as PokemonOverrides);
    }
  }
  return current;
}
