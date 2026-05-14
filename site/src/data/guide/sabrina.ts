import { getBox } from "@site/src/utils/box";
import { Moment } from "@site/src/utils/moments";
import {
  gameCornerGuardBox,
  pokemonTowerChannelerRuthBox,
  pokemonTowerGhostBox,
  pokemonTowerGrunt1Box,
  pokemonTowerGrunt2Box,
  pokemonTowerGrunt3Box,
  pokemonTrainerBrendanBox,
  rocketHideoutGiovanniBox,
  rocketHideoutLeftGuardBox,
  rocketHideoutRightGuardBox,
  saffronCityDumassKidBox,
  saffronCityLeaderSabrinaBox,
  saffronDojoLeaderChuckBox,
  silphCoArianaArcherBox,
  silphCoGiovanniBox,
  silphCoRivalBox,
} from "@site/src/utils/opponents";

import { box as _box1 } from "@site/src/data/guide/erika";

const _box2 = getBox({
  box: _box1,
  cap: { level: 47, exclude: ["Golisopod", "Jellicent"] },
  update: {
    Golisopod: {
      ivs: { def: 0 },
    },
  },
});

export const sabrinaBoxChange: Moment = {
  split: "Sabrina",
  label: "Sabrina Box Change",
  kind: "boxChange",
  data: { playerBox: _box2 },
};

const _box3 = getBox({
  box: _box2,
  update: {
    Perrserker: {
      nature: "Adamant",
      ability: "Battle Armor",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Bullet Punch", "Thunderbolt", "U-Turn"],
    },
    Golisopod: {
      nature: "Lonely",
      ability: "Emergency Exit",
      item: "Silver Powder",
      moves: ["First Impression", "Aerial Ace", "Rock Tomb", "Sucker Punch"],
    },
    Incineroar: {
      nature: "Impish",
      ability: "Intimidate",
      item: "Charti Berry",
      moves: ["Fake Out", "Darkest Lariat", "Thunder Punch", "U-Turn"],
    },
    Lanturn: {
      nature: "Modest",
      ability: "Water Absorb",
      item: "Sitrus Berry",
      moves: ["Bubble Beam", "Icy Wind", "Thunderbolt", "Thunder Wave"],
    },
    Tentacruel: {
      nature: "Timid",
      ability: "Clear Body",
      item: "Payapa Berry",
      moves: ["Acid Spray", "Bubble Beam", "Icy Wind", "Poison Jab"],
    },
    "Arcanine-H": {
      nature: "Impish",
      ability: "Rock Head",
      item: "Magnet",
      moves: ["Bad Tantrum", "Crunch", "Flare Blitz", "Thunder Fang"],
    },
  },
  team: ["Perrserker", "Golisopod", "Incineroar", "Lanturn", "Tentacruel", "Arcanine-H"],
});

export const gameCornerGuardBattle: Moment = {
  split: "Sabrina",
  label: "Game Corner Guard Battle",
  kind: "battle",
  data: {
    playerBox: _box3,
    opponentBox: gameCornerGuardBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Aerodactyl", "Hypno"],
            turns: [
              [
                { player: "{p:Perrserker} Bullet Punch {o:Aerodactyl} to {-:71}" },
                { player: "{p:Golisopod} First Impression {o:Hypno} to {=:0}" },
                { opponent: "{o:Hypno} fainted" },
                {
                  opponent:
                    "{o:Aerodactyl} Rock Slide {p:Perrserker} to {=:138} and {p:Golisopod} to {+:22}",
                },
                { player: "{p:Golisopod} Emergency Exit to {p:Incineroar}" },
              ],
            ],
          },
          {
            matchup: ["Aerodactyl", "Tinkaton"],
            turns: [
              [
                { player: "{p:Incineroar} Fake Out {o:Tinkaton} to {-:139}" },
                { player: "{p:Perrserker} Bullet Punch {o:Aerodactyl} to {=:0}" },
                { opponent: "{o:Aerodactyl} fainted" },
                { opponent: "{o:Tinkaton} flinched" },
              ],
            ],
          },
          {
            matchup: ["Inteleon", "Tinkaton"],
            turns: [
              [
                { player: "{p:Incineroar} switch to {p:Lanturn}" },
                { opponent: "{o:Inteleon} Snipe Shot {p:Perrserker} to {+:84}" },
                { opponent: "{o:Tinkaton} Gigaton Hammer {p:Perrserker} to {+:21}" },
                { player: "{p:Perrserker} U-Turn {o:Tinkaton} to {-:131}" },
                { player: "{p:Perrserker} switch to {p:Incineroar}" },
              ],
              [
                { player: "{p:Incineroar} Fake Out {o:Inteleon} to {-:112}" },
                { opponent: "{o:Inteleon} flinched" },
                { player: "{p:Lanturn} Thunderbolt {o:Inteleon} to {=:0}" },
                { opponent: "{o:Inteleon} fainted" },
                { opponent: "{o:Tinkaton} Play Rough {p:Incineroar} to {+:88}" },
              ],
            ],
          },
          {
            matchup: ["Tinkaton"],
            turns: [
              [
                { player: "{p:Lanturn} switch to {p:Tentacruel}" },
                { opponent: "{o:Tinkaton} Play Rough {p:Incineroar} to {+:16}" },
                { player: "{p:Incineroar} U-Turn {o:Tinkaton} to {-:127}" },
                { player: "{p:Incineroar} switch to {p:Arcanine-H}" },
              ],
              [
                { player: "{p:Tentacruel} Icy Wind {o:Tinkaton} to {-:121}" },
                { player: "{p:Arcanine-H} Flare Blitz {o:Tinkaton} to {=:0}" },
                { opponent: "{o:Tinkaton} fainted" },
              ],
            ],
          },
        ],
        frags: { Golisopod: 1, Perrserker: 1, Lanturn: 1, "Arcanine-H": 1 },
      },
    ],
  },
};

const _box4 = getBox({
  box: _box3,
  update: {
    Golisopod: {
      ivs: { def: 31 },
    },
  },
});

export const gameCornerGuardBoxChange: Moment = {
  split: "Sabrina",
  label: "Game Corner Guard Box Change",
  kind: "boxChange",
  data: { playerBox: _box4 },
};

const _box5 = getBox({
  box: _box4,
  update: {
    Golduck: {
      nature: "Modest",
      ability: "Neuroforce",
      item: "Twisted Spoon",
      moves: ["Aqua Tail", "Flip Turn", "Psychic", "Scald"],
    },
    Perrserker: {
      nature: "Adamant",
      ability: "Tough Claws",
      item: "Chople Berry",
      moves: ["Fake Out", "Aerial Ace", "Iron Head", "U-Turn"],
    },
    Incineroar: {
      nature: "Lonely",
      ability: "Blaze",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Darkest Lariat", "Thunder Punch", "U-Turn"],
    },
    Excadrill: {
      nature: "Jolly",
      ability: "Mold Breaker",
      item: "Soft Sand",
      moves: ["Drill Run", "Iron Head", "Rapid Spin", "Rock Tomb"],
    },
  },
  team: ["Golduck", "Perrserker", "Incineroar", "Excadrill"],
});

export const rocketHideoutLeftGuardBattle: Moment = {
  split: "Sabrina",
  label: "Rocket Hideout Left Guard Battle",
  kind: "battle",
  data: {
    playerBox: _box5,
    opponentBox: rocketHideoutLeftGuardBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Slaking", "Weezing-Galar"],
            turns: [
              [
                { player: "{p:Perrserker} Fake Out {o:Slaking} to {-:190}" },
                { opponent: "{o:Slaking} flinched" },
                { player: "{p:Golduck} Psychic {o:Weezing-Galar} to {=:0}" },
                { opponent: "{o:Weezing-Galar} fainted" },
              ],
            ],
          },
          {
            matchup: ["Slaking", "Lilligant-H"],
            turns: [
              [
                { player: "{p:Golduck} switch to {p:Incineroar}" },
                { opponent: "{o:Lilligant-H} Leaf Blade {p:Incineroar} to {+:97}" },
                { opponent: "{o:Slaking} Truant" },
                { player: "{p:Perrserker} Aerial Ace {o:Lilligant-H} to {=:0}" },
                { opponent: "{o:Lilligant-H} fainted" },
              ],
            ],
          },
          {
            matchup: ["Slaking", "Rotom-F"],
            turns: [
              [
                { player: "{p:Perrserker} switch to {p:Excadrill}" },
                { player: "{p:Incineroar} Fake Out {o:Slaking} to {-:174}" },
                { opponent: "{o:Slaking} flinched" },
                { opponent: "{o:Rotom-F} Thunderbolt {p:Excadrill}" },
              ],
              [
                { opponent: "{o:Slaking} Truant" },
                { player: "{p:Excadrill} Drill Run {o:Rotom-F} to {=:0}" },
                { opponent: "{o:Rotom-F} fainted" },
                { player: "{p:Incineroar} U-Turn {o:Slaking} to {-:144}" },
                { player: "{p:Incineroar} switch to {p:Perrserker}" },
              ],
            ],
          },
          {
            matchup: ["Slaking"],
            turns: [
              [
                { player: "{p:Perrserker} Fake Out {o:Slaking} to {-:122}" },
                { opponent: "{o:Slaking} flinched" },
                { player: "{p:Excadrill} Drill Run {o:Slaking} to {-:58}" },
              ],
              [
                { opponent: "{o:Slaking} Truant" },
                { player: "{p:Excadrill} Drill Run {o:Slaking} to {=:0}" },
                { opponent: "{o:Slaking} fainted" },
              ],
            ],
          },
        ],
        frags: { Golduck: 1, Perrserker: 1, Excadrill: 2 },
      },
    ],
  },
};

const _box6 = getBox({
  box: _box5,
  update: {
    Golduck: {
      nature: "Lonely",
      ability: "Neuroforce",
      item: "Mystic Water",
      moves: ["Aqua Tail", "Flip Turn", "Psychic", "Scald"],
    },
    Perrserker: {
      nature: "Adamant",
      ability: "Tough Claws",
      item: "Silk Scarf",
      moves: ["Fake Out", "Aerial Ace", "Iron Head", "U-Turn"],
    },
    Gyarados: {
      nature: "Jolly",
      ability: "Intimidate",
      item: "Sitrus Berry",
      moves: ["Aqua Fang", "Bite", "Bulldoze", "Ice Fang"],
    },
    Excadrill: {
      nature: "Jolly",
      ability: "Mold Breaker",
      item: "Soft Sand",
      moves: ["Drill Run", "Iron Head", "Rapid Spin", "Rock Tomb"],
    },
  },
  team: ["Golduck", "Perrserker", "Gyarados", "Excadrill"],
});

export const rocketHideoutRightGuardBattle: Moment = {
  split: "Sabrina",
  label: "Rocket Hideout Right Guard Battle",
  kind: "battle",
  data: {
    playerBox: _box6,
    opponentBox: rocketHideoutRightGuardBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Talonflame", "Shiftry"],
            turns: [
              [
                { player: "{p:Perrserker} Fake Out {o:Talonflame} to {-:110}" },
                { opponent: "{o:Talonflame} flinched" },
                { player: "{p:Golduck} Flip Turn {o:Talonflame} to {=:0}" },
                { opponent: "{o:Talonflame} fainted" },
                { player: "{p:Golduck} switch to {p:Gyarados}" },
                { opponent: "{o:Shiftry} Leaf Blade {p:Gyarados} to {+:82}" },
              ],
            ],
          },
          {
            matchup: ["Rotom-W", "Shiftry"],
            turns: [
              [
                { player: "{p:Gyarados} switch to {p:Excadrill}" },
                { opponent: "{o:Rotom-W} Thunderbolt {p:Excadrill}" },
                { opponent: "{o:Shiftry} Low Kick {p:Perrserker} to {+:66}" },
                { player: "{p:Perrserker} U-Turn {o:Shiftry} to {-:1}" },
                { player: "{p:Perrserker} switch to {p:Golduck}" },
              ],
              [
                { player: "{p:Golduck} Aqua Tail {o:Shiftry} to {=:0}" },
                { opponent: "{o:Shiftry} fainted" },
                { player: "{p:Excadrill} Drill Run {o:Rotom-W} to {=:0}" },
                { opponent: "{o:Rotom-W} fainted" },
              ],
            ],
          },
          {
            matchup: ["Okidogi"],
            turns: [
              [
                { player: "{p:Golduck} Psychic {o:Okidogi} to {=:0}" },
                { opponent: "{o:Okidogi} fainted" },
              ],
            ],
          },
        ],
        frags: { Golduck: 3, Excadrill: 1 },
      },
    ],
  },
};

