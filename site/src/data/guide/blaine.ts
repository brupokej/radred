import { getBox, type Box } from "@site/src/utils/box";
import type { Moment } from "@site/src/utils/moments";
import {
  cinnabarGymAceTrainerDerekBox,
  cinnabarGymAceTrainerLucyBox,
  cinnabarGymAceTrainerZacBox,
  cinnabarGymLeaderBlaineBox,
  cinnabarIslandMayBox,
  cinnabarLabLeaderJasmineBox,
  lavenderTownLeaderMortyBox,
  pokemonMansionBurglarLewisBox,
  seafoamIslandsLeaderPryceJynxBox,
  seafoamIslandsLeaderPryceSandslashABox,
} from "@site/src/utils/opponents";

import { box as _box1 } from "@site/src/data/guide/koga";

const _box2 = getBox({
  box: _box1,
  update: {
    Perrserker: {
      level: 73
    },
    Infernape: {
      level: 73
    }
  },
});

export const blaineBoxChange: Moment = {
  split: "Blaine",
  label: "Blaine Box Change",
  kind: "boxChange",
  data: { playerBox: _box2 },
};

const _darmanitanG = {
  name: "Darmanitan-G",
  spriteKey: "darmanitan-galar",
  nature: "Gorilla Tactics",
  level: "62-64",
  moves: ["Blizzard", "Superpower", "Thrash", "Uproar"],
};

const _box3 = getBox({
  box: _box2,
  add: [_darmanitanG],
  update: {
    Infernape: {
      nature: "Adamant",
      ability: "Iron Fist",
      item: "Life Orb",
      moves: ["Fake Out", "Close Combat", "Flare Blitz", "Thunder Punch"],
    },
    Perrserker: {
      nature: "Adamant",
      ability: "Battle Armor",
      item: "Shuca Berry",
      moves: ["Fake Out", "Bullet Punch", "Shadow Claw", "U-Turn"],
    },
  },
  team: ["Infernape", "Perrserker"],
});

export const seafoamIslandsEncounter: Moment = {
  split: "Blaine",
  label: "Seafoam Islands Encounter",
  kind: "encounter",
  data: { pokemon: _darmanitanG, playerBox: _box3, showPlayerTeam: true },
};

const _zapdos = {
  name: "Zapdos",
  ability: "Pressure",
  level: 70,
  moves: ["Ancient Power", "Charge", "Discharge", "Light Screen"],
};

const _box4 = getBox({ box: _box3, add: [_zapdos] });

export const powerPlantEncounter: Moment = {
  split: "Blaine",
  label: "Power Plant Encounter",
  kind: "encounter",
  data: { pokemon: _zapdos, playerBox: _box4 },
};

const _box5 = getBox({
  box: _box4,
  cap: 73,
});

export const powerPlantBoxChange: Moment = {
  split: "Blaine",
  label: "Power Plant Box Change",
  kind: "boxChange",
  data: { playerBox: _box5 },
};

const _box6 = getBox({
  box: _box5,
  update: {
    Perrserker: {
      nature: "Adamant",
      ability: "Battle Armor",
      item: undefined,
      moves: ["Fake Out", "Bullet Punch", "Shadow Claw", "U-Turn"],
    },
    Meowscarada: {
      nature: "Naughty",
      ability: "Protean",
      item: "Expert Belt",
      moves: ["Flower Trick", "Knock Off", "Shadow Claw", "Sucker Punch"],
    },
    Drednaw: {
      nature: "Adamant",
      ability: "Shell Armor",
      item: "Chople Berry",
      moves: ["Bulldoze", "Flip Turn", "Ice Fang", "Liquidation"],
    }
  },
  team: ["Perrserker", "Meowscarada", "Drednaw"],
});

export const lavenderTownLeaderMortyBattle: Moment = {
  split: "Blaine",
  label: "Lavender Town Leader Morty Battle",
  kind: "battle",
  data: {
    playerBox: _box6,
    opponentBox: lavenderTownLeaderMortyBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Krookodile"],
            turns: [
              [
                { opponent: "{o:Krookodile} Stealth Rock" },
                { player: "{p:Perrserker} U-Turn {o:Krookodile} to {-:172}" },
                { player: "{p:Perrserker} switch to {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} Stealth Rock to {=:189}" },
              ],
              [
                { player: "{p:Meowscarada} Flower Trick {o:Krookodile} to {=:0}" },
                { opponent: "{o:Krookodile} fainted" },
              ],
            ],
          },
          {
            matchup: ["Weavile"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Perrserker}" },
                { opponent: "{p:Perrserker} Stealth Rock to {=:223}" },
                { opponent: "{o:Weavile} Triple Axel {p:Perrserker} to {+:135}" },
                { opponent: "{o:Weavile} Life Orb to {-:207}" },
              ],
              [
                { player: "{p:Perrserker} Fake Out {o:Weavile} to {-:171}" },
                { opponent: "{o:Weavile} flinched" },
              ],
            ],
            branches: [
              {
                branches: [
                  "14% → Perrserker U-Turn Weavile",
                  "86% → Perrserker U-Turn Weavile (to 0)",
                ],
                default: "86% → Perrserker U-Turn Weavile (to 0)",
              },
            ],
          }
        ],
        frags: { Meowscarada: 1 },
      },
      {
        line: "14% → Perrserker U-Turn Weavile",
        matchups: [
          {
            matchup: ["Weavile"],
            turns: [
              [
                { opponent: "{o:Weavile} Low Kick {p:Perrserker} to {+:18}" },
                { opponent: "{o:Weavile} Life Orb to {-:151}" },
                { player: "{p:Perrserker} U-Turn {o:Weavile} to {-:25}" },
                { player: "{p:Perrserker} switch to {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} Stealth Rock to {=:162}" },
              ],
              [
                { player: "{p:Meowscarada} Sucker Punch {o:Weavile} to {=:0}" },
                { opponent: "{o:Weavile} fainted" },
              ],
            ],
            branches: [{ branches: ["Meowscarada Knock Off Dusknoir"] }],
          },
        ],
        frags: { Meowscarada: 1 },
      },
      {
        line: "86% → Perrserker U-Turn Weavile (to 0)",
        matchups: [
          {
            matchup: ["Weavile"],
            turns: [
              [
                { opponent: "{o:Weavile} Low Kick {p:Perrserker} to {+:18}" },
                { opponent: "{o:Weavile} Life Orb to {-:151}" },
                { player: "{p:Perrserker} U-Turn {o:Weavile} to {=:0}" },
                { player: "{p:Perrserker} switch to {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} Stealth Rock to {=:162}" },
              ],
            ],
            branches: [{ branches: ["Meowscarada Knock Off Dusknoir"] }],
          },
        ],
        frags: { Perrserker: 1 },
      },
      {
        line: "Meowscarada Knock Off Dusknoir",
        matchups: [
          {
            matchup: ["Dusknoir"],
            turns: [
              [
                { player: "{p:Meowscarada} Knock Off {o:Dusknoir} to {=:0}" },
                { opponent: "{o:Dusknoir} fainted" },
              ],
            ],
          },
          {
            matchup: ["Mismagius"],
            turns: [
              [
                { player: "{p:Meowscarada} Shadow Claw {o:Mismagius} to {=:0}" },
                { opponent: "{o:Mismagius} fainted" },
              ],
            ],
          },
          {
            matchup: ["Ceruledge"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Drednaw}" },
                { opponent: "{p:Drednaw} Stealth Rock to {=:208}" },
                { opponent: "{o:Ceruledge} Bitter Blade {p:Drednaw} to {+:166}" },
              ],
              [
                { opponent: "{o:Ceruledge} Swords Dance" },
                { player: "{p:Drednaw} Flip Turn {o:Ceruledge} to {-:71}" },
                { player: "{p:Drednaw} switch to {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} Stealth Rock to {=:135}" },
              ],
              [
                { player: "{p:Meowscarada} Shadow Claw {o:Ceruledge} to {=:0}" },
                { opponent: "{o:Ceruledge} fainted" },
              ],
            ],
          },
          {
            matchup: ["Gengar-Mega"],
            turns: [
              [
                { opponent: "{o:Gengar-Mega} mega evolve" },
                { player: "{p:Meowscarada} Sucker Punch {o:Gengar-Mega} to {=:0}" },
                { opponent: "{o:Gengar-Mega} fainted" },
              ],
            ],
          },
        ],
        frags: { Meowscarada: 4 },
      },
    ],
  },
};

