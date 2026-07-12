import { getBox, type Box } from "@site/src/utils/box";
import type { Moment } from "@site/src/utils/moments";
import {
  indigoPlateauCreatorSoupercellBox,
  route22RivalRematchBox,
  route23BrendanBox,
  victoryRoadAceTrainerAlexaBox,
  victoryRoadAceTrainerCarolineBox,
  victoryRoadAceTrainerColbyBox,
  victoryRoadAceTrainerGeorgeBox,
  victoryRoadAceTrainerNaomiBox,
  victoryRoadAceTrainerRolandoBox,
  victoryRoadCoolCoupleRayAndTyraBox,
} from "@site/src/utils/opponents";

import { box as _box1 } from "@site/src/data/guide/clair";

const _buizel = {
  name: "Buizel",
  level: "56-58",
  ability: "Water Veil",
  moves: ["Aqua Tail", "Hydro Pump", "Razor Wind", "Whirlpool"],
};

const _box2 = getBox({ box: _box1, add: [_buizel] });

export const route13Encounter: Moment = {
  split: "Victory Road",
  label: "Route 13 Encounter",
  kind: "encounter",
  data: { pokemon: _buizel, playerBox: _box2 },
};

const _chienPao = {
  name: "Chien-Pao",
  level: 80,
  ability: "Sword of Ruin",
  moves: ["Recover", "Sacred Sword", "Sucker Punch", "Throat Chop"],
};

const _box3 = getBox({ box: _box2, add: [_chienPao] });

export const route18Encounter: Moment = {
  split: "Victory Road",
  label: "Route 18 Encounter",
  kind: "encounter",
  data: { pokemon: _chienPao, playerBox: _box3 },
};

const _thundurusI = {
  name: "Thundurus-I",
  spriteKey: "thundurus",
  level: 80,
  ability: "Prankster",
  moves: ["Dark Pulse", "Hammer Arm", "Thrash", "Thunder"],
};

const _box4 = getBox({ box: _box3, add: [_thundurusI] });

export const route20Encounter: Moment = {
  split: "Victory Road",
  label: "Route 20 Encounter",
  kind: "encounter",
  data: { pokemon: _thundurusI, playerBox: _box4 },
};

const _box5 = getBox({
  box: _box4,
  cap: 82,
  update: {
    Buizel: {
      name: "Floatzel",
      moves: ["Fake Out", "Hydro Pump", "Razor Wind", "Whirlpool"],
    }
  }
});

export const route20BoxChange: Moment = {
  split: "Victory Road",
  label: "Route 20 Box Change",
  kind: "boxChange",
  data: { playerBox: _box5 },
};

const _box6 = getBox({
  box: _box5,
  update: {
    "Chien-Pao": {
      nature: "Jolly",
      ability: "Sword of Ruin",
      item: undefined,
      moves: ["Icicle Crash", "Recover", "Sacred Sword", "Sucker Punch"]
    },
    Meowscarada: {
      nature: "Impish",
      ability: "Protean",
      item: "Choice Band",
      moves: ["Knock Off", "Low Kick", "Shadow Claw", "Sucker Punch"],
    },
    Ceruledge: {
      nature: "Adamant",
      ability: "Sharpness",
      item: "Charcoal",
      moves: ["Bitter Blade", "Shadow Claw", "Shadow Sneak", "Solar Blade"],
    },
    Zapdos: {
      nature: "Adamant",
      ability: "Pressure",
      item: "Choice Scarf",
      moves: ["Bolt Beak", "Hurricane", "Thunderbolt", "U-Turn"]
    }
  },
  team: ["Chien-Pao", "Meowscarada", "Ceruledge", "Zapdos"],
});

export const route22RivalRematchBattle: Moment = {
  split: "Victory Road",
  label: "Route 22 Rival Rematch Battle",
  kind: "battle",
  data: {
    playerBox: _box6,
    opponentBox: route22RivalRematchBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Zapdos"],
            turns: [
              [
                { player: "{p:Chien-Pao} Icicle Crash {o:Zapdos} to {=:0}" },
                { opponent: "{o:Zapdos} fainted" },
              ],
            ],
          },
          {
            matchup: ["Basculegion"],
            turns: [
              [
                { player: "{p:Chien-Pao} switch to {p:Meowscarada}" },
                { opponent: "{o:Basculegion} Wave Crash {p:Meowscarada} to {+:19}" },
                { opponent: "{o:Basculegion} recoil to {-:272}" },
              ],
              [
                { player: "{p:Meowscarada} Sucker Punch {o:Basculegion} to {=:0}" },
                { opponent: "{o:Basculegion} fainted" },
              ],
            ],
          },
          {
            matchup: ["Ferrothorn"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Ceruledge}" },
                { opponent: "{o:Ferrothorn} Leech Seed {p:Ceruledge}" },
                { opponent: "{p:Ceruledge} leech seed to {=:225}" },
              ],
              [
                { player: "{p:Ceruledge} Bitter Blade {o:Ferrothorn} to {=:0}" },
                { opponent: "{p:Ceruledge} recover to {=:240}" },
                { opponent: "{p:Ceruledge} Iron Barbs to {=:210}" },
                { opponent: "{p:Ceruledge} Rocky Helmet to {=:170}" },
                { opponent: "{o:Ferrothorn} fainted" },
              ],
            ],
          },
          {
            matchup: ["Blastoise-Mega"],
            turns: [
              [
                { player: "{p:Ceruledge} switch to {p:Zapdos}" },
                { opponent: "{o:Blastoise-Mega} mega evolve" },
                { opponent: "{o:Blastoise-Mega} Dark Pulse {p:Zapdos} to {+:90}" },
              ],
              [
                { player: "{p:Zapdos} Bolt Beak {o:Blastoise-Mega} to {=:0}" },
                { opponent: "{o:Blastoise-Mega} fainted" },
              ],
            ],
          },
          {
            matchup: ["Goodra"],
            turns: [
              [
                { player: "{p:Zapdos} switch to {p:Chien-Pao}" },
                { opponent: "{o:Goodra} Ice Beam {p:Chien-Pao} to {+:170}" },
              ],
              [
                { player: "{p:Chien-Pao} Icicle Crash {o:Goodra} to {=:0}" },
                { opponent: "{o:Goodra} fainted" },
              ],
            ],
          },
          {
            matchup: ["Celesteela"],
            turns: [
              [
                { player: "{p:Chien-Pao} switch to {p:Zapdos}" },
                { opponent: "{o:Celesteela} Iron Head {p:Zapdos} to {+:18}" },
              ],
              [
                { player: "{p:Zapdos} Bolt Beak {o:Celesteela} to {=:0}" },
                { opponent: "{o:Celesteela} fainted" },
              ],
            ],
          },
        ],
        frags: { "Chien-Pao": 2, Meowscarada: 1, Ceruledge: 1, Zapdos: 2 }
      },
    ],
  },
};

const _box7 = getBox({
  box: _box6,
  remove: ["Ceruledge"],
});

export const route22RivalRematchBoxChange: Moment = {
  split: "Victory Road",
  label: "Route 22 Rival Rematch Box Change",
  kind: "boxChange",
  data: { playerBox: _box7 },
};

