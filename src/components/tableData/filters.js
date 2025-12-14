
export const globalFilterFn = (row, _columnId, filterValue) => {
  if (!filterValue) return true;

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

export const betweenNumberFilter = (row, columnId, value) => {
  const [min, max] = value ?? [];
  const rowValue = row.getValue(columnId);

  if (rowValue == null) return false;
  if (min !== "" && min !== undefined && rowValue < Number(min)) return false;
  if (max !== "" && max !== undefined && rowValue > Number(max)) return false;

  return true;
};
