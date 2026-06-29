import { getBox } from "@site/src/utils/box";
import { Moment } from "@site/src/utils/moments";
import {
  celadonCityGymAceTrainerMaryBox,
  celadonCityLeaderErikaBox,
  rockTunnelPicnickerDanaBox,
  route10PokeManiacHermanBox,
  route8SuperNerdAidanBox,
  route9PicnickerAliciaBox,
  route9PicnickerCaitlinBox,
} from "@site/src/utils/opponents";

import { box as _box1 } from "@site/src/data/guide/surge";

const _box2 = getBox({
  box: _box1,
  cap: { level: 44, exclude: ["Golisopod"] },
  update: {
    Golisopod: {
      level: 41,
    },
  },
});

export const erikaBoxChange: Moment = {
  split: "Erika",
  label: "Erika Box Change",
  kind: "boxChange",
  data: { playerBox: _box2 },
};

const _box3 = getBox({
  box: _box2,
  update: {
    Perrserker: {
      nature: "Adamant",
      ability: "Battle Armor",
      item: "Chesto Berry",
      moves: ["Fake Out", "Bullet Punch", "Dig", "Iron Head"],
    },
    Clodsire: {
      nature: "Careful",
      ability: "Water Absorb",
      item: undefined,
      moves: ["Bulldoze", "Poison Jab", "Rock Tomb", "Tail Whip"],
    },
    Houndoom: {
      nature: "Timid",
      ability: "Flash Fire",
      item: "Black Glasses",
      moves: ["Dark Pulse", "Incinerate", "Leer", "Sucker Punch"],
    },
    Golduck: {
      nature: "Jolly",
      ability: "Neuroforce",
      item: "Colbur Berry",
      moves: ["Aqua Tail", "Low Sweep", "Psychic", "Zen Headbutt"],
    },
    Drednaw: {
      nature: "Naughty",
      ability: "Shell Armor",
      item: "Sitrus Berry",
      moves: ["Aqua Jet", "Counter", "Razor Shell", "Rock Tomb"],
    },
  },
  team: ["Perrserker", "Clodsire", "Houndoom", "Golduck", "Drednaw"],
});

export const route9PicnickerAliciaBattle: Moment = {
  split: "Surge",
  label: "Route 9 Picnicker Alicia Battle",
  kind: "battle",
  data: {
    playerBox: _box3,
    opponentBox: route9PicnickerAliciaBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Roserade"],
            turns: [
              [
                { player: "{p:Perrserker} Fake Out {o:Roserade} to {-:92}" },
                { opponent: "{o:Roserade} flinched" },
              ],
              [
                { opponent: "{o:Roserade} Sleep Powder {p:Perrserker}" },
                { player: "{p:Perrserker} Iron Head {o:Roserade} to {-:23}" },
              ],
              [
                { player: "{p:Perrserker} Bullet Punch {o:Roserade} to {=:0}" },
                { opponent: "{o:Roserade} fainted" },
              ],
            ],
          },
          {
            matchup: ["Bruxish"],
            turns: [
              [
                { player: "{p:Perrserker} switch to {p:Clodsire}" },
                { opponent: "{o:Bruxish} Aqua Fang {p:Clodsire}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Houndoom}" },
                { opponent: "{o:Bruxish} Psychic Fangs {p:Houndoom}" },
              ],
              [
                { player: "{p:Houndoom} Dark Pulse {o:Bruxish} to {=:0}" },
                { opponent: "{o:Bruxish} fainted" },
              ],
            ],
          },
          {
            matchup: ["Flareon"],
            turns: [
              [
                { player: "{p:Houndoom} switch to {p:Golduck}" },
                { opponent: "{o:Flareon} Stom. Tantrum {p:Golduck} to {+:71}" },
              ],
              [
                { player: "{p:Golduck} Aqua Tail {o:Flareon} to {=:0}" },
                { opponent: "{o:Flareon} fainted" },
              ],
            ],
          },
          {
            matchup: ["Chatot"],
            turns: [
              [
                { player: "{p:Golduck} switch to {p:Drednaw}" },
                { opponent: "{o:Chatot} Boomburst {p:Drednaw} to {+:57}" },
                { opponent: "{p:Drednaw} Sitrus Berry to {+:93}" },
              ],
              [
                { opponent: "{o:Chatot} Boomburst {p:Drednaw} to {+:4}" },
                { player: "{p:Drednaw} Rock Tomb {o:Chatot} to {=:0}" },
              ],
            ],
          },
        ],
        frags: { Perrserker: 1, Houndoom: 1, Golduck: 1, Drednaw: 1 },
      },
    ],
  },
};

