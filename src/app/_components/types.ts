export type Status = "active" | "disabled" | "provisioning" | "suspended";

export type Distribution = {
  name: string;
  cname: string;
  status: Status;
  domain_type: string;
  created_at: string;
};

type PaginationLinks = {
  self: string;
  first: string;
  next?: string;
  last: string;
};

type PaginationMeta = {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
};

export type DistributionResponse = {
  success: boolean;
  data: Distribution[];
  meta: {
    links: PaginationLinks;
    pagination: PaginationMeta;
  };
};
