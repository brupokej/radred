import CollapsibleCard from "@site/src/components/CollapsibleCard";
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

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

type GraphState = {
  visibleOrder: string[];
  selectedBranches: Map<string, string>;
};

type GraphAction =
  | { type: "SELECT_BRANCH"; branchId: string; childSlug: string }
  | { type: "DESELECT_BRANCH"; branchId: string };

function computeOrder(
  rootSlug: string,
  branches: Map<string, string>,
  registry: Map<string, string>
): string[] {
  const order: string[] = [];
  const visited = new Set<string>();
  function visit(slug: string) {
    if (visited.has(slug)) return;
    visited.add(slug);
    order.push(slug);
    for (const [branchId, parentSlug] of registry)
      if (parentSlug === slug && branches.has(branchId)) visit(branches.get(branchId)!);
  }
  visit(rootSlug);
  return order;
}

function enrichBranchConditions(children: React.ReactNode, visibleOrder: string[]): React.ReactNode {
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
        (!condition || condition.every((t) => visibleOrder.includes(slugify(t)))) &&
        (!ifNot || ifNot.every((t) => !visibleOrder.includes(slugify(t))));
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
  let current = prevOpponent;
  const enriched =
    React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Matchup) {
        const props = child.props as { opponents: string[]; children: React.ReactNode };
        const isContinued = current !== null && current === props.opponents[0];
        current = props.opponents[props.opponents.length - 1] ?? null;
        return React.cloneElement(
          child as React.ReactElement<{ isContinued?: boolean; children?: React.ReactNode }>,
          { isContinued, children: enrichBranchConditions(props.children, visibleOrder) }
        );
      }
      return child;
    }) ?? [];
  return { enriched, lastOpponent: current };
}

type GraphCtxValue = {
  state: GraphState;
  dispatch: (action: GraphAction) => void;
  registerBranch: (branchId: string, parentSlug: string) => void;
  unregisterBranch: (branchId: string) => void;
};

const BattleGraphCtx = React.createContext<GraphCtxValue | null>(null);
const BattleLineCtx = React.createContext<string | null>(null);

