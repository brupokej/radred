import Card from "@site/src/components/Card";
import { ScrollArrows } from "@site/src/components/ScrollArrows";
import { ScrollFade } from "@site/src/components/ScrollFade";
import { Moment } from "@site/src/utils/moments";
import { getColouredSpriteUrl } from "@site/src/utils/sprites";
import {
  computePageFragStats,
  computePageStats,
  computeStats,
  PageStats,
  PokemonStats,
} from "@site/src/utils/stats";
import { getState, STORAGE_EVENT } from "@site/src/utils/storage";
import { LIVE_MOMENT_DEFAULT } from "@site/src/utils/storageDefaults";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  RowData,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.css";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    tooltip?: string;
  }
}

export function shadeCell(
  value: number,
  max: number,
  bgVar: string,
  outlineVar: string
): React.CSSProperties {
  if (max === 0 || value === 0) return {};
  const pct = Math.round((value / max) * 100);
  return {
    backgroundColor: `color-mix(in srgb, var(${bgVar}) ${pct}%, transparent)`,
    boxShadow: `inset 0 0 0 1px color-mix(in srgb, var(${outlineVar}) ${pct}%, transparent)`,
  };
}

const TABLE_ROWS = 6;
const SPRITE_COL_OFFSET = 52;

// Generic rendering base — shared by all three stats table variants.
export function StatsTable<TRow extends object>({
  columns,
  data,
  initialSort,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TRow, any>[];
  data: TRow[];
  initialSort: SortingState;
}) {
  const [sorting, setSorting] = useState<SortingState>(initialSort);
  const scrollRef = useRef<HTMLDivElement>(null);
  const theadRef = useRef<HTMLTableSectionElement>(null);

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
  const emptyCount = Math.max(0, TABLE_ROWS - allRows.length);
  const colCount = table.getAllColumns().length;

  return (
    <Card title="Pokémon Data">
      <div className={styles.tableContainer}>
        <ScrollArrows
          scrollRef={scrollRef}
          onLeft={(el) => scrollSnap(el, "left")}
          onRight={(el) => scrollSnap(el, "right")}
          leftOffset={SPRITE_COL_OFFSET}
        />
        <ScrollFade
          ref={scrollRef}
          axis="both"
          className={styles.scrollInner}
          topOffset="52px"
          leftOffset="52px"
        >
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
                      title={header.column.columnDef.meta?.tooltip}
                    >
                      <span className={styles.headerContent}>
                        {header.column.getCanSort() && header.column.id !== "pokemon" && (
                          <span className={styles.sortArrow} />
                        )}
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className={styles.sortArrow}>
                            {header.column.getIsSorted() === "asc"
                              ? "↑"
                              : header.column.getIsSorted() === "desc"
                                ? "↓"
                                : null}
                          </span>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {allRows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
              {Array.from({ length: emptyCount }, (_, i) => (
                <tr key={`empty-${i}`} className={styles.emptyRow}>
                  {Array.from({ length: colCount }, (__, j) => (
                    <td key={j}>{i < emptyCount - 1 ? (j === 0 ? "✕" : "-") : null}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollFade>
      </div>
    </Card>
  );
}

// ---- PageStatsTable --------------------------------------------------------

export type PageDef = { label: string; moments: Moment[]; tooltip?: string };

type PageRow = { pokemon: string } & PageStats;

const SPRITE_COL_SIZE = 52;
const POKEMON_COL_SIZE = 144;
const DATA_COL_SIZE = 67;

const pageColumnHelper = createColumnHelper<PageRow>();

const PAGE_METRIC_CONFIG = {
  battles: {
    computeFn: computePageStats,
    bgVar: "--hl-info-bg",
    outlineVar: "--ifm-color-info",
  },
  frags: {
    computeFn: computePageFragStats,
    bgVar: "--hl-danger-bg",
    outlineVar: "--ifm-color-danger",
  },
} as const;

export function PageStatsTable({
  pages,
  metric,
}: {
  pages: PageDef[];
  metric: "battles" | "frags";
}) {
  const { computeFn, bgVar, outlineVar } = PAGE_METRIC_CONFIG[metric];

  const allBattleMoments = useMemo(
    () =>
      pages.flatMap((p) =>
        p.moments
          .filter((m): m is Extract<Moment, { kind: "battle" }> => m.kind === "battle")
          .map((m) => ({ ...m, pageLabel: p.label }))
      ),
    [pages]
  );

  const [stats, setStats] = useState<Record<string, PageStats>>({});

  useEffect(() => {
    const update = () => {
      const endLabel = getState("live-moment") ?? LIVE_MOMENT_DEFAULT;
      const rawEnd = allBattleMoments.findIndex((m) => m.label === endLabel);
      const endIdx = rawEnd >= 0 ? rawEnd : allBattleMoments.length - 1;
      const filtered = allBattleMoments.slice(0, endIdx + 1);

      const pageGroups = pages.map((p) => ({
        label: p.label,
        battles: filtered.filter((m) => m.pageLabel === p.label).map((m) => m.data),
      }));

      setStats(computeFn(pageGroups));
    };
    update();
    window.addEventListener(STORAGE_EVENT, update);
    return () => window.removeEventListener(STORAGE_EVENT, update);
  }, [allBattleMoments, computeFn, pages]);

  const data = useMemo<PageRow[]>(
    () =>
      Object.entries(stats)
        .map(([pokemon, s]) => ({ pokemon, ...s }))
        .sort((a, b) => a.boxOrder - b.boxOrder),
    [stats]
  );

  const columns = useMemo(
    () => [
      pageColumnHelper.display({
        id: "sprite",
        header: "",
        size: SPRITE_COL_SIZE,
        enableSorting: false,
        cell: ({ row }) => (
          <img
            src={getColouredSpriteUrl({
              name: row.original.pokemon,
              spriteKey: row.original.spriteKey,
            })}
            alt={row.original.pokemon}
            className={styles.sprite}
          />
        ),
      }),
      pageColumnHelper.accessor("pokemon", { header: "Pokémon", size: POKEMON_COL_SIZE }),
      pageColumnHelper.accessor("total", {
        header: "Total",
        size: DATA_COL_SIZE,
        cell: ({ getValue, table }) => {
          const value = getValue<number>();
          const max = Math.max(0, ...table.getCoreRowModel().rows.map((r) => r.original.total));
          return (
            <span className={styles.chip} style={shadeCell(value, max, bgVar, outlineVar)}>
              {value}
            </span>
          );
        },
      }),
      ...pages.map((p) =>
        pageColumnHelper.accessor((row) => row.byPage[p.label] ?? 0, {
          id: `page-${p.label}`,
          header: p.label,
          size: ["Brock", "Erika", "Koga", "VR", "E4"].includes(p.label)
            ? DATA_COL_SIZE - 1
            : DATA_COL_SIZE,
          ...(p.tooltip ? { meta: { tooltip: p.tooltip } } : {}),
          cell: ({ getValue, table }) => {
            const value = getValue<number>();
            const max = Math.max(
              0,
              ...table.getCoreRowModel().rows.map((r) => r.original.byPage[p.label] ?? 0)
            );
            return (
              <span className={styles.chip} style={shadeCell(value, max, bgVar, outlineVar)}>
                {value}
              </span>
            );
          },
        })
      ),
    ],
    [pages, bgVar, outlineVar]
  );

  return <StatsTable columns={columns} data={data} initialSort={[{ id: "total", desc: true }]} />;
}

// ---- PercentsTable ---------------------------------------------------------

type PercentsRow = { pokemon: string } & PokemonStats;

const pctColumnHelper = createColumnHelper<PercentsRow>();

const percentsColumns = [
  pctColumnHelper.display({
    id: "sprite",
    header: "",
    size: 52,
    enableSorting: false,
    cell: ({ row }) => (
      <img
        src={getColouredSpriteUrl({
          name: row.original.pokemon,
          spriteKey: row.original.spriteKey,
        })}
        alt={row.original.pokemon}
        className={styles.sprite}
      />
    ),
  }),
  pctColumnHelper.accessor("pokemon", { header: "Pokémon", size: 144 }),
  pctColumnHelper.accessor("battles", {
    header: "Battles",
    size: 92,
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
  pctColumnHelper.accessor("frags", {
    header: "Frags",
    size: 92,
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
  pctColumnHelper.accessor((row) => row.battles - row.frags, {
    id: "batt-minus-frags",
    header: "B − F",
    meta: { tooltip: "Battles − Frags" },
    size: 92,
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
  pctColumnHelper.accessor("possibleBattles", {
    header: "P. Batt.",
    meta: { tooltip: "Possible Battles" },
    size: 92,
  }),
  pctColumnHelper.accessor(
    (row) => (row.possibleBattles > 0 ? row.battles / row.possibleBattles : 0),
    {
      id: "battles-pct",
      header: "Batt. %",
      meta: { tooltip: "Battles %" },
      size: 92,
      cell: ({ getValue, table }) => {
        const value = getValue<number>();
        const max = Math.max(
          0,
          ...table
            .getCoreRowModel()
            .rows.map((r) =>
              r.original.possibleBattles > 0 ? r.original.battles / r.original.possibleBattles : 0
            )
        );
        return (
          <span
            className={styles.chip}
            style={shadeCell(
              value,
              max,
              "--ifm-color-success-contrast-background",
              "--ifm-color-success"
            )}
          >
            {Math.round(value * 100)}%
          </span>
        );
      },
    }
  ),
  pctColumnHelper.accessor("possibleFrags", {
    header: "P. Frags",
    meta: { tooltip: "Possible Frags" },
    size: 92,
  }),
  pctColumnHelper.accessor((row) => (row.possibleFrags > 0 ? row.frags / row.possibleFrags : 0), {
    id: "frags-pct",
    header: "Frags %",
    size: 92,
    cell: ({ getValue, table }) => {
      const value = getValue<number>();
      const max = Math.max(
        0,
        ...table
          .getCoreRowModel()
          .rows.map((r) =>
            r.original.possibleFrags > 0 ? r.original.frags / r.original.possibleFrags : 0
          )
      );
      return (
        <span
          className={styles.chip}
          style={shadeCell(
            value,
            max,
            "--ifm-color-success-contrast-background",
            "--ifm-color-success"
          )}
        >
          {Math.round(value * 100)}%
        </span>
      );
    },
  }),
  pctColumnHelper.accessor(
    (row) => {
      const battlesPct = row.possibleBattles > 0 ? row.battles / row.possibleBattles : 0;
      const fragsPct = row.possibleFrags > 0 ? row.frags / row.possibleFrags : 0;
      return battlesPct + fragsPct;
    },
    {
      id: "added-pct",
      header: "Added %",
      size: 92,
      cell: ({ getValue, table }) => {
        const value = getValue<number>();
        const max = Math.max(
          0,
          ...table.getCoreRowModel().rows.map((r) => {
            const bp =
              r.original.possibleBattles > 0 ? r.original.battles / r.original.possibleBattles : 0;
            const fp =
              r.original.possibleFrags > 0 ? r.original.frags / r.original.possibleFrags : 0;
            return bp + fp;
          })
        );
        return (
          <span
            className={styles.chip}
            style={shadeCell(
              value,
              max,
              "--ifm-color-success-contrast-background",
              "--ifm-color-success"
            )}
          >
            {Math.round(value * 100)}%
          </span>
        );
      },
    }
  ),
];

export function PercentsTable({ moments }: { moments: Moment[] }) {
  const battleMoments = useMemo(
    () => moments.filter((m): m is Extract<Moment, { kind: "battle" }> => m.kind === "battle"),
    [moments]
  );

  const [stats, setStats] = useState<Record<string, PokemonStats>>({});

  useEffect(() => {
    const update = () => {
      const endLabel = getState("live-moment") ?? LIVE_MOMENT_DEFAULT;
      const rawEnd = battleMoments.findIndex((m) => m.label === endLabel);
      const endIdx = rawEnd >= 0 ? rawEnd : battleMoments.length - 1;
      const filtered = battleMoments.slice(0, endIdx + 1).map((m) => m.data);
      setStats(computeStats(filtered));
    };
    update();
    window.addEventListener(STORAGE_EVENT, update);
    return () => window.removeEventListener(STORAGE_EVENT, update);
  }, [battleMoments]);

  const data = useMemo<PercentsRow[]>(
    () =>
      Object.entries(stats)
        .map(([pokemon, s]) => ({ pokemon, ...s }))
        .sort((a, b) => a.boxOrder - b.boxOrder),
    [stats]
  );

  return (
    <StatsTable
      columns={percentsColumns}
      data={data}
      initialSort={[{ id: "added-pct", desc: true }]}
    />
  );
}
