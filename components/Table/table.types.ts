import { TableDataType } from "@/types/submissions.types";
import { Table } from "@tanstack/react-table";

export interface TablePropTypes {
  table: Table<TableDataType>;
};