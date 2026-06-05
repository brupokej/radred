import BrowserOnly from "@docusaurus/BrowserOnly";
import { nextMode, useMode, type ExtendedMode } from "@site/src/utils/colorMode";
import IconDarkMode from "@theme/Icon/DarkMode";
import IconLightMode from "@theme/Icon/LightMode";
import IconSystemColorMode from "@theme/Icon/SystemColorMode";
import type { JSX, ReactNode } from "react";
import styles from "./HpDisplayToggle.module.css";

const TITLES: Record<ExtendedMode, string> = {
  light: "light mode",
  dark: "dark mode",
  stream: "stream mode",
  system: "system mode",
};

function ModeIcon({ mode }: { mode: ExtendedMode }): ReactNode {
  if (mode === "light") return <IconLightMode aria-hidden />;
  if (mode === "dark") return <IconDarkMode aria-hidden />;
  if (mode === "system") return <IconSystemColorMode aria-hidden />;
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden>
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
    </svg>
  );
}

function Toggle() {
  const [mode, setMode] = useMode();

  return (
    <button
      className={`clean-btn ${styles.toggle}`}
      onClick={() => setMode(nextMode(mode))}
      title={TITLES[mode]}
    >
      <ModeIcon mode={mode} />
    </button>
  );
}

export default function CombinedColorModeToggle(): JSX.Element {
  return <BrowserOnly>{() => <Toggle />}</BrowserOnly>;
}
