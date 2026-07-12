import { getBox, type Box } from "@site/src/utils/box";
import type { Moment } from "@site/src/utils/moments";
import {
  ceruleanCaveArcherBox,
  ceruleanCaveArianaBox,
  ceruleanCaveGiovanniBox,
  ceruleanCaveGrunt1Box,
  ceruleanCaveGrunt2Box,
  championLanceBox,
  viridianCityLeaderClairBox,
} from "@site/src/utils/opponents";

import { box as _box1 } from "@site/src/data/guide/blaine";

const _box2 = getBox({
  box: _box1,
  cap: { level: 79, exclude: ["Golisopod"] },
});

export const clairBoxChange: Moment = {
  split: "Clair",
  label: "Clair Box Change",
  kind: "boxChange",
  data: { playerBox: _box2 },
};

const _box3 = getBox({
  box: _box2,
  update: {
    Golduck: {
      nature: "Rash",
      ability: "Cloud Nine",
      item: "Expert Belt",
      moves: ["Flash", "Flip Turn", "Psychic", "Vacuum Wave"],
    },
    Zapdos: {
      nature: "Modest",
      ability: "Pressure",
      item: "Magnet",
      moves: ["Hurricane", "Thunder", "Thunderbolt", "Volt Switch"],
    },
    Tentacruel: {
      nature: "Calm",
      ability: "Clear Body",
      item: "Sitrus Berry",
      moves: ["Blizzard", "Hydro Pump", "Rapid Spin", "Sludge Wave"],
    },
    "Darmanitan-GZ": {
      nature: "Adamant",
      ability: "Zen Mode",
      item: "Life Orb",
      moves: ["Earthquake", "Flare Blitz", "Icicle Crash", "U-Turn"],
    },
    Golisopod: {
      nature: "Lonely",
      ability: "Emergency Exit",
      item: "Assault Vest",
      moves: ["First Impress.", "Liquidation", "Poison Jab", "Rock Slide"],
    }
  },
  team: ["Golduck", "Tentacruel", "Darmanitan-GZ", "Zapdos", "Golisopod"],
});

export const ceruleanCaveGrunt1Battle: Moment = {
  split: "Clair",
  label: "Cerulean Cave Grunt 1 Battle",
  kind: "battle",
  data: {
    playerBox: _box3,
    opponentBox: ceruleanCaveGrunt1Box,
    lines: [
      {
        matchups: [
          {
            matchup: ["Glimmora"],
            turns: [
              [
                { player: "{p:Golduck} Psychic {o:Glimmora} to {=:1}" },
                { opponent: "{o:Glimmora} Stealth Rock" },
              ],
              [
                { player: "{p:Golduck} Flip Turn {o:Glimmora} to {=:0}" },
                { opponent: "{o:Glimmora} Toxic Debris" },
                { opponent: "{o:Glimmora} fainted" },
                { player: "{p:Golduck} switch to {p:Tentacruel}" },
                { opponent: "{p:Tentacruel} Stealth Rock to {=:210}" },
              ],
            ],
          },
          {
            matchup: ["Blissey"],
            turns: [
              [
                { player: "{p:Tentacruel} Rapid Spin {o:Blissey} to {-:452}" },
                { opponent: "{o:Blissey} Seismic Toss {p:Tentacruel} to {=:131}" },
                { opponent: "{o:Blissey} Leftovers to {-:484}" },
              ],
              [
                { player: "{p:Tentacruel} switch to {p:Darmanitan-GZ}" },
                { opponent: "{o:Blissey} Seismic Toss {p:Darmanitan-GZ} to {=:200}" },
                { opponent: "{o:Blissey} Leftovers to {-:516}" },
              ],
              [
                { player: "{p:Darmanitan-GZ} Icicle Crash {o:Blissey} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:173}" },
                { opponent: "{o:Blissey} fainted" },
              ],
            ],
          },
          {
            matchup: ["Slowbro"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} switch to {p:Zapdos}" },
                { opponent: "{o:Slowbro} Scald {p:Zapdos} to {+:123}" },
                { opponent: "{p:Zapdos} burn to {+:108}" },
                { opponent: "{o:Slowbro} Leftovers to {-:133}" },
              ],
              [
                { player: "{p:Zapdos} Thunderbolt {o:Slowbro} to {=:0}" },
                { opponent: "{o:Slowbro} fainted" },
                { opponent: "{p:Zapdos} burn to {+:93}" },
              ],
            ],
          },
          {
            matchup: ["Garbodor-Mega"],
            turns: [
              [
                { player: "{p:Zapdos} switch to {p:Tentacruel}" },
                { opponent: "{o:Garbodor-Mega} mega evolve" },
                { opponent: "{o:Garbodor-Mega} Poison Jab {p:Tentacruel} to {+:28}" },
                { opponent: "{p:Tentacruel} Sitrus Berry to {+:87}" },
              ],
              [
                { player: "{p:Tentacruel} switch to {p:Golisopod}" },
                { opponent: "{o:Garbodor-Mega} Earthquake {p:Golisopod} to {+:154}" },
              ],
              [
                { opponent: "{o:Garbodor-Mega} Poison Jab {p:Golisopod} to {+:1}" },
                { player: "{p:Golisopod} Liquidation {o:Garbodor-Mega} to {-:158}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Darmanitan-GZ}" },
              ],
              [
                { player: "{p:Darmanitan-GZ} Earthquake {o:Garbodor-Mega} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:146}" },
                { opponent: "{o:Garbodor-Mega} fainted" },
              ],
            ],
          },
          {
            matchup: ["Mandibuzz"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Icicle Crash {o:Mandibuzz} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:119}" },
                { opponent: "{o:Mandibuzz} fainted" },
              ],
            ],
          },
          {
            matchup: ["Tangrowth"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Flare Blitz {o:Tangrowth} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} recoil to {=:29}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:2}" },
                { opponent: "{o:Tangrowth} fainted" },
              ],
            ],
          },
        ],
        frags: { Golduck: 1, "Darmanitan-GZ": 4, Zapdos: 1 },
      },
    ],
  },
};

const _box4 = getBox({
  box: _box3,
  remove: ["Tentacruel"],
});

export const ceruleanCaveGrunt1BoxChange: Moment = {
  split: "Clair",
  label: "Cerulean Cave Grunt 1 Box Change",
  kind: "boxChange",
  data: { playerBox: _box4 },
};

const _box5 = getBox({
  box: _box4,
  update: {
    Perrserker: {
      nature: "Adamant",
      ability: "Battle Armor",
      item: "Chople Berry",
      moves: ["Fake Out", "Bullet Punch", "Dig", "U-Turn"],
    },
    "Darmanitan-GZ": {
      nature: "Adamant",
      ability: "Zen Mode",
      item: "Life Orb",
      moves: ["Brick Break", "Flare Blitz", "Icicle Crash", "Superpower"],
    },
    Dragapult: {
      nature: "Rash",
      ability: "Clear Body",
      item: "Colbur Berry",
      moves: ["Astonish", "Dragon Darts", "Solar Beam", "U-Turn"],
    },
    Meowscarada: {
      nature: "Lonely",
      ability: "Protean",
      item: "Life Orb",
      moves: ["Knock Off", "Low Kick", "Shadow Claw", "Sucker Punch"],
    },
  },
  team: ["Perrserker", "Darmanitan-GZ", "Dragapult", "Meowscarada"],
});

