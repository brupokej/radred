export const locations: string[] = [
  "S.S. Anne",
  "Vermillion City",
  "Route 11",
  "Route 23",
  "Pewter City",
  "Route 3",
  "Underground Path",
  "Route 9",
  "Route 10",
  "Rock Tunnel",
  "Lavender Town",
  "Route 12",
  "Route 8",
  "Route 7",
  "Saffron City",
  "Route 16",
  "Dept. Store",
  "Pokemon Tower",
  "Rocket Hideout",
  "Silph Co.",
  "Route 14",
  "Route 15",
  "Route 17",
  "Route 19",
  "Fuschia City",
];

export const grass: string[] = [
  "Bulbasaur",
  "Chikorita",
  "Treecko",
  "Turtwig",
  "Snivy",
  "Chespin",
  "Rowlet",
  "Grookey",
  "Sprigatito",
];

export const fire: string[] = [
  "Charmander",
  "Cyndaquil",
  "Torchic",
  "Chimchar",
  "Tepig",
  "Fennekin",
  "Scorbunny",
  "Fuecoco",
];

export const water: string[] = [
  "Squirtle",
  "Totodile",
  "Mudkip",
  "Piplup",
  "Oshawott",
  "Froakie",
  "Popplio",
  "Sobble",
  "Quaxly",
];

export type EncounterSequenceConfig = {
  sequenceId: string;
  poolName: string;
  optionPool: string[];
  priority: number;
  locationWindow: string[];
  method: "Fish" | "Hatch";
};

type EncounterOrderEntry = {
  name: string;
  poolName: string;
  optionPool: string[];
  locationWindow: string[];
  method: "Fish" | "Hatch";
};

export const encounterOrder: EncounterOrderEntry[] = [
  {
    name: "Wimpod",
    poolName: "wimpod",
    optionPool: ["Wimpod", "Finneon"],
    locationWindow: locations.slice(0, 2),
    method: "Fish",
  },
  {
    name: "Frillish",
    poolName: "frillish",
    optionPool: ["Frillish", "Staryu"],
    locationWindow: locations.slice(1, 3),
    method: "Fish",
  },
  {
    name: "Sprigatito",
    poolName: "grass",
    optionPool: grass,
    locationWindow: locations.slice(2),
    method: "Hatch",
  },
  {
    name: "Mudkip",
    poolName: "water",
    optionPool: water,
    locationWindow: locations.slice(3),
    method: "Hatch",
  },
  {
    name: "Froakie",
    poolName: "water",
    optionPool: water,
    locationWindow: locations.slice(4),
    method: "Hatch",
  },
  {
    name: "Chimchar",
    poolName: "fire",
    optionPool: fire,
    locationWindow: locations.slice(5),
    method: "Hatch",
  },
  {
    name: "Treecko",
    poolName: "grass",
    optionPool: grass,
    locationWindow: locations.slice(6),
    method: "Hatch",
  },
];

const poolCounters: Record<string, number> = {};

export const encounterSequences: Record<string, EncounterSequenceConfig> = Object.fromEntries(
  encounterOrder.map((entry, priority) => {
    poolCounters[entry.poolName] = (poolCounters[entry.poolName] ?? 0) + 1;
    const sequenceId = `${entry.poolName}-${poolCounters[entry.poolName]}`;
    const { poolName, optionPool, locationWindow, method } = entry;
    return [entry.name, { sequenceId, priority, poolName, optionPool, locationWindow, method }];
  })
);
