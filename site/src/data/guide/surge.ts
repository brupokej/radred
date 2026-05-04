import { getBox } from "@site/src/utils/box";
import { Moment } from "@site/src/utils/moments";
import {
  rockTunnelPicnickerDanaBox,
  route10PokeManiacHermanBox,
  route25LeaderBugsyBox,
  route6CamperJeffBox,
  route8SuperNerdAidanBox,
  route9PicnickerAliciaBox,
  route9PicnickerCaitlinBox,
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
      Shellder: {
        name: "Cloyster",
      },
      Drilbur: {
        name: "Excadrill",
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
      item: "Aspear Berry",
      moves: ["Dark Pulse", "Incinerate", "Leer", "Sucker Punch"],
    },
    Cloyster: {
      nature: "Adamant",
      ability: "Skill Link",
      item: "Never-Melt Ice",
    },
    Perrserker: {
      item: "Sitrus Berry",
      moves: ["Fake Out", "Bullet Punch", "Metal Burst", "Thief"],
    },
    Excadrill: {
      nature: "Adamant",
      ability: "Sand Rush",
      item: "Soft Sand",
      moves: ["Dig", "Earthquake", "Rapid Spin", "Rock Tomb"],
    },
    Golduck: {
      item: "Sitrus Berry",
      moves: ["Disable", "Me First", "Psychic", "Zen Headbutt"],
    },
  },
  team: ["Houndoom", "Cloyster", "Perrserker", "Excadrill", "Golduck", "Clodsire"],
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
                { player: "{p:Golduck} switch to {p:Clodsire}" },
                { opponent: "{o:Boltund} Thunder Fang {p:Clodsire}" },
                { player: "{p:Excadrill} Rock Tomb {o:Boltund} to {-:68}" },
                { opponent: "{o:Perrserker} Iron Head {p:Excadrill} to {+:32}" },
              ],
              [
                { player: "{p:Clodsire} switch to {p:Cloyster}" },
                {
                  player:
                    "{p:Excadrill} Earthquake {o:Boltund} to {=:0} and {o:Perrserker} to {=:0} and {p:Cloyster} to {+:38}",
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
                { player: "{p:Cloyster} switch to {p:Golduck}" },
                { player: "{p:Excadrill} Dig {o:Granbull}" },
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
        moves: ["Flame Wheel", "Helping Hand", "Leer", "Take Down"],
      },
    },
    {
      Torracat: {
        name: "Incineroar",
      },
      "Yamask-G": {
        name: "Runerigus",
        spriteKey: undefined,
        pokedexKey: undefined,
        moves: ["Disable", "Rock Tomb", "Shadow Claw", "Shadow Sneak"],
      },
      "Growlithe-H": {
        name: "Arcanine-H",
        spriteKey: "arcanine-hisui",
        pokedexKey: "Arcanine-Hisui",
        moves: ["Accelerock", "Helping Hand", "Leer", "Take Down"],
      },
      Wimpod: {
        name: "Golisopod",
        ability: "Emergency Exit",
        moves: ["First Impression", "Struggle Bug"],
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
    Golduck: {
      nature: "Naughty",
      ability: "Neuroforce",
      item: "Mystic Water",
      moves: ["Disable", "Flip Turn", "Psychic", "Zen Headbutt"],
    },
    Excadrill: {
      nature: "Jolly",
      ability: "Mold Breaker",
      item: "Sitrus Berry",
      moves: ["Earthquake", "Rapid Spin", "Rock Slide", "Rock Tomb"],
    },
    Golisopod: {
      nature: "Adamant",
      item: "Sitrus Berry",
      moves: ["First Impression", "Razor Shell", "Rock Tomb", "Sucker Punch"],
    },
    Clodsire: {
      nature: "Lonely",
      item: "Sitrus Berry",
      moves: ["Bulldoze", "Poison Jab", "Rock Tomb", "Tail Whip"],
    },
    "Arcanine-H": {
      nature: "Adamant",
      ability: "Rock Head",
      item: "Hard Stone",
      moves: ["Accelerock", "Flare Blitz", "Rock Tomb", "Take Down"],
    },
  },
  team: ["Golduck", "Excadrill", "Golisopod", "Clodsire", "Arcanine-H"],
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
                { player: "{p:Golduck} Flip Turn {o:Kleavor} to {-:6}" },
                { player: "{p:Golduck} switch to {p:Excadrill}" },
                { opponent: "{o:Kleavor} X-Scissor {p:Excadrill} to {+:80}" },
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
                { player: "{p:Excadrill} switch to {o:Golisopod}" },
                { opponent: "{o:Lokix} Knock Off {p:Golisopod} to {+:56}" },
              ],
              [
                { player: "{p:Golisopod} First Impression {o:Lokix} to {=:0}" },
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
    Golisopod: {
      nature: "Careful",
      moves: ["First Impression", "Aerial Ace", "Rock Tomb", "Sucker Punch"],
    },
    Incineroar: {
      moves: ["Fake Out", "Double Kick", "Fire Fang", "U-Turn"],
    },
    Perrserker: {
      moves: ["Fake Out", "Bullet Punch", "Iron Head", "Thief"],
    },
    Golduck: {
      moves: ["Aqua Jet", "Flip Turn", "Low Sweep", "Zen Headbutt"],
    },
  },
  team: ["Golisopod", "Incineroar", "Perrserker", "Arcanine-H", "Golduck"],
});