const _box7 = getBox({
  box: _box6,
  update: {
    Golduck: {
      nature: "Rash",
      ability: "Neuroforce",
      item: "Mystic Water",
      moves: ["Aqua Jet", "Flip Turn", "Psychic", "Scald"],
    },
    Drednaw: {
      nature: "Adamant",
      ability: "Strong Jaw",
      item: "Sitrus Berry",
      moves: ["Bulldoze", "Crunch", "Ice Fang", "Jaw Lock"],
    },
    Cloyster: {
      nature: "Adamant",
      ability: "Shell Armor",
      item: "Charti Berry",
      moves: ["Ice Shard", "Icicle Spear", "Leer", "Razor Shell"],
    },
    Lanturn: {
      nature: "Modest",
      ability: "Volt Absorb",
      item: "Shuca Berry",
      moves: ["Flip Turn", "Icy Wind", "Scald", "Volt Switch"],
    },
    "Arcanine-H": {
      nature: "Brave",
      ability: "Rock Head",
      item: "Charcoal",
      moves: ["Accelerock", "Flamethrower", "Flare Blitz", "Return"],
    },
    Gyarados: {
      nature: "Jolly",
      ability: "Intimidate",
      item: "Sitrus Berry",
      moves: ["Aqua Fang", "Bulldoze", "Flamethrower", "Ice Fang"],
    },
  },
  team: ["Golduck", "Drednaw", "Cloyster", "Lanturn", "Arcanine-H", "Gyarados"],
});

export const rocketHideoutGiovanniBattle: Moment = {
  split: "Sabrina",
  label: "Rocket Hideout Giovanni Battle",
  kind: "battle",
  data: {
    playerBox: _box7,
    opponentBox: rocketHideoutGiovanniBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Infernape"],
            turns: [
              [
                { opponent: "{o:Infernape} Stealth Rock" },
                { player: "{p:Golduck} Psychic {o:Infernape} to {=:1}" },
              ],
              [
                { player: "{p:Golduck} Aqua Jet {o:Infernape} to {=:0}" },
                { opponent: "{o:Infernape} fainted" },
              ],
            ],
          },
          {
            matchup: ["Kangaskhan-Mega"],
            turns: [
              [
                { opponent: "{o:Kangaskhan-Mega} mega evolve" },
                { opponent: "{o:Kangaskhan-Mega} Power-Up Punch {p:Golduck} to {+:119}" },
                { player: "{p:Golduck} Flip Turn {o:Kangaskhan-Mega} to {-:137}" },
                { player: "{p:Golduck} switch to {p:Drednaw}" },
                { opponent: "{p:Drednaw} Stealth Rock to {=:137}" },
              ],
              [
                { opponent: "{o:Kangaskhan-Mega} Power-Up Punch {p:Drednaw} to {+:6}" },
                { player: "{p:Drednaw} Bulldoze {o:Kangaskhan-Mega} to {-:111}" },
              ],
              [
                { player: "{p:Drednaw} Jaw Lock {o:Kangaskhan-Mega} to {=:0}" },
                { opponent: "{o:Kangaskhan-Mega} fainted" },
              ],
            ],
          },
          {
            matchup: ["Gyarados"],
            turns: [
              [
                { player: "{p:Drednaw} switch to {p:Cloyster}" },
                { opponent: "{p:Cloyster} Stealth Rock to {=:89}" },
                { opponent: "{o:Gyarados} Earthquake {p:Cloyster} to {+:59}" },
              ],
              [
                { player: "{p:Cloyster} switch to {p:Lanturn}" },
                { opponent: "{p:Lanturn} Stealth Rock to {=:166}" },
                { opponent: "{o:Gyarados} Dragon Dance" },
              ],
              [
                { opponent: "{o:Gyarados} Dragon Dance" },
                { player: "{p:Lanturn} Volt Switch {o:Gyarados} to {-:28}" },
                { player: "{p:Lanturn} switch to {p:Arcanine-H}" },
                { opponent: "{p:Arcanine-H} Stealth Rock to {=:120}" },
              ],
              [
                { player: "{p:Arcanine-H} Accelerock {o:Gyarados} to {=:0}" },
                { opponent: "{o:Gyarados} fainted" },
              ],
            ],
          },
          {
            matchup: ["Nidoking"],
            turns: [
              [
                { player: "{p:Arcanine-H} switch to {p:Gyarados}" },
                { opponent: "{p:Gyarados} Stealth Rock to {=:120}" },
                { opponent: "{o:Nidoking} Earth Power {p:Gyarados}" },
              ],
              [
                { player: "{p:Gyarados} switch to {p:Lanturn}" },
                { opponent: "{p:Lanturn} Stealth Rock to {=:143}" },
                { opponent: "{o:Nidoking} Thunderbolt {p:Lanturn} to {=:189}" },
              ],
              [
                { opponent: "{o:Nidoking} Sludge Wave {p:Lanturn} to {+:29}" },
                { player: "{p:Lanturn} Flip Turn {o:Nidoking} to {-:99}" },
                { player: "{p:Lanturn} switch to {p:Golduck}" },
                { opponent: "{p:Golduck} Stealth Rock to {+:101}" },
              ],
              [
                { player: "{p:Golduck} Flip Turn {o:Nidoking} to {=:0}" },
                { opponent: "{o:Nidoking} fainted" },
                { player: "{p:Golduck} switch to {p:Arcanine-H}" },
                { opponent: "{p:Arcanine-H} Stealth Rock to {=:80}" },
              ],
            ],
          },
          {
            matchup: ["Torterra"],
            turns: [
              [
                { player: "{p:Arcanine-H} Flare Blitz {o:Torterra} to {=:0}" },
                { opponent: "{o:Torterra} fainted" },
              ],
            ],
          },
          {
            matchup: ["Orthworm"],
            turns: [
              [
                { player: "{p:Arcanine-H} Flamethrower {o:Orthworm} to {=:0}" },
                { opponent: "{o:Orthworm} fainted" },
              ],
            ],
          },
        ],
        frags: { Golduck: 2, Drednaw: 1, "Arcanine-H": 3 },
      },
    ],
  },
};

const _sprigatito = {
  name: "Sprigatito",
  level: "1",
  ability: "Overgrow",
  moves: ["Scratch", "Tail Whip"],
};

const _box8 = getBox({ box: _box7, add: [_sprigatito] });

export const starterEgg1Encounter: Moment = {
  split: "Sabrina",
  label: "Starter Egg 1 Encounter",
  kind: "encounter",
  data: { pokemon: _sprigatito, playerBox: _box8 },
};

const _box9 = getBox({
  box: _box8,
  cap: { level: 56, exclude: ["Golisopod", "Jellicent"] },
  update: [
    {
      Sprigatito: {
        name: "Floragato",
      },
    },
    {
      Floragato: {
        name: "Meowscarada",
        moves: ["Night Slash", "Scratch", "Tail Whip"],
      },
    },
  ],
});

export const starterEgg1BoxChange: Moment = {
  split: "Sabrina",
  label: "Starter Egg 1 Box Change",
  kind: "boxChange",
  data: { playerBox: _box9 },
};

const _box10 = getBox({
  box: _box9,
  update: {
    Perrserker: {
      nature: "Adamant",
      ability: "Tough Claws",
      item: "Silk Scarf",
      moves: ["Fake Out", "Aerial Ace", "Thunderbolt", "U-Turn"],
    },
    Meowscarada: {
      nature: "Adamant",
      ability: "Protean",
      item: "Black Glasses",
      moves: ["Flower Trick", "Knock Off", "Tail Whip", "U-Turn"],
    },
    Excadrill: {
      nature: "Adamant",
      ability: "Mold Breaker",
      item: "Soft Sand",
      moves: ["Brick Break", "Iron Head", "Rapid Spin", "Rock Tomb"],
    },
    Incineroar: {
      nature: "Lonely",
      ability: "Blaze",
      item: "Black Glasses",
      moves: ["Fake Out", "Darkest Lariat", "Thunder Punch", "U-Turn"],
    },
  },
  team: ["Perrserker", "Meowscarada", "Excadrill", "Incineroar"],
});

export const pokemonTowerChannelerRuthBattle: Moment = {
  split: "Sabrina",
  label: "Pokémon Tower Channeler Ruth Battle",
  kind: "battle",
  data: {
    playerBox: _box10,
    opponentBox: pokemonTowerChannelerRuthBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Grimmsnarl", "Pincurchin"],
            turns: [
              [
                { player: "{p:Perrserker} Fake Out {o:Grimmsnarl} to {-:146}" },
                { opponent: "{o:Grimmsnarl} flinched" },
                { player: "{p:Meowscarada} Flower Trick {o:Pincurchin} to {=:0}" },
                { opponent: "{o:Pincurchin} fainted" },
              ],
            ],
          },
          {
            matchup: ["Grimmsnarl", "Polteageist"],
            turns: [
              [
                { opponent: "{o:Grimmsnarl} Reflect" },
                { player: "{p:Meowscarada} Knock Off {o:Polteageist} to {=:0}" },
                { opponent: "{o:Polteageist} fainted" },
                { player: "{p:Perrserker} U-Turn {o:Grimmsnarl} to {-:104}" },
                { player: "{p:Perrserker} switch to {p:Excadrill}" },
              ],
            ],
          },
          {
            matchup: ["Grimmsnarl", "Cresselia"],
            turns: [],
            branches: [
              {
                branches: [
                  "93% → Meowscarada U-Turn Grimmsnarl",
                  "7% → Meowscarada U-Turn Grimmsnarl (to 0)",
                ],
              },
            ],
          },
        ],
        frags: { Meowscarada: 2 },
      },
      {
        line: "93% → Meowscarada U-Turn Grimmsnarl",
        matchups: [
          {
            matchup: ["Grimmsnarl", "Cresselia"],
            turns: [
              [
                { opponent: "{o:Grimmsnarl} Light Screen" },
                { player: "{p:Meowscarada} U-Turn {o:Grimmsnarl} to {-:55}" },
                { player: "{p:Meowscarada} switch to {p:Incineroar}" },
                { opponent: "{o:Cresselia} Calm Mind" },
                { player: "{p:Excadrill} Brick Break {o:Grimmsnarl} to {=:0}" },
                { opponent: "{o:Grimmsnarl} fainted" },
              ],
            ],
          },
          {
            matchup: ["Drifblim", "Cresselia"],
            turns: [
              [
                { opponent: "{o:Drifblim} Calm Mind" },
                { opponent: "{o:Cresselia} Moonblast {p:Incineroar} to {+:99}" },
                { player: "{p:Excadrill} Iron Head {o:Cresselia} to {-:175}" },
                { player: "{p:Incineroar} Darkest Lariat {o:Drifblim} to {=:0}" },
                { opponent: "{o:Drifblim} fainted" },
              ],
            ],
          },
          {
            matchup: ["Cresselia"],
            turns: [
              [
                { opponent: "{o:Cresselia} Moonblast {p:Incineroar} to {+:9}" },
                { player: "{p:Excadrill} Iron Head {o:Cresselia} to {-:134}" },
                { player: "{p:Incineroar} Darkest Lariat {o:Cresselia} to {=:0}" },
                { opponent: "{o:Cresselia} fainted" },
              ],
            ],
          },
        ],
        frags: { Excadrill: 1, Incineroar: 2 },
      },
      {
        line: "7% → Meowscarada U-Turn Grimmsnarl (to 0)",
        matchups: [
          {
            matchup: ["Grimmsnarl", "Cresselia"],
            turns: [
              [
                { opponent: "{o:Grimmsnarl} Light Screen" },
                { player: "{p:Meowscarada} U-Turn {o:Grimmsnarl} to {=:0}" },
                { opponent: "{o:Grimmsnarl} fainted" },
                { player: "{p:Meowscarada} switch to {p:Incineroar}" },
                { opponent: "{o:Cresselia} Calm Mind" },
                { player: "{p:Excadrill} Brick Break {o:Grimmsnarl} → {o:Cresselia} to {-:204}" },
              ],
            ],
          },
          {
            matchup: ["Drifblim", "Cresselia"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Perrserker}" },
                { opponent: "{o:Drifblim} Calm Mind" },
                { opponent: "{o:Cresselia} Moonblast {p:Incineroar} to {+:99}" },
                { player: "{p:Incineroar} Darkest Lariat {o:Drifblim} to {=:0}" },
                { opponent: "{o:Drifblim} fainted" },
              ],
            ],
          },
          {
            matchup: ["Cresselia"],
            turns: [
              [
                { player: "{p:Perrserker} Fake Out {o:Cresselia} to {-:186}" },
                { opponent: "{o:Cresselia} flinched" },
                { player: "{p:Incineroar} Darkest Lariat {o:Cresselia} to {-:52}" },
              ],
              [
                { opponent: "{o:Cresselia} Moonblast {p:Incineroar} to {+:9}" },
                { player: "{p:Incineroar} Darkest Lariat {o:Cresselia} to {=:0}" },
                { opponent: "{o:Cresselia} fainted" },
              ],
            ],
          },
        ],
        frags: { Meowscarada: 1, Incineroar: 2 },
      },
    ],
  },
};

const _box11 = getBox({
  box: _box10,
  update: {
    Meowscarada: {
      nature: "Impish",
      ability: "Protean",
      item: "Black Glasses",
      moves: ["Flower Trick", "Knock Off", "Tail Whip", "U-Turn"],
    },
    Runerigus: {
      nature: "Bold",
      ability: "Shadow Shield",
      item: "Rindo Berry",
      moves: ["Disable", "Scary Face", "Shadow Ball", "Shadow Sneak"],
    },
    Golduck: {
      nature: "Rash",
      ability: "Neuroforce",
      item: "Kasib Berry",
      moves: ["Aqua Jet", "Flip Turn", "Psychic", "Scald"],
    },
  },
  team: ["Meowscarada", "Runerigus", "Golduck"],
});

