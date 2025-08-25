"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
import { CalendarRange } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const DatePickerWithRange = ({
  dateRange,
  setDateRange,
}: {
  dateRange: string;
  setDateRange: Dispatch<SetStateAction<string>>;
}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: dayjs().toDate(),
    to: dayjs().add(1, "day").toDate(),
  });

  useEffect(() => {
    if (dateRange) {
      const [from, to] = dateRange.split(",");
      setDate({
        from: from ? dayjs(from).toDate() : undefined,
        to: to ? dayjs(to).toDate() : undefined,
      });
    }
  }, [dateRange]);

  const handleApply = () => {
    if (date.from && date.to) {
      const formatted = `${dayjs(date.from).format("YYYY-MM-DD")},${dayjs(
        date.to
      ).format("YYYY-MM-DD")}`;
      setDateRange(formatted);
    } else {
      setDateRange("");
    }
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-dashed justify-start">
          <CalendarRange className="mr-2 h-4 w-4" />
          Created At
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit p-4 gap-4">
        <Calendar
          mode="range"
          selected={date}
          onSelect={(range) => {
            if (range && range.from && range.to) {
              setDate({
                from: range.from,
                to: range.to,
              });
            }
          }}
          numberOfMonths={2}
        />
        <div className="flex justify-end mt-4 gap-2">
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleApply}
          >
            Apply Filter
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DatePickerWithRange;
