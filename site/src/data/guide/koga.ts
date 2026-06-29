import { getBox } from "@site/src/utils/box";
import { Moment } from "@site/src/utils/moments";
import {
  fuschiaCityBrendanBox,
  route16BikerLaoBox,
  route16BikerRubenBox,
  route16CueBallCamronBox,
  route16CueBallKojiBox,
  route16CueBallLukeBox,
  route16RiderHideoBox,
  route18AceTrainerWiltonBox,
  route18BikerWilliamBox,
  route18BirdKeeperJacobBox,
} from "@site/src/utils/opponents";
import { getKogaSecrets } from "./kogaSecrets";

import { box as _box1 } from "@site/src/data/guide/sabrina";

const _dreepy = {
  name: "Dreepy",
  level: "30",
  moves: ["Astonish", "Bite", "Infestation", "Quick Attack"],
};

const _box2 = getBox({ box: _box1, add: [_dreepy] });

export const celadonCityEncounter: Moment = {
  split: "Koga",
  label: "Celadon City Encounter",
  kind: "encounter",
  data: { pokemon: _dreepy, playerBox: _box2 },
};

const _box3 = getBox({
  box: _box2,
  cap: 68,
  update: [
    {
      Dreepy: {
        name: "Drakloak",
      },
    },
    {
      Drakloak: {
        name: "Dragapult",
        moves: ["Astonish", "Dragon Darts", "Infestation", "Quick Attack"],
      },
    },
  ],
});

export const celadonCityBoxChange: Moment = {
  split: "Koga",
  label: "Koga Box Change",
  kind: "boxChange",
  data: { playerBox: _box3 },
};

const _box4 = getBox({
  box: _box3,
  update: {
    Excadrill: {
      nature: "Adamant",
      ability: "Sand Rush",
      item: "Soft Sand",
      moves: ["Aerial Ace", "Earthquake", "Rock Slide", "Shadow Claw"],
    },
    Dragapult: {
      nature: "Adamant",
      ability: "Clear Body",
      item: "Dragon Fang",
      moves: ["Astonish", "Dragon Darts", "Lock-On", "Quick Attack"],
    },
    Golisopod: {
      nature: "Brave",
      ability: "Emergency Exit",
      item: "Iron Ball",
      moves: ["Drill Run", "Liquidation", "Poison Jab", "Rock Tomb"],
    },
    Clodsire: {
      nature: "Careful",
      ability: "Water Absorb",
      item: "Sitrus Berry",
      moves: ["Bulldoze", "Rock Slide", "Rock Tomb", "Yawn"],
    },
    Meowscarada: {
      nature: "Brave",
      ability: "Protean",
      item: undefined,
      moves: ["Acrobatics", "Flower Trick", "Play Rough", "Thunder Punch"],
    },
  },
  team: ["Excadrill", "Dragapult", "Golisopod", "Clodsire", { name: "Meowscarada", extra: true }],
});

export const route16BikerLaoBattle: Moment = {
  split: "Koga",
  label: "Route 16 Biker Lao Battle",
  kind: "battle",
  data: {
    playerBox: _box4,
    opponentBox: route16BikerLaoBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Mienshao"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Dragapult}" },
                { opponent: "{o:Mienshao} Close Combat {p:Dragapult}" },
                { opponent: "{p:Dragapult} sandstorm to {=:205}" },
              ],
              [
                { player: "{p:Dragapult} Dragon Darts {o:Mienshao} to {=:0}" },
                { opponent: "{o:Mienshao} fainted" },
                { opponent: "{p:Dragapult} sandstorm to {=:192}" },
              ],
            ],
          },
          {
            matchup: ["Dugtrio-A"],
            turns: [
              [
                { player: "{p:Dragapult} switch to {p:Golisopod}" },
                { opponent: "{o:Dugtrio-A} Earthquake {p:Golisopod} to {+:115}" },
                { opponent: "{o:Dugtrio-A} Life Orb to {=:128}" },
                { opponent: "{p:Golisopod} sandstorm to {+:103}" },
              ],
              [
                { player: "{p:Golisopod} switch to {p:Excadrill}" },
                { opponent: "{o:Dugtrio-A} Stone Edge {p:Excadrill} to {+:192}" },
                { opponent: "{o:Dugtrio-A} Life Orb to {-:128}" },
              ],
              [
                { player: "{p:Excadrill} Earthquake {o:Dugtrio-A} to {=:0}" },
                { opponent: "{o:Dugtrio-A} fainted" },
              ],
            ],
          },
          {
            matchup: ["Heliolisk"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Clodsire}" },
                { opponent: "{o:Heliolisk} Surf {p:Clodsire}" },
              ],
              [
                { opponent: "{o:Heliolisk} Boomburst {p:Clodsire} (non-crit) to {+:161}" },
                { player: "{p:Clodsire} Yawn {o:Heliolisk}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Dragapult}" },
                { opponent: "{o:Heliolisk} Boomburst {p:Dragapult}" },
                { opponent: "{p:Dragapult} sandstorm to {=:179}" },
              ],
              [
                { player: "{p:Dragapult} Lock-On {o:Heliolisk}" },
                { opponent: "{o:Heliolisk} sleep" },
                { opponent: "{p:Dragapult} sandstorm to {=:166}" },
              ],
              [
                { player: "{p:Dragapult} Dragon Darts {o:Heliolisk} to {=:0}" },
                { opponent: "{o:Heliolisk} fainted" },
              ],
            ],
          },
        ],
        frags: { Dragapult: 2, Excadrill: 1 },
      },
    ],
  },
};

