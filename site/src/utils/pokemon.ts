export interface PokemonData {
  name: string;
  sprite?: string;
  pokedex?: string;
  level: number;
  nature?: string | null;
  ability?: string | null;
  item?: string | null;
  moves?: (string | null)[];
}

export interface Pokemon {
  base: PokemonData;
  update?: Partial<PokemonData>;
  index?: number;
}

export type PokemonOverrides = Partial<PokemonData>;

export function resolve(pokemon: Pokemon): PokemonData {
  return { ...pokemon.base, ...pokemon.update };
}

const TRACKED_FIELDS = ["name", "level", "nature", "ability", "item"] as const;

export function changePokemon(pokemon: Pokemon, overrides: PokemonOverrides = {}): Pokemon {
  const current = resolve(pokemon);
  const update: Partial<PokemonData> = {};

  for (const field of TRACKED_FIELDS) {
    if (overrides[field] !== undefined && overrides[field] !== current[field]) {
      (update as Record<string, unknown>)[field] = overrides[field];
    }
  }

  if (overrides.moves !== undefined) {
    const currentMoveSet = new Set((current.moves ?? []).filter(Boolean));
    if (overrides.moves.some((m) => m && !currentMoveSet.has(m))) {
      update.moves = overrides.moves;
    }
  }

  const hasChanges = Object.keys(update).length > 0;

  return {
    base: current,
    update: hasChanges ? update : undefined,
    index: pokemon.index,
  };
}
