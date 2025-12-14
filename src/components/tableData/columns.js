
export const COL_WIDTH = 160;
export const TOTAL_COLUMNS = 11;
export const TABLE_WIDTH = COL_WIDTH * TOTAL_COLUMNS;


export const columns = [
  {
    accessorKey: "track_name",
    header: "Track",
    filterFn: "includesString",
  },
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
    filterFn: "betweenNumber",
  },
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
      const sec = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
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
