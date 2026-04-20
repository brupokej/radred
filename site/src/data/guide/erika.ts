import { getBox } from "@site/src/utils/box";
import { Moment } from "@site/src/utils/moments";
import {
  celadonCityGymAceTrainerMaryBox,
  celadonCityLeaderErikaBox,
} from "@site/src/utils/opponents";

import { box as _box1 } from "@site/src/data/guide/surge";

const _box2 = getBox({
  box: _box1,
  cap: { level: 44, exclude: ["Golisopod"] },
  update: [
    {
      Charcadet: {
        name: "Ceruledge",
        moves: ["Clear Smog", "Ember", "Fire Spin", "Shadow Claw"],
      },
      Golisopod: {
        level: 42,
      },
      Frillish: {
        moves: ["Bubble Beam", "Hex", "Recover", "Water Pulse"],
      },
    },
    {
      Frillish: {
        name: "Jellicent",
        spriteKey: "jellicent-f",
      },
    },
  ],
});

export const erikaBoxChange: Moment = {
  label: "Erika Box Change",
  kind: "boxChange",
  data: { playerBox: _box2 },
};

const _box3 = getBox({
  box: _box2,
  update: {
    Incineroar: {
      nature: "Naive",
      item: "Chople Berry",
      moves: ["Fake Out", "Double Kick", "Flamethrower", "U-Turn"],
    },
    Jellicent: {
      nature: "Bold",
      ability: "Water Bubble",
      item: "Rindo Berry",
      moves: ["Brine", "Hex", "Recover", "Water Spout"],
    },
    Runerigus: {
      ability: "Shadow Shield",
      moves: ["Disable", "Rock Tomb", "Shadow Claw", "Shadow Sneak"],
    },
    Houndoom: {
      item: "Charcoal",
    },
  },
  team: ["Incineroar", "Jellicent", "Runerigus", "Houndoom"],
});

export const celadonCityGymAceTrainerMaryBattle: Moment = {
  label: "Celadon City Gym Ace Trainer Mary Battle",
  kind: "battle",
  data: {
    playerBox: _box3,
    opponentBox: celadonCityGymAceTrainerMaryBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Weavile", "Coalossal"],
            turns: [
              [
                { player: "{p:Incineroar} Fake Out {o:Weavile} to {-:104}" },
                { opponent: "{o:Weavile} flinched" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Weavile} to {=:0} and {o:Coalossal} to {=:0}",
                },
                { opponent: "{o:Weavile} fainted" },
                { opponent: "{o:Coalossal} fainted" },
              ],
            ],
          },
          {
            matchup: ["Maractus", "Copperajah"],
            turns: [
              [
                {
                  opponent: "{o:Maractus} Sucker Punch {p:Jellicent} to {+:22}",
                },
                { player: "{p:Incineroar} Flamethrower {o:Copperajah} to {-:85}" },
                { player: "{p:Jellicent} Brine {o:Copperajah} to {=:0}" },
                { opponent: "{o:Copperajah} fainted" },
                { opponent: "{p:Jellicent} grassy terrain to {+:31}" },
              ],
            ],
          },
          {
            matchup: ["Maractus"],
            turns: [
              [
                { player: "{p:Incineroar} switch to {p:Runerigus}" },
                { player: "{p:Jellicent} switch to {p:Houndoom}" },
                { opponent: "{o:Maractus} Grassy Glide {p:Houndoom} to {+:55}" },
                { opponent: "{p:Houndoom} grassy terrain to {+:63}" },
              ],
              [
                { opponent: "{o:Maractus} Spiky Shield" },
                { player: "{p:Houndoom} Flame Burst {o:Maractus}" },
                { player: "{p:Runerigus} Disable {o:Maractus}" },
                { opponent: "{p:Houndoom} grassy terrain to {+:71}" },
              ],
              [
                { opponent: "{o:Maractus} Grassy Glide {p:Runerigus} to {+:86}" },
                { player: "{p:Houndoom} Flame Burst {o:Maractus} to {=:0}" },
                { opponent: "{o:Maractus} fainted" },
              ],
            ],
          },
        ],
        frags: { Jellicent: 3, Houndoom: 1 },
      },
    ],
  },
};