const _box4 = getBox({
  box: _box3,
  update: {
    Golduck: {
      nature: "Jolly",
      ability: "Neuroforce",
      item: "Sitrus Berry",
      moves: ["Aqua Jet", "Aqua Tail", "Flip Turn", "Zen Headbutt"],
    },
    Runerigus: {
      nature: "Bold",
      ability: "Shadow Shield",
      item: "Chesto Berry",
      moves: ["Disable", "Haze", "Mean Look", "Rest"],
    },
    Azumarill: {
      nature: "Impish",
      ability: "Huge Power",
      item: "Sitrus Berry",
      moves: ["Aqua Jet", "Aqua Tail", "Helping Hand", "Play Rough"],
    },
    Incineroar: {
      nature: "Adamant",
      ability: "Blaze",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Darkest Lariat", "Fire Fang", "U-Turn"],
    },
  },
  team: ["Golduck", "Runerigus", "Azumarill", "Incineroar"],
});

export const route9PicnickerCaitlinBattle: Moment = {
  split: "Surge",
  label: "Route 9 Picnicker Caitlin Battle",
  kind: "battle",
  data: {
    playerBox: _box4,
    opponentBox: route9PicnickerCaitlinBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Smeargle"],
            turns: [
              [
                { opponent: "{o:Smeargle} Dragon Ascent {p:Golduck} to {+:108}" },
                { player: "{p:Golduck} Aqua Tail {o:Smeargle} to {=:0}" },
                { opponent: "{o:Smeargle} fainted" },
              ],
            ],
          },
          {
            matchup: ["Spinda"],
            turns: [
              [
                { opponent: "{o:Spinda} Assist (Dragon Ascent) {p:Golduck} to {+:36}" },
                { opponent: "{p:Golduck} Sitrus Berry to {+:70}" },
                { player: "{p:Golduck} Flip Turn {o:Spinda} to {-:117}" },
                { player: "{p:Golduck} switch to {p:Runerigus}" },
              ],
              [
                { opponent: "{o:Spinda} Assist (V-Create) {p:Runerigus} to {+:88}" },
                { player: "{p:Runerigus} Mean Look {o:Spinda}" },
              ],
              [
                { opponent: "{o:Spinda} Assist (V-Create) {p:Runerigus} to {+:28}" },
                { player: "{p:Runerigus} Disable {o:Spinda}" },
              ],
              [
                { opponent: "{o:Spinda} Struggle {p:Runerigus} to {+:10}" },
                { opponent: "{o:Spinda} recoil to {-:83}" },
                { player: "{p:Runerigus} Rest to {=:118}" },
              ],
              [
                { opponent: "{o:Spinda} Struggle {p:Runerigus} to {+:49}" },
                { opponent: "{o:Spinda} recoil to {-:40}" },
                { player: "{p:Runerigus} Haze {o:Spinda}" },
              ],
              [
                { player: "{p:Runerigus} switch to {p:Golduck}" },
                { opponent: "{o:Spinda} Struggle {p:Golduck} to {+:39}" },
                { opponent: "{o:Spinda} recoil to {-:15}" },
              ],
              [
                { player: "{p:Golduck} Aqua Jet {o:Spinda} to {=:0}" },
                { opponent: "{o:Spinda} fainted" },
              ],
            ],
          },
          {
            matchup: ["Sneasel-H"],
            turns: [
              [
                { player: "{p:Golduck} switch to {p:Azumarill}" },
                { opponent: "{o:Sneasel-H} Assist (Dragon Ascent) {p:Azumarill} to {+:82}" },
              ],
              [
                { opponent: "{o:Sneasel-H} Assist (Dragon Ascent) {p:Azumarill} to {+:9}" },
                { opponent: "{p:Azumarill} Sitrus Berry to {+:47}" },
                { player: "{p:Azumarill} Play Rough {o:Sneasel-H} to {=:0}" },
                { opponent: "{o:Sneasel-H} fainted" },
              ],
            ],
          },
          {
            matchup: ["Liepard"],
            turns: [
              [
                { player: "{p:Azumarill} switch to {p:Incineroar}" },
                { opponent: "{o:Liepard} Assist {p:Incineroar}" },
              ],
              [
                { opponent: "{o:Liepard} Assist {p:Incineroar}" },
                { player: "{p:Incineroar} Fire Fang {o:Liepard} to {-:54}" },
              ],
              [
                { opponent: "{o:Liepard} Assist {p:Incineroar}" },
                { player: "{p:Incineroar} Fire Fang {o:Liepard} to {=:0}" },
                { opponent: "{o:Liepard} fainted" },
              ],
            ],
          },
        ],
        frags: { Golduck: 2, Azumarill: 1, Incineroar: 1 },
      },
    ],
  },
};

