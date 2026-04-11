import { useEffect, useState } from "react";

export const STORAGE_EVENT = "storage-change";

export function getState(key: string): string | null {
  const value = localStorage.getItem(key);
  if (value === null) {
    console.warn(`Key ${value} must be set in storageDefaults.ts`);
    const unsetKeys: string[] = JSON.parse(localStorage.getItem("unset-keys") ?? []);
    localStorage.setItem("unset-keys", JSON.stringify([...unsetKeys, key]));
  }
  return value;
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
