import Card from "@site/src/components/Card";
import Team, { Pokemon } from "@site/src/components/Team";
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
  playerHp: Record<string, number>;
  opponentHp: Record<string, number>;
};

const BattleGraphCtx = React.createContext<GraphCtxValue | null>(null);
const BattleLineCtx = React.createContext<string | null>(null);

export function Battle({
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

  const playerHp = useMemo(
    () => Object.fromEntries((playerTeam ?? []).map((p) => [p.sprite, p.hp])),
    [playerTeam]
  );

  const opponentHp = useMemo(
    () => Object.fromEntries((opponentTeam ?? []).map((p) => [p.sprite, p.hp])),
    [opponentTeam]
  );

  const ctx = useMemo(
    () => ({ state, dispatch, registerBranch, unregisterBranch, playerHp, opponentHp }),
    [state, dispatch, registerBranch, unregisterBranch, playerHp, opponentHp]
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
      {opponentTeam && <Team title="Opponent Team" team={opponentTeam} />}
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
  return (
    <div className={styles.turn}>
      {turn.map((item, i) => (
        <div key={i} className={styles.cell}>
          {item}
        </div>
      ))}
    </div>
  );
}

const TOKEN_RE = /\{([a-z+\-]):([^}]+)\}/g;

function parseTokens(
  text: string,
  side?: "player" | "opponent",
  graphCtx?: GraphCtxValue | null
): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let i = 0;
  let last = 0;
  let lastSprite: string | null = null;
  for (const match of text.matchAll(TOKEN_RE)) {
    const segment = text.slice(last, match.index!).trim();
    if (segment) parts.push(<React.Fragment key={i++}>{segment}</React.Fragment>);
    const [, type, value] = match;
    if (type === "s" && side !== undefined) {
      lastSprite = value;
      parts.push(<img key={i++} src={spriteUrl(value, side)} alt={value} className={styles.sprite} />);
    } else if ((type === "+" || type === "-") && side !== undefined) {
      const isPlayerHp = type === "+";
      const num = parseInt(value, 10);
      let maxHp: number | undefined;
      if (lastSprite != null && graphCtx != null) {
        const { playerHp, opponentHp } = graphCtx;
        maxHp = isPlayerHp ? playerHp[lastSprite] : opponentHp[lastSprite];
        maxHp ??= playerHp[lastSprite] ?? opponentHp[lastSprite];
      }
      const suffix = isPlayerHp ? "↑" : "↓";
      const display =
        maxHp != null && maxHp > 0 && !isNaN(num)
          ? `${Math.round((num / maxHp) * 100)}%${num > 0 ? suffix : ""}`
          : value;
      parts.push(<span key={i++} className={styles.result}>{display}</span>);
    } else if (type === "c") {
      parts.push(<span key={i++} className={styles.result}>{value}</span>);
    }
    last = match.index! + match[0].length;
  }
  const trailing = text.slice(last).trim();
  if (trailing) parts.push(<React.Fragment key={i++}>{trailing}</React.Fragment>);
  return parts;
}

function Move({
  move,
  side,
  className,
}: {
  move: string;
  side: "player" | "opponent";
  className?: string;
}) {
  const graphCtx = useContext(BattleGraphCtx);
  const parts = parseTokens(move, side, graphCtx);
  return <div className={`${styles.turnAction} ${className ?? ""}`}>{parts}</div>;
}

export function Risk({ risk }: { risk: string }) {
  const parts = parseTokens(risk);
  return (
    <div className={styles.riskRow}>
      <div className={styles.riskContent}>{parts}</div>
    </div>
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
