import { useEffect, useState } from "react";
import { getState, setState, STORAGE_EVENT } from "./storage";

export const LEVELS = ["info", "warning", "danger", "off"] as const;
export type HighlightLevel = (typeof LEVELS)[number];
export const DEFAULT_LEVEL: HighlightLevel = "info";
const STORAGE_KEY = "navbar-item-highlight-level";

export function nextLevel(level: HighlightLevel): HighlightLevel {
  return LEVELS[(LEVELS.indexOf(level) + 1) % LEVELS.length];
}

export function getHighlightLevel(): HighlightLevel {
  const stored = getState(STORAGE_KEY);
  if (stored && (LEVELS as readonly string[]).includes(stored)) return stored as HighlightLevel;
  return DEFAULT_LEVEL;
}

export function setHighlightLevel(level: HighlightLevel): void {
  setState(STORAGE_KEY, level);
  if (level === DEFAULT_LEVEL) {
    document.documentElement.removeAttribute("data-highlight-level");
  } else {
    document.documentElement.setAttribute("data-highlight-level", level);
  }
}

export function useHighlightLevel(): HighlightLevel {
  const [level, setLevel] = useState<HighlightLevel>(getHighlightLevel);
  useEffect(() => {
    const handler = () => setLevel(getHighlightLevel());
    window.addEventListener(STORAGE_EVENT, handler);
    return () => window.removeEventListener(STORAGE_EVENT, handler);
  }, []);
  return level;
}