const _box8 = getBox({
  box: _box7,
  update: {
    Perrserker: {
      nature: "Adamant",
      ability: "Battle Armor",
      item: "Silver Powder",
      moves: ["Close Combat", "Dig", "Iron Head", "U-Turn"],
    },
    "Chien-Pao": {
      nature: "Jolly",
      ability: "Sword of Ruin",
      item: "Life Orb",
      moves: ["Ice Shard", "Icicle Crash", "Sacred Sword", "Sucker Punch"]
    },
    Lanturn: {
      nature: "Quiet",
      ability: "Water Absorb",
      item: "Mystic Water",
      moves: ["Hydro Pump", "Ice Beam", "Thunder Wave", "Volt Switch"]
    },
    Drednaw: {
      nature: "Careful",
      ability: "Shell Armor",
      item: "Assault Vest",
      moves: ["Earthquake", "Flip Turn", "Ice Fang", "Stone Edge"]
    },
    Zapdos: {
      nature: "Adamant",
      ability: "Pressure",
      item: "Chilan Berry",
      moves: ["Bolt Beak", "Hurricane", "Thunderbolt", "U-Turn"],
    },
    Golisopod: {
      nature: "Naughty",
      ability: "Emergency Exit",
      item: "Focus Sash",
      moves: ["Close Combat", "Liquidation", "Poison Jab", "Rock Slide"]
    }
  },
  team: ["Perrserker", "Chien-Pao", "Lanturn", "Drednaw", "Zapdos", "Golisopod"],
});

