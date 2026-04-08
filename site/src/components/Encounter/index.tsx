import Card from "@site/src/components/Card";
import { Row, RowCell } from "@site/src/components/Row";
import Team from "@site/src/components/Team";
import { Box, resolveBox } from "@site/src/utils/box";
import { Pokemon, PokemonData } from "@site/src/utils/pokemon";
import { getColouredSpriteUrl } from "@site/src/utils/sprites";
import styles from "./styles.module.css";

export default function Encounter({
  encounter,
  row,
  playerBox,
  playerTeam: playerTeamNames,
}: {
  encounter: PokemonData;
  row: RowCell[];
  playerBox?: Box;
  playerTeam?: string[];
}) {
  const playerTeam =
    playerBox !== undefined
      ? playerTeamNames
          ?.map((name) => resolveBox(playerBox).get(name))
          .filter((p): p is Pokemon => p !== undefined)
      : undefined;

  return (
    <>
      {playerTeam && <Team title="Player Team" team={playerTeam} />}
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
