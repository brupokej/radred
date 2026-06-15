/**
 * HP probability calculator for multi-turn damage scenarios.
 *
 * Models attack damage (regular + 1/16 crit) and optional secondary effects
 * (status like poison/burn that deal fixed damage each turn after triggering).
 *
 * Usage: edit the `config` at the bottom and run:
 *   npx tsx scripts/calc-hp-prob.ts
 */

export interface SecondaryEffect {
  /** Probability 0.0–1.0 that this secondary triggers on this turn. */
  chance: number;
  /** Fixed damage dealt on the trigger turn and every subsequent turn. */
  damagePerTurn: number;
}

export interface TurnConfig {
  /** Exactly 16 damage roll values for a regular hit (each equally likely). */
  regular: number[];
  /** Exactly 16 damage roll values for a critical hit (1/16 chance of critting). */
  critical: number[];
  /** Optional secondary effect (e.g. poison, burn). */
  secondary?: SecondaryEffect;
}

export interface TargetRange {
  /** Inclusive minimum remaining HP. */
  minHP: number;
  /** Inclusive maximum remaining HP. */
  maxHP: number;
}

export interface SimConfig {
  startingHP: number;
  turns: TurnConfig[];
  /** Parallel to `turns`. null means no HP constraint checked this turn. */
  targets: (TargetRange | null)[];
}

// --- State representation ---

// State key encodes remaining HP and the sorted list of turn indices whose
// secondary effects have been triggered (for ongoing damage tracking).
function stateKey(hp: number, triggered: readonly number[]): string {
  return `${hp}:${triggered.join(",")}`;
}

function parseKey(key: string): { hp: number; triggered: number[] } {
  const colon = key.indexOf(":");
  const hp = parseInt(key.slice(0, colon), 10);
  const rest = key.slice(colon + 1);
  return { hp, triggered: rest ? rest.split(",").map(Number) : [] };
}

function addProb(map: Map<string, number>, key: string, p: number): void {
  map.set(key, (map.get(key) ?? 0) + p);
}

function fmtPct(p: number): string {
  const pct = p * 100;
  if (pct === 0) return "0.00%";
  // Find enough decimal places to show at least 2 significant figures
  const dp = Math.max(2, Math.ceil(-Math.log10(pct)) + 2);
  return `${pct.toFixed(dp)}%`;
}

// --- Simulation ---

