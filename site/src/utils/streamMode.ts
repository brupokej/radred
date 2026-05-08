import { useEffect, useState } from "react";
import { getState, removeState, setState, STORAGE_EVENT } from "./storage";

const STORAGE_KEY = "navbar-item-stream-mode";

export function getStreamMode(): boolean {
  return getState(STORAGE_KEY) === "true";
}

export function setStreamMode(active: boolean): void {
  if (active) {
    setState(STORAGE_KEY, "true");
  } else {
    removeState(STORAGE_KEY);
  }
}

export function useStreamMode(): boolean {
  const [active, setActive] = useState<boolean>(getStreamMode);
  useEffect(() => {
    const handler = () => setActive(getStreamMode());
    window.addEventListener(STORAGE_EVENT, handler);
    return () => window.removeEventListener(STORAGE_EVENT, handler);
  }, []);
  return active;
}