const _box4 = getBox({
  box: _box3,
  update: {
    Incineroar: {
      nature: "Impish",
      ability: "Intimidate",
      item: "Charti Berry",
      moves: ["Fake Out", "Darkest Lariat", "Flamethrower", "U-Turn"],
    },
    Golisopod: {
      nature: "Lonely",
      item: "Silver Powder",
      moves: ["First Impression", "Aerial Ace", "Rock Tomb", "Sucker Punch"],
    },
    Runerigus: {
      moves: ["Disable", "Scary Face", "Shadow Ball", "Shadow Sneak"],
    },
    "Arcanine-H": {
      item: "Magnet",
      moves: ["Bad Tantrum", "Crunch", "Fire Fang", "Thunder Fang"],
    },
    Golduck: {
      nature: "Naive",
      item: "Twisted Spoon",
      moves: ["Aqua Tail", "Flip Turn", "Ice Punch", "Psychic"],
    },
    Ceruledge: {
      nature: "Impish",
      ability: "Sharpness",
      item: "Cheri Berry",
      moves: ["Flamethrower", "Shadow Claw", "Shadow Sneak", "Will-O-Wisp"],
    },
  },
  team: ["Incineroar", "Golisopod", "Runerigus", "Arcanine-H", "Golduck", "Ceruledge"],
});

