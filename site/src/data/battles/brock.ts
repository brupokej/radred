import { BattleData } from "@site/src/components/Battle";
import { BoxChangeData } from "@site/src/components/BoxChange";
import { EncounterData } from "@site/src/components/Encounter";
import { getBox } from "@site/src/utils/box";
import {
  route22RivalBox,
  viridianForestBrendanBox,
  viridianForestLassAnneBox,
  viridianForestBugCatcherSammyBox,
  pewterMuseumLeaderFalknerBox,
  pewterCityLeaderBrockBox,
} from "@site/src/utils/opponents";

// ─── Encounter pokemon ────────────────────────────────────────────────────────

const litten = {
  name: "Litten",
  ability: "Blaze",
  moves: ["Ember", "Growl", "Scratch"],
};

const tentacool = {
  name: "Tentacool",
  ability: "Clear Body",
  moves: ["Rapid Spin", "Water Gun"],
};

const wooperP = {
  name: "Wooper-P",
  spriteKey: "wooper-paldea",
  pokedexKey: "Wooper-Paldea",
  ability: "Water Absorb",
  moves: ["Mud Shot", "Tackle", "Tail Whip"],
};

const meowthG = {
  name: "Meowth-G",
  spriteKey: "meowth-galar",
  pokedexKey: "Meowth-Galar",
  ability: "Tough Claws",
  moves: ["Fake Out", "Growl"],
};

const marill = {
  name: "Marill",
  ability: "Huge Power",
  moves: ["Aqua Jet", "Tackle", "Tail Whip"],
};

const houndour = {
  name: "Houndour",
  ability: "Flash Fire",
  moves: ["Incinerate", "Leer"],
};

const kricketot = {
  name: "Kricketot",
  ability: "Technician",
  moves: ["Bide", "Growl", "Tackle"],
};

const psyduck = { name: "Psyduck", moves: ["Scratch", "Water Sport"] };

const yamaskG = {
  name: "Yamask-G",
  spriteKey: "yamask-galar",
  pokedexKey: "Yamask-Galar",
  ability: "Wandering Soul",
  moves: ["Haze", "Magnitude", "Shadow Sneak"],
};

// ─── Box chain (private) ──────────────────────────────────────────────────────

const _box1 = getBox({
  add: [litten],
  update: {
    Litten: {
      name: "Torracat",
      level: 16,
      moves: ["Fake Out", "Double Kick", "Fire Fang", "Leer"],
    },
  },
});

const _box2 = getBox({
  box: _box1,
  add: [tentacool],
  update: {
    Tentacool: {
      level: 16,
      moves: ["Acid", "Rapid Spin", "Supersonic", "Water Pulse"],
    },
  },
});

