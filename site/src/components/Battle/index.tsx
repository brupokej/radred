import Card from "@site/src/components/Card";
import { ScrollFade } from "@site/src/components/ScrollFade";
import Team from "@site/src/components/Team";
import { Box, resolveBox } from "@site/src/utils/box";
import { getState, setState } from "@site/src/utils/storage";
import { slugify } from "@site/src/utils/slugify";
import { useHpDisplay } from "@site/src/utils/hpDisplay";
import { getHp } from "@site/src/utils/pokedex";
import { PokemonData, resolvePokemon } from "@site/src/utils/pokemon";
import { getColouredSpriteUrl } from "@site/src/utils/sprites";
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

type GraphState = {
  visibleOrder: string[];
  selectedBranches: Map<string, string>;
};

type GraphAction =
  | { type: "SELECT_BRANCH"; branchId: string; childLine: string }
  | { type: "DESELECT_BRANCH"; branchId: string };

function computeOrder(
  rootLine: string,
  branches: Map<string, string>,
  registry: Map<string, string>
): string[] {
  const order: string[] = [];
  const visited = new Set<string>();
  function visit(slug: string) {
    if (visited.has(slug)) return;
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

export function Battle({
  playerBox,
  opponentBox,
  children,
}: {
  playerBox: Box;
  opponentBox: Box;
  children: React.ReactNode;
}) {
  const playerResolved = resolveBox(playerBox);
  const opponentResolved = resolveBox(opponentBox);
  const lineElements = React.Children.toArray(children).filter(
    (c): c is React.ReactElement<{ line?: string; children: React.ReactNode }> =>
      React.isValidElement(c) && c.type === BattleLine
  );

  const lineMap = new Map(lineElements.map((el) => [el.props.line ?? "", el.props.children]));

  const rootLine = lineElements.length > 0 ? (lineElements[0].props.line ?? "") : "";

  const branchRegistry = useRef<Map<string, string>>(new Map());

  const withBranches = useCallback(
    (branches: Map<string, string>): GraphState => ({
      selectedBranches: branches,
      visibleOrder: computeOrder(rootLine, branches, branchRegistry.current),
    }),
    [rootLine]
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
        ...(playerBox.team ?? []).flatMap((name) => {
          const p = playerResolved.get(name);
          return p ? [[`p:${name}`, getHp(resolvePokemon(p))]] : [];
        }),
        ...(opponentBox.team ?? []).flatMap((name) => {
          const p = opponentResolved.get(name);
          return p ? [[`o:${name}`, getHp(resolvePokemon(p))]] : [];
        }),
      ]),
    [playerBox, opponentBox, playerResolved, opponentResolved]
  );

  const teamMap = useMemo(() => {
    const map: Record<string, PokemonData> = {};
    for (const name of playerBox.team ?? []) {
      const p = playerResolved.get(name);
      if (p) map[`p:${name}`] = resolvePokemon(p);
    }
    for (const name of opponentBox.team ?? []) {
      const p = opponentResolved.get(name);
      if (p) map[`o:${name}`] = resolvePokemon(p);
    }
    return map;
  }, [playerBox, opponentBox, playerResolved, opponentResolved]);

  const ctx = useMemo(
    () => ({ state, dispatch, registerBranch, unregisterBranch, maxHp, teamMap }),
    [state, dispatch, registerBranch, unregisterBranch, maxHp, teamMap]
  );

  const enrichedLines = new Map<string, React.ReactNode>();
  let prevMatchup: string[] | null = null;
  for (const slug of state.visibleOrder) {
    const raw = lineMap.get(slug);
    if (raw !== undefined) {
      const { enriched, lastMatchup } = enrichMatchups(raw, prevMatchup, state.visibleOrder);
      enrichedLines.set(slug, enriched);
      prevMatchup = lastMatchup;
    }
  }

  return (
    <>
      <Team title="Opponent Team" box={opponentBox} />
      <Team title="Player Team" box={playerBox} />
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

export function BattleLine({ line, children }: { line?: string; children: React.ReactNode }) {
  return null;
}

export function Matchup({
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

export function Turn({ children }: { children: React.ReactNode }) {
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

function Move({ move, side, className }: { move: string; className?: string }) {
  const graphCtx = useContext(BattleGraphCtx);
  const hpDisplay = useHpDisplay();
  const parts = parseTokens(move, side, graphCtx, hpDisplay);
  return (
    <ScrollFade innerClassName={`${styles.turnAction} ${className ?? ""}`}>{parts}</ScrollFade>
  );
}

export function PlayerMove({ move }: { move: string }) {
  return <Move move={move} side="player" />;
}

export function OpponentMove({ move }: { move: string }) {
  return <Move move={move} side="opponent" className={styles.opponentMove} />;
}

export function Branch({
  branch,
  if: condition,
  ifNot,
  isActive,
}: {
  branch: string[];
  if?: string[];
  ifNot?: string[];
  isActive?: boolean;
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

  useEffect(() => {
    if (!dispatch) return;
    if (isActive === false) {
      dispatch({ type: "DESELECT_BRANCH", branchId });
    } else if (isActive === true) {
      if (branch.length === 1) {
        dispatch({ type: "SELECT_BRANCH", branchId, childLine: branch[0] });
      } else {
        const childLine = branchKey ? (getState(branchKey) ?? branch[0]) : branch[0];
        dispatch({ type: "SELECT_BRANCH", branchId, childLine });
      }
    }
  }, [branchId, dispatch, isActive, branchKey]);

  const selectedChildLine = graphCtx?.state.selectedBranches.get(branchId);

  if (isActive === false) return null;
  if (graphCtx && branch.length === 1) return null;

  function handleChange(item: string) {
    if (!dispatch) return;
    if (branchKey) setState(branchKey, item);
    dispatch({ type: "SELECT_BRANCH", branchId, childLine: item });
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
          value={selectedChildLine ?? branch[0]}
          onChange={(e) => handleChange(e.target.value)}
        >
          {branch.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </ScrollFade>
    </div>
  );
}
