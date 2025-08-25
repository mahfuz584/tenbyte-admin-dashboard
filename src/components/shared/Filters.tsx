"use client";

import { Input } from "@/components/ui/input";

import DatePickerWithRange from "@/components/shared/DateTimePicker";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { FilterProps } from "../types";
import PriorityDropdown from "./PriorityDropdown";
import StatusDropDown from "./StatusDropDown";

const Filters = ({
  status,
  search,
  priority,
  setStatus,
  setSearch,
  dateRange,
  setDateRange,
  setPriority,
}: FilterProps) => {
  const [localSearch, setLocalSearch] = useState(search);

  const debouncedSetSearch = useDebouncedCallback((val: string) => {
    setSearch(val);
  }, 1000);

  const handleSearchChange = (val: string) => {
    setLocalSearch(val);
    debouncedSetSearch(val);
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <Input
        value={localSearch}
        placeholder="Search Titles"
        className="max-w-56"
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <StatusDropDown status={status} setStatus={setStatus} />
      <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} />
      <PriorityDropdown priority={priority} setPriority={setPriority} />
    </div>
  );
};

export default Filters;
