import { calculate, Field, Generations, Move, NATURES, Pokemon } from "@site/src/calc-shim";
import { resolveActiveBox } from "@site/src/components/Battle";
import Card from "@site/src/components/Card";
import { Row } from "@site/src/components/Row";
import { ScrollFade } from "@site/src/components/ScrollFade";
import { getSwitchBattleCaseData } from "@site/src/components/SwitchBattle";
import {
  boxToTeam,
  CALC_GEN,
  DEFAULT_SIDE,
  pokemonDataToSide,
  type CalcSideState,
} from "@site/src/utils/calcLink";
import type { Moment } from "@site/src/utils/moments";
import type { PokemonData } from "@site/src/utils/pokemon";
import { SpriteImg } from "@site/src/utils/SpriteImg";
import { useStorageState } from "@site/src/utils/storage";
import { LIVE_MOMENT_DEFAULT } from "@site/src/utils/storageDefaults";
import { computeMovePrediction, type MovePrediction } from "@site/src/utils/aiMoveScore";
import { computeSwitchScores, type SwitchScore } from "@site/src/utils/switchScore";
import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";

// ── Static data derived from the calc engine ──────────────

const GEN = Generations.get(CALC_GEN as any);

const NATURE_NAMES = Object.keys(NATURES).sort();

const STATUS_OPTIONS = [
  "",
  "Paralyzed",
  "Poisoned",
  "Badly Poisoned",
  "Burned",
  "Asleep",
  "Frozen",
];

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

function switchScoreClass(score: number): string {
  if (score < -1) return styles.scoreKo;
  if (score > 15) return styles.scoreHigh;
  if (score > 2) return styles.scoreMid;
  return styles.scoreNone;
}

