import Card from "@site/src/components/Card";
import { Row, RowCell } from "@site/src/components/Row";
import { ScrollFade } from "@site/src/components/ScrollFade";
import Team from "@site/src/components/Team";
import { Box, resolveBox } from "@site/src/utils/box";
import { useHpDisplay } from "@site/src/utils/hpDisplay";
import { getHp } from "@site/src/utils/pokedex";
import { PokemonData, resolvePokemon } from "@site/src/utils/pokemon";
import { slugify } from "@site/src/utils/slugify";
import { getColouredSpriteUrl } from "@site/src/utils/sprites";
import { getState, setState } from "@site/src/utils/storage";
import { parseTokens } from "@site/src/utils/tokens";
import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useReducer,
  useRef,
} from "react";
import styles from "./styles.module.css";

export interface MoveData {
  player?: string;
  opponent?: string;
}

export interface BranchData {
  if?: string[];
  ifNot?: string[];
  branches: string[];
  default?: string;
}

export interface MatchupData {
  matchup: string[];
  turns: MoveData[][];
  row?: RowCell[];
  branches?: BranchData[];
}

export interface LineData {
  line?: string;
  if?: string[];
  ifNot?: string[];
  matchups: MatchupData[];
  frags?: Record<string, number>;
}

export interface BattleData {
  opponentBox: Box;
  playerBox: Box;
  partnerBox?: Box;
  lines: LineData[];
}

type GraphState = {
  visibleOrder: string[];
  selectedBranches: Map<string, string>;
};

type GraphAction =
  | { type: "SELECT_BRANCH"; branchId: string; childLine: string }
  | { type: "DESELECT_BRANCH"; branchId: string };

type LineConditions = { if?: string[]; ifNot?: string[] };

function conditionsMatch(conds: LineConditions, visited: Set<string>): boolean {
  return (
    (!conds.if || conds.if.every((t) => visited.has(t))) &&
    (!conds.ifNot || conds.ifNot.every((t) => !visited.has(t)))
  );
}

function computeOrder(
  rootLine: string,
  branches: Map<string, string>,
  registry: Map<string, string>,
  lineCondsByName: Map<string, LineConditions[]>
): string[] {
  const order: string[] = [];
  const visited = new Set<string>();
  function visit(slug: string) {
    if (visited.has(slug)) return;
    const versions = lineCondsByName.get(slug);
    if (versions && !versions.some((c) => conditionsMatch(c, visited))) return;
    visited.add(slug);
    order.push(slug);
    for (const [branchId, parentLine] of registry)
      if (parentLine === slug && branches.has(branchId)) visit(branches.get(branchId)!);
  }
  visit(rootLine);
  return order;
}

function enrichBranchConditions(
  children: React.ReactNode,
  visibleOrder: string[]
): React.ReactNode {
  let activeFound = false;
  return (
    React.Children.map(children, (child) => {
      if (!React.isValidElement(child) || child.type !== Branch) return child;
      const { if: condition, ifNot } = child.props as { if?: string[]; ifNot?: string[] };
      if (activeFound) {
        return React.cloneElement(child as React.ReactElement<{ isActive?: boolean }>, {
          isActive: false,
        });
      }
      const met =
        (!condition || condition.every((t) => visibleOrder.includes(t))) &&
        (!ifNot || ifNot.every((t) => !visibleOrder.includes(t)));
      if (met) activeFound = true;
      return React.cloneElement(child as React.ReactElement<{ isActive?: boolean }>, {
        isActive: met,
      });
    }) ?? children
  );
}

function enrichMatchups(
  children: React.ReactNode,
  prevMatchup: string[] | null,
  visibleOrder: string[]
): { enriched: React.ReactNode; lastMatchup: string[] | null } {
  let lastMatchup = prevMatchup;
  const enriched =
    React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Matchup) {
        const props = child.props as { matchup: string[]; children: React.ReactNode };
        const isContinued =
          lastMatchup !== null &&
          lastMatchup.length === props.matchup.length &&
          lastMatchup.every((o, i) => o === props.matchup[i]);
        lastMatchup = props.matchup;
        return React.cloneElement(
          child as React.ReactElement<{ isContinued?: boolean; children?: React.ReactNode }>,
          { isContinued, children: enrichBranchConditions(props.children, visibleOrder) }
        );
      }
      return child;
    }) ?? [];
  return { enriched, lastMatchup };
}

