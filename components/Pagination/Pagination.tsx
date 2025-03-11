"use client";

import { FC } from "react";
import get from "lodash/get";
import { Button, PaginationContainer } from "./pagination.elements";
import { Table } from "@tanstack/react-table";
import { TableDataType } from "@/types/submissions.types";

export interface PaginationPropTypes {
  table: Table<TableDataType>;
}

const Pagination: FC<PaginationPropTypes> = ({ table }) => {

  const pageIndex = get(table.getState(), 'pagination.pageIndex', 0);
  const pageCount = table.getPageCount()

  return (
    <PaginationContainer>
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        &laquo;
      </Button>
      {[...Array(pageCount)].map((_, index) => (
        <Button
          isactive={index === pageIndex}
          key={index}
          onClick={() => table.setPageIndex(index)}
        >{index + 1}</Button>
      ))}
      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        &raquo;
      </Button>
    </PaginationContainer>
  );
};

export default Pagination;
