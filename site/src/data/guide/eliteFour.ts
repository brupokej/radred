import { type Moment } from "@site/src/utils/moments";
import { getEliteFourSecrets } from "./eliteFourSecrets";

import { box as _box1 } from "@site/src/data/guide/victoryRoad";

export const {
  eliteFourChecklist,
  eliteFourLoreleiBattle,
  eliteFourBrunoBattle,
  eliteFourAgathaBattle,
  eliteFourLanceBattle,
  eliteFourLanceBoxChange,
  championRivalBattle,
  box,
} = getEliteFourSecrets(_box1);

export const moments: Moment[] = [
  eliteFourChecklist,
  eliteFourLoreleiBattle,
  eliteFourBrunoBattle,
  eliteFourAgathaBattle,
  eliteFourLanceBattle,
  eliteFourLanceBoxChange,
  championRivalBattle,
];
