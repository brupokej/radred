import { getBox } from "@site/src/utils/box";
import { Moment } from "@site/src/utils/moments";
import {
  ceruleanCityLeaderMistyBox,
  ceruleanCityRivalBox,
  digHouseGruntBox,
  mtMoonArcherBox,
  mtMoonSuperNerdMiguelBox,
  nuggetBridgeBugCatcherCaleBox,
  nuggetBridgeCamperEthanBox,
  nuggetBridgeGruntBox,
  nuggetBridgeLassAliBox,
  nuggetBridgeLassReliBox,
  nuggetBridgeYoungsterTimmyBox,
  route3LassSallyBox,
} from "@site/src/utils/opponents";

import { box as _box1 } from "@site/src/data/guide/brock";

const _box2 = getBox({
  box: _box1,
  update: [
    {
      Kricketune: {
        level: 23,
        moves: ["Bug Bite", "Bulldoze", "Mega Drain", "Rock Tomb"],
      },
      Houndour: {
        level: 23,
      },
      Marill: {
        level: 20,
        moves: ["Aqua Jet", "Aqua Tail", "Covet", "Tail Whip"],
      },
    },
    {
      Marill: {
        name: "Azumarill",
        level: 23,
        moves: ["Aqua Jet", "Aqua Tail", "Ice Punch", "Play Rough"],
      },
    },
  ],
});

export const mistyBoxChange: Moment = {
  label: "Misty Box Change",
  kind: "boxChange",
  data: { playerBox: _box2 },
};

const _box3 = getBox({
  box: _box2,
  update: {
    Kricketune: {
      item: "Coba Berry",
    },
    Houndour: {
      item: "Wise Glasses",
    },
  },
  team: ["Kricketune", "Houndour", "Azumarill", "Meowth-G"],
});

export const route3LassSallyBattle: Moment = {
  label: "Route 3 Lass Sally Battle",
  kind: "battle",
  data: {
    playerBox: _box3,
    opponentBox: route3LassSallyBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Pikachu-Flying"],
            turns: [
              [
                { opponent: "{o:Pikachu-Flying} Zippy Zap {p:Kricketune} to {+:38}" },
                { player: "{p:Kricketune} Rock Tomb {o:Pikachu-Flying} to {=:0}" },
                { opponent: "{o:Pikachu-Flying} fainted" },
              ],
            ],
          },
          {
            matchup: ["Whimsicott"],
            turns: [
              [
                { player: "{p:Kricketune} switch to {p:Houndour}" },
                { opponent: "{o:Whimsicott} Leech Seed {p:Houndour}" },
              ],
              [
                { opponent: "{o:Whimsicott} Mega Drain {p:Houndour} to {+:40}" },
                { player: "{p:Houndour} Incinerate {o:Whimsicott} to {-:17}" },
              ],
              [
                { opponent: "{o:Whimsicott} Mega Drain {p:Houndour} to {+:20}" },
                { opponent: "{o:Whimsicott} heal to {-:27}" },
                { player: "{p:Houndour} Incinerate {o:Whimsicott} to {=:0}" },
                { opponent: "{o:Whimsicott} fainted" },
              ],
            ],
          },
          {
            matchup: ["Oricorio-Sensu"],
            turns: [
              [
                { player: "{p:Houndour} switch to {p:Azumarill}" },
                { opponent: "{o:Oricorio-Sensu} Air Cutter {p:Azumarill} to {+:53}" },
              ],
              [
                { opponent: "{o:Oricorio-Sensu} HP Ghost {p:Azumarill} to {+:23}" },
                { player: "{p:Azumarill} Ice Punch {o:Oricorio-Sensu} to {-:19}" },
              ],
              [
                { player: "{p:Azumarill} Aqua Jet {o:Oricorio-Sensu} to {=:0}" },
                { opponent: "{o:Oricorio-Sensu} fainted" },
              ],
            ],
          },
          {
            matchup: ["mawile"],
            turns: [
              [
                { player: "{p:Azumarill} switch to {p:Meowth-G}" },
                { opponent: "{o:Mawile} Covet {p:Meowth-G} to {+:19}" },
              ],
              [
                { player: "{p:Meowth-G} switch to {p:Houndour}" },
                { opponent: "{o:Mawile} Fire Fang {p:Houndour}" },
              ],
              [
                { player: "{p:Houndour} Incinerate {o:Mawile} to {=:0}" },
                { opponent: "{o:Mawile} fainted" },
              ],
            ],
          },
        ],
        frags: { Kricketune: 1, Houndour: 2, Azumarill: 1 },
      },
    ],
  },
};

const _drilbur = {
  name: "Drilbur",
  moves: ["Fury Swipes", "Mud-Slap", "Rapid Spin", "Scratch"],
};

export const mtMoonEncounter: Moment = {
  label: "Mt. Moon Encounter",
  kind: "encounter",
  data: { pokemon: _drilbur },
};

const _magikarp = {
  name: "Magikarp",
  ability: "Swift Swim",
  moves: ["Splash"],
};

export const route4Encounter: Moment = {
  label: "Route 4 Encounter",
  kind: "encounter",
  data: { pokemon: _magikarp },
};

const _box4 = getBox({
  box: _box3,
  add: [_drilbur, _magikarp],
  update: {
    Torracat: {
      level: 23,
    },
    "Yamask-G": {
      level: 23,
    },
    "Meowth-G": {
      level: 23,
      moves: ["Fake Out", "Bullet Punch", "Metal Claw", "Scratch"],
    },
  },
});

export const route4BoxChange: Moment = {
  label: "Route 4 Box Change",
  kind: "boxChange",
  data: { playerBox: _box4 },
};

const _box5 = getBox({
  box: _box4,
  update: {
    Houndour: {
      item: "Black Glasses",
    },
    Kricketune: {
      nature: "Impish",
      item: "Silver Powder",
    },
    "Yamask-G": {
      item: "Rawst Berry",
    },
    Azumarill: {
      nature: "Impish",
      item: "Rawst Berry",
    },
  },
  team: ["Torracat", "Houndour", "Kricketune", "Yamask-G", "Azumarill"],
});

