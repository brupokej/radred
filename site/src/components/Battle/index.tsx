import Card from "@site/src/components/Card";
import { ScrollFade } from "@site/src/components/ScrollFade";
import Team from "@site/src/components/Team";
import { Box, getFromBox } from "@site/src/utils/box";
import { useHpDisplay } from "@site/src/utils/hpDisplay";
import { calcMaxHp, fetchPokedex } from "@site/src/utils/pokedex";
import { Pokemon, PokemonData, resolve } from "@site/src/utils/pokemon";
import { spriteUrl } from "@site/src/utils/sprites";
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
  prevOpponents: string[] | null,
  visibleOrder: string[]
): { enriched: React.ReactNode; lastOpponents: string[] | null } {
  let lastOpponents = prevOpponents;
  const enriched =
    React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Matchup) {
        const props = child.props as { opponents: string[]; children: React.ReactNode };
        const isContinued =
          lastOpponents !== null &&
          lastOpponents.length === props.opponents.length &&
          lastOpponents.every((o, i) => o === props.opponents[i]);
        lastOpponents = props.opponents;
        return React.cloneElement(
          child as React.ReactElement<{ isContinued?: boolean; children?: React.ReactNode }>,
          { isContinued, children: enrichBranchConditions(props.children, visibleOrder) }
        );
      }
      return child;
    }) ?? [];
  return { enriched, lastOpponents };
}

type GraphCtxValue = {
  state: GraphState;
  dispatch: (action: GraphAction) => void;
  registerBranch: (branchId: string, parentLine: string) => void;
  unregisterBranch: (branchId: string) => void;
  maxHp: Record<string, number>;
};

const BattleGraphCtx = React.createContext<GraphCtxValue | null>(null);
const BattleLineCtx = React.createContext<string | null>(null);

export function Battle({
  box,
  version,
  playerTeam: playerTeamProp,
  opponentTeam,
  children,
}: {
  box?: Box;
  version?: number;
  playerTeam?: Pokemon[] | string[];
  opponentTeam?: PokemonData[];
  children: React.ReactNode;
}) {
  const playerTeam =
    box !== undefined && version !== undefined
      ? (playerTeamProp as string[] | undefined)
          ?.map((name) => getFromBox(box, version, name))
          .filter((p): p is Pokemon => p !== null)
      : (playerTeamProp as Pokemon[] | undefined);
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

  const [pokedex, setPokedex] = useState<Map<string, number[]> | null>(null);

  useEffect(() => {
    fetchPokedex().then(setPokedex);
  }, []);

  function hpFromDex(p: PokemonData): number {
    const stats = pokedex?.get((p.pokedex ?? p.name).toLowerCase());
    return stats ? calcMaxHp(stats[0], p.level) : 0;
  }

  const maxHp = useMemo(
    () =>
      Object.fromEntries([
        ...(playerTeam ?? []).map((p) => {
          const r = resolve(p);
          return [`p:${r.sprite ?? r.name.toLowerCase()}`, hpFromDex(r)];
        }),
        ...(opponentTeam ?? []).map((p) => [`o:${p.sprite ?? p.name.toLowerCase()}`, hpFromDex(p)]),
      ]),
    [playerTeam, opponentTeam, pokedex]
  );

  const ctx = useMemo(
    () => ({ state, dispatch, registerBranch, unregisterBranch, maxHp }),
    [state, dispatch, registerBranch, unregisterBranch, maxHp]
  );

  const enrichedLines = new Map<string, React.ReactNode>();
  let prevOpponents: string[] | null = null;
  for (const slug of state.visibleOrder) {
    const raw = lineMap.get(slug);
    if (raw !== undefined) {
      const { enriched, lastOpponents } = enrichMatchups(raw, prevOpponents, state.visibleOrder);
      enrichedLines.set(slug, enriched);
      prevOpponents = lastOpponents;
    }
  }

  return (
    <>
      {opponentTeam && <Team title="Opponent Team" team={opponentTeam.map((p) => ({ base: p }))} />}
      {playerTeam && <Team title="Player Team" team={playerTeam} />}
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
  opponents,
  isContinued = false,
  children,
}: {
  opponents: string[];
  isContinued?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.matchup} ${isContinued ? styles.matchupContinued : ""}`}>
      <div className={styles.opponents}>
        {!isContinued &&
          opponents.map((opponent, i) => (
            <img key={i} src={spriteUrl(opponent)} alt={opponent} className={styles.sprite} />
          ))}
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

  useEffect(() => {
    if (!dispatch) return;
    if (isActive === false) {
      dispatch({ type: "DESELECT_BRANCH", branchId });
    } else if (isActive === true && branch.length === 1) {
      dispatch({ type: "SELECT_BRANCH", branchId, childLine: branch[0] });
    }
  }, [branchId, dispatch, isActive]);

  const selectedChildLine = graphCtx?.state.selectedBranches.get(branchId);

  if (isActive === false) return null;
  if (graphCtx && branch.length === 1) return null;

  return (
    <div className={styles.branchWrapper}>
      <ScrollFade
        className={styles.branchScrollFade}
        innerClassName={styles.branchRow}
        insetBlock="var(--ifm-spacing-vertical)"
      >
        {branch.map((item, j) => {
          const isSelected = selectedChildLine === item;
          return (
            <React.Fragment key={j}>
              {j === 0 ? "Choose" : "or"}
              {graphCtx ? (
                <button
                  className={`${styles.branchOption} ${isSelected ? styles.branchOptionSelected : ""}`}
                  onClick={() =>
                    isSelected
                      ? graphCtx.dispatch({ type: "DESELECT_BRANCH", branchId })
                      : graphCtx.dispatch({ type: "SELECT_BRANCH", branchId, childLine: item })
                  }
                >
                  {item}
                </button>
              ) : (
                <a href={`#${item}`}>{item}</a>
              )}
            </React.Fragment>
          );
        })}
      </ScrollFade>
    </div>
  );
}