const _box5 = getBox({
  box: _box4,
  team: [
    "Excadrill",
    { name: "Dragapult", extra: true },
    { name: "Golisopod", extra: true },
    { name: "Clodsire", extra: true },
    { name: "Meowscarada", extra: true },
  ],
});

export const route16CueBallKojiBattle: Moment = {
  split: "Koga",
  label: "Route 16 Cue Ball Koji Battle",
  kind: "battle",
  data: {
    playerBox: _box5,
    opponentBox: route16CueBallKojiBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Kingler"],
            turns: [
              [
                { opponent: "{o:Kingler} mega evolve" },
                { player: "{p:Excadrill} Earthquake {o:Kingler} to {=:0}" },
                { opponent: "{o:Kingler} fainted" },
              ],
            ],
          },
          {
            matchup: ["Dracozolt"],
            turns: [
              [
                { player: "{p:Excadrill} Earthquake {o:Dracozolt} to {=:0}" },
                { opponent: "{o:Dracozolt} fainted" },
              ],
            ],
          },
        ],
        frags: { Excadrill: 2 },
      },
    ],
  },
};

const _box6 = getBox({
  box: _box5,
  team: [
    "Excadrill",
    "Dragapult",
    { name: "Golisopod", extra: true },
    { name: "Clodsire", extra: true },
    "Meowscarada",
  ],
});

export const route16CueBallLukeBattle: Moment = {
  split: "Koga",
  label: "Route 16 Cue Ball Luke Battle",
  kind: "battle",
  data: {
    playerBox: _box6,
    opponentBox: route16CueBallLukeBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Zygarde-10"],
            turns: [
              [
                { player: "{p:Excadrill} Earthquake {o:Zygarde-10} to {=:0}" },
                { opponent: "{o:Zygarde-10} fainted" },
              ],
            ],
          },
          {
            matchup: ["Hariyama"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Dragapult}" },
                { opponent: "{o:Hariyama} Drain Punch {p:Dragapult}" },
                { opponent: "{p:Dragapult} sandstorm to {=:153}" },
                { opponent: "{o:Hariyama} sandstorm to {=:272}" },
              ],
              [
                { player: "{p:Dragapult} switch to {p:Meowscarada}" },
                { opponent: "{o:Hariyama} Knock Off {p:Meowscarada} to {+:160}" },
                { opponent: "{p:Meowscarada} sandstorm to {+:148}" },
                { opponent: "{o:Hariyama} sandstorm to {=:254}" },
              ],
              [
                { player: "{p:Meowscarada} Acrobatics {o:Hariyama} to {=:0}" },
                { opponent: "{o:Hariyama} fainted" },
                { opponent: "{p:Meowscarada} sandstorm to {+:136}" },
              ],
            ],
          },
          {
            matchup: ["Golem"],
            turns: [
              [
                { player: "{p:Meowscarada} Flower Trick {o:Golem} to {=:0}" },
                { opponent: "{o:Golem} fainted" },
              ],
            ],
          },
        ],
        frags: { Excadrill: 1, Meowscarada: 2 },
      },
    ],
  },
};

const _box7 = getBox({
  box: _box6,
  update: {
    Excadrill: {
      nature: "Adamant",
      ability: "Sand Rush",
      item: "Soft Sand",
      moves: ["Aerial Ace", "Earthquake", "Rock Slide", "Shadow Claw"],
    },
    Golisopod: {
      nature: "Impish",
      ability: "Emergency Exit",
      item: "Iron Ball",
      moves: ["Drill Run", "Liquidation", "Poison Jab", "Rock Tomb"],
    },
    Golduck: {
      nature: "Rash",
      ability: "Cloud Nine",
      item: "Twisted Spoon",
      moves: ["Aqua Jet", "Hydro Pump", "Psychic", "Scald"],
    },
    Dragapult: {
      nature: "Adamant",
      ability: "Clear Body",
      item: "Dragon Fang",
      moves: ["Astonish", "Dragon Darts", "Lock-On", "U-Turn"],
    },
  },
  team: ["Excadrill", "Golisopod", "Golduck", "Dragapult"],
});

export const route16BikerRubenBattle: Moment = {
  split: "Koga",
  label: "Route 16 Biker Ruben Battle",
  kind: "battle",
  data: {
    playerBox: _box7,
    opponentBox: route16BikerRubenBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Accelgor"],
            turns: [
              [
                { player: "{p:Excadrill} Rock Slide {o:Accelgor} to {=:0}" },
                { opponent: "{o:Accelgor} fainted" },
              ],
            ],
          },
          {
            matchup: ["Lopunny-Mega"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Golisopod}" },
                { opponent: "{o:Lopunny-Mega} mega evolve" },
                { opponent: "{o:Lopunny-Mega} Close Combat {p:Golisopod} to {+:135}" },
                { opponent: "{p:Golisopod} sandstorm to {+:123}" },
                { opponent: "{o:Lopunny-Mega} sandstorm to {-:171}" },
              ],
              [
                { opponent: "{o:Lopunny-Mega} Return {p:Golisopod} to {+:9}" },
                { player: "{p:Golisopod} Rock Tomb {o:Lopunny-Mega} to {-:152}" },
                { opponent: "{o:Lopunny-Mega} sandstorm to {-:141}" },
                { opponent: "{p:Golisopod} Emergency Exit to {p:Golduck}" },
              ],
              [
                { player: "{p:Golduck} Psychic {o:Lopunny-Mega} to {=:0}" },
                { opponent: "{o:Lopunny-Mega} fainted" },
              ],
            ],
          },
          {
            matchup: ["Gigalith"],
            turns: [
              [
                { player: "{p:Golduck} switch to {p:Dragapult}" },
                { opponent: "{o:Gigalith} Explosion {p:Dragapult}" },
                { opponent: "{o:Gigalith} fainted" },
                { opponent: "{p:Dragapult} sandstorm to {=:205}" },
              ],
            ],
          },
          {
            matchup: ["Excadrill"],
            turns: [
              [
                { opponent: "{o:Excadrill} Swords Dance" },
                { player: "{p:Dragapult} U-Turn {o:Excadrill} to {-:207}" },
                { player: "{p:Dragapult} switch to {p:Excadrill}" },
              ],
              [
                { player: "{p:Excadrill} Earthquake {o:Excadrill} to {=:0}" },
                { opponent: "{o:Excadrill} fainted" },
              ],
            ],
          },
          {
            matchup: ["Roserade"],
            turns: [
              [
                { player: "{p:Excadrill} Earthquake {o:Roserade} to {=:0}" },
                { opponent: "{o:Roserade} fainted" },
              ],
            ],
          },
        ],
        frags: { Excadrill: 3, Golduck: 1, Dragapult: 1 },
      },
    ],
  },
};