export const ceruleanCaveGrunt2Battle: Moment = {
  split: "Clair",
  label: "Cerulean Cave Grunt 2 Battle",
  kind: "battle",
  data: {
    playerBox: _box5,
    opponentBox: ceruleanCaveGrunt2Box,
    lines: [
      {
        matchups: [
          {
            matchup: ["Grimmsnarl"],
            turns: [
              [
                { opponent: "{o:Grimmsnarl} Reflect" },
                { player: "{p:Perrserker} U-Turn {o:Grimmsnarl} to {-:229}" },
                { player: "{p:Perrserker} switch to {p:Darmanitan-GZ}" },
              ],
              [
                { opponent: "{o:Grimmsnarl} Light Screen" },
                { player: "{p:Darmanitan-GZ} Brick Break {o:Grimmsnarl} to {-:99}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:252}" },
              ],
              [
                { opponent: "{o:Grimmsnarl} Reflect" },
                { player: "{p:Darmanitan-GZ} Brick Break {o:Grimmsnarl} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {+:225}" },
                { opponent: "{o:Grimmsnarl} fainted" },
              ],
            ],
          },
          {
            matchup: ["Ursaring"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} switch to {p:Dragapult}" },
                { opponent: "{o:Ursaring} Close Combat {p:Dragapult}" },
                { opponent: "{o:Ursaring} burn to {=:240}" },
              ],
              [
                { player: "{p:Dragapult} switch to {p:Perrserker}" },
                { opponent: "{o:Ursaring} Play Rough {p:Perrserker} to {+:193}" },
                { opponent: "{o:Ursaring} burn to {-:225}" },
              ],
              [
                { opponent: "{o:Ursaring} Close Combat {p:Perrserker} to {+:28}" },
                { player: "{p:Perrserker} U-Turn {o:Ursaring} to {-:185}" },
                { player: "{p:Perrserker} switch to {p:Meowscarada}" },
                { opponent: "{o:Ursaring} burn to {-:170}" },
              ],
              [
                { player: "{p:Meowscarada} Low Kick {o:Ursaring} to {=:0}" },
                { opponent: "{p:Meowscarada} Life Orb to {=:210}" },
                { opponent: "{o:Ursaring} fainted" },
              ],
            ],
          },
          {
            matchup: ["Kingambit"],
            turns: [
              [
                { player: "{p:Meowscarada} Low Kick {o:Kingambit} to {=:0}" },
                { opponent: "{p:Meowscarada} Life Orb to {=:187}" },
                { opponent: "{o:Kingambit} fainted" },
              ],
            ],
          },
          {
            matchup: ["Annihilape"],
            turns: [
              [
                { player: "{p:Meowscarada} Shadow Claw {o:Annihilape} to {-:35}" },
                { opponent: "{p:Meowscarada} Life Orb to {=:164}" },
                { opponent: "{o:Annihilape} Drain Punch {p:Meowscarada}" },
                { opponent: "{o:Annihilape} Leftovers to {-:52}" },
              ],
              [
                { player: "{p:Meowscarada} Shadow Claw {o:Annihilape} to {=:0}" },
                { opponent: "{p:Meowscarada} Life Orb to {+:141}" },
                { opponent: "{o:Annihilape} fainted" },
              ],
            ],
          },
          {
            matchup: ["Espathra"],
            turns: [
              [
                { player: "{p:Meowscarada} Knock Off {o:Espathra} to {=:1}" },
                { opponent: "{p:Meowscarada} Life Orb to {+:118}" },
                { opponent: "{o:Espathra} Psychic {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Sucker Punch {o:Espathra} to {=:0}" },
                { opponent: "{p:Meowscarada} Life Orb to {+:95}" },
                { opponent: "{o:Espathra} fainted" },
              ],
            ],
          },
          {
            matchup: ["Sharpedo-Mega"],
            turns: [
              [
                { opponent: "{o:Sharpedo-Mega} mega evolve" },
                { player: "{p:Meowscarada} Low Kick {o:Sharpedo-Mega} to {=:0}" },
                { opponent: "{p:Meowscarada} Life Orb to {+:72}" },
                { opponent: "{o:Sharpedo-Mega} fainted" },
              ],
            ],
          },
        ],
        frags: { "Darmanitan-GZ": 1, Meowscarada: 5 },
      },
    ],
  },
};

const _box6 = getBox({
  box: _box5,
  update: {
    "Darmanitan-GZ": {
      nature: "Jolly",
      ability: "Zen Mode",
      item: "Expert Belt",
      moves: ["Earthquake", "Icicle Crash", "Superpower", "U-Turn"],
    },
    Zapdos: {
      nature: "Modest",
      ability: "Pressure",
      item: "Magnet",
      moves: ["Bolt Beak", "Hurricane", "Thunderbolt", "U-Turn"],
    },
    Golduck: {
      nature: "Sassy",
      ability: "Cloud Nine",
      item: "Sitrus Berry",
      moves: ["Flash", "Flip Turn", "Hydro Pump", "Ice Punch"],
    },
    Houndoom: {
      nature: "Naughty",
      ability: "Flash Fire",
      item: "Expert Belt",
      moves: ["Dark Pulse", "Flamethrower", "Leer", "Sucker Punch"],
    },
  },
  team: ["Darmanitan-GZ", "Zapdos", "Golduck", { name: "Houndoom", extra: true }],
});

export const ceruleanCaveArcherBattle: Moment = {
  split: "Clair",
  label: "Cerulean Cave Archer Battle",
  kind: "battle",
  data: {
    playerBox: _box6,
    opponentBox: ceruleanCaveArcherBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Ninetales"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Earthquake {o:Ninetales} to {=:0}" },
                { opponent: "{o:Ninetales} fainted" },
              ],
            ],
          },
          {
            matchup: ["Exeggutor"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Icicle Crash {o:Exeggutor} to {=:0}" },
                { opponent: "{o:Exeggutor} fainted" },
              ],
            ],
          },
          {
            matchup: ["Landorus-T"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} switch to {p:Zapdos}" },
                { opponent: "{o:Landorus-T} Earthquake {p:Zapdos}" },
              ],
              [
                { opponent: "{o:Landorus-T} Swords Dance" },
                { player: "{p:Zapdos} U-Turn {o:Landorus-T} to {-:236}" },
                { player: "{p:Zapdos} switch to {p:Darmanitan-GZ}" },
              ],
              [
                { player: "{p:Darmanitan-GZ} Icicle Crash {o:Landorus-T} to {=:0}" },
                { opponent: "{o:Landorus-T} fainted" },
              ],
            ],
          },
          {
            matchup: ["Houndoom-Mega"],
            turns: [
              [
                { opponent: "{o:Houndoom-Mega} mega evolve" },
                { player: "{p:Darmanitan-GZ} Superpower {o:Houndoom-Mega} to {=:0}" },
                { opponent: "{o:Houndoom-Mega} fainted" },
              ],
            ],
          },
          {
            matchup: ["Sunflora"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} U-Turn {o:Sunflora} to {-:107}" },
                { player: "{p:Darmanitan-GZ} switch to {p:Golduck}" },
                { opponent: "{o:Sunflora} HP Rock {p:Golduck} to {+:152}" },
              ],
              [
                { player: "{p:Golduck} Ice Punch {o:Sunflora} to {=:0}" },
                { opponent: "{o:Sunflora} fainted" },
              ],
            ],
          },
        ],
        frags: { "Darmanitan-GZ": 4, Golduck: 1 },
      },
    ],
  },
};

const _box7 = getBox({
  box: _box6,
  team: ["Darmanitan-GZ", "Zapdos", "Golduck", "Houndoom"],
});

