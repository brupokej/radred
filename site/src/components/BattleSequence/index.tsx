import CollapsibleCard from "@site/src/components/CollapsibleCard";
import { spriteUrl } from "@site/src/utils/sprites";
import React from "react";
import styles from "./styles.module.css";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export function BattleLine({
  line,
  id,
  children,
}: {
  line?: string;
  id?: boolean;
  children: React.ReactNode;
}) {
  const slug = id && line ? slugify(line) : undefined;
  const titleText = line ? `Line: ${line}` : "Line";
  const title = slug ? (
    <>
      {titleText}
      <a
        href={`#${slug}`}
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
  return (
    <CollapsibleCard title={title} id={slug}>
      {children}
    </CollapsibleCard>
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
      <div className={`${styles.cell} ${styles.playerCell}`}>{turn.slice(0, mid)}</div>
      <div className={styles.cell}>{turn.slice(mid)}</div>
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
            return (
              <React.Fragment key={j}>
                {j === 0 && <span className={styles.label}>go</span>}
                {j > 0 && <span className={styles.label}>or</span>}
                {labelMatch && <span className={styles.branchLabel}>{label}</span>}
                <a href={`#${slugify(text)}`} className={styles.label}>
                  {text}
                </a>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
