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
  saffronDojoLeaderChuckBox,
  silphCoArianaArcherBox,
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
  label: "Sabrina Box Change",
  kind: "boxChange",
  data: { playerBox: _box2 },
};

const _box3 = getBox({
  box: _box2,
  update: {
    Perrserker: {
      item: "Sitrus Berry",
      moves: ["Fake Out", "Bullet Punch", "Thunderbolt", "U-Turn"],
    },
    Incineroar: {
      moves: ["Fake Out", "Darkest Lariat", "Thunder Punch", "U-Turn"],
    },
    Lanturn: {
      nature: "Modest",
      item: "Sitrus Berry",
      moves: ["Bubble Beam", "Icy Wind", "Thunderbolt", "Thunder Wave"],
    },
    Tentacruel: {
      nature: "Timid",
      ability: "Clear Body",
    },
    "Arcanine-H": {
      moves: ["Bad Tantrum", "Crunch", "Flare Blitz", "Thunder Fang"],
    },
  },
  team: ["Perrserker", "Golisopod", "Incineroar", "Lanturn", "Tentacruel", "Arcanine-H"],
});

export const gameCornerGuardBattle: Moment = {
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
                {
                  opponent:
                    "{o:Tinkaton} Gigaton Hammer {p:Perrserker} to {+:21} or Gigaton Hammer {p:Lanturn} to {+:118}",
                },
                { player: "{p:Perrserker} U-Turn {o:Tinkaton} to {-:131}" },
                { player: "{p:Perrserker} switch to {p:Incineroar}" },
              ],
              [
                { player: "{p:Incineroar} Fake Out {o:Inteleon} to {-:112}" },
                { opponent: "{o:Inteleon} flinched" },
                { player: "{p:Lanturn} Thunderbolt {o:Inteleon} to {=:0}" },
                { opponent: "{o:Inteleon} fainted" },
                {
                  opponent:
                    "{o:Tinkaton} Play Rough {p:Incineroar} to {+:88} or Play Rough {p:Lanturn} to {+:56}",
                },
              ],
            ],
          },
          {
            matchup: ["Tinkaton"],
            turns: [
              [
                { player: "{p:Lanturn} switch to {p:Tentacruel}" },
                {
                  opponent:
                    "{o:Tinkaton} Play Rough {p:Incineroar} to {+:16} or Play Rough {p:Tentacruel} to {+:103}",
                },
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
  label: "Game Corner Guard Box Change",
  kind: "boxChange",
  data: { playerBox: _box4 },
};

const _box5 = getBox({
  box: _box4,
  update: {
    Golduck: {
      nature: "Modest",
      moves: ["Aqua Tail", "Flip Turn", "Psychic", "Scald"],
    },
    Perrserker: {
      ability: "Tough Claws",
      item: "Chople Berry",
      moves: ["Fake Out", "Aerial Ace", "Iron Head", "U-Turn"],
    },
    Incineroar: {
      nature: "Lonely",
      ability: "Blaze",
      item: "Sitrus Berry",
    },
    Excadrill: {
      moves: ["Drill Run", "Iron Head", "Rapid Spin", "Rock Tomb"],
    },
  },
  team: ["Golduck", "Perrserker", "Incineroar", "Excadrill"],
});

export const rocketHideoutLeftGuardBattle: Moment = {
  label: "Rocket Hideout Left Guard Battle",
  kind: "battle",
  data: {
    playerBox: _box5,
    opponentBox: rocketHideoutLeftGuardBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Slaking", "Weezing"],
            turns: [
              [
                { player: "{p:Perrserker} Fake Out {o:Slaking} to {-:190}" },
                { opponent: "{o:Slaking} flinched" },
                { player: "{p:Golduck} Psychic {o:Weezing} to {=:0}" },
                { opponent: "{o:Weezing} fainted" },
              ],
            ],
          },
          {
            matchup: ["Slaking", "Lilligant"],
            turns: [
              [
                { player: "{p:Golduck} switch to {p:Incineroar}" },
                { opponent: "{o:Lilligant} Leaf Blade {p:Incineroar} to {+:97}" },
                { opponent: "{o:Slaking} Truant" },
                { player: "{p:Perrserker} Aerial Ace {o:Lilligant} to {=:0}" },
                { opponent: "{o:Lilligant} fainted" },
              ],
            ],
          },
          {
            matchup: ["Slaking", "Rotom"],
            turns: [
              [
                { player: "{p:Perrserker} switch to {p:Excadrill}" },
                { player: "{p:Incineroar} Fake Out {o:Slaking} to {-:174}" },
                { opponent: "{o:Slaking} flinched" },
                { opponent: "{o:Rotom} Thunderbolt {p:Excadrill}" },
              ],
              [
                { opponent: "{o:Slaking} Truant" },
                { player: "{p:Excadrill} Drill Run {o:Rotom} to {=:0}" },
                { opponent: "{o:Rotom} fainted" },
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
                { player: "{o:Slaking} flinched" },
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
      item: "Mystic Water",
    },
    Perrserker: {
      item: "Silk Scarf",
    },
    Gyarados: {
      item: "Sitrus Berry",
    },
  },
  team: ["Golduck", "Perrserker", "Gyarados", "Excadrill"],
});

export const rocketHideoutRightGuardBattle: Moment = {
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
            matchup: ["Rotom", "Shiftry"],
            turns: [
              [
                { player: "{p:Gyarados} switch to {p:Excadrill}" },
                { opponent: "{o:Rotom} Thunderbolt {p:Excadrill}" },
                { opponent: "{o:Shiftry} Low Kick {p:Perrserker} to {+:66}" },
                { player: "{p:Perrserker} U-Turn {o:Shiftry} to {-:1}" },
                { player: "{p:Perrserker} switch to {p:Golduck}" },
              ],
              [
                { player: "{p:Golduck} Aqua Tail {o:Shiftry} to {=:0}" },
                { opponent: "{o:Shiftry} fainted" },
                { player: "{p:Excadrill} Drill Run {o:Rotom} to {=:0}" },
                { opponent: "{o:Rotom} fainted" },
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
      moves: ["Aqua Jet", "Flip Turn", "Psychic", "Scald"],
    },
    Drednaw: {
      nature: "Adamant",
      ability: "Strong Jaw",
      item: "Sitrus Berry",
      moves: ["Bulldoze", "Crunch", "Ice Fang", "Jaw Lock"],
    },
    Lanturn: {
      ability: "Volt Absorb",
      item: "Shuca Berry",
      moves: ["Flip Turn", "Icy Wind", "Scald", "Volt Switch"],
    },
    "Arcanine-H": {
      nature: "Brave",
      item: "Charcoal",
      moves: ["Accelerock", "Flamethrower", "Flare Blitz", "Return"],
    },
    Gyarados: {
      moves: ["Aqua Fang", "Bulldoze", "Flamethrower", "Ice Fang"],
    },
  },
  team: ["Golduck", "Drednaw", "Cloyster", "Lanturn", "Arcanine-H", "Gyarados"],
});

export const rocketHideoutGiovanniBattle: Moment = {
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
                { opponent: "{o:Kangaskhan-Mega} Power-Up Punch {p:Golduck} to {+:119}" },
                { player: "{p:Golduck} Flip Turn {o:Kangaskhan-Mega} to {-:137}" },
                { player: "{p:Golduck} switch to {p:Drednaw}" },
                { player: "{p:Drednaw} Stealth Rock to {=:137}" },
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
                { player: "{p:Cloyster} Stealth Rock to {=:89}" },
                { opponent: "{o:Gyarados} Earthquake {p:Cloyster} to {+:59}" },
              ],
              [
                { player: "{p:Cloyster} switch to {p:Lanturn}" },
                { player: "{p:Lanturn} Stealth Rock to {=:166}" },
                { opponent: "{o:Gyarados} Dragon Dance" },
              ],
              [
                { opponent: "{o:Gyarados} Dragon Dance" },
                { player: "{p:Lanturn} Volt Switch {o:Gyarados} to {-:28}" },
                { player: "{p:Lanturn} switch to {p:Arcanine-H}" },
                { player: "{p:Arcanine-H} Stealth Rock to {=:120}" },
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
                { player: "{p:Gyarados} Stealth Rock to {=:120}" },
                { opponent: "{o:Nidoking} Earth Power {p:Gyarados}" },
              ],
              [
                { player: "{p:Gyarados} switch to {p:Lanturn}" },
                { player: "{p:Lanturn} Stealth Rock to {=:143}" },
                { opponent: "{o:Nidoking} Thunderbolt {p:Lanturn} to {=:189}" },
              ],
              [
                { opponent: "{o:Nidoking} Sludge Wave {p:Lanturn} to {+:29}" },
                { player: "{p:Lanturn} Flip Turn {o:Nidoking} to {-:99}" },
                { player: "{p:Lanturn} switch to {p:Golduck}" },
                { player: "{p:Golduck} Stealth Rock to {+:101}" },
              ],
              [
                { player: "{p:Golduck} Flip Turn {o:Nidoking} to {=:0}" },
                { opponent: "{o:Nidoking} fainted" },
                { player: "{p:Golduck} switch to {p:Arcanine-H}" },
                { player: "{p:Arcanine-H} Stealth Rock to {=:80}" },
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
  ability: "Overgrow",
  moves: ["Scratch", "Tail Whip"],
};

export const starterEgg1Encounter: Moment = {
  label: "Starter Egg 1 Encounter",
  kind: "encounter",
  data: { pokemon: _sprigatito },
};

const _box8 = getBox({
  box: _box7,
  add: [_sprigatito],
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
  label: "Starter Egg 1 Box Change",
  kind: "boxChange",
  data: { playerBox: _box8 },
};

const _box9 = getBox({
  box: _box8,
  update: {
    Incineroar: {
      nature: "Adamant",
      ability: "Intimidate",
      moves: ["Fake Out", "Darkest Lariat", "Snarl", "U-Turn"],
    },
    Excadrill: {
      nature: "Adamant",
    },
    Meowscarada: {
      nature: "Adamant",
      ability: "Protean",
      item: "Black Glasses",
      moves: ["Brick Break", "Night Slash", "Play Rough", "U-Turn"],
    },
  },
  team: ["Incineroar", "Excadrill", "Meowscarada"],
});

export const pokemonTowerChannelerRuthBattle: Moment = {
  label: "Pokémon Tower Channeler Ruth Battle",
  kind: "battle",
  data: {
    playerBox: _box9,
    opponentBox: pokemonTowerChannelerRuthBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Grimmsnarl", "Pincurchin"],
            turns: [
              [
                { player: "{p:Incineroar} Fake Out {o:Grimmsnarl} to {-:128}" },
                { opponent: "{o:Grimmsnarl} flinched" },
                { player: "{p:Excadrill} Drill Run {o:Pincurchin} to {=:0}" },
                { opponent: "{o:Pincurchin} fainted" },
              ],
            ],
          },
          {
            matchup: ["Grimmsnarl", "Cresselia"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Meowscarada}" },
                { opponent: "{o:Grimmsnarl} Light Screen or Reflect" },
                { opponent: "{o:Cresselia} Calm Mind" },
                {
                  player:
                    "{p:Incineroar} Snarl {o:Cresselia} to {-:160} and {o:Grimmsnarl} to {-:125}",
                },
              ],
              [
                { opponent: "{o:Grimmsnarl} Light Screen or Reflect" },
                { player: "{p:Meowscarada} Brick Break {o:Grimmsnarl} to {-:64}" },
                { opponent: "{o:Cresselia} Calm Mind" },
                {
                  player:
                    "{p:Incineroar} Snarl {o:Cresselia} to {-:147} and {o:Grimmsnarl} to {-:61}",
                },
              ],
              [
                { opponent: "{o:Grimmsnarl} Light Screen or Reflect" },
                { player: "{p:Meowscarada} Brick Break {o:Grimmsnarl} to {=:0}" },
                { opponent: "{o:Grimmsnarl} fainted" },
                { opponent: "{o:Cresselia} Calm Mind" },
                { player: "{p:Incineroar} Snarl {o:Cresselia} to {-:134}" },
              ],
            ],
            branches: [
              {
                branches: [
                  "Meowscarada Night Slash Drifblim",
                  "Meowscarada Night Slash Polteageist",
                ],
              },
            ],
          },
        ],
        frags: { Excadrill: 1, Meowscarada: 1 },
      },
      {
        line: "Meowscarada Night Slash Drifblim",
        matchups: [
          {
            matchup: ["Drifblim", "Cresselia"],
            turns: [
              [
                { opponent: "{o:Drifblim} Calm Mind" },
                { player: "{p:Meowscarada} Night Slash {o:Drifblim} to {-:77}" },
                { opponent: "{o:Cresselia} Calm Mind" },
                { player: "{p:Incineroar} Snarl {o:Cresselia} to {-:121}" },
              ],
              [
                { opponent: "{o:Drifblim} Calm Mind" },
                { player: "{p:Meowscarada} Night Slash {o:Drifblim} to {=:0}" },
                { opponent: "{o:Drifblim} fainted" },
                { opponent: "{o:Cresselia} Calm Mind" },
                { player: "{p:Incineroar} Snarl {o:Cresselia} to {-:108}" },
              ],
            ],
          },
          {
            matchup: ["Polteageist", "Cresselia"],
            turns: [
              [
                { player: "{p:Meowscarada} Night Slash {o:Polteageist} to {=:0}" },
                { opponent: "{o:Polteageist} fainted" },
                { opponent: "{o:Cresselia} Calm Mind" },
                { player: "{p:Incineroar} Snarl {o:Cresselia} to {-:95}" },
              ],
            ],
            branches: [{ branches: ["Meowscarada Night Slash Cresselia"] }],
          },
        ],
        frags: { Meowscarada: 2 },
      },
      {
        line: "Meowscarada Night Slash Polteageist",
        matchups: [
          {
            matchup: ["Polteageist", "Cresselia"],
            turns: [
              [
                { player: "{p:Meowscarada} Night Slash {o:Polteageist} to {=:0}" },
                { opponent: "{o:Polteageist} fainted" },
                { opponent: "{o:Cresselia} Calm Mind" },
                { player: "{p:Incineroar} Snarl {o:Cresselia} to {-:121}" },
              ],
            ],
          },
          {
            matchup: ["Drifblim", "Cresselia"],
            turns: [
              [
                { opponent: "{o:Drifblim} Calm Mind" },
                { player: "{p:Meowscarada} Night Slash {o:Drifblim} to {-:77}" },
                { opponent: "{o:Cresselia} Calm Mind" },
                { player: "{p:Incineroar} Snarl {o:Cresselia} to {-:108}" },
              ],
              [
                { opponent: "{o:Drifblim} Calm Mind" },
                { player: "{p:Meowscarada} Night Slash {o:Drifblim} to {=:0}" },
                { opponent: "{o:Drifblim} fainted" },
                { opponent: "{o:Cresselia} Calm Mind" },
                { player: "{p:Incineroar} Snarl {o:Cresselia} to {-:95}" },
              ],
            ],
            branches: [{ branches: ["Meowscarada Night Slash Cresselia"] }],
          },
        ],
        frags: { Meowscarada: 2 },
      },
      {
        line: "Meowscarada Night Slash Cresselia",
        matchups: [
          {
            matchup: ["Cresselia"],
            turns: [
              [
                { player: "{p:Meowscarada} Night Slash {o:Cresselia} to {-:52}" },
                { opponent: "{o:Cresselia} Calm Mind" },
                { player: "{p:Incineroar} Snarl {o:Cresselia} to {-:39}" },
              ],
              [
                { player: "{p:Meowscarada} Night Slash {o:Cresselia} to {=:0}" },
                { opponent: "{o:Cresselia} fainted" },
              ],
            ],
          },
        ],
        frags: { Meowscarada: 1 },
      },
    ],
  },
};

