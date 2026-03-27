import CollapsibleCard from "@site/src/components/CollapsibleCard";
import { spriteUrl } from "@site/src/utils/sprites";
import React, { useCallback, useContext, useEffect, useId, useMemo, useReducer, useRef } from "react";
import styles from "./styles.module.css";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

type GraphState = {
  visibleLines: Set<string>;
  selectedBranches: Map<string, string>;
};

type GraphAction =
  | { type: "SELECT_BRANCH"; goId: string; childSlug: string }
  | { type: "DESELECT_BRANCH"; goId: string };

function computeVisible(
  rootSlug: string,
  branches: Map<string, string>,
  registry: Map<string, string>
): Set<string> {
  const visible = new Set<string>();
  const visited = new Set<string>();
  function visit(slug: string) {
    if (visited.has(slug)) return;
    visited.add(slug);
    visible.add(slug);
    for (const [goId, parentSlug] of registry)
      if (parentSlug === slug && branches.has(goId)) visit(branches.get(goId)!);
  }
  visit(rootSlug);
  return visible;
}

type GraphCtxValue = {
  state: GraphState;
  dispatch: (action: GraphAction) => void;
  registerGo: (goId: string, parentSlug: string) => void;
  unregisterGo: (goId: string) => void;
};

const BattleGraphCtx = React.createContext<GraphCtxValue | null>(null);
const BattleLineCtx = React.createContext<string | null>(null);

export function BattleGraph({
  root,
  title = "Line",
  children,
}: {
  root: string;
  title?: string;
  children: React.ReactNode;
}) {
  const rootSlug = slugify(root);
  const goRegistry = useRef<Map<string, string>>(new Map());

  const withBranches = useCallback(
    (branches: Map<string, string>): GraphState => ({
      selectedBranches: branches,
      visibleLines: computeVisible(rootSlug, branches, goRegistry.current),
    }),
    [rootSlug]
  );

  const reducer = useMemo(
    () =>
      (state: GraphState, action: GraphAction): GraphState => {
        if (action.type === "SELECT_BRANCH") {
          const b = new Map(state.selectedBranches);
          b.set(action.goId, action.childSlug);
          return withBranches(b);
        }
        if (action.type === "DESELECT_BRANCH") {
          const b = new Map(state.selectedBranches);
          b.delete(action.goId);
          return withBranches(b);
        }
        return state;
      },
    [withBranches]
  );

  const [state, dispatch] = useReducer(reducer, {
    visibleLines: new Set([rootSlug]),
    selectedBranches: new Map(),
  });

  const registerGo = useCallback((goId: string, parentSlug: string) => {
    goRegistry.current.set(goId, parentSlug);
  }, []);

  const unregisterGo = useCallback((goId: string) => {
    goRegistry.current.delete(goId);
  }, []);

  const ctx = useMemo(
    () => ({ state, dispatch, registerGo, unregisterGo }),
    [state, dispatch, registerGo, unregisterGo]
  );

  return (
    <BattleGraphCtx.Provider value={ctx}>
      <CollapsibleCard title={title}>{children}</CollapsibleCard>
    </BattleGraphCtx.Provider>
  );
}

export function BattleLine({
  line,
  id,
  children,
}: {
  line?: string;
  id?: boolean;
  children: React.ReactNode;
}) {
  const lineSlug = line ? slugify(line) : undefined;
  const graphCtx = useContext(BattleGraphCtx);

  if (graphCtx && lineSlug && !graphCtx.state.visibleLines.has(lineSlug)) return null;

  let content: React.ReactNode = children;
  if (!graphCtx) {
    const anchorSlug = id && lineSlug ? lineSlug : undefined;
    const titleText = line ? `Line: ${line}` : "Line";
    const title = anchorSlug ? (
      <>
        {titleText}
        <a
          href={`#${anchorSlug}`}
          className="hash-link"
          aria-label={`Direct link to ${line}`}
          title={`Direct link to ${line}`}
          translate="no"
          onClick={(e) => e.stopPropagation()}
        >
          ​
        </a>
      </>
    ) : (
      titleText
    );
    content = <CollapsibleCard title={title} id={anchorSlug}>{children}</CollapsibleCard>;
  }

  return (
    <BattleLineCtx.Provider value={lineSlug ?? null}>
      {content}
    </BattleLineCtx.Provider>
  );
}

export function Matchup({
  opponents,
  children,
}: {
  opponents: string[];
  children: React.ReactNode;
}) {
  return (
    <div className={styles.matchup}>
      <div className={styles.opponents}>
        {opponents.map((sprite, i) => (
          <img key={i} src={spriteUrl(sprite)} alt={sprite} className={styles.opponentSprite} />
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
        {turn.slice(0, mid).map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}
      </div>
      <div className={styles.cell}>
        {turn.slice(mid).map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}
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
        <img key={i++} src={spriteUrl(match[2])} alt={match[2]} className={styles.actionSprite} />
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

export function Go({ go, if: condition }: { go: string[]; if?: string }) {
  const goId = useId();
  const parentSlug = useContext(BattleLineCtx);
  const graphCtx = useContext(BattleGraphCtx);

  const registerGo = graphCtx?.registerGo;
  const unregisterGo = graphCtx?.unregisterGo;
  useEffect(() => {
    if (!registerGo || !unregisterGo || !parentSlug) return;
    registerGo(goId, parentSlug);
    return () => unregisterGo(goId);
  }, [goId, parentSlug, registerGo, unregisterGo]);

  const selectedChildSlug = graphCtx?.state.selectedBranches.get(goId);

  return (
    <div className={styles.branchTurn}>
      <div className={`${styles.cell} ${styles.playerCell} ${styles.branchPlayerCell}`}>
        <div className={styles.turnAction}>
          <span className={styles.diamond}>{condition}</span>
        </div>
      </div>
      <div className={`${styles.cell} ${styles.branchCell}`}>
        <div className={styles.turnAction}>
          {go.map((item, j) => {
            const labelMatch = item.match(ORDER_RE);
            const label = labelMatch ? labelMatch[1] : "";
            const text = labelMatch ? item.slice(labelMatch[0].length) : item;
            const targetSlug = slugify(text);
            const isSelected = selectedChildSlug === targetSlug;
            return (
              <React.Fragment key={j}>
                {j === 0 && <span className={styles.label}>go</span>}
                {j > 0 && <span className={styles.label}>or</span>}
                {labelMatch && <span className={styles.branchLabel}>{label}</span>}
                {graphCtx ? (
                  <button
                    className={`${styles.goOption} ${isSelected ? styles.goOptionSelected : ""}`}
                    onClick={() =>
                      isSelected
                        ? graphCtx.dispatch({ type: "DESELECT_BRANCH", goId })
                        : graphCtx.dispatch({ type: "SELECT_BRANCH", goId, childSlug: targetSlug })
                    }
                  >
                    {text}
                  </button>
                ) : (
                  <a href={`#${targetSlug}`} className={styles.label}>
                    {text}
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
