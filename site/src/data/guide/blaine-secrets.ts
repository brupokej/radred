import { getBox, type Box } from "@site/src/utils/box";
import type { Moment } from "@site/src/utils/moments";
import {
  lavenderTownLeaderMortyBox,
  seafoamIslandsLeaderPryceJynxBox,
  seafoamIslandsLeaderPryceSandslashABox,
} from "@site/src/utils/opponents";

export function getBlaineSecrets(_box1: Box) {
  const _secret = { name: "Secret", spriteKey: "secret" };
  const _box2 = getBox({ box: _box1, cap: 73 });

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
    data: { pokemon: _secret, playerBox: _box2 },
  };

  const powerPlantEncounter: Moment = {
    split: "Blaine",
    label: "Power Plant Encounter",
    kind: "encounter",
    secret: true,
    data: { pokemon: _secret, playerBox: _box2 },
  };

  const _box3 = getBox({
    box: _box2,
    team: ["Secret", "Secret", "Secret"],
  });

  const lavenderTownLeaderMortyBattle: Moment = {
    split: "Blaine",
    label: "Lavender Town Leader Morty Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box3,
      opponentBox: lavenderTownLeaderMortyBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Krookodile"],
              turns: [
                [
                  { opponent: "{o:Krookodile} Stealth Rock" },
                  { player: "{p:Secret} U-Turn {o:Krookodile} to {-:243}" },
                  { player: "{p:Secret} switch to {p:Secret}" },
                  { opponent: "{p:Secret} Stealth Rock to {=:92}" },
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
    team: ["Secret", "Secret", "Secret", "Secret", "Secret", "Secret"],
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
          data: {
            playerBox: _box4,
            opponentBox: seafoamIslandsLeaderPryceJynxBox,
            lines: [
              {
                matchups: [
                  {
                    matchup: ["Jynx"],
                    turns: [
                      [
                        { player: "{p:Secret} Fake Out {o:Jynx} to {-:199}" },
                        { opponent: "{o:Jynx} flinched" },
                      ],
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          label: "50% → Sandslash-A matchup",
          data: {
            playerBox: _box4,
            opponentBox: seafoamIslandsLeaderPryceSandslashABox,
            lines: [
              {
                matchups: [
                  {
                    matchup: ["Sandslash-A"],
                    turns: [
                      [
                        { player: "{p:Secret} Fake Out {o:Sandslash-A} to {-:214}" },
                        { opponent: "{o:Sandslash-A} flinched" },
                      ],
                    ],
                  },
                ],
              },
            ],
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
    box: _box4,
  };
}
