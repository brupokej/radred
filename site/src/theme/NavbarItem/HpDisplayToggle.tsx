import BrowserOnly from "@docusaurus/BrowserOnly";
import { nextDisplay, setHpDisplay, useHpDisplay } from "@site/src/utils/hpDisplay";
import type { JSX } from "react";
import styles from "./HpDisplayToggle.module.css";

function Toggle() {
  const display = useHpDisplay();

  function handleClick() {
    setHpDisplay(nextDisplay(display));
  }

  return (
    <button
      className={`clean-btn ${styles.toggle}`}
      onClick={handleClick}
      title={display === "percent" ? "percentage HP" : "flat HP"}
    >
      <span className={styles.label}>{display === "percent" ? "%" : "#"}</span>
    </button>
  );
}

export default function HpDisplayToggle(): JSX.Element {
  return <BrowserOnly>{() => <Toggle />}</BrowserOnly>;
}
