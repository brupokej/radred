import Card from "@site/src/components/Card";
import { Row } from "@site/src/components/Row";
import {
  Box,
  getChanges,
  getIVChanges,
  getLevelCap,
  getRemovals,
  splitChanges,
} from "@site/src/utils/box";
import { formatStats } from "@site/src/utils/pokemon";

export interface BoxChangeData {
  playerBox: Box;
}

export default function BoxChange({ data }: { data: BoxChangeData }) {
  const resolvedBox = data.playerBox;
  const boxes = splitChanges(resolvedBox);
  const removalRows: React.ReactNode[] = [];
  const capRows: React.ReactNode[] = [];
  const updateRows: React.ReactNode[] = [];
  let key = 0;

  for (const box of boxes) {
    for (const name of getRemovals(box)) {
      removalRows.push(<Row key={key++} row={[`${name} →`, { info: "Move to Box 2" }]} />);
    }
  }

  for (const box of boxes) {
    const levelCap = getLevelCap(box);
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

  for (const box of boxes) {
    for (const pokemon of getChanges(box)) {
      updateRows.push(<Row key={key++} row={[pokemon]} />);
    }
  }

  const ivRows: React.ReactNode[] = [];
  for (const box of boxes) {
    for (const { name, ivs, friend } of getIVChanges(box)) {
      const label = ivs
        ? `Set to ${formatStats(ivs)} IVs${friend ? ", max friendship" : ""}`
        : "Set to max friendship";
      ivRows.push(<Row key={key++} row={[`${name} → `, { warning: label }]} />);
    }
  }

  const rows = [...removalRows, ...capRows, ...updateRows, ...ivRows];
  if (rows.length === 0) return null;

  return <Card title="Box Change">{rows}</Card>;
}
