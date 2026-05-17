// src/utils/aiMoveScore.ts
//
// Faithful TypeScript reimplementation of the CFRU AI move-scoring pipeline:
//   AIScript_Negatives → AIScript_Positives
// Sources:
//   ~/Development/Complete-Fire-Red-Upgrade/src/Battle_AI/ai_negatives.c (3361 lines)
//   ~/Development/Complete-Fire-Red-Upgrade/src/Battle_AI/ai_positives.c (2960 lines)
//
// Score architecture: base 100, floor 0, ceiling 255.
// Pipeline: score = clamp(100 + negatives(move) + positives(move), 0, 255).
// Predicted move: highest-scoring move if score > 100, else null (switch/random).
//
// Legend:
//   ✓ implemented   — logic faithfully translated from CFRU source
//   ~ approximated  — partial implementation; comment explains the gap
//   ✗ stub          — NEEDS_LIVE_STATE; returns 0; comment names required runtime data
//   ⊗ doubles-only  — not applicable in singles; no adjustment applied

import { calculate, Field, Generations, Move, Pokemon } from "@site/src/calc-shim";
import { CALC_GEN, type CalcSideState } from "@site/src/utils/calcLink";
import { resolveItem, resolveMove } from "@site/src/utils/abbreviations";

const GEN = Generations.get(CALC_GEN as any);
const DEFAULT_FIELD = new Field({ gameType: "Singles" });

// ── Public types ─────────────────────────────────────────────────────────────

export interface AIMoveScore {
  move: string;
  score: number; // 0–255, base 100
}

export interface MovePrediction {
  scores: AIMoveScore[];    // all moves, sorted descending
  predicted: string | null; // highest-scoring move if score > 100, else null
}

// ── Internal helpers ──────────────────────────────────────────────────────────

function makeCalcMon(side: CalcSideState): Pokemon | null {
  try {
    const name = side.species || "Bulbasaur";
    const opts = {
      level: side.level,
      nature: side.nature || undefined,
      ability: side.ability || undefined,
      item: resolveItem(side.item) || undefined,
      ivs: side.ivs,
      evs: side.evs,
      boosts: side.boosts,
      status: (side.status as any) || undefined,
      moves: side.moves.filter(Boolean).map(resolveMove) as string[],
    } as any;
    const base = new Pokemon(GEN, name, opts);
    const curHP = Math.max(1, Math.round((side.curHP / 100) * base.stats.hp));
    return new Pokemon(GEN, name, { ...opts, originalCurHP: curHP });
  } catch {
    return null;
  }
}

// Minimum damage fraction of defender's max HP (0 = immune / no damage, 1 = OHKO on min roll).
function damageRatio(atk: CalcSideState, def: CalcSideState, moveName: string): number {
  if (!moveName || !atk.species || !def.species) return 0;
  try {
    const atkMon = makeCalcMon(atk);
    const defMon = makeCalcMon(def);
    if (!atkMon || !defMon || defMon.stats.hp === 0) return 0;
    const result = calculate(GEN as any, atkMon, defMon, new Move(GEN, resolveMove(moveName)), DEFAULT_FIELD);
    const dmg = result.damage;
    const amounts = Array.isArray(dmg)
      ? Array.isArray(dmg[0]) ? (dmg as number[][]).flat() : (dmg as number[])
      : [dmg as number];
    return Math.min(...amounts) / defMon.stats.hp;
  } catch {
    return 0;
  }
}

function atkOutspeeds(atk: CalcSideState, def: CalcSideState): boolean {
  try {
    const atkMon = makeCalcMon(atk);
    const defMon = makeCalcMon(def);
    if (!atkMon || !defMon) return false;
    return atkMon.stats.spe > defMon.stats.spe;
  } catch {
    return false;
  }
}

function getSmogonMove(moveName: string): Move | null {
  if (!moveName) return null;
  try { return new Move(GEN, resolveMove(moveName)); } catch { return null; }
}

function getAtkTypes(atk: CalcSideState): string[] {
  try {
    const spec = GEN.species.get(atk.species as any);
    return spec ? [...spec.types] : [];
  } catch { return []; }
}

function getDefTypes(def: CalcSideState): string[] {
  try {
    const spec = GEN.species.get(def.species as any);
    return spec ? [...spec.types] : [];
  } catch { return []; }
}

// Returns def's ability, or "" if the attacker has a mold-breaker ability.
function effDefAbility(atk: CalcSideState, def: CalcSideState): string {
  const MOLD_BREAKERS = ["Mold Breaker", "Teravolt", "Turboblaze", "Mycelium Might"];
  if (MOLD_BREAKERS.includes(atk.ability)) return "";
  return def.ability;
}

function isSoundMove(m: Move): boolean {
  return Boolean((m as any).flags?.sound);
}

function isBulletMove(m: Move): boolean {
  return Boolean((m as any).flags?.bullet);
}

function isReflectableMove(m: Move): boolean {
  return Boolean((m as any).flags?.reflectable);
}

function isPowderMove(m: Move): boolean {
  return Boolean((m as any).flags?.powder);
}

function isStatusMove(m: Move): boolean {
  return m.category === "Status";
}

function isPriorityMove(m: Move): boolean {
  return m.priority > 0;
}

// Checks if move applies a sleep/yawn effect to the target (primary or secondary).
function isSleepMove(m: Move): boolean {
  const eff = (m as any).status;
  const sec = (m as any).secondary?.status;
  return eff === "slp" || sec === "slp" || m.name === "Yawn";
}

// Returns true if move primarily or secondarily lowers the TARGET's stats.
function isStatLoweringMove(m: Move): boolean {
  const boosts = (m as any).boosts as Record<string, number> | undefined;
  const sec = (m as any).secondary?.boosts as Record<string, number> | undefined;
  const hasNeg = (b: Record<string, number> | undefined) =>
    b != null && Object.values(b).some((v) => v < 0);
  return hasNeg(boosts) || hasNeg(sec);
}

function lowersSpecificStat(m: Move, stat: string): boolean {
  const boosts = (m as any).boosts as Record<string, number> | undefined;
  return boosts != null && ((boosts as any)[stat] ?? 0) < 0;
}

// Moves that bypass Substitute (via sound flag or Infiltrator-like bypass).
function defBypassesSubstitute(def: CalcSideState): boolean {
  if (def.ability === "Infiltrator") return true;
  return def.moves.some((mn) => {
    if (!mn) return false;
    const m = getSmogonMove(mn);
    return m ? isSoundMove(m) : false;
  });
}

// Moves AromaVeil protects against (affects target's choices/mental state).
const AROMA_VEIL_MOVES = new Set([
  "Captivate", "Disable", "Encore", "Heal Block", "Infatuation",
  "Taunt", "Torment", "Whirlpool",
]);

// Moves with the Snatch flag (can be stolen).
function isSnatchableMove(m: Move): boolean {
  return Boolean((m as any).flags?.snatch);
}

// A simplistic ability rating table (higher = stronger ability).
// Used by EFFECT_SKILL_SWAP implementable check.
const ABILITY_RATING: Record<string, number> = {
  "Wonder Guard": 10, "Speed Boost": 9, "Drizzle": 8, "Drought": 8,
  "Sand Stream": 8, "Snow Warning": 8, "Trace": 7, "Intimidate": 7,
  "Levitate": 6, "Swift Swim": 6, "Chlorophyll": 6, "Arena Trap": 8,
  "Shadow Tag": 8, "Huge Power": 8, "Pure Power": 8, "Moody": 9,
  "Serene Grace": 7, "Adaptability": 7, "Technician": 7, "Magic Guard": 8,
  "No Guard": 6, "Sturdy": 5, "Protean": 8, "Libero": 8,
};
function abilityRating(ability: string): number {
  return ABILITY_RATING[ability] ?? 3;
}

// Moves forbidden for Role Play (ability-flag-banned in CFRU).
const ROLE_PLAY_BANNED_ABILITIES = new Set([
  "Wonder Guard", "Multitype", "Stance Change", "Schooling",
  "Comatose", "Shields Down", "Disguise", "RKS System", "Battle Bond",
  "Power Construct", "Illusion", "Zen Mode", "Gorilla Tactics",
  "Neutralizing Gas", "Ice Face",
]);

// ── AIScript_Negatives ────────────────────────────────────────────────────────
//
// Returns total score ADJUSTMENT from the negatives script (usually ≤ 0).
// Called once per move before positives. Most implementable checks early-return.

