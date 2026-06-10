/**
 * Scores battle plans by elegance using 5 axes (each 0–25, total 0–125):
 *
 *   E  Roster Efficiency   25 × (opp_size − team_size) / opp_size
 *                          Positive when we use fewer pokemon than the opponent; negative when more.
 *
 *   C  Kill Concentration  25 × top_fragger_kills / opp_size
 *                          Rewards one pokemon sweeping most of the opponent's team.
 *
 *   P  Pivot Discipline    max(0, 25 − idle_turns_per_opp × 12.5)
 *                          Idle turn = player doesn't deal damage (switch, Leer, Tail Whip, etc.)
 *                          Normalized by opponent count so boss fights aren't unfairly penalized.
 *
 *   D  Damage Discipline   max(0, 25 − active_hit_turns_per_opp × 10)
 *                          Active hit = opponent deals HP damage to player (excludes sand/poison ticks).
 *                          Normalized by opponent count.
 *
 *   R  Resource Discipline max(0, 25 − resources_per_team_member × 5)
 *                          Resource = any field that actually changed on a team member's box entry
 *                          (mirrors Team component warning highlights: update[field] !== base[field],
 *                          plus each move present in update.moves but absent from base.moves set).
 *                          Normalized by team size.
 *
 * Branching battles (where opponent AI varies the path) are scored on a best-effort basis:
 *   - Matchups are deduplicated by opponent name (first non-empty occurrence wins).
 *   - Frags are summed across all lines and scaled down if they exceed opp_size.
 *   These battles are marked with * in the output.
 *
 * Usage: tsx scripts/score-battles.ts [--split <name>]
 */

import { BattleData, LineData, MoveData } from "../src/components/Battle";
import { SwitchBattleData } from "../src/components/SwitchBattle";
import { resolveBox } from "../src/utils/box";
import { Moment } from "../src/utils/moments";
import { Pokemon, PokemonData, resolvePokemon } from "../src/utils/pokemon";

import { moments as brockMoments } from "../src/data/guide/brock";
import { moments as erikaMoments } from "../src/data/guide/erika";
import { box18, moments as kogaMoments } from "../src/data/guide/koga";
import { moments as mistyMoments } from "../src/data/guide/misty";
import { moments as sabrinaMoments } from "../src/data/guide/sabrina";
import { moments as surgeMoments } from "../src/data/guide/surge";

// Enabled secrets files contain the real battle data; the default stub files contain placeholders.
// We chain them starting from box18 (koga's pre-secrets box state) for correct team compositions.
import { getBlaineSecrets } from "../src/data/guide/blaineSecrets.enabled";
import { getClairSecrets } from "../src/data/guide/clairSecrets.enabled";
import { getEliteFourSecrets } from "../src/data/guide/eliteFourSecrets.enabled";
import { getKogaSecrets } from "../src/data/guide/kogaSecrets.enabled";
import { getVictoryRoadSecrets } from "../src/data/guide/victoryRoadSecrets.enabled";

function secretsToMoments(obj: Record<string, unknown>): Moment[] {
  return Object.entries(obj)
    .filter(([k]) => k !== "box")
    .map(([, v]) => v as Moment);
}

const kogaEnabled = getKogaSecrets(box18);
const blaineEnabled = getBlaineSecrets(kogaEnabled.box);
const clairEnabled = getClairSecrets(blaineEnabled.box);
const vrEnabled = getVictoryRoadSecrets(clairEnabled.box);
const e4Enabled = getEliteFourSecrets(vrEnabled.box);

const ALL_MOMENTS: Moment[] = [
  ...brockMoments,
  ...mistyMoments,
  ...surgeMoments,
  ...erikaMoments,
  ...sabrinaMoments,
  ...kogaMoments.filter((m) => !m.secret),
  ...secretsToMoments(kogaEnabled),
  ...secretsToMoments(blaineEnabled),
  ...secretsToMoments(clairEnabled),
  ...secretsToMoments(vrEnabled),
  ...secretsToMoments(e4Enabled),
];

// --- Frags (mirrors getVisibleLines / computeBattleFrags in stats.ts) -------
// getState always returns null in Node.js, so we always follow the default branch.

