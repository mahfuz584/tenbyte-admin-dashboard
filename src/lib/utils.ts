import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buildQueryParams = (options: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string[];
  dateRange?: string;
  priority?: string[];
  sort?: string;
}) => {
  const params: Record<string, string | number> = {};

  if (options.page != null) params.page = options.page;
  if (options.limit != null) params.limit = options.limit;

  if (options.search) {
    params["filter[name][starts-with]"] = options.search;
  }

  if (options.status?.length) {
    params["filter[status][in]"] = options.status.join(",");
  }

  if (options.priority?.length) {
    params["filter[priority][in]"] = options.priority.join(",");
  }

  if (options.dateRange) {
    params["filter[created_at][between]"] = options.dateRange;
  }

  if (options.sort) {
    params["sort"] = options.sort;
  }

  return params;
};