function aiScript_Negatives(
  atk: CalcSideState,
  def: CalcSideState,
  moveName: string,
  m: Move,
  defAbility: string,
  moveType: string,
  moveCat: string,
): number {
  // ── Pre-switch ability/property checks (run for all moves) ─────────────────

  // ✓ ai_negatives.c:199–200 — powder move vs immune target (Grass-type / Overcoat / Safety Goggles)
  if (isPowderMove(m)) {
    const defTypes = getDefTypes(def);
    if (
      defTypes.includes("Grass") ||
      defAbility === "Overcoat" ||
      def.item === "Safety Goggles"
    ) return -10;
  }

  // ✗ ai_negatives.c:203–207 — dynamax-banned move vs Dynamaxed target
  //   NEEDS_LIVE_STATE: IsDynamaxed(bankDef) [DECREASE 10]

  // ✓ ai_negatives.c:215–226 — Electric absorption: VoltAbsorb / MotorDrive / LightningRod
  if (moveType === "Electric" && ["Volt Absorb", "Motor Drive", "Lightning Rod"].includes(defAbility)) {
    return -20;
  }

  // ✓ ai_negatives.c:229–241 — Water absorption: WaterAbsorb / DrySkin / StormDrain
  if (moveType === "Water" && ["Water Absorb", "Dry Skin", "Storm Drain"].includes(defAbility)) {
    return -20;
  }

  // ✓ ai_negatives.c:248–258 — Flash Fire vs Fire
  if (moveType === "Fire" && defAbility === "Flash Fire") {
    return -20;
  }

  // ✓ ai_negatives.c:260–270 — Sap Sipper vs Grass
  if (moveType === "Grass" && defAbility === "Sap Sipper") {
    return -20;
  }

  // ✗ ai_negatives.c:272–284 — Justified: Dark physical, stat can rise, won't 2HKO, foe has physical move
  //   NEEDS_LIVE_STATE: AI_STAT_CAN_RISE (stat stage cap check), KO calc [DECREASE 4]

  // ✗ ai_negatives.c:287–303 — Rattled: Dark/Ghost/Bug physical, speed can rise, foe faster
  //   NEEDS_LIVE_STATE: stat stage, speed comparison, KO calc [DECREASE 1 or 9]

  // ✗ ai_negatives.c:304–320 — SteamEngine: Water/Fire physical, speed can rise, foe faster
  //   NEEDS_LIVE_STATE: stat stage, speed comparison, KO calc [DECREASE 5 or 9]

  // ✓ ai_negatives.c:323–329 — Soundproof vs sound move
  if (isSoundMove(m) && defAbility === "Soundproof") {
    return -10;
  }

  // ✓ ai_negatives.c:331–337 — Bulletproof vs ball/bomb move
  if (isBulletMove(m) && defAbility === "Bulletproof") {
    return -10;
  }

  // ✓ ai_negatives.c:339–348 — Dazzling / Queenly Majesty vs priority move
  if (isPriorityMove(m) && ["Dazzling", "Queenly Majesty"].includes(defAbility)) {
    return -10;
  }

  // ✓ ai_negatives.c:350–356 — AromaVeil vs AromaVeil-protected moves
  if (defAbility === "Aroma Veil" && AROMA_VEIL_MOVES.has(moveName)) {
    return -10;
  }

  // ✓ ai_negatives.c:358–364 — SweetVeil vs sleep move
  if (isSleepMove(m) && defAbility === "Sweet Veil") {
    return -10;
  }

  // ✓ ai_negatives.c:366–373 — FlowerVeil: target is Grass-type + status/stat-lower/Parting Shot
  if (defAbility === "Flower Veil" && getDefTypes(def).includes("Grass")) {
    if (
      isStatusMove(m) ||
      isStatLoweringMove(m) ||
      moveName === "Parting Shot"
    ) return -10;
  }

  // ✓ ai_negatives.c:375–381 — MagicBounce vs reflectable (Magic-Coat-affected) move
  if (isReflectableMove(m) && defAbility === "Magic Bounce") {
    return -20;
  }

  // ✓ ai_negatives.c:383–391 — Contrary vs stat-lowering move (not targeting partner)
  if (isStatLoweringMove(m) && defAbility === "Contrary") {
    return -20;
  }

  // ✓ ai_negatives.c:394–401 — MirrorArmor vs stat-lowering move
  if (isStatLoweringMove(m) && defAbility === "Mirror Armor") {
    return -20;
  }

  // ✓ ai_negatives.c:403–416 — ClearBody / FullMetalBody / WhiteSmoke vs stat-lower or Parting Shot
  if (
    (isStatLoweringMove(m) || moveName === "Parting Shot") &&
    ["Clear Body", "Full Metal Body", "White Smoke"].includes(defAbility)
  ) {
    return -10;
  }

  // ✓ ai_negatives.c:418–424 — HyperCutter vs Attack-down moves
  if (lowersSpecificStat(m, "atk") && defAbility === "Hyper Cutter") {
    return -10;
  }

  // ✓ ai_negatives.c:426–433 — KeenEye vs Accuracy-down moves
  if (lowersSpecificStat(m, "accuracy") && defAbility === "Keen Eye") {
    return -10;
  }

  // ✓ ai_negatives.c:435–442 — BigPecks vs Defense-down moves
  if (lowersSpecificStat(m, "def") && defAbility === "Big Pecks") {
    return -10;
  }

  // ✗ ai_negatives.c:444–455 — Defiant: status stat-lower, atk can rise, foe has physical move
  //   NEEDS_LIVE_STATE: current stat stage cap check, moveset reveal [DECREASE 8]

  // ✗ ai_negatives.c:457–468 — Competitive: status stat-lower, SpAtk can rise, foe has special move
  //   NEEDS_LIVE_STATE: current stat stage cap check, moveset reveal [DECREASE 8]

  // ✓ ai_negatives.c:470–476 — Comatose vs any status-setting move
  if (isStatusMove(m) && defAbility === "Comatose") {
    return -10;
  }

  // ✓ ai_negatives.c:478–485 — ShieldsDown (Minior in Shield form) vs status move
  if (
    isStatusMove(m) &&
    defAbility === "Shields Down" &&
    (def.species.toLowerCase().includes("minior") &&
      !def.species.toLowerCase().includes("core"))
  ) {
    return -10;
  }

  // ~ ai_negatives.c:487–490 — WonderSkin: sets move accuracy to 50 for status moves
  //   Approximated: we flag this but don't feed it back into a separate accuracy variable.
  //   The -10 score reduction is handled by the AI not seeing it as worth using.
  //   PARTIAL: no adjustment returned here; caller could handle accuracy separately.

  // ✗ ai_negatives.c:492–501 — LeafGuard: any sun weather + status move
  //   NEEDS_LIVE_STATE: gBattleWeather (sun active) [DECREASE 10]

  // ⊗ ai_negatives.c:505–517 — DOUBLES_ONLY: partner has LightningRod; move is Electric
  // ⊗ ai_negatives.c:519–527 — DOUBLES_ONLY: partner has StormDrain; move is Water
  // ⊗ ai_negatives.c:529–535 — DOUBLES_ONLY: partner has MagicBounce; spread Magic-Coat move
  // ⊗ ai_negatives.c:537–543 — DOUBLES_ONLY: partner has SweetVeil; sleep move
  // ⊗ ai_negatives.c:545–552 — DOUBLES_ONLY: partner has FlowerVeil; Grass-type target + status
  // ⊗ ai_negatives.c:554–560 — DOUBLES_ONLY: partner has AromaVeil; AromaVeil-protected move
  // ⊗ ai_negatives.c:562–571 — DOUBLES_ONLY: partner has Dazzling/Queenly Majesty; priority move
  // ⊗ ai_negatives.c:575–587 — DOUBLES_ONLY: attacker's partner has LightningRod; Electric move
  // ⊗ ai_negatives.c:589–598 — DOUBLES_ONLY: attacker's partner has StormDrain; Water move

  // ✓ ai_negatives.c:603–614 — Prankster: attacker has Prankster, status move, Dark-type target
  if (
    atk.ability === "Prankster" &&
    isStatusMove(m) &&
    getDefTypes(def).includes("Dark")
  ) {
    return -10;
  }

  // ✗ ai_negatives.c:619–628 — Electric Terrain + sleep/yawn move vs grounded target
  //   NEEDS_LIVE_STATE: terrain active, grounding status [DECREASE 10]

  // ✗ ai_negatives.c:630–639 — Misty Terrain + status/confusion move vs grounded target
  //   NEEDS_LIVE_STATE: terrain active, grounding status [DECREASE 10]

  // ✗ ai_negatives.c:641–650 — Psychic Terrain + priority move vs grounded target
  //   NEEDS_LIVE_STATE: terrain active, grounding status [DECREASE 10]

  // ✗ ai_negatives.c:656–663 — Good AI: Fire vs Powder-used target (75% RNG)
  //   NEEDS_LIVE_STATE: HasUsedMove(Powder), RNG [DECREASE 19]

  // ✗ ai_negatives.c:665–672 — Good AI: Normal vs Ion Deluge target with electric absorb (75% RNG)
  //   NEEDS_LIVE_STATE: HasUsedMove(Ion Deluge), RNG [DECREASE 19]

  // ✗ ai_negatives.c:673–678 — Good AI: Normal vs Plasma Fists target with electric absorb
  //   NEEDS_LIVE_STATE: gLastResultingMoves (last move used this turn) [DECREASE 19]

  // ⊗ ai_negatives.c:683–698 — DOUBLES_ONLY: spread status move + revealed Wide Guard (75% RNG)

  // ✗ ai_negatives.c:703–704 — Sound move while Throat Chopped (CantUseSoundMoves)
  //   NEEDS_LIVE_STATE: Throat Chop status on attacker [DECREASE to 0]

  // ✗ ai_negatives.c:707–708 — Healing move while Heal Blocked
  //   NEEDS_LIVE_STATE: Heal Block status on attacker [DECREASE to 0]

  // ✗ ai_negatives.c:711–714 — Raid Battle banned move
  //   NEEDS_LIVE_STATE: battle type flag [DECREASE to 0]

  // ✗ ai_negatives.c:716–717 — Raid Boss banned move
  //   NEEDS_LIVE_STATE: battle type flag, attacker identity [DECREASE to 0]

  // ✗ ai_negatives.c:720–726 — Raid Shields active + status move (non-attacker)
  //   NEEDS_LIVE_STATE: Raid shield state [DECREASE 10]

  // ✗ ai_negatives.c:729–733 — Primal Sun active + Water move (non-status)
  //   NEEDS_LIVE_STATE: gBattleWeather (primal sun) [DECREASE 20]

  // ✗ ai_negatives.c:734–738 — Primal Rain active + Fire move (non-status)
  //   NEEDS_LIVE_STATE: gBattleWeather (primal rain) [DECREASE 20]

  // ✗ ai_negatives.c:741–752 — Tag Battle: wild shiny target + damaging move
  //   NEEDS_LIVE_STATE: battle type flags, shiny flag, bag accessibility [DECREASE 20]

  // ── Effect-specific switch begins ──────────────────────────────────────────

  // ── Effect-switch checks ────────────────────────────────────────────────────
  // Checks below fire based on the move's effect constant in CFRU.
  // Most are NEEDS_LIVE_STATE; implementable ones have real code.

  // ✗ ai_negatives.c:760–781 — EFFECT_SLEEP: type calc no-effect, Dark Void non-Darkrai, can't sleep
  //   NEEDS_LIVE_STATE: type immunity, species, sleep status, sub, terrain [DECREASE 10]

  // ✗ ai_negatives.c:783–795 — EFFECT_ABSORB: LiquidOoze and won't OHKO
  //   NEEDS_LIVE_STATE: ability, OHKO calc [DECREASE 6]

  // ✗ ai_negatives.c:799–836 — EFFECT_EXPLOSION: Damp on field, semi-invuln, KO check
  //   NEEDS_LIVE_STATE: Damp ability, KO calcs, alive mon counts [DECREASE 10 or 4]

  // ✗ ai_negatives.c:839–842 — EFFECT_DREAM_EATER: target not asleep and not Comatose
  //   NEEDS_LIVE_STATE: target sleep status [DECREASE 10]

  // ✗ ai_negatives.c:847–877 — EFFECT_MIRROR_MOVE / Copycat / Mirror Move: last move unavailable
  //   NEEDS_LIVE_STATE: gNewBS->LastUsedMove, predicted move [DECREASE 10]

  // ✗ ai_negatives.c:881–883 — EFFECT_SPLASH: not a valid Z-Crystal usage
  //   NEEDS_LIVE_STATE: item, Z-move used flag [DECREASE 10]

  // ✗ ai_negatives.c:886–904 — EFFECT_TELEPORT: trainer battle with no switch-in
  //   NEEDS_LIVE_STATE: battle type, party state, trapped status [DECREASE 10]

  // ✗ ai_negatives.c:907–927 — EFFECT_ATTACK_UP / _UP_2: choice-locked, Contrary, stat maxed, no physical move
  //   NEEDS_LIVE_STATE: choice lock, stat stages, moveset [DECREASE 10]

  // ✗ ai_negatives.c:929–963 — EFFECT_DEFENSE_UP / _UP_2 / DEFENSE_CURL: choice-locked, Contrary, stat maxed
  //   NEEDS_LIVE_STATE: choice lock, type, consumed item, stat stages [DECREASE 10]

  // ✗ ai_negatives.c:965–971 — EFFECT_SPEED_UP / _UP_2: Contrary, stat maxed, choice-locked, Trick Room
  //   NEEDS_LIVE_STATE: choice lock, stat stages, Trick Room status [DECREASE 10]

  // ✗ ai_negatives.c:973–979 — EFFECT_SPECIAL_ATTACK_UP / _UP_2: Contrary, stat maxed, no special move
  //   NEEDS_LIVE_STATE: choice lock, stat stages, moveset [DECREASE 10]

  // ✗ ai_negatives.c:981–1001 — EFFECT_SPECIAL_DEFENSE_UP / _UP_2: choice-locked, Contrary, stat maxed
  //   NEEDS_LIVE_STATE: choice lock, stat stages [DECREASE 10]

  // ✗ ai_negatives.c:1003–1013 — EFFECT_ACCURACY_UP / _UP_2: Contrary, choice-locked, acc maxed
  //   NEEDS_LIVE_STATE: choice lock, stat stages, move accuracy [DECREASE 10 or 1]

  // ✗ ai_negatives.c:1016–1034 — EFFECT_EVASION_UP / MINIMIZE: Contrary, stat maxed
  //   NEEDS_LIVE_STATE: choice lock, stat stages [DECREASE 10]

  // ✗ ai_negatives.c:1036–1070 — EFFECT_ATK_SPATK_UP (Work Up): choice-locked, Contrary, stats maxed
  //   NEEDS_LIVE_STATE: choice lock, ability, stat stages, moveset [DECREASE 10]

  // ✗ ai_negatives.c:1072–1082 — EFFECT_ATK_ACC_UP (Hone Claws): Contrary, choice-locked, no physical
  //   NEEDS_LIVE_STATE: choice lock, stat stages, moveset [DECREASE 10]

  // ✗ ai_negatives.c:1084–1089 — EFFECT_DEF_SPD_UP (Shelter): Contrary, both stats maxed
  //   NEEDS_LIVE_STATE: choice lock, stat stages [DECREASE 10]

  // ✗ ai_negatives.c:1091–1112 — EFFECT_COSMIC_POWER: Contrary, Magnetic Flux no Plus/Minus, stats maxed
  //   NEEDS_LIVE_STATE: choice lock, ability, stat stages [DECREASE 10]

  // ✗ ai_negatives.c:1114–1133 — EFFECT_BULK_UP: Contrary, stats maxed, no physical move
  //   NEEDS_LIVE_STATE: choice lock, stat stages, moveset [DECREASE 10]

  // ✗ ai_negatives.c:1135–1162 — EFFECT_CALM_MIND / Quiver Dance / Geomancy: Contrary, stats maxed
  //   NEEDS_LIVE_STATE: choice lock, stat stages, Trick Room, status [DECREASE 10]

  // ✗ ai_negatives.c:1164–1193 — EFFECT_DRAGON_DANCE / Shell Smash / Shift Gear: Contrary, stats maxed
  //   NEEDS_LIVE_STATE: choice lock, stat stages, Trick Room [DECREASE 10]

  // ✗ ai_negatives.c:1196–1213 — EFFECT_EXTREME_EVOBOOST / No Retreat / Clangorous Soul: stats maxed
  //   NEEDS_LIVE_STATE: choice lock, stat stages, HP, No Retreat flag [DECREASE 10]

  // ✗ ai_negatives.c:1215–1224 — EFFECT_CHARGE: already charged, choice-locked, no Electric damaging move
  //   NEEDS_LIVE_STATE: STATUS3_CHARGED_UP, choice lock, moveset [DECREASE 10]

  // ✗ ai_negatives.c:1227–1238 — EFFECT_ATTACK_DOWN / _DOWN_2: target's Atk can't be lowered
  //   NEEDS_LIVE_STATE: stat stage, substitute, moveset [DECREASE 10]

  // ✗ ai_negatives.c:1240–1246 — EFFECT_TICKLE: Atk and Def can't both be lowered
  //   NEEDS_LIVE_STATE: stat stages, moveset [DECREASE 10]

  // ✗ ai_negatives.c:1248–1254 — EFFECT_PLAY_NICE: neither Atk nor SpAtk can be lowered
  //   NEEDS_LIVE_STATE: stat stages, moveset [DECREASE 10]

  // ✗ ai_negatives.c:1256–1266 — EFFECT_VENOM_DRENCH: target not poisoned, no stat can be lowered
  //   NEEDS_LIVE_STATE: poison status, stat stages [DECREASE 10]

  // ✗ ai_negatives.c:1268–1274 — EFFECT_DEFENSE_DOWN / _DOWN_2: Def can't be lowered
  //   NEEDS_LIVE_STATE: stat stage [DECREASE 10]

  // ✗ ai_negatives.c:1276–1282 — EFFECT_SPEED_DOWN / _DOWN_2: Speed can't be lowered
  //   NEEDS_LIVE_STATE: stat stage [DECREASE 10]

  // ✗ ai_negatives.c:1284–1293 — EFFECT_SPECIAL_ATTACK_DOWN / _DOWN_2: gender mismatch (Captivate), SpAtk can't fall
  //   NEEDS_LIVE_STATE: gender, stat stage, moveset [DECREASE 10]

  // ✗ ai_negatives.c:1296–1301 — EFFECT_SPECIAL_DEFENSE_DOWN / _DOWN_2: SpDef can't be lowered
  //   NEEDS_LIVE_STATE: stat stage [DECREASE 10]

  // ✗ ai_negatives.c:1304–1310 — EFFECT_ACCURACY_DOWN / _DOWN_2: Accuracy can't be lowered
  //   NEEDS_LIVE_STATE: stat stage [DECREASE 10]

  // ✗ ai_negatives.c:1312–1319 — EFFECT_EVASION_DOWN / _DOWN_2: Evasion can't be lowered
  //   NEEDS_LIVE_STATE: stat stage [DECREASE 10]

  // ✗ ai_negatives.c:1322–1356 — EFFECT_HAZE: net stat-reset benefit check
  //   NEEDS_LIVE_STATE: all stat stages [DECREASE 10]

  // ✗ ai_negatives.c:1358–1368 — EFFECT_BIDE: no damaging move, low HP, foe asleep/frozen
  //   NEEDS_LIVE_STATE: target moveset, HP%, target status [DECREASE 10]

  // ✗ ai_negatives.c:1372–1399 — EFFECT_ROAR / Dragon Tail / Circle Throw: no switch-in available
  //   NEEDS_LIVE_STATE: party state, secondary damage, root/ability status [DECREASE 10]

  // ✗ ai_negatives.c:1401–1452 — EFFECT_CONVERSION / Reflect Type: already matching type, sub blocks
  //   NEEDS_LIVE_STATE: current type state, sub status [DECREASE 10]

  // ✗ ai_negatives.c:1454–1500 — EFFECT_RESTORE_HP / MORNING_SUN: HP ≥ 90–100%, secondary damage stall
  //   NEEDS_LIVE_STATE: current HP%, status, secondary damage [DECREASE 10, 9, or 8]

  // ✗ ai_negatives.c:1502–1505 — EFFECT_REST: cannot rest (CanRest check)
  //   NEEDS_LIVE_STATE: sleep/HP state [DECREASE 10]

  // ✗ ai_negatives.c:1507–1525 — EFFECT_POISON / TOXIC: target immune, sub blocks, terrain covers
  //   NEEDS_LIVE_STATE: type, ability, sub, partner move, terrain [DECREASE 10]

  // ✗ ai_negatives.c:1528–1535 — EFFECT_LIGHT_SCREEN: already up, foe revealed Brick Break/Defog
  //   NEEDS_LIVE_STATE: side status, revealed move history [DECREASE 10 or 9]

  // ✗ ai_negatives.c:1538–1545 — EFFECT_0HKO: target Dynamaxed, type/accuracy no-effect, Sturdy, level
  //   NEEDS_LIVE_STATE: Dynamax state, level, type, ability [DECREASE 10]

  // ✗ ai_negatives.c:1547–1549 — EFFECT_RECOIL_IF_MISS: no MagicGuard, accuracy < 75
  //   NEEDS_LIVE_STATE: ability, accuracy calc [DECREASE 6]

  // ✗ ai_negatives.c:1552–1556 — EFFECT_MIST: mist already active, partner using same
  //   NEEDS_LIVE_STATE: side status, partner move [DECREASE 10]

  // ✗ ai_negatives.c:1558–1561 — EFFECT_FOCUS_ENERGY: already has it, partner max move gives crit bonus
  //   NEEDS_LIVE_STATE: STATUS2_FOCUS_ENERGY, partner move [DECREASE 10]

  // ✗ ai_negatives.c:1564–1595 — EFFECT_RECOIL: recoil would KO + foe has 2+ mons + another move can KO
  //   NEEDS_LIVE_STATE: ability, HP, alive count, KO calc [DECREASE 4 or 9]

  // ✗ ai_negatives.c:1597–1608 — EFFECT_CONFUSE: target immune to confusion, sub blocks, terrain
  //   NEEDS_LIVE_STATE: confusion immunity, sub status, partner move [DECREASE 10]

  // ✗ ai_negatives.c:1610–1614 — EFFECT_TRANSFORM: already transformed, or target has substitute
  //   NEEDS_LIVE_STATE: STATUS2_TRANSFORMED, STATUS2_SUBSTITUTE [DECREASE 10]

  // ✗ ai_negatives.c:1616–1636 — EFFECT_REFLECT / Aurora Veil: already active, partner same
  //   NEEDS_LIVE_STATE: side timers, hail weather, partner move [DECREASE 10 or 9]

  // ✗ ai_negatives.c:1639–1651 — EFFECT_PARALYZE: target immune, sub blocks, terrain, type calc
  //   NEEDS_LIVE_STATE: paralysis status, sub, partner move, terrain [DECREASE 10]

  // ✗ ai_negatives.c:1653–1661 — EFFECT_SUBSTITUTE: already has sub, HP ≤ 25%, shadow shield
  //   NEEDS_LIVE_STATE: sub status, HP% [DECREASE 10]
  if (moveName === "Substitute") {
    // ✓ ai_negatives.c:1659–1661 — target can bypass substitute (sound moves or Infiltrator)
    if (defBypassesSubstitute(def)) return -8;
  }

  // ✗ ai_negatives.c:1664–1669 — EFFECT_RECHARGE: not Truant, would KO, another move can KO
  //   NEEDS_LIVE_STATE: ability, KO calc, moveset [DECREASE 9]

  // ✗ ai_negatives.c:1671–1682 — EFFECT_SPITE: last-used move unavailable, predicted move NONE
  //   NEEDS_LIVE_STATE: last used moves, predicted move [DECREASE 10]

  // ✗ ai_negatives.c:1684–1698 — EFFECT_MIMIC: last/predicted move invalid or banned
  //   NEEDS_LIVE_STATE: last used moves, predicted move [DECREASE 10]

  // (ai_negatives.c:1700–1701) — EFFECT_METRONOME: no check

  // ✗ ai_negatives.c:1703–1711 — EFFECT_LEECH_SEED: target is Grass-type, already seeded, LiquidOoze
  //   NEEDS_LIVE_STATE: type, seed status, ability, partner move [DECREASE 10]

  // ✗ ai_negatives.c:1713–1729 — EFFECT_DISABLE: already disabled, last/predicted move unavailable
  //   NEEDS_LIVE_STATE: disable status, last used moves, predicted move, partner move [DECREASE 10]

  // ✗ ai_negatives.c:1731–1751 — EFFECT_COUNTER / MIRROR_COAT / Metal Burst: predicted status/NONE
  //   NEEDS_LIVE_STATE: predicted move split, sub status, last used moves, RNG [DECREASE 10 or 8]

  // ✗ ai_negatives.c:1753–1769 — EFFECT_ENCORE: already encored, Dynamaxed, last/predicted invalid
  //   NEEDS_LIVE_STATE: encore status, Dynamax, last used moves, predicted move [DECREASE 10]

  // ✗ ai_negatives.c:1771–1775 — EFFECT_ENDEAVOR: attacker HP > avg(atk+def) HP
  //   NEEDS_LIVE_STATE: current HP values [DECREASE 10]

  // ✗ ai_negatives.c:1778–1781 — EFFECT_PAIN_SPLIT: attacker HP > avg HP
  //   NEEDS_LIVE_STATE: current HP values [DECREASE 10]

  // ✗ ai_negatives.c:1783–1789 — EFFECT_SNORE: attacker not asleep and not Comatose
  //   NEEDS_LIVE_STATE: STATUS1_SLEEP value, ability [DECREASE 10]

  // ✗ ai_negatives.c:1791–1795 — EFFECT_SLEEP_TALK: attacker not asleep and not Comatose
  //   NEEDS_LIVE_STATE: STATUS1_SLEEP value, ability [DECREASE 10]

  // ✗ ai_negatives.c:1797–1799 — EFFECT_CONVERSION_2: no last-used type for target
  //   NEEDS_LIVE_STATE: gNewBS->LastUsedTypes [DECREASE 10]

  // ✗ ai_negatives.c:1802–1819 — EFFECT_LOCK_ON / Laser Focus: already locked, ShellArmor
  //   NEEDS_LIVE_STATE: laser focus flag, ability, STATUS3_LOCKON, partner move [DECREASE 10 or 8]

  // ✗ ai_negatives.c:1822–1827 — EFFECT_SKETCH: target last-used move is NONE
  //   NEEDS_LIVE_STATE: gLastUsedMoves [DECREASE 10]

  // ✗ ai_negatives.c:1829–1833 — EFFECT_DESTINY_BOND: already counting down / has status
  //   NEEDS_LIVE_STATE: DestinyBond counter, STATUS2_DESTINY_BOND [DECREASE 10]

  // ✗ ai_negatives.c:1835–1841 — EFFECT_FALSE_SWIPE: would KO and another move can KO
  //   NEEDS_LIVE_STATE: KO calc [DECREASE 10]

  // ✗ ai_negatives.c:1843–1853 — EFFECT_HEAL_BELL / Aromatherapy: no statused party member
  //   NEEDS_LIVE_STATE: party member status, partner move [DECREASE 10]

  // ✗ ai_negatives.c:1856–1864 — EFFECT_MEAN_LOOK: target already trapped, partner same
  //   NEEDS_LIVE_STATE: trap status, partner move [DECREASE 10]

  // ✗ ai_negatives.c:1866–1871 — EFFECT_NIGHTMARE: already has nightmare, not asleep, not Comatose
  //   NEEDS_LIVE_STATE: STATUS2_NIGHTMARE, sleep status, ability, partner move [DECREASE 10]

  // ✗ ai_negatives.c:1873–1898 — EFFECT_CURSE: Ghost (already cursed, HP ≤ 50%) / non-Ghost (stats maxed)
  //   NEEDS_LIVE_STATE: type, HP%, curse status, partner move, stat stages [DECREASE 10 or 6]

  // ✗ ai_negatives.c:1901–1974 — EFFECT_PROTECT / Quick Guard / Endure / King's Shield / etc
  //   NEEDS_LIVE_STATE: battle type, turn state, consecutive protect count, recharge, HP, secondary damage [DECREASE 10, 9, or 6]

  // ✗ ai_negatives.c:1976–2037 — EFFECT_SPIKES / Stealth Rock / Toxic Spikes / Sticky Web
  //   NEEDS_LIVE_STATE: hazard layer counts, revealed moves, partner move, alive count [DECREASE 10 or 9]

  // ✗ ai_negatives.c:2040–2062 — EFFECT_FORESIGHT / Miracle Eye: already applied, evasion not elevated
  //   NEEDS_LIVE_STATE: STATUS3_MIRACLE_EYED, STATUS2_FORESIGHT, evasion stage, type [DECREASE 10 or 9]

  // ✗ ai_negatives.c:2065–2091 — EFFECT_PERISH_SONG: already perish-songed, Soundproof, mon counts
  //   NEEDS_LIVE_STATE: alive count, Soundproof, STATUS3_PERISH_SONG, partner move [DECREASE 10]

  // ✗ ai_negatives.c:2093–2097 — EFFECT_SANDSTORM: weather already active, partner conflict
  //   NEEDS_LIVE_STATE: weather state, partner move/ability [DECREASE 10]

  // ✗ ai_negatives.c:2100–2108 — EFFECT_SWAGGER: targeting partner with Contrary
  //   NEEDS_LIVE_STATE: ability, targeting partner, confusion checks [DECREASE 10]

  // ✗ ai_negatives.c:2110–2115 — EFFECT_ATTRACT: gender mismatch, partner same
  //   NEEDS_LIVE_STATE: gender, ability, partner move [DECREASE 10]

  // ✗ ai_negatives.c:2117–2121 — EFFECT_SAFEGUARD: already active, partner same
  //   NEEDS_LIVE_STATE: side status, battle flag, partner move [DECREASE 10]

  // ✓ ai_negatives.c:2124–2128 — EFFECT_BURN_UP: attacker must be Fire-type
  if (moveName === "Burn Up" && !getAtkTypes(atk).includes("Fire")) {
    return -10;
  }

  // ✗ ai_negatives.c:2131–2171 — EFFECT_BATON_PASS / U-turn / Volt Switch / Parting Shot
  //   NEEDS_LIVE_STATE: party switch availability, ability, stat stages [DECREASE 10 or 6]

  // ✗ ai_negatives.c:2174–2208 — EFFECT_RAPID_SPIN / Defog: foe hazards check, partner move
  //   NEEDS_LIVE_STATE: side statuses, partner move, move order [DECREASE 10]

  // ✗ ai_negatives.c:2210–2215 — EFFECT_RAIN_DANCE: rain already active, Evaporate ability on field
  //   NEEDS_LIVE_STATE: weather state, partner move/ability [DECREASE 10]

  // ✗ ai_negatives.c:2218–2223 — EFFECT_SUNNY_DAY: sun already active, partner conflict
  //   NEEDS_LIVE_STATE: weather state, partner move/ability [DECREASE 10]

  // ✗ ai_negatives.c:2225–2229 — EFFECT_BELLY_DRUM: Contrary, HP ≤ 50%
  //   NEEDS_LIVE_STATE: ability, current HP% [DECREASE 10]

  // ✗ ai_negatives.c:2232–2237 — EFFECT_PSYCH_UP (non-Spectral Thief): via HAZE check
  //   NEEDS_LIVE_STATE: stat stages [DECREASE 10]

  // ✗ ai_negatives.c:2239–2244 — EFFECT_FUTURE_SIGHT: future sight counter non-zero
  //   NEEDS_LIVE_STATE: gWishFutureKnock.futureSightCounter [DECREASE 10]

  // ✗ ai_negatives.c:2246–2303 — EFFECT_SEMI_INVULNERABLE / Solar Beam / Razor Wind / Skull Bash / Sky Attack
  //   NEEDS_LIVE_STATE: item (Power Herb), secondary damage, predicted move, KO calcs, speed [DECREASE 10, 8, or 4]

  // ✗ ai_negatives.c:2306–2319 — EFFECT_FAKE_OUT: not first turn, choice-locked
  //   NEEDS_LIVE_STATE: isFirstTurn flag, choice lock, alive count, KO calc [DECREASE 10]

  // ✗ ai_negatives.c:2321–2324 — EFFECT_STOCKPILE: stockpile counter ≥ 3
  //   NEEDS_LIVE_STATE: stockpile counter [DECREASE 10]

  // ✗ ai_negatives.c:2326–2330 — EFFECT_SPIT_UP: stockpile counter = 0
  //   NEEDS_LIVE_STATE: stockpile counter [DECREASE 10]

  // ✗ ai_negatives.c:2333–2337 — EFFECT_SWALLOW: stockpile counter = 0
  //   NEEDS_LIVE_STATE: stockpile counter [DECREASE 10]

  // ✗ ai_negatives.c:2340–2345 — EFFECT_HAIL: hail already active, partner conflict
  //   NEEDS_LIVE_STATE: weather state, partner move/ability [DECREASE 10]

  // ✗ ai_negatives.c:2347–2357 — EFFECT_TORMENT: already taunted, partner same, mental herb
  //   NEEDS_LIVE_STATE: torment status, partner move, item [DECREASE 10 or 6]

  // ✗ ai_negatives.c:2359–2367 — EFFECT_FLATTER: targeting partner with Contrary
  //   NEEDS_LIVE_STATE: ability, targeting, confusion checks [DECREASE 10]

  // ✗ ai_negatives.c:2369–2376 — EFFECT_WILL_O_WISP: can't burn, sub blocks, terrain
  //   NEEDS_LIVE_STATE: burn status, sub, partner move, terrain [DECREASE 10]

  // ✗ ai_negatives.c:2378–2405 — EFFECT_MEMENTO / Healing Wish / Lunar Dance / Final Gambit
  //   NEEDS_LIVE_STATE: party state, partner move, sub, stat stages [DECREASE 10]

  // ✗ ai_negatives.c:2407–2428 — EFFECT_FOCUS_PUNCH / Shell Trap / Beak Blast
  //   NEEDS_LIVE_STATE: predicted move contact/split, sub status [DECREASE 10]

  // ✗ ai_negatives.c:2431–2432 — EFFECT_NATURE_POWER: recursively evaluate via terrain
  //   NEEDS_LIVE_STATE: gTerrainType / location [recursive]

  // ✗ ai_negatives.c:2434–2439 — EFFECT_TAUNT: already taunted, Oblivious, partner same
  //   NEEDS_LIVE_STATE: taunt status, ability, partner move [DECREASE 10]

  // ⊗ ai_negatives.c:2441–2450 — DOUBLES_ONLY: Follow Me / Helping Hand checks

  // ✗ ai_negatives.c:2452–2470 — EFFECT_TRICK / Bestow: no item, Sticky Hold, same item
  //   NEEDS_LIVE_STATE: item state, ability [DECREASE 10]

  // ✓ ai_negatives.c:2472–2481 — EFFECT_ROLE_PLAY: same ability, no ability, or role-play-banned ability
  if (moveName === "Role Play") {
    if (
      !defAbility ||
      defAbility === atk.ability ||
      ROLE_PLAY_BANNED_ABILITIES.has(defAbility)
    ) return -10;
  }

  // ✗ ai_negatives.c:2483–2485 — EFFECT_WISH: wish counter already counting down
  //   NEEDS_LIVE_STATE: gWishFutureKnock.wishCounter [DECREASE 10]

  // ✗ ai_negatives.c:2488–2502 — EFFECT_ASSIST: no other party member alive
  //   NEEDS_LIVE_STATE: party state [DECREASE 10]

  // ✗ ai_negatives.c:2504–2514 — EFFECT_INGRAIN / Aqua Ring: already rooted / already has Aqua Ring
  //   NEEDS_LIVE_STATE: STATUS3_ROOTED, STATUS3_AQUA_RING [DECREASE 10]

  // ✓ ai_negatives.c:2517–2521 — EFFECT_HYPERSPACE_FURY: attacker must be Hoopa-Unbound
  if (moveName === "Hyperspace Fury" && atk.species !== "Hoopa-Unbound") {
    return -10;
  }

  // ✓ ai_negatives.c:2524–2527 — EFFECT_MAGIC_COAT: target has no reflectable moves
  if (moveName === "Magic Coat") {
    const defHasReflectable = def.moves.some((mn) => {
      if (!mn) return false;
      const dm = getSmogonMove(mn);
      return dm ? isReflectableMove(dm) : false;
    });
    if (!defHasReflectable) return -10;
  }

  // ✗ ai_negatives.c:2529–2538 — EFFECT_RECYCLE / Belch: no consumed berry / no saved item
  //   NEEDS_LIVE_STATE: canBelch flag, SavedConsumedItems, held item [DECREASE 10]

  // ✗ ai_negatives.c:2541–2545 — EFFECT_YAWN: target already has Yawn or is asleep
  //   NEEDS_LIVE_STATE: STATUS3_YAWN, sleep status [DECREASE 10]

  // ✗ ai_negatives.c:2548–2566 — EFFECT_KNOCK_OFF / Corrosive Gas: item effects, choice lock
  //   NEEDS_LIVE_STATE: item effects, move reveals, choice lock [DECREASE 10 or 9]

  // ✗ ai_negatives.c:2569–2625 — EFFECT_SKILL_SWAP / Worry Seed / Gastro Acid / Entrainment / Simple Beam
  //   NEEDS_LIVE_STATE: abilities, sub status, Dynamax state [DECREASE 10]

  // ✗ ai_negatives.c:2627–2630 — EFFECT_IMPRISON: attacker already imprisoned
  //   NEEDS_LIVE_STATE: STATUS3_IMPRISONED [DECREASE 10]

  // ✗ ai_negatives.c:2632–2665 — EFFECT_REFRESH / Psycho Shift: no status condition
  //   NEEDS_LIVE_STATE: attacker status condition [DECREASE 10]

  // ✓ ai_negatives.c:2667–2671 — EFFECT_SNATCH: target has no snatchable moves, partner same
  if (moveName === "Snatch") {
    const defHasSnatchable = def.moves.some((mn) => {
      if (!mn) return false;
      const dm = getSmogonMove(mn);
      return dm ? isSnatchableMove(dm) : false;
    });
    if (!defHasSnatchable) return -10;
  }

  // ✗ ai_negatives.c:2674–2677 — EFFECT_MUD_SPORT: mud sport already active, partner same
  //   NEEDS_LIVE_STATE: Mud Sport field state [DECREASE 10]

  // ✗ ai_negatives.c:2680–2683 — EFFECT_WATER_SPORT: water sport already active, partner same
  //   NEEDS_LIVE_STATE: Water Sport field state [DECREASE 10]

  // ✗ ai_negatives.c:2686–2783 — EFFECT_STAT_SWAP_SPLIT / Power Trick / Power Swap / Guard Swap / etc
  //   NEEDS_LIVE_STATE: choice lock, stat stages, stat values, Trick Room [DECREASE 10]

  // ✗ ai_negatives.c:2787–2796 — EFFECT_ME_FIRST: predicted move NONE, not going first
  //   NEEDS_LIVE_STATE: predicted move, move order [DECREASE 10 or recursive]

  // ✗ ai_negatives.c:2798–2805 — EFFECT_NATURAL_GIFT: Klutz, Magic Room, non-berry item
  //   NEEDS_LIVE_STATE: ability, Magic Room state, held item [DECREASE 10]

  // ✗ ai_negatives.c:2807–2833 — EFFECT_SET_TERRAIN: partner using terrain, terrain already set
  //   NEEDS_LIVE_STATE: current terrain, partner move, battle flags [DECREASE 10]

  // ⊗ ai_negatives.c:2835–2852 — DOUBLES_ONLY: EFFECT_PLEDGE partner using pledge + sleeping/frozen

  // ✗ ai_negatives.c:2854–2913 — EFFECT_FIELD_EFFECTS: Trick Room, Magic Room, Wonder Room, Gravity, etc
  //   NEEDS_LIVE_STATE: field effects active, speed averages, partner move [DECREASE 10]

  // ✗ ai_negatives.c:2916–2940 — EFFECT_FLING: can't fling item; status secondary checks
  //   NEEDS_LIVE_STATE: item state, ability, sub/status checks [DECREASE 10]

  // ✗ ai_negatives.c:2942–2983 — EFFECT_ATTACK_BLOCKERS: Embargo / Powder / Telekinesis / Heal Block
  //   NEEDS_LIVE_STATE: item/ability states, moveset, embargo timer, partner move [DECREASE 10]

  // ✗ ai_negatives.c:2986–3018 — EFFECT_TYPE_CHANGES: Soak / Trick-or-Treat / Forest's Curse
  //   NEEDS_LIVE_STATE: current type state, partner move [DECREASE 10]

  // ⊗ ai_negatives.c:3020–3041 — DOUBLES_ONLY: EFFECT_HEAL_TARGET (Pollen Puff on partner)

  // ✗ ai_negatives.c:3044–3071 — EFFECT_TOPSY_TURVY / Electrify: move order, type, stat stages
  //   NEEDS_LIVE_STATE: move order, type state, stat stages, partner move [DECREASE 10 or 5]

  // ✗ ai_negatives.c:3074–3111 — EFFECT_FAIRY_LOCK / Happy Hour / Celebrate: Fairy Lock state, Z-crystal
  //   NEEDS_LIVE_STATE: Fairy Lock state, battle type, Z-move used flag [DECREASE 10]

  // ✗ ai_negatives.c:3113–3168 — EFFECT_INSTRUCT / After You / Quash: move validity, Dynamax, lock state
  //   NEEDS_LIVE_STATE: move validity, move order, partner identity [DECREASE 10 or 5]

  // ✗ ai_negatives.c:3170–3177 — EFFECT_SUCKER_PUNCH: no damaging moves, wrong timing
  //   NEEDS_LIVE_STATE: target moveset, predicted move status [DECREASE 10 or 9]

  // ✗ ai_negatives.c:3179–3203 — EFFECT_TEAM_EFFECTS: Tailwind / Lucky Chant / Magnet Rise
  //   NEEDS_LIVE_STATE: Tailwind/chant timers, Gravity/MagnetRise state, item, status [DECREASE 10]

  // ✗ ai_negatives.c:3205–3208 — EFFECT_CAMOUFLAGE: attacker already has Camouflage type
  //   NEEDS_LIVE_STATE: attacker's current type [DECREASE 10]

  // ✗ ai_negatives.c:3210–3215 — EFFECT_LAST_RESORT: not all other moves used (PP check)
  //   NEEDS_LIVE_STATE: PP of other moves [DECREASE 10]

  // ✗ ai_negatives.c:3217–3226 — EFFECT_SKY_DROP: faint from weather, sub blocks, target ≥ 200 kg
  //   NEEDS_LIVE_STATE: weather remaining, sub status, species weight, partner move [DECREASE 10]

  // ✗ ai_negatives.c:3228–3236 — EFFECT_DAMAGE_SET_TERRAIN (Steel Roller): no terrain active
  //   NEEDS_LIVE_STATE: current terrain, partner move [DECREASE 10]

  // ✗ ai_negatives.c:3238–3243 — EFFECT_POLTERGEIST: target has no item or Sticky Hold
  //   NEEDS_LIVE_STATE: target item state [DECREASE 10]

  // ── Standard damage type effectiveness check (default case) ─────────────────

  // ✓ ai_negatives.c:3246–3251 — AI_STANDARD_DAMAGE: not a status move; type gives NO_EFFECT
  if (moveCat !== "Status") {
    const ratio = damageRatio(atk, def, moveName);
    if (ratio === 0) return -15;
  }

  // ⊗ ai_negatives.c:3255–3259 — DOUBLES_ONLY: partner using Helping Hand + attacker using status move

  // ✗ ai_negatives.c:3351–3356 — AIScript_FirstBattle: target HP < 20% and move is not status (tutor)
  //   NEEDS_LIVE_STATE: target HP% [DECREASE 20]

  return 0;
}

