import { getBox, type Box } from "@site/src/utils/box";
import type { Moment } from "@site/src/utils/moments";
import { pewterCityLeaderBrockRematchBox } from "@site/src/utils/opponents";

export function getKogaSecrets(_box1: Box) {
  const _starter = { name: "Starter", moves: ["Tackle", "Tail Whip"] };

  const starterEgg3Encounter: Moment = {
    split: "Koga",
    label: "Starter Egg 3 Encounter",
    kind: "encounter",
    secret: true,
    data: { pokemon: _starter, playerBox: _box1 },
  };

  const starterEgg4Encounter: Moment = {
    split: "Koga",
    label: "Starter Egg 4 Encounter",
    kind: "encounter",
    secret: true,
    data: { pokemon: _starter, playerBox: _box1 },
  };

  const starterEgg5Encounter: Moment = {
    split: "Koga",
    label: "Starter Egg 5 Encounter",
    kind: "encounter",
    secret: true,
    data: { pokemon: _starter, playerBox: _box1 },
  };

  const _box2 = getBox({
    box: _box1,
    cap: 68,
    update: [
      {
        Drednaw: {
          ivs: { hp: 31, spd: 31 },
        },
      },
    ],
  });

  const starterEgg5BoxChange: Moment = {
    split: "Koga",
    label: "Starter Egg 5 Box Change",
    kind: "boxChange",
  };

  const _box3 = getBox({
    box: _box2,
    update: { Incineroar: { spriteKey: "secret" } },
    team: ["Incineroar", "Incineroar", "Incineroar", "Incineroar", "Incineroar"],
  });

  const pewterCityLeaderBrockRematchBattle: Moment = {
    split: "Koga",
    label: "Pewter City Leader Brock Rematch Battle",
    kind: "battle",
    secret: true,
    data: { playerBox: _box3, opponentBox: pewterCityLeaderBrockRematchBox, lines: [] },
  };

  return {
    starterEgg3Encounter,
    starterEgg4Encounter,
    starterEgg5Encounter,
    starterEgg5BoxChange,
    pewterCityLeaderBrockRematchBattle,
    box: _box3,
  };
}
