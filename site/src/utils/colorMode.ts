import { useColorMode } from "@docusaurus/theme-common";
import { secretMode } from "@site/src/data/secretMode";
import { setStreamMode, useStreamMode } from "@site/src/utils/streamMode";
import { useEffect } from "react";

export type ExtendedMode = "light" | "dark" | "stream" | "system";

const MODES_BASE = ["light", "dark", "system"] as const satisfies readonly ExtendedMode[];
const MODES_SECRET = [
  "light",
  "dark",
  "stream",
  "system",
] as const satisfies readonly ExtendedMode[];

export function nextMode(mode: ExtendedMode): ExtendedMode {
  const modes = secretMode ? MODES_SECRET : MODES_BASE;
  const idx = (modes as readonly ExtendedMode[]).indexOf(mode);
  return modes[(idx === -1 ? 0 : idx + 1) % modes.length];
}

export function useMode(): [ExtendedMode, (mode: ExtendedMode) => void] {
  const { colorModeChoice, setColorMode } = useColorMode();
  const streamActive = useStreamMode();

  const mode: ExtendedMode =
    streamActive && colorModeChoice === "dark"
      ? "stream"
      : colorModeChoice === null
        ? "system"
        : colorModeChoice;

  useEffect(() => {
    if (streamActive) {
      document.documentElement.setAttribute("data-stream-mode", "true");
    } else {
      document.documentElement.removeAttribute("data-stream-mode");
    }
  }, [streamActive]);

  useEffect(() => {
    if (colorModeChoice !== "dark" && streamActive) {
      setStreamMode(false);
    }
  }, [colorModeChoice, streamActive]);

  function setMode(next: ExtendedMode): void {
    if (next === "stream") {
      setColorMode("dark");
      setStreamMode(true);
    } else {
      setStreamMode(false);
      setColorMode(next === "system" ? null : next);
    }
  }

  return [mode, setMode];
}
