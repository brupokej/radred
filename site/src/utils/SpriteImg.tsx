import useBaseUrl from "@docusaurus/useBaseUrl";
import { PokemonData } from "@site/src/utils/pokemon";
import { getColouredSpriteUrl, getMonotoneSpriteUrl } from "@site/src/utils/sprites";
import React from "react";

type Props = {
  pokemon: PokemonData;
  palette?: "coloured" | "monotone";
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src">;

export const SpriteImg = React.forwardRef<HTMLImageElement, Props>(function SpriteImg(
  { pokemon, palette = "coloured", alt, ...imgProps },
  ref
) {
  const url =
    palette === "coloured" ? getColouredSpriteUrl(pokemon) : getMonotoneSpriteUrl(pokemon);
  const src = useBaseUrl(url);
  return <img ref={ref} src={src} alt={alt ?? pokemon.name} {...imgProps} />;
});
