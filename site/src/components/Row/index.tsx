import { ScrollFade } from "@site/src/components/ScrollFade";
import { Pokemon, resolve } from "@site/src/utils/pokemon";
import { parseTokens } from "@site/src/utils/tokens";
import styles from "./styles.module.css";

export type RowCell =
  | string
  | { info: string }
  | { warning: string }
  | { danger: string }
  | Pokemon;

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

const LEVEL_CAP_LEVELS = new Set([28, 36, 44, 47, 56, 57, 59, 68, 73, 76, 79, 80, 81, 82, 85]);

export function expandPokemon(pokemon: Pokemon): Array<string | { warning: string }> {
  const { base, update } = pokemon;
  const current = resolve(pokemon);
  const nameChanged = "name" in (update ?? {});
  const levelChanged = "level" in (update ?? {});
  const from = base.name;
  const toName = nameChanged ? current.name : null;

  let header: string;
  if (levelChanged) {
    const levelPart = LEVEL_CAP_LEVELS.has(current.level)
      ? `Set to Level ${current.level} Cap`
      : `Rare Candy to Level ${current.level}`;
    header = toName ? `${levelPart} → ${toName}` : levelPart;
  } else if (nameChanged) {
    header = `Rare Candy → ${toName}`;
  } else {
    header = `Keep at Level ${current.level}`;
  }

  const cells: Array<string | { warning: string }> = [`${from} →`, { warning: header }];

  const baseMoveSet = new Set((base.moves ?? []).filter(Boolean));
  current.moves?.forEach((move) => {
    if (!move) return;
    cells.push(cells.length === 2 ? "→" : "·");
    cells.push(update && !baseMoveSet.has(move) ? { warning: move } : move);
  });

  return cells;
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

function normalizeCell(c: RowCell): NormalizedCell[] {
  if (typeof c === "string") return expandString(c);
  if ("base" in c) return expandPokemon(c as Pokemon).flatMap(normalizeCell);
  if ("info" in c) return [{ value: c.info, variant: "info" as const }];
  if ("warning" in c) return [{ value: c.warning, variant: "warning" as const }];
  return [{ value: c.danger, variant: "danger" as const }];
}

export function Row({ row }: { row: RowCell[] }) {
  const cells: NormalizedCell[] = row.flatMap(normalizeCell);

  const variants = new Set(cells.flatMap((c) => ("variant" in c && c.variant ? [c.variant] : [])));
  const rowHighlightClasses = [...variants].map((v) => ROW_HIGHLIGHT_CLASS[v]).join(" ");

  return (
    <ScrollFade
      className={styles.rowWrapper}
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
            {expandString(cell.value).map((sub, j) =>
              "sep" in sub ? (
                <span key={j} className={styles.sepCell}>
                  {sub.sep}
                </span>
              ) : (
                parseTokens(sub.value)
              )
            )}
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
