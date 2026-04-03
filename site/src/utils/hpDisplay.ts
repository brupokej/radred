import { useEffect, useState } from "react";

export type HpDisplay = "percent" | "raw";
const DEFAULT: HpDisplay = "percent";
const STORAGE_KEY = "hp-display";
const EVENT = "hp-display-change";

export function getHpDisplay(): HpDisplay {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "percent" || stored === "raw") return stored;
  } catch {}
  return DEFAULT;
}

export function setHpDisplay(display: HpDisplay): void {
  try {
    localStorage.setItem(STORAGE_KEY, display);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function useHpDisplay(): HpDisplay {
  const [display, setDisplay] = useState<HpDisplay>(DEFAULT);
  useEffect(() => {
    setDisplay(getHpDisplay());
    const handler = () => setDisplay(getHpDisplay());
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, []);
  return display;
}
