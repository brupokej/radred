const SPRITE_BASE = "https://raw.githubusercontent.com/Autumnchi";
const COLOURED_SPRITE_BASE = `${SPRITE_BASE}/coloured-home-sprites/main`;
const MONOTONE_SPRITE_BASE = `${SPRITE_BASE}/monotone-home-sprites/main`;

export const getColouredSpriteUrl = (sprite: string) => {
  return `${COLOURED_SPRITE_BASE}/${sprite}.png`;
};

export const getMonotoneSpriteUrl = (sprite: string) => {
  return `${MONOTONE_SPRITE_BASE}/${sprite}.png`;
};
