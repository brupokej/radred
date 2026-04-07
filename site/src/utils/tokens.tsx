import React from "react";
import { PokemonData } from "./pokemon";
import { getColouredSpriteUrl, getMonotoneSpriteUrl } from "./sprites";
import styles from "./tokens.module.css";

export const TOKEN_RE = /\{([a-z+\-=]):([^}]+)\}/g;

export type HpContext = {
  maxHp: Record<string, number>;
  teamMap?: Record<string, PokemonData>;
};

export function parseTokens(
  text: string,
  side?: "player" | "opponent" | null = null,
  hpCtx?: HpContext | null = null,
  hpDisplay: "percent" | "raw" = "percent"
): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let i = 0;
  let last = 0;
  let lastSpriteKey: string | null = null;
  for (const match of text.matchAll(TOKEN_RE)) {
    const segment = text.slice(last, match.index!).trim();
    if (segment) parts.push(<React.Fragment key={i++}>{segment}</React.Fragment>);
    const [, type, value] = match;
    if (type === "p" || type === "o") {
      const name = value;
      const pokemon: PokemonData = hpCtx?.teamMap?.[`${type}:${name}`] ?? { name, level: 0 };
      const spriteUrl =
        side === "opponent" ? getMonotoneSpriteUrl(pokemon) : getColouredSpriteUrl(pokemon);
      lastSpriteKey = `${type}:${name}`;
      parts.push(<img key={i++} src={spriteUrl} alt={name} className={styles.sprite} />);
    } else if (type === "+" || type === "-" || type === "=") {
      const num = parseInt(value, 10);
      let maxHp: number | undefined;
      if (lastSpriteKey != null && hpCtx != null) {
        const hp = hpCtx.maxHp[lastSpriteKey];
        if (hp > 0) maxHp = hp;
      }
      const suffix = type === "+" ? "↑" : type === "-" ? "↓" : "";
      const hasHp = maxHp != null && !isNaN(num);
      const showSuffix = num > 0;
      let resultContent: React.ReactNode;
      if (hpDisplay === "raw" && hasHp) {
        resultContent = (
          <>
            {num}
            {showSuffix && <span className={styles.resultMuted}>/{maxHp}</span>}
            {showSuffix && suffix}
          </>
        );
      } else if (hpDisplay === "raw") {
        resultContent = `${num}${showSuffix ? suffix : ""}`;
      } else if (hasHp) {
        resultContent = (
          <>
            {Math.round((num / maxHp!) * 100)}
            {showSuffix && "%"}
            {showSuffix ? suffix : ""}
          </>
        );
      } else {
        resultContent = value;
      }
      parts.push(
        <span key={i++} className={styles.result}>
          {resultContent}
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