export const mtMoonSuperNerdMiguelBattle: Moment = {
  label: "Mt. Moon Super Nerd Miguel Battle",
  kind: "battle",
  data: {
    playerBox: _box5,
    opponentBox: mtMoonSuperNerdMiguelBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Voltorb-H", "Thwackey"],
            turns: [
              [
                { player: "{p:Torracat} switch to {p:Kricketune}" },
                { player: "{p:Houndour} switch to {p:Yamask-G}" },
                { opponent: "{o:Thwackey} Fake Out {p:Yamask-G}" },
                {
                  opponent:
                    "{o:Voltorb-H} Self-Destruct {p:Kricketune} to {+:43} and {o:Thwackey} to {-:46}",
                },
                { opponent: "{o:Voltorb-H} fainted" },
                { player: "{p:Kricketune} terrain to {+:47}" },
                { opponent: "{o:Thwackey} terrain to {-:50}" },
              ],
            ],
          },
          {
            matchup: ["Swoobat", "Thwackey"],
            turns: [
              [
                { opponent: "{o:Swoobat} Calm Mind" },
                { player: "{p:Kricketune} Bug Bite {o:Thwackey} to {=:0}" },
                { player: "{p:Yamask-G} Haze" },
                { opponent: "{o:Thwackey} fainted" },
              ],
            ],
          },
          {
            matchup: ["Swoobat", "Sableye"],
            turns: [
              [
                { player: "{p:Kricketune} switch to {p:Houndour}" },
                { opponent: "{o:Swoobat} Calm Mind" },
                { opponent: "{o:Sableye} Will-O-Wisp {p:Houndour}" },
                { player: "{p:Yamask-G} Haze" },
              ],
              [
                { player: "{p:Yamask-G} switch to {p:Azumarill}" },
                { opponent: "{o:Swoobat} Calm Mind" },
                { player: "{p:Houndour} Leer {o:Swoobat} and {o:Sableye}" },
                { opponent: "{o:Sableye} Foul Play {p:Houndour} to {+:29}" },
                { player: "{p:Houndour} terrain to {+:32}" },
              ],
            ],
            branches: [
              { branches: ["50% → Azumarill Play Rough Sableye", "50% → Sableye Protect"] },
            ],
          },
        ],
        frags: { Kricketune: 1, "Yamask-G": 1 },
      },
      {
        line: "50% → Azumarill Play Rough Sableye",
        matchups: [
          {
            matchup: ["Swoobat", "Sableye"],
            turns: [
              [
                { player: "{p:Houndour} Sucker Punch {o:Swoobat} to {=:0}" },
                { player: "{p:Azumarill} Play Rough {o:Sableye} to {=:0}" },
                { opponent: "{o:Swoobat} fainted" },
                { opponent: "{o:Sableye} fainted" },
                { player: "{p:Houndour} terrain to {+:35}" },
              ],
            ],
          },
          {
            matchup: ["Skiddo"],
            turns: [],
            branches: [
              {
                branches: [
                  "94% → Houndour Incinerate Skiddo",
                  "6% → Houndour Incinerate Skiddo (crit)",
                ],
              },
            ],
          },
        ],
        frags: { Houndour: 1, Azumarill: 1 },
      },
      {
        line: "94% → Houndour Incinerate Skiddo",
        matchups: [
          {
            matchup: ["Skiddo"],
            turns: [
              [
                { player: "{p:Houndour} Incinerate {o:Skiddo} to {-:17}" },
                { player: "{p:Azumarill} Play Rough {o:Skiddo} to {=:0}" },
                { opponent: "{o:Skiddo} fainted" },
              ],
            ],
          },
        ],
        frags: { Azumarill: 1 },
      },
      {
        line: "6% → Houndour Incinerate Skiddo (crit)",
        matchups: [
          {
            matchup: ["Skiddo"],
            turns: [
              [
                { player: "{p:Houndour} Incinerate {o:Skiddo} (crit) to {=:0}" },
                { opponent: "{o:Skiddo} fainted" },
              ],
            ],
          },
        ],
        frags: { Houndour: 1 },
      },
      {
        line: "50% → Sableye Protect",
        matchups: [
          {
            matchup: ["Swoobat", "Sableye"],
            turns: [
              [
                { player: "{p:Houndour} Sucker Punch {o:Swoobat} to {=:0}" },
                { opponent: "{o:Sableye} Protect" },
                { player: "{p:Azumarill} Play Rough {o:Sableye}" },
                { opponent: "{o:Swoobat} fainted" },
                { player: "{p:Houndour} terrain to {+:35}" },
              ],
            ],
          },
          {
            matchup: ["Skiddo", "Sableye"],
            turns: [],
            branches: [
              {
                branches: [
                  "94% → Houndour Incinerate Sableye and Skiddo",
                  "6% → Houndour Incinerate Sableye and Skiddo (crit)",
                ],
              },
            ],
          },
        ],
        frags: { Houndour: 1 },
      },
      {
        line: "94% → Houndour Incinerate Sableye and Skiddo",
        matchups: [
          {
            matchup: ["Skiddo", "Sableye"],
            turns: [
              [
                {
                  player: "{p:Houndour} Incinerate {o:Sableye} to {-:41} and {o:Skiddo} to {-:19}",
                },
                { player: "{p:Azumarill} Play Rough {o:Skiddo} to {=:0}" },
                { opponent: "{o:Sableye} Foul Play {p:Houndour} to {+:4}" },
                { player: "{p:Houndour} terrain to {+:7}" },
                { player: "{o:Sableye} terrain to {-:44}" },
                { opponent: "{o:Skiddo} fainted" },
              ],
            ],
          },
          {
            matchup: ["Sableye"],
            turns: [
              [
                { player: "{p:Houndour} Leer {o:Sableye}" },
                { player: "{p:Azumarill} Play Rough {o:Sableye} to {=:0}" },
                { opponent: "{o:Sableye} fainted" },
              ],
            ],
          },
        ],
        frags: { Azumarill: 2 },
      },
      {
        line: "6% → Houndour Incinerate Sableye and Skiddo (crit)",
        matchups: [
          {
            matchup: ["Skiddo", "Sableye"],
            turns: [
              [
                {
                  player: "{p:Houndour} Incinerate {o:Sableye} to {-:41} and {o:Skiddo} to {=:0}",
                },
                { player: "{p:Azumarill} Play Rough {o:Sableye} to {=:0}" },
                { opponent: "{o:Skiddo} fainted" },
                { opponent: "{o:Sableye} fainted" },
              ],
            ],
          },
        ],
        frags: { Houndour: 1, Azumarill: 1 },
      },
    ],
  },
};

const _box6 = getBox({
  box: _box5,
  update: [
    {
      "Wooper-P": {
        name: "Clodsire",
        spriteKey: null,
        pokedexKey: null,
        level: 20,
      },
    },
    {
      Clodsire: {
        level: 23,
      },
    },
  ],
});

export const mtMoonSuperNerdMiguelBoxChange: Moment = {
  label: "Mt. Moon Super Nerd Miguel Box Change",
  kind: "boxChange",
  data: { playerBox: _box6 },
};

const _box7 = getBox({
  box: _box6,
  update: {
    Azumarill: {
      item: "Pecha Berry",
    },
    "Meowth-G": {
      nature: "Impish",
      item: "Chesto Berry",
    },
    Kricketune: {
      item: "Sitrus Berry",
      moves: ["Bug Bite", "Bulldoze", "Bullet Seed", "Mega Drain"],
    },
    "Yamask-G": {
      item: "Pecha Berry",
    },
    Clodsire: {
      item: "Yache Berry",
    },
  },
  team: ["Azumarill", "Meowth-G", "Kricketune", "Yamask-G", "Clodsire", "Torracat"],
});

export const mtMoonArcherBattle: Moment = {
  label: "Mt. Moon Archer Battle",
  kind: "battle",
  data: {
    playerBox: _box7,
    opponentBox: mtMoonArcherBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Glimmet"],
            turns: [
              [
                { player: "{p:Azumarill} Aqua Jet {o:Glimmet} to {=:0}" },
                { opponent: "{o:Glimmet} Toxic Debris" },
                { opponent: "{o:Glimmet} fainted" },
              ],
            ],
          },
          {
            matchup: ["Seviper"],
            turns: [
              [
                { player: "{p:Azumarill} switch to {p:Meowth-G}" },
                { opponent: "{o:Seviper} Hypnosis {p:Meowth-G}" },
              ],
              [
                { player: "{p:Meowth-G} Fake Out {o:Seviper} to {-:61}" },
                { opponent: "{o:Seviper} flinched" },
              ],
              [
                { player: "{p:Meowth-G} switch to {p:Kricketune}" },
                { opponent: "{o:Seviper} Hypnosis {p:Kricketune}" },
                { opponent: "{p:Kricketune} poison to {=:66}" },
              ],
              [
                { player: "{p:Kricketune} Bulldoze {o:Seviper} to {-:40}" },
                { opponent: "{o:Seviper} Poison Fang {p:Kricketune} to {+:44}" },
                { opponent: "{p:Kricketune} poison to {+:35}" },
              ],
              [
                { player: "{p:Kricketune} Bulldoze {o:Seviper} to {=:0}" },
                { opponent: "{o:Seviper} fainted" },
                { opponent: "{p:Kricketune} poison to {+:26}" },
              ],
            ],
          },
          {
            matchup: ["Fearow"],
            turns: [
              [
                { player: "{p:Kricketune} switch to {p:Meowth-G}" },
                { opponent: "{o:Fearow} Double Hit {p:Meowth-G} to {+:27}" },
              ],
              [
                { player: "{p:Meowth-G} Fake Out {o:Fearow} to {-:51}" },
                { opponent: "{o:Fearow} flinched" },
              ],
              [
                { player: "{p:Meowth-G} switch to {p:Yamask-G}" },
                { opponent: "{o:Fearow} Drill Run {p:Yamask-G} to {+:30}" },
              ],
              [
                { player: "{p:Yamask-G} switch to {p:Azumarill}" },
                { opponent: "{o:Fearow} Pluck {p:Azumarill} to {+:55}" },
              ],
              [
                { opponent: "{o:Fearow} Double Hit {p:Azumarill} to {+:17}" },
                { player: "{p:Azumarill} Ice Punch {o:Fearow} to {=:0}" },
              ],
            ],
          },
          {
            matchup: ["Mightyena"],
            turns: [
              [
                { player: "{p:Azumarill} switch to {p:Clodsire}" },
                { opponent: "{o:Mightyena} Poison Fang {p:Clodsire} to {+:89}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Kricketune}" },
                { opponent: "{o:Mightyena} Howl" },
                { opponent: "{p:Kricketune} poison to {+:17}" },
              ],
              [
                { player: "{p:Kricketune} Bug Bite {o:Mightyena} to {=:0}" },
                { opponent: "{o:Mightyena} fainted" },
                { opponent: "{p:Kricketune} poison to {+:8}" },
              ],
            ],
          },
          {
            matchup: ["Houndour"],
            turns: [
              [
                { player: "{p:Kricketune} switch to {p:Torracat}" },
                { opponent: "{o:Houndour} Incinerate {p:Torracat} to {+:48}" },
              ],
              [
                { player: "{p:Torracat} Double Kick {o:Houndour} to {=:0}" },
                { opponent: "{o:Houndour} fainted" },
              ],
            ],
          },
        ],
        frags: { Azumarill: 2, Kricketune: 2, Torracat: 1 },
      },
    ],
  },
};

