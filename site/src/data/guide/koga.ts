import { getBox } from "@site/src/utils/box";
import { Moment } from "@site/src/utils/moments";
import {
  route16BikerLaoBox,
  route16BikerRubenBox,
  route16CueBallCamronBox,
  route16CueBallKojiBox,
  route16CueBallLukeBox,
  route16RiderHideoBox,
  route18BikerWilliamBox,
} from "@site/src/utils/opponents";

import { box as _box1 } from "@site/src/data/guide/sabrina";

const _dreepy = {
  name: "Dreepy",
  moves: ["Astonish", "Bite", "Infestation", "Quick Attack"],
};

export const celadonCityEncounter: Moment = {
  label: "Celadon City Encounter",
  kind: "encounter",
  data: { pokemon: _dreepy },
};

const _box2 = getBox({
  box: _box1,
  add: [_dreepy],
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
  label: "Koga Box Change",
  kind: "boxChange",
  data: { playerBox: _box2 },
};

const _box3 = getBox({
  box: _box2,
  update: {
    Dragapult: {
      nature: "Adamant",
      ability: "Clear Body",
      item: "Dragon Fang",
      moves: ["Astonish", "Dragon Darts", "Lock-On", "Quick Attack"],
    },
    Excadrill: {
      nature: "Adamant",
      ability: "Sand Rush",
      item: "Soft Sand",
      moves: ["Aerial Ace", "Earthquake", "Iron Head", "Shadow Claw"],
    },
    Gyarados: {
      item: "Charti Berry",
    },
    Clodsire: {
      moves: ["Bulldoze", "Rock Slide", "Rock Tomb", "Yawn"],
    },
    Meowscarada: {
      item: undefined,
      moves: ["Acrobatics", "Flower Trick", "Knock Off", "Play Rough"],
    },
  },
  team: ["Excadrill", "Dragapult", "Gyarados", "Runerigus", "Clodsire", "Meowscarada"],
});

export const route16BikerLaoBattle: Moment = {
  label: "Route 16 Biker Lao Battle",
  kind: "battle",
  data: {
    playerBox: _box3,
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
                { player: "{p:Dragapult} sand to {+:205}" },
              ],
              [
                { player: "{p:Dragapult} Dragon Darts {o:Mienshao} to {=:0}" },
                { opponent: "{o:Mienshao} fainted" },
                { player: "{p:Dragapult} sand to {+:192}" },
              ],
            ],
          },
          {
            matchup: ["Dugtrio-A"],
            turns: [
              [
                { player: "{p:Dragapult} switch to {p:Gyarados}" },
                { opponent: "{o:Dugtrio-A} Earthquake {p:Gyarados}" },
                { player: "{p:Gyarados} sand to {+:214}" },
              ],
              [
                { opponent: "{o:Dugtrio-A} Stone Edge {p:Gyarados} to {+:84}" },
                { player: "{p:Gyarados} Aqua Tail {o:Dugtrio-A} to {=:0}" },
                { opponent: "{o:Dugtrio-A} fainted" },
                { player: "{p:Gyarados} sand to {+:70}" },
              ],
            ],
          },
          {
            matchup: ["Heliolisk"],
            turns: [
              [
                { player: "{p:Gyarados} switch to {p:Runerigus}" },
                { opponent: "{o:Heliolisk} Surf {p:Runerigus} to {+:99}" },
              ],
              [
                { player: "{p:Runerigus} switch to {p:Clodsire}" },
                { opponent: "{o:Heliolisk} Surf {p:Clodsire}" },
              ],
              [
                { opponent: "{o:Heliolisk} Boomburst {p:Clodsire} to {+:89}" },
                { player: "{p:Clodsire} Yawn {o:Heliolisk}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Dragapult}" },
                { opponent: "{o:Heliolisk} Boomburst {p:Dragapult}" },
                { player: "{p:Dragapult} sand to {+:179}" },
              ],
              [
                { player: "{p:Dragapult} Lock-On {o:Heliolisk}" },
                { opponent: "{o:Heliolisk} sleep" },
                { player: "{p:Dragapult} sand to {+:166}" },
              ],
              [
                { player: "{p:Dragapult} Dragon Darts {o:Heliolisk} to {=:0}" },
                { opponent: "{o:Heliolisk} fainted" },
              ],
            ],
          },
        ],
        frags: { Dragapult: 2, Gyarados: 1 },
      },
    ],
  },
};