const _box7 = getBox({
  box: _box6,
  update: {
    Sceptile: {
      item: undefined,
    },
    Infernape: {
      nature: "Rash",
      ability: "Iron Fist",
      item: "Focus Sash",
      moves: ["Fake Out", "Flamethrower", "U-Turn", "Vacuum Wave"],
    },
    Perrserker: {
      nature: "Relaxed",
      ability: "Battle Armor",
      item: undefined,
      moves: ["Iron Head", "Metal Burst", "Thunder", "U-Turn"],
    },
    Incineroar: {
      nature: "Naughty",
      ability: "Intimidate",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Scary Face", "U-Turn", "Will-O-Wisp"],
    },
    Meowscarada: {
      nature: "Naughty",
      ability: "Protean",
      item: "Life Orb",
      moves: ["Aura Sphere", "Cut", "Knock Off", "Low Kick"]
    },
    Drednaw: {
      nature: "Adamant",
      ability: "Shell Armor",
      item: "Shuca Berry",
      moves: ["Bulldoze", "Flip Turn", "Ice Fang", "Stone Edge"],
    },
    Tentacruel: {
      nature: "Calm",
      ability: "Clear Body",
      item: "Cheri Berry",
      moves: ["Acid Spray", "Flip Turn", "Hydro Pump", "Sludge Wave"],
    }
  },
  team: ["Infernape", "Perrserker", "Incineroar", "Meowscarada", "Drednaw", "Tentacruel"],
});