export const route23BrendanBattle: Moment = {
  split: "Victory Road",
  label: "Route 23 Brendan Battle",
  kind: "battle",
  data: {
    playerBox: _box8,
    opponentBox: route23BrendanBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Tyrantrum"],
            turns: [
              [
                { opponent: "{o:Tyrantrum} Close Combat {p:Perrserker} to {+:51}" },
                { player: "{p:Perrserker} U-Turn {o:Tyrantrum} to {-:176}" },
                { player: "{p:Perrserker} switch to {p:Chien-Pao}" },
              ],
              [
                { player: "{p:Chien-Pao} Ice Shard {o:Tyrantrum} to {=:0}" },
                { opponent: "{p:Chien-Pao} Life Orb to {=:224}" },
                { opponent: "{o:Tyrantrum} fainted" },
              ],
            ],
            branches: [
              {
                branches: [
                  "50% → Empoleon matchup",
                  "50% → Ursaluna-BM matchup",
                ],
              },
            ],
          },
        ],
        frags: { "Chien-Pao": 1 }
      },
      {
        line: "50% → Empoleon matchup",
        matchups: [
          {
            matchup: ["Empoleon"],
            turns: [
              [
                { player: "{p:Chien-Pao} switch to {p:Lanturn}" },
                { opponent: "{o:Empoleon} Scald {p:Lanturn}" },
              ],
              [
                { opponent: "{o:Empoleon} Calm Mind" },
                { player: "{p:Lanturn} Thunder Wave {o:Empoleon}" },
              ],
              [
                { opponent: "{o:Empoleon} Calm Mind" },
                { player: "{p:Lanturn} Volt Switch {o:Empoleon} to {-:201}" },
                { player: "{p:Lanturn} switch to {p:Chien-Pao}" },
                { opponent: "{o:Empoleon} Leftovers to {-:216}" },
              ],
              [
                { player: "{p:Chien-Pao} Sacred Sword {o:Empoleon} to {=:0}" },
                { opponent: "{p:Chien-Pao} Life Orb to {=:200}" },
                { opponent: "{o:Empoleon} fainted" },
              ],
            ],
          },
          {
            matchup: ["Ursaluna-BM"],
            turns: [
              [
                { player: "{p:Chien-Pao} switch to {p:Drednaw}" },
                { opponent: "{o:Ursaluna-BM} Aura Sphere {p:Drednaw} to {+:141}" },
              ],
              [
                { player: "{p:Drednaw} switch to {p:Zapdos}" },
                { opponent: "{o:Ursaluna-BM} Earth Power {p:Zapdos}" },
              ],
              [
                { opponent: "{o:Ursaluna-BM} Blood Moon {p:Zapdos} to {+:107}" },
                { player: "{p:Zapdos} U-Turn {o:Ursaluna-BM} to {-:267}" },
                { player: "{p:Zapdos} switch to {p:Golisopod}" },
              ],
            ],
            branches: [
              {
                branches: [
                  "95% → Golisopod Liquidation Ursaluna-BM",
                  "5% → Golisopod Liquidation Ursaluna-BM (to 0)",
                ],
              },
            ],
          },
        ],
        frags: { "Chien-Pao": 1 }
      },
      {
        line: "95% → Golisopod Liquidation Ursaluna-BM",
        matchups: [
          {
            matchup: ["Ursaluna-BM"],
            turns: [
              [
                { opponent: "{o:Ursaluna-BM} Hyper Voice {p:Golisopod} to {+:14}" },
                { player: "{p:Golisopod} Liquidation {o:Ursaluna-BM} to {-:99}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Chien-Pao}" },
              ],
              [
                { player: "{p:Chien-Pao} Ice Shard {o:Ursaluna-BM} to {=:0}" },
                { opponent: "{p:Chien-Pao} Life Orb to {=:176}" },
                { opponent: "{o:Ursaluna-BM} fainted" },
              ],
            ],
            branches: [{ branches: ["Chien-Pao Sucker Punch Marowak-A"] }],
          },
        ],
        frags: { "Chien-Pao": 1 }
      },
      {
        line: "5% → Golisopod Liquidation Ursaluna-BM (to 0)",
        matchups: [
          {
            matchup: ["Ursaluna-BM"],
            turns: [
              [
                { opponent: "{o:Ursaluna-BM} Hyper Voice {p:Golisopod} to {+:14}" },
                { player: "{p:Golisopod} Liquidation {o:Ursaluna-BM} (crit) to {=:0}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Chien-Pao}" },
              ],
            ],
            branches: [{ branches: ["Chien-Pao Sucker Punch Marowak-A 2"] }],
          },
        ],
        frags: { Golisopod: 1 }
      },
      {
        line: "50% → Ursaluna-BM matchup",
        matchups: [
          {
            matchup: ["Ursaluna-BM"],
            turns: [
              [
                { player: "{p:Chien-Pao} switch to {p:Drednaw}" },
                { opponent: "{o:Ursaluna-BM} Aura Sphere {p:Drednaw} to {+:141}" },
              ],
              [
                { player: "{p:Drednaw} switch to {p:Zapdos}" },
                { opponent: "{o:Ursaluna-BM} Earth Power {p:Zapdos}" },
              ],
              [
                { opponent: "{o:Ursaluna-BM} Blood Moon {p:Zapdos} to {+:107}" },
                { player: "{p:Zapdos} U-Turn {o:Ursaluna-BM} to {-:267}" },
                { player: "{p:Zapdos} switch to {p:Golisopod}" },
              ],
            ],
            branches: [
              {
                branches: [
                  "95% → Golisopod Liquidation Ursaluna-BM 2",
                  "5% → Golisopod Liquidation Ursaluna-BM (to 0) 2",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "95% → Golisopod Liquidation Ursaluna-BM 2",
        matchups: [
          {
            matchup: ["Ursaluna-BM"],
            turns: [
              [
                { opponent: "{o:Ursaluna-BM} Hyper Voice {p:Golisopod} to {+:14}" },
                { player: "{p:Golisopod} Liquidation {o:Ursaluna-BM} to {-:99}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Chien-Pao}" },
              ],
              [
                { player: "{p:Chien-Pao} Ice Shard {o:Ursaluna-BM} to {=:0}" },
                { opponent: "{p:Chien-Pao} Life Orb to {=:200}" },
                { opponent: "{o:Ursaluna-BM} fainted" },
              ],
            ],
          },
          {
            matchup: ["Empoleon"],
            turns: [
              [
                { player: "{p:Chien-Pao} switch to {p:Lanturn}" },
                { opponent: "{o:Empoleon} Scald {p:Lanturn}" },
              ],
              [
                { opponent: "{o:Empoleon} Calm Mind" },
                { player: "{p:Lanturn} Thunder Wave {o:Empoleon}" },
              ],
              [
                { opponent: "{o:Empoleon} Calm Mind" },
                { player: "{p:Lanturn} Volt Switch {o:Empoleon} to {-:201}" },
                { player: "{p:Lanturn} switch to {p:Chien-Pao}" },
                { opponent: "{o:Empoleon} Leftovers to {-:216}" },
              ],
              [
                { player: "{p:Chien-Pao} Sacred Sword {o:Empoleon} to {=:0}" },
                { opponent: "{p:Chien-Pao} Life Orb to {=:176}" },
                { opponent: "{o:Empoleon} fainted" },
              ],
            ],
            branches: [{ branches: ["Chien-Pao Sucker Punch Marowak-A"] }],
          },
        ],
        frags: { "Chien-Pao": 2 }
      },
      {
        line: "5% → Golisopod Liquidation Ursaluna-BM (to 0) 2",
        matchups: [
          {
            matchup: ["Ursaluna-BM"],
            turns: [
              [
                { opponent: "{o:Ursaluna-BM} Hyper Voice {p:Golisopod} to {+:14}" },
                { player: "{p:Golisopod} Liquidation {o:Ursaluna-BM} (crit) to {=:0}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Chien-Pao}" },
              ],
            ],
          },
          {
            matchup: ["Empoleon"],
            turns: [
              [
                { player: "{p:Chien-Pao} switch to {p:Lanturn}" },
                { opponent: "{o:Empoleon} Scald {p:Lanturn}" },
              ],
              [
                { opponent: "{o:Empoleon} Calm Mind" },
                { player: "{p:Lanturn} Thunder Wave {o:Empoleon}" },
              ],
              [
                { opponent: "{o:Empoleon} Calm Mind" },
                { player: "{p:Lanturn} Volt Switch {o:Empoleon} to {-:201}" },
                { player: "{p:Lanturn} switch to {p:Chien-Pao}" },
                { opponent: "{o:Empoleon} Leftovers to {-:216}" },
              ],
              [
                { player: "{p:Chien-Pao} Sacred Sword {o:Empoleon} to {=:0}" },
                { opponent: "{p:Chien-Pao} Life Orb to {=:200}" },
                { opponent: "{o:Empoleon} fainted" },
              ],
            ],
            branches: [{ branches: ["Chien-Pao Sucker Punch Marowak-A 2"] }],
          },
        ],
        frags: { Golisopod: 1, "Chien-Pao": 1 }
      },
      {
        line: "Chien-Pao Sucker Punch Marowak-A",
        matchups: [
          {
            matchup: ["Marowak-A"],
            turns: [
              [
                { player: "{p:Chien-Pao} Sucker Punch {o:Marowak-A} to {=:0}" },
                { opponent: "{p:Chien-Pao} Life Orb to {=:152}" },
                { opponent: "{o:Marowak-A} fainted" },
              ],
            ],
          },
          {
            matchup: ["Landorus-I"],
            turns: [
              [
                { player: "{p:Chien-Pao} Ice Shard {o:Landorus-I} to {=:0}" },
                { opponent: "{p:Chien-Pao} Life Orb to {=:128}" },
                { opponent: "{o:Landorus-I} fainted" },
              ],
            ],
          },
          {
            matchup: ["Sceptile-Mega"],
            turns: [
              [
                { opponent: "{o:Sceptile-Mega} mega evolve" },
                { player: "{p:Chien-Pao} Ice Shard {o:Sceptile-Mega} to {=:0}" },
                { opponent: "{p:Chien-Pao} Life Orb to {=:104}" },
                { opponent: "{o:Sceptile-Mega} fainted" },
              ],
            ],
          },
        ],
        frags: { "Chien-Pao": 3 }
      },
      {
        line: "Chien-Pao Sucker Punch Marowak-A 2",
        matchups: [
          {
            matchup: ["Marowak-A"],
            turns: [
              [
                { player: "{p:Chien-Pao} Sucker Punch {o:Marowak-A} to {=:0}" },
                { opponent: "{p:Chien-Pao} Life Orb to {=:176}" },
                { opponent: "{o:Marowak-A} fainted" },
              ],
            ],
          },
          {
            matchup: ["Landorus-I"],
            turns: [
              [
                { player: "{p:Chien-Pao} Ice Shard {o:Landorus-I} to {=:0}" },
                { opponent: "{p:Chien-Pao} Life Orb to {=:152}" },
                { opponent: "{o:Landorus-I} fainted" },
              ],
            ],
          },
          {
            matchup: ["Sceptile-Mega"],
            turns: [
              [
                { opponent: "{o:Sceptile-Mega} mega evolve" },
                { player: "{p:Chien-Pao} Ice Shard {o:Sceptile-Mega} to {=:0}" },
                { opponent: "{p:Chien-Pao} Life Orb to {=:128}" },
                { opponent: "{o:Sceptile-Mega} fainted" },
              ],
            ],
          },
        ],
        frags: { "Chien-Pao": 3 }
      },
    ],
  },
};

const _box9 = getBox({
  box: _box8,
  cap: 85,
});

export const route23BrendanBoxChange: Moment = {
  split: "Victory Road",
  label: "Route 23 Brendan Box Change",
  kind: "boxChange",
  data: { playerBox: _box9 },
};

const _box10 = getBox({
  box: _box9,
  update: {
    "Chien-Pao": {
      nature: "Adamant",
      ability: "Sword of Ruin",
      item: "Expert Belt",
      moves: ["Ice Shard", "Icicle Crash", "Sacred Sword", "Sucker Punch"]
    },
    "Houndoom-Mega": {
      nature: "Timid",
      ability: "Dark Aura",
      item: "Houndoominite",
      moves: ["Beat Up", "Flamethrower", "Foul Play", "Thunder Fang"],
    },
    Perrserker: {
      nature: "Adamant",
      ability: "Battle Armor",
      item: "Silver Powder",
      moves: ["Close Combat", "Dig", "Thrash", "U-Turn"],
    },
    Meowscarada: {
      nature: "Jolly",
      ability: "Protean",
      item: "Miracle Seed",
      moves: ["Flower Trick", "Low Kick", "Shadow Claw", "Sucker Punch"]
    }
  },
  team: ["Chien-Pao", "Houndoom-Mega", "Perrserker", "Meowscarada"],
});

export const victoryRoadAceTrainerNaomiBattle: Moment = {
  split: "Victory Road",
  label: "Victory Road Ace Trainer Naomi Battle",
  kind: "battle",
  data: {
    playerBox: _box10,
    opponentBox: victoryRoadAceTrainerNaomiBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Maushold"],
            turns: [
              [
                { player: "{p:Chien-Pao} Sacred Sword {o:Maushold} to {=:0}" },
                { opponent: "{o:Maushold} fainted" },
              ],
            ],
          },
          {
            matchup: ["Veluza"],
            turns: [
              [
                { player: "{p:Chien-Pao} Sucker Punch {o:Veluza} to {=:0}" },
                { opponent: "{o:Veluza} fainted" },
              ],
            ],
          },
          {
            matchup: ["Shedinja"],
            turns: [
              [
                { player: "{p:Chien-Pao} switch to {p:Houndoom-Mega}" },
                { opponent: "{o:Shedinja} Will-O-Wisp {p:Houndoom-Mega}" },
              ],
              [
                { player: "{p:Houndoom-Mega} mega evolve" },
                { player: "{p:Houndoom-Mega} Beat Up {o:Shedinja} to {=:0}" },
                { opponent: "{o:Shedinja} fainted" },
              ],
            ],
          },
          {
            matchup: ["Absol-Mega"],
            turns: [
              [
                { player: "{p:Houndoom-Mega} switch to {p:Perrserker}" },
                { opponent: "{o:Absol-Mega} mega evolve" },
                { opponent: "{o:Absol-Mega} Play Rough {p:Perrserker} to {+:204}" },
              ],
              [
                { opponent: "{o:Absol-Mega} Night Slash {p:Perrserker} to {+:41}" },
                { player: "{p:Perrserker} U-Turn {o:Absol-Mega} to {-:169}" },
                { player: "{p:Perrserker} switch to {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Flower Trick {o:Absol-Mega} to {=:0}" },
                { opponent: "{o:Absol-Mega} fainted" },
              ],
            ],
          },
          {
            matchup: ["Galvantula"],
            turns: [
              [
                { player: "{p:Meowscarada} Shadow Claw {o:Galvantula} to {-:119}" },
                { opponent: "{o:Galvantula} Bug Buzz {p:Meowscarada} to {+:154}" },
              ],
              [
                { player: "{p:Meowscarada} Shadow Claw {o:Galvantula} to {=:0}" },
                { opponent: "{o:Galvantula} fainted" },
              ],
            ],
          },
          {
            matchup: ["Blacephalon"],
            turns: [
              [
                { player: "{p:Meowscarada} Shadow Claw {o:Blacephalon} to {=:0}" },
                { opponent: "{o:Blacephalon} fainted" },
              ],
            ],
          },
        ],
        frags: { "Chien-Pao": 2, "Houndoom-Mega": 1, Meowscarada: 3 }
      },
    ],
  },
};

