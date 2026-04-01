import Card from "@site/src/components/Card";
import Team, { Pokemon } from "@site/src/components/Team";
import { spriteUrl } from "@site/src/utils/sprites";
import styles from "./styles.module.css";

type Detail = string | { value: string; variant: "warning" | "info" };

export default function Encounter({
  encounter,
  sprite,
  details,
  playerTeam,
}: {
  encounter: string;
  sprite: string;
  details?: Detail[];
  playerTeam?: Pokemon[];
}) {
  return (
    <>
      {playerTeam && <Team title="Player Team" team={playerTeam} />}
      <Card title="Encounter Plan">
        <div className={styles.content}>
          <div className={styles.spritePanel}>
            <img src={spriteUrl(sprite)} alt={encounter} className={styles.sprite} />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{encounter}</div>
            {details && details.length > 0 && (
              <div className={styles.detail}>
                {details.map((d, i) => {
                  const value = typeof d === "string" ? d : d.value;
                  const variant = typeof d !== "string" ? d.variant : undefined;
                  const variantClass =
                    variant === "warning"
                      ? styles.detailWarning
                      : variant === "info"
                        ? styles.detailInfo
                        : undefined;
                  return (
                    <span
                      key={i}
                      className={`${styles.detailItem}${variantClass ? ` ${variantClass}` : ""}`}
                    >
                      {value}
                    </span>
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
