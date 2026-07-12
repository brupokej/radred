import Card from "@site/src/components/Card";
import { Row, RowCell } from "@site/src/components/Row";
import Team from "@site/src/components/Team";
import { Box } from "@site/src/utils/box";
import styles from "./styles.module.css";

export interface ChecklistData {
  playerBox: Box;
  rows?: RowCell[][];
}

export default function Checklist({ data }: { data: ChecklistData }) {
  return (
    <>
      <Team title="Player Team" box={data.playerBox} />
      {data.rows && (
        <Card title="Game Setup">
          {data.rows.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </Card>
      )}
    </>
  );
}
