import useBaseUrl from "@docusaurus/useBaseUrl";
import { resolveSpecies } from "@site/src/utils/abbreviations";
import { useOpponent, useRelayState } from "@site/src/utils/overlayHooks";
import {
  BADGE_NAMES,
  BadgeName,
  deriveOverlayMeta,
  derivePlayerBox,
  deriveTopStats,
  hasCyclingStarted,
  StatViewType,
  TopBattler,
} from "@site/src/utils/overlayMeta";
import { pokedex, type PokedexData } from "@site/src/utils/pokedex";
import { PokemonData } from "@site/src/utils/pokemon";
import { SpriteImg } from "@site/src/utils/SpriteImg";
import { FADE_MS, useFadedKey, useFadedValue } from "@site/src/utils/useFadedValue";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.css";

// ---- Types ----

export type OverlayPanelSlot = { pokemon: PokemonData; subtitle?: string } | null;

// ---- Shared layout ----

function OutlineFilter() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id="outline" x="-5%" y="-5%" width="110%" height="110%">
          <feMorphology in="SourceAlpha" result="expanded" operator="dilate" radius="1.75" />
          <feFlood floodColor="#424242" result="color" />
          <feComposite in="color" in2="expanded" operator="in" result="outline" />
          <feMerge>
            <feMergeNode in="outline" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

const FRAMES = {
  large: { left: 22, top: 22, width: 1372, height: 912 },
  camera: { left: 1420, top: 22, width: 478, height: 316 },
  medium: { left: 1420, top: 448, width: 478, height: 314 },
  small: { left: 1420, top: 788, width: 478, height: 146 },
  badges: { left: 1420, top: 362, width: 478, height: 84 },
} as const;

function OverlayCanvas({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        overflow: "hidden",
        background: "transparent",
        fontFamily: '"Open Sans Bold", sans-serif',
        color: "var(--overlay-white)",
      }}
    >
      <OutlineFilter />
      {children}
    </div>
  );
}

