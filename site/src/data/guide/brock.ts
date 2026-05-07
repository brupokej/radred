import { getBox } from "@site/src/utils/box";
import { Moment } from "@site/src/utils/moments";
import {
  pewterCityLeaderBrockBox,
  pewterMuseumLeaderFalknerBox,
  route22RivalBox,
  viridianForestBrendanBox,
  viridianForestBugCatcherSammyBox,
  viridianForestLassAnneBox,
} from "@site/src/utils/opponents";

export const brockMoment: Moment = { split: "Brock", label: "Brock", kind: "other" };

const _litten = {
  name: "Litten",
  level: "5",
  ability: "Blaze",
  moves: ["Ember", "Growl", "Scratch"],
};

const _box1 = getBox({ add: [_litten] });

export const oaksLabEncounter: Moment = {
  split: "Brock",
  label: "Oak's Lab Encounter",
  kind: "encounter",
  data: { pokemon: _litten, playerBox: _box1 },
};

const _box2 = getBox({
  box: _box1,
  update: {
    Litten: {
      name: "Torracat",
      level: 16,
      moves: ["Fake Out", "Double Kick", "Fire Fang", "Leer"],
    },
  },
});

export const oaksLabBoxChange: Moment = {
  split: "Brock",
  label: "Oak's Lab Box Change",
  kind: "boxChange",
  data: { playerBox: _box2 },
};

const _tentacool = {
  name: "Tentacool",
  level: "2-4",
  ability: "Clear Body",
  moves: ["Rapid Spin", "Water Gun"],
};

const _box3 = getBox({ box: _box2, add: [_tentacool] });

export const palletTownEncounter: Moment = {
  split: "Brock",
  label: "Pallet Town Encounter",
  kind: "encounter",
  data: { pokemon: _tentacool, playerBox: _box3 },
};

export const _box4 = getBox({
  box: _box3,
  update: {
    Tentacool: {
      level: 16,
      moves: ["Acid", "Rapid Spin", "Supersonic", "Water Pulse"],
    },
  },
});

export const palletTownBoxChange: Moment = {
  split: "Brock",
  label: "Pallet Town Box Change",
  kind: "boxChange",
  data: { playerBox: _box4 },
};

const _wooperP = {
  name: "Wooper-P",
  spriteKey: "wooper-paldea",
  pokedexKey: "Wooper-Paldea",
  level: "4-6",
  ability: "Water Absorb",
  moves: ["Mud Shot", "Tackle", "Tail Whip"],
};

const _box5 = getBox({ box: _box4, add: [_wooperP] });

export const route21Encounter: Moment = {
  split: "Brock",
  label: "Route 21 Encounter",
  kind: "encounter",
  data: { pokemon: _wooperP, playerBox: _box5 },
};

const _meowthG = {
  name: "Meowth-G",
  spriteKey: "meowth-galar",
  pokedexKey: "Meowth-Galar",
  level: "2-4",
  ability: "Tough Claws",
  moves: ["Fake Out", "Growl"],
};

const _box6 = getBox({ box: _box5, add: [_meowthG] });

export const route1Encounter: Moment = {
  split: "Brock",
  label: "Route 1 Encounter",
  kind: "encounter",
  data: { pokemon: _meowthG, playerBox: _box6 },
};

const _marill = {
  name: "Marill",
  level: "3-4",
  ability: "Huge Power",
  moves: ["Aqua Jet", "Tackle", "Tail Whip"],
};

const _box7 = getBox({ box: _box6, add: [_marill] });

export const viridianCityEncounter: Moment = {
  split: "Brock",
  label: "Viridian City Encounter",
  kind: "encounter",
  data: { pokemon: _marill, playerBox: _box7 },
};

const _houndour = {
  name: "Houndour",
  level: "4-6",
  ability: "Flash Fire",
  moves: ["Incinerate", "Leer"],
};

const _box8 = getBox({ box: _box7, add: [_houndour] });