const _box4 = getBox({ box: _box3 });

export const route16CueBallKojiBattle: Moment = {
  label: "Route 16 Cue Ball Koji Battle",
  kind: "battle",
  data: {
    playerBox: _box4,
    opponentBox: route16CueBallKojiBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Kingler"],
            turns: [
              [
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

export const route16CueBallLukeBattle: Moment = {
  label: "Route 16 Cue Ball Luke Battle",
  kind: "battle",
  data: {
    playerBox: _box4,
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
                { player: "{p:Excadrill} switch to {p:Meowscarada}" },
                { opponent: "{o:Hariyama} Fake Out {p:Meowscarada} to {+:148}" },
                { opponent: "{p:Meowscarada} sand to {+:136}" },
              ],
              [
                { player: "{p:Meowscarada} Acrobatics {o:Hariyama} to {=:0}" },
                { opponent: "{o:Hariyama} fainted" },
                { opponent: "{p:Meowscarada} sand to {+:124}" },
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

const _box5 = getBox({
  box: _box4,
  update: {
    "Arcanine-H": {
      nature: "Adamant",
      item: "Hard Stone",
      hp: undefined,
      moves: ["Accelerock", "Flare Blitz", "Play Rough", "Rock Slide"],
    },
    Excadrill: {
      item: "Expert Belt",
      moves: ["Brick Break", "Earthquake", "Iron Head", "Shadow Claw"],
    },
    Perrserker: {
      ability: "Battle Armor",
      item: "Shuca Berry",
    },
  },
  team: ["Arcanine-H", "Azumarill", "Excadrill", "Drednaw", "Meowscarada", "Perrserker"],
});

export const route16BikerRubenBattle: Moment = {
  label: "Route 16 Biker Ruben Battle",
  kind: "battle",
  data: {
    playerBox: _box5,
    opponentBox: route16BikerRubenBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Accelgor"],
            turns: [
              [
                { player: "{p:Arcanine-H} Accelerock {o:Accelgor} to {=:0}" },
                { opponent: "{o:Accelgor} fainted" },
              ],
            ],
          },
          {
            matchup: ["Lopunny-Mega"],
            turns: [
              [
                { player: "{p:Arcanine-H} switch to {p:Azumarill}" },
                { opponent: "{o:Lopunny-Mega} Close Combat {p:Azumarill} to {+:118}" },
                { opponent: "{p:Azumarill} sand to {+:104}" },
                { opponent: "{o:Lopunny-Mega} sand to {-:171}" },
              ],
              [
                { player: "{p:Azumarill} switch to {p:Excadrill}" },
                { opponent: "{o:Lopunny-Mega} Return {p:Excadrill} to {+:125}" },
                { opponent: "{o:Lopunny-Mega} sand to {-:160}" },
              ],
              [
                { player: "{p:Excadrill} Brick Break {o:Lopunny-Mega} to {=:0}" },
                { opponent: "{o:Lopunny-Mega} fainted" },
              ],
            ],
          },
          {
            matchup: ["Roserade"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Drednaw}" },
                { opponent: "{o:Roserade} HP Fire {p:Drednaw} to {+:191}" },
                { opponent: "{o:Roserade} sand to {-:165}" },
              ],
              [
                { player: "{p:Drednaw} switch to {p:Meowscarada}" },
                { opponent: "{o:Roserade} Giga Drain {p:Meowscarada} to {+:127}" },
                { opponent: "{o:Roserade} heal to {-:175}" },
                { oppponent: "{p:Meowscarada} sand to {+:115}" },
                { opponent: "{o:Roserade} sand to {-:165}" },
              ],
              [
                { player: "{p:Meowscarada} Acrobatics {o:Roserade} to {=:0}" },
                { opponent: "{o:Roserade} fainted" },
                { opponent: "{p:Meowscarada} sand to {+:103}" },
              ],
            ],
          },
          {
            matchup: ["Excadrill"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Perrserker}" },
                { opponent: "{o:Excadrill} Stone Edge {p:Perrserker} to {+:185}" },
              ],
              [
                { opponent: "{o:Excadrill} Swords Dance" },
                { player: "{p:Perrserker} U-Turn {o:Excadrill} to {-:212}" },
                { player: "{p:Perrserker} switch to {p:Excadrill}" },
              ],
              [
                { player: "{p:Excadrill} Earthquake {o:Excadrill} to {=:0}" },
                { opponent: "{o:Excadrill} fainted" },
              ],
            ],
          },
          {
            matchup: ["Gigalith"],
            turns: [
              [
                { player: "{p:Excadrill} Earthquake {o:Gigalith} to {=:0}" },
                { opponent: "{o:Gigalith} fainted" },
              ],
            ],
          },
        ],
        frags: { "Arcanine-H": 1, Excadrill: 3, Meowscarada: 1 },
      },
    ],
  },
};

