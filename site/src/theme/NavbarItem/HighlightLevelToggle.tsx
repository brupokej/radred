import BrowserOnly from "@docusaurus/BrowserOnly";
import {
  type HighlightLevel,
  getHighlightLevel,
  nextLevel,
  setHighlightLevel,
} from "@site/src/utils/highlightLevel";
import { useState } from "react";
import styles from "./HighlightLevelToggle.module.css";

const VISIBLE: Record<HighlightLevel, number> = {
  info: 3,
  warning: 2,
  danger: 1,
  off: 0,
};

function Toggle() {
  const [level, setLevel] = useState<HighlightLevel>(getHighlightLevel);

  function handleClick() {
    const next = nextLevel(level);
    setHighlightLevel(next);
    setLevel(next);
  }

  const visible = VISIBLE[level];

  return (
    <button className={`clean-btn ${styles.toggle}`} onClick={handleClick} title="highlight level">
      <span className={styles.dotContainer}>
        <span className={`${styles.dot} ${styles.dotInfo} ${visible < 3 ? styles.dotDim : ""}`} />
        <span
          className={`${styles.dot} ${styles.dotWarning} ${visible < 2 ? styles.dotDim : ""}`}
        />
        <span className={`${styles.dot} ${styles.dotDanger} ${visible < 1 ? styles.dotDim : ""}`} />
      </span>
    </button>
  );
}

export default function HighlightLevelToggle(): JSX.Element {
  return <BrowserOnly>{() => <Toggle />}</BrowserOnly>;
}
