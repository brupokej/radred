import { PokemonData } from "@site/src/utils/pokemon";

function getSpriteUrl(pokemon: PokemonData, palette: "coloured" | "monotone"): string {
  const spriteKey = pokemon.spriteKey ?? pokemon.name.toLowerCase();
  return `https://raw.githubusercontent.com/Autumnchi/${palette}-home-sprites/main/${spriteKey}.png`;
}

export const getColouredSpriteUrl = (pokemon: PokemonData) => getSpriteUrl(pokemon, "coloured");

export const getMonotoneSpriteUrl = (pokemon: PokemonData) => getSpriteUrl(pokemon, "monotone");