function getVisibleLines(data: BattleData): Map<string, LineData> {
  const linesBySlug = new Map<string, LineData[]>();
  for (const line of data.lines) {
    const slug = line.line ?? "";
    if (!linesBySlug.has(slug)) linesBySlug.set(slug, []);
    linesBySlug.get(slug)!.push(line);
  }

  const visible = new Map<string, LineData>();
  const queue: string[] = [data.lines[0]?.line ?? ""];

  while (queue.length > 0) {
    const slug = queue.shift()!;
    if (visible.has(slug)) continue;

    const line = (linesBySlug.get(slug) ?? []).find(
      (l) =>
        (!l.if || l.if.every((t) => visible.has(t))) &&
        (!l.ifNot || l.ifNot.every((t) => !visible.has(t)))
    );
    if (!line) continue;

    visible.set(slug, line);

    for (const matchup of line.matchups) {
      for (const branch of matchup.branches ?? []) {
        const conditionsMet =
          (!branch.if || branch.if.every((t) => visible.has(t))) &&
          (!branch.ifNot || branch.ifNot.every((t) => !visible.has(t)));
        if (!conditionsMet) continue;
        // No localStorage in Node.js — always follow the default (first) branch.
        const target = branch.default
          ? (branch.branches.find((b) => b === branch.default) ?? branch.branches[0])
          : branch.branches[0];
        queue.push(target);
        break;
      }
    }
  }

  return visible;
}

function computeBattleFrags(data: BattleData): Record<string, number> {
  const frags: Record<string, number> = {};
  for (const line of getVisibleLines(data).values()) {
    for (const [name, count] of Object.entries(line.frags ?? {}) as [string, number][]) {
      frags[name] = (frags[name] ?? 0) + count;
    }
  }
  return frags;
}

// --- Turn parsing -----------------------------------------------------------

function isMoveDataTurn(turn: unknown): turn is MoveData[] {
  if (!Array.isArray(turn) || turn.length === 0) return false;
  const first = turn[0];
  if (typeof first === "string") return false; // danger/risk annotation row
  if (typeof first !== "object" || first === null) return false;
  if ("anchor" in first || "loop" in first || "danger" in first) return false;
  return "player" in first || "opponent" in first;
}

/** Returns true if the player event represents an idle turn (no damage dealt to opponent). */
function isIdlePlayerEvent(s: string): boolean {
  if (s.includes("switch to")) return true;
  if (s.includes("flinched")) return false; // forced inaction, not a player choice
  // Targets opponent but no HP notation → non-damaging move (Leer, Tail Whip, Yawn, etc.)
  if (s.includes("{o:") && !s.includes("to {-:") && !s.includes("to {=:")) return true;
  return false;
}

/** Returns true if the opponent event is an active hit on the player (not passive damage). */
function isActiveHitEvent(s: string): boolean {
  // Pattern: {o:Name} Move {p:Name} to {+:N}
  // Excludes: passive ticks ({p:X} sandstorm/poison to {+:N} — these start with {p:, not {o:)
  // Excludes: status-only moves with no HP change (no "to {+:")
  // Excludes: opponent AI switches ({o:X} switch to {o:Y} — no {p: present)
  return s.startsWith("{o:") && s.includes("{p:") && s.includes("to {+:");
}

// --- Resource counting ------------------------------------------------------

const RESOURCE_FIELDS: (keyof PokemonData)[] = [
  "level",
  "nature",
  "ability",
  "nonMegaAbility",
  "item",
  "ivs",
  "evs",
];

function countPokemonResources(pokemon: Pokemon): number {
  const { base, update } = pokemon;
  if (!update) return 0;

  let count = 0;
  for (const field of RESOURCE_FIELDS) {
    if (
      field in update &&
      update[field as keyof typeof update] !== base[field as keyof typeof base]
    ) {
      count++;
    }
  }

  // Count each move present in the resolved moveset but absent from the base moveset.
  const baseMoveSet = base.moves ? new Set(base.moves.filter(Boolean)) : null;
  if (update.moves) {
    for (const move of update.moves) {
      if (move && (!baseMoveSet || !baseMoveSet.has(move))) count++;
    }
  }

  return count;
}

// --- Scoring ----------------------------------------------------------------

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

