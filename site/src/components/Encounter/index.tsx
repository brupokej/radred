import Card from "@site/src/components/Card";
import Team, { Pokemon } from "@site/src/components/Team";
import { spriteUrl } from "@site/src/utils/sprites";
import { Fragment } from "react";
import styles from "./styles.module.css";

type Detail = string | { value: string; warning?: boolean };

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
  details?: Detail[];
  playerTeam?: Pokemon[];
}) {
  const displayName = toDisplayName(pokemon);

  return (
    <>
      {playerTeam && <Team title="Player Team" team={playerTeam} />}
      <Card title="Encounter Plan">
        <div className={styles.content}>
          <div className={styles.spritePanel}>
            <img src={spriteUrl(pokemon)} alt={displayName} className={styles.sprite} />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{displayName}</div>
            {details && details.length > 0 && (
              <div className={styles.detail}>
                {details.map((d, i) => {
                  const value = typeof d === "string" ? d : d.value;
                  const isWarning = typeof d !== "string" && d.warning;
                  return (
                    <Fragment key={i}>
                      {i > 0 && <span className={styles.separator}> · </span>}
                      {isWarning ? <span className={styles.detailWarning}>{value}</span> : value}
                    </Fragment>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
