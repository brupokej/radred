import { resolveActiveBox } from "@site/src/components/Battle";
import Card from "@site/src/components/Card";
import { ScrollFade } from "@site/src/components/ScrollFade";
import { getSwitchBattleCaseData } from "@site/src/components/SwitchBattle";
import { SPRITE_COLORS } from "@site/src/data/spriteColors";
import { getCanon, resolveBox } from "@site/src/utils/box";
import { Moment } from "@site/src/utils/moments";
import { resolvePokemon } from "@site/src/utils/pokemon";
import { computeBattleFrags } from "@site/src/utils/stats";
import { useStorageState } from "@site/src/utils/storage";
import { LIVE_MOMENT_DEFAULT } from "@site/src/utils/storageDefaults";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.css";

const TOP_N = 8;
const SPEED = 400;

// Fallback palette used before sprite colors load
const COLORS = [
  "#4e79a7",
  "#f28e2b",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc948",
  "#b07aa1",
  "#ff9da7",
  "#9c755f",
  "#bab0ac",
];

export type Metric = "battles" | "frags";

type FrameEntry = { name: string; spriteKey?: string };
type Frame = {
  label: string;
  values: Record<string, number>; // canonicalName → count
  active: string[]; // canonical names in box, stable boxOrder sort
  display: Record<string, FrameEntry>; // canonicalName → current display name + spriteKey
};

