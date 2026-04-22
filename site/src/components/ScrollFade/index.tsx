import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

export function ScrollFade({
  children,
  className,
  innerClassName,
  insetBlock,
  restOpacity,
  fadeColor,
  axis = "x",
  arrows = false,
  scrollRef: externalRef,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  insetBlock?: string;
  restOpacity?: number;
  fadeColor?: string;
  axis?: "x" | "y";
  arrows?: boolean;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  style?: React.CSSProperties;
}) {
  const internalRef = useRef<HTMLDivElement>(null);
  const scrollRef = externalRef ?? internalRef;

  const [fadeStart, setFadeStart] = useState(false);
  const [fadeEnd, setFadeEnd] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      if (axis === "y") {
        setFadeStart(el.scrollTop > 0);
        setFadeEnd(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
      } else {
        setFadeStart(el.scrollLeft > 0);
        setFadeEnd(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
      }
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      obs.disconnect();
    };
  }, [axis, scrollRef]);

  const scroll = useCallback(
    (dir: "start" | "end") => {
      const el = scrollRef.current;
      if (!el) return;
      if (axis === "y") {
        const step = (el.firstElementChild as HTMLElement)?.offsetHeight ?? el.clientHeight;
        const current = el.scrollTop;
        const target =
          dir === "end"
            ? Math.ceil((current + 1) / step) * step
            : Math.floor((current - 1) / step) * step;
        el.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
      } else {
        const step = (el.firstElementChild as HTMLElement)?.offsetWidth ?? el.clientWidth;
        const current = el.scrollLeft;
        const target =
          dir === "end"
            ? Math.ceil((current + 1) / step) * step
            : Math.floor((current - 1) / step) * step;
        el.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
      }
    },
    [axis, scrollRef]
  );

  const startClass = axis === "y" ? styles.fadeTop : styles.fadeLeft;
  const endClass = axis === "y" ? styles.fadeBottom : styles.fadeRight;

  const cssVars =
    insetBlock != null || restOpacity != null || fadeColor != null
      ? ({
          "--scroll-fade-inset": insetBlock,
          "--scroll-fade-rest-opacity": restOpacity,
          "--scroll-fade-color": fadeColor,
        } as React.CSSProperties)
      : undefined;

  return (
    <div
      className={`${styles.wrapper} ${axis === "y" ? styles.vertical : ""} ${fadeStart ? startClass : ""} ${fadeEnd ? endClass : ""} ${className ?? ""}`}
      style={style || cssVars ? { ...cssVars, ...style } : undefined}
    >
      {arrows && (
        <>
          <button
            className={`${styles.arrow} ${axis === "y" ? styles.arrowY : styles.arrowX} ${styles.arrowStart} ${fadeStart ? styles.arrowVisible : ""}`}
            onClick={() => scroll("start")}
            aria-label={axis === "y" ? "Scroll up" : "Scroll left"}
          />
          <button
            className={`${styles.arrow} ${axis === "y" ? styles.arrowY : styles.arrowX} ${styles.arrowEnd} ${fadeEnd ? styles.arrowVisible : ""}`}
            onClick={() => scroll("end")}
            aria-label={axis === "y" ? "Scroll down" : "Scroll right"}
          />
        </>
      )}
      {externalRef ? (
        children
      ) : (
        <div ref={internalRef} className={innerClassName} data-scroll>
          {children}
        </div>
      )}
    </div>
  );
}
