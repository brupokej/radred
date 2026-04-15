import { EncounterData } from "@site/src/components/Encounter";

import { box as _box1 } from "@site/src/data/battles/erika";

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
