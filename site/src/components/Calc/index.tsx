import { useMemo, useState, useRef, useEffect } from "react";
import { calculate, Pokemon, Move, Field, Generations, NATURES } from "@site/src/calc-shim";
import type { PokemonData } from "@site/src/utils/pokemon";
import {
  CALC_GEN,
  DEFAULT_SIDE,
  pokemonDataToSide,
  type CalcSideState,
} from "@site/src/utils/calcLink";
import { TRAINER_SETS_BY_SPECIES } from "@site/src/data/trainerSets";
import { getColouredSpriteUrl, getMonotoneSpriteUrl } from "@site/src/utils/sprites";
import { ScrollFade } from "@site/src/components/ScrollFade";
import styles from "./styles.module.css";

// ── Static data derived from the calc engine ──────────────

const GEN = Generations.get(CALC_GEN as any);

const SPECIES_NAMES: string[] = (() => {
  const names: string[] = [];
  for (const s of GEN.species) names.push(s.name);
  return names.sort();
})();

const MOVE_NAMES: string[] = (() => {
  const names: string[] = [];
  for (const m of GEN.moves) names.push(m.name);
  return names.sort();
})();

const NATURE_NAMES = Object.keys(NATURES).sort();

const ABILITY_NAMES: string[] = (() => {
  const names: string[] = [];
  for (const a of GEN.abilities) names.push(a.name);
  return names.sort();
})();

const ITEM_NAMES: string[] = (() => {
  const names: string[] = [];
  for (const i of GEN.items) names.push(i.name);
  return names.sort();
})();

const STATUS_OPTIONS = ["", "Paralyzed", "Poisoned", "Badly Poisoned", "Burned", "Asleep", "Frozen"];

function statesMatch(a: CalcSideState, b: CalcSideState): boolean {
  return a.species === b.species &&
    a.level === b.level &&
    a.nature === b.nature &&
    a.ability === b.ability &&
    a.item === b.item &&
    a.moves.every((m, i) => m === b.moves[i]);
}

function computeDerivedLabel(state: CalcSideState, playerTeam: PokemonData[]): string {
  if (!state.species) return "";
  for (const p of playerTeam) {
    const s = pokemonDataToSide(p);
    if (statesMatch(state, s)) return `${state.species} (Player Box)`;
  }
  const sets = TRAINER_SETS_BY_SPECIES.get(state.species);
  if (sets) {
    for (const { label, state: setState } of sets) {
      if (statesMatch(state, setState)) return `${state.species} (${label})`;
    }
  }
  return state.species;
}

type SpeciesOptionData = { label: string; species: string; state: CalcSideState | null };

const SPECIES_OPTION_DATA: SpeciesOptionData[] = (() => {
  const opts: SpeciesOptionData[] = [];
  const speciesWithSets = new Set<string>();
  for (const [species, sets] of TRAINER_SETS_BY_SPECIES) {
    speciesWithSets.add(species);
    for (const set of sets) {
      opts.push({ label: `${species} (${set.label.replace(/^\* /, "")})`, species, state: set.state });
    }
    opts.push({ label: `${species} (Blank Set)`, species, state: null });
  }
  for (const species of SPECIES_NAMES) {
    if (!speciesWithSets.has(species)) {
      opts.push({ label: `${species} (Blank Set)`, species, state: null });
    }
  }
  return opts;
})();

// ── Helpers ────────────────────────────────────────────────

function makeCalcPokemon(state: CalcSideState): Pokemon {
  const name = state.species || "Bulbasaur";
  const opts = {
    level: state.level,
    nature: state.nature || undefined,
    ability: state.ability || undefined,
    item: state.item || undefined,
    ivs: state.ivs,
    evs: state.evs,
    boosts: state.boosts,
    status: (state.status as any) || undefined,
    moves: state.moves.filter(Boolean) as string[],
  } as any;
  const base = new Pokemon(GEN, name, opts);
  const curHP = Math.max(1, Math.round((state.curHP / 100) * base.stats.hp));
  return new Pokemon(GEN, name, { ...opts, originalCurHP: curHP });
}

function formatRange(min: number, max: number, defHp: number): string {
  if (defHp === 0) return "—";
  const lo = ((min / defHp) * 100).toFixed(1);
  const hi = ((max / defHp) * 100).toFixed(1);
  return lo === hi ? `${lo}%` : `${lo} – ${hi}%`;
}

// ── Filterable input with custom dropdown ─────────────────

type FilterOption = string | { label: string; onSelect: () => void };

