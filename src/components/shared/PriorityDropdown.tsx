"use client";

import { priorities } from "@/app/_components/constants";

import { PlusCircleIcon } from "lucide-react";

import { PriorityDropdownProps } from "../types";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const PriorityDropdown = ({ priority, setPriority }: PriorityDropdownProps) => {
  const togglePriority = (id: string) => {
    setPriority((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
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
  );
};

export default PriorityDropdown;