export const pokemonTowerGhostBattle: Moment = {
  split: "Sabrina",
  label: "Pokémon Tower Ghost Battle",
  kind: "battle",
  data: {
    playerBox: _box11,
    opponentBox: pokemonTowerGhostBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Marowak-A"],
            turns: [],
            branches: [
              {
                branches: [
                  "94% → Meowscarada Knock Off Marowak-A",
                  "6% → Meowscarada Knock Off Marowak-A (to 0)",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "94% → Meowscarada Knock Off Marowak-A",
        matchups: [
          {
            matchup: ["Marowak-A"],
            turns: [
              [
                { player: "{p:Meowscarada} Knock Off {o:Marowak-A} to {-:96}" },
                { opponent: "{o:Marowak-A} Shadow Bone {p:Meowscarada} to {+:16}" },
              ],
              [
                { player: "{p:Meowscarada} switch to {p:Runerigus}" },
                { opponent: "{o:Marowak-A} Shadow Bone {p:Runerigus} to {+:63}" },
              ],
              [
                { player: "{p:Runerigus} switch to {p:Golduck}" },
                { opponent: "{o:Marowak-A} Shadow Bone {p:Golduck} to {+:18}" },
              ],
              [
                { player: "{p:Golduck} Scald {o:Marowak-A} to {=:0}" },
                { opponent: "{o:Marowak-A} fainted" },
              ],
            ],
          },
        ],
        frags: { Golduck: 1 },
      },
      {
        line: "6% → Meowscarada Knock Off Marowak-A (to 0)",
        matchups: [
          {
            matchup: ["Marowak-A"],
            turns: [
              [
                { player: "{p:Meowscarada} Knock Off {o:Marowak-A} (crit) to {=:0}" },
                { opponent: "{o:Marowak-A} fainted" },
              ],
            ],
          },
        ],
        frags: { Meowscarada: 1 },
      },
    ],
  },
};

const _box12 = getBox({
  box: _box11,
  update: {
    "Arcanine-H": {
      nature: "Adamant",
      ability: "Rock Head",
      item: "Hard Stone",
      moves: ["Accelerock", "Flamethrower", "Flare Blitz", "Rock Slide"],
    },
    Clodsire: {
      nature: "Impish",
      ability: "Water Absorb",
      item: "Hard Stone",
      moves: ["Bulldoze", "Rock Slide", "Rock Tomb", "Tail Whip"],
    },
    Meowscarada: {
      nature: "Adamant",
      ability: "Protean",
      item: "Metal Coat",
      moves: ["Cut", "Flower Trick", "Knock Off", "U-Turn"],
    },
    Tentacruel: {
      nature: "Calm",
      ability: "Clear Body",
      item: "Sitrus Berry",
      moves: ["Acid Spray", "Icy Wind", "Poison Jab", "Scald"],
    },
  },
  team: ["Arcanine-H", "Clodsire", "Meowscarada", "Tentacruel"],
});

export const pokemonTowerGrunt1Battle: Moment = {
  split: "Sabrina",
  label: "Pokémon Tower Grunt 1 Battle",
  kind: "battle",
  data: {
    playerBox: _box12,
    opponentBox: pokemonTowerGrunt1Box,
    lines: [
      {
        matchups: [
          {
            matchup: ["Pelipper"],
            turns: [
              [
                { player: "{p:Arcanine-H} Rock Slide {o:Pelipper} to {=:0}" },
                { opponent: "{o:Pelipper} fainted" },
              ],
            ],
          },
          {
            matchup: ["Overqwil"],
            turns: [
              [
                { player: "{p:Arcanine-H} switch to {p:Clodsire}" },
                { opponent: "{o:Overqwil} Waterfall {p:Clodsire}" },
              ],
              [
                { opponent: "{o:Overqwil} Throat Chop {p:Clodsire} to {+:33}" },
                { opponent: "{o:Overqwil} Life Orb to {=:171}" },
                { player: "{p:Clodsire} Rock Tomb {o:Overqwil} to {-:147}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Meowscarada}" },
                { opponent: "{o:Overqwil} Throat Chop {p:Meowscarada} to {+:74}" },
                { opponent: "{o:Overqwil} Life Orb to {-:129}" },
              ],
              [
                { player: "{p:Meowscarada} Cut {o:Overqwil} to {-:62}" },
                { opponent: "{o:Overqwil} Gunk Shot {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Cut {o:Overqwil} to {=:0}" },
                { opponent: "{o:Overqwil} fainted" },
              ],
            ],
          },
          {
            matchup: ["Arctovish"],
            turns: [
              [
                { player: "{p:Meowscarada} U-Turn {o:Arctovish} to {-:133}" },
                { player: "{p:Meowscarada} switch to {p:Tentacruel}" },
                { opponent: "{o:Arctovish} Fishious Rend {p:Tentacruel} to {+:95}" },
              ],
              [
                { player: "{p:Tentacruel} switch to {p:Meowscarada}" },
                { opponent: "{o:Arctovish} Psychic Fangs {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Flower Trick {o:Arctovish} to {=:0}" },
                { opponent: "{o:Arctovish} fainted" },
              ],
            ],
          },
          {
            matchup: ["Ninetales-A"],
            turns: [
              [
                { player: "{p:Meowscarada} Cut {o:Ninetales-A} to {=:0}" },
                { opponent: "{o:Ninetales-A} fainted" },
              ],
            ],
          },
          {
            matchup: ["Mr. Rime"],
            turns: [
              [
                { player: "{p:Meowscarada} Knock Off {o:Mr. Rime} to {=:0}" },
                { opponent: "{o:Mr. Rime} fainted" },
              ],
            ],
          },
        ],
        frags: { "Arcanine-H": 1, Meowscarada: 4 },
      },
    ],
  },
};

const _box13 = getBox({
  box: _box12,
  update: {
    Excadrill: {
      nature: "Adamant",
      ability: "Mold Breaker",
      item: "Hard Stone",
      moves: ["Brick Break", "Earthquake", "Iron Head", "Rock Slide"],
    },
    Golduck: {
      nature: "Naive",
      ability: "Neuroforce",
      item: "Mystic Water",
      moves: ["Brick Break", "Flip Turn", "Ice Beam", "Psychic"],
    },
    Perrserker: {
      nature: "Adamant",
      ability: "Battle Armor",
      item: "Chople Berry",
      moves: ["Fake Out", "Growl", "Metal Burst", "U-Turn"],
    },
    Meowscarada: {
      nature: "Adamant",
      ability: "Protean",
      item: "Metal Coat",
      moves: ["Brick Break", "Cut", "Play Rough", "Thunder Punch"],
    },
  },
  team: ["Excadrill", "Golduck", "Perrserker", "Meowscarada"],
});

export const pokemonTowerGrunt2Battle: Moment = {
  split: "Sabrina",
  label: "Pokémon Tower Grunt 2 Battle",
  kind: "battle",
  data: {
    playerBox: _box13,
    opponentBox: pokemonTowerGrunt2Box,
    lines: [
      {
        matchups: [
          {
            matchup: ["Klefki"],
            turns: [
              [
                { opponent: "{o:Klefki} Spikes" },
                { player: "{p:Excadrill} Earthquake {o:Klefki} to {=:1}" },
              ],
              [
                { opponent: "{o:Klefki} Spikes" },
                { player: "{p:Excadrill} Earthquake {o:Klefki} to {=:0}" },
                { opponent: "{o:Klefki} fainted" },
              ],
            ],
          },
          {
            matchup: ["Braviary"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Golduck}" },
                { player: "{p:Golduck} Spikes to {=:144}" },
                { opponent: "{o:Braviary} Close Combat {p:Golduck} to {+:48}" },
              ],
              [
                { player: "{p:Golduck} Flip Turn {o:Braviary} to {-:129}" },
                { player: "{p:Golduck} switch to {p:Perrserker}" },
                { player: "{p:Perrserker} Spikes to {=:154}" },
                { opponent: "{o:Braviary} Brave Bird {p:Perrserker} to {+:102}" },
                { opponent: "{o:Braviary} recoil to {-:115}" },
              ],
              [
                { opponent: "{o:Braviary} Close Combat {p:Perrserker} to {+:32}" },
                { player: "{p:Perrserker} U-Turn {o:Braviary} to {-:82}" },
                { player: "{p:Perrserker} switch to {p:Meowscarada}" },
                { player: "{p:Meowscarada} Spikes to {=:140}" },
              ],
              [
                { player: "{p:Meowscarada} Thunder Punch {o:Braviary} to {=:0}" },
                { opponent: "{o:Braviary} fainted" },
              ],
            ],
          },
          {
            matchup: ["Dragalge"],
            turns: [
              [
                { player: "{p:Meowscarada} Cut {o:Dragalge} to {-:84}" },
                { opponent: "{o:Dragalge} Sludge Wave {p:Meowscarada}" },
                { opponent: "{o:Dragalge} Black Sludge to {-:93}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Dragalge} to {-:21}" },
                { opponent: "{o:Dragalge} Dragon Pulse {p:Meowscarada}" },
                { opponent: "{o:Dragalge} Black Sludge to {-:30}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Dragalge} to {=:0}" },
                { opponent: "{o:Dragalge} fainted" },
              ],
            ],
          },
          {
            matchup: ["Obstagoon"],
            turns: [
              [
                { player: "{p:Meowscarada} Brick Break {o:Obstagoon} to {=:0}" },
                { opponent: "{o:Obstagoon} fainted" },
              ],
            ],
          },
          {
            matchup: ["Honchkrow"],
            turns: [
              [
                { player: "{p:Meowscarada} Play Rough {o:Honchkrow} to {=:0}" },
                { opponent: "{o:Honchkrow} fainted" },
              ],
            ],
          },
        ],
        frags: { Excadrill: 1, Meowscarada: 4 },
      },
    ],
  },
};

const _box14 = getBox({
  box: _box13,
  update: {
    Meowscarada: {
      nature: "Adamant",
      ability: "Protean",
      item: "Muscle Band",
      moves: ["Flower Trick", "Knock Off", "Low Kick", "Play Rough"],
    },
    Tentacruel: {
      nature: "Hasty",
      ability: "Clear Body",
      item: "Mystic Water",
      moves: ["Dazzling Gleam", "Flip Turn", "Icy Wind", "Sludge Wave"],
    },
    Lanturn: {
      nature: "Quiet",
      ability: "Volt Absorb",
      item: "Shuca Berry",
      moves: ["Flip Turn", "Hydro Pump", "Thunderbolt", "Volt Switch"],
    },
  },
  team: ["Meowscarada", "Tentacruel", "Lanturn"],
});

export const pokemonTowerGrunt3Battle: Moment = {
  split: "Sabrina",
  label: "Pokémon Tower Grunt 3 Battle",
  kind: "battle",
  data: {
    playerBox: _box14,
    opponentBox: pokemonTowerGrunt3Box,
    lines: [
      {
        matchups: [
          {
            matchup: ["Slurpuff"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Tentacruel}" },
                { opponent: "{o:Slurpuff} Misty Explosion {p:Tentacruel} to {+:98}" },
                { opponent: "{o:Slurpuff} fainted" },
              ],
            ],
          },
          {
            matchup: ["Magnezone"],
            turns: [
              [
                { player: "{p:Tentacruel} Flip Turn {o:Magnezone} to {-:134}" },
                { player: "{p:Tentacruel} switch to {p:Lanturn}" },
                { opponent: "{o:Magnezone} Thunderbolt {p:Lanturn}" },
              ],
            ],
            branches: [
              {
                branches: [
                  "80% → Magnezone switch to Hydreigon",
                  "20% → Magnezone HP Fire Lanturn",
                ],
              },
            ],
          },
        ],
        frags: { Tentacruel: 1 },
      },
      {
        line: "80% → Magnezone switch to Hydreigon",
        matchups: [
          {
            matchup: ["Magnezone"],
            turns: [
              [
                { opponent: "{o:Magnezone} switch to {o:Hydreigon}" },
                { player: "{p:Lanturn} Flip Turn {o:Hydreigon} to {-:173}" },
                { player: "{p:Lanturn} switch to {p:Meowscarada}" },
              ],
            ],
          },
          {
            matchup: ["Hydreigon"],
            turns: [
              [
                { player: "{p:Meowscarada} Play Rough {o:Hydreigon} to {=:0}" },
                { opponent: "{o:Hydreigon} fainted" },
              ],
            ],
          },
          {
            matchup: ["Magnezone"],
            turns: [
              [
                { player: "{p:Meowscarada} Low Kick {o:Magnezone} to {=:0}" },
                { opponent: "{o:Magnezone} fainted" },
              ],
            ],
            branches: [{ branches: ["Meowscarada Knock Off Golurk"] }],
          },
        ],
        frags: { Meowscarada: 2 },
      },
      {
        line: "20% → Magnezone HP Fire Lanturn",
        matchups: [
          {
            matchup: ["Magnezone"],
            turns: [
              [
                { opponent: "{o:Magnezone} HP Fire {p:Lanturn} to {+:189}" },
                { player: "{p:Lanturn} Flip Turn {o:Magnezone} to {-:112}" },
                { player: "{p:Lanturn} switch to {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Low Kick {o:Magnezone} to {=:0}" },
                { opponent: "{o:Magnezone} fainted" },
              ],
            ],
          },
          {
            matchup: ["Hydreigon"],
            turns: [
              [
                { player: "{p:Meowscarada} Play Rough {o:Hydreigon} to {=:0}" },
                { opponent: "{o:Hydreigon} fainted" },
              ],
            ],
            branches: [{ branches: ["Meowscarada Knock Off Golurk"] }],
          },
        ],
        frags: { Meowscarada: 2 },
      },
      {
        line: "Meowscarada Knock Off Golurk",
        matchups: [
          {
            matchup: ["Golurk"],
            turns: [
              [
                { player: "{p:Meowscarada} Knock Off {o:Golurk} to {-:25}" },
                { opponent: "{o:Golurk} Shadow Punch {p:Meowscarada} to {+:76}" },
              ],
              [
                { player: "{p:Meowscarada} Knock Off {o:Golurk} to {=:0}" },
                { opponent: "{o:Golurk} fainted" },
              ],
            ],
          },
          {
            matchup: ["Primarina"],
            turns: [
              [
                { player: "{p:Meowscarada} Flower Trick {o:Primarina} to {=:0}" },
                { opponent: "{o:Primarina} fainted" },
              ],
            ],
          },
        ],
        frags: { Meowscarada: 2 },
      },
    ],
  },
};

