"use client";

import { statusOptions } from "@/app/_components/constants";
import { cn } from "@/lib/utils";

import { PlusCircleIcon } from "lucide-react";

import { StatusDropDownProps } from "../types";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const StatusDropDown = ({ status, setStatus }: StatusDropDownProps) => {
  const toggleStatus = (id: string) => {
    setStatus((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
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
                onCheckedChange={() => toggleStatus(option.id)}
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
  );
};

export default StatusDropDown;
