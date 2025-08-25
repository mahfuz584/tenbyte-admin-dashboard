"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DataTableProps } from "../types";
import TableSkeleton from "./TableSkeleton";

const DataTable = <TData, TValue>({
  data,
  error,
  classes,
  columns,
  pageSize,
  pageIndex,
  isLoading,
  onPageChange,
  onPageSizeChange,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    manualPagination: true,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      onPageChange(next.pageIndex);
      onPageSizeChange(next.pageSize);
    },
  });

  if (isLoading) {
    return <TableSkeleton columns={columns.length} />;
  }

  return (
    <div
      className={cn(
        "overflow-x-auto w-full rounded-md border",
        classes?.wrapper
      )}
    >
      <Table className="min-w-full table-auto">
        <TableHeader className="sticky top-0 bg-white z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="truncate max-w-[150px]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {error
                  ? `Error: ${error.message}` || "Something went wrong"
                  : "No results found."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