const _mudkip = {
  name: "Mudkip",
  level: "1",
  ability: "Torrent",
  moves: ["Growl", "Tackle"],
};

const _box15 = getBox({ box: _box14, add: [_mudkip] });

export const starterEgg2Encounter: Moment = {
  split: "Sabrina",
  label: "Starter Egg 2 Encounter",
  kind: "encounter",
  data: { pokemon: _mudkip, playerBox: _box15 },
};

const _box16 = getBox({
  box: _box15,
  update: {
    Azumarill: {
      friend: true,
    },
  },
});

export const starterEgg2BoxChange: Moment = {
  split: "Sabrina",
  label: "Starter Egg 2 Change",
  kind: "boxChange",
  data: { playerBox: _box16 },
};

const _box17 = getBox({
  box: _box16,
  update: {
    Excadrill: {
      nature: "Jolly",
      ability: "Mold Breaker",
      item: "Chople Berry",
      moves: ["Aerial Ace", "Bulldoze", "Iron Head", "Shadow Claw"],
    },
    Ceruledge: {
      nature: "Timid",
      ability: "Sharpness",
      item: "Leftovers",
      moves: ["Bitter Blade", "Shadow Claw", "Shadow Sneak", "Will-O-Wisp"],
    },
    Azumarill: {
      nature: "Brave",
      ability: "Huge Power",
      item: "Sitrus Berry",
      moves: ["Aqua Tail", "Knock Off", "Play Rough", "Return"],
    },
    Perrserker: {
      nature: "Brave",
      ability: "Battle Armor",
      item: "Chople Berry",
      moves: ["Fake Out", "Dig", "Shadow Claw", "U-Turn"],
    },
    Meowscarada: {
      nature: "Jolly",
      ability: "Protean",
      item: "Pixie Plate",
      moves: ["Flower Trick", "Knock Off", "Play Rough", "Shadow Claw"],
    },
    Drednaw: {
      nature: "Impish",
      ability: "Shell Armor",
      item: "Chople Berry",
      moves: ["Bulldoze", "Dig", "Flip Turn", "Liquidation"],
    },
  },
  team: ["Excadrill", "Ceruledge", "Azumarill", "Perrserker", "Meowscarada", "Drednaw"],
});

export const saffronDojoLeaderChuckBattle: Moment = {
  split: "Sabrina",
  label: "Saffron Dojo Leader Chuck Battle",
  kind: "battle",
  data: {
    playerBox: _box17,
    opponentBox: saffronDojoLeaderChuckBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Iron Crown"],
            turns: [
              [
                { opponent: "{o:Iron Crown} Secret Sword {p:Excadrill} to {+:41}" },
                { player: "{p:Excadrill} Bulldoze {o:Iron Crown} to {-:86}" },
              ],
            ],
            branches: [
              {
                branches: [
                  "80% → Iron Crown switch to Zamazenta-C",
                  "20% → Excadrill Bulldoze Iron Crown",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "80% → Iron Crown switch to Zamazenta-C",
        matchups: [
          {
            matchup: ["Iron Crown"],
            turns: [
              [
                { opponent: "{o:Iron Crown} switch to {o:Zamazenta-C}" },
                { player: "{p:Excadrill} Bulldoze {o:Zamazenta-C} to {-:136}" },
              ],
            ],
          },
          {
            matchup: ["Zamazenta-C"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Ceruledge}" },
                { opponent: "{o:Zamazenta-C} Behemoth Bash {p:Ceruledge} to {+:90}" },
                { opponent: "{p:Ceruledge} Leftovers to {+:100}" },
              ],
              [
                { player: "{p:Ceruledge} Bitter Blade {o:Zamazenta-C} to {-:94}" },
                { opponent: "{p:Ceruledge} recover to {+:146}" },
                { opponent: "{o:Zamazenta-C} Wild Charge {p:Ceruledge} to {+:53}" },
                { opponent: "{o:Zamazenta-C} recoil to {-:86}" },
                { opponent: "{p:Ceruledge} Leftovers to {+:63}" },
              ],
              [
                { player: "{p:Ceruledge} Bitter Blade {o:Zamazenta-C} to {=:0}" },
                { opponent: "{p:Ceruledge} recover to {+:85}" },
                { opponent: "{o:Zamazenta-C} fainted" },
              ],
            ],
            branches: [{ branches: ["Ceruledge switch to Azumarill"] }],
          },
        ],
        frags: { Ceruledge: 1 },
      },
      {
        line: "20% → Excadrill Bulldoze Iron Crown",
        matchups: [
          {
            matchup: ["Iron Crown"],
            turns: [
              [
                { player: "{p:Excadrill} Bulldoze {o:Iron Crown} to {=:0}" },
                { opponent: "{o:Iron Crown} fainted" },
              ],
            ],
          },
          {
            matchup: ["Zamazenta-C"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Ceruledge}" },
                { opponent: "{o:Zamazenta-C} Behemoth Bash {p:Ceruledge} to {+:90}" },
                { opponent: "{p:Ceruledge} Leftovers to {+:100}" },
              ],
              [
                { opponent: "{o:Zamazenta-C} Bulk Up" },
                { player: "{p:Ceruledge} Bitter Blade {o:Zamazenta-C} to {-:118}" },
                { opponent: "{p:Ceruledge} recover to {+:144}" },
              ],
              [
                { opponent: "{o:Zamazenta-C} Bulk Up" },
                { player: "{p:Ceruledge} Will-O-Wisp {o:Zamazenta-C}" },
                { opponent: "{o:Zamazenta-C} burn to {-:107}" },
                { opponent: "{p:Ceruledge} Leftovers to {+:154}" },
              ],
              [
                { opponent: "{o:Zamazenta-C} Bulk Up" },
                { player: "{p:Ceruledge} Bitter Blade {o:Zamazenta-C} to {-:59}" },
                { opponent: "{p:Ceruledge} recover to {=:167}" },
                { opponent: "{o:Zamazenta-C} burn to {-:48}" },
              ],
              [
                { opponent: "{o:Zamazenta-C} Wild Charge {p:Ceruledge} to {+:53}" },
                { opponent: "{o:Zamazenta-C} recoil to {-:27}" },
                { player: "{p:Ceruledge} Bitter Blade {o:Zamazenta-C} to {=:0}" },
                { opponent: "{p:Ceruledge} recover to {+:63}" },
                { opponent: "{o:Zamazenta-C} fainted" },
              ],
            ],
            branches: [{ branches: ["Ceruledge switch to Azumarill"] }],
          },
        ],
        frags: { Excadrill: 1, Ceruledge: 1 },
      },
      {
        line: "Ceruledge switch to Azumarill",
        matchups: [
          {
            matchup: ["Kommo-o"],
            turns: [
              [
                { player: "{p:Ceruledge} switch to {p:Azumarill}" },
                { opponent: "{o:Kommo-o} Clangorous Soulblaze {p:Azumarill}" },
              ],
              [
                { opponent: "{o:Kommo-o} Poison Jab {p:Azumarill} to {+:75}" },
                { player: "{p:Azumarill} Return {o:Kommo-o} to {-:122}" },
              ],
              [
                { player: "{p:Azumarill} switch to {p:Perrserker}" },
                { opponent: "{o:Kommo-o} Poison Jab {p:Perrserker}" },
              ],
              [
                { opponent: "{o:Kommo-o} Flamethrower {p:Perrserker} to {+:50}" },
                { player: "{p:Perrserker} U-Turn {o:Kommo-o} to {-:115}" },
                { player: "{p:Perrserker} switch to {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Kommo-o} to {=:0}" },
                { opponent: "{o:Kommo-o} fainted" },
              ],
            ],
            branches: [
              {
                branches: ["50% → Annihilape matchup", "50% → Sneasler matchup"],
              },
            ],
          },
        ],
        frags: { Meowscarada: 1 },
      },
      {
        line: "50% → Annihilape matchup",
        matchups: [
          {
            matchup: ["Annihilape"],
            turns: [
              [
                { player: "{p:Meowscarada} Knock Off {o:Annihilape} to {-:128}" },
                { opponent: "{o:Annihilape} Rage Fist {p:Meowscarada} to {+:126}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Annihilape} to {=:0}" },
                { opponent: "{o:Annihilape} fainted" },
              ],
            ],
          },
          {
            matchup: ["Sneasler"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Drednaw}" },
                { opponent: "{o:Sneasler} Poison Jab {p:Drednaw} to {+:148}" },
                { opponent: "{p:Drednaw} poison to {+:137}" },
              ],
              [
                { opponent: "{o:Sneasler} Knock Off {p:Drednaw} to {+:78}" },
                { player: "{p:Drednaw} Flip Turn {o:Sneasler} to {-:109}" },
                { player: "{p:Drednaw} switch to {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Sneasler} to {=:0}" },
                { opponent: "{o:Sneasler} fainted" },
              ],
            ],
            branches: [
              {
                if: ["80% → Iron Crown switch to Zamazenta-C"],
                branches: ["Meowscarada Knock Off Iron Crown"],
              },
              {
                branches: ["Meowscarada Knock Off Gallade-Mega"],
              },
            ],
          },
        ],
        frags: { Meowscarada: 2 },
      },
      {
        line: "50% → Sneasler matchup",
        matchups: [
          {
            matchup: ["Sneasler"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Drednaw}" },
                { opponent: "{o:Sneasler} Poison Jab {p:Drednaw} to {+:148}" },
                { opponent: "{p:Drednaw} poison to {+:137}" },
              ],
              [
                { opponent: "{o:Sneasler} Knock Off {p:Drednaw} to {+:78}" },
                { player: "{p:Drednaw} Flip Turn {o:Sneasler} to {-:109}" },
                { player: "{p:Drednaw} switch to {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Sneasler} to {=:0}" },
                { opponent: "{o:Sneasler} fainted" },
              ],
            ],
          },
          {
            matchup: ["Annihilape"],
            turns: [
              [
                { player: "{p:Meowscarada} Knock Off {o:Annihilape} to {-:128}" },
                { opponent: "{o:Annihilape} Rage Fist {p:Meowscarada} to {+:126}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Annihilape} to {=:0}" },
                { opponent: "{o:Annihilape} fainted" },
              ],
            ],
            branches: [
              {
                if: ["80% → Iron Crown switch to Zamazenta-C"],
                branches: ["Meowscarada Knock Off Iron Crown"],
              },
              {
                branches: ["Meowscarada Knock Off Gallade-Mega"],
              },
            ],
          },
        ],
        frags: { Meowscarada: 2 },
      },
      {
        line: "Meowscarada Knock Off Iron Crown",
        matchups: [
          {
            matchup: ["Iron Crown"],
            turns: [
              [
                { player: "{p:Meowscarada} Knock Off {o:Iron Crown} to {=:0}" },
                { opponent: "{p:Meowscarada} Rocky Helmet to {+:98}" },
                { opponent: "{o:Iron Crown} fainted" },
              ],
            ],
          },
          {
            matchup: ["Gallade-Mega"],
            turns: [
              [
                { opponent: "{o:Gallade-Mega} mega evolve" },
                { player: "{p:Meowscarada} Shadow Claw {o:Gallade-Mega} to {-:45}" },
                { opponent: "{o:Gallade-Mega} Drain Punch {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Gallade-Mega} to {=:0}" },
                { opponent: "{o:Gallade-Mega} fainted" },
              ],
            ],
          },
        ],
        frags: { Meowscarada: 2 },
      },
      {
        line: "Meowscarada Knock Off Gallade-Mega",
        matchups: [
          {
            matchup: ["Gallade-Mega"],
            turns: [
              [
                { opponent: "{o:Gallade-Mega} mega evolve" },
                { player: "{p:Meowscarada} Knock Off {o:Gallade-Mega} to {-:113}" },
                { opponent: "{o:Gallade-Mega} Psycho Cut {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Gallade-Mega} to {=:0}" },
                { opponent: "{o:Gallade-Mega} fainted" },
              ],
            ],
          },
        ],
        frags: { Meowscarada: 1 },
      },
    ],
  },
};

