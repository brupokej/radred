import { BattleData } from "@site/src/components/Battle";
import { BoxChangeData } from "@site/src/components/BoxChange";
import { EncounterData } from "@site/src/components/Encounter";
import { SwitchBattleData } from "@site/src/components/SwitchBattle";

export type Moment =
  | { split: string; label: string; kind: "battle"; secret?: true; data: BattleData }
  | { split: string; label: string; kind: "switchBattle"; secret?: true; data: SwitchBattleData }
  | { split: string; label: string; kind: "encounter"; secret?: true; data: EncounterData }
  | { split: string; label: string; kind: "boxChange"; data?: BoxChangeData }
  | { split: string; label: string; kind: "other" };
