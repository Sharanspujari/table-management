import React, { useRef } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
const DataTable = ({ data, globalFilter, setGlobalFilter }) => {
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
  
  return (
    <div>
      <div className="h-[500px] overflow-auto border">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer p-2"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      { asc: " ↑", desc: " ↓" }[
                        header.column.getIsSorted() ?? ""
                      ]
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
