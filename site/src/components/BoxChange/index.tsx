import Card from "@site/src/components/Card";
import { Row } from "@site/src/components/Row";
import { Pokemon } from "@site/src/components/Team";
import { Box } from "@site/src/utils/box";

export default function BoxChange({
  box,
  versions,
  title = "Box Change",
}: {
  box: Box;
  versions: number[];
  title?: string;
}) {
  const rows: { pokemon: Pokemon; version: number }[] = [];

  for (const version of versions) {
    for (const history of Object.values(box.slots)) {
      const pokemon = history[version-1];
      if (pokemon?.previous && Object.keys(pokemon.previous).length > 0) {
        rows.push({ pokemon, version });
      }
    }
  }

  rows.sort((a, b) => {
    const indexDiff = (a.pokemon.index ?? 0) - (b.pokemon.index ?? 0);
    if (indexDiff !== 0) return indexDiff;
    return a.version - b.version;
  });

  if (rows.length === 0) return null;

  return (
    <Card title={title}>
      {rows.map(({ pokemon }, i) => (
        <Row key={i} row={[pokemon]} />
      ))}
    </Card>
  );
}
