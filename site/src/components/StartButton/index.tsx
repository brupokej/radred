import { Moment } from "@site/src/utils/moments";
import { postRelayState } from "@site/src/utils/overlayRelay";
import { setState } from "@site/src/utils/storage";
import styles from "./styles.module.css";

export default function StartButton({ moment }: { moment: Moment }) {
  if (process.env.NODE_ENV !== "development" || navigator.webdriver) return null;

  async function handleStart() {
    setState("stats-filter-end", moment.label);
    await postRelayState({ moment }).catch(() => {});
  }

  return (
    <button className={styles.button} onClick={handleStart}>
      ▶ Start
    </button>
  );
}
