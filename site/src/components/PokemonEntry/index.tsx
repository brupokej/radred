import { PokemonData } from "@site/src/utils/pokemon";
import { getColouredSpriteUrl } from "@site/src/utils/sprites";
import { ReactNode, useEffect, useState } from "react";
import styles from "./styles.module.css";

export function PokemonEntry({
  pokemon,
  children,
  className,
}: {
  pokemon: PokemonData;
  children?: ReactNode;
  className?: string;
}) {
  const [imgError, setImgError] = useState(false);
  useEffect(() => setImgError(false), [pokemon.spriteKey ?? pokemon.name]);

  return (
    <div className={`${styles.entry} ${className ?? ""}`}>
      <div className={styles.spritePanel}>
        {!imgError ? (
          <img
            src={getColouredSpriteUrl(pokemon)}
            alt={pokemon.name}
            className={styles.sprite}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.emptySprite}>?</div>
        )}
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{pokemon.name}</span>
        {children}
      </div>
    </div>
  );
}