const _box3 = getBox({
  box: _box2,
  add: [wooperP, meowthG, marill, houndour, kricketot],
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

const _box4 = getBox({
  box: _box3,
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

const _box5 = getBox({
  box: _box4,
  add: [psyduck],
  update: {
    "Meowth-G": {
      level: 16,
      moves: ["Fake Out", "Growl", "Metal Claw", "Scratch"],
    },
    Marill: {
      level: 16,
      moves: ["Aqua Jet", "Body Slam", "Covet", "Tail Whip"],
    },
  },
});

const _box6 = getBox({
  box: _box5,
  update: {
    Marill: { nature: "Impish", item: "Oran Berry" },
    "Meowth-G": { nature: "Sassy" },
    Kricketune: { nature: "Naughty", item: "Oran Berry" },
  },
  team: ["Marill", "Meowth-G", "Kricketune"],
});

const _box7 = getBox({
  box: _box6,
  update: {
    Houndour: {
      level: 16,
      moves: ["Incinerate", "Leer", "Snarl", "Sucker Punch"],
    },
  },
});

const _box8 = getBox({
  box: _box7,
  update: {
    "Meowth-G": { item: "Occa Berry" },
    Houndour: { nature: "Modest", item: "Oran Berry" },
    Marill: { item: "Pixie Plate" },
  },
  team: ["Meowth-G", "Kricketune", "Houndour", "Marill", "Wooper-P"],
});

const _box9 = getBox({
  box: _box8,
  update: {
    Kricketune: { item: "Hard Stone" },
  },
  team: ["Kricketune"],
});

const _box10 = getBox({
  box: _box9,
  add: [yamaskG],
  update: {
    Kricketune: { nature: "Naive" },
    Marill: { nature: "Adamant", item: "Oran Berry" },
  },
  team: ["Kricketune", "Marill", "Meowth-G"],
});

const _box11 = getBox({
  box: _box10,
  update: {
    "Yamask-G": {
      level: 16,
      moves: ["Disable", "Haze", "Magnitude", "Shadow Sneak"],
    },
  },
});

const _box12 = getBox({
  box: _box11,
  update: {
    Kricketune: { nature: "Rash", item: "Miracle Seed" },
    "Meowth-G": { nature: "Lonely" },
    Torracat: { nature: "Adamant", item: "Black Belt" },
    Tentacool: { nature: "Bold" },
    "Yamask-G": { nature: "Careful", item: "Rindo" },
  },
  team: ["Kricketune", "Meowth-G", "Torracat", "Tentacool", "Wooper-P", "Yamask-G"],
});

// ─── Encounters ───────────────────────────────────────────────────────────────

export const littenEncounter: EncounterData = { pokemon: litten };
export const tentacoolEncounter: EncounterData = { pokemon: tentacool };
export const wooperPEncounter: EncounterData = { pokemon: wooperP };
export const meowthGEncounter: EncounterData = { pokemon: meowthG };
export const marillEncounter: EncounterData = { pokemon: marill };
export const houndourEncounter: EncounterData = { pokemon: houndour };
export const kricketotEncounter: EncounterData = { pokemon: kricketot };
export const psyduckEncounter: EncounterData = { pokemon: psyduck };
export const yamaskGEncounter: EncounterData = { pokemon: yamaskG };

// ─── Box changes ──────────────────────────────────────────────────────────────

export const oaksLabBoxChange: BoxChangeData = { playerBox: _box1 };
export const palletTownBoxChange: BoxChangeData = { playerBox: _box2 };
export const viridianForestBoxChange: BoxChangeData = { playerBox: _box3 };
export const route22BoxChange: BoxChangeData = { playerBox: _box5 };
export const expShareBoxChange: BoxChangeData = { playerBox: _box7 };
export const afterFalknerBoxChange: BoxChangeData = { playerBox: _box11 };

// ─── Battles ──────────────────────────────────────────────────────────────────

export const route22RivalBattle: BattleData = {
  opponentBox: route22RivalBox,
  playerBox: _box4,
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
              { opponent: "{o:Snubbull} non-crit Pow-Up Punch {p:Wooper-P} to {+:32}" },
              { player: "{p:Wooper-P} Tail Whip {o:Snubbull}" },
            ],
          ],
          branches: [{ branches: ["Snubbull Pow-Up Punch Kricketune"] }],
        },
      ],
    },
    {
      line: "Snubbull Pow-Up Punch Kricketune",
      matchups: [
        {
          matchup: ["Snubbull"],
          row: ["Risk →", { danger: "Snubbull double crit Pow-Up Punch Wooper-P into Snubbull Fire Fang Kricketune is {c:0.3%}" }],
          turns: [
            [
              { player: "{p:Wooper-P} switch to {p:Kricketune}" },
              { opponent: "{o:Snubbull} Pow-Up Punch {p:Kricketune} to {+:43}" },
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
              { player: "{p:Kricketune} heal to {+:53}" },
              { opponent: "{o:Squirtle} Rock Tomb {p:Kricketune} to {+:23}" },
            ],
            [
              { player: "{p:Kricketune} Mega Drain {o:Squirtle} to {=:0}" },
              { player: "{p:Kricketune} heal to {+:24}" },
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
};

export const viridianForestBrendanBattle: BattleData = {
  opponentBox: viridianForestBrendanBox,
  playerBox: _box6,
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
              { player: "{p:Marill} switch to {p:Meowth-G}" },
              { opponent: "{o:Corphish} Knock Off {p:Meowth-G} to {+:24}" },
            ],
            [
              { player: "{p:Meowth-G} Fake Out {o:Corphish} to {-:34}" },
              { opponent: "{o:Corphish} flinched" },
            ],
            [
              { player: "{p:Meowth-G} switch to {p:Kricketune}" },
              { opponent: "{o:Corphish} Aqua Jet {p:Kricketune} to {+:28}" },
            ],
            [
              { player: "{p:Kricketune} Mega Drain {o:Corphish} to {=:0}" },
              { player: "{p:Kricketune} heal to {+:41}" },
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
              { player: "{p:Kricketune} heal to {+:23}" },
              { opponent: "{o:Treecko} fainted" },
            ],
          ],
        },
      ],
      frags: { Marill: 1, Kricketune: 3 },
    },
  ],
};