export function simulate(config: SimConfig): void {
  const { startingHP, turns, targets } = config;
  const CRIT_PROB = 1 / 16;
  const N_ROLLS = 16;

  // Initial distribution: full HP, no secondaries triggered, probability 1.0
  let dist = new Map<string, number>();
  dist.set(stateKey(startingHP, []), 1.0);

  for (let t = 0; t < turns.length; t++) {
    const turn = turns[t];
    const target = targets[t];
    const next = new Map<string, number>();

    // Total probability entering this turn (= joint prob of all prior conditions)
    const prevTotal = [...dist.values()].reduce((a, b) => a + b, 0);

    for (const [key, prob] of dist) {
      const { hp, triggered } = parseKey(key);
      const triggeredSet = new Set(triggered);

      // Ongoing per-turn damage from previously triggered secondaries
      let ongoing = 0;
      for (const idx of triggered) {
        ongoing += turns[idx].secondary!.damagePerTurn;
      }

      // Secondary branching: does this turn's secondary trigger?
      type SecBranch = { extraDmg: number; p: number; newTriggered: number[] };
      let secBranches: SecBranch[];

      if (turn.secondary && !triggeredSet.has(t)) {
        const { chance, damagePerTurn } = turn.secondary;
        const newTriggered = [...triggered, t].sort((a, b) => a - b);
        secBranches = [
          { extraDmg: damagePerTurn, p: chance, newTriggered },
          { extraDmg: 0, p: 1 - chance, newTriggered: triggered },
        ];
      } else {
        secBranches = [{ extraDmg: 0, p: 1, newTriggered: triggered }];
      }

      // Attack damage branching: regular (15/16) or crit (1/16), 16 rolls each
      type AtkBranch = { dmg: number; p: number };
      const atkBranches: AtkBranch[] = [
        ...turn.regular.map((dmg) => ({ dmg, p: (1 - CRIT_PROB) / N_ROLLS })),
        ...turn.critical.map((dmg) => ({ dmg, p: CRIT_PROB / N_ROLLS })),
      ];

      for (const sec of secBranches) {
        for (const atk of atkBranches) {
          const totalDmg = ongoing + sec.extraDmg + atk.dmg;
          const newHP = Math.max(0, hp - totalDmg);
          addProb(next, stateKey(newHP, sec.newTriggered), prob * sec.p * atk.p);
        }
      }
    }

    // Marginal HP distribution before filtering (for display)
    const hpDist = new Map<number, number>();
    for (const [key, p] of next) {
      const { hp } = parseKey(key);
      hpDist.set(hp, (hpDist.get(hp) ?? 0) + p);
    }

    // Probability mass in target range before filtering
    const inRangeProb = target
      ? [...hpDist.entries()]
          .filter(([hp]) => hp >= target.minHP && hp <= target.maxHP)
          .reduce((sum, [, p]) => sum + p, 0)
      : prevTotal;

    // Remove states outside target range
    if (target !== null) {
      for (const [key] of next) {
        const { hp } = parseKey(key);
        if (hp < target.minHP || hp > target.maxHP) next.delete(key);
      }
    }

    const cumulativeProb = [...next.values()].reduce((a, b) => a + b, 0);

    // --- Output ---
    // console.log(`\n${"=".repeat(44)}`);
    console.log(`\nTurn ${t + 1}`);
    console.log(`${"=".repeat(44)}`);

    // HP distribution (normalized to "given prior turns succeeded")
    const sorted = [...hpDist.entries()].sort((a, b) => b[0] - a[0]);
    const colWidth = Math.max(...sorted.map(([hp]) => String(hp).length));
    console.log("HP distribution (conditional on prior turns succeeding):");
    for (const [hp, jointProb] of sorted) {
      const condProb = prevTotal > 0 ? jointProb / prevTotal : 0;
      const inRange = target ? hp >= target.minHP && hp <= target.maxHP : true;
      const bar = "█".repeat(Math.round(condProb * 200));
      const mark = inRange && target ? " ✓" : "  ";
      console.log(
        `  ${String(hp).padStart(colWidth)} HP: ${(condProb * 100).toFixed(2).padStart(6)}% ${bar}${mark}`
      );
    }

    if (target !== null) {
      const condProb = prevTotal > 0 ? inRangeProb / prevTotal : 0;
      console.log(
        `Target HP [${target.minHP}, ${target.maxHP}]:` +
          `\n  Conditional (this turn, given prior turns OK): ${fmtPct(condProb)}` +
          `\n  Cumulative (all turns so far satisfied):        ${fmtPct(cumulativeProb)}`
      );
    }

    dist = next;
  }

  const finalProb = [...dist.values()].reduce((a, b) => a + b, 0);
  console.log(`\n${"=".repeat(44)}`);
  console.log(`Overall success (all conditions met): ${fmtPct(finalProb)}`);
  console.log(`${"=".repeat(44)}`);
}

// --- Example configuration ---
// Starting HP: 111
// Turn 1: attack only, target remaining HP [90, 100]
// Turn 2: same attack + 30% secondary (6 dmg/turn), target remaining HP [70, 85]

const config: SimConfig = {
  startingHP: 207,
  turns: [
    {
      regular: [24, 24, 24, 25, 25, 25, 25, 26, 26, 26, 27, 27, 27, 27, 28, 28],
      critical: [36, 36, 36, 37, 37, 38, 38, 39, 39, 39, 40, 40, 41, 41, 42, 42],
    },
    {
      regular: [162, 164, 164, 168, 168, 170, 174, 174, 176, 180, 180, 182, 186, 186, 188, 192].map(
        (x) => Math.floor((x * 2) / 3)
      ),
      critical: [
        242, 246, 248, 252, 254, 258, 260, 264, 266, 270, 272, 276, 278, 282, 284, 288,
      ].map((x) => Math.floor((x * 2) / 3)),
    },
  ],
  targets: [
    { minHP: 0, maxHP: 207 },
    { minHP: 0, maxHP: 0 },
  ],
};

simulate(config);
