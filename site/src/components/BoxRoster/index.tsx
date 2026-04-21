import Card from "@site/src/components/Card";
import { PokemonEntry } from "@site/src/components/PokemonEntry";
import { Row } from "@site/src/components/Row";
import { ScrollFade } from "@site/src/components/ScrollFade";
import { Box, resolveBox } from "@site/src/utils/box";
import { Moment } from "@site/src/utils/moments";
import { resolvePokemon } from "@site/src/utils/pokemon";
import { computeBattleFrags } from "@site/src/utils/stats";
import { useRef } from "react";
import styles from "./styles.module.css";

function computeTotals(moments: Moment[], renames: Record<string, string>) {
  const battles: Record<string, number> = {};
  const frags: Record<string, number> = {};
  const canon = (name: string) => renames[name] ?? name;
  for (const m of moments) {
    if (m.kind !== "battle") continue;
    for (const name of m.data.playerBox.team) {
      const key = canon(name);
      battles[key] = (battles[key] ?? 0) + 1;
    }
    for (const [name, count] of Object.entries(computeBattleFrags(m.data))) {
      const key = canon(name);
      frags[key] = (frags[key] ?? 0) + count;
    }
  }
  return { battles, frags };
}

export default function BoxRoster({
  box,
  moments,
  title = "Box",
}: {
  box: Box;
  moments?: Moment[];
  title?: string;
}) {
  const entries = [...resolveBox(box).values()]
    .map((p) => resolvePokemon(p))
    .sort((a, b) => {
      const levelDiff = (b.level ?? 0) - (a.level ?? 0);
      if (levelDiff !== 0) return levelDiff;
      return (a.boxOrder ?? Infinity) - (b.boxOrder ?? Infinity);
    });

  const renames = moments
    ? (moments.filter((m) => m.kind === "battle").at(-1) as Extract<Moment, { kind: "battle" }> | undefined)?.data.playerBox.renames ?? {}
    : {};
  const totals = moments ? computeTotals(moments, renames) : null;

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Card title={title}>
      <ScrollFade axis="y" arrows scrollRef={scrollRef}>
        <div ref={scrollRef} className={styles.scrollInner}>
          {entries.map((pokemon, i) => {
            const canon = renames[pokemon.name] ?? pokemon.name;
            const detail = [
              pokemon.level != null && `Level ${pokemon.level}`,
              `${(totals && totals.battles[canon] != null) ? totals.battles[canon] : 0} Battles`,
              `${(totals && totals.frags[canon] != null) ? totals.frags[canon] : 0} Frags`,
            ].join(" · ");
            return (
              <PokemonEntry key={i} pokemon={pokemon} className={i > 0 ? styles.bordered : undefined}>
                {detail && <Row row={[detail]} />}
              </PokemonEntry>
            );
          })}
        </div>
      </ScrollFade>
    </Card>
  );
}