const _box5 = getBox({
  box: _box4,
  update: {
    Excadrill: {
      nature: "Adamant",
      ability: "Mold Breaker",
      item: "Shuca Berry",
      moves: ["Earthquake", "Mud-Slap", "Rapid Spin", "Rock Tomb"],
    },
    Golisopod: {
      nature: "Impish",
      ability: "Emergency Exit",
      item: "Charti Berry",
      moves: ["First Impress.", "Razor Shell", "Rock Tomb", "Sucker Punch"],
    },
    Drednaw: {
      nature: "Adamant",
      ability: "Strong Jaw",
      item: "Black Belt",
      moves: ["Aqua Jet", "Jaw Lock", "Razor Shell", "Rock Tomb"],
    },
    Tentacruel: {
      nature: "Timid",
      ability: "Clear Body",
      item: "Sitrus Berry",
      moves: ["Acid Spray", "Icy Wind", "Poison Jab", "Scald"],
    },
    Incineroar: {
      nature: "Adamant",
      ability: "Blaze",
      item: "Passho Berry",
      moves: ["Fake Out", "Darkest Lariat", "Fire Fang", "U-Turn"],
    },
    Golduck: {
      nature: "Naive",
      ability: "Neuroforce",
      item: "Mystic Water",
      moves: ["Aqua Tail", "Flash", "Flip Turn", "Zen Headbutt"],
    },
  },
  team: ["Excadrill", "Golisopod", "Drednaw", "Tentacruel", "Incineroar", "Golduck"],
});

export const rockTunnelPicnickerDanaBattle: Moment = {
  split: "Erika",
  label: "Rock Tunnel Picnicker Dana Battle",
  kind: "battle",
  data: {
    playerBox: _box5,
    opponentBox: rockTunnelPicnickerDanaBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Ribombee"],
            turns: [
              [
                { opponent: "{o:Ribombee} Moonblast {p:Excadrill} to {+:113}" },
                { player: "{p:Excadrill} Rock Tomb {o:Ribombee} to {-:27}" },
              ],
              [
                { player: "{p:Excadrill} Rapid Spin {o:Ribombee} to {=:0}" },
                { opponent: "{o:Ribombee} fainted" },
              ],
            ],
          },
          {
            matchup: ["Bouffalant"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Golisopod}" },
                { opponent: "{o:Bouffalant} Head Charge {p:Golisopod} to {+:8}" },
                { opponent: "{o:Bouffalant} recoil to {-:136}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Drednaw}" },
              ],
              [
                { player: "{p:Drednaw} Jaw Lock {o:Bouffalant} to {=:0}" },
                { opponent: "{o:Bouffalant} fainted" },
              ],
            ],
          },
          {
            matchup: ["Clawitzer"],
            turns: [
              [
                { player: "{p:Drednaw} switch to {p:Tentacruel}" },
                { opponent: "{o:Clawitzer} Aura Sphere {p:Tentacruel} to {+:103}" },
              ],
              [
                { player: "{p:Tentacruel} Acid Spray {o:Clawitzer} to {-:109}" },
                { opponent: "{o:Clawitzer} Dark Pulse {p:Tentacruel} to {+:33}" },
                { opponent: "{p:Tentacruel} Sitrus Berry to {+:67}" },
              ],
              [
                { player: "{p:Tentacruel} switch to {p:Incineroar}" },
                { opponent: "{o:Clawitzer} Dark Pulse {p:Incineroar} to {+:121}" },
              ],
              [
                { player: "{p:Incineroar} switch to {p:Golduck}" },
                { opponent: "{o:Clawitzer} Aura Sphere {p:Golduck} to {+:84}" },
              ],
              [
                { player: "{p:Golduck} Flash {o:Clawitzer} to {=:0}" },
                { opponent: "{o:Clawitzer} fainted" },
              ],
            ],
          },
          {
            matchup: ["Rampardos"],
            turns: [
              [
                { player: "{p:Golduck} Aqua Tail {o:Rampardos} to {=:0}" },
                { opponent: "{o:Rampardos} fainted" },
              ],
            ],
          },
          {
            matchup: ["Magmortar"],
            turns: [
              [
                { player: "{p:Golduck} Aqua Tail {o:Magmortar} to {=:0}" },
                { opponent: "{o:Magmortar} fainted" },
              ],
            ],
          },
        ],
        frags: { Excadrill: 1, Drednaw: 1, Golduck: 3 },
      },
    ],
  },
};

