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

export function resolvePokemon(pokemon: Pokemon): PokemonData {
  return { ...pokemon.base, ...pokemon.update };
}
