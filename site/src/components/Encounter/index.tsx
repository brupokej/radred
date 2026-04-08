import Card from "@site/src/components/Card";
import { Row, RowCell } from "@site/src/components/Row";
import Team from "@site/src/components/Team";
import { Box } from "@site/src/utils/box";
import { PokemonData } from "@site/src/utils/pokemon";
import { getColouredSpriteUrl } from "@site/src/utils/sprites";
import styles from "./styles.module.css";

export default function Encounter({
  encounter,
  row,
  playerBox,
}: {
  encounter: PokemonData;
  row: RowCell[];
  playerBox?: Box;
}) {
  return (
    <>
      {playerBox && (playerBox.team ?? []).length > 0 && (
        <Team title="Player Team" box={playerBox} />
      )}
      <Card title="Encounter Plan">
        <div className={styles.content}>
          <div className={styles.spritePanel}>
            <img
              src={getColouredSpriteUrl(encounter)}
              alt={encounter.name}
              className={styles.sprite}
            />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{encounter.name}</div>
            <Row row={row} />
          </div>
        </div>
      </Card>
    </>
  );
}
