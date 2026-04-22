import { useEffect, useRef, useState } from "react";

export const FADE_MS = 800;

export function useFadedValue<T>(live: T): { displayed: T; visible: boolean } {
  const [displayed, setDisplayed] = useState(live);
  const [visible, setVisible] = useState(true);
  const liveRef = useRef(live);
  const mountedRef = useRef(false);
  const pendingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  liveRef.current = live;

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
  }, [live]);

  return { displayed, visible };
}

export function useFadedKey<T>(live: T, key: string): { displayed: T; visible: boolean } {
  const [displayed, setDisplayed] = useState(live);
  const [visible, setVisible] = useState(true);
  const liveRef = useRef(live);
  const mountedRef = useRef(false);
  const pendingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  liveRef.current = live;

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
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  return { displayed, visible };
}
