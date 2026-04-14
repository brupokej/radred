import { BattleData } from "@site/src/components/Battle";
import { ceruleanCityRivalBox } from "@site/src/utils/opponents";

export const ceruleanCityRivalBattle: BattleData = {
  opponentBox: ceruleanCityRivalBox,
  lines: [
    {
      matchups: [
        {
          matchup: ["Hitmonlee"],
          turns: [
            [
              { opponent: "{o:Hitmonlee} Fake Out {p:Azumarill} to {+:83}" },
              { player: "{p:Azumarill} flinched" },
            ],
          ],
          branches: [{ branches: ["Azumarill Covet Wartortle", "Azumarill Covet Hitmonlee"] }],
        },
      ],
    },
    {
      line: "Azumarill Covet Wartortle",
      matchups: [
        {
          matchup: ["Hitmonlee"],
          turns: [
            [
              { opponent: "{o:Hitmonlee} switch to {o:Wartortle}" },
              { player: "{p:Azumarill} Covet {o:Wartortle} to {-:60}" },
            ],
          ],
        },
        {
          matchup: ["Wartortle"],
          turns: [
            [
              { opponent: "{o:Wartortle} Shell Smash" },
              { player: "{p:Azumarill} Aqua Tail {o:Wartortle} to {-:39}" },
            ],
          ],
          branches: [{ branches: ["Regular damage to Wartortle", "Crit damage to Wartortle"] }],
        },
      ],
    },
    {
      line: "Azumarill Covet Hitmonlee",
      matchups: [
        {
          matchup: ["Hitmonlee"],
          turns: [
            [
              { opponent: "{o:Hitmonlee} Knock Off {p:Azumarill} to {+:61}" },
              { player: "{p:Azumarill} Covet {o:Hitmonlee} to {=:0}" },
              { opponent: "{o:Hitmonlee} fainted" },
            ],
          ],
        },
        {
          matchup: ["Wartortle"],
          turns: [
            [
              { opponent: "{o:Wartortle} Shell Smash" },
              { player: "{p:Azumarill} Play Rough {o:Wartortle} to {-:36}" },
            ],
          ],
          branches: [{ branches: ["Regular damage to Wartortle", "Crit damage to Wartortle"] }],
        },
      ],
      frags: { Azumarill: 1 },
    },
    {
      line: "Regular damage to Wartortle",
      matchups: [
        {
          matchup: ["Wartortle"],
          turns: [
            [
              { player: "{p:Azumarill} switch to {p:Torracat}" },
              { opponent: "{o:Wartortle} HP Electric {p:Torracat} to {+:45}" },
            ],
            [
              { player: "{p:Torracat} Fake Out {o:Wartortle} to {-:25}" },
              { opponent: "{o:Wartortle} flinched" },
            ],
            [
              { player: "{p:Torracat} switch to {p:Clodsire}" },
              { opponent: "{o:Wartortle} Water Pulse {p:Clodsire}" },
            ],
          ],
          branches: [{ branches: ["Perrserker Bullet Punch Wartortle"] }],
        },
      ],
    },
    {
      line: "Crit damage to Wartortle",
      matchups: [
        {
          matchup: ["Wartortle"],
          turns: [
            [
              { player: "{p:Azumarill} switch to {p:Clodsire}" },
              { opponent: "{o:Wartortle} HP Electric {p:Clodsire}" },
            ],
          ],
          branches: [{ branches: ["Perrserker Bullet Punch Wartortle"] }],
        },
      ],
    },
    {
      line: "Perrserker Bullet Punch Wartortle",
      matchups: [
        {
          matchup: ["Wartortle"],
          turns: [
            [
              { player: "{p:Clodsire} switch to {p:Perrserker}" },
              { opponent: "{o:Wartortle} Icy Wind {p:Perrserker} to {+:72}" },
            ],
            [
              { player: "{p:Perrserker} Fake Out {o:Wartortle} to {-:12}" },
              { opponent: "{o:Wartortle} flinched" },
            ],
            [
              { player: "{p:Perrserker} Bullet Punch {o:Wartortle} to {=:0}" },
              { opponent: "{o:Wartortle} fainted" },
            ],
          ],
        },
        {
          matchup: ["Simisear"],
          turns: [
            [
              { player: "{p:Perrserker} switch to {p:Drednaw}" },
              { opponent: "{o:Simisear} Incinerate {p:Drednaw} to {+:84}" },
            ],
            [
              { opponent: "{o:Simisear} Incinerate {p:Drednaw} to {+:71}" },
              { player: "{p:Drednaw} Razor Shell {o:Simisear} to {=:0}" },
              { opponent: "{o:Simisear} fainted" },
            ],
          ],
        },
        {
          matchup: ["Arbok"],
          turns: [
            [
              { player: "{p:Drednaw} switch to {p:Clodsire}" },
              { opponent: "{o:Arbok} Thunder Fang {p:Clodsire}" },
            ],
            [
              { opponent: "{o:Arbok} Crunch {p:Clodsire} to {+:50}" },
              { player: "{p:Clodsire} Mud Shot {o:Arbok} to {-:62}" },
            ],
            [
              { player: "{p:Clodsire} switch to {p:Perrserker}" },
              { opponent: "{o:Arbok} Crunch {p:Perrserker} to {+:42}" },
            ],
            [
              { player: "{p:Perrserker} Fake Out {o:Arbok} to {-:45}" },
              { opponent: "{o:Arbok} flinched" },
            ],
            [
              { player: "{p:Perrserker} Bullet Punch {o:Arbok} to {=:0}" },
              { opponent: "{o:Arbok} fainted" },
            ],
          ],
          branches: [
            { if: ["Azumarill Covet Hitmonlee"], branches: ["Clefable Mystical Fire Tentacruel"] },
            { branches: ["Hitmonlee Low Sweep Azumarill", "Clefable Mystical Fire Tentacruel"] },
          ],
        },
      ],
      frags: { Perrserker: 2, Drednaw: 1 },
    },
    {
      line: "Hitmonlee Low Sweep Azumarill",
      matchups: [
        {
          matchup: ["Hitmonlee"],
          turns: [
            [
              { player: "{p:Perrserker} switch to {p:Azumarill}" },
              { opponent: "{o:Hitmonlee} Low Sweep {p:Azumarill} to {+:51}" },
            ],
            [
              { opponent: "{o:Hitmonlee} Knock Off {p:Azumarill} to {+:29}" },
              { player: "{p:Azumarill} Play Rough {o:Hitmonlee} to {=:0}" },
            ],
          ],
          branches: [
            { if: ["Clefable Mystical Fire Tentacruel"], branches: ["Perrserker Iron Head Eevee"] },
            { branches: ["Clefable Charge Beam"] },
          ],
        },
      ],
      frags: { Azumarill: 1 },
    },
    {
      line: "Clefable Charge Beam",
      matchups: [
        {
          matchup: ["Clefable"],
          turns: [
            [
              { player: "{p:Azumarill} switch to {p:Clodsire}" },
              { opponent: "{o:Clefable} Charge Beam {p:Clodsire}" },
            ],
          ],
          branches: [{ branches: ["Clefable Icy Wind Tentacruel", "Clefable switch to Eevee"] }],
        },
      ],
    },
    {
      line: "Clefable Icy Wind Tentacruel",
      matchups: [
        {
          matchup: ["Clefable"],
          turns: [
            [
              { player: "{p:Clodsire} switch to {p:Tentacruel}" },
              { opponent: "{o:Clefable} Icy Wind {p:Tentacruel} to {+:81}" },
            ],
            [
              { player: "{p:Tentacruel} Acid Spray {o:Clefable} to {-:66}" },
              { opponent: "{o:Clefable} Charge Beam {p:Tentacruel} to {+:42}" },
            ],
            [
              { player: "{p:Tentacruel} Sludge {o:Clefable} to {=:0}" },
              { opponent: "{o:Clefable} fainted" },
            ],
          ],
        },
        {
          matchup: ["Eevee"],
          turns: [
            [
              { player: "{p:Tentacruel} Acid Spray {o:Eevee} to {-:53}" },
              { opponent: "{o:Eevee} Round {p:Tentacruel} to {+:28}" },
            ],
            [
              { player: "{p:Tentacruel} Bubble Beam {o:Eevee} to {=:0}" },
              { opponent: "{o:Eevee} fainted" },
            ],
          ],
        },
      ],
      frags: { Tentacruel: 2 },
    },
    {
      line: "Clefable switch to Eevee",
      matchups: [
        {
          matchup: ["Clefable"],
          turns: [
            [
              { player: "{p:Clodsire} switch to {p:Tentacruel}" },
              { opponent: "{o:Clefable} switch to {o:Eevee}" },
            ],
          ],
        },
        {
          matchup: ["Eevee"],
          turns: [
            [
              { player: "{p:Tentacruel} Acid Spray {o:Eevee} to {-:53}" },
              { opponent: "{o:Eevee} Round {p:Tentacruel} to {+:67}" },
            ],
            [
              { player: "{p:Tentacruel} Bubble Beam {o:Eevee} to {=:0}" },
              { opponent: "{o:Eevee} fainted" },
            ],
          ],
        },
        {
          matchup: ["Clefable"],
          turns: [
            [
              { player: "{p:Tentacruel} Acid Spray {o:Clefable} to {-:66}" },
              { opponent: "{o:Clefable} Charge Beam {p:Tentacruel} to {+:28}" },
            ],
            [
              { player: "{p:Tentacruel} Sludge {o:Clefable} to {=:0}" },
              { opponent: "{o:Clefable} fainted" },
            ],
          ],
        },
      ],
      frags: { Tentacruel: 2 },
    },
    {
      line: "Clefable Mystical Fire Tentacruel",
      matchups: [
        {
          matchup: ["Clefable"],
          turns: [
            [
              { player: "{p:Perrserker} switch to {p:Tentacruel}" },
              { opponent: "{o:Clefable} Mystical Fire {p:Tentacruel} to {+:77}" },
            ],
            [
              { player: "{p:Tentacruel} Acid Spray {o:Clefable} to {-:66}" },
              { opponent: "{o:Clefable} Charge Beam {p:Tentacruel} to {+:38}" },
            ],
            [
              { player: "{p:Tentacruel} Sludge {o:Clefable} to {=:0}" },
              { opponent: "{o:Clefable} fainted" },
            ],
          ],
          branches: [
            { if: ["Azumarill Covet Hitmonlee"], branches: ["Tentacruel Acid Spray Eevee"] },
            { branches: ["Tentacruel Acid Spray Eevee", "Hitmonlee Low Sweep Azumarill"] },
          ],
        },
      ],
      frags: { Tentacruel: 1 },
    },
    {
      line: "Tentacruel Acid Spray Eevee",
      matchups: [
        {
          matchup: ["Eevee"],
          turns: [
            [
              { player: "{p:Tentacruel} Acid Spray {o:Eevee} to {-:53}" },
              { opponent: "{o:Eevee} Round {p:Tentacruel} to {+:24}" },
            ],
            [
              { player: "{p:Tentacruel} Bubble Beam {o:Eevee} to {=:0}" },
              { opponent: "{o:Eevee} fainted" },
            ],
          ],
          branches: [
            {
              ifNot: ["Azumarill Covet Hitmonlee", "Hitmonlee Low Sweep Azumarill"],
              branches: ["Hitmonlee Knock Off"],
            },
          ],
        },
      ],
      frags: { Tentacruel: 1 },
    },
    {
      line: "Hitmonlee Knock Off",
      matchups: [
        {
          matchup: ["Hitmonlee"],
          turns: [
            [
              { player: "{p:Tentacruel} switch to {p:Azumarill}" },
              { opponent: "{o:Hitmonlee} Knock Off {p:Azumarill} to {+:61}" },
            ],
            [
              { opponent: "{o:Hitmonlee} Low Sweep {p:Azumarill} to {+:29}" },
              { player: "{p:Azumarill} Play Rough {o:Hitmonlee} to {=:0}" },
            ],
          ],
        },
      ],
      frags: { Azumarill: 1 },
    },
    {
      line: "Perrserker Iron Head Eevee",
      matchups: [
        {
          matchup: ["Eevee"],
          turns: [
            [
              { player: "{p:Azumarill} switch to {p:Perrserker}" },
              { opponent: "{o:Eevee} Double Kick {p:Perrserker} to {+:6}" },
            ],
            [
              { player: "{p:Perrserker} Fake Out {o:Eevee} to {-:49}" },
              { opponent: "{o:Eevee} flinched" },
            ],
            [
              { player: "{p:Perrserker} Iron Head {o:Eevee} to {=:0}" },
              { opponent: "{o:Eevee} fainted" },
            ],
          ],
        },
      ],
      frags: { Perrserker: 1 },
    },
  ],
};
