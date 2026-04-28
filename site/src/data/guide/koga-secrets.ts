import { getBox, type Box } from "@site/src/utils/box";
import type { Moment } from "@site/src/utils/moments";
import {
  ceruleanCityLeaderMistyRematchBox,
  fuschiaCityGymJugglerKaydenBox,
  fuschiaCityLeaderKogaBox,
  pewterCityLeaderBrockRematchBox,
  vermillionCityLeaderLtSurgeRematchBox,
} from "@site/src/utils/opponents";

export function getKogaSecrets(_box1: Box) {
  const _encounter = { name: "Encounter", spriteKey: "secret" };

  const starterEgg3Encounter: Moment = {
    split: "Koga",
    label: "Starter Egg 3 Encounter",
    kind: "encounter",
    secret: true,
    data: { pokemon: _encounter, playerBox: _box1 },
  };

  const starterEgg4Encounter: Moment = {
    split: "Koga",
    label: "Starter Egg 4 Encounter",
    kind: "encounter",
    secret: true,
    data: { pokemon: _encounter, playerBox: _box1 },
  };

  const starterEgg5Encounter: Moment = {
    split: "Koga",
    label: "Starter Egg 5 Encounter",
    kind: "encounter",
    secret: true,
    data: { pokemon: _encounter, playerBox: _box1 },
  };

  const starterEgg5BoxChange: Moment = {
    split: "Koga",
    label: "Starter Egg 5 Box Change",
    kind: "boxChange",
  };

  const _box2 = getBox({
    box: _box1,
    update: { Incineroar: { spriteKey: "secret" } },
    team: ["Incineroar", "Incineroar", "Incineroar", "Incineroar", "Incineroar"],
  });

  const pewterCityLeaderBrockRematchBattle: Moment = {
    split: "Koga",
    label: "Pewter City Leader Brock Rematch Battle",
    kind: "battle",
    secret: true,
    data: { playerBox: _box2, opponentBox: pewterCityLeaderBrockRematchBox, lines: [] },
  };

  const _box3 = getBox({
    box: _box2,
    team: ["Incineroar", "Incineroar", "Incineroar", "Incineroar", "Incineroar", "Incineroar"],
  });

  const ceruleanCityLeaderMistyRematchBattle: Moment = {
    split: "Koga",
    label: "Cerulean City Leader Misty Rematch Battle",
    kind: "battle",
    secret: true,
    data: { playerBox: _box3, opponentBox: ceruleanCityLeaderMistyRematchBox, lines: [] },
  };

  const vermillionCityLeaderLtSurgeRematchBattle: Moment = {
    split: "Koga",
    label: "Vermillion City Leader Lt. Surge Rematch Battle",
    kind: "battle",
    secret: true,
    data: { playerBox: _box3, opponentBox: vermillionCityLeaderLtSurgeRematchBox, lines: [] },
  };

  const _box4 = getBox({
    box: _box3,
    team: ["Incineroar", "Incineroar", "Incineroar", "Incineroar"],
  });

  const fuschiaCityGymJugglerKaydenBattle: Moment = {
    split: "Koga",
    label: "Fuschia City Gym Juggler Kayden Battle",
    kind: "battle",
    secret: true,
    data: { playerBox: _box4, opponentBox: fuschiaCityGymJugglerKaydenBox, lines: [] },
  };

  const fuschiaCityGymJugglerKaydenBoxChange: Moment = {
    split: "Koga",
    label: "Fuschia City Gym Juggler Kayden Box Change",
    kind: "boxChange",
  };

  const _box5 = getBox({
    box: _box4,
    update: { Incineroar: { spriteKey: "secret" } },
    team: ["Incineroar", "Incineroar", "Incineroar", "Incineroar"],
  });

  const fuschiaCityLeaderKogaBattle: Moment = {
    split: "Koga",
    label: "Fuschia City Leader Koga Battle",
    kind: "battle",
    secret: true,
    data: { playerBox: _box5, opponentBox: fuschiaCityLeaderKogaBox, lines: [] },
  };

  const fuschiaCityLeaderKogaBoxChange: Moment = {
    split: "Koga",
    label: "Fuschia City Leader Koga Box Change",
    kind: "boxChange",
  };

  return {
    starterEgg3Encounter,
    starterEgg4Encounter,
    starterEgg5Encounter,
    starterEgg5BoxChange,
    pewterCityLeaderBrockRematchBattle,
    ceruleanCityLeaderMistyRematchBattle,
    vermillionCityLeaderLtSurgeRematchBattle,
    fuschiaCityGymJugglerKaydenBattle,
    fuschiaCityGymJugglerKaydenBoxChange,
    fuschiaCityLeaderKogaBattle,
    fuschiaCityLeaderKogaBoxChange,
    box: _box5,
  };
}
