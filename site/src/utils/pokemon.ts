export interface PokemonData {
  name: string;
  spriteKey?: string;
  pokedexKey?: string;
  level?: number;
  nature?: string | null;
  ability?: string | null;
  item?: string | null;
  moves?: (string | null)[];
}

export interface Pokemon {
  base: PokemonData;
  update?: Partial<PokemonData>;
}

export function resolvePokemon(pokemon: Pokemon): PokemonData {
  return { ...pokemon.base, ...pokemon.update };
}
