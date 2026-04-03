import BrowserOnly from "@docusaurus/BrowserOnly";
import { type HpDisplay, getHpDisplay, setHpDisplay } from "@site/src/utils/hpDisplay";
import { useState } from "react";
import styles from "./HpDisplayToggle.module.css";

function Toggle() {
  const [display, setDisplay] = useState<HpDisplay>(getHpDisplay);

  function handleClick() {
    const next = display === "percent" ? "raw" : "percent";
    setHpDisplay(next);
    setDisplay(next);
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
