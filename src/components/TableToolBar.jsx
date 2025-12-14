import { useDebounce } from "../hooks/useDebounce";
import { useEffect, useState } from "react";

export default function TableToolbar({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter);
  const debounced = useDebounce(value);

  useEffect(() => {
    setGlobalFilter(debounced);
  }, [debounced]);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search tracks, artists, genres..."
      className="border p-2 mb-3 w-full"
    />
  );
}