export const ceruleanCaveArianaBattle: Moment = {
  split: "Clair",
  label: "Cerulean Cave Ariana Battle",
  kind: "battle",
  data: {
    playerBox: _box7,
    opponentBox: ceruleanCaveArianaBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Wailord"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} switch to {p:Golduck}" },
                { opponent: "{o:Wailord} Bouncy Bubble {p:Golduck} to {+:50}" },
                { opponent: "{p:Golduck} Sitrus Berry to {+:109}" },
              ],
              [
                { player: "{p:Golduck} Flip Turn {o:Wailord} to {-:337}" },
                { player: "{p:Golduck} switch to {p:Zapdos}" },
                { opponent: "{o:Wailord} HP Grass {p:Zapdos} to {+:217}" },
              ],
              [
                { player: "{p:Zapdos} Bolt Beak {o:Wailord} to {=:0}" },
                { opponent: "{o:Wailord} fainted" },
              ],
            ],
          },
          {
            matchup: ["Espeon"],
            turns: [
              [
                { player: "{p:Zapdos} switch to {p:Houndoom}" },
                { opponent: "{o:Espeon} Psychic {p:Houndoom}" },
              ],
              [
                { player: "{p:Houndoom} Sucker Punch {o:Espeon} to {=:0}" },
                { opponent: "{o:Espeon} fainted" },
              ],
            ],
          },
          {
            matchup: ["Buzzwole"],
            turns: [
              [
                { player: "{p:Houndoom} Flamethrower {o:Buzzwole} to {=:0}" },
                { opponent: "{o:Buzzwole} fainted" },
              ],
            ],
          },
          {
            matchup: ["Mawile-Mega"],
            turns: [
              [
                { opponent: "{o:Mawile-Mega} mega evolve" },
                { player: "{p:Houndoom} Flamethrower {o:Mawile-Mega} to {=:0}" },
                { opponent: "{o:Mawile-Mega} fainted" },
              ],
            ],
          },
        ],
        frags: { Zapdos: 1, Houndoom: 3 },
      },
    ],
  },
};

const _box8 = getBox({
  box: _box7,
  update: [
    {
      "Greninja-Ash": {
        level: 80,
      },
      Houndoom: {
        level: 80,
      },
      Golisopod: {
        level: 80,
      },
    },
    {
      Houndoom: {
        ability: "Early Bird",
      }
    },
    {
      Houndoom: {
        ability: "Unnerve",
      }
    }
  ],
});

export const ceruleanCaveArianaBoxChange: Moment = {
  split: "Clair",
  label: "Cerulean Cave Ariana Box Change",
  kind: "boxChange",
  data: { playerBox: _box8 },
};

const _box9 = getBox({
  box: _box8,
  update: {
    Houndoom: {
      name: "Houndoom-Mega",
      ability: "Dark Aura",
    },
  },
});

const _box10 = getBox({
  box: _box9,
  update: {
    "Greninja-Ash": {
      nature: "Modest",
      ability: "Battle Bond",
      item: "Mystic Water",
      moves: ["Dark Pulse", "Ice Beam", "Surf", "U-Turn"],
    },
    "Houndoom-Mega": {
      nature: "Timid",
      ability: "Dark Aura",
      item: "Houndoominite",
      moves: ["Fiery Wrath", "Flamethrower", "Foul Play", "Thunder Fang"],
    },
    Golisopod: {
      nature: "Lonely",
      ability: "Emergency Exit",
      item: "Focus Sash",
      moves: ["First Impress.", "Liquidation", "Poison Jab", "Rock Slide"],
    },
  },
  team: ["Greninja-Ash", "Houndoom-Mega", "Golisopod"],
});

