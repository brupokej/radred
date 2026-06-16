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
  const _secret = { name: "Secret", spriteKey: "secret", level: 68 };

  const starterEgg3Encounter: Moment = {
    split: "Koga",
    label: "Starter Egg 3 Encounter",
    kind: "encounter",
    secret: true,
    data: { pokemon: _secret, playerBox: _box1 },
  };

  const starterEgg4Encounter: Moment = {
    split: "Koga",
    label: "Starter Egg 4 Encounter",
    kind: "encounter",
    secret: true,
    data: { pokemon: _secret, playerBox: _box1 },
  };

  const starterEgg5Encounter: Moment = {
    split: "Koga",
    label: "Starter Egg 5 Encounter",
    kind: "encounter",
    secret: true,
    data: { pokemon: _secret, playerBox: _box1 },
  };

  const starterEgg5BoxChange: Moment = {
    split: "Koga",
    label: "Starter Egg 5 Box Change",
    kind: "boxChange",
  };

  const _box2 = getBox({
    box: _box1,
    add: [_secret],
    team: ["Secret", "Secret", "Secret", "Secret", "Secret", "Secret"],
  });

  const pewterCityLeaderBrockRematchBattle: Moment = {
    split: "Koga",
    label: "Pewter City Leader Brock Rematch Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box2,
      opponentBox: pewterCityLeaderBrockRematchBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Iron Boulder"],
              turns: [
                [
                  { player: "{p:Secret} mega evolve" },
                  { opponent: "{o:Iron Boulder} Stealth Rock" },
                  { player: "{p:Secret} Flip Turn {o:Iron Boulder} to {-:220}" },
                  { player: "{p:Secret} switch to {p:Secret}" },
                  { opponent: "{p:Secret} Stealth Rock to {=:87}" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const _box3 = getBox({
    box: _box2,
    team: ["Secret", "Secret", "Secret", "Secret", "Secret", "Secret"],
  });

  const ceruleanCityLeaderMistyRematchBattle: Moment = {
    split: "Koga",
    label: "Cerulean City Leader Misty Rematch Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box3,
      opponentBox: ceruleanCityLeaderMistyRematchBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Iron Bundle"],
              turns: [
                [
                  { player: "{p:Secret} mega evolve" },
                  { player: "{p:Secret} Tackle {o:Iron Bundle} to {-:174}" },
                  { player: "{p:Secret} switch to {p:Secret}" },
                  { opponent: "{o:Iron Bundle} Hydro Pump {p:Secret} to {+:1}" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const _box4 = getBox({
    box: _box3,
    team: ["Secret", "Secret", "Secret", "Secret", "Secret"],
  });

  const vermillionCityLeaderLtSurgeRematchBattle: Moment = {
    split: "Koga",
    label: "Vermillion City Leader Lt. Surge Rematch Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box4,
      opponentBox: vermillionCityLeaderLtSurgeRematchBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Pawmot"],
              turns: [
                [
                  { player: "{p:Secret} Tackle {o:Pawmot} to {-:193}" },
                  { opponent: "{o:Pawmot} Thunder Punch {p:Secret}" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const vermillionCityLeaderLtSurgeRematchBoxChange: Moment = {
    split: "Koga",
    label: "Vermillion City Leader Lt. Surge Rematch Box Change",
    kind: "boxChange",
  };

  const _box5 = getBox({
    box: _box4,
    team: ["Secret", "Secret", "Secret", "Secret"],
  });

  const fuschiaCityGymJugglerKaydenBattle: Moment = {
    split: "Koga",
    label: "Fuschia City Gym Juggler Kayden Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box5,
      opponentBox: fuschiaCityGymJugglerKaydenBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Mr. Mime"],
              turns: [
                [
                  { player: "{p:Secret} Fake Out {o:Mr. Mime} to {-:166}" },
                  { opponent: "{o:Mr. Mime} flinched" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const fuschiaCityGymJugglerKaydenBoxChange: Moment = {
    split: "Koga",
    label: "Fuschia City Gym Juggler Kayden Box Change",
    kind: "boxChange",
  };

  const _box6 = getBox({
    box: _box5,
    team: ["Secret", "Secret", "Secret", "Secret", "Secret"],
  });

  const fuschiaCityLeaderKogaBattle: Moment = {
    split: "Koga",
    label: "Fuschia City Leader Koga Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box6,
      opponentBox: fuschiaCityLeaderKogaBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Tapu Lele"],
              turns: [
                [
                  { opponent: "{o:Tapu Lele} Psyshock {p:Secret} to {+:1}" },
                  { player: "{p:Secret} U-Turn {o:Tapu Lele} to {-:193}" },
                  { player: "{p:Secret} switch to {p:Secret}" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  return {
    starterEgg3Encounter,
    starterEgg4Encounter,
    starterEgg5Encounter,
    starterEgg5BoxChange,
    pewterCityLeaderBrockRematchBattle,
    ceruleanCityLeaderMistyRematchBattle,
    vermillionCityLeaderLtSurgeRematchBattle,
    vermillionCityLeaderLtSurgeRematchBoxChange,
    fuschiaCityGymJugglerKaydenBattle,
    fuschiaCityGymJugglerKaydenBoxChange,
    fuschiaCityLeaderKogaBattle,
    box: _box6,
  };
}
