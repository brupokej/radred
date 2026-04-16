import Head from "@docusaurus/Head";
import Team from "@site/src/components/Team";
import { RELAY_HTTP, RELAY_WS, RelayState } from "@site/src/utils/overlayRelay";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function OpponentOverlay() {
  const [state, setState] = useState<RelayState | null>(null);

  useEffect(() => {
    fetch(`${RELAY_HTTP}/state`)
      .then((r) => r.json())
      .then((data) => {
        if (data) setState(data);
      })
      .catch(() => {});

    const ws = new WebSocket(RELAY_WS);
    ws.onmessage = (e) => {
      try {
        setState(JSON.parse(e.data));
      } catch {}
    };
    ws.onerror = () => {};
    return () => ws.close();
  }, []);

  const moment = state?.moment;
  const battleMoment = moment?.kind === "battle" ? moment : null;

  return (
    <>
      <Head>
        <style>{`html, body, #__docusaurus { background: transparent !important; margin: 0; padding: 0; width: 100%; }`}</style>
      </Head>
      <div className={styles.overlay}>
        {battleMoment && <Team box={battleMoment.data.opponentBox} title="Opponent Team" />}
      </div>
    </>
  );
}