export const ceruleanCaveGiovanniBattle: Moment = {
  split: "Clair",
  label: "Cerulean Cave Giovanni Battle",
  kind: "battle",
  data: {
    playerBox: _box10,
    opponentBox: ceruleanCaveGiovanniBox,
    partnerBox: championLanceBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Delphox", "Spiritomb"],
            turns: [],
            branches: [
              {
                branches: [
                  "94% → Greninja-Ash Surf Spiritomb",
                  "6% → Greninja-Ash Surf Spiritomb (crit)",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "94% → Greninja-Ash Surf Spiritomb",
        matchups: [
          {
            matchup: ["Delphox", "Spiritomb"],
            turns: [],
            branches: [
              {
                branches: [
                  "6% → Greninja-Ash Surf Dragapult",
                  "94% → Greninja-Ash Surf Dragapult (non-crit)",
                ],
                default: "94% → Greninja-Ash Surf Dragapult (non-crit)",
              },
            ],
          },
        ],
      },
      {
        line: "94% → Greninja-Ash Surf Dragapult (non-crit)",
        if: ["94% → Greninja-Ash Surf Spiritomb"],
        matchups: [
          {
            matchup: ["Delphox", "Spiritomb"],
            turns: [],
            branches: [
              {
                branches: [
                  "50% → Spiritomb Will-O-Wisp Greninja-Ash",
                  "43% → Spiritomb Will-O-Wisp Dragapult",
                  "7% → Spiritomb Will-O-Wisp Dragapult (miss)",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "6% → Greninja-Ash Surf Dragapult",
        if: ["94% → Greninja-Ash Surf Spiritomb"],
        matchups: [
          {
            matchup: ["Delphox", "Spiritomb"],
            turns: [],
            branches: [
              {
                branches: [
                  "50% → Spiritomb Will-O-Wisp Greninja-Ash",
                  "43% → Spiritomb Will-O-Wisp Dragapult",
                  "7% → Spiritomb Will-O-Wisp Dragapult (miss)",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "50% → Spiritomb Will-O-Wisp Greninja-Ash",
        if: ["94% → Greninja-Ash Surf Spiritomb", "94% → Greninja-Ash Surf Dragapult (non-crit)"],
        matchups: [
          {
            matchup: ["Delphox", "Spiritomb"],
            turns: [
              [
                { opponent: "{o:Dragapult} Spirit Shackle {o:Delphox} to {=:1}" },
                {
                  player:
                    "{p:Greninja-Ash} Surf {o:Delphox} to {=:0} and {o:Spiritomb} to {=:113} and {o:Dragapult} (non-crit) to {=:207}",
                },
                { opponent: "{o:Delphox} fainted" },
                { opponent: "{p:Greninja-Ash} transform" },
                { opponent: "{o:Spiritomb} Will-O-Wisp {p:Greninja-Ash}" },
                { opponent: "{p:Greninja-Ash} burn to {=:216}" },
              ],
            ],
          },
          {
            matchup: ["Mewtwo-MegaY", "Spiritomb"],
            turns: [],
            branches: [
              {
                branches: [
                  "94% → Dragapult Spirit Shackle Mewtwo-MegaY",
                  "6% → Dragapult Spirit Shackle Mewtwo-MegaY (to 0)",
                ],
              },
            ],
          },
        ],
        frags: { "Greninja-Ash": 1 },
      },
      {
        line: "50% → Spiritomb Will-O-Wisp Greninja-Ash",
        if: ["94% → Greninja-Ash Surf Spiritomb", "6% → Greninja-Ash Surf Dragapult"],
        matchups: [
          {
            matchup: ["Delphox", "Spiritomb"],
            turns: [
              [
                { opponent: "{o:Dragapult} Spirit Shackle {o:Delphox} to {=:1}" },
                {
                  player:
                    "{p:Greninja-Ash} Surf {o:Delphox} to {=:0} and {o:Spiritomb} to {=:113} and {o:Dragapult} to {=:179}",
                },
                { opponent: "{o:Delphox} fainted" },
                { opponent: "{p:Greninja-Ash} transform" },
                { opponent: "{o:Spiritomb} Will-O-Wisp {p:Greninja-Ash}" },
                { opponent: "{p:Greninja-Ash} burn to {=:216}" },
              ],
            ],
          },
          {
            matchup: ["Mewtwo-MegaY", "Spiritomb"],
            turns: [],
            branches: [
              {
                branches: [
                  "94% → Dragapult Spirit Shackle Mewtwo-MegaY",
                  "6% → Dragapult Spirit Shackle Mewtwo-MegaY (to 0)",
                ],
              },
            ],
          },
        ],
        frags: { "Greninja-Ash": 1 },
      },
      {
        line: "43% → Spiritomb Will-O-Wisp Dragapult",
        if: ["94% → Greninja-Ash Surf Spiritomb", "94% → Greninja-Ash Surf Dragapult (non-crit)"],
        matchups: [
          {
            matchup: ["Delphox", "Spiritomb"],
            turns: [
              [
                { opponent: "{o:Dragapult} Spirit Shackle {o:Delphox} to {=:1}" },
                {
                  player:
                    "{p:Greninja-Ash} Surf {o:Delphox} to {=:0} and {o:Spiritomb} to {=:113} and {o:Dragapult} (non-crit) to {=:207}",
                },
                { opponent: "{o:Delphox} fainted" },
                { opponent: "{p:Greninja-Ash} transform" },
                { opponent: "{o:Spiritomb} Will-O-Wisp {o:Dragapult}" },
                { opponent: "{o:Dragapult} burn to {=:191}" },
              ],
            ],
          },
          {
            matchup: ["Mewtwo-MegaY", "Spiritomb"],
            turns: [],
            branches: [
              {
                branches: [
                  "93% → Greninja-Ash U-Turn Mewtwo-MegaY",
                  "7% → Greninja-Ash U-Turn Mewtwo-MegaY (to 0)",
                ],
              },
            ],
          },
        ],
        frags: { "Greninja-Ash": 1 },
      },
      {
        line: "43% → Spiritomb Will-O-Wisp Dragapult",
        if: ["94% → Greninja-Ash Surf Spiritomb", "6% → Greninja-Ash Surf Dragapult"],
        matchups: [
          {
            matchup: ["Delphox", "Spiritomb"],
            turns: [
              [
                { opponent: "{o:Dragapult} Spirit Shackle {o:Delphox} to {=:1}" },
                {
                  player:
                    "{p:Greninja-Ash} Surf {o:Delphox} to {=:0} and {o:Spiritomb} to {=:113} and {o:Dragapult} to {=:179}",
                },
                { opponent: "{o:Delphox} fainted" },
                { opponent: "{p:Greninja-Ash} transform" },
                { opponent: "{o:Spiritomb} Will-O-Wisp {o:Dragapult}" },
                { opponent: "{o:Dragapult} burn to {=:163}" },
              ],
            ],
          },
          {
            matchup: ["Mewtwo-MegaY", "Spiritomb"],
            turns: [],
            branches: [
              {
                branches: [
                  "93% → Greninja-Ash U-Turn Mewtwo-MegaY",
                  "7% → Greninja-Ash U-Turn Mewtwo-MegaY (to 0)",
                ],
              },
            ],
          },
        ],
        frags: { "Greninja-Ash": 1 },
      },
      {
        line: "7% → Spiritomb Will-O-Wisp Dragapult (miss)",
        if: ["94% → Greninja-Ash Surf Spiritomb", "94% → Greninja-Ash Surf Dragapult (non-crit)"],
        matchups: [
          {
            matchup: ["Delphox", "Spiritomb"],
            turns: [
              [
                { opponent: "{o:Dragapult} Spirit Shackle {o:Delphox} to {=:1}" },
                {
                  player:
                    "{p:Greninja-Ash} Surf {o:Delphox} to {=:0} and {o:Spiritomb} to {=:113} and {o:Dragapult} (non-crit) to {=:207}",
                },
                { opponent: "{o:Delphox} fainted" },
                { opponent: "{p:Greninja-Ash} transform" },
                { opponent: "{o:Spiritomb} Will-O-Wisp {o:Dragapult} (miss)" },
              ],
            ],
          },
          {
            matchup: ["Mewtwo-MegaY", "Spiritomb"],
            turns: [],
            branches: [
              {
                branches: [
                  "94% → Dragapult Spirit Shackle Mewtwo-MegaY",
                  "6% → Dragapult Spirit Shackle Mewtwo-MegaY (to 0)",
                ],
              },
            ],
          },
        ],
        frags: { "Greninja-Ash": 1 },
      },
      {
        line: "7% → Spiritomb Will-O-Wisp Dragapult (miss)",
        if: ["94% → Greninja-Ash Surf Spiritomb", "6% → Greninja-Ash Surf Dragapult"],
        matchups: [
          {
            matchup: ["Delphox", "Spiritomb"],
            turns: [
              [
                { opponent: "{o:Dragapult} Spirit Shackle {o:Delphox} to {=:1}" },
                {
                  player:
                    "{p:Greninja-Ash} Surf {o:Delphox} to {=:0} and {o:Spiritomb} to {=:113} and {o:Dragapult} to {=:179}",
                },
                { opponent: "{o:Delphox} fainted" },
                { opponent: "{p:Greninja-Ash} transform" },
                { opponent: "{o:Spiritomb} Will-O-Wisp {o:Dragapult} (miss)" },
              ],
            ],
          },
          {
            matchup: ["Mewtwo-MegaY", "Spiritomb"],
            turns: [],
            branches: [
              {
                branches: [
                  "94% → Dragapult Spirit Shackle Mewtwo-MegaY",
                  "6% → Dragapult Spirit Shackle Mewtwo-MegaY (to 0)",
                ],
              },
            ],
          },
        ],
        frags: { "Greninja-Ash": 1 },
      },
      {
        line: "94% → Dragapult Spirit Shackle Mewtwo-MegaY",
        if: ["94% → Greninja-Ash Surf Dragapult (non-crit)"],
        matchups: [
          {
            matchup: ["Mewtwo-MegaY", "Spiritomb"],
            turns: [],
            branches: [
              {
                branches: [
                  "12% → Mewtwo-MegaY Soul Robbery Dragapult",
                  "88% → Mewtwo-MegaY Soul Robbery Dragapult (to 0)",
                ],
                default: "88% → Mewtwo-MegaY Soul Robbery Dragapult (to 0)",
              },
            ],
          },
        ],
      },
      {
        line: "12% → Mewtwo-MegaY Soul Robbery Dragapult",
        matchups: [
          {
            matchup: ["Mewtwo-MegaY", "Spiritomb"],
            turns: [
              [
                { opponent: "{o:Dragapult} Spirit Shackle {o:Mewtwo-MegaY} to {-:56}" },
                { opponent: "{o:Mewtwo-MegaY} Soul Robbery {o:Dragapult} to {+:3}" },
                { player: "{p:Greninja-Ash} U-Turn {o:Dragapult} to {=:0}" },
                { opponent: "{o:Dragapult} fainted" },
                { player: "{p:Greninja-Ash} switch to {p:Houndoom-Mega}" },
                { opponent: "{o:Spiritomb} Will-O-Wisp {p:Houndoom-Mega}" },
              ],
              [
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Houndoom-Mega} and {o:Dialga} to {-:199}",
                },
                {
                  player:
                    "{p:Houndoom-Mega} Fiery Wrath {o:Mewtwo-MegaY} to {=:0} and {o:Spiritomb} to {-:41}",
                },
                { opponent: "{o:Mewtwo-MegaY} mega evolve to {=:284}" },
                { opponent: "{o:Dialga} Dragon Pulse {o:Spiritomb} to {=:0}" },
                { opponent: "{o:Spiritomb} fainted" },
              ],
            ],
            branches: [{ branches: ["Houndoom-Mega switch to Golisopod"] }],
          },
        ],
        frags: { "Houndoom-Mega": 1 },
      },
      {
        line: "88% → Mewtwo-MegaY Soul Robbery Dragapult (to 0)",
        matchups: [
          {
            matchup: ["Mewtwo-MegaY", "Spiritomb"],
            turns: [
              [
                { opponent: "{o:Dragapult} Spirit Shackle {o:Mewtwo-MegaY} to {-:56}" },
                { opponent: "{o:Mewtwo-MegaY} Soul Robbery {o:Dragapult} to {=:0}" },
                { opponent: "{o:Dragapult} fainted" },
                { player: "{p:Greninja-Ash} U-Turn {o:Dragapult} → {o:Spiritomb} to {-:97}" },
                { player: "{p:Greninja-Ash} switch to {p:Houndoom-Mega}" },
                { opponent: "{o:Spiritomb} Will-O-Wisp {p:Houndoom-Mega}" },
              ],
              [
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Houndoom-Mega} and {o:Dialga} to {-:199}",
                },
                { player: "{p:Houndoom-Mega} Foul Play {o:Mewtwo-MegaY} to {=:0}" },
                { opponent: "{o:Mewtwo-MegaY} mega evolve to {=:284}" },
                { opponent: "{o:Dialga} Dragon Pulse {o:Spiritomb} to {=:0}" },
                { opponent: "{o:Spiritomb} fainted" },
              ],
            ],
            branches: [{ branches: ["Houndoom-Mega switch to Golisopod"] }],
          },
        ],
        frags: { "Houndoom-Mega": 1 },
      },
      {
        line: "94% → Dragapult Spirit Shackle Mewtwo-MegaY",
        if: ["6% → Greninja-Ash Surf Dragapult"],
        matchups: [
          {
            matchup: ["Mewtwo-MegaY", "Spiritomb"],
            turns: [
              [
                { opponent: "{o:Dragapult} Spirit Shackle {o:Mewtwo-MegaY} to {-:56}" },
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Greninja-Ash} and {o:Dragapult} to {=:0}",
                },
                { opponent: "{o:Dragapult} fainted" },
                { player: "{p:Greninja-Ash} U-Turn {o:Dragapult} → {o:Spiritomb} to {-:97}" },
                { player: "{p:Greninja-Ash} switch to {p:Houndoom-Mega}" },
                { opponent: "{o:Spiritomb} Will-O-Wisp {p:Houndoom-Mega}" },
              ],
              [
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Houndoom-Mega} and {o:Dialga} to {-:199}",
                },
                { player: "{p:Houndoom-Mega} Foul Play {o:Mewtwo-MegaY} to {=:0}" },
                { opponent: "{o:Mewtwo-MegaY} mega evolve to {=:284}" },
                { opponent: "{o:Dialga} Dragon Pulse {o:Spiritomb} to {=:0}" },
                { opponent: "{o:Spiritomb} fainted" },
              ],
            ],
            branches: [{ branches: ["Houndoom-Mega switch to Golisopod"] }],
          },
        ],
        frags: { "Houndoom-Mega": 1 },
      },
      {
        line: "6% → Dragapult Spirit Shackle Mewtwo-MegaY (to 0)",
        matchups: [
          {
            matchup: ["Mewtwo-MegaY", "Spiritomb"],
            turns: [
              [
                { opponent: "{o:Dragapult} Spirit Shackle {o:Mewtwo-MegaY} (crit) to {=:0}" },
                { opponent: "{o:Mewtwo-MegaY} mega evolve to {=:284}" },
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Greninja-Ash} and {o:Dragapult} to {=:0}",
                },
                { opponent: "{o:Dragapult} fainted" },
                { player: "{p:Greninja-Ash} U-Turn {o:Dragapult} → {o:Spiritomb} to {-:97}" },
                { player: "{p:Greninja-Ash} switch to {p:Houndoom-Mega}" },
                { opponent: "{o:Spiritomb} Will-O-Wisp {p:Houndoom-Mega}" },
              ],
              [
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Houndoom-Mega} and {o:Dialga} to {-:180}",
                },
                { player: "{p:Houndoom-Mega} Thunder Fang {o:Spiritomb} to {-:68}" },
                { opponent: "{o:Dialga} Dragon Pulse {o:Spiritomb} to {=:0}" },
                { opponent: "{o:Spiritomb} fainted" },
              ],
            ],
            branches: [{ branches: ["Houndoom-Mega switch to Golisopod 2"] }],
          },
        ],
        frags: { "Houndoom-Mega": 1 },
      },
      {
        line: "93% → Greninja-Ash U-Turn Mewtwo-MegaY",
        if: ["94% → Greninja-Ash Surf Spiritomb"],
        matchups: [
          {
            matchup: ["Mewtwo-MegaY", "Spiritomb"],
            turns: [
              [
                { opponent: "{o:Dragapult} Spirit Shackle {o:Mewtwo-MegaY} to {-:170}" },
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Greninja-Ash} and {o:Dragapult} to {=:0}",
                },
                { opponent: "{o:Dragapult} fainted" },
                { player: "{p:Greninja-Ash} U-Turn {o:Mewtwo-MegaY} to {-:96}" },
                { player: "{p:Greninja-Ash} switch to {p:Houndoom-Mega}" },
                { opponent: "{o:Spiritomb} Will-O-Wisp {p:Houndoom-Mega}" },
              ],
              [
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Houndoom-Mega} and {o:Dialga} to {-:199}",
                },
                {
                  player:
                    "{p:Houndoom-Mega} Fiery Wrath {o:Mewtwo-MegaY} to {=:0} and {o:Spiritomb} to {-:41}",
                },
                { opponent: "{o:Mewtwo-MegaY} mega evolve to {=:284}" },
                { opponent: "{o:Dialga} Dragon Pulse {o:Spiritomb} to {=:0}" },
                { opponent: "{o:Spiritomb} fainted" },
              ],
            ],
            branches: [{ branches: ["Houndoom-Mega switch to Golisopod"] }],
          },
        ],
        frags: { "Houndoom-Mega": 1 },
      },
      {
        line: "7% → Greninja-Ash U-Turn Mewtwo-MegaY (to 0)",
        if: ["94% → Greninja-Ash Surf Spiritomb"],
        matchups: [
          {
            matchup: ["Mewtwo-MegaY", "Spiritomb"],
            turns: [
              [
                { opponent: "{o:Dragapult} Spirit Shackle {o:Mewtwo-MegaY} to {-:170}" },
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Greninja-Ash} and {o:Dragapult} to {=:0}",
                },
                { opponent: "{o:Dragapult} fainted" },
                { player: "{p:Greninja-Ash} U-Turn {o:Mewtwo-MegaY} (crit) to {=:0}" },
                { opponent: "{o:Mewtwo-MegaY} mega evolve to {=:284}" },
                { player: "{p:Greninja-Ash} switch to {p:Houndoom-Mega}" },
                { opponent: "{o:Spiritomb} Will-O-Wisp {p:Houndoom-Mega}" },
              ],
              [
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Houndoom-Mega} and {o:Dialga} to {-:180}",
                },
                { player: "{p:Houndoom-Mega} Thunder Fang {o:Spiritomb} to {-:68}" },
                { opponent: "{o:Dialga} Dragon Pulse {o:Spiritomb} to {=:0}" },
                { opponent: "{o:Spiritomb} fainted" },
              ],
            ],
            branches: [{ branches: ["Houndoom-Mega switch to Golisopod 2"] }],
          },
        ],
        frags: { "Houndoom-Mega": 1 },
      },
      {
        line: "Houndoom-Mega switch to Golisopod",
        matchups: [
          {
            matchup: ["Mewtwo-MegaY", "Silvally-Fairy"],
            turns: [],
            branches: [
              {
                branches: [
                  "87% → Dialga Flash Cannon Silvally-Fairy",
                  "13% → Dialga Flash Cannon Silvally-Fairy (to 0)",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "87% → Dialga Flash Cannon Silvally-Fairy",
        matchups: [
          {
            matchup: ["Mewtwo-MegaY", "Silvally-Fairy"],
            turns: [
              [
                { player: "{p:Houndoom-Mega} switch to {p:Golisopod}" },
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Golisopod} to {+:1} and {o:Dialga} to {+:95}",
                },
                { opponent: "{o:Silvally-Fairy} Thunder Wave {p:Golisopod}" },
                { opponent: "{o:Dialga} Flash Cannon {o:Silvally-Fairy} to {-:40}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Houndoom-Mega}" },
                { opponent: "{o:Silvally-Fairy} Leftovers to {-:57}" },
              ],
              [
                { player: "{p:Houndoom-Mega} mega evolve" },
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Houndoom-Mega} and {o:Dialga} (non-crit) to {+:26}",
                },
                {
                  player:
                    "{p:Houndoom-Mega} Fiery Wrath {o:Mewtwo-MegaY} to {-:72} and {o:Silvally-Fairy} to {=:0}",
                },
                { opponent: "{o:Silvally-Fairy} fainted" },
                { opponent: "{o:Dialga} Dragon Pulse {o:Mewtwo-MegaY} to {=:0}" },
                { opponent: "{o:Mewtwo-MegaY} fainted" },
              ],
              [
                "Risk →",
                {
                  danger:
                    "Mewtwo-MegaY Expand. Force Dialga ×3 (to 0) → {c:0.02%}",
                },
              ],
            ],
            branches: [{ branches: ["Houndoom-Mega Flamethrower Genesect"] }],
          },
        ],
        frags: { "Houndoom-Mega": 2 },
      },
      {
        line: "13% → Dialga Flash Cannon Silvally-Fairy (to 0)",
        matchups: [
          {
            matchup: ["Mewtwo-MegaY", "Silvally-Fairy"],
            turns: [
              [
                { player: "{p:Houndoom-Mega} switch to {p:Golisopod}" },
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Golisopod} to {+:1} and {o:Dialga} to {+:95}",
                },
                { opponent: "{o:Silvally-Fairy} Thunder Wave {p:Golisopod}" },
                { opponent: "{o:Dialga} Flash Cannon {o:Silvally-Fairy} to {=:0}" },
                { opponent: "{o:Silvally-Fairy} fainted" },
                { player: "{p:Golisopod} Emergency Exit to {p:Houndoom-Mega}" },
              ],
            ],
          },
          {
            matchup: ["Mewtwo-MegaY", "Genesect"],
            turns: [
              [
                { player: "{p:Houndoom-Mega} mega evolve" },
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Houndoom-Mega} and {o:Dialga} (non-crit) to {+:26}",
                },
                { player: "{p:Houndoom-Mega} Flamethrower {o:Genesect} to {=:0}" },
                { opponent: "{o:Genesect} fainted" },
                { opponent: "{o:Dialga} Dragon Pulse {o:Mewtwo-MegaY} to {-:178}" },
              ],
              [
                "Risk →",
                {
                  danger:
                    "Mewtwo-MegaY Expand. Force Dialga ×3 (to 0) → {c:0.02%}",
                },
              ],
            ],
          },
          {
            matchup: ["Mewtwo-MegaY", "Moltres-G"],
            turns: [
              [
                { opponent: "{o:Mewtwo-MegaY} Expand. Force {p:Houndoom-Mega} and {o:Dialga} to {=:0}" },
                { opponent: "{o:Dialga} fainted" },
                { player: "{p:Houndoom-Mega} Fiery Wrath {o:Mewtwo-MegaY} to {=:0} and {o:Moltres-G} to {-:207}" },
                { opponent: "{o:Mewtwo-MegaY} fainted" },
                { opponent: "{o:Moltres-G} Nasty Plot" },
              ],
            ],
          },
          {
            matchup: ["Moltres-G"],
            turns: [
              [
                { opponent: "{o:Salamence-Mega} Double-Edge {o:Moltres-G} to {-:12}" },
                { player: "{p:Houndoom-Mega} Flamethrower {o:Moltres-G} to {=:0}" },
                { opponent: "{o:Moltres-G} fainted" },
              ],
            ],
          },
        ],
        frags: { Golisopod: 1, "Houndoom-Mega": 3 },
      },
      {
        line: "Houndoom-Mega switch to Golisopod 2",
        matchups: [
          {
            matchup: ["Mewtwo-MegaY", "Silvally-Fairy"],
            turns: [],
            branches: [
              {
                branches: [
                  "87% → Dialga Flash Cannon Silvally-Fairy 2",
                  "13% → Dialga Flash Cannon Silvally-Fairy (to 0) 2",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "87% → Dialga Flash Cannon Silvally-Fairy 2",
        label: "87% → Dialga Flash Cannon Silvally-Fairy",
        matchups: [
          {
            matchup: ["Mewtwo-MegaY", "Silvally-Fairy"],
            turns: [
              [
                { player: "{p:Houndoom-Mega} switch to {p:Golisopod}" },
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Golisopod} to {+:1} and {o:Dialga} to {+:76}",
                },
                { opponent: "{o:Silvally-Fairy} Thunder Wave {p:Golisopod}" },
                { opponent: "{o:Dialga} Flash Cannon {o:Silvally-Fairy} to {-:40}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Houndoom-Mega}" },
                { opponent: "{o:Silvally-Fairy} Leftovers to {-:57}" },
              ],
              [
                { player: "{p:Houndoom-Mega} mega evolve" },
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Houndoom-Mega} and {o:Dialga} (non-crit) to {+:9}",
                },
                {
                  player:
                    "{p:Houndoom-Mega} Fiery Wrath {o:Mewtwo-MegaY} to {-:72} and {o:Silvally-Fairy} to {=:0}",
                },
                { opponent: "{o:Silvally-Fairy} fainted" },
                { opponent: "{o:Dialga} Dragon Pulse {o:Mewtwo-MegaY} to {=:0}" },
                { opponent: "{o:Mewtwo-MegaY} fainted" },
              ],
              [
                "Risk →",
                {
                  danger:
                    "Mewtwo-MegaY Expand. Force Dialga ×3 (to 0) → {c:0.02%}",
                },
              ],
            ],
            branches: [{ branches: ["Houndoom-Mega Flamethrower Genesect"] }],
          },
        ],
        frags: { "Houndoom-Mega": 2 },
      },
      {
        line: "13% → Dialga Flash Cannon Silvally-Fairy (to 0) 2",
        label: "13% → Dialga Flash Cannon Silvally-Fairy (to 0)",
        matchups: [
          {
            matchup: ["Mewtwo-MegaY", "Silvally-Fairy"],
            turns: [
              [
                { player: "{p:Houndoom-Mega} switch to {p:Golisopod}" },
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Golisopod} to {+:1} and {o:Dialga} to {+:95}",
                },
                { opponent: "{o:Silvally-Fairy} Thunder Wave {p:Golisopod}" },
                { opponent: "{o:Dialga} Flash Cannon {o:Silvally-Fairy} to {=:0}" },
                { opponent: "{o:Silvally-Fairy} fainted" },
                { player: "{p:Golisopod} Emergency Exit to {p:Houndoom-Mega}" },
              ],
            ],
          },
          {
            matchup: ["Mewtwo-MegaY", "Genesect"],
            turns: [
              [
                { player: "{p:Houndoom-Mega} mega evolve" },
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Houndoom-Mega} and {o:Dialga} (non-crit) to {+:9}",
                },
                { player: "{p:Houndoom-Mega} Flamethrower {o:Genesect} to {=:0}" },
                { opponent: "{o:Genesect} fainted" },
                { opponent: "{o:Dialga} Dragon Pulse {o:Mewtwo-MegaY} to {-:178}" },
              ],
              [
                "Risk →",
                {
                  danger:
                    "Mewtwo-MegaY Expand. Force Dialga ×3 (to 0) → {c:0.02%}",
                },
              ],
            ],
          },
          {
            matchup: ["Mewtwo-MegaY", "Moltres-G"],
            turns: [
              [
                { opponent: "{o:Mewtwo-MegaY} Expand. Force {p:Houndoom-Mega} and {o:Dialga} to {=:0}" },
                { opponent: "{o:Dialga} fainted" },
                { player: "{p:Houndoom-Mega} Fiery Wrath {o:Mewtwo-MegaY} to {=:0} and {o:Moltres-G} to {-:207}" },
                { opponent: "{o:Mewtwo-MegaY} fainted" },
                { opponent: "{o:Moltres-G} Nasty Plot" },
              ],
            ],
          },
          {
            matchup: ["Moltres-G"],
            turns: [
              [
                { opponent: "{o:Salamence-Mega} Double-Edge {o:Moltres-G} to {-:12}" },
                { player: "{p:Houndoom-Mega} Flamethrower {o:Moltres-G} to {=:0}" },
                { opponent: "{o:Moltres-G} fainted" },
              ],
            ],
          },
        ],
        frags: { Golisopod: 1, "Houndoom-Mega": 3 },
      },
      {
        line: "Houndoom-Mega Flamethrower Genesect",
        matchups: [
          {
            matchup: ["Genesect", "Moltres-G"],
            turns: [
              [
                { player: "{p:Houndoom-Mega} Flamethrower {o:Genesect} to {=:0}" },
                { opponent: "{o:Genesect} fainted" },
                { opponent: "{o:Moltres-G} Nasty Plot" },
                { opponent: "{o:Dialga} Flamethrower {o:Moltres-G} to {-:185}" },
              ],
            ],
            branches: [{ branches: ["Houndoom-Mega switch to Greninja-Ash"] }],
          },
        ],
        frags: { "Houndoom-Mega": 1 },
      },
      {
        line: "Houndoom-Mega switch to Greninja-Ash",
        if: ["50% → Spiritomb Will-O-Wisp Greninja-Ash"],
        matchups: [
          {
            matchup: ["Moltres-G"],
            turns: [
              [
                { player: "{p:Houndoom-Mega} switch to {p:Greninja-Ash}" },
                {
                  opponent:
                    "{o:Moltres-G} Fiery Wrath {p:Greninja-Ash} to {+:79} and {o:Dialga} to {=:0}",
                },
                { opponent: "{o:Dialga} fainted" },
                { opponent: "{p:Greninja-Ash} burn to {+:65}" },
              ],
              [
                { opponent: "{o:Salamence-Mega} mega evolve" },
                { opponent: "{o:Salamence-Mega} Double-Edge {o:Moltres-G} to {=:0}" },
                { opponent: "{o:Salamence-Mega} recoil to {+:212}" },
                { opponent: "{o:Moltres-G} fainted" },
              ],
            ],
          },
        ],
        frags: { "Greninja-Ash": 1 },
      },
      {
        line: "Houndoom-Mega switch to Greninja-Ash",
        ifNot: ["50% → Spiritomb Will-O-Wisp Greninja-Ash"],
        matchups: [
          {
            matchup: ["Moltres-G"],
            turns: [
              [
                { player: "{p:Houndoom-Mega} switch to {p:Greninja-Ash}" },
                {
                  opponent:
                    "{o:Moltres-G} Fiery Wrath {p:Greninja-Ash} to {+:93} and {o:Dialga} to {=:0}",
                },
                { opponent: "{o:Dialga} fainted" },
              ],
              [
                { opponent: "{o:Salamence-Mega} mega evolve" },
                { opponent: "{o:Salamence-Mega} Double-Edge {o:Moltres-G} to {=:0}" },
                { opponent: "{o:Salamence-Mega} recoil to {+:212}" },
                { opponent: "{o:Moltres-G} fainted" },
              ],
            ],
          },
        ],
        frags: { "Greninja-Ash": 1 },
      },
      {
        line: "6% → Greninja-Ash Surf Spiritomb (crit)",
        matchups: [
          {
            matchup: ["Delphox", "Spiritomb"],
            turns: [
              [
                { opponent: "{o:Dragapult} Spirit Shackle {o:Delphox} to {=:1}" },
                {
                  player:
                    "{p:Greninja-Ash} Surf {o:Delphox} to {=:0} and {o:Spiritomb} (crit) to {=:73} and {o:Dragapult} to {+:179}",
                },
                { opponent: "{o:Delphox} fainted" },
                { opponent: "{p:Greninja-Ash} transform" },
                { opponent: "{o:Spiritomb} Will-O-Wisp {o:Dragapult}" },
                { opponent: "{o:Dragapult} burn to {+:163}" },
              ],
              [
                "Risk →",
                {
                  danger:
                    "Greninja-Ash Surf Spiritomb (crit) → Spiritomb Will-O-Wisp Dragapult (miss) → Dragapult Spirit Shackle Spiritomb (to 0) → {c:3.6%}",
                },
              ],
            ],
          },
          {
            matchup: ["Mewtwo-MegaY", "Spiritomb"],
            turns: [],
            branches: [
              {
                branches: [
                  "93% → Greninja-Ash U-Turn Mewtwo-MegaY",
                  "7% → Greninja-Ash U-Turn Mewtwo-MegaY (to 0)",
                ],
              },
            ],
          },
        ],
        frags: { "Greninja-Ash": 1 },
      },
      {
        line: "93% → Greninja-Ash U-Turn Mewtwo-MegaY",
        if: ["6% → Greninja-Ash Surf Spiritomb (crit)"],
        matchups: [
          {
            matchup: ["Mewtwo-MegaY", "Spiritomb"],
            turns: [
              [
                { opponent: "{o:Dragapult} Spirit Shackle {o:Mewtwo-MegaY} to {-:170}" },
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Greninja-Ash} and {o:Dragapult} to {=:0}",
                },
                { opponent: "{o:Dragapult} fainted" },
                { player: "{p:Greninja-Ash} U-Turn {o:Mewtwo-MegaY} to {-:96}" },
                { player: "{p:Greninja-Ash} switch to {p:Houndoom-Mega}" },
                { opponent: "{o:Spiritomb} Will-O-Wisp {p:Houndoom-Mega}" },
              ],
              [
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Houndoom-Mega} and {o:Dialga} to {-:199}",
                },
                { player: "{p:Houndoom-Mega} Foul Play {o:Mewtwo-MegaY} to {=:0}" },
                { opponent: "{o:Mewtwo-MegaY} mega evolve to {=:284}" },
                { opponent: "{o:Dialga} Dragon Pulse {o:Spiritomb} to {=:0}" },
                { opponent: "{o:Spiritomb} fainted" },
              ],
            ],
            branches: [{ branches: ["Houndoom-Mega switch to Golisopod"] }],
          },
        ],
        frags: { "Houndoom-Mega": 1 },
      },
      {
        line: "7% → Greninja-Ash U-Turn Mewtwo-MegaY (to 0)",
        if: ["6% → Greninja-Ash Surf Spiritomb (crit)"],
        matchups: [
          {
            matchup: ["Mewtwo-MegaY", "Spiritomb"],
            turns: [
              [
                { opponent: "{o:Dragapult} Spirit Shackle {o:Mewtwo-MegaY} to {-:170}" },
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Greninja-Ash} and {o:Dragapult} to {=:0}",
                },
                { opponent: "{o:Dragapult} fainted" },
                { player: "{p:Greninja-Ash} U-Turn {o:Mewtwo-MegaY} (crit) to {=:0}" },
                { opponent: "{o:Mewtwo-MegaY} mega evolve to {=:284}" },
                { player: "{p:Greninja-Ash} switch to {p:Houndoom-Mega}" },
                { opponent: "{o:Spiritomb} Will-O-Wisp {p:Houndoom-Mega}" },
              ],
              [
                {
                  opponent:
                    "{o:Mewtwo-MegaY} Expand. Force {p:Houndoom-Mega} and {o:Dialga} to {-:180}",
                },
                { player: "{p:Houndoom-Mega} Thunder Fang {o:Spiritomb} to {-:44}" },
                { opponent: "{o:Dialga} Dragon Pulse {o:Spiritomb} to {=:0}" },
                { opponent: "{o:Spiritomb} fainted" },
              ],
            ],
            branches: [{ branches: ["Houndoom-Mega switch to Golisopod 2"] }],
          },
        ],
        frags: { "Houndoom-Mega": 1 },
      },
    ],
  },
};