const _box11 = getBox({
  box: _box10,
  update: {
    Dragapult: {
      nature: "Adamant",
      ability: "Clear Body",
      item: "Life Orb",
      moves: ["Dragon Darts", "Phantom Force", "Thunder", "U-Turn"],
    },
    Lanturn: {
      nature: "Quiet",
      ability: "Water Absorb",
      item: "Mystic Water",
      moves: ["Hydro Pump", "Ice Beam", "Thunder Wave", "Volt Switch"]
    },
    Zapdos: {
      nature: "Rash",
      ability: "Pressure",
      item: "Choice Scarf",
      moves: ["Bolt Beak", "Hurricane", "Thunderbolt", "Volt Switch"]
    },
    Perrserker: {
      nature: "Adamant",
      ability: "Battle Armor",
      item: "Chople Berry",
      moves: ["Close Combat", "Dig", "Thrash", "U-Turn"]
    }
  },
  team: ["Dragapult", "Lanturn", "Zapdos", "Perrserker"],
});

export const victoryRoadAceTrainerRolandoBattle: Moment = {
  split: "Victory Road",
  label: "Victory Road Ace Trainer Rolando Battle",
  kind: "battle",
  data: {
    playerBox: _box11,
    opponentBox: victoryRoadAceTrainerRolandoBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Cyclizar"],
            turns: [
              [
                { player: "{p:Dragapult} Dragon Darts {o:Cyclizar} to {=:0}" },
                { opponent: "{p:Dragapult} Life Orb to {=:243}" },
                { opponent: "{o:Cyclizar} fainted" },
              ],
            ],
          },
          {
            matchup: ["Crobat"],
            turns: [
              [
                { player: "{p:Dragapult} switch to {p:Lanturn}" },
                { opponent: "{o:Crobat} Nasty Plot" },
              ],
              [
                { opponent: "{o:Crobat} Nasty Plot" },
                { player: "{p:Lanturn} Volt Switch {o:Crobat} to {-:127}" },
                { opponent: "{o:Crobat} Sitrus Berry to {-:193}" },
                { player: "{p:Lanturn} switch to {p:Zapdos}" },
              ],
              [
                { player: "{p:Zapdos} Volt Switch {o:Crobat} to {=:0}" },
                { opponent: "{o:Crobat} fainted" },
                { player: "{p:Zapdos} switch to {p:Dragapult}" },
              ],
            ],
          },
          {
            matchup: ["Volcanion"],
            turns: [
              [
                { player: "{p:Dragapult} switch to {p:Zapdos}" },
                { opponent: "{o:Volcanion} Earth Power {p:Zapdos}" },
              ],
              [
                { player: "{p:Zapdos} switch to {p:Lanturn}" },
                { opponent: "{o:Volcanion} Steam Erupt. (Z) {p:Lanturn}" },
              ],
              [
                { opponent: "{o:Volcanion} Earth Power {p:Lanturn} to {+:21}" },
                { player: "{p:Lanturn} Volt Switch {o:Volcanion} to {-:131}" },
                { player: "{p:Lanturn} switch to {p:Zapdos}" },
              ],
              [
                { player: "{p:Zapdos} Volt Switch {o:Volcanion} to {=:0}" },
                { opponent: "{o:Volcanion} fainted" },
                { player: "{p:Zapdos} switch to {p:Dragapult}" },
              ],
            ],
          },
          {
            matchup: ["Flygon"],
            turns: [
              [
                { player: "{p:Dragapult} Dragon Darts {o:Flygon} to {=:0}" },
                { opponent: "{p:Dragapult} Life Orb to {=:216}" },
                { opponent: "{o:Flygon} fainted" },
              ],
            ],
          },
          {
            matchup: ["Kingler-Mega"],
            turns: [
              [
                { player: "{p:Dragapult} switch to {p:Perrserker}" },
                { opponent: "{o:Kingler-Mega} Ice Hammer {p:Perrserker} to {+:207}" },
              ],
              [
                { opponent: "{o:Kingler-Mega} Crabhammer {p:Perrserker} to {+:5}" },
                { player: "{p:Perrserker} U-Turn {o:Kingler-Mega} to {-:187}" },
                { player: "{p:Perrserker} switch to {p:Zapdos}" },
              ],
              [
                { player: "{p:Zapdos} Bolt Beak {o:Kingler-Mega} to {=:0}" },
                { opponent: "{o:Kingler-Mega} fainted" },
              ],
            ],
          },
          {
            matchup: ["Hatterene"],
            turns: [
              [
                { player: "{p:Zapdos} Bolt Beak {o:Hatterene} to {-:67}" },
                { opponent: "{o:Hatterene} Psyshock {p:Zapdos} to {+:58}" },
                { opponent: "{o:Hatterene} Leftovers to {-:80}" },
              ],
              [
                { player: "{p:Zapdos} Bolt Beak {o:Hatterene} to {=:0}" },
                { opponent: "{o:Hatterene} fainted" },
              ],
            ],
          }
        ],
        frags: { Dragapult: 2, Zapdos: 4 }
      },
    ],
  },
};

const _box12 = getBox({
  box: _box11,
  update: {
    Infernape: {
      nature: "Hasty",
      ability: "Iron Fist",
      item: "Life Orb",
      moves: ["Fake Out", "Close Combat", "Flamethrower", "Vacuum Wave"]
    },
    "Chien-Pao": {
      nature: "Adamant",
      ability: "Sword of Ruin",
      item: "Life Orb",
      moves: ["Ice Shard", "Icicle Crash", "Sacred Sword", "Sucker Punch"]
    }
  },
  team: ["Infernape", "Chien-Pao"],
});