function PokemonPanel({
  team,
  state,
  onSelectTeam,
  onChange,
  title,
  results,
  activeResultIdx,
  onToggleResult,
  showDetails,
  onToggleDetails,
  switchScores,
  movePrediction,
}: {
  team: PokemonData[];
  state: CalcSideState;
  onSelectTeam: (idx: number) => void;
  onChange: (patch: Partial<CalcSideState>) => void;
  title: string;
  results: (MoveResult | null)[];
  activeResultIdx: number | null;
  onToggleResult: (idx: number) => void;
  showDetails: boolean;
  onToggleDetails: () => void;
  switchScores?: SwitchScore[] | null;
  movePrediction?: MovePrediction | null;
}) {
  const pokemon = useMemo(() => {
    try {
      return makeCalcPokemon(state);
    } catch {
      return null;
    }
  }, [state]);

  const maxHp = pokemon?.stats.hp ?? 1;
  const curHpAbs = Math.round((state.curHP / 100) * maxHp);
  const hpPctClass =
    state.curHP > 50
      ? styles.hpPct
      : state.curHP > 20
        ? `${styles.hpPct} ${styles.hpYellow}`
        : `${styles.hpPct} ${styles.hpRed}`;

  const [hpStr, setHpStr] = useState(String(curHpAbs));

  useEffect(() => {
    setHpStr(String(curHpAbs));
  }, [curHpAbs]);

  const activeIdx = Math.max(
    0,
    team.findIndex((p) => pokemonDataToSide(p).species === state.species)
  );
  const activePokemon = team[activeIdx] ?? null;
  const originalItem = activePokemon ? pokemonDataToSide(activePokemon).item : "";

  return (
    <Card halfCard title={title}>
      <div className={styles.panelBody}>
        {/* § Move results */}
        <div className={styles.movesColumn}>
          {results.map((r, i) => {
            const isActive = activeResultIdx === i;
            const moveName = state.moves[i];
            const prob = movePrediction
              ? getMoveProb(movePrediction, moveName)
              : null;
            return (
              <button
                key={i}
                className={`${styles.moveResult}${isActive ? ` ${styles.active}` : ""}`}
                onClick={() => onToggleResult(i)}
                disabled={!moveName}
              >
                <span className={styles.moveName}>{moveName || `Move ${i + 1}`}</span>
                {prob && (
                  <span className={`${styles.moveProb} ${prob.pct > 50 ? styles.scoreHigh : styles.scoreMid}`}>
                    {prob.label}
                  </span>
                )}
                <span className={styles.moveRange}>
                  {r ? formatRange(r.range[0], r.range[1], r.defHp) : "—"}
                </span>
              </button>
            );
          })}
        </div>

        {/* § Name */}
        <div className={styles.section}>
          <div className={styles.nameRow}>
            {activePokemon && (
              <SpriteImg pokemon={activePokemon} className={styles.inlineSprite} />
            )}
            <select
              className={styles.nameInput}
              value={activeIdx}
              onChange={(e) => onSelectTeam(Number(e.target.value))}
            >
              {team.map((p, i) => (
                <option key={i} value={i}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* § Level / HP */}
        <div className={styles.section}>
          <div className={styles.statRow}>
            <div className={styles.statCell}>
              <span className={styles.label}>Level:</span>
              <input
                type="number"
                className={styles.inputNarrow}
                value={state.level}
                disabled
                readOnly
              />
            </div>
            <div className={`${styles.statCell} ${styles.hpCell}`}>
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
        </div>

        {/* § Team sprite strip */}
        {team.length > 1 && (
          <div className={styles.spriteSection}>
            <ScrollFade>
              <div className={styles.spriteSectionInner}>
                <span className={styles.boxLabel}>Box</span>
                <span className={styles.boxSep}>→</span>
                {team.map((p, i) => {
                  const isActive = i === activeIdx;
                  return (
                    <button
                      key={i}
                      className={`${styles.spriteChip}${isActive ? ` ${styles.spriteChipActive}` : ""}`}
                      onClick={() => onSelectTeam(i)}
                      disabled={isActive}
                      title={p.name}
                    >
                      <SpriteImg
                        pokemon={p}
                        palette="coloured"
                        className={styles.spriteThumb}
                      />
                      {switchScores && (
                        <span className={`${styles.scoreChip} ${switchScoreClass(switchScores[i]?.score ?? 0)}`}>
                          {switchScores[i]?.chipText ?? "0"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </ScrollFade>
          </div>
        )}

        {/* § Nature / Ability / Item / Status */}
        {showDetails && (
          <div className={styles.section}>
            <div className={styles.row}>
              <span className={styles.label}>Nature:</span>
              <select className={styles.input} value={state.nature} disabled>
                {NATURE_NAMES.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Ability:</span>
              <select className={styles.input} value={state.ability} disabled>
                <option value={state.ability}>{state.ability || "—"}</option>
              </select>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Item:</span>
              <select
                className={styles.input}
                value={state.item}
                onChange={(e) => onChange({ item: e.target.value })}
              >
                <option value="">None</option>
                {originalItem && <option value={originalItem}>{originalItem}</option>}
              </select>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Status:</span>
              <select
                className={styles.input}
                value={state.status}
                onChange={(e) => onChange({ status: e.target.value })}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s || "Healthy"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <button
          className={styles.detailToggle}
          onClick={onToggleDetails}
        >
          <span>{showDetails ? "−" : "+"}</span>
        </button>
      </div>
    </Card>
  );
}

// ── Move probability ───────────────────────────────────────

interface MoveProb {
  label: string;
  pct: number; // 1–100; drives color
}

// Returns a probability label for one move given a prediction result.
// Only produces a value for winner moves when max score > 100.
// Returns null for non-winners and when the AI might switch instead of attacking.
function getMoveProb(prediction: MovePrediction, moveName: string): MoveProb | null {
  if (!moveName || !prediction.predicted) return null;
  const maxScore = prediction.scores[0]?.score ?? 0;
  if (maxScore <= 100) return null;

  const winners = prediction.scores.filter((s) => s.score === maxScore);
  if (!winners.some((s) => s.move === moveName)) return null;

  const pct = Math.round(100 / winners.length);
  return { label: `${pct}%`, pct };
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

function computeMove(
  attacker: CalcSideState,
  defender: CalcSideState,
  moveName: string
): MoveResult | null {
  if (!moveName || !attacker.species || !defender.species) return null;
  try {
    const atk = makeCalcPokemon(attacker);
    const def = makeCalcPokemon(defender);
    const move = new Move(GEN, moveName);
    const result = calculate(GEN as any, atk, def, move, DEFAULT_FIELD);
    const dmg = result.damage;
    const amounts = Array.isArray(dmg)
      ? Array.isArray(dmg[0])
        ? (dmg as number[][]).flat()
        : (dmg as number[])
      : [dmg as number];
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

interface CalcViewProps {
  p1Team?: PokemonData[];
  p2Team?: PokemonData[];
}

function CalcView({ p1Team = [], p2Team = [] }: CalcViewProps) {
  const [p1, setP1] = useState<CalcSideState>(() =>
    p1Team[0] ? pokemonDataToSide(p1Team[0]) : DEFAULT_SIDE
  );
  const [p2, setP2] = useState<CalcSideState>(() =>
    p2Team[0] ? pokemonDataToSide(p2Team[0]) : DEFAULT_SIDE
  );
  const [showDetails, setShowDetails] = useState(false);
  const [activeMove, setActiveMove] = useState<{ side: "p1" | "p2"; idx: number }>({
    side: "p1",
    idx: 0,
  });

  const p1Results = useMemo(() => p1.moves.map((m) => computeMove(p1, p2, m)), [p1, p2]);
  const p2Results = useMemo(() => p2.moves.map((m) => computeMove(p2, p1, m)), [p1, p2]);
  const p1MovePrediction = useMemo(
    () => (p1.species && p2.species ? computeMovePrediction(p1, p2) : null),
    [p1, p2]
  );

  const p2MovePrediction = useMemo(
    () => (p2.species && p1.species ? computeMovePrediction(p2, p1) : null),
    [p2, p1]
  );

  const p2SwitchScores = useMemo(() => {
    const idx = Math.max(0, p1Team.findIndex(
      (p) => pokemonDataToSide(p).species === p1.species
    ));
    const foeName = p1Team[idx]?.name ?? p1.species;
    return computeSwitchScores(p1, p2Team, foeName);
  }, [p1, p2Team, p1Team]);

  function selectTeamP1(idx: number) {
    if (p1Team[idx]) setP1((prev) => ({ ...pokemonDataToSide(p1Team[idx]), curHP: prev.curHP }));
  }
  function selectTeamP2(idx: number) {
    if (p2Team[idx]) setP2((prev) => ({ ...pokemonDataToSide(p2Team[idx]), curHP: prev.curHP }));
  }

  const activeResult = (activeMove.side === "p1" ? p1Results : p2Results)[activeMove.idx];

  const p2ActiveIdx = Math.max(0, p2Team.findIndex(
    (p) => pokemonDataToSide(p).species === p2.species
  ));
  const activeP2Score = p2SwitchScores[p2ActiveIdx] ?? null;

  return (
    <div className={styles.calc}>
      <div className={styles.formRow}>
        <PokemonPanel
          team={p1Team}
          state={p1}
          onSelectTeam={selectTeamP1}
          onChange={(patch) => setP1((s) => ({ ...s, ...patch }))}
          title="Pokémon 1"
          results={p1Results}
          activeResultIdx={activeMove.side === "p1" ? activeMove.idx : null}
          onToggleResult={(i) => setActiveMove({ side: "p1", idx: i })}
          showDetails={showDetails}
          onToggleDetails={() => setShowDetails((v) => !v)}
          movePrediction={p1MovePrediction}
        />
        <PokemonPanel
          team={p2Team}
          state={p2}
          onSelectTeam={selectTeamP2}
          onChange={(patch) => setP2((s) => ({ ...s, ...patch }))}
          title="Pokémon 2"
          results={p2Results}
          activeResultIdx={activeMove.side === "p2" ? activeMove.idx : null}
          onToggleResult={(i) => setActiveMove({ side: "p2", idx: i })}
          showDetails={showDetails}
          onToggleDetails={() => setShowDetails((v) => !v)}
          switchScores={p2SwitchScores}
          movePrediction={p2MovePrediction}
        />
      </div>
      {activeP2Score && (
        <Card title="Switch AI">
          <Row row={activeP2Score.rowCells} />
        </Card>
      )}
      <Card title="Turn Description">
        {activeResult ? (
          <div className={styles.descBar}>
            <div className={styles.descMain}>{activeResult.desc}</div>
            {activeResult.amounts.length > 1 && (
              <div className={styles.descAmounts}>
                Possible damage: {activeResult.amounts.join(", ")}
              </div>
            )}
          </div>
        ) : (
          <div className={styles.descPlaceholder}>Select a move to see damage details.</div>
        )}
      </Card>
    </div>
  );
}

export function Calc({ moments }: { moments: Moment[] }) {
  const { value: storedLabel } = useStorageState("live-moment");
  const effectiveLabel = storedLabel ?? LIVE_MOMENT_DEFAULT;

  const moment = moments.find((m) => m.label === effectiveLabel) ?? null;

  const { p1Team, p2Team } = useMemo((): { p1Team: PokemonData[]; p2Team: PokemonData[] } => {
    if (!moment) return { p1Team: [], p2Team: [] };

    if (moment.kind === "battle") {
      const { data } = moment;
      return {
        p1Team: [
          ...boxToTeam(resolveActiveBox(data)),
          ...(data.partnerBox ? boxToTeam(data.partnerBox) : []),
        ],
        p2Team: boxToTeam(data.opponentBox),
      };
    }

    if (moment.kind === "switchBattle") {
      const data = getSwitchBattleCaseData(moment.data);
      return {
        p1Team: [
          ...boxToTeam(resolveActiveBox(data)),
          ...(data.partnerBox ? boxToTeam(data.partnerBox) : []),
        ],
        p2Team: boxToTeam(data.opponentBox),
      };
    }

    if (moment.kind === "encounter") {
      const fullTeam = boxToTeam(moment.data.playerBox);
      return {
        p1Team: moment.data.showPlayerTeam === false ? fullTeam.slice(0, 1) : fullTeam,
        p2Team: [moment.data.pokemon],
      };
    }

    return { p1Team: [], p2Team: [] };
  }, [moment]);

  return <CalcView key={effectiveLabel} p1Team={p1Team} p2Team={p2Team} />;
}