const _chewtle = {
  name: "Chewtle",
  moves: ["Aqua Jet", "Bite"],
};

export const ceruleanCityEncounter: Moment = {
  label: "Cerulean City Encounter",
  kind: "encounter",
  data: { pokemon: _chewtle },
};

const _box8 = getBox({
  box: _box7,
  add: [_chewtle],
  cap: 28,
  update: {
    "Meowth-G": {
      name: "Perrserker",
      spriteKey: null,
      pokedexKey: null,
      moves: ["Fake Out", "Bullet Punch", "Iron Head", "Scratch"],
    },
    Chewtle: {
      name: "Drednaw",
      moves: ["Aqua Jet", "Bite", "Rock Tomb"],
    },
    Tentacool: {
      name: "Tentacruel",
    },
  },
});

export const ceruleanCityBoxChange: Moment = {
  label: "Cerulean City Box Change",
  kind: "boxChange",
  data: { playerBox: _box8 },
};

const _box9 = getBox({
  box: _box8,
  update: {
    Azumarill: {
      item: "Sitrus Berry",
      moves: ["Aqua Jet", "Aqua Tail", "Covet", "Play Rough"],
    },
    Torracat: {
      nature: "Careful",
      item: "Sitrus Berry",
    },
    Clodsire: {
      nature: "Sassy",
      item: "Poison Barb",
      moves: ["Mud Shot", "Poison Jab", "Rock Tomb", "Yawn"],
    },
    Perrserker: {
      nature: "Hasty",
      item: "Sitrus Berry",
    },
    Drednaw: {
      nature: "Adamant",
      ability: "Shell Armor",
      item: "Mystic Water",
      moves: ["Aqua Jet", "Bite", "Razor Shell", "Rock Tomb"],
    },
    Tentacruel: {
      nature: "Calm",
      item: "Mystic Water",
      moves: ["Acid Spray", "Bubble Beam", "Rapid Spin", "Sludge"],
    },
  },
  team: ["Azumarill", "Torracat", "Clodsire", "Perrserker", "Drednaw", "Tentacruel"],
});

