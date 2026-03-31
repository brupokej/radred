const COLOURED_SPRITE_BASE =
  "https://raw.githubusercontent.com/Autumnchi/coloured-home-sprites/main";
const MONOTONE_SPRITE_BASE =
  "https://raw.githubusercontent.com/Autumnchi/monotone-home-sprites/main";

export const spriteUrl = (name: string, side?: "player" | "opponent") =>
  `${side === "opponent" ? MONOTONE_SPRITE_BASE : COLOURED_SPRITE_BASE}/${name}.png`;