export const ssAnneLassAnnGentlemanBrooksBattle: Moment = {
  split: "Surge",
  label: "S.S. Anne Lass Ann & Gentleman Brooks Battle",
  kind: "battle",
  data: {
    playerBox: _box8,
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
                { opponent: "{o:Samurott} Water Pledge {p:Incineroar} to {+:40}" },
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
                { opponent: "{o:Samurott} Water Pledge {p:Perrserker} to {+:37}" },
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
                { player: "{p:Golduck} Low Sweep {o:Samurott} to {-:53}" },
                { player: "{p:Arcanine-H} Flare Blitz {o:Samurott} to {=:0}" },
                { opponent: "{o:Samurott} fainted" },
              ],
            ],
          },
          {
            matchup: ["Simisear"],
            turns: [],
            branches: [
              {
                branches: [
                  "96% → Golduck Aqua Jet Simisear",
                  "4% → Golduck Aqua Jet Simisear (to 0)",
                ],
              },
            ],
          },
        ],
        frags: { Golisopod: 2, Perrserker: 1, "Arcanine-H": 1 },
      },
      {
        line: "96% → Golduck Aqua Jet Simisear",
        matchups: [
          {
            matchup: ["Simisear"],
            turns: [
              [
                { player: "{p:Golduck} Aqua Jet {o:Simisear} to {-:51}" },
                { player: "{p:Arcanine-H} Accelerock {o:Simisear} to {=:0}" },
                { opponent: "{o:Simisear} fainted" },
              ],
            ],
          },
        ],
        frags: { "Arcanine-H": 1 },
      },
      {
        line: "4% → Golduck Aqua Jet Simisear (to 0)",
        matchups: [
          {
            matchup: ["Simisear"],
            turns: [
              [
                { player: "{p:Golduck} Aqua Jet {o:Simisear} (crit) to {=:0}" },
                { opponent: "{o:Simisear} fainted" },
              ],
            ],
          },
        ],
        frags: { Golduck: 1 },
      },
    ],
  },
};

const _box9 = getBox({
  box: _box8,
  update: {
    Perrserker: {
      item: "Shuca Berry",
      moves: ["Fake Out", "Aerial Ace", "Iron Head", "U-Turn"],
    },
    "Arcanine-H": {
      nature: "Jolly",
    },
    Golduck: {
      nature: "Lonely",
      item: "Twisted Spoon",
    },
    Tentacruel: {
      nature: "Modest",
      item: "Poison Barb",
      moves: ["Acid Spray", "Bubble Beam", "Icy Wind", "Sludge"],
    },
  },
  team: ["Perrserker", "Arcanine-H", "Incineroar", "Golduck", "Azumarill", "Tentacruel"],
});

