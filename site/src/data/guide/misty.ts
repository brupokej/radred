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
  split: "Misty",
  label: "Misty Box Change",
  kind: "boxChange",
  data: { playerBox: _box2 },
};

const _box3 = getBox({
  box: _box2,
  update: {
    Kricketune: {
      nature: "Mild",
      ability: "Technician",
      item: "Coba Berry",
      moves: ["Bug Bite", "Bulldoze", "Mega Drain", "Rock Tomb"],
    },
    Houndour: {
      nature: "Modest",
      ability: "Flash Fire",
      item: "Wise Glasses",
      moves: ["Incinerate", "Leer", "Snarl", "Sucker Punch"],
    },
    Azumarill: {
      nature: "Adamant",
      ability: "Huge Power",
      item: "Oran Berry",
      moves: ["Aqua Jet", "Aqua Tail", "Ice Punch", "Play Rough"],
    },
    "Meowth-G": {
      nature: "Lonely",
      ability: "Tough Claws",
      item: "Occa Berry",
      moves: ["Fake Out", "Growl", "Metal Claw", "Scratch"],
    },
  },
  team: ["Kricketune", "Houndour", "Azumarill", "Meowth-G"],
});

export const route3LassSallyBattle: Moment = {
  split: "Misty",
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
                { opponent: "{o:Pikachu-Flying} Zippy Zap {p:Kricketune} to {+:33}" },
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
                { opponent: "{o:Whimsicott} recover to {-:27}" },
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
            matchup: ["Mawile"],
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
  level: "12-14",
  moves: ["Fury Swipes", "Mud-Slap", "Rapid Spin", "Scratch"],
};

const _box4 = getBox({ box: _box3, add: [_drilbur] });

export const mtMoonEncounter: Moment = {
  split: "Misty",
  label: "Mt. Moon Encounter",
  kind: "encounter",
  data: { pokemon: _drilbur, playerBox: _box4 },
};

const _magikarp = {
  name: "Magikarp",
  level: "5",
  ability: "Swift Swim",
  moves: ["Splash"],
};

const _box5 = getBox({ box: _box4, add: [_magikarp] });

export const route4Encounter: Moment = {
  split: "Misty",
  label: "Route 4 Encounter",
  kind: "encounter",
  data: { pokemon: _magikarp, playerBox: _box5 },
};

