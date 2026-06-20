import { BattleData, resolveActiveBox } from "@site/src/components/Battle";
import { BoxData, getCanon, isExtraEntry, resolveBox, teamEntryName } from "@site/src/utils/box";
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
    const line = candidates.find(
      (l) =>
        (!l.if || l.if.every((t) => visible.has(t))) &&
        (!l.ifNot || l.ifNot.every((t) => !visible.has(t)))
    );
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

export function computeBattleFrags(battle: BattleData): Record<string, number> {
  const frags: Record<string, number> = {};
  for (const line of getVisibleLines(battle).values()) {
    for (const [pokemon, count] of Object.entries(line.frags ?? {}) as [string, number][]) {
      frags[pokemon] = (frags[pokemon] ?? 0) + count;
    }
  }
  return frags;
}

export type PageStats = {
  total: number;
  byPage: Record<string, number>;
  addOrder: number;
  spriteKey?: string;
};

function resolvePageMeta(resolvedBox: BoxData): {
  canon: (name: string) => string;
  spriteKeyMap: Record<string, string>;
  addOrderMap: Record<string, number>;
  allBoxKeys: string[];
} {
  const canon = getCanon(resolvedBox);

  const spriteKeyMap: Record<string, string> = {};
  const addOrderMap: Record<string, number> = {};
  const allBoxKeys: string[] = [];
  for (const pokemon of resolvedBox.pokemon) {
    const p = resolvePokemon(pokemon);
    const key = canon(p.name);
    allBoxKeys.push(key);
    if (p.spriteKey) spriteKeyMap[key] = p.spriteKey;
    if (p.addOrder !== undefined) addOrderMap[key] = p.addOrder;
  }

  return { canon, spriteKeyMap, addOrderMap, allBoxKeys };
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
  pages: { label: string; battles: BattleData[] }[],
  resolvedBox: BoxData
): Record<string, PageStats> {
  const { canon, spriteKeyMap, addOrderMap, allBoxKeys } = resolvePageMeta(resolvedBox);
  const totals: Record<string, PageStats> = {};

  for (const key of allBoxKeys) {
    totals[key] = { total: 0, byPage: {}, addOrder: addOrderMap[key] ?? Infinity };
  }

  for (const { label, battles } of pages) {
    for (const battle of battles) {
      for (const entry of resolveBox(resolveActiveBox(battle)).team ?? []) {
        if (isExtraEntry(entry)) continue;
        const key = canon(teamEntryName(entry));
        totals[key].total++;
        totals[key].byPage[label] = (totals[key].byPage[label] ?? 0) + 1;
      }
    }
  }

  attachSprites(totals, spriteKeyMap);
  return totals;
}

export function computePageFragStats(
  pages: { label: string; battles: BattleData[] }[],
  resolvedBox: BoxData
): Record<string, PageStats> {
  const { canon, spriteKeyMap, addOrderMap, allBoxKeys } = resolvePageMeta(resolvedBox);
  const totals: Record<string, PageStats> = {};

  for (const key of allBoxKeys) {
    totals[key] = { total: 0, byPage: {}, addOrder: addOrderMap[key] ?? Infinity };
  }

  for (const { label, battles } of pages) {
    for (const battle of battles) {
      for (const line of getVisibleLines(battle).values()) {
        for (const [pokemon, count] of Object.entries(line.frags ?? {}) as [string, number][]) {
          const key = canon(pokemon);
          if (!totals[key]) {
            totals[key] = { total: 0, byPage: {}, addOrder: addOrderMap[key] ?? Infinity };
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
  addOrder: number;
  spriteKey?: string;
};

export function computeStats(battles: BattleData[], resolvedBox: BoxData): Record<string, PokemonStats> {
  const canon = getCanon(resolvedBox);

  const spriteKeyMap: Record<string, string> = {};
  const addOrderMap: Record<string, number> = {};
  for (const pokemon of resolvedBox.pokemon) {
    const p = resolvePokemon(pokemon);
    const key = canon(p.name);
    if (p.spriteKey) spriteKeyMap[key] = p.spriteKey;
    if (p.addOrder !== undefined) addOrderMap[key] = p.addOrder;
  }

  const firstAppearance: Record<string, number> = {};
  for (let i = 0; i < battles.length; i++) {
    for (const pokemon of resolveBox(resolveActiveBox(battles[i])).pokemon) {
      const key = canon(resolvePokemon(pokemon).name);
      if (!(key in firstAppearance)) firstAppearance[key] = i;
    }
  }

  const totals: Record<string, PokemonStats> = {};

  for (const pokemon of resolvedBox.pokemon) {
    const key = canon(resolvePokemon(pokemon).name);
    totals[key] = { battles: 0, frags: 0, possibleBattles: 0, possibleFrags: 0, addOrder: addOrderMap[key] ?? Infinity };
  }

  for (const battle of battles) {
    for (const teamEntry of resolveBox(resolveActiveBox(battle)).team ?? []) {
      if (isExtraEntry(teamEntry)) continue;
      const key = canon(teamEntryName(teamEntry));
      const entry = totals[key] ?? {
        battles: 0,
        frags: 0,
        possibleBattles: 0,
        possibleFrags: 0,
        addOrder: Infinity,
      };
      totals[key] = { ...entry, battles: entry.battles + 1 };
    }
  }

  for (const battle of battles) {
    for (const line of getVisibleLines(battle).values()) {
      for (const [pokemon, count] of Object.entries(line.frags ?? {}) as [string, number][]) {
        const key = canon(pokemon);
        const entry = totals[key] ?? {
          battles: 0,
          frags: 0,
          possibleBattles: 0,
          possibleFrags: 0,
          addOrder: Infinity,
        };
        totals[key] = { ...entry, frags: entry.frags + count };
      }
    }
  }

  // Compute possible battles/frags: for each battle, credit every pokemon whose
  // first appearance was at or before this battle index.
  for (let i = 0; i < battles.length; i++) {
    const opponentCount = resolveBox(battles[i].opponentBox).team?.length ?? 0;
    for (const [key, firstIdx] of Object.entries(firstAppearance)) {
      if (i < firstIdx) continue;
      const entry = totals[key] ?? {
        battles: 0,
        frags: 0,
        possibleBattles: 0,
        possibleFrags: 0,
        addOrder: Infinity,
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
    const bo = addOrderMap[key];
    totals[key] = {
      ...stats,
      ...(sk !== undefined && { spriteKey: sk }),
      addOrder: bo ?? Infinity,
    };
  }

  return totals;
}