export const ssAnneSailorEdmundSailorTrevorBattle: Moment = {
  split: "Surge",
  label: "S.S. Anne Sailor Edmund & Sailor Trevor Battle",
  kind: "battle",
  data: {
    playerBox: _box9,
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
                { player: "{p:Perrserker} U-Turn {o:Nidoqueen} to {-:105}" },
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
                { player: "{p:Perrserker} U-Turn {o:Cradily} to {-:49}" },
                { player: "{p:Perrserker} switch to {p:Azumarill}" },
                { opponent: "{o:Cradily} Earth Power {p:Tentacruel} to {+:48}" },
              ],
              [
                { player: "{p:Tentacruel} Sludge {o:Cradily} to {-:33}" },
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

const _box10 = getBox({
  box: _box9,
  update: {
    Perrserker: {
      item: "Sitrus Berry",
      moves: ["Fake Out", "Bullet Punch", "Iron Head", "Metal Burst"],
    },
    Runerigus: {
      item: "Sitrus Berry",
      moves: ["Bulldoze", "Rock Tomb", "Shadow Claw", "Shadow Sneak"],
    },
    Drednaw: {
      nature: "Lonely",
      item: undefined,
      moves: ["Aqua Jet", "Counter", "Razor Shell", "Rock Tomb"],
    },
    Golisopod: {
      nature: "Adamant",
      moves: ["First Impression", "Razor Shell", "Rock Tomb", "Sucker Punch"],
    },
    Golduck: {
      moves: ["Aqua Tail", "Flip Turn", "Psychic", "Zen Headbutt"],
    },
    Tentacruel: {
      item: "Payapa Berry",
      moves: ["Acid Spray", "Bubble Beam", "Icy Wind", "Poison Jab"],
    },
  },
  team: ["Perrserker", "Runerigus", "Drednaw", "Golisopod", "Golduck", "Tentacruel"],
});

export const ssAnneBrendanBattle: Moment = {
  split: "Surge",
  label: "S.S. Anne Brendan Battle",
  kind: "battle",
  data: {
    playerBox: _box10,
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
                { player: "{p:Drednaw} Counter {o:Slaking} to {-:23}" },
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
                { opponent: "{o:Sceptile} Rock Slide {p:Golisopod} to {+:59}" },
              ],
              [
                { player: "{p:Golisopod} First Impression {o:Sceptile} to {=:0}" },
                { opponent: "{o:Sceptile} fainted" },
              ],
            ],
          },
          {
            matchup: ["Hariyama"],
            turns: [
              [
                { player: "{p:Golisopod} switch to {p:Golduck}" },
                { opponent: "{o:Hariyama} Fake Out {p:Golduck} to {+:62}" },
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

const _box11 = getBox({
  box: _box10,
  update: {
    "Arcanine-H": {
      nature: "Adamant",
      item: "Chesto Berry",
    },
    Houndoom: {
      nature: "Timid",
      item: "Black Glasses",
      moves: ["Dark Pulse", "Flame Burst", "Leer", "Sucker Punch"],
    },
    Golduck: {
      nature: "Jolly",
      item: "Sitrus Berry",
    },
    Drednaw: {
      nature: "Naughty",
      item: "Sitrus Berry",
    },
  },
  team: ["Arcanine-H", "Clodsire", "Houndoom", "Golduck", "Drednaw"],
});

export const route9PicnickerAliciaBattle: Moment = {
  split: "Surge",
  label: "Route 9 Picnicker Alicia Battle",
  kind: "battle",
  data: {
    playerBox: _box11,
    opponentBox: route9PicnickerAliciaBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Roserade"],
            turns: [
              [
                { opponent: "{o:Roserade} Sleep Powder {p:Arcanine-H}" },
                { player: "{p:Arcanine-H} Flare Blitz {o:Roserade} to {=:1}" },
              ],
              [
                { player: "{p:Arcanine-H} Accelerock {o:Roserade} to {=:0}" },
                { opponent: "{o:Roserade} fainted" },
              ],
            ],
          },
          {
            matchup: ["Bruxish"],
            turns: [
              [
                { player: "{p:Arcanine-H} switch to {p:Clodsire}" },
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
                { opponent: "{o:Flareon} Stom. Tantrum {p:Golduck} to {+:58}" },
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
                { opponent: "{o:Chatot} Boomburst {p:Drednaw} to {+:76}" },
              ],
              [
                { opponent: "{o:Chatot} Boomburst {p:Drednaw} to {+:1}" },
                { player: "{p:Drednaw} Rock Tomb {o:Chatot} to {-:1}" },
              ],
              [
                { player: "{p:Drednaw} Rock Tomb {o:Chatot} to {=:0}" },
                { opponent: "{o:Chatot} fainted" },
              ],
            ],
          },
        ],
        frags: { "Arcanine-H": 1, Houndoom: 1, Golduck: 1, Drednaw: 1 },
      },
    ],
  },
};

