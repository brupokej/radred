import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import type { BattleData } from "../src/components/Battle";
import { moments as blaineMoments } from "../src/data/guide/blaine";
import { moments as brockMoments } from "../src/data/guide/brock";
import { moments as clairMoments } from "../src/data/guide/clair";
import { moments as eliteFourMoments } from "../src/data/guide/eliteFour";
import { moments as erikaMoments } from "../src/data/guide/erika";
import { moments as kogaMoments } from "../src/data/guide/koga";
import { moments as mistyMoments } from "../src/data/guide/misty";
import { moments as sabrinaMoments } from "../src/data/guide/sabrina";
import { moments as surgeMoments } from "../src/data/guide/surge";
import { moments as victoryRoadMoments } from "../src/data/guide/victoryRoad";
import { type Box, resolveBox } from "../src/utils/box";
import type { Moment } from "../src/utils/moments";
import * as opponents from "../src/utils/opponents";
import { type PokemonData, resolvePokemon } from "../src/utils/pokemon";

const STATIC_DIR = join(process.cwd(), "static/sprites");
const CDN_BASE = "https://cdn.jsdelivr.net/gh/Autumnchi";
const PALETTES = ["coloured", "monotone"] as const;
const CONCURRENCY = 8;

function toSpriteKey(pokemon: PokemonData): string {
  return pokemon.spriteKey ?? pokemon.name.toLowerCase();
}

function collectBox(box: Box, keys: Set<string>) {
  for (const p of resolveBox(box).pokemon) {
    keys.add(toSpriteKey(resolvePokemon(p)));
  }
}

function collectBattle(data: BattleData, keys: Set<string>) {
  collectBox(data.opponentBox, keys);
  if (data.playerBox) collectBox(data.playerBox, keys);
  if (data.partnerBox) collectBox(data.partnerBox, keys);
  if (data.playerBoxCases) {
    for (const box of Object.values(data.playerBoxCases.cases)) collectBox(box, keys);
  }
}

function collectMoments(moments: Moment[], keys: Set<string>) {
  for (const m of moments) {
    if (m.kind === "battle") {
      collectBattle(m.data, keys);
    } else if (m.kind === "switchBattle") {
      for (const { data } of m.data.cases) collectBattle(data, keys);
    } else if (m.kind === "encounter") {
      keys.add(toSpriteKey(m.data.pokemon));
      collectBox(m.data.playerBox, keys);
    } else if (m.kind === "boxChange" && m.data?.playerBox) {
      collectBox(m.data.playerBox, keys);
    }
  }
}

function collectSecretReturn(obj: Record<string, unknown>, keys: Set<string>) {
  for (const val of Object.values(obj)) {
    if (val && typeof val === "object" && "kind" in val && "split" in val) {
      collectMoments([val as Moment], keys);
    }
  }
}

async function main() {
  const keys = new Set<string>();

  for (const box of Object.values(opponents) as Box[]) {
    collectBox(box, keys);
  }

  for (const moments of [
    brockMoments,
    mistyMoments,
    surgeMoments,
    erikaMoments,
    kogaMoments,
    sabrinaMoments,
    blaineMoments,
    clairMoments,
    victoryRoadMoments,
    eliteFourMoments,
  ]) {
    collectMoments(moments, keys);
  }

  console.log(`Collected ${keys.size} unique sprite keys`);

  for (const palette of PALETTES) {
    mkdirSync(join(STATIC_DIR, palette), { recursive: true });
  }

  type Task = { key: string; palette: string; url: string; dest: string };
  const tasks: Task[] = [];
  for (const key of [...keys].sort()) {
    for (const palette of PALETTES) {
      const dest = join(STATIC_DIR, palette, `${key}.png`);
      if (!existsSync(dest)) {
        tasks.push({
          key,
          palette,
          url: `${CDN_BASE}/${palette}-home-sprites@main/${key}.png`,
          dest,
        });
      }
    }
  }

  const skipped = keys.size * PALETTES.length - tasks.length;
  console.log(`${tasks.length} to download, ${skipped} already present`);

  if (tasks.length === 0) {
    console.log("Nothing to do.");
    return;
  }

  let done = 0;
  let failed = 0;
  const failedList: string[] = [];

  async function downloadOne(task: Task) {
    const res = await fetch(task.url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    writeFileSync(task.dest, Buffer.from(await res.arrayBuffer()));
    done++;
    process.stdout.write(`\r${done + failed}/${tasks.length}`);
  }

  const queue = [...tasks];
  async function worker() {
    while (queue.length) {
      const task = queue.shift()!;
      try {
        await downloadOne(task);
      } catch (e) {
        failed++;
        failedList.push(`${task.palette}/${task.key}.png`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  console.log(`\nDone: ${done} downloaded, ${skipped} already present, ${failed} failed`);
  if (failedList.length) {
    console.error("Failed:\n" + failedList.map((f) => `  ${f}`).join("\n"));
  }
}

main();
