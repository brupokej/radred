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

import { box as _box1 } from "@site/src/data/guide/victoryRoad";

const _box2 = getBox({
  box: _box1,
  update: {
    Sceptile: {
      name: "Sceptile-Mega",
      ability: "Technician",
    }
  }
});

const _box3 = getBox({
  box: _box2,
  update: {
    Incineroar: {
      nature: "Relaxed",
      ability: "Intimidate",
      item: undefined,
      moves: ["Fake Out", "Darkest Lariat", "Parting Shot", "U-Turn"]
    },
    "Scream Tail": {
      nature: "Timid",
      ability: "Tangling Hair",
      item: undefined,
      moves: ["Encore", "Moonblast", "Play Rough", "Teleport"]
    },
    "Sceptile-Mega": {
      nature: "Jolly",
      ability: "Technician",
      item: "Sceptilite",
      moves: ["Detect", "Dual Chop", "Leaf Blade", "Leaf Storm"]
    },
    "Darmanitan-GZ": {
      nature: "Adamant",
      ability: "Zen Mode",
      item: undefined,
      moves: ["Fire Punch", "Flare Blitz", "Focus Punch", "Icicle Crash"]
    },
    Floatzel: {
      nature: "Jolly",
      ability: "Technician",
      item: undefined,
      moves: ["Fake Out", "Flip Turn", "Focus Punch", "Surging Strikes"]
    },
    "Thundurus-I": {
      nature: "Lax",
      ability: "Clear Body",
      item: undefined,
      moves: ["Focus Blast", "Psychic", "Thunder Wave", "U-Turn"],
    },
  },
  team: ["Incineroar", "Scream Tail", "Sceptile-Mega", "Darmanitan-GZ", "Floatzel", "Thundurus-I"],
});

export const eliteFourChecklist: Moment = {
  split: "Elite Four",
  label: "Elite Four Checklist",
  kind: "checklist",
  data: {
    playerBox: _box3,
    rows: [
      ["Cinnabar Lab → ", { warning: "Reveal Glass → Bag" }],
      ["Victory Road → ", { warning: "HeavyD. Boots → Bag" }]
    ]
  },
};

const _box4 = getBox({
  box: _box3,
  update: {
    Incineroar: {
      nature: "Relaxed",
      ability: "Intimidate",
      item: "Focus Sash",
      moves: ["Darkest Lariat", "Parting Shot", "Scary Face", "U-Turn"]
    },
    "Thundurus-I": {
      nature: "Lax",
      ability: "Clear Body",
      item: "Choice Scarf",
      moves: ["Focus Blast", "Psychic", "Thunder Wave", "U-Turn"],
    },
    "Sceptile-Mega": {
      nature: "Jolly",
      ability: "Technician",
      item: "Sceptilite",
      moves: ["Detect", "Dual Chop", "Leaf Blade", "Leaf Storm"],
    },
    Floatzel: {
      nature: "Jolly",
      ability: "Technician",
      item: "Wacan Berry",
      moves: ["Fake Out", "Flip Turn", "Focus Punch", "Surging Strikes"]
    },
    "Scream Tail": {
      nature: "Timid",
      ability: "Tangling Hair",
      item: undefined,
      moves: ["Encore", "Moonblast", "Play Rough", "Teleport"]
    },
    "Darmanitan-GZ": {
      nature: "Adamant",
      ability: "Zen Mode",
      item: undefined,
      moves: ["Fire Punch", "Flare Blitz", "Focus Punch", "Icicle Crash"]
    },
  },
  team: [
    "Incineroar",
    "Thundurus-I",
    "Sceptile-Mega",
    "Floatzel",
    { name: "Scream Tail", extra: true },
    { name: "Darmanitan-GZ", extra: true }
  ],
});

const _box5 = getBox({
  box: _box3,
  update: {
    Incineroar: {
      nature: "Relaxed",
      ability: "Intimidate",
      item: undefined,
      moves: ["Fake Out", "Overheat", "Parting Shot", "U-Turn"]
    },
    Floatzel: {
      nature: "Jolly",
      ability: "Technician",
      item: "Yache Berry",
      moves: ["Aqua Jet", "Flip Turn", "Focus Punch", "Surging Strikes"]
    },
    "Thundurus-I": {
      nature: "Lax",
      ability: "Clear Body",
      item: "Focus Sash",
      moves: ["Focus Blast", "Psychic", "Thunder Wave", "U-Turn"],
    },
    "Scream Tail": {
      nature: "Timid",
      ability: "Tangling Hair",
      item: "Life Orb",
      moves: ["Encore", "Moonblast", "Play Rough", "Teleport"]
    },
    "Darmanitan-GZ": {
      nature: "Adamant",
      ability: "Zen Mode",
      item: "Choice Scarf",
      moves: ["Fire Punch", "Flare Blitz", "Focus Punch", "Icicle Crash"]
    },
    "Sceptile-Mega": {
      nature: "Jolly",
      ability: "Technician",
      item: "Sceptilite",
      moves: ["Detect", "Dual Chop", "Leaf Blade", "Leaf Storm"],
    },
  },
  team: ["Incineroar", "Floatzel", "Thundurus-I", "Scream Tail", "Darmanitan-GZ", "Sceptile-Mega"],
});