type GraphCtxValue = {
  state: GraphState;
  dispatch: (action: GraphAction) => void;
  registerBranch: (branchId: string, parentLine: string) => void;
  unregisterBranch: (branchId: string) => void;
  maxHp: Record<string, number>;
  teamMap: Record<string, PokemonData>;
};

const BattleGraphCtx = React.createContext<GraphCtxValue | null>(null);
const BattleLineCtx = React.createContext<string | null>(null);

function battleDataToChildren(data: BattleData): React.ReactNode {
  return data.lines.map((lineData, li) => (
    <BattleLine key={li} line={lineData.line} lineIf={lineData.if} lineIfNot={lineData.ifNot}>
      {lineData.matchups.map((matchupData, mi) => (
        <Matchup key={mi} matchup={matchupData.matchup}>
          {matchupData.row && <Row row={matchupData.row} />}
          {matchupData.turns.map((moves, ti) => (
            <Turn key={ti}>
              {moves.map((move, mvi) =>
                move.player !== undefined ? (
                  <PlayerMove key={mvi} move={move.player} />
                ) : move.opponent !== undefined ? (
                  <OpponentMove key={mvi} move={move.opponent} />
                ) : null
              )}
            </Turn>
          ))}
          {matchupData.branches?.map((branchData, bi) => (
            <Branch
              key={bi}
              branch={branchData.branches}
              if={branchData.if}
              ifNot={branchData.ifNot}
              default={branchData.default}
            />
          ))}
        </Matchup>
      ))}
    </BattleLine>
  ));
}