export const seafoamIslandsLeaderPryceBattle: Moment = {
  split: "Blaine",
  label: "Seafoam Islands Leader Pryce Battle",
  kind: "switchBattle",
  data: {
    cases: [
      {
        label: "50% → Jynx matchup",
        data: {
          playerBox: _box7,
          opponentBox: seafoamIslandsLeaderPryceJynxBox,
          lines: [
            {
              matchups: [
                {
                  matchup: ["Jynx"],
                  turns: [
                    [
                      { player: "{p:Infernape} Fake Out {o:Jynx} to {-:173}" },
                      { opponent: "{o:Jynx} flinched" },
                    ],
                    [
                      { player: "{p:Infernape} Flamethrower {o:Jynx} to {=:0}" },
                      { opponent: "{o:Jynx} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Arctozolt"],
                  turns: [
                    [
                      { opponent: "{o:Arctozolt} Bolt Beak {p:Infernape} to {=:1}" },
                      { opponent: "{o:Arctozolt} Life Orb to {=:214}" },
                      { player: "{p:Infernape} U-Turn {o:Arctozolt} to {-:181}" },
                      { player: "{p:Infernape} switch to {p:Perrserker}" },
                    ],
                    [
                      { opponent: "{o:Arctozolt} Bolt Beak {p:Perrserker} to {+:29}" },
                      { opponent: "{o:Arctozolt} Life Orb to {-:158}" },
                      { player: "{p:Perrserker} Metal Burst {o:Arctozolt} to {=:0}" },
                      { opponent: "{o:Arctozolt} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Kyurem-B"],
                  turns: [
                    [
                      { player: "{p:Perrserker} switch to {p:Incineroar}" },
                      { opponent: "{o:Kyurem-B} Fusion Bolt {p:Incineroar} to {+:81}" },
                      { opponent: "{p:Incineroar} Sitrus Berry to {+:142}" },
                    ],
                    [
                      { player: "{p:Incineroar} Fake Out {o:Kyurem-B} to {-:270}" },
                      { opponent: "{o:Kyurem-B} flinched" },
                    ],
                    [
                      { opponent: "{o:Kyurem-B} Dragon Dance" },
                      { player: "{p:Incineroar} Will-O-Wisp {o:Kyurem-B}" },
                      { opponent: "{o:Kyurem-B} burn to {-:252}" },
                    ],
                    [
                      { opponent: "{o:Kyurem-B} Dragon Dance" },
                      { player: "{p:Incineroar} Scary Face {o:Kyurem-B}" },
                      { opponent: "{o:Kyurem-B} burn to {-:234}" },
                    ],
                    [
                      { opponent: "{o:Kyurem-B} Dragon Dance" },
                      { player: "{p:Incineroar} Scary Face {o:Kyurem-B}" },
                      { opponent: "{o:Kyurem-B} burn to {-:216}" },
                    ],
                    [
                      { opponent: "{o:Kyurem-B} Dragon Dance" },
                      { player: "{p:Incineroar} U-Turn {o:Kyurem-B} to {-:185}" },
                      { player: "{p:Incineroar} switch to {p:Meowscarada}" },
                      { opponent: "{o:Kyurem-B} burn to {-:167}" },
                    ],
                    [
                      { player: "{p:Meowscarada} Low Kick {o:Kyurem-B} to {=:0}" },
                      { opponent: "{p:Meowscarada} Life Orb to {=:195}" },
                      { opponent: "{o:Kyurem-B} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Glalie-Mega"],
                  turns: [
                    [
                      { player: "{p:Meowscarada} switch to {p:Drednaw}" },
                      { opponent: "{o:Glalie-Mega} mega evolve" },
                      { opponent: "{o:Glalie-Mega} Double-Edge {p:Drednaw} to {+:142}" },
                      { opponent: "{o:Glalie-Mega} recoil to {-:222}" },
                    ],
                    [
                      { opponent: "{o:Glalie-Mega} Double-Edge {p:Drednaw} to {+:47}" },
                      { opponent: "{o:Glalie-Mega} recoil to {-:196}" },
                      { player: "{p:Drednaw} Flip Turn {o:Glalie-Mega} to {-:148}" },
                      { player: "{p:Drednaw} switch to {p:Meowscarada}" },
                    ],
                    [
                      { player: "{p:Meowscarada} Low Kick {o:Glalie-Mega} to {=:0}" },
                      { opponent: "{p:Meowscarada} Life Orb to {=:174}" },
                      { opponent: "{o:Glalie-Mega} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Cloyster"],
                  turns: [
                    [
                      { player: "{p:Meowscarada} Aura Sphere {o:Cloyster} to {=:0}" },
                      { opponent: "{p:Meowscarada} Life Orb to {=:153}" },
                      { opponent: "{o:Cloyster} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Clefable"],
                  turns: [
                    [
                      { player: "{p:Meowscarada} switch to {p:Tentacruel}" },
                      { opponent: "{o:Clefable} Light of Ruin {p:Tentacruel} to {+:117}" },
                    ],
                    [
                      { player: "{p:Tentacruel} Sludge Wave {o:Clefable} to {-:92}" },
                      { opponent: "{o:Clefable} Light of Ruin {p:Tentacruel} to {+:12}" },
                    ],
                    [
                      { player: "{p:Tentacruel} Sludge Wave {o:Clefable} to {=:0}" },
                      { opponent: "{o:Clefable} fainted" },
                    ],
                  ],
                },
              ],
              frags: { Infernape: 1, Perrserker: 1, Meowscarada: 3, Tentacruel: 1 }
            },
          ],
        },
      },
      {
        label: "50% → Sandslash-A matchup",
        data: {
          playerBox: _box7,
          opponentBox: seafoamIslandsLeaderPryceSandslashABox,
          lines: [
            {
              matchups: [
                {
                  matchup: ["Sandslash-A"],
                  turns: [
                    [
                      { player: "{p:Infernape} Fake Out {o:Sandslash-A} to {-:208}" },
                      { opponent: "{o:Sandslash-A} flinched" },
                    ],
                    [
                      { player: "{p:Infernape} Vacuum Wave {o:Sandslash-A} to {=:0}" },
                      { opponent: "{o:Sandslash-A} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Arctovish"],
                  turns: [
                    [
                      { opponent: "{o:Arctovish} Fishious Rend {p:Infernape} to {=:1}" },
                      { opponent: "{o:Arctovish} Life Orb to {=:214}" },
                      { player: "{p:Infernape} U-Turn {o:Arctovish} to {-:186}" },
                      { player: "{p:Infernape} switch to {p:Perrserker}" },
                    ],
                    [
                      { opponent: "{o:Arctovish} Fishious Rend {p:Perrserker} to {+:46}" },
                      { opponent: "{o:Arctovish} Life Orb to {-:163}" },
                      { player: "{p:Perrserker} Metal Burst {o:Arctovish} to {=:0}" },
                      { opponent: "{o:Arctovish} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Kyurem-B"],
                  turns: [
                    [
                      { player: "{p:Perrserker} switch to {p:Incineroar}" },
                      { opponent: "{o:Kyurem-B} Fusion Bolt {p:Incineroar} to {+:81}" },
                      { opponent: "{p:Incineroar} Sitrus Berry to {+:142}" },
                    ],
                    [
                      { player: "{p:Incineroar} Fake Out {o:Kyurem-B} to {-:270}" },
                      { opponent: "{o:Kyurem-B} flinched" },
                    ],
                    [
                      { opponent: "{o:Kyurem-B} Dragon Dance" },
                      { player: "{p:Incineroar} Will-O-Wisp {o:Kyurem-B}" },
                      { opponent: "{o:Kyurem-B} burn to {-:252}" },
                    ],
                    [
                      { opponent: "{o:Kyurem-B} Dragon Dance" },
                      { player: "{p:Incineroar} Scary Face {o:Kyurem-B}" },
                      { opponent: "{o:Kyurem-B} burn to {-:234}" },
                    ],
                    [
                      { opponent: "{o:Kyurem-B} Dragon Dance" },
                      { player: "{p:Incineroar} Scary Face {o:Kyurem-B}" },
                      { opponent: "{o:Kyurem-B} burn to {-:216}" },
                    ],
                    [
                      { opponent: "{o:Kyurem-B} Dragon Dance" },
                      { player: "{p:Incineroar} U-Turn {o:Kyurem-B} to {-:185}" },
                      { player: "{p:Incineroar} switch to {p:Meowscarada}" },
                      { opponent: "{o:Kyurem-B} burn to {-:167}" },
                    ],
                    [
                      { player: "{p:Meowscarada} Low Kick {o:Kyurem-B} to {=:0}" },
                      { opponent: "{p:Meowscarada} Life Orb to {=:195}" },
                      { opponent: "{o:Kyurem-B} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Glalie-Mega"],
                  turns: [
                    [
                      { player: "{p:Meowscarada} switch to {p:Drednaw}" },
                      { opponent: "{o:Glalie-Mega} mega evolve" },
                      { opponent: "{o:Glalie-Mega} Double-Edge {p:Drednaw} to {+:142}" },
                      { opponent: "{o:Glalie-Mega} recoil to {-:222}" },
                    ],
                    [
                      { opponent: "{o:Glalie-Mega} Double-Edge {p:Drednaw} to {+:47}" },
                      { opponent: "{o:Glalie-Mega} recoil to {-:196}" },
                      { player: "{p:Drednaw} Flip Turn {o:Glalie-Mega} to {-:148}" },
                      { player: "{p:Drednaw} switch to {p:Meowscarada}" },
                    ],
                    [
                      { player: "{p:Meowscarada} Low Kick {o:Glalie-Mega} to {=:0}" },
                      { opponent: "{p:Meowscarada} Life Orb to {=:174}" },
                      { opponent: "{o:Glalie-Mega} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Reuniclus"],
                  turns: [
                    [
                      { player: "{p:Meowscarada} Knock Off {o:Reuniclus} to {=:0}" },
                      { opponent: "{p:Meowscarada} Life Orb to {=:153}" },
                      { opponent: "{o:Reuniclus} fainted" },
                    ],
                  ],
                },
                {
                  matchup: ["Clefable"],
                  turns: [
                    [
                      { player: "{p:Meowscarada} switch to {p:Tentacruel}" },
                      { opponent: "{o:Clefable} Light of Ruin {p:Tentacruel} to {+:117}" },
                    ],
                    [
                      { player: "{p:Tentacruel} Sludge Wave {o:Clefable} to {-:92}" },
                      { opponent: "{o:Clefable} Light of Ruin {p:Tentacruel} to {+:12}" },
                    ],
                    [
                      { player: "{p:Tentacruel} Sludge Wave {o:Clefable} to {=:0}" },
                      { opponent: "{o:Clefable} fainted" },
                    ],
                  ],
                },
              ],
              frags: { Infernape: 1, Perrserker: 1, Meowscarada: 3, Tentacruel: 1 }
            },
          ]
        },
      },
    ],
  },
};

const _box8 = getBox({
  box: _box7,
  update: {
    "Darmanitan-G": {
      name: "Darmanitan-GZ",
      spriteKey: "darmanitan-galar-zen",
    }
  },
});

const _box9 = getBox({
  box: _box8,
  update: {
    Infernape: {
      item: undefined,
    },
    "Darmanitan-GZ": {
      nature: "Adamant",
      ability: "Zen Mode",
      item: "Expert Belt",
      moves: ["Earthquake", "Flare Blitz", "Icicle Crash", "Superpower"]
    },
    Lanturn: {
      nature: "Quiet",
      ability: "Volt Absorb",
      item: "Mystic Water",
      moves: ["Hydro Pump", "Ice Beam", "Surf", "Volt Switch"]
    },
    Golisopod: {
      nature: "Adamant",
      ability: "Emergency Exit",
      item: "Charti Berry",
      moves: ["First Impress.", "Liquidation", "Poison Jab", "Pounce"],
    },
    Zapdos: {
      nature: "Rash",
      ability: "Pressure",
      item: "Magnet",
      moves: ["Ancient Power", "Bolt Beak", "Discharge", "Volt Switch"],
    },
    Meowscarada: {
      nature: "Lonely",
      ability: "Protean",
      item: "Focus Sash",
      moves: ["Aura Sphere", "Foul Play", "Knock Off", "Shadow Claw"],
    }
  },
  team: ["Darmanitan-GZ", "Lanturn", "Golisopod", "Zapdos", "Meowscarada"],
});

export const cinnabarLabLeaderJasmineBattle: Moment = {
  split: "Blaine",
  label: "Cinnabar Lab Leader Jasmine Battle",
  kind: "battle",
  data: {
    playerBox: _box9,
    opponentBox: cinnabarLabLeaderJasmineBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Gliscor"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Icicle Crash {o:Gliscor} to {=:0}" },
                { opponent: "{o:Gliscor} fainted" },
              ],
            ],
            branches: [
              {
                branches: [
                  "50% → Magnezone matchup",
                  "50% → Aggron-Mega matchup",
                ],
              },
            ],
          },
        ],
        frags: { "Darmanitan-GZ": 1 },
      },
      {
        line: "50% → Magnezone matchup",
        matchups: [
          {
            matchup: ["Magnezone"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} switch to {p:Lanturn}" },
                { opponent: "{o:Magnezone} Thunderbolt {p:Lanturn}" },
              ],
              [
                { opponent: "{o:Magnezone} HP Grass {p:Lanturn} to {+:94}" },
                { player: "{p:Lanturn} Volt Switch {o:Magnezone} to {-:189}" },
                { player: "{p:Lanturn} switch to {p:Darmanitan-GZ}" },
              ],
              [
                { player: "{p:Darmanitan-GZ} Earthquake {o:Magnezone} to {=:0}" },
                { opponent: "{o:Magnezone} fainted" },
              ],
            ],
          },
          {
            matchup: ["Aggron-Mega"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} switch to {p:Golisopod}" },
                { opponent: "{o:Aggron-Mega} mega evolve" },
                { opponent: "{o:Aggron-Mega} Heavy Slam {p:Golisopod} to {+:158}" },
              ],
              [
                { player: "{p:Golisopod} switch to {p:Zapdos}" },
                { opponent: "{o:Aggron-Mega} Curse" },
              ],
              [
                { player: "{p:Zapdos} Discharge {o:Aggron-Mega} to {-:95}" },
                { opponent: "{o:Aggron-Mega} Heavy Slam {p:Zapdos} to {+:43}" },
              ],
              [
                { player: "{p:Zapdos} Volt Switch {o:Aggron-Mega} to {=:0}" },
                { opponent: "{o:Aggron-Mega} fainted" },
                { player: "{p:Zapdos} switch to {p:Darmanitan-GZ}" },
              ],
            ],
            branches: [{ branches: ["Darmanitan-GZ Icicle Crash Tapu Bulu"] }],
          },
        ],
        frags: { "Darmanitan-GZ": 1, Zapdos: 1 }
      },
      {
        line: "50% → Aggron-Mega matchup",
        matchups: [
          {
            matchup: ["Aggron-Mega"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} switch to {p:Golisopod}" },
                { opponent: "{o:Aggron-Mega} mega evolve" },
                { opponent: "{o:Aggron-Mega} Heavy Slam {p:Golisopod} to {+:158}" },
              ],
              [
                { player: "{p:Golisopod} switch to {p:Zapdos}" },
                { opponent: "{o:Aggron-Mega} Curse" },
              ],
              [
                { player: "{p:Zapdos} Discharge {o:Aggron-Mega} to {-:95}" },
                { opponent: "{o:Aggron-Mega} Heavy Slam {p:Zapdos} to {+:43}" },
              ],
              [
                { player: "{p:Zapdos} Volt Switch {o:Aggron-Mega} to {=:0}" },
                { opponent: "{o:Aggron-Mega} fainted" },
                { player: "{p:Zapdos} switch to {p:Darmanitan-GZ}" },
              ],
            ],
          },
          {
            matchup: ["Magnezone"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} switch to {p:Lanturn}" },
                { opponent: "{o:Magnezone} Thunderbolt {p:Lanturn}" },
              ],
              [
                { opponent: "{o:Magnezone} HP Grass {p:Lanturn} to {+:94}" },
                { player: "{p:Lanturn} Volt Switch {o:Magnezone} to {-:189}" },
                { player: "{p:Lanturn} switch to {p:Darmanitan-GZ}" },
              ],
              [
                { player: "{p:Darmanitan-GZ} Earthquake {o:Magnezone} to {=:0}" },
                { opponent: "{o:Magnezone} fainted" },
              ],
            ],
            branches: [{ branches: ["Darmanitan-GZ Icicle Crash Tapu Bulu"] }],
          },
        ],
        frags: { Zapdos: 1, "Darmanitan-GZ": 1 }
      },
      {
        line: "Darmanitan-GZ Icicle Crash Tapu Bulu",
        matchups: [
          {
            matchup: ["Tapu Bulu"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Icicle Crash {o:Tapu Bulu} to {=:0}" },
                { opponent: "{o:Tapu Bulu} fainted" },
              ],
            ]
          },
          {
            matchup: ["Necrozma-DM"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} switch to {p:Golisopod}" },
                { opponent: "{o:Necrozma-DM} High Horsep. {p:Golisopod} to {+:109}" },
                { opponent: "{p:Golisopod} grassy terrain to {+:122}" },
              ],
              [
                { player: "{p:Golisopod} switch to {p:Meowscarada}" },
                { opponent: "{o:Necrozma-DM} Dragon Dance" },
              ],
              [
                { opponent: "{o:Necrozma-DM} Dragon Dance" },
                { player: "{p:Meowscarada} Foul Play {o:Necrozma-DM} to {=:0}" },
              ],
            ]
          },
          {
            matchup: ["Genesect"],
            turns: [
              [
                { player: "{p:Meowscarada} Shadow Claw {o:Genesect} to {-:130}" },
                { opponent: "{o:Genesect} U-Turn {p:Meowscarada} to {+:48}" },
                { opponent: "{o:Genesect} Life Orb to {-:110}" },
                { opponent: "{p:Meowscarada} grassy terrain to {+:61}" },
                { opponent: "{o:Genesect} grassy terrain to {-:123}" },
              ],
              [
                { player: "{p:Meowscarada} Foul Play {o:Genesect} to {=:0}" },
                { opponent: "{o:Genesect} fainted" },
              ],
            ],
          }
        ],
        frags: { "Darmanitan-GZ": 1, Meowscarada: 2 }
      }
    ],
  },
};

