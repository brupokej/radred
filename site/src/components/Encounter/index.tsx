import Card from "@site/src/components/Card";
import { PokemonEntry } from "@site/src/components/PokemonEntry";
import { Row } from "@site/src/components/Row";
import Team from "@site/src/components/Team";
import { Box } from "@site/src/utils/box";
import { readAllSelections, writeAll } from "@site/src/utils/encounterLog";
import { encounterSequences, locations } from "@site/src/utils/encounterPools";
import { PokemonData } from "@site/src/utils/pokemon";
import { STORAGE_EVENT } from "@site/src/utils/storage";
import { ReactNode, useEffect, useState } from "react";
import styles from "./styles.module.css";

function getFilteredOptions(
  all: Record<string, string[]>,
  optionPool: string[],
  poolName: string,
  sequenceId: string,
  priority: number,
  currentIdx: number
): string[] {
  const consumed = new Set<string>();
  for (const [seqTarget, cfg] of Object.entries(encounterSequences)) {
    if (cfg.poolName !== poolName || cfg.sequenceId === sequenceId) continue;
    if (cfg.priority > priority) continue;
    for (const s of all[cfg.sequenceId] ?? [seqTarget]) consumed.add(s);
  }
  const mySelections = all[sequenceId] ?? [];
  for (let i = 0; i < currentIdx; i++) consumed.add(mySelections[i]);
  return optionPool.filter((o) => !consumed.has(o));
}

function Sequence({ target }: { target: string }) {
  const config = encounterSequences[target]!;
  const { sequenceId, poolName, optionPool, priority, locationWindow, method } = config;

  const [all, setAll] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const sync = () => setAll(readAllSelections());
    window.addEventListener(STORAGE_EVENT, sync);
    sync();
    return () => window.removeEventListener(STORAGE_EVENT, sync);
  }, []);

  const selections = all[sequenceId] ?? [target];

  const startIndex = Object.values(encounterSequences)
    .filter((c) => c.priority < priority)
    .reduce((sum, c) => sum + (all[c.sequenceId]?.length ?? 1), 0);

  function handleChange(idx: number, value: string) {
    const newSelections = [...selections.slice(0, idx), value];
    const nextLocation = locations[startIndex + newSelections.length];
    if (value !== target && nextLocation && locationWindow.includes(nextLocation)) {
      newSelections.push(target);
    }

    const updates: Record<string, string[]> = { [sequenceId]: newSelections };
    for (const [seqTarget, cfg] of Object.entries(encounterSequences)) {
      if (cfg.priority > priority) updates[cfg.sequenceId] = [seqTarget];
    }
    writeAll(updates);
  }

  const externalEntry = Object.entries(encounterSequences).find(
    ([seqTarget, cfg]) =>
      cfg.poolName === poolName &&
      cfg.sequenceId !== sequenceId &&
      (all[cfg.sequenceId] ?? [seqTarget]).includes(target)
  );

  if (externalEntry) {
    const [extTarget, extCfg] = externalEntry;
    const extSelections = all[extCfg.sequenceId] ?? [extTarget];
    const extStart = Object.values(encounterSequences)
      .filter((c) => c.priority < extCfg.priority)
      .reduce((sum, c) => sum + (all[c.sequenceId]?.length ?? 1), 0);
    const location = locations[extStart + extSelections.indexOf(target)];
    return (
      <Row
        row={[
          `${method} → ${location} →`,
          { dropdown: { value: target, options: [target], disabled: true } },
        ]}
      />
    );
  }

  const maxWindowIndex = Math.max(...locationWindow.map((loc) => locations.indexOf(loc)));

  return (
    <>
      {selections.map((value, idx) => {
        const locationIdx = startIndex + idx;
        const location = locations[locationIdx];
        const isTerminalRow = locationIdx === maxWindowIndex;
        const options = isTerminalRow
          ? [target]
          : getFilteredOptions(all, optionPool, poolName, sequenceId, priority, idx);
        const outOfLocations = !locationWindow.includes(location ?? "");
        const onlyOption = options.length === 1;
        return (
          <div key={idx} className={styles.sequenceRow} data-sequence={sequenceId}>
            <Row
              row={[
                `${method} → ${location} →`,
                {
                  dropdown: {
                    value,
                    options,
                    disabled: onlyOption || outOfLocations,
                    onChange: (v) => handleChange(idx, v),
                  },
                },
              ]}
            />
          </div>
        );
      })}
    </>
  );
}

export interface EncounterData {
  pokemon: PokemonData;
  playerBox?: Box;
}

export default function Encounter({
  data,
  children,
}: {
  data: EncounterData;
  children?: ReactNode;
}) {
  const resolvedEncounter = data.pokemon;
  const resolvedPlayerBox = data.playerBox;
  const isSequence = resolvedEncounter.name in encounterSequences;
  return (
    <>
      {resolvedPlayerBox && (resolvedPlayerBox.team ?? []).length > 0 && (
        <Team title="Player Team" box={resolvedPlayerBox} />
      )}
      <Card title="Encounter Plan">
        {isSequence && <Sequence target={resolvedEncounter.name} />}
        <PokemonEntry
          pokemon={resolvedEncounter}
          className={isSequence ? styles.contentSequence : undefined}
        >
          {children}
        </PokemonEntry>
      </Card>
    </>
  );
}
