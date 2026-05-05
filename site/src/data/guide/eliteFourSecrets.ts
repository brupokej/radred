import { getBox, type Box } from "@site/src/utils/box";
import type { Moment } from "@site/src/utils/moments";
import { eliteFourLoreleiRainBox, eliteFourLoreleiSnowBox } from "@site/src/utils/opponents";

export function getEliteFourSecrets(_box1: Box) {
  const eliteFourBoxChange: Moment = {
    split: "Elite Four",
    label: "Elite Four Box Change",
    kind: "boxChange",
  };

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

  const _box3 = getBox({
    box: _box2,
    team: ["Secret", "Secret", "Secret", "Secret"],
  });

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
            playerBox: _box3,
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
                    matchup: ["Glaceon"],
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

  return {
    eliteFourBoxChange,
    eliteFourChecklist,
    eliteFourLoreleiBattle,
    box: _box1,
  };
}