export const ceruleanCityRivalBattle: Moment = {
  label: "Cerulean City Rival Battle",
  kind: "battle",
  data: {
    playerBox: _box9,
    opponentBox: ceruleanCityRivalBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Hitmonlee"],
            turns: [
              [
                { opponent: "{o:Hitmonlee} Fake Out {p:Azumarill} to {+:83}" },
                { player: "{p:Azumarill} flinched" },
              ],
            ],
            branches: [
              {
                branches: [
                  "80% → Hitmonlee switch to Wartortle",
                  "20% → Azumarill Covet Hitmonlee",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "80% → Hitmonlee switch to Wartortle",
        matchups: [
          {
            matchup: ["Hitmonlee"],
            turns: [],
            branches: [
              {
                branches: [
                  "94% → Azumarill Covet Wartortle",
                  "6% → Azumarill Covet Wartortle (crit)",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "94% → Azumarill Covet Wartortle",
        matchups: [
          {
            matchup: ["Hitmonlee"],
            turns: [
              [
                { opponent: "{o:Hitmonlee} switch to {o:Wartortle}" },
                { player: "{p:Azumarill} Covet {o:Wartortle} to {-:60}" },
              ],
            ],
            branches: [{ branches: ["Wartortle matchup"] }],
          },
        ],
      },
      {
        line: "Wartortle matchup",
        matchups: [
          {
            matchup: ["Wartortle"],
            turns: [],
            branches: [
              {
                branches: [
                  "94% → Azumarill Aqua Tail Wartortle",
                  "6% → Azumarill Aqua Tail Wartortle (crit)",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "6% → Azumarill Covet Wartortle (crit)",
        matchups: [
          {
            matchup: ["Hitmonlee"],
            turns: [
              [
                { opponent: "{o:Hitmonlee} switch to {o:Wartortle}" },
                { player: "{p:Azumarill} Covet {o:Wartortle} (crit) to {-:49}" },
              ],
            ],
          },
          {
            matchup: ["Wartortle"],
            turns: [
              [
                { opponent: "{o:Wartortle} Shell Smash" },
                { player: "{p:Azumarill} Aqua Tail {o:Wartortle} to {-:28}" },
              ],
            ],
            branches: [{ branches: ["Azumarill switch to Clodsire"] }],
          },
        ],
      },
      {
        line: "94% → Azumarill Aqua Tail Wartortle",
        matchups: [
          {
            matchup: ["Wartortle"],
            turns: [
              [
                { opponent: "{o:Wartortle} Shell Smash" },
                { player: "{p:Azumarill} Aqua Tail {o:Wartortle} to {-:39}" },
              ],
            ],
            branches: [{ branches: ["Azumarill switch to Torracat"] }],
          },
        ],
      },
      {
        line: "6% → Azumarill Aqua Tail Wartortle (crit)",
        matchups: [
          {
            matchup: ["Wartortle"],
            turns: [
              [
                { opponent: "{o:Wartortle} Shell Smash" },
                { player: "{p:Azumarill} Aqua Tail {o:Wartortle} (crit) to {-:27}" },
              ],
            ],
            branches: [{ branches: ["Azumarill switch to Clodsire"] }],
          },
        ],
      },
      {
        line: "20% → Azumarill Covet Hitmonlee",
        matchups: [
          {
            matchup: ["Hitmonlee"],
            turns: [
              [
                { opponent: "{o:Hitmonlee} Knock Off {p:Azumarill} to {+:61}" },
                { player: "{p:Azumarill} Covet {o:Hitmonlee} to {=:0}" },
                { opponent: "{o:Hitmonlee} fainted" },
              ],
            ],
            branches: [
              {
                branches: [
                  "94% → Azumarill Play Rough Wartortle",
                  "6% → Azumarill Play Rough Wartortle (crit)",
                ],
              },
            ],
          },
        ],
        frags: { Azumarill: 1 },
      },
      {
        line: "94% → Azumarill Play Rough Wartortle",
        matchups: [
          {
            matchup: ["Wartortle"],
            turns: [
              [
                { opponent: "{o:Wartortle} Shell Smash" },
                { player: "{p:Azumarill} Play Rough {o:Wartortle} to {-:36}" },
              ],
            ],
            branches: [{ branches: ["Azumarill switch to Torracat"] }],
          },
        ],
      },
      {
        line: "6% → Azumarill Play Rough Wartortle (crit)",
        matchups: [
          {
            matchup: ["Wartortle"],
            turns: [
              [
                { opponent: "{o:Wartortle} Shell Smash" },
                { player: "{p:Azumarill} Play Rough {o:Wartortle} (crit) to {-:13}" },
              ],
            ],
            branches: [{ branches: ["Azumarill switch to Clodsire"] }],
          },
        ],
      },
      {
        line: "Azumarill switch to Torracat",
        matchups: [
          {
            matchup: ["Wartortle"],
            turns: [
              [
                { player: "{p:Azumarill} switch to {p:Torracat}" },
                { opponent: "{o:Wartortle} HP Electric {p:Torracat} to {+:45}" },
              ],
              [
                { player: "{p:Torracat} Fake Out {o:Wartortle} to {-:25}" },
                { opponent: "{o:Wartortle} flinched" },
              ],
              [
                { player: "{p:Torracat} switch to {p:Clodsire}" },
                { opponent: "{o:Wartortle} Water Pulse {p:Clodsire}" },
              ],
            ],
            branches: [{ branches: ["Clodsire switch to Perrserker"] }],
          },
        ],
      },
      {
        line: "Azumarill switch to Clodsire",
        matchups: [
          {
            matchup: ["Wartortle"],
            turns: [
              [
                { player: "{p:Azumarill} switch to {p:Clodsire}" },
                { opponent: "{o:Wartortle} HP Electric {p:Clodsire}" },
              ],
            ],
            branches: [{ branches: ["Clodsire switch to Perrserker"] }],
          },
        ],
      },
      {
        line: "Clodsire switch to Perrserker",
        matchups: [
          {
            matchup: ["Wartortle"],
            turns: [
              [
                { player: "{p:Clodsire} switch to {p:Perrserker}" },
                { opponent: "{o:Wartortle} Icy Wind {p:Perrserker} to {+:72}" },
              ],
              [
                { player: "{p:Perrserker} Fake Out {o:Wartortle} to {-:12}" },
                { opponent: "{o:Wartortle} flinched" },
              ],
              [
                { player: "{p:Perrserker} Bullet Punch {o:Wartortle} to {=:0}" },
                { opponent: "{o:Wartortle} fainted" },
              ],
            ],
          },
          {
            matchup: ["Simisear"],
            turns: [
              [
                { player: "{p:Perrserker} switch to {p:Drednaw}" },
                { opponent: "{o:Simisear} Incinerate {p:Drednaw} to {+:84}" },
              ],
              [
                { opponent: "{o:Simisear} Incinerate {p:Drednaw} to {+:71}" },
                { player: "{p:Drednaw} Razor Shell {o:Simisear} to {=:0}" },
                { opponent: "{o:Simisear} fainted" },
              ],
            ],
          },
          {
            matchup: ["Arbok"],
            turns: [
              [
                { player: "{p:Drednaw} switch to {p:Clodsire}" },
                { opponent: "{o:Arbok} Thunder Fang {p:Clodsire}" },
              ],
              [
                { opponent: "{o:Arbok} Crunch {p:Clodsire} to {+:50}" },
                { player: "{p:Clodsire} Mud Shot {o:Arbok} to {-:62}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Perrserker}" },
                { opponent: "{o:Arbok} Crunch {p:Perrserker} to {+:42}" },
              ],
              [
                { player: "{p:Perrserker} Fake Out {o:Arbok} to {-:45}" },
                { opponent: "{o:Arbok} flinched" },
              ],
              [
                { player: "{p:Perrserker} Iron Head {o:Arbok} to {=:0}" },
                { opponent: "{o:Arbok} fainted" },
              ],
            ],
            branches: [
              {
                if: ["20% → Azumarill Covet Hitmonlee"],
                branches: ["50% → Clefable matchup"],
              },
              { branches: ["50% → Hitmonlee matchup", "50% → Clefable matchup"] },
            ],
          },
        ],
        frags: { Perrserker: 2, Drednaw: 1 },
      },
      {
        line: "50% → Hitmonlee matchup",
        matchups: [
          {
            matchup: ["Hitmonlee"],
            turns: [
              [
                { player: "{p:Perrserker} switch to {p:Azumarill}" },
                { opponent: "{o:Hitmonlee} Low Sweep {p:Azumarill} to {+:51}" },
              ],
              [
                { opponent: "{o:Hitmonlee} Knock Off {p:Azumarill} to {+:29}" },
                { player: "{p:Azumarill} Play Rough {o:Hitmonlee} to {=:0}" },
              ],
            ],
            branches: [
              {
                if: ["50% → Clefable matchup"],
                branches: ["Azumarill switch to Perrserker"],
              },
              { branches: ["Azumarill switch to Clodsire 2"] },
            ],
          },
        ],
        frags: { Azumarill: 1 },
      },
      {
        line: "Azumarill switch to Clodsire 2",
        matchups: [
          {
            matchup: ["Clefable"],
            turns: [
              [
                { player: "{p:Azumarill} switch to {p:Clodsire}" },
                { opponent: "{o:Clefable} Charge Beam {p:Clodsire}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Tentacruel}" },
                { opponent: "{o:Clefable} Icy Wind {p:Tentacruel} to {+:81}" },
              ],
              [
                { player: "{p:Tentacruel} Acid Spray {o:Clefable} to {-:66}" },
                { opponent: "{o:Clefable} Charge Beam {p:Tentacruel} to {+:42}" },
              ],
              [
                { player: "{p:Tentacruel} Sludge {o:Clefable} to {=:0}" },
                { opponent: "{o:Clefable} fainted" },
              ],
            ],
          },
          {
            matchup: ["Eevee"],
            turns: [
              [
                { player: "{p:Tentacruel} Acid Spray {o:Eevee} to {-:53}" },
                { opponent: "{o:Eevee} Round {p:Tentacruel} to {+:28}" },
              ],
              [
                { player: "{p:Tentacruel} Bubble Beam {o:Eevee} to {=:0}" },
                { opponent: "{o:Eevee} fainted" },
              ],
            ],
          },
        ],
        frags: { Tentacruel: 2 },
      },
      {
        line: "50% → Clefable matchup",
        matchups: [
          {
            matchup: ["Clefable"],
            turns: [
              [
                { player: "{p:Perrserker} switch to {p:Tentacruel}" },
                { opponent: "{o:Clefable} Mystical Fire {p:Tentacruel} to {+:77}" },
              ],
              [
                { player: "{p:Tentacruel} Acid Spray {o:Clefable} to {-:66}" },
                { opponent: "{o:Clefable} Charge Beam {p:Tentacruel} to {+:38}" },
              ],
              [
                { player: "{p:Tentacruel} Sludge {o:Clefable} to {=:0}" },
                { opponent: "{o:Clefable} fainted" },
              ],
            ],
            branches: [
              { if: ["20% → Azumarill Covet Hitmonlee"], branches: ["50% → Eevee matchup"] },
              { branches: ["50% → Eevee matchup", "50% → Hitmonlee matchup"] },
            ],
          },
        ],
        frags: { Tentacruel: 1 },
      },
      {
        line: "50% → Eevee matchup",
        matchups: [
          {
            matchup: ["Eevee"],
            turns: [
              [
                { player: "{p:Tentacruel} Acid Spray {o:Eevee} to {-:53}" },
                { opponent: "{o:Eevee} Round {p:Tentacruel} to {+:24}" },
              ],
              [
                { player: "{p:Tentacruel} Bubble Beam {o:Eevee} to {=:0}" },
                { opponent: "{o:Eevee} fainted" },
              ],
            ],
            branches: [
              {
                ifNot: ["20% → Azumarill Covet Hitmonlee", "50% → Hitmonlee matchup"],
                branches: ["Tentacruel switch to Azumarill"],
              },
            ],
          },
        ],
        frags: { Tentacruel: 1 },
      },
      {
        line: "Tentacruel switch to Azumarill",
        matchups: [
          {
            matchup: ["Hitmonlee"],
            turns: [
              [
                { player: "{p:Tentacruel} switch to {p:Azumarill}" },
                { opponent: "{o:Hitmonlee} Knock Off {p:Azumarill} to {+:61}" },
              ],
              [
                { opponent: "{o:Hitmonlee} Low Sweep {p:Azumarill} to {+:29}" },
                { player: "{p:Azumarill} Play Rough {o:Hitmonlee} to {=:0}" },
              ],
            ],
          },
        ],
        frags: { Azumarill: 1 },
      },
      {
        line: "Azumarill switch to Perrserker",
        matchups: [
          {
            matchup: ["Eevee"],
            turns: [
              [
                { player: "{p:Azumarill} switch to {p:Perrserker}" },
                { opponent: "{o:Eevee} Double Kick {p:Perrserker} to {+:6}" },
              ],
              [
                { player: "{p:Perrserker} Fake Out {o:Eevee} to {-:49}" },
                { opponent: "{o:Eevee} flinched" },
              ],
              [
                { player: "{p:Perrserker} Iron Head {o:Eevee} to {=:0}" },
                { opponent: "{o:Eevee} fainted" },
              ],
            ],
          },
        ],
        frags: { Perrserker: 1 },
      },
    ],
  },
};

const _box10 = getBox({
  box: _box9,
  update: [
    {
      Houndour: {
        moves: ["Dark Pulse", "Incinerate", "Leer", "Sucker Punch"],
      },
    },
    {
      Houndour: {
        name: "Houndoom",
        moves: ["Dark Pulse", "Flame Burst", "Leer", "Sucker Punch"],
      },
    },
  ],
});

export const ceruleanCityRivalBoxChange: Moment = {
  label: "Cerulean City Rival Box Change",
  kind: "boxChange",
  data: { playerBox: _box10 },
};

const _box11 = getBox({ box: _box10, team: ["Houndoom", "Drednaw"] });

export const nuggetBridgeBugCatcherCaleBattle: Moment = {
  label: "Nugget Bridge Bug Catcher Cale Battle",
  kind: "battle",
  data: {
    playerBox: _box11,
    opponentBox: nuggetBridgeBugCatcherCaleBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Butterfree", "Vivillon"],
            turns: [
              [
                { player: "{p:Houndoom} Flame Burst {o:Vivillon} to {=:0}" },
                { player: "{p:Drednaw} Rock Tomb {o:Butterfree} to {=:0}" },
                { opponent: "{o:Vivillon} fainted" },
                { opponent: "{o:Butterfree} fainted" },
              ],
            ],
          },
          {
            matchup: ["Wormadam-Sa"],
            turns: [
              [
                { player: "{p:Drednaw} Aqua Jet {o:Wormadam-Sa} to {-:33}" },
                { opponent: "{p:Drednaw} Rocky Helmet to {=:81}" },
                { player: "{p:Houndoom} Flame Burst {o:Wormadam-Sa} to {=:0}" },
                { opponent: "{o:Wormadam-Sa} fainted" },
              ],
            ],
          },
        ],
        frags: { Houndoom: 2, Drednaw: 1 },
      },
    ],
  },
};

const _box12 = getBox({
  box: _box11,
  update: {
    Azumarill: {
      nature: "Adamant",
      item: "Pixie Plate",
    },
    Perrserker: {
      nature: "Adamant",
    },
  },
  team: ["Azumarill", "Perrserker"],
});

export const nuggetBridgeLassAliBattle: Moment = {
  label: "Nugget Bridge Lass Ali Battle",
  kind: "battle",
  data: {
    playerBox: _box12,
    opponentBox: nuggetBridgeLassAliBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Amaura", "Jigglypuff"],
            turns: [
              [
                { player: "{p:Azumarill} Aqua Tail {o:Amaura} to {=:0}" },
                { player: "{p:Perrserker} Iron Head {o:Jigglypuff} to {=:0}" },
                { opponent: "{o:Amaura} fainted" },
                { opponent: "{o:Jigglypuff} fainted" },
              ],
            ],
          },
          {
            matchup: ["Brionne"],
            turns: [
              [
                { player: "{p:Perrserker} Bullet Punch {o:Brionne} to {-:63}" },
                { player: "{p:Azumarill} Play Rough {o:Brionne} to {=:0}" },
                { opponent: "{o:Brionne} fainted" },
              ],
            ],
          },
        ],
        frags: { Azumarill: 2, Perrserker: 1 },
      },
    ],
  },
};

const _box13 = getBox({ box: _box12, team: ["Houndoom", "Perrserker"] });

export const nuggetBridgeYoungsterTimmyBattle: Moment = {
  label: "Nugget Bridge Youngster Timmy Battle",
  kind: "battle",
  data: {
    playerBox: _box13,
    opponentBox: nuggetBridgeYoungsterTimmyBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Electrike", "Plusle"],
            turns: [
              [
                { player: "{p:Perrserker} Fake Out {o:Plusle} to {-:48}" },
                { opponent: "{o:Plusle} flinched" },
                { player: "{p:Houndoom} Dark Pulse {o:Electrike} to {=:0}" },
                { opponent: "{o:Electrike} fainted" },
              ],
            ],
          },
          {
            matchup: ["Snover", "Plusle"],
            turns: [
              [
                { player: "{p:Houndoom} Sucker Punch {o:Plusle} to {=:0}" },
                { player: "{p:Perrserker} Iron Head {o:Snover} to {=:0}" },
                { opponent: "{o:Plusle} fainted" },
                { opponent: "{o:Snover} fainted" },
              ],
            ],
          },
        ],
        frags: { Houndoom: 2, Perrserker: 1 },
      },
    ],
  },
};

