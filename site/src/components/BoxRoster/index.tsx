import Card from "@site/src/components/Card";
import { PokemonEntry } from "@site/src/components/PokemonEntry";
import { Row } from "@site/src/components/Row";
import { ScrollFade } from "@site/src/components/ScrollFade";
import { Box, resolveBox } from "@site/src/utils/box";
import { Moment } from "@site/src/utils/moments";
import { resolvePokemon } from "@site/src/utils/pokemon";
import { computeBattleFrags } from "@site/src/utils/stats";
import { useStorageState } from "@site/src/utils/storage";
import { LIVE_MOMENT_DEFAULT } from "@site/src/utils/storageDefaults";
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
  box?: Box;
  moments?: Moment[];
  title?: string;
}) {
  const { value: liveMomentLabel } = useStorageState("live-moment");
  if (moments) {
    const effectiveLabel = liveMomentLabel ?? LIVE_MOMENT_DEFAULT;
    const idx = moments.findIndex((m) => m.label === effectiveLabel);
    if (idx >= 0) moments = moments.slice(0, idx + 1);
  }

  const lastBattleMoment = moments
    ?.filter((m): m is Extract<Moment, { kind: "battle" }> => m.kind === "battle")
    .at(-1);

  const activeBox = lastBattleMoment?.data.playerBox ?? box;
  const renames = activeBox?.renames ?? {};

  const entries = activeBox
    ? [...resolveBox(activeBox).values()]
        .map((p) => resolvePokemon(p))
        .sort((a, b) => {
          const toNum = (l: number | string | undefined) =>
            l == null ? 0 : typeof l === "number" ? l : parseInt(l, 10);
          const levelDiff = toNum(b.level) - toNum(a.level);
          if (levelDiff !== 0) return levelDiff;
          return (a.boxOrder ?? Infinity) - (b.boxOrder ?? Infinity);
        })
    : [];

  const totals = moments ? computeTotals(moments, renames) : null;

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Card title={title}>
      <ScrollFade axis="y" scrollRef={scrollRef}>
        <div ref={scrollRef} className={styles.scrollInner}>
          {entries.map((pokemon, i) => {
            const canon = renames[pokemon.name] ?? pokemon.name;
            const levelLabel = pokemon.level != null ? `Level ${pokemon.level}` : null;
            const detail = [
              levelLabel,
              `${totals && totals.battles[canon] != null ? totals.battles[canon] : 0} Battles`,
              `${totals && totals.frags[canon] != null ? totals.frags[canon] : 0} Frags`,
            ]
              .filter(Boolean)
              .join(" · ");
            return (
              <PokemonEntry
                key={i}
                pokemon={pokemon}
                className={i > 0 ? styles.bordered : undefined}
              >
                {detail && <Row row={[detail]} />}
              </PokemonEntry>
            );
          })}
        </div>
      </ScrollFade>
    </Card>
  );
}