export const route2Encounter: Moment = {
  split: "Brock",
  label: "Route 2 Encounter",
  kind: "encounter",
  data: { pokemon: _houndour, playerBox: _box8 },
};

const _kricketot = {
  name: "Kricketot",
  level: "4-6",
  ability: "Technician",
  moves: ["Bide", "Growl", "Tackle"],
};

const _box9 = getBox({ box: _box8, add: [_kricketot] });

export const viridianForestEncounter: Moment = {
  split: "Brock",
  label: "Viridian Forest Encounter",
  kind: "encounter",
  data: { pokemon: _kricketot, playerBox: _box9 },
};

const _box10 = getBox({
  box: _box9,
  update: [
    {
      "Wooper-P": {
        level: 16,
        moves: ["Mud Shot", "Slam", "Tackle", "Tail Whip"],
      },
      Kricketot: {
        name: "Kricketune",
        level: 10,
        moves: ["Bide", "Growl", "Struggle Bug", "Tackle"],
      },
    },
    {
      Kricketune: {
        level: 16,
        moves: ["Bide", "Mega Drain", "Rock Tomb", "Struggle Bug"],
      },
    },
  ],
});

export const viridianForestBoxChange: Moment = {
  split: "Brock",
  label: "Viridian Forest Box Change",
  kind: "boxChange",
  data: { playerBox: _box10 },
};

const _box11 = getBox({
  box: _box10,
  update: {
    "Wooper-P": { nature: "Bold" },
    Kricketune: {
      nature: "Naive",
      item: "Hard Stone",
      moves: ["Bug Bite", "Mega Drain", "Rock Tomb", "Struggle Bug"],
    },
    Tentacool: { nature: "Timid" },
  },
  team: ["Wooper-P", "Kricketune", "Tentacool"],
});

export const route22RivalBattle: Moment = {
  split: "Brock",
  label: "Route 22 Rival Battle",
  kind: "battle",
  data: {
    playerBox: _box11,
    opponentBox: route22RivalBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Snubbull"],
            turns: [
              [
                { opponent: "{o:Snubbull} Pow-Up Punch {p:Wooper-P} to {+:40}" },
                { player: "{p:Wooper-P} Tail Whip {o:Snubbull}" },
              ],
              [
                { opponent: "{o:Snubbull} Pow-Up Punch {p:Wooper-P} (non-crit) to {+:32}" },
                { player: "{p:Wooper-P} Tail Whip {o:Snubbull}" },
              ],
              [
                { player: "{p:Wooper-P} switch to {p:Kricketune}" },
                { opponent: "{o:Snubbull} Pow-Up Punch {p:Kricketune} to {+:43}" },
              ],
              [
                "Risk →",
                {
                  danger:
                    "Snubbull Pow-Up Punch Wooper-P ×2 → Snubbull Fire Fang Kricketune → {c:0.3%}",
                },
              ],
              [
                { player: "{p:Kricketune} Rock Tomb {o:Snubbull} to {=:0}" },
                { opponent: "{o:Snubbull} fainted" },
              ],
            ],
          },
          {
            matchup: ["Squirtle"],
            turns: [
              [
                { player: "{p:Kricketune} Bug Bite {o:Squirtle} to {-:20}" },
                { opponent: "{p:Kricketune} Oran Berry to {+:53}" },
                { opponent: "{o:Squirtle} Rock Tomb {p:Kricketune} to {+:23}" },
              ],
              [
                { player: "{p:Kricketune} Mega Drain {o:Squirtle} to {=:0}" },
                { opponent: "{p:Kricketune} recover to {+:24}" },
                { opponent: "{o:Squirtle} fainted" },
              ],
            ],
          },
          {
            matchup: ["Litleo"],
            turns: [
              [
                { player: "{p:Kricketune} switch to {p:Tentacool}" },
                { opponent: "{o:Litleo} Incinerate {p:Tentacool} to {+:31}" },
              ],
              [
                { player: "{p:Tentacool} Water Pulse {o:Litleo} to {-:22}" },
                { opponent: "{o:Litleo} Round {p:Tentacool} to {+:7}" },
              ],
              [
                { player: "{p:Tentacool} Water Pulse {o:Litleo} to {=:0}" },
                { opponent: "{o:Litleo} fainted" },
              ],
            ],
          },
        ],
        frags: { Kricketune: 2, Tentacool: 1 },
      },
    ],
  },
};

