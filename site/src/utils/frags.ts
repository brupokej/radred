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

export type PokemonStats = { battles: number; frags: number };

export function computeStats(battles: BattleData[]): Record<string, PokemonStats> {
  const totals: Record<string, PokemonStats> = {};

  for (const battle of battles) {
    if (!battle.playerBox) continue;
    for (const name of battle.playerBox.team) {
      const entry = totals[name] ?? { battles: 0, frags: 0 };
      totals[name] = { ...entry, battles: entry.battles + 1 };
    }
  }

  for (const battle of battles) {
    const visible = getVisibleSlugs(battle);
    for (const line of battle.lines) {
      if (!visible.has(line.line ?? "")) continue;
      for (const [pokemon, count] of Object.entries(line.frags ?? {})) {
        const entry = totals[pokemon] ?? { battles: 0, frags: 0 };
        totals[pokemon] = { ...entry, frags: entry.frags + count };
      }
    }
  }

  return totals;
}
