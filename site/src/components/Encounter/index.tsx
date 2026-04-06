import Card from "@site/src/components/Card";
import { Row, RowCell } from "@site/src/components/Row";
import Team from "@site/src/components/Team";
import { Box, getFromBox } from "@site/src/utils/box";
import { Pokemon } from "@site/src/utils/pokemon";
import { spriteUrl } from "@site/src/utils/sprites";
import styles from "./styles.module.css";

export default function Encounter({
  encounter,
  sprite,
  row,
  box,
  version,
  playerTeam: playerTeamProp,
}: {
  encounter: string;
  sprite: string;
  row: RowCell[];
  box?: Box;
  version?: number;
  playerTeam?: Pokemon[] | string[];
}) {
  const playerTeam =
    box !== undefined && version !== undefined
      ? (playerTeamProp as string[] | undefined)
          ?.map((name) => getFromBox(box, version, name))
          .filter((p): p is Pokemon => p !== null)
      : (playerTeamProp as Pokemon[] | undefined);

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