const _box8 = getBox({
  box: _box7,
  update: {
    Swampert: {
      name: "Swampert-Mega",
      ability: "Swift Swim",
    },
  },
});

const _box9 = getBox({
  box: _box8,
  update: {
    Meowscarada: {
      nature: "Adamant",
      ability: "Protean",
      item: "Miracle Seed",
      moves: ["Acrobatics", "Flower Trick", "Play Rough", "Shadow Claw"],
    },
    Golisopod: {
      nature: "Impish",
      ability: "Emergency Exit",
      item: "Focus Sash",
      moves: ["Drill Run", "Liquidation", "Poison Jab", "Rock Tomb"],
    },
    "Swampert-Mega": {
      nature: "Adamant",
      ability: "Swift Swim",
      item: "Swampertite",
      moves: ["Earthquake", "Flip Turn", "Ice Punch", "Rock Slide"],
    },
    Drednaw: {
      nature: "Impish",
      ability: "Shell Armor",
      item: undefined,
      moves: ["Bulldoze", "Dig", "Flip Turn", "Ice Fang"],
    },
    Dragapult: {
      nature: "Adamant",
      ability: "Clear Body",
      item: "Expert Belt",
      moves: ["Astonish", "Dragon Darts", "Flamethrower", "Lock-On"],
    },
    Incineroar: {
      nature: "Impish",
      ability: "Blaze",
      item: "Black Glasses",
      moves: ["Fake Out", "Darkest Lariat", "Outrage", "U-Turn"],
    },
  },
  team: ["Meowscarada", "Golisopod", "Swampert-Mega", "Drednaw", "Dragapult", "Incineroar"],
});

export const route16CueBallCamronBattle: Moment = {
  split: "Koga",
  label: "Route 16 Cue Ball Camron Battle",
  kind: "battle",
  data: {
    playerBox: _box9,
    opponentBox: route16CueBallCamronBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Swampert"],
            turns: [
              [
                { player: "{p:Meowscarada} Flower Trick {o:Swampert} to {=:0}" },
                { opponent: "{o:Swampert} fainted" },
                { opponent: "{p:Meowscarada} sandstorm to {+:190}" },
              ],
            ],
          },
          {
            matchup: ["Aerodactyl"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Golisopod}" },
                { opponent: "{o:Aerodactyl} Brave Bird {p:Golisopod} to {+:1}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Swampert-Mega}" },
              ],
              [
                { player: "{p:Swampert-Mega} mega evolve" },
                { opponent: "{o:Aerodactyl} Brave Bird {p:Swampert-Mega} to {+:91}" },
                { player: "{p:Swampert-Mega} Flip Turn {o:Aerodactyl} to {=:0}" },
                { opponent: "{o:Aerodactyl} fainted" },
                { player: "{p:Swampert-Mega} switch to {p:Drednaw}" },
              ],
            ],
          },
          {
            matchup: ["Scizor-Mega"],
            turns: [
              [
                { player: "{p:Drednaw} switch to {p:Dragapult}" },
                { opponent: "{o:Scizor-Mega} mega evolve" },
                { opponent: "{o:Scizor-Mega} Rock Smash {p:Dragapult}" },
                { opponent: "{p:Dragapult} sandstorm to {+:205}" },
              ],
              [
                { player: "{p:Dragapult} Flamethrower {o:Scizor-Mega} to {=:0}" },
                { opponent: "{o:Scizor-Mega} fainted" },
                { opponent: "{p:Dragapult} sandstorm to {+:192}" },
              ],
            ],
          },
          {
            matchup: ["Cacturne"],
            turns: [
              [
                { player: "{p:Dragapult} switch to {p:Drednaw}" },
                { opponent: "{o:Cacturne} Knock Off {p:Drednaw} to {+:138}" },
                { opponent: "{o:Cacturne} Life Orb to {-:188}" },
              ],
              [
                { player: "{p:Drednaw} switch to {p:Incineroar}" },
                { opponent: "{o:Cacturne} Needle Arm {p:Incineroar} to {+:138}" },
                { opponent: "{o:Cacturne} Life Orb to {-:170}" },
                { opponent: "{p:Incineroar} sandstorm to {+:124}" },
              ],
              [
                { opponent: "{o:Cacturne} Knock Off {p:Incineroar} to {+:33}" },
                { opponent: "{o:Cacturne} Life Orb to {-:152}" },
                { player: "{p:Incineroar} U-Turn {o:Cacturne} to {=:0}" },
                { opponent: "{o:Cacturne} fainted" },
                { player: "{p:Incineroar} switch to {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} sandstorm to {+:178}" },
              ],
            ],
          },
          {
            matchup: ["Garchomp"],
            turns: [
              [
                { player: "{p:Meowscarada} Play Rough {o:Garchomp} to {-:239}" },
                { opponent: "{o:Garchomp} Scale Shot {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} sandstorm to {+:166}" },
              ],
              [
                { player: "{p:Meowscarada} Flower Trick {o:Garchomp} to {-:118}" },
                { opponent: "{o:Garchomp} Earthquake {p:Meowscarada} to {+:62}" },
                { opponent: "{p:Meowscarada} sandstorm to {+:50}" },
              ],
              [
                { player: "{p:Meowscarada} Flower Trick {o:Garchomp} to {=:0}" },
                { opponent: "{o:Garchomp} fainted" },
              ],
            ],
          },
        ],
        frags: { Meowscarada: 2, "Swampert-Mega": 1, Dragapult: 1, Incineroar: 1 },
      },
    ],
  },
};