const _box18 = getBox({
  box: _box17,
  update: {
    Cloyster: {
      friend: true,
    },
  },
});

export const saffronDojoLeaderChuckBoxChange: Moment = {
  split: "Sabrina",
  label: "Saffron Dojo Leader Chuck Box Change",
  kind: "boxChange",
  data: { playerBox: _box18 },
};

const _box19 = getBox({
  box: _box18,
  update: {
    Meowscarada: {
      nature: "Brave",
      ability: "Protean",
      item: "Expert Belt",
      moves: ["Flower Trick", "Knock Off", "Play Rough", "Shadow Claw"],
    },
    Jellicent: {
      nature: "Bold",
      ability: "Water Bubble",
      item: "Rindo Berry",
      moves: ["Brine", "Hex", "Ice Beam", "Water Spout"],
    },
    Cloyster: {
      nature: "Impish",
      ability: "Skill Link",
      item: "Never-Melt Ice",
      moves: ["Ice Shard", "Icicle Crash", "Icicle Spear", "Return"],
    },
    Drednaw: {
      nature: "Impish",
      ability: "Shell Armor",
      item: "Shuca Berry",
      moves: ["Bulldoze", "Dig", "Flip Turn", "Jaw Lock"],
    },
    "Arcanine-H": {
      nature: "Adamant",
      ability: "Rock Head",
      item: "Hard Stone",
      moves: ["Accelerock", "Flamethrower", "Flare Blitz", "Rock Slide"],
    },
    Runerigus: {
      nature: "Adamant",
      ability: "Shadow Shield",
      item: "Rindo Berry",
      moves: ["Earthquake", "Rock Tomb", "Shadow Ball", "Shadow Sneak"],
    },
  },
  team: ["Meowscarada", "Jellicent", "Cloyster", "Drednaw", "Arcanine-H", "Runerigus"],
});

export const silphCoRivalBattle: Moment = {
  split: "Sabrina",
  label: "Silph Co. Rival Battle",
  kind: "battle",
  data: {
    playerBox: _box19,
    opponentBox: silphCoRivalBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Azelf"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Jellicent}" },
                { opponent: "{o:Azelf} Explosion {p:Jellicent}" },
                { opponent: "{o:Azelf} fainted" },
              ],
            ],
          },
          {
            matchup: ["Blastoise-Mega"],
            turns: [
              [
                { player: "{p:Jellicent} switch to {p:Meowscarada}" },
                { opponent: "{o:Blastoise-Mega} mega evolve" },
                { opponent: "{o:Blastoise-Mega} Dark Pulse {p:Meowscarada} to {+:85}" },
              ],
              [
                { player: "{p:Meowscarada} Shadow Claw {o:Blastoise-Mega} to {-:120}" },
                { opponent: "{o:Blastoise-Mega} Aura Sphere {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Flower Trick {o:Blastoise-Mega} to {=:0}" },
                { opponent: "{o:Blastoise-Mega} fainted" },
              ],
            ],
          },
          {
            matchup: ["Jumpluff"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Cloyster}" },
                { opponent: "{o:Jumpluff} Double-Edge {p:Cloyster} to {+:48}" },
                { opponent: "{o:Jumpluff} recoil to {-:150}" },
              ],
              [
                { player: "{p:Cloyster} Ice Shard {o:Jumpluff} to {=:0}" },
                { opponent: "{o:Jumpluff} fainted" },
              ],
            ],
          },
          {
            matchup: ["Darmanitan"],
            turns: [
              [
                { player: "{p:Cloyster} switch to {p:Drednaw}" },
                { opponent: "{o:Darmanitan} Rock Slide {p:Drednaw} to {+:101}" },
              ],
              [
                { opponent: "{o:Darmanitan} Earthquake {p:Drednaw} to {+:17}" },
                { player: "{p:Drednaw} Flip Turn {o:Darmanitan} to {-:66}" },
                { player: "{p:Drednaw} switch to {p:Arcanine-H}" },
              ],
              [
                { player: "{p:Arcanine-H} Accelerock {o:Darmanitan} to {=:0}" },
                { opponent: "{o:Darmanitan} fainted" },
              ],
            ],
          },
          {
            matchup: ["Electivire"],
            turns: [
              [
                { player: "{p:Arcanine-H} switch to {p:Runerigus}" },
                { opponent: "{o:Electivire} Close Combat {p:Runerigus}" },
              ],
              [
                { opponent: "{o:Electivire} Ice Punch {p:Runerigus} to {+:76}" },
                { player: "{p:Runerigus} Rock Tomb {o:Electivire} to {-:131}" },
              ],
              [
                { player: "{p:Runerigus} switch to {p:Arcanine-H}" },
                { opponent: "{o:Electivire} Ice Punch {p:Arcanine-H} to {+:127}" },
              ],
              [
                { player: "{p:Arcanine-H} Flare Blitz {o:Electivire} to {=:0}" },
                { opponent: "{o:Electivire} fainted" },
              ],
            ],
          },
          {
            matchup: ["Celesteela"],
            turns: [
              [
                { player: "{p:Arcanine-H} Flare Blitz {o:Celesteela} to {=:0}" },
                { opponent: "{o:Celesteela} fainted" },
              ],
            ],
          },
        ],
        frags: { Jellicent: 1, Meowscarada: 1, Cloyster: 1, "Arcanine-H": 3 },
      },
    ],
  },
};

const _box20 = getBox({
  box: _box19,
  update: {
    Jellicent: {
      level: 56,
    },
  },
});

export const silphCoRivalBoxChange: Moment = {
  split: "Sabrina",
  label: "Silph Co. Rival Box Change",
  kind: "boxChange",
  data: { playerBox: _box20 },
};

const _box21 = getBox({
  box: _box20,
  update: {
    Jellicent: {
      nature: "Modest",
      ability: "Water Bubble",
      item: "Mystic Water",
      moves: ["Brine", "Recover", "Scald", "Water Spout"],
    },
    Meowscarada: {
      nature: "Jolly",
      ability: "Protean",
      item: "Expert Belt",
      moves: ["Brick Break", "Quick Attack", "Shadow Claw", "U-Turn"],
    },
    Tentacruel: {
      nature: "Sassy",
      ability: "Clear Body",
      item: "Black Sludge",
      moves: ["Dazzling Gleam", "Flip Turn", "Icy Wind", "Sludge Wave"],
    },
  },
  team: ["Jellicent", "Meowscarada", "Tentacruel"],
});

