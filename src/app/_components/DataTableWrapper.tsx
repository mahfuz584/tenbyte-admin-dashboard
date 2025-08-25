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
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("created_at")
  );

  const columns: ColumnDef<Distribution>[] = [
    {
      accessorKey: "name",
      header: () => (
        <Button
          variant="ghost"
          onClick={() =>
            setSort((prev) => (prev === "name" ? "-name" : "name"))
          }
          className="flex items-center gap-1 hover:bg-transparent px-0"
        >
          Name
          {sort === "" || sort === "name" || sort === "-name"
            ? sort.startsWith("-")
              ? " ↓"
              : " ↑"
            : null}
        </Button>
      ),
    },
    {
      accessorKey: "cname",
      header: () => (
        <Button
          variant="ghost"
          onClick={() =>
            setSort((prev) => (prev === "cname" ? "-cname" : "cname"))
          }
          className="flex items-center gap-1 px-0 hover:bg-transparent"
        >
          Domain
          {sort.replace("-", "") === "cname"
            ? sort.startsWith("-")
              ? " ↓"
              : " ↑"
            : null}
        </Button>
      ),
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
      accessorKey: "created_at",
      header: () => {
        const field = "created_at";
        const isSortedAsc = sort === field;
        const isSortedDesc = sort === "-" + field;

        return (
          <Button
            variant="ghost"
            onClick={() =>
              setSort((prev) => (prev === field ? "-" + field : field))
            }
            className="flex items-center gap-1 px-0 hover:bg-transparent"
          >
            Date Modified
            {isSortedAsc ? " ↑" : isSortedDesc ? " ↓" : " ↑"}
          </Button>
        );
      },
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

  const { data, error, isLoading } = useQuery({
    queryKey: [
      "distributions",
      pageIndex,
      pageSize,
      status,
      priority,
      search,
      dateRange,
      sort,
    ],
    queryFn: () => {
      const params = buildQueryParams({
        page: pageIndex,
        limit: pageSize,
        search,
        status,
        priority,
        dateRange,
        sort,
      });
      return getData<DistributionResponse>("/distributions", params);
    },
  });

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
        data={data?.data ?? []}
        columns={columns}
        pageSize={pageSize}
        error={error}
        pageIndex={pageIndex}
        isLoading={isLoading}
        onPageChange={setPageIndex}
        pageCount={data?.meta.pagination.total_pages ?? 0}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPageIndex(pageIndex);
        }}
        classes={{ wrapper: "w-full my-10" }}
      />
      <CustomPagination
        pageSize={pageSize}
        pageIndex={pageIndex}
        onPageChange={setPageIndex}
        onPageSizeChange={setPageSize}
        pageCount={data?.meta.pagination.total_pages ?? 0}
      />
    </>
  );
};

export default DataTableWrapper;