const _box12 = getBox({
  box: _box11,
  update: {
    Golduck: {
      moves: ["Aqua Jet", "Aqua Tail", "Flip Turn", "Zen Headbutt"],
    },
    Runerigus: {
      nature: "Impish",
      ability: "Shadow Shield",
      item: "Chesto Berry",
      moves: ["Disable", "Haze", "Mean Look", "Rest"],
    },
    Azumarill: {
      nature: "Impish",
    },
  },
  team: ["Golduck", "Runerigus", "Azumarill", "Houndoom"],
});

export const route9PicnickerCaitlinBattle: Moment = {
  split: "Surge",
  label: "Route 9 Picnicker Caitlin Battle",
  kind: "battle",
  data: {
    playerBox: _box12,
    opponentBox: route9PicnickerCaitlinBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Smeargle"],
            turns: [
              [
                { opponent: "{o:Smeargle} Dragon Ascent {p:Golduck} to {+:87}" },
                { player: "{p:Golduck} Aqua Tail {o:Smeargle} to {=:0}" },
                { opponent: "{o:Smeargle} fainted" },
              ],
            ],
          },
          {
            matchup: ["Spinda"],
            turns: [
              [
                { opponent: "{o:Spinda} Dragon Ascent {p:Golduck} to {+:55}" },
                { player: "{p:Golduck} Flip Turn {o:Spinda} to {-:96}" },
                { player: "{p:Golduck} switch to {p:Runerigus}" },
              ],
              [
                { opponent: "{o:Spinda} V-Create {p:Runerigus} to {+:74}" },
                { player: "{p:Runerigus} Mean Look {o:Spinda}" },
              ],
              [
                { opponent: "{o:Spinda} V-Create {p:Runerigus} to {+:25}" },
                { player: "{p:Runerigus} Disable {o:Spinda}" },
              ],
              [
                { opponent: "{o:Spinda} Struggle {p:Runerigus} to {+:10}" },
                { opponent: "{o:Spinda} recoil to {-:68}" },
                { player: "{p:Runerigus} Rest to {=:98}" },
              ],
              [
                { opponent: "{o:Spinda} Struggle {p:Runerigus} to {+:91}" },
                { opponent: "{o:Spinda} recoil to {-:40}" },
                { player: "{p:Runerigus} Haze {o:Spinda}" },
              ],
              [
                { player: "{p:Runerigus} switch to {p:Golduck}" },
                { opponent: "{o:Spinda} Struggle {p:Golduck} to {+:28}" },
                { opponent: "{o:Spinda} recoil to {-:12}" },
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
                { opponent: "{o:Sneasel-H} Dragon Ascent {p:Azumarill} to {+:68}" },
              ],
              [
                { opponent: "{o:Sneasel-H} Dragon Ascent {p:Azumarill} to {+:7}" },
                { player: "{p:Azumarill} Play Rough {o:Sneasel-H} to {=:0}" },
                { opponent: "{o:Sneasel-H} fainted" },
              ],
            ],
          },
          {
            matchup: ["Liepard"],
            turns: [
              [
                { player: "{p:Azumarill} switch to {p:Houndoom}" },
                { opponent: "{o:Liepard} Assist" },
              ],
              [
                { opponent: "{o:Liepard} Assist" },
                { player: "{p:Houndoom} Flame Burst {o:Liepard} to {-:45}" },
              ],
              [
                { opponent: "{o:Liepard} Assist" },
                { player: "{p:Houndoom} Flame Burst {o:Liepard} to {=:0}" },
                { opponent: "{o:Liepard} fainted" },
              ],
            ],
          },
        ],
        frags: { Golduck: 2, Azumarill: 1, Houndoom: 1 },
      },
    ],
  },
};

const _box13 = getBox({
  box: _box12,
  update: {
    Excadrill: {
      nature: "Adamant",
      item: "Occa Berry",
      moves: ["Earthquake", "Iron Head", "Rapid Spin", "Rock Tomb"],
    },
    Cloyster: {
      ability: "Shell Armor",
      item: "Chilan Berry",
    },
    Drednaw: {
      nature: "Hasty",
      item: "Shuca Berry",
      moves: ["Aqua Jet", "Flip Turn", "Razor Shell", "Rock Slide"],
    },
    "Arcanine-H": {
      nature: "Brave",
      item: "Charcoal",
      moves: ["Accelerock", "Flare Blitz", "Rock Slide", "Take Down"],
    },
    Golisopod: {
      nature: "Careful",
      item: "Persim Berry",
    },
    Golduck: {
      item: "Mystic Water",
    },
  },
  team: ["Excadrill", "Cloyster", "Drednaw", "Arcanine-H", "Golisopod", "Golduck"],
});

