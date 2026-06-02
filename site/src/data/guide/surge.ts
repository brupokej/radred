import { getBox } from "@site/src/utils/box";
import { Moment } from "@site/src/utils/moments";
import {
  route25LeaderBugsyBox,
  route6CamperJeffBox,
  ssAnneBrendanBox,
  ssAnneLassAnnGentlemanBrooksBox,
  ssAnneSailorEdmundSailorTrevorBox,
  vermillionCityGymGentlemanTuckerBox,
  vermillionCityLeaderLtSurgeBox,
} from "@site/src/utils/opponents";

import { box as _box1 } from "@site/src/data/guide/misty";

const _box2 = getBox({
  box: _box1,
  cap: 36,
  update: [
    {
      Shellder: {
        moves: ["Ice Shard", "Icicle Spear", "Leer", "Razor Shell"],
      },
    },
    {
      "Yamask-G": {
        name: "Runerigus",
        spriteKey: undefined,
        moves: ["Disable", "Rock Tomb", "Shadow Claw", "Shadow Sneak"],
      },
      Drilbur: {
        name: "Excadrill",
        moves: ["Earthquake", "Mud-Slap", "Rapid Spin", "Scratch"],
      },
      Shellder: {
        name: "Cloyster",
      },
    },
  ],
});

export const surgeBoxChange: Moment = {
  split: "Surge",
  label: "Surge Box Change",
  kind: "boxChange",
  data: { playerBox: _box2 },
};

const _box3 = getBox({
  box: _box2,
  update: {
    Houndoom: {
      nature: "Quiet",
      ability: "Flash Fire",
      item: "Aspear Berry",
      moves: ["Dark Pulse", "Incinerate", "Leer", "Sucker Punch"],
    },
    Cloyster: {
      nature: "Adamant",
      ability: "Skill Link",
      item: "Never-Melt Ice",
      moves: ["Ice Shard", "Icicle Spear", "Leer", "Razor Shell"],
    },
    Perrserker: {
      nature: "Adamant",
      ability: "Battle Armor",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Bullet Punch", "Metal Burst", "Thief"],
    },
    Excadrill: {
      nature: "Adamant",
      ability: "Sand Rush",
      item: "Soft Sand",
      moves: ["Earthquake", "Mud-Slap", "Rapid Spin", "Rock Slide"],
    },
    Golduck: {
      nature: "Rash",
      ability: "Swift Swim",
      item: "Sitrus Berry",
      moves: ["Disable", "Me First", "Psychic", "Zen Headbutt"],
    },
    Runerigus: {
      nature: "Sassy",
      ability: "Wandering Soul",
      item: "Pecha Berry",
      moves: ["Disable", "Rock Tomb", "Shadow Claw", "Shadow Sneak"],
    },
  },
  team: ["Houndoom", "Cloyster", "Perrserker", "Excadrill", "Golduck", "Runerigus"],
});

export const route6CamperJeffBattle: Moment = {
  split: "Surge",
  label: "Route 6 Camper Jeff Battle",
  kind: "battle",
  data: {
    playerBox: _box3,
    opponentBox: route6CamperJeffBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Mr. Mime-G", "Ambipom"],
            turns: [
              [
                { player: "{p:Cloyster} switch to {p:Perrserker}" },
                { opponent: "{o:Ambipom} Fake Out {p:Perrserker} to {+:106}" },
                { opponent: "{o:Mr. Mime-G} Freeze-Dry {p:Perrserker} to {+:83}" },
                {
                  player:
                    "{p:Houndoom} Incinerate {o:Mr. Mime-G} to {-:48} and {o:Ambipom} to {-:71}",
                },
                { opponent: "{o:Perrserker} frostbite to {+:76}" },
              ],
              [
                { player: "{p:Perrserker} Fake Out {o:Ambipom} to {-:52}" },
                { opponent: "{o:Mr. Mime-G} HP Fire {p:Perrserker} to {+:52}" },
                { player: "{p:Houndoom} Leer {o:Ambipom} and {o:Mr. Mime-G}" },
              ],
              [
                { player: "{p:Houndoom} Sucker Punch {o:Ambipom} to {=:0}" },
                { player: "{p:Perrserker} Bullet Punch {o:Mr. Mime-G} to {=:0}" },
                { opponent: "{o:Ambipom} fainted" },
                { opponent: "{o:Mr. Mime-G} fainted" },
                { opponent: "{p:Perrserker} frostbite to {+:45}" },
              ],
            ],
          },
          {
            matchup: ["Perrserker", "Boltund"],
            turns: [
              [
                { player: "{p:Houndoom} switch to {p:Excadrill}" },
                { player: "{p:Perrserker} switch to {p:Golduck}" },
                { opponent: "{o:Perrserker} Fake Out {p:Golduck} to {+:75}" },
                { opponent: "{o:Boltund} Fire Fang {p:Golduck} to {+:47}" },
                { opponent: "{p:Golduck} Sitrus Berry to {+:75}" },
                { opponent: "{p:Golduck} burn to {+:68}" },
              ],
              [
                { player: "{p:Golduck} switch to {p:Runerigus}" },
                { opponent: "{o:Boltund} Thunder Fang {p:Runerigus}" },
                {
                  player:
                    "{p:Excadrill} Earthquake {o:Boltund} to {=:0} and {o:Perrserker} to {=:0} and {p:Runerigus} to {+:56}",
                },
                { opponent: "{o:Boltund} fainted" },
                { opponent: "{o:Perrserker} fainted" },
              ],
            ],
          },
          {
            matchup: ["Granbull"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Golduck}" },
                { player: "{p:Runerigus} switch to {p:Cloyster}" },
                { opponent: "{o:Granbull} Brick Break {p:Golduck} to {+:15}" },
                { opponent: "{p:Golduck} burn to {+:8}" },
              ],
              [
                { player: "{p:Golduck} Psychic {o:Granbull} to {=:0}" },
                { opponent: "{o:Granbull} fainted" },
              ],
            ],
          },
        ],
        frags: { Houndoom: 1, Perrserker: 1, Excadrill: 2, Golduck: 1 },
      },
    ],
  },
};

