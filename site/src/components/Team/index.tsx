import Card from "@site/src/components/Card";
import { fetchPokedex } from "@site/src/utils/pokedex";
import { spriteUrl } from "@site/src/utils/sprites";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

export interface Pokemon {
  sprite: string;
  name: string;
  pokedex: string;
  level: number;
  nature: string;
  ability: string;
  item: string;
  move1: string;
  move2: string;
  move3: string;
  move4: string;
  hp: number;
  warnings?: string[];
}

export default function Team({ team, title = "Team" }: { team: Pokemon[]; title?: string }) {
  return (
    <Card title={title}>
      <div className={styles.content}>
        <TeamGrid team={team} />
      </div>
    </Card>
  );
}

function TeamGrid({ team }: { team: Pokemon[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(6);
  const [pokedex, setPokedex] = useState<Map<string, number[]> | null>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const update = () => {
      const gap = parseFloat(getComputedStyle(el).columnGap) || 16;
      setCols(Math.max(1, Math.floor((el.clientWidth + gap) / (110 + gap))));
    };
    const obs = new ResizeObserver(update);
    obs.observe(el);
    update();
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    fetchPokedex().then(setPokedex);
  }, []);

  const filled = team.length;
  const remainder = filled % cols;
  const emptiesToShow = remainder === 0 ? 0 : Math.max(0, Math.min(cols - remainder, 6 - filled));
  const slots = Array.from({ length: filled + emptiesToShow }, (_, i) => team[i] ?? null);

  return (
    <div className={styles.grid} ref={gridRef}>
      {slots.map((pokemon, i) => (
        <PokemonCard key={i} pokemon={pokemon} pokedex={pokedex} />
      ))}
    </div>
  );
}

const STAT_LABELS = ["HP", "ATK", "DEF", "SPA", "SPD", "SPE"];
const STAT_INDICES = [0, 1, 2, 4, 5, 3];

function statColor(v: number): string {
  if (v >= 150) return "var(--ifm-color-info)";
  if (v >= 125) return "var(--ifm-color-success-darker)";
  if (v >= 100) return "var(--ifm-color-success)";
  if (v >= 75) return "var(--ifm-color-success-lighter)";
  if (v >= 50) return "var(--ifm-color-warning)";
  if (v >= 25) return "var(--ifm-color-danger-lighter)";
  return "var(--ifm-color-danger)";
}

function PokemonCard({
  pokemon,
  pokedex,
}: {
  pokemon: Pokemon | null;
  pokedex: Map<string, number[]> | null;
}) {
  const warn = new Set(pokemon?.warnings ?? []);
  const wc = (field: string) => (warn.has(field) ? styles.fieldWarning : "");
  const stats =
    pokemon && pokedex && pokemon.pokedex
      ? (pokedex.get(pokemon.pokedex.toLowerCase()) ?? null)
      : null;

  return (
    <div className={`${styles.card} ${!pokemon ? styles.cardEmpty : ""}`}>
      {pokemon ? (
        <img src={spriteUrl(pokemon.sprite)} alt={pokemon.name} className={styles.sprite} />
      ) : (
        <div className={styles.emptySprite}>✕</div>
      )}
      <div className={`${styles.name} ${wc("name")}`}>{pokemon?.name ?? "-"}</div>
      <div className={`${styles.level} ${wc("level")}`}>{pokemon?.level ?? "-"}</div>
      <div className={styles.divider} />
      <div className={`${styles.detail} ${wc("nature")}`}>{pokemon?.nature ?? "-"}</div>
      <div className={`${styles.detail} ${wc("ability")}`}>{pokemon?.ability ?? "-"}</div>
      <div className={`${styles.detail} ${wc("item")}`}>{pokemon?.item ?? "-"}</div>
      <div className={styles.divider} />
      <div className={`${styles.move} ${wc("move1")}`}>{pokemon?.move1 ?? "-"}</div>
      <div className={`${styles.move} ${wc("move2")}`}>{pokemon?.move2 ?? "-"}</div>
      <div className={`${styles.move} ${wc("move3")}`}>{pokemon?.move3 ?? "-"}</div>
      <div className={`${styles.move} ${wc("move4")}`}>{pokemon?.move4 ?? "-"}</div>
      <div className={styles.divider} />
      <div className={styles.stats}>
        {STAT_LABELS.map((label, i) => {
          const v = stats ? stats[STAT_INDICES[i]] : null;
          if (v == null) {
            return (
              <div key={label} className={styles.move}>
                -
              </div>
            );
          }
          return (
            <div key={label} className={styles.statRow}>
              <span className={styles.statLabel}>{label}</span>
              <span className={styles.statValue}>{v}</span>
              <div className={styles.statBarTrack}>
                <div
                  className={styles.statBar}
                  style={{
                    width: `${(Math.min(v, 150) / 150) * 100}%`,
                    backgroundColor: statColor(v),
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
