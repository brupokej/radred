import Card from "@site/src/components/Card";
import { Row } from "@site/src/components/Row";
import { Moment } from "@site/src/utils/moments";
import { getState, setState, STORAGE_EVENT } from "@site/src/utils/storage";
import { useEffect, useMemo, useState } from "react";

export default function StatsFilter({ moments }: { moments: Moment[] }) {
  const battleMoments = useMemo(
    () => moments.filter((m): m is Extract<Moment, { kind: "battle" }> => m.kind === "battle"),
    [moments]
  );

  const [startLabel, setStartLabel] = useState<string>(() => getState("stats-filter-start") ?? "");
  const [endLabel, setEndLabel] = useState<string>(() => getState("stats-filter-end") ?? "");

  useEffect(() => {
    const sync = () => {
      setStartLabel(getState("stats-filter-start") ?? "");
      setEndLabel(getState("stats-filter-end") ?? "");
    };
    window.addEventListener(STORAGE_EVENT, sync);
    return () => window.removeEventListener(STORAGE_EVENT, sync);
  }, []);

  const startIdx = useMemo(() => {
    if (!startLabel) return 0;
    const i = battleMoments.findIndex((m) => m.label === startLabel);
    return i >= 0 ? i : 0;
  }, [startLabel, battleMoments]);

  const endIdx = useMemo(() => {
    if (!endLabel) return battleMoments.length - 1;
    const i = battleMoments.findIndex((m) => m.label === endLabel);
    return i >= 0 ? i : battleMoments.length - 1;
  }, [endLabel, battleMoments]);

  function handleStartChange(label: string) {
    setState("stats-filter-start", label);
    setStartLabel(label);
    // If new start is after current end, move end forward to match
    const newStart = battleMoments.findIndex((m) => m.label === label);
    const curEnd = battleMoments.findIndex((m) => m.label === endLabel);
    if (curEnd >= 0 && newStart > curEnd) {
      setState("stats-filter-end", label);
      setEndLabel(label);
    }
  }

  function handleEndChange(label: string) {
    setState("stats-filter-end", label);
    setEndLabel(label);
  }

  const startOptions = battleMoments.map((m) => m.label);
  const endOptions = battleMoments.slice(startIdx).map((m) => m.label);

  return (
    <Card title="Filter">
      <Row
        row={[
          "From",
          {
            dropdown: {
              value: battleMoments[startIdx]?.label ?? "",
              options: startOptions,
              onChange: handleStartChange,
            },
          },
          "To",
          {
            dropdown: {
              value: battleMoments[endIdx]?.label ?? "",
              options: endOptions,
              onChange: handleEndChange,
            },
          },
        ]}
      />
    </Card>
  );
}
