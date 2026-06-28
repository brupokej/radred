import { getBox, type Box } from "@site/src/utils/box";
import type { Moment } from "@site/src/utils/moments";
import {
  championRivalBox,
  eliteFourAgathaBox,
  eliteFourBrunoInfernapeBox,
  eliteFourBrunoUrshifuSBox,
  eliteFourLanceBox,
  eliteFourLoreleiRainBox,
  eliteFourLoreleiSnowBox,
} from "@site/src/utils/opponents";

export function getEliteFourSecrets(_box1: Box) {
  const _box2 = getBox({
    box: _box1,
    team: ["Secret", "Secret", "Secret", "Secret", "Secret", "Secret"],
  });

  const eliteFourChecklist: Moment = {
    split: "Elite Four",
    label: "Elite Four Checklist",
    kind: "checklist",
    data: { playerBox: _box2 },
  };

  const eliteFourLoreleiBattle: Moment = {
    split: "Elite Four",
    label: "Elite Four Lorelei Battle",
    kind: "switchBattle",
    secret: true,
    data: {
      cases: [
        {
          label: "50% → Rain matchup",
          data: {
            playerBox: _box2,
            opponentBox: eliteFourLoreleiRainBox,
            lines: [
              {
                matchups: [
                  {
                    matchup: ["Iron Bundle", "Ludicolo"],
                    turns: [
                      [
                        { player: "{p:Secret} switch to {p:Secret}" },
                        { opponent: "{o:Ludicolo} Fake Out {p:Secret} to {+:60}" },
                        { opponent: "{o:Iron Bundle} Hydro Pump {p:Secret} to {+:1}" },
                        { player: "{p:Secret} Growl {o:Iron Bundle}" },
                      ],
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          label: "50% → Snow matchup",
          data: {
            playerBox: _box2,
            opponentBox: eliteFourLoreleiSnowBox,
            lines: [
              {
                matchups: [
                  {
                    matchup: ["Landorus-T", "Glaceon"],
                    turns: [
                      [
                        { player: "{p:Secret} Fake Out {o:Glaceon} to {-:256}" },
                        { opponent: "{o:Glaceon} flinched" },
                        { player: "{p:Secret} Tackle {o:Landorus-T} to {=:0}" },
                        { opponent: "{o:Landorus-T} fainted" },
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

  const eliteFourBrunoBattle: Moment = {
    split: "Elite Four",
    label: "Elite Four Bruno Battle",
    kind: "switchBattle",
    secret: true,
    data: {
      cases: [
        {
          label: "50% → Infernape matchup",
          data: {
            playerBox: _box2,
            opponentBox: eliteFourBrunoInfernapeBox,
            lines: [
              {
                matchups: [
                  {
                    matchup: ["Infernape"],
                    turns: [
                      [
                        { player: "{p:Secret} Fake Out {o:Infernape} to {-:249}" },
                        { opponent: "{p:Secret} Life Orb to {=:109}" },
                        { opponent: "{o:Infernape} flinched" },
                      ],
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          label: "50% → Urshifu-S matchup",
          data: {
            playerBox: _box2,
            opponentBox: eliteFourBrunoUrshifuSBox,
            lines: [
              {
                matchups: [
                  {
                    matchup: ["Urshifu-S"],
                    turns: [
                      [
                        { player: "{p:Secret} U-Turn {o:Urshifu-S} to {-:290}" },
                        { opponent: "{p:Secret} Life Orb to {=:109}" },
                        { player: "{p:Secret} switch to {p:Secret}" },
                        { opponent: "{o:Urshifu-S} Wicked Blow {p:Secret} to {+:1}" },
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

  const eliteFourAgathaBattle: Moment = {
    split: "Elite Four",
    label: "Elite Four Agatha Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box2,
      opponentBox: eliteFourAgathaBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Krookodile"],
              turns: [
                [
                  { player: "{p:Secret} Tackle {o:Krookodile} to {=:0}" },
                  { opponent: "{o:Krookodile} fainted" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const eliteFourLanceBattle: Moment = {
    split: "Elite Four",
    label: "Elite Four Lance Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box2,
      opponentBox: eliteFourLanceBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Glimmora"],
              turns: [
                [
                  { player: "{p:Secret} Tackle {o:Glimmora} to {=:0}" },
                  { opponent: "{o:Glimmora} Toxic Debris" },
                  { opponent: "{o:Glimmora} fainted" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const eliteFourLanceBoxChange: Moment = {
    split: "Elite Four",
    label: "Elite Four Lance Box Change",
    kind: "boxChange",
  };

  const championRivalBattle: Moment = {
    split: "Elite Four",
    label: "Champion Rival Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box2,
      opponentBox: championRivalBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Kyogre-P"],
              turns: [
                [
                  { player: "{p:Secret} Fake Out {o:Kyogre-P} to {-:290}" },
                  { opponent: "{o:Kyogre-P} flinched" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  return {
    eliteFourChecklist,
    eliteFourLoreleiBattle,
    eliteFourBrunoBattle,
    eliteFourAgathaBattle,
    eliteFourLanceBattle,
    eliteFourLanceBoxChange,
    championRivalBattle,
    box: _box2,
  };
}
