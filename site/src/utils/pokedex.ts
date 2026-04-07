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
  const base = pokedex[pokemon.pokedexKey ?? pokemon.name];
  return Math.floor(((2 * base.hp + 31) * pokemon.level) / 100) + pokemon.level + 10;
}
