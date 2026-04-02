import { ScrollFade } from "@site/src/components/ScrollFade";
import { parseTokens } from "@site/src/utils/tokens";
import styles from "./styles.module.css";

export type RowCell = string | { value: string; variant?: "info" | "warning" | "danger" };

const VARIANT_CLASS: Record<string, string> = {
  info: styles.contentInfo,
  warning: styles.contentWarning,
  danger: styles.contentDanger,
};

export function Row({ row }: { row: RowCell[] }) {
  const highlighted = row.some((c) => typeof c !== "string" && !!c.variant);
  return (
    <ScrollFade
      innerClassName={`${styles.row} ${highlighted ? styles.rowHighlighted : ""}`}
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