const _box6 = getBox({
  box: _box5,
  update: {
    Golduck: {
      nature: "Modest",
      ability: "Cloud Nine",
      item: "Mystic Water",
      moves: ["Aqua Tail", "Flash", "Flip Turn", "Psychic"],
    },
    Gyarados: {
      nature: "Jolly",
      ability: "Intimidate",
      item: "Sitrus Berry",
      moves: ["Aqua Tail", "Bulldoze", "Ice Fang", "Leer"],
    },
    Perrserker: {
      nature: "Adamant",
      ability: "Battle Armor",
      item: "Chesto Berry",
      moves: ["Fake Out", "Bullet Punch", "Dig", "Iron Head"],
    },
    Tentacruel: {
      nature: "Timid",
      ability: "Clear Body",
      item: "Sitrus Berry",
      moves: ["Acid Spray", "Icy Wind", "Poison Jab", "Scald"],
    },
  },
  team: ["Golduck", "Gyarados", "Perrserker", "Tentacruel"],
});

export const route10PokeManiacHermanBattle: Moment = {
  split: "Surge",
  label: "Route 10 Poké Maniac Herman Battle",
  kind: "battle",
  data: {
    playerBox: _box6,
    opponentBox: route10PokeManiacHermanBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Ninetales", "Victreebel"],
            turns: [
              [
                { opponent: "{o:Ninetales} Solar Beam" },
                { player: "{p:Golduck} Psychic {o:Victreebel} to {=:0}" },
                { opponent: "{o:Victreebel} fainted" },
                { player: "{p:Gyarados} Aqua Tail {o:Ninetales} to {=:0}" },
                { opponent: "{o:Ninetales} fainted" },
              ],
            ],
          },
          {
            matchup: ["Sylveon", "Cherrim"],
            turns: [
              [
                { player: "{p:Golduck} Psychic {o:Cherrim} to {-:71}" },
                { player: "{p:Gyarados} Ice Fang {o:Cherrim} to {=:0}" },
                { opponent: "{o:Cherrim} fainted" },
                {
                  opponent:
                    "{o:Sylveon} Hyper Voice {p:Golduck} to {+:20} and {p:Gyarados} (non-crit) to {+:84}",
                },
              ],
            ],
          },
          {
            matchup: ["Sylveon"],
            turns: [
              [
                { player: "{p:Golduck} switch to {p:Perrserker}" },
                { player: "{p:Gyarados} switch to {p:Tentacruel}" },
                {
                  opponent:
                    "{o:Sylveon} Misty Explosi. {p:Perrserker} to {=:53} and {p:Tentacruel} (non-crit) to {+:86}",
                },
                { opponent: "{o:Sylveon} fainted" },
              ],
            ],
          },
        ],
        frags: { Golduck: 1, Gyarados: 2, Perrserker: 1 },
      },
    ],
  },
};

