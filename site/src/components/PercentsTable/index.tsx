import Card from "@site/src/components/Card";
import { ScrollArrows } from "@site/src/components/ScrollArrows";
import { computeStats, PokemonStats } from "@site/src/utils/frags";
import { Moment } from "@site/src/utils/moments";
import { getColouredSpriteUrl } from "@site/src/utils/sprites";
import { getState, STORAGE_EVENT } from "@site/src/utils/storage";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.css";

type TableRow = { pokemon: string } & PokemonStats;

const columnHelper = createColumnHelper<TableRow>();

function shadeCell(
  value: number,
  max: number,
  bgVar: string,
  outlineVar: string
): React.CSSProperties {
  if (max === 0 || value === 0) return {};
  const pct = Math.round((0.2 + (value / max) * 0.8) * 100);
  return {
    backgroundColor: `color-mix(in srgb, var(${bgVar}) ${pct}%, transparent)`,
    boxShadow: `inset 0 0 0 1px color-mix(in srgb, var(${outlineVar}) ${pct}%, transparent)`,
  };
}

const columns = [
  columnHelper.display({
    id: "sprite",
    header: "",
    size: 52,
    enableSorting: false,
    cell: ({ row }) => (
      <img
        src={getColouredSpriteUrl({ name: row.original.pokemon, spriteKey: row.original.spriteKey })}
        alt={row.original.pokemon}
        className={styles.sprite}
      />
    ),
  }),
  columnHelper.accessor("pokemon", { header: "Pokemon", size: 148 }),
  columnHelper.accessor("battles", {
    header: "Battles",
    size: 148,
    cell: ({ getValue, table }) => {
      const value = getValue<number>();
      const max = Math.max(0, ...table.getCoreRowModel().rows.map((r) => r.original.battles));
      return (
        <span
          className={styles.chip}
          style={shadeCell(value, max, "--hl-info-bg", "--ifm-color-info")}
        >
          {value}
        </span>
      );
    },
  }),
  columnHelper.accessor("frags", {
    header: "Frags",
    size: 148,
    cell: ({ getValue, table }) => {
      const value = getValue<number>();
      const max = Math.max(0, ...table.getCoreRowModel().rows.map((r) => r.original.frags));
      return (
        <span
          className={styles.chip}
          style={shadeCell(value, max, "--hl-danger-bg", "--ifm-color-danger")}
        >
          {value}
        </span>
      );
    },
  }),
  columnHelper.accessor((row) => row.battles - row.frags, {
    id: "batt-minus-frags",
    header: "Batt. - Frags",
    size: 148,
    cell: ({ getValue, table }) => {
      const value = getValue<number>();
      const maxAbs = Math.max(
        0,
        ...table.getCoreRowModel().rows.map((r) => Math.abs(r.original.battles - r.original.frags))
      );
      const style =
        value > 0
          ? shadeCell(value, maxAbs, "--hl-info-bg", "--ifm-color-info")
          : value < 0
            ? shadeCell(-value, maxAbs, "--hl-danger-bg", "--ifm-color-danger")
            : {};
      return (
        <span className={styles.chip} style={style}>
          {value}
        </span>
      );
    },
  }),
];

const COLLAPSED_ROWS = 3;

export default function PercentsTable({ moments }: { moments: Moment[] }) {
  const battleMoments = useMemo(
    () => moments.filter((m): m is Extract<Moment, { kind: "battle" }> => m.kind === "battle"),
    [moments]
  );

  const [stats, setStats] = useState<Record<string, PokemonStats>>({});
  const [sorting, setSorting] = useState<SortingState>([{ id: "frags", desc: true }]);
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const theadRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    const update = () => {
      const startLabel = getState("stats-filter-start");
      const endLabel = getState("stats-filter-end");
      const startIdx = startLabel
        ? Math.max(0, battleMoments.findIndex((m) => m.label === startLabel))
        : 0;
      const rawEnd = endLabel ? battleMoments.findIndex((m) => m.label === endLabel) : -1;
      const endIdx = rawEnd >= 0 ? rawEnd : battleMoments.length - 1;
      const filtered = battleMoments.slice(startIdx, endIdx + 1).map((m) => m.data);
      setStats(computeStats(filtered));
    };
    update();
    window.addEventListener(STORAGE_EVENT, update);
    return () => window.removeEventListener(STORAGE_EVENT, update);
  }, [battleMoments]);

  const data = useMemo<TableRow[]>(
    () => Object.entries(stats).map(([pokemon, s]) => ({ pokemon, ...s })),
    [stats]
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const scrollSnap = useCallback((el: HTMLDivElement, dir: "left" | "right") => {
    const thead = theadRef.current;
    if (!thead) return;
    const ths = Array.from(thead.querySelectorAll("th")) as HTMLElement[];
    const stickyWidth = ths[0]?.offsetWidth ?? 0;
    const snapPoints = ths.map((th) => th.offsetLeft - stickyWidth).filter((x) => x >= 0);
    const current = el.scrollLeft;
    if (dir === "right") {
      const next = snapPoints.find((x) => x > current + 1);
      if (next !== undefined) el.scrollTo({ left: next, behavior: "smooth" });
    } else {
      const prev = [...snapPoints].reverse().find((x) => x < current - 1);
      el.scrollTo({ left: prev ?? 0, behavior: "smooth" });
    }
  }, []);

  const allRows = table.getRowModel().rows;
  const visibleRows = isExpanded ? allRows : allRows.slice(0, COLLAPSED_ROWS);

  return (
    <Card title="Stats Table">
      <div className={styles.tableContainer}>
        <ScrollArrows
          scrollRef={scrollRef}
          onLeft={(el) => scrollSnap(el, "left")}
          onRight={(el) => scrollSnap(el, "right")}
          leftOffset={52}
        />
        <div ref={scrollRef} className={styles.scrollInner}>
          <table className={styles.table}>
            <thead ref={theadRef}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={header.column.getCanSort() ? styles.sortable : undefined}
                      style={{ minWidth: header.column.getSize() }}
                    >
                      <span className={styles.headerContent}>
                        {header.column.getCanSort() && header.column.id !== "pokemon" && (
                          <span className={styles.sortArrow} />
                        )}
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <span className={styles.sortArrow}>
                          {header.column.getIsSorted() === "asc"
                            ? "↑"
                            : header.column.getIsSorted() === "desc"
                              ? "↓"
                              : null}
                        </span>
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {visibleRows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {allRows.length > COLLAPSED_ROWS && (
        <button className={styles.detailToggle} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "−" : "+"}
        </button>
      )}
    </Card>
  );
}
