// scripts/cfruMoves.mts
//
// Parses CFRU source files to generate src/data/utils/cfruMoves.json —
// a lookup table keyed by normalized move ID (strip "MOVE_" prefix, lowercase),
// which is equivalent to Smogon's toID() for canonical move names.
//
// Sources:
//   ~/Development/Complete-Fire-Red-Upgrade/include/constants/moves.h
//   ~/Development/Complete-Fire-Red-Upgrade/include/constants/battle_move_effects.h
//   ~/Development/Complete-Fire-Red-Upgrade/strings/attack_name_table.string
//   ~/Development/Complete-Fire-Red-Upgrade/src/Tables/battle_moves.c
//
// Run: npx tsx scripts/cfruMoves.mts

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { CFRU_FLAGS } from "./cfruFlags.mts";

const CFRU = join(homedir(), "Development/Complete-Fire-Red-Upgrade");
const OUT = new URL("../src/data/utils/cfruMoves.json", import.meta.url).pathname;

// ── 1. moves.h → MOVE_XXX constant name: numeric ID ─────────────────────────

function parseMoveConstants(src: string): Map<string, number> {
  const map = new Map<string, number>();
  for (const m of src.matchAll(/^#define\s+(MOVE_\w+)\s+(0x[0-9A-Fa-f]+|\d+)/gm)) {
    map.set(m[1], parseInt(m[2], m[2].startsWith("0x") ? 16 : 10));
  }
  return map;
}

// ── 2. attack_name_table.string → position (= CFRU move ID): display name ───
//
// The file lists names sequentially in move-ID order. Each entry is delimited
// by a "#org @NAME_XXX" line followed by the display string (max 12 chars).

function parseNameTable(src: string): string[] {
  const names: string[] = [];
  for (const entry of src.split(/^#org @NAME_/m).slice(1)) {
    const lines = entry.split("\n").map((l) => l.trim()).filter(Boolean);
    // lines[0] = label suffix (e.g., "POUND"); lines[1] = display string (e.g., "Pound").
    names.push(lines[1] ?? "");
  }
  return names; // 0-indexed: names[0] = MOVE_NONE ("-")
}

// ── 3. battle_moves.c → MOVE_XXX: { effect, power, split, secondaryChance } ─
//
// Each entry is a C designated initializer:
//   [MOVE_XXX] = { .field = VALUE, ... },
//
// #ifdef / #else / #endif blocks are resolved using CFRU_FLAGS (scripts/cfruFlags.ts).
// Fields not present in the active branch default to 0 / null.

const SPLIT_MAP: Record<string, string> = {
  SPLIT_PHYSICAL: "Physical",
  SPLIT_SPECIAL: "Special",
  SPLIT_STATUS: "Status",
};

export interface CfruMoveData {
  cfruId: number;
  displayName: string;
  effect: string;
  power: number;
  split: string;
  secondaryEffectChance: number;
}

interface ParsedFields {
  effect: string | null;
  power: number | null;
  split: string | null;
  secondaryEffectChance: number | null;
}

// Stack frame for preprocessor branch tracking.
// condition = was the #if/#ifdef condition true?
// inElse   = have we crossed into the #else branch?
// Outputting in a frame iff condition !== inElse (i.e. we're in the taken branch).
interface IfFrame { condition: boolean; inElse: boolean; }

function parseMoveTable(src: string, flags: Record<string, boolean>): Map<string, ParsedFields> {
  const moves = new Map<string, ParsedFields>();
  const lines = src.split("\n");

  let current: string | null = null;
  let fields: ParsedFields = { effect: null, power: null, split: null, secondaryEffectChance: null };
  const ifStack: IfFrame[] = [];

  const isOutputting = (): boolean => ifStack.every(f => f.condition !== f.inElse);
  const evalCondition = (sym: string): boolean => flags[sym] ?? true;

  for (const raw of lines) {
    const line = raw.trim();

    // Detect new block: [MOVE_XXX] = (struct form — "{" on next line).
    // Excludes single-value entries like [MOVE_XXX] = 100, used in z_move_power tables.
    const blockStart = line.match(/^\[(MOVE_\w+)\]\s*=\s*$/);
    if (blockStart) {
      if (current !== null) {
        // Previous block ended without a closing "}," — store what we have.
        moves.set(current, { ...fields });
      }
      current = blockStart[1];
      fields = { effect: null, power: null, split: null, secondaryEffectChance: null };
      ifStack.length = 0; // reset per-block
      continue;
    }

    if (current === null) continue;

    // Preprocessor directives — resolve using CFRU_FLAGS; properly nested via ifStack.
    if (line.startsWith("#ifdef ") || line.startsWith("#ifdef\t")) {
      const sym = line.slice("#ifdef".length).trim();
      ifStack.push({ condition: evalCondition(sym), inElse: false });
      continue;
    }
    if (line.startsWith("#ifndef ") || line.startsWith("#ifndef\t")) {
      const sym = line.slice("#ifndef".length).trim();
      ifStack.push({ condition: !evalCondition(sym), inElse: false });
      continue;
    }
    if (line.startsWith("#if ") || line.startsWith("#if\t")) {
      const expr = line.slice("#if".length).trim();
      const negDefined = expr.match(/^!\s*defined\((\w+)\)$/);
      const posDefined = expr.match(/^defined\((\w+)\)$/);
      const negBare    = expr.match(/^!(\w+)$/);
      const posBare    = expr.match(/^(\w+)$/);
      const condition = negDefined ? !evalCondition(negDefined[1])
        : posDefined               ?  evalCondition(posDefined[1])
        : negBare                  ? !evalCondition(negBare[1])
        : posBare                  ?  evalCondition(posBare[1])
        : true; // unknown complex expression — assume taken
      ifStack.push({ condition, inElse: false });
      continue;
    }
    if (line.startsWith("#else")) {
      if (ifStack.length > 0) ifStack[ifStack.length - 1].inElse = true;
      continue;
    }
    if (line.startsWith("#endif")) {
      ifStack.pop();
      continue;
    }

    if (!isOutputting()) continue;

    // Block end.
    if (line === "},") {
      moves.set(current, { ...fields });
      current = null;
      continue;
    }

    // Field extraction: .fieldName = VALUE,
    const fm = line.match(/^\.(\w+)\s*=\s*(.+?)(?:,\s*(?:\/\/.*)?)?$/);
    if (!fm) continue;
    const [, name, val] = fm;

    switch (name) {
      case "effect":
        if (fields.effect === null) fields.effect = val.trim();
        break;
      case "power":
        if (fields.power === null) fields.power = parseInt(val, 10) || 0;
        break;
      case "split":
        if (fields.split === null) fields.split = SPLIT_MAP[val.trim()] ?? val.trim();
        break;
      case "secondaryEffectChance":
        if (fields.secondaryEffectChance === null)
          fields.secondaryEffectChance = parseInt(val, 10) || 0;
        break;
    }
  }

  // Flush last block if file doesn't end with "},"
  if (current !== null) moves.set(current, { ...fields });

  return moves;
}

// ── Main ─────────────────────────────────────────────────────────────────────

const movesH = readFileSync(join(CFRU, "include/constants/moves.h"), "utf-8");
const nameTable = readFileSync(join(CFRU, "strings/attack_name_table.string"), "utf-8");
const battleMovesC = readFileSync(join(CFRU, "src/Tables/battle_moves.c"), "utf-8");

const moveConstants = parseMoveConstants(movesH);   // MOVE_XXX → numeric ID
const displayNames = parseNameTable(nameTable);     // position → display name
const moveTable = parseMoveTable(battleMovesC, CFRU_FLAGS); // MOVE_XXX → parsed fields

const out: Record<string, CfruMoveData> = {};
const skipped: string[] = [];

for (const [constant, id] of moveConstants.entries()) {
  if (constant === "MOVE_NONE") continue;

  const fields = moveTable.get(constant);
  if (!fields) { skipped.push(constant); continue; }

  // Normalized key: strip "MOVE_" prefix, lowercase.
  // Equivalent to Smogon's toID() applied to the canonical move name for the vast
  // majority of moves (both remove non-alphanumeric characters and lowercase).
  const key = constant.slice("MOVE_".length).toLowerCase();

  out[key] = {
    cfruId: id,
    displayName: displayNames[id] ?? "",
    effect: fields.effect ?? "",
    power: fields.power ?? 0,
    split: fields.split ?? "",
    secondaryEffectChance: fields.secondaryEffectChance ?? 0,
  };
}

writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
const skippedNote = skipped.length === 0 ? "none skipped"
  : `${skipped.length} skipped (no battle_moves.c entry): ${skipped.join(", ")}`;
console.log(`Wrote ${Object.keys(out).length} moves to ${OUT} — ${skippedNote}`);
