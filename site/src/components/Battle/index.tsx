import Card from "@site/src/components/Card";
import { Row, RowCell } from "@site/src/components/Row";
import { ScrollFade } from "@site/src/components/ScrollFade";
import Team from "@site/src/components/Team";
import { secretMode } from "@site/src/data/secretMode";
import { Box, findPokemon, resolveBox } from "@site/src/utils/box";
import { useHpDisplay } from "@site/src/utils/hpDisplay";
import { getHp } from "@site/src/utils/pokedex";
import { PokemonData, resolvePokemon } from "@site/src/utils/pokemon";
import { slugify } from "@site/src/utils/slugify";
import { getColouredSpriteUrl } from "@site/src/utils/sprites";
import { getState, removeState, setState } from "@site/src/utils/storage";
import { parseTokens } from "@site/src/utils/tokens";
import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useReducer,
  useRef,
  useState,
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
  turns: (MoveData[] | RowCell[])[];
  branches?: BranchData[];
}

export interface LineData {
  line?: string;
  label?: string;
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

function resolveChildLine(branches: string[], defaultId?: string): string {
  const defaultBranch = defaultId
    ? (branches.find((b) => b === defaultId) ?? branches[0])
    : branches[0];
  if (branches.length === 1) return defaultBranch;
  const stored = getState(`branch-${slugify(branches)}`);
  const found = stored ? branches.find((b) => slugify(b) === stored) : null;
  return found ?? defaultBranch;
}

function computeInitialOrder(
  data: BattleData,
  rootLine: string,
  lineCondsByName: Map<string, LineConditions[]>
): string[] {
  const linesByName = new Map<string, LineData[]>();
  for (const line of data.lines) {
    const name = line.line ?? "";
    if (!linesByName.has(name)) linesByName.set(name, []);
    linesByName.get(name)!.push(line);
  }

  const order: string[] = [];
  const visited = new Set<string>();

  function visit(slug: string) {
    if (visited.has(slug)) return;
    const versions = lineCondsByName.get(slug);
    if (versions && !versions.some((c) => conditionsMatch(c, visited))) return;
    visited.add(slug);
    order.push(slug);

    const lineVersions = linesByName.get(slug) ?? [];
    const lineData =
      lineVersions.find((v) => conditionsMatch({ if: v.if, ifNot: v.ifNot }, visited)) ??
      lineVersions[0];
    if (!lineData) return;

    for (const matchupData of lineData.matchups) {
      if (!matchupData.branches) continue;
      let activeFound = false;
      for (const branchData of matchupData.branches) {
        if (activeFound) break;
        if (!conditionsMatch({ if: branchData.if, ifNot: branchData.ifNot }, visited)) continue;
        activeFound = true;

        visit(resolveChildLine(branchData.branches, branchData.default));
      }
    }
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
  labelsMap: Map<string, string>;
};

const BattleGraphCtx = React.createContext<GraphCtxValue | null>(null);
const BattleLineCtx = React.createContext<string | null>(null);

function isTurn(entry: MoveData[] | RowCell[]): entry is MoveData[] {
  if (entry.length === 0) return true;
  const first = entry[0];
  return typeof first === "object" && first !== null && ("player" in first || "opponent" in first);
}

function battleDataToChildren(data: BattleData): React.ReactNode {
  return data.lines.map((lineData, li) => (
    <BattleLine key={li} line={lineData.line} lineIf={lineData.if} lineIfNot={lineData.ifNot}>
      {lineData.matchups.map((matchupData, mi) => (
        <Matchup key={mi} matchup={matchupData.matchup}>
          {matchupData.turns.map((entry, ti) =>
            isTurn(entry) ? (
              <Turn key={ti}>
                {entry.map((move, mvi) =>
                  move.player !== undefined ? (
                    <PlayerMove key={mvi} move={move.player} />
                  ) : move.opponent !== undefined ? (
                    <OpponentMove key={mvi} move={move.opponent} />
                  ) : null
                )}
              </Turn>
            ) : (
              <Row key={ti} row={entry} />
            )
          )}
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

export function Battle({
  data,
  secret,
  opponentTeamHeader,
}: {
  data: BattleData;
  secret?: boolean;
  opponentTeamHeader?: React.ReactNode;
}) {
  const { opponentBox, playerBox: resolvedPlayerBox, partnerBox } = data;
  const playerResolved = resolveBox(resolvedPlayerBox);
  const opponentResolved = resolveBox(opponentBox);
  const partnerResolved = partnerBox ? resolveBox(partnerBox) : null;

  const blur = !!secret && !secretMode;

  const resolvedChildren = battleDataToChildren(data);
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

  const labelsMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const line of data.lines) {
      if (line.line && line.label) map.set(line.line, line.label);
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
    visibleOrder: computeInitialOrder(data, rootLine, lineCondsByName),
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
        ...(playerResolved.team ?? []).flatMap((name) => {
          const p = findPokemon(playerResolved, name);
          return p ? [[`p:${name}`, getHp(resolvePokemon(p))]] : [];
        }),
        ...(opponentResolved.team ?? []).flatMap((name) => {
          const p = findPokemon(opponentResolved, name);
          return p ? [[`o:${name}`, getHp(resolvePokemon(p))]] : [];
        }),
        ...(partnerResolved?.team ?? []).flatMap((name) => {
          const p = partnerResolved ? findPokemon(partnerResolved, name) : undefined;
          return p ? [[`o:${name}`, getHp(resolvePokemon(p))]] : [];
        }),
      ]),
    [resolvedPlayerBox, opponentBox, partnerBox, playerResolved, opponentResolved, partnerResolved]
  );

  const teamMap = useMemo(() => {
    const map: Record<string, PokemonData> = {};
    for (const name of playerResolved.team ?? []) {
      const p = findPokemon(playerResolved, name);
      if (p) map[`p:${name}`] = resolvePokemon(p);
    }
    const opponentTeam = opponentResolved.team ?? [];
    for (let i = 0; i < opponentTeam.length; i++) {
      const name = opponentTeam[i];
      const p = findPokemon(opponentResolved, name);
      if (p) map[`o:${name}`] = resolvePokemon(p);
    }
    for (const name of partnerResolved?.team ?? []) {
      const p = partnerResolved ? findPokemon(partnerResolved, name) : undefined;
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
    blur,
  ]);

  const ctx = useMemo(
    () => ({ state, dispatch, registerBranch, unregisterBranch, maxHp, teamMap, labelsMap }),
    [state, dispatch, registerBranch, unregisterBranch, maxHp, teamMap, labelsMap]
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

  const revealableContent = (
    <>
      {blur ? (
        <div className={styles.blurContent}>
          <Team title="Player Team" box={resolvedPlayerBox} />
        </div>
      ) : (
        <Team title="Player Team" box={resolvedPlayerBox} />
      )}
      <BattleGraphCtx.Provider value={ctx}>
        <Card title="Battle Plan" className={blur ? styles.blurBattlePlan : undefined}>
          {state.visibleOrder.map((slug) => (
            <BattleLineCtx.Provider key={slug} value={slug}>
              {enrichedLines.get(slug)}
            </BattleLineCtx.Provider>
          ))}
          {blur && <button className={styles.expandButton}>···</button>}
        </Card>
      </BattleGraphCtx.Provider>
    </>
  );

  return (
    <>
      <Team title="Opponent Team" box={opponentBox} header={opponentTeamHeader} />
      {partnerBox && <Team title="Partner Team" box={partnerBox} />}
      {secret && secretMode ? <div data-secret="true">{revealableContent}</div> : revealableContent}
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

function MatchupSprite({ pokemon }: { pokemon: PokemonData }) {
  const key = pokemon.spriteKey ?? pokemon.name;
  const [loadError, setLoadError] = useState(false);
  const [trackedKey, setTrackedKey] = useState(key);
  if (key !== trackedKey) {
    setLoadError(false);
    setTrackedKey(key);
  }
  const imgError = key === "secret" || loadError;
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setLoadError(true);
  }, [key]);
  return imgError ? (
    <div className={styles.emptySprite}>?</div>
  ) : (
    <img
      ref={imgRef}
      src={getColouredSpriteUrl(pokemon)}
      alt={pokemon.name}
      className={styles.sprite}
      onError={() => setLoadError(true)}
    />
  );
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
            return <MatchupSprite key={i} pokemon={pokemon} />;
          })}
      </div>
      <div className={styles.turns}>{children}</div>
    </div>
  );
}

function Turn({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.turn} data-turn="">
      {React.Children.map(children, (child, i) => (
        <div key={i} className={styles.cell}>
          {child}
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
    <ScrollFade className={styles.turnAction}>
      <div className={`${styles.turnActionInner}${className ? ` ${className}` : ""}`}>{parts}</div>
    </ScrollFade>
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
    if (isActive === false) dispatch({ type: "DESELECT_BRANCH", branchId });
    else if (isActive === true)
      dispatch({ type: "SELECT_BRANCH", branchId, childLine: resolveChildLine(branch, defaultId) });
  }, [branchId, dispatch, isActive, branch, defaultId]);

  const selectedChildLine = graphCtx?.state.selectedBranches.get(branchId);

  if (isActive === false) return null;
  if (graphCtx && branch.length === 1) return null;

  function handleChange(value: string) {
    if (!dispatch) return;
    if (branchKey) {
      if (value === defaultBranch) removeState(branchKey);
      else setState(branchKey, slugify(value));
    }
    dispatch({ type: "SELECT_BRANCH", branchId, childLine: value });
  }

  const labelsMap = graphCtx?.labelsMap;
  const labels = labelsMap
    ? branch.map((b) => labelsMap.get(b) ?? b)
    : undefined;
  const hasCustomLabels = labels && labels.some((l, i) => l !== branch[i]);

  return (
    <div data-branch={branchKey} data-branch-row>
      <Row
        row={[
          "Branch →",
          {
            dropdown: {
              value: selectedChildLine ?? defaultBranch,
              options: branch,
              labels: hasCustomLabels ? labels : undefined,
              onChange: handleChange,
            },
          },
        ]}
      />
    </div>
  );
}