const _box10 = getBox({
  box: _box9,
  update: {
    Meowscarada: {
      item: undefined,
    },
    Infernape: {
      nature: "Hasty",
      ability: "Iron Fist",
      item: "Shed Shell",
      moves: ["Fake Out", "Close Combat", "Thunder Punch", "Vacuum Wave"],
    },
    Runerigus: {
      nature: "Jolly",
      ability: "Wandering Soul",
      item: "Chesto Berry",
      moves: ["Rock Slide", "Scary Face", "Shadow Ball", "Shadow Sneak"],
    },
    Golisopod: {
      nature: "Adamant",
      ability: "Emergency Exit",
      item: "Focus Sash",
      moves: ["First Impress.", "Liquidation", "Poison Jab", "Pounce"],
    },
    "Greninja-Ash": {
      nature: "Naughty",
      ability: "Battle Bond",
      item: "Life Orb",
      moves: ["Dark Pulse", "Low Kick", "Ice Beam", "Surf"],
    }
  },
  team: ["Infernape", "Runerigus", "Golisopod", "Greninja-Ash"],
});

export const cinnabarIslandMayBattle: Moment = {
  split: "Blaine",
  label: "Cinnabar Island May Battle",
  kind: "battle",
  data: {
    playerBox: _box10,
    opponentBox: cinnabarIslandMayBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Aggron"],
            turns: [
              [
                { player: "{p:Infernape} Fake Out {o:Aggron} to {-:204}" },
                { opponent: "{o:Aggron} flinched" },
              ],
              [
                { player: "{p:Infernape} Vacuum Wave {o:Aggron} to {=:0}" },
                { opponent: "{o:Aggron} fainted" },
              ],
            ],
          },
          {
            matchup: ["Regieleki"],
            turns: [
              [
                { player: "{p:Infernape} switch to {p:Runerigus}" },
                { opponent: "{o:Regieleki} Explosion {p:Runerigus}" },
                { opponent: "{o:Regieleki} fainted" },
                { opponent: "{p:Runerigus} magma storm to {=:167}" },
              ],
            ],
          },
          {
            matchup: ["Blaziken-Mega"],
            turns: [
              [
                { opponent: "{o:Blaziken-Mega} mega evolve" },
                { opponent: "{o:Blaziken-Mega} Swords Dance" },
                { player: "{p:Runerigus} Scary Face {o:Blaziken-Mega}" },
                { opponent: "{p:Runerigus} magma storm to {=:144}" },
              ],
              [
                { player: "{p:Runerigus} switch to {p:Golisopod}" },
                { opponent: "{o:Blaziken-Mega} Flare Blitz {p:Golisopod} to {=:1}" },
                { opponent: "{o:Blaziken-Mega} recoil to {=:151}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Greninja-Ash}" },
                { opponent: "{p:Greninja-Ash} magma storm to {=:184}" },
              ],
              [
                { player: "{p:Greninja-Ash} Surf {o:Blaziken-Mega} to {=:0}" },
                { opponent: "{p:Greninja-Ash} Life Orb to {=:163}" },
                { opponent: "{o:Blaziken-Mega} fainted" },
                { opponent: "{p:Greninja-Ash} transform" },
                { opponent: "{p:Greninja-Ash} magma storm to {=:137}" },
              ],
            ],
          },
          {
            matchup: ["Jumpluff"],
            turns: [
              [
                { player: "{p:Greninja-Ash} Ice Beam {o:Jumpluff} to {=:0}" },
                { opponent: "{p:Greninja-Ash} Life Orb to {=:116}" },
                { opponent: "{o:Jumpluff} fainted" },
                { opponent: "{p:Greninja-Ash} magma storm to {=:90}" },
              ],
            ],
          },
          {
            matchup: ["Slowbro"],
            turns: [
              [
                { player: "{p:Greninja-Ash} Dark Pulse {o:Slowbro} to {=:0}" },
                { opponent: "{p:Greninja-Ash} Life Orb to {=:69}" },
                { opponent: "{o:Slowbro} fainted" },
                { opponent: "{p:Greninja-Ash} magma storm to {=:43}" },
              ],
            ],
          },
          {
            matchup: ["Snorlax"],
            turns: [
              [
                { player: "{p:Greninja-Ash} Low Kick {o:Snorlax} to {=:0}" },
                { opponent: "{p:Greninja-Ash} Life Orb to {=:22}" },
                { opponent: "{o:Snorlax} fainted" },
              ],
            ],
          }
        ],
        frags: { Infernape: 1, Runerigus: 1, "Greninja-Ash": 4 }
      },
    ],
  },
};

