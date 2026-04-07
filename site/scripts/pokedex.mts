import { mkdirSync, writeFileSync } from "fs";
import type { PokedexData } from "../src/utils/pokedex";

const DATA_URL =
  "https://raw.githubusercontent.com/JwowSquared/Radical-Red-Pokedex/master/data.js";

const raw = await fetch(DATA_URL).then((r) => r.text());
// eslint-disable-next-line no-eval
const { species } = eval(`(${raw})`) as {
  species: Record<number, { key: string; stats: number[] }>;
};

const record: Record<string, PokedexData> = {};
for (const entry of Object.values(species)) {
  if (entry.key && entry.stats) {
    const [hp, atk, def, spe, spa, spd] = entry.stats;
    record[entry.key] = { hp, atk, def, spa, spd, spe };
  }
}

mkdirSync("src/data", { recursive: true });
writeFileSync("src/data/pokedex.json", JSON.stringify(record, null, 2));