export const victoryRoadAceTrainerGeorgeBattle: Moment = {
  split: "Victory Road",
  label: "Victory Road Ace Trainer George Battle",
  kind: "battle",
  data: {
    playerBox: _box12,
    opponentBox: victoryRoadAceTrainerGeorgeBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Metagross"],
            turns: [
              [
                { player: "{p:Infernape} Fake Out {o:Metagross} to {-:243}" },
                { opponent: "{p:Infernape} Life Orb to {=:225}" },
                { opponent: "{o:Metagross} flinched" },
              ],
              [
                { player: "{p:Infernape} Flamethrower {o:Metagross} to {=:0}" },
                { opponent: "{p:Infernape} Life Orb to {=:200}" },
                { opponent: "{o:Metagross} fainted" },
              ],
            ],
          },
          {
            matchup: ["Starmie"],
            turns: [
              [
                { player: "{p:Infernape} switch to {p:Chien-Pao}" },
                { opponent: "{o:Starmie} Psyshock {p:Chien-Pao}" },
              ],
              [
                { player: "{p:Chien-Pao} Sucker Punch {o:Starmie} to {=:0}" },
                { opponent: "{p:Chien-Pao} Life Orb to {=:232}" },
                { opponent: "{o:Starmie} fainted" },
              ],
            ],
          },
          {
            matchup: ["Pangoro"],
            turns: [
              [
                { player: "{p:Chien-Pao} Sacred Sword {o:Pangoro} to {=:0}" },
                { opponent: "{p:Chien-Pao} Life Orb to {=:207}" },
                { opponent: "{o:Pangoro} fainted" },
              ],
            ],
          },
          {
            matchup: ["Espeon"],
            turns: [
              [
                { player: "{p:Chien-Pao} Sucker Punch {o:Espeon} to {=:0}" },
                { opponent: "{p:Chien-Pao} Life Orb to {=:182}" },
                { opponent: "{o:Espeon} fainted" },
              ],
            ],
          },
          {
            matchup: ["Tauros"],
            turns: [
              [
                { player: "{p:Chien-Pao} Sacred Sword {o:Tauros} to {=:0}" },
                { opponent: "{p:Chien-Pao} Life Orb to {=:157}" },
                { opponent: "{o:Tauros} fainted" },
              ],
            ],
          },
          {
            matchup: ["Pinsir-Mega"],
            turns: [
              [
                { opponent: "{o:Pinsir-Mega} mega evolve" },
                { player: "{p:Chien-Pao} Icicle Crash {o:Pinsir-Mega} to {=:0}" },
                { opponent: "{p:Chien-Pao} Life Orb to {=:132}" },
                { opponent: "{o:Pinsir-Mega} fainted" },
              ],
            ],
          },
        ],
        frags: { Infernape: 1, "Chien-Pao": 5 }
      },
    ],
  },
};

const _box13 = getBox({
  box: _box12,
  update: {
    "Darmanitan-GZ": {
      nature: "Adamant",
      ability: "Zen Mode",
      item: "Life Orb",
      moves: ["Earthquake", "Focus Punch", "Icicle Crash", "U-Turn"],
    },
    Perrserker: {
      nature: "Adamant",
      ability: "Battle Armor",
      item: "Chople Berry",
      moves: ["Fake Out", "Dig", "Thrash", "U-Turn"]
    },
    "Drednaw": {
      nature: "Careful",
      ability: "Shell Armor",
      item: "Chople Berry",
      moves: ["Earthquake", "Flip Turn", "Ice Fang", "Stone Edge"],
    },
    Zapdos: {
      nature: "Rash",
      ability: "Pressure",
      item: "Choice Scarf",
      moves: ["Bolt Beak", "Hurricane", "Thunderbolt", "Volt Switch"]
    },
    Golisopod: {
      nature: "Careful",
      ability: "Emergency Exit",
      item: "Focus Sash",
      moves: ["First Impress.", "Brick Break", "Knock Off", "Poison Jab"],
    }
  },
  team: ["Darmanitan-GZ", "Perrserker", "Drednaw", "Zapdos", "Golisopod"],
});

export const victoryRoadAceTrainerCarolineBattle: Moment = {
  split: "Victory Road",
  label: "Victory Road Ace Trainer Caroline Battle",
  kind: "battle",
  data: {
    playerBox: _box13,
    opponentBox: victoryRoadAceTrainerCarolineBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Lopunny-Mega"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} switch to {p:Perrserker}" },
                { opponent: "{o:Lopunny-Mega} mega evolve" },
                { opponent: "{o:Lopunny-Mega} Close Combat {p:Perrserker} to {+:103}" },
              ],
              [
                { player: "{p:Perrserker} Fake Out {o:Lopunny-Mega} to {-:184}" },
                { opponent: "{o:Lopunny-Mega} flinched" },
              ],
              [
                { player: "{p:Perrserker} switch to {p:Drednaw}" },
                { opponent: "{o:Lopunny-Mega} Close Combat {p:Drednaw} to {+:87}" },
              ],
              [
                { player: "{p:Drednaw} switch to {p:Zapdos}" },
                { opponent: "{o:Lopunny-Mega} Close Combat {p:Zapdos} to {+:127}" },
              ],
              [
                { player: "{p:Zapdos} Volt Switch {o:Lopunny-Mega} to {=:0}" },
                { opponent: "{o:Lopunny-Mega} fainted" },
                { player: "{p:Zapdos} switch to {p:Golisopod}" },
              ],
            ],
          },
          {
            matchup: ["Simisear"],
            turns: [
              [
                { opponent: "{o:Simisear} Flamethrower {p:Golisopod} to {+:13}" },
                { player: "{p:Golisopod} Knock Off {o:Simisear} to {-:195}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Darmanitan-GZ}" },
              ],
              [
                { player: "{p:Darmanitan-GZ} Earthquake {o:Simisear} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:270}" },
                { opponent: "{o:Simisear} fainted" },
              ],
            ],
          },
          {
            matchup: ["Bellossom"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Icicle Crash {o:Bellossom} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:241}" },
                { opponent: "{o:Bellossom} fainted" },
              ],
            ],
          },
          {
            matchup: ["Stakataka"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Earthquake {o:Stakataka} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:212}" },
                { opponent: "{o:Stakataka} fainted" },
              ],
            ],
          },
          {
            matchup: ["Morpeko"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Earthquake {o:Morpeko} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:183}" },
                { opponent: "{o:Morpeko} fainted" },
              ],
            ],
          },
          {
            matchup: ["Latias"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Icicle Crash {o:Latias} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:154}" },
                { opponent: "{o:Latias} fainted" },
              ],
            ],
          },
        ],
        frags: { Zapdos: 1, "Darmanitan-GZ": 5 }
      },
    ],
  },
};

const _box14 = getBox({
  box: _box13,
  update: {
    Zapdos: {
      nature: "Rash",
      ability: "Pressure",
      item: "Choice Scarf",
      moves: ["Bolt Beak", "Hurricane", "Thunderbolt", "Volt Switch"]
    },
    "Darmanitan-GZ": {
      nature: "Adamant",
      ability: "Zen Mode",
      item: "Life Orb",
      moves: ["Earthquake", "Icicle Crash", "Iron Head", "Zen Headbutt"]
    }
  },
  team: ["Zapdos", "Darmanitan-GZ"],
});

export const victoryRoadAceTrainerColbyBattle: Moment = {
  split: "Victory Road",
  label: "Victory Road Ace Trainer Colby Battle",
  kind: "battle",
  data: {
    playerBox: _box14,
    opponentBox: victoryRoadAceTrainerColbyBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Arcanine"],
            turns: [
              [
                { player: "{p:Zapdos} switch to {p:Darmanitan-GZ}" },
                { opponent: "{o:Arcanine} Will-O-Wisp {p:Darmanitan-GZ}" },
              ],
              [
                { player: "{p:Darmanitan-GZ} Earthquake {o:Arcanine} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:270}" },
                { opponent: "{o:Arcanine} fainted" },
              ],
            ],
          },
          {
            matchup: ["Diancie-Mega"],
            turns: [
              [
                { opponent: "{o:Diancie-Mega} mega evolve" },
                { player: "{p:Darmanitan-GZ} Iron Head {o:Diancie-Mega} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:241}" },
                { opponent: "{o:Diancie-Mega} fainted" },
              ],
            ],
          },
          {
            matchup: ["Iron Leaves"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Icicle Crash {o:Iron Leaves} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:212}" },
                { opponent: "{o:Iron Leaves} fainted" },
              ],
            ],
          },
          {
            matchup: ["Muk-A"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Earthquake {o:Muk-A} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:183}" },
                { opponent: "{o:Muk-A} fainted" },
              ],
            ],
          },
          {
            matchup: ["Mismagius"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Iron Head {o:Mismagius} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:154}" },
                { opponent: "{o:Mismagius} fainted" },
              ],
            ],
          },
          {
            matchup: ["Grapploct"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} switch to {p:Zapdos}" },
                { opponent: "{o:Grapploct} Aqua Jet {p:Zapdos} to {+:130}" },
              ],
              [
                { player: "{p:Zapdos} Bolt Beak {o:Grapploct} to {=:0}" },
                { opponent: "{o:Grapploct} fainted" },
              ],
            ],
          },
        ],
        frags: { "Darmanitan-GZ": 5, Zapdos: 1 }
      },
    ],
  },
};