const _box10 = getBox({
  box: _box9,
  update: {
    Meowscarada: {
      nature: "Jolly",
      ability: "Protean",
      item: "Expert Belt",
      moves: ["Acrobatics", "Flower Trick", "Play Rough", "Shadow Claw"],
    },
    Clodsire: {
      nature: "Careful",
      ability: "Water Absorb",
      item: "Sitrus Berry",
      moves: ["Bulldoze", "Earthquake", "Rock Slide", "Rock Tomb"],
    },
    Incineroar: {
      nature: "Careful",
      ability: "Blaze",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Darkest Lariat", "Outrage", "U-Turn"],
    },
    "Swampert-Mega": {
      nature: "Adamant",
      ability: "Swift Swim",
      item: "Swampertite",
      moves: ["Earthquake", "Flip Turn", "Ice Punch", "Rock Slide"],
    },
    Dragapult: {
      nature: "Adamant",
      ability: "Clear Body",
      item: undefined,
      moves: ["Astonish", "Dragon Darts", "Flamethrower", "U-Turn"],
    },
    Excadrill: {
      nature: "Adamant",
      ability: "Sand Rush",
      item: "Aspear Berry",
      moves: ["Earthquake", "Iron Head", "Rock Slide", "Shadow Claw"],
    },
  },
  team: ["Meowscarada", "Clodsire", "Incineroar", "Swampert-Mega", "Dragapult", "Excadrill"],
});