export function BattleGraph({
  title = "Line",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const lineElements = React.Children.toArray(children).filter(
    (c): c is React.ReactElement<{ line: string; children: React.ReactNode }> =>
      React.isValidElement(c) && c.type === BattleLine
  );

  const lineMap = new Map(lineElements.map((el) => [slugify(el.props.line), el.props.children]));

  const rootSlug = lineElements.length > 0 ? slugify(lineElements[0].props.line) : "";

  const branchRegistry = useRef<Map<string, string>>(new Map());

  const withBranches = useCallback(
    (branches: Map<string, string>): GraphState => ({
      selectedBranches: branches,
      visibleOrder: computeOrder(rootSlug, branches, branchRegistry.current),
    }),
    [rootSlug]
  );

  const reducer = useMemo(
    () =>
      (state: GraphState, action: GraphAction): GraphState => {
        if (action.type === "SELECT_BRANCH") {
          const b = new Map(state.selectedBranches);
          b.set(action.branchId, action.childSlug);
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
    visibleOrder: [rootSlug],
    selectedBranches: new Map(),
  });

  const registerBranch = useCallback((branchId: string, parentSlug: string) => {
    branchRegistry.current.set(branchId, parentSlug);
  }, []);

  const unregisterBranch = useCallback((branchId: string) => {
    branchRegistry.current.delete(branchId);
  }, []);

  const ctx = useMemo(
    () => ({ state, dispatch, registerBranch, unregisterBranch }),
    [state, dispatch, registerBranch, unregisterBranch]
  );

  const lineRegistry = new Map<string, React.ReactNode>();
  let prevLastOpponent: string | null = null;
  for (const slug of state.visibleOrder) {
    const raw = lineMap.get(slug);
    if (raw !== undefined) {
      const { enriched, lastOpponent } = enrichMatchups(raw, prevLastOpponent, state.visibleOrder);
      lineRegistry.set(slug, enriched);
      prevLastOpponent = lastOpponent;
    }
  }

  return (
    <BattleGraphCtx.Provider value={ctx}>
      <CollapsibleCard title={title}>
        {state.visibleOrder.map((slug) => (
          <BattleLineCtx.Provider key={slug} value={slug}>
            {lineRegistry.get(slug)}
          </BattleLineCtx.Provider>
        ))}
      </CollapsibleCard>
    </BattleGraphCtx.Provider>
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
          opponents.map((sprite, i) => (
            <img key={i} src={spriteUrl(sprite)} alt={sprite} className={styles.sprite} />
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
  const parts = [];
  let i = 0;

  const orderMatch = move.match(ORDER_RE);
  parts.push(
    <span key={i++} className={styles.order}>
      {orderMatch![1]}
    </span>
  );
  const rest = move.slice(orderMatch![0].length);

  let last = 0;
  for (const match of rest.matchAll(TOKEN_RE)) {
    const text = rest.slice(last, match.index!).trim();
    if (text)
      parts.push(
        <span key={i++} className={styles.label}>
          {text}
        </span>
      );

    if (match[1] === "s") {
      parts.push(
        <img key={i++} src={spriteUrl(match[2])} alt={match[2]} className={styles.sprite} />
      );
    } else if (match[1] === "p") {
      parts.push(
        <span key={i++} className={styles.result}>
          {match[2]}
        </span>
      );
    }
    last = match.index! + match[0].length;
  }

  const trailing = rest.slice(last).trim();
  if (trailing)
    parts.push(
      <span key={i++} className={styles.label}>
        {trailing}
      </span>
    );

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
  const parentSlug = useContext(BattleLineCtx);
  const graphCtx = useContext(BattleGraphCtx);

  const registerBranch = graphCtx?.registerBranch;
  const unregisterBranch = graphCtx?.unregisterBranch;
  const dispatch = graphCtx?.dispatch;

  useEffect(() => {
    if (!registerBranch || !unregisterBranch || !parentSlug) return;
    registerBranch(branchId, parentSlug);
    return () => unregisterBranch(branchId);
  }, [branchId, parentSlug, registerBranch, unregisterBranch]);

  useEffect(() => {
    if (!dispatch) return;
    if (isActive === false) {
      dispatch({ type: "DESELECT_BRANCH", branchId });
    } else if (isActive === true && branch.length === 1) {
      dispatch({ type: "SELECT_BRANCH", branchId, childSlug: slugify(branch[0]) });
    }
  }, [branchId, dispatch, isActive]);

  const selectedChildSlug = graphCtx?.state.selectedBranches.get(branchId);

  if (isActive === false) return null;
  if (graphCtx && branch.length === 1) return null;

  return (
    <div className={styles.branchTurn}>
      <div className={`${styles.cell} ${styles.playerCell} ${styles.branchPlayerCell}`}>
        <div className={styles.turnAction}>
          <span className={styles.diamond}>?</span>
        </div>
      </div>
      <div className={`${styles.cell} ${styles.branchCell}`}>
        <div className={styles.turnAction}>
          {branch.map((item, j) => {
            const targetSlug = slugify(item);
            const isSelected = selectedChildSlug === targetSlug;
            return (
              <React.Fragment key={j}>
                {j === 0 && <span className={styles.label}>go</span>}
                {j > 0 && <span className={styles.label}>or</span>}
                {graphCtx ? (
                  <button
                    className={`${styles.branchOption} ${isSelected ? styles.branchOptionSelected : ""}`}
                    onClick={() =>
                      isSelected
                        ? graphCtx.dispatch({ type: "DESELECT_BRANCH", branchId })
                        : graphCtx.dispatch({ type: "SELECT_BRANCH", branchId, childSlug: targetSlug })
                    }
                  >
                    {item}
                  </button>
                ) : (
                  <a href={`#${targetSlug}`} className={styles.label}>
                    {item}
                  </a>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
