import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";

export function ScrollArrows({
  scrollRef,
  onLeft,
  onRight,
  leftOffset,
}: {
  scrollRef: React.RefObject<HTMLDivElement>;
  onLeft: (el: HTMLDivElement) => void;
  onRight: (el: HTMLDivElement) => void;
  leftOffset?: number;
}) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, [scrollRef]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const rafId = requestAnimationFrame(updateScrollState);
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const obs = new ResizeObserver(() => requestAnimationFrame(updateScrollState));
    obs.observe(el);
    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("scroll", updateScrollState);
      obs.disconnect();
    };
  }, [updateScrollState]);

  const cssVars = leftOffset
    ? ({ "--scroll-arrows-left-offset": `${leftOffset}px` } as React.CSSProperties)
    : undefined;

  return (
    <div className={styles.overlay} style={cssVars}>
      <button
        className={`${styles.arrow} ${styles.arrowLeft} ${canScrollLeft ? styles.arrowVisible : ""}`}
        onClick={() => scrollRef.current && onLeft(scrollRef.current)}
        aria-label="Scroll left"
      />
      <button
        className={`${styles.arrow} ${styles.arrowRight} ${canScrollRight ? styles.arrowVisible : ""}`}
        onClick={() => scrollRef.current && onRight(scrollRef.current)}
        aria-label="Scroll right"
      />
    </div>
  );
}
