"use client";

import DataTable from "@/components/shared/DataTable";
import { getData } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";
import dayjs from "dayjs";
import { Distribution, DistributionResponse, Status } from "./types";

export const columns: ColumnDef<Distribution>[] = [
  {
    accessorKey: "name",
    header: "Label",
  },
  {
    accessorKey: "domain",
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
        <Button variant="outline">
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
    // accessorKey: "created_at",
    header: "Time Modified",
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return <span>{dayjs(date).format("h:mm A")}</span>;
    },
  },
];

const DataTableWrapper = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["distributions"],
    queryFn: () => getData<DistributionResponse>("/distributions"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.success || error) {
    return <div>Error loading data</div>;
  }

  return <DataTable columns={columns} data={data.data} />;
};

export default DataTableWrapper;
