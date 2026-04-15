import { BattleData } from "@site/src/components/Battle";
import { BoxChangeData } from "@site/src/components/BoxChange";
import { EncounterData } from "@site/src/components/Encounter";

export type Moment =
  | { label: string; kind: "battle"; data: BattleData }
  | { label: string; kind: "encounter"; data: EncounterData }
  | { label: string; kind: "boxChange"; data: BoxChangeData };
