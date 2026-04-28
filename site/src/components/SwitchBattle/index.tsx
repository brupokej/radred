import { Battle, BattleData } from "@site/src/components/Battle";
import { Row } from "@site/src/components/Row";
import Switch, { Case } from "@site/src/components/Switch";
import { slugify } from "@site/src/utils/slugify";
import { getState, removeState, setState, useStorageState } from "@site/src/utils/storage";

export interface SwitchBattleCase {
  label: string;
  data: BattleData;
}

export interface SwitchBattleData {
  cases: SwitchBattleCase[];
}

function storageKeyFor(cases: SwitchBattleCase[]): string {
  return `branch-${slugify(cases.map((c) => c.label))}`;
}

function resolveActiveCase(cases: SwitchBattleCase[], stored: string | null): SwitchBattleCase {
  return (stored ? cases.find((c) => slugify(c.label) === stored) : null) ?? cases[0];
}

export function getSwitchBattleCaseData(data: SwitchBattleData): BattleData {
  return resolveActiveCase(data.cases, getState(storageKeyFor(data.cases))).data;
}

export function SwitchBattle({ data, secret }: { data: SwitchBattleData; secret?: boolean }) {
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
      <Switch switch={() => getState(storageKey) ?? slugify(data.cases[0].label)}>
        {data.cases.map((c) => (
          <Case key={slugify(c.label)} case={slugify(c.label)}>
            <Battle data={c.data} secret={secret} opponentTeamHeader={branchRow} />
          </Case>
        ))}
      </Switch>
    </div>
  );
}
