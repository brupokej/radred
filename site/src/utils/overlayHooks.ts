import { OverlayPanelSlot } from "@site/src/components/Overlay";
import { resolveBox } from "@site/src/utils/box";
import { deriveOpponentInfo, findMomentByLabel } from "@site/src/utils/overlayMeta";
import { RELAY_HTTP, RELAY_WS, RelayState } from "@site/src/utils/overlayRelay";
import { resolvePokemon } from "@site/src/utils/pokemon";
import { LIVE_ATTEMPT_DEFAULT, LIVE_MOMENT_DEFAULT } from "@site/src/utils/storageDefaults";
import { FADE_MS } from "@site/src/utils/useFadedValue";
import { useEffect, useMemo, useRef, useState } from "react";

function readLocalState(): RelayState {
  return {
    moment: findMomentByLabel(localStorage.getItem("live-moment") ?? LIVE_MOMENT_DEFAULT),
    attempt: Number(localStorage.getItem("live-attempt")) || LIVE_ATTEMPT_DEFAULT,
  };
}

function withLocalAttempt(data: RelayState): RelayState {
  return data.attempt ? data : { ...data, attempt: readLocalState().attempt };
}

export function useRelayState(): RelayState | null {
  const [state, setState] = useState<RelayState | null>(null);
  useEffect(() => {
    const localState = readLocalState;
    if (process.env.NODE_ENV !== "development") {
      setState(localState());
      return;
    }

    let stopped = false;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    function connect() {
      fetch(`${RELAY_HTTP}/state`)
        .then((r) => r.json())
        .then((data) => {
          if (!stopped) setState(data?.moment ? withLocalAttempt(data) : localState());
        })
        .catch(() => {
          if (!stopped) setState(localState());
        });

      const ws = new WebSocket(RELAY_WS);
      ws.onmessage = (e) => {
        try {
          setState(withLocalAttempt(JSON.parse(e.data)));
        } catch {}
      };
      ws.onerror = () => {};
      ws.onclose = () => {
        if (!stopped) retryTimer = setTimeout(connect, 3000);
      };
    }

    connect();
    return () => {
      stopped = true;
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);
  return state;
}

export function useOpponent(liveState: RelayState | null): {
  title: string;
  slots: OverlayPanelSlot[];
  visible: boolean;
} {
  const liveInfo = liveState?.moment ? deriveOpponentInfo(liveState.moment) : null;
  const liveTitle = liveInfo ? liveInfo.label.replace(/ Battle$/, "") : null;

  const [displayed, setDisplayed] = useState({ info: liveInfo, title: liveTitle });
  const [visible, setVisible] = useState(true);
  const liveRef = useRef({ info: liveInfo, title: liveTitle });
  const mountedRef = useRef(false);
  const pendingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  liveRef.current = { info: liveInfo, title: liveTitle };

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (pendingRef.current) clearTimeout(pendingRef.current);
    setVisible(false);
    pendingRef.current = setTimeout(() => {
      setDisplayed(liveRef.current);
      setVisible(true);
      pendingRef.current = null;
    }, FADE_MS);
  }, [liveTitle]); // eslint-disable-line react-hooks/exhaustive-deps

  const slots = useMemo(() => {
    const info = displayed.info;
    if (!info) return Array(6).fill(null) as OverlayPanelSlot[];
    const resolved = resolveBox(info.box);
    const team = (info.box.team ?? []).map((name) => resolved.get(name) ?? null);
    const entries: OverlayPanelSlot[] = team.map((p) =>
      p ? { pokemon: resolvePokemon(p) } : null
    );
    return [...entries, ...Array(Math.max(0, 6 - entries.length)).fill(null)].slice(
      0,
      6
    ) as OverlayPanelSlot[];
  }, [displayed.info]); // eslint-disable-line react-hooks/exhaustive-deps

  return { title: displayed.title ?? "-", slots, visible };
}
