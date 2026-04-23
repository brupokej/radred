import rawData from "@site/src/data/utils/pokedex.json";
import { PokemonData, Stats } from "@site/src/utils/pokemon";

export type PokedexData = Stats;

export const pokedex = rawData as Record<string, PokedexData>;

export function getHp(pokemon: PokemonData): number {
  const base = pokedex[pokemon.pokedexKey ?? pokemon.name].hp;
  const iv = pokemon.ivs?.hp ?? 31;
  const ev = pokemon.evs?.hp ?? 0;
  const level = Number(pokemon.level ?? 0);
  return Math.floor(((2 * base + iv + ev / 4) * level) / 100) + level + 10;
}