export const viridianForestLassAnneBattle: BattleData = {
  opponentBox: viridianForestLassAnneBox,
  playerBox: _box8,
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
              { player: "{p:Kricketune} heal to {+:31}" },
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
            [
              { player: "{p:Marill} switch to {p:Wooper-P}" },
              { opponent: "{o:Audino} Protect or Wish" },
            ],
            [
              { opponent: "{o:Audino} Yawn {p:Wooper-P}" },
              { player: "{p:Wooper-P} Tail Whip {o:Audino}" },
            ],
            [
              { player: "{p:Wooper-P} switch to {p:Kricketune}" },
              { opponent: "{o:Audino} Protect or Wish" },
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
          ],
          branches: [{ branches: ["Clefairy Metronome Meowth-G"] }],
        },
      ],
      frags: { Marill: 1, Kricketune: 1 },
    },
    {
      line: "Clefairy Metronome Meowth-G",
      matchups: [
        {
          matchup: ["Clefairy"],
          row: ["Risk →", { danger: "Clefairy Metronome Meowth-G to {c:0} is {c:0.2%}" }],
          turns: [
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
      frags: { "Meowth-G": 1 },
    },
  ],
};

export const viridianForestBugCatcherSammyBattle: BattleData = {
  opponentBox: viridianForestBugCatcherSammyBox,
  playerBox: _box9,
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
              { opponent: "{p:Kricketune} poison to {+:52}" },
            ],
            [
              { player: "{p:Kricketune} Rock Tomb {o:Dustox} to {=:0}" },
              { opponent: "{o:Dustox} fainted" },
              { opponent: "{p:Kricketune} poison to {+:46}" },
            ],
          ],
        },
        {
          matchup: ["Volbeat"],
          turns: [
            [
              { player: "{p:Kricketune} Rock Tomb {o:Volbeat} to {-:1}" },
              { opponent: "{o:Volbeat} Flash {p:Kricketune} to {+:24}" },
              { opponent: "{p:Kricketune} poison to {+:15}" },
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
};

export const pewterMuseumLeaderFalknerBattle: BattleData = {
  opponentBox: pewterMuseumLeaderFalknerBox,
  playerBox: _box10,
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
};

export const pewterCityLeaderBrockBattle: BattleData = {
  opponentBox: pewterCityLeaderBrockBox,
  playerBox: _box12,
  lines: [
    {
      matchups: [
        {
          matchup: ["Hippopotas"],
          turns: [],
          branches: [
            { branches: ["Kricketune Mega Drain Varoom", "Kricketune Mega Drain Hippopotas"] },
          ],
        },
      ],
    },
    {
      line: "Kricketune Mega Drain Varoom",
      matchups: [
        {
          matchup: ["Hippopotas"],
          turns: [
            [
              { opponent: "{o:Hippopotas} switch to {o:Varoom}" },
              { player: "{p:Kricketune} Mega Drain {o:Varoom} to {-:40}" },
              { opponent: "{p:Kricketune} sand to {=:52}" },
            ],
          ],
          branches: [{ branches: ["Torracat Fire Fang Varoom"] }],
        },
      ],
    },
    {
      line: "Kricketune Mega Drain Hippopotas",
      matchups: [
        {
          matchup: ["Hippopotas"],
          turns: [
            [
              { player: "{p:Kricketune} Mega Drain {o:Hippopotas} to {=:0}" },
              { opponent: "{o:Hippopotas} fainted" },
              { opponent: "{p:Kricketune} sand to {=:52}" },
            ],
          ],
          branches: [{ branches: ["Torracat Fire Fang Varoom"] }],
        },
      ],
      frags: { Kricketune: 1 },
    },
    {
      line: "Torracat Fire Fang Varoom",
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
              { opponent: "{p:Kricketune} sand to {+:41}" },
            ],
            [
              { player: "{p:Kricketune} switch to {p:Torracat}" },
              { opponent: "{o:Varoom} Toxic {p:Torracat}" },
              { opponent: "{p:Torracat} sand and poison to {=:45}" },
            ],
            [
              { player: "{p:Torracat} Fake Out {o:Varoom} to {-:27}" },
              { opponent: "{p:Torracat} sand and poison to {=:36}" },
            ],
            [
              { player: "{p:Torracat} Fire Fang {o:Varoom} to {=:0}" },
              { opponent: "{p:Torracat} sand and poison to {=:24}" },
            ],
          ],
        },
        {
          matchup: ["Cacnea"],
          turns: [
            [
              { player: "{p:Torracat} switch to {p:Tentacool}" },
              { opponent: "{o:Cacnea} Pow-Up Punch {p:Tentacool} to {+:35}" },
              { opponent: "{p:Tentacool} sand to {+:33}" },
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
              { opponent: "{p:Kricketune} sand to {+:26}" },
            ],
            [
              { player: "{p:Kricketune} Bug Bite {o:Cacnea} to {=:0}" },
              { opponent: "{o:Cacnea} fainted" },
              { opponent: "{p:Kricketune} sand to {+:23}" },
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
              { opponent: "{p:Kricketune} sand to {+:8}" },
            ],
            [
              { player: "{p:Kricketune} Bug Bite {o:Lileep} to {-:10}" },
              { player: "{p:Kricketune} heal to {+:18}" },
              { opponent: "{o:Lileep} non-crit Mega Drain {p:Kricketune} to {+:10}" },
              { opponent: "{o:Lileep} heal to {-:16}" },
              { opponent: "{p:Kricketune} sand to {+:7}" },
            ],
          ],
          branches: [{ branches: ["Lileep Bug Bite"] }],
        },
      ],
      frags: { Torracat: 1, Kricketune: 1 },
    },
    {
      line: "Lileep Bug Bite",
      matchups: [
        {
          matchup: ["Lileep"],
          row: ["Risk →", { danger: "Varoom crit Bulldoze Kricketune into Cacnea crit Pow-Up Punch Kricketune into Lileep double crit Mega Drain Kricketune is {c:0.001%}" }],
          turns: [
            [
              { player: "{p:Kricketune} Bug Bite {o:Lileep} to {=:0}" },
              { opponent: "{o:Lileep} fainted" },
              { opponent: "{p:Kricketune} sand to {+:4}" },
            ],
          ],
          branches: [
            { if: ["Kricketune Mega Drain Varoom"], branches: ["Kricketune Mega Drain Hippopotas 2"] },
            { branches: ["Kricketune Bug Bite Lunatone"] },
          ],
        },
      ],
      frags: { Kricketune: 1 },
    },
    {
      line: "Kricketune Mega Drain Hippopotas 2",
      matchups: [
        {
          matchup: ["Hippopotas"],
          turns: [
            [
              { player: "{p:Kricketune} Mega Drain {o:Hippopotas} to {=:0}" },
              { player: "{p:Kricketune} heal to {+:26}" },
              { opponent: "{o:Hippopotas} fainted" },
              { opponent: "{p:Kricketune} sand to {+:23}" },
            ],
          ],
        },
        {
          matchup: ["Lunatone"],
          turns: [
            [
              { player: "{p:Kricketune} Bug Bite {o:Lunatone} to {=:0}" },
              { opponent: "{o:Lunatone} fainted" },
              { opponent: "{p:Kricketune} sand to {+:20}" },
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
              { opponent: "{p:Kricketune} sand to {+:1}" },
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
};

// ─── Chapter hand-off ─────────────────────────────────────────────────────────

export const box = _box12;
