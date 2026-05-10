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
  return <span className={styles.label}>S</span>;
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
