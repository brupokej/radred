import { moments as blaineMoments } from "@site/src/data/guide/blaine";
import { moments as brockMoments } from "@site/src/data/guide/brock";
import { moments as clairMoments } from "@site/src/data/guide/clair";
import { moments as eliteFourMoments } from "@site/src/data/guide/eliteFour";
import { moments as erikaMoments } from "@site/src/data/guide/erika";
import { moments as kogaMoments } from "@site/src/data/guide/koga";
import { moments as mistyMoments } from "@site/src/data/guide/misty";
import { moments as sabrinaMoments } from "@site/src/data/guide/sabrina";
import { moments as surgeMoments } from "@site/src/data/guide/surge";
import { moments as victoryRoadMoments } from "@site/src/data/guide/victoryRoad";

export const allMoments = [
  ...brockMoments,
  ...mistyMoments,
  ...surgeMoments,
  ...erikaMoments,
  ...sabrinaMoments,
  ...kogaMoments,
  ...blaineMoments,
  ...clairMoments,
  ...victoryRoadMoments,
  ...eliteFourMoments,
].filter((m) => m.kind !== "boxChange");
