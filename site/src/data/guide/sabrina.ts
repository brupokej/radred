import { Moment } from "@site/src/utils/moments";

import { box as _box1 } from "@site/src/data/guide/erika";

const _sprigatito = {
  name: "Sprigatito",
  ability: "Overgrow",
  moves: ["Scratch", "Tail Whip"],
};

export const starterEgg1Encounter: Moment = {
  label: "Starter Egg 1 Encounter",
  kind: "encounter",
  data: { pokemon: _sprigatito },
};

const _mudkip = {
  name: "Mudkip",
  ability: "Torrent",
  moves: ["Growl", "Tackle"],
};

export const starterEgg2Encounter: Moment = {
  label: "Starter Egg 2 Encounter",
  kind: "encounter",
  data: { pokemon: _mudkip },
};

export const box = _box1;

export const moments: Moment[] = [
  starterEgg1Encounter,
  starterEgg2Encounter,
];