export const eliteFourLoreleiBattle: Moment = {
  split: "Elite Four",
  label: "Elite Four Lorelei Battle",
  kind: "switchBattle",
  secret: true,
  data: {
    cases: [
      {
        label: "50% → Rain matchup",
        data: {
          playerBox: _box4,
          opponentBox: eliteFourLoreleiRainBox,
          lines: [
            {
              matchups: [
                {
                  matchup: ["Iron Bundle", "Ludicolo"],
                  turns: [
                    [
                      { player: "{p:Thundurus-I} switch to {p:Sceptile-Mega}" },
                      { opponent: "{o:Ludicolo} Fake Out {p:Sceptile-Mega} to {+:197}" },
                      { opponent: "{o:Iron Bundle} Hydro Pump {p:Sceptile-Mega} to {+:104}" },
                      { player: "{p:Incineroar} Scary Face {o:Iron Bundle}" },
                    ],
                    [
                      { player: "{p:Sceptile-Mega} Detect" },
                      { opponent: "{o:Ludicolo} Ice Beam {p:Sceptile-Mega}" },
                      { opponent: "{o:Iron Bundle} Hydro Pump {p:Incineroar} to {+:1}" },
                      { player: "{p:Incineroar} U-Turn {o:Ludicolo} to {-:127}" },
                      { player: "{p:Incineroar} switch to {p:Thundurus-I}" },
                    ],
                    [
                      { player: "{p:Thundurus-I} U-Turn {o:Ludicolo} to {=:0}" },
                      { opponent: "{o:Ludicolo} fainted" },
                      { player: "{p:Thundurus-I} switch to {p:Floatzel}" },
                      { player: "{p:Sceptile-Mega} Leaf Storm {o:Iron Bundle} to {=:0}" },
                      { opponent: "{o:Iron Bundle} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Genesect", "Palkia-O"],
                  turns: [
                    [
                      { player: "{p:Sceptile-Mega} mega evolve" },
                      { player: "{p:Sceptile-Mega} Dual Chop {o:Palkia-O} to {=:0}" },
                      { opponent: "{o:Palkia-O} fainted" },
                      { player: "{p:Floatzel} Surging Strikes {o:Genesect} to {=:0}" },
                      { opponent: "{o:Genesect} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Dragonite", "Swampert-Mega"],
                  turns: [
                    [
                      { player: "{p:Floatzel} switch to {p:Thundurus-I}" },
                      { opponent: "{o:Swampert-Mega} mega evolve" },
                      { player: "{p:Sceptile-Mega} Detect" },
                      { opponent: "{o:Swampert-Mega} Earthquake {p:Thundurus-I} and {p:Sceptile-Mega} and {o:Dragonite}" },
                      { opponent: "{o:Dragonite} Hurricane {p:Sceptile-Mega}" },
                    ],
                    [
                      { player: "{p:Thundurus-I} U-Turn {o:Dragonite} to {-:262}" },
                      { player: "{p:Thundurus-I} switch to {p:Floatzel}" },
                      { player: "{p:Sceptile-Mega} Leaf Blade {o:Swampert-Mega} to {=:0}" },
                      { opponent: "{o:Swampert-Mega} fainted" },
                      { opponent: "{o:Dragonite} Aqua Tail {p:Floatzel} to {+:112}" },
                    ],
                  ],
                },
                {
                  matchup: ["Dragonite"],
                  turns: [
                    [
                      { player: "{p:Floatzel} Fake Out {o:Dragonite} to {-:222}" },
                      { player: "{p:Sceptile-Mega} Dual Chop {o:Dragonite} to {=:0}" },
                      { opponent: "{o:Dragonite} fainted" },
                    ],
                  ],
                }
              ],
              frags: { "Thundurus-I": 1, "Sceptile-Mega": 4, Floatzel: 1 }
            },
          ],
        },
      },
      {
        label: "50% → Snow matchup",
        data: {
          playerBox: _box5,
          opponentBox: eliteFourLoreleiSnowBox,
          lines: [
            {
              matchups: [
                {
                  matchup: ["Landorus-T", "Glaceon"],
                  turns: [
                    [
                      { player: "{p:Incineroar} Fake Out {o:Glaceon} to {-:244}" },
                      { opponent: "{o:Glaceon} flinched" },
                      { player: "{p:Floatzel} Surging Strikes {o:Landorus-T} to {=:0}" },
                      { opponent: "{o:Landorus-T} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Tapu Fini", "Glaceon"],
                  turns: [
                    [
                      { opponent: "{o:Glaceon} Blizzard {p:Floatzel} to {+:26} and {p:Incineroar} to {+:131}" },
                      { player: "{p:Floatzel} Flip Turn {o:Glaceon} to {-:210}" },
                      { player: "{p:Floatzel} switch to {p:Thundurus-I}" },
                      { opponent: "{o:Tapu Fini} Calm Mind" },
                      { player: "{p:Incineroar} Overheat {o:Glaceon} to {=:0}" },
                      { opponent: "{o:Glaceon} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Tapu Fini", "Chien-Pao"],
                  turns: [
                    [
                      { player: "{p:Incineroar} switch to {p:Scream Tail}" },
                      { opponent: "{o:Chien-Pao} Sacred Sword {p:Scream Tail} to {+:277}" },
                      { player: "{p:Thundurus-I} U-Turn {o:Chien-Pao} to {-:179}" },
                      { player: "{p:Thundurus-I} switch to {p:Darmanitan-GZ}" },
                      { opponent: "{o:Tapu Fini} Calm Mind" },
                    ],
                    [
                      { player: "{p:Darmanitan-GZ} Flare Blitz {o:Chien-Pao} to {=:0}" },
                      { opponent: "{p:Darmanitan-GZ} recoil to {+:253}" },
                      { opponent: "{o:Chien-Pao} fainted" },
                      { player: "{p:Scream Tail} Encore {o:Tapu Fini}" },
                      { opponent: "{o:Tapu Fini} Calm Mind" },
                    ],
                  ],
                  branches: [
                    {
                      branches: [
                        "50% → Kyurem-W matchup",
                        "50% → Abomasnow-Mega matchup",
                      ],
                    },
                  ],
                },
              ],
              frags: { Floatzel: 1, Incineroar: 1, "Darmanitan-GZ": 1 }
            },
            {
              line: "50% → Kyurem-W matchup",
              matchups: [
                {
                  matchup: ["Tapu Fini", "Kyurem-W"],
                  turns: [],
                  branches: [
                    {
                      branches: [
                        "80% → Tapu Fini switch to Abomasnow-Mega",
                        "20% → Tapu Fini Calm Mind",
                      ],
                    },
                  ],
                },
              ],
            },
            {
              line: "80% → Tapu Fini switch to Abomasnow-Mega",
              matchups: [
                {
                  matchup: ["Tapu Fini", "Kyurem-W"],
                  turns: [                      
                    [
                      { opponent: "{o:Tapu Fini} switch to {o:Abomasnow-Mega}" },
                      { player: "{p:Darmanitan-GZ} Flare Blitz {o:Kyurem-W} to {-:198}" },
                      { opponent: "{p:Darmanitan-GZ} recoil to {+:174}" },
                      { player: "{p:Scream Tail} Moonblast {o:Kyurem-W} to {=:0}" },
                      { opponent: "{p:Scream Tail} Life Orb to {+:246}" },
                      { opponent: "{o:Kyurem-W} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Abomasnow-Mega", "Tapu Fini"],
                  turns: [                      
                    [
                      { opponent: "{o:Abomasnow-Mega} mega evolve" },
                      { player: "{p:Darmanitan-GZ} Flare Blitz {o:Abomasnow-Mega} to {=:0}" },
                      { opponent: "{p:Darmanitan-GZ} recoil to {+:83}" },
                      { opponent: "{o:Abomasnow-Mega} fainted" },
                      { player: "{p:Scream Tail} Encore {o:Tapu Fini}" },
                      { opponent: "{o:Tapu Fini} Calm Mind" },
                    ],
                  ],
                  branches: [{ branches: ["Darmanitan-GZ switch to Sceptile-Mega"] }],
                },
              ],
              frags: { "Scream Tail": 1, "Darmanitan-GZ": 1 }
            },
            {
              line: "20% → Tapu Fini Calm Mind",
              matchups: [
                {
                  matchup: ["Tapu Fini", "Kyurem-W"],
                  turns: [                      
                    [
                      { player: "{p:Darmanitan-GZ} Flare Blitz {o:Kyurem-W} to {-:198}" },
                      { opponent: "{p:Darmanitan-GZ} recoil to {+:174}" },
                      { player: "{p:Scream Tail} Moonblast {o:Kyurem-W} to {=:0}" },
                      { opponent: "{p:Scream Tail} Life Orb to {+:246}" },
                      { opponent: "{o:Kyurem-W} fainted" },
                      { opponent: "{o:Tapu Fini} Calm Mind" },
                    ],
                  ],
                },
                {
                  matchup: ["Tapu Fini", "Abomasnow-Mega"],
                  turns: [                      
                    [
                      { opponent: "{o:Abomasnow-Mega} mega evolve" },
                      { player: "{p:Darmanitan-GZ} Flare Blitz {o:Abomasnow-Mega} to {=:0}" },
                      { opponent: "{p:Darmanitan-GZ} recoil to {+:83}" },
                      { opponent: "{o:Abomasnow-Mega} fainted" },
                      { player: "{p:Scream Tail} Encore {o:Tapu Fini}" },
                      { opponent: "{o:Tapu Fini} Calm Mind" },
                    ],
                  ],
                  branches: [{ branches: ["Darmanitan-GZ switch to Sceptile-Mega"] }],
                },
              ],
            },
            {
              line: "50% → Abomasnow-Mega matchup",
              matchups: [
                {
                  matchup: ["Tapu Fini", "Abomasnow-Mega"],
                  turns: [],
                  branches: [
                    {
                      branches: [
                        "80% → Tapu Fini switch to Kyurem-W",
                        "20% → Tapu Fini Calm Mind 2",
                      ],
                    },
                  ],
                },
              ],
            },
            {
              line: "80% → Tapu Fini switch to Kyurem-W",
              matchups: [
                {
                  matchup: ["Tapu Fini", "Abomasnow-Mega"],
                  turns: [                      
                    [
                      { opponent: "{o:Tapu Fini} switch to {o:Kyurem-W}" },
                      { opponent: "{o:Abomasnow-Mega} mega evolve" },
                      { player: "{p:Darmanitan-GZ} Flare Blitz {o:Abomasnow-Mega} to {=:0}" },
                      { opponent: "{p:Darmanitan-GZ} recoil to {+:162}" },
                      { opponent: "{o:Abomasnow-Mega} fainted" },
                      { player: "{p:Scream Tail} Encore {o:Kyurem-W}" },
                    ],
                  ],
                },
                {
                  matchup: ["Kyurem-W", "Tapu Fini"],
                  turns: [                      
                    [
                      { player: "{p:Darmanitan-GZ} Flare Blitz {o:Kyurem-W} to {-:198}" },
                      { opponent: "{p:Darmanitan-GZ} recoil to {+:83}" },
                      { player: "{p:Scream Tail} Moonblast {o:Kyurem-W} to {=:0}" },
                      { opponent: "{p:Scream Tail} Life Orb to {+:246}" },
                      { opponent: "{o:Kyurem-W} fainted" },
                      { opponent: "{o:Tapu Fini} Calm Mind" },
                    ],
                  ],
                  branches: [{ branches: ["Darmanitan-GZ switch to Sceptile-Mega"] }],
                },
              ],
              frags: { "Scream Tail": 1, "Darmanitan-GZ": 1 }
            },
            {
              line: "20% → Tapu Fini Calm Mind 2",
              label: "20% → Tapu Fini Calm Mind",
              matchups: [
                {
                  matchup: ["Tapu Fini", "Abomasnow-Mega"],
                  turns: [                      
                    [
                      { opponent: "{o:Abomasnow-Mega} mega evolve" },
                      { player: "{p:Darmanitan-GZ} Flare Blitz {o:Abomasnow-Mega} to {=:0}" },
                      { opponent: "{p:Darmanitan-GZ} recoil to {+:162}" },
                      { opponent: "{o:Abomasnow-Mega} fainted" },
                      { player: "{p:Scream Tail} Encore {o:Tapu Fini}" },
                      { opponent: "{o:Tapu Fini} Calm Mind" },
                    ],
                  ],
                },
                {
                  matchup: ["Tapu Fini", "Kyurem-W"],
                  turns: [                      
                    [
                      { player: "{p:Darmanitan-GZ} Flare Blitz {o:Kyurem-W} to {-:198}" },
                      { opponent: "{p:Darmanitan-GZ} recoil to {+:83}" },
                      { player: "{p:Scream Tail} Moonblast {o:Kyurem-W} to {=:0}" },
                      { opponent: "{p:Scream Tail} Life Orb to {+:246}" },
                      { opponent: "{o:Kyurem-W} fainted" },
                      { opponent: "{o:Tapu Fini} Calm Mind" },
                    ],
                  ],
                  branches: [{ branches: ["Darmanitan-GZ switch to Sceptile-Mega"] }],
                },
              ],
            },
            {
              line: "Darmanitan-GZ switch to Sceptile-Mega",
              matchups: [
                {
                  matchup: ["Tapu Fini"],
                  turns: [                      
                    [
                      { player: "{p:Darmanitan-GZ} switch to {p:Sceptile-Mega}" },
                      { player: "{p:Scream Tail} Encore {o:Tapu Fini}" },
                      { opponent: "{o:Tapu Fini} Calm Mind" },
                    ],
                  ],
                  branches: [
                    {
                      branches: [
                        "94% → Sceptile-Mega Leaf Blade Tapu Fini",
                        "6% → Sceptile-Mega Leaf Blade Tapu Fini (to 0)",
                      ],
                    },
                  ],
                },
              ],
            },
            {
              line: "94% → Sceptile-Mega Leaf Blade Tapu Fini",
              matchups: [
                {
                  matchup: ["Tapu Fini"],
                  turns: [
                    [
                      { player: "{p:Sceptile-Mega} mega evolve" },
                      { player: "{p:Sceptile-Mega} Leaf Blade {o:Tapu Fini} to {-:48}" },
                      { player: "{p:Scream Tail} Play Rough {o:Tapu Fini} to {=:0}" },
                      { opponent: "{o:Tapu Fini} fainted" },
                    ],
                  ],
                },
              ],
              frags: { "Scream Tail": 1 }
            },
            {
              line: "6% → Sceptile-Mega Leaf Blade Tapu Fini (to 0)",
              matchups: [
                {
                  matchup: ["Tapu Fini"],
                  turns: [
                    [
                      { player: "{p:Sceptile-Mega} mega evolve" },
                      { player: "{p:Sceptile-Mega} Leaf Blade {o:Tapu Fini} (crit) to {=:0}" },
                      { opponent: "{o:Tapu Fini} fainted" },
                    ],
                  ],
                },
              ],
              frags: { "Sceptile-Mega": 1 }
            }
          ]
        }
      },
    ],
  },
};

const _box6 = getBox({
  box: _box4,
  update: {
    Floatzel: {
      nature: "Jolly",
      ability: "Technician",
      item: "Life Orb",
      moves: ["Fake Out", "Flip Turn", "Focus Punch", "Surging Strikes"]
    },
    Incineroar: {
      nature: "Relaxed",
      ability: "Intimidate",
      item: "Focus Sash",
      moves: ["Acrobatics", "Bulldoze", "Darkest Lariat", "Parting Shot"]
    },
    "Darmanitan-GZ": {
      nature: "Adamant",
      ability: "Zen Mode",
      item: "Life Orb",
      moves: ["Fire Punch", "Flare Blitz", "Focus Punch", "Icicle Crash"]
    },
    "Scream Tail": {
      nature: "Timid",
      ability: "Tangling Hair",
      item: undefined,
      moves: ["Encore", "Rock Tomb", "Teleport", "Wish"]
    },
    "Thundurus-I": {
      nature: "Lax",
      ability: "Clear Body",
      item: "Magnet",
      moves: ["Dark Pulse", "Psychic", "Thunder", "Volt Switch"]
    },
    "Sceptile-Mega": {
      nature: "Jolly",
      ability: "Technician",
      item: "Sceptilite",
      moves: ["Detect", "Dual Chop", "Leaf Blade", "Leaf Storm"],
    },
  },
  team: [
    "Floatzel",
    "Incineroar",
    "Darmanitan-GZ",
    "Scream Tail",
    "Thundurus-I",
    { name: "Sceptile-Mega", extra: true }
  ]
});

const _box7 = getBox({
  box: _box5,
  update: {
    Floatzel: {
      nature: "Jolly",
      ability: "Technician",
      item: "Life Orb",
      moves: ["Fake Out", "Flip Turn", "Focus Punch", "Surging Strikes"]
    },
    Incineroar: {
      nature: "Relaxed",
      ability: "Intimidate",
      item: "Focus Sash",
      moves: ["Acrobatics", "Bulldoze", "Darkest Lariat", "Parting Shot"]
    },
    "Darmanitan-GZ": {
      nature: "Adamant",
      ability: "Zen Mode",
      item: "Life Orb",
      moves: ["Fire Punch", "Flare Blitz", "Focus Punch", "Icicle Crash"]
    },
    "Scream Tail": {
      nature: "Timid",
      ability: "Tangling Hair",
      item: undefined,
      moves: ["Encore", "Rock Tomb", "Teleport", "Wish"]
    },
    "Thundurus-I": {
      nature: "Lax",
      ability: "Clear Body",
      item: "Magnet",
      moves: ["Dark Pulse", "Psychic", "Thunder", "Volt Switch"]
    },
    "Sceptile-Mega": {
      nature: "Jolly",
      ability: "Technician",
      item: "Sceptilite",
      moves: ["Detect", "Dual Chop", "Leaf Blade", "Leaf Storm"],
    },
  },
  team: [
    "Floatzel",
    "Incineroar",
    "Darmanitan-GZ",
    "Scream Tail",
    "Thundurus-I",
    { name: "Sceptile-Mega", extra: true }
  ]
});

export const eliteFourBrunoBattle: Moment = {
  split: "Elite Four",
  label: "Elite Four Bruno Battle",
  kind: "switchBattle",
  secret: true,
  data: {
    cases: [
      {
        label: "50% → Infernape matchup",
        data: {
          playerBoxCases: {
            cases: {
              "50% → Rain matchup": _box6,
              "50% → Snow matchup": _box7,
            },
          },
          opponentBox: eliteFourBrunoInfernapeBox,
          lines: [
            {
              matchups: [
                {
                  matchup: ["Infernape"],
                  turns: [
                    [
                      { player: "{p:Floatzel} Fake Out {o:Infernape} to {-:192}" },
                      { opponent: "{p:Floatzel} Life Orb to {=:239}" },
                      { opponent: "{o:Infernape} flinched" },
                    ],
                    [
                      { player: "{p:Floatzel} Flip Turn {o:Infernape} to {=:0}" },
                      { opponent: "{p:Floatzel} Life Orb to {=:213}" },
                      { opponent: "{o:Infernape} fainted" },
                      { player: "{p:Floatzel} switch to {p:Incineroar}" },
                    ],
                  ],
                },
                {
                  matchup: ["Zacian-C"],
                  turns: [
                    [
                      { opponent: "{o:Zacian-C} Swords Dance" },
                      { player: "{p:Incineroar} Bulldoze {o:Zacian-C} to {-:201}" },
                    ],
                    [
                      { opponent: "{o:Zacian-C} Close Combat {p:Incineroar} to {=:1}" },
                      { player: "{p:Incineroar} Parting Shot {o:Zacian-C}" },
                      { player: "{p:Incineroar} switch to {p:Darmanitan-GZ}" },
                    ],
                    [
                      { player: "{p:Darmanitan-GZ} Fire Punch {o:Zacian-C} to {=:0}" },
                      { opponent: "{p:Darmanitan-GZ} Life Orb to {=:270}" },
                      { opponent: "{o:Zacian-C} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Zeraora"],
                  turns: [
                    [
                      { player: "{p:Darmanitan-GZ} switch to {p:Scream Tail}" },
                      { opponent: "{o:Zeraora} Knock Off {p:Scream Tail} to {+:237}" },
                    ],
                    [
                      { player: "{p:Scream Tail} Wish" },
                      { opponent: "{o:Zeraora} Bulk Up" },
                    ],
                    [
                      { player: "{p:Scream Tail} Rock Tomb {o:Zeraora} to {-:250}" },
                      { opponent: "{o:Zeraora} Bulk Up" },
                      { opponent: "{p:Scream Tail} recover to {=:316}" },
                    ],
                    [
                      { player: "{p:Scream Tail} Wish" },
                      { opponent: "{o:Zeraora} Bulk Up" },
                    ],
                    [
                      { player: "{p:Scream Tail} switch to {p:Floatzel}" },
                      { opponent: "{o:Zeraora} Bulk Up" },
                      { opponent: "{p:Floatzel} recover to {=:265}" },
                    ],
                    [
                      { player: "{p:Floatzel} Fake Out {o:Zeraora} to {-:231}" },
                      { opponent: "{p:Floatzel} Life Orb to {=:239}" },
                      { opponent: "{o:Zeraora} flinched" },
                    ],
                    [
                      { player: "{p:Floatzel} Surging Strikes {o:Zeraora} to {=:0}" },
                      { opponent: "{p:Floatzel} Life Orb to {=:213}" },
                      { opponent: "{o:Zeraora} fainted" },
                    ],
                  ]
                },
                {
                  matchup: ["Iron Valiant"],
                  turns: [
                    [
                      { player: "{p:Floatzel} switch to {p:Scream Tail}" },
                      { opponent: "{o:Iron Valiant} Calm Mind" },
                    ],
                    [
                      { opponent: "{o:Iron Valiant} Calm Mind" },
                      { player: "{p:Scream Tail} Rock Tomb {o:Iron Valiant} to {-:234}" },
                    ],
                    [
                      { player: "{p:Scream Tail} switch to {p:Darmanitan-GZ}" },
                      { opponent: "{o:Iron Valiant} Calm Mind" },
                    ],
                    [
                      { player: "{p:Darmanitan-GZ} Flare Blitz {o:Iron Valiant} to {=:0}" },
                      { opponent: "{p:Darmanitan-GZ} recoil to {+:192}" },
                      { opponent: "{p:Darmanitan-GZ} Life Orb to {+:163}" },
                      { opponent: "{o:Iron Valiant} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Necrozma-DM"],
                  turns: [
                    [
                      { player: "{p:Darmanitan-GZ} Flare Blitz {o:Necrozma-DM} to {=:0}" },
                      { opponent: "{p:Darmanitan-GZ} recoil to {+:68}" },
                      { opponent: "{p:Darmanitan-GZ} Life Orb to {+:39}" },
                      { opponent: "{o:Necrozma-DM} fainted" },
                    ],
                  ]
                },
                {
                  matchup: ["Lucario-Mega"],
                  turns: [
                    [
                      { player: "{p:Darmanitan-GZ} switch to {p:Thundurus-I}" },
                      { opponent: "{o:Lucario-Mega} mega evolve" },
                      { opponent: "{o:Lucario-Mega} Bullet Punch {p:Thundurus-I} to {+:180}" },
                    ],
                    [
                      { opponent: "{o:Lucario-Mega} Swords Dance" },
                      { player: "{p:Thundurus-I} Volt Switch {o:Lucario-Mega} to {-:114}" },
                      { player: "{p:Thundurus-I} switch to {p:Floatzel}" },
                    ],
                    [
                      { player: "{p:Floatzel} Surging Strikes {o:Lucario-Mega} to {=:0}" },
                      { opponent: "{p:Floatzel} Life Orb to {=:187}" },
                      { opponent: "{o:Lucario-Mega} fainted" },
                    ],
                  ],
                },
              ],
              frags: { Floatzel: 3, "Darmanitan-GZ": 3 }
            }
          ],
        },
      },
      {
        label: "50% → Urshifu-S matchup",
        data: {
          playerBoxCases: {
            cases: {
              "50% → Rain matchup": _box6,
              "50% → Snow matchup": _box7,
            },
          },
          opponentBox: eliteFourBrunoUrshifuSBox,
          lines: [
            {
              matchups: [
                {
                  matchup: ["Urshifu-S"],
                  turns: [
                    [
                      { player: "{p:Floatzel} Flip Turn {o:Urshifu-S} to {-:192}" },
                      { opponent: "{p:Floatzel} Life Orb to {=:239}" },
                      { player: "{p:Floatzel} switch to {p:Thundurus-I}" },
                      { opponent: "{o:Urshifu-S} Close Combat {p:Thundurus-I} to {+:106}" },
                    ],
                    [
                      { player: "{p:Thundurus-I} Volt Switch {o:Urshifu-S} to {=:0}" },
                      { opponent: "{o:Urshifu-S} fainted" },
                      { player: "{p:Thundurus-I} switch to {p:Incineroar}" },
                    ],
                  ],
                },
                {
                  matchup: ["Zacian-C"],
                  turns: [
                    [
                      { opponent: "{o:Zacian-C} Swords Dance" },
                      { player: "{p:Incineroar} Bulldoze {o:Zacian-C} to {-:201}" },
                    ],
                    [
                      { opponent: "{o:Zacian-C} Close Combat {p:Incineroar} to {=:1}" },
                      { player: "{p:Incineroar} Parting Shot {o:Zacian-C}" },
                      { player: "{p:Incineroar} switch to {p:Darmanitan-GZ}" },
                    ],
                    [
                      { player: "{p:Darmanitan-GZ} Fire Punch {o:Zacian-C} to {=:0}" },
                      { opponent: "{p:Darmanitan-GZ} Life Orb to {=:270}" },
                      { opponent: "{o:Zacian-C} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Hawlucha"],
                  turns: [
                    [
                      { player: "{p:Darmanitan-GZ} switch to {p:Scream Tail}" },
                      { opponent: "{o:Hawlucha} Close Combat {p:Scream Tail} to {+:265}" },
                    ],
                    [
                      { opponent: "{o:Hawlucha} Swords Dance" },
                      { player: "{p:Scream Tail} Rock Tomb {o:Hawlucha} to {-:223}" },
                    ],
                    [
                      { player: "{p:Scream Tail} switch to {p:Floatzel}" },
                      { opponent: "{o:Hawlucha} Swords Dance" },
                    ],
                    [
                      { player: "{p:Floatzel} Surging Strikes {o:Hawlucha} to {=:0}" },
                      { opponent: "{p:Floatzel} Life Orb to {=:213}" },
                      { opponent: "{o:Hawlucha} fainted" },
                    ],
                  ]
                },
                {
                  matchup: ["Iron Valiant"],
                  turns: [
                    [
                      { player: "{p:Floatzel} switch to {p:Scream Tail}" },
                      { opponent: "{o:Iron Valiant} Calm Mind" },
                    ],
                    [
                      { opponent: "{o:Iron Valiant} Calm Mind" },
                      { player: "{p:Scream Tail} Rock Tomb {o:Iron Valiant} to {-:234}" },
                    ],
                    [
                      { player: "{p:Scream Tail} switch to {p:Darmanitan-GZ}" },
                      { opponent: "{o:Iron Valiant} Calm Mind" },
                    ],
                    [
                      { player: "{p:Darmanitan-GZ} Flare Blitz {o:Iron Valiant}" },
                      { opponent: "{p:Darmanitan-GZ} recoil to {+:192}" },
                      { opponent: "{p:Darmanitan-GZ} Life Orb to {+:163}" },
                      { opponent: "{o:Iron Valiant} fainted" },
                    ],
                  ]
                },
                {
                  matchup: ["Necrozma-DM"],
                  turns: [
                    [
                      { player: "{p:Darmanitan-GZ} Flare Blitz {o:Necrozma-DM}" },
                      { opponent: "{p:Darmanitan-GZ} recoil to {+:68}" },
                      { opponent: "{p:Darmanitan-GZ} Life Orb to {+:39}" },
                      { opponent: "{o:Necrozma-DM} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Medicham-Mega"],
                  turns: [
                    [
                      { player: "{p:Darmanitan-GZ} switch to {p:Floatzel}" },
                      { opponent: "{o:Medicham-Mega} mega evolve" },
                      { opponent: "{o:Medicham-Mega} Fake Out {p:Floatzel} to {+:71}" },
                    ],
                    [
                      { player: "{p:Floatzel} Fake Out {o:Medicham-Mega} to {-:172}" },
                      { opponent: "{p:Floatzel} Life Orb to {+:45}" },
                      { opponent: "{o:Medicham-Mega} flinched" },
                    ],
                    [
                      { player: "{p:Floatzel} Surging Strikes {o:Medicham-Mega} to {=:0}" },
                      { opponent: "{p:Floatzel} Life Orb to {+:19}" },
                      { opponent: "{o:Medicham-Mega} fainted" },
                    ],
                  ],
                },
              ],
            },
          ],
          frags: { "Thundurus-I": 1, "Darmanitan-GZ": 3, Floatzel: 2 }
        },
      },
    ],
  },
};

const _box8 = getBox({
  box: _box7,
  update: {
    Floatzel: {
      nature: "Jolly",
      ability: "Technician",
      item: "Choice Band",
      moves: ["Fake Out", "Flip Turn", "Focus Punch", "Surging Strikes"]
    },
    Incineroar: {
      nature: "Relaxed",
      ability: "Intimidate",
      item: "Focus Sash",
      moves: ["Darkest Lariat", "Parting Shot", "Scary Face", "U-Turn"]
    },
    "Thundurus-I": {
      nature: "Lax",
      ability: "Clear Body",
      item: "Charti Berry",
      moves: ["Dark Pulse", "Thunder Wave", "Volt Switch", "Wild. Storm"]
    },
    "Scream Tail": {
      nature: "Timid",
      ability: "Tangling Hair",
      item: "Expert Belt",
      moves: ["Crunch", "Encore", "Rock Tomb", "Teleport"]
    },
    "Sceptile-Mega": {
      nature: "Jolly",
      ability: "Technician",
      item: "Sceptilite",
      moves: ["Cut", "Dual Chop", "Leaf Blade", "Leaf Storm"]
    },
    "Darmanitan-GZ": {
      nature: "Adamant",
      ability: "Zen Mode",
      item: "Life Orb",
      moves: ["Earthquake", "Flare Blitz", "Focus Punch", "Icicle Crash"]
    }
  },
  team: ["Floatzel", "Incineroar", "Thundurus-I", "Scream Tail", "Sceptile-Mega", "Darmanitan-GZ"],
});

export const eliteFourAgathaBattle: Moment = {
  split: "Elite Four",
  label: "Elite Four Agatha Battle",
  kind: "battle",
  secret: true,
  data: {
    playerBox: _box8,
    opponentBox: eliteFourAgathaBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Krookodile"],
            turns: [
              [
                { player: "{p:Floatzel} Surging Strikes {o:Krookodile} to {=:0}" },
                { opponent: "{o:Krookodile} fainted" },
              ],
            ],
          },
          {
            matchup: ["Mewtwo-MegaX"],
            turns: [
              [
                { player: "{p:Floatzel} switch to {p:Incineroar}" },
                { opponent: "{o:Mewtwo-MegaX} mega evolve" },
                { opponent: "{o:Mewtwo-MegaX} Expand. Force {p:Incineroar}" },
              ],
              [
                { opponent: "{o:Mewtwo-MegaX} Bulk Up" },
                { player: "{p:Incineroar} Parting Shot {o:Mewtwo-MegaX}" },
                { player: "{p:Incineroar} switch to {p:Thundurus-I}" },
              ],
              [
                { opponent: "{o:Mewtwo-MegaX} Bulk Up" },
                { player: "{p:Thundurus-I} Thunder Wave {o:Mewtwo-MegaX}" },
              ],
            ],
            branches: [
              {
                branches: [
                  "75% → Mewtwo-MegaX Bulk Up",
                  "25% → Mewtwo-MegaX fully paralyze",
                ],
              },
            ],
          },
        ],
        frags: { Floatzel: 1 }
      },
      {
        line: "75% → Mewtwo-MegaX Bulk Up",
        matchups: [
          {
            matchup: ["Mewtwo-MegaX"],
            turns: [
              [
                { player: "{p:Thundurus-I} Volt Switch {o:Mewtwo-MegaX} to {-:213}" },
                { player: "{p:Thundurus-I} switch to {p:Scream Tail}" },
                { opponent: "{o:Mewtwo-MegaX} Bulk Up" },
              ],
              { anchor: "Scream Tail Encore Mewtwo-MegaX" },
              [
                { player: "{p:Scream Tail} Encore {o:Mewtwo-MegaX}" },
                { opponent: "{o:Mewtwo-MegaX} Bulk Up" },
              ],
            ],
            branches: [
              {
                branches: [
                  "80% → Mewtwo-MegaX switch to Flutter Mane",
                  "20% → Mewtwo-MegaX Bulk Up",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "25% → Mewtwo-MegaX fully paralyze",
        matchups: [
          {
            matchup: ["Mewtwo-MegaX"],
            turns: [
              [
                { player: "{p:Thundurus-I} Volt Switch {o:Mewtwo-MegaX} to {-:213}" },
                { player: "{p:Thundurus-I} switch to {p:Scream Tail}" },
                { opponent: "{o:Mewtwo-MegaX} fully paralyze" },
              ],
              { anchor: "Scream Tail Rock Tomb Mewtwo-MegaX" },
            ],
            branches: [
              {
                branches: [
                  "75% → Mewtwo-MegaX Bulk Up 2",
                  "25% → Mewtwo-MegaX fully paralyze 2",
                ],
              },
            ],
          }
        ],
      },
      {
        line: "75% → Mewtwo-MegaX Bulk Up 2",
        label: "75% → Mewtwo-MegaX Bulk Up",
        matchups: [
          {
            matchup: ["Mewtwo-MegaX"],
            turns: [
              [
                { player: "{p:Scream Tail} Rock Tomb {o:Mewtwo-MegaX} to {-:210}" },
                { opponent: "{o:Mewtwo-MegaX} Bulk Up" },
              ],
              { anchor: "Scream Tail Encore Mewtwo-MegaX" },
              [
                { player: "{p:Scream Tail} Encore {o:Mewtwo-MegaX}" },
                { opponent: "{o:Mewtwo-MegaX} Bulk Up" },
              ],
            ],
            branches: [
              {
                branches: [
                  "80% → Mewtwo-MegaX switch to Flutter Mane",
                  "20% → Mewtwo-MegaX Bulk Up 2",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "25% → Mewtwo-MegaX fully paralyze 2",
        label: "25% → Mewtwo-MegaX fully paralyze",
        matchups: [
          {
            matchup: ["Mewtwo-MegaX"],
            turns: [
              [
                { player: "{p:Scream Tail} Rock Tomb {o:Mewtwo-MegaX} to {-:210}" },
                { opponent: "{o:Mewtwo-MegaX} fully paralyze" },
              ],
              ["Risk →", { danger: "Scream Tail Rock Tomb Mewtwo-MegaX (to 0) → {c:0.0001%↓}" }],
              { loop: "Scream Tail Rock Tomb Mewtwo-MegaX" },
            ],
          }
        ],
      },
      {
        line: "20% → Mewtwo-MegaX Bulk Up",
        matchups: [
          {
            matchup: ["Mewtwo-MegaX"],
            turns: [
              [
                { player: "{p:Scream Tail} Rock Tomb {o:Mewtwo-MegaX} to {-:210}" },
                { opponent: "{o:Mewtwo-MegaX} Bulk Up" },
              ],
              { anchor: "Scream Tail Rock Tomb Mewtwo-MegaX" },
            ],
            branches: [
              {
                branches: [
                  "80% → Mewtwo-MegaX switch to Flutter Mane",
                  "15% → Mewtwo-MegaX Bulk Up",
                  "5% → Mewtwo-MegaX fully paralyze",
                ],
              },
            ],
          }
        ],
      },
      {
        line: "20% → Mewtwo-MegaX Bulk Up 2",
        label: "20% → Mewtwo-MegaX Bulk Up",
        matchups: [
          {
            matchup: ["Mewtwo-MegaX"],
            turns: [
              [
                { player: "{p:Scream Tail} Rock Tomb {o:Mewtwo-MegaX} to {-:207}" },
                { opponent: "{o:Mewtwo-MegaX} Bulk Up" },
              ],
              { anchor: "Scream Tail Rock Tomb Mewtwo-MegaX" },
            ],
            branches: [
              {
                branches: [
                  "80% → Mewtwo-MegaX switch to Flutter Mane",
                  "15% → Mewtwo-MegaX Bulk Up 2",
                  "5% → Mewtwo-MegaX fully paralyze 2",
                ],
              },
            ],
          }
        ],
      },
      {
        line: "15% → Mewtwo-MegaX Bulk Up",
        matchups: [
          {
            matchup: ["Mewtwo-MegaX"],
            turns: [
              [
                { player: "{p:Scream Tail} Rock Tomb {o:Mewtwo-MegaX} to {-:207}" },
                { opponent: "{o:Mewtwo-MegaX} Bulk Up" },
              ],
              ["Risk →", { danger: "Scream Tail Rock Tomb Mewtwo-MegaX (to 0) → {c:0.0001%↓}" }],
              { loop: "Scream Tail Encore Mewtwo-MegaX" },
            ],
          }
        ],
      },
      {
        line: "15% → Mewtwo-MegaX Bulk Up 2",
        label: "15% → Mewtwo-MegaX Bulk Up",
        matchups: [
          {
            matchup: ["Mewtwo-MegaX"],
            turns: [
              [
                { player: "{p:Scream Tail} Rock Tomb {o:Mewtwo-MegaX} to {-:204}" },
                { opponent: "{o:Mewtwo-MegaX} Bulk Up" },
              ],
              ["Risk →", { danger: "Scream Tail Rock Tomb Mewtwo-MegaX (to 0) → {c:0.0001%↓}" }],
              { loop: "Scream Tail Encore Mewtwo-MegaX" },
            ],
          }
        ],
      },
      {
        line: "5% → Mewtwo-MegaX fully paralyze",
        matchups: [
          {
            matchup: ["Mewtwo-MegaX"],
            turns: [
              [
                { player: "{p:Scream Tail} Rock Tomb {o:Mewtwo-MegaX} to {-:207}" },
                { opponent: "{o:Mewtwo-MegaX} fully paralyze" },
              ],
              ["Risk →", { danger: "Mewtwo-MegaX Bulk Up ×6 → Mewtwo-MegaX fully paralyze → Mewtwo-MegaX Stone Edge Scream Tail → {c:0.03%}" }],
              { loop: "Scream Tail Rock Tomb Mewtwo-MegaX" },
            ],
          }
        ],
      },
      {
        line: "5% → Mewtwo-MegaX fully paralyze 2",
        label: "5% → Mewtwo-MegaX fully paralyze",
        matchups: [
          {
            matchup: ["Mewtwo-MegaX"],
            turns: [
              [
                { player: "{p:Scream Tail} Rock Tomb {o:Mewtwo-MegaX} to {-:204}" },
                { opponent: "{o:Mewtwo-MegaX} fully paralyze" },
              ],
              ["Risk →", { danger: "Mewtwo-MegaX Bulk Up ×6 → Mewtwo-MegaX fully paralyze → Mewtwo-MegaX Stone Edge Scream Tail → {c:0.03%}" }],
              { loop: "Scream Tail Rock Tomb Mewtwo-MegaX" },
            ],
          }
        ],
      },
      {
        line: "80% → Mewtwo-MegaX switch to Flutter Mane",
        matchups: [
          {
            matchup: ["Mewtwo-MegaX"],
            turns: [
              [
                { opponent: "{o:Mewtwo-MegaX} switch to {o:Flutter Mane}" },
                { player: "{p:Scream Tail} Rock Tomb {o:Flutter Mane} to {-:176}" },
              ],
            ]
          },
          {
            matchup: ["Flutter Mane"],
            turns: [
              [
                { opponent: "{o:Flutter Mane} Shadow Ball {p:Scream Tail} to {+:10}" },
                { player: "{p:Scream Tail} Teleport" },
                { player: "{p:Scream Tail} switch to {p:Sceptile-Mega}" },
              ],
              [
                { player: "{p:Sceptile-Mega} mega evolve" },
                { player: "{p:Sceptile-Mega} Cut {o:Flutter Mane} to {=:0}" },
                { opponent: "{o:Flutter Mane} fainted" },
              ],
            ]
          },
          {
            matchup: ["Calyrex-S"],
            turns: [
              [
                { player: "{p:Sceptile-Mega} switch to {p:Incineroar}" },
                { opponent: "{o:Calyrex-S} Expand. Force {p:Incineroar}" },
              ],
              [
                { opponent: "{o:Calyrex-S} Nasty Plot" },
                { player: "{p:Incineroar} Scary Face {o:Calyrex-S}" },
              ],
              [
                { opponent: "{o:Calyrex-S} Nasty Plot" },
                { player: "{p:Incineroar} U-Turn {o:Calyrex-S} to {-:232}" },
                { player: "{p:Incineroar} switch to {p:Darmanitan-GZ}" },
              ],
              [
                { player: "{p:Darmanitan-GZ} Flare Blitz {o:Calyrex-S} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} recoil to {+:222}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {+:193}" },
                { opponent: "{o:Calyrex-S} fainted" },
              ],
            ],
          },
          {
            matchup: ["Mewtwo-MegaX"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Flare Blitz {o:Mewtwo-MegaX} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} recoil to {+:122}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {+:93}" },
                { opponent: "{o:Mewtwo-MegaX} fainted" },
              ],
            ],
          },
          {
            matchup: ["Yveltal"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Icicle Crash {o:Yveltal} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {+:64}" },
                { opponent: "{o:Yveltal} fainted" },
              ],
            ],
          },
          {
            matchup: ["Victini"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Earthquake {o:Victini} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {+:35}" },
                { opponent: "{o:Victini} fainted" },
              ],
            ],
          }
        ],
        frags: { "Sceptile-Mega": 1, "Darmanitan-GZ": 4 }
      },
    ],
  },
};

const _box9 = getBox({
  box: _box8,
  update: {
    Floatzel: {
      nature: "Jolly",
      ability: "Technician",
      item: "Focus Sash",
      moves: ["Flip Turn", "Focus Punch", "Icy Wind", "Surging Strikes"],
    },
    "Darmanitan-GZ": {
      nature: "Adamant",
      ability: "Zen Mode",
      item: "Life Orb",
      moves: ["Earthquake", "Flare Blitz", "Focus Punch", "Icicle Crash"],
    },
    Incineroar: {
      nature: "Relaxed",
      ability: "Intimidate",
      item: "HeavyD. Boots",
      moves: ["Darkest Lariat", "Parting Shot", "Scary Face", "U-Turn"],
    },
    "Sceptile-Mega": {
      nature: "Jolly",
      ability: "Technician",
      item: "Sceptilite",
      moves: ["Cut", "Dual Chop", "Leaf Blade", "Low Kick"],
    },
    "Scream Tail": {
      nature: "Timid",
      ability: "Tangling Hair",
      item: "HeavyD. Boots",
      moves: ["Dazz. Gleam", "Disable", "Encore", "Teleport"]
    },
    "Thundurus-I": {
      nature: "Lax",
      ability: "Clear Body",
      item: "Black Belt",
      moves: ["Hammer Arm", "Thunder Wave", "Volt Switch", "Wild. Storm"]
    },
  },
  team: [
    "Floatzel",
    "Darmanitan-GZ",
    "Incineroar",
    "Sceptile-Mega",
    "Scream Tail",
    "Thundurus-I",
  ],
});

export const eliteFourLanceBattle: Moment = {
  split: "Elite Four",
  label: "Elite Four Lance Battle",
  kind: "battle",
  secret: true,
  data: {
    playerBox: _box9,
    opponentBox: eliteFourLanceBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Glimmora"],
            turns: [
              [
                { player: "{p:Floatzel} Surging Strikes {o:Glimmora} to {=:0}" },
                { opponent: "{o:Glimmora} Toxic Debris" },
                { opponent: "{o:Glimmora} fainted" },
              ],
            ],
          },
          {
            matchup: ["Arceus-Fairy"],
            turns: [
              [
                { opponent: "{o:Arceus-Fairy} Calm Mind" },
                { player: "{p:Floatzel} Surging Strikes {o:Arceus-Fairy} to {-:198}" },
              ],
              [
                { opponent: "{o:Arceus-Fairy} Calm Mind" },
                { player: "{p:Floatzel} Flip Turn {o:Arceus-Fairy} to {-:132}" },
                { player: "{p:Floatzel} switch to {p:Darmanitan-GZ}" },
                { opponent: "{p:Darmanitan-GZ} badly poison to {=:281}" },
              ],
              [
                { player: "{p:Darmanitan-GZ} Icicle Crash {o:Arceus-Fairy} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:252}" },
                { opponent: "{o:Arceus-Fairy} fainted" },
                { opponent: "{p:Darmanitan-GZ} badly poison to {=:216}" },
              ],
            ],
          },
          {
            matchup: ["Melmetal"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Flare Blitz {o:Melmetal} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} recoil to {=:100}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:71}" },
                { opponent: "{o:Melmetal} fainted" },
                { opponent: "{p:Darmanitan-GZ} badly poison to {=:17}" },
              ],
            ]
          },
          {
            matchup: ["Dragonite"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} switch to {p:Incineroar}" },
                { opponent: "{o:Dragonite} Extreme Speed {p:Incineroar} to {+:159}" },
              ],
              [
                { opponent: "{o:Dragonite} Dragon Dance" },
                { player: "{p:Incineroar} U-Turn {o:Dragonite} to {-:264}" },
                { player: "{p:Incineroar} switch to {p:Sceptile-Mega}" },
                { opponent: "{p:Sceptile-Mega} badly poison to {=:225}" },
              ],
              [
                { player: "{p:Sceptile-Mega} mega evolve" },
                { player: "{p:Sceptile-Mega} Dual Chop {o:Dragonite} to {=:0}" },
                { opponent: "{o:Dragonite} fainted" },
                { opponent: "{p:Sceptile-Mega} badly poison to {=:195}" },
              ],
            ]
          },
          {
            matchup: ["Dialga-P"],
            turns: [
              [
                { player: "{p:Sceptile-Mega} switch to {p:Scream Tail}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail}" },
              ],
              [
                { player: "{p:Scream Tail} Encore {o:Dialga-P}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail}" },
              ],
            ],
            branches: [
              {
                branches: [
                  "94% → Scream Tail Dazz. Gleam Dialga-P",
                  "6% → Scream Tail Dazz. Gleam Dialga-P (crit)",
                ],
              },
            ],
          }
        ],
        frags: { Floatzel: 1, "Darmanitan-GZ": 2, "Sceptile-Mega": 1 }
      },
      {
        line: "94% → Scream Tail Dazz. Gleam Dialga-P",
        matchups: [
          {
            matchup: ["Dialga-P"],
            turns: [
              [
                { player: "{p:Scream Tail} Dazz. Gleam {o:Dialga-P} to {-:243}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail}" },
              ],
            ],
            branches: [
              {
                branches: [
                  "94% → Scream Tail Dazz. Gleam Dialga-P 2",
                  "6% → Scream Tail Dazz. Gleam Dialga-P (crit) 2",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "94% → Scream Tail Dazz. Gleam Dialga-P 2",
        label: "94% → Scream Tail Dazz. Gleam Dialga-P",
        matchups: [
          {
            matchup: ["Dialga-P"],
            turns: [
              [
                { player: "{p:Scream Tail} Dazz. Gleam {o:Dialga-P} to {-:195}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail}" },
              ],
              [
                { player: "{p:Scream Tail} Encore {o:Dialga-P}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail}" },
              ],
            ],
            branches: [
              {
                branches: [
                  "94% → Scream Tail Dazz. Gleam Dialga-P 3",
                  "6% → Scream Tail Dazz. Gleam Dialga-P (crit) 3",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "94% → Scream Tail Dazz. Gleam Dialga-P 3",
        label: "94% → Scream Tail Dazz. Gleam Dialga-P",
        matchups: [
          {
            matchup: ["Dialga-P"],
            turns: [
              [
                { player: "{p:Scream Tail} Dazz. Gleam {o:Dialga-P} to {-:147}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail}" },
              ],
              [
                { player: "{p:Scream Tail} Dazz. Gleam {o:Dialga-P} to {-:99}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail}" },
              ],
              [
                { player: "{p:Scream Tail} Encore {o:Dialga-P}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail}" },
              ],
              [
                { player: "{p:Scream Tail} Disable {o:Dialga-P}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail} (fail)" },
              ],
            ],
            branches: [
              {
                branches: [
                  "48% → Dialga-P recoil",
                  "52% → Dialga-P recoil (to 0)",
                ],
                default: "52% → Dialga-P recoil (to 0)"
              },
            ],
          },
        ],
      },
      {
        line: "48% → Dialga-P recoil",
        matchups: [
          {
            matchup: ["Dialga-P"],
            turns: [
              [
                { opponent: "{o:Dialga-P} Struggle {p:Scream Tail} to {+:256}" },
                { opponent: "{o:Dialga-P} recoil to {-:27}" },
                { player: "{p:Scream Tail} Teleport" },
                { player: "{p:Scream Tail} switch to {p:Thundurus-I}" },
              ],
              [
                { player: "{p:Thundurus-I} Hammer Arm {o:Dialga-P} to {=:0}" },
                { opponent: "{o:Dialga-P} fainted" },
              ],
            ],
            branches: [{ branches: ["Thundurus-I Volt Switch Rayquaza-Mega"] }],
          },
        ],
        frags: { "Thundurus-I": 1 }
      },
      {
        line: "52% → Dialga-P recoil (to 0)",
        matchups: [
          {
            matchup: ["Dialga-P"],
            turns: [
              [
                { opponent: "{o:Dialga-P} Struggle {p:Scream Tail} to {+:256}" },
                { opponent: "{o:Dialga-P} recoil to {=:0}" },
                { opponent: "{o:Dialga-P} fainted" },
                { player: "{p:Scream Tail} Teleport" },
                { player: "{p:Scream Tail} switch to {p:Thundurus-I}" },
              ],
            ],
            branches: [{ branches: ["Thundurus-I Volt Switch Rayquaza-Mega"] }],
          },
        ],
        frags: { "Scream Tail": 1 }
      },
      {
        line: "6% → Scream Tail Dazz. Gleam Dialga-P (crit)",
        matchups: [
          {
            matchup: ["Dialga-P"],
            turns: [
              [
                { player: "{p:Scream Tail} Dazz. Gleam {o:Dialga-P} (crit) to {-:219}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail}" },
              ],
              [
                { player: "{p:Scream Tail} Dazz. Gleam {o:Dialga-P} to {-:171}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail}" },
              ],
              [
                { player: "{p:Scream Tail} Encore {o:Dialga-P}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail}" },
              ],
              [
                { player: "{p:Scream Tail} Dazz. Gleam {o:Dialga-P} to {-:123}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail}" },
              ],
            ],
            branches: [{ branches: ["Scream Tail Encore Dialga-P (fail)"] }],
          },
        ],
      },
      {
        line: "6% → Scream Tail Dazz. Gleam Dialga-P (crit) 2",
        label: "6% → Scream Tail Dazz. Gleam Dialga-P (crit)",
        matchups: [
          {
            matchup: ["Dialga-P"],
            turns: [
              [
                { player: "{p:Scream Tail} Dazz. Gleam {o:Dialga-P} (crit) to {-:171}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail}" },
              ],
              [
                { player: "{p:Scream Tail} Encore {o:Dialga-P}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail}" },
              ],
              [
                { player: "{p:Scream Tail} Dazz. Gleam {o:Dialga-P} to {-:123}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail}" },
              ],
            ],
            branches: [{ branches: ["Scream Tail Encore Dialga-P (fail)"] }],
          }
        ],
      },
      {
        line: "6% → Scream Tail Dazz. Gleam Dialga-P (crit) 3",
        label: "6% → Scream Tail Dazz. Gleam Dialga-P (crit)",
        matchups: [
          {
            matchup: ["Dialga-P"],
            turns: [
              [
                { player: "{p:Scream Tail} Dazz. Gleam {o:Dialga-P} (crit) to {-:123}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail}" },
              ],
            ],
            branches: [{ branches: ["Scream Tail Encore Dialga-P (fail)"] }],
          }
        ],
      },
      {
        line: "Scream Tail Encore Dialga-P (fail)",
        matchups: [
          {
            matchup: ["Dialga-P"],
            turns: [
              [
                { player: "{p:Scream Tail} Encore {o:Dialga-P} (fail)" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail}" },
              ],
              [
                { player: "{p:Scream Tail} Encore {o:Dialga-P}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail}" },
              ],
              [
                { player: "{p:Scream Tail} Disable {o:Dialga-P}" },
                { opponent: "{o:Dialga-P} Roar of Time {p:Scream Tail} (fail)" },
              ],
            ],
            branches: [
              {
                if: ["6% → Scream Tail Dazz. Gleam Dialga-P (crit)"],
                branches: [
                  "94% → Dialga-P recoil",
                  "6% → Dialga-P recoil (to 0)",
                ],
              },
              {
                if: ["6% → Scream Tail Dazz. Gleam Dialga-P (crit) 2"],
                branches: [
                  "97% → Dialga-P recoil",
                  "3% → Dialga-P recoil (to 0)",
                ],
              },
              {
                if: ["6% → Scream Tail Dazz. Gleam Dialga-P (crit) 3"],
                branches: [
                  "99% → Dialga-P recoil",
                  "1% → Dialga-P recoil (to 0)",
                ],
              },
            ],
          }
        ],
      },
      {
        line: "94% → Dialga-P recoil",
        matchups: [
          {
            matchup: ["Dialga-P"],
            turns: [
              [
                { opponent: "{o:Dialga-P} Struggle {p:Scream Tail} to {+:256}" },
                { opponent: "{o:Dialga-P} recoil to {-:51}" },
                { player: "{p:Scream Tail} Teleport" },
                { player: "{p:Scream Tail} switch to {p:Thundurus-I}" },
              ],
              [
                { player: "{p:Thundurus-I} Hammer Arm {o:Dialga-P} to {=:0}" },
                { opponent: "{o:Dialga-P} fainted" },
              ],
            ],
            branches: [{ branches: ["Thundurus-I Volt Switch Rayquaza-Mega"] }],
          },
        ],
        frags: { "Thundurus-I": 1 }
      },
      {
        line: "6% → Dialga-P recoil (to 0)",
        matchups: [
          {
            matchup: ["Dialga-P"],
            turns: [
              [
                { opponent: "{o:Dialga-P} Struggle {p:Scream Tail} to {+:256}" },
                { opponent: "{o:Dialga-P} recoil to {=:0}" },
                { opponent: "{o:Dialga-P} fainted" },
                { player: "{p:Scream Tail} Teleport" },
                { player: "{p:Scream Tail} switch to {p:Thundurus-I}" },
              ],
            ],
            branches: [{ branches: ["Thundurus-I Volt Switch Rayquaza-Mega"] }],
          },
        ],
        frags: { "Scream Tail": 1 }
      },
      {
        line: "97% → Dialga-P recoil",
        matchups: [
          {
            matchup: ["Dialga-P"],
            turns: [
              [
                { opponent: "{o:Dialga-P} Struggle {p:Scream Tail} to {+:256}" },
                { opponent: "{o:Dialga-P} recoil to {-:51}" },
                { player: "{p:Scream Tail} Teleport" },
                { player: "{p:Scream Tail} switch to {p:Thundurus-I}" },
              ],
              [
                { player: "{p:Thundurus-I} Hammer Arm {o:Dialga-P} to {=:0}" },
                { opponent: "{o:Dialga-P} fainted" },
              ],
            ],
            branches: [{ branches: ["Thundurus-I Volt Switch Rayquaza-Mega"] }],
          },
        ],
        frags: { "Thundurus-I": 1 }
      },
      {
        line: "3% → Dialga-P recoil (to 0)",
        matchups: [
          {
            matchup: ["Dialga-P"],
            turns: [
              [
                { opponent: "{o:Dialga-P} Struggle {p:Scream Tail} to {+:256}" },
                { opponent: "{o:Dialga-P} recoil to {=:0}" },
                { opponent: "{o:Dialga-P} fainted" },
                { player: "{p:Scream Tail} Teleport" },
                { player: "{p:Scream Tail} switch to {p:Thundurus-I}" },
              ],
            ],
            branches: [{ branches: ["Thundurus-I Volt Switch Rayquaza-Mega"] }],
          },
        ],
        frags: { "Scream Tail": 1 }
      },
      {
        line: "99% → Dialga-P recoil",
        matchups: [
          {
            matchup: ["Dialga-P"],
            turns: [
              [
                { opponent: "{o:Dialga-P} Struggle {p:Scream Tail} to {+:256}" },
                { opponent: "{o:Dialga-P} recoil to {-:51}" },
                { player: "{p:Scream Tail} Teleport" },
                { player: "{p:Scream Tail} switch to {p:Thundurus-I}" },
              ],
              [
                { player: "{p:Thundurus-I} Hammer Arm {o:Dialga-P} to {=:0}" },
                { opponent: "{o:Dialga-P} fainted" },
              ],
            ],
            branches: [{ branches: ["Thundurus-I Volt Switch Rayquaza-Mega"] }],
          },
        ],
        frags: { "Thundurus-I": 1 }
      },
      {
        line: "1% → Dialga-P recoil (to 0)",
        matchups: [
          {
            matchup: ["Dialga-P"],
            turns: [
              [
                { opponent: "{o:Dialga-P} Struggle {p:Scream Tail} to {+:256}" },
                { opponent: "{o:Dialga-P} recoil to {=:0}" },
                { opponent: "{o:Dialga-P} fainted" },
                { player: "{p:Scream Tail} Teleport" },
                { player: "{p:Scream Tail} switch to {p:Thundurus-I}" },
              ],
            ],
            branches: [{ branches: ["Thundurus-I Volt Switch Rayquaza-Mega"] }],
          },
        ],
        frags: { "Scream Tail": 1 }
      },
      {
        line: "Thundurus-I Volt Switch Rayquaza-Mega",
        matchups: [
          {
            matchup: ["Rayquaza-Mega"],
            turns: [
              [
                { opponent: "{o:Rayquaza-Mega} mega evolve" },
                { opponent: "{o:Rayquaza-Mega} Dragon Ascent {p:Thundurus-I} to {+:16}" },
                { player: "{p:Thundurus-I} Volt Switch {o:Rayquaza-Mega} to {-:232}" },
                { player: "{p:Thundurus-I} switch to {p:Sceptile-Mega}" },
                { opponent: "{p:Sceptile-Mega} badly poison to {=:180}" },
              ],
              [
                { player: "{p:Sceptile-Mega} Dual Chop {o:Rayquaza-Mega} to {=:0}" },
                { opponent: "{o:Rayquaza-Mega} fainted" },
              ],
            ],
          },
        ],
        frags: { "Sceptile-Mega": 1 }
      }
    ],
  },
};

const _box10 = getBox({
  box: _box9,
  update: {
    "Thundurus-I": {
      name: "Thundurus-T",
      spriteKey: "thundurus-therian",
      ability: "Volt Absorb"
    }
  }
});

export const eliteFourLanceBoxChange: Moment = {
  split: "Elite Four",
  label: "Elite Four Lance Box Change",
  kind: "boxChange",
  data: { playerBox: _box10 }
};

const _box11 = getBox({
  box: _box10,
  update: {
    Floatzel: {
      nature: "Jolly",
      ability: "Technician",
      item: "Mystic Water",
      moves: ["Fake Out", "Flip Turn", "Focus Punch", "Surging Strikes"],
    },
    "Thundurus-T": {
      nature: "Lax", 
      ability: "Volt Absorb",
      item: "Choice Specs",
      moves: ["Dark Pulse", "Focus Blast", "Psychic", "Volt Switch"]
    },
    "Darmanitan-GZ": {
      nature: "Adamant",
      ability: "Zen Mode",
      item: "Focus Sash",
      moves: ["Flare Blitz", "Focus Punch", "Icicle Crash", "U-Turn"],
    },
    "Sceptile-Mega": {
      nature: "Jolly",
      ability: "Technician",
      item: "Sceptilite",
      moves: ["Cut", "Dual Chop", "Leaf Blade", "Low Kick"]
    },
    "Scream Tail": {
      nature: "Timid",
      ability: "Tangling Hair",
      item: "Chilan Berry",
      moves: ["Dazz. Gleam", "Disable", "Encore", "Teleport"]
    },
    Incineroar: {
      nature: "Relaxed",
      ability: "Intimidate",
      item: "Sitrus Berry",
      moves: ["Drain Punch", "Parting Shot", "Scary Face", "Will-O-Wisp"]
    }
  },
  team: ["Floatzel", "Thundurus-T", "Darmanitan-GZ", "Sceptile-Mega", "Scream Tail", "Incineroar"],
});

export const championRivalBattle: Moment = {
  split: "Elite Four",
  label: "Champion Rival Battle",
  kind: "battle",
  secret: true,
  data: {
    playerBox: _box11,
    opponentBox: championRivalBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Kyogre-P"],
            turns: [
              [
                { player: "{p:Floatzel} Fake Out {o:Kyogre-P} to {-:253}" },
                { opponent: "{o:Kyogre-P} flinched" },
              ],
              [
                { player: "{p:Floatzel} Flip Turn {o:Kyogre-P} to {-:178}" },
                { player: "{p:Floatzel} switch to {p:Thundurus-T}" },
                { opponent: "{o:Kyogre-P} Thunder {p:Thundurus-T}" },
              ],
              [
                { player: "{p:Thundurus-T} Volt Switch {o:Kyogre-P} to {=:0}" },
                { opponent: "{o:Kyogre-P} fainted" },
                { player: "{p:Thundurus-T} switch to {p:Darmanitan-GZ}" },
              ],
            ],
          },
          {
            matchup: ["Eternatus-Max"],
            turns: [
              [
                { opponent: "{o:Eternatus-Max} Draco Barrage {p:Darmanitan-GZ} to {+:1}" },
                { opponent: "{o:Eternatus-Max} recoil to {-:276}" },
                { player: "{p:Darmanitan-GZ} U-Turn {o:Eternatus-Max} to {-:243}" },
                { player: "{p:Darmanitan-GZ} switch to {p:Sceptile-Mega}" },
              ],
              [
                { player: "{p:Sceptile-Mega} mega evolve" },
                { player: "{p:Sceptile-Mega} Dual Chop {o:Eternatus-Max} to {=:0}" },
                { opponent: "{o:Eternatus-Max} fainted" },
              ],
            ],
            branches: [
              {
                branches: [
                  "50% → Necrozma-Ultra matchup",
                  "50% → Arceus matchup",
                ],
              },
            ],
          }
        ],
        frags: { "Thundurus-T": 1, "Sceptile-Mega": 1 }
      },
      {
        line: "50% → Necrozma-Ultra matchup",
        matchups: [
          {
            matchup: ["Necrozma-Ultra"],
            turns: [
              [
                { opponent: "{o:Necrozma-Ultra} transform" },
                { player: "{p:Sceptile-Mega} Dual Chop {o:Necrozma-Ultra} to {=:0}" },
                { opponent: "{o:Necrozma-Ultra} fainted" },
              ],
            ]
          },
          {
            matchup: ["Arceus"],
            turns: [
              [
                { player: "{p:Sceptile-Mega} switch to {p:Scream Tail}" },
                { opponent: "{o:Arceus} Extreme Speed (Z) {p:Scream Tail} to {+:161}" },
              ],
              [
                { player: "{p:Scream Tail} switch to {p:Incineroar}" },
                { opponent: "{o:Arceus} Swords Dance" },
              ],
              [
                { opponent: "{o:Arceus} Swords Dance" },
                { player: "{p:Incineroar} Will-O-Wisp {o:Arceus}" },
                { opponent: "{o:Arceus} burn to {=:305}" },
              ],
              [
                { opponent: "{o:Arceus} Extreme Speed {p:Incineroar} (non-crit) to {+:156}" },
                { player: "{p:Incineroar} Drain Punch {o:Arceus} to {-:215}" },
                { opponent: "{p:Incineroar} recover to {+:201}" },
                { opponent: "{o:Arceus} burn to {-:195}" },
              ],
              [
                { opponent: "{o:Arceus} Extreme Speed {p:Incineroar} to {+:6}" },
                { opponent: "{p:Incineroar} Sitrus Berry to {+:76}" },
                { player: "{p:Incineroar} Parting Shot {o:Arceus}" },
                { player: "{p:Incineroar} switch to {p:Sceptile-Mega}" },
                { opponent: "{o:Arceus} burn to {-:175}" },
              ],
              [
                { opponent: "{o:Arceus} Extreme Speed {p:Sceptile-Mega} to {+:46}" },
                { player: "{p:Sceptile-Mega} Low Kick {o:Arceus} to {-:11}" },
                { opponent: "{o:Arceus} burn to {=:0}" },
                { opponent: "{o:Arceus} fainted" },
              ],
            ],
            branches: [{ branches: ["Sceptile-Mega Leaf Blade Swampert-Mega"] }],
          }
        ],
        frags: { "Sceptile-Mega": 2 }
      },
      {
        line: "50% → Arceus matchup",
        matchups: [
          {
            matchup: ["Arceus"],
            turns: [
              [
                { player: "{p:Sceptile-Mega} switch to {p:Scream Tail}" },
                { opponent: "{o:Arceus} Extreme Speed (Z) {p:Scream Tail} to {+:161}" },
              ],
              [
                { player: "{p:Scream Tail} switch to {p:Incineroar}" },
                { opponent: "{o:Arceus} Swords Dance" },
              ],
              [
                { opponent: "{o:Arceus} Swords Dance" },
                { player: "{p:Incineroar} Will-O-Wisp {o:Arceus}" },
                { opponent: "{o:Arceus} burn to {=:305}" },
              ],
              [
                { opponent: "{o:Arceus} Extreme Speed {p:Incineroar} (non-crit) to {+:156}" },
                { player: "{p:Incineroar} Drain Punch {o:Arceus} to {-:215}" },
                { opponent: "{p:Incineroar} recover to {+:201}" },
                { opponent: "{o:Arceus} burn to {-:195}" },
              ],
              [
                { opponent: "{o:Arceus} Extreme Speed {p:Incineroar} to {+:6}" },
                { opponent: "{p:Incineroar} Sitrus Berry to {+:76}" },
                { player: "{p:Incineroar} Parting Shot {o:Arceus}" },
                { player: "{p:Incineroar} switch to {p:Sceptile-Mega}" },
                { opponent: "{o:Arceus} burn to {-:175}" },
              ],
              [
                { opponent: "{o:Arceus} Extreme Speed {p:Sceptile-Mega} to {+:46}" },
                { player: "{p:Sceptile-Mega} Low Kick {o:Arceus} to {-:11}" },
                { opponent: "{o:Arceus} burn to {=:0}" },
                { opponent: "{o:Arceus} fainted" },
              ],
            ]
          },
          {
            matchup: ["Necrozma-Ultra"],
            turns: [
              [
                { opponent: "{o:Necrozma-Ultra} transform" },
                { player: "{p:Sceptile-Mega} Dual Chop {o:Necrozma-Ultra} to {=:0}" },
                { opponent: "{o:Necrozma-Ultra} fainted" },
              ],
            ],
            branches: [{ branches: ["Sceptile-Mega Leaf Blade Swampert-Mega"] }],
          },
        ],
        frags: { "Sceptile-Mega": 2 }
      },
      {
        line: "Sceptile-Mega Leaf Blade Swampert-Mega",
        matchups: [
          {
            matchup: ["Swampert-Mega"],
            turns: [
              [
                { opponent: "{o:Swampert-Mega} mega evolve" },
                { player: "{p:Sceptile-Mega} Leaf Blade {o:Swampert-Mega} to {=:0}" },
                { opponent: "{o:Swampert-Mega} fainted" },
              ],
            ],
          },
          {
            matchup: ["Walking Wake"],
            turns: [
              [
                { player: "{p:Sceptile-Mega} Dual Chop {o:Walking Wake} to {=:0}" },
                { opponent: "{o:Walking Wake} fainted" },
              ],
            ],
          }
        ],
        frags: { "Sceptile-Mega": 2 },
      }
    ],
  },
};

export const moments: Moment[] = [
  eliteFourChecklist,
  eliteFourLoreleiBattle,
  eliteFourBrunoBattle,
  eliteFourAgathaBattle,
  eliteFourLanceBattle,
  eliteFourLanceBoxChange,
  championRivalBattle,
];