const _box14 = getBox({
  box: _box13,
  update: {
    Magikarp: {
      name: "Gyarados",
      moves: ["Bite", "Splash"],
    },
  },
});

export const nuggetBridgeYoungsterTimmyBoxChange: Moment = {
  label: "Nugget Bridge Youngster Timmy Box Change",
  kind: "boxChange",
  data: { playerBox: _box14 },
};

const _box15 = getBox({
  box: _box14,
  update: {
    Perrserker: {
      item: "Cheri Berry",
    },
    Gyarados: {
      nature: "Adamant",
      item: "Sitrus Berry",
      moves: ["Bite", "Ice Fang", "Leer", "Thrash"],
    },
    Azumarill: {
      moves: ["Aqua Jet", "Aqua Tail", "Ice Punch", "Play Rough"],
    },
    Tentacruel: {
      item: "Persim Berry",
    },
  },
  team: ["Perrserker", "Gyarados", "Azumarill", "Clodsire", "Tentacruel"],
});

export const nuggetBridgeLassReliBattle: Moment = {
  label: "Nugget Bridge Lass Reli Battle",
  kind: "battle",
  data: {
    playerBox: _box15,
    opponentBox: nuggetBridgeLassReliBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Greedent"],
            turns: [
              [
                { player: "{p:Perrserker} Fake Out {o:Greedent} to {-:90}" },
                { opponent: "{o:Greedent} flinched" },
              ],
              [
                { player: "{p:Perrserker} switch to {p:Gyarados}" },
                { opponent: "{o:Greedent} Stom. Tantrum {p:Gyarados}" },
              ],
              [
                { player: "{p:Gyarados} Leer {o:Greedent}" },
                { opponent: "{o:Greedent} Facade {p:Gyarados} to {+:54}" },
              ],
              [
                { player: "{p:Gyarados} Leer {o:Greedent}" },
                { opponent: "{o:Greedent} Facade {p:Gyarados} to {+:33}" },
              ],
              [
                { player: "{p:Gyarados} switch to {p:Azumarill}" },
                { opponent: "{o:Greedent} Facade {p:Azumarill} to {+:39}" },
              ],
              [
                { player: "{p:Azumarill} Play Rough {o:Greedent} to {=:0}" },
                { opponent: "{o:Greedent} fainted" },
              ],
            ],
          },
          {
            matchup: ["Togetic"],
            turns: [
              [
                { player: "{p:Azumarill} switch to {p:Perrserker}" },
                { opponent: "{o:Togetic} Thunder Wave {p:Perrserker}" },
              ],
              [
                { player: "{p:Perrserker} Iron Head {o:Togetic} to {=:0}" },
                { opponent: "{o:Togetic} fainted" },
              ],
            ],
          },
          {
            matchup: ["Clamperl"],
            turns: [
              [
                { player: "{p:Perrserker} switch to {p:Clodsire}" },
                { opponent: "{o:Clamperl} Icy Wind {p:Clodsire} to {+:57}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Tentacruel}" },
                { opponent: "{o:Clamperl} Icy Wind {p:Tentacruel} to {+:78}" },
              ],
              [
                { player: "{p:Tentacruel} Acid Spray {o:Clamperl} to {-:40}" },
                { opponent: "{o:Clamperl} Water Pulse {p:Tentacruel} to {+:56}" },
              ],
              [
                { player: "{p:Tentacruel} Sludge {o:Clamperl} to {=:0}" },
                { opponent: "{o:Clamperl} fainted" },
              ],
            ],
          },
        ],
        frags: { Azumarill: 1, Perrserker: 1, Tentacruel: 1 },
      },
    ],
  },
};

