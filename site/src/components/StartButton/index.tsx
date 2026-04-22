import { Moment } from "@site/src/utils/moments";
import { postRelayState } from "@site/src/utils/overlayRelay";
import { setState } from "@site/src/utils/storage";
import styles from "./styles.module.css";

export default function StartButton({ moment, attempt }: { moment: Moment; attempt?: number }) {
  if (process.env.NODE_ENV !== "development" || navigator.webdriver) return null;

  async function handleStart() {
    setState("overlay-moment", moment.label);
    await postRelayState({ moment, ...(attempt !== undefined && { attempt }) }).catch(() => {});
  }

  return (
    <button className={styles.button} onClick={handleStart}>
      Start →
    </button>
  );
}