export const rockTunnelPicnickerDanaBattle: Moment = {
  split: "Surge",
  label: "Rock Tunnel Picnicker Data Battle",
  kind: "battle",
  data: {
    playerBox: _box13,
    opponentBox: rockTunnelPicnickerDanaBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Ribombee"],
            turns: [
              [
                { opponent: "{o:Ribombee} Moonblast {p:Excadrill} to {+:94}" },
                { player: "{p:Excadrill} Rock Tomb {o:Ribombee} to {-:21}" },
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
                { player: "{p:Excadrill} switch to {p:Cloyster}" },
                { opponent: "{o:Bouffalant} Earthquake {p:Cloyster} to {+:67}" },
              ],
              [
                { player: "{p:Cloyster} switch to {p:Drednaw}" },
                { opponent: "{o:Bouffalant} Rock Slide {p:Drednaw} to {+:76}" },
              ],
              [
                { player: "{p:Drednaw} Flip Turn {o:Bouffalant} to {-:95}" },
                { player: "{p:Drednaw} switch to {p:Arcanine-H}" },
                { opponent: "{o:Bouffalant} Head Charge {p:Arcanine-H} to {+:58}" },
                { opponent: "{o:Bouffalant} recoil to {-:83}" },
              ],
              [
                { player: "{p:Arcanine-H} Flare Blitz {o:Bouffalant} to {=:0}" },
                { opponent: "{o:Bouffalant} fainted" },
              ],
            ],
          },
          {
            matchup: ["Clawitzer"],
            turns: [
              [
                { player: "{p:Arcanine-H} switch to {p:Golisopod}" },
                { opponent: "{o:Clawitzer} Water Pulse {p:Golisopod} to {+:72}" },
              ],
              [
                { player: "{p:Golisopod} First Impression {o:Clawitzer} to {-:57}" },
                { opponent: "{o:Clawitzer} Dark Pulse {p:Golisopod} to {+:3}" },
                { player: "{p:Golisopod} Emergency Exit to {p:Excadrill}" },
              ],
              [
                { player: "{p:Excadrill} Earthquake {o:Clawitzer} to {=:0}" },
                { opponent: "{o:Clawitzer} fainted" },
              ],
            ],
          },
          {
            matchup: ["Magmortar"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Golduck}" },
                { opponent: "{o:Magmortar} Aura Sphere {p:Golduck} to {+:72}" },
              ],
              [
                { player: "{p:Golduck} Aqua Tail {o:Magmortar} to {=:0}" },
                { opponent: "{o:Magmortar} fainted" },
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
        ],
        frags: { Excadrill: 2, "Arcanine-H": 1, Golduck: 2 },
      },
    ],
  },
};

const _box14 = getBox({
  box: _box13,
  update: {
    Golduck: {
      nature: "Modest",
      ability: "Cloud Nine",
      item: "Sitrus Berry",
      moves: ["Aqua Tail", "Flip Turn", "Psychic", "Zen Headbutt"],
    },
    Gyarados: {
      nature: "Jolly",
      moves: ["Aqua Fang", "Bite", "Bulldoze", "Ice Fang"],
    },
  },
  team: ["Golduck", "Gyarados", "Perrserker", "Tentacruel"],
});

