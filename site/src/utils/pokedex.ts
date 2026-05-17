import rawData from "@site/src/data/utils/pokedex.json";
import { PokemonData, Stats } from "@site/src/utils/pokemon";
import { resolveSpecies } from "@site/src/utils/abbreviations";

export type PokedexData = Stats;

export const pokedex = rawData as Record<string, PokedexData>;

export function getHp(pokemon: PokemonData): number {
  if (pokemon.name === "Shedinja") return 1;
  const stats = pokedex[pokemon.pokedexHpKey ?? resolveSpecies(pokemon.name)];
  const base = stats?.hp ?? 0;
  const iv = pokemon.ivs?.hp ?? 31;
  const ev = pokemon.evs?.hp ?? 0;
  const level = parseInt(String(pokemon.level ?? 0), 10);
  return Math.floor(((2 * base + iv + ev / 4) * level) / 100) + level + 10;
}