export const celadonCityLeaderErikaBattle: Moment = {
  label: "Celadon City Leader Erika Battle",
  kind: "battle",
  data: {
    playerBox: _box4,
    opponentBox: celadonCityLeaderErikaBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Ogerpon-C"],
            turns: [
              [
                { opponent: "{o:Ogerpon-C} Knock Off {p:Incineroar} to {+:111}" },
                { player: "{p:Incineroar} U-Turn {o:Ogerpon-C} to {-:78}" },
                { player: "{p:Incineroar} switch to {p:Golisopod}" },
                { opponent: "{o:Ogerpon-C} grassy terrain to {-:86}" },
              ],
              [
                { player: "{p:Golisopod} First Impression {o:Ogerpon-C} to {=:0}" },
                { opponent: "{o:Ogerpon-C} fainted" },
              ],
            ],
          },
          {
            matchup: ["Toxtricity"],
            turns: [
              [
                { player: "{p:Golisopod} switch to {p:Runerigus}" },
                { opponent: "{o:Toxtricity} Overdrive {p:Runerigus}" },
              ],
              [
                { player: "{p:Runerigus} switch to {p:Arcanine-H}" },
                { opponent: "{o:Toxtricity} HP Grass {p:Arcanine-H} to {+:72}" },
                { opponent: "{p:Arcanine-H} grassy terrain to {+:81}" },
              ],
              [
                { player: "{p:Arcanine-H} Stom. Tantrum {o:Toxtricity} to {=:0}" },
                { opponent: "{o:Toxtricity} fainted" },
                { opponent: "{p:Arcanine-H} grassy terrain to {+:90}" },
              ],
            ],
          },
          {
            matchup: ["Sceptile-Mega"],
            turns: [
              [
                { player: "{p:Arcanine-H} switch to {p:Golisopod}" },
                { opponent: "{o:Sceptile} mega to {o:Sceptile-Mega}" },
                { opponent: "{o:Sceptile-Mega} High Horsepower {p:Golisopod} to {+:97}" },
                { opponent: "{p:Golisopod} grassy terrain to {+:105}" },
              ],
              [
                { opponent: "{o:Sceptile-Mega} Draco Barrage {p:Golisopod} to {+:5}" },
                { player: "{p:Golisopod} Rock Tomb {o:Sceptile-Mega} to {-:107}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Golduck}" },
              ],
              [
                { player: "{p:Golduck} Ice Punch {o:Sceptile-Mega} to {=:0}" },
                { opponent: "{o:Sceptile-Mega} fainted" },
              ],
            ],
          },
          {
            matchup: ["Kartana"],
            turns: [
              [
                { player: "{p:Golduck} switch to {p:Incineroar}" },
                { opponent: "{o:Kartana} Grassy Glide {p:Incineroar} to {+:43}" },
                { opponent: "{o:Kartana} Life Orb to {=:108}" },
                { opponent: "{p:Incineroar} grassy terrain to {+:52}" },
                { opponent: "{o:Kartana} grassy terrain to {=:115}" },
              ],
              [
                { player: "{p:Incineroar} switch to {p:Runerigus}" },
                { opponent: "{o:Kartana} Sacred Sword {p:Runerigus}" },
                { opponent: "{o:Kartana} grassy terrain to {=:119}" },
              ],
              [
                { opponent: "{o:Kartana} Swords Dance" },
                { player: "{p:Runerigus} Scary Face {o:Kartana}" },
              ],
              [
                { player: "{p:Runerigus} switch to {p:Ceruledge}" },
                { opponent: "{o:Kartana} Swords Dance" },
              ],
              [
                { player: "{p:Ceruledge} Flamethrower {o:Kartana} to {=:0}" },
                { opponent: "{o:Kartana} fainted" },
              ],
            ],
          },
          {
            matchup: ["Hawlucha"],
            turns: [
              [
                { opponent: "{o:Hawlucha} Swords Dance" },
                { player: "{p:Ceruledge} Will-O-Wisp {o:Hawlucha}" },
                { opponent: "{o:Hawlucha} burn to {=:128}" },
              ],
            ],
            branches: [
              {
                branches: [
                  "94% → Ceruledge Shadow Claw Hawlucha",
                  "6% → Ceruledge Shadow Claw Hawlucha (crit)",
                ],
              },
            ],
          },
        ],
        frags: { Golisopod: 1, "Arcanine-H": 1, Golduck: 1, Ceruledge: 1 },
      },
      {
        line: "94% → Ceruledge Shadow Claw Hawlucha",
        matchups: [
          {
            matchup: ["Hawlucha"],
            turns: [
              [
                { opponent: "{o:Hawlucha} Swords Dance" },
                { player: "{p:Ceruledge} Shadow Claw {o:Hawlucha} to {-:68}" },
                { opponent: "{o:Hawlucha} burn to {-:60}" },
              ],
              [
                { player: "{p:Ceruledge} switch to {p:Runerigus}" },
                { opponent: "{o:Hawlucha} Stone Edge {p:Runerigus} to {+:104}" },
                { opponent: "{p:Runerigus} grassy terrain to {+:111}" },
                { opponent: "{o:Hawlucha} burn to {-:52}" },
              ],
              [
                { opponent: "{o:Hawlucha} Acrobatics {p:Runerigus} to {+:15}" },
                { player: "{p:Runerigus} Shadow Ball {o:Hawlucha} to {-:19}" },
                { opponent: "{p:Runerigus} grassy terrain to {+:22}" },
                { opponent: "{o:Hawlucha} burn to {-:11}" },
              ],
              [
                { player: "{p:Runerigus} Shadow Sneak {o:Hawlucha} to {=:0}" },
                { opponent: "{o:Hawlucha} fainted" },
                { opponent: "{p:Runerigus} grassy terrain to {+:22}" },
              ],
            ],
          },
          {
            matchup: ["Slowbro-G"],
            turns: [
              [
                { player: "{p:Runerigus} switch to {p:Ceruledge}" },
                { opponent: "{o:Slowbro-G} Flamethrower {p:Ceruledge} to {+:103}" },
                { opponent: "{p:Ceruledge} grassy terrain to {+:111}" },
              ],
              [
                { player: "{p:Ceruledge} Shadow Claw {o:Slowbro-G} to {-:29}" },
                { opponent: "{o:Slowbro-G} Sludge Bomb {p:Ceruledge} to {+:66}" },
                { opponent: "{p:Ceruledge} grassy terrain to {+:74}" },
                { opponent: "{o:Slowbro-G} grassy terrain to {-:47}" },
                { opponent: "{p:Ceruledge} poison to {+:66}" },
              ],
              [
                { player: "{p:Ceruledge} Shadow Claw {o:Slowbro-G} to {=:0}" },
                { opponent: "{o:Slowbro-G} fainted" },
              ],
            ],
          },
        ],
        frags: { Runerigus: 1, Ceruledge: 1 },
      },
      {
        line: "6% → Ceruledge Shadow Claw Hawlucha (crit)",
        matchups: [
          {
            matchup: ["Hawlucha"],
            turns: [
              [
                { opponent: "{o:Hawlucha} Swords Dance" },
                { player: "{p:Ceruledge} Shadow Claw {o:Hawlucha} (crit) to {=:0}" },
              ],
            ],
          },
          {
            matchup: ["Slowbro-G"],
            turns: [
              [
                { player: "{p:Ceruledge} Shadow Claw {o:Slowbro-G} to {-:29}" },
                { opponent: "{o:Slowbro-G} Sludge Bomb {p:Ceruledge} to {+:66}" },
                { opponent: "{p:Ceruledge} grassy terrain to {+:74}" },
                { opponent: "{o:Slowbro-G} grassy terrain to {-:47}" },
                { opponent: "{p:Ceruledge} poison to {+:66}" },
              ],
              [
                { player: "{p:Ceruledge} Shadow Claw {o:Slowbro-G} to {=:0}" },
                { opponent: "{o:Slowbro-G} fainted" },
              ],
            ],
          },
        ],
        frags: { Ceruledge: 2 },
      },
    ],
  },
};

const _box5 = getBox({
  box: _box4,
  update: {
    Golisopod: {
      level: 43,
    },
  },
});

export const box = _box5;

export const moments: Moment[] = [
  erikaBoxChange,
  celadonCityGymAceTrainerMaryBattle,
  celadonCityLeaderErikaBattle,
];
