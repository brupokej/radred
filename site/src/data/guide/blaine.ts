import { type Moment } from "@site/src/utils/moments";
import { getBlaineSecrets } from "./blaineSecrets";

import { box as _box1 } from "@site/src/data/guide/koga";

export const {
  blaineBoxChange,
  seafoamIslandsEncounter,
  powerPlantEncounter,
  powerPlantBoxChange,
  lavenderTownLeaderMortyBattle,
  seafoamIslandsLeaderPryceBattle,
  seafoamIslandsLeaderPryceBoxChange,
  cinnabarLabLeaderJasmineBattle,
  cinnabarLabLeaderJasmineBoxChange,
  cinnabarIslandMayBattle,
  cinnabarIslandMayBoxChange,
  pokemonMansionBurglarLewisBattle,
  pokemonMansionBurglarLewisBoxChange,
  cinnabarGymAceTrainerDerekBattle,
  cinnabarGymAceTrainerLucyBattle,
  cinnabarGymAceTrainerZacBattle,
  cinnabarGymLeaderBlaineBattle,
  cinnabarGymLeaderBlaineBoxChange,
  box,
} = getBlaineSecrets(_box1);

export const moments: Moment[] = [
  blaineBoxChange,
  seafoamIslandsEncounter,
  powerPlantEncounter,
  powerPlantBoxChange,
  lavenderTownLeaderMortyBattle,
  seafoamIslandsLeaderPryceBattle,
  seafoamIslandsLeaderPryceBoxChange,
  cinnabarLabLeaderJasmineBattle,
  cinnabarLabLeaderJasmineBoxChange,
  cinnabarIslandMayBattle,
  cinnabarIslandMayBoxChange,
  pokemonMansionBurglarLewisBattle,
  pokemonMansionBurglarLewisBoxChange,
  cinnabarGymAceTrainerDerekBattle,
  cinnabarGymAceTrainerLucyBattle,
  cinnabarGymAceTrainerZacBattle,
  cinnabarGymLeaderBlaineBattle,
  cinnabarGymLeaderBlaineBoxChange,
];
