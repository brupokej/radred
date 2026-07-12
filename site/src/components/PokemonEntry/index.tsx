import { PokemonData } from "@site/src/utils/pokemon";
import { SpriteImg } from "@site/src/utils/SpriteImg";
import { ReactNode, useEffect, useRef, useState } from "react";
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
  const spriteKey = pokemon.spriteKey ?? pokemon.name;
  const [loadError, setLoadError] = useState(false);
  const [trackedKey, setTrackedKey] = useState(spriteKey);
  if (spriteKey !== trackedKey) {
    setLoadError(false);
    setTrackedKey(spriteKey);
  }
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setLoadError(true);
  }, [spriteKey]);

  return (
    <div className={`${styles.entry} ${className ?? ""}`}>
      <div className={styles.spritePanel}>
        {!loadError ? (
          <SpriteImg
            ref={imgRef}
            pokemon={pokemon}
            className={styles.sprite}
            onError={() => setLoadError(true)}
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