export const route16RiderHideoBattle: Moment = {
  split: "Koga",
  label: "Route 16 Rider Hideo Battle",
  kind: "battle",
  data: {
    playerBox: _box10,
    opponentBox: route16RiderHideoBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Stunfisk"],
            turns: [
              [
                { player: "{p:Meowscarada} Flower Trick {o:Stunfisk} to {=:1}" },
                { opponent: "{o:Stunfisk} Stealth Rock" },
                { opponent: "{p:Meowscarada} sandstorm to {=:190}" },
              ],
              [
                { player: "{p:Meowscarada} Flower Trick {o:Stunfisk} to {=:0}" },
                { opponent: "{o:Stunfisk} fainted" },
                { opponent: "{p:Meowscarada} sandstorm to {=:178}" },
              ],
            ],
          },
          {
            matchup: ["Dracovish"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Clodsire}" },
                { opponent: "{p:Clodsire} Stealth Rock to {+:258}" },
                { opponent: "{o:Dracovish} Fishious Rend {p:Clodsire} to {=:275}" },
              ],
              [
                { opponent: "{o:Dracovish} Psychic Fangs {p:Clodsire} (non-crit) to {+:143}" },
                { player: "{p:Clodsire} Bulldoze {o:Dracovish} to {-:178}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} Stealth Rock to {=:153}" },
                { opponent: "{o:Dracovish} Psychic Fangs {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} sandstorm to {=:141}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Dracovish} to {=:0}" },
                { opponent: "{o:Dracovish} fainted" },
                { opponent: "{p:Meowscarada} sandstorm to {=:129}" },
              ],
            ],
            branches: [{ branches: ["50% → Rotom-Heat matchup", "50% → Aron matchup"] }],
          },
        ],
        frags: { Meowscarada: 2 },
      },
      {
        line: "50% → Rotom-Heat matchup",
        matchups: [
          {
            matchup: ["Rotom-Heat"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Incineroar}" },
                { opponent: "{p:Incineroar} Stealth Rock to {=:171}" },
                { opponent: "{o:Rotom-Heat} Overheat (Z) {p:Incineroar} to {+:43}" },
                { opponent: "{p:Incineroar} Sitrus Berry {+:100}" },
                { opponent: "{p:Incineroar} sandstorm {+:86}" },
                { opponent: "{o:Rotom-Heat} sandstorm to {=:152}" },
              ],
              [
                { player: "{p:Incineroar} Fake Out {o:Rotom-Heat} to {-:130}" },
                { opponent: "{o:Rotom-Heat} flinched" },
                { opponent: "{p:Incineroar} sandstorm {+:72}" },
                { opponent: "{o:Rotom-Heat} sandstorm to {-:120}" },
              ],
              [
                { player: "{p:Incineroar} switch to {p:Swampert-Mega}" },
                { opponent: "{p:Swampert-Mega} Stealth Rock to {+:221}" },
                { opponent: "{o:Rotom-Heat} Thunder Wave {p:Swampert-Mega}" },
                { opponent: "{o:Rotom-Heat} sandstorm to {-:110}" },
              ],
              [
                { player: "{p:Swampert-Mega} mega evolve" },
                { opponent: "{o:Rotom-Heat} HP Grass {p:Swampert-Mega} to {+:25}" },
                { player: "{p:Swampert-Mega} Flip Turn {o:Rotom-Heat} to {=:0}" },
                { opponent: "{o:Rotom-Heat} fainted" },
                { player: "{p:Swampert-Mega} switch to {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} Stealth Rock to {+:104}" },
                { opponent: "{p:Meowscarada} sandstorm to {+:92}" },
              ],
            ],
          },
          {
            matchup: ["Aron"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Dragapult}" },
                { opponent: "{p:Dragapult} Stealth Rock to {=:191}" },
                { opponent: "{o:Aron} Endeavor {p:Dragapult}" },
                { opponent: "{p:Dragapult} sandstorm to {=:178}" },
              ],
              [
                { player: "{p:Dragapult} Dragon Darts {o:Aron} to {=:0}" },
                { opponent: "{o:Aron} fainted" },
                { opponent: "{p:Dragapult} sandstorm to {=:165}" },
              ],
            ],
            branches: [{ branches: ["Dragapult switch to Excadrill"] }],
          },
        ],
        frags: { "Swampert-Mega": 1, Dragapult: 1 },
      },
      {
        line: "50% → Aron matchup",
        matchups: [
          {
            matchup: ["Aron"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Dragapult}" },
                { opponent: "{p:Dragapult} Stealth Rock to {=:191}" },
                { opponent: "{o:Aron} Endeavor {p:Dragapult}" },
                { opponent: "{p:Dragapult} sandstorm to {=:178}" },
              ],
              [
                { player: "{p:Dragapult} Astonish {o:Aron} to {=:1}" },
                { opponent: "{o:Aron} Endeavor {p:Dragapult}" },
                { opponent: "{p:Dragapult} sandstorm to {=:165}" },
              ],
              [
                { player: "{p:Dragapult} U-Turn {o:Aron} to {=:0}" },
                { opponent: "{o:Aron} fainted" },
                { player: "{p:Dragapult} switch to {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} Stealth Rock to {+:104}" },
                { opponent: "{p:Meowscarada} sandstorm to {+:92}" },
              ],
            ],
          },
          {
            matchup: ["Rotom-Heat"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Incineroar}" },
                { opponent: "{p:Incineroar} Stealth Rock to {=:171}" },
                { opponent: "{o:Rotom-Heat} Overheat (Z) {p:Incineroar} to {+:43}" },
                { opponent: "{p:Incineroar} Sitrus Berry {+:100}" },
                { opponent: "{p:Incineroar} sandstorm {+:86}" },
                { opponent: "{o:Rotom-Heat} sandstorm to {=:152}" },
              ],
              [
                { player: "{p:Incineroar} Fake Out {o:Rotom-Heat} to {-:130}" },
                { opponent: "{o:Rotom-Heat} flinched" },
                { opponent: "{p:Incineroar} sandstorm {+:72}" },
                { opponent: "{o:Rotom-Heat} sandstorm to {-:120}" },
              ],
              [
                { player: "{p:Incineroar} switch to {p:Swampert-Mega}" },
                { opponent: "{p:Swampert-Mega} Stealth Rock to {+:221}" },
                { opponent: "{o:Rotom-Heat} Thunder Wave {p:Swampert-Mega}" },
                { opponent: "{o:Rotom-Heat} sandstorm to {-:110}" },
              ],
              [
                { player: "{p:Swampert-Mega} mega evolve" },
                { opponent: "{o:Rotom-Heat} HP Grass {p:Swampert-Mega} to {+:25}" },
                { player: "{p:Swampert-Mega} Flip Turn {o:Rotom-Heat} to {=:0}" },
                { opponent: "{o:Rotom-Heat} fainted" },
                { player: "{p:Swampert-Mega} switch to {p:Dragapult}" },
                { opponent: "{p:Dragapult} Stealth Rock to {=:138}" },
                { opponent: "{p:Dragapult} sandstorm to {=:125}" },
              ],
            ],
            branches: [{ branches: ["Dragapult switch to Excadrill"] }],
          },
        ],
        frags: { "Swampert-Mega": 1, Dragapult: 1 },
      },
      {
        line: "Dragapult switch to Excadrill",
        matchups: [
          {
            matchup: ["Greninja"],
            turns: [
              [
                { player: "{p:Dragapult} switch to {p:Excadrill}" },
                { opponent: "{p:Excadrill} Stealth Rock to {=:241}" },
                { opponent: "{o:Greninja} Ice Beam {p:Excadrill} to {+:29}" },
                { opponent: "{o:Greninja} Life Orb to {=:172}" },
              ],
              [
                { player: "{p:Excadrill} Iron Head {o:Greninja} to {=:0}" },
                { opponent: "{o:Greninja} fainted" },
              ],
            ],
          },
          {
            matchup: ["Beedrill-Mega"],
            turns: [
              [
                { opponent: "{o:Beedrill-Mega} mega evolve" },
                { player: "{p:Excadrill} Earthquake {o:Beedrill-Mega} to {=:0}" },
              ],
            ],
          },
        ],
        frags: { Excadrill: 2 },
      },
    ],
  },
};