const _box11 = getBox({
  box: _box10,
  cap: 81,
});

export const ceruleanCaveGiovanniBoxChange: Moment = {
  split: "Clair",
  label: "Cerulean Cave Giovanni Box Change",
  kind: "boxChange",
  data: { playerBox: _box11 },
};

const _box12 = getBox({
  box: _box11,
  update: {
    Jellicent: {
      nature: "Modest",
      ability: "Water Bubble",
      item: "Life Orb",
      moves: ["Hydro Pump", "Ice Beam", "Scald", "Water Spout"],
    },
    Golisopod: {
      nature: "Lonely",
      ability: "Emergency Exit",
      item: "Focus Sash",
      moves: ["First Impress.", "Liquidation", "Poison Jab", "Rock Slide"],
    },
    Drednaw: {
      nature: "Adamant",
      ability: "Shell Armor",
      item: "Mystic Water",
      moves: ["Earthquake", "Flip Turn", "Ice Fang", "Stone Edge"],
    },
    "Darmanitan-GZ": {
      nature: "Jolly",
      ability: "Zen Mode",
      item: "Life Orb",
      moves: ["Flare Blitz", "Focus Punch", "Icicle Crash", "U-Turn"],
    },
    Perrserker: {
      nature: "Careful",
      ability: "Battle Armor",
      item: undefined,
      moves: ["Fake Out", "Bullet Punch", "Dig", "U-Turn"],
    },
    Golduck: {
      nature: "Bold",
      ability: "Neuroforce",
      item: "Expert Belt",
      moves: ["Encore", "Flip Turn", "Hydro Pump", "Me First"],
    },
  },
  team: ["Jellicent", "Golisopod", "Drednaw", "Darmanitan-GZ", "Perrserker", "Golduck"],
});

