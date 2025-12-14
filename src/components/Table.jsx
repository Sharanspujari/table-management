import React, { useRef, useMemo } from "react";
import { flexRender } from "@tanstack/react-table";
import { useDebounce } from "../hooks/useDebounce";
import { useVirtualizer } from "@tanstack/react-virtual";
import Pagination from "./Pagination";
import ExportCSV from "./ExportCSV";
import TableFilters from "./TableFilters";
import { EmptyState } from "./EmptyState";
import { useDataTable } from "../hooks/useDataTable";
import VirtualizedBody from "./tableData/VirtualizedBody";
import { TABLE_WIDTH ,COL_WIDTH} from "./tableData/columns";

const DataTable = ({ data, globalFilter }) => {
  const parentRef = useRef(null);
  const debouncedGlobalFilter = useDebounce(globalFilter);

  const { table, rows, pagination, setPagination, isEmpty, isFiltered } =
    useDataTable({
      data,
      globalFilter: debouncedGlobalFilter,
    });

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,
  });

  const genres = useMemo(
    () => [...new Set(data.map((d) => d.playlist_genre))],
    [data]
  );
  return (
    <>
      <div className="flex items-center justify-between">
        <TableFilters table={table} genres={genres} />
        <ExportCSV rows={rows} />
      </div>
      <div
        ref={parentRef}
        className="h-[500px] overflow-auto border rounded relative"
      >
          <div style={{ minWidth: TABLE_WIDTH }}>
        <div className="sticky top-0 z-20 bg-gray-200 border-b">
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
        </div>
        {isEmpty ? (
          <EmptyState isFiltered={isFiltered} />
        ) : (
          <VirtualizedBody rows={rows} virtualizer={virtualizer} />
        )}
      </div>
      <Pagination
        table={table}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
};

export default React.memo(DataTable);
