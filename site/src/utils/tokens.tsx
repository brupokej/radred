import React from "react";
import { spriteUrl } from "./sprites";
import styles from "./tokens.module.css";

export const TOKEN_RE = /\{([a-z+\-]):([^}]+)\}/g;

type HpContext = {
  playerHp: Record<string, number>;
  opponentHp: Record<string, number>;
};

export function parseTokens(
  text: string,
  side?: "player" | "opponent",
  hpCtx?: HpContext | null,
  hpDisplay: "percent" | "raw" = "percent"
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
      parts.push(
        <img key={i++} src={spriteUrl(value, side)} alt={value} className={styles.sprite} />
      );
    } else if ((type === "+" || type === "-") && side !== undefined) {
      const isPlayerHp = type === "+";
      const num = parseInt(value, 10);
      let maxHp: number | undefined;
      if (lastSprite != null && hpCtx != null) {
        const { playerHp, opponentHp } = hpCtx;
        maxHp = isPlayerHp ? playerHp[lastSprite] : opponentHp[lastSprite];
        maxHp ??= playerHp[lastSprite] ?? opponentHp[lastSprite];
      }
      const suffix = isPlayerHp ? "↑" : "↓";
      const display =
        hpDisplay === "raw" || maxHp == null || maxHp <= 0 || isNaN(num)
          ? `${num}${num > 0 ? suffix : ""}`
          : `${Math.round((num / maxHp) * 100)}%${num > 0 ? suffix : ""}`;
      parts.push(
        <span key={i++} className={styles.result}>
          {display}
        </span>
      );
    } else if (type === "c") {
      parts.push(
        <span key={i++} className={styles.result}>
          {value}
        </span>
      );
    }
    last = match.index! + match[0].length;
  }
  const trailing = text.slice(last).trim();
  if (trailing) parts.push(<React.Fragment key={i++}>{trailing}</React.Fragment>);
  return parts;
}