export const viridianCityLeaderClairBattle: Moment = {
  split: "Clair",
  label: "Viridian City Leader Clair Battle",
  kind: "battle",
  data: {
    playerBox: _box12,
    opponentBox: viridianCityLeaderClairBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Shuckle"],
            turns: [
              [
                { player: "{p:Jellicent} Water Spout {o:Shuckle} to {=:0}" },
                { opponent: "{p:Jellicent} Life Orb to {=:251}" },
                { opponent: "{o:Shuckle} fainted" },
              ],
            ],
          },
          {
            matchup: ["Eternatus"],
            turns: [
              [
                { player: "{p:Jellicent} switch to {p:Golisopod}" },
                { opponent: "{o:Eternatus} Dyna. Cannon {p:Golisopod} to {+:3}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Drednaw}" },
              ],
              [
                { opponent: "{o:Eternatus} Dyna. Cannon {p:Drednaw} to {+:66}" },
                { player: "{p:Drednaw} Flip Turn {o:Eternatus} to {-:301}" },
                { player: "{p:Drednaw} switch to {p:Darmanitan-GZ}" },
              ],
              [
                { player: "{p:Darmanitan-GZ} Icicle Crash {o:Eternatus} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:258}" },
                { opponent: "{o:Eternatus} fainted" },
              ],
            ],
          },
          {
            matchup: ["Roaring Moon"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Icicle Crash {o:Roaring Moon} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:230}" },
                { opponent: "{o:Roaring Moon} fainted" },
              ],
            ],
          },
          {
            matchup: ["Magearna"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} Flare Blitz {o:Magearna} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} recoil to {=:149}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:121}" },
                { opponent: "{o:Magearna} fainted" },
              ],
            ],
          },
          {
            matchup: ["Necrozma-Ultra"],
            turns: [
              [
                { opponent: "{o:Necrozma-Ultra} transform" },
                { player: "{p:Darmanitan-GZ} Icicle Crash {o:Necrozma-Ultra} to {=:0}" },
                { opponent: "{p:Darmanitan-GZ} Life Orb to {=:93}" },
                { opponent: "{o:Necrozma-Ultra} fainted" },
              ],
            ],
          },
          {
            matchup: ["Archaludon"],
            turns: [
              [
                { player: "{p:Darmanitan-GZ} switch to {p:Perrserker}" },
                { opponent: "{o:Archaludon} Body Press {p:Perrserker} to {+:121}" },
              ],
              [
                { player: "{p:Perrserker} switch to {p:Golduck}" },
                { opponent: "{o:Archaludon} Body Press {p:Golduck} to {+:187}" },
              ],
              [
                { player: "{p:Golduck} Encore {o:Archaludon}" },
                { opponent: "{o:Archaludon} Body Press {p:Golduck} to {+:129}" },
              ],
              [
                { player: "{p:Golduck} Me First (Body Press) {o:Archaludon} to {-:108}" },
                { opponent: "{o:Archaludon} Body Press {p:Golduck} to {+:71}" },
              ],
              [
                { player: "{p:Golduck} Me First (Body Press) {o:Archaludon} to {=:0}" },
                { opponent: "{o:Archaludon} fainted" },
              ],
            ],
          },
        ],
        frags: { Jellicent: 1, "Darmanitan-GZ": 4, Golduck: 1 },
      },
    ],
  },
};

export const box = _box12;

export const moments: Moment[] = [
  clairBoxChange,
  ceruleanCaveGrunt1Battle,
  ceruleanCaveGrunt1BoxChange,
  ceruleanCaveGrunt2Battle,
  ceruleanCaveArcherBattle,
  ceruleanCaveArianaBattle,
  ceruleanCaveArianaBoxChange,
  ceruleanCaveGiovanniBattle,
  ceruleanCaveGiovanniBoxChange,
  viridianCityLeaderClairBattle,
];