// ── AIScript_Positives ────────────────────────────────────────────────────────
//
// Returns total score ADJUSTMENT from the positives script (usually ≥ 0).
// currentViability is the score after clamping negatives (used by some checks).

function aiScript_Positives(
  atk: CalcSideState,
  def: CalcSideState,
  moveName: string,
  m: Move,
  defAbility: string,
  moveType: string,
  moveCat: string,
  allAtkMoves: string[],
  _currentViability: number,
): number {
  // ✗ ai_positives.c:74–78 — EFFECT_SLEEP / YAWN: IncreaseSleepViability (class-dependent)
  //   NEEDS_LIVE_STATE: target sleep status, terrain, HP, class [INCREASE class-based]

  // ✗ ai_positives.c:80–93 — EFFECT_ABSORB / DREAM_EATER: ShouldRecover HP drain check
  //   NEEDS_LIVE_STATE: HP%, class [INCREASE 2/3/5/16]

  // ✗ ai_positives.c:96–110 — EFFECT_PARALYZE_HIT / BURN_HIT / POISON_HIT / FREEZE_HIT (secondary ≥ 75%)
  //   NEEDS_LIVE_STATE: secondary chance, sub status [jump to status checks]

  // ✗ ai_positives.c:117–148 — EFFECT_EXPLOSION: predicted Protect, gem item, Custap Berry, KO-only
  //   NEEDS_LIVE_STATE: predicted move, item, HP%, KO calcs [INCREASE 4]

  // ✗ ai_positives.c:151–192 — EFFECT_MIRROR_MOVE / Copycat: recurse on last-used or predicted move
  //   NEEDS_LIVE_STATE: gNewBS->LastUsedMove, predicted move [recursive]

  // ✗ ai_positives.c:196–261 — EFFECT_ATTACK_UP / DEFENSE_UP / SPEED_UP / SPATK_UP / SPDEF_UP / ACC_UP:
  //   GoodIdeaToRaise* checks
  //   NEEDS_LIVE_STATE: stat stages, class, foe moveset [INCREASE stat-viability]

  // ✗ ai_positives.c:263–297 — EFFECT_EVASION_UP / MINIMIZE / Acupressure: GoodIdeaToRaiseEvasion
  //   NEEDS_LIVE_STATE: stat stages, RNG [INCREASE stat-viability]

  // ✗ ai_positives.c:299–351 — EFFECT_ATK_SPATK_UP / ATK_ACC_UP / DEF_SPD_UP / COSMIC_POWER / BULK_UP:
  //   NEEDS_LIVE_STATE: stat stages, moveset [INCREASE stat-viability]

  // ✗ ai_positives.c:353–423 — EFFECT_CALM_MIND / DRAGON_DANCE / EXTREME_EVOBOOST / DEFENSE_CURL:
  //   NEEDS_LIVE_STATE: item, Z-move state, target incapacitation, stat stages [INCREASE stat-viability]

  // ✓ ai_positives.c:478–483 — EFFECT_CHARGE: Electric damaging move in attacker's moveset → +2
  if (moveName === "Charge") {
    const hasElectric = allAtkMoves.some((mn) => {
      const dm = getSmogonMove(mn);
      return dm && dm.type === "Electric" && dm.category !== "Status";
    });
    if (hasElectric) return 2;
  }

  // ✓ ai_positives.c:485–491 — EFFECT_STOCKPILE: Swallow or Spit-Up in moveset → +2
  if (moveName === "Stockpile") {
    const hasPair = allAtkMoves.some(
      (mn) => mn === "Swallow" || mn === "Spit Up"
    );
    if (hasPair) return 2;
  }

  // ✗ ai_positives.c:494–563 — EFFECT_ATTACK_DOWN / DEFENSE_DOWN / SPEED_DOWN / SPATK_DOWN / SPDEF_DOWN /
  //   ACC_DOWN / EVA_DOWN / PLAY_NICE / VENOM_DRENCH / TICKLE: GoodIdeaToLower* checks
  //   NEEDS_LIVE_STATE: target stat stages, moveset [INCREASE 1 or 2]

  // ✗ ai_positives.c:565–582 — EFFECT_HAZE: ShouldPhaze (stat stages)
  //   NEEDS_LIVE_STATE: stat stages, class [INCREASE 1/2/8/12/15]

  // ✗ ai_positives.c:592–607 — EFFECT_ROAR: ShouldPhaze, KO calc, priority
  //   NEEDS_LIVE_STATE: sub status, KO calc, priority, class [INCREASE 1/2/8/16]

  // ✗ ai_positives.c:609–625 — EFFECT_MULTI_HIT / TRIPLE_KICK / DOUBLE_HIT: sweeper + sub/flinch item
  //   NEEDS_LIVE_STATE: class, strongest move calc, sub/flinch state [INCREASE 3]

  // ✓ ai_positives.c:627–632 — EFFECT_CONVERSION (regular): sweeper class, attacker doesn't already have
  //   first-move's type → +1
  //   ~ approximated: no class tracking; we check whether atk already has move's type
  if (moveName === "Conversion" && allAtkMoves.length > 0) {
    const firstMoveType = (() => {
      const dm = getSmogonMove(allAtkMoves[0]);
      return dm ? dm.type : null;
    })();
    if (firstMoveType && !getAtkTypes(atk).includes(firstMoveType)) {
      return 1;
    }
  }

  // ✗ ai_positives.c:634–650 — EFFECT_FLINCH_HIT: can be flinched + Serene Grace / paralyzed / confused
  //   NEEDS_LIVE_STATE: flinch immunity, ability, status conditions, 2HKO calc [INCREASE 3]

  // ✗ ai_positives.c:652–689 — EFFECT_RESTORE_HP / MORNING_SUN / TOXIC / POISON (AI_RECOVER / AI_POISON):
  //   ShouldRecover, class, secondary damage, moveset checks
  //   NEEDS_LIVE_STATE: HP%, secondary damage, class, moveset, ability [INCREASE 1/2/3/8/16]

  // ✗ ai_positives.c:691–718 — EFFECT_REST: HP, resistance to foe, secondary damage, moveset, ability
  //   NEEDS_LIVE_STATE: HP, all-move resistance, secondary damage, moveset, ability, item, weather [INCREASE via recover]

  // ✗ ai_positives.c:721–731 — EFFECT_TRAP: Rapid Spin/Ghost-type/trapped → skip; else ShouldTrap → +7
  //   NEEDS_LIVE_STATE: trap status, target type [INCREASE 7]

  // ✗ ai_positives.c:733–744 — EFFECT_MIST: screener class → +6; doubles team support → +8
  //   NEEDS_LIVE_STATE: battle type, alive count, class [INCREASE 6 or 8]

  // ✓ ai_positives.c:746–753 — EFFECT_FOCUS_ENERGY: Super Luck/Sniper ability or Scope Lens item → +2; else +1
  if (moveName === "Focus Energy") {
    if (
      ["Super Luck", "Sniper"].includes(atk.ability) ||
      atk.item === "Scope Lens"
    ) return 2;
    return 1;
  }

  // ✗ ai_positives.c:755–768 — EFFECT_CONFUSE: can be confused + frontier-cured / paralyzed / Serene Grace
  //   NEEDS_LIVE_STATE: confusion status, paralysis, infatuation, ability, moveset [INCREASE 1 or 2]

  // ✗ ai_positives.c:770–798 — EFFECT_REFLECT / LIGHT_SCREEN / Aurora Veil: ShouldSetUpScreens
  //   NEEDS_LIVE_STATE: hail weather, class [INCREASE 2/7/8/15]

  // ✗ ai_positives.c:800–817 — EFFECT_PARALYZE: IncreaseViabilityForSpeedControl
  //   NEEDS_LIVE_STATE: paralysis immunity, speed comparison, status conditions, moveset [INCREASE 1 or 2]

  // ✗ ai_positives.c:828–884 — EFFECT_ATK_DOWN_HIT / DEF_DOWN_HIT / SPD_DOWN_HIT / etc (secondary ≥ 50%):
  //   NEEDS_LIVE_STATE: secondary chance, sub, battle type, class [INCREASE via stat-down checks]

  // ✗ ai_positives.c:886–888 — EFFECT_SUBSTITUTE: IncreaseSubstituteViability (class-based)
  //   NEEDS_LIVE_STATE: HP%, class [INCREASE class-based]

  // ✗ ai_positives.c:890–912 — EFFECT_MIMIC: KO with last-used move, Imprison in moveset
  //   NEEDS_LIVE_STATE: gLastUsedMoves, predicted move, KO calc, moveset [INCREASE 1 or 2]

  // ✓ ai_positives.c:914–923 — EFFECT_LEECH_SEED: not Grass, not seeded, no LiquidOoze, no MagicGuard → +3
  //   ~ approximated: no seeded/Rapid Spin status; checks type and key abilities
  if (moveName === "Leech Seed") {
    const defTypes = getDefTypes(def);
    if (
      !defTypes.includes("Grass") &&
      defAbility !== "Liquid Ooze" &&
      defAbility !== "Magic Guard"
    ) return 3;
  }

  // ✗ ai_positives.c:925–928 — EFFECT_SPLASH: valid Z-Crystal and not used → +9
  //   NEEDS_LIVE_STATE: Z-move used flag, item [INCREASE 9]

  // ✗ ai_positives.c:930–933 — EFFECT_TELEPORT: trainer battle → pivot check
  //   NEEDS_LIVE_STATE: battle type, pivot conditions [redirect]

  // ✗ ai_positives.c:935–953 — EFFECT_DISABLE: last-used = predicted, KO threat
  //   NEEDS_LIVE_STATE: disable status, last used move, predicted move, KO calc [INCREASE 1/2/3]

  // ✗ ai_positives.c:955–969 — EFFECT_ENCORE: last-used/predicted is status or no-effect → +3
  //   NEEDS_LIVE_STATE: encore status, last used move, predicted move split [INCREASE 3]

  // ✗ ai_positives.c:971–980 — EFFECT_PAIN_SPLIT: new shared HP > 120% of attacker's → drain check
  //   NEEDS_LIVE_STATE: current HP values [INCREASE via recover]

  // ✗ ai_positives.c:982–985 — EFFECT_SNORE / SLEEP_TALK: attacker is asleep → +10
  //   NEEDS_LIVE_STATE: sleep status [INCREASE 10]

  // ✗ ai_positives.c:988–1009 — EFFECT_LOCK_ON / Laser Focus: KO check, speed, OHKO move in moveset
  //   NEEDS_LIVE_STATE: KO calcs, speed, moveset [INCREASE 1 or 2]

  // ✗ ai_positives.c:1012–1014 — EFFECT_SPEED_UP_1_HIT (secondary ≥ 75%): Speed Plus check
  //   NEEDS_LIVE_STATE: secondary chance [INCREASE via speed check]

  // ✗ ai_positives.c:1017–1028 — EFFECT_DESTINY_BOND: foe can KO → +3
  //   NEEDS_LIVE_STATE: move order, KO calcs [INCREASE 3]

  // ✗ ai_positives.c:1030–1038 — EFFECT_SPITE: predicted move with ≤ 4 PP → +3
  //   NEEDS_LIVE_STATE: predicted move, PP values [INCREASE 3]

  // ✗ ai_positives.c:1040–1043 — EFFECT_HEAL_BELL: ShouldUseWishAromatherapy → +7
  //   NEEDS_LIVE_STATE: party status conditions, class [INCREASE 7]

  // ✗ ai_positives.c:1045–1090 — EFFECT_THIEF: no attacker item, target has item, sweeper class
  //   NEEDS_LIVE_STATE: item states, moveset, type, class [INCREASE 1 or 2]

  // ✗ ai_positives.c:1092–1096 — EFFECT_MEAN_LOOK: target not trapped → AI_TRAP → +7
  //   NEEDS_LIVE_STATE: trap status [INCREASE 7]

  // ✗ ai_positives.c:1098–1103 — EFFECT_NIGHTMARE: Comatose or asleep → +3
  //   NEEDS_LIVE_STATE: ability, sleep status [INCREASE 3]

  // ✗ ai_positives.c:1105–1130 — EFFECT_CURSE: Ghost trapped → +3; non-Ghost stat viability
  //   NEEDS_LIVE_STATE: type, trap status, ability, moveset, stat stages [INCREASE 1/2/3]

  // ✗ ai_positives.c:1132–1281 — EFFECT_PROTECT / Endure / Baneful Bunker / King's Shield / etc
  //   NEEDS_LIVE_STATE: predicted move priority/target/contact, first-turn, HP, item, Dynamax, class [INCREASE class-based]

  // ✗ ai_positives.c:1283–1379 — EFFECT_SPIKES / Sticky Web / Stealth Rock / Toxic Spikes
  //   NEEDS_LIVE_STATE: party data, hazard immunity, grounding, speed comparison [INCREASE hazards score]

  // ✗ ai_positives.c:1381–1400 — EFFECT_FORESIGHT / Miracle Eye: high evasion, type, moveset, Scrappy
  //   NEEDS_LIVE_STATE: evasion stage, type, moveset, ability [INCREASE 2]

  // ✗ ai_positives.c:1402–1405 — EFFECT_PERISH_SONG: target is trapped → +3
  //   NEEDS_LIVE_STATE: trap status [INCREASE 3]

  // ✗ ai_positives.c:1407–1438 — EFFECT_SANDSTORM: Z-crystal, Sand Rush, ability/type benefits
  //   NEEDS_LIVE_STATE: Z-move state, item, ability, type, moveset [INCREASE 2 or 17]

  // ✗ ai_positives.c:1440–1443 — EFFECT_ROLLOUT: sweeper + defense-curled → +8
  //   NEEDS_LIVE_STATE: STATUS2_DEFENSE_CURL, class [INCREASE 8]

  // ✓ ai_positives.c:1446–1459 — EFFECT_SWAGGER: Foul Play or Psych-Up in moveset → +2; else confuse check
  if (moveName === "Swagger") {
    if (allAtkMoves.includes("Foul Play") || allAtkMoves.includes("Psych Up")) return 2;
  }

  // ✓ ai_positives.c:1454–1459 — EFFECT_FLATTER: Psych-Up in moveset → +2; else confuse check
  if (moveName === "Flatter") {
    if (allAtkMoves.includes("Psych Up")) return 2;
  }

  // ✓ ai_positives.c:1461–1465 — EFFECT_FURY_CUTTER: singles + sweeper class + Metronome item → +3
  //   ~ approximated: no class tracking; check Metronome item only
  if (moveName === "Fury Cutter" && atk.item === "Metronome") {
    return 3;
  }

  // ✗ ai_positives.c:1468–1479 — EFFECT_ATTRACT: secondary damage, status, confusion, trap → +1 or +2
  //   NEEDS_LIVE_STATE: secondary damage, status, confusion, trap [INCREASE 1 or 2]

  // ✗ ai_positives.c:1482–1494 — EFFECT_SAFEGUARD: team-support class, not Misty Terrain
  //   NEEDS_LIVE_STATE: class, terrain, alive count [INCREASE 1 or 8]

  // ✗ ai_positives.c:1496–1541 — EFFECT_BATON_PASS / U-turn / Volt Switch / Flip Turn / Parting Shot
  //   NEEDS_LIVE_STATE: switch availability, Intimidate, class, foe moveset [INCREASE 3/16/18 or DECREASE 9]

  // ✗ ai_positives.c:1544–1552 — EFFECT_PURSUIT: foe predicted to switch, or pursuitable predicted move
  //   NEEDS_LIVE_STATE: switch prediction, predicted move [INCREASE 3]

  // ✗ ai_positives.c:1554–1601 — EFFECT_RAPID_SPIN / Defog: own hazards, foe screens, leech/wrap status
  //   NEEDS_LIVE_STATE: side status, party count, partner move [INCREASE 3]

  // ✗ ai_positives.c:1603–1668 — EFFECT_RAIN_DANCE / SUNNY_DAY: Z-crystal, Swift Swim/Chlorophyll, benefits
  //   NEEDS_LIVE_STATE: Z-move state, item, ability, moveset [INCREASE 2 or 17]

  // ✗ ai_positives.c:1670–1704 — EFFECT_ATTACK_UP_HIT (Fell Stinger etc) / HIGHER_OFFENSES_DEFENSES_UP_HIT
  //   NEEDS_LIVE_STATE: stat stages, KO calc, secondary chance [INCREASE 3/6/9]

  // ✗ ai_positives.c:1706–1717 — EFFECT_BELLY_DRUM: Z-crystal, class, ability, not bad idea
  //   NEEDS_LIVE_STATE: item, Z-move state, ability, class [INCREASE stat-viability 2 or 5]

  // ✗ ai_positives.c:1719–1762 — EFFECT_PSYCH_UP / SEMI_INVULNERABLE / FAKE_OUT
  //   NEEDS_LIVE_STATE: stat stages, class, predicted move, semi-invuln status [INCREASE 3]

  // ✗ ai_positives.c:1772–1813 — EFFECT_HAIL: Aurora Veil in moveset, Z-crystal, Slush Rush, benefits
  //   NEEDS_LIVE_STATE: moveset, Z-move state, item, ability [INCREASE 2/8/17]

  // ✗ ai_positives.c:1816–1821 — EFFECT_TORMENT: target has choice item/ability → +2
  //   NEEDS_LIVE_STATE: target item/ability [INCREASE 2]

  // ✗ ai_positives.c:1823–1847 — EFFECT_WILL_O_WISP / AI_BURN_CHECKS: not bad to burn, physical moves
  //   NEEDS_LIVE_STATE: burn immunity, moveset, KO calc, class [INCREASE 1/2/3/11]

  // ✗ ai_positives.c:1849–1851 — EFFECT_MEMENTO: → −5 (bad move in positives file too)
  //   NEEDS_LIVE_STATE: — [DECREASE 5]

  // ⊗ ai_positives.c:1854–1871 — DOUBLES_ONLY: EFFECT_FOLLOW_ME / Rage Powder

  // ✗ ai_positives.c:1873–1874 — EFFECT_NATURE_POWER: recursively evaluate
  //   NEEDS_LIVE_STATE: gTerrainType [recursive]

  // ✗ ai_positives.c:1876–1910 — EFFECT_TAUNT: foe sleeping, choice-locked, predicted status, Wide Guard
  //   NEEDS_LIVE_STATE: sleep status, choice state, predicted move, moveset, class [INCREASE 2/3/13/15]

  // ✗ ai_positives.c:1912–2015 — EFFECT_TRICK: item matching (Choice Band/Toxic Orb/Flame Orb/etc)
  //   NEEDS_LIVE_STATE: item states, weather, Dynamax state [INCREASE 1/2/3]

  // (ai_positives.c:2017–2019) — EFFECT_ROLE_PLAY: no check

  // ✗ ai_positives.c:2021–2026 — EFFECT_WISH: ShouldUseWishAromatherapy → +7; else recover check
  //   NEEDS_LIVE_STATE: HP%, party state, class [INCREASE 7]

  // ✓ ai_positives.c:2028–2033 — EFFECT_INGRAIN / AQUA_RING: Big Root item → +2; else +1
  if (moveName === "Ingrain" || moveName === "Aqua Ring") {
    return atk.item === "Big Root" ? 2 : 1;
  }

  // ✗ ai_positives.c:2035–2055 — EFFECT_SUPERPOWER / OVERHEAT: Contrary stat viability, pivot check
  //   NEEDS_LIVE_STATE: ability, item, stat stages [INCREASE stat]

  // ✗ ai_positives.c:2057–2060 — EFFECT_MAGIC_COAT: predicted move is status → +3
  //   NEEDS_LIVE_STATE: predicted move split/target [INCREASE 3]

  // ✗ ai_positives.c:2062–2065 — EFFECT_RECYCLE: saved consumed item, not holding → +1
  //   NEEDS_LIVE_STATE: consumed item record, held item [INCREASE 1]

  // ✗ ai_positives.c:2068–2084 — EFFECT_BRICK_BREAK: Raid shields, foe has screens → +2/+3/+18
  //   NEEDS_LIVE_STATE: battle type, Raid Shield count, side status [INCREASE 2/3/18]

  // ✗ ai_positives.c:2086–2108 — EFFECT_KNOCK_OFF: item type (Iron Ball, Lagging Tail, Corrosive Gas, KO)
  //   NEEDS_LIVE_STATE: item state, ability, KO calc [INCREASE 2 or 3]

  // ✓ ai_positives.c:2110–2134 — EFFECT_SKILL_SWAP / Worry Seed / Simple Beam / Gastro Acid / Entrainment
  //   Compare target ability rating to threshold; → +1 or +2
  if (
    [
      "Skill Swap", "Worry Seed", "Simple Beam",
      "Gastro Acid", "Entrainment",
    ].includes(moveName)
  ) {
    if (defAbility && abilityRating(defAbility) >= 5) return 2;
    if (defAbility) return 1;
  }

  // ✗ ai_positives.c:2136–2141 — EFFECT_IMPRISON: attacker knows predicted move → +3; else +1
  //   NEEDS_LIVE_STATE: predicted move, moveset [INCREASE 1 or 3]

  // ✗ ai_positives.c:2143–2166 — EFFECT_REFRESH / Psycho Shift: attacker has status → +3
  //   NEEDS_LIVE_STATE: attacker status condition [INCREASE 3]

  // ✗ ai_positives.c:2171–2174 — EFFECT_SNATCH: predicted move has Snatch flag → +3
  //   NEEDS_LIVE_STATE: predicted move flags [INCREASE 3]

  // ✗ ai_positives.c:2176–2177 — EFFECT_SECRET_POWER: secondary ≥ 60%, environment effect type
  //   NEEDS_LIVE_STATE: secondary chance, sub, terrain/environment [INCREASE via status checks]

  // ✗ ai_positives.c:2242–2245 — EFFECT_SPRINGTIDE_STORM: SpDef-down variant vs omniboost
  //   NEEDS_LIVE_STATE: variant check [INCREASE via stat checks]

  // ✓ ai_positives.c:2247–2251 — EFFECT_MUD_SPORT: foe has Electric move, attacker doesn't → +1
  if (moveName === "Mud Sport") {
    const foeHasElectric = def.moves.some((mn) => {
      const dm = getSmogonMove(mn);
      return dm && dm.type === "Electric";
    });
    const atkHasElectric = allAtkMoves.some((mn) => {
      const dm = getSmogonMove(mn);
      return dm && dm.type === "Electric";
    });
    if (foeHasElectric && !atkHasElectric) return 1;
  }

  // ✓ ai_positives.c:2253–2257 — EFFECT_WATER_SPORT: foe has Fire move, attacker doesn't → +1
  if (moveName === "Water Sport") {
    const foeHasFire = def.moves.some((mn) => {
      const dm = getSmogonMove(mn);
      return dm && dm.type === "Fire";
    });
    const atkHasFire = allAtkMoves.some((mn) => {
      const dm = getSmogonMove(mn);
      return dm && dm.type === "Fire";
    });
    if (foeHasFire && !atkHasFire) return 1;
  }

  // ✗ ai_positives.c:2259–2323 — EFFECT_STAT_SWAP_SPLIT: Guard Swap / Power Swap / Power Trick / etc
  //   NEEDS_LIVE_STATE: stat stages, stat values, class [INCREASE 1/2/3]

  // ✗ ai_positives.c:2326–2365 — EFFECT_EAT_BERRY / SMACK_DOWN / REMOVE_TARGET_STAT_CHANGES:
  //   NEEDS_LIVE_STATE: target item, sub, grounding, stat stages, class [INCREASE 3/16]

  // ✓ ai_positives.c:2367–2376 — EFFECT_RELIC_SONG: Meloetta Aria (foe Def < SpDef) or Pirouette (SpDef < Def)
  if (moveName === "Relic Song" && atk.species.startsWith("Meloetta")) {
    try {
      const defMon = makeCalcMon(def);
      if (defMon) {
        if (
          atk.species === "Meloetta" && defMon.stats.def < defMon.stats.spd
        ) return 3;
        if (
          atk.species === "Meloetta-Pirouette" && defMon.stats.spd < defMon.stats.def
        ) return 3;
      }
    } catch { /* ignore */ }
  }

  // ✗ ai_positives.c:2378–2407 — EFFECT_SET_TERRAIN: Yawn prevention, setup attacker, partner Expanding Force
  //   NEEDS_LIVE_STATE: Yawn status, grounding, class, partner moveset [INCREASE 2/15/17]

  // ⊗ ai_positives.c:2409–2415 — DOUBLES_ONLY: EFFECT_PLEDGE partner pledge move → +3

  // ✗ ai_positives.c:2417–2475 — EFFECT_FIELD_EFFECTS: Trick Room, Magic Room, Wonder Room, Gravity, etc
  //   NEEDS_LIVE_STATE: speed averages, field states, move accuracy, grounding, predicted move [INCREASE 1/2/3/19]

  // ✗ ai_positives.c:2478–2527 — EFFECT_FLING: based on fling effect → burn/flinch/paralysis/poison/freeze
  //   NEEDS_LIVE_STATE: item fling effect, status immunity [INCREASE via status checks]

  // ✗ ai_positives.c:2530–2533 — EFFECT_FEINT: predicted move is Protect → +3
  //   NEEDS_LIVE_STATE: predicted move [INCREASE 3]

  // ✗ ai_positives.c:2535–2570 — EFFECT_ATTACK_BLOCKERS: Embargo / Powder / Telekinesis / Throat Chop / Heal Block
  //   NEEDS_LIVE_STATE: item state, predicted move, moveset [INCREASE 1/2/3]

  // ✗ ai_positives.c:2573–2587 — EFFECT_TYPE_CHANGES: Soak / Trick-or-Treat / Forest's Curse
  //   NEEDS_LIVE_STATE: target type, moveset, ability [INCREASE 2]

  // ✗ ai_positives.c:2593–2611 — EFFECT_TOPSY_TURVY / Electrify: stat stages, predicted move type
  //   NEEDS_LIVE_STATE: predicted move type, stat stages, ability [INCREASE 1 or 3]

  // ✗ ai_positives.c:2614–2631 — EFFECT_FAIRY_LOCK / Celebrate / Happy Hour: trap, Z-crystal, phazing
  //   NEEDS_LIVE_STATE: trap status, Z-move state [INCREASE 7 or 9]

  // ⊗ ai_positives.c:2633–2648 — DOUBLES_ONLY: EFFECT_INSTRUCT / After You / Quash

  // ✗ ai_positives.c:2650–2688 — EFFECT_TEAM_EFFECTS: Tailwind / Lucky Chant / Magnet Rise
  //   NEEDS_LIVE_STATE: grounding, moveset, predicted move type, alive count [INCREASE 1/2/3/8]

  // ✗ ai_positives.c:2691–2696 — EFFECT_CAMOUFLAGE: going first, predicted move has effect → +1
  //   NEEDS_LIVE_STATE: move order, predicted move [INCREASE 1]

  // ⊗ ai_positives.c:2698–2708 — DOUBLES_ONLY: EFFECT_FLAMEBURST partner HP < 12%

  // ✗ ai_positives.c:2709–2721 — EFFECT_SKY_DROP: singles sweeper + secondary damage → +3
  //   NEEDS_LIVE_STATE: secondary damage, class [INCREASE 3 or 5]

  // ✗ ai_positives.c:2727–2735 — Frozen attacker + move can thaw → +10 (singles)
  //   NEEDS_LIVE_STATE: freeze status [INCREASE 10 or 20]

  return 0;
}