const _box6 = getBox({
  box: _box5,
  update: {
    Perrserker: {
      hp: "Fire",
      ivs: undefined,
    },
    Azumarill: {
      ivs: undefined,
    },
  },
});

export const route16BikerRubenBoxChange: Moment = {
  label: "Route 16 Biker Ruben Box Change",
  kind: "boxChange",
  data: { playerBox: _box6 },
};

const _box7 = getBox({
  box: _box6,
  update: {
    Meowscarada: {
      nature: "Adamant",
      item: "Miracle Seed",
      moves: ["Flower Trick", "Knock Off", "Play Rough", "Shadow Claw"],
    },
    Perrserker: {
      item: "Sitrus Berry",
      moves: ["HP Fire", "Play Rough", "Shadow Claw", "U-Turn"],
    },
    Azumarill: {
      nature: "Adamant",
      item: "Pixie Plate",
      moves: ["Aqua Jet", "Aqua Tail", "Knock Off", "Play Rough"],
    },
    Drednaw: {
      item: undefined,
      moves: ["Bulldoze", "Dig", "Flip Turn", "Ice Fang"],
    },
    Dragapult: {
      item: "Expert Belt",
      moves: ["Astonish", "Dragon Darts", "Flamethrower", "Quick Attack"],
    },
    Incineroar: {
      nature: "Impish",
      item: undefined,
      moves: ["Fake Out", "Darkest Lariat", "Outrage", "U-Turn"],
    },
  },
  team: ["Meowscarada", "Perrserker", "Azumarill", "Drednaw", "Dragapult", "Incineroar"],
});