const _box11 = getBox({
  box: _box10,
  cap: { level: 76, exclude: ["Golisopod"] },
});

export const cinnabarIslandMayBoxChange: Moment = {
  split: "Blaine",
  label: "Cinnabar Island May Box Change",
  kind: "boxChange",
  data: { playerBox: _box11 },
};

const _box12 = getBox({
  box: _box11,
  update: {
    Jellicent: {
      nature: "Timid",
      ability: "Water Bubble",
      item: "Choice Scarf",
      moves: ["Brine", "Ice Beam", "Scald", "Water Spout"],
    },
    Golisopod: {
      nature: "Naughty",
      ability: "Emergency Exit",
      item: "Focus Sash",
      moves: ["First Impress.", "Liquidation", "Poison Jab", "Pounce"],
    },
    "Darmanitan-GZ": {
      nature: "Adamant",
      ability: "Zen Mode",
      item: "Expert Belt",
      moves: ["Earthquake", "Flare Blitz", "Icicle Crash", "U-Turn"],
    },
    Dragapult: {
      nature: "Naughty",
      ability: "Clear Body",
      item: "Rawst Berry",
      moves: ["Astonish", "Dragon Darts", "Flamethrower", "U-Turn"],
    },
    "Greninja-Ash": {
      nature: "Naughty",
      ability: "Battle Bond",
      item: "Rawst Berry",
      moves: ["Dark Pulse", "Ice Beam", "Rock Tomb", "Surf"],
    },
    Perrserker: {
      nature: "Adamant",
      ability: "Battle Armor",
      item: "Chople Berry",
      moves: ["Fake Out", "Metal Burst", "Thunder", "U-Turn"],
    }
  },
  team: ["Jellicent", "Golisopod", "Darmanitan-GZ", "Dragapult", "Greninja-Ash", "Perrserker"],
});