const _wimpod = {
  name: "Wimpod",
  level: "2-4",
  ability: "Wimp Out",
  moves: ["Struggle Bug"],
};

const _box4 = getBox({ box: _box3, add: [_wimpod] });

export const fishing1Encounter: Moment = {
  split: "Surge",
  label: "Fishing 1 Encounter",
  kind: "encounter",
  data: { pokemon: _wimpod, playerBox: _box4 },
};

const _frillish = {
  name: "Frillish",
  spriteKey: "frillish-f",
  level: "27-29",
  moves: ["Bubble Beam", "Ominous Wind", "Recover", "Water Pulse"],
};

const _box5 = getBox({ box: _box4, add: [_frillish] });

export const fishing2Encounter: Moment = {
  split: "Surge",
  label: "Fishing 2 Encounter",
  kind: "encounter",
  data: { pokemon: _frillish, playerBox: _box5 },
};

const _box6 = getBox({
  box: _box5,
  cap: 36,
  update: [
    {
      "Growlithe-H": {
        moves: ["Flame Wheel", "Flamethrower", "Helping Hand", "Leer"],
      },
    },
    {
      "Growlithe-H": {
        name: "Arcanine-H",
        spriteKey: "arcanine-hisui",
        moves: ["Accelerock", "Flamethrower", "Helping Hand", "Leer"],
      },
      Wimpod: {
        name: "Golisopod",
        ability: "Emergency Exit",
        moves: ["First Impress.", "Struggle Bug"],
      },
    },
  ],
});

export const fishing2BoxChange: Moment = {
  split: "Surge",
  label: "Fishing 2 Box Change",
  kind: "boxChange",
  data: { playerBox: _box6 },
};

const _box7 = getBox({
  box: _box6,
  update: {
    Drednaw: {
      nature: "Adamant",
      ability: "Shell Armor",
      item: "Mystic Water",
      moves: ["Aqua Jet", "Flip Turn", "Razor Shell", "Rock Tomb"],
    },
    Excadrill: {
      nature: "Jolly",
      ability: "Sand Rush",
      item: "Soft Sand",
      moves: ["Earthquake", "Mud-Slap", "Rapid Spin", "Rock Slide"],
    },
    Golisopod: {
      nature: "Adamant",
      ability: "Emergency Exit",
      item: undefined,
      moves: ["First Impress.", "Razor Shell", "Rock Tomb", "Struggle Bug"],
    },
    Clodsire: {
      nature: "Careful",
      ability: "Water Absorb",
      item: "Payapa Berry",
      moves: ["Bulldoze", "Poison Jab", "Rock Tomb", "Tail Whip"],
    },
    "Arcanine-H": {
      nature: "Adamant",
      ability: "Rock Head",
      item: "Hard Stone",
      moves: ["Accelerock", "Flamethrower", "Flare Blitz", "Rock Tomb"],
    },
  },
  team: ["Drednaw", "Excadrill", "Golisopod", "Clodsire", "Arcanine-H"],
});

export const route25LeaderBugsyBattle: Moment = {
  split: "Surge",
  label: "Route 25 Leader Bugsy Battle",
  kind: "battle",
  data: {
    playerBox: _box7,
    opponentBox: route25LeaderBugsyBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Kleavor"],
            turns: [
              [
                { opponent: "{o:Kleavor} Stone Axe {p:Drednaw} to {+:54}" },
                { player: "{p:Drednaw} Flip Turn {o:Kleavor} to {-:2}" },
                { player: "{p:Drednaw} switch to {p:Excadrill}" },
                { opponent: "{p:Excadrill} Stealth Rock to {=:132}" },
              ],
              [
                { player: "{p:Excadrill} Rapid Spin {o:Kleavor} to {=:0}" },
                { opponent: "{o:Kleavor} fainted" },
              ],
            ],
          },
          {
            matchup: ["Lokix"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Golisopod}" },
                { opponent: "{o:Lokix} Knock Off {p:Golisopod} to {+:56}" },
              ],
              [
                { player: "{p:Golisopod} First Impress. {o:Lokix} to {=:0}" },
                { opponent: "{o:Lokix} fainted" },
              ],
            ],
          },
          {
            matchup: ["Araquanid"],
            turns: [
              [
                { player: "{p:Golisopod} switch to {p:Clodsire}" },
                { opponent: "{o:Araquanid} Toxic {p:Clodsire}" },
              ],
              [
                { opponent: "{o:Araquanid} Bug Bite {p:Clodsire} to {+:123}" },
                { player: "{p:Clodsire} Tail Whip {o:Araquanid}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Arcanine-H}" },
                { opponent: "{o:Araquanid} Protect" },
              ],
              [
                { player: "{p:Arcanine-H} Rock Tomb {o:Araquanid} to {=:0}" },
                { opponent: "{o:Araquanid} fainted" },
              ],
            ],
          },
          {
            matchup: ["Vikavolt"],
            turns: [
              [
                { player: "{p:Arcanine-H} Rock Tomb {o:Vikavolt} to {-:26}" },
                { opponent: "{o:Vikavolt} HP Grass {p:Arcanine-H} to {+:71}" },
              ],
              [
                { player: "{p:Arcanine-H} Rock Tomb {o:Vikavolt} to {=:0}" },
                { opponent: "{o:Vikavolt} fainted" },
              ],
            ],
          },
          {
            matchup: ["Scizor"],
            turns: [
              [
                { player: "{p:Arcanine-H} Flare Blitz {o:Scizor} to {=:0}" },
                { opponent: "{o:Scizor} fainted" },
              ],
            ],
          },
          {
            matchup: ["Scyther"],
            turns: [
              [
                { player: "{p:Arcanine-H} Accelerock {o:Scyther} to {=:0}" },
                { opponent: "{o:Scyther} fainted" },
              ],
            ],
          },
        ],
        frags: { Excadrill: 1, Golisopod: 1, "Arcanine-H": 4 },
      },
    ],
  },
};