const _box15 = getBox({
  box: _box14,
  update: {
    Zapdos: {
      nature: "Rash",
      ability: "Pressure",
      item: "Choice Specs",
      moves: ["Bolt Beak", "Hurricane", "Thunderbolt", "Volt Switch"]
    },
    Meowscarada: {
      nature: "Brave",
      ability: "Protean",
      item: "Life Orb",
      moves: ["Dig", "Flower Trick", "Knock Off", "U-Turn"]
    },
    "Greninja-Ash": {
      nature: "Rash",
      ability: "Battle Bond",
      item: "Life Orb",
      moves: ["Dark Pulse", "Surf", "U-Turn", "Water Shurik."],
    },
    Incineroar: {
      nature: "Careful",
      ability: "Intimidate",
      item: "Sitrus Berry",
      moves: ["Bite", "Darkest Lariat", "Scorch. Sands", "U-Turn"]
    },
    Golisopod: {
      nature: "Careful",
      ability: "Emergency Exit",
      item: "Focus Sash",
      moves: ["First Impress.", "Brick Break", "Knock Off", "Poison Jab"]
    }
  },
  team: ["Zapdos", "Meowscarada", "Greninja-Ash", "Incineroar", "Golisopod"],
});

export const victoryRoadAceTrainerAlexaBattle: Moment = {
  split: "Victory Road",
  label: "Victory Road Ace Trainer Alexa Battle",
  kind: "battle",
  data: {
    playerBox: _box15,
    opponentBox: victoryRoadAceTrainerAlexaBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Clefable"],
            turns: [
              [
                { player: "{p:Zapdos} Volt Switch {o:Clefable} to {-:141}" },
                { player: "{p:Zapdos} switch to {p:Meowscarada}" },
                { opponent: "{o:Clefable} Stealth Rock" },
              ],
              [
                { player: "{p:Meowscarada} Flower Trick {o:Clefable} to {=:0}" },
                { opponent: "{p:Meowscarada} Life Orb to {=:225}" },
                { opponent: "{o:Clefable} fainted" },
              ],
            ],
          },
          {
            matchup: ["Iron Treads"],
            turns: [
              [
                { opponent: "{o:Iron Treads} Knock Off {p:Meowscarada} to {+:69}" },
                { player: "{p:Meowscarada} U-Turn {o:Iron Treads} to {-:249}" },
                { player: "{p:Meowscarada} switch to {p:Greninja-Ash}" },
                { opponent: "{p:Greninja-Ash} Stealth Rock to {=:213}" },
              ],
              [
                { player: "{p:Greninja-Ash} Surf {o:Iron Treads} to {=:0}" },
                { opponent: "{p:Greninja-Ash} Life Orb to {=:189}" },
                { opponent: "{o:Iron Treads} fainted" },
                { opponent: "{p:Greninja-Ash} transform" },
              ],
            ],
          },
          {
            matchup: ["Dondozo"],
            turns: [
              [
                { player: "{p:Greninja-Ash} U-Turn {o:Dondozo} to {-:307}" },
                { opponent: "{p:Greninja-Ash} Life Orb to {=:165}" },
                { player: "{p:Greninja-Ash} switch to {p:Zapdos}" },
                { opponent: "{p:Zapdos} Stealth Rock to {=:206}" },
                { opponent: "{o:Dondozo} Toxic {p:Zapdos}" },
                { opponent: "{o:Dondozo} Leftovers to {-:330}" },
                { opponent: "{p:Zapdos} badly poison to {+:189}" },
              ],
              [
                { player: "{p:Zapdos} Volt Switch {o:Dondozo} to {=:0}" },
                { opponent: "{o:Dondozo} fainted" },
                { player: "{p:Zapdos} switch to {p:Incineroar}" },
                { opponent: "{p:Incineroar} Stealth Rock to {=:212}" },
              ],
            ],
          },
          {
            matchup: ["Mienshao"],
            turns: [
              [
                { player: "{p:Incineroar} switch to {p:Golisopod}" },
                { opponent: "{p:Golisopod} Stealth Rock to {=:186}" },
                { opponent: "{o:Mienshao} Close Combat {p:Golisopod} to {+:69}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Greninja-Ash}" },
                { opponent: "{p:Greninja-Ash} Stealth Rock to {=:135}" },
              ],
              [
                { player: "{p:Greninja-Ash} Surf {o:Mienshao} to {=:0}" },
                { opponent: "{p:Greninja-Ash} Life Orb to {=:111}" },
                { opponent: "{o:Mienshao} fainted" },
              ],
            ],
          },
          {
            matchup: ["Mew"],
            turns: [
              [
                { player: "{p:Greninja-Ash} Dark Pulse {o:Mew} to {=:0}" },
                { opponent: "{p:Greninja-Ash} Life Orb to {=:87}" },
                { opponent: "{o:Mew} fainted" },
              ],
            ],
          },
          {
            matchup: ["Infernape"],
            turns: [
              [
                { player: "{p:Greninja-Ash} Water Shurik. {o:Infernape} to {=:0}" },
                { opponent: "{p:Greninja-Ash} Life Orb to {=:63}" },
                { opponent: "{o:Infernape} fainted" },
              ],
            ],
          },
        ],
        frags: { Meowscarada: 1, "Greninja-Ash": 4, Zapdos: 1 }
      },
    ],
  },
};

const _box16 = getBox({
  box: _box15,
  update: {
    Zapdos: {
      item: undefined,
    },
    Dragapult: {
      nature: "Adamant",
      ability: "Clear Body",
      item: "Life Orb",
      moves: ["Dragon Darts", "Phantom Force", "Thunder", "U-Turn"]
    },
    Jellicent: {
      nature: "Modest",
      ability: "Water Bubble",
      item: "Choice Specs",
      moves: ["Hydro Pump", "Ice Beam", "Scald", "Water Spout"]
    }
  },
  team: ["Dragapult", "Jellicent"],
});

