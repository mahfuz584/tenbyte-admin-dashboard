import { ColumnDef } from "@tanstack/react-table";

export type DataTableProps<TData, TValue> = {
  data: TData[];
  pageSize: number;
  pageCount: number;
  pageIndex: number;
  isLoading: boolean;
  columns: ColumnDef<TData, TValue>[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  classes?: {
    wrapper?: string;
  };
};

export type PaginationProps<TData = unknown, TValue = unknown> = Omit<
  DataTableProps<TData, TValue>,
  "columns" | "data" | "classes" | "isLoading"
>;