const _box8 = getBox({
  box: _box7,
  update: {
    Torracat: {
      name: "Incineroar",
    },
  },
});

export const route25LeaderBugsyBoxChange: Moment = {
  split: "Surge",
  label: "Route 25 Leader Bugsy Box Change",
  kind: "boxChange",
  data: { playerBox: _box8 },
};

const _box9 = getBox({
  box: _box8,
  update: {
    Golisopod: {
      nature: "Careful",
      ability: "Emergency Exit",
      item: "Sitrus Berry",
      moves: ["First Impress.", "Aerial Ace", "Rock Tomb", "Sucker Punch"],
    },
    Incineroar: {
      nature: "Careful",
      ability: "Blaze",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Double Kick", "Fire Fang", "U-Turn"],
    },
    Perrserker: {
      nature: "Adamant",
      ability: "Battle Armor",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Bullet Punch", "Iron Head", "Thief"],
    },
    "Arcanine-H": {
      nature: "Adamant",
      ability: "Rock Head",
      item: "Hard Stone",
      moves: ["Accelerock", "Flamethrower", "Flare Blitz", "Rock Tomb"],
    },
    Golduck: {
      nature: "Rash",
      ability: "Swift Swim",
      item: "Sitrus Berry",
      moves: ["Aqua Jet", "Low Sweep", "Psychic", "Zen Headbutt"],
    },
  },
  team: ["Golisopod", "Incineroar", "Perrserker", "Arcanine-H", "Golduck"],
});

export const ssAnneLassAnnGentlemanBrooksBattle: Moment = {
  split: "Surge",
  label: "S.S. Anne Lass Ann & Gentleman Brooks Battle",
  kind: "battle",
  data: {
    playerBox: _box9,
    opponentBox: ssAnneLassAnnGentlemanBrooksBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Decidueye", "Samurott"],
            turns: [
              [
                { player: "{p:Incineroar} Fake Out {o:Samurott} to {-:118}" },
                { player: "{p:Golisopod} Sucker Punch {o:Decidueye} to {-:55}" },
                { opponent: "{o:Decidueye} Grass Pledge" },
                { opponent: "{o:Samurott} flinched" },
              ],
              [
                { player: "{p:Golisopod} Sucker Punch {o:Decidueye} to {=:0}" },
                { opponent: "{o:Decidueye} fainted" },
                { opponent: "{o:Samurott} Water Pledge {p:Incineroar} to {+:9}" },
                { opponent: "{p:Incineroar} Sitrus Berry to {+:40}" },
                { player: "{p:Incineroar} U-Turn {o:Samurott} to {-:106}" },
                { player: "{p:Incineroar} switch to {p:Perrserker}" },
              ],
            ],
          },
          {
            matchup: ["Simisage", "Samurott"],
            turns: [
              [
                { player: "{p:Perrserker} Fake Out {o:Samurott} to {-:98}" },
                { opponent: "{o:Simisage} Grass Pledge" },
                { player: "{p:Golisopod} Aerial Ace {o:Simisage} to {-:53}" },
                { opponent: "{o:Samurott} flinched" },
              ],
              [
                { player: "{p:Perrserker} Bullet Punch {o:Simisage} to {-:25}" },
                { player: "{p:Golisopod} Sucker Punch {o:Simisage} to {=:0}" },
                { opponent: "{o:Simisage} fainted" },
                { opponent: "{o:Samurott} Water Pledge {p:Perrserker} to {+:64}" },
              ],
            ],
          },
          {
            matchup: ["Wigglytuff", "Samurott"],
            turns: [
              [
                { player: "{p:Golisopod} Sucker Punch {o:Wigglytuff} to {-:136}" },
                { opponent: "{o:Samurott} Water Pledge {p:Perrserker} to {+:7}" },
                { opponent: "{p:Perrserker} Sitrus Berry to {+:37}" },
                { player: "{p:Perrserker} Iron Head {o:Wigglytuff} to {=:0}" },
                { opponent: "{o:Wigglytuff} fainted" },
              ],
            ],
          },
          {
            matchup: ["Samurott"],
            turns: [
              [
                { player: "{p:Golisopod} switch to {p:Arcanine-H}" },
                { player: "{p:Perrserker} switch to {p:Golduck}" },
                { opponent: "{o:Samurott} Water Pledge {p:Golduck} to {+:79}" },
              ],
              [
                { player: "{p:Golduck} Low Sweep {o:Samurott} to {-:64}" },
                { player: "{p:Arcanine-H} Flare Blitz {o:Samurott} to {=:0}" },
                { opponent: "{o:Samurott} fainted" },
              ],
            ],
          },
          {
            matchup: ["Simisear"],
            turns: [
              [
                { player: "{p:Golduck} Aqua Jet {o:Simisear} to {-:69}" },
                { player: "{p:Arcanine-H} Accelerock {o:Simisear} to {=:0}" },
                { opponent: "{o:Simisear} fainted" },
              ],
            ],
          },
        ],
        frags: { Golisopod: 2, Perrserker: 1, "Arcanine-H": 2 },
      },
    ],
  },
};