export const route10PokeManiacHermanBattle: Moment = {
  split: "Surge",
  label: "Route 10 Poké Maniac Herman Battle",
  kind: "battle",
  data: {
    playerBox: _box14,
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
                { player: "{p:Gyarados} Aqua Fang {o:Ninetales} to {=:0}" },
                { opponent: "{o:Ninetales} fainted" },
              ],
            ],
          },
          {
            matchup: ["Sylveon", "Cherrim"],
            turns: [
              [
                { player: "{p:Golduck} Psychic {o:Cherrim} to {-:56}" },
                { player: "{p:Gyarados} Ice Fang {o:Cherrim} to {=:0}" },
                { opponent: "{o:Cherrim} fainted" },
                {
                  opponent:
                    "{o:Sylveon} Hyper Voice {p:Golduck} to {+:39} and {p:Gyarados} to {+:68}",
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
                    "{o:Sylveon} Misty Explosion {p:Perrserker} to {+:73} and {p:Tentacruel} to {+:53}",
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

const _box15 = getBox({
  box: _box14,
  update: {
    Golduck: {
      nature: "Quiet",
      ability: "Neuroforce",
      item: "Kasib Berry",
      moves: ["Aqua Tail", "Flip Turn", "Psychic", "Scald"],
    },
    Golisopod: {
      nature: "Naughty",
      moves: ["First Impression", "Icy Wind", "Rock Tomb", "Sucker Punch"],
    },
    "Arcanine-H": {
      nature: "Impish",
      item: "Sitrus Berry",
    },
    Excadrill: {
      nature: "Jolly",
      item: "Soft Sand",
    },
    Gyarados: {
      item: "Black Glasses",
    },
  },
  team: ["Golduck", "Golisopod", "Arcanine-H", "Excadrill", "Gyarados", "Houndoom"],
});

export const route8SuperNerdAidanBattle: Moment = {
  split: "Surge",
  label: "Route 8 Super Nerd Aidan Battle",
  kind: "battle",
  data: {
    playerBox: _box15,
    opponentBox: route8SuperNerdAidanBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Tsareena", "Armarouge"],
            turns: [
              [
                { player: "{p:Golduck} switch to {p:Arcanine-H}" },
                { opponent: "{o:Tsareena} Power Whip {p:Arcanine-H} to {+:38}" },
                { opponent: "{o:Armarouge} Flamethrower {p:Golisopod} to {+:6}" },
                {
                  player:
                    "{p:Golisopod} Icy Wind {o:Tsareena} to {-:86} and {o:Armarouge} to {-:109}",
                },
                { player: "{p:Golisopod} Emergency Exit to {p:Golduck}" },
              ],
              [
                { player: "{p:Arcanine-H} Flare Blitz {o:Tsareena} to {=:0}" },
                { player: "{p:Golduck} Scald {o:Armarouge} to {=:0}" },
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
                { opponent: "{o:Arcanine-H} Head Smash {p:Excadrill} to {+:89}" },
                { player: "{p:Golduck} Flip Turn {o:Arcanine-H} to {=:1}" },
                { player: "{p:Golduck} switch to {p:Gyarados}" },
                { opponent: "{o:Basculegion-F} Shadow Ball {p:Gyarados} to {+:55}" },
              ],
              [
                {
                  player:
                    "{p:Excadrill} Earthquake {o:Arcanine-H} to {=:0} and {o:Basculegion-F} to {-:64}",
                },
                { opponent: "{o:Arcanine-H} fainted" },
                { player: "{p:Gyarados} Bite {o:Basculegion-F} to {=:0}" },
                { opponent: "{o:Basculegion-F} fainted" },
              ],
            ],
          },
          {
            matchup: ["Braviary-H"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Arcanine-H}" },
                { player: "{p:Gyarados} switch to {p:Houndoom}" },
                { opponent: "{o:Braviary-H} Heat Wave {p:Arcanine-H} to {+:11}" },
              ],
              [
                { player: "{p:Arcanine-H} Accelerock {o:Braviary-H} to {-:89}" },
                { player: "{p:Houndoom} Dark Pulse {o:Braviary-H} to {=:0}" },
                { opponent: "{o:Braviary-H} fainted" },
              ],
            ],
          },
        ],
        frags: { "Arcanine-H": 1, Golduck: 1, Excadrill: 1, Gyarados: 1, Houndoom: 1 },
      },
    ],
  },
};

const _box16 = getBox({
  box: _box15,
  update: {
    Perrserker: {
      item: "Pixie Plate",
      moves: ["Fake Out", "Bullet Punch", "Play Rough", "U-Turn"],
    },
    Drednaw: {
      nature: "Careful",
      item: "Persim Berry",
      moves: ["Aqua Jet", "Flip Turn", "Razor Shell", "Rock Tomb"],
    },
    Runerigus: {
      nature: "Bold",
      ability: "Wandering Soul",
      item: "Passho Berry",
      moves: ["Bulldoze", "Rock Tomb", "Shadow Claw", "Shadow Sneak"],
    },
    Azumarill: {
      item: "Sitrus Berry",
      moves: ["Aqua Jet", "Aqua Tail", "Helping Hand", "Play Rough"],
    },
    Lanturn: {
      ability: "Water Absorb",
      item: undefined,
    },
    Cloyster: {
      item: "Charti Berry",
    },
  },
  team: ["Perrserker", "Drednaw", "Runerigus", "Azumarill", "Lanturn", "Cloyster"],
});

