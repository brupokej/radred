import { useMemo } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import GameState from "@site/src/components/GameState";
import type { ReactNode } from "react";
import { moments as brockMoments } from "@site/src/data/guide/brock";
import type { Moment } from "@site/src/utils/moments";
import { boxToTeam } from "@site/src/utils/calcLink";
import { Calc } from "@site/src/components/Calc";
import { useStorageState } from "@site/src/utils/storage";
import { LIVE_MOMENT_DEFAULT } from "@site/src/utils/storageDefaults";

type BattleMoment = Extract<Moment, { kind: "battle" }>;

function CalcWithGameState(): ReactNode {
  const { value: storedLabel } = useStorageState("live-moment");
  const effectiveLabel = storedLabel ?? LIVE_MOMENT_DEFAULT;

  const battle = useMemo(() => {
    const found = brockMoments.find(
      (m): m is BattleMoment => m.kind === "battle" && m.label === effectiveLabel
    );
    return found?.data ?? null;
  }, [effectiveLabel]);

  const p1Team = useMemo(
    () => (battle?.playerBox ? boxToTeam(battle.playerBox) : []),
    [battle]
  );
  const p2Team = useMemo(
    () => (battle ? boxToTeam(battle.opponentBox) : []),
    [battle]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Calc key={effectiveLabel} p1Team={p1Team} p2Team={p2Team} />
      <GameState moments={brockMoments} />
    </div>
  );
}

export default function CalcPage(): ReactNode {
  return (
    <Layout title="Damage Calculator" description="Radical Red damage calculator">
      <main style={{ padding: "1rem 1.5rem" }}>
        <BrowserOnly fallback={<div>Loading calculator…</div>}>
          {() => <CalcWithGameState />}
        </BrowserOnly>
      </main>
    </Layout>
  );
}
