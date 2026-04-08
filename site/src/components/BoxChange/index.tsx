import Card from "@site/src/components/Card";
import { Row } from "@site/src/components/Row";
import { Box, getChanges, getLevelCap, getRemovals, splitSnapshot } from "@site/src/utils/box";

export default function BoxChange({
  box,
  title = "Box Change",
}: {
  box: Box;
  title?: string;
}) {
  const snapshots = splitSnapshot(box);
  const removalRows: React.ReactNode[] = [];
  const capRows: React.ReactNode[] = [];
  const updateRows: React.ReactNode[] = [];
  let key = 0;

  for (const snapshot of snapshots) {
    for (const name of getRemovals(snapshot)) {
      removalRows.push(<Row key={key++} row={[`${name} →`, { info: "Move to Box 2" }]} />);
    }
  }

  for (const snapshot of snapshots) {
    const levelCap = getLevelCap(snapshot);
    if (levelCap) {
      for (const { name, level } of levelCap.excluded) {
        capRows.push(
          <Row key={key++} row={[`${name} →`, { warning: `Keep at Level ${level}` }]} />
        );
      }
      const prefix = levelCap.excluded.length > 0 ? "Rest of Box 1" : "All of Box 1";
      capRows.push(
        <Row key={key++} row={[`${prefix} →`, { warning: `Set to Level ${levelCap.level} Cap` }]} />
      );
    }
  }

  for (const snapshot of snapshots) {
    for (const pokemon of getChanges(snapshot)) {
      updateRows.push(<Row key={key++} row={[pokemon]} />);
    }
  }

  const rows = [...removalRows, ...capRows, ...updateRows];
  if (rows.length === 0) return null;

  return <Card title={title}>{rows}</Card>;
}
