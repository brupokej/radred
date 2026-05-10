import BrowserOnly from "@docusaurus/BrowserOnly";
import { useColorMode } from "@docusaurus/theme-common";
import { secretMode } from "@site/src/data/secretMode";
import { setStreamMode, useStreamMode } from "@site/src/utils/streamMode";
import type { JSX } from "react";
import { useEffect } from "react";
import styles from "./HpDisplayToggle.module.css";

function Toggle() {
  const { colorMode } = useColorMode();
  const active = useStreamMode();

  useEffect(() => {
    if (active) {
      document.documentElement.setAttribute("data-stream-mode", "true");
    } else {
      document.documentElement.removeAttribute("data-stream-mode");
    }
  }, [active]);

  useEffect(() => {
    if (colorMode !== "dark") {
      setStreamMode(false);
    }
  }, [colorMode]);

  if (!secretMode || colorMode !== "dark") {
    return null;
  }

  return (
    <button
      className={`clean-btn ${styles.toggle}`}
      onClick={() => setStreamMode(!active)}
      style={{ opacity: active ? 1 : 0.4 }}
      title={active ? "stream mode on" : "stream mode off"}
    >
      <span className={styles.label}>S</span>
    </button>
  );
}

export default function StreamModeToggle(): JSX.Element {
  return <BrowserOnly>{() => <Toggle />}</BrowserOnly>;
}
