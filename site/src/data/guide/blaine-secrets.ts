import { getBox, type Box } from "@site/src/utils/box";
import type { Moment } from "@site/src/utils/moments";
import {
  lavenderTownLeaderMortyBox,
  seafoamIslandsLeaderPryceJynxBox,
  seafoamIslandsLeaderPryceSandslashABox,
} from "@site/src/utils/opponents";

export function getBlaineSecrets(_box1: Box) {
  const _encounter = { name: "Encounter", spriteKey: "secret" };

  const blaineBoxChange: Moment = {
    split: "Blaine",
    label: "Blaine Box Change",
    kind: "boxChange",
  };

  const seafoamIslandsEncounter: Moment = {
    split: "Blaine",
    label: "Seafoam Islands Encounter",
    kind: "encounter",
    secret: true,
    data: { pokemon: _encounter, playerBox: _box1 },
  };

  const powerPlantEncounter: Moment = {
    split: "Blaine",
    label: "Power Plant Encounter",
    kind: "encounter",
    secret: true,
    data: { pokemon: _encounter, playerBox: _box1 },
  };

  const _box2 = getBox({
    box: _box1,
    team: ["Incineroar", "Incineroar", "Incineroar"],
  });

  const lavenderTownLeaderMortyBattle: Moment = {
    split: "Blaine",
    label: "Lavender Town Leader Morty Battle",
    kind: "battle",
    secret: true,
    data: { playerBox: _box2, opponentBox: lavenderTownLeaderMortyBox, lines: [] },
  };

  const _box3 = getBox({
    box: _box2,
    team: ["Incineroar", "Incineroar", "Incineroar", "Incineroar", "Incineroar", "Incineroar"],
  });

  const seafoamIslandsLeaderPryceBattle: Moment = {
    split: "Blaine",
    label: "Seafoam Islands Leader Pryce Battle",
    kind: "switchBattle",
    secret: true,
    data: {
      cases: [
        {
          label: "50% → Jynx matchup",
          data: { playerBox: _box3, opponentBox: seafoamIslandsLeaderPryceJynxBox, lines: [] },
        },
        {
          label: "50% → Sandslash-A matchup",
          data: {
            playerBox: _box3,
            opponentBox: seafoamIslandsLeaderPryceSandslashABox,
            lines: [],
          },
        },
      ],
    },
  };

  return {
    blaineBoxChange,
    seafoamIslandsEncounter,
    powerPlantEncounter,
    lavenderTownLeaderMortyBattle,
    seafoamIslandsLeaderPryceBattle,
    box: _box3,
  };
}