export const pokemonMansionBurglarLewisBattle: Moment = {
  split: "Blaine",
  label: "Pokémon Mansion Burglar Lewis Battle",
  kind: "battle",
  data: {
    playerBox: _box12,
    opponentBox: pokemonMansionBurglarLewisBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Rillaboom", "Arcanine"],
            turns: [
              [
                { player: "{p:Jellicent} switch to {p:Darmanitan-GZ}" },
                { player: "{p:Golisopod} switch to {p:Dragapult}" },
                { opponent: "{o:Rillaboom} Fake Out {p:Dragapult}" },
                { opponent: "{o:Arcanine} Will-O-Wisp {p:Dragapult}" },
              ],
              [
                { player: "{p:Dragapult} U-Turn {o:Rillaboom} to {-:148}" },
                { player: "{p:Dragapult} switch to {p:Greninja-Ash}" },
                { player: "{p:Darmanitan-GZ} U-Turn {o:Rillaboom} to {=:0}" },
                { player: "{p:Darmanitan-GZ} switch to {p:Dragapult}" },
                { opponent: "{o:Rillaboom} fainted" },
                { opponent: "{o:Arcanine} Will-O-Wisp {p:Greninja-Ash}" },
              ],
            ],
          },
          {
            matchup: ["Spectrier", "Arcanine"],
            turns: [
              [
                { player: "{p:Dragapult} switch to {p:Golisopod}" },
                { opponent: "{o:Spectrier} Shadow Ball {p:Golisopod} to {+:13}" },
                { player: "{p:Greninja-Ash} Rock Tomb {o:Spectrier} to {-:209}" },
                { opponent: "{o:Arcanine} Will-O-Wisp {p:Greninja-Ash}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Jellicent}" },
                { opponent: "{o:Spectrier} grassy terrain to {-:225}" },
                { opponent: "{p:Greninja-Ash} burn to {=:206}" },
              ],
              [
                { player: "{p:Greninja-Ash} Ice Beam {o:Spectrier} to {-:163}" },
                { player: "{p:Jellicent} Water Spout {o:Spectrier} to {=:0} and {o:Arcanine} to {=:0}" },
                { opponent: "{o:Spectrier} fainted" },
                { opponent: "{o:Arcanine} fainted" },
                { opponent: "{o:Greninja-Ash} grassy terrain to {=:219}" },
                { opponent: "{p:Greninja-Ash} burn to {=:206}" },
              ],
            ],
          },
          {
            matchup: ["Lopunny-Mega", "Articuno-G"],
            turns: [
              [
                { player: "{p:Greninja-Ash} switch to {p:Perrserker}" },
                { opponent: "{o:Lopunny-Mega} mega evolve" },
                { opponent: "{o:Lopunny-Mega} Close Combat {p:Perrserker} to {+:93}" },
                { opponent: "{o:Articuno-G} Calm Mind" },
                { player: "{p:Jellicent} Water Spout {o:Lopunny-Mega} to {=:0} and {o:Articuno-G} to {-:132}" },
                { opponent: "{o:Lopunny-Mega} fainted" },
                { opponent: "{p:Perrserker} grassy terrain to {+:108}" },
              ],
            ],
          },
          {
            matchup: ["Drapion", "Articuno-G"],
            turns: [
              [
                { player: "{p:Perrserker} Fake Out {o:Articuno-G} to {-:104}" },
                { opponent: "{o:Articuno-G} flinched" },
                { player: "{p:Jellicent} Water Spout {o:Drapion} to {=:0} and {o:Articuno-G} to {=:0}" },
                { opponent: "{o:Drapion} fainted" },
                { opponent: "{o:Articuno-G} fainted" },
              ],
            ],
          },
        ],
        frags: { "Darmanitan-GZ": 1, Jellicent: 5 }
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
      item: "Charti Berry",
      moves: ["Earthquake", "Icicle Crash", "Rock Slide", "U-Turn"],
    },
    Meowscarada: {
      nature: "Lonely",
      ability: "Protean",
      item: "Expert Belt",
      moves: ["Flower Trick", "Knock Off", "Low Kick", "Power Gem"],
    },
    "Arcanine-H": {
      nature: "Jolly",
      ability: "Rock Head",
      item: "Life Orb",
      moves: ["Accelerock", "Flamethrower", "Flare Blitz", "Head Smash"],
    }
  },
  team: ["Darmanitan-GZ", "Meowscarada", "Arcanine-H"],
});

export const cinnabarGymAceTrainerDerekBattle: Moment = {
  split: "Blaine",
  label: "Cinnabar Gym Ace Trainer Derek Battle",
  kind: "battle",
  data: {
    playerBox: _box13,
    opponentBox: cinnabarGymAceTrainerDerekBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Zapdos-G"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Icicle Crash {o:Zapdos-G} to {=:0}" },
                { opponent: "{o:Zapdos-G} fainted" },
              ],
            ],
          },
          {
            matchup: ["Rhyperior"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} switch to {p:Meowscarada}" },
                { opponent: "{o:Rhyperior} Earthquake {p:Meowscarada} to {+:117}" },
              ],
              [
                { player: "{p:Meowscarada} Flower Trick {o:Rhyperior} to {=:0}" },
                { opponent: "{o:Rhyperior} fainted" },
              ],
            ],
          },
          {
            matchup: ["Arcanine-H"],
            turns: [
              [
                { player: "{p:Meowscarada} Low Kick {o:Arcanine-H} to {=:0}" },
                { opponent: "{o:Arcanine-H} fainted" },
              ],
            ],
          },
          {
            matchup: ["Delphox"],
            turns: [
              [
                { player: "{p:Meowscarada} Knock Off {o:Delphox} to {=:0}" },
                { opponent: "{o:Delphox} fainted" },
              ],
            ],
          },
          {
            matchup: ["Centiskorch-Mega"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Arcanine-H}" },
                { opponent: "{o:Centiskorch-Mega} mega evolve" },
                { opponent: "{o:Centiskorch-Mega} Flare Blitz {p:Arcanine-H} to {+:142}" },
                { opponent: "{o:Centiskorch-Mega} recoil to {-:261}" },
              ],
              [
                { player: "{p:Arcanine-H} Flare Blitz {o:Centiskorch-Mega} to {=:0}" },
                { opponent: "{o:Arcanine-H} Life Orb to {+:117}" },
                { opponent: "{o:Centiskorch-Mega} fainted" },
              ],
            ],
          },
        ],
        frags: { "Darmanitan-GZ": 1, Meowscarada: 3, "Arcanine-H": 1 }
      },
    ],
  },
};

