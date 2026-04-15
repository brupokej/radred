import { BattleData } from "@site/src/components/Battle";
import { slugify } from "@site/src/utils/slugify";
import { getState } from "@site/src/utils/storage";

function getVisibleSlugs(data: BattleData): Set<string> {
  const linesBySlug = new Map(data.lines.map((l) => [l.line ?? "", l]));
  const visible = new Set<string>();
  const queue: string[] = [data.lines[0]?.line ?? ""];

  while (queue.length > 0) {
    const slug = queue.shift()!;
    if (visible.has(slug)) continue;
    visible.add(slug);

    const line = linesBySlug.get(slug);
    if (!line) continue;

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
          const selected = getState(key) ?? branch.branches[0];
          queue.push(selected);
        }
      }
    }
  }

  return visible;
}

export type PokemonStats = { battles: number; frags: number; spriteKey?: string };

export function computeStats(battles: BattleData[]): Record<string, PokemonStats> {
  const lastBattle = battles[battles.length - 1];
  const renames = lastBattle?.playerBox.renames ?? {};
  const canon = (name: string) => renames[name] ?? name;

  const spriteKeyMap: Record<string, string> = {};
  for (const p of lastBattle?.playerBox.base ?? []) {
    if (p.spriteKey) spriteKeyMap[p.name] = p.spriteKey;
  }

  const totals: Record<string, PokemonStats> = {};

  for (const battle of battles) {
    for (const name of battle.playerBox.team) {
      const key = canon(name);
      const entry = totals[key] ?? { battles: 0, frags: 0 };
      totals[key] = { ...entry, battles: entry.battles + 1 };
    }
  }

  for (const battle of battles) {
    const visible = getVisibleSlugs(battle);
    for (const line of battle.lines) {
      if (!visible.has(line.line ?? "")) continue;
      for (const [pokemon, count] of Object.entries(line.frags ?? {})) {
        const key = canon(pokemon);
        const entry = totals[key] ?? { battles: 0, frags: 0 };
        totals[key] = { ...entry, frags: entry.frags + count };
      }
    }
  }

  for (const [key, stats] of Object.entries(totals)) {
    const sk = spriteKeyMap[key];
    if (sk) totals[key] = { ...stats, spriteKey: sk };
  }

  return totals;
}
