import Team, { Pokemon } from "@site/src/components/Team";
import { spriteUrl } from "@site/src/utils/sprites";
import styles from "./styles.module.css";

function toDisplayName(sprite: string) {
  return sprite
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("-");
}

export default function Encounter({
  pokemon,
  details,
  playerTeam,
}: {
  pokemon: string;
  details?: string[];
  playerTeam?: Pokemon[];
}) {
  const displayName = toDisplayName(pokemon);
  const detail = details?.join(" · ");

  return (
    <>
      {playerTeam && <Team title="Player Team" team={playerTeam} />}
      <div className={styles.card}>
        <div className={styles.spritePanel}>
          <img src={spriteUrl(pokemon)} alt={displayName} className={styles.sprite} />
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{displayName}</div>
          {detail && <div className={styles.detail}>{detail}</div>}
        </div>
      </div>
    </>
  );
}
