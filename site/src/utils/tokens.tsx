import React, { useEffect, useRef, useState } from "react";
import { PokemonData } from "./pokemon";
import { getColouredSpriteUrl, getMonotoneSpriteUrl } from "./sprites";
import styles from "./tokens.module.css";

function TokenSprite({ pokemon, monotone }: { pokemon: PokemonData; monotone: boolean }) {
  const key = pokemon.spriteKey ?? pokemon.name;
  const [loadError, setLoadError] = useState(false);
  const [trackedKey, setTrackedKey] = useState(key);
  if (key !== trackedKey) {
    setLoadError(false);
    setTrackedKey(key);
  }
  const imgError = key === "secret" || loadError;
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setLoadError(true);
  }, [key]);
  return imgError ? (
    <span className={styles.emptySprite}>?</span>
  ) : (
    <img
      ref={imgRef}
      src={monotone ? getMonotoneSpriteUrl(pokemon) : getColouredSpriteUrl(pokemon)}
      alt={pokemon.name}
      className={styles.sprite}
      onError={() => setLoadError(true)}
    />
  );
}

export const TOKEN_RE = /\{([a-z+\-=]):([^}]+)\}/g;

export type HpContext = {
  maxHp: Record<string, number>;
  teamMap?: Record<string, PokemonData>;
};

export function parseTokens(
  text: string,
  side: "player" | "opponent" | null = null,
  hpCtx: HpContext | null = null,
  hpDisplay: "percent" | "raw" = "percent"
): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let i = 0;
  let last = 0;
  let lastSpriteKey: string | null = null;
  for (const match of text.matchAll(TOKEN_RE)) {
    const segment = text.slice(last, match.index!).trim();
    if (segment)
      parts.push(
        <span key={i++} data-token="text">
          {segment}
        </span>
      );
    const [, type, value] = match;
    if (type === "p" || type === "o") {
      const name = value;
      const pokemon: PokemonData = hpCtx?.teamMap?.[`${type}:${name}`] ?? { name };
      lastSpriteKey = `${type}:${name}`;
      parts.push(<TokenSprite key={i++} pokemon={pokemon} monotone={side === "opponent"} />);
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
        const round = type === "-" ? Math.ceil : Math.floor;
        const pct = round((num / maxHp!) * 100);
        const clampedPct = pct === 0 && num > 0 ? 1 : pct === 100 && num < maxHp! ? 99 : pct;
        resultContent = (
          <>
            {clampedPct}
            {showSuffix && "%"}
            {showSuffix ? suffix : ""}
          </>
        );
      } else {
        resultContent = value;
      }
      parts.push(
        <span key={i++} className={styles.result} data-token="result">
          {resultContent}
        </span>
      );
    } else if (type === "c") {
      parts.push(
        <span key={i++} className={styles.result} data-token="result">
          {value}
        </span>
      );
    }
    last = match.index! + match[0].length;
  }
  const trailing = text.slice(last).trim();
  if (trailing) {
    parts.push(
      trailing === "..." ? (
        <React.Fragment key={i++}>{trailing}</React.Fragment>
      ) : (
        <span key={i++} data-token="text">
          {trailing}
        </span>
      )
    );
  }
  return parts;
}
