
import React from 'react'
import { useReactTable } from '@tanstack/react-table'
const DataTable = () => {
const columns = [
{ accessorKey: "track_name", header: "Track" },
{ accessorKey: "artist", header: "Artist" },
{ accessorKey: "genre", header: "Genre" },
{ accessorKey: "popularity", header: "Popularity" },
{ accessorKey: "release_date", header: "Release Date" },
];

const table = useReactTable({
data,
columns,
});
  return (
    <div>
      
    </div>
  )
}

export default DataTable
