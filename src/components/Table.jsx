import React, { useState, useRef, useMemo } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
//   getGlobalFilteredRowModel,
} from "@tanstack/react-table";
import { useDebounce } from "../hooks/useDebounce";
import { useVirtualizer } from "@tanstack/react-virtual";

const COL_WIDTH = 160;

const DataTable = ({ data, globalFilter, setGlobalFilter }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const parentRef = useRef(null);
   const debouncedGlobalFilter = useDebounce(globalFilter);
  const genres = useMemo(
    () => [...new Set(data.map((d) => d.playlist_genre))],
    [data]
  );
  const columns = [
    { accessorKey: "track_name", header: "Track", filterFn: "includesString" },
    {
      accessorKey: "track_artist",
      header: "Artist",
      filterFn: "includesString",
    },
    { accessorKey: "track_album_name", header: "Album" },
    {
      accessorKey: "playlist_genre",
      header: "Genre",
      filterFn: "equalsString",
    },
    {
      accessorKey: "track_popularity",
      header: "Popularity",
      sortingFn: "basic",
      filterFn: "between",
    },

    {
      accessorKey: "tempo",
      header: "Tempo (BPM)",
      sortingFn: "basic",
    },
    {
      accessorKey: "energy",
      header: "Energy",
      cell: ({ getValue }) => getValue()?.toFixed(2),
      sortingFn: "basic",
    },
    {
      accessorKey: "danceability",
      header: "Danceability",
      cell: ({ getValue }) => getValue()?.toFixed(2),
      sortingFn: "basic",
    },
    {
      accessorKey: "duration_ms",
      header: "Duration",
      cell: ({ getValue }) => {
        const ms = getValue();
        const min = Math.floor(ms / 60000);
        const sec = Math.floor((ms % 60000) / 1000)
          .toString()
          .padStart(2, "0");
        return `${min}:${sec}`;
      },
      sortingFn: "basic",
    },
    {
      accessorKey: "track_album_release_date",
      header: "Release Date",
      sortingFn: "basic",
    },
    {
      accessorKey: "explicit",
      header: "Explicit",
      cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
      sortingFn: "basic",
    },
  ];
const globalFilterFn = (row, columnId, filterValue) => {
    const search = filterValue.toLowerCase();

    return [
      row.original.track_name,
      row.original.track_artist,
      row.original.track_album_name,
      row.original.playlist_genre,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search);
  };

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter:debouncedGlobalFilter },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn,
    // getGlobalFilteredRowModel: getGlobalFilteredRowModel(),
  });
  const rows = table.getRowModel().rows;

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,
    overscan: 8,
  });

  return (
    <>
      <div className="flex gap-4 mb-4 flex-wrap">
        {" "}
        <input
          className="border p-2 rounded"
          placeholder="Search Track"
          value={table.getColumn("track_name")?.getFilterValue() ?? ""}
          onChange={(e) =>
            table.getColumn("track_name")?.setFilterValue(e.target.value)
          }
        />
        <input
          className="border p-2 rounded"
          placeholder="Search Artist"
          value={table.getColumn("track_artist")?.getFilterValue() ?? ""}
          onChange={(e) =>
            table.getColumn("track_artist")?.setFilterValue(e.target.value)
          }
        />
        <select
          className="border p-2 rounded"
          value={table.getColumn("playlist_genre")?.getFilterValue() ?? ""}
          onChange={(e) =>
            table
              .getColumn("playlist_genre")
              ?.setFilterValue(e.target.value || undefined)
          }
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min Pop"
            className="border p-2 w-24"
            onChange={(e) =>
              table
                .getColumn("track_popularity")
                ?.setFilterValue((old = []) => [e.target.value, old?.[1]])
            }
          />
          <input
            type="number"
            placeholder="Max Pop"
            className="border p-2 w-24"
            onChange={(e) =>
              table
                .getColumn("track_popularity")
                ?.setFilterValue((old = []) => [old?.[0], e.target.value])
            }
          />
        </div>
      </div>
      <div
        ref={parentRef}
        className="h-[500px] overflow-auto border rounded relative"
      >
        <div className="sticky top-0 z-20 bg-gray-100 border-b">
          <div className="flex">
            {table.getHeaderGroups()[0].headers.map((header) => {
              const isSorted = header.column.getIsSorted();
              return (
                <div
                  key={header.id}
                  style={{ width: COL_WIDTH }}
                  onClick={header.column.getToggleSortingHandler()}
                  className="p-2 font-semibold shrink-0 truncate"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {isSorted === "asc" && "⬆"}
                  {isSorted === "desc" && "⬇"}
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            height: virtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index];

            return (
              <div
                key={row.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: 44,
                  transform: `translate3d(0, ${virtualRow.start}px, 0)`,
                  willChange: "transform",
                }}
                className="flex border-b bg-white"
              >
                {row.getVisibleCells().map((cell) => (
                  <div
                    key={cell.id}
                    style={{ width: COL_WIDTH }}
                    className="p-2 shrink-0 truncate"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DataTable;
