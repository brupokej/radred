import { useEffect, useState } from "react";

export const STORAGE_EVENT = "storage-change";

export function getState(key: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
}

export function setState(key: string, value: string): void {
  localStorage.setItem(key, value);
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
}

export function useStorageState(key: string): { value: string | null; set: (v: string) => void } {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(getState(key));
    const handler = () => setValue(getState(key));
    window.addEventListener(STORAGE_EVENT, handler);
    return () => window.removeEventListener(STORAGE_EVENT, handler);
  }, [key]);

  return { value, set: (v: string) => setState(key, v) };
}
