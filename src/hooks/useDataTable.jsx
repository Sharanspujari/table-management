import { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { columns } from "../components/tableData/columns";
import {
  globalFilterFn,
  betweenNumberFilter,
} from "../components/tableData/filters";
export const useDataTable = ({ data, globalFilter }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const table = useReactTable({
    data,
    columns,
    filterFns: { betweenNumber: betweenNumberFilter },
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
    globalFilterFn,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }, [globalFilter, columnFilters]);

const rows = table.getRowModel().rows; 
  const filteredRowCount = table.getFilteredRowModel().rows.length;

  const isFiltered =
    columnFilters.length > 0 ||
    (typeof globalFilter === "string" && globalFilter.trim().length > 0);

  const isEmpty = filteredRowCount === 0;
  return { table, rows, pagination, setPagination, isEmpty, isFiltered };
};
