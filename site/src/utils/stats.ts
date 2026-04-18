import { BattleData } from "@site/src/components/Battle";
import { resolveBox } from "@site/src/utils/box";
import { resolvePokemon } from "@site/src/utils/pokemon";
import { slugify } from "@site/src/utils/slugify";
import { getState } from "@site/src/utils/storage";

function getVisibleLines(data: BattleData): Map<string, (typeof data.lines)[0]> {
  const linesBySlug = new Map<string, typeof data.lines>();
  for (const line of data.lines) {
    const slug = line.line ?? "";
    if (!linesBySlug.has(slug)) linesBySlug.set(slug, []);
    linesBySlug.get(slug)!.push(line);
  }

  const visible = new Map<string, (typeof data.lines)[0]>();
  const queue: string[] = [data.lines[0]?.line ?? ""];

  while (queue.length > 0) {
    const slug = queue.shift()!;
    if (visible.has(slug)) continue;

    const candidates = linesBySlug.get(slug) ?? [];
    const line = candidates.find((l) => !l.if || l.if.every((t) => visible.has(t)));
    if (!line) continue;

    visible.set(slug, line);

    for (const matchup of line.matchups) {
      let branchActivated = false;
      for (const branch of matchup.branches ?? []) {
        if (branchActivated) break;
        const conditionsMet =
          (!branch.if || branch.if.every((t) => visible.has(t))) &&
          (!branch.ifNot || branch.ifNot.every((t) => !visible.has(t)));
        if (!conditionsMet) continue;
        branchActivated = true;

        if (branch.branches.length === 1) {
          queue.push(branch.branches[0]);
        } else {
          const key = `branch-${slugify(branch.branches)}`;
          const stored = getState(key);
          const fallback = branch.default
            ? (branch.branches.find((b) => b === branch.default) ?? branch.branches[0])
            : branch.branches[0];
          const found = stored ? branch.branches.find((b) => slugify(b) === stored) : null;
          queue.push(found ?? fallback);
        }
      }
    }
  }

  return visible;
}

export type PageStats = {
  total: number;
  byPage: Record<string, number>;
  boxOrder: number;
  spriteKey?: string;
};

function resolvePageMeta(pages: { label: string; battles: BattleData[] }[]): {
  canon: (name: string) => string;
  spriteKeyMap: Record<string, string>;
  boxOrderMap: Record<string, number>;
} {
  const allBattles = pages.flatMap((p) => p.battles);
  const lastBattle = allBattles[allBattles.length - 1];
  const renames = lastBattle.playerBox.renames ?? {};
  const canon = (name: string) => renames[name] ?? name;

  const spriteKeyMap: Record<string, string> = {};
  const boxOrderMap: Record<string, number> = {};
  for (const [, pokemon] of resolveBox(lastBattle.playerBox)) {
    const p = resolvePokemon(pokemon);
    const key = canon(p.name);
    if (p.spriteKey) spriteKeyMap[key] = p.spriteKey;
    if (p.boxOrder !== undefined) boxOrderMap[key] = p.boxOrder;
  }

  return { canon, spriteKeyMap, boxOrderMap };
}

function attachSprites(
  totals: Record<string, PageStats>,
  spriteKeyMap: Record<string, string>
): void {
  for (const [key, stats] of Object.entries(totals)) {
    const sk = spriteKeyMap[key];
    if (sk) totals[key] = { ...stats, spriteKey: sk };
  }
}

export function computePageStats(
  pages: { label: string; battles: BattleData[] }[]
): Record<string, PageStats> {
  const allBattles = pages.flatMap((p) => p.battles);
  if (allBattles.length === 0) return {};

  const { canon, spriteKeyMap, boxOrderMap } = resolvePageMeta(pages);
  const totals: Record<string, PageStats> = {};

  for (const { label, battles } of pages) {
    for (const battle of battles) {
      for (const name of battle.playerBox.team) {
        const key = canon(name);
        if (!totals[key]) {
          totals[key] = { total: 0, byPage: {}, boxOrder: boxOrderMap[key] ?? Infinity };
        }
        totals[key].total++;
        totals[key].byPage[label] = (totals[key].byPage[label] ?? 0) + 1;
      }
    }
  }

  attachSprites(totals, spriteKeyMap);
  return totals;
}

