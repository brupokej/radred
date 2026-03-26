import CollapsibleCard from "@site/src/components/CollapsibleCard";
import { spriteUrl } from "@site/src/utils/sprites";
import React from "react";
import styles from "./styles.module.css";

export function BattleLine({
  line,
  id,
  children,
}: {
  line?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <CollapsibleCard title={line ? `Line: ${line}` : "Line"} id={id}>
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
  const mid = turn.length / 2;
  return (
    <div className={styles.turn}>
      <div className={`${styles.cell} ${styles.playerCell}`}>{turn.slice(0, mid)}</div>
      <div className={styles.cell}>{turn.slice(mid)}</div>
    </div>
  );
}

const ORDER_RE = /^\{(\d+)\}\s*/;
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