export default function BarRace({
  moments,
  metric,
  title,
}: {
  moments: Moment[];
  metric: Metric;
  title: string;
}) {
  const { value: liveMomentLabel } = useStorageState("live-moment");
  const effectiveLabel = liveMomentLabel ?? LIVE_MOMENT_DEFAULT;

  const slicedMoments = useMemo(() => {
    const idx = moments.findIndex((m) => m.label === effectiveLabel);
    return idx >= 0 ? moments.slice(0, idx + 1) : [];
  }, [moments, effectiveLabel]);

  const battleMoments = useMemo(
    () =>
      slicedMoments.filter(
        (m): m is Extract<Moment, { kind: "battle" | "switchBattle" }> =>
          m.kind === "battle" || m.kind === "switchBattle"
      ),
    [slicedMoments]
  );

  const canon = useMemo(() => {
    for (let i = moments.length - 1; i >= 0; i--) {
      const m = moments[i];
      if (m.kind === "switchBattle") {
        return getCanon(resolveBox(m.data.cases[0].data.playerBox));
      }
      if (m.kind === "battle") {
        return getCanon(resolveBox(resolveActiveBox(m.data)));
      }
      if (m.kind === "encounter") {
        return getCanon(resolveBox(m.data.playerBox));
      }
    }
    return getCanon(null);
  }, [moments]);

  const boxOrderMap = useMemo(() => {
    const map: Record<string, number> = {};
    const last = battleMoments[battleMoments.length - 1];
    if (!last) return map;
    for (const pokemon of resolveBox(
      resolveActiveBox(last.kind === "battle" ? last.data : getSwitchBattleCaseData(last.data))
    ).pokemon) {
      const p = resolvePokemon(pokemon);
      const key = canon(p.name);
      if (p.boxOrder !== undefined) map[key] = p.boxOrder;
    }
    return map;
  }, [battleMoments, canon]);

  const frames = useMemo((): Frame[] => {
    if (battleMoments.length === 0) return [{ label: "", values: {}, active: [], display: {} }];

    const running: Record<string, number> = {};

    const snapshotResolved = (
      resolved: ReturnType<typeof resolveBox>
    ): {
      active: string[];
      display: Record<string, FrameEntry>;
    } => {
      const display: Record<string, FrameEntry> = {};
      for (const pokemon of resolved.pokemon) {
        const p = resolvePokemon(pokemon);
        const key = canon(p.name);
        display[key] = { name: p.name, spriteKey: p.spriteKey };
      }
      const active = Object.keys(display).sort(
        (a, b) => (boxOrderMap[a] ?? Infinity) - (boxOrderMap[b] ?? Infinity)
      );
      return { active, display };
    };

    // Frame 0: box state at the first battle, all values 0
    const { active: initialActive, display: initialDisplay } = snapshotResolved(
      resolveBox(
        resolveActiveBox(
          battleMoments[0].kind === "battle"
            ? battleMoments[0].data
            : getSwitchBattleCaseData(battleMoments[0].data)
        )
      )
    );
    const result: Frame[] = [
      {
        label: "",
        values: Object.fromEntries(initialActive.map((n) => [n, 0])),
        active: initialActive,
        display: initialDisplay,
      },
    ];

    for (const m of battleMoments) {
      const activeData = m.kind === "battle" ? m.data : getSwitchBattleCaseData(m.data);
      const resolved = resolveBox(resolveActiveBox(activeData));

      if (metric === "frags") {
        for (const [p, c] of Object.entries(computeBattleFrags(activeData)) as [string, number][]) {
          const key = canon(p);
          running[key] = (running[key] ?? 0) + c;
        }
      } else {
        for (const name of resolved.team ?? []) {
          const key = canon(name);
          running[key] = (running[key] ?? 0) + 1;
        }
      }

      const { active, display } = snapshotResolved(resolved);
      result.push({
        label: m.label,
        values: Object.fromEntries(active.map((n) => [n, running[n] ?? 0])),
        active,
        display,
      });
    }

    return result;
  }, [battleMoments, metric, canon, boxOrderMap]);

  const colorMap = useMemo(() => {
    const allNames = new Set<string>();
    for (const f of frames) f.active.forEach((n) => allNames.add(n));
    return Object.fromEntries(
      [...allNames]
        .sort()
        .map((name, i) => [name, SPRITE_COLORS[name] ?? COLORS[i % COLORS.length]])
    );
  }, [frames]);

  const [frameIdx, setFrameIdx] = useState(frames.length - 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const playDelayRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setFrameIdx(frames.length - 1);
    setIsPlaying(false);
  }, [frames]);

  useEffect(() => {
    clearInterval(intervalRef.current);
    if (!isPlaying) return;
    intervalRef.current = setInterval(() => {
      setFrameIdx((prev) => {
        if (prev >= frames.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, SPEED);
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, frames.length]);

  const chartData = useMemo(() => {
    const frame = frames[frameIdx];
    if (!frame) return [];
    const { values, active, display } = frame;
    return active
      .map((canonName) => ({
        canonName,
        displayName: display[canonName]?.name ?? canonName,
        spriteKey: display[canonName]?.spriteKey,
        value: values[canonName] ?? 0,
      }))
      .sort((a, b) => {
        if (b.value !== a.value) return b.value - a.value;
        return (boxOrderMap[a.canonName] ?? Infinity) - (boxOrderMap[b.canonName] ?? Infinity);
      });
  }, [frames, frameIdx, boxOrderMap]);

  const { scaleStart, scaleEnd } = useMemo(() => {
    const N = frames.length - 1;
    if (N <= 0) return { scaleStart: 1, scaleEnd: 1 };
    const leaderByFrame = frames.map((f) => Math.max(0, ...Object.values(f.values)));
    const end = Math.max(1, leaderByFrame[N]);
    let start = leaderByFrame[0];
    for (let i = 1; i < N; i++) {
      start = Math.max(start, (leaderByFrame[i] * N - end * i) / (N - i));
    }
    return { scaleStart: Math.max(1, start), scaleEnd: end };
  }, [frames]);

  const maxValue =
    scaleStart + (scaleEnd - scaleStart) * (frameIdx / Math.max(1, frames.length - 1));

  const visibleHeight = `368px`;
  const emptyCount = Math.max(0, TOP_N - chartData.length);
  const currentLabel = frames[frameIdx]?.label;
  const total = frames.length - 1;

  const step = (delta: number) => {
    setIsPlaying(false);
    setFrameIdx((prev) => Math.max(0, Math.min(frames.length - 1, prev + delta)));
  };

  const spriteUrl = (displayName: string, spriteKey?: string) =>
    `https://raw.githubusercontent.com/Autumnchi/coloured-home-sprites/main/${(spriteKey ?? displayName).toLowerCase()}.png`;

  return (
    <Card title={"Pokémon Data"}>
      <div className={styles.container}>
        <ScrollFade axis="y" topOffset="52px" style={{ maxHeight: visibleHeight }}>
          <div className={styles.bars}>
            <div className={styles.header}>
              <div className={styles.spriteCell} />
              <span className={styles.name}>Pokémon</span>
              <span className={styles.value}>Total</span>
              <div className={styles.track} />
            </div>
            <AnimatePresence initial={false}>
              {chartData.map((entry) => (
                <motion.div
                  key={entry.canonName}
                  layout="position"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    layout: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className={styles.row}
                >
                  <div className={styles.spriteCell}>
                    <img
                      src={spriteUrl(entry.displayName, entry.spriteKey)}
                      alt={entry.displayName}
                      className={styles.sprite}
                    />
                  </div>
                  <span className={styles.name}>{entry.displayName}</span>
                  <span className={styles.value}>{entry.value}</span>
                  <div className={styles.track}>
                    <div className={styles.trackInner}>
                      <div
                        className={styles.fill}
                        style={{
                          width: `${(entry.value / maxValue) * 100}%`,
                          background: colorMap[entry.canonName],
                          transition: `width ${Math.round(SPEED * 0.75)}ms ease-out`,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {Array.from({ length: emptyCount }, (_, i) => (
              <div key={`empty-${i}`} className={styles.row}>
                <div className={`${styles.spriteCell} ${styles.emptyCell}`}>✕</div>
                <span className={`${styles.name} ${styles.emptyCell}`}>-</span>
                <span className={`${styles.value} ${styles.emptyCell}`}>-</span>
                <div className={styles.track}>
                  <div className={styles.trackInner} />
                </div>
              </div>
            ))}
          </div>
        </ScrollFade>

        <div className={styles.controls}>
          <div className={styles.controlRow}>
            <div className={styles.btnGroup}>
              <button
                className={styles.btn}
                onClick={() => {
                  setIsPlaying(false);
                  setFrameIdx(0);
                }}
                title="Reset"
              >
                {"⏮\uFE0E"}
              </button>
              <button className={styles.btn} onClick={() => step(-1)} title="Previous">
                ←
              </button>
              <button
                className={`${styles.btn} ${styles.btnPlay}`}
                onClick={() => {
                  if (!isPlaying && frameIdx >= frames.length - 1) {
                    setFrameIdx(0);
                    clearTimeout(playDelayRef.current);
                    playDelayRef.current = setTimeout(() => setIsPlaying(true), SPEED);
                  } else {
                    setIsPlaying((p) => !p);
                  }
                }}
              >
                {isPlaying ? "⏸\uFE0E" : "▶\uFE0E"}
              </button>
              <button className={styles.btn} onClick={() => step(1)} title="Next">
                →
              </button>
            </div>
            {currentLabel && <span className={styles.label}>{currentLabel}</span>}
          </div>

          <div className={styles.scrubRow}>
            <input
              type="range"
              min={0}
              max={frames.length - 1}
              value={frameIdx}
              onChange={(e) => {
                setIsPlaying(false);
                setFrameIdx(Number(e.target.value));
              }}
              className={styles.scrubber}
            />
            <span className={styles.counter}>
              {frameIdx} / {total}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