export const route16CueBallCamronBattle: Moment = {
  label: "Route 16 Cue Ball Camron Battle",
  kind: "battle",
  data: {
    playerBox: _box7,
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
                { opponent: "{p:Meowscarada} sand to {+:190}" },
              ],
            ],
          },
          {
            matchup: ["Aerodactyl"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Perrserker}" },
                { opponent: "{o:Aerodactyl} Brave Bird {p:Perrserker} to {+:174}" },
                { opponent: "{o:Aerodactyl} recoil to {-:189}" },
              ],
              [
                { opponent: "{o:Aerodactyl} Earthquake {p:Perrserker} to {+:68}" },
                { opponent: "{p:Perrserker} heal to {+:123}" },
                { player: "{p:Perrserker} Shadow Claw {o:Aerodactyl} to {-:126}" },
              ],
              [
                { opponent: "{o:Aerodactyl} Earthquake {p:Perrserker} to {+:17}" },
                { player: "{p:Perrserker} U-Turn {o:Aerodactyl} to {-:98}" },
                { player: "{p:Perrserker} switch to {p:Azumarill}" },
                { opponent: "{p:Azumarill} sand to {+:221}" },
              ],
              [
                { player: "{p:Azumarill} Aqua Jet {o:Aerodactyl} to {=:0}" },
                { opponent: "{o:Aerodactyl} fainted" },
                { opponent: "{p:Azumarill} sand to {+:207}" },
              ],
            ],
          },
          {
            matchup: ["Scizor-Mega"],
            turns: [
              [
                { player: "{p:Azumarill} switch to {p:Drednaw}" },
                { opponent: "{o:Scizor-Mega} Knock Off {p:Drednaw} to {+:164}" },
              ],
              [
                { player: "{p:Drednaw} switch to {p:Dragapult}" },
                { opponent: "{o:Scizor-Mega} Rock Smash {p:Dragapult}" },
                { opponent: "{p:Dragapult} sand to {+:205}" },
              ],
              [
                { player: "{p:Dragapult} Flamethrower {o:Scizor-Mega} to {=:0}" },
                { opponent: "{o:Scizor-Mega} fainted" },
                { opponent: "{p:Dragapult} sand to {+:192}" },
              ],
            ],
          },
          {
            matchup: ["Cacturne"],
            turns: [
              [
                { player: "{p:Dragapult} switch to {p:Incineroar}" },
                { opponent: "{o:Cacturne} Knock Off {p:Incineroar} to {+:166}" },
                { opponent: "{p:Incineroar} sand to {+:152}" },
              ],
              [
                { opponent: "{o:Cacturne} Needle Arm {p:Incineroar} to {+:62}" },
                { player: "{p:Incineroar} U-Turn {o:Cacturne} to {=:0}" },
                { opponent: "{o:Cacturne} fainted" },
                { player: "{p:Incineroar} switch to {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} sand to {+:178}" },
              ],
            ],
          },
          {
            matchup: ["Garchomp"],
            turns: [
              [
                { player: "{p:Meowscarada} Play Rough {o:Garchomp} to {-:239}" },
                { opponent: "{o:Garchomp} Scale Shot {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} sand to {+:166}" },
              ],
              [
                { player: "{p:Meowscarada} Flower Trick {o:Garchomp} to {-:118}" },
                { opponent: "{o:Garchomp} Earthquake {p:Meowscarada} to {+:62}" },
                { opponent: "{p:Meowscarada} sand to {+:50}" },
              ],
              [
                { player: "{p:Meowscarada} Flower Trick {o:Garchomp} to {=:0}" },
                { opponent: "{o:Garchomp} fainted" },
              ],
            ],
          },
        ],
        frags: { Meowscarada: 2, Azumarill: 1, Dragapult: 1, Incineroar: 1 },
      },
    ],
  },
};

const _box8 = getBox({
  box: _box7,
  remove: ["Azumarill"],
  update: {
    Perrserker: {
      hp: "Dark",
    },
  },
});

export const route16CueBallCamronBoxChange: Moment = {
  label: "Route 16 Cue Ball Camron Box Change",
  kind: "boxChange",
  data: { playerBox: _box8 },
};

const _box9 = getBox({
  box: _box8,
  update: {
    Meowscarada: {
      nature: "Jolly",
      item: "Cheri Berry",
      moves: ["Aerial Ace", "Flower Trick", "Knock Off", "Play Rough"],
    },
    Clodsire: {
      moves: ["Bulldoze", "Megahorn", "Rock Slide", "Rock Tomb"],
    },
    Houndoom: {
      nature: "Timid",
      moves: ["Fiery Wrath", "Flamethrower", "Scorching Sands", "Thunder Fang"],
    },
    Swampert: {
      nature: "Careful",
      moves: ["Earthquake", "Flip Turn", "Hammer Arm", "Rock Tomb"],
    },
    Dragapult: {
      item: "Safety Goggles",
      moves: ["Astonish", "Dragon Darts", "Flamethrower", "U-Turn"],
    },
    Excadrill: {
      nature: "Careful",
      item: "Sitrus Berry",
      moves: ["Brick Break", "Earthquake", "Iron Head", "Rock Slide"],
    },
  },
  team: ["Meowscarada", "Clodsire", "Houndoom", "Swampert", "Dragapult", "Excadrill"],
});

