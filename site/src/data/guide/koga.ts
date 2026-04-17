import { EncounterData } from "@site/src/components/Encounter";
import { Moment } from "@site/src/utils/moments";

import { box as _box1 } from "@site/src/data/guide/sabrina";

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

export const moments: Moment[] = [
  { label: "Starter Egg 3 Encounter", kind: "encounter", data: froakieEncounter },
  { label: "Starter Egg 4 Encounter", kind: "encounter", data: chimcharEncounter },
  { label: "Starter Egg 5 Encounter", kind: "encounter", data: treeckoEncounter },
];
