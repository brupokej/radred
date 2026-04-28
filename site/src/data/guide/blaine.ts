import { type Moment } from "@site/src/utils/moments";
import { getBlaineSecrets } from "./blaine-secrets";

import { box as _box1 } from "@site/src/data/guide/koga";

export const {
  blaineBoxChange,
  seafoamIslandsEncounter,
  powerPlantEncounter,
  lavenderTownLeaderMortyBattle,
  seafoamIslandsLeaderPryceBattle,
  box,
} = getBlaineSecrets(_box1);

export const moments: Moment[] = [
  blaineBoxChange,
  seafoamIslandsEncounter,
  powerPlantEncounter,
  lavenderTownLeaderMortyBattle,
  seafoamIslandsLeaderPryceBattle,
];
