import { Battle, BattleData } from "@site/src/components/Battle";
import { Row } from "@site/src/components/Row";
import { Moment } from "@site/src/utils/moments";
import { slugify } from "@site/src/utils/slugify";
import { getState, removeState, setState, useStorageState } from "@site/src/utils/storage";

export interface SwitchBattleCase {
  label: string;
  data: BattleData;
}

export interface SwitchBattleData {
  cases: SwitchBattleCase[];
}

export function storageKeyFor(cases: SwitchBattleCase[]): string {
  return `branch-${slugify(cases.map((c) => c.label))}`;
}

export function getSwitchBattleState(moment: Moment): string | null {
  return moment.kind === "switchBattle" ? getState(storageKeyFor(moment.data.cases)) : null;
}

export function resolveActiveCase(
  cases: SwitchBattleCase[],
  stored: string | null
): SwitchBattleCase {
  return (stored ? cases.find((c) => slugify(c.label) === stored) : null) ?? cases[0];
}

export function getSwitchBattleCaseData(data: SwitchBattleData): BattleData {
  return resolveActiveCase(data.cases, getState(storageKeyFor(data.cases))).data;
}

export function SwitchBattle({ data }: { data: SwitchBattleData }) {
  const storageKey = storageKeyFor(data.cases);
  const { value: stored } = useStorageState(storageKey);
  const activeCase = resolveActiveCase(data.cases, stored);

  function handleChange(label: string) {
    if (label === data.cases[0].label) removeState(storageKey);
    else setState(storageKey, slugify(label));
  }

  const branchRow = (
    <Row
      row={[
        "Branch →",
        {
          dropdown: {
            value: activeCase.label,
            options: data.cases.map((c) => c.label),
            onChange: handleChange,
          },
        },
      ]}
    />
  );

  return (
    <div data-switch-battle={storageKey}>
      {data.cases.map((c) => (
        <div
          key={slugify(c.label)}
          data-switch-case={c === activeCase ? "active" : undefined}
          style={c === activeCase ? undefined : { display: "none" }}
        >
          <Battle data={c.data} opponentTeamHeader={branchRow} />
        </div>
      ))}
    </div>
  );
}