const _box10 = getBox({
  box: _box9,
  update: {
    Perrserker: {
      nature: "Careful",
      ability: "Battle Armor",
      item: "Shuca Berry",
      moves: ["Fake Out", "Aerial Ace", "Iron Head", "U-Turn"],
    },
    "Arcanine-H": {
      nature: "Jolly",
      ability: "Rock Head",
      item: "Hard Stone",
      moves: ["Accelerock", "Flamethrower", "Flare Blitz", "Rock Tomb"],
    },
    Incineroar: {
      nature: "Careful",
      ability: "Blaze",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Double Kick", "Fire Fang", "U-Turn"],
    },
    Golduck: {
      nature: "Lonely",
      ability: "Neuroforce",
      item: "Twisted Spoon",
      moves: ["Aqua Jet", "Low Sweep", "Psychic", "Zen Headbutt"],
    },
    Azumarill: {
      nature: "Adamant",
      ability: "Huge Power",
      item: "Pixie Plate",
      moves: ["Aqua Jet", "Body Slam", "Helping Hand", "Play Rough"],
    },
    Tentacruel: {
      nature: "Modest",
      ability: "Clear Body",
      item: "Poison Barb",
      moves: ["Acid Spray", "Icy Wind", "Sludge", "Supersonic"],
    },
  },
  team: ["Perrserker", "Arcanine-H", "Incineroar", "Golduck", "Azumarill", "Tentacruel"],
});

export const ssAnneSailorEdmundSailorTrevorBattle: Moment = {
  split: "Surge",
  label: "S.S. Anne Sailor Edmund & Sailor Trevor Battle",
  kind: "battle",
  data: {
    playerBox: _box10,
    opponentBox: ssAnneSailorEdmundSailorTrevorBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Cramorant", "Cradily"],
            turns: [
              [
                { player: "{p:Perrserker} Fake Out {o:Cramorant} to {-:96}" },
                { opponent: "{o:Cramorant} flinched" },
                { player: "{p:Arcanine-H} Rock Tomb {o:Cramorant} to {=:0}" },
                { opponent: "{o:Cramorant} Gulp Missile {p:Arcanine-H} to {+:94}" },
                { opponent: "{o:Cramorant} fainted" },
                { opponent: "{o:Cradily} HP Fire {p:Perrserker} to {+:71}" },
              ],
            ],
          },
          {
            matchup: ["Nidoqueen", "Cradily"],
            turns: [
              [
                { player: "{p:Arcanine-H} switch to {p:Golduck}" },
                { opponent: "{o:Nidoqueen} Earth Power {p:Golduck} to {+:33}" },
                { player: "{p:Perrserker} U-Turn {o:Nidoqueen} to {-:103}" },
                { player: "{p:Perrserker} switch to {p:Incineroar}" },
                { opponent: "{o:Cradily} HP Fire {p:Incineroar} to {+:113}" },
              ],
              [
                { player: "{p:Incineroar} Fake Out {o:Cradily} to {-:106}" },
                { player: "{p:Golduck} Zen Headbutt {o:Nidoqueen} to {=:0}" },
                { opponent: "{o:Nidoqueen} fainted" },
                { opponent: "{o:Cradily} flinched" },
              ],
            ],
          },
          {
            matchup: ["Masquerain", "Cradily"],
            turns: [
              [
                { player: "{p:Golduck} switch to {p:Arcanine-H}" },
                { opponent: "{o:Masquerain} Energy Ball {p:Arcanine-H} to {+:40}" },
                { player: "{p:Incineroar} U-Turn {o:Masquerain} to {-:92}" },
                { player: "{p:Incineroar} switch to {p:Perrserker}" },
                { opponent: "{o:Cradily} Power Gem {p:Perrserker} to {+:47}" },
              ],
              [
                { player: "{p:Perrserker} Fake Out {o:Cradily} to {-:99}" },
                { player: "{p:Arcanine-H} Rock Tomb {o:Masquerain} to {=:0}" },
                { opponent: "{o:Masquerain} fainted" },
                { opponent: "{o:Cradily} flinched" },
              ],
            ],
          },
          {
            matchup: ["Cradily"],
            turns: [
              [
                { player: "{p:Arcanine-H} switch to {p:Tentacruel}" },
                { player: "{p:Perrserker} U-Turn {o:Cradily} to {-:53}" },
                { player: "{p:Perrserker} switch to {p:Azumarill}" },
                { opponent: "{o:Cradily} Earth Power {p:Tentacruel} to {+:48}" },
              ],
              [
                { player: "{p:Tentacruel} Supersonic {o:Cradily}" },
                { player: "{p:Azumarill} Play Rough {o:Cradily} to {=:0}" },
                { opponent: "{o:Cradily} fainted" },
              ],
            ],
          },
          {
            matchup: ["Lumineon"],
            turns: [
              [
                { opponent: "{o:Lumineon} Hydro Pump {p:Tentacruel} to {+:8}" },
                { player: "{p:Tentacruel} Sludge {o:Lumineon} to {-:71}" },
                { player: "{p:Azumarill} Play Rough {o:Lumineon} to {=:0}" },
                { opponent: "{o:Lumineon} fainted" },
              ],
            ],
          },
          {
            matchup: ["Tatsugiri"],
            turns: [
              [
                { player: "{p:Tentacruel} Icy Wind {o:Tatsugiri} to {-:102}" },
                { player: "{p:Azumarill} Play Rough {o:Tatsugiri} to {=:0}" },
                { opponent: "{o:Tatsugiri} fainted" },
              ],
            ],
          },
        ],
        frags: { "Arcanine-H": 2, Golduck: 1, Azumarill: 3 },
      },
    ],
  },
};

