"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  CalendarDateRangeIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { priorities, statusOptions } from "./constants";

const Filters = ({
  status,
  search,
  priority,
  setStatus,
  setSearch,
  setPriority,
}: {
  search: string;
  status: string[];
  priority: string[];
  setSearch: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<string[]>>;
  setPriority: Dispatch<SetStateAction<string[]>>;
}) => {
  const [localSearch, setLocalSearch] = useState(search);

  const debouncedSetSearch = useDebouncedCallback((val: string) => {
    setSearch(val);
  }, 500);

  const handleSearchChange = (val: string) => {
    setLocalSearch(val);
    debouncedSetSearch(val);
  };

  const toggle = (id: string) => {
    setStatus((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const togglePriority = (id: string) => {
    setPriority((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <Input
        value={localSearch}
        placeholder="Search Titles"
        className="max-w-56"
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-dashed">
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Status
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36 p-2">
          <DropdownMenuLabel>Select Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col gap-2">
            {statusOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Checkbox
                  checked={status.includes(option.id)}
                  onCheckedChange={() => toggle(option.id)}
                />
                <div className="flex items-center gap-1">
                  <option.icon
                    className={cn(
                      "size-4",
                      option.id === "provisioning" && "text-green-700",
                      option.id === "active" && "text-green-500",
                      option.id === "disabled" && "text-red-500",
                      option.id === "pending" && "text-orange-500"
                    )}
                  />
                  <span className="text-sm">{option.label}</span>
                </div>
              </label>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-dashed">
            <CalendarDateRangeIcon />
            Created At
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          dsdsd
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-dashed">
            <PlusCircleIcon />
            Priority
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36 p-2">
          <DropdownMenuLabel>Select Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col gap-2">
            {priorities.map((option) => (
              <label
                key={option.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Checkbox
                  checked={priority.includes(option.id)}
                  onCheckedChange={() => togglePriority(option.id)}
                />
                <div className="flex items-center gap-1">
                  <option.icon className="size-4" />
                  <span className="text-sm">{option.label}</span>
                </div>
              </label>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Filters;