const _box14 = getBox({
  box: _box13,
  update: {
    "Arcanine-H": {
      item: undefined,
    },
    Perrserker: {
      nature: "Adamant",
      ability: "Steely Spirit",
      item: "Life Orb",
      moves: ["Fake Out", "Bullet Punch", "Dig", "Thrash"],
    },
    "Darmanitan-GZ": {
      nature: "Adamant",
      ability: "Zen Mode",
      item: "Expert Belt",
      moves: ["Earthquake", "Icicle Crash", "Rock Slide", "U-Turn"],
    }
  },
  team: ["Perrserker", "Darmanitan-GZ"],
});

export const cinnabarGymAceTrainerLucyBattle: Moment = {
  split: "Blaine",
  label: "Cinnabar Gym Ace Trainer Lucy Battle",
  kind: "battle",
  data: {
    playerBox: _box14,
    opponentBox: cinnabarGymAceTrainerLucyBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Lycanroc"],
            turns: [
              [
                { player: "{p:Perrserker} Fake Out {o:Lycanroc} to {-:198}" },
                { opponent: "{p:Perrserker} Life Orb to {=:222}" },
                { opponent: "{o:Lycanroc} flinched" },
              ],
              [
                { player: "{p:Perrserker} Bullet Punch {o:Lycanroc} to {=:0}" },
                { opponent: "{p:Perrserker} Life Orb to {=:198}" },
                { opponent: "{o:Lycanroc} fainted" },
              ],
            ],
          },
          {
            matchup: ["Gliscor"],
            turns: [
              [
                { player: "{p:Perrserker} switch to {p:Darmanitan-GZ}" },
                { opponent: "{o:Gliscor} Swords Dance" },
              ],
              [
                { player: "{p:Darmanitan-GZ} Icicle Crash {o:Gliscor} to {=:0}" },
                { opponent: "{o:Gliscor} fainted" },
              ],
            ],
          },
          {
            matchup: ["Darmanitan"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Earthquake {o:Darmanitan} to {=:0}" },
                { opponent: "{o:Darmanitan} fainted" },
              ],
            ],
          },
          {
            matchup: ["Raging Bolt"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Icicle Crash {o:Raging Bolt} to {=:0}" },
                { opponent: "{o:Raging Bolt} fainted" },
              ],
            ],
          },
          {
            matchup: ["Charizard"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Rock Slide {o:Charizard} to {=:0}" },
                { opponent: "{o:Charizard} fainted" },
              ],
            ],
          },
        ],
        frags: { Perrserker: 1, "Darmanitan-GZ": 4 },
      },
    ],
  },
};

const _box15 = getBox({
  box: _box14,
  update: {
    "Greninja-Ash": {
      nature: "Timid",
      ability: "Battle Bond",
      item: "Expert Belt",
      moves: ["Dark Pulse", "Rock Tomb", "Ice Beam", "Surf"]
    },
    Incineroar: {
      nature: "Careful",
      ability: "Intimidate",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Darkest Lariat", "Flamethrower", "U-Turn"]
    },
    Dragapult: {
      nature: "Rash",
      ability: "Clear Body",
      item: "Life Orb",
      moves: ["Astonish", "Dragon Darts", "Flamethrower", "U-Turn"]
    },
    "Darmanitan-GZ": {
      nature: "Adamant",
      ability: "Zen Mode",
      item: "Expert Belt",
      moves: ["Earthquake", "Icicle Crash", "Rock Slide", "U-Turn"],
    }
  },
  team: ["Greninja-Ash", "Incineroar", "Dragapult", "Darmanitan-GZ"],
});

export const cinnabarGymAceTrainerZacBattle: Moment = {
  split: "Blaine",
  label: "Cinnabar Gym Ace Trainer Zac Battle",
  kind: "battle",
  data: {
    playerBox: _box15,
    opponentBox: cinnabarGymAceTrainerZacBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Salamence-Mega", "Cinderace"],
            turns: [
              [
                { opponent: "{o:Salamence-Mega} mega evolve" },
                { player: "{p:Incineroar} Fake Out {o:Cinderace} to {-:209}" },
                { opponent: "{o:Cinderace} flinched" },
                { player: "{p:Greninja-Ash} Ice Beam {o:Salamence-Mega} to {=:0}" },
                { opponent: "{o:Salamence-Mega} fainted" },
                { opponent: "{p:Greninja-Ash} transform" },
              ],
            ],
          },
          {
            matchup: ["Volcarona", "Cinderace"],
            turns: [
              [
                { player: "{p:Greninja-Ash} switch to {p:Dragapult}" },
                { opponent: "{o:Cinderace} High J. Kick {p:Dragapult}" },
                { opponent: "{o:Cinderace} recoil to {-:94}" },
                { opponent: "{o:Volcarona} Fire Blast {p:Incineroar} to {+:23}" },
                { opponent: "{p:Incineroar} Sitrus Berry to {+:86}" },
                { player: "{p:Incineroar} U-Turn {o:Volcarona} to {-:218}" },
                { player: "{p:Incineroar} switch to {p:Darmanitan-GZ}" },
              ],
              [
                { player: "{p:Dragapult} Flamethrower {o:Cinderace} to {=:0}" },
                { opponent: "{p:Dragapult} Life Orb to {=:219}" },
                { opponent: "{o:Cinderace} fainted" },
                { player: "{p:Darmanitan-GZ} Rock Slide {o:Volcarona} to {=:0}" },
                { opponent: "{o:Volcarona} fainted" },
              ],
            ],
          },
          {
            matchup: ["Braviary-H", "Excadrill"],
            turns: [
              [
                { player: "{p:Dragapult} Flamethrower {o:Excadrill} to {=:0}" },
                { opponent: "{p:Dragapult} Life Orb to {=:195}" },
                { opponent: "{o:Excadrill} fainted" },
                { player: "{p:Darmanitan-GZ} Icicle Crash {o:Braviary-H} to {=:0}" },
                { opponent: "{o:Braviary-H} fainted" },
              ],
            ],
          },
        ],
        frags: { "Greninja-Ash": 1, Dragapult: 2, "Darmanitan-GZ": 2 }
      },
    ],
  },
};