const _box10 = getBox({
  box: _box9,
  update: {
    Meowscarada: {
      nature: "Impish",
      moves: ["Brick Break", "Knock Off", "Play Rough", "U-Turn"],
    },
    Golduck: {
      item: "Kasib Berry",
    },
  },
  team: ["Meowscarada", "Runerigus", "Golduck"],
});

export const pokemonTowerGhostBattle: Moment = {
  label: "Pokémon Tower Ghost Battle",
  kind: "battle",
  data: {
    playerBox: _box10,
    opponentBox: pokemonTowerGhostBox,
    lines: [
      {
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
    ],
  },
};

const _box11 = getBox({
  box: _box10,
  update: {
    "Arcanine-H": {
      nature: "Adamant",
      item: "Hard Stone",
      moves: ["Accelerock", "Flamethrower", "Flare Blitz", "Rock Slide"],
    },
    Clodsire: {
      nature: "Impish",
      item: "Hard Stone",
      moves: ["Bulldoze", "Rock Slide", "Rock Tomb", "Tail Whip"],
    },
    Meowscarada: {
      nature: "Adamant",
      item: "Metal Coat",
      moves: ["Cut", "Flower Trick", "Knock Off", "U-Turn"],
    },
    Tentacruel: {
      nature: "Calm",
      item: "Sitrus Berry",
      moves: ["Acid Spray", "Icy Wind", "Poison Jab", "Scald"],
    },
  },
  team: ["Arcanine-H", "Clodsire", "Meowscarada", "Tentacruel"],
});

export const pokemonTowerGrunt1Battle: Moment = {
  label: "Pokémon Tower Grunt 1 Battle",
  kind: "battle",
  data: {
    playerBox: _box11,
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
                { opponent: "{o:Overqwil} recoil to {-:171}" },
                { player: "{p:Clodsire} Rock Tomb {o:Overqwil} to {-:147}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Meowscarada}" },
                { opponent: "{o:Overqwil} Throat Chop {p:Meowscarada} to {+:74}" },
                { opponent: "{o:Overqwil} recoil to {-:129}" },
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

const _box12 = getBox({
  box: _box11,
  update: {
    Excadrill: {
      nature: "Adamant",
      item: "Hard Stone",
      moves: ["Brick Break", "Earthquake", "Iron Head", "Rock Slide"],
    },
    Golduck: {
      nature: "Naive",
      item: "Mystic Water",
      moves: ["Brick Break", "Flip Turn", "Ice Beam", "Psychic"],
    },
    Perrserker: {
      ability: "Battle Armor",
      item: "Chople Berry",
      moves: ["Fake Out", "Growl", "Metal Burst", "U-Turn"],
    },
    Meowscarada: {
      moves: ["Brick Break", "Cut", "Play Rough", "Thunder Punch"],
    },
  },
  team: ["Excadrill", "Golduck", "Perrserker", "Meowscarada"],
});

export const pokemonTowerGrunt2Battle: Moment = {
  label: "Pokémon Tower Grunt 2 Battle",
  kind: "battle",
  data: {
    playerBox: _box12,
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
                { opponent: "{o:Dragalge} heal to {-:93}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Dragalge} to {-:21}" },
                { opponent: "{o:Dragalge} Dragon Pulse {p:Meowscarada}" },
                { opponent: "{o:Dragalge} heal to {-:30}" },
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

const _box13 = getBox({
  box: _box12,
  update: {
    Meowscarada: {
      item: "Muscle Band",
      moves: ["Flower Trick", "Knock Off", "Low Kick", "Play Rough"],
    },
    Tentacruel: {
      nature: "Hasty",
      item: "Mystic Water",
      moves: ["Dazzling Gleam", "Flip Turn", "Icy Wind", "Sludge Wave"],
    },
    Lanturn: {
      nature: "Quiet",
      moves: ["Flip Turn", "Hydro Pump", "Thunderbolt", "Volt Switch"],
    },
  },
  team: ["Meowscarada", "Tentacruel", "Lanturn"],
});

export const pokemonTowerGrunt3Battle: Moment = {
  label: "Pokémon Tower Grunt 3 Battle",
  kind: "battle",
  data: {
    playerBox: _box13,
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
                branches: ["Lanturn Flip Turn Hydreigon", "Lanturn Flip Turn Magnezone"],
              },
            ],
          },
        ],
        frags: { Tentacruel: 1 },
      },
      {
        line: "Lanturn Flip Turn Hydreigon",
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
      },
      {
        line: "Lanturn Flip Turn Magnezone",
        matchups: [
          {
            matchup: ["Magnezone"],
            turns: [
              [
                { opponent: "{o:Magnezone} Hidden Power Fire {p:Lanturn} to {+:189}" },
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
  ability: "Torrent",
  moves: ["Growl", "Tackle"],
};

export const starterEgg2Encounter: Moment = {
  label: "Starter Egg 2 Encounter",
  kind: "encounter",
  data: { pokemon: _mudkip },
};

const _box14 = getBox({
  box: _box13,
  update: {
    Azumarill: {
      friend: true,
    },
  },
});

export const starterEgg2BoxChange: Moment = {
  label: "Starter Egg 2 Change",
  kind: "boxChange",
  data: { playerBox: _box14 },
};

const _box15 = getBox({
  box: _box14,
  update: {
    Excadrill: {
      nature: "Jolly",
      item: "Chople Berry",
      moves: ["Aerial Ace", "Bulldoze", "Iron Head", "Shadow Claw"],
    },
    Ceruledge: {
      nature: "Timid",
      item: "Leftovers",
      moves: ["Bitter Blade", "Shadow Claw", "Shadow Sneak", "Will-O-Wisp"],
    },
    Azumarill: {
      nature: "Brave",
      item: "Sitrus Berry",
      moves: ["Aqua Tail", "Knock Off", "Play Rough", "Return"],
    },
    Perrserker: {
      nature: "Brave",
      moves: ["Fake Out", "Dig", "Shadow Claw", "U-Turn"],
    },
    Meowscarada: {
      nature: "Jolly",
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
  label: "Saffron Dojo Leader Chuck Battle",
  kind: "battle",
  data: {
    playerBox: _box15,
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
                branches: ["Excadrill Bulldoze Zamazenta", "Excadrill Bulldoze Iron Crown"],
              },
            ],
          },
        ],
      },
      {
        line: "Excadrill Bulldoze Zamazenta",
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
                { player: "{p:Ceruledge} heal to {+:100}" },
              ],
              [
                { player: "{p:Ceruledge} Bitter Blade {o:Zamazenta-C} to {-:94}" },
                { player: "{p:Ceruledge} heal to {+:146}" },
                { opponent: "{o:Zamazenta-C} Wild Charge {p:Ceruledge} to {+:53}" },
                { opponent: "{o:Zamazenta-C} recoil to {-:86}" },
                { player: "{p:Ceruledge} heal to {+:63}" },
              ],
              [
                { player: "{p:Ceruledge} Bitter Blade {o:Zamazenta-C} to {=:0}" },
                { opponent: "{o:Zamazenta-C} fainted" },
                { player: "{p:Ceruledge} heal to {+:85}" },
              ],
            ],
            branches: [{ branches: ["Kommo-o Clangorous Soulblaze Azumarill"] }],
          },
        ],
        frags: { Ceruledge: 1 },
      },
      {
        line: "Excadrill Bulldoze Iron Crown",
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
                { player: "{p:Ceruledge} heal to {+:100}" },
              ],
              [
                { opponent: "{o:Zamazenta-C} Bulk Up" },
                { player: "{p:Ceruledge} Bitter Blade {o:Zamazenta-C} to {-:118}" },
                { player: "{p:Ceruledge} heal to {+:144}" },
              ],
              [
                { opponent: "{o:Zamazenta-C} Bulk Up" },
                { player: "{p:Ceruledge} Will-O-Wisp {o:Zamazenta-C}" },
                { opponent: "{o:Zamazenta-C} burn to {-:107}" },
                { player: "{p:Ceruledge} heal to {+:154}" },
              ],
              [
                { opponent: "{o:Zamazenta-C} Bulk Up" },
                { player: "{p:Ceruledge} Bitter Blade {o:Zamazenta-C} to {-:59}" },
                { player: "{p:Ceruledge} heal to {=:167}" },
                { opponent: "{o:Zamazenta-C} burn to {-:48}" },
              ],
              [
                { opponent: "{o:Zamazenta-C} Wild Charge {p:Ceruledge} to {+:53}" },
                { opponent: "{o:Zamazenta-C} recoil to {-:27}" },
                { player: "{p:Ceruledge} Bitter Blade {o:Zamazenta-C} to {=:0}" },
                { player: "{p:Ceruledge} heal to {+:63}" },
              ],
            ],
            branches: [{ branches: ["Kommo-o Clangorous Soulblaze Azumarill"] }],
          },
        ],
        frags: { Excadrill: 1, Ceruledge: 1 },
      },
      {
        line: "Kommo-o Clangorous Soulblaze Azumarill",
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
                branches: ["Annihilape Rage Fist Meowscarada", "Sneasler Poison Jab Drednaw"],
              },
            ],
          },
        ],
        frags: { Meowscarada: 1 },
      },
      {
        line: "Annihilape Rage Fist Meowscarada",
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
                if: ["Excadrill Bulldoze Zamazenta"],
                branches: ["Meowscarada Knock Off Iron Crown"],
              },
              {
                branches: ["Gallade Psycho Cut Meowscarada"],
              },
            ],
          },
        ],
        frags: { Meowscarada: 2 },
      },
      {
        line: "Sneasler Poison Jab Drednaw",
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
                if: ["Excadrill Bulldoze Zamazenta"],
                branches: ["Meowscarada Knock Off Iron Crown"],
              },
              {
                branches: ["Gallade Psycho Cut Meowscarada"],
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
                { opponent: "{o:Iron Crown} fainted" },
                { player: "{p:Meowscarada} Rocky Helmet to {+:98}" },
              ],
            ],
          },
          {
            matchup: ["Gallade-Mega"],
            turns: [
              [
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
        line: "Gallade Psycho Cut Meowscarada",
        matchups: [
          {
            matchup: ["Gallade-Mega"],
            turns: [
              [
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

const _box16 = getBox({
  box: _box15,
  update: {
    Cloyster: {
      friend: true,
    },
  },
});

export const saffronDojoLeaderChuckBoxChange: Moment = {
  label: "Saffron Dojo Leader Chuck Box Change",
  kind: "boxChange",
  data: { playerBox: _box16 },
};

const _box17 = getBox({
  box: _box16,
  update: {
    Meowscarada: {
      nature: "Brave",
      item: "Expert Belt",
    },
    Jellicent: {
      moves: ["Brine", "Hex", "Ice Beam", "Water Spout"],
    },
    Cloyster: {
      nature: "Impish",
      ability: "Skill Link",
      item: "Never-Melt Ice",
      moves: ["Ice Shard", "Icicle Crash", "Icicle Spear", "Return"],
    },
    Drednaw: {
      item: "Shuca Berry",
      moves: ["Bulldoze", "Dig", "Flip Turn", "Jaw Lock"],
    },
    Runerigus: {
      nature: "Adamant",
      moves: ["Earthquake", "Rock Tomb", "Shadow Ball", "Shadow Sneak"],
    },
  },
  team: ["Meowscarada", "Jellicent", "Cloyster", "Drednaw", "Arcanine-H", "Runerigus"],
});

export const silphCoRivalBattle: Moment = {
  label: "Silph Co. Rival Battle",
  kind: "battle",
  data: {
    playerBox: _box17,
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

const _box18 = getBox({
  box: _box17,
  update: {
    Jellicent: {
      level: 56,
    },
  },
});

export const silphCoRivalBoxChange: Moment = {
  label: "Silph Co. Rival Box Change",
  kind: "boxChange",
  data: { playerBox: _box18 },
};

const _box19 = getBox({
  box: _box18,
  update: {
    Jellicent: {
      nature: "Modest",
      item: "Mystic Water",
      moves: ["Brine", "Recover", "Scald", "Water Spout"],
    },
    Meowscarada: {
      nature: "Jolly",
      moves: ["Brick Break", "Quick Attack", "Shadow Claw", "U-Turn"],
    },
    Tentacruel: {
      nature: "Sassy",
      item: "Black Sludge",
    },
  },
  team: ["Jellicent", "Meowscarada", "Tentacruel"],
});

export const silphCoArianaArcherBattle: Moment = {
  label: "Silph Co. Ariana & Archer Battle",
  kind: "battle",
  data: {
    playerBox: _box19,
    opponentBox: silphCoArianaArcherBox,
    partnerBox: pokemonTrainerBrendanBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Incineroar", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Incineroar} Fake Out {o:Masquerain} to {-:119}" },
                { opponent: "{o:Articuno-G} Psychic {o:Masquerain} to {=:0}" },
                { opponent: "{o:Masquerain} fainted" },
                { player: "{p:Jellicent} Scald {o:Incineroar} to {=:0}" },
                { opponent: "{o:Incineroar} fainted" },
              ],
            ],
            branches: [{ branches: ["Matchup Primarina Articuno-G"] }],
          },
        ],
        frags: { Jellicent: 1 },
      },
      {
        line: "Matchup Primarina Articuno-G",
        matchups: [
          {
            matchup: ["Primarina", "Articuno-G"],
            turns: [],
            branches: [
              {
                branches: [
                  "Sceptile-Mega Mega Drain Primarina",
                  "Sceptile-Mega Mega Drain Primarina (crit)",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "Sceptile-Mega Mega Drain Primarina",
        matchups: [
          {
            matchup: ["Primarina", "Articuno-G"],
            turns: [],
            branches: [
              {
                branches: [
                  "Articuno-G Psychic Sceptile-Mega",
                  "Articuno-G Psychic Sceptile-Mega (to 0)",
                ],
                default: "Articuno-G Psychic Sceptile-Mega (to 0)",
              },
            ],
          },
        ],
      },
      {
        line: "Sceptile-Mega Mega Drain Primarina (crit)",
        matchups: [
          {
            matchup: ["Primarina", "Articuno-G"],
            turns: [],
            branches: [
              {
                branches: [
                  "Articuno-G Psychic Sceptile-Mega",
                  "Articuno-G Psychic Sceptile-Mega (to 0)",
                ],
                default: "Articuno-G Psychic Sceptile-Mega (to 0)",
              },
            ],
          },
        ],
      },
      {
        line: "Articuno-G Psychic Sceptile-Mega (to 0)",
        if: ["Sceptile-Mega Mega Drain Primarina"],
        matchups: [
          {
            matchup: ["Primarina", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Sceptile-Mega} Mega Drain {o:Primarina} to {-:52}" },
                { opponent: "{o:Articuno-G} Psychic {o:Sceptile-Mega} to {=:0}" },
                { opponent: "{o:Sceptile-Mega} fainted" },
                { player: "{p:Jellicent} Brine {o:Primarina} to {=:0}" },
                { opponent: "{o:Primarina} fainted" },
              ],
            ],
          },
          {
            matchup: ["Mawile", "Articuno-G"],
            turns: [],
            branches: [
              {
                branches: [
                  "Articuno-G Focus Blast Exploud",
                  "Articuno-G Focus Blast Exploud (miss)",
                ],
              },
            ],
          },
        ],
        frags: { Jellicent: 1 },
      },
      {
        line: "Articuno-G Focus Blast Exploud",
        if: ["Sceptile-Mega Mega Drain Primarina"],
        matchups: [
          {
            matchup: ["Mawile", "Articuno-G"],
            turns: [],
            branches: [
              {
                branches: [
                  "Jellicent Water Spout Articuno-G",
                  "Jellicent Water Spout Articuno-G (crit)",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "Jellicent Water Spout Articuno-G",
        matchups: [
          {
            matchup: ["Mawile", "Articuno-G"],
            turns: [
              [
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
                branches: ["Gholdengo Shadow Ball Meowscarada", "Houndoom Fiery Wrath Meowscarada"],
              },
            ],
          },
        ],
        frags: { Jellicent: 1, Meowscarada: 1 },
      },
      {
        line: "Gholdengo Shadow Ball Meowscarada",
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
            matchup: ["Houndoom"],
            turns: [
              [
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
        line: "Houndoom Fiery Wrath Meowscarada",
        matchups: [
          {
            matchup: ["Houndoom"],
            turns: [
              [
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
                { player: "{p:Tentacruel} heal to {+:95}" },
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
        line: "Jellicent Water Spout Articuno-G (crit)",
        matchups: [
          {
            matchup: ["Mawile", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Articuno-G} Focus Blast {o:Exploud} to {=:0}" },
                { opponent: "{o:Exploud} fainted" },
                {
                  player:
                    "{p:Jellicent} crit Water Spout {o:Mawile-Mega} to {=:0} and {o:Articuno-G} to {=:0}",
                },
                { opponent: "{o:Articuno-G} fainted" },
                { opponent: "{o:Mawile-Mega} fainted" },
              ],
            ],
            branches: [{ branches: ["Gholdengo Shadow Ball Tentacruel 1"] }],
          },
        ],
        frags: { Jellicent: 2 },
      },
      {
        line: "Articuno-G Focus Blast Exploud (miss)",
        if: ["Sceptile-Mega Mega Drain Primarina"],
        matchups: [
          {
            matchup: ["Mawile", "Articuno-G"],
            turns: [
              [
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
            branches: [{ branches: ["Gholdengo Shadow Ball Tentacruel 2"] }],
          },
        ],
        frags: { Jellicent: 2 },
      },
      {
        line: "Articuno-G Psychic Sceptile-Mega",
        if: ["Sceptile-Mega Mega Drain Primarina"],
        matchups: [
          {
            matchup: ["Primarina", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Sceptile-Mega} Mega Drain {o:Primarina} to {-:52}" },
                { opponent: "{o:Articuno-G} Psychic {o:Sceptile-Mega} to {+:1}" },
                { player: "{p:Jellicent} Brine {o:Primarina} to {=:0}" },
                { opponent: "{o:Primarina} fainted" },
              ],
            ],
            branches: [
              {
                branches: [
                  "Sceptile-Mega Dragon Breath Articuno-G",
                  "Sceptile-Mega Dragon Breath Articuno-G (paralyze)",
                ],
              },
            ],
          },
        ],
        frags: { Jellicent: 1 },
      },
      {
        line: "Sceptile-Mega Dragon Breath Articuno-G",
        if: ["Sceptile-Mega Mega Drain Primarina"],
        matchups: [
          {
            matchup: ["Mawile", "Articuno-G"],
            turns: [
              [
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
            branches: [{ branches: ["Gholdengo Shadow Ball Tentacruel 2"] }],
          },
        ],
        frags: { Jellicent: 2 },
      },
      {
        line: "Sceptile-Mega Dragon Breath Articuno-G (paralyze)",
        if: ["Sceptile-Mega Mega Drain Primarina"],
        matchups: [
          {
            matchup: ["Mawile", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Sceptile-Mega} Dragon Breath {o:Articuno-G} to {-:121}" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Mawile-Mega} to {=:0} and {o:Articuno-G} to {=:0}",
                },
                { opponent: "{o:Articuno-G} fainted" },
                { opponent: "{o:Mawile-Mega} fainted" },
              ],
            ],
            branches: [{ branches: ["Gholdengo Make It Rain Tentacruel"] }],
          },
        ],
        frags: { Jellicent: 2 },
      },
      {
        line: "Articuno-G Psychic Sceptile-Mega (to 0)",
        if: ["Sceptile-Mega Mega Drain Primarina (crit)"],
        matchups: [
          {
            matchup: ["Primarina", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Sceptile-Mega} crit Mega Drain {o:Primarina} to {=:0}" },
                { opponent: "{o:Primarina} fainted" },
                { opponent: "{o:Articuno-G} Psychic {o:Sceptile-Mega} to {=:0}" },
                { opponent: "{o:Sceptile-Mega} fainted" },
                { player: "{p:Jellicent} Brine {o:Articuno-G} to {-:97}" },
              ],
            ],
            branches: [
              {
                branches: [
                  "Articuno-G Focus Blast Exploud",
                  "Articuno-G Focus Blast Exploud (miss)",
                ],
              },
            ],
          },
        ],
        frags: { Jellicent: 1 },
      },
      {
        line: "Articuno-G Focus Blast Exploud",
        if: ["Sceptile-Mega Mega Drain Primarina (crit)"],
        matchups: [
          {
            matchup: ["Mawile", "Articuno-G"],
            turns: [
              [
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
            branches: [{ branches: ["Gholdengo Shadow Ball Tentacruel 1"] }],
          },
        ],
        frags: { Jellicent: 2 },
      },
      {
        line: "Articuno-G Focus Blast Exploud (miss)",
        if: ["Sceptile-Mega Mega Drain Primarina (crit)"],
        matchups: [
          {
            matchup: ["Mawile", "Articuno-G"],
            turns: [
              [
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
            branches: [{ branches: ["Gholdengo Shadow Ball Tentacruel 2"] }],
          },
        ],
        frags: { Jellicent: 2 },
      },
      {
        line: "Articuno-G Psychic Sceptile-Mega",
        if: ["Sceptile-Mega Mega Drain Primarina (crit)"],
        matchups: [
          {
            matchup: ["Primarina", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Sceptile-Mega} crit Mega Drain {o:Primarina} to {=:0}" },
                { opponent: "{o:Primarina} fainted" },
                { opponent: "{o:Articuno-G} Psychic {o:Sceptile-Mega} to {+:1}" },
                { player: "{p:Jellicent} Brine {o:Articuno-G} to {-:97}" },
              ],
            ],
            branches: [
              {
                branches: [
                  "Sceptile-Mega Dragon Breath Articuno-G",
                  "Sceptile-Mega Dragon Breath Articuno-G (paralyze)",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "Sceptile-Mega Dragon Breath Articuno-G",
        if: ["Sceptile-Mega Mega Drain Primarina (crit)"],
        matchups: [
          {
            matchup: ["Mawile", "Articuno-G"],
            turns: [
              [
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
            branches: [{ branches: ["Gholdengo Shadow Ball Tentacruel 2"] }],
          },
        ],
        frags: { Jellicent: 2 },
      },
      {
        line: "Sceptile-Mega Dragon Breath Articuno-G (paralyze)",
        if: ["Sceptile-Mega Mega Drain Primarina (crit)"],
        matchups: [
          {
            matchup: ["Mawile", "Articuno-G"],
            turns: [
              [
                { opponent: "{o:Sceptile-Mega} Dragon Breath {o:Articuno-G} to {-:37}" },
                {
                  player:
                    "{p:Jellicent} Water Spout {o:Mawile-Mega} to {=:0} and {o:Articuno-G} to {=:0}",
                },
                { opponent: "{o:Articuno-G} fainted" },
                { opponent: "{o:Mawile-Mega} fainted" },
              ],
            ],
            branches: [{ branches: ["Gholdengo Make It Rain Tentacruel"] }],
          },
        ],
        frags: { Jellicent: 2 },
      },
      {
        line: "Gholdengo Shadow Ball Tentacruel 1",
        matchups: [
          {
            matchup: ["Gholdengo"],
            turns: [
              [
                { player: "{p:Jellicent} switch to {p:Tentacruel}" },
                { opponent: "{o:Gholdengo} Shadow Ball {p:Tentacruel} to {+:85}" },
                { player: "{p:Tentacruel} heal to {+:95}" },
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
            matchup: ["Houndoom"],
            turns: [
              [
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
        line: "Gholdengo Shadow Ball Tentacruel 2",
        matchups: [
          {
            matchup: ["Gholdengo"],
            turns: [
              [
                { player: "{p:Jellicent} switch to {p:Tentacruel}" },
                { opponent: "{o:Gholdengo} Shadow Ball {p:Tentacruel} to {+:85}" },
                { opponent: "{o:Exploud} Flamethrower {o:Gholdengo} to {-:101}" },
                { player: "{p:Tentacruel} heal to {+:95}" },
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
                { player: "{p:Tentacruel} heal to {+:57}" },
              ],
            ],
          },
          {
            matchup: ["Houndoom"],
            turns: [
              [
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
        line: "Gholdengo Make It Rain Tentacruel",
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
                { player: "{p:Tentacruel} heal to {+:134}" },
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
            matchup: ["Houndoom"],
            turns: [
              [
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

export const box = _box19;

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
];
