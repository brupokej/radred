import { STORAGE_EVENT } from "@site/src/utils/storage";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

const SwitchContext = createContext<string | undefined>(undefined);

export default function Switch({
  switch: fn,
  children,
}: {
  switch: () => string | undefined;
  children: ReactNode;
}) {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const [value, setValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    const sync = () => setValue(fnRef.current());
    window.addEventListener(STORAGE_EVENT, sync);
    sync();
    return () => window.removeEventListener(STORAGE_EVENT, sync);
  }, []);

  return <SwitchContext.Provider value={value}>{children}</SwitchContext.Provider>;
}

export function Case({ case: matchValue, children }: { case: string; children: ReactNode }) {
  const value = useContext(SwitchContext);
  return value === matchValue ? <>{children}</> : null;
}
