import { EncounterData } from "@site/src/components/Encounter";
import { Moment } from "@site/src/utils/moments";

import { box as _box1 } from "@site/src/data/guide/erika";

// ─── Encounters ───────────────────────────────────────────────────────────────

export const sprigatitoEncounter: EncounterData = {
  pokemon: {
    name: "Sprigatito",
    ability: "Overgrow",
    moves: ["Scratch", "Tail Whip"],
  },
};

export const mudkipEncounter: EncounterData = {
  pokemon: {
    name: "Mudkip",
    ability: "Torrent",
    moves: ["Growl", "Tackle"],
  },
};

export const box = _box1;

export const moments: Moment[] = [
  { label: "Starter Egg 1 Encounter", kind: "encounter", data: sprigatitoEncounter },
  { label: "Starter Egg 2 Encounter", kind: "encounter", data: mudkipEncounter },
];