export const silphCoArianaArcherBattle: Moment = {
  split: "Sabrina",
  label: "Silph Co. Ariana & Archer Battle",
  kind: "battle",
  data: {
    playerBox: _box21,
    opponentBox: silphCoArianaArcherBox,
    partnerBox: pokemonTrainerBrendanBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Incineroar", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Incineroar} Fake Out {o:Masquerain} to {+:121}" },
                { opponent: "{o:Articuno-G} Psychic {o:Masquerain} to {=:0}" },
                { opponent: "{o:Masquerain} fainted" },
                { player: "{p:Jellicent} Scald {o:Incineroar} to {=:0}" },
                { opponent: "{o:Incineroar} fainted" },
              ],
            ],
            branches: [{ branches: ["Primarina and Articuno-G matchup"] }],
          },
        ],
        frags: { Jellicent: 1 },
      },
      {
        line: "Primarina and Articuno-G matchup",
        matchups: [
          {
            matchup: ["Primarina", "Articuno-G"],
            turns: [],
            branches: [
              {
                branches: [
                  "94% → Sceptile-Mega Mega Drain Primarina",
                  "6% → Sceptile-Mega Mega Drain Primarina (to 0)",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "94% → Sceptile-Mega Mega Drain Primarina",
        matchups: [
          {
            matchup: ["Primarina", "Articuno-G"],
            turns: [],
            branches: [
              {
                branches: [
                  "19% → Articuno-G Psychic Sceptile-Mega",
                  "81% → Articuno-G Psychic Sceptile-Mega (to 0)",
                ],
                default: "81% → Articuno-G Psychic Sceptile-Mega (to 0)",
              },
            ],
          },
        ],
      },
      {
        line: "6% → Sceptile-Mega Mega Drain Primarina (to 0)",
        matchups: [
          {
            matchup: ["Primarina", "Articuno-G"],
            turns: [],
            branches: [
              {
                branches: [
                  "19% → Articuno-G Psychic Sceptile-Mega",
                  "81% → Articuno-G Psychic Sceptile-Mega (to 0)",
                ],
                default: "81% → Articuno-G Psychic Sceptile-Mega (to 0)",
              },
            ],
          },
        ],
      },
      {
        line: "81% → Articuno-G Psychic Sceptile-Mega (to 0)",
        if: ["94% → Sceptile-Mega Mega Drain Primarina"],
        matchups: [
          {
            matchup: ["Primarina", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Sceptile-Mega} mega evolve" },
                { opponent: "{o:Sceptile-Mega} Mega Drain {o:Primarina} to {-:52}" },
                { opponent: "{o:Articuno-G} Psychic {o:Sceptile-Mega} to {=:0}" },
                { opponent: "{o:Sceptile-Mega} fainted" },
                { player: "{p:Jellicent} Brine {o:Primarina} to {=:0}" },
                { opponent: "{o:Primarina} fainted" },
              ],
            ],
          },
          {
            matchup: ["Mawile-Mega", "Articuno-G"],
            turns: [],
            branches: [
              {
                branches: [
                  "70% → Articuno-G Focus Blast Exploud",
                  "30% → Articuno-G Focus Blast Exploud (miss)",
                ],
              },
            ],
          },
        ],
        frags: { Jellicent: 1 },
      },
      {
        line: "70% → Articuno-G Focus Blast Exploud",
        if: ["94% → Sceptile-Mega Mega Drain Primarina"],
        matchups: [
          {
            matchup: ["Mawile-Mega", "Articuno-G"],
            turns: [],
            branches: [
              {
                branches: [
                  "94% → Jellicent Water Spout Articuno-G",
                  "6% → Jellicent Water Spout Articuno-G (to 0)",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "94% → Jellicent Water Spout Articuno-G",
        matchups: [
          {
            matchup: ["Mawile-Mega", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Mawile-Mega} mega evolve" },
                { opponent: "{o:Articuno-G} Focus Blast {o:Exploud} to {=:0}" },
                { opponent: "{o:Exploud} fainted" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Mawile-Mega} to {=:0} and {o:Articuno-G} to {=:9}",
                },
                { opponent: "{o:Mawile-Mega} fainted" },
              ],
            ],
          },
          {
            matchup: ["Articuno-G"],
            turns: [
              [
                { player: "{p:Jellicent} switch to {p:Meowscarada}" },
                { opponent: "{o:Articuno-G} Roost to {=:99}" },
              ],
              [
                { player: "{p:Meowscarada} Shadow Claw {o:Articuno-G} to {=:0}" },
                { opponent: "{o:Articuno-G} fainted" },
              ],
            ],
            branches: [
              {
                branches: ["50% → Gholdengo matchup", "50% → Houndoom-Mega matchup"],
              },
            ],
          },
        ],
        frags: { Jellicent: 1, Meowscarada: 1 },
      },
      {
        line: "50% → Gholdengo matchup",
        matchups: [
          {
            matchup: ["Gholdengo"],
            turns: [
              [
                { player: "{p:Meowscarada} Quick Attack {o:Gholdengo}" },
                { opponent: "{o:Gholdengo} Shadow Ball {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Shadow Claw {o:Gholdengo} to {-:38}" },
                { opponent: "{o:Gholdengo} Focus Blast {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Shadow Claw {o:Gholdengo} to {=:0}" },
                { opponent: "{o:Gholdengo} fainted" },
              ],
            ],
          },
          {
            matchup: ["Houndoom-Mega"],
            turns: [
              [
                { opponent: "{o:Houndoom-Mega} mega evolve" },
                { player: "{p:Meowscarada} Brick Break {o:Houndoom-Mega} to {-:35}" },
                { opponent: "{o:Houndoom-Mega} Fiery Wrath {p:Meowscarada} to {+:51}" },
              ],
              [
                { player: "{p:Meowscarada} Brick Break {o:Houndoom-Mega} to {=:0}" },
                { opponent: "{o:Houndoom-Mega} fainted" },
              ],
            ],
          },
        ],
        frags: { Meowscarada: 2 },
      },
      {
        line: "50% → Houndoom-Mega matchup",
        matchups: [
          {
            matchup: ["Houndoom-Mega"],
            turns: [
              [
                { opponent: "{o:Houndoom-Mega} mega evolve" },
                { player: "{p:Meowscarada} Brick Break {o:Houndoom-Mega} to {-:35}" },
                { opponent: "{o:Houndoom-Mega} Fiery Wrath {p:Meowscarada} to {+:51}" },
              ],
              [
                { player: "{p:Meowscarada} Brick Break {o:Houndoom-Mega} to {=:0}" },
                { opponent: "{o:Houndoom-Mega} fainted" },
              ],
            ],
          },
          {
            matchup: ["Gholdengo"],
            turns: [
              [
                { player: "{p:Meowscarada} U-Turn {o:Gholdengo} to {-:165}" },
                { opponent: "{o:Gholdengo} Shadow Ball {p:Tentacruel} to {+:85}" },
                { opponent: "{p:Tentacruel} Black Sludge to {+:95}" },
              ],
              [
                { opponent: "{o:Gholdengo} Shadow Ball {p:Tentacruel} to {+:8}" },
                { player: "{p:Tentacruel} Flip Turn {o:Gholdengo} to {-:138}" },
                { player: "{p:Tentacruel} switch to {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Shadow Claw {o:Gholdengo} to {=:0}" },
                { opponent: "{o:Gholdengo} fainted" },
              ],
            ],
          },
        ],
        frags: { Meowscarada: 2 },
      },
      {
        line: "6% → Jellicent Water Spout Articuno-G (to 0)",
        matchups: [
          {
            matchup: ["Mawile-Mega", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Mawile-Mega} mega evolve" },
                { opponent: "{o:Articuno-G} Focus Blast {o:Exploud} to {=:0}" },
                { opponent: "{o:Exploud} fainted" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Mawile-Mega} to {=:0} and {o:Articuno-G} (crit) to {=:0}",
                },
                { opponent: "{o:Articuno-G} fainted" },
                { opponent: "{o:Mawile-Mega} fainted" },
              ],
            ],
            branches: [{ branches: ["Jellicent switch to Tentacruel"] }],
          },
        ],
        frags: { Jellicent: 2 },
      },
      {
        line: "30% → Articuno-G Focus Blast Exploud (miss)",
        if: ["94% → Sceptile-Mega Mega Drain Primarina"],
        matchups: [
          {
            matchup: ["Mawile-Mega", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Mawile-Mega} mega evolve" },
                { opponent: "{o:Articuno-G} Focus Blast {o:Exploud} miss" },
                {
                  opponent:
                    "{o:Exploud} Hyper Voice {o:Mawile-Mega} to {-:103} and {o:Articuno-G} to {-:109}",
                },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Mawile-Mega} to {=:0} and {o:Articuno-G} to {=:0}",
                },
                { opponent: "{o:Articuno-G} fainted" },
                { opponent: "{o:Mawile-Mega} fainted" },
              ],
            ],
            branches: [{ branches: ["Jellicent switch to Tentacruel 2"] }],
          },
        ],
        frags: { Jellicent: 2 },
      },
      {
        line: "19% → Articuno-G Psychic Sceptile-Mega",
        if: ["94% → Sceptile-Mega Mega Drain Primarina"],
        matchups: [
          {
            matchup: ["Primarina", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Sceptile-Mega} mega evolve" },
                { opponent: "{o:Sceptile-Mega} Mega Drain {o:Primarina} to {-:52}" },
                { opponent: "{o:Articuno-G} Psychic {o:Sceptile-Mega} to {+:1}" },
                { player: "{p:Jellicent} Brine {o:Primarina} to {=:0}" },
                { opponent: "{o:Primarina} fainted" },
              ],
            ],
            branches: [
              {
                branches: [
                  "70% → Sceptile-Mega Dragon Breath Articuno-G",
                  "30% → Sceptile-Mega Dragon Breath Articuno-G (paralyze)",
                ],
              },
            ],
          },
        ],
        frags: { Jellicent: 1 },
      },
      {
        line: "70% → Sceptile-Mega Dragon Breath Articuno-G",
        if: ["94% → Sceptile-Mega Mega Drain Primarina"],
        matchups: [
          {
            matchup: ["Mawile-Mega", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Mawile-Mega} mega evolve" },
                { opponent: "{o:Sceptile-Mega} Dragon Breath {o:Articuno-G} to {-:121}" },
                { opponent: "{o:Articuno-G} Psychic {o:Sceptile-Mega} to {=:0}" },
                { opponent: "{o:Sceptile-Mega} fainted" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Mawile-Mega} to {=:0} and {o:Articuno-G} to {=:0}",
                },
                { opponent: "{o:Articuno-G} fainted" },
                { opponent: "{o:Mawile-Mega} fainted" },
              ],
            ],
            branches: [{ branches: ["Jellicent switch to Tentacruel 2"] }],
          },
        ],
        frags: { Jellicent: 2 },
      },
      {
        line: "30% → Sceptile-Mega Dragon Breath Articuno-G (paralyze)",
        if: ["94% → Sceptile-Mega Mega Drain Primarina"],
        matchups: [
          {
            matchup: ["Mawile-Mega", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Mawile-Mega} mega evolve" },
                { opponent: "{o:Sceptile-Mega} Dragon Breath {o:Articuno-G} to {-:121}" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Mawile-Mega} to {=:0} and {o:Articuno-G} to {=:0}",
                },
                { opponent: "{o:Articuno-G} fainted" },
                { opponent: "{o:Mawile-Mega} fainted" },
              ],
            ],
            branches: [{ branches: ["Jellicent switch to Tentacruel 3"] }],
          },
        ],
        frags: { Jellicent: 2 },
      },
      {
        line: "81% → Articuno-G Psychic Sceptile-Mega (to 0)",
        if: ["6% → Sceptile-Mega Mega Drain Primarina (to 0)"],
        matchups: [
          {
            matchup: ["Primarina", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Sceptile-Mega} mega evolve" },
                { opponent: "{o:Sceptile-Mega} Mega Drain {o:Primarina} (crit) to {=:0}" },
                { opponent: "{o:Primarina} fainted" },
                { opponent: "{o:Articuno-G} Psychic {o:Sceptile-Mega} to {=:0}" },
                { opponent: "{o:Sceptile-Mega} fainted" },
                { player: "{p:Jellicent} Brine {o:Articuno-G} to {-:97}" },
              ],
            ],
            branches: [
              {
                branches: [
                  "70% → Articuno-G Focus Blast Exploud",
                  "30% → Articuno-G Focus Blast Exploud (miss)",
                ],
              },
            ],
          },
        ],
        frags: { Jellicent: 1 },
      },
      {
        line: "70% → Articuno-G Focus Blast Exploud",
        if: ["6% → Sceptile-Mega Mega Drain Primarina (to 0)"],
        matchups: [
          {
            matchup: ["Mawile-Mega", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Mawile-Mega} mega evolve" },
                { opponent: "{o:Articuno-G} Focus Blast {o:Exploud} to {=:0}" },
                { opponent: "{o:Exploud} fainted" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Mawile-Mega} to {=:0} and {o:Articuno-G} to {=:0}",
                },
                { opponent: "{o:Articuno-G} fainted" },
                { opponent: "{o:Mawile-Mega} fainted" },
              ],
            ],
            branches: [{ branches: ["Jellicent switch to Tentacruel"] }],
          },
        ],
        frags: { Jellicent: 2 },
      },
      {
        line: "30% → Articuno-G Focus Blast Exploud (miss)",
        if: ["6% → Sceptile-Mega Mega Drain Primarina (to 0)"],
        matchups: [
          {
            matchup: ["Mawile-Mega", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Mawile-Mega} mega evolve" },
                { opponent: "{o:Articuno-G} Focus Blast {o:Exploud}" },
                {
                  opponent:
                    "{o:Exploud} Hyper Voice {o:Mawile-Mega} to {-:103} and {o:Articuno-G} to {-:25}",
                },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Mawile-Mega} to {=:0} and {o:Articuno-G} to {=:0}",
                },
                { opponent: "{o:Articuno-G} fainted" },
                { opponent: "{o:Mawile-Mega} fainted" },
              ],
            ],
            branches: [{ branches: ["Jellicent switch to Tentacruel 2"] }],
          },
        ],
        frags: { Jellicent: 2 },
      },
      {
        line: "19% → Articuno-G Psychic Sceptile-Mega",
        if: ["6% → Sceptile-Mega Mega Drain Primarina (to 0)"],
        matchups: [
          {
            matchup: ["Primarina", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Sceptile-Mega} mega evolve" },
                { opponent: "{o:Sceptile-Mega} Mega Drain {o:Primarina} (crit) to {=:0}" },
                { opponent: "{o:Primarina} fainted" },
                { opponent: "{o:Articuno-G} Psychic {o:Sceptile-Mega} to {+:1}" },
                { player: "{p:Jellicent} Brine {o:Primarina} → {o:Articuno-G} to {-:97}" },
              ],
            ],
            branches: [
              {
                branches: [
                  "70% → Sceptile-Mega Dragon Breath Articuno-G",
                  "30% → Sceptile-Mega Dragon Breath Articuno-G (paralyze)",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "70% → Sceptile-Mega Dragon Breath Articuno-G",
        if: ["6% → Sceptile-Mega Mega Drain Primarina (to 0)"],
        matchups: [
          {
            matchup: ["Mawile-Mega", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Mawile-Mega} mega evolve" },
                { opponent: "{o:Sceptile-Mega} Dragon Breath {o:Articuno-G} to {-:37}" },
                { opponent: "{o:Articuno-G} Psychic {o:Sceptile-Mega} to {=:0}" },
                { opponent: "{o:Sceptile-Mega} fainted" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Mawile-Mega} to {=:0} and {o:Articuno-G} to {=:0}",
                },
                { opponent: "{o:Articuno-G} fainted" },
                { opponent: "{o:Mawile-Mega} fainted" },
              ],
            ],
            branches: [{ branches: ["Jellicent switch to Tentacruel 2"] }],
          },
        ],
        frags: { Jellicent: 2 },
      },
      {
        line: "30% → Sceptile-Mega Dragon Breath Articuno-G (paralyze)",
        if: ["6% → Sceptile-Mega Mega Drain Primarina (to 0)"],
        matchups: [
          {
            matchup: ["Mawile-Mega", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Mawile-Mega} mega evolve" },
                { opponent: "{o:Sceptile-Mega} Dragon Breath {o:Articuno-G} to {-:37}" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Mawile-Mega} to {=:0} and {o:Articuno-G} to {=:0}",
                },
                { opponent: "{o:Articuno-G} fainted" },
                { opponent: "{o:Mawile-Mega} fainted" },
              ],
            ],
            branches: [{ branches: ["Jellicent switch to Tentacruel 3"] }],
          },
        ],
        frags: { Jellicent: 2 },
      },
      {
        line: "Jellicent switch to Tentacruel",
        matchups: [
          {
            matchup: ["Gholdengo"],
            turns: [
              [
                { player: "{p:Jellicent} switch to {p:Tentacruel}" },
                { opponent: "{o:Gholdengo} Shadow Ball {p:Tentacruel} to {+:85}" },
                { opponent: "{p:Tentacruel} Black Sludge to {+:95}" },
              ],
              [
                { opponent: "{o:Gholdengo} Shadow Ball {p:Tentacruel} to {+:8}" },
                { player: "{p:Tentacruel} Flip Turn {o:Gholdengo} to {-:150}" },
                { player: "{p:Tentacruel} switch to {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Shadow Claw {o:Gholdengo} to {-:38}" },
                { opponent: "{o:Gholdengo} Focus Blast {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Shadow Claw {o:Gholdengo} to {=:0}" },
                { opponent: "{o:Gholdengo} fainted" },
              ],
            ],
          },
          {
            matchup: ["Houndoom-Mega"],
            turns: [
              [
                { opponent: "{o:Houndoom-Mega} mega evolve" },
                { player: "{p:Meowscarada} Brick Break {o:Houndoom-Mega} to {-:35}" },
                { opponent: "{o:Houndoom-Mega} Fiery Wrath {p:Meowscarada} to {+:51}" },
              ],
              [
                { player: "{p:Meowscarada} Brick Break {o:Houndoom-Mega} to {=:0}" },
                { opponent: "{o:Houndoom-Mega} fainted" },
              ],
            ],
          },
        ],
        frags: { Meowscarada: 2 },
      },
      {
        line: "Jellicent switch to Tentacruel 2",
        matchups: [
          {
            matchup: ["Gholdengo"],
            turns: [
              [
                { player: "{p:Jellicent} switch to {p:Tentacruel}" },
                { opponent: "{o:Gholdengo} Shadow Ball {p:Tentacruel} to {+:85}" },
                { opponent: "{o:Exploud} Flamethrower {o:Gholdengo} to {-:101}" },
                { opponent: "{p:Tentacruel} Black Sludge to {+:95}" },
              ],
              [
                {
                  opponent:
                    "{o:Gholdengo} Make It Rain {p:Tentacruel} to {+:47} and {o:Exploud} to {+:34}",
                },
                { player: "{p:Tentacruel} Flip Turn {o:Gholdengo} to {-:74}" },
                { player: "{p:Tentacruel} switch to {p:Meowscarada}" },
                { opponent: "{o:Exploud} Flamethrower {o:Gholdengo} to {=:0}" },
                { opponent: "{o:Gholdengo} fainted" },
                { opponent: "{p:Tentacruel} Black Sludge to {+:57}" },
              ],
            ],
          },
          {
            matchup: ["Houndoom-Mega"],
            turns: [
              [
                { opponent: "{o:Houndoom-Mega} mega evolve" },
                { player: "{p:Meowscarada} U-Turn {o:Houndoom-Mega} to {-:116}" },
                { player: "{p:Meowscarada} switch to {p:Jellicent}" },
                {
                  opponent:
                    "{o:Houndoom-Mega} Heat Wave {p:Jellicent} to {+:170} and {o:Exploud} to {=:0}",
                },
                { opponent: "{o:Exploud} fainted" },
              ],
              [
                { player: "{p:Jellicent} switch to {p:Meowscarada}" },
                { opponent: "{o:Houndoom-Mega} Fiery Wrath {p:Meowscarada} to {+:51}" },
              ],
              [
                { player: "{p:Meowscarada} Brick Break {o:Houndoom-Mega} to {=:0}" },
                { opponent: "{o:Houndoom-Mega} fainted" },
              ],
            ],
          },
        ],
        frags: { Tentacruel: 1, Meowscarada: 1 },
      },
      {
        line: "Jellicent switch to Tentacruel 3",
        matchups: [
          {
            matchup: ["Gholdengo"],
            turns: [
              [
                { player: "{p:Jellicent} switch to {p:Tentacruel}" },
                { opponent: "{o:Sceptile-Mega} HP Dark {o:Gholdengo} to {-:89}" },
                {
                  opponent:
                    "{o:Gholdengo} Make It Rain {p:Tentacruel} to {+:124} and {o:Sceptile-Mega} to {=:0}",
                },
                { opponent: "{o:Sceptile-Mega} fainted" },
                { opponent: "{p:Tentacruel} Black Sludge to {+:134}" },
              ],
              [
                {
                  opponent:
                    "{o:Gholdengo} Make It Rain {p:Tentacruel} to {+:86} and {o:Exploud} to {+:34}",
                },
                { player: "{p:Tentacruel} Flip Turn {o:Gholdengo} to {-:62}" },
                { player: "{p:Tentacruel} switch to {p:Meowscarada}" },
                { opponent: "{o:Exploud} Flamethrower {o:Gholdengo} to {=:0}" },
                { opponent: "{o:Gholdengo} fainted" },
              ],
            ],
          },
          {
            matchup: ["Houndoom-Mega"],
            turns: [
              [
                { opponent: "{o:Houndoom-Mega} mega evolve" },
                { player: "{p:Meowscarada} U-Turn {o:Houndoom-Mega} to {-:116}" },
                { player: "{p:Meowscarada} switch to {p:Jellicent}" },
                {
                  opponent:
                    "{o:Houndoom-Mega} Heat Wave {p:Jellicent} to {+:170} and {o:Exploud} to {=:0}",
                },
                { opponent: "{o:Exploud} fainted" },
              ],
              [
                { player: "{p:Jellicent} switch to {p:Meowscarada}" },
                { opponent: "{o:Houndoom-Mega} Fiery Wrath {p:Meowscarada} to {+:51}" },
              ],
              [
                { player: "{p:Meowscarada} Brick Break {o:Houndoom-Mega} to {=:0}" },
                { opponent: "{o:Houndoom-Mega} fainted" },
              ],
            ],
          },
        ],
        frags: { Tentacruel: 1, Meowscarada: 1 },
      },
    ],
  },
};