// ── DamageMoveViabilityIncrease ───────────────────────────────────────────────
//
// Core damage-move scoring called for every non-status move after the effect switch.
// ai_positives.c:2724–2835

function damageMoveViabilityIncrease(
  atk: CalcSideState,
  def: CalcSideState,
  moveName: string,
  allAtkMoves: string[],
): number {
  // Called after the effect switch for every non-status move.
  // ai_positives.c:2724–2835

  const m = getSmogonMove(moveName);
  if (!m || m.category === "Status") return 0;

  // ✗ ai_positives.c:2743–2762 — OHKO going first (or best accuracy) → +9
  //   Full condition: not predicted to switch; going first (atkOutspeeds) or best-accuracy move;
  //   accuracy ≥ 70 or no accuracy helper or foe can KO; not Sucker Punch trap; not Destiny Bond trap.
  //   NEEDS_LIVE_STATE: switch prediction, accuracy calc, Destiny Bond status [INCREASE 9]
  //   ~ approximated: check OHKO going first only (no accuracy/switch/DB state)
  {
    const ratio = damageRatio(atk, def, moveName);
    if (ratio >= 1.0 && atkOutspeeds(atk, def)) {
      return 9;
    }
  }

  // ✗ ai_positives.c:2763–2771 — Slow KO move (going second, best-accuracy KO, won't faint on own)
  //   IncreaseViabilityForSlowKOMove → class-based increase
  //   NEEDS_LIVE_STATE: KO calc, move order, secondary damage, class [INCREASE class-based]

  // ✗ ai_positives.c:2773–2794 — "Desperate move": foe can KO this turn, attacker's strongest fast move KOs
  //   NEEDS_LIVE_STATE: desperate move flag, KO calc, class, RNG [INCREASE 9]

  // ✓ ai_positives.c:2795–2835 — IsStrongestMove: if this move does the most damage among all moves → +2
  //   (More accurately, +class-based 2–8 if untouched viability and KOs going second; otherwise +2)
  //   ~ approximated: compare average damage vs all other moves; if strongest → +2
  {
    const moves = allAtkMoves.filter(Boolean);
    if (moves.length > 1) {
      let bestRatio = -1;
      let bestMove = "";
      for (const mn of moves) {
        const dm = getSmogonMove(mn);
        if (!dm || dm.category === "Status") continue;
        const r = damageRatio(atk, def, mn);
        if (r > bestRatio) { bestRatio = r; bestMove = mn; }
      }
      if (bestMove === moveName && bestRatio > 0) {
        return 2;
      }
    } else if (moves.length === 1) {
      const dm = getSmogonMove(moveName);
      if (dm && dm.category !== "Status" && damageRatio(atk, def, moveName) > 0) {
        return 2;
      }
    }
  }

  // ⊗ ai_positives.c:2837–2840 — DOUBLES_ONLY: IncreaseDoublesDamageViability

  return 0;
}

