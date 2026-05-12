import { moments as brockMoments } from "@site/src/data/guide/brock";
import type { Moment } from "@site/src/utils/moments";
import { boxToTeam, pokemonDataToSide, type CalcSideState } from "@site/src/utils/calcLink";

export interface TrainerSet {
  label: string;
  state: CalcSideState;
}

type BattleMoment = Extract<Moment, { kind: "battle" }>;

function addToMap(
  map: Map<string, TrainerSet[]>,
  label: string,
  opponentBox: Parameters<typeof boxToTeam>[0],
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

  for (const moment of brockMoments) {
    if (moment.kind !== "battle") continue;
    const battle = (moment as BattleMoment).data;
    const label = moment.label.replace(/ Battle$/, "");
    addToMap(map, label, battle.opponentBox);
  }

  return map;
})();
