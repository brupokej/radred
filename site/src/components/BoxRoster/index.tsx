import { resolveActiveBox } from "@site/src/components/Battle";
import Card from "@site/src/components/Card";
import { PokemonEntry } from "@site/src/components/PokemonEntry";
import { Row } from "@site/src/components/Row";
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
    for (const name of resolveBox(resolveActiveBox(m.data)).team ?? []) {
      const key = canon(name);
      battles[key] = (battles[key] ?? 0) + 1;
    }
    for (const [name, count] of Object.entries(computeBattleFrags(m.data)) as [string, number][]) {
      const key = canon(name);
      frags[key] = (frags[key] ?? 0) + count;
    }
  }
  return { battles, frags };
}

export default function BoxRoster({
  moments,
  title = "Box",
  filter,
}: {
  moments: Moment[];
  title?: string;
  filter?: "team" | "box1" | "box2";
}) {
  const { value: liveMomentLabel } = useStorageState("live-moment");
  const effectiveLabel = liveMomentLabel ?? LIVE_MOMENT_DEFAULT;
  const idx = moments.findIndex((m) => m.label === effectiveLabel);
  const sliced = idx >= 0 ? moments.slice(0, idx + 1) : moments;

  let resolvedActive = null;
  for (let i = sliced.length - 1; i >= 0; i--) {
    const m = sliced[i];
    if (m.kind === "battle") {
      resolvedActive = resolveBox(resolveActiveBox(m.data));
      break;
    }
    if (m.kind === "encounter") {
      resolvedActive = resolveBox(m.data.playerBox);
      break;
    }
  }

  const canon = getCanon(resolvedActive);

  const teamOrder = new Map<string, number>(
    (resolvedActive?.team ?? []).map((name, i) => [name, i] as [string, number])
  );
  const extraTeamOrder = new Map<string, number>(
    (resolvedActive?.extraTeam ?? []).map((name, i) => [name, i] as [string, number])
  );
  const removedSet = new Set(resolvedActive?.removed ?? []);

  const toNum = (l: number | string | undefined) =>
    l == null ? 0 : typeof l === "number" ? l : parseInt(l, 10);

  const entries = resolvedActive
    ? resolvedActive.pokemon
        .map((p) => resolvePokemon(p))
        .filter((p) => {
          if (filter === undefined) return true;
          if (teamOrder.has(p.name) || extraTeamOrder.has(p.name)) return filter === "team";
          if (removedSet.has(p.name)) return filter === "box2";
          return filter === "box1";
        })
        .sort((a, b) => {
          const aTeam = teamOrder.get(a.name);
          const bTeam = teamOrder.get(b.name);
          if (aTeam !== undefined && bTeam !== undefined) return aTeam - bTeam;
          if (aTeam !== undefined) return -1;
          if (bTeam !== undefined) return 1;

          const aExtra = extraTeamOrder.get(a.name);
          const bExtra = extraTeamOrder.get(b.name);
          if (aExtra !== undefined && bExtra !== undefined) return aExtra - bExtra;
          if (aExtra !== undefined) return -1;
          if (bExtra !== undefined) return 1;

          const levelDiff = toNum(b.level) - toNum(a.level);
          if (levelDiff !== 0) return levelDiff;
          return (a.boxOrder ?? Infinity) - (b.boxOrder ?? Infinity);
        })
    : [];

  if (entries.length === 0) return null;

  const totals = computeTotals(sliced, canon);

  return (
    <Card title={title}>
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
          <PokemonEntry key={i} pokemon={pokemon} className={i > 0 ? styles.bordered : undefined}>
            {detail && <Row row={[detail]} />}
          </PokemonEntry>
        );
      })}
    </Card>
  );
}