const _box7 = getBox({
  box: _box6,
  update: {
    Golduck: {
      nature: "Modest",
      ability: "Neuroforce",
      item: "Mystic Water",
      moves: ["Aqua Tail", "Flash", "Flip Turn", "Scald"],
    },
    Golisopod: {
      nature: "Impish",
      ability: "Emergency Exit",
      item: "Charti Berry",
      moves: ["First Impress.", "Icy Wind", "Rock Tomb", "Sucker Punch"],
    },
    "Arcanine-H": {
      nature: "Relaxed",
      ability: "Rock Head",
      item: "Sitrus Berry",
      moves: ["Accelerock", "Flamethrower", "Flare Blitz", "Rock Tomb"],
    },
    Excadrill: {
      nature: "Naive",
      ability: "Mold Breaker",
      item: "Soft Sand",
      moves: ["Earthquake", "Mud-Slap", "Rapid Spin", "Rock Tomb"],
    },
    Gyarados: {
      nature: "Jolly",
      ability: "Intimidate",
      item: "Sitrus Berry",
      moves: ["Aqua Tail", "Crunch", "Ice Fang", "Leer"],
    },
  },
  team: ["Golduck", "Golisopod", "Arcanine-H", "Excadrill", "Gyarados"],
});

export const route8SuperNerdAidanBattle: Moment = {
  split: "Surge",
  label: "Route 8 Super Nerd Aidan Battle",
  kind: "battle",
  data: {
    playerBox: _box7,
    opponentBox: route8SuperNerdAidanBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Tsareena", "Armarouge"],
            turns: [
              [
                { player: "{p:Golduck} switch to {p:Arcanine-H}" },
                { opponent: "{o:Tsareena} Power Whip {p:Arcanine-H} to {+:7}" },
                { opponent: "{p:Arcanine-H} Sitrus Berry to {+:44}" },
                { opponent: "{o:Armarouge} Flamethrower {p:Golisopod} to {+:7}" },
                {
                  player:
                    "{p:Golisopod} Icy Wind {o:Tsareena} to {-:108} and {o:Armarouge} to {-:134}",
                },
                { player: "{p:Golisopod} Emergency Exit to {p:Golduck}" },
              ],
              [
                { player: "{p:Golduck} Scald {o:Armarouge} to {=:0}" },
                { player: "{p:Arcanine-H} Flare Blitz {o:Tsareena} to {=:0}" },
                { opponent: "{o:Tsareena} fainted" },
                { opponent: "{o:Armarouge} fainted" },
              ],
            ],
          },
          {
            matchup: ["Arcanine-H", "Basculegion-F"],
            turns: [
              [
                { player: "{p:Arcanine-H} switch to {p:Excadrill}" },
                { player: "{p:Golduck} Flip Turn {o:Arcanine-H} to {=:1}" },
                { player: "{p:Golduck} switch to {p:Gyarados}" },
                { opponent: "{o:Arcanine-H} Head Smash {p:Excadrill} to {+:107}" },
                { opponent: "{o:Basculegion-F} Shadow Ball {p:Gyarados} to {+:55}" },
                { opponent: "{p:Gyarados} Sitrus Berry to {+:92}" },
              ],
              [
                {
                  player:
                    "{p:Excadrill} Earthquake {o:Arcanine-H} to {=:0} and {o:Basculegion-F} to {-:77}",
                },
                { opponent: "{o:Arcanine-H} fainted" },
                { player: "{p:Gyarados} Crunch {o:Basculegion-F} to {=:0}" },
                { opponent: "{o:Basculegion-F} fainted" },
              ],
            ],
          },
          {
            matchup: ["Braviary-H"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Arcanine-H}" },
                { player: "{p:Gyarados} Crunch {o:Braviary-H} to {-:92}" },
                {
                  opponent:
                    "{o:Braviary-H} Heat Wave {p:Arcanine-H} to {+:11} and {p:Gyarados} to {+:28}",
                },
                { opponent: "{p:Gyarados} burn to {+:19}" },
              ],
              [
                { player: "{p:Gyarados} Leer {o:Braviary-H}" },
                { player: "{p:Arcanine-H} Rock Tomb {o:Braviary-H} to {=:0}" },
                { opponent: "{o:Braviary-H} fainted" },
              ],
            ],
          },
        ],
        frags: { "Arcanine-H": 2, Golduck: 1, Excadrill: 1, Gyarados: 1 },
      },
    ],
  },
};

const _box8 = getBox({
  box: _box7,
  update: {
    Golisopod: {
      level: 42,
    },
  },
});

const _box9 = getBox({
  box: _box8,
  update: {
    Frillish: {
      name: "Jellicent",
      spriteKey: "jellicent-f",
    },
  },
});

export const route8SuperNerdAidanBoxChange: Moment = {
  split: "Erika",
  label: "Route 8 Super Nerd Aidan Box Change",
  kind: "boxChange",
  data: { playerBox: _box9 },
};

const _box10 = getBox({
  box: _box9,
  update: {
    Incineroar: {
      nature: "Naive",
      ability: "Blaze",
      item: "Chople Berry",
      moves: ["Fake Out", "Darkest Lariat", "Flamethrower", "U-Turn"],
    },
    Jellicent: {
      nature: "Modest",
      ability: "Water Bubble",
      item: "Rindo Berry",
      moves: ["Brine", "Ominous Wind", "Recover", "Water Spout"],
    },
    Runerigus: {
      nature: "Bold",
      ability: "Shadow Shield",
      item: "Chesto Berry",
      moves: ["Disable", "Haze", "Mean Look", "Rest"],
    },
    Houndoom: {
      nature: "Modest",
      ability: "Flash Fire",
      item: "Charcoal",
      moves: ["Dark Pulse", "Flame Burst", "Leer", "Sucker Punch"],
    },
  },
  team: ["Incineroar", "Jellicent", "Runerigus", "Houndoom"],
});

export const celadonCityGymAceTrainerMaryBattle: Moment = {
  split: "Erika",
  label: "Celadon City Gym Ace Trainer Mary Battle",
  kind: "battle",
  data: {
    playerBox: _box10,
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
                  opponent: "{o:Maractus} Sucker Punch {p:Jellicent} to {+:12}",
                },
                { player: "{p:Incineroar} Flamethrower {o:Copperajah} to {-:85}" },
                { player: "{p:Jellicent} Brine {o:Copperajah} to {=:0}" },
                { opponent: "{o:Copperajah} fainted" },
                { opponent: "{p:Jellicent} grassy terrain to {+:21}" },
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
                { player: "{p:Houndoom} Flame Burst {o:Maractus}" },
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

const _box11 = getBox({
  box: _box10,
  update: {
    Charcadet: {
      name: "Ceruledge",
      moves: ["Clear Smog", "Ember", "Fire Spin", "Shadow Claw"],
    },
  },
});

export const celadonCityGymAceTrainerMaryBoxChange: Moment = {
  split: "Erika",
  label: "Celadon City Gym Ace Trainer Mary Box Change",
  kind: "boxChange",
  data: { playerBox: _box11 },
};

const _box12 = getBox({
  box: _box11,
  update: {
    Incineroar: {
      nature: "Impish",
      ability: "Intimidate",
      item: "Charti Berry",
      moves: ["Fake Out", "Darkest Lariat", "Flamethrower", "U-Turn"],
    },
    Golisopod: {
      nature: "Adamant",
      ability: "Emergency Exit",
      item: "Silver Powder",
      moves: ["First Impress.", "Aerial Ace", "Rock Tomb", "Sucker Punch"],
    },
    Runerigus: {
      nature: "Bold",
      ability: "Shadow Shield",
      item: "Chesto Berry",
      moves: ["Rest", "Scary Face", "Shadow Ball", "Shadow Sneak"],
    },
    "Arcanine-H": {
      nature: "Bold",
      ability: "Rock Head",
      item: "Charcoal",
      moves: ["Accelerock", "Flamethrower", "Helping Hand", "Stom. Tantrum"],
    },
    Cloyster: {
      nature: "Naughty",
      ability: "Shell Armor",
      item: "Never-Melt Ice",
      moves: ["Hydro Pump", "Ice Shard", "Icicle Spear", "Razor Shell"],
    },
    Ceruledge: {
      nature: "Adamant",
      ability: "Sharpness",
      item: "Spell Tag",
      moves: ["Ember", "Flamethrower", "Shadow Claw", "Will-O-Wisp"],
    },
  },
  team: ["Incineroar", "Golisopod", "Runerigus", "Arcanine-H", "Cloyster", "Ceruledge"],
});

export const celadonCityLeaderErikaBattle: Moment = {
  split: "Erika",
  label: "Celadon City Leader Erika Battle",
  kind: "battle",
  data: {
    playerBox: _box12,
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
                { player: "{p:Golisopod} First Impress. {o:Ogerpon-C} to {=:0}" },
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
                { opponent: "{o:Toxtricity} Life Orb to {=:120}" },
                { opponent: "{p:Arcanine-H} grassy terrain to {+:81}" },
                { opponent: "{o:Toxtricity} grassy terrain to {=:128}" },
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
                { player: "{p:Arcanine-H} switch to {p:Cloyster}" },
                { opponent: "{o:Sceptile-Mega} mega evolve" },
                { opponent: "{o:Sceptile-Mega} High Horsep. {p:Cloyster} to {+:82}" },
                { opponent: "{p:Cloyster} grassy terrain to {+:88}" },
              ],
              [
                { player: "{p:Cloyster} Ice Shard {o:Sceptile-Mega} to {=:0}" },
                { opponent: "{o:Sceptile-Mega} fainted" },
                { opponent: "{p:Cloyster} grassy terrain to {+:94}" },
              ],
            ],
          },
          {
            matchup: ["Kartana"],
            turns: [
              [
                { player: "{p:Cloyster} switch to {p:Incineroar}" },
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
                  "6% → Ceruledge Shadow Claw Hawlucha (to 0)",
                ],
              },
            ],
          },
        ],
        frags: { Golisopod: 1, "Arcanine-H": 1, Cloyster: 1, Ceruledge: 1 },
      },
      {
        line: "94% → Ceruledge Shadow Claw Hawlucha",
        matchups: [
          {
            matchup: ["Hawlucha"],
            turns: [
              [
                { opponent: "{o:Hawlucha} Swords Dance" },
                { player: "{p:Ceruledge} Shadow Claw {o:Hawlucha} to {-:50}" },
                { opponent: "{o:Hawlucha} burn to {-:42}" },
              ],
              [
                { player: "{p:Ceruledge} switch to {p:Runerigus}" },
                { opponent: "{o:Hawlucha} Stone Edge {p:Runerigus} to {+:102}" },
                { opponent: "{p:Runerigus} grassy terrain to {+:109}" },
                { opponent: "{o:Hawlucha} burn to {-:34}" },
              ],
              [
                { opponent: "{o:Hawlucha} Acrobatics {p:Runerigus} to {+:4}" },
                { player: "{p:Runerigus} Rest to {=:118}" },
                { opponent: "{o:Hawlucha} burn to {-:26}" },
              ],
              [
                { opponent: "{o:Hawlucha} Acrobatics {p:Runerigus} to {+:70}" },
                { player: "{p:Runerigus} Shadow Ball {o:Hawlucha} to {=:0}" },
                { opponent: "{o:Hawlucha} fainted" },
                { opponent: "{p:Runerigus} grassy terrain to {+:77}" },
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
                { player: "{p:Ceruledge} Shadow Claw {o:Slowbro-G} to {=:0}" },
                { opponent: "{o:Slowbro-G} fainted" },
              ],
            ],
          },
        ],
        frags: { Runerigus: 1, Ceruledge: 1 },
      },
      {
        line: "6% → Ceruledge Shadow Claw Hawlucha (to 0)",
        matchups: [
          {
            matchup: ["Hawlucha"],
            turns: [
              [
                { opponent: "{o:Hawlucha} Swords Dance" },
                { player: "{p:Ceruledge} Shadow Claw {o:Hawlucha} (crit) to {=:0}" },
                { opponent: "{o:Hawlucha} fainted" },
              ],
            ],
          },
          {
            matchup: ["Slowbro-G"],
            turns: [
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

export const box = _box12;

export const moments: Moment[] = [
  erikaBoxChange,
  route9PicnickerAliciaBattle,
  route9PicnickerCaitlinBattle,
  rockTunnelPicnickerDanaBattle,
  route10PokeManiacHermanBattle,
  route8SuperNerdAidanBattle,
  route8SuperNerdAidanBoxChange,
  celadonCityGymAceTrainerMaryBattle,
  celadonCityGymAceTrainerMaryBoxChange,
  celadonCityLeaderErikaBattle,
];
