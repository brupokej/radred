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
    Gyarados: {
      nature: "Impish",
      ability: "Unnerve",
      item: "Sitrus Berry",
      moves: ["Aqua Tail", "Reflect", "Rest", "Scary Face"],
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
  team: ["Excadrill", "Dragapult", "Gyarados", "Clodsire", { name: "Meowscarada", extra: true }],
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
                { opponent: "{p:Dragapult} sandstorm to {+:205}" },
              ],
              [
                { player: "{p:Dragapult} Dragon Darts {o:Mienshao} to {=:0}" },
                { opponent: "{o:Mienshao} fainted" },
                { opponent: "{p:Dragapult} sandstorm to {+:192}" },
              ],
            ],
          },
          {
            matchup: ["Dugtrio-A"],
            turns: [
              [
                { player: "{p:Dragapult} switch to {p:Gyarados}" },
                { opponent: "{o:Dugtrio-A} Earthquake {p:Gyarados}" },
                { opponent: "{p:Gyarados} sandstorm to {+:214}" },
              ],
              [
                { player: "{p:Gyarados} switch to {p:Excadrill}" },
                { opponent: "{o:Dugtrio-A} Stone Edge {p:Excadrill} to {+:192}" },
                { opponent: "{o:Dugtrio-A} Life Orb to {-:142}" },
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
  team: ["Excadrill", { name: "Dragapult", extra: true}, { name: "Gyarados", extra: true}, { name: "Clodsire", extra: true}, { name: "Meowscarada", extra: true }],
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
  team: ["Excadrill", "Dragapult", { name: "Gyarados", extra: true}, { name: "Clodsire", extra: true}, "Meowscarada"],
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
      item: "Miracle Seed",
      moves: ["Acrobatics", "Flower Trick", "Play Rough", "U-Turn"],
    },
    Clodsire: {
      nature: "Careful",
      ability: "Water Absorb",
      item: "Sitrus Berry",
      moves: ["Earthquake", "Rock Slide", "Rock Tomb", "Yawn"],
    },
    Golduck: {
      nature: "Adamant",
      ability: "Neuroforce",
      item: "Expert Belt",
      moves: ["Flash", "Flip Turn", "Psychic", "Scald"],
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
      item: "Sitrus Berry",
      moves: ["Aerial Ace", "Iron Head", "Rock Slide", "Shadow Claw"],
    },
  },
  team: ["Meowscarada", "Clodsire", "Golduck", "Dragapult", "Excadrill"],
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
                { player: "{p:Clodsire} Rock Tomb {o:Dracovish} to {-:190}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} Stealth Rock to {=:153}" },
                { opponent: "{o:Dracovish} Psychic Fangs {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} sandstorm to {=:141}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Dracovish} to {-:38}" },
                { opponent: "{o:Dracovish} Dragon Claw {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} sandstorm to {=:129}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Dracovish} to {=:0}" },
                { opponent: "{o:Dracovish} fainted" },
                { opponent: "{p:Meowscarada} sandstorm to {+:117}" },
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
                { player: "{p:Meowscarada} U-Turn {o:Rotom-Heat} to {-:135}" },
                { player: "{p:Meowscarada} switch to {p:Golduck}" },
                { opponent: "{p:Golduck} Stealth Rock to {=:182}" },
                { opponent: "{o:Rotom-Heat} Overheat (Z) {p:Golduck} to {+:27}" },
                { opponent: "{p:Golduck} sandstorm to {+:15}" },
                { opponent: "{o:Rotom-Heat} sandstorm to {-:125}" },
              ],
              [
                { player: "{p:Golduck} Flip Turn {o:Rotom-Heat} to {=:0}" },
                { opponent: "{o:Rotom-Heat} fainted" },
                { player: "{p:Golduck} switch to {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} Stealth Rock to {+:92}" },
                { opponent: "{p:Meowscarada} sandstorm to {+:80}" },
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
        frags: { Golduck: 1, Dragapult: 1 },
      },
      {
        line: "50% → Aron matchup",
        matchups: [
          {
            matchup: ["Aron"],
            turns: [
              [
                { player: "{p:Meowscarada} U-Turn {o:Aron} to {=:1}" },
                { player: "{p:Meowscarada} switch to {p:Dragapult}" },
                { opponent: "{p:Dragapult} Stealth Rock to {=:191}" },
                { opponent: "{o:Aron} Endeavor {p:Dragapult}" },
                { opponent: "{p:Dragapult} sandstorm to {=:178}" },
              ],
              [
                { player: "{p:Dragapult} U-Turn {o:Aron} to {=:0}" },
                { opponent: "{o:Aron} fainted" },
                { player: "{p:Dragapult} switch to {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} Stealth Rock to {+:92}" },
                { opponent: "{p:Meowscarada} sandstorm to {+:80}" },
              ],
            ],
          },
          {
            matchup: ["Rotom-Heat"],
            turns: [
              [
                { player: "{p:Meowscarada} U-Turn {o:Rotom-Heat} to {-:135}" },
                { player: "{p:Meowscarada} switch to {p:Golduck}" },
                { opponent: "{p:Golduck} Stealth Rock to {=:182}" },
                { opponent: "{o:Rotom-Heat} Overheat (Z) {p:Golduck} to {+:27}" },
                { opponent: "{p:Golduck} sandstorm to {+:15}" },
                { opponent: "{o:Rotom-Heat} sandstorm to {-:125}" },
              ],
              [
                { player: "{p:Golduck} Flip Turn {o:Rotom-Heat} to {=:0}" },
                { opponent: "{o:Rotom-Heat} fainted" },
                { player: "{p:Golduck} switch to {p:Dragapult}" },
                { opponent: "{p:Dragapult} Stealth Rock to {=:163}" },
                { opponent: "{p:Dragapult} sandstorm to {=:140}" },
              ],
            ],
            branches: [{ branches: ["Dragapult switch to Excadrill"] }],
          },
        ],
        frags: { Golduck: 1, Dragapult: 1 },
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
                { opponent: "{p:Excadrill} Sitrus Berry to {+:91}" },
                { opponent: "{p:Excadrill} frostbite to {+:76}" },
              ],
              [
                { player: "{p:Excadrill} Iron Head {o:Greninja} to {=:0}" },
                { opponent: "{o:Greninja} fainted" },
                { opponent: "{p:Excadrill} frostbite to {+:61}" },
              ],
            ],
          },
          {
            matchup: ["Beedrill-Mega"],
            turns: [
              [
                { opponent: "{o:Beedrill-Mega} mega evolve" },
                { player: "{p:Excadrill} Rock Slide {o:Beedrill-Mega} to {=:0}" },
                { opponent: "{o:Beedrill-Mega} fainted" },
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
      moves: ["Brick Break", "Earthquake", "Iron Head", "Shadow Claw"],
    },
    Clodsire: {
      nature: "Careful",
      ability: "Water Absorb",
      item: "Sitrus Berry",
      moves: ["Bulldoze", "Earthquake", "Rock Slide", "Rock Tomb"],
    },
    Meowscarada: {
      nature: "Adamant",
      ability: "Protean",
      item: "Expert Belt",
      moves: ["Brick Break", "Flower Trick", "Knock Off", "Play Rough"],
    },
    Dragapult: {
      nature: "Jolly",
      ability: "Clear Body",
      item: "Safety Goggles",
      moves: ["Astonish", "Dragon Darts", "Flamethrower", "U-Turn"],
    },
  },
  team: ["Excadrill", "Clodsire", "Meowscarada", { name: "Dragapult", extra: true }],
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
                { player: "{p:Excadrill} switch to {p:Clodsire}" },
                { opponent: "{o:Salamence} Hydro Pump {p:Clodsire}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Meowscarada}" },
                { opponent: "{o:Salamence} Earthquake {p:Meowscarada} to {+:131}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Salamence} to {=:0}" },
                { opponent: "{o:Salamence} fainted" },
              ],
            ],
          },
          {
            matchup: ["Starmie"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Clodsire}" },
                { opponent: "{o:Starmie} Hydro Pump {p:Clodsire}" },
              ],
              [
                { opponent: "{o:Starmie} Psychic {p:Clodsire} to {+:7}" },
                { opponent: "{o:Starmie} Life Orb to {=:158}" },
                { opponent: "{p:Clodsire} Sitrus Berry to {+:75}" },
                { player: "{p:Clodsire} Rock Tomb {o:Starmie} to {-:130}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Meowscarada}" },
                { opponent: "{o:Starmie} Psychic {p:Meowscarada}" },
              ],
              [
                { player: "{p:Meowscarada} Flower Trick {o:Starmie} to {=:0}" },
                { opponent: "{o:Starmie} fainted" },
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
        ],
        frags: { Excadrill: 1, Meowscarada: 4 },
      },
    ],
  },
};

