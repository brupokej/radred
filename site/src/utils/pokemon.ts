export interface Stats {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}

export interface PokemonData {
  name: string;
  spriteKey?: string;
  pokedexHpKey?: string;
  level?: number | string;
  nature?: string | null;
  ability?: string | null;
  nonMegaAbility?: string;
  item?: string | null;
  moves?: (string | null)[];
  hp?: string;
  ivs?: Partial<Stats>;
  evs?: Partial<Stats>;
  boxOrder?: number;
}

export interface Pokemon {
  base: PokemonData;
  update?: Partial<PokemonData>;
}

export function resolvePokemon(pokemon: Pokemon): PokemonData {
  return { ...pokemon.base, ...pokemon.update };
}

export const STAT_ORDER = ["hp", "atk", "def", "spa", "spd", "spe"] as const;

export function formatStats(stats: Partial<Stats>): string {
  const parts = STAT_ORDER.filter((stat) => stats[stat] !== undefined).map(
    (stat) => `${stats[stat]} ${stat.toUpperCase()}`
  );
  return parts.length > 0 ? `${parts.join(", ")}` : "-";
}