const _box16 = getBox({
  box: _box15,
  update: {
    Houndoom: {
      item: "Wise Glasses",
    },
  },
  team: ["Houndoom", "Azumarill", "Tentacruel"],
});

export const nuggetBridgeCamperEthanBattle: Moment = {
  label: "Nugget Bridge Camper Ethan Battle",
  kind: "battle",
  data: {
    playerBox: _box16,
    opponentBox: nuggetBridgeCamperEthanBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Mabosstiff"],
            turns: [
              [
                { player: "{p:Houndoom} Flame Burst {o:Mabosstiff} to {-:45}" },
                { opponent: "{o:Mabosstiff} Bite {p:Houndoom} to {+:52}" },
              ],
              [
                { player: "{p:Houndoom} switch to {p:Azumarill}" },
                { opponent: "{o:Mabosstiff} Bite {p:Azumarill} to {+:75}" },
              ],
              [
                { opponent: "{o:Mabosstiff} Trailblaze {p:Azumarill} to {+:25}" },
                { player: "{p:Azumarill} Play Rough {o:Mabosstiff} to {=:0}" },
              ],
            ],
          },
          {
            matchup: ["Misdreavus"],
            turns: [
              [
                { player: "{p:Azumarill} switch to {p:Tentacruel}" },
                { opponent: "{o:Misdreavus} Will-O-Wisp {p:Tentacruel}" },
                { opponent: "{p:Tentacruel} burn to {+:86}" },
              ],
              [
                { player: "{p:Tentacruel} Acid Spray {o:Misdreavus} to {-:70}" },
                { opponent: "{o:Misdreavus} Hex {p:Tentacruel} to {+:37}" },
                { opponent: "{p:Tentacruel} burn to {+:32}" },
              ],
              [
                { player: "{p:Tentacruel} switch to {p:Houndoom}" },
                { opponent: "{o:Misdreavus} Hex {p:Houndoom} to {+:34}" },
              ],
              [
                { player: "{p:Houndoom} Dark Pulse {o:Misdreavus} to {=:0}" },
                { opponent: "{o:Misdreavus} fainted" },
              ],
            ],
          },
          {
            matchup: ["Salandit"],
            turns: [
              [
                { player: "{p:Houndoom} Dark Pulse {o:Salandit} to {=:0}" },
                { opponent: "{o:Salandit} fainted" },
              ],
            ],
          },
        ],
        frags: { Azumarill: 1, Houndoom: 2 },
      },
    ],
  },
};

const _box17 = getBox({
  box: _box16,
  update: {
    "Yamask-G": {
      moves: ["Disable", "Haze", "Rock Tomb", "Shadow Sneak"],
    },
    Drednaw: {
      moves: ["Aqua Jet", "Ice Fang", "Razor Shell", "Rock Tomb"],
    },
    Perrserker: {
      ability: "Battle Armor",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Bullet Punch", "Iron Head", "Metal Burst"],
    },
    Azumarill: {
      item: "Pecha Berry",
    },
  },
  team: ["Yamask-G", "Drednaw", "Perrserker", "Azumarill"],
});

export const nuggetBridgeGruntBattle: Moment = {
  label: "Nugget Bridge Grunt Battle",
  kind: "battle",
  data: {
    playerBox: _box17,
    opponentBox: nuggetBridgeGruntBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Arcanine"],
            turns: [
              [
                { opponent: "{o:Arcanine} Dragon Rage {p:Yamask-G} to {=:27}" },
                { player: "{p:Yamask-G} Rock Tomb {o:Arcanine} to {-:74}" },
              ],
              [
                { player: "{p:Yamask-G} switch to {p:Drednaw}" },
                { opponent: "{o:Arcanine} Dragon Rage {p:Drednaw} to {=:57}" },
              ],
              [
                { player: "{p:Drednaw} Razor Shell {o:Arcanine} to {=:0}" },
                { opponent: "{o:Arcanine} fainted" },
              ],
            ],
          },
          {
            matchup: ["Togedemaru"],
            turns: [
              [
                { player: "{p:Drednaw} switch to {p:Perrserker}" },
                { opponent: "{o:Togedemaru} Zippy Zap {p:Perrserker} to {+:76}" },
              ],
              [
                { opponent: "{o:Togedemaru} Zippy Zap {p:Perrserker} to {+:55}" },
                { player: "{p:Perrserker} Metal Burst {o:Togedemaru} to {-:53}" },
              ],
              [
                { opponent: "{o:Togedemaru} Zippy Zap {p:Perrserker} to {+:58}" },
                { player: "{p:Perrserker} Metal Burst {o:Togedemaru} to {-:26}" },
              ],
              [
                { opponent: "{o:Togedemaru} Zippy Zap {p:Perrserker} to {+:37}" },
                { player: "{p:Perrserker} Metal Burst {o:Togedemaru} to {=:0}" },
                { opponent: "{o:Togedemaru} fainted" },
              ],
            ],
          },
          {
            matchup: ["Komala"],
            turns: [
              [
                { player: "{p:Perrserker} switch to {p:Yamask-G}" },
                { opponent: "{o:Komala} Last Resort {p:Yamask-G}" },
              ],
              [
                { opponent: "{o:Komala} Last Resort {p:Yamask-G}" },
                { player: "{p:Yamask-G} Rock Tomb {o:Komala} to {-:76}" },
              ],
              [
                { opponent: "{o:Komala} Last Resort {p:Yamask-G}" },
                { player: "{p:Yamask-G} Rock Tomb {o:Komala} to {-:64}" },
              ],
              [
                { opponent: "{o:Komala} Last Resort {p:Yamask-G}" },
                { player: "{p:Yamask-G} Rock Tomb {o:Komala} to {-:52}" },
              ],
              [
                { opponent: "{o:Komala} Last Resort {p:Yamask-G}" },
                { player: "{p:Yamask-G} Rock Tomb {o:Komala} to {-:40}" },
              ],
              [
                { opponent: "{o:Komala} Last Resort {p:Yamask-G}" },
                { player: "{p:Yamask-G} Rock Tomb {o:Komala} to {-:28}" },
              ],
              [
                { opponent: "{o:Komala} Last Resort {p:Yamask-G}" },
                { player: "{p:Yamask-G} Rock Tomb {o:Komala} to {-:16}" },
              ],
              [
                { opponent: "{o:Komala} Last Resort {p:Yamask-G}" },
                { player: "{p:Yamask-G} Rock Tomb {o:Komala} to {-:4}" },
              ],
              [
                { opponent: "{o:Komala} Last Resort {p:Yamask-G}" },
                { player: "{p:Yamask-G} Rock Tomb {o:Komala} to {=:0}" },
                { opponent: "{o:Komala} fainted" },
              ],
            ],
          },
          {
            matchup: ["Druddigon"],
            turns: [
              [
                { player: "{p:Yamask-G} switch to {p:Azumarill}" },
                { opponent: "{o:Druddigon} Dragon Tail {p:Azumarill}" },
              ],
              [
                { player: "{p:Azumarill} Play Rough {o:Druddigon} to {-:17}" },
                { opponent: "{o:Druddigon} Rough Skin {p:Azumarill} to {=:90}" },
                { opponent: "{o:Druddigon} Poison Tail {p:Azumarill} to {+:34}" },
              ],
              [
                { player: "{p:Azumarill} Play Rough {o:Druddigon} to {=:0}" },
                { opponent: "{o:Druddigon} Rough Skin {p:Azumarill} to {=:22}" },
                { opponent: "{o:Druddigon} fainted" },
              ],
            ],
          },
        ],
        frags: { Drednaw: 1, Perrserker: 1, "Yamask-G": 1, Azumarill: 1 },
      },
    ],
  },
};