export const vermillionCityGymGentlemanTuckerBattle: Moment = {
  split: "Surge",
  label: "Vermillion City Gym Gentleman Tucker Battle",
  kind: "battle",
  data: {
    playerBox: _box16,
    opponentBox: vermillionCityGymGentlemanTuckerBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Alakazam"],
            turns: [
              [
                { opponent: "{o:Alakazam} HP Fighting {p:Perrserker} to {+:53}" },
                { player: "{p:Perrserker} U-Turn {o:Alakazam} to {=:1}" },
                { player: "{p:Perrserker} switch to {p:Drednaw}" },
              ],
              [
                { player: "{p:Drednaw} Aqua Jet {o:Alakazam} to {=:0}" },
                { opponent: "{o:Alakazam} fainted" },
              ],
            ],
          },
          {
            matchup: ["Farfetch'd"],
            turns: [
              [
                { player: "{p:Drednaw} switch to {p:Runerigus}" },
                { opponent: "{o:Farfetch'd} Sacred Sword {p:Runerigus}" },
              ],
              [
                { player: "{p:Runerigus} switch to {p:Azumarill}" },
                { opponent: "{o:Farfetch'd} Night Slash {p:Azumarill} to {+:103}" },
              ],
              [
                { opponent: "{o:Farfetch'd} Brave Bird {p:Azumarill} to {+:45}" },
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
                { player: "{p:Drednaw} switch to {p:Lanturn}" },
                { opponent: "{o:Pikachu-Surfing} Zippy Zap {p:Lanturn} to {+:75}" },
              ],
              [
                { player: "{p:Lanturn} switch to {p:Runerigus}" },
                { opponent: "{o:Pikachu-Surfing} Zippy Zap {p:Runerigus}" },
              ],
              [
                { opponent: "{o:Pikachu-Surfing} Knock Off {p:Runerigus} to {+:18}" },
                { player: "{p:Runerigus} Shadow Claw {o:Pikachu-Surfing} to {-:22}" },
              ],
              [
                { player: "{p:Runerigus} Shadow Sneak {o:Pikachu-Surfing} to {=:0}" },
                { opponent: "{o:Pikachu-Surfing} fainted" },
              ],
            ],
          },
          {
            matchup: ["Dugtrio"],
            turns: [
              [
                { player: "{p:Runerigus} switch to {p:Cloyster}" },
                { opponent: "{o:Dugtrio} Earthquake {p:Cloyster} to {+:53}" },
              ],
              [
                { opponent: "{o:Dugtrio} Earthquake {p:Cloyster} to {+:13}" },
                { player: "{p:Cloyster} Razor Shell {o:Dugtrio} to {=:0}" },
                { opponent: "{o:Dugtrio} fainted" },
              ],
            ],
          },
        ],
        frags: { Drednaw: 2, Azumarill: 1, Runerigus: 1, Cloyster: 1 },
      },
    ],
  },
};

const _box17 = getBox({
  box: _box16,
  update: {
    Houndoom: {
      nature: "Modest",
      ability: "Flash Fire",
      item: "Sitrus Berry",
    },
    Runerigus: {
      item: "Rindo Berry",
    },
    Azumarill: {
      item: "Pixie Plate",
    },
    Clodsire: {
      ability: "Water Absorb",
    },
    Drednaw: {
      ability: "Shell Armor",
      item: "Chople Berry",
    },
  },
  team: ["Excadrill", "Houndoom", "Runerigus", "Azumarill", "Clodsire", "Drednaw"],
});

