import React, { useRef } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
const COL_WIDTH = 160;
const DataTable = ({ data, globalFilter, setGlobalFilter }) => {
  const parentRef = useRef(null);
  const columns = [
    { accessorKey: "track_name", header: "Track" },
    { accessorKey: "track_artist", header: "Artist" },
    { accessorKey: "track_album_name", header: "Album" },
    { accessorKey: "playlist_genre", header: "Genre" },
    { accessorKey: "track_popularity", header: "Popularity" },

    {
      accessorKey: "tempo",
      header: "Tempo (BPM)",
    },
    {
      accessorKey: "energy",
      header: "Energy",
      cell: ({ getValue }) => getValue()?.toFixed(2),
    },
    {
      accessorKey: "danceability",
      header: "Danceability",
      cell: ({ getValue }) => getValue()?.toFixed(2),
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
    },
    {
      accessorKey: "track_album_release_date",
      header: "Release Date",
    },
    {
      accessorKey: "explicit",
      header: "Explicit",
      cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
  });
  const rows = table.getRowModel().rows;

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,
    overscan: 8,
  });

  return (
   <div
      ref={parentRef}
      className="h-[500px] overflow-auto border rounded relative"
    >
      <div className="sticky top-0 z-20 bg-gray-100 border-b">
        <div className="flex">
          {table.getHeaderGroups()[0].headers.map((header) => (
            <div
              key={header.id}
              style={{ width: COL_WIDTH }}
              className="p-2 font-semibold shrink-0 truncate"
            >
              {flexRender(
                header.column.columnDef.header,
                header.getContext()
              )}
            </div>
          ))}
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
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  
  );
};

export default DataTable;
