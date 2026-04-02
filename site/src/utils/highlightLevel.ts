export const LEVELS = ["info", "warning", "danger", "off"] as const;
export type HighlightLevel = (typeof LEVELS)[number];
export const DEFAULT_LEVEL: HighlightLevel = "danger";
const STORAGE_KEY = "highlight-level";

export function nextLevel(level: HighlightLevel): HighlightLevel {
  return LEVELS[(LEVELS.indexOf(level) + 1) % LEVELS.length];
}

export function setHighlightLevel(level: HighlightLevel): void {
  try {
    localStorage.setItem(STORAGE_KEY, level);
  } catch {}
  if (level === DEFAULT_LEVEL) {
    document.documentElement.removeAttribute("data-highlight-level");
  } else {
    document.documentElement.setAttribute("data-highlight-level", level);
  }
}

export function getHighlightLevel(): HighlightLevel {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (LEVELS as readonly string[]).includes(stored)) {
      return stored as HighlightLevel;
    }
  } catch {}
  return DEFAULT_LEVEL;
}
