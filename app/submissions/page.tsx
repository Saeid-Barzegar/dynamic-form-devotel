"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { ENDPOINTS } from "@/constants/endpoints";
import { PageContainer } from "@/elements/comman.element";
import useFetch from "@/hooks/useFetch";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  Column,
} from "@tanstack/react-table";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import { mapCulumnsToShowInTable } from "@/utils/helpers";
import { TableDataType } from "@/types/submissions.types";
import Table from "@/components/Table/Table";

const Submissions = () => {
  /**
   * all pagination data should come from API
   * but here because API only returns pure data
   * PAGE_SIZE hardcoded here
   */
  const PAGE_SIZE = 10;

  const { error, isPending, data } = useFetch<TableDataType>(ENDPOINTS.FORM_SUBMISSIONS);
  // Add default value to table data once api being called
  const tableData = useMemo<TableDataType>(
    () => data ?? { columns: [], data: [] },
    [data]
  );

  // State management
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  // Initialize column visibility only when tableData.columns changes
  useEffect(() => {
    if (tableData.columns.length > 0) {
      setColumnVisibility((prev) => {
        const newVisibility = Object.fromEntries(tableData.columns.map((col) => [col, true]));
        return prev && Object.keys(prev).length === tableData.columns.length ? prev : newVisibility;
      });
    }
  }, [tableData.columns]);

  /** 
   * Sorting toggle handler (useCallback to prevent unnecessary re-renders)
   *  Although in React 19 React compiler resolved this issue and no need 
   * any useCallback and useMemo in these cases
   * */
  const handleSort = useCallback(
    (column: Column<any, unknown>) => {
      column.toggleSorting(column.getIsSorted() === "asc");
    },
    []
  );

  // Column definitions with sorting
  const columns = useMemo<ColumnDef<any>[]>(
    () =>
      tableData.columns.map((col) => ({
        accessorKey: col,
        header: ({ column }) => (
          <button
            onClick={() => handleSort(column)}
            aria-label={`Sort by ${col}`}
            className="font-bold focus:outline-none cursor-pointer w-full h-full text-left"
          >
            {col} {column.getIsSorted() === "asc" ? "▲" : (column.getIsSorted() === "desc" ? "▼" : "")}
          </button>
        ),
      })),
    [tableData.columns, handleSort]
  );

  // Table instance
  const table = useReactTable({
    data: tableData.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { columnVisibility, sorting },
    onSortingChange: setSorting,
    pageCount: Math.ceil(tableData.data.length / PAGE_SIZE),
    initialState: { pagination: { pageSize: PAGE_SIZE } },
  });

  if (isPending) return <h1>Loading...</h1>;
  if (error) return <h1>Oops! Something went wrong.</h1>;

  return (
    <PageContainer>
      <h2 className="text-xl font-semibold">Submitted Applications</h2>

      {/* Column Selection */}
      <div className="mt-4 flex justify-end">
        <MultiSelect
          className="w-64"
          options={tableData.columns}
          selectedItems={mapCulumnsToShowInTable(columnVisibility)}
          setSelectedItems={(options: string[]) => {
            const newList = { ...columnVisibility };
            Object.keys(newList).forEach((key) => {
              newList[key] = options.includes(key);
            });
            setColumnVisibility(newList);
          }}
        />
      </div>

      {/* Table */}
      <Table table={table} />

    </PageContainer>
  );
};

export default Submissions;
