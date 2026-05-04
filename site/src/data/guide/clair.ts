import { type Moment } from "@site/src/utils/moments";
import { getClairSecrets } from "./clairSecrets";

import { box as _box1 } from "@site/src/data/guide/blaine";

export const {
  clairBoxChange,
  ceruleanCaveGrunt1Battle,
  ceruleanCaveGrunt1BoxChange,
  ceruleanCaveGrunt2Battle,
  ceruleanCaveArcherBattle,
  ceruleanCaveArianaBattle,
  ceruleanCaveArianaBoxChange,
  ceruleanCaveGiovanniBattle,
  ceruleanCaveGiovanniBoxChange,
  viridianCityClairBattle,
  box,
} = getClairSecrets(_box1);

export const moments: Moment[] = [
  clairBoxChange,
  ceruleanCaveGrunt1Battle,
  ceruleanCaveGrunt1BoxChange,
  ceruleanCaveGrunt2Battle,
  ceruleanCaveArcherBattle,
  ceruleanCaveArianaBattle,
  ceruleanCaveArianaBoxChange,
  ceruleanCaveGiovanniBattle,
  ceruleanCaveGiovanniBoxChange,
  viridianCityClairBattle,
];