const _box22 = getBox({
  box: _box21,
  cap: { level: 57, exclude: ["Golisopod"] },
});

export const silphCoArianaArcherBoxChange: Moment = {
  split: "Sabrina",
  label: "Silph Co. Ariana & Archer Box Change",
  kind: "boxChange",
  data: { playerBox: _box22 },
};

const _box23 = getBox({
  box: _box22,
  update: {
    Meowscarada: {
      nature: "Adamant",
      ability: "Protean",
      item: "Safety Goggles",
      moves: ["Flower Trick", "Play Rough", "Thunder Punch", "U-Turn"],
    },
    Golduck: {
      nature: "Rash",
      ability: "Cloud Nine",
      item: "Leftovers",
      moves: ["Flash", "Flip Turn", "Psychic", "Scald"],
    },
    Golisopod: {
      nature: "Lonely",
      ability: "Emergency Exit",
      item: "Silver Powder",
      moves: ["First Impression", "Aerial Ace", "Rock Tomb", "Sucker Punch"],
    },
    Clodsire: {
      nature: "Impish",
      ability: "Water Absorb",
      item: "Sitrus Berry",
      moves: ["Bulldoze", "Rock Slide", "Rock Tomb", "Tail Whip"],
    },
    Gyarados: {
      nature: "Jolly",
      ability: "Intimidate",
      item: "Charti Berry",
      moves: ["Leer", "Reflect", "Rest", "Scary Face"],
    },
  },
  team: ["Meowscarada", "Golduck", "Golisopod", "Clodsire", "Gyarados"],
});

export const silphCoGiovanniBattle: Moment = {
  split: "Sabrina",
  label: "Silph Co. Giovanni Battle",
  kind: "battle",
  data: {
    playerBox: _box23,
    opponentBox: silphCoGiovanniBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Mamoswine"],
            turns: [
              [
                { player: "{p:Meowscarada} U-Turn {o:Mamoswine} to {-:147}" },
                { player: "{p:Meowscarada} switch to {p:Golduck}" },
                { opponent: "{o:Mamoswine} Icicle Crash {p:Golduck} to {+:103}" },
                { opponent: "{p:Golduck} Leftovers to {+:113}" },
              ],
              [
                { player: "{p:Golduck} Scald {o:Mamoswine} to {=:0}" },
                { opponent: "{o:Mamoswine} fainted" },
                { opponent: "{p:Golduck} Leftovers to {+:123}" },
              ],
            ],
          },
          {
            matchup: ["Garchomp-Mega"],
            turns: [
              [
                { player: "{p:Golduck} switch to {p:Golisopod}" },
                { opponent: "{o:Garchomp-Mega} mega evolve" },
                { opponent: "{o:Garchomp-Mega} Earthquake {p:Golisopod} to {+:7}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Garchomp-Mega} to {-:79}" },
                { opponent: "{o:Garchomp-Mega} Scale Shot {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Garchomp-Mega} to {=:0}" },
                { opponent: "{o:Garchomp-Mega} fainted" },
              ],
            ],
            branches: [
              {
                branches: ["50% → Dracovish matchup", "50% → Excadrill matchup"],
              },
            ],
          },
        ],
        frags: { Golduck: 1, Meowscarada: 1 },
      },
      {
        line: "50% → Dracovish matchup",
        matchups: [
          {
            matchup: ["Dracovish"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Clodsire}" },
                { opponent: "{o:Dracovish} Fishious Rend {p:Clodsire}" },
              ],
              [
                { opponent: "{o:Dracovish} Psychic Fangs {p:Clodsire} to {+:118}" },
                { player: "{p:Clodsire} Bulldoze {o:Dracovish} to {-:157}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Meowscarada}" },
                { opponent: "{o:Dracovish} Psychic Fangs {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Dracovish} to {-:23}" },
                { opponent: "{o:Dracovish} Dragon Claw {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Dracovish} to {=:0}" },
                { opponent: "{o:Dracovish} fainted" },
              ],
            ],
          },
          {
            matchup: ["Excadrill"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Golduck}" },
                { opponent: "{o:Excadrill} Iron Head {p:Golduck} to {+:54}" },
                { opponent: "{p:Golduck} Leftovers to {+:64}" },
              ],
              [
                { player: "{p:Golduck} Flip Turn {o:Excadrill} to {-:114}" },
                { player: "{p:Golduck} switch to {p:Gyarados}" },
                { opponent: "{o:Excadrill} Earthquake {p:Gyarados}" },
                { opponent: "{p:Gyarados} sandstorm to {+:180}" },
              ],
              [
                { opponent: "{o:Excadrill} Swords Dance" },
                { player: "{p:Gyarados} Leer {o:Excadrill}" },
                { opponent: "{p:Gyarados} sandstorm to {+:168}" },
              ],
              [
                { player: "{p:Gyarados} switch to {p:Golduck}" },
                { opponent: "{o:Excadrill} Swords Dance" },
                { opponent: "{p:Golduck} Leftovers to {+:74}" },
              ],
              [
                { player: "{p:Golduck} Flip Turn {o:Excadrill} to {=:0}" },
                { opponent: "{o:Excadrill} fainted" },
                { player: "{p:Golduck} switch to {p:Meowscarada}" },
              ],
            ],
            branches: [{ branches: ["Meowscarada Flower Trick Garganacl"] }],
          },
        ],
        frags: { Meowscarada: 1, Golduck: 1 },
      },
      {
        line: "50% → Excadrill matchup",
        matchups: [
          {
            matchup: ["Excadrill"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Golduck}" },
                { opponent: "{o:Excadrill} Iron Head {p:Golduck} to {+:54}" },
                { opponent: "{p:Golduck} Leftovers to {+:64}" },
              ],
              [
                { player: "{p:Golduck} Flip Turn {o:Excadrill} to {-:114}" },
                { player: "{p:Golduck} switch to {p:Gyarados}" },
                { opponent: "{o:Excadrill} Earthquake {p:Gyarados}" },
                { opponent: "{p:Gyarados} sandstorm to {+:180}" },
              ],
              [
                { opponent: "{o:Excadrill} Swords Dance" },
                { player: "{p:Gyarados} Leer {o:Excadrill}" },
                { opponent: "{p:Gyarados} sandstorm to {+:168}" },
              ],
              [
                { player: "{p:Gyarados} switch to {p:Golduck}" },
                { opponent: "{o:Excadrill} Swords Dance" },
                { opponent: "{p:Golduck} Leftovers to {+:74}" },
              ],
              [
                { player: "{p:Golduck} Flip Turn {o:Excadrill} to {=:0}" },
                { opponent: "{o:Excadrill} fainted" },
                { player: "{p:Golduck} switch to {p:Meowscarada}" },
              ],
            ],
          },
          {
            matchup: ["Dracovish"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Clodsire}" },
                { opponent: "{o:Dracovish} Fishious Rend {p:Clodsire}" },
              ],
              [
                { opponent: "{o:Dracovish} Psychic Fangs {p:Clodsire} to {+:118}" },
                { player: "{p:Clodsire} Bulldoze {o:Dracovish} to {-:157}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Meowscarada}" },
                { opponent: "{o:Dracovish} Psychic Fangs {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Dracovish} to {-:23}" },
                { opponent: "{o:Dracovish} Dragon Claw {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Dracovish} to {=:0}" },
                { opponent: "{o:Dracovish} fainted" },
              ],
            ],
            branches: [{ branches: ["Meowscarada Flower Trick Garganacl"] }],
          },
        ],
        frags: { Golduck: 1, Meowscarada: 1 },
      },
      {
        line: "Meowscarada Flower Trick Garganacl",
        matchups: [
          {
            matchup: ["Garganacl"],
            turns: [
              [
                { player: "{p:Meowscarada} Flower Trick {o:Garganacl} to {-:82}" },
                { opponent: "{o:Garganacl} Salt Cure {p:Meowscarada} to {+:111}" },
                { opponent: "{p:Meowscarada} salt cure to {+:90}" },
              ],
              [
                { player: "{p:Meowscarada} Flower Trick {o:Garganacl} to {=:0}" },
                { opponent: "{o:Garganacl} fainted" },
                { opponent: "{p:Meowscarada} salt cure to {+:69}" },
              ],
            ],
          },
          {
            matchup: ["Gyarados"],
            turns: [
              [
                { player: "{p:Meowscarada} Thunder Punch {o:Gyarados} to {=:0}" },
                { opponent: "{o:Gyarados} fainted" },
              ],
            ],
          },
        ],
        frags: { Meowscarada: 2 },
      },
    ],
  },
};

const _box24 = getBox({
  box: _box23,
  cap: 59,
  update: [
    {
      Mudkip: {
        name: "Marshtomp",
        moves: ["Bulldoze", "Growl", "Tackle"],
      },
    },
    {
      "Arcanine-H": {
        hp: "Grass",
      },
      Marshtomp: {
        name: "Swampert",
      },
    },
  ],
});

export const silphCoGiovanniBoxChange: Moment = {
  split: "Sabrina",
  label: "Silph Co. Giovanni Box Change",
  kind: "boxChange",
  data: { playerBox: _box24 },
};

const _box25 = getBox({
  box: _box24,
  update: {
    Golisopod: {
      nature: "Adamant",
      ability: "Emergency Exit",
      item: "Silver Powder",
      moves: ["First Impression", "Pounce", "Rock Tomb", "Sucker Punch"],
      ivs: undefined,
    },
    Meowscarada: {
      nature: "Brave",
      ability: "Protean",
      item: "Expert Belt",
      moves: ["Cut", "Flower Trick", "Knock Off", "Play Rough"],
    },
    Swampert: {
      nature: "Brave",
      ability: "Torrent",
      item: "Focus Sash",
      moves: ["Earthquake", "Flip Turn", "Ice Punch", "Tackle"],
    },
    "Arcanine-H": {
      nature: "Brave",
      ability: "Rock Head",
      item: "Cheri Berry",
      moves: ["Accelerock", "Flare Blitz", "HP Grass", "Play Rough"],
    },
    Cloyster: {
      nature: "Impish",
      ability: "Shell Armor",
      item: "Never-Melt Ice",
      moves: ["Ice Shard", "Icicle Crash", "Icicle Spear", "Liquidation"],
      friend: undefined,
    },
    Gyarados: {
      nature: "Impish",
      ability: "Intimidate",
      item: "Leftovers",
      moves: ["Aqua Tail", "Bulldoze", "Rest", "Scary Face"],
    },
  },
  team: ["Golisopod", "Meowscarada", "Swampert", "Arcanine-H", "Cloyster", "Gyarados"],
});