const _box11 = getBox({
  box: _box10,
  update: {
    Excadrill: {
      nature: "Adamant",
      ability: "Mold Breaker",
      item: "Spell Tag",
      moves: ["Brick Break", "Earthquake", "Rock Slide", "Shadow Claw"],
    },
    Meowscarada: {
      nature: "Adamant",
      ability: "Protean",
      item: "Expert Belt",
      moves: ["Brick Break", "Flower Trick", "Play Rough", "Sucker Punch"],
    },
  },
  team: ["Excadrill", "Meowscarada"],
});

export const route18BikerWilliamBattle: Moment = {
  split: "Koga",
  label: "Route 18 Biker William Battle",
  kind: "battle",
  data: {
    playerBox: _box11,
    opponentBox: route18BikerWilliamBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Magnezone"],
            turns: [
              [
                { player: "{p:Excadrill} Earthquake {o:Magnezone}" },
                { opponent: "{o:Magnezone} fainted" },
              ],
            ],
          },
          {
            matchup: ["Salamence"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Meowscarada}" },
                { opponent: "{o:Salamence} Hydro Pump {p:Meowscarada} to {+:103}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Salamence} to {=:0}" },
                { opponent: "{o:Salamence} fainted" },
              ],
            ],
          },
          {
            matchup: ["Bisharp"],
            turns: [
              [
                { player: "{p:Meowscarada} Brick Break {o:Bisharp} to {=:0}" },
                { opponent: "{o:Bisharp} fainted" },
              ],
            ],
          },
          {
            matchup: ["Whiscash"],
            turns: [
              [
                { player: "{p:Meowscarada} Flower Trick {o:Whiscash} to {=:0}" },
                { opponent: "{o:Whiscash} fainted" },
              ],
            ],
          },
          {
            matchup: ["Starmie"],
            turns: [
              [
                { player: "{p:Meowscarada} Sucker Punch {o:Starmie} to {=:0}" },
                { opponent: "{o:Starmie} fainted" },
              ],
            ],
          },
        ],
        frags: { Excadrill: 1, Meowscarada: 4 },
      },
    ],
  },
};

const _box12 = getBox({
  box: _box11,
  update: {
    Meowscarada: {
      nature: "Adamant",
      ability: "Protean",
      item: "Persim Berry",
      moves: ["Brick Break", "Flower Trick", "Thunder Punch", "U-Turn"],
    },
    Incineroar: {
      nature: "Careful",
      ability: "Blaze",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Drain Punch", "Earthquake", "Leer"],
    },
    Golisopod: {
      nature: "Careful",
      ability: "Emergency Exit",
      item: "Silver Powder",
      moves: ["First Impress.", "Liquidation", "Poison Jab", "Rock Tomb"],
    },
    "Swampert-Mega": {
      nature: "Jolly",
      ability: "Swift Swim",
      item: "Swampertite",
      moves: ["Bide", "Earthquake", "Flip Turn", "Rock Slide"],
    },
    Tentacruel: {
      nature: "Sassy",
      ability: "Clear Body",
      item: "Black Sludge",
      moves: ["Dazz. Gleam", "Flip Turn", "Hydro Pump", "Scald"],
    },
  },
  team: ["Meowscarada", "Incineroar", "Golisopod", "Swampert-Mega", "Tentacruel"],
});

export const route18BirdKeeperJacobBattle: Moment = {
  split: "Koga",
  label: "Route 18 Bird Keeper Jacob Battle",
  kind: "battle",
  data: {
    playerBox: _box12,
    opponentBox: route18BirdKeeperJacobBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Cramorant-Gorg"],
            turns: [
              [
                { player: "{p:Meowscarada} Thunder Punch {o:Cramorant-Gorg} to {=:1}" },
                { opponent: "{o:Cramorant-Gorg} Gulp Missile {p:Meowscarada} to {+:152}" },
                { opponent: "{o:Cramorant-Gorg} Hurricane {p:Meowscarada} to {+:55}" },
              ],
              [
                { player: "{p:Meowscarada} U-Turn {o:Cramorant-Gorg} to {=:0}" },
                { opponent: "{o:Cramorant-Gorg} fainted" },
                { opponent: "{p:Meowscarada} switch to {p:Incineroar}" },
              ],
            ],
          },
          {
            matchup: ["Ogerpon-W"],
            turns: [
              [
                { player: "{p:Incineroar} switch to {p:Golisopod}" },
                { opponent: "{o:Ogerpon-W} Ivy Cudgel {p:Golisopod} to {+:104}" },
              ],
              [
                { player: "{p:Golisopod} First Impress. {o:Ogerpon-W} to {=:0}" },
                { opponent: "{o:Ogerpon-W} fainted" },
              ],
            ],
          },
          {
            matchup: ["Porygon2"],
            turns: [
              [
                { player: "{p:Golisopod} switch to {p:Swampert-Mega}" },
                { opponent: "{o:Porygon2} Thunder {p:Swampert-Mega}" },
              ],
              [
                { player: "{p:Swampert-Mega} mega evolve" },
                { player: "{p:Swampert-Mega} Bide" },
                { opponent: "{o:Porygon2} Foul Play {p:Swampert-Mega} to {+:129}" },
              ],
              [
                { opponent: "{o:Porygon2} Foul Play {p:Swampert-Mega} to {+:23}" },
                { player: "{p:Swampert-Mega} Bide {o:Porygon2} to {=:0}" },
              ],
            ],
          },
          {
            matchup: ["Raikou"],
            turns: [
              [
                { player: "{p:Swampert-Mega} switch to {p:Tentacruel}" },
                { opponent: "{o:Raikou} Shadow Ball {p:Tentacruel} to {+:147}" },
                { opponent: "{p:Tentacruel} Black Sludge to {+:159}" },
              ],
              [
                { opponent: "{o:Raikou} Shadow Ball {p:Tentacruel} to {+:99}" },
                { player: "{p:Tentacruel} Flip Turn {o:Raikou} to {-:155}" },
                { player: "{p:Tentacruel} switch to {p:Swampert-Mega}" },
              ],
              [
                { player: "{p:Swampert-Mega} Earthquake {o:Raikou} to {=:0}" },
                { opponent: "{o:Raikou} fainted" },
              ],
            ],
          },
          {
            matchup: ["Nidoqueen"],
            turns: [
              [
                { player: "{p:Swampert-Mega} Earthquake {o:Nidoqueen} to {=:0}" },
                { opponent: "{o:Nidoqueen} fainted" },
              ],
            ],
          },
        ],
        frags: { Meowscarada: 1, Golisopod: 1, "Swampert-Mega": 3 },
      },
    ],
  },
};

