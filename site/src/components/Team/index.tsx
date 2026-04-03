import Card from "@site/src/components/Card";
import { fetchPokedex } from "@site/src/utils/pokedex";
import { spriteUrl } from "@site/src/utils/sprites";
import clsx from "clsx";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

const COL_WIDTH = 140;
const COL_GAP = 12; // 0.75rem at 16px base
const COL_STEP = COL_WIDTH + COL_GAP;
const SIDE_PAD = 16; // var(--ifm-spacing-horizontal) at 16px base

const CardDetailCtx = createContext(false);
const useCardDetail = () => useContext(CardDetailCtx);

function CardDetail({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <CardDetailCtx.Provider value={isOpen}>
      {children}
      <button className={styles.detailToggle} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "−" : "+"}
      </button>
    </CardDetailCtx.Provider>
  );
}

export interface Pokemon {
  name: string;
  sprite?: string;
  pokedex?: string;
  level: number;
  nature?: string | null;
  ability?: string | null;
  item?: string | null;
  move1?: string | null;
  move2?: string | null;
  move3?: string | null;
  move4?: string | null;
  warning?: string[];
}

export default function Team({ team, title = "Team" }: { team: Pokemon[]; title?: string }) {
  return (
    <Card title={title}>
      <CardDetail>
        <TeamGrid team={team} />
      </CardDetail>
    </Card>
  );
}

function TeamGrid({ team }: { team: Pokemon[] }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(6);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [pokedex, setPokedex] = useState<Map<string, number[]> | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const update = () => {
      const availableWidth = el.clientWidth - 2 * SIDE_PAD;
      setCols(Math.max(1, Math.ceil((availableWidth + COL_GAP) / (COL_WIDTH + COL_GAP))));
    };
    const obs = new ResizeObserver(update);
    obs.observe(el);
    update();
    return () => obs.disconnect();
  }, []);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const obs = new ResizeObserver(updateScrollState);
    obs.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      obs.disconnect();
    };
  }, [updateScrollState]);

  useEffect(() => {
    updateScrollState();
  }, [cols, updateScrollState]);

  useEffect(() => {
    fetchPokedex().then(setPokedex);
  }, []);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const current = el.scrollLeft;
    const target =
      dir === "right"
        ? Math.ceil((current + 1) / COL_STEP) * COL_STEP
        : Math.floor((current - 1) / COL_STEP) * COL_STEP;
    el.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, []);

  const filled = team.length;
  const emptiesToShow = Math.max(0, Math.min(cols, 6) - filled);
  const slots = Array.from({ length: filled + emptiesToShow }, (_, i) => team[i] ?? null);

  return (
    <div ref={contentRef} className={styles.content}>
      <div
        className={clsx(
          styles.gridWrapper,
          canScrollLeft && styles.gridFadeLeft,
          canScrollRight && styles.gridFadeRight
        )}
      >
        {canScrollLeft && (
          <button
            className={`${styles.scrollArrow} ${styles.scrollArrowLeft}`}
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          />
        )}
        <div ref={scrollRef} className={styles.grid}>
          {slots.map((pokemon, i) => (
            <PokemonCard key={i} pokemon={pokemon} pokedex={pokedex} />
          ))}
        </div>
        {canScrollRight && (
          <button
            className={`${styles.scrollArrow} ${styles.scrollArrowRight}`}
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          />
        )}
      </div>
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
  const isExpanded = useCardDetail();
  const warn = new Set(pokemon?.warning ?? []);
  const wc = (field: string) => (warn.has(field) ? styles.fieldWarning : "");
  const stats =
    pokemon && pokedex
      ? (pokedex.get((pokemon.pokedex ?? pokemon.name).toLowerCase()) ?? null)
      : null;

  return (
    <div
      className={`${styles.card} ${!pokemon ? styles.cardEmpty : ""}`}
    >
      {pokemon ? (
        <img
          src={spriteUrl(pokemon.sprite ?? pokemon.name.toLowerCase())}
          alt={pokemon.name}
          className={styles.sprite}
        />
      ) : (
        <div className={styles.emptySprite}>✕</div>
      )}
      <div className={`${styles.name} ${wc("name")}`}>{pokemon?.name ?? "-"}</div>
      <div className={`${styles.level} ${wc("level")}`}>{pokemon?.level ?? "-"}</div>
      {isExpanded && (
        <>
          <div className={styles.divider} />
          <div className={`${styles.detail} ${wc("nature")}`}>{pokemon?.nature ?? "-"}</div>
          <div className={`${styles.detail} ${wc("ability")}`}>{pokemon?.ability ?? "-"}</div>
          <div className={`${styles.detail} ${wc("item")}`}>
            {pokemon == null ? "-" : (pokemon.item ?? "None")}
          </div>
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
        </>
      )}
    </div>
  );
}
