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
import { boxToTeam, pokemonDataToSide, type CalcSideState } from "@site/src/utils/calcLink";
import type { Moment } from "@site/src/utils/moments";

export interface TrainerSet {
  label: string;
  state: CalcSideState;
}

type BattleMoment = Extract<Moment, { kind: "battle" }>;

const allMoments: Moment[] = [
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
];

function addToMap(
  map: Map<string, TrainerSet[]>,
  label: string,
  opponentBox: Parameters<typeof boxToTeam>[0]
) {
  try {
    for (const data of boxToTeam(opponentBox)) {
      const state = pokemonDataToSide(data);
      if (!state.species) continue;
      if (!map.has(state.species)) map.set(state.species, []);
      map.get(state.species)!.push({ label, state });
    }
  } catch {
    // skip battles with resolution errors
  }
}

export const TRAINER_SETS_BY_SPECIES: Map<string, TrainerSet[]> = (() => {
  const map = new Map<string, TrainerSet[]>();

  for (const moment of allMoments) {
    if (moment.kind !== "battle") continue;
    const battle = (moment as BattleMoment).data;
    const label = moment.label.replace(/ Battle$/, "");
    addToMap(map, label, battle.opponentBox);
  }

  return map;
})();
