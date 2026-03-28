import CollapsibleCard from "@site/src/components/CollapsibleCard";
import PokemonTeam, { Pokemon } from "@site/src/components/PokemonTeam";
import { spriteUrl } from "@site/src/utils/sprites";
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
  prevOpponent: string | null,
  visibleOrder: string[]
): { enriched: React.ReactNode; lastOpponent: string | null } {
  let lastOpponent = prevOpponent;
  const enriched =
    React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Matchup) {
        const props = child.props as { opponents: string[]; children: React.ReactNode };
        const isContinued = lastOpponent !== null && lastOpponent === props.opponents[0];
        lastOpponent = props.opponents[props.opponents.length - 1] ?? null;
        return React.cloneElement(
          child as React.ReactElement<{ isContinued?: boolean; children?: React.ReactNode }>,
          { isContinued, children: enrichBranchConditions(props.children, visibleOrder) }
        );
      }
      return child;
    }) ?? [];
  return { enriched, lastOpponent };
}

type GraphCtxValue = {
  state: GraphState;
  dispatch: (action: GraphAction) => void;
  registerBranch: (branchId: string, parentLine: string) => void;
  unregisterBranch: (branchId: string) => void;
  hp: Record<string, number>;
};

const BattleGraphCtx = React.createContext<GraphCtxValue | null>(null);
const BattleLineCtx = React.createContext<string | null>(null);

export function BattleGraph({
  playerTeam,
  opponentTeam,
  children,
}: {
  playerTeam?: Pokemon[];
  opponentTeam?: Pokemon[];
  children: React.ReactNode;
}) {
  const lineElements = React.Children.toArray(children).filter(
    (c): c is React.ReactElement<{ line: string; children: React.ReactNode }> =>
      React.isValidElement(c) && c.type === BattleLine
  );

  const lineMap = new Map(lineElements.map((el) => [el.props.line, el.props.children]));

  const rootLine = lineElements.length > 0 ? lineElements[0].props.line : "";

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

  const hp = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of opponentTeam ?? []) map[p.sprite] = p.hp;
    for (const p of playerTeam ?? []) map[p.sprite] = p.hp;
    return map;
  }, [playerTeam, opponentTeam]);

  const ctx = useMemo(
    () => ({ state, dispatch, registerBranch, unregisterBranch, hp }),
    [state, dispatch, registerBranch, unregisterBranch, hp]
  );

  const enrichedLines = new Map<string, React.ReactNode>();
  let prevOpponent: string | null = null;
  for (const slug of state.visibleOrder) {
    const raw = lineMap.get(slug);
    if (raw !== undefined) {
      const { enriched, lastOpponent } = enrichMatchups(raw, prevOpponent, state.visibleOrder);
      enrichedLines.set(slug, enriched);
      prevOpponent = lastOpponent;
    }
  }

  return (
    <>
      {opponentTeam && <PokemonTeam title="Opponent Team" team={opponentTeam} />}
      {playerTeam && <PokemonTeam title="Player Team" team={playerTeam} />}
      <BattleGraphCtx.Provider value={ctx}>
        <CollapsibleCard title="Battle Line">
          {state.visibleOrder.map((slug) => (
            <BattleLineCtx.Provider key={slug} value={slug}>
              {enrichedLines.get(slug)}
            </BattleLineCtx.Provider>
          ))}
        </CollapsibleCard>
      </BattleGraphCtx.Provider>
    </>
  );
}

export function BattleLine({ line, children }: { line: string; children: React.ReactNode }) {
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

export function Turn({ turn }: { turn: React.ReactNode[] }) {
  const mid = Math.ceil(turn.length / 2);
  return (
    <div className={styles.turn}>
      <div className={`${styles.cell} ${styles.playerCell}`}>
        {turn.slice(0, mid).map((item, i) => (
          <React.Fragment key={i}>{item}</React.Fragment>
        ))}
      </div>
      <div className={styles.cell}>
        {turn.slice(mid).map((item, i) => (
          <React.Fragment key={i}>{item}</React.Fragment>
        ))}
      </div>
    </div>
  );
}

const ORDER_RE = /^\{([^}]+)\}\s*/;
const TOKEN_RE = /\{([a-z]):([^}]+)\}/g;

export function Move({ move }: { move: string }) {
  const graphCtx = useContext(BattleGraphCtx);
  const parts = [];
  let i = 0;
  let lastSprite: string | null = null;

  const orderMatch = move.match(ORDER_RE);
  parts.push(
    <span key={i++} className={styles.circle}>
      {orderMatch![1]}
    </span>
  );
  const rest = move.slice(orderMatch![0].length);

  let last = 0;
  for (const match of rest.matchAll(TOKEN_RE)) {
    const text = rest.slice(last, match.index!).trim();
    if (text) parts.push(<React.Fragment key={i++}>{text}</React.Fragment>);

    if (match[1] === "s") {
      lastSprite = match[2];
      parts.push(
        <img key={i++} src={spriteUrl(match[2])} alt={match[2]} className={styles.sprite} />
      );
    } else if (match[1] === "p") {
      const raw = match[2];
      const suffix = raw.endsWith("+") ? "+" : raw.endsWith("-") ? "-" : "";
      const num = parseInt(suffix ? raw.slice(0, -1) : raw, 10);
      const maxHp = lastSprite != null ? graphCtx?.hp[lastSprite] : undefined;
      const display =
        maxHp != null && maxHp > 0 && !isNaN(num)
          ? `${Math.round((num / maxHp) * 100)}%${suffix}`
          : raw;
      parts.push(
        <span key={i++} className={styles.result}>
          {display}
        </span>
      );
    }
    last = match.index! + match[0].length;
  }

  const trailing = rest.slice(last).trim();
  if (trailing) parts.push(<React.Fragment key={i++}>{trailing}</React.Fragment>);

  return <div className={styles.turnAction}>{parts}</div>;
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
    if (!registerBranch || !unregisterBranch || !parentLine) return;
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
    <div className={styles.branchTurn}>
      <div className={`${styles.cell}`}>
        <div className={styles.turnAction}>
          <span className={styles.diamond}>?</span>
        </div>
      </div>
      <div className={`${styles.cell} ${styles.branchCell}`}>
        <div className={styles.turnAction}>
          {branch.map((item, j) => {
            const targetLine = item;
            const isSelected = selectedChildLine === targetLine;
            return (
              <React.Fragment key={j}>
                {j === 0 && "Choose"}
                {j > 0 && "or"}
                {graphCtx ? (
                  <button
                    className={`${styles.branchOption} ${isSelected ? styles.branchOptionSelected : ""}`}
                    onClick={() =>
                      isSelected
                        ? graphCtx.dispatch({ type: "DESELECT_BRANCH", branchId })
                        : graphCtx.dispatch({
                            type: "SELECT_BRANCH",
                            branchId,
                            childLine: targetLine,
                          })
                    }
                  >
                    {item}
                  </button>
                ) : (
                  <a href={`#${targetLine}`}>{item}</a>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
