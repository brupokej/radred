import { calculate, Field, Generations, Move, Pokemon } from "@site/src/calc-shim";
import { CALC_GEN, pokemonDataToSide, type CalcSideState } from "@site/src/utils/calcLink";
import { resolveItem, resolveMove } from "@site/src/utils/abbreviations";
import type { PokemonData } from "@site/src/utils/pokemon";

const GEN = Generations.get(CALC_GEN as any);
const DEFAULT_FIELD = new Field({ gameType: "Singles" });

export interface SwitchScore {
  score: number;
  chipText: string;
  rowCells: string[];
  outspeeds: boolean;
  resistAll: boolean;
  walls: boolean;
  faintMove: string | null;
  weakMove: string | null;
}

function makeCalcPokemon(state: CalcSideState): Pokemon {
  const name = state.species || "Bulbasaur";
  const opts = {
    level: state.level,
    nature: state.nature || undefined,
    ability: state.ability || undefined,
    item: resolveItem(state.item) || undefined,
    ivs: state.ivs,
    evs: state.evs,
    boosts: state.boosts,
    status: (state.status as any) || undefined,
    moves: state.moves.filter(Boolean).map(resolveMove) as string[],
  } as any;
  const base = new Pokemon(GEN, name, opts);
  const curHP = Math.max(1, Math.round((state.curHP / 100) * base.stats.hp));
  return new Pokemon(GEN, name, { ...opts, originalCurHP: curHP });
}

function computeMoveRange(
  attacker: CalcSideState,
  defender: CalcSideState,
  moveName: string
): { range: [number, number]; defHp: number } | null {
  if (!moveName || !attacker.species || !defender.species) return null;
  try {
    const atk = makeCalcPokemon(attacker);
    const def = makeCalcPokemon(defender);
    const result = calculate(GEN as any, atk, def, new Move(GEN, resolveMove(moveName)), DEFAULT_FIELD);
    const dmg = result.damage;
    const amounts = Array.isArray(dmg)
      ? Array.isArray(dmg[0]) ? (dmg as number[][]).flat() : (dmg as number[])
      : [dmg as number];
    return {
      range: [Math.min(...amounts), Math.max(...amounts)],
      defHp: def.stats.hp,
    };
  } catch {
    return null;
  }
}

function buildRowCells(
  benchName: string,
  flags: Omit<SwitchScore, "chipText" | "rowCells">,
  foeName: string
): string[] {
  const speedPart = flags.outspeeds
    ? `faster than ${foeName} (+14)`
    : `slower than ${foeName}`;

  let damagePart = "";
  if (flags.faintMove) damagePart = `, faints to ${flags.faintMove}${flags.outspeeds ? "": " (-big)"}`;
  else if (flags.resistAll) damagePart = ", resists all moves (+17)";
  else if (flags.walls) damagePart = ", walls all moves (+2)";
  else if (flags.weakMove) damagePart = `, threatened by ${flags.weakMove} (−1)`;
  else damagePart = ", not threatened by any move";

  const scoreText = flags.faintMove && !flags.outspeeds
    ? "×"
    : String(Math.max(0, flags.score));

  return [benchName, "→", `${speedPart}${damagePart}`, "→", scoreText];
}

export function computeSwitchScores(
  p1: CalcSideState,
  p2Team: PokemonData[],
  foeName: string
): SwitchScore[] {
  const emptyFlags = (): Omit<SwitchScore, "chipText" | "rowCells"> => ({
    score: 0,
    outspeeds: false,
    resistAll: false,
    walls: false,
    faintMove: null,
    weakMove: null,
  });

  let p1Mon: ReturnType<typeof makeCalcPokemon>;
  try {
    p1Mon = makeCalcPokemon(p1);
  } catch {
    return p2Team.map((p) => {
      const flags = emptyFlags();
      return { ...flags, chipText: "0", rowCells: buildRowCells(p.name, flags, foeName) };
    });
  }

  const p1Moves = p1.moves.filter(Boolean) as string[];
  let hasPhysical = false;
  let hasSpecial = false;
  for (const moveName of p1Moves) {
    try {
      const cat = new Move(GEN, resolveMove(moveName)).category;
      if (cat === "Physical") hasPhysical = true;
      if (cat === "Special") hasSpecial = true;
    } catch {}
  }

  return p2Team.map((benchData) => {
    const flags = emptyFlags();
    try {
      const benchState = pokemonDataToSide(benchData);
      const benchMon = makeCalcPokemon(benchState);
      const benchMaxHp = benchMon.stats.hp;

      if (benchMon.stats.spe > p1Mon!.stats.spe) {
        flags.score += 14;
        flags.outspeeds = true;
      }

      let isNormalEffectiveness = 0;
      for (const moveName of p1Moves) {
        const mr = computeMoveRange(p1, benchState, moveName);
        if (!mr || mr.defHp === 0) continue;
        const avg = Math.round((mr.range[0] + mr.range[1]) / 2);
        if (avg >= benchMaxHp) {
          flags.faintMove = moveName;
          break;
        } else if (avg * 2 >= benchMaxHp) {
          if (!flags.weakMove) flags.weakMove = moveName;
        } else if (avg * 3 >= benchMaxHp) {
          isNormalEffectiveness++;
        }
      }

      if (flags.faintMove) {
        flags.score -= flags.outspeeds ? 15 : 39;
      } else if (flags.weakMove) {
        flags.score -= 1;
      } else if (isNormalEffectiveness === 0) {
        flags.score += 17;
        flags.resistAll = true;
      } else {
        let cantWall = false;
        if (hasPhysical && benchMon.stats.def <= p1Mon!.stats.atk) cantWall = true;
        if (hasSpecial && benchMon.stats.spd <= p1Mon!.stats.spa) cantWall = true;
        if (!cantWall) {
          flags.score += 2;
          flags.walls = true;
        }
      }
    } catch {}

    const chipText = flags.faintMove && !flags.outspeeds
      ? "×"
      : String(Math.max(0, flags.score));
    const rowCells = buildRowCells(benchData.name, flags, foeName);
    return { ...flags, chipText, rowCells };
  });
}