const _psyduck = { name: "Psyduck", level: "2-4", moves: ["Scratch", "Water Sport"] };

const _box12 = getBox({ box: _box11, add: [_psyduck] });

export const route22Encounter: Moment = {
  split: "Brock",
  label: "Route 22 Encounter",
  kind: "encounter",
  data: { pokemon: _psyduck, playerBox: _box12 },
};

const _box13 = getBox({
  box: _box12,
  update: {
    Marill: {
      level: 16,
      moves: ["Aqua Jet", "Body Slam", "Covet", "Tail Whip"],
    },
  },
});

export const route22BoxChange: Moment = {
  split: "Brock",
  label: "Route 22 Box Change",
  kind: "boxChange",
  data: { playerBox: _box13 },
};

const _box14 = getBox({
  box: _box13,
  update: {
    Marill: { nature: "Impish", item: "Oran Berry" },
    Torracat: { nature: "Impish" },
    Kricketune: { nature: "Naughty", item: "Oran Berry" },
  },
  team: ["Marill", "Wooper-P", "Torracat", "Kricketune"],
});

export const viridianForestBrendanBattle: Moment = {
  split: "Brock",
  label: "Viridian Forest Brendan Battle",
  kind: "battle",
  data: {
    playerBox: _box14,
    opponentBox: viridianForestBrendanBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Meditite"],
            turns: [
              [
                { opponent: "{o:Meditite} Fake Out {p:Marill} to {+:35}" },
                { player: "{p:Marill} flinched" },
              ],
              [
                { opponent: "{o:Meditite} Rock Tomb {p:Marill} to {+:20}" },
                { player: "{p:Marill} Covet {o:Meditite} to {-:4}" },
              ],
              [
                { player: "{p:Marill} Aqua Jet {o:Meditite} to {=:0}" },
                { opponent: "{o:Meditite} fainted" },
              ],
            ],
          },
          {
            matchup: ["Corphish"],
            turns: [
              [
                { player: "{p:Marill} switch to {p:Wooper-P}" },
                { opponent: "{o:Corphish} Knock Off {p:Wooper-P} to {+:24}" },
              ],
              [
                { player: "{p:Wooper-P} switch to {p:Torracat}" },
                { opponent: "{o:Corphish} Knock Off {p:Torracat} to {+:29}" },
              ],
              [
                { player: "{p:Torracat} Fake Out {o:Corphish} to {-:34}" },
                { opponent: "{o:Corphish} flinched" },
              ],
              [
                { player: "{p:Torracat} switch to {p:Kricketune}" },
                { opponent: "{o:Corphish} Aqua Jet {p:Kricketune} to {+:28}" },
              ],
              [
                { player: "{p:Kricketune} Mega Drain {o:Corphish} to {=:0}" },
                { opponent: "{p:Kricketune} recover to {+:41}" },
                { opponent: "{o:Corphish} fainted" },
              ],
            ],
          },
          {
            matchup: ["Numel"],
            turns: [
              [
                { player: "{p:Kricketune} Rock Tomb {o:Numel} to {-:16}" },
                { opponent: "{o:Numel} Flame Charge {p:Kricketune} to {+:13}" },
              ],
              [
                { player: "{p:Kricketune} Rock Tomb {o:Numel} to {=:0}" },
                { opponent: "{o:Numel} fainted" },
              ],
            ],
          },
          {
            matchup: ["Treecko"],
            turns: [
              [
                { player: "{p:Kricketune} Bug Bite {o:Treecko} to {=:0}" },
                { opponent: "{p:Kricketune} Oran Berry to {+:23}" },
                { opponent: "{o:Treecko} fainted" },
              ],
            ],
          },
        ],
        frags: { Marill: 1, Kricketune: 3 },
      },
    ],
  },
};