const _charcadet = {
  name: "Charcadet",
  moves: ["Clear Smog", "Ember", "Fire Spin", "Leer"],
};

const _box18 = getBox({ box: _box17, team: ["Houndoom"] });

export const route24Encounter: Moment = {
  label: "Route 24 Encounter",
  kind: "encounter",
  data: { pokemon: _charcadet, playerBox: _box18 },
};

const _chinchou = {
  name: "Chinchou",
  moves: ["Bubble", "Supersonic"],
};

export const route25Encounter: Moment = {
  label: "Route 25 Encounter",
  kind: "encounter",
  data: { pokemon: _chinchou },
};

const _box19 = getBox({
  box: _box18,
  add: [_charcadet, _chinchou],
  update: {
    Azumarill: {
      item: "Pixie Plate",
      moves: ["Aqua Jet", "Body Slam", "Helping Hand", "Play Rough"],
    },
    Perrserker: {
      nature: "Calm",
      moves: ["Fake Out", "Bullet Punch", "Iron Head", "Thief"],
    },
    Clodsire: {
      nature: "Impish",
    },
    Houndoom: {
      item: "Black Glasses",
    },
    Kricketune: {
      item: "Chilan",
      moves: ["Bug Bite", "Bulldoze", "Bullet Seed", "Pounce"],
    },
  },
  team: ["Azumarill", "Perrserker", "Clodsire", "Houndoom", "Yamask-G", "Kricketune"],
});

export const digHouseGruntBattle: Moment = {
  label: "Dig House Grunt Battle",
  kind: "battle",
  data: {
    playerBox: _box19,
    opponentBox: digHouseGruntBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Persian-A"],
            turns: [
              [
                { opponent: "{o:Persian-A} Shock Wave {p:Azumarill} to {+:36}" },
                { player: "{p:Azumarill} Play Rough {o:Persian-A} to {=:0}" },
                { opponent: "{o:Persian-A} fainted" },
              ],
            ],
          },
          {
            matchup: ["Crobat"],
            turns: [
              [
                { player: "{p:Azumarill} switch to {p:Perrserker}" },
                { opponent: "{o:Crobat} Air Cutter {p:Perrserker} to {+:84}" },
              ],
              [
                { player: "{p:Perrserker} Fake Out {o:Crobat} to {-:77}" },
                { opponent: "{o:Crobat} flinched" },
              ],
              [
                { opponent: "{o:Crobat} HP Fire {p:Perrserker} to {+:48}" },
                { player: "{p:Perrserker} Iron Head {o:Crobat} to {-:44}" },
              ],
              [
                { opponent: "{o:Crobat} HP Fire {p:Perrserker} to {+:36}" },
                { player: "{p:Perrserker} Iron Head {o:Crobat} to {-:11}" },
              ],
              [
                { player: "{p:Perrserker} Bullet Punch {o:Crobat} to {=:0}" },
                { opponent: "{o:Crobat} fainted" },
              ],
            ],
          },
          {
            matchup: ["Veluza"],
            turns: [
              [
                { player: "{p:Perrserker} switch to {p:Clodsire}" },
                { opponent: "{o:Veluza} Aqua Cutter {p:Clodsire}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Houndoom}" },
                { opponent: "{o:Veluza} Psycho Cut {p:Houndoom}" },
              ],
              [
                { player: "{p:Houndoom} Dark Pulse {o:Veluza} to {=:0}" },
                { opponent: "{o:Veluza} fainted" },
              ],
            ],
          },
          {
            matchup: ["Raticate"],
            turns: [
              [
                { player: "{p:Houndoom} switch to {p:Yamask-G}" },
                { opponent: "{o:Raticate} Stom. Tantrum {p:Yamask-G} to {+:37}" },
              ],
              [
                { player: "{p:Yamask-G} switch to {p:Kricketune}" },
                { opponent: "{o:Raticate} Stom. Tantrum {p:Kricketune} to {+:82}" },
                { player: "{o:Raticate} burn to {=:73}" },
              ],
              [
                { opponent: "{o:Raticate} Facade {p:Kricketune} to {+:41}" },
                { player: "{p:Kricketune} Pounce {o:Raticate} to {-:28}" },
                { player: "{o:Raticate} burn to {-:24}" },
              ],
              [
                { player: "{p:Kricketune} Pounce {o:Raticate} to {=:0}" },
                { player: "{o:Raticate} fainted" },
              ],
            ],
          },
        ],
        frags: { Azumarill: 1, Perrserker: 1, Houndoom: 1, Kricketune: 1 },
      },
    ],
  },
};

const _growlitheH = {
  name: "Growlithe-H",
  spriteKey: "growlithe-hisui",
  pokedexKey: "Growlithe-Hisui",
  moves: ["Flame Wheel", "Helping Hand", "Leer", "Odor Sleuth"],
};

const _box20 = getBox({ box: _box19, team: ["Houndoom"] });

export const route5Encounter: Moment = {
  label: "Route 5 Encounter",
  kind: "encounter",
  data: { pokemon: _growlitheH, playerBox: _box20 },
};

const _shellder = {
  name: "Shellder",
  moves: ["Tackle", "Water Gun"],
};

export const route6Encounter: Moment = {
  label: "Route 6 Encounter",
  kind: "encounter",
  data: { pokemon: _shellder },
};

const _box21 = getBox({
  box: _box20,
  add: [_growlitheH, _shellder],
  cap: 28,
  update: {
    Chinchou: {
      name: "Lanturn",
    },
    Psyduck: {
      name: "Golduck",
      moves: ["Scald", "Scratch", "Water Sport"],
    },
  },
});

export const route6BoxChange: Moment = {
  label: "Route 6 Box Change",
  kind: "boxChange",
  data: { playerBox: _box21 },
};

const _box22 = getBox({
  box: _box21,
  update: {
    Kricketune: {
      nature: "Adamant",
      item: "Muscle Band",
      moves: ["Aerial Ace", "Bug Bite", "Bulldoze", "Bullet Seed"],
    },
    Lanturn: {
      nature: "Calm",
      ability: "Volt Absorb",
      item: "Sitrus Berry",
      moves: ["Bubble Beam", "Icy Wind", "Shock Wave", "Thunder Wave"],
    },
    Perrserker: {
      nature: "Adamant",
      item: "Rawst Berry",
      moves: ["Bullet Punch", "Iron Head", "Metal Burst", "Thief"],
    },
    Gyarados: {
      moves: ["Bite", "Bulldoze", "Ice Fang", "Leer"],
    },
    Golduck: {
      nature: "Rash",
      ability: "Swift Swim",
      item: "Colbur Berry",
      moves: ["Disable", "Me First", "Tail Whip", "Zen Headbutt"],
    },
    Clodsire: {
      nature: "Careful",
      item: "Payapa Berry",
      moves: ["Bulldoze", "Poison Jab", "Rock Tomb", "Yawn"],
    },
  },
  team: ["Kricketune", "Lanturn", "Perrserker", "Gyarados", "Golduck", "Clodsire"],
});

