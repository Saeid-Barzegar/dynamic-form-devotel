"use client";
// libraries
import { useEffect, useState, useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  Column,
} from "@tanstack/react-table";
// constants
import { ENDPOINTS } from "@/constants/endpoints";
// elements
import { PageContainer } from "@/elements/common.element";
import { PageTitle } from "@/elements/submissions.element";
// hooks
import useFetch from "@/hooks/useFetch";
// types
import { TableDataType } from "@/types/submissions.types";
// helper functions
import { mapColumnsToShowInTable } from "@/utils/helpers";
// components
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import Table from "@/components/Table/Table";
import Loading from "@/components/Loading/Loading";
import ErrorComponent from "@/components/ErrorComponent/ErrorComponent";
import { get } from "lodash";



const Submissions = () => {
  /**
   * all pagination data should come from API
   * but here because API only returns pure data
   * TABLE_PAGE_SIZE hardcoded here
   */
  const TABLE_PAGE_SIZE = 10;

  const { error, isPending, data } = useFetch<TableDataType>(ENDPOINTS.FORM_SUBMISSIONS);
  // Add default value to table data once api being called
  const tableData = useMemo<TableDataType>(
    () => data ?? { columns: [], data: [] },
    [data]
  );

  // State management
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const tableColumns = useMemo(() => get(tableData, "columns", []), [tableData]);


  // Initialize column visibility only when tableData.columns changes
  useEffect(() => {
    if (tableColumns.length > 0) {
      setColumnVisibility((prev) => {
        const newVisibility = Object.fromEntries(tableColumns.map((col) => [col, true]));
        return prev && Object.keys(prev).length === tableColumns.length ? prev : newVisibility;
      });
    }
  }, [tableColumns]);

  /** 
   * Sorting toggle handler (useCallback to prevent unnecessary re-renders)
   *  Although in React 19 React compiler resolved this issue and no need 
   * any useCallback and useMemo in these cases
   * */
  const handleSort = useCallback(
    (column: Column<TableDataType, unknown>) => {
      column.toggleSorting(column.getIsSorted() === "asc");
    },
    []
  );

  // Column definitions with sorting
  const columns = useMemo<ColumnDef<any>[]>(
    () =>
      tableColumns.map((col) => ({
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
    [tableColumns, handleSort]
  );

  // Table instance
  const tableDataSet = useMemo(() => get(tableData, "data", []), [tableData]);
  const table = useReactTable({
    data: tableDataSet,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { columnVisibility, sorting },
    onSortingChange: setSorting,
    pageCount: Math.ceil(tableDataSet.length / TABLE_PAGE_SIZE),
    initialState: { pagination: { pageSize: TABLE_PAGE_SIZE } },
  });

  if (isPending) return <Loading isLoading={isPending} />;
  if (error) return <ErrorComponent />;

  return (
    <PageContainer>
      <PageTitle>Submitted Applications</PageTitle>
      {/* Column Filtering to control columns in table */}
      <div className="w-full mt-4 flex justify-end">
        <MultiSelect
          className="w-64"
          label="Columns to show"
          options={tableColumns}
          selectedItems={mapColumnsToShowInTable(columnVisibility)}
          setSelectedItems={(options: string[]) => {
            const newList = { ...columnVisibility };
            Object.keys(newList).forEach((key) => {
              newList[key] = options.includes(key);
            });
            setColumnVisibility(newList);
          }}
        />
      </div>

      {/* Data Table */}
      <Table table={table} />

    </PageContainer>
  );
};

export default Submissions;