const _box12 = getBox({
  box: _box11,
  update: {
    Drednaw: {
      ivs: { hp: 0, spd: 0 },
    },
    "Swampert-Mega": {
      ivs: undefined,
    },
  },
});

export const route18BikerWilliamBoxChange: Moment = {
  split: "Koga",
  label: "Route 18 Biker William Box Change",
  kind: "boxChange",
  data: { playerBox: _box12 },
};

const _box13 = getBox({
  box: _box12,
  update: {
    Lanturn: {
      nature: "Quiet",
      ability: "Water Absorb",
      item: "Persim Berry",
      moves: ["Flip Turn", "Signal Beam", "Thunderbolt", "Volt Switch"],
    },
    Drednaw: {
      nature: "Naughty",
      ability: "Swift Swim",
      item: "Hard Stone",
      moves: ["Bulldoze", "Dig", "Flip Turn", "Rock Slide"],
    },
    "Swampert-Mega": {
      nature: "Jolly",
      ability: "Swift Swim",
      item: "Swampertite",
      moves: ["Earthquake", "Hammer Arm", "Knock Off", "Rock Slide"],
    },
    Meowscarada: {
      nature: "Adamant",
      ability: "Protean",
      item: undefined,
      moves: ["Acrobatics", "Flower Trick", "Knock Off", "Thunder Punch"],
    },
    Tentacruel: {
      nature: "Modest",
      ability: "Clear Body",
      item: "Black Sludge",
      moves: ["Dazz. Gleam", "Flip Turn", "Hydro Pump", "Sludge Wave"],
    },
    Gyarados: {
      nature: "Impish",
      ability: "Intimidate",
      item: "Charti Berry",
      moves: ["Aqua Tail", "Bulldoze", "Rest", "Scary Face"],
    },
  },
  team: ["Lanturn", "Drednaw", "Swampert-Mega", "Meowscarada", "Tentacruel", "Gyarados"],
});

