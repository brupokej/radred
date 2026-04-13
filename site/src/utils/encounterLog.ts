import { encounterSequences, locations } from "./encounterPools";
import { getState, setState } from "./storage";

export function readAllSelections(): Record<string, string[]> {
  if (typeof window === "undefined") return {};
  const result: Record<string, string[]> = {};
  for (const [target, cfg] of Object.entries(encounterSequences)) {
    try {
      const raw = getState(`sequence-${cfg.sequenceId}`);
      result[cfg.sequenceId] = raw ? JSON.parse(raw) : [target];
    } catch {
      result[cfg.sequenceId] = [target];
    }
  }
  return result;
}

export function writeAll(updates: Record<string, string[]>): void {
  for (const [sequenceId, selections] of Object.entries(updates)) {
    setState(`sequence-${sequenceId}`, JSON.stringify(selections));
  }
}

export function getLocation(target: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  const all = readAllSelections();
  for (const [seqTarget, cfg] of Object.entries(encounterSequences)) {
    const selections = all[cfg.sequenceId] ?? [seqTarget];
    const idx = selections.indexOf(target);
    if (idx === -1) continue;
    const startIndex = Object.values(encounterSequences)
      .filter((c) => c.priority < cfg.priority)
      .reduce((sum, c) => sum + (all[c.sequenceId]?.length ?? 1), 0);
    return locations[startIndex + idx];
  }
  return undefined;
}