function OverlayFrame({
  frame,
  children,
}: {
  frame: (typeof FRAMES)[keyof typeof FRAMES];
  children: ReactNode;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: frame.left,
        top: frame.top,
        width: frame.width,
        height: frame.height,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

// ---- OverlayPanel ----

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

function OverlayCard({
  slot,
  expanded,
  showName,
  size,
}: {
  slot: OverlayPanelSlot;
  expanded: boolean;
  showName: boolean;
  size: "small" | "large";
}) {
  const pokemon = slot?.pokemon ?? null;
  const spriteKey = pokemon?.spriteKey ?? pokemon?.name;
  const [loadError, setLoadError] = useState(false);
  const [trackedKey, setTrackedKey] = useState(spriteKey);
  if (spriteKey !== trackedKey) {
    setLoadError(false);
    setTrackedKey(spriteKey);
  }
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setLoadError(true);
  }, [spriteKey]);
  const pokedexEntry = pokemon ? (pokedex[resolveSpecies(pokemon.name)] ?? null) : null;
  const subtitle = slot
    ? (slot.subtitle ?? (pokemon?.level != null ? String(pokemon.level) : "-"))
    : "-";
  const nameLen = pokemon?.name.length ?? 0;
  const nameFontSize =
    size === "large"
      ? nameLen <= 10
        ? undefined
        : nameLen <= 13
          ? 24
          : 21
      : nameLen <= 10
        ? undefined
        : nameLen <= 13
          ? 9
          : 8;
  const subtitleOnlyStyle = !showName
    ? size === "large"
      ? { fontSize: "36px", lineHeight: "72px", marginTop: "15px" }
      : { fontSize: "13px", lineHeight: "24px", marginTop: "5px" }
    : undefined;

  return (
    <div className={`${styles.card} ${!slot ? styles.cardEmpty : ""}`}>
      {pokemon && !loadError ? (
        <SpriteImg
          ref={imgRef}
          pokemon={pokemon}
          className={styles.sprite}
          onError={() => setLoadError(true)}
        />
      ) : (
        <div className={styles.emptySprite}>✕</div>
      )}
      {showName && (
        <div
          className={styles.name}
          style={nameFontSize !== undefined ? { fontSize: `${nameFontSize}px` } : undefined}
        >
          {pokemon?.name ?? "-"}
        </div>
      )}
      <div className={styles.level} style={subtitleOnlyStyle}>
        {subtitle}
      </div>
      {expanded && (
        <>
          <div className={styles.divider} />
          <div className={styles.detail}>{pokemon?.nature ?? "-"}</div>
          <div className={styles.detail}>{pokemon?.ability ?? "-"}</div>
          <div className={styles.detail}>{pokemon ? (pokemon.item ?? "None") : "-"}</div>
          <div className={styles.divider} />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={styles.move}>
              {pokemon?.moves?.[i] ?? "-"}
            </div>
          ))}
          <div className={styles.divider} />
          <div className={styles.stats}>
            {STAT_KEYS.map(({ label, key }) => {
              const v = pokedexEntry ? pokedexEntry[key] : null;
              if (v == null)
                return (
                  <div key={label} className={styles.move}>
                    -
                  </div>
                );
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

function OverlayPanel({
  title,
  slots,
  expanded = false,
  subtitleOnly = false,
  titleVisible = true,
  contentVisible = true,
  size = "small",
  statusCheck,
  statusSpinner,
}: {
  title: string;
  slots: OverlayPanelSlot[];
  expanded?: boolean;
  subtitleOnly?: boolean;
  titleVisible?: boolean;
  contentVisible?: boolean;
  size?: "small" | "large";
  statusCheck?: boolean;
  statusSpinner?: boolean;
}) {
  const fadeTitleCls = `${styles.dynamic} ${titleVisible ? "" : styles.dynamicHidden}`;
  const fadeContentCls = `${styles.dynamic} ${contentVisible ? "" : styles.dynamicHidden}`;
  const showName = !subtitleOnly && !slots.some((s) => s !== null && s.subtitle !== undefined);
  const gridCls = size === "large" ? styles.gridLarge : styles.gridSmall;
  const panelCls = size === "large" ? `${styles.panel} ${styles.panelLarge}` : styles.panel;
  const spinnerSrc = useBaseUrl("/img/spinner.png");
  const checkSrc = useBaseUrl("/img/check.png");
  const hasStatus = statusCheck !== undefined;

  return (
    <div className={panelCls} data-theme="dark">
      <div className={styles.panelTitle}>
        <span className={`${fadeTitleCls} ${hasStatus ? styles.panelTitleText : ""}`}>{title}</span>
        {hasStatus && (
          <div className={styles.statusGroup}>
            <span>!box:</span>
            <div className={styles.statusIconWrap}>
              <img
                className={`${styles.statusIcon} ${styles.statusSpinner} ${statusSpinner ? styles.statusIconVisible : ""}`}
                src={spinnerSrc}
                alt=""
              />
              <img
                className={`${styles.statusIcon} ${statusCheck ? styles.statusIconVisible : ""}`}
                src={checkSrc}
                alt=""
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles.panelTitleLine} />
      <div className={fadeContentCls}>
        <div className={`${styles.grid} ${gridCls}`}>
          {slots.map((slot, i) => (
            <OverlayCard
              key={`${i}-${slot?.pokemon.name ?? ""}`}
              slot={slot}
              expanded={expanded}
              showName={showName}
              size={size}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- OverlayBackground / OverlayBanner helpers ----

function fv(visible: boolean) {
  return `${styles.dynamic} ${visible ? "" : styles.dynamicHidden}`;
}

function useFadedBadges(liveBadges: Partial<Record<BadgeName, true>>) {
  const [displayed, setDisplayed] = useState<Partial<Record<BadgeName, true>>>({});
  const liveBadgesRef = useRef(liveBadges);
  const keyRef = useRef("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  liveBadgesRef.current = liveBadges;
  const key = BADGE_NAMES.filter((n) => liveBadges[n]).join(",");

  useEffect(() => {
    if (key === keyRef.current) return;
    const prevSet = new Set(keyRef.current.split(",").filter(Boolean));
    const newSet = new Set(key.split(",").filter(Boolean));
    keyRef.current = key;
    const removed = BADGE_NAMES.filter((n) => prevSet.has(n) && !newSet.has(n));
    const added = BADGE_NAMES.filter((n) => !prevSet.has(n) && newSet.has(n));
    if (removed.length > 0)
      setDisplayed((prev) => {
        const next = { ...prev };
        removed.forEach((n) => delete next[n]);
        return next;
      });
    if (added.length > 0) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setDisplayed(liveBadgesRef.current);
        timerRef.current = null;
      }, FADE_MS);
    }
  }, [key]);

  return displayed;
}

// ---- OverlayBackground ----

export function OverlayBackground() {
  const badgesBgSrc = useBaseUrl("/img/badges.png");
  return (
    <div className={styles.overlay}>
      <div className={styles.largeFrame} />
      <div className={styles.cameraFrame} style={{ background: "var(--overlay-dark-gray)" }} />
      <div className={styles.bannerStrip} />
      <div className={styles.smallFrame} style={{ background: "var(--overlay-dark-gray)" }} />
      <div className={styles.badgesAndMediumFrame}>
        <div
          className={styles.badgesRow}
          style={{
            backgroundImage: `url(${badgesBgSrc})`,
            backgroundSize: "100% 100%",
            borderBottom: "4px solid var(--overlay-white)",
          }}
        />
        <div style={{ flex: 1, background: "var(--overlay-dark-gray)" }} />
      </div>
    </div>
  );
}

// ---- OverlayBanner ----

export function OverlayBanner() {
  const liveState = useRelayState();
  const { gatedState } = useSpinnerSync(liveState);
  const barSrc = useBaseUrl("/img/bar.png");
  const imgBase = useBaseUrl("/img/");

  const liveMeta = gatedState?.moment
    ? deriveOverlayMeta(gatedState.moment)
    : { split: "Brock", cap: 16, badges: {} };

  const { displayed: split, visible: splitVisible } = useFadedValue(liveMeta.split);
  const { displayed: cap, visible: capVisible } = useFadedValue(liveMeta.cap);
  const displayedBadges = useFadedBadges(liveMeta.badges);

  return (
    <div className={styles.overlay} style={{ background: "transparent" }}>
      <OutlineFilter />
      <OverlayFrame frame={FRAMES.badges}>
        <div className={styles.badgesRow}>
          {BADGE_NAMES.map((name) => (
            <img
              key={name}
              className={`${styles.badge} ${displayedBadges[name] ? styles.badgeVisible : ""}`}
              width={54}
              src={`${imgBase}${name}.png`}
              alt=""
            />
          ))}
        </div>
      </OverlayFrame>
      <div className={styles.banner}>
        <div className={styles.bannerSection}>
          <span className={`${styles.shadow} ${fv(splitVisible)}`}>Split:</span>&nbsp;
          <span className={`${styles.accent} ${styles.shadow} ${fv(splitVisible)}`}>{split}</span>
          &nbsp;&nbsp;
        </div>
        <div className={styles.bannerSection}>
          <img width={8} src={barSrc} alt="" />
          &nbsp;&nbsp;
          <span className={styles.shadow}>Level Cap:</span>&nbsp;
          <span className={`${styles.accent} ${styles.shadow} ${fv(capVisible)}`}>{cap}</span>
          &nbsp;&nbsp;
        </div>
        <div className={styles.bannerSection}>
          <img width={8} src={barSrc} alt="" />
          &nbsp;&nbsp;
          <span className={styles.shadow}>Deaths:</span>&nbsp;
          <span className={`${styles.accent} ${styles.shadow}`}>!1dr</span>
        </div>
      </div>
    </div>
  );
}

// ---- OverlayTitle ----

export function OverlayTitle() {
  const logoSrc = useBaseUrl("/img/logo.png");
  const runningSrc = useBaseUrl("/img/running.gif");

  return (
    <OverlayCanvas>
      <img className={`${styles.logo} ${styles.shadow}`} width={92} src={logoSrc} alt="" />
      <div className={`${styles.title} ${styles.shadow}`}>Radical Red 4.1 Hardcore Mode</div>
      <img className={`${styles.runner} ${styles.shadow}`} width={84} src={runningSrc} alt="" />
    </OverlayCanvas>
  );
}

// ---- OverlayCamera ----

export function OverlayCamera() {
  const cameraSrc = useBaseUrl("/img/brupokej-overlay.png");
  return (
    <OverlayCanvas>
      <OverlayFrame frame={FRAMES.camera}>
        <img
          src={cameraSrc}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </OverlayFrame>
    </OverlayCanvas>
  );
}

// ---- useSpinnerSync ----

function useSpinnerSync(liveState: RelayState | null): {
  checkVisible: boolean;
  spinnerVisible: boolean;
  gatedState: RelayState | null;
} {
  const [checkVisible, setCheckVisible] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [gatedState, setGatedState] = useState<RelayState | null>(null);

  const liveRef = useRef(liveState);
  liveRef.current = liveState;

  const animatingRef = useRef(false);
  const hasConnectedRef = useRef(false);

  useEffect(() => {
    if (liveState === null) {
      hasConnectedRef.current = false;
      animatingRef.current = false;
      setCheckVisible(false);
      setSpinnerVisible(false);
      setGatedState(null);
      return;
    }

    if (!hasConnectedRef.current) {
      hasConnectedRef.current = true;
      setGatedState(liveState);
      setCheckVisible(true);
      return;
    }

    if (animatingRef.current) return;
    animatingRef.current = true;

    setCheckVisible(false);
    setTimeout(() => {
      setSpinnerVisible(true);
      setTimeout(() => {
        setGatedState(liveRef.current);
        setTimeout(() => {
          setSpinnerVisible(false);
          setTimeout(() => {
            setCheckVisible(true);
            animatingRef.current = false;
          }, FADE_MS);
        }, 2 * FADE_MS);
      }, FADE_MS);
    }, FADE_MS);
  }, [liveState]); // eslint-disable-line react-hooks/exhaustive-deps

  return { checkVisible, spinnerVisible, gatedState };
}

// ---- OverlayStatsSmall ----

const STAT_VIEWS: StatViewType[] = ["battlesRaw", "battlesPercent", "fragsRaw", "fragsPercent"];
const STAT_TITLES = ["Most Battles", "Most Battles", "Most Frags", "Most Frags"];
const CYCLE_MS = 20000;

function topBattlersToSlots(battlers: TopBattler[]): OverlayPanelSlot[] {
  const entries: OverlayPanelSlot[] = battlers.map((b) => ({
    pokemon: b.pokemon,
    subtitle: b.subtitle,
  }));
  return [...entries, ...Array(Math.max(0, 6 - entries.length)).fill(null)].slice(0, 6);
}

export function OverlayStatsSmall() {
  const liveState = useRelayState();
  const { checkVisible, spinnerVisible, gatedState } = useSpinnerSync(liveState);
  const [cycleView, setCycleView] = useState(0);

  const livePlayerBox = gatedState?.moment ? derivePlayerBox(gatedState.moment) : null;
  const shouldCycle = gatedState?.moment ? hasCyclingStarted(gatedState.moment) : false;

  useEffect(() => {
    if (!shouldCycle) return;
    setCycleView(0);
    const id = setInterval(() => setCycleView((v) => (v + 1) % 4), CYCLE_MS);
    return () => clearInterval(id);
  }, [shouldCycle]);
  const view = shouldCycle ? cycleView : 0;
  const liveTopStats = gatedState?.moment
    ? deriveTopStats(gatedState.moment, livePlayerBox, STAT_VIEWS[view])
    : [];
  const liveStatsTitle = liveTopStats.length > 0 ? STAT_TITLES[view] : "-";
  const statsContentKey = `${view}:${liveTopStats.map((b) => `${b.pokemon.name}:${b.subtitle}`).join(",")}`;

  const { displayed: statsTitle, visible: statsTitleVisible } = useFadedValue(liveStatsTitle);
  const { displayed: topStats, visible: statsContentVisible } = useFadedKey(
    liveTopStats,
    statsContentKey
  );
  const battlerSlots = useMemo(() => topBattlersToSlots(topStats), [topStats]);

  return (
    <OverlayCanvas>
      <OverlayFrame frame={FRAMES.small}>
        <OverlayPanel
          title={statsTitle}
          slots={battlerSlots}
          subtitleOnly
          titleVisible={statsTitleVisible}
          contentVisible={statsContentVisible}
          statusCheck={checkVisible}
          statusSpinner={spinnerVisible}
        />
      </OverlayFrame>
    </OverlayCanvas>
  );
}

// ---- OverlayOpponentMedium ----

export function OverlayOpponentMedium() {
  const liveState = useRelayState();
  const { gatedState } = useSpinnerSync(liveState);
  const { title, slots, visible } = useOpponent(gatedState);
  return (
    <OverlayCanvas>
      <OverlayFrame frame={FRAMES.medium}>
        <OverlayPanel
          title={title}
          slots={slots}
          expanded
          titleVisible={visible}
          contentVisible={visible}
        />
      </OverlayFrame>
    </OverlayCanvas>
  );
}

// ---- OverlayOpponentLarge ----

export function OverlayOpponentLarge() {
  const liveState = useRelayState();
  const { gatedState } = useSpinnerSync(liveState);
  const { title, slots, visible } = useOpponent(gatedState);
  return (
    <OverlayCanvas>
      <OverlayFrame frame={FRAMES.large}>
        <OverlayPanel
          title={title}
          slots={slots}
          expanded
          size="large"
          titleVisible={visible}
          contentVisible={visible}
        />
      </OverlayFrame>
    </OverlayCanvas>
  );
}

// ---- OverlayOpponentSmall ----

export function OverlayOpponentSmall() {
  const liveState = useRelayState();
  const { checkVisible, spinnerVisible, gatedState } = useSpinnerSync(liveState);
  const { title, slots, visible } = useOpponent(gatedState);
  return (
    <OverlayCanvas>
      <OverlayFrame frame={FRAMES.small}>
        <OverlayPanel
          title={title}
          slots={slots}
          titleVisible={visible}
          contentVisible={visible}
          statusCheck={checkVisible}
          statusSpinner={spinnerVisible}
        />
      </OverlayFrame>
    </OverlayCanvas>
  );
}
