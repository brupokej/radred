import { EncounterData } from "@site/src/components/Encounter";

import { box as _box1 } from "@site/src/data/battles/sabrina";

// ─── Encounters ───────────────────────────────────────────────────────────────

export const froakieEncounter: EncounterData = {
  pokemon: {
    name: "Froakie",
    ability: "Torrent",
    moves: ["Growl", "Pound"],
  },
};

export const chimcharEncounter: EncounterData = {
  pokemon: {
    name: "Chimchar",
    ability: "Blaze",
    moves: ["Leer", "Scratch"],
  },
};

export const treeckoEncounter: EncounterData = {
  pokemon: {
    name: "Treecko",
    ability: "Overgrow",
    moves: ["Leer", "Pound"],
  },
};

export const box = _box1;