const _box11 = getBox({
  box: _box10,
  update: {
    Perrserker: {
      nature: "Careful",
      ability: "Battle Armor",
      item: "Shuca Berry",
      moves: ["Fake Out", "Bullet Punch", "Iron Head", "Metal Burst"],
    },
    Runerigus: {
      nature: "Sassy",
      ability: "Wandering Soul",
      item: "Sitrus Berry",
      moves: ["Bulldoze", "Rock Tomb", "Shadow Claw", "Shadow Sneak"],
    },
    Drednaw: {
      nature: "Lonely",
      ability: "Shell Armor",
      item: undefined,
      moves: ["Aqua Jet", "Counter", "Razor Shell", "Rock Tomb"],
    },
    Golisopod: {
      nature: "Adamant",
      ability: "Emergency Exit",
      item: "Sitrus Berry",
      moves: ["First Impress.", "Razor Shell", "Rock Tomb", "Sucker Punch"],
    },
    Golduck: {
      nature: "Lonely",
      ability: "Neuroforce",
      item: "Twisted Spoon",
      moves: ["Aqua Tail", "Low Sweep", "Psychic", "Zen Headbutt"],
    },
    Tentacruel: {
      nature: "Modest",
      ability: "Clear Body",
      item: "Payapa Berry",
      moves: ["Acid Spray", "Icy Wind", "Poison Jab", "Supersonic"],
    },
  },
  team: ["Perrserker", "Runerigus", "Drednaw", "Golisopod", "Golduck", "Tentacruel"],
});

export const ssAnneBrendanBattle: Moment = {
  split: "Surge",
  label: "S.S. Anne Brendan Battle",
  kind: "battle",
  data: {
    playerBox: _box11,
    opponentBox: ssAnneBrendanBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Crawdaunt"],
            turns: [
              [
                { opponent: "{o:Crawdaunt} Knock Off {p:Perrserker} to {+:39}" },
                { player: "{p:Perrserker} Metal Burst {o:Crawdaunt} to {=:1}" },
              ],
              [
                { player: "{p:Perrserker} Bullet Punch {o:Crawdaunt} to {=:0}" },
                { opponent: "{o:Crawdaunt} fainted" },
              ],
            ],
          },
          {
            matchup: ["Slaking"],
            turns: [
              [
                { player: "{p:Perrserker} switch to {p:Runerigus}" },
                { opponent: "{o:Slaking} Body Slam {p:Runerigus}" },
              ],
              [
                { player: "{p:Runerigus} switch to {p:Drednaw}" },
                { opponent: "{o:Slaking} Truant" },
              ],
              [
                { opponent: "{o:Slaking} Brick Break {p:Drednaw} to {+:31}" },
                { player: "{p:Drednaw} Counter {o:Slaking} to {-:13}" },
                { opponent: "{o:Slaking} Leftovers to {-:23}" },
              ],
              [
                { opponent: "{o:Slaking} Truant" },
                { player: "{p:Drednaw} Razor Shell {o:Slaking} to {=:0}" },
                { opponent: "{o:Slaking} fainted" },
              ],
            ],
          },
          {
            matchup: ["Sceptile"],
            turns: [
              [
                { player: "{p:Drednaw} switch to {p:Golisopod}" },
                { opponent: "{o:Sceptile} Rock Slide {p:Golisopod} (non-crit) to {+:59}" },
              ],
              [
                { player: "{p:Golisopod} First Impress. {o:Sceptile} to {=:0}" },
                { opponent: "{o:Sceptile} fainted" },
              ],
            ],
          },
          {
            matchup: ["Hariyama"],
            turns: [
              [
                { player: "{p:Golisopod} switch to {p:Golduck}" },
                { opponent: "{o:Hariyama} Fake Out {p:Golduck} to {+:78}" },
                { player: "{p:Golduck} flinched" },
              ],
              [
                { player: "{p:Golduck} Psychic {o:Hariyama} to {=:0}" },
                { opponent: "{o:Hariyama} fainted" },
              ],
            ],
          },
          {
            matchup: ["Plusle"],
            turns: [
              [
                { player: "{p:Golduck} switch to {p:Runerigus}" },
                { opponent: "{o:Plusle} Volt Switch {p:Runerigus}" },
              ],
              [
                { opponent: "{o:Plusle} Surf {p:Runerigus} to {+:50}" },
                { player: "{p:Runerigus} Bulldoze {o:Plusle} to {-:4}" },
              ],
              [
                { player: "{p:Runerigus} Shadow Sneak {o:Plusle} to {=:0}" },
                { opponent: "{o:Plusle} fainted" },
              ],
            ],
          },
          {
            matchup: ["Gardevoir"],
            turns: [
              [
                { player: "{p:Runerigus} switch to {p:Tentacruel}" },
                { opponent: "{o:Gardevoir} Moonblast {p:Tentacruel} to {+:78}" },
              ],
              [
                { player: "{p:Tentacruel} Poison Jab {o:Gardevoir} to {-:50}" },
                { opponent: "{o:Gardevoir} Psychic {p:Tentacruel} to {+:9}" },
                { opponent: "{o:Gardevoir} Leftovers to {-:56}" },
              ],
              [
                { player: "{p:Tentacruel} Poison Jab {o:Gardevoir} to {=:0}" },
                { opponent: "{o:Gardevoir} fainted" },
              ],
            ],
          },
        ],
        frags: { Perrserker: 1, Drednaw: 1, Golisopod: 1, Golduck: 1, Runerigus: 1, Tentacruel: 1 },
      },
    ],
  },
};

