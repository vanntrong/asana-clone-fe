"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import RDatePicker from "react-datepicker";
import dayjs from "dayjs";

import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  Component?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const DatePicker: FC<DatePickerProps> = ({ Component, isOpen, onClose }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    if (start.isAfter(end)) {
      setEndDate(startDate);
    }
  }, [startDate, endDate]);

  return (
    <Popover
      placement="bottom-start"
      radius="sm"
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopoverTrigger>{Component}</PopoverTrigger>
      <PopoverContent className="py-3">
        <div className="flex items-stretch flex-row gap-4">
          <div className="flex flex-col gap-3">
            <Input
              radius="sm"
              size="sm"
              placeholder="Start Date"
              isDisabled={true}
              value={dayjs(startDate).format("DD/MM/YYYY")}
            />
            <RDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              calendarClassName={`custom-calendar custom-calendar-${theme}`}
              monthClassName={() => "custom-month"}
              inline
              dayClassName={() => "custom-day"}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Input
              radius="sm"
              size="sm"
              placeholder="End Date"
              isDisabled={true}
              value={dayjs(endDate).format("DD/MM/YYYY")}
            />
            <RDatePicker
              selected={endDate}
              minDate={startDate}
              onChange={(date) => setEndDate(date)}
              calendarClassName={`custom-calendar custom-calendar-${theme}`}
              monthClassName={() => "custom-month"}
              inline
              dayClassName={() => "custom-day"}
            />
          </div>
        </div>
        <Button
          size="sm"
          radius="sm"
          className="ml-auto"
          color="primary"
          onClick={onClose}
        >
          <span className="text-sm">Apply</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