const _box15 = getBox({
  box: _box14,
  update: {
    "Meowth-G": {
      level: 16,
      moves: ["Fake Out", "Growl", "Metal Claw", "Scratch"],
    },
    Houndour: {
      level: 16,
      moves: ["Incinerate", "Leer", "Snarl", "Sucker Punch"],
    },
  },
});

export const viridianForestBrendanBoxChange: Moment = {
  split: "Brock",
  label: "Viridian Forest Brendan Box Change",
  kind: "boxChange",
  data: { playerBox: _box15 },
};

const _box16 = getBox({
  box: _box15,
  update: {
    "Meowth-G": { nature: "Sassy", item: "Occa Berry" },
    Houndour: { nature: "Modest", item: "Oran Berry" },
    Marill: { item: "Pixie Plate" },
  },
  team: ["Meowth-G", "Kricketune", "Houndour", "Marill", "Wooper-P"],
});

export const viridianForestLassAnneBattle: Moment = {
  split: "Brock",
  label: "Viridian Forest Lass Anne Battle",
  kind: "battle",
  data: {
    playerBox: _box16,
    opponentBox: viridianForestLassAnneBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Stufful"],
            turns: [
              [
                { player: "{p:Meowth-G} Fake Out {o:Stufful} to {-:45}" },
                { opponent: "{o:Stufful} flinched" },
              ],
              [
                { player: "{p:Meowth-G} switch to {p:Kricketune}" },
                { opponent: "{o:Stufful} Low Sweep {p:Kricketune} to {+:43}" },
              ],
              [
                { opponent: "{o:Stufful} Aerial Ace {p:Kricketune} to {+:21}" },
                { player: "{p:Kricketune} Bug Bite {o:Stufful} to {-:37}" },
                { opponent: "{p:Kricketune} Oran Berry to {+:31}" },
              ],
              [
                { player: "{p:Kricketune} switch to {p:Houndour}" },
                { opponent: "{o:Stufful} Aerial Ace {p:Houndour} to {+:38}" },
              ],
              [
                { player: "{p:Houndour} switch to {p:Marill}" },
                { opponent: "{o:Stufful} Low Sweep {p:Marill} to {+:39}" },
              ],
              [
                { opponent: "{o:Stufful} Aerial Ace {p:Marill} to {+:20}" },
                { player: "{p:Marill} Covet {o:Stufful} to {-:16}" },
              ],
              [
                { opponent: "{o:Stufful} Aerial Ace {p:Marill} to {+:1}" },
                { player: "{p:Marill} Covet {o:Stufful} to {=:0}" },
                { opponent: "{o:Stufful} fainted" },
              ],
            ],
          },
          {
            matchup: ["Audino"],
            turns: [
              [
                { opponent: "{o:Audino} Yawn {p:Marill}" },
                { player: "{p:Marill} Tail Whip {o:Audino}" },
              ],
              [{ player: "{p:Marill} switch to {p:Wooper-P}" }, { opponent: "{o:Audino} Protect" }],
              [
                { opponent: "{o:Audino} Yawn {p:Wooper-P}" },
                { player: "{p:Wooper-P} Tail Whip {o:Audino}" },
              ],
              [
                { player: "{p:Wooper-P} switch to {p:Kricketune}" },
                { opponent: "{o:Audino} Protect" },
              ],
              [
                { player: "{p:Kricketune} Bug Bite {o:Audino} to {=:0}" },
                { opponent: "{o:Audino} fainted" },
              ],
            ],
          },
          {
            matchup: ["Clefairy"],
            turns: [
              [
                { player: "{p:Kricketune} switch to {p:Meowth-G}" },
                { opponent: "{o:Clefairy} Metronome {p:Meowth-G}" },
              ],
              ["Risk →", { danger: "Clefairy Metronome Meowth-G (to 0) → {c:0.2%}" }],
              [
                { player: "{p:Meowth-G} Fake Out {o:Clefairy} to {-:34}" },
                { opponent: "{o:Clefairy} flinched" },
              ],
              [
                { player: "{p:Meowth-G} Metal Claw {o:Clefairy} to {=:0}" },
                { opponent: "{o:Clefairy} fainted" },
              ],
            ],
          },
        ],
        frags: { Marill: 1, Kricketune: 1, "Meowth-G": 1 },
      },
    ],
  },
};

