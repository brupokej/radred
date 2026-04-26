import { secretMode } from "@site/src/data/secretMode";
import { Moment } from "@site/src/utils/moments";
import { useRelayState } from "@site/src/utils/overlayHooks";
import { postRelayState } from "@site/src/utils/overlayRelay";
import { removeState, setState } from "@site/src/utils/storage";
import { LIVE_MOMENT_DEFAULT } from "@site/src/utils/storageDefaults";
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";

export default function GoLiveButton({
  moment,
  attempt,
  secret,
}: {
  moment: Moment;
  attempt?: number;
  secret?: boolean;
}) {
  if (process.env.NODE_ENV !== "development" || navigator.webdriver) return null;
  if (!!secret && !secretMode) return null;
  return <GoLiveButtonInner moment={moment} attempt={attempt} />;
}

function GoLiveButtonInner({ moment, attempt }: { moment: Moment; attempt?: number }) {
  const relayState = useRelayState();
  const [pending, setPending] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLSpanElement | null>(null);
  const sentinelRef = useRef<HTMLSpanElement>(null);

  const resolvedAttempt = attempt ?? 1;
  const isLive =
    relayState?.moment?.label === moment.label &&
    (attempt === undefined || (relayState.attempt ?? 1) === resolvedAttempt);

  useLayoutEffect(() => {
    if (!sentinelRef.current) return;
    const sentinel = sentinelRef.current;
    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    let target: Element | null = null;
    for (const h of headings) {
      if (sentinel.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_PRECEDING) {
        target = h;
      }
    }
    if (!target) return;
    const slot = document.createElement("span");
    target.appendChild(slot);
    setPortalTarget(slot);
    return () => slot.remove();
  }, []);

  async function handleStart() {
    if (isLive || pending) return;
    setPending(true);
    if (moment.label === LIVE_MOMENT_DEFAULT) removeState("live-moment");
    else setState("live-moment", moment.label);
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

  const button = (
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

  return (
    <>
      <span ref={sentinelRef} />
      {portalTarget && createPortal(button, portalTarget)}
    </>
  );
}
