export interface Stats {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}

export type IVs = Partial<Stats>;

export interface PokemonData {
  name: string;
  spriteKey?: string;
  pokedexKey?: string;
  level?: number;
  nature?: string | null;
  ability?: string | null;
  item?: string | null;
  moves?: (string | null)[];
  ivs?: IVs;
  friend?: boolean;
  boxOrder?: number;
}

export interface Pokemon {
  base: PokemonData;
  update?: Partial<PokemonData>;
}

export function resolvePokemon(pokemon: Pokemon): PokemonData {
  return { ...pokemon.base, ...pokemon.update };
}

export const IV_STAT_ORDER = ["hp", "atk", "def", "spa", "spd", "spe"] as const;

export function formatIVs(ivs: IVs): string {
  const parts = IV_STAT_ORDER
    .filter((stat) => ivs[stat] !== undefined)
    .map((stat) => `${ivs[stat]} ${stat.toUpperCase()}`);
  return parts.length > 0 ? parts.join(", ") : "-";
}
