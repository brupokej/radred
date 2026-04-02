import Card from "@site/src/components/Card";
import { Row, RowCell } from "@site/src/components/Row";
import Team, { Pokemon } from "@site/src/components/Team";
import { spriteUrl } from "@site/src/utils/sprites";
import styles from "./styles.module.css";

export default function Encounter({
  encounter,
  sprite,
  row,
  playerTeam,
}: {
  encounter: string;
  sprite: string;
  row: RowCell[];
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
            <Row row={row} />
          </div>
        </div>
      </Card>
    </>
  );
}
