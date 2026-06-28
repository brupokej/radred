import { type Moment } from "@site/src/utils/moments";
import { getVictoryRoadSecrets } from "./victoryRoadSecrets";

import { box as _box1 } from "@site/src/data/guide/clair";

export const {
  route13Encounter,
  route18Encounter,
  route20Encounter,
  route20BoxChange,
  route22RivalRematchBattle,
  route22RivalRematchBoxChange,
  route23BrendanBattle,
  route23BrendanBoxChange,
  victoryRoadAceTrainerNaomiBattle,
  victoryRoadAceTrainerRolandoBattle,
  victoryRoadAceTrainerGeorgeBattle,
  victoryRoadAceTrainerCarolineBattle,
  victoryRoadAceTrainerColbyBattle,
  victoryRoadAceTrainerAlexaBattle,
  victoryRoadCoolCoupleRayAndTyraBattle,
  indigoPlateauCreatorSoupercellBattle,
  indigoPlateauCreatorSoupercellBoxChange,
  box,
} = getVictoryRoadSecrets(_box1);

export const moments: Moment[] = [
  route13Encounter,
  route18Encounter,
  route20Encounter,
  route20BoxChange,
  route22RivalRematchBattle,
  route22RivalRematchBoxChange,
  route23BrendanBattle,
  route23BrendanBoxChange,
  victoryRoadAceTrainerNaomiBattle,
  victoryRoadAceTrainerRolandoBattle,
  victoryRoadAceTrainerGeorgeBattle,
  victoryRoadAceTrainerCarolineBattle,
  victoryRoadAceTrainerColbyBattle,
  victoryRoadAceTrainerAlexaBattle,
  victoryRoadCoolCoupleRayAndTyraBattle,
  indigoPlateauCreatorSoupercellBattle,
  indigoPlateauCreatorSoupercellBoxChange,
];
