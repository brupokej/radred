import { PokemonData } from "@site/src/utils/pokemon";
import { getColouredSpriteUrl } from "@site/src/utils/sprites";
import { ReactNode } from "react";
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
  return (
    <div className={`${styles.entry} ${className ?? ""}`}>
      <div className={styles.spritePanel}>
        <img
          src={getColouredSpriteUrl(pokemon)}
          alt={pokemon.name}
          className={styles.sprite}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{pokemon.name}</div>
        {children}
      </div>
    </div>
  );
}