export const route16RiderHideoBattle: Moment = {
  label: "Route 16 Rider Hideo Battle",
  kind: "battle",
  data: {
    playerBox: _box9,
    opponentBox: route16RiderHideoBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Stunfisk"],
            turns: [
              [
                { player: "{p:Meowscarada} Flower Trick {o:Stunfisk} to {-:30}" },
                { opponent: "{o:Stunfisk} Stealth Rock" },
                { opponent: "{p:Meowscarada} sand to {=:190}" },
              ],
              [
                { player: "{p:Meowscarada} Flower Trick {o:Stunfisk} to {=:0}" },
                { opponent: "{o:Stunfisk} fainted" },
                { opponent: "{p:Meowscarada} sand to {=:178}" },
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
                { opponent: "{o:Dracovish} Psychic Fangs {p:Clodsire} to {+:138}" },
                { player: "{p:Clodsire} Bulldoze {o:Dracovish} to {-:178}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} Stealth Rock to {=:153}" },
                { opponent: "{o:Dracovish} Psychic Fangs {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} sand to {=:141}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Dracovish} to {-:26}" },
                { opponent: "{o:Dracovish} Dragon Claw {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} sand to {=:129}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Dracovish} to {=:0}" },
                { opponent: "{o:Dracovish} fainted" },
                { opponent: "{p:Meowscarada} sand to {+:117}" },
              ],
            ],
            branches: [{ branches: ["50% → Rotom-Heat Matchup", "50% → Aron Matchup"] }],
          },
        ],
        frags: { Meowscarada: 2 },
      },
      {
        line: "50% → Rotom-Heat Matchup",
        matchups: [
          {
            matchup: ["Rotom-Heat"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Houndoom}" },
                { opponent: "{p:Houndoom} Stealth Rock to {=:151}" },
                { opponent: "{o:Rotom-Heat} Inferno Overdrive {p:Houndoom}" },
                { opponent: "{p:Houndoom} sand to {=:139}" },
                { opponent: "{o:Rotom-Heat} sand to {=:152}" },
              ],
              [
                { player: "{p:Houndoom} switch to {p:Swampert}" },
                { opponent: "{p:Swampert} Stealth Rock to {=:221}" },
                { opponent: "{o:Rotom-Heat} Thunder Wave {p:Swampert}" },
                { opponent: "{o:Rotom-Heat} sand to {=:142}" },
              ],
              [
                { opponent: "{o:Rotom-Heat} HP Grass {p:Swampert} to {+:13}" },
                { player: "{p:Swampert} Rock Tomb {o:Rotom-Heat} to {-:78}" },
                { opponent: "{o:Rotom-Heat} sand to {-:68}" },
              ],
              [
                { player: "{p:Swampert} Flip Turn {o:Rotom-Heat} to {=:0}" },
                { opponent: "{o:Rotom-Heat} fainted" },
                { player: "{p:Swampert} switch to {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} Stealth Rock to {+:92}" },
                { opponent: "{p:Meowscarada} sand to {+:80}" },
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
              ],
              [
                { player: "{p:Dragapult} Dragon Darts {o:Aron} to {=:0}" },
                { opponent: "{o:Aron} fainted" },
              ],
            ],
            branches: [{ branches: ["Dragapult Switch to Excadrill"] }],
          },
        ],
        frags: { Swampert: 1, Dragapult: 1 },
      },
      {
        line: "50% → Aron Matchup",
        matchups: [
          {
            matchup: ["Aron"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Dragapult}" },
                { opponent: "{p:Dragapult} Stealth Rock to {=:191}" },
                { opponent: "{o:Aron} Endeavor {p:Dragapult}" },
              ],
              [
                { player: "{p:Dragapult} Astonish {o:Aron} to {=:1}" },
                { opponent: "{o:Aron} Endeavor {p:Dragapult}" },
              ],
              [
                { player: "{p:Dragapult} U-Turn {o:Aron} to {=:0}" },
                { opponent: "{o:Aron} fainted" },
                { player: "{p:Dragapult} switch to {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} Stealth Rock to {+:92}" },
                { opponent: "{p:Meowscarada} sand to {+:80}" },
              ],
            ],
          },
          {
            matchup: ["Rotom-Heat"],
            turns: [
              [
                { player: "{p:Meowscarada} switch to {p:Houndoom}" },
                { opponent: "{p:Houndoom} Stealth Rock to {=:151}" },
                { opponent: "{o:Rotom-Heat} Inferno Overdrive {p:Houndoom}" },
                { opponent: "{p:Houndoom} sand to {=:139}" },
                { opponent: "{o:Rotom-Heat} sand to {=:152}" },
              ],
              [
                { player: "{p:Houndoom} switch to {p:Swampert}" },
                { opponent: "{p:Swampert} Stealth Rock to {=:221}" },
                { opponent: "{o:Rotom-Heat} Thunder Wave {p:Swampert}" },
                { opponent: "{o:Rotom-Heat} sand to {=:142}" },
              ],
              [
                { opponent: "{o:Rotom-Heat} HP Grass {p:Swampert} to {+:13}" },
                { player: "{p:Swampert} Rock Tomb {o:Rotom-Heat} to {-:78}" },
                { opponent: "{o:Rotom-Heat} sand to {-:68}" },
              ],
              [
                { player: "{p:Swampert} Flip Turn {o:Rotom-Heat} to {=:0}" },
                { opponent: "{o:Rotom-Heat} fainted" },
                { player: "{p:Swampert} switch to {p:Dragapult}" },
                { opponent: "{p:Dragapult} Stealth Rock to {=:164}" },
              ],
            ],
            branches: [{ branches: ["Dragapult Switch to Excadrill"] }],
          },
        ],
        frags: { Swampert: 1, Dragapult: 1 },
      },
      {
        line: "Dragapult Switch to Excadrill",
        matchups: [
          {
            matchup: ["Greninja"],
            turns: [
              [
                { player: "{p:Dragapult} switch to {p:Excadrill}" },
                { opponent: "{p:Excadrill} Stealth Rock to {=:241}" },
                { opponent: "{o:Greninja} Ice Beam {p:Excadrill} to {+:111}" },
                { opponent: "{o:Excadrill} frostbite to {+:96}" },
              ],
              [
                { player: "{p:Excadrill} Iron Head {p:Greninja} to {=:0}" },
                { opponent: "{p:Greninja} fainted" },
                { opponent: "{o:Excadrill} frostbite to {+:81}" },
              ],
            ],
          },
          {
            matchup: ["Beedrill-Mega"],
            turns: [
              [
                { player: "{p:Excadrill} Rock Slide {p:Beedrill-Mega} to {=:0}" },
                { opponent: "{p:Beedrill-Mega} fainted" },
              ],
            ],
          },
        ],
        frags: { Excadrill: 2 },
      },
    ],
  },
};

