import { ScrollFade } from "@site/src/components/ScrollFade";
import { parseTokens } from "@site/src/utils/tokens";
import styles from "./styles.module.css";

export type RowCell = string | { value: string; variant?: "info" | "warning" | "danger" };

const VARIANT_CLASS: Record<string, string> = {
  info: styles.contentInfo,
  warning: styles.contentWarning,
  danger: styles.contentDanger,
};

const ROW_HIGHLIGHT_CLASS: Record<string, string> = {
  info: styles.rowHighlightedInfo,
  warning: styles.rowHighlightedWarning,
  danger: styles.rowHighlightedDanger,
};

export function Row({ row }: { row: RowCell[] }) {
  const variants = new Set(
    row.flatMap((c) => (typeof c !== "string" && c.variant ? [c.variant] : []))
  );
  const rowHighlightClasses = [...variants].map((v) => ROW_HIGHLIGHT_CLASS[v]).join(" ");
  return (
    <ScrollFade
      innerClassName={`${styles.row} ${rowHighlightClasses}`}
      insetBlock="var(--ifm-spacing-vertical)"
    >
      {row.map((cell, i) => {
        const variant = typeof cell === "string" ? undefined : cell.variant;
        const value = typeof cell === "string" ? cell : cell.value;
        return variant ? (
          <span key={i} className={`${styles.content} ${VARIANT_CLASS[variant]}`}>
            {parseTokens(value)}
          </span>
        ) : (
          <span key={i} className={styles.plainCell}>
            {parseTokens(value)}
          </span>
        );
      })}
    </ScrollFade>
  );
}
