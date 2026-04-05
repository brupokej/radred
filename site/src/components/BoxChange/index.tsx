import Card from "@site/src/components/Card";
import { Row } from "@site/src/components/Row";
import { Pokemon } from "@site/src/components/Team";
import {
  Box,
  getChangesAtVersion,
  getLevelCapAtVersion,
  getRemovalsAtVersion,
} from "@site/src/utils/box";

export default function BoxChange({
  box,
  versions,
  title = "Box Change",
}: {
  box: Box;
  versions: number[];
  title?: string;
}) {
  const removalRows: React.ReactNode[] = [];
  const otherRows: React.ReactNode[] = [];
  let key = 0;

  for (const version of versions) {
    const removals = getRemovalsAtVersion(box, version);
    for (const name of removals) {
      removalRows.push(<Row key={key++} row={[`${name} →`, { info: "Move to Box 2" }]} />);
    }
  }

  for (const version of versions) {
    const levelCap = getLevelCapAtVersion(box, version);
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
      const changes = getChangesAtVersion(box, version).sort(
        (a, b) => (a.index ?? 0) - (b.index ?? 0)
      );
      for (const pokemon of changes) {
        otherRows.push(<Row key={key++} row={[pokemon as Pokemon]} />);
      }
    }
  }

  const rows = [...removalRows, ...otherRows];
  if (rows.length === 0) return null;

  return <Card title={title}>{rows}</Card>;
}