const _box16 = getBox({
  box: _box15,
  update: {
    Meowscarada: {
      nature: "Lonely",
      ability: "Protean",
      item: "Expert Belt",
      moves: ["Flower Trick", "Knock Off", "Low Kick", "Power Gem"]
    },
    Ceruledge: {
      nature: "Bold",
      ability: "Sharpness",
      item: "Pecha Berry",
      moves: ["Bitter Blade", "Shadow Claw", "Shadow Sneak", "Solar Blade"],
    },
    Perrserker: {
      nature: "Adamant",
      ability: "Battle Armor",
      item: "Shuca Berry",
      moves: ["Fake Out", "Bullet Punch", "Dig", "Thrash"],
    },
    "Arcanine-H": {
      nature: "Adamant",
      ability: "Flash Fire",
      item: "Focus Sash",
      moves: ["Accelerock", "Flamethrower", "Flare Blitz", "Rock Slide"],
    },
    Golisopod: {
      nature: "Naughty",
      ability: "Emergency Exit",
      item: "Assault Vest",
      moves: ["First Impress.", "Liquidation", "Poison Jab", "Pounce"],
    },
    Dragapult: {
      nature: "Rash",
      ability: "Clear Body",
      item: "Life Orb",
      moves: ["Astonish", "Dragon Darts", "Solar Beam", "U-Turn"]
    }
  },
  team: ["Meowscarada", "Ceruledge", "Perrserker", "Arcanine-H", "Golisopod", "Dragapult"],
});

export const cinnabarGymLeaderBlaineBattle: Moment = {
  split: "Blaine",
  label: "Cinnabar Gym Leader Blaine Battle",
  kind: "battle",
  data: {
    playerBox: _box16,
    opponentBox: cinnabarGymLeaderBlaineBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Sandy Shocks"],
            turns: [
              [
                { player: "{p:Meowscarada} Flower Trick {o:Sandy Shocks} to {=:0}" },
                { opponent: "{o:Sandy Shocks} fainted" },
              ],
            ],
          },
          {
            matchup: ["Venusaur"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Ceruledge}" },
                { opponent: "{o:Venusaur} Weather Ball {p:Ceruledge} to {+:142}" },
              ],
              [
                { opponent: "{o:Venusaur} Weather Ball {p:Ceruledge} to {+:61}" },
                { player: "{p:Ceruledge} Bitter Blade {o:Venusaur} to {=:1}" },
                { opponent: "{p:Ceruledge} recover to {+:176}" },
              ],
              [
                { player: "{p:Ceruledge} Shadow Sneak {o:Venusaur} to {=:0}" },
                { opponent: "{o:Venusaur} fainted" },
              ],
            ],
          },
          {
            matchup: ["Ho-Oh"],
            turns: [
              [
                { player: "{p:Ceruledge} switch to {p:Perrserker}" },
                { opponent: "{o:Ho-Oh} Earthquake {p:Perrserker} to {+:164}" },
              ],
              [
                { player: "{p:Perrserker} switch to {p:Arcanine-H}" },
                { opponent: "{o:Ho-Oh} Sacred Fire {p:Arcanine-H}" },
              ],
              [
                { opponent: "{o:Ho-Oh} Earthquake {p:Arcanine-H} to {=:1}" },
                { player: "{p:Arcanine-H} Rock Slide {o:Ho-Oh} to {=:0}" },
                { opponent: "{o:Ho-Oh} Phoenix Down to {=:135}" },
              ],
              [
                { player: "{p:Arcanine-H} Accelerock {o:Ho-Oh} to {=:0}" },
                { opponent: "{o:Ho-Oh} fainted" },
              ],
            ],
          },
          {
            matchup: ["Walking Wake"],
            turns: [
              [
                { player: "{p:Arcanine-H} switch to {p:Golisopod}" },
                { opponent: "{o:Walking Wake} Draco Barrage {p:Golisopod} to {+:22}" },
                { opponent: "{o:Walking Wake} recoil to {-:224}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Dragapult}" },
              ],
              [
                { player: "{p:Dragapult} Dragon Darts {o:Walking Wake} to {=:0}" },
                { opponent: "{p:Dragapult} Life Orb to {=:219}" },
                { opponent: "{o:Walking Wake} fainted" },
              ],
            ],
          },
          {
            matchup: ["Charizard-MegaX"],
            turns: [
              [
                { opponent: "{o:Charizard-MegaX} mega evolve" },
                { player: "{p:Dragapult} Dragon Darts {o:Charizard-MegaX} to {=:0}" },
                { opponent: "{p:Dragapult} Life Orb to {=:195}" },
                { opponent: "{o:Charizard-MegaX} fainted" },
              ],
            ],
          },
          {
            matchup: ["Great Tusk"],
            turns: [
              [
                { player: "{p:Dragapult} Solar Beam {o:Great Tusk} to {=:0}" },
                { opponent: "{p:Dragapult} Life Orb to {=:171}" },
                { opponent: "{o:Great Tusk} fainted" },
              ],
            ],
          },
        ],
        frags: { Meowscarada: 1, Ceruledge: 1, "Arcanine-H": 1, Dragapult: 3 }
      },
    ],
  },
};

const _box17 = getBox({
  box: _box16,
  update: {
    Golisopod: {
      level: 74,
    }
  },
});

const _box18 = getBox({
  box: _box17,
  remove: ["Arcanine-H"],
});

export const cinnabarGymLeaderBlaineBoxChange: Moment = {
  split: "Blaine",
  label: "Cinnabar Gym Leader Blaine Box Change",
  kind: "boxChange",
  data: { playerBox: _box18 },
};

export const box = _box18;

export const moments: Moment[] = [
  blaineBoxChange,
  seafoamIslandsEncounter,
  powerPlantEncounter,
  powerPlantBoxChange,
  lavenderTownLeaderMortyBattle,
  seafoamIslandsLeaderPryceBattle,
  cinnabarLabLeaderJasmineBattle,
  cinnabarIslandMayBattle,
  cinnabarIslandMayBoxChange,
  pokemonMansionBurglarLewisBattle,
  cinnabarGymAceTrainerDerekBattle,
  cinnabarGymAceTrainerLucyBattle,
  cinnabarGymAceTrainerZacBattle,
  cinnabarGymLeaderBlaineBattle,
  cinnabarGymLeaderBlaineBoxChange,
];