const _box17 = getBox({
  box: _box16,
  update: {
    Kricketune: { item: "Hard Stone" },
  },
  team: ["Kricketune"],
});

export const viridianForestBugCatcherSammyBattle: Moment = {
  split: "Brock",
  label: "Viridian Forest Bug Catcher Sammy Battle",
  kind: "battle",
  data: {
    opponentBox: viridianForestBugCatcherSammyBox,
    playerBox: _box17,
    lines: [
      {
        matchups: [
          {
            matchup: ["Kricketune"],
            turns: [
              [
                { player: "{p:Kricketune} Rock Tomb {o:Kricketune} to {=:0}" },
                { opponent: "{o:Kricketune} fainted" },
              ],
            ],
          },
          {
            matchup: ["Dustox"],
            turns: [
              [
                { player: "{p:Kricketune} Rock Tomb {o:Dustox} to {-:6}" },
                { opponent: "{o:Dustox} Toxic {p:Kricketune}" },
                { opponent: "{p:Kricketune} badly poison to {+:52}" },
              ],
              [
                { player: "{p:Kricketune} Rock Tomb {o:Dustox} to {=:0}" },
                { opponent: "{o:Dustox} fainted" },
                { opponent: "{p:Kricketune} badly poison to {+:46}" },
              ],
            ],
          },
          {
            matchup: ["Volbeat"],
            turns: [
              [
                { player: "{p:Kricketune} Rock Tomb {o:Volbeat} to {-:1}" },
                { opponent: "{o:Volbeat} Flash {p:Kricketune} to {+:24}" },
                { opponent: "{p:Kricketune} badly poison to {+:15}" },
              ],
              [
                { player: "{p:Kricketune} Rock Tomb {o:Volbeat} to {=:0}" },
                { opponent: "{o:Volbeat} fainted" },
              ],
            ],
          },
        ],
        frags: { Kricketune: 3 },
      },
    ],
  },
};

const _yamaskG = {
  name: "Yamask-G",
  spriteKey: "yamask-galar",
  pokedexKey: "Yamask-Galar",
  level: "7-9",
  ability: "Wandering Soul",
  moves: ["Haze", "Magnitude", "Shadow Sneak"],
};

const _box18 = getBox({ box: _box17, add: [_yamaskG] });

export const diglettCaveEncounter: Moment = {
  split: "Brock",
  label: "Diglett Cave Encounter",
  kind: "encounter",
  data: { pokemon: _yamaskG, playerBox: _box18 },
};

const _box19 = getBox({
  box: _box18,
  update: {
    Kricketune: { nature: "Naive" },
    Marill: { nature: "Adamant", item: "Oran Berry" },
  },
  team: ["Kricketune", "Marill", "Meowth-G"],
});

