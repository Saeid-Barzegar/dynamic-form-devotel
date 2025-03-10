export type TableDataInfoType = {
  id: number;
} & Record<string, string | number>;

export interface TableDataType {
  columns: string[];
  data: TableDataInfoType[];
};