const _box12 = getBox({
  box: _box11,
  update: {
    Incineroar: {
      nature: "Adamant",
      ability: "Blaze",
      item: "Sitrus Berry",
      moves: ["Fake Out", "Darkest Lariat", "Fire Fang", "U-Turn"],
    },
    Runerigus: {
      nature: "Relaxed",
      ability: "Wandering Soul",
      item: undefined,
      moves: ["Bulldoze", "Rock Tomb", "Shadow Claw", "Shadow Sneak"],
    },
    Azumarill: {
      nature: "Impish",
      ability: "Huge Power",
      item: "Sitrus Berry",
      moves: ["Aqua Jet", "Aqua Tail", "Helping Hand", "Play Rough"],
    },
    Drednaw: {
      nature: "Careful",
      ability: "Shell Armor",
      item: "Persim Berry",
      moves: ["Aqua Jet", "Counter", "Razor Shell", "Rock Tomb"],
    },
    Golisopod: {
      nature: "Adamant",
      ability: "Emergency Exit",
      item: "Charti Berry",
      moves: ["First Impress.", "Razor Shell", "Rock Tomb", "Sucker Punch"],
    },
  },
  team: ["Incineroar", "Runerigus", "Azumarill", "Drednaw", "Golisopod"],
});

export const vermillionCityGymGentlemanTuckerBattle: Moment = {
  split: "Surge",
  label: "Vermillion City Gym Gentleman Tucker Battle",
  kind: "battle",
  data: {
    playerBox: _box12,
    opponentBox: vermillionCityGymGentlemanTuckerBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Alakazam"],
            turns: [
              [
                { opponent: "{o:Alakazam} HP Fighting {p:Incineroar} (non-crit) to {+:73}" },
                { player: "{p:Incineroar} U-Turn {o:Alakazam} to {=:1}" },
                { player: "{p:Incineroar} switch to {p:Runerigus}" },
              ],
              [
                { player: "{p:Runerigus} Shadow Sneak {o:Alakazam} to {=:0}" },
                { opponent: "{o:Alakazam} fainted" },
              ],
            ],
          },
          {
            matchup: ["Farfetch'd"],
            turns: [
              [
                { player: "{p:Runerigus} switch to {p:Azumarill}" },
                { opponent: "{o:Farfetch'd} Night Slash {p:Azumarill} to {+:103}" },
              ],
              [
                { opponent: "{o:Farfetch'd} Brave Bird {p:Azumarill} to {+:13}" },
                { opponent: "{o:Farfetch'd} recoil to {-:94}" },
                { opponent: "{p:Azumarill} Sitrus Berry to {+:45}" },
                { player: "{p:Azumarill} Play Rough {o:Farfetch'd} to {=:0}" },
                { opponent: "{o:Farfetch'd} fainted" },
              ],
            ],
          },
          {
            matchup: ["Swanna"],
            turns: [
              [
                { player: "{p:Azumarill} switch to {p:Drednaw}" },
                { opponent: "{o:Swanna} Hurricane {p:Drednaw} to {+:83}" },
              ],
              [
                { opponent: "{o:Swanna} Hydro Pump {p:Drednaw} to {+:19}" },
                { player: "{p:Drednaw} Rock Tomb {o:Swanna} to {-:24}" },
              ],
              [
                { player: "{p:Drednaw} Rock Tomb {o:Swanna} to {=:0}" },
                { opponent: "{o:Swanna} fainted" },
              ],
            ],
          },
          {
            matchup: ["Pikachu-Surfing"],
            turns: [
              [
                { player: "{p:Drednaw} switch to {p:Runerigus}" },
                { opponent: "{o:Pikachu-Surfing} Knock Off {p:Runerigus} to {+:42}" },
              ],
              [
                { player: "{p:Runerigus} switch to {p:Golisopod}" },
                { opponent: "{o:Pikachu-Surfing} Bouncy Bubble {p:Golisopod} to {+:69}" },
              ],
              [
                { player: "{p:Golisopod} First Impression {o:Pikachu-Surfing} to {=:0}" },
                { opponent: "{o:Pikachu-Surfing} fainted" },
              ],
            ],
          },
          {
            matchup: ["Dugtrio"],
            turns: [
              [
                { opponent: "{o:Dugtrio} Aerial Ace {p:Golisopod} to {+:7}" },
                { opponent: "{o:Dugtrio} Life Orb to {=:74}" },
                { player: "{p:Golisopod} Razor Shell {o:Dugtrio} to {=:0}" },
                { opponent: "{o:Dugtrio} fainted" },
              ],
            ],
          },
        ],
        frags: { Runerigus: 1, Azumarill: 1, Drednaw: 1, Golisopod: 2 },
      },
    ],
  },
};

const _box13 = getBox({
  box: _box12,
  update: {
    Excadrill: {
      nature: "Jolly",
      ability: "Mold Breaker",
      item: "Soft Sand",
      moves: ["Earthquake", "Mud-Slap", "Rapid Spin", "Rock Slide"],
    },
    Houndoom: {
      nature: "Modest",
      ability: "Flash Fire",
      item: "Sitrus Berry",
      moves: ["Dark Pulse", "Incinerate", "Leer", "Sucker Punch"],
    },
    Runerigus: {
      nature: "Bold",
      ability: "Wandering Soul",
      item: undefined,
      moves: ["Bulldoze", "Rock Tomb", "Shadow Claw", "Shadow Sneak"],
    },
    Azumarill: {
      nature: "Impish",
      ability: "Huge Power",
      item: "Sitrus Berry",
      moves: ["Aqua Jet", "Aqua Tail", "Helping Hand", "Play Rough"],
    },
    Clodsire: {
      nature: "Careful",
      ability: "Water Absorb",
      item: undefined,
      moves: ["Bulldoze", "Poison Jab", "Rock Tomb", "Tail Whip"],
    },
    Golduck: {
      nature: "Modest",
      ability: "Neuroforce",
      item: "Colbur Berry",
      moves: ["Aqua Tail", "Low Sweep", "Psychic", "Zen Headbutt"],
    },
  },
  team: ["Excadrill", "Houndoom", "Runerigus", "Azumarill", "Clodsire", "Golduck"],
});