export const saffronCityDumassKidBattle: Moment = {
  split: "Sabrina",
  label: "Saffron City Dumass Kid Battle",
  kind: "battle",
  data: {
    playerBox: _box25,
    opponentBox: saffronCityDumassKidBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Beartic"],
            turns: [
              [
                { opponent: "{o:Beartic} Swords Dance" },
                { player: "{p:Golisopod} Rock Tomb {o:Beartic} to {-:158}" },
              ],
              [
                { player: "{p:Golisopod} switch to {p:Meowscarada}" },
                { opponent: "{o:Beartic} Swords Dance" },
              ],
              [
                { player: "{p:Meowscarada} Cut {o:Beartic} to {=:0}" },
                { opponent: "{o:Beartic} fainted" },
              ],
            ],
          },
          {
            matchup: ["Zapdos"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Swampert}" },
                { opponent: "{o:Zapdos} Thunder {p:Swampert}" },
              ],
              [
                { opponent: "{o:Zapdos} Supersonic Skystrike {p:Swampert} to {+:1}" },
                { player: "{p:Swampert} Flip Turn {o:Zapdos} to {-:75}" },
                { player: "{p:Swampert} switch to {p:Arcanine-H}" },
              ],
              [
                { player: "{p:Arcanine-H} Accelerock {o:Zapdos} to {=:0}" },
                { opponent: "{o:Zapdos} fainted" },
              ],
            ],
          },
          {
            matchup: ["Goodra"],
            turns: [
              [
                { player: "{p:Arcanine-H} switch to {p:Meowscarada}" },
                { opponent: "{o:Goodra} Earthquake {p:Meowscarada} to {+:125}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Goodra} to {=:0}" },
                { opponent: "{o:Goodra} fainted" },
              ],
            ],
          },
          {
            matchup: ["Scizor"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Arcanine-H}" },
                { opponent: "{o:Scizor} Bullet Punch {p:Arcanine-H} to {+:85}" },
              ],
              [
                { player: "{p:Arcanine-H} Flare Blitz {o:Scizor} to {=:0}" },
                { opponent: "{o:Scizor} fainted" },
              ],
            ],
          },
          {
            matchup: ["Swampert-Mega"],
            turns: [
              [
                { player: "{p:Arcanine-H} switch to {p:Cloyster}" },
                { opponent: "{o:Swampert-Mega} mega evolve" },
                { opponent: "{o:Swampert-Mega} Earthquake {p:Cloyster} to {+:80}" },
              ],
              [
                { player: "{p:Cloyster} switch to {p:Gyarados}" },
                { opponent: "{o:Swampert-Mega} Pow-Up Punch {p:Gyarados} to {+:172}" },
                { opponent: "{p:Gyarados} Leftovers to {+:184}" },
              ],
              [
                { opponent: "{o:Swampert-Mega} Pow-Up Punch {p:Gyarados} to {+:157}" },
                { player: "{p:Gyarados} Bulldoze {o:Swampert-Mega} to {-:176}" },
                { opponent: "{p:Gyarados} Leftovers to {+:169}" },
              ],
              [
                { opponent: "{o:Swampert-Mega} Pow-Up Punch {p:Gyarados} to {+:130}" },
                { player: "{p:Gyarados} Bulldoze {o:Swampert-Mega} to {-:147}" },
                { opponent: "{p:Gyarados} Leftovers to {+:142}" },
              ],
              [
                { player: "{p:Gyarados} switch to {p:Golisopod}" },
                { opponent: "{o:Swampert-Mega} Waterfall {p:Golisopod} to {+:16}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Flower Trick {o:Swampert-Mega} to {=:0}" },
                { opponent: "{o:Swampert-Mega} fainted" },
              ],
            ],
          },
          {
            matchup: ["Frosmoth"],
            turns: [
              [
                { player: "{p:Meowscarada} Cut {o:Frosmoth} to {=:0}" },
                { opponent: "{o:Frosmoth} fainted" },
              ],
            ],
          },
        ],
        frags: { Meowscarada: 4, "Arcanine-H": 2 },
      },
    ],
  },
};

const _box26 = getBox({
  box: _box25,
  remove: ["Cloyster"],
  update: {
    Perrserker: {
      ivs: { spe: 0 },
    },
    Azumarill: {
      ivs: { spe: 0 },
      friend: undefined,
    },
    "Arcanine-H": {
      hp: "Dark",
    },
    Golisopod: {
      ivs: { spe: 0 },
    },
    Jellicent: {
      hp: "Fire",
      ivs: { spe: 0 },
    },
    Swampert: {
      ivs: { spe: 0 },
    },
  },
});

export const saffronCityDumassKidBoxChange: Moment = {
  split: "Sabrina",
  label: "Saffron City Dumass Kid Box Change",
  kind: "boxChange",
  data: { playerBox: _box26 },
};

const _box27 = getBox({
  box: _box26,
  update: {
    Lanturn: {
      nature: "Quiet",
      ability: "Water Absorb",
      item: "Wise Glasses",
      moves: ["Flip Turn", "Hydro Pump", "Thunderbolt", "Volt Switch"],
    },
    Golisopod: {
      nature: "Brave",
      ability: "Emergency Exit",
      item: "Iron Ball",
      moves: ["Drill Run", "Liquidation", "Poison Jab", "Rock Tomb"],
    },
    Swampert: {
      nature: "Adamant",
      ability: "Damp",
      item: "Focus Sash",
      moves: ["Earthquake", "Flip Turn", "Ice Punch", "Rock Slide"],
    },
    Perrserker: {
      nature: "Relaxed",
      ability: "Tough Claws",
      item: undefined,
      moves: ["Fake Out", "Bullet Punch", "Shadow Claw", "U-Turn"],
    },
    Azumarill: {
      nature: "Brave",
      ability: "Huge Power",
      item: "Iron Ball",
      moves: ["Aqua Tail", "Helping Hand", "Play Rough", "Superpower"],
    },
    Jellicent: {
      nature: "Quiet",
      ability: "Water Bubble",
      item: "Iron Ball",
      moves: ["Brine", "Hidden Power Fire", "Scald", "Water Spout"],
    },
  },
  team: ["Lanturn", "Golisopod", "Swampert", "Perrserker", "Azumarill", "Jellicent"],
});

export const saffronCityLeaderSabrinaBattle: Moment = {
  split: "Sabrina",
  label: "Saffron City Leader Sabrina Battle",
  kind: "battle",
  data: {
    playerBox: _box27,
    opponentBox: saffronCityLeaderSabrinaBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Camerupt-Mega", "Tapu Fini"],
            turns: [
              [
                { opponent: "{o:Camerupt-Mega} mega evolve" },
                { player: "{p:Golisopod} Liquidation {o:Camerupt-Mega} to {=:0}" },
                { opponent: "{o:Camerupt-Mega} fainted" },
                { player: "{p:Lanturn} Volt Switch {o:Tapu Fini} to {-:101}" },
                { player: "{p:Lanturn} switch to {p:Swampert}" },
                { opponent: "{o:Tapu Fini} Misty Explosion" },
              ],
            ],
          },
          {
            matchup: ["Jellicent", "Tapu Fini"],
            turns: [],
            branches: [
              {
                branches: [
                  "61% → Golisopod Poison Jab Tapu Fini",
                  "39% → Golisopod Poison Jab Tapu Fini (to 0)",
                ],
              },
            ],
          },
        ],
        frags: { Golisopod: 1 },
      },
      {
        line: "61% → Golisopod Poison Jab Tapu Fini",
        matchups: [
          {
            matchup: ["Jellicent", "Tapu Fini"],
            turns: [
              [
                { player: "{p:Golisopod} Poison Jab {o:Tapu Fini} to {-:19}" },
                {
                  opponent:
                    "{o:Jellicent} Water Spout {p:Golisopod} to {+:31} and {p:Swampert} to {+:1}",
                },
                { player: "{p:Swampert} Flip Turn {o:Tapu Fini} to {=:0}" },
                { opponent: "{o:Tapu Fini} fainted" },
                { player: "{p:Swampert} switch to {p:Lanturn}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Perrserker}" },
              ],
            ],
          },
          {
            matchup: ["Jellicent", "Magearna"],
            turns: [
              [
                { player: "{p:Perrserker} U-Turn {o:Jellicent} to {-:180}" },
                { player: "{p:Perrserker} switch to {p:Jellicent}" },
                { opponent: "{o:Jellicent} Shadow Ball {p:Lanturn} to {+:134}" },
                { opponent: "{o:Magearna} Focus Blast {p:Jellicent}" },
                { player: "{p:Lanturn} Volt Switch {o:Jellicent} to {-:96}" },
                { player: "{p:Lanturn} switch to {p:Azumarill}" },
              ],
            ],
            branches: [{ branches: ["Azumarill Helping Hand"] }],
          },
        ],
        frags: { Swampert: 1 },
      },
      {
        line: "39% → Golisopod Poison Jab Tapu Fini (to 0)",
        matchups: [
          {
            matchup: ["Jellicent", "Tapu Fini"],
            turns: [
              [
                { player: "{p:Golisopod} Poison Jab {o:Tapu Fini} to {=:0}" },
                { opponent: "{o:Tapu Fini} fainted" },
                {
                  opponent:
                    "{o:Jellicent} Water Spout {p:Golisopod} to {+:31} and {p:Swampert} to {+:1}",
                },
                { player: "{p:Swampert} Flip Turn {o:Tapu Fini} → {o:Jellicent} to {-:177}" },
                { player: "{p:Swampert} switch to {p:Lanturn}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Perrserker}" },
              ],
            ],
          },
          {
            matchup: ["Jellicent", "Magearna"],
            turns: [
              [
                { player: "{p:Perrserker} switch to {p:Jellicent}" },
                { opponent: "{o:Jellicent} Shadow Ball {p:Lanturn} to {+:134}" },
                { opponent: "{o:Magearna} Focus Blast {p:Jellicent}" },
                { player: "{p:Lanturn} Volt Switch {o:Jellicent} to {-:93}" },
                { player: "{p:Lanturn} switch to {p:Azumarill}" },
              ],
            ],
            branches: [{ branches: ["Azumarill Helping Hand"] }],
          },
        ],
        frags: { Golisopod: 1 },
      },
      {
        line: "Azumarill Helping Hand",
        matchups: [
          {
            matchup: ["Jellicent", "Magearna"],
            turns: [
              [
                { player: "{p:Azumarill} Helping Hand {p:Jellicent}" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Jellicent} to {=:0} and {o:Magearna} to {=:0}",
                },
                { opponent: "{o:Jellicent} fainted" },
                { opponent: "{o:Magearna} fainted" },
              ],
            ],
          },
          {
            matchup: ["Glastrier", "Iron Hands"],
            turns: [
              [
                { player: "{p:Azumarill} Helping Hand {p:Jellicent}" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Glastrier} to {-:1} and {o:Magearna} to {=:0}",
                },
                { opponent: "{o:Glastrier} Iapapa Berry to {-:69}" },
                { opponent: "{o:Iron Hands} fainted" },
              ],
              [
                { player: "{p:Azumarill} Helping Hand {p:Jellicent}" },
                { player: "{p:Jellicent} Brine {o:Glastrier} to {=:0}" },
                { opponent: "{o:Glastrier} fainted" },
              ],
            ],
          },
        ],
        frags: { Jellicent: 4 },
      },
    ],
  },
};

const _box28 = getBox({
  box: _box27,
  update: {
    Perrserker: {
      ivs: { spe: 31 },
    },
    Azumarill: {
      ivs: { spe: 31 },
    },
    Golisopod: {
      ivs: { spe: 31 },
    },
    Jellicent: {
      hp: "Dark",
      ivs: { spe: 31 },
    },
    Swampert: {
      ivs: { spe: 31 },
    },
  },
});

export const saffronCityLeaderSabrinaBoxChange: Moment = {
  split: "Sabrina",
  label: "Saffron City Leader Sabrina Box Change",
  kind: "boxChange",
  data: { playerBox: _box28 },
};

export const box = _box28;

export const moments: Moment[] = [
  sabrinaBoxChange,
  gameCornerGuardBattle,
  gameCornerGuardBoxChange,
  rocketHideoutLeftGuardBattle,
  rocketHideoutRightGuardBattle,
  rocketHideoutGiovanniBattle,
  starterEgg1Encounter,
  starterEgg1BoxChange,
  pokemonTowerChannelerRuthBattle,
  pokemonTowerGhostBattle,
  pokemonTowerGrunt1Battle,
  pokemonTowerGrunt2Battle,
  pokemonTowerGrunt3Battle,
  starterEgg2Encounter,
  starterEgg2BoxChange,
  saffronDojoLeaderChuckBattle,
  saffronDojoLeaderChuckBoxChange,
  silphCoRivalBattle,
  silphCoRivalBoxChange,
  silphCoArianaArcherBattle,
  silphCoArianaArcherBoxChange,
  silphCoGiovanniBattle,
  silphCoGiovanniBoxChange,
  saffronCityDumassKidBattle,
  saffronCityDumassKidBoxChange,
  saffronCityLeaderSabrinaBattle,
  saffronCityLeaderSabrinaBoxChange,
];
