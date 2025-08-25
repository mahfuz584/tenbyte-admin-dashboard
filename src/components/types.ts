import { ColumnDef } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

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

export type FilterProps = {
  search: string;
  status: string[];
  dateRange: string;
  priority: string[];
  setSearch: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<string[]>>;
  setPriority: Dispatch<SetStateAction<string[]>>;
  setDateRange: Dispatch<SetStateAction<string>>;
};

export type StatusDropDownProps = Pick<FilterProps, "status" | "setStatus">;

export type PriorityDropdownProps = Pick<
  FilterProps,
  "priority" | "setPriority"
>;
