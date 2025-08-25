"use client";

import DataTable from "@/components/shared/DataTable";
import { getData } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import CustomPagination from "@/components/shared/CustomPagination";
import { buildQueryParams } from "@/lib/utils";
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";
import dayjs from "dayjs";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";
import Filters from "../../components/shared/Filters";
import { Distribution, DistributionResponse, Status } from "./types";

export const columns: ColumnDef<Distribution>[] = [
  {
    accessorKey: "name",
    header: "Label",
  },
  {
    accessorKey: "cname",
    header: "Domain",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<Status>();

      const statusIcon =
        status === "active" ? (
          <CheckCircleIcon className="text-green-500" />
        ) : status === "disabled" ? (
          <XCircleIcon className="text-red-500" />
        ) : status === "provisioning" ? (
          <ClockIcon className="text-green-700" />
        ) : (
          <ExclamationCircleIcon className="text-orange-500" />
        );

      return (
        <Button variant="outline" size="sm">
          {statusIcon}
          <span className="capitalize">{status}</span>
        </Button>
      );
    },
  },
  {
    header: "Date Modified",
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return <span>{dayjs(date).format("MMM D, YYYY")}</span>;
    },
  },
  {
    header: "Time Modified",
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return <span>{dayjs(date).format("h:mm A")}</span>;
    },
  },
];

const DataTableWrapper = () => {
  const [pageIndex, setPageIndex] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  );

  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger.withDefault(10)
  );

  const [status, setStatus] = useQueryState(
    "status",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [priority, setPriority] = useQueryState(
    "priority",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  const [dateRange, setDateRange] = useQueryState(
    "dateRange",
    parseAsString.withDefault("")
  );

  const { data, error, isLoading } = useQuery({
    queryKey: [
      "distributions",
      pageIndex,
      pageSize,
      status,
      priority,
      search,
      dateRange,
    ],

    queryFn: () => {
      const params = buildQueryParams({
        page: pageIndex,
        limit: pageSize,
        search,
        status,
        priority,
        dateRange,
      });

      return getData<DistributionResponse>("/distributions", params);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.success || error) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <Filters
        search={search}
        status={status}
        priority={priority}
        setSearch={setSearch}
        setStatus={setStatus}
        dateRange={dateRange}
        setPriority={setPriority}
        setDateRange={setDateRange}
      />
      <DataTable
        data={data.data}
        columns={columns}
        pageSize={pageSize}
        pageIndex={pageIndex}
        isLoading={isLoading}
        onPageChange={setPageIndex}
        pageCount={data.meta.pagination.total_pages}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPageIndex(pageIndex);
        }}
        classes={{
          wrapper: "w-full my-10",
        }}
      />
      <CustomPagination
        pageSize={pageSize}
        pageIndex={pageIndex}
        onPageChange={setPageIndex}
        onPageSizeChange={setPageSize}
        pageCount={data.meta.pagination.total_pages}
      />
    </>
  );
};

export default DataTableWrapper;