const _box10 = getBox({
  box: _box9,
  update: {
    Excadrill: {
      nature: "Adamant",
      ability: "Mold Breaker",
      item: "Spell Tag",
      moves: ["Brick Break", "Earthquake", "Iron Head", "Shadow Claw"],
    },
    Clodsire: {
      nature: "Careful",
      moves: ["Bulldoze", "Earthquake", "Rock Slide", "Rock Tomb"],
    },
    Meowscarada: {
      nature: "Adamant",
      item: "Expert Belt",
      moves: ["Brick Break", "Flower Trick", "Knock Off", "Play Rough"],
    },
    Dragapult: {
      nature: "Jolly",
    },
  },
  team: ["Excadrill", "Clodsire", "Meowscarada", "Dragapult"],
});

export const route18BikerWilliamBattle: Moment = {
  label: "Route 18 Biker William Battle",
  kind: "battle",
  data: {
    playerBox: _box10,
    opponentBox: route18BikerWilliamBox,
    lines: [],
  },
};

const _froakie = {
  name: "Froakie",
  ability: "Torrent",
  moves: ["Growl", "Pound"],
};

export const starterEgg3Encounter: Moment = {
  label: "Starter Egg 3 Encounter",
  kind: "encounter",
  data: { pokemon: _froakie },
};

const _chimchar = {
  name: "Chimchar",
  ability: "Blaze",
  moves: ["Leer", "Scratch"],
};

export const starterEgg4Encounter: Moment = {
  label: "Starter Egg 4 Encounter",
  kind: "encounter",
  data: { pokemon: _chimchar },
};

const _treecko = {
  name: "Treecko",
  ability: "Overgrow",
  moves: ["Leer", "Pound"],
};

export const starterEgg5Encounter: Moment = {
  label: "Starter Egg 5 Encounter",
  kind: "encounter",
  data: { pokemon: _treecko },
};

export const box = _box10;

export const moments: Moment[] = [
  celadonCityEncounter,
  celadonCityBoxChange,
  route16BikerLaoBattle,
  route16CueBallKojiBattle,
  route16CueBallLukeBattle,
  route16BikerRubenBattle,
  route16BikerRubenBoxChange,
  route16CueBallCamronBattle,
  route16CueBallCamronBoxChange,
  route16RiderHideoBattle,
  route18BikerWilliamBattle,
  starterEgg3Encounter,
  starterEgg4Encounter,
  starterEgg5Encounter,
];
