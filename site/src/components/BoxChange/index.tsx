import Card from "@site/src/components/Card";
import { Row } from "@site/src/components/Row";
import { Box, getChanges, getLevelCap, getRemovals } from "@site/src/utils/box";

export default function BoxChange({
  snapshots,
  title = "Box Change",
}: {
  snapshots: Box[];
  title?: string;
}) {
  const removalRows: React.ReactNode[] = [];
  const otherRows: React.ReactNode[] = [];
  let key = 0;

  for (const snapshot of snapshots) {
    const removals = getRemovals(snapshot);
    for (const name of removals) {
      removalRows.push(<Row key={key++} row={[`${name} →`, { info: "Move to Box 2" }]} />);
    }
  }

  for (const snapshot of snapshots) {
    const levelCap = getLevelCap(snapshot);
    if (levelCap) {
      for (const { name, level } of levelCap.excluded) {
        otherRows.push(
          <Row key={key++} row={[`${name} →`, { warning: `Keep at Level ${level}` }]} />
        );
      }
      const prefix = levelCap.excluded.length > 0 ? "Rest of Box 1" : "All of Box 1";
      otherRows.push(
        <Row key={key++} row={[`${prefix} →`, { warning: `Set to Level ${levelCap.level} Cap` }]} />
      );
    } else {
      for (const pokemon of getChanges(snapshot)) {
        otherRows.push(<Row key={key++} row={[pokemon]} />);
      }
    }
  }

  const rows = [...removalRows, ...otherRows];
  if (rows.length === 0) return null;

  return <Card title={title}>{rows}</Card>;
}