function FilterableInput({
  value,
  onChange,
  options,
  className,
  placeholder,
  onFocusChange,
}: {
  value: string;
  onChange: (v: string) => void;
  options: FilterOption[];
  className?: string;
  placeholder?: string;
  onFocusChange?: (focused: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return [] as FilterOption[];
    return options.filter((o) => {
      const label = typeof o === "string" ? o : o.label;
      return label.toLowerCase().includes(q);
    }).slice(0, 40);
  }, [value, options]);

  const rect = open && results.length > 0 && inputRef.current
    ? inputRef.current.getBoundingClientRect()
    : null;

  return (
    <div className={styles.speciesWrap}>
      <input
        ref={inputRef}
        className={className ?? styles.input}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => { setOpen(true); onFocusChange?.(true); }}
        onBlur={() => { setOpen(false); onFocusChange?.(false); }}
      />
      {rect && (
        <div
          className={styles.speciesDropdown}
          style={{ top: rect.bottom + 2, left: rect.left, width: rect.width }}
        >
          {results.map((option, i) => {
            const label = typeof option === "string" ? option : option.label;
            return (
              <div
                key={i}
                className={`${styles.dropdownItem} ${styles.dropdownSet}`}
                onMouseDown={() => {
                  if (typeof option === "string") onChange(option);
                  else option.onSelect();
                  setOpen(false);
                }}
              >
                {label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PokemonPanel({
  team,
  state,
  onSelectTeam,
  onChange,
  playerTeam,
}: {
  team: PokemonData[];
  state: CalcSideState;
  onSelectTeam: (idx: number) => void;
  onChange: (patch: Partial<CalcSideState>) => void;
  playerTeam?: PokemonData[];
}) {
  const pokemon = useMemo(() => {
    try { return makeCalcPokemon(state); } catch { return null; }
  }, [state]);

  const maxHp = pokemon?.stats.hp ?? 1;
  const curHpAbs = Math.round((state.curHP / 100) * maxHp);
  const hpPctClass = state.curHP > 50 ? styles.hpPct : state.curHP > 20 ? `${styles.hpPct} ${styles.hpYellow}` : `${styles.hpPct} ${styles.hpRed}`;

  const [levelStr, setLevelStr] = useState(String(state.level));
  const [hpStr, setHpStr] = useState(String(curHpAbs));
  const [speciesEditing, setSpeciesEditing] = useState(false);
  const [speciesLabel, setSpeciesLabel] = useState(() => computeDerivedLabel(state, playerTeam ?? []));

  useEffect(() => { setLevelStr(String(state.level)); }, [state.level]);
  useEffect(() => { setHpStr(String(curHpAbs)); }, [curHpAbs]);

  const derivedLabel = useMemo(() => computeDerivedLabel(state, playerTeam ?? []), [state, playerTeam]);

  useEffect(() => {
    if (speciesEditing) return;
    setSpeciesLabel((prev) => {
      const prevSpecies = prev.includes(" (") ? prev.split(" (")[0] : prev;
      if (prevSpecies !== state.species) return derivedLabel;
      if (derivedLabel.includes(" (")) return derivedLabel;
      return prev;
    });
  }, [derivedLabel, speciesEditing, state.species]);

  const playerBoxOptions = useMemo<FilterOption[]>(() => {
    if (!playerTeam?.length) return [];
    return playerTeam.flatMap((p) => {
      const s = pokemonDataToSide(p);
      if (!s.species) return [];
      const label = `${s.species} (Player Box)`;
      return [{ label, onSelect: () => { setSpeciesLabel(label); onChange({ ...s }); } }];
    });
  }, [playerTeam, onChange]);

  const speciesOptions = useMemo<FilterOption[]>(() => [
    ...playerBoxOptions,
    ...SPECIES_OPTION_DATA.map(({ label, species, state: optState }) => ({
      label,
      onSelect: () => {
        setSpeciesLabel(label);
        onChange(optState ?? { ...DEFAULT_SIDE, species });
      },
    })),
  ], [playerBoxOptions, onChange]);

  const boxSource = useMemo(() => {
    if (!state.species) return "blank" as const;
    for (const p of playerTeam ?? []) {
      if (statesMatch(state, pokemonDataToSide(p))) return "playerBox" as const;
    }
    for (const p of team) {
      if (statesMatch(state, pokemonDataToSide(p))) return "team" as const;
    }
    return "blank" as const;
  }, [state, playerTeam, team]);

  const displayTeam = boxSource === "playerBox" ? (playerTeam ?? []) : team;

  const inlineSpritePokemon = useMemo(() =>
    team.find(p => statesMatch(state, pokemonDataToSide(p)))
    ?? playerTeam?.find(p => statesMatch(state, pokemonDataToSide(p)))
    ?? null,
    [state, team, playerTeam]
  );

  const blankPokemon = useMemo(() => {
    if (boxSource !== "blank") return null;
    return team.find(p => pokemonDataToSide(p).species === state.species)
      ?? playerTeam?.find(p => pokemonDataToSide(p).species === state.species)
      ?? null;
  }, [boxSource, team, playerTeam, state.species]);

  return (
    <div className={styles.panel}>
      <div className={styles.panelBody}>

        {/* § Name + inline sprite */}
        <div className={styles.section}>
          <div className={styles.nameRow}>
            {inlineSpritePokemon && (
              <img
                src={getColouredSpriteUrl(inlineSpritePokemon)}
                className={styles.inlineSprite}
                alt={inlineSpritePokemon.name}
              />
            )}
            <FilterableInput
              value={speciesLabel}
              onChange={(v) => { setSpeciesLabel(v); onChange({ species: v }); }}
              options={speciesOptions}
              className={styles.nameInput}
              onFocusChange={(f) => setSpeciesEditing(f)}
            />
          </div>
        </div>

        {/* § Team sprite strip */}
        {boxSource !== "blank" ? (
          displayTeam.length > 1 && (
            <div className={styles.spriteSection}>
              <ScrollFade>
                <div className={styles.spriteSectionInner}>
                  <span className={styles.boxLabel}>Box</span>
                  <span className={styles.boxSep}>→</span>
                  {displayTeam.map((p, i) => {
                    const isActive = statesMatch(state, pokemonDataToSide(p));
                    return (
                      <button
                        key={i}
                        className={`${styles.spriteChip}${isActive ? ` ${styles.spriteChipActive}` : ""}`}
                        onClick={() => {
                          if (boxSource === "playerBox") {
                            onChange({ ...pokemonDataToSide(p), curHP: state.curHP });
                          } else {
                            onSelectTeam(i);
                          }
                        }}
                        disabled={isActive}
                        title={p.name}
                      >
                        <img
                          src={isActive ? getMonotoneSpriteUrl(p) : getColouredSpriteUrl(p)}
                          className={styles.spriteThumb}
                          alt={p.name}
                        />
                      </button>
                    );
                  })}
                </div>
              </ScrollFade>
            </div>
          )
        ) : blankPokemon ? (
          <div className={styles.spriteSection}>
            <div className={styles.spriteSectionInner}>
              <span className={styles.boxLabel}>Box</span>
              <span className={styles.boxSep}>→</span>
              <div className={`${styles.spriteChip} ${styles.spriteChipActive}`}>
                <img
                  src={getMonotoneSpriteUrl(blankPokemon)}
                  className={styles.spriteThumb}
                  alt={blankPokemon.name}
                />
              </div>
            </div>
          </div>
        ) : null}

        {/* § Level / HP */}
        <div className={styles.section}>
          <div className={styles.row}>
            <span className={styles.label}>Level:</span>
            <input
              type="number"
              className={styles.inputNarrow}
              value={levelStr}
              min={1}
              max={255}
              onChange={(e) => setLevelStr(e.target.value)}
              onBlur={() => {
                const n = parseInt(levelStr);
                if (!isNaN(n)) {
                  const clamped = Math.max(1, Math.min(255, n));
                  setLevelStr(String(clamped));
                  onChange({ level: clamped });
                } else {
                  setLevelStr(String(state.level));
                }
              }}
            />
            <span className={styles.hpLabel}>HP:</span>
            <input
              type="number"
              className={styles.inputNarrow}
              value={hpStr}
              min={0}
              max={maxHp}
              onChange={(e) => setHpStr(e.target.value)}
              onBlur={() => {
                const n = parseInt(hpStr);
                if (!isNaN(n)) {
                  const clamped = Math.max(0, Math.min(maxHp, n));
                  setHpStr(String(clamped));
                  onChange({ curHP: Math.round((clamped / maxHp) * 100) });
                } else {
                  setHpStr(String(curHpAbs));
                }
              }}
            />
            <span className={styles.hpMax}>/ {maxHp}</span>
            <span className={hpPctClass}>({state.curHP}%)</span>
          </div>
        </div>

        {/* § Nature / Ability / Item / Status */}
        <div className={styles.section}>
          <div className={styles.row}>
            <span className={styles.label}>Nature:</span>
            <select className={styles.input} value={state.nature} onChange={(e) => onChange({ nature: e.target.value })}>
              {NATURE_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Ability:</span>
            <FilterableInput
              value={state.ability}
              onChange={(ability) => onChange({ ability })}
              options={ABILITY_NAMES}
            />
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Item:</span>
            <FilterableInput
              value={state.item}
              onChange={(item) => onChange({ item })}
              options={ITEM_NAMES}
              placeholder="None"
            />
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Status:</span>
            <select className={styles.input} value={state.status} onChange={(e) => onChange({ status: e.target.value })}>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s || "Healthy"}</option>)}
            </select>
          </div>
        </div>

        {/* § Moves */}
        <div className={styles.section}>
          {([0, 1, 2, 3] as const).map((i) => (
            <div key={i} className={styles.row}>
              <FilterableInput
                value={state.moves[i]}
                onChange={(move) => {
                  const moves = [...state.moves] as [string, string, string, string];
                  moves[i] = move;
                  onChange({ moves });
                }}
                options={MOVE_NAMES}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ── Move result ────────────────────────────────────────────

interface MoveResult {
  move: string;
  range: [number, number];
  defHp: number;
  desc: string;
  amounts: number[];
}

const DEFAULT_FIELD = new Field({ gameType: "Singles" });

function computeMove(attacker: CalcSideState, defender: CalcSideState, moveName: string): MoveResult | null {
  if (!moveName || !attacker.species || !defender.species) return null;
  try {
    const atk = makeCalcPokemon(attacker);
    const def = makeCalcPokemon(defender);
    const move = new Move(GEN, moveName);
    const result = calculate(GEN as any, atk, def, move, DEFAULT_FIELD);
    const dmg = result.damage;
    const amounts = Array.isArray(dmg) ? (Array.isArray(dmg[0]) ? (dmg as number[][]).flat() : dmg as number[]) : [dmg as number];
    const min = Math.min(...amounts);
    const max = Math.max(...amounts);
    return {
      move: moveName,
      range: [min, max],
      defHp: def.stats.hp,
      desc: result.desc(),
      amounts,
    };
  } catch {
    return null;
  }
}

// ── Main export ────────────────────────────────────────────

export interface CalcProps {
  p1Team?: PokemonData[];
  p2Team?: PokemonData[];
}

export function Calc({ p1Team = [], p2Team = [] }: CalcProps) {
  const [p1, setP1] = useState<CalcSideState>(() =>
    p1Team[0] ? pokemonDataToSide(p1Team[0]) : DEFAULT_SIDE
  );
  const [p2, setP2] = useState<CalcSideState>(() =>
    p2Team[0] ? pokemonDataToSide(p2Team[0]) : DEFAULT_SIDE
  );
  const [activeMove, setActiveMove] = useState<{ side: "p1" | "p2"; idx: number } | null>(null);

  const p1Results = useMemo(
    () => p1.moves.map((m) => computeMove(p1, p2, m)),
    [p1, p2]
  );
  const p2Results = useMemo(
    () => p2.moves.map((m) => computeMove(p2, p1, m)),
    [p1, p2]
  );

  function selectTeamP1(idx: number) {
    if (p1Team[idx]) setP1((prev) => ({ ...pokemonDataToSide(p1Team[idx]), curHP: prev.curHP }));
  }
  function selectTeamP2(idx: number) {
    if (p2Team[idx]) setP2((prev) => ({ ...pokemonDataToSide(p2Team[idx]), curHP: prev.curHP }));
  }

  const activeResult = activeMove
    ? (activeMove.side === "p1" ? p1Results : p2Results)[activeMove.idx]
    : null;

  return (
    <div className={styles.calc}>
      {/* Results bar */}
      <div className={styles.resultsRow}>
        {(["p1", "p2"] as const).map((side) => {
          const results = side === "p1" ? p1Results : p2Results;
          const state = side === "p1" ? p1 : p2;
          return (
            <div key={side} className={styles.movesColumn}>
              {results.map((r, i) => {
                const isActive = activeMove?.side === side && activeMove?.idx === i;
                const moveName = state.moves[i];
                return (
                  <button
                    key={i}
                    className={`${styles.moveResult}${isActive ? ` ${styles.active}` : ""}`}
                    onClick={() => setActiveMove(isActive ? null : { side, idx: i })}
                    disabled={!moveName}
                  >
                    <span className={styles.moveName}>{moveName || `Move ${i + 1}`}</span>
                    <span className={styles.moveRange}>
                      {r ? formatRange(r.range[0], r.range[1], r.defHp) : "—"}
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {activeResult && (
        <div className={styles.descBar}>
          <div className={styles.descMain}>{activeResult.desc}</div>
          {activeResult.amounts.length > 1 && (
            <div className={styles.descAmounts}>
              Possible damage: {activeResult.amounts.join(", ")}
            </div>
          )}
        </div>
      )}

      <div className={styles.formRow}>
        <PokemonPanel
          team={p1Team}
          state={p1}
          onSelectTeam={selectTeamP1}
          onChange={(patch) => setP1((s) => ({ ...s, ...patch }))}
          playerTeam={p1Team}
        />
        <PokemonPanel
          team={p2Team}
          state={p2}
          onSelectTeam={selectTeamP2}
          onChange={(patch) => setP2((s) => ({ ...s, ...patch }))}
          playerTeam={p1Team}
        />
      </div>
    </div>
  );
}
