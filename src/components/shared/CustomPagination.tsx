import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { PaginationProps } from "../types";
import { Button } from "../ui/button";

const pageSizes = [10, 20, 30, 40, 50, 60];

const CustomPagination = ({
  pageSize,
  pageCount,
  pageIndex,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  return (
    <div className="mt-4 flex items-center justify-end gap-10">
      <Select onValueChange={(value) => onPageSizeChange(Number(value))}>
        <SelectTrigger className="w-fit">
          <SelectValue placeholder={pageSize} />
        </SelectTrigger>
        <SelectContent position="popper">
          {pageSizes.map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          Page {pageIndex} of {pageCount - 1}
        </span>
        <Button
          size="sm"
          variant="outline"
          disabled={pageIndex === 1}
          onClick={() => onPageChange(1)}
        >
          <ChevronDoubleLeftIcon />
        </Button>
        <Button
          size="icon"
          variant="outline"
          disabled={pageIndex === 1}
          onClick={() => onPageChange(pageIndex - 1)}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          size="icon"
          variant="outline"
          disabled={pageIndex + 1 >= pageCount}
          onClick={() => onPageChange(pageIndex + 1)}
        >
          <ChevronRightIcon />
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={pageIndex + 1 >= pageCount}
          onClick={() => onPageChange(pageCount - 1)}
        >
          <ChevronDoubleRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default CustomPagination;
