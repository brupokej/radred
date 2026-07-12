import { BattleData } from "@site/src/components/Battle";
import { BoxChangeData } from "@site/src/components/BoxChange";
import { ChecklistData } from "@site/src/components/Checklist";
import { EncounterData } from "@site/src/components/Encounter";
import { SwitchBattleData } from "@site/src/components/SwitchBattle";

export type Moment =
  | { split: string; label: string; kind: "battle"; data: BattleData }
  | { split: string; label: string; kind: "switchBattle"; data: SwitchBattleData }
  | { split: string; label: string; kind: "encounter"; data: EncounterData }
  | { split: string; label: string; kind: "checklist"; data: ChecklistData }
  | { split: string; label: string; kind: "boxChange"; data?: BoxChangeData }
  | { split: string; label: string; kind: "other" };