interface BattleScore {
  split: string;
  battle: string;
  oppSize: number;
  teamSize: number;
  E: number;
  C: number;
  P: number;
  D: number;
  R: number;
  total: number;
  branching: boolean;
}

function scoreBattle(split: string, label: string, data: BattleData): BattleScore {
  const playerBoxRaw = data.playerBoxCases
    ? Object.values(data.playerBoxCases.cases)[0]
    : data.playerBox!;
  const playerBox = resolveBox(playerBoxRaw);
  const opponentBox = resolveBox(data.opponentBox);

  const teamSize = playerBox.team?.length ?? 0;
  const oppSize = opponentBox.team?.length ?? 0;

  // Count non-redundant resource changes for team members (mirrors Team component warning logic).
  const teamSet = new Set(playerBox.team ?? []);
  let totalResources = 0;
  for (const pokemon of playerBox.pokemon) {
    if (teamSet.has(resolvePokemon(pokemon).name)) {
      totalResources += countPokemonResources(pokemon);
    }
  }

  const hasBranching = data.lines.some((l) =>
    l.matchups.some((m) => (m.branches?.length ?? 0) > 0)
  );

  // Follow the default branch path (same logic as the stats page) to get frags.
  const fragsMap = computeBattleFrags(data);
  const topFrags = Math.max(0, ...Object.values(fragsMap));

  // Walk matchups in line order; skip any opponent already processed.
  // Prefer the first non-empty occurrence so empty branch-point stubs don't shadow real turns.
  let idleTurns = 0;
  let activeHitTurns = 0;
  const processed = new Set<string>();

  for (const line of data.lines) {
    for (const matchup of line.matchups) {
      const key = matchup.matchup.join("+");
      if (processed.has(key)) continue;

      const moveTurns = matchup.turns.filter(isMoveDataTurn) as MoveData[][];
      if (moveTurns.length === 0) continue; // empty stub — keep looking for a better occurrence

      processed.add(key);

      for (const turn of moveTurns) {
        let idle = false;
        let hit = false;
        for (const event of turn) {
          if (event.player !== undefined && isIdlePlayerEvent(event.player)) idle = true;
          if (event.opponent !== undefined && isActiveHitEvent(event.opponent)) hit = true;
        }
        if (idle) idleTurns++;
        if (hit) activeHitTurns++;
      }
    }
  }

  const E = oppSize > 0 ? (25 * (oppSize - teamSize)) / oppSize : 0;
  const C = oppSize > 0 ? (25 * topFrags) / oppSize : 0;
  const P = Math.max(0, 25 - (oppSize > 0 ? (idleTurns / oppSize) * 12.5 : 0));
  const D = Math.max(0, 25 - (oppSize > 0 ? (activeHitTurns / oppSize) * 10 : 0));
  const R = Math.max(0, 25 - (teamSize > 0 ? (totalResources / teamSize) * 5 : 0));
  const total = E + C + P + D + R;

  return {
    split,
    battle: label,
    oppSize,
    teamSize,
    E: round1(E),
    C: round1(C),
    P: round1(P),
    D: round1(D),
    R: round1(R),
    total: round1(total),
    branching: hasBranching,
  };
}

// --- Opponent attention ------------------------------------------------------

const ATTN_TURNS = 1; // weight per turn
const ATTN_SWITCHES = 2; // weight per player switch

interface MatchupDifficulty {
  opponent: string;
  battle: string;
  turns: number;
  switches: number;
  score: number;
}

function analyzeMatchups(label: string, data: BattleData): MatchupDifficulty[] {
  const out: MatchupDifficulty[] = [];
  const processed = new Set<string>();

  for (const line of data.lines) {
    for (const matchup of line.matchups) {
      const key = matchup.matchup.join("+");
      if (processed.has(key)) continue;

      const moveTurns = matchup.turns.filter(isMoveDataTurn) as MoveData[][];
      if (moveTurns.length === 0) continue;

      processed.add(key);

      let switches = 0;
      for (const turn of moveTurns) {
        for (const event of turn) {
          if (event.player !== undefined && event.player.includes("switch to")) {
            switches++;
          }
        }
      }

      const t = moveTurns.length;
      out.push({
        opponent: matchup.matchup.join(" + "),
        battle: label,
        turns: t,
        switches,
        score: ATTN_TURNS * t + ATTN_SWITCHES * switches,
      });
    }
  }

  return out;
}