export const vermillionCityLeaderLtSurgeBattle: Moment = {
  split: "Surge",
  label: "Vermillion City Leader Lt. Surge Battle",
  kind: "battle",
  data: {
    playerBox: _box13,
    opponentBox: vermillionCityLeaderLtSurgeBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Rotom-Frost"],
            turns: [
              [
                { player: "{p:Excadrill} Earthquake {o:Rotom-Frost} to {=:0}" },
                { opponent: "{o:Rotom-Frost} fainted" },
              ],
            ],
          },
          {
            matchup: ["Electrode-H"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Houndoom}" },
                { opponent: "{o:Electrode-H} Chloroblast {p:Houndoom} (non-crit) to {+:58}" },
                { opponent: "{o:Electrode-H} recoil to {-:86}" },
                { opponent: "{o:Electrode-H} Life Orb to {-:76}" },
              ],
              [
                { player: "{p:Houndoom} switch to {p:Runerigus}" },
                { opponent: "{o:Electrode-H} Explosion {p:Runerigus}" },
                { opponent: "{o:Electrode-H} fainted" },
              ],
            ],
          },
          {
            matchup: ["Ampharos-Mega"],
            turns: [
              [
                { player: "{p:Runerigus} switch to {p:Azumarill}" },
                { opponent: "{o:Ampharos-Mega} mega evolve" },
                { opponent: "{o:Ampharos-Mega} Dragon Pulse {p:Azumarill}" },
              ],
              [
                { player: "{p:Azumarill} switch to {p:Excadrill}" },
                { opponent: "{o:Ampharos-Mega} Volt Switch {p:Excadrill}" },
              ],
              [
                { player: "{p:Excadrill} Earthquake {o:Ampharos-Mega} to {=:0}" },
                { opponent: "{o:Ampharos-Mega} fainted" },
              ],
            ],
            branches: [{ branches: ["50% → Raichu matchup", "50% → Pawmot matchup"] }],
          },
        ],
        frags: { Excadrill: 2, Runerigus: 1 },
      },
      {
        line: "50% → Raichu matchup",
        matchups: [
          {
            matchup: ["Raichu-A"],
            turns: [
              [
                { opponent: "{o:Raichu-A} Nasty Plot" },
                { player: "{p:Excadrill} Earthquake {o:Raichu-A} to {=:1}" },
              ],
              [
                { player: "{p:Excadrill} switch to {p:Clodsire}" },
                { opponent: "{o:Raichu-A} Surf {p:Clodsire}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Houndoom}" },
                { opponent: "{o:Raichu-A} Psyshock {p:Houndoom}" },
              ],
              [
                { player: "{p:Houndoom} Sucker Punch {o:Raichu-A} to {=:0}" },
                { opponent: "{o:Raichu-A} fainted" },
              ],
            ],
          },
          {
            matchup: ["Pawmot"],
            turns: [
              [
                { player: "{p:Houndoom} switch to {p:Runerigus}" },
                { opponent: "{o:Pawmot} Close Combat {p:Runerigus}" },
              ],
              [
                { opponent: "{o:Pawmot} Ice Punch {p:Runerigus} to {+:18}" },
                { player: "{p:Runerigus} Rock Tomb {o:Pawmot} to {-:96}" },
                { opponent: "{p:Runerigus} frostbite to {+:12}" },
              ],
              [
                { player: "{p:Runerigus} switch to {p:Azumarill}" },
                { opponent: "{o:Pawmot} Ice Punch {p:Azumarill} to {+:104}" },
                { opponent: "{p:Azumarill} frostbite to {+:96}" },
              ],
              [
                { player: "{p:Azumarill} switch to {p:Excadrill}" },
                { opponent: "{o:Pawmot} Plasma Fists {p:Excadrill}" },
              ],
              [
                { player: "{p:Excadrill} Earthquake {o:Pawmot} to {=:0}" },
                { opponent: "{o:Pawmot} fainted" },
              ],
            ],
          },
          {
            matchup: ["Hitmonlee"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Clodsire}" },
                { opponent: "{o:Hitmonlee} Close Combat {p:Clodsire} to {+:67}" },
              ],
            ],
            branches: [{ branches: ["Clodsire switch to Golduck"] }],
          },
        ],
        frags: { Houndoom: 1, Excadrill: 1 },
      },
      {
        line: "50% → Pawmot matchup",
        matchups: [
          {
            matchup: ["Pawmot"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Runerigus}" },
                { opponent: "{o:Pawmot} Close Combat {p:Runerigus}" },
              ],
              [
                { opponent: "{o:Pawmot} Ice Punch {p:Runerigus} to {+:18}" },
                { player: "{p:Runerigus} Rock Tomb {o:Pawmot} to {-:96}" },
                { opponent: "{p:Runerigus} frostbite to {+:12}" },
              ],
              [
                { player: "{p:Runerigus} switch to {p:Azumarill}" },
                { opponent: "{o:Pawmot} Ice Punch {p:Azumarill} to {+:104}" },
                { opponent: "{p:Azumarill} frostbite to {+:96}" },
              ],
              [
                { player: "{p:Azumarill} switch to {p:Excadrill}" },
                { opponent: "{o:Pawmot} Plasma Fists {p:Excadrill}" },
              ],
              [
                { player: "{p:Excadrill} Earthquake {o:Pawmot} to {=:0}" },
                { opponent: "{o:Pawmot} fainted" },
              ],
            ],
          },
          {
            matchup: ["Raichu-A"],
            turns: [
              [
                { opponent: "{o:Raichu-A} Nasty Plot" },
                { player: "{p:Excadrill} Earthquake {o:Raichu-A} to {=:1}" },
              ],
              [
                { player: "{p:Excadrill} switch to {p:Clodsire}" },
                { opponent: "{o:Raichu-A} Surf {p:Clodsire}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Houndoom}" },
                { opponent: "{o:Raichu-A} Psyshock {p:Houndoom}" },
              ],
              [
                { player: "{p:Houndoom} Sucker Punch {o:Raichu-A} to {=:0}" },
                { opponent: "{o:Raichu-A} fainted" },
              ],
            ],
          },
          {
            matchup: ["Hitmonlee"],
            turns: [
              [
                { player: "{p:Houndoom} switch to {p:Clodsire}" },
                { opponent: "{o:Hitmonlee} Close Combat {p:Clodsire} to {+:67}" },
              ],
            ],
            branches: [{ branches: ["Clodsire switch to Golduck"] }],
          },
        ],
        frags: { Excadrill: 1, Houndoom: 1 },
      },
      {
        line: "Clodsire switch to Golduck",
        matchups: [
          {
            matchup: ["Hitmonlee"],
            turns: [
              [
                { player: "{p:Clodsire} switch to {p:Golduck}" },
                { opponent: "{o:Hitmonlee} Bulk Up" },
              ],
              [
                { opponent: "{o:Hitmonlee} Knock Off {p:Golduck} to {+:3}" },
                { player: "{p:Golduck} Psychic {o:Hitmonlee} to {=:0}" },
                { opponent: "{o:Hitmonlee} fainted" },
              ],
            ],
          },
        ],
        frags: { Golduck: 1 },
      },
    ],
  },
};

export const box = _box13;

export const moments: Moment[] = [
  surgeBoxChange,
  route6CamperJeffBattle,
  fishing1Encounter,
  fishing2Encounter,
  fishing2BoxChange,
  route25LeaderBugsyBattle,
  route25LeaderBugsyBoxChange,
  ssAnneLassAnnGentlemanBrooksBattle,
  ssAnneSailorEdmundSailorTrevorBattle,
  ssAnneBrendanBattle,
  vermillionCityGymGentlemanTuckerBattle,
  vermillionCityLeaderLtSurgeBattle,
];