export const route18BirdKeeperJacobBattle: Moment = {
  split: "Koga",
  label: "Route 18 Bird Keeper Jacob Battle",
  kind: "battle",
  data: {
    playerBox: _box13,
    opponentBox: route18BirdKeeperJacobBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Cramorant-Gorg"],
            turns: [],
            branches: [
              {
                branches: [
                  "80% → Cramorant-Gorg switch to Porygon2",
                  "20% → Lanturn Volt Switch Cramorant-Gorg",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "80% → Cramorant-Gorg switch to Porygon2",
        matchups: [
          {
            matchup: ["Cramorant-Gorg"],
            turns: [
              [
                { opponent: "{o:Cramorant-Gorg} switch to {o:Porygon2}" },
                { player: "{p:Lanturn} Volt Switch {o:Porygon2} to {-:175}" },
                { player: "{p:Lanturn} switch to {p:Swampert-Mega}" },
              ],
            ],
          },
          {
            matchup: ["Porygon2"],
            turns: [
              [
                { player: "{p:Swampert-Mega} mega evolve" },
                { player: "{p:Swampert-Mega} Knock Off {o:Porygon2} to {-:128}" },
                { opponent: "{o:Porygon2} Foul Play {p:Swampert-Mega} to {+:118}" },
              ],
              [
                { player: "{p:Swampert-Mega} Hammer Arm {o:Porygon2} to {=:0}" },
                { opponent: "{o:Porygon2} fainted" },
              ],
            ],
            branches: [{ branches: ["Swampert-Mega switch to Meowscarada"] }],
          },
        ],
        frags: { "Swampert-Mega": 1 },
      },
      {
        line: "20% → Lanturn Volt Switch Cramorant-Gorg",
        ifNot: ["Swampert-Mega switch to Lanturn"],
        matchups: [
          {
            matchup: ["Cramorant-Gorg"],
            turns: [
              [
                { opponent: "{o:Cramorant-Gorg} Hurricane {p:Lanturn} to {+:177}" },
                { player: "{p:Lanturn} Volt Switch {o:Cramorant-Gorg} to {-:22}" },
                { opponent: "{o:Cramorant-Gorg} Gulp Missile {p:Lanturn} to {+:110}" },
                { player: "{p:Lanturn} switch to {p:Drednaw}" },
              ],
            ],
            branches: [
              {
                branches: [
                  "80% → Cramorant-Gorg switch to Porygon2 2",
                  "20% → Drednaw Rock Slide Cramorant-Gorg",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "80% → Cramorant-Gorg switch to Porygon2 2",
        label: "80% → Cramorant-Gorg switch to Porygon2",
        matchups: [
          {
            matchup: ["Cramorant-Gorg"],
            turns: [
              [
                { opponent: "{o:Cramorant-Gorg} switch to {o:Porygon2}" },
                { player: "{p:Drednaw} Rock Slide {o:Porygon2} to {-:150}" },
              ],
            ],
          },
          {
            matchup: ["Porygon2"],
            turns: [
              [
                { player: "{p:Drednaw} Flip Turn {o:Porygon2} to {-:92}" },
                { player: "{p:Drednaw} switch to {p:Swampert-Mega}" },
                { opponent: "{o:Porygon2} Thunder {p:Swampert-Mega}" },
              ],
              [
                { player: "{p:Swampert-Mega} mega evolve" },
                { player: "{p:Swampert-Mega} Knock Off {o:Porygon2} to {-:45}" },
                { opponent: "{o:Porygon2} Foul Play {p:Swampert-Mega} to {+:118}" },
              ],
              [
                { player: "{p:Swampert-Mega} Hammer Arm {o:Porygon2} to {=:0}" },
                { opponent: "{o:Porygon2} fainted" },
              ],
            ],
            branches: [{ branches: ["Swampert-Mega switch to Meowscarada"] }],
          },
        ],
        frags: { "Swampert-Mega": 1 },
      },
      {
        line: "20% → Drednaw Rock Slide Cramorant-Gorg",
        matchups: [
          {
            matchup: ["Cramorant-Gorg"],
            turns: [
              [
                { player: "{p:Drednaw} Rock Slide {o:Cramorant-Gorg} to {=:0}" },
                { opponent: "{o:Cramorant-Gorg} fainted" },
              ],
            ],
          },
          {
            matchup: ["Porygon2"],
            turns: [
              [
                { player: "{p:Drednaw} Flip Turn {o:Porygon2} to {-:150}" },
                { player: "{p:Drednaw} switch to {p:Swampert-Mega}" },
                { opponent: "{o:Porygon2} Thunder {p:Swampert-Mega}" },
              ],
              [
                { player: "{p:Swampert-Mega} mega evolve" },
                { player: "{p:Swampert-Mega} Knock Off {o:Porygon2} to {-:103}" },
                { opponent: "{o:Porygon2} Foul Play {p:Swampert-Mega} to {+:118}" },
              ],
              [
                { player: "{p:Swampert-Mega} Hammer Arm {o:Porygon2} to {=:0}" },
                { opponent: "{o:Porygon2} fainted" },
              ],
            ],
            branches: [{ branches: ["Swampert-Mega switch to Meowscarada"] }],
          },
        ],
        frags: { Drednaw: 1, "Swampert-Mega": 1 },
      },
      {
        line: "Swampert-Mega switch to Meowscarada",
        matchups: [
          {
            matchup: ["Ogerpon-W"],
            turns: [
              [
                { player: "{p:Swampert-Mega} switch to {p:Meowscarada}" },
                { opponent: "{o:Ogerpon-W} Ivy Cudgel {p:Meowscarada} to {+:29}" },
              ],
              [
                { player: "{p:Meowscarada} Acrobatics {o:Ogerpon-W} to {=:0}" },
                { opponent: "{o:Ogerpon-W} fainted" },
              ],
            ],
          },
          {
            matchup: ["Raikou"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Tentacruel}" },
                { opponent: "{o:Raikou} Shadow Ball {p:Tentacruel} to {+:143}" },
                { opponent: "{p:Tentacruel} Black Sludge to {+:155}" },
              ],
              [
                { opponent: "{o:Raikou} Shadow Ball {p:Tentacruel} to {+:91}" },
                { player: "{p:Tentacruel} Flip Turn {o:Raikou} to {-:161}" },
                { player: "{p:Tentacruel} switch to {p:Swampert-Mega}" },
              ],
              [
                { player: "{p:Swampert-Mega} Earthquake {o:Raikou} to {=:0}" },
                { opponent: "{o:Raikou} fainted" },
              ],
            ],
            branches: [
              {
                if: ["80% → Cramorant-Gorg switch to Porygon2 2"],
                ifNot: ["Swampert-Mega switch to Lanturn"],
                branches: ["Swampert-Mega Rock Slide Cramorant-Gorg"],
              },
              {
                if: ["80% → Cramorant-Gorg switch to Porygon2"],
                branches: ["Swampert-Mega switch to Lanturn"],
              },
              {
                branches: ["Swampert-Mega Earthquake Nidoqueen"],
              },
            ],
          },
        ],
        frags: { Meowscarada: 1, "Swampert-Mega": 1 },
      },
      {
        line: "Swampert-Mega Rock Slide Cramorant-Gorg",
        matchups: [
          {
            matchup: ["Cramorant-Gorg"],
            turns: [
              [
                { player: "{p:Swampert-Mega} Rock Slide {o:Cramorant-Gorg} to {=:0}" },
                { opponent: "{o:Cramorant-Gorg} fainted" },
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
        frags: { "Swampert-Mega": 2 },
      },
      {
        line: "Swampert-Mega switch to Lanturn",
        matchups: [
          {
            matchup: ["Cramorant-Gorg"],
            turns: [
              [
                { player: "{p:Swampert-Mega} switch to {p:Lanturn}" },
                { opponent: "{o:Cramorant-Gorg} Surf {p:Lanturn}" },
              ],
            ],
            branches: [
              {
                branches: [
                  "80% → Cramorant-Gorg switch to Nidoqueen",
                  "20% → Lanturn Volt Switch Cramorant-Gorg",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "80% → Cramorant-Gorg switch to Nidoqueen",
        matchups: [
          {
            matchup: ["Cramorant-Gorg"],
            turns: [
              [
                { opponent: "{o:Cramorant-Gorg} switch to {o:Nidoqueen}" },
                { player: "{p:Lanturn} Volt Switch {o:Nidoqueen}" },
              ],
            ],
          },
          {
            matchup: ["Nidoqueen"],
            turns: [
              [
                { player: "{p:Lanturn} switch to {p:Gyarados}" },
                { opponent: "{o:Nidoqueen} Earth Power {p:Gyarados}" },
              ],
              [
                { player: "{p:Gyarados} switch to {p:Swampert-Mega}" },
                { opponent: "{o:Nidoqueen} Thunder {p:Swampert-Mega}" },
              ],
              [
                { player: "{p:Swampert-Mega} Earthquake {o:Nidoqueen} to {=:0}" },
                { opponent: "{o:Nidoqueen} fainted" },
              ],
            ],
          },
          {
            matchup: ["Cramorant-Gorg"],
            turns: [
              [
                { player: "{p:Swampert-Mega} switch to {p:Lanturn}" },
                { opponent: "{o:Cramorant-Gorg} Surf {p:Lanturn}" },
              ],
              [
                { opponent: "{o:Cramorant-Gorg} Hurricane {p:Lanturn} to {+:177}" },
                { player: "{p:Lanturn} Volt Switch {o:Cramorant-Gorg} to {-:22}" },
                { opponent: "{o:Cramorant-Gorg} Gulp Missile {p:Lanturn} to {+:110}" },
                { player: "{p:Lanturn} switch to {p:Swampert-Mega}" },
              ],
              [
                { player: "{p:Swampert-Mega} Rock Slide {o:Cramorant} to {=:0}" },
                { opponent: "{o:Cramorant} fainted" },
              ],
            ],
          },
        ],
        frags: { "Swampert-Mega": 2 },
      },
      {
        line: "20% → Lanturn Volt Switch Cramorant-Gorg",
        if: ["Swampert-Mega switch to Lanturn"],
        matchups: [
          {
            matchup: ["Cramorant-Gorg"],
            turns: [
              [
                { opponent: "{o:Cramorant-Gorg} Hurricane {p:Lanturn} to {+:177}" },
                { player: "{p:Lanturn} Volt Switch {o:Cramorant-Gorg} to {-:22}" },
                { opponent: "{o:Cramorant-Gorg} Gulp Missile {p:Lanturn} to {+:110}" },
                { player: "{p:Lanturn} switch to {p:Swampert-Mega}" },
              ],
              [
                { player: "{p:Swampert-Mega} Rock Slide {o:Cramorant} to {=:0}" },
                { opponent: "{o:Cramorant} fainted" },
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
        frags: { "Swampert-Mega": 2 },
      },
      {
        line: "Swampert-Mega Earthquake Nidoqueen",
        matchups: [
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
        frags: { "Swampert-Mega": 1 },
      },
    ],
  },
};

const _box14 = getBox({
  box: _box13,
  update: {
    Dragapult: {
      nature: "Jolly",
      ability: "Clear Body",
      item: "Safety Goggles",
      moves: ["Astonish", "Dragon Darts", "Flamethrower", "U-Turn"],
    },
    "Swampert-Mega": {
      nature: "Jolly",
      ability: "Swift Swim",
      item: "Swampertite",
      moves: ["Earthquake", "Flip Turn", "Ice Punch", "Rock Slide"],
    },
    Golduck: {
      nature: "Modest",
      ability: "Swift Swim",
      item: "Expert Belt",
      moves: ["Flash", "Flip Turn", "Psychic", "Vacuum Wave"],
    },
  },
  team: ["Dragapult", "Swampert-Mega", "Golduck"],
});

export const route18AceTrainerWiltonBattle: Moment = {
  split: "Koga",
  label: "Route 18 Ace Trainer Wilton Battle",
  kind: "battle",
  data: {
    playerBox: _box14,
    opponentBox: route18AceTrainerWiltonBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Dragapult"],
            turns: [
              [
                { player: "{p:Dragapult} Dragon Darts {o:Dragapult} to {=:0}" },
                { opponent: "{o:Dragapult} fainted" },
              ],
            ],
          },
          {
            matchup: ["Kabutops"],
            turns: [
              [
                { opponent: "{o:Kabutops} Stone Axe {p:Dragapult} to {+:91}" },
                { player: "{p:Dragapult} U-Turn {o:Kabutops} to {-:130}" },
                { player: "{p:Dragapult} switch to {p:Swampert-Mega}" },
                { opponent: "{p:Swampert-Mega} Stealth Rock to {+:221}" },
              ],
              [
                { player: "{p:Swampert-Mega} mega evolve" },
                { player: "{p:Swampert-Mega} Earthquake {o:Kabutops} to {=:0}" },
                { opponent: "{o:Kabutops} fainted" },
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
            matchup: ["Omastar"],
            turns: [
              [
                { player: "{p:Swampert-Mega} Flip Turn {o:Omastar} to {-:104}" },
                { player: "{p:Swampert-Mega} switch to {p:Golduck}" },
                { opponent: "{p:Golduck} Stealth Rock to {+:182}" },
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
                { player: "{p:Golduck} Flip Turn {o:Kilowattrel} to {-:107}" },
                { player: "{p:Golduck} switch to {p:Swampert-Mega}" },
                { opponent: "{p:Swampert-Mega} Stealth Rock to {+:207}" },
                { opponent: "{o:Kilowattrel} Thunder {p:Swampert-Mega}" },
              ],
              [
                { player: "{p:Swampert-Mega} Rock Slide {o:Kilowattrel} to {=:0}" },
                { opponent: "{o:Kilowattrel} fainted" },
              ],
            ],
          },
        ],
        frags: { Dragapult: 1, "Swampert-Mega": 3, Golduck: 1 },
      },
    ],
  },
};

const _box15 = getBox({
  box: _box14,
  update: {
    Meowscarada: {
      nature: "Adamant",
      ability: "Protean",
      item: "Expert Belt",
      moves: ["Cut", "Leaf Storm", "Play Rough", "Sucker Punch"],
    },
    Lanturn: {
      nature: "Quiet",
      ability: "Volt Absorb",
      item: "Persim Berry",
      moves: ["Icy Wind", "Hydro Pump", "Signal Beam", "Volt Switch"],
      ivs: undefined,
    },
    Tentacruel: {
      nature: "Timid",
      ability: "Clear Body",
      item: "Poison Barb",
      moves: ["Dazz. Gleam", "Flip Turn", "Hydro Pump", "Sludge Wave"],
    },
    "Swampert-Mega": {
      nature: "Jolly",
      ability: "Swift Swim",
      item: "Swampertite",
      moves: ["Earthquake", "Flip Turn", "Ice Punch", "Rock Slide"],
    },
    Gyarados: {
      nature: "Impish",
      ability: "Intimidate",
      item: "Charti Berry",
      moves: ["Aqua Tail", "Bulldoze", "Rest", "Scary Face"],
    },
  },
  team: ["Meowscarada", "Lanturn", "Tentacruel", "Swampert-Mega", "Gyarados"],
});

export const fuschiaCityBrendanBattle: Moment = {
  split: "Koga",
  label: "Fuschia City Brendan Battle",
  kind: "battle",
  data: {
    playerBox: _box15,
    opponentBox: fuschiaCityBrendanBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Gengar"],
            turns: [
              [
                { player: "{p:Meowscarada} Cut {o:Gengar} to {-:78}" },
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
                { player: "{p:Lanturn} Icy Wind {o:Tapu Koko} to {-:160}" },
                { opponent: "{o:Tapu Koko} Leftovers to {-:172}" },
              ],
              [
                { player: "{p:Lanturn} switch to {p:Tentacruel}" },
                { opponent: "{o:Tapu Koko} Play Rough {p:Tentacruel} to {+:126}" },
                { opponent: "{o:Tapu Koko} Leftovers to {-:184}" },
              ],
              [
                { player: "{p:Tentacruel} Sludge Wave {o:Tapu Koko} to {=:0}" },
                { opponent: "{o:Tapu Koko} fainted" },
              ],
            ],
          },
          {
            matchup: ["Nihilego"],
            turns: [
              [
                { player: "{p:Tentacruel} switch to {p:Swampert-Mega}" },
                { opponent: "{o:Nihilego} Thunderbolt {p:Swampert-Mega}" },
              ],
              [
                { player: "{p:Swampert-Mega} switch to {p:Meowscarada}" },
                { opponent: "{o:Nihilego} Grass Knot {p:Meowscarada} to {+:159}" },
              ],
              [
                { player: "{p:Meowscarada} Cut {o:Nihilego} to {=:0}" },
                { opponent: "{o:Nihilego} fainted" },
              ],
            ],
          },
          {
            matchup: ["Sceptile-Mega"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Gyarados}" },
                { opponent: "{o:Sceptile-Mega} mega evolve" },
                { opponent: "{o:Sceptile-Mega} Earthquake {p:Gyarados}" },
              ],
              [
                { opponent: "{o:Sceptile-Mega} Dragon Dance" },
                { player: "{p:Gyarados} Scary Face {o:Sceptile-Mega}" },
              ],
              [
                { opponent: "{o:Sceptile-Mega} Dragon Dance" },
                { player: "{p:Gyarados} Scary Face {o:Sceptile-Mega}" },
              ],
              [
                { player: "{p:Gyarados} switch to {p:Meowscarada}" },
                { opponent: "{o:Sceptile-Mega} Dragon Dance" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Sceptile-Mega} to {=:0}" },
                { opponent: "{o:Sceptile-Mega} fainted" },
              ],
            ],
          },
          {
            matchup: ["Urshifu-R"],
            turns: [
              [
                { player: "{p:Meowscarada} Leaf Storm {o:Urshifu-R} to {=:0}" },
                { opponent: "{o:Urshifu-R} fainted" },
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
        ],
        frags: { Meowscarada: 5, Tentacruel: 1 },
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

export const box16 = getBox({
  box: _box15,
  add: [_screamTail],
  update: {
    Incineroar: {
      nature: "Impish",
      ability: "Blaze",
      item: undefined,
      moves: ["Fake Out", "Darkest Lariat", "Flamethrower", "U-Turn"],
    },
    Excadrill: {
      nature: "Jolly",
      ability: "Mold Breaker",
      item: "Expert Belt",
      moves: ["Brick Break", "Drill Run", "Iron Head", "Shadow Claw"],
    },
  },
  team: ["Incineroar", "Excadrill"],
});

export const safariZoneEncounter: Moment = {
  split: "Koga",
  label: "Safari Zone Encounter",
  kind: "encounter",
  data: { pokemon: _screamTail, playerBox: box16, showPlayerTeam: true },
};

export const {
  starterEgg3Encounter,
  starterEgg4Encounter,
  starterEgg5Encounter,
  starterEgg5BoxChange,
  pewterCityLeaderBrockRematchBattle,
  ceruleanCityLeaderMistyRematchBattle,
  vermillionCityLeaderLtSurgeRematchBattle,
  fuschiaCityGymJugglerKaydenBattle,
  fuschiaCityGymJugglerKaydenBoxChange,
  fuschiaCityLeaderKogaBattle,
  fuschiaCityLeaderKogaBoxChange,
  box,
} = getKogaSecrets(box16);

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
  route18BikerWilliamBoxChange,
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
  fuschiaCityGymJugglerKaydenBattle,
  fuschiaCityGymJugglerKaydenBoxChange,
  fuschiaCityLeaderKogaBattle,
  fuschiaCityLeaderKogaBoxChange,
];
