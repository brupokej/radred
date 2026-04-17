import { Moment } from "@site/src/utils/moments";

import { box as _box1 } from "@site/src/data/guide/sabrina";

const _froakie = {
  name: "Froakie",
  ability: "Torrent",
  moves: ["Growl", "Pound"],
};

export const starterEgg3Encounter: Moment = {
  label: "Starter Egg 3 Encounter",
  kind: "encounter",
  data: { pokemon: _froakie },
};

const _chimchar = {
  name: "Chimchar",
  ability: "Blaze",
  moves: ["Leer", "Scratch"],
};

export const starterEgg4Encounter: Moment = {
  label: "Starter Egg 4 Encounter",
  kind: "encounter",
  data: { pokemon: _chimchar },
};

const _treecko = {
  name: "Treecko",
  ability: "Overgrow",
  moves: ["Leer", "Pound"],
};

export const starterEgg5Encounter: Moment = {
  label: "Starter Egg 5 Encounter",
  kind: "encounter",
  data: { pokemon: _treecko },
};

export const box = _box1;

export const moments: Moment[] = [
  starterEgg3Encounter,
  starterEgg4Encounter,
  starterEgg5Encounter,
];
