import React from "react";

const TableFilters = ({ table, genres }) => {
  return (
    <div className="flex gap-4 mb-4 flex-wrap">
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
  );
};

export default TableFilters;
