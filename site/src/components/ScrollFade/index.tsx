import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

export function ScrollFade({
  children,
  className,
  innerClassName,
  insetBlock,
  restOpacity,
  fadeColor,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  insetBlock?: string;
  restOpacity?: number;
  fadeColor?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeRight, setFadeRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setFadeLeft(el.scrollLeft > 0);
      setFadeRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      obs.disconnect();
    };
  }, []);

  return (
    <div
      className={`${styles.wrapper} ${fadeLeft ? styles.fadeLeft : ""} ${fadeRight ? styles.fadeRight : ""} ${className ?? ""}`}
      style={
        insetBlock != null || restOpacity != null || fadeColor != null
          ? ({
              "--scroll-fade-inset": insetBlock,
              "--scroll-fade-rest-opacity": restOpacity,
              "--scroll-fade-color": fadeColor,
            } as React.CSSProperties)
          : undefined
      }
    >
      <div ref={scrollRef} className={innerClassName} data-scroll>
        {children}
      </div>
    </div>
  );
}
