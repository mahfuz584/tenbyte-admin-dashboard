"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface TableSkeletonProps {
  columns: number;
  rows?: number;
}

const TableSkeleton = ({ columns, rows = 5 }: TableSkeletonProps) => {
  return (
    <div className={cn("overflow-hidden rounded-md border mt-10")}>
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, idx) => (
              <TableHead key={idx}>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-full" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <TableRow key={rowIdx}>
              {Array.from({ length: columns }).map((_, colIdx) => (
                <TableCell key={colIdx}>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSkeleton;