export const pewterMuseumLeaderFalknerBattle: Moment = {
  split: "Brock",
  label: "Pewter Museum Leader Falkner Battle",
  kind: "battle",
  data: {
    playerBox: _box19,
    opponentBox: pewterMuseumLeaderFalknerBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Trumbeak"],
            turns: [
              [
                { player: "{p:Kricketune} Rock Tomb {o:Trumbeak} to {=:0}" },
                { opponent: "{o:Trumbeak} fainted" },
              ],
            ],
          },
          {
            matchup: ["Farfetch'd-G"],
            turns: [
              [
                { player: "{p:Kricketune} Rock Tomb {o:Farfetch'd-G} to {-:31}" },
                { opponent: "{o:Farfetch'd-G} Slam {p:Kricketune} to {+:34}" },
              ],
              [
                { player: "{p:Kricketune} switch to {p:Marill}" },
                { opponent: "{o:Farfetch'd-G} Roost to {=:42}" },
              ],
              [
                { opponent: "{o:Farfetch'd-G} Slam {p:Marill} to {+:28}" },
                { player: "{p:Marill} Covet {o:Farfetch'd-G} to {-:6}" },
              ],
              [
                { player: "{p:Marill} Aqua Jet {o:Farfetch'd-G} to {=:0}" },
                { opponent: "{o:Farfetch'd-G} fainted" },
              ],
            ],
          },
          {
            matchup: ["Squawkabilly-G"],
            turns: [
              [
                { player: "{p:Marill} switch to {p:Meowth-G}" },
                { opponent: "{o:Squawkabilly-G} Aerial Ace {p:Meowth-G} to {+:24}" },
              ],
              [
                { player: "{p:Meowth-G} switch to {p:Kricketune}" },
                { opponent: "{o:Squawkabilly-G} Reversal {p:Kricketune} to {+:29}" },
              ],
              [
                { player: "{p:Kricketune} Rock Tomb {o:Squawkabilly-G} to {=:0}" },
                { opponent: "{o:Squawkabilly-G} fainted" },
              ],
            ],
          },
          {
            matchup: ["Wattrel"],
            turns: [
              [
                { player: "{p:Kricketune} Rock Tomb {o:Wattrel} to {=:0}" },
                { opponent: "{o:Wattrel} fainted" },
              ],
            ],
          },
          {
            matchup: ["Yanma"],
            turns: [
              [
                { player: "{p:Kricketune} Rock Tomb {o:Yanma} to {=:0}" },
                { opponent: "{o:Yanma} fainted" },
              ],
            ],
          },
        ],
        frags: { Kricketune: 4, Marill: 1 },
      },
    ],
  },
};

const _box20 = getBox({
  box: _box19,
  update: {
    "Yamask-G": {
      level: 16,
      moves: ["Disable", "Haze", "Magnitude", "Shadow Sneak"],
    },
  },
});

export const pewterMuseumLeaderFalknerBoxChange: Moment = {
  split: "Brock",
  label: "Pewter Museum Leader Falkner Box Change",
  kind: "boxChange",
  data: { playerBox: _box20 },
};

const _box21 = getBox({
  box: _box20,
  update: {
    Kricketune: { nature: "Rash", item: "Miracle Seed" },
    "Meowth-G": { nature: "Lonely" },
    Torracat: { nature: "Adamant", item: "Black Belt" },
    Tentacool: { nature: "Bold" },
    "Yamask-G": { nature: "Careful", item: "Rindo" },
  },
  team: ["Kricketune", "Meowth-G", "Torracat", "Tentacool", "Wooper-P", "Yamask-G"],
});

