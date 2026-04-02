import { ScrollFade } from "@site/src/components/ScrollFade";
import { parseTokens } from "@site/src/utils/tokens";
import styles from "./styles.module.css";

export type RowCell =
  | string
  | { sep: string }
  | { value: string; variant?: "info" | "warning" | "danger" };

type NormalizedCell = { sep: string } | { value: string; variant?: "info" | "warning" | "danger" };

const SEPARATORS = ["·", "→"] as const;

const SEP_SPLIT = new RegExp(`(\\s*[${SEPARATORS.join("")}]\\s*)`);
const SEP_ONLY = new RegExp(`^[${SEPARATORS.join("")}]$`);

function expandString(text: string): NormalizedCell[] {
  return text
    .split(SEP_SPLIT)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (SEP_ONLY.test(s) ? { sep: s } : { value: s }));
}

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
  const cells: NormalizedCell[] = row.flatMap((c) =>
    typeof c === "string" ? expandString(c) : [c]
  );

  const variants = new Set(cells.flatMap((c) => ("variant" in c && c.variant ? [c.variant] : [])));
  const rowHighlightClasses = [...variants].map((v) => ROW_HIGHLIGHT_CLASS[v]).join(" ");

  return (
    <ScrollFade
      innerClassName={`${styles.row} ${rowHighlightClasses}`}
      insetBlock="var(--ifm-spacing-vertical)"
    >
      {cells.map((cell, i) => {
        if ("sep" in cell) {
          return (
            <span key={i} className={styles.sepCell}>
              {cell.sep}
            </span>
          );
        }
        return cell.variant ? (
          <span key={i} className={`${styles.content} ${VARIANT_CLASS[cell.variant]}`}>
            {parseTokens(cell.value)}
          </span>
        ) : (
          <span key={i} className={styles.plainCell}>
            {parseTokens(cell.value)}
          </span>
        );
      })}
    </ScrollFade>
  );
}
