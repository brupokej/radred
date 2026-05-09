import Card from "@site/src/components/Card";
import { ScrollArrows } from "@site/src/components/ScrollArrows";
import { ScrollFade } from "@site/src/components/ScrollFade";
import type { Box } from "@site/src/utils/box";
import { resolveBox } from "@site/src/utils/box";
import { pokedex, type PokedexData } from "@site/src/utils/pokedex";
import { formatStats, resolvePokemon, type Pokemon, type PokemonData } from "@site/src/utils/pokemon";
import { getColouredSpriteUrl } from "@site/src/utils/sprites";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";
export type { Pokemon };

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
        <span>{isOpen ? "−" : "+"}</span>
      </button>
    </CardDetailCtx.Provider>
  );
}

export default function Team({
  box,
  title = "Team",
  header,
}: {
  box: Box;
  title?: string;
  header?: ReactNode;
}) {
  const resolved = resolveBox(box);
  const pokemonMap = new Map(resolved.pokemon.map((p) => [resolvePokemon(p).name, p]));
  const team = (resolved.team ?? [])
    .map((name) => pokemonMap.get(name))
    .filter((p): p is Pokemon => p !== undefined);
  const extraTeam = (resolved.extraTeam ?? [])
    .map((name) => pokemonMap.get(name))
    .filter((p): p is Pokemon => p !== undefined);
  return (
    <Card title={title}>
      {header}
      <CardDetail>
        <TeamGrid team={team} extraTeam={extraTeam} hasHeader={!!header} />
      </CardDetail>
    </Card>
  );
}