export function Battle({ data }: { data: BattleData }) {
  const { opponentBox, playerBox: resolvedPlayerBox, partnerBox } = data;
  const resolvedChildren = battleDataToChildren(data);
  const playerResolved = resolveBox(resolvedPlayerBox);
  const opponentResolved = resolveBox(opponentBox);
  const partnerResolved = partnerBox ? resolveBox(partnerBox) : null;
  const lineElements = React.Children.toArray(resolvedChildren).filter(
    (
      c
    ): c is React.ReactElement<{
      line?: string;
      lineIf?: string[];
      lineIfNot?: string[];
      children: React.ReactNode;
    }> => React.isValidElement(c) && c.type === BattleLine
  );

  const lineVersionsBySlug = new Map<
    string,
    { lineIf?: string[]; lineIfNot?: string[]; children: React.ReactNode }[]
  >();
  for (const el of lineElements) {
    const slug = el.props.line ?? "";
    if (!lineVersionsBySlug.has(slug)) lineVersionsBySlug.set(slug, []);
    lineVersionsBySlug.get(slug)!.push({
      lineIf: el.props.lineIf,
      lineIfNot: el.props.lineIfNot,
      children: el.props.children,
    });
  }

  const lineCondsByName = useMemo(() => {
    const map = new Map<string, LineConditions[]>();
    for (const line of data.lines) {
      const name = line.line ?? "";
      if (!map.has(name)) map.set(name, []);
      map.get(name)!.push({ if: line.if, ifNot: line.ifNot });
    }
    return map;
  }, [data]);

  const rootLine = lineElements.length > 0 ? (lineElements[0].props.line ?? "") : "";

  const branchRegistry = useRef<Map<string, string>>(new Map());

  const withBranches = useCallback(
    (branches: Map<string, string>): GraphState => ({
      selectedBranches: branches,
      visibleOrder: computeOrder(rootLine, branches, branchRegistry.current, lineCondsByName),
    }),
    [rootLine, lineCondsByName]
  );

  const reducer = useMemo(
    () =>
      (state: GraphState, action: GraphAction): GraphState => {
        if (action.type === "SELECT_BRANCH") {
          const b = new Map(state.selectedBranches);
          b.set(action.branchId, action.childLine);
          return withBranches(b);
        }
        if (action.type === "DESELECT_BRANCH") {
          if (!state.selectedBranches.has(action.branchId)) return state;
          const b = new Map(state.selectedBranches);
          b.delete(action.branchId);
          return withBranches(b);
        }
        return state;
      },
    [withBranches]
  );

  const [state, dispatch] = useReducer(reducer, {
    visibleOrder: [rootLine],
    selectedBranches: new Map(),
  });

  const registerBranch = useCallback((branchId: string, parentLine: string) => {
    branchRegistry.current.set(branchId, parentLine);
  }, []);

  const unregisterBranch = useCallback((branchId: string) => {
    branchRegistry.current.delete(branchId);
  }, []);

  const maxHp = useMemo(
    () =>
      Object.fromEntries([
        ...(resolvedPlayerBox.team ?? []).flatMap((name) => {
          const p = playerResolved.get(name);
          return p ? [[`p:${name}`, getHp(resolvePokemon(p))]] : [];
        }),
        ...(opponentBox.team ?? []).flatMap((name) => {
          const p = opponentResolved.get(name);
          return p ? [[`o:${name}`, getHp(resolvePokemon(p))]] : [];
        }),
        ...(partnerBox?.team ?? []).flatMap((name) => {
          const p = partnerResolved?.get(name);
          return p ? [[`o:${name}`, getHp(resolvePokemon(p))]] : [];
        }),
      ]),
    [resolvedPlayerBox, opponentBox, partnerBox, playerResolved, opponentResolved, partnerResolved]
  );

  const teamMap = useMemo(() => {
    const map: Record<string, PokemonData> = {};
    for (const name of resolvedPlayerBox.team ?? []) {
      const p = playerResolved.get(name);
      if (p) map[`p:${name}`] = resolvePokemon(p);
    }
    for (const name of opponentBox.team ?? []) {
      const p = opponentResolved.get(name);
      if (p) map[`o:${name}`] = resolvePokemon(p);
    }
    for (const name of partnerBox?.team ?? []) {
      const p = partnerResolved?.get(name);
      if (p) map[`o:${name}`] = resolvePokemon(p);
    }
    return map;
  }, [
    resolvedPlayerBox,
    opponentBox,
    partnerBox,
    playerResolved,
    opponentResolved,
    partnerResolved,
  ]);

  const ctx = useMemo(
    () => ({ state, dispatch, registerBranch, unregisterBranch, maxHp, teamMap }),
    [state, dispatch, registerBranch, unregisterBranch, maxHp, teamMap]
  );

  const enrichedLines = new Map<string, React.ReactNode>();
  let prevMatchup: string[] | null = null;
  const visitedForIf = new Set<string>();
  for (const slug of state.visibleOrder) {
    const versions = lineVersionsBySlug.get(slug) ?? [];
    const version =
      versions.find((v) => conditionsMatch({ if: v.lineIf, ifNot: v.lineIfNot }, visitedForIf)) ??
      versions[0];
    visitedForIf.add(slug);
    if (version?.children !== undefined) {
      const { enriched, lastMatchup } = enrichMatchups(
        version.children,
        prevMatchup,
        state.visibleOrder
      );
      enrichedLines.set(slug, enriched);
      prevMatchup = lastMatchup;
    }
  }

  return (
    <>
      <Team title="Opponent Team" box={opponentBox} />
      {partnerBox && <Team title="Partner Team" box={partnerBox} />}
      <Team title="Player Team" box={resolvedPlayerBox} />
      <BattleGraphCtx.Provider value={ctx}>
        <Card title="Battle Plan">
          {state.visibleOrder.map((slug) => (
            <BattleLineCtx.Provider key={slug} value={slug}>
              {enrichedLines.get(slug)}
            </BattleLineCtx.Provider>
          ))}
        </Card>
      </BattleGraphCtx.Provider>
    </>
  );
}

function BattleLine({
  line,
  lineIf,
  lineIfNot,
  children,
}: {
  line?: string;
  lineIf?: string[];
  lineIfNot?: string[];
  children: React.ReactNode;
}) {
  return null;
}

