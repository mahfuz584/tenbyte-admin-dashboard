import TableSkeleton from "@/components/shared/TableSkeleton";
import { Suspense } from "react";
import DataTableWrapper from "./_components/DataTableWrapper";

const HomePage = () => {
  return (
    <div className="border rounded-md border-gray-300 p-4 my-4">
      <p className="font-semibold text-xl">Distributions</p>
      <p className="text-gray-600 text-sm mt-2">
        Recently created CDN distribution from this organization.
      </p>
      <Suspense fallback={<TableSkeleton columns={5} />}>
        <DataTableWrapper />
      </Suspense>
    </div>
  );
};

export default HomePage;