export const victoryRoadCoolCoupleRayAndTyraBattle: Moment = {
  split: "Victory Road",
  label: "Victory Road Cool Couple Ray & Tyra Battle",
  kind: "battle",
  data: {
    playerBox: _box16,
    opponentBox: victoryRoadCoolCoupleRayAndTyraBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Scrafty", "Darmanitan-Z"],
            turns: [
              [
                {
                  player:
                    "{p:Dragapult} Dragon Darts {o:Scrafty} to {-:161} and {o:Darmanitan-Z} to {-:224}",
                },
                { opponent: "{p:Dragapult} Life Orb to {=:243}" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Scrafty} to {=:0} and {o:Darmanitan-Z} to {=:0}",
                },
                { opponent: "{o:Scrafty} fainted" },
                { opponent: "{o:Darmanitan-Z} fainted" },
              ],
            ],
            branches: [
              {
                branches: [
                  "50% → Copperajah-Mega matchup",
                  "50% → Dragalge matchup",
                ],
              },
            ],
          },
        ],
        frags: { Jellicent: 2 }
      },
      {
        line: "50% → Copperajah-Mega matchup",
        matchups: [
          {
            matchup: ["Scrafty", "Darmanitan-Z"],
            turns: [],
            branches: [
              {
                branches: [
                  "50% → Runerigus matchup",
                  "50% → Vikavolt matchup",
                ],
              },
            ],
          }
        ],
      },
      {
        line: "50% → Runerigus matchup",
        matchups: [
          {
            matchup: ["Copperajah-Mega", "Runerigus"],
            turns: [
              [
                { opponent: "{o:Copperajah-Mega} mega evolve" },
                {
                  player:
                    "{p:Dragapult} Dragon Darts {o:Copperajah-Mega} to {-:288} and {o:Runerigus} to {-:180}",
                },
                { opponent: "{p:Dragapult} Life Orb to {=:216}" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Copperajah-Mega} to {=:0} and {o:Runerigus} to {=:0}",
                },
                { opponent: "{o:Copperajah-Mega} fainted" },
                { opponent: "{o:Runerigus} fainted" },
              ],
            ],
          },
          {
            matchup: ["Dragalge", "Vikavolt"],
            turns: [],
            branches: [
              {
                branches: [
                  "94% → Dragapult Dragon Darts Dragalge",
                  "6% → Dragapult Dragon Darts Dragalge (to 0)",
                ],
              },
            ],
          }
        ],
        frags: { Jellicent: 2 }
      },
      {
        line: "94% → Dragapult Dragon Darts Dragalge",
        matchups: [
          {
            matchup: ["Dragalge", "Vikavolt"],
            turns: [
              [
                {
                  player:
                    "{p:Dragapult} Dragon Darts {o:Dragalge} to {-:59} and {o:Vikavolt} to {-:166}",
                },
                { opponent: "{p:Dragapult} Life Orb to {=:189}" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Dragalge} to {=:0} and {o:Vikavolt} to {=:0}",
                },
                { opponent: "{o:Dragalge} fainted" },
                { opponent: "{o:Vikavolt} fainted" },
              ],
            ],
          },
        ],
        frags: { Jellicent: 2 }
      },
      {
        line: "6% → Dragapult Dragon Darts Dragalge (to 0)",
        matchups: [
          {
            matchup: ["Dragalge", "Vikavolt"],
            turns: [
              [
                {
                  player:
                    "{p:Dragapult} Dragon Darts {o:Dragalge} (crit) to {=:0} and {o:Vikavolt} to {-:166}",
                },
                { opponent: "{p:Dragapult} Life Orb to {=:189}" },
                { opponent: "{o:Dragalge} fainted" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Vikavolt} to {=:0}",
                },
                { opponent: "{o:Vikavolt} fainted" },
              ],
            ],
          },
        ],
        frags: { Dragapult: 1, Jellicent: 1 }
      },
      {
        line: "50% → Vikavolt matchup",
        matchups: [
          {
            matchup: ["Copperajah-Mega", "Vikavolt"],
            turns: [
              [
                { opponent: "{o:Copperajah-Mega} mega evolve" },
                {
                  player:
                    "{p:Dragapult} Dragon Darts {o:Copperajah-Mega} to {-:288} and {o:Vikavolt} to {-:166}",
                },
                { opponent: "{p:Dragapult} Life Orb to {=:216}" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Copperajah-Mega} to {=:0} and {o:Vikavolt} to {=:0}",
                },
                { opponent: "{o:Copperajah-Mega} fainted" },
                { opponent: "{o:Vikavolt} fainted" },
              ],
            ],
          },
          {
            matchup: ["Dragalge", "Runerigus"],
            turns: [],
            branches: [
              {
                branches: [
                  "94% → Dragapult Dragon Darts Dragalge 2",
                  "6% → Dragapult Dragon Darts Dragalge (to 0) 2",
                ],
              },
            ],
          }
        ],
        frags: { Jellicent: 2 },
      },
      {
        line: "94% → Dragapult Dragon Darts Dragalge 2",
        label: "94% → Dragapult Dragon Darts Dragalge",
        matchups: [
          {
            matchup: ["Dragalge", "Runerigus"],
            turns: [
              [
                {
                  player:
                    "{p:Dragapult} Dragon Darts {o:Dragalge} to {-:59} and {o:Runerigus} to {-:180}",
                },
                { opponent: "{p:Dragapult} Life Orb to {=:189}" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Dragalge} to {=:0} and {o:Runerigus} to {=:0}",
                },
                { opponent: "{o:Dragalge} fainted" },
                { opponent: "{o:Runerigus} fainted" },
              ],
            ],
          },
        ],
        frags: { Jellicent: 2 }
      },
      {
        line: "6% → Dragapult Dragon Darts Dragalge (to 0) 2",
        label: "6% → Dragapult Dragon Darts Dragalge (to 0)",
        matchups: [
          {
            matchup: ["Dragalge", "Runerigus"],
            turns: [
              [
                {
                  player:
                    "{p:Dragapult} Dragon Darts {o:Dragalge} (crit) to {=:0} and {o:Runerigus} to {-:180}",
                },
                { opponent: "{p:Dragapult} Life Orb to {=:189}" },
                { opponent: "{o:Dragalge} fainted" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Runerigus} to {=:0}",
                },
                { opponent: "{o:Runerigus} fainted" },
              ],
            ],
          },
        ],
        frags: { Dragapult: 1, Jellicent: 1 }
      },
      {
        line: "50% → Dragalge matchup",
        matchups: [
          {
            matchup: ["Scrafty", "Darmanitan-Z"],
            turns: [],
            branches: [
              {
                branches: [
                  "50% → Runerigus matchup 2",
                  "50% → Vikavolt matchup 2",
                ],
              },
            ],
          }
        ],
      },
      {
        line: "50% → Runerigus matchup 2",
        label: "50% → Runerigus matchup",
        matchups: [
          {
            matchup: ["Dragalge", "Runerigus"],
            turns: [],
            branches: [
              {
                branches: [
                  "94% → Dragapult Dragon Darts Dragalge 3",
                  "6% → Dragapult Dragon Darts Dragalge (to 0) 3",
                ],
              },
            ],
          }
        ],
      },
      {
        line: "94% → Dragapult Dragon Darts Dragalge 3",
        label: "94% → Dragapult Dragon Darts Dragalge",
        matchups: [
          {
            matchup: ["Dragalge", "Runerigus"],
            turns: [
              [
                {
                  player:
                    "{p:Dragapult} Dragon Darts {o:Dragalge} to {-:59} and {o:Runerigus} to {-:180}",
                },
                { opponent: "{p:Dragapult} Life Orb to {=:216}" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Dragalge} to {=:0} and {o:Runerigus} to {=:0}",
                },
                { opponent: "{o:Dragalge} fainted" },
                { opponent: "{o:Runerigus} fainted" },
              ],
            ],
            branches: [{ branches: ["Dragapult Dragon Darts Copperajah-Mega and Vikavolt"] }],
          },
        ],
        frags: { Jellicent: 2 }
      },
      {
        line: "6% → Dragapult Dragon Darts Dragalge (to 0) 3",
        label: "6% → Dragapult Dragon Darts Dragalge (to 0)",
        matchups: [
          {
            matchup: ["Dragalge", "Runerigus"],
            turns: [
              [
                {
                  player:
                    "{p:Dragapult} Dragon Darts {o:Dragalge} (crit) to {=:0} and {o:Runerigus} to {-:180}",
                },
                { opponent: "{p:Dragapult} Life Orb to {=:216}" },
                { opponent: "{o:Dragalge} fainted" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Runerigus} to {=:0}",
                },
                { opponent: "{o:Runerigus} fainted" },
              ],
            ],
            branches: [{ branches: ["Dragapult Dragon Darts Copperajah-Mega and Vikavolt"] }],
          },
        ],
        frags: { Dragapult: 1, Jellicent: 1 }
      },
      {
        line: "Dragapult Dragon Darts Copperajah-Mega and Vikavolt",
        matchups: [
          {
            matchup: ["Copperajah-Mega", "Vikavolt"],
            turns: [
              [
                { opponent: "{o:Copperajah-Mega} mega evolve" },
                {
                  player:
                    "{p:Dragapult} Dragon Darts {o:Copperajah-Mega} to {-:288} and {o:Vikavolt} to {-:166}",
                },
                { opponent: "{p:Dragapult} Life Orb to {=:189}" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Copperajah-Mega} to {=:0} and {o:Vikavolt} to {=:0}",
                },
                { opponent: "{o:Copperajah-Mega} fainted" },
                { opponent: "{o:Vikavolt} fainted" },
              ],
            ],
          },
        ],
        frags: { Jellicent: 2 },
      },
      {
        line: "50% → Vikavolt matchup 2",
        label: "50% → Vikavolt matchup",
        matchups: [
          {
            matchup: ["Dragalge", "Vikavolt"],
            turns: [],
            branches: [
              {
                branches: [
                  "94% → Dragapult Dragon Darts Dragalge 4",
                  "6% → Dragapult Dragon Darts Dragalge (to 0) 4",
                ],
              },
            ],
          }
        ],
      },
      {
        line: "94% → Dragapult Dragon Darts Dragalge 4",
        label: "94% → Dragapult Dragon Darts Dragalge",
        matchups: [
          {
            matchup: ["Dragalge", "Vikavolt"],
            turns: [
              [
                {
                  player:
                    "{p:Dragapult} Dragon Darts {o:Dragalge} to {-:59} and {o:Vikavolt} to {-:166}",
                },
                { opponent: "{p:Dragapult} Life Orb to {=:216}" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Dragalge} to {=:0} and {o:Vikavolt} to {=:0}",
                },
                { opponent: "{o:Dragalge} fainted" },
                { opponent: "{o:Vikavolt} fainted" },
              ],
            ],
            branches: [{ branches: ["Dragapult Dragon Darts Copperajah-Mega and Runerigus"] }],
          },
        ],
        frags: { Jellicent: 2 }
      },
      {
        line: "6% → Dragapult Dragon Darts Dragalge (to 0) 4",
        label: "6% → Dragapult Dragon Darts Dragalge (to 0)",
        matchups: [
          {
            matchup: ["Dragalge", "Vikavolt"],
            turns: [
              [
                {
                  player:
                    "{p:Dragapult} Dragon Darts {o:Dragalge} (crit) to {=:0} and {o:Vikavolt} to {-:166}",
                },
                { opponent: "{p:Dragapult} Life Orb to {=:216}" },
                { opponent: "{o:Dragalge} fainted" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Vikavolt} to {=:0}",
                },
                { opponent: "{o:Vikavolt} fainted" },
              ],
            ],
            branches: [{ branches: ["Dragapult Dragon Darts Copperajah-Mega and Runerigus"] }],
          },
        ],
        frags: { Dragapult: 1, Jellicent: 1 }
      },
      {
        line: "Dragapult Dragon Darts Copperajah-Mega and Runerigus",
        matchups: [
          {
            matchup: ["Copperajah-Mega", "Runerigus"],
            turns: [
              [
                { opponent: "{o:Copperajah-Mega} mega evolve" },
                {
                  player:
                    "{p:Dragapult} Dragon Darts {o:Copperajah-Mega} to {-:288} and {o:Runerigus} to {-:180}"
                },
                { opponent: "{p:Dragapult} Life Orb to {=:189}" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Copperajah-Mega} to {=:0} and {o:Runerigus} to {=:0}",
                },
                { opponent: "{o:Copperajah-Mega} fainted" },
                { opponent: "{o:Runerigus} fainted" },
              ],
            ],
          },
        ],
        frags: { Jellicent: 2 },
      },
    ],
  },
};