// ── Public API ────────────────────────────────────────────────────────────────

// Returns the CFRU AI score for a single move (0–255, base 100).
export function scoreMove(
  atk: CalcSideState,
  def: CalcSideState,
  moveName: string,
  allAtkMoves?: string[],
): number {
  if (!moveName) return 100;
  const m = getSmogonMove(moveName);
  if (!m) return 100;

  const moveType = m.type;
  const moveCat = m.category;
  const defAb = effDefAbility(atk, def);
  const allMoves = allAtkMoves ?? atk.moves.filter(Boolean) as string[];

  let score = 100;
  score += aiScript_Negatives(atk, def, moveName, m, defAb, moveType, moveCat);
  score = Math.max(0, Math.min(255, score));
  score += aiScript_Positives(atk, def, moveName, m, defAb, moveType, moveCat, allMoves, score);
  score += damageMoveViabilityIncrease(atk, def, moveName, allMoves);
  return Math.max(0, Math.min(255, score));
}

// Returns predicted move and all scores. Predicted move is the highest-scoring
// move if its score > 100 (CFRU "viability threshold"), otherwise null (AI may switch).
export function computeMovePrediction(
  atk: CalcSideState,
  def: CalcSideState,
): MovePrediction {
  const moves = atk.moves.filter(Boolean) as string[];
  const allMoves = moves;

  const scores: AIMoveScore[] = moves
    .map((move) => ({ move, score: scoreMove(atk, def, move, allMoves) }))
    .sort((a, b) => b.score - a.score);

  const top = scores[0];
  const predicted = top && top.score > 100 ? top.move : null;

  return { scores, predicted };
}
