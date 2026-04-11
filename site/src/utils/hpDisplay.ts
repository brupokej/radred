import { useEffect, useState } from "react";
import { getState, setState, STORAGE_EVENT } from "./storage";

export const DISPLAYS = ["percent", "raw"] as const;
export type HpDisplay = (typeof DISPLAYS)[number];
export const DEFAULT_DISPLAY: HpDisplay = "percent";
const STORAGE_KEY = "navbar-item-hp-display";

export function nextDisplay(display: HpDisplay): HpDisplay {
  return DISPLAYS[(DISPLAYS.indexOf(display) + 1) % DISPLAYS.length];
}

export function getHpDisplay(): HpDisplay {
  const stored = getState(STORAGE_KEY);
  if (stored && (DISPLAYS as readonly string[]).includes(stored)) return stored as HpDisplay;
  return DEFAULT_DISPLAY;
}

export function setHpDisplay(display: HpDisplay): void {
  setState(STORAGE_KEY, display);
}

export function useHpDisplay(): HpDisplay {
  const [display, setDisplay] = useState<HpDisplay>(getHpDisplay);
  useEffect(() => {
    const handler = () => setDisplay(getHpDisplay());
    window.addEventListener(STORAGE_EVENT, handler);
    return () => window.removeEventListener(STORAGE_EVENT, handler);
  }, []);
  return display;
}