const _box17 = getBox({
  box: _box16,
  update: {
    Runerigus: {
      nature: "Jolly",
      ability: "Wandering Soul",
      item: "Chesto Berry",
      moves: ["Rock Slide", "Scary Face", "Shadow Ball", "Shadow Sneak"]
    }
  },
  team: ["Runerigus"],
});

export const indigoPlateauCreatorSoupercellBattle: Moment = {
  split: "Victory Road",
  label: "Indigo Plateau Creator Soupercell Battle",
  kind: "battle",
  data: {
    playerBox: _box17,
    opponentBox: indigoPlateauCreatorSoupercellBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Gigalith"],
            turns: [
              [
                { opponent: "{o:Gigalith} Explosion {p:Runerigus}" },
                { opponent: "{o:Gigalith} fainted" },
              ],
            ],
          },
          {
            matchup: ["Shedinja"],
            turns: [
              [
                { opponent: "{o:Shedinja} Soupercell Slam {p:Runerigus}" },
                { player: "{p:Runerigus} Rock Slide {o:Shedinja} to {=:1}" },
                { opponent: "{o:Shedinja} sandstorm to {=:0}" },
                { opponent: "{o:Shedinja} fainted" },
              ],
            ],
          },
          {
            matchup: ["Shedinja"],
            newMatchup: true,
            turns: [
              [
                { opponent: "{o:Shedinja} Soupercell Slam {p:Runerigus}" },
                { player: "{p:Runerigus} Rock Slide {o:Shedinja} to {=:1}" },
                { opponent: "{o:Shedinja} sandstorm to {=:0}" },
                { opponent: "{o:Shedinja} fainted" },
              ],
            ],
          },
          {
            matchup: ["Shedinja"],
            newMatchup: true,
            turns: [
              [
                { opponent: "{o:Shedinja} Soupercell Slam {p:Runerigus}" },
                { player: "{p:Runerigus} Rock Slide {o:Shedinja} to {=:1}" },
                { opponent: "{o:Shedinja} sandstorm to {=:0}" },
                { opponent: "{o:Shedinja} fainted" },
              ],
            ],
          },
          {
            matchup: ["Shedinja"],
            newMatchup: true,
            turns: [
              [
                { opponent: "{o:Shedinja} Soupercell Slam {p:Runerigus}" },
                { player: "{p:Runerigus} Rock Slide {o:Shedinja} to {=:1}" },
                { opponent: "{o:Shedinja} sandstorm to {=:0}" },
                { opponent: "{o:Shedinja} fainted" },
              ],
            ],
          },
          {
            matchup: ["Shedinja"],
            newMatchup: true,
            turns: [
              [
                { opponent: "{o:Shedinja} Soupercell Slam {p:Runerigus}" },
                { player: "{p:Runerigus} Rock Slide {o:Shedinja} to {=:1}" },
                { opponent: "{o:Shedinja} sandstorm to {=:0}" },
                { opponent: "{o:Shedinja} fainted" },
              ],
            ],
          },
        ],
        frags: { "Runerigus": 6 }
      },
    ],
  },
};

const _box18 = getBox({
  box: _box17,
  removeItems: true,
});

export const indigoPlateauCreatorSoupercellBoxChange: Moment = {
  split: "Victory Road",
  label: "Indigo Plateau Creator Soupercell Box Change",
  kind: "boxChange",
  data: { playerBox: _box18 },
};

export const box = _box18;

export const moments: Moment[] = [
  route13Encounter,
  route18Encounter,
  route20Encounter,
  route20BoxChange,
  route22RivalRematchBattle,
  route22RivalRematchBoxChange,
  route23BrendanBattle,
  route23BrendanBoxChange,
  victoryRoadAceTrainerNaomiBattle,
  victoryRoadAceTrainerRolandoBattle,
  victoryRoadAceTrainerGeorgeBattle,
  victoryRoadAceTrainerCarolineBattle,
  victoryRoadAceTrainerColbyBattle,
  victoryRoadAceTrainerAlexaBattle,
  victoryRoadCoolCoupleRayAndTyraBattle,
  indigoPlateauCreatorSoupercellBattle,
  indigoPlateauCreatorSoupercellBoxChange,
];
