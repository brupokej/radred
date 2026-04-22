import { Moment } from "@site/src/utils/moments";
import { useRelayState } from "@site/src/utils/overlayHooks";
import { postRelayState } from "@site/src/utils/overlayRelay";
import { setState } from "@site/src/utils/storage";
import { useState } from "react";
import styles from "./styles.module.css";

export default function StartButton({ moment, attempt }: { moment: Moment; attempt?: number }) {
  if (process.env.NODE_ENV !== "development" || navigator.webdriver) return null;
  return <StartButtonInner moment={moment} attempt={attempt} />;
}

function StartButtonInner({ moment, attempt }: { moment: Moment; attempt?: number }) {
  const relayState = useRelayState();
  const [pending, setPending] = useState(false);
  const resolvedAttempt = attempt ?? 1;
  const isLive =
    relayState?.moment?.label === moment.label &&
    (attempt === undefined || (relayState.attempt ?? 1) === resolvedAttempt);

  async function handleStart() {
    if (isLive || pending) return;
    setPending(true);
    setState("overlay-moment", moment.label);
    await Promise.all([
      postRelayState({
        moment,
        ...(attempt !== undefined ? { attempt: resolvedAttempt } : {}),
      }).catch(() => {}),
      new Promise((r) => setTimeout(r, 1400)),
    ]);
    setPending(false);
  }

  const iconState = pending ? "pending" : isLive ? "live" : "default";

  return (
    <button
      className={`${styles.button} ${isLive ? styles.live : ""} ${pending ? styles.pending : ""}`}
      onClick={handleStart}
      disabled={isLive || pending}
    >
      Go Live{" "}
      <span key={iconState} className={styles.icon}>
        {iconState === "live" && "✓"}
        {iconState === "pending" && <span className={styles.spinner} />}
        {iconState === "default" && "▶"}
      </span>
    </button>
  );
}
