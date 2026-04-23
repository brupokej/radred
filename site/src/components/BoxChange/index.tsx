import Card from "@site/src/components/Card";
import { Row } from "@site/src/components/Row";
import { Box } from "@site/src/utils/box";
import {
  getChanges,
  getHpChanges,
  getIVChanges,
  getLevelCap,
  getRemovals,
} from "@site/src/utils/boxChange";
import { formatStats } from "@site/src/utils/pokemon";

export interface BoxChangeData {
  playerBox: Box;
}

export default function BoxChange({ data }: { data: BoxChangeData }) {
  const box = data.playerBox;
  const removalRows: React.ReactNode[] = [];
  const capRows: React.ReactNode[] = [];
  const updateRows: React.ReactNode[] = [];
  let key = 0;

  for (const name of getRemovals(box)) {
    removalRows.push(<Row key={key++} row={[`${name} →`, { info: "Move to Box 2" }]} />);
  }

  const levelCap = getLevelCap(box);
  if (levelCap) {
    for (const { name, level } of levelCap.excluded) {
      capRows.push(<Row key={key++} row={[`${name} →`, { warning: `Keep at Level ${level}` }]} />);
    }
    const prefix = levelCap.excluded.length > 0 ? "Rest of Box 1" : "All of Box 1";
    capRows.push(
      <Row key={key++} row={[`${prefix} →`, { warning: `Set to Level ${levelCap.level} Cap` }]} />
    );
  }

  for (const pokemon of getChanges(box)) {
    updateRows.push(<Row key={key++} row={[pokemon]} />);
  }

  const ivRows: React.ReactNode[] = [];
  for (const { name, ivs, friend } of getIVChanges(box)) {
    const label = ivs
      ? `Set to ${formatStats(ivs)} IVs${friend ? ", max friendship" : ""}`
      : "Set to max friendship";
    ivRows.push(<Row key={key++} row={[`${name} → `, { warning: label }]} />);
  }

  const hpRows: React.ReactNode[] = [];
  for (const { name, hp } of getHpChanges(box)) {
    hpRows.push(<Row key={key++} row={[`${name} → `, { warning: `Set to HP ${hp}` }]} />);
  }

  const rows = [...removalRows, ...capRows, ...updateRows, ...hpRows, ...ivRows];
  if (rows.length === 0) return null;

  return <Card title="Box Change">{rows}</Card>;
}