function Matchup({
  matchup,
  isContinued = false,
  children,
}: {
  matchup: string[];
  isContinued?: boolean;
  children: React.ReactNode;
}) {
  const graphCtx = useContext(BattleGraphCtx);
  return (
    <div className={`${styles.matchup} ${isContinued ? styles.matchupContinued : ""}`}>
      <div className={styles.spriteWrapper}>
        {!isContinued &&
          matchup.map((name, i) => {
            const pokemon: PokemonData = graphCtx?.teamMap[`o:${name}`] ?? { name };
            return (
              <img
                key={i}
                src={getColouredSpriteUrl(pokemon)}
                alt={name}
                className={styles.sprite}
              />
            );
          })}
      </div>
      <div className={styles.turns}>{children}</div>
    </div>
  );
}

function Turn({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.turn}>
      {React.Children.map(children, (item, i) => (
        <div key={i} className={styles.cell}>
          {item}
        </div>
      ))}
    </div>
  );
}

function Move({
  move,
  side,
  className,
}: {
  move: string;
  side?: "player" | "opponent";
  className?: string;
}) {
  const graphCtx = useContext(BattleGraphCtx);
  const hpDisplay = useHpDisplay();
  const parts = parseTokens(move, side, graphCtx, hpDisplay);
  return (
    <ScrollFade innerClassName={`${styles.turnAction} ${className ?? ""}`}>{parts}</ScrollFade>
  );
}

function PlayerMove({ move }: { move: string }) {
  return <Move move={move} side="player" />;
}

function OpponentMove({ move }: { move: string }) {
  return <Move move={move} side="opponent" className={styles.opponentMove} />;
}

function Branch({
  branch,
  isActive,
  default: defaultId,
}: {
  branch: string[];
  if?: string[];
  ifNot?: string[];
  isActive?: boolean;
  default?: string;
}) {
  const branchId = useId();
  const parentLine = useContext(BattleLineCtx);
  const graphCtx = useContext(BattleGraphCtx);

  const registerBranch = graphCtx?.registerBranch;
  const unregisterBranch = graphCtx?.unregisterBranch;
  const dispatch = graphCtx?.dispatch;

  useEffect(() => {
    if (!registerBranch || !unregisterBranch || parentLine === null) return;
    registerBranch(branchId, parentLine);
    return () => unregisterBranch(branchId);
  }, [branchId, parentLine, registerBranch, unregisterBranch]);

  const branchKey = branch.length > 1 ? `branch-${slugify(branch)}` : undefined;
  const defaultBranch = defaultId ? (branch.find((b) => b === defaultId) ?? branch[0]) : branch[0];

  useEffect(() => {
    if (!dispatch) return;
    if (isActive === false) {
      dispatch({ type: "DESELECT_BRANCH", branchId });
    } else if (isActive === true) {
      if (branch.length === 1) {
        dispatch({ type: "SELECT_BRANCH", branchId, childLine: branch[0] });
      } else {
        const stored = branchKey ? getState(branchKey) : null;
        const found = stored ? branch.find((b) => slugify(b) === stored) : null;
        const childLine = found ?? defaultBranch;
        if (branchKey && !stored) setState(branchKey, slugify(defaultBranch));
        dispatch({ type: "SELECT_BRANCH", branchId, childLine });
      }
    }
  }, [branchId, dispatch, isActive, branchKey, branch, defaultBranch]);

  const selectedChildLine = graphCtx?.state.selectedBranches.get(branchId);

  if (isActive === false) return null;
  if (graphCtx && branch.length === 1) return null;

  function handleChange(value: string) {
    if (!dispatch) return;
    if (branchKey) setState(branchKey, slugify(value));
    dispatch({ type: "SELECT_BRANCH", branchId, childLine: value });
  }

  return (
    <div className={styles.branchWrapper} data-branch={branchKey}>
      <ScrollFade
        className={styles.branchScrollFade}
        innerClassName={styles.branchRow}
        insetBlock="var(--ifm-spacing-vertical)"
      >
        <span className={styles.branchLabel}>Branch →</span>
        <select
          className={styles.branchSelect}
          value={selectedChildLine ?? defaultBranch}
          onChange={(e) => handleChange(e.target.value)}
        >
          {branch.map((item) => (
            <option key={slugify(item)} value={item}>
              {item}
            </option>
          ))}
        </select>
      </ScrollFade>
    </div>
  );
}