export const ceruleanCityLeaderMistyBattle: Moment = {
  label: "Cerulean City Leader Misty Battle",
  kind: "battle",
  data: {
    playerBox: _box22,
    opponentBox: ceruleanCityLeaderMistyBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Politoed"],
            turns: [
              [
                { player: "{p:Kricketune} Bug Bite {o:Politoed} to {-:48}" },
                { opponent: "{o:Politoed} Toxic {p:Kricketune}" },
                { opponent: "{p:Kricketune} poison to {+:84}" },
              ],
              [
                { player: "{p:Kricketune} Bullet Seed {o:Politoed} to {=:0}" },
                { opponent: "{o:Politoed} fainted" },
                { opponent: "{p:Kricketune} poison to {+:74}" },
              ],
            ],
          },
          {
            matchup: ["Mantine"],
            turns: [
              [
                { player: "{p:Kricketune} switch to {p:Lanturn}" },
                { opponent: "{o:Mantine} Hurricane {p:Lanturn} to {+:83}" },
              ],
              [
                { player: "{p:Lanturn} switch to {p:Perrserker}" },
                { opponent: "{o:Mantine} HP Grass {p:Perrserker} to {+:86}" },
              ],
              [
                { opponent: "{o:Mantine} Scald {p:Perrserker} to {+:22}" },
                { player: "{p:Perrserker} Metal Burst {o:Mantine} to {-:10}" },
              ],
              [
                { player: "{p:Perrserker} Bullet Punch {o:Mantine} to {=:0}" },
                { opponent: "{o:Mantine} fainted" },
              ],
            ],
          },
          {
            matchup: ["Ludicolo"],
            turns: [
              [
                { player: "{p:Perrserker} switch to {p:Gyarados}" },
                { opponent: "{o:Ludicolo} Scald {p:Gyarados} to {+:53}" },
              ],
              [
                { player: "{p:Gyarados} switch to {p:Lanturn}" },
                { opponent: "{o:Ludicolo} Thunder Punch {p:Lanturn} to {+:112}" },
              ],
              [
                { opponent: "{o:Ludicolo} Giga Drain {p:Lanturn} to {+:31}" },
                { player: "{p:Lanturn} Thunder Wave {o:Ludicolo}" },
              ],
              [
                { player: "{p:Lanturn} switch to {p:Kricketune}" },
                { opponent: "{o:Ludicolo} Giga Drain {p:Kricketune} to {+:42}" },
                { opponent: "{p:Kricketune} poison to {+:37}" },
              ],
              [
                { player: "{p:Kricketune} Bug Bite {o:Ludicolo} to {=:0}" },
                { player: "{p:Kricketune} heal to {+:59}" },
                { opponent: "{o:Ludicolo} fainted" },
                { opponent: "{p:Kricketune} poison to {+:49}" },
              ],
            ],
          },
          {
            matchup: ["Toxicroak"],
            turns: [
              [
                { player: "{p:Kricketune} switch to {p:Golduck}" },
                { opponent: "{o:Toxicroak} Swords Dance" },
              ],
            ],
            branches: [
              {
                branches: [
                  "80% → Toxicroak switch to Starmie",
                  "20% → Golduck Zen Headbutt Toxicroak",
                ],
              },
            ],
          },
        ],
        frags: { Kricketune: 2, Perrserker: 1 },
      },
      {
        line: "80% → Toxicroak switch to Starmie",
        matchups: [
          {
            matchup: ["Toxicroak"],
            turns: [
              [
                { opponent: "{o:Toxicroak} switch to {o:Starmie}" },
                { player: "{p:Golduck} Zen Headbutt {o:Starmie} to {-:67}" },
              ],
            ],
          },
          {
            matchup: ["Starmie"],
            turns: [
              [
                { player: "{p:Golduck} Me First (Thunderbolt) {p:Starmie} to {=:0}" },
                { opponent: "{o:Starmie} fainted" },
              ],
            ],
          },
          {
            matchup: ["Clodsire"],
            turns: [
              [
                { player: "{p:Golduck} Zen Headbutt {o:Clodsire} to {-:51}" },
                { opponent: "{o:Clodsire} Toxic {p:Golduck}" },
                { opponent: "{o:Clodsire} heal to {-:58}" },
                { opponent: "{p:Golduck} posion to {=:86}" },
              ],
              [
                { player: "{p:Golduck} Zen Headbutt {o:Clodsire} to {=:0}" },
                { opponent: "{o:Clodsire} fainted" },
                { opponent: "{p:Golduck} posion to {=:76}" },
              ],
            ],
          },
          {
            matchup: ["Toxicroak"],
            turns: [
              [
                { player: "{p:Golduck} Zen Headbutt {o:Toxicroak} to {=:0}" },
                { opponent: "{o:Toxicroak} fainted" },
              ],
            ],
          },
        ],
        frags: { Golduck: 3 },
      },
      {
        line: "20% → Golduck Zen Headbutt Toxicroak",
        matchups: [
          {
            matchup: ["Toxicroak"],
            turns: [
              [
                { player: "{p:Golduck} Zen Headbutt {o:Toxicroak} to {=:0}" },
                { opponent: "{o:Toxicroak} fainted" },
              ],
            ],
          },
          {
            matchup: ["Starmie"],
            turns: [
              [
                { player: "{p:Golduck} switch to {p:Clodsire}" },
                { opponent: "{o:Starmie} Thunderbolt {p:Clodsire}" },
              ],
              [
                { opponent: "{o:Starmie} Psyshock {p:Clodsire} to {+:41}" },
                { player: "{p:Clodsire} Poison Jab {o:Starmie} to {-:55}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Golduck}" },
                { opponent: "{o:Starmie} Psyshock {p:Golduck} to {+:50}" },
              ],
              [
                { player: "{p:Golduck} Me First (Thunderbolt) {p:Starmie} to {=:0}" },
                { opponent: "{o:Starmie} fainted" },
              ],
            ],
          },
          {
            matchup: ["Clodsire"],
            turns: [
              [
                { player: "{p:Golduck} Zen Headbutt {o:Clodsire} to {-:51}" },
                { opponent: "{o:Clodsire} Toxic {p:Golduck}" },
                { opponent: "{o:Clodsire} heal to {-:58}" },
                { opponent: "{p:Golduck} posion to {+:45}" },
              ],
              [
                { player: "{p:Golduck} Zen Headbutt {o:Clodsire} to {=:0}" },
                { opponent: "{o:Clodsire} fainted" },
              ],
            ],
          },
        ],
        frags: { Golduck: 3 },
      },
    ],
  },
};

const _box23 = getBox({
  box: _box22,
  remove: ["Kricketune"],
});

export const ceruleanCityLeaderMistyBoxChange: Moment = {
  label: "Cerulean City Leader Misty Box Change",
  kind: "boxChange",
  data: { playerBox: _box23 },
};

export const box = _box23;

export const moments: Moment[] = [
  mistyBoxChange,
  route3LassSallyBattle,
  mtMoonEncounter,
  route4Encounter,
  route4BoxChange,
  mtMoonSuperNerdMiguelBattle,
  mtMoonSuperNerdMiguelBoxChange,
  mtMoonArcherBattle,
  ceruleanCityEncounter,
  ceruleanCityBoxChange,
  ceruleanCityRivalBattle,
  ceruleanCityRivalBoxChange,
  nuggetBridgeBugCatcherCaleBattle,
  nuggetBridgeLassAliBattle,
  nuggetBridgeYoungsterTimmyBattle,
  nuggetBridgeYoungsterTimmyBoxChange,
  nuggetBridgeLassReliBattle,
  nuggetBridgeCamperEthanBattle,
  nuggetBridgeGruntBattle,
  route24Encounter,
  route25Encounter,
  digHouseGruntBattle,
  route5Encounter,
  route6Encounter,
  route6BoxChange,
  ceruleanCityLeaderMistyBattle,
  ceruleanCityLeaderMistyBoxChange,
];
