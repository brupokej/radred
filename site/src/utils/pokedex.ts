import rawData from "@site/src/data/pokedex.json";
import { PokemonData } from "@site/src/utils/pokemon";

export interface PokedexData {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}

export const pokedex = rawData as Record<string, PokedexData>;

export function getHp(pokemon: PokemonData): number {
  const hp = pokedex[pokemon.pokedexKey ?? pokemon.name].hp;
  const level = pokemon.level ?? 0;
  return Math.floor(((2 * hp + 31) * level) / 100) + level + 10;
}
