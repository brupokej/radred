import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from "./styles.module.css";

export const ScrollFade = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    axis?: "x" | "y" | "both";
    topOffset?: string;
    leftOffset?: string;
  }
>(function ScrollFade({ children, className, style, axis = "x", topOffset, leftOffset }, ref) {
  const innerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => innerRef.current!);

  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const update = () => {
      if (axis === "y" || axis === "both") {
        setShowTop(el.scrollTop > 0);
        setShowBottom(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
      }
      if (axis === "x" || axis === "both") {
        setShowLeft(el.scrollLeft > 0);
        setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
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
  }, [axis]);

  const axisClass = axis === "x" ? styles.axisX : axis === "y" ? styles.axisY : styles.axisBoth;
  const yFades = axis === "y" || axis === "both";
  const xFades = axis === "x" || axis === "both";

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
      <div ref={innerRef} className={axisClass} style={style}>
        {children}
      </div>
      {yFades && (
        <div
          className={`${styles.fadeTop}${showTop ? ` ${styles.fadeVisible}` : ""}`}
          style={topOffset ? { top: topOffset } : undefined}
          aria-hidden
        />
      )}
      {yFades && (
        <div
          className={`${styles.fadeBottom}${showBottom ? ` ${styles.fadeVisible}` : ""}`}
          aria-hidden
        />
      )}
      {xFades && (
        <div
          className={`${styles.fadeLeft}${showLeft ? ` ${styles.fadeVisible}` : ""}`}
          style={leftOffset ? { left: leftOffset } : undefined}
          aria-hidden
        />
      )}
      {xFades && (
        <div
          className={`${styles.fadeRight}${showRight ? ` ${styles.fadeVisible}` : ""}`}
          aria-hidden
        />
      )}
    </div>
  );
});