export const vermillionCityLeaderLtSurgeBattle: Moment = {
  split: "Surge",
  label: "Vermillion City Leader Lt. Surge Battle",
  kind: "battle",
  data: {
    playerBox: _box17,
    opponentBox: vermillionCityLeaderLtSurgeBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Rotom-F"],
            turns: [
              [
                { player: "{p:Excadrill} Earthquake {o:Rotom-F} to {=:0}" },
                { opponent: "{o:Rotom-F} fainted" },
              ],
            ],
          },
          {
            matchup: ["Electrode-H"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Houndoom}" },
                { opponent: "{o:Electrode-H} Chloroblast {p:Houndoom} to {+:58}" },
              ],
              [
                { player: "{p:Houndoom} switch to {p:Runerigus}" },
                { opponent: "{o:Electrode-H} Explosion {p:Runerigus}" },
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
            branches: [
              {
                if: ["50% → Pawmot matchup"],
                branches: ["Houndoom switch to Azumarill"],
              },
              { branches: ["Houndoom switch to Runerigus"] },
            ],
          },
        ],
        frags: { Houndoom: 1 },
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
            ],
            branches: [{ branches: ["Pawmot Ice Punch Runerigus"] }],
          },
        ],
      },
      {
        line: "Houndoom switch to Runerigus",
        matchups: [
          {
            matchup: ["Pawmot"],
            turns: [
              [
                { player: "{p:Houndoom} switch to {p:Runerigus}" },
                { opponent: "{o:Pawmot} Close Combat {p:Runerigus}" },
              ],
            ],
            branches: [{ branches: ["Pawmot Ice Punch Runerigus"] }],
          },
        ],
      },
      {
        line: "Pawmot Ice Punch Runerigus",
        matchups: [
          {
            matchup: ["Pawmot"],
            turns: [
              [
                { opponent: "{o:Pawmot} Ice Punch {p:Runerigus}" },
                { player: "{p:Runerigus} Rock Tomb {o:Pawmot} to {-:96}" },
                { opponent: "{p:Runerigus} frostbite to {+:12}" },
              ],
              [
                { player: "{p:Runerigus} switch to {p:Drednaw}" },
                { opponent: "{o:Pawmot} Ice Punch {p:Drednaw}" },
                { opponent: "{p:Drednaw} frostbite to {+:97}" },
              ],
              [
                { player: "{p:Drednaw} switch to {p:Excadrill}" },
                { opponent: "{o:Pawmot} Plasma Fists {p:Excadrill}" },
              ],
              [
                { player: "{p:Excadrill} Earthquake {o:Pawmot} to {=:0}" },
                { opponent: "{o:Pawmot} fainted" },
              ],
            ],
            branches: [
              { if: ["50% → Pawmot matchup"], branches: ["50% → Raichu matchup"] },
              { branches: ["Excadrill switch to Azumarill"] },
            ],
          },
        ],
        frags: { Excadrill: 1 },
      },
      {
        line: "Houndoom switch to Azumarill",
        matchups: [
          {
            matchup: ["Hitmonlee"],
            turns: [
              [
                { player: "{p:Houndoom} switch to {p:Azumarill}" },
                { opponent: "{o:Hitmonlee} Close Combat {p:Azumarill} to {+:68}" },
              ],
            ],
            branches: [{ branches: ["Hitmonlee Knock Off Azumarill"] }],
          },
        ],
      },
      {
        line: "Excadrill switch to Azumarill",
        matchups: [
          {
            matchup: ["Hitmonlee"],
            turns: [
              [
                { player: "{p:Excadrill} switch to {p:Azumarill}" },
                { opponent: "{o:Hitmonlee} Close Combat {p:Azumarill} to {+:68}" },
              ],
            ],
            branches: [{ branches: ["Hitmonlee Knock Off Azumarill"] }],
          },
        ],
      },
      {
        line: "Hitmonlee Knock Off Azumarill",
        matchups: [
          {
            matchup: ["Hitmonlee"],
            turns: [
              [
                { opponent: "{o:Hitmonlee} Knock Off {p:Azumarill} to {+:35}" },
                { player: "{p:Azumarill} Play Rough {o:Hitmonlee} to {-:7}" },
              ],
              [
                { player: "{p:Azumarill} Aqua Jet {o:Hitmonlee} to {=:0}" },
                { opponent: "{o:Hitmonlee} fainted" },
              ],
            ],
          },
        ],
        frags: { Azumarill: 1 },
      },
    ],
  },
};

export const box = _box17;

export const moments: Moment[] = [
  surgeBoxChange,
  route6CamperJeffBattle,
  fishing1Encounter,
  fishing2Encounter,
  fishing2BoxChange,
  route25LeaderBugsyBattle,
  ssAnneLassAnnGentlemanBrooksBattle,
  ssAnneSailorEdmundSailorTrevorBattle,
  ssAnneBrendanBattle,
  route9PicnickerAliciaBattle,
  route9PicnickerCaitlinBattle,
  rockTunnelPicnickerDanaBattle,
  route10PokeManiacHermanBattle,
  route8SuperNerdAidanBattle,
  vermillionCityGymGentlemanTuckerBattle,
  vermillionCityLeaderLtSurgeBattle,
];