export const pewterCityLeaderBrockBattle: Moment = {
  split: "Brock",
  label: "Pewter City Leader Brock Battle",
  kind: "battle",
  data: {
    playerBox: _box21,
    opponentBox: pewterCityLeaderBrockBox,
    lines: [
      {
        matchups: [
          {
            matchup: ["Hippopotas"],
            turns: [],
            branches: [
              {
                branches: [
                  "80% → Hippopotas switch to Varoom",
                  "20% → Kricketune Mega Drain Hippopotas",
                ],
              },
            ],
          },
        ],
      },
      {
        line: "80% → Hippopotas switch to Varoom",
        matchups: [
          {
            matchup: ["Hippopotas"],
            turns: [
              [
                { opponent: "{o:Hippopotas} switch to {o:Varoom}" },
                { player: "{p:Kricketune} Mega Drain {o:Varoom} to {-:40}" },
                { opponent: "{p:Kricketune} sandstorm to {=:52}" },
              ],
            ],
            branches: [{ branches: ["Kricketune switch to Meowth-G"] }],
          },
        ],
      },
      {
        line: "20% → Kricketune Mega Drain Hippopotas",
        matchups: [
          {
            matchup: ["Hippopotas"],
            turns: [
              [
                { player: "{p:Kricketune} Mega Drain {o:Hippopotas} to {=:0}" },
                { opponent: "{o:Hippopotas} fainted" },
                { opponent: "{p:Kricketune} sandstorm to {=:52}" },
              ],
            ],
            branches: [{ branches: ["Kricketune switch to Meowth-G"] }],
          },
        ],
        frags: { Kricketune: 1 },
      },
      {
        line: "Kricketune switch to Meowth-G",
        matchups: [
          {
            matchup: ["Varoom"],
            turns: [
              [
                { player: "{p:Kricketune} switch to {p:Meowth-G}" },
                { opponent: "{o:Varoom} Toxic {p:Meowth-G}" },
              ],
              [
                { player: "{p:Meowth-G} Fake Out {o:Varoom} to {-:39}" },
                { opponent: "{o:Varoom} flinched" },
              ],
              [
                { player: "{p:Meowth-G} Metal Claw {o:Varoom} to {-:31}" },
                { opponent: "{o:Varoom} Bulldoze {p:Meowth-G} to {+:4}" },
              ],
              [
                { player: "{p:Meowth-G} switch to {p:Kricketune}" },
                { opponent: "{o:Varoom} Bulldoze {p:Kricketune} to {+:44}" },
                { opponent: "{p:Kricketune} sandstorm to {+:41}" },
              ],
              [
                { player: "{p:Kricketune} switch to {p:Torracat}" },
                { opponent: "{o:Varoom} Toxic {p:Torracat}" },
                { opponent: "{p:Torracat} sandstorm to {=:48}" },
                { opponent: "{p:Torracat} badly poison to {=:45}" },
              ],
              [
                { player: "{p:Torracat} Fake Out {o:Varoom} to {-:27}" },
                { opponent: "{p:Torracat} sandstorm to {=:42}" },
                { opponent: "{p:Torracat} badly poison to {=:36}" },
              ],
              [
                { player: "{p:Torracat} Fire Fang {o:Varoom} to {=:0}" },
                { opponent: "{p:Torracat} sandstorm to {=:33}" },
                { opponent: "{p:Torracat} badly poison to {=:24}" },
              ],
            ],
          },
          {
            matchup: ["Cacnea"],
            turns: [
              [
                { player: "{p:Torracat} switch to {p:Tentacool}" },
                { opponent: "{o:Cacnea} Pow-Up Punch {p:Tentacool} to {+:35}" },
                { opponent: "{p:Tentacool} sandstorm to {+:33}" },
              ],
              [
                { player: "{p:Tentacool} switch to {p:Wooper-P}" },
                { opponent: "{o:Cacnea} Thunder Punch {p:Wooper-P}" },
              ],
              [
                { opponent: "{o:Cacnea} Pow-Up Punch {p:Wooper-P} to {+:38}" },
                { player: "{p:Wooper-P} Mud Shot {o:Cacnea} to {-:41}" },
              ],
              [
                { player: "{p:Wooper-P} switch to {p:Kricketune}" },
                { opponent: "{o:Cacnea} Pow-Up Punch {p:Kricketune} to {+:29}" },
                { opponent: "{p:Kricketune} sandstorm to {+:26}" },
              ],
              [
                { player: "{p:Kricketune} Bug Bite {o:Cacnea} to {=:0}" },
                { opponent: "{o:Cacnea} fainted" },
                { opponent: "{p:Kricketune} sandstorm to {+:23}" },
              ],
            ],
          },
          {
            matchup: ["Lileep"],
            turns: [
              [
                { player: "{p:Kricketune} switch to {p:Yamask-G}" },
                { opponent: "{o:Lileep} HP Rock {p:Yamask-G} to {+:32}" },
              ],
              [
                { player: "{p:Yamask-G} Disable {o:Lileep}" },
                { opponent: "{o:Lileep} Mega Drain {p:Yamask-G} to {+:10}" },
              ],
              [
                { player: "{p:Yamask-G} switch to {p:Kricketune}" },
                { opponent: "{o:Lileep} Mega Drain {p:Kricketune} to {+:11}" },
                { opponent: "{p:Kricketune} sandstorm to {+:8}" },
              ],
              [
                { player: "{p:Kricketune} Bug Bite {o:Lileep} to {-:10}" },
                { opponent: "{p:Kricketune} Oran Berry to {+:18}" },
                { opponent: "{o:Lileep} Mega Drain {p:Kricketune} (non-crit) to {+:10}" },
                { opponent: "{o:Lileep} recover to {-:16}" },
                { opponent: "{p:Kricketune} sandstorm to {+:7}" },
              ],
              [
                "Risk →",
                {
                  danger:
                    "Varoom Bulldoze Kricketune → Cacnea Pow-Up Punch Kricketune → Lileep Mega Drain Kricketune ×2 (to 0) → {c:0.00001%}",
                },
              ],
              [
                { player: "{p:Kricketune} Bug Bite {o:Lileep} to {=:0}" },
                { opponent: "{o:Lileep} fainted" },
                { opponent: "{p:Kricketune} sandstorm to {+:4}" },
              ],
            ],
            branches: [
              {
                if: ["80% → Hippopotas switch to Varoom"],
                branches: ["Kricketune Mega Drain Hippopotas"],
              },
              { branches: ["Kricketune Bug Bite Lunatone"] },
            ],
          },
        ],
        frags: { Torracat: 1, Kricketune: 2 },
      },
      {
        line: "Kricketune Mega Drain Hippopotas",
        matchups: [
          {
            matchup: ["Hippopotas"],
            turns: [
              [
                { player: "{p:Kricketune} Mega Drain {o:Hippopotas} to {=:0}" },
                { opponent: "{p:Kricketune} recover to {+:26}" },
                { opponent: "{o:Hippopotas} fainted" },
                { opponent: "{p:Kricketune} sandstorm to {+:23}" },
              ],
            ],
          },
          {
            matchup: ["Lunatone"],
            turns: [
              [
                { player: "{p:Kricketune} Bug Bite {o:Lunatone} to {=:0}" },
                { opponent: "{o:Lunatone} fainted" },
                { opponent: "{p:Kricketune} sandstorm to {+:20}" },
              ],
            ],
          },
          {
            matchup: ["Archen"],
            turns: [
              [
                { player: "{p:Kricketune} Rock Tomb {o:Archen} to {=:0}" },
                { opponent: "{o:Archen} fainted" },
              ],
            ],
          },
        ],
        frags: { Kricketune: 3 },
      },
      {
        line: "Kricketune Bug Bite Lunatone",
        matchups: [
          {
            matchup: ["Lunatone"],
            turns: [
              [
                { player: "{p:Kricketune} Bug Bite {o:Lunatone} to {=:0}" },
                { opponent: "{o:Lunatone} fainted" },
                { opponent: "{p:Kricketune} sandstorm to {+:1}" },
              ],
            ],
          },
          {
            matchup: ["Archen"],
            turns: [
              [
                { player: "{p:Kricketune} Rock Tomb {o:Archen} to {=:0}" },
                { opponent: "{o:Archen} fainted" },
              ],
            ],
          },
        ],
        frags: { Kricketune: 2 },
      },
    ],
  },
};

export const box = _box21;

export const moments: Moment[] = [
  brockMoment,
  oaksLabEncounter,
  oaksLabBoxChange,
  palletTownEncounter,
  palletTownBoxChange,
  route21Encounter,
  route1Encounter,
  viridianCityEncounter,
  route2Encounter,
  viridianForestEncounter,
  viridianForestBoxChange,
  route22RivalBattle,
  route22Encounter,
  route22BoxChange,
  viridianForestBrendanBattle,
  viridianForestBrendanBoxChange,
  viridianForestLassAnneBattle,
  viridianForestBugCatcherSammyBattle,
  diglettCaveEncounter,
  pewterMuseumLeaderFalknerBattle,
  pewterMuseumLeaderFalknerBoxChange,
  pewterCityLeaderBrockBattle,
];