const _box6 = getBox({
  box: _box5,
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
  split: "Misty",
  label: "Route 4 Box Change",
  kind: "boxChange",
  data: { playerBox: _box6 },
};

const _box7 = getBox({
  box: _box6,
  update: {
    Torracat: {
      nature: "Adamant",
      ability: "Blaze",
      item: "Black Belt",
      moves: ["Fake Out", "Double Kick", "Fire Fang", "Leer"],
    },
    Houndour: {
      nature: "Modest",
      ability: "Flash Fire",
      item: "Black Glasses",
      moves: ["Incinerate", "Leer", "Snarl", "Sucker Punch"],
    },
    Kricketune: {
      nature: "Impish",
      ability: "Technician",
      item: "Silver Powder",
      moves: ["Bug Bite", "Bulldoze", "Mega Drain", "Rock Tomb"],
    },
    "Yamask-G": {
      nature: "Sassy",
      ability: "Wandering Soul",
      item: "Rawst Berry",
      moves: ["Disable", "Haze", "Night Shade", "Shadow Sneak"],
    },
    Azumarill: {
      nature: "Impish",
      ability: "Huge Power",
      item: "Rawst Berry",
      moves: ["Aqua Jet", "Aqua Tail", "Ice Punch", "Play Rough"],
    },
  },
  team: ["Torracat", "Houndour", "Kricketune", "Yamask-G", "Azumarill"],
});

export const mtMoonSuperNerdMiguelBattle: Moment = {
  split: "Misty",
  label: "Mt. Moon Super Nerd Miguel Battle",
  kind: "battle",
  data: {
    playerBox: _box7,
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
                { opponent: "{p:Kricketune} grassy terrain to {+:47}" },
                { opponent: "{o:Thwackey} grassy terrain to {-:50}" },
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
                { opponent: "{p:Houndour} grassy terrain to {+:32}" },
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
                { opponent: "{p:Houndour} grassy terrain to {+:35}" },
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
                  "6% → Houndour Incinerate Skiddo (to 0)",
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
        line: "6% → Houndour Incinerate Skiddo (to 0)",
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
                { opponent: "{p:Houndour} grassy terrain to {+:35}" },
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
                  "6% → Houndour Incinerate Sableye and Skiddo (to 0)",
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
                { opponent: "{p:Houndour} grassy terrain to {+:7}" },
                { opponent: "{o:Sableye} grassy terrain to {-:44}" },
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
        line: "6% → Houndour Incinerate Sableye and Skiddo (to 0)",
        matchups: [
          {
            matchup: ["Skiddo", "Sableye"],
            turns: [
              [
                {
                  player:
                    "{p:Houndour} Incinerate {o:Sableye} to {-:41} and {o:Skiddo} (crit) to {=:0}",
                },
                { player: "{p:Azumarill} Play Rough {o:Skiddo} → {o:Sableye} to {=:0}" },
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

const _box8 = getBox({
  box: _box7,
  update: [
    {
      "Wooper-P": {
        name: "Clodsire",
        spriteKey: undefined,
        pokedexKey: undefined,
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
  split: "Misty",
  label: "Mt. Moon Super Nerd Miguel Box Change",
  kind: "boxChange",
  data: { playerBox: _box8 },
};

const _box9 = getBox({
  box: _box8,
  update: {
    Azumarill: {
      nature: "Impish",
      ability: "Huge Power",
      item: "Pecha Berry",
      moves: ["Aqua Jet", "Aqua Tail", "Ice Punch", "Play Rough"],
    },
    "Meowth-G": {
      nature: "Impish",
      ability: "Tough Claws",
      item: "Chesto Berry",
      moves: ["Fake Out", "Bullet Punch", "Metal Claw", "Scratch"],
    },
    Kricketune: {
      nature: "Impish",
      ability: "Technician",
      item: "Sitrus Berry",
      moves: ["Bug Bite", "Bulldoze", "Bullet Seed", "Mega Drain"],
    },
    "Yamask-G": {
      nature: "Sassy",
      ability: "Wandering Soul",
      item: "Pecha Berry",
      moves: ["Disable", "Haze", "Night Shade", "Shadow Sneak"],
    },
    Clodsire: {
      nature: "Bold",
      ability: "Water Absorb",
      item: "Yache Berry",
      moves: ["Mud Shot", "Slam", "Tackle", "Tail Whip"],
    },
    Torracat: {
      nature: "Adamant",
      ability: "Blaze",
      item: "Black Belt",
      moves: ["Fake Out", "Double Kick", "Fire Fang", "Leer"],
    },
  },
  team: ["Azumarill", "Meowth-G", "Kricketune", "Yamask-G", "Clodsire", "Torracat"],
});

export const mtMoonArcherBattle: Moment = {
  split: "Misty",
  label: "Mt. Moon Archer Battle",
  kind: "battle",
  data: {
    playerBox: _box9,
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
                { opponent: "{o:Fearow} fainted" },
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
  level: "2-4",
  moves: ["Aqua Jet", "Bite"],
};

const _box10 = getBox({ box: _box9, add: [_chewtle] });

export const ceruleanCityEncounter: Moment = {
  split: "Misty",
  label: "Cerulean City Encounter",
  kind: "encounter",
  data: { pokemon: _chewtle, playerBox: _box10 },
};

const _box11 = getBox({
  box: _box10,
  cap: 28,
  update: {
    "Meowth-G": {
      name: "Perrserker",
      spriteKey: undefined,
      pokedexKey: undefined,
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
  split: "Misty",
  label: "Cerulean City Box Change",
  kind: "boxChange",
  data: { playerBox: _box11 },
};

const _box12 = getBox({
  box: _box11,
  update: {
    Azumarill: {
      nature: "Impish",
      ability: "Huge Power",
      item: "Sitrus Berry",
      moves: ["Aqua Jet", "Aqua Tail", "Covet", "Play Rough"],
    },
    Torracat: {
      nature: "Careful",
      ability: "Blaze",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Double Kick", "Fire Fang", "Leer"],
    },
    Clodsire: {
      nature: "Sassy",
      ability: "Water Absorb",
      item: "Poison Barb",
      moves: ["Mud Shot", "Poison Jab", "Rock Tomb", "Yawn"],
    },
    Perrserker: {
      nature: "Hasty",
      ability: "Tough Claws",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Bullet Punch", "Iron Head", "Scratch"],
    },
    Drednaw: {
      nature: "Adamant",
      ability: "Shell Armor",
      item: "Mystic Water",
      moves: ["Aqua Jet", "Bite", "Razor Shell", "Rock Tomb"],
    },
    Tentacruel: {
      nature: "Calm",
      ability: "Clear Body",
      item: "Mystic Water",
      moves: ["Acid Spray", "Bubble Beam", "Rapid Spin", "Sludge"],
    },
  },
  team: ["Azumarill", "Torracat", "Clodsire", "Perrserker", "Drednaw", "Tentacruel"],
});

export const ceruleanCityRivalBattle: Moment = {
  split: "Misty",
  label: "Cerulean City Rival Battle",
  kind: "battle",
  data: {
    playerBox: _box12,
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
                { opponent: "{o:Hitmonlee} fainted" },
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
                { opponent: "{o:Hitmonlee} fainted" },
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

const _box13 = getBox({
  box: _box12,
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
  split: "Misty",
  label: "Cerulean City Rival Box Change",
  kind: "boxChange",
  data: { playerBox: _box13 },
};

const _box14 = getBox({
  box: _box13,
  update: {
    Houndoom: {
      nature: "Modest",
      ability: "Flash Fire",
      item: "Black Glasses",
      moves: ["Dark Pulse", "Flame Burst", "Leer", "Sucker Punch"],
    },
    Drednaw: {
      nature: "Adamant",
      ability: "Shell Armor",
      item: "Mystic Water",
      moves: ["Aqua Jet", "Bite", "Razor Shell", "Rock Tomb"],
    },
  },
  team: ["Houndoom", "Drednaw"],
});

export const nuggetBridgeBugCatcherCaleBattle: Moment = {
  split: "Misty",
  label: "Nugget Bridge Bug Catcher Cale Battle",
  kind: "battle",
  data: {
    playerBox: _box14,
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

const _box15 = getBox({
  box: _box14,
  update: {
    Azumarill: {
      nature: "Adamant",
      ability: "Huge Power",
      item: "Pixie Plate",
      moves: ["Aqua Jet", "Aqua Tail", "Covet", "Play Rough"],
    },
    Perrserker: {
      nature: "Adamant",
      ability: "Tough Claws",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Bullet Punch", "Iron Head", "Scratch"],
    },
  },
  team: ["Azumarill", "Perrserker"],
});

export const nuggetBridgeLassAliBattle: Moment = {
  split: "Misty",
  label: "Nugget Bridge Lass Ali Battle",
  kind: "battle",
  data: {
    playerBox: _box15,
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

const _box16 = getBox({
  box: _box15,
  update: {
    Houndoom: {
      nature: "Modest",
      ability: "Flash Fire",
      item: "Black Glasses",
      moves: ["Dark Pulse", "Flame Burst", "Leer", "Sucker Punch"],
    },
    Perrserker: {
      nature: "Adamant",
      ability: "Tough Claws",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Bullet Punch", "Iron Head", "Scratch"],
    },
  },
  team: ["Houndoom", "Perrserker"],
});

export const nuggetBridgeYoungsterTimmyBattle: Moment = {
  split: "Misty",
  label: "Nugget Bridge Youngster Timmy Battle",
  kind: "battle",
  data: {
    playerBox: _box16,
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

const _box17 = getBox({
  box: _box16,
  update: {
    Magikarp: {
      name: "Gyarados",
      ability: "Intimidate",
      moves: ["Bite", "Splash"],
    },
  },
});

export const nuggetBridgeYoungsterTimmyBoxChange: Moment = {
  split: "Misty",
  label: "Nugget Bridge Youngster Timmy Box Change",
  kind: "boxChange",
  data: { playerBox: _box17 },
};

const _box18 = getBox({
  box: _box17,
  update: {
    Perrserker: {
      nature: "Adamant",
      ability: "Tough Claws",
      item: "Cheri Berry",
      moves: ["Fake Out", "Bullet Punch", "Iron Head", "Scratch"],
    },
    Gyarados: {
      nature: "Adamant",
      ability: "Intimidate",
      item: "Sitrus Berry",
      moves: ["Bite", "Ice Fang", "Leer", "Thrash"],
    },
    Azumarill: {
      nature: "Adamant",
      ability: "Huge Power",
      item: "Pixie Plate",
      moves: ["Aqua Jet", "Aqua Tail", "Ice Punch", "Play Rough"],
    },
    Clodsire: {
      nature: "Sassy",
      ability: "Water Absorb",
      item: "Poison Barb",
      moves: ["Mud Shot", "Poison Jab", "Rock Tomb", "Yawn"],
    },
    Tentacruel: {
      nature: "Calm",
      ability: "Clear Body",
      item: "Persim Berry",
      moves: ["Acid Spray", "Bubble Beam", "Rapid Spin", "Sludge"],
    },
  },
  team: ["Perrserker", "Gyarados", "Azumarill", "Clodsire", "Tentacruel"],
});

export const nuggetBridgeLassReliBattle: Moment = {
  split: "Misty",
  label: "Nugget Bridge Lass Reli Battle",
  kind: "battle",
  data: {
    playerBox: _box18,
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

const _box19 = getBox({
  box: _box18,
  update: {
    Houndoom: {
      nature: "Modest",
      ability: "Flash Fire",
      item: "Wise Glasses",
      moves: ["Dark Pulse", "Flame Burst", "Leer", "Sucker Punch"],
    },
    Azumarill: {
      nature: "Adamant",
      ability: "Huge Power",
      item: "Pixie Plate",
      moves: ["Aqua Jet", "Aqua Tail", "Ice Punch", "Play Rough"],
    },
    Tentacruel: {
      nature: "Calm",
      ability: "Clear Body",
      item: "Persim Berry",
      moves: ["Acid Spray", "Bubble Beam", "Rapid Spin", "Sludge"],
    },
  },
  team: ["Houndoom", "Azumarill", "Tentacruel"],
});

export const nuggetBridgeCamperEthanBattle: Moment = {
  split: "Misty",
  label: "Nugget Bridge Camper Ethan Battle",
  kind: "battle",
  data: {
    playerBox: _box19,
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
                { opponent: "{o:Mabosstiff} fainted" },
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

const _box20 = getBox({
  box: _box19,
  update: {
    "Yamask-G": {
      nature: "Sassy",
      ability: "Wandering Soul",
      item: "Pecha Berry",
      moves: ["Disable", "Haze", "Rock Tomb", "Shadow Sneak"],
    },
    Drednaw: {
      nature: "Adamant",
      ability: "Shell Armor",
      item: "Mystic Water",
      moves: ["Aqua Jet", "Ice Fang", "Razor Shell", "Rock Tomb"],
    },
    Perrserker: {
      nature: "Adamant",
      ability: "Battle Armor",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Bullet Punch", "Iron Head", "Metal Burst"],
    },
    Azumarill: {
      nature: "Adamant",
      ability: "Huge Power",
      item: "Pecha Berry",
      moves: ["Aqua Jet", "Aqua Tail", "Ice Punch", "Play Rough"],
    },
  },
  team: ["Yamask-G", "Drednaw", "Perrserker", "Azumarill"],
});

export const nuggetBridgeGruntBattle: Moment = {
  split: "Misty",
  label: "Nugget Bridge Grunt Battle",
  kind: "battle",
  data: {
    playerBox: _box20,
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
  level: "14-16",
  moves: ["Clear Smog", "Ember", "Fire Spin", "Leer"],
};

const _box21 = getBox({ box: _box20, add: [_charcadet], team: ["Houndoom"] });

export const route24Encounter: Moment = {
  split: "Misty",
  label: "Route 24 Encounter",
  kind: "encounter",
  data: { pokemon: _charcadet, playerBox: _box21, showPlayerTeam: true },
};

const _chinchou = {
  name: "Chinchou",
  level: "2-4",
  moves: ["Bubble", "Supersonic"],
};

const _box22 = getBox({ box: _box21, add: [_chinchou] });

export const route25Encounter: Moment = {
  split: "Misty",
  label: "Route 25 Encounter",
  kind: "encounter",
  data: { pokemon: _chinchou, playerBox: _box22 },
};

const _box23 = getBox({
  box: _box22,
  update: {
    Azumarill: {
      nature: "Adamant",
      ability: "Huge Power",
      item: "Pixie Plate",
      moves: ["Aqua Jet", "Body Slam", "Helping Hand", "Play Rough"],
    },
    Perrserker: {
      nature: "Calm",
      ability: "Battle Armor",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Bullet Punch", "Iron Head", "Thief"],
    },
    Clodsire: {
      nature: "Impish",
      ability: "Water Absorb",
      item: "Poison Barb",
      moves: ["Mud Shot", "Poison Jab", "Rock Tomb", "Yawn"],
    },
    Houndoom: {
      nature: "Modest",
      ability: "Flash Fire",
      item: "Black Glasses",
      moves: ["Dark Pulse", "Flame Burst", "Leer", "Sucker Punch"],
    },
    "Yamask-G": {
      nature: "Sassy",
      ability: "Wandering Soul",
      item: "Pecha Berry",
      moves: ["Disable", "Haze", "Rock Tomb", "Shadow Sneak"],
    },
    Kricketune: {
      nature: "Impish",
      ability: "Technician",
      item: "Chilan",
      moves: ["Bug Bite", "Bulldoze", "Bullet Seed", "Pounce"],
    },
  },
  team: ["Azumarill", "Perrserker", "Clodsire", "Houndoom", "Yamask-G", "Kricketune"],
});

export const digHouseGruntBattle: Moment = {
  split: "Misty",
  label: "Dig House Grunt Battle",
  kind: "battle",
  data: {
    playerBox: _box23,
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
                { opponent: "{o:Raticate} burn to {=:73}" },
              ],
              [
                { opponent: "{o:Raticate} Facade {p:Kricketune} to {+:41}" },
                { player: "{p:Kricketune} Pounce {o:Raticate} to {-:28}" },
                { opponent: "{o:Raticate} burn to {-:24}" },
              ],
              [
                { player: "{p:Kricketune} Pounce {o:Raticate} to {=:0}" },
                { opponent: "{o:Raticate} fainted" },
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
  level: "18-20",
  moves: ["Flame Wheel", "Helping Hand", "Leer", "Odor Sleuth"],
};

const _box24 = getBox({ box: _box23, add: [_growlitheH], team: ["Houndoom"] });

export const route5Encounter: Moment = {
  split: "Misty",
  label: "Route 5 Encounter",
  kind: "encounter",
  data: { pokemon: _growlitheH, playerBox: _box24, showPlayerTeam: true },
};

const _shellder = {
  name: "Shellder",
  level: "2-4",
  moves: ["Tackle", "Water Gun"],
};

const _box25 = getBox({ box: _box24, add: [_shellder] });

export const route6Encounter: Moment = {
  split: "Misty",
  label: "Route 6 Encounter",
  kind: "encounter",
  data: { pokemon: _shellder, playerBox: _box25 },
};

const _box26 = getBox({
  box: _box25,
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
  split: "Misty",
  label: "Route 6 Box Change",
  kind: "boxChange",
  data: { playerBox: _box26 },
};

const _box27 = getBox({
  box: _box26,
  update: {
    Kricketune: {
      nature: "Adamant",
      ability: "Technician",
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
      ability: "Battle Armor",
      item: "Rawst Berry",
      moves: ["Bullet Punch", "Iron Head", "Metal Burst", "Thief"],
    },
    Gyarados: {
      nature: "Adamant",
      ability: "Intimidate",
      item: "Sitrus Berry",
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
      ability: "Water Absorb",
      item: "Payapa Berry",
      moves: ["Bulldoze", "Poison Jab", "Rock Tomb", "Yawn"],
    },
  },
  team: ["Kricketune", "Lanturn", "Perrserker", "Gyarados", "Golduck", "Clodsire"],
});

export const ceruleanCityLeaderMistyBattle: Moment = {
  split: "Misty",
  label: "Cerulean City Leader Misty Battle",
  kind: "battle",
  data: {
    playerBox: _box27,
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
                { opponent: "{p:Kricketune} badly poison to {+:84}" },
              ],
              [
                { player: "{p:Kricketune} Bullet Seed {o:Politoed} to {=:0}" },
                { opponent: "{o:Politoed} fainted" },
                { opponent: "{p:Kricketune} badly poison to {+:74}" },
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
                { opponent: "{p:Kricketune} badly poison to {+:37}" },
              ],
              [
                { player: "{p:Kricketune} Bug Bite {o:Ludicolo} to {=:0}" },
                { opponent: "{p:Kricketune} Sitrus Berry to {+:59}" },
                { opponent: "{o:Ludicolo} fainted" },
                { opponent: "{p:Kricketune} badly poison to {+:49}" },
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
                { player: "{p:Golduck} Me First (Thunderbolt) {o:Starmie} to {=:0}" },
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
                { opponent: "{o:Clodsire} Black Sludge to {-:58}" },
                { opponent: "{p:Golduck} badly poison to {=:86}" },
              ],
              [
                { player: "{p:Golduck} Zen Headbutt {o:Clodsire} to {=:0}" },
                { opponent: "{o:Clodsire} fainted" },
                { opponent: "{p:Golduck} badly poison to {=:76}" },
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
                { player: "{p:Golduck} Me First (Thunderbolt) {o:Starmie} to {=:0}" },
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
                { opponent: "{o:Clodsire} Black Sludge to {-:58}" },
                { opponent: "{p:Golduck} badly poison to {+:45}" },
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

const _box28 = getBox({
  box: _box27,
  remove: ["Kricketune"],
});

export const ceruleanCityLeaderMistyBoxChange: Moment = {
  split: "Misty",
  label: "Cerulean City Leader Misty Box Change",
  kind: "boxChange",
  data: { playerBox: _box28 },
};

export const box = _box28;

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
