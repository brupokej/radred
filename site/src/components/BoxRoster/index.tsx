import Card from "@site/src/components/Card";
import { PokemonEntry } from "@site/src/components/PokemonEntry";
import { Row } from "@site/src/components/Row";
import { ScrollFade } from "@site/src/components/ScrollFade";
import { getCanon, resolveBox } from "@site/src/utils/box";
import { Moment } from "@site/src/utils/moments";
import { resolvePokemon } from "@site/src/utils/pokemon";
import { computeBattleFrags } from "@site/src/utils/stats";
import { useStorageState } from "@site/src/utils/storage";
import { LIVE_MOMENT_DEFAULT } from "@site/src/utils/storageDefaults";
import styles from "./styles.module.css";

function computeTotals(moments: Moment[], canon: (name: string) => string) {
  const battles: Record<string, number> = {};
  const frags: Record<string, number> = {};
  for (const m of moments) {
    if (m.kind !== "battle") continue;
    for (const name of resolveBox(m.data.playerBox).team ?? []) {
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
  moments,
  title = "Box",
}: {
  moments: Moment[];
  title?: string;
}) {
  const { value: liveMomentLabel } = useStorageState("live-moment");
  const effectiveLabel = liveMomentLabel ?? LIVE_MOMENT_DEFAULT;
  const idx = moments.findIndex((m) => m.label === effectiveLabel);
  const sliced = idx >= 0 ? moments.slice(0, idx + 1) : moments;

  let resolvedActive = null;
  for (let i = sliced.length - 1; i >= 0; i--) {
    const m = sliced[i];
    if (m.kind === "battle" || m.kind === "encounter") {
      resolvedActive = resolveBox(m.data.playerBox);
      break;
    }
  }

  const canon = getCanon(resolvedActive);

  const entries = resolvedActive
    ? resolvedActive.pokemon
        .map((p) => resolvePokemon(p))
        .sort((a, b) => {
          const toNum = (l: number | string | undefined) =>
            l == null ? 0 : typeof l === "number" ? l : parseInt(l, 10);
          const levelDiff = toNum(b.level) - toNum(a.level);
          if (levelDiff !== 0) return levelDiff;
          return (a.boxOrder ?? Infinity) - (b.boxOrder ?? Infinity);
        })
    : [];

  const totals = computeTotals(sliced, canon);

  return (
    <Card title={title}>
      <ScrollFade axis="y" className={styles.scrollInner}>
        {entries.map((pokemon, i) => {
          const canonName = canon(pokemon.name);
          const levelLabel = pokemon.level != null ? `Level ${pokemon.level}` : null;
          const detail = [
            levelLabel,
            `${totals.battles[canonName] ?? 0} Battles`,
            `${totals.frags[canonName] ?? 0} Frags`,
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
      </ScrollFade>
    </Card>
  );
}