// --- Output -----------------------------------------------------------------

const splitFilter = (() => {
  const idx = process.argv.indexOf("--split");
  return idx !== -1 ? process.argv[idx + 1]?.toLowerCase() : null;
})();

function expandMoment(m: Moment): { split: string; label: string; data: BattleData }[] {
  if (m.kind === "battle") {
    return [{ split: m.split, label: m.label, data: m.data }];
  }
  if (m.kind === "switchBattle") {
    return (m.data as SwitchBattleData).cases.map((c) => ({
      split: m.split,
      label: `${m.label} (${c.label})`,
      data: c.data,
    }));
  }
  return [];
}

const results: BattleScore[] = ALL_MOMENTS.filter(
  (m) => !splitFilter || m.split.toLowerCase().includes(splitFilter)
)
  .flatMap(expandMoment)
  .map(({ split, label, data }) => scoreBattle(split, label, data))
  .sort((a, b) => b.total - a.total);

const longestLabel = Math.max(...results.map((r) => r.battle.length + (r.branching ? 2 : 0)));
const W = {
  split: 12,
  battle: longestLabel,
  opp: 4,
  team: 5,
  E: 7,
  C: 7,
  P: 7,
  D: 7,
  R: 7,
  total: 8,
};
const rp = (s: string | number, n: number) => String(s).padStart(n);
const lp = (s: string | number, n: number) => String(s).padEnd(n);
const score = (n: number, w: number) => n.toFixed(1).padStart(w);

const sep = "  ";
const header = [
  lp("Split", W.split),
  lp("Battle", W.battle),
  rp("Opp", W.opp),
  rp("Team", W.team),
  rp("E", W.E),
  rp("C", W.C),
  rp("P", W.P),
  rp("D", W.D),
  rp("R", W.R),
  rp("Total", W.total),
].join(sep);

console.log(header);
console.log("─".repeat(header.length));

for (const r of results) {
  const battleLabel = r.battle + (r.branching ? " *" : "");
  console.log(
    [
      lp(r.split, W.split),
      lp(battleLabel, W.battle),
      rp(r.oppSize, W.opp),
      rp(r.teamSize, W.team),
      score(r.E, W.E),
      score(r.C, W.C),
      score(r.P, W.P),
      score(r.D, W.D),
      score(r.R, W.R),
      score(r.total, W.total),
    ].join(sep)
  );
}

console.log("\n* Score is approximate due to branching (opponent AI varies the path).");
console.log(`\n${results.length} battles scored.`);

// --- Opponent attention table -----------------------------------------------

const filteredBattles = ALL_MOMENTS.filter(
  (m) => !splitFilter || m.split.toLowerCase().includes(splitFilter)
).flatMap(expandMoment);

const TOP_N = 15;
const hardest = filteredBattles
  .flatMap(({ label, data }) => analyzeMatchups(label, data))
  .sort((a, b) => b.score - a.score || b.turns - a.turns)
  .slice(0, TOP_N);

const WA = {
  score: Math.max(5, ...hardest.map((d) => String(d.score).length)),
  turns: Math.max(5, ...hardest.map((d) => String(d.turns).length)),
  switches: Math.max(8, ...hardest.map((d) => String(d.switches).length)),
  opp: Math.max(8, ...hardest.map((d) => d.opponent.length)),
  battle: Math.max(6, ...hardest.map((d) => d.battle.length)),
};

const attnHeader = [
  rp("Score", WA.score),
  rp("Turns", WA.turns),
  rp("Switches", WA.switches),
  lp("Opponent", WA.opp),
  lp("Battle", WA.battle),
].join(sep);

console.log(
  `\nTop ${TOP_N} opponent pokemon by player attention (${ATTN_TURNS}×turns + ${ATTN_SWITCHES}×switches):`
);
console.log(attnHeader);
console.log("─".repeat(attnHeader.length));

for (const d of hardest) {
  console.log(
    [
      rp(d.score, WA.score),
      rp(d.turns, WA.turns),
      rp(d.switches, WA.switches),
      lp(d.opponent, WA.opp),
      lp(d.battle, WA.battle),
    ].join(sep)
  );
}
