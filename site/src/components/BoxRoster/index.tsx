import { resolveActiveBox } from "@site/src/components/Battle";
import Card from "@site/src/components/Card";
import { PokemonEntry } from "@site/src/components/PokemonEntry";
import { Row } from "@site/src/components/Row";
import { getSwitchBattleCaseData } from "@site/src/components/SwitchBattle";
import { isExtraEntry, resolveBox, teamEntryName } from "@site/src/utils/box";
import { Moment } from "@site/src/utils/moments";
import { resolvePokemon } from "@site/src/utils/pokemon";
import { useStorageState } from "@site/src/utils/storage";
import { LIVE_MOMENT_DEFAULT } from "@site/src/utils/storageDefaults";
import styles from "./styles.module.css";

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
    if (m.kind === "switchBattle") {
      resolvedActive = resolveBox(resolveActiveBox(getSwitchBattleCaseData(m.data)));
      break;
    }
    if (m.kind === "encounter") {
      resolvedActive = resolveBox(m.data.playerBox);
      break;
    }
  }

  const teamOrder = new Map<string, number>();
  const extraTeamOrder = new Map<string, number>();
  (resolvedActive?.team ?? []).forEach((entry, i) => {
    (isExtraEntry(entry) ? extraTeamOrder : teamOrder).set(teamEntryName(entry), i);
  });
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
          if (filter === "box2") return (b.removeOrder ?? -Infinity) - (a.removeOrder ?? -Infinity);
          return (a.addOrder ?? Infinity) - (b.addOrder ?? Infinity);
        })
    : [];

  if (entries.length === 0) return null;

  return (
    <Card title={title}>
      {entries.map((pokemon, i) => {
        const detail = pokemon.level != null ? `Level ${pokemon.level}` : null;
        return (
          <PokemonEntry key={i} pokemon={pokemon} className={i > 0 ? styles.bordered : undefined}>
            {detail && <Row row={[detail]} />}
          </PokemonEntry>
        );
      })}
    </Card>
  );
}
