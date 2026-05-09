import { resolveActiveBox } from "@site/src/components/Battle";
import { getSwitchBattleCaseData } from "@site/src/components/SwitchBattle";
import { moments as blaineMoments } from "@site/src/data/guide/blaine";
import { moments as brockMoments } from "@site/src/data/guide/brock";
import { moments as clairMoments } from "@site/src/data/guide/clair";
import { moments as eliteFourMoments } from "@site/src/data/guide/eliteFour";
import { moments as erikaMoments } from "@site/src/data/guide/erika";
import { moments as kogaMoments } from "@site/src/data/guide/koga";
import { moments as mistyMoments } from "@site/src/data/guide/misty";
import { moments as sabrinaMoments } from "@site/src/data/guide/sabrina";
import { moments as surgeMoments } from "@site/src/data/guide/surge";
import { moments as victoryRoadMoments } from "@site/src/data/guide/victoryRoad";
import { Box, findPokemon, resolveBox } from "@site/src/utils/box";
import { Moment } from "@site/src/utils/moments";
import { PokemonData, resolvePokemon } from "@site/src/utils/pokemon";
import { computeStats, PokemonStats } from "@site/src/utils/stats";
import { LIVE_MOMENT_DEFAULT } from "@site/src/utils/storageDefaults";

export const allMoments = [
  ...brockMoments,
  ...mistyMoments,
  ...surgeMoments,
  ...erikaMoments,
  ...sabrinaMoments,
  ...kogaMoments,
  ...blaineMoments,
  ...clairMoments,
  ...victoryRoadMoments,
  ...eliteFourMoments,
].filter((m) => m.kind !== "boxChange");

export type BadgeName =
  | "boulder"
  | "cascade"
  | "thunder"
  | "rainbow"
  | "soul"
  | "marsh"
  | "volcano"
  | "rising";

export const BADGE_NAMES: BadgeName[] = [
  "boulder",
  "cascade",
  "thunder",
  "rainbow",
  "soul",
  "marsh",
  "volcano",
  "rising",
];

export type OverlayMeta = {
  split: string;
  cap: number;
  badges: Partial<Record<BadgeName, true>>;
};

const MILESTONES: { label: string; split?: string; cap?: number; badge?: BadgeName }[] = [
  { label: "Pewter City Leader Brock Battle", split: "Misty", cap: 23, badge: "boulder" },
  { label: "Mt. Moon Archer Battle", cap: 28 },
  { label: "Cerulean City Leader Misty Battle", split: "Surge", cap: 36, badge: "cascade" },
  { label: "Vermillion City Leader Lt. Surge Battle", split: "Erika", cap: 44, badge: "thunder" },
  { label: "Celadon City Leader Erika Battle", split: "Sabrina", cap: 47, badge: "rainbow" },
  { label: "Rocket Hideout Giovanni Battle", cap: 56 },
  { label: "Silph Co. Ariana & Archer Battle", cap: 57 },
  { label: "Silph Co. Giovanni Battle", cap: 59 },
  { label: "Saffron City Leader Sabrina Battle", split: "Koga", cap: 68, badge: "marsh" },
  { label: "Fuschia City Leader Koga Battle", split: "Blaine", cap: 73, badge: "soul" },
  { label: "Cinnabar Island May Battle", cap: 76 },
  { label: "Cinnabar Gym Leader Blaine Battle", split: "Clair", cap: 79, badge: "volcano" },
  { label: "Cerulean Cave Ariana Battle", cap: 80 },
  { label: "Cerulean Cave Giovanni Battle", cap: 81 },
  { label: "Viridian City Leader Clair Battle", split: "Victory Road", cap: 82, badge: "rising" },
  { label: "Route 23 Brendan Battle", cap: 85 },
  { label: "Indigo Plateau Creator Soupercell Battle", split: "Elite 4" },
];

export type OpponentInfo = { box: Box; label: string };

export function findMomentByLabel(label: string | null): Moment {
  const target = label ?? LIVE_MOMENT_DEFAULT;
  return allMoments.find((m) => m.label === target) ?? brockMoments[0];
}

const CYCLE_START_INDEX = allMoments.findIndex((m) => m.label === "Mt. Moon Encounter");

export function hasCyclingStarted(moment: Moment): boolean {
  if (moment.label === "Brock") return false;
  const idx = allMoments.findIndex((m) => m.label === moment.label);
  return CYCLE_START_INDEX !== -1 && idx >= CYCLE_START_INDEX;
}

export function derivePlayerBox(moment: Moment): Box | null {
  if (moment.label === "Brock") return null;
  const currentIndex = allMoments.findIndex((m) => m.label === moment.label);
  if (currentIndex === -1) return null;
  for (let i = currentIndex; i >= 0; i--) {
    const m = allMoments[i];
    if (m.kind === "battle") return resolveActiveBox(m.data);
    if (m.kind === "switchBattle") return resolveActiveBox(getSwitchBattleCaseData(m.data));
    if (m.kind === "encounter" && m.data.playerBox) return m.data.playerBox;
  }
  return null;
}