const _box13 = getBox({
  box: _box12,
  update: {
    Golisopod: {
      nature: "Careful",
      ability: "Emergency Exit",
      item: "Silver Powder",
      moves: ["First Impress.", "Liquidation", "Poison Jab", "Sucker Punch"],
    },
    "Swampert-Mega": {
      nature: "Jolly",
      ability: "Swift Swim",
      item: "Swampertite",
      moves: ["Earthquake", "Flip Turn", "Liquidation", "Rock Slide"],
    },
    Golduck: {
      nature: "Rash",
      ability: "Swift Swim",
      item: "Black Belt",
      moves: ["Aqua Jet", "Hydro Pump", "Psychic", "Vacuum Wave"],
    },
  },
  team: ["Golisopod", "Swampert-Mega", "Golduck"],
});

export const route18AceTrainerWiltonBattle: Moment = {
  split: "Koga",
  label: "Route 18 Ace Trainer Wilton Battle",
  kind: "battle",
  data: {
    playerBox: _box13,
    opponentBox: route18AceTrainerWiltonBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Dragapult"],
            turns: [
              [
                { player: "{p:Golisopod} Sucker Punch {o:Dragapult} to {-:100}" },
                { opponent: "{o:Dragapult} Thunder {p:Golisopod} to {+:19}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Swampert-Mega}" },
              ],
              [
                { player: "{p:Swampert-Mega} mega evolve" },
                { player: "{p:Swampert-Mega} Earthquake {o:Dragapult} to {=:0}" },
                { opponent: "{o:Dragapult} fainted" },
              ],
            ],
          },
          {
            matchup: ["Pinsir-Mega"],
            turns: [
              [
                { opponent: "{o:Pinsir-Mega} mega evolve" },
                { player: "{p:Swampert-Mega} Rock Slide {o:Pinsir-Mega} to {=:0}" },
                { opponent: "{o:Pinsir-Mega} fainted" },
              ],
            ],
          },
          {
            matchup: ["Kabutops"],
            turns: [
              [
                { player: "{p:Swampert-Mega} Earthquake {o:Kabutops} to {=:0}" },
                { opponent: "{o:Kabutops} fainted" },
              ],
            ],
          },
          {
            matchup: ["Omastar"],
            turns: [
              [
                { player: "{p:Swampert-Mega} Flip Turn {o:Omastar} to {-:104}" },
                { player: "{p:Swampert-Mega} switch to {p:Golduck}" },
                { opponent: "{o:Omastar} Shell Smash" },
              ],
              [
                { player: "{p:Golduck} Vacuum Wave {o:Omastar} to {=:0}" },
                { opponent: "{o:Omastar} fainted" },
              ],
            ],
          },
          {
            matchup: ["Kilowattrel"],
            turns: [
              [
                { player: "{p:Golduck} switch to {p:Swampert-Mega}" },
                { opponent: "{o:Kilowattrel} Thunder {p:Swampert-Mega}" },
              ],
              [
                { player: "{p:Swampert-Mega} Liquidation {o:Kilowattrel} to {=:0}" },
                { opponent: "{o:Kilowattrel} fainted" },
              ],
            ],
          },
        ],
        frags: { "Swampert-Mega": 4, Golduck: 1 },
      },
    ],
  },
};

const _box14 = getBox({
  box: _box13,
  update: {
    Meowscarada: {
      nature: "Jolly",
      ability: "Protean",
      item: "Expert Belt",
      moves: ["Cut", "Flower Trick", "Play Rough", "Sucker Punch"],
    },
    Lanturn: {
      nature: "Calm",
      ability: "Volt Absorb",
      item: "Never-Melt Ice",
      moves: ["Flip Turn", "Icy Wind", "Shock Wave", "Volt Switch"],
    },
    Tentacruel: {
      nature: "Calm",
      ability: "Clear Body",
      item: "Black Sludge",
      moves: ["Acid Spray", "Flip Turn", "Hydro Pump", "Sludge Wave"],
    },
    Golisopod: {
      nature: "Impish",
      ability: "Emergency Exit",
      item: "Sitrus Berry",
      moves: ["First Impress.", "Liquidation", "Poison Jab", "Sucker Punch"],
    },
  },
  team: ["Meowscarada", "Lanturn", "Tentacruel", "Golisopod"],
});