function TeamGrid({
  team,
  extraTeam = [],
  hasHeader = false,
}: {
  team: Pokemon[];
  extraTeam?: Pokemon[];
  hasHeader?: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(6);

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

  const scroll = useCallback((el: HTMLDivElement, dir: "left" | "right") => {
    const current = el.scrollLeft;
    const target =
      dir === "right"
        ? Math.ceil((current + 1) / COL_STEP) * COL_STEP
        : Math.floor((current - 1) / COL_STEP) * COL_STEP;
    el.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, []);

  const filled = team.length + extraTeam.length;
  const emptiesToShow = Math.max(0, Math.min(cols, 6) - filled);
  const emptySlots = Array.from({ length: emptiesToShow }, () => null);
  const showIVs = [...team, ...extraTeam].some((p) => resolvePokemon(p).ivs !== undefined);
  const showEVs = [...team, ...extraTeam].some((p) => resolvePokemon(p).evs !== undefined);
  const showFriend = [...team, ...extraTeam].some((p) => resolvePokemon(p).friend === true);
  const showNonMegaAbility = [...team, ...extraTeam].some(
    (p) => resolvePokemon(p).nonMegaAbility !== undefined
  );

  return (
    <div
      ref={contentRef}
      className={`${styles.content}${hasHeader ? ` ${styles.contentWithHeader}` : ""}`}
    >
      <div className={styles.scrollArea}>
        <ScrollArrows
          scrollRef={scrollRef}
          onLeft={(el) => scroll(el, "left")}
          onRight={(el) => scroll(el, "right")}
        />
        <ScrollFade ref={scrollRef} axis="x" className={styles.grid}>
          <div className={styles.gridInner}>
            {team.map((pokemon, i) => (
              <PokemonCard
                key={i}
                pokemon={pokemon}
                showIVs={showIVs}
                showEVs={showEVs}
                showFriend={showFriend}
                showNonMegaAbility={showNonMegaAbility}
              />
            ))}
            {extraTeam.map((pokemon, i) => (
              <PokemonCard
                key={i}
                pokemon={pokemon}
                showIVs={showIVs}
                showEVs={showEVs}
                showFriend={showFriend}
                showNonMegaAbility={showNonMegaAbility}
              />
            ))}
            {emptySlots.map((_, i) => (
              <PokemonCard
                key={`empty-${i}`}
                pokemon={null}
                showIVs={showIVs}
                showEVs={showEVs}
                showFriend={showFriend}
                showNonMegaAbility={showNonMegaAbility}
              />
            ))}
          </div>
        </ScrollFade>
      </div>
    </div>
  );
}

const STAT_KEYS: { label: string; key: keyof PokedexData }[] = [
  { label: "HP", key: "hp" },
  { label: "ATK", key: "atk" },
  { label: "DEF", key: "def" },
  { label: "SPA", key: "spa" },
  { label: "SPD", key: "spd" },
  { label: "SPE", key: "spe" },
];

function statColor(v: number): string {
  if (v >= 150) return "var(--ifm-color-info)";
  if (v >= 125) return "var(--ifm-color-success-darker)";
  if (v >= 100) return "var(--ifm-color-success)";
  if (v >= 75) return "var(--ifm-color-success-lighter)";
  if (v >= 50) return "var(--ifm-color-warning)";
  if (v >= 25) return "var(--ifm-color-danger-lighter)";
  return "var(--ifm-color-danger)";
}

function nameStyle(name: string): React.CSSProperties {
  if (name.length > 13) return { fontSize: "0.875rem" };
  return {};
}

function PokemonCard({
  pokemon,
  showIVs,
  showEVs,
  showFriend,
  showNonMegaAbility,
}: {
  pokemon: Pokemon | null;
  showIVs: boolean;
  showEVs: boolean;
  showFriend: boolean;
  showNonMegaAbility: boolean;
}) {
  const isExpanded = useCardDetail();
  const { update, base } = pokemon ?? {};
  const current = pokemon ? resolvePokemon(pokemon) : null;
  const spriteKey = current?.spriteKey ?? current?.name;
  const [loadError, setLoadError] = useState(false);
  const [trackedKey, setTrackedKey] = useState(spriteKey);
  if (spriteKey !== trackedKey) {
    setLoadError(false);
    setTrackedKey(spriteKey);
  }
  const imgError = spriteKey === "secret" || loadError;
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setLoadError(true);
  }, [spriteKey]);
  const wc = (field: string) => {
    if (!update || !(field in update)) return "";
    const f = field as keyof PokemonData;
    return update[f] !== base?.[f] ? styles.fieldWarning : "";
  };
  const baseMoveSet = base?.moves ? new Set(base.moves.filter(Boolean)) : null;
  const mwc = (move: string | null | undefined) =>
    baseMoveSet && move && !baseMoveSet.has(move) ? styles.fieldWarning : "";
  const stats = current ? (pokedex[current.pokedexKey ?? current.name] ?? null) : null;

  return (
    <div className={`${styles.card} ${!pokemon ? styles.cardEmpty : ""}`}>
      {current && !imgError ? (
        <img
          ref={imgRef}
          src={getColouredSpriteUrl(current)}
          alt={current.name}
          className={styles.sprite}
          onError={() => setLoadError(true)}
        />
      ) : (
        <div className={styles.emptySprite}>{current ? "?" : "✕"}</div>
      )}
      <div className={`${styles.name}`} style={current ? nameStyle(current.name) : undefined}>
        {current == null ? "-" : <span>{current.name}</span>}
      </div>
      <div className={`${styles.level} ${wc("level")}`}>
        {current == null ? "-" : <span>{current?.level ?? "-"}</span>}
      </div>
      {isExpanded && (
        <>
          <div className={styles.divider} />
          <div className={`${styles.detail} ${wc("nature")}`}>
            {current == null ? "-" : <span>{current?.nature ?? "-"}</span>}
          </div>
          <div className={`${styles.detail} ${wc("ability")}`}>
            {current == null ? "-" : <span>{current?.ability ?? "-"}</span>}
          </div>
          {showNonMegaAbility && (
            <div
              className={`${styles.detail} ${current?.nonMegaAbility ? styles.fieldWarning : ""}`}
            >
              {current == null ? "-" : <span>{current?.nonMegaAbility ?? "-"}</span>}
            </div>
          )}
          <div className={`${styles.detail} ${wc("item")}`}>
            {current == null ? "-" : <span>{current.item ?? "None"}</span>}
          </div>
          <div className={styles.divider} />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`${styles.move} ${mwc(current?.moves?.[i])}`}>
              {current == null ? "-" : <span>{current?.moves?.[i] ?? "-"}</span>}
            </div>
          ))}
          <div className={styles.divider} />
          {showIVs && (
            <>
              <div className={`${styles.detail} ${current?.ivs ? styles.fieldInfo : ""}`}>
                {current == null ? (
                  "-"
                ) : (
                  <span>{current?.ivs ? `${formatStats(current.ivs)} IVs` : "-"}</span>
                )}
              </div>
              <div className={styles.divider} />
            </>
          )}
          {showEVs && (
            <>
              <div className={`${styles.detail} ${current?.evs ? styles.fieldInfo : ""}`}>
                {current == null ? (
                  "-"
                ) : (
                  <span>{current?.evs ? `${formatStats(current.evs)} EVs` : "-"}</span>
                )}
              </div>
              <div className={styles.divider} />
            </>
          )}
          {showFriend && (
            <>
              <div className={`${styles.detail} ${current?.friend ? styles.fieldInfo : ""}`}>
                {current == null ? "-" : <span>{current?.friend ? "Max friendship" : "-"}</span>}
              </div>
              <div className={styles.divider} />
            </>
          )}
          <div className={styles.stats}>
            {STAT_KEYS.map(({ label, key }) => {
              const v = stats ? stats[key] : null;
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