export function deriveOpponentInfo(moment: Moment): OpponentInfo | null {
  if (moment.label === "Brock") return null;
  const currentIndex = allMoments.findIndex((m) => m.label === moment.label);
  if (currentIndex === -1) return null;
  const current = allMoments[currentIndex];
  if (current.kind === "battle") return { box: current.data.opponentBox, label: current.label };
  if (current.kind === "switchBattle")
    return { box: getSwitchBattleCaseData(current.data).opponentBox, label: current.label };
  for (let i = currentIndex + 1; i < allMoments.length; i++) {
    const m = allMoments[i];
    if (m.kind === "battle") return { box: m.data.opponentBox, label: m.label };
    if (m.kind === "switchBattle")
      return { box: getSwitchBattleCaseData(m.data).opponentBox, label: m.label };
  }
  return null;
}

export type StatViewType = "battlesRaw" | "battlesPercent" | "fragsRaw" | "fragsPercent";

export type TopBattler = { pokemon: PokemonData; subtitle: string };

function statScore(s: PokemonStats, view: StatViewType): number {
  switch (view) {
    case "battlesRaw":
      return s.battles;
    case "battlesPercent":
      return s.possibleBattles > 0 ? s.battles / s.possibleBattles : 0;
    case "fragsRaw":
      return s.frags;
    case "fragsPercent":
      return s.possibleFrags > 0 ? s.frags / s.possibleFrags : 0;
  }
}

function statSubtitle(s: PokemonStats, view: StatViewType): string {
  switch (view) {
    case "battlesRaw":
      return s.battles > 0 ? String(s.battles) : '-';
    case "battlesPercent": {
      const pct = s.possibleBattles > 0 ? Math.round((s.battles / s.possibleBattles) * 100) : 0;
      return pct > 0 ? `${pct}%` : '-';
    }
    case "fragsRaw":
      return s.frags > 0 ? String(s.frags) : '-';
    case "fragsPercent": {
      const pct = s.possibleFrags > 0 ? Math.round((s.frags / s.possibleFrags) * 100) : 0;
      return pct > 0 ? `${pct}%` : '-';
    }
  }
}

export function deriveTopStats(
  moment: Moment,
  playerBox: Box | null,
  view: StatViewType
): TopBattler[] {
  if (moment.label === "Brock") return [];
  const currentIndex = allMoments.findIndex((m) => m.label === moment.label);
  const battleMoments = allMoments
    .slice(0, currentIndex === -1 ? 0 : currentIndex)
    .filter(
      (m): m is Extract<Moment, { kind: "battle" | "switchBattle" }> =>
        m.kind === "battle" || m.kind === "switchBattle"
    )
    .map((m) => (m.kind === "battle" ? m.data : getSwitchBattleCaseData(m.data)));

  const resolvedBox = playerBox ? resolveBox(playerBox) : { pokemon: [] };
  if (resolvedBox.pokemon.length === 0 && battleMoments.length === 0) return [];

  const stats = battleMoments.length > 0 ? computeStats(battleMoments) : {};

  const allEntries: [string, PokemonStats][] = Object.entries(stats);
  const seen = new Set(allEntries.map(([name]) => name));
  for (const p of resolvedBox.pokemon) {
    const pData = resolvePokemon(p);
    if (!seen.has(pData.name)) {
      allEntries.push([
        pData.name,
        {
          battles: 0,
          frags: 0,
          possibleBattles: 0,
          possibleFrags: 0,
          boxOrder: pData.boxOrder ?? Infinity,
          spriteKey: pData.spriteKey,
        },
      ]);
      seen.add(pData.name);
    }
  }

  return allEntries
    .sort((a, b) => statScore(b[1], view) - statScore(a[1], view) || a[1].boxOrder - b[1].boxOrder)
    .slice(0, 6)
    .map(([name, s]) => {
      const p = findPokemon(resolvedBox, name);
      const pokemon: PokemonData = p ? resolvePokemon(p) : { name, spriteKey: s.spriteKey };
      return { pokemon, subtitle: statSubtitle(s, view) };
    });
}

export function deriveOverlayMeta(moment: Moment): OverlayMeta {
  const currentIndex = allMoments.findIndex((m) => m.label === moment.label);
  let meta: OverlayMeta = { split: "Brock", cap: 16, badges: {} };
  for (const { label, split, cap, badge } of MILESTONES) {
    const milestoneIndex = allMoments.findIndex((m) => m.label === label);
    if (milestoneIndex === -1 || milestoneIndex >= currentIndex) continue;
    if (split !== undefined) meta = { ...meta, split };
    if (cap !== undefined) meta = { ...meta, cap };
    if (badge !== undefined) meta = { ...meta, badges: { ...meta.badges, [badge]: true } };
  }
  return meta;
}