export const fuschiaCityBrendanBattle: Moment = {
  split: "Koga",
  label: "Fuschia City Brendan Battle",
  kind: "battle",
  data: {
    playerBox: _box14,
    opponentBox: fuschiaCityBrendanBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Gengar"],
            turns: [
              [
                { player: "{p:Meowscarada} Cut {o:Gengar} to {-:87}" },
                { opponent: "{o:Gengar} Sludge Wave {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Cut {o:Gengar} to {=:0}" },
                { opponent: "{o:Gengar} fainted" },
              ],
            ],
          },
          {
            matchup: ["Tapu Koko"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Lanturn}" },
                { opponent: "{o:Tapu Koko} Rising Voltage {p:Lanturn}" },
              ],
              [
                { opponent: "{o:Tapu Koko} Play Rough {p:Lanturn} to {+:61}" },
                { player: "{p:Lanturn} Icy Wind {o:Tapu Koko} to {-:157}" },
                { opponent: "{o:Tapu Koko} Leftovers to {-:169}" },
              ],
              [
                { player: "{p:Lanturn} switch to {p:Tentacruel}" },
                { opponent: "{o:Tapu Koko} Play Rough {p:Tentacruel} to {+:126}" },
                { opponent: "{o:Tapu Koko} Leftovers to {-:181}" },
                { opponent: "{p:Tentacruel} Black Sludge to {+:138}" },
              ],
              [
                { player: "{p:Tentacruel} Sludge Wave {o:Tapu Koko} to {=:0}" },
                { opponent: "{o:Tapu Koko} fainted" },
                { opponent: "{p:Tentacruel} Black Sludge to {+:150}" },
              ],
            ],
          },
          {
            matchup: ["Urshifu-R"],
            turns: [
              [
                { opponent: "{o:Urshifu-R} Close Combat {p:Tentacruel} to {+:31}" },
                { player: "{p:Tentacruel} Flip Turn {o:Urshifu-R} to {-:215}" },
                { player: "{p:Tentacruel} switch to {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Flower Trick {o:Urshifu-R} to {=:0}" },
                { opponent: "{o:Urshifu-R} fainted" },
              ],
            ],
          },
          {
            matchup: ["Nihilego"],
            turns: [
              [
                { player: "{p:Meowscarada} Cut {o:Nihilego} to {=:0}" },
                { opponent: "{o:Nihilego} fainted" },
              ],
            ],
          },
          {
            matchup: ["Deoxys-A"],
            turns: [
              [
                { player: "{p:Meowscarada} Sucker Punch {o:Deoxys-A} to {=:0}" },
                { opponent: "{o:Deoxys-A} fainted" },
              ],
            ],
          },
          {
            matchup: ["Sceptile-Mega"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Golisopod}" },
                { opponent: "{o:Sceptile-Mega} mega evolve" },
                { opponent: "{o:Sceptile-Mega} Dual Chop {p:Golisopod} to {+:57}" },
                { opponent: "{p:Golisopod} Sitrus Berry to {+:107}" },
              ],
              [
                { player: "{p:Golisopod} First Impress. {o:Sceptile-Mega} to {=:0}" },
                { opponent: "{o:Sceptile-Mega} fainted" },
              ],
            ],
          },
        ],
        frags: { Meowscarada: 4, Tentacruel: 1, Golisopod: 1 },
      },
    ],
  },
};

const _screamTail = {
  name: "Scream Tail",
  spriteKey: "scream-tail",
  level: "50-52",
  moves: ["Body Slam", "Hyper Voice", "Play Rough", "Rest"],
};

export const box15 = getBox({
  box: _box14,
  add: [_screamTail],
  update: {
    Excadrill: {
      nature: "Jolly",
      ability: "Mold Breaker",
      item: "Metal Coat",
      moves: ["Brick Break", "Drill Run", "Iron Head", "Shadow Claw"],
    },
    Incineroar: {
      nature: "Careful",
      ability: "Blaze",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Drain Punch", "Flamethrower", "Leer"],
    },
  },
  team: ["Excadrill", "Incineroar"],
});

export const safariZoneEncounter: Moment = {
  split: "Koga",
  label: "Safari Zone Encounter",
  kind: "encounter",
  data: { pokemon: _screamTail, playerBox: box15, showPlayerTeam: true },
};

export const {
  starterEgg3Encounter,
  starterEgg4Encounter,
  starterEgg5Encounter,
  starterEgg5BoxChange,
  pewterCityLeaderBrockRematchBattle,
  ceruleanCityLeaderMistyRematchBattle,
  vermillionCityLeaderLtSurgeRematchBattle,
  vermillionCityLeaderLtSurgeRematchBoxChange,
  fuschiaCityGymJugglerKaydenBattle,
  fuschiaCityGymJugglerKaydenBoxChange,
  fuschiaCityLeaderKogaBattle,
  box,
} = getKogaSecrets(box15);

export const moments: Moment[] = [
  celadonCityEncounter,
  celadonCityBoxChange,
  route16BikerLaoBattle,
  route16CueBallKojiBattle,
  route16CueBallLukeBattle,
  route16BikerRubenBattle,
  route16CueBallCamronBattle,
  route16RiderHideoBattle,
  route18BikerWilliamBattle,
  route18BirdKeeperJacobBattle,
  route18AceTrainerWiltonBattle,
  fuschiaCityBrendanBattle,
  safariZoneEncounter,
  starterEgg3Encounter,
  starterEgg4Encounter,
  starterEgg5Encounter,
  starterEgg5BoxChange,
  pewterCityLeaderBrockRematchBattle,
  ceruleanCityLeaderMistyRematchBattle,
  vermillionCityLeaderLtSurgeRematchBattle,
  vermillionCityLeaderLtSurgeRematchBoxChange,
  fuschiaCityGymJugglerKaydenBattle,
  fuschiaCityGymJugglerKaydenBoxChange,
  fuschiaCityLeaderKogaBattle,
];
