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

import { box as _box1 } from "@site/src/data/guide/sabrina";

const _dreepy = {
  name: "Dreepy",
  level: "30",
  moves: ["Astonish", "Bite", "Infestation", "Quick Attack"],
};

const _box2 = getBox({ box: _box1, add: [_dreepy] });

export const celadonCityEncounter: Moment = {
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
  label: "Koga Box Change",
  kind: "boxChange",
  data: { playerBox: _box3 },
};

const _box4 = getBox({
  box: _box3,
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
  team: ["Excadrill", "Dragapult", "Gyarados", "Runerigus", "Clodsire"],
  extraTeam: ["Meowscarada"],
});

export const route16BikerLaoBattle: Moment = {
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
                { opponent: "{o:Dugtrio-A} Stone Edge {p:Gyarados} to {+:84}" },
                { player: "{p:Gyarados} Aqua Tail {o:Dugtrio-A} to {=:0}" },
                { opponent: "{o:Dugtrio-A} fainted" },
                { opponent: "{p:Gyarados} sandstorm to {+:70}" },
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
                { opponent: "{p:Dragapult} sandstorm to {+:179}" },
              ],
              [
                { player: "{p:Dragapult} Lock-On {o:Heliolisk}" },
                { opponent: "{o:Heliolisk} sleep" },
                { opponent: "{p:Dragapult} sandstorm to {+:166}" },
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

const _box5 = getBox({ box: _box4, team: ["Excadrill"] });

export const route16CueBallKojiBattle: Moment = {
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

const _box6 = getBox({ box: _box5, team: ["Excadrill", "Meowscarada"] });

export const route16CueBallLukeBattle: Moment = {
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
                { player: "{p:Excadrill} switch to {p:Meowscarada}" },
                { opponent: "{o:Hariyama} Fake Out {p:Meowscarada} to {+:148}" },
                { opponent: "{p:Meowscarada} sandstorm to {+:136}" },
              ],
              [
                { player: "{p:Meowscarada} Acrobatics {o:Hariyama} to {=:0}" },
                { opponent: "{o:Hariyama} fainted" },
                { opponent: "{p:Meowscarada} sandstorm to {+:124}" },
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
    playerBox: _box7,
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
                { opponent: "{o:Lopunny-Mega} mega evolve" },
                { opponent: "{o:Lopunny-Mega} Close Combat {p:Azumarill} to {+:118}" },
                { opponent: "{p:Azumarill} sandstorm to {+:104}" },
                { opponent: "{o:Lopunny-Mega} sandstorm to {-:171}" },
              ],
              [
                { player: "{p:Azumarill} switch to {p:Excadrill}" },
                { opponent: "{o:Lopunny-Mega} Return {p:Excadrill} to {+:125}" },
                { opponent: "{o:Lopunny-Mega} sandstorm to {-:160}" },
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
                { opponent: "{o:Roserade} sandstorm to {-:165}" },
              ],
              [
                { player: "{p:Drednaw} switch to {p:Meowscarada}" },
                { opponent: "{o:Roserade} Giga Drain {p:Meowscarada} to {+:127}" },
                { opponent: "{o:Roserade} recover to {-:175}" },
                { opponent: "{p:Meowscarada} sandstorm to {+:115}" },
                { opponent: "{o:Roserade} sandstorm to {-:165}" },
              ],
              [
                { player: "{p:Meowscarada} Acrobatics {o:Roserade} to {=:0}" },
                { opponent: "{o:Roserade} fainted" },
                { opponent: "{p:Meowscarada} sandstorm to {+:103}" },
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

const _box8 = getBox({
  box: _box7,
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
  data: { playerBox: _box7 },
};

const _box9 = getBox({
  box: _box8,
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
                { player: "{p:Meowscarada} switch to {p:Perrserker}" },
                { opponent: "{o:Aerodactyl} Brave Bird {p:Perrserker} to {+:174}" },
                { opponent: "{o:Aerodactyl} recoil to {-:189}" },
              ],
              [
                { opponent: "{o:Aerodactyl} Earthquake {p:Perrserker} to {+:68}" },
                { opponent: "{p:Perrserker} Sitrus Berry to {+:123}" },
                { player: "{p:Perrserker} Shadow Claw {o:Aerodactyl} to {-:126}" },
              ],
              [
                { opponent: "{o:Aerodactyl} Earthquake {p:Perrserker} to {+:17}" },
                { player: "{p:Perrserker} U-Turn {o:Aerodactyl} to {-:98}" },
                { player: "{p:Perrserker} switch to {p:Azumarill}" },
                { opponent: "{p:Azumarill} sandstorm to {+:221}" },
              ],
              [
                { player: "{p:Azumarill} Aqua Jet {o:Aerodactyl} to {=:0}" },
                { opponent: "{o:Aerodactyl} fainted" },
                { opponent: "{p:Azumarill} sandstorm to {+:207}" },
              ],
            ],
          },
          {
            matchup: ["Scizor-Mega"],
            turns: [
              [
                { player: "{p:Azumarill} switch to {p:Drednaw}" },
                { opponent: "{o:Scizor-Mega} mega evolve" },
                { opponent: "{o:Scizor-Mega} Knock Off {p:Drednaw} to {+:164}" },
              ],
              [
                { player: "{p:Drednaw} switch to {p:Dragapult}" },
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
                { player: "{p:Dragapult} switch to {p:Incineroar}" },
                { opponent: "{o:Cacturne} Knock Off {p:Incineroar} to {+:166}" },
                { opponent: "{p:Incineroar} sandstorm to {+:152}" },
              ],
              [
                { opponent: "{o:Cacturne} Needle Arm {p:Incineroar} to {+:62}" },
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
        frags: { Meowscarada: 2, Azumarill: 1, Dragapult: 1, Incineroar: 1 },
      },
    ],
  },
};

const _box10 = getBox({
  box: _box9,
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
  data: { playerBox: _box9 },
};

const _box11 = getBox({
  box: _box10,
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
    playerBox: _box11,
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
                { opponent: "{o:Dracovish} Psychic Fangs {p:Clodsire} to {+:138}" },
                { player: "{p:Clodsire} Bulldoze {o:Dracovish} to {-:178}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} Stealth Rock to {=:153}" },
                { opponent: "{o:Dracovish} Psychic Fangs {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} sandstorm to {=:141}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Dracovish} to {-:26}" },
                { opponent: "{o:Dracovish} Dragon Claw {p:Meowscarada}" },
                { opponent: "{p:Meowscarada} sandstorm to {=:129}" },
              ],
              [
                { player: "{p:Meowscarada} Play Rough {o:Dracovish} to {=:0}" },
                { opponent: "{o:Dracovish} fainted" },
                { opponent: "{p:Meowscarada} sandstorm to {+:117}" },
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
                { opponent: "{p:Houndoom} sandstorm to {=:139}" },
                { opponent: "{o:Rotom-Heat} sandstorm to {=:152}" },
              ],
              [
                { player: "{p:Houndoom} switch to {p:Swampert}" },
                { opponent: "{p:Swampert} Stealth Rock to {=:221}" },
                { opponent: "{o:Rotom-Heat} Thunder Wave {p:Swampert}" },
                { opponent: "{o:Rotom-Heat} sandstorm to {=:142}" },
              ],
              [
                { opponent: "{o:Rotom-Heat} HP Grass {p:Swampert} to {+:13}" },
                { player: "{p:Swampert} Rock Tomb {o:Rotom-Heat} to {-:78}" },
                { opponent: "{o:Rotom-Heat} sandstorm to {-:68}" },
              ],
              [
                { player: "{p:Swampert} Flip Turn {o:Rotom-Heat} to {=:0}" },
                { opponent: "{o:Rotom-Heat} fainted" },
                { player: "{p:Swampert} switch to {p:Meowscarada}" },
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
                { opponent: "{p:Meowscarada} sandstorm to {+:80}" },
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
                { opponent: "{p:Houndoom} sandstorm to {=:139}" },
                { opponent: "{o:Rotom-Heat} sandstorm to {=:152}" },
              ],
              [
                { player: "{p:Houndoom} switch to {p:Swampert}" },
                { opponent: "{p:Swampert} Stealth Rock to {=:221}" },
                { opponent: "{o:Rotom-Heat} Thunder Wave {p:Swampert}" },
                { opponent: "{o:Rotom-Heat} sandstorm to {=:142}" },
              ],
              [
                { opponent: "{o:Rotom-Heat} HP Grass {p:Swampert} to {+:13}" },
                { player: "{p:Swampert} Rock Tomb {o:Rotom-Heat} to {-:78}" },
                { opponent: "{o:Rotom-Heat} sandstorm to {-:68}" },
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
                { opponent: "{p:Excadrill} frostbite to {+:96}" },
              ],
              [
                { player: "{p:Excadrill} Iron Head {o:Greninja} to {=:0}" },
                { opponent: "{o:Greninja} fainted" },
                { opponent: "{p:Excadrill} frostbite to {+:81}" },
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

const _box12 = getBox({
  box: _box11,
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
  team: ["Excadrill", "Clodsire", "Meowscarada"],
  extraTeam: ["Dragapult"],
});

export const route18BikerWilliamBattle: Moment = {
  label: "Route 18 Biker William Battle",
  kind: "battle",
  data: {
    playerBox: _box12,
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

const _box13 = getBox({
  box: _box12,
  update: {
    Drednaw: {
      ivs: { hp: 0, spd: 0 },
    },
    Swampert: {
      ivs: undefined,
    },
  },
});

export const route18BikerWilliamBoxChange: Moment = {
  label: "Route 18 Biker William Box Change",
  kind: "boxChange",
  data: { playerBox: _box13 },
};

const _box14 = getBox({
  box: _box13,
  update: {
    Swampert: {
      name: "Swampert-Mega",
      ability: "Swift Swim",
    },
  },
});

const _box15 = getBox({
  box: _box14,
  update: {
    Lanturn: {
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
      item: "Swampertite",
      moves: ["Earthquake", "Hammer Arm", "Knock Off", "Rock Slide"],
    },
    Meowscarada: {
      item: undefined,
      moves: ["Acrobatics", "Flower Trick", "Knock Off", "Thunder Punch"],
    },
    Tentacruel: {
      nature: "Modest",
      moves: ["Dazzling Gleam", "Flip Turn", "Hydro Pump", "Sludge Wave"],
    },
  },
  team: ["Lanturn", "Drednaw", "Swampert-Mega", "Meowscarada", "Tentacruel", "Gyarados"],
});

export const route18BirdKeeperJacobBattle: Moment = {
  label: "Route 18 Bird Keeper Jacob Battle",
  kind: "battle",
  data: {
    playerBox: _box15,
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
        ifNot: ["20% → Lanturn Volt Switch Cramorant-Gorg"],
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
                  "80% → Cramorant-Gorg switch to Porygon2",
                  "20% → Drednaw Rock Slide Cramorant-Gorg",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "80% → Cramorant-Gorg switch to Porygon2",
        if: ["20% → Lanturn Volt Switch Cramorant-Gorg"],
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
                if: [
                  "80% → Cramorant-Gorg switch to Porygon2",
                  "20% → Lanturn Volt Switch Cramorant-Gorg",
                ],
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

const _box16 = getBox({
  box: _box15,
  update: {
    "Swampert-Mega": {
      moves: ["Earthquake", "Hammer Arm", "Ice Punch", "Rock Slide"],
    },
    Clodsire: {
      item: "Persim Berry",
    },
    Perrserker: {
      item: "Aspear Berry",
      moves: ["Fake Out", "Bullet Punch", "Thrash", "U-Turn"],
    },
    "Arcanine-H": {
      item: "Persim Berry",
    },
  },
  team: ["Dragapult", "Swampert-Mega", "Clodsire", "Perrserker", "Arcanine-H"],
});

export const route18AceTrainerWiltonBattle: Moment = {
  label: "Route 18 Ace Trainer Wilton Battle",
  kind: "battle",
  data: {
    playerBox: _box16,
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
                { opponent: "{p:Swampert-Mega} Stealth Rock to {=:221}" },
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
                { player: "{p:Swampert-Mega} Earthquake {o:Omastar} to {=:1}" },
                { opponent: "{o:Omastar} Shell Smash" },
              ],
              [
                { player: "{p:Swampert-Mega} switch to {p:Clodsire}" },
                { opponent: "{p:Clodsire} Stealth Rock to {=:258}" },
                { opponent: "{o:Omastar} Hydro Pump {p:Clodsire} to {+:258}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Perrserker}" },
                { opponent: "{p:Perrserker} Stealth Rock to {=:208}" },
                { opponent: "{o:Omastar} Ice Beam {p:Perrserker} to {+:129}" },
              ],
              [
                { player: "{p:Perrserker} Bullet Punch {o:Omastar} to {=:0}" },
                { opponent: "{o:Omastar} fainted" },
              ],
            ],
          },
          {
            matchup: ["Kilowattrel"],
            turns: [
              [
                { player: "{p:Perrserker} switch to {p:Clodsire}" },
                { opponent: "{p:Clodsire} Stealth Rock to {=:241}" },
                { opponent: "{o:Kilowattrel} Thunder {p:Clodsire}" },
              ],
              [
                { opponent: "{o:Kilowattrel} Hurricane {p:Clodsire} to {+:27}" },
                { player: "{p:Clodsire} Rock Tomb {o:Kilowattrel} to {-:114}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Arcanine-H}" },
                { opponent: "{p:Arcanine-H} Stealth Rock to {=:171}" },
                { opponent: "{o:Kilowattrel} Hurricane {p:Arcanine-H} to {+:42}" },
              ],
              [
                { player: "{p:Arcanine-H} Rock Slide {o:Kilowattrel} to {=:0}" },
                { opponent: "{o:Kilowattrel} fainted" },
              ],
            ],
          },
        ],
        frags: { Dragapult: 1, "Swampert-Mega": 2, Perrserker: 1, "Arcanine-H": 1 },
      },
    ],
  },
};

const _box17 = getBox({
  box: _box16,
  update: {
    Meowscarada: {
      item: "Expert Belt",
      moves: ["Cut", "Leaf Storm", "Play Rough", "Sucker Punch"],
    },
    Lanturn: {
      ability: "Volt Absorb",
      moves: ["Icy Wind", "Hydro Pump", "Signal Beam", "Volt Switch"],
    },
    Tentacruel: {
      nature: "Timid",
      item: "Poison Barb",
    },
  },
  team: ["Meowscarada", "Lanturn", "Tentacruel", "Swampert-Mega", "Gyarados"],
});

export const fuschiaCityBrendanBattle: Moment = {
  label: "Fuschia City Brendan Battle",
  kind: "battle",
  data: {
    playerBox: _box17,
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
  pokedexKey: "Screamtail",
  level: "50-52",
  moves: ["Body Slam", "Hyper Voice", "Play Rough", "Rest"],
};

const _box18 = getBox({
  box: _box17,
  update: {
    Incineroar: {
      moves: ["Fake Out", "Darkest Lariat", "Flamethrower", "U-Turn"],
    },
    Excadrill: {
      nature: "Jolly",
      item: "Expert Belt",
      moves: ["Brick Break", "Drill Run", "Iron Head", "Shadow Claw"],
    },
  },
  team: ["Incineroar", "Excadrill"],
});

const _box19 = getBox({ box: _box18, add: [_screamTail] });

export const safariZoneEncounter: Moment = {
  label: "Safari Zone Encounter",
  kind: "encounter",
  data: { pokemon: _screamTail, playerBox: _box19, showPlayerTeam: true },
};

const _froakie = {
  name: "Froakie",
  level: "1",
  ability: "Torrent",
  moves: ["Growl", "Pound"],
};

const _box20 = getBox({ box: _box19, add: [_froakie] });

export const starterEgg3Encounter: Moment = {
  label: "Starter Egg 3 Encounter",
  kind: "encounter",
  data: { pokemon: _froakie, playerBox: _box20 },
};

const _chimchar = {
  name: "Chimchar",
  level: "1",
  ability: "Blaze",
  moves: ["Leer", "Scratch"],
};

const _box21 = getBox({ box: _box20, add: [_chimchar] });

export const starterEgg4Encounter: Moment = {
  label: "Starter Egg 4 Encounter",
  kind: "encounter",
  data: { pokemon: _chimchar, playerBox: _box21 },
};

const _treecko = {
  name: "Treecko",
  level: "1",
  ability: "Overgrow",
  moves: ["Leer", "Pound"],
};

const _box22 = getBox({ box: _box21, add: [_treecko] });

export const starterEgg5Encounter: Moment = {
  label: "Starter Egg 5 Encounter",
  kind: "encounter",
  data: { pokemon: _treecko, playerBox: _box22 },
};

const _box23 = getBox({
  box: _box22,
  cap: 68,
  update: [
    {
      Drednaw: {
        ivs: { hp: 31, spd: 31 },
      },
      Froakie: {
        name: "Frogadier",
      },
    },
    {
      Frogadier: {
        name: "Greninja",
        moves: ["Growl", "Pound", "Water Shuriken"],
      },
    },
    {
      Chimchar: {
        name: "Monferno",
      },
    },
    {
      Monferno: {
        name: "Infernape",
        moves: ["Close Combat", "Leer", "Mach Punch", "Scratch"],
      },
    },
    {
      Treecko: {
        name: "Grovyle",
      },
    },
    {
      Grovyle: {
        name: "Sceptile",
        moves: ["Dual Chop", "Fury Cutter", "Leer", "Pound"],
      },
    },
  ],
});

export const starterEgg5BoxChange: Moment = {
  label: "Starter Egg 5 Box Change",
  kind: "boxChange",
  data: { playerBox: _box23 },
};

export const box = _box23;

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
  route18BikerWilliamBoxChange,
  route18BirdKeeperJacobBattle,
  route18AceTrainerWiltonBattle,
  fuschiaCityBrendanBattle,
  safariZoneEncounter,
  starterEgg3Encounter,
  starterEgg4Encounter,
  starterEgg5Encounter,
  starterEgg5BoxChange,
];
