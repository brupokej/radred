import { PokemonData } from "@site/src/utils/pokemon";

const getSpriteUrl = (pokemon: PokemonData, palette: "coloured" | "monotone") =>
  `/sprites/${palette}/${pokemon.spriteKey ?? pokemon.name.toLowerCase()}.png`;

export const getColouredSpriteUrl = (pokemon: PokemonData) => getSpriteUrl(pokemon, "coloured");

export const getMonotoneSpriteUrl = (pokemon: PokemonData) => getSpriteUrl(pokemon, "monotone");
