import Card from "@site/src/components/Card";
import { Row } from "@site/src/components/Row";
import { secretMode } from "@site/src/data/secretMode";
import { Box } from "@site/src/utils/box";
import {
  getAbilityChanges,
  getChanges,
  getIVChanges,
  getLevelCap,
  getRemovals,
  getRemoveItemsChanges,
} from "@site/src/utils/boxChange";
import { formatStats } from "@site/src/utils/pokemon";

export interface BoxChangeData {
  playerBox: Box;
}

export default function BoxChange({ data, secret }: { data?: BoxChangeData; secret?: boolean }) {
  if (!data) return null;
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
  for (const { name, ivs } of getIVChanges(box)) {
    const label = `Set to ${formatStats(ivs)} IVs`;
    ivRows.push(<Row key={key++} row={[`${name} → `, { warning: label }]} />);
  }

  const abilityRows: React.ReactNode[] = [];
  for (const { name, ability } of getAbilityChanges(box)) {
    abilityRows.push(
      <Row key={key++} row={[`${name} →`, { warning: `Set to ${ability} ability` }]} />
    );
  }

  const removeItemsRows: React.ReactNode[] = [];
  if (getRemoveItemsChanges(box)) {
    removeItemsRows.push(
      <Row key={key++} row={[`All Pokémon →`, { warning: `Held Items → Bag` }]} />
    );
  }

  const rows = [
    ...removalRows,
    ...capRows,
    ...updateRows,
    ...ivRows,
    ...abilityRows,
    ...removeItemsRows,
  ];
  if (rows.length === 0) return null;

  const card = <Card title="Box Change">{rows}</Card>;

  if (secret && secretMode) return <div data-secret="true">{card}</div>;
  return card;
}