export function computePageFragStats(
  pages: { label: string; battles: BattleData[] }[]
): Record<string, PageStats> {
  const allBattles = pages.flatMap((p) => p.battles);
  if (allBattles.length === 0) return {};

  const { canon, spriteKeyMap, boxOrderMap } = resolvePageMeta(pages);
  const totals: Record<string, PageStats> = {};

  for (const { label, battles } of pages) {
    for (const battle of battles) {
      for (const line of getVisibleLines(battle).values()) {
        for (const [pokemon, count] of Object.entries(line.frags ?? {})) {
          const key = canon(pokemon);
          if (!totals[key]) {
            totals[key] = { total: 0, byPage: {}, boxOrder: boxOrderMap[key] ?? Infinity };
          }
          totals[key].total += count;
          totals[key].byPage[label] = (totals[key].byPage[label] ?? 0) + count;
        }
      }
    }
  }

  attachSprites(totals, spriteKeyMap);
  return totals;
}

export type PokemonStats = {
  battles: number;
  frags: number;
  possibleBattles: number;
  possibleFrags: number;
  boxOrder: number;
  spriteKey?: string;
};

export function computeStats(battles: BattleData[]): Record<string, PokemonStats> {
  const lastBattle = battles[battles.length - 1];
  const renames = lastBattle?.playerBox.renames ?? {};
  const canon = (name: string) => renames[name] ?? name;

  const spriteKeyMap: Record<string, string> = {};
  const boxOrderMap: Record<string, number> = {};
  for (const [, pokemon] of resolveBox(
    lastBattle?.playerBox ?? { base: [], changes: [], team: [] }
  )) {
    const p = resolvePokemon(pokemon);
    const key = canon(p.name);
    if (p.spriteKey) spriteKeyMap[key] = p.spriteKey;
    if (p.boxOrder !== undefined) boxOrderMap[key] = p.boxOrder;
  }

  // Find the first battle index where each canonical pokemon appeared in the player box.
  // Use resolveBox (base + changes) so pokemon added via BoxChange.add are detected in
  // the same battle they were added, not deferred to the next box snapshot.
  const firstAppearance: Record<string, number> = {};
  for (let i = 0; i < battles.length; i++) {
    for (const name of resolveBox(battles[i].playerBox).keys()) {
      const key = canon(name);
      if (!(key in firstAppearance)) firstAppearance[key] = i;
    }
  }

  const totals: Record<string, PokemonStats> = {};

  for (const battle of battles) {
    for (const name of battle.playerBox.team) {
      const key = canon(name);
      const entry = totals[key] ?? {
        battles: 0,
        frags: 0,
        possibleBattles: 0,
        possibleFrags: 0,
        boxOrder: Infinity,
      };
      totals[key] = { ...entry, battles: entry.battles + 1 };
    }
  }

  for (const battle of battles) {
    for (const line of getVisibleLines(battle).values()) {
      for (const [pokemon, count] of Object.entries(line.frags ?? {})) {
        const key = canon(pokemon);
        const entry = totals[key] ?? {
          battles: 0,
          frags: 0,
          possibleBattles: 0,
          possibleFrags: 0,
          boxOrder: Infinity,
        };
        totals[key] = { ...entry, frags: entry.frags + count };
      }
    }
  }

  // Compute possible battles/frags: for each battle, credit every pokemon whose
  // first appearance was at or before this battle index.
  for (let i = 0; i < battles.length; i++) {
    const opponentCount = battles[i].opponentBox.team.length;
    for (const [key, firstIdx] of Object.entries(firstAppearance)) {
      if (i < firstIdx) continue;
      const entry = totals[key] ?? {
        battles: 0,
        frags: 0,
        possibleBattles: 0,
        possibleFrags: 0,
        boxOrder: Infinity,
      };
      totals[key] = {
        ...entry,
        possibleBattles: entry.possibleBattles + 1,
        possibleFrags: entry.possibleFrags + opponentCount,
      };
    }
  }

  for (const [key, stats] of Object.entries(totals)) {
    const sk = spriteKeyMap[key];
    const bo = boxOrderMap[key];
    totals[key] = {
      ...stats,
      ...(sk !== undefined && { spriteKey: sk }),
      boxOrder: bo ?? Infinity,
    };
  }

  return totals;
}
