import { getBox } from "@site/src/utils/box";
import { Moment } from "@site/src/utils/moments";
import { gameCornerGuardBox } from "@site/src/utils/opponents";

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

export const box = _box3;

export const moments: Moment[] = [
  sabrinaBoxChange,
  gameCornerGuardBattle,
  starterEgg1Encounter,
  starterEgg2Encounter,
];
