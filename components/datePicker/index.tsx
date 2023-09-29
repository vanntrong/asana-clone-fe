"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import RDatePicker from "react-datepicker";
import dayjs from "dayjs";

import "react-datepicker/dist/react-datepicker.css";
import useFirstRender from "@/hooks/useFirstRender";

type Value = {
  startDate?: Date | null;
  endDate?: Date | null;
};

interface DatePickerProps {
  Component?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  hiddenStartDate?: boolean;
  onChange?: (startDate: Date | null, endDate: Date | null) => void;
  value?: Value;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    { Component, isOpen, onClose, hiddenStartDate = false, onChange, value },
    ref
  ) => {
    const { theme } = useTheme();
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const isFirstRender = useFirstRender();

    useEffect(() => {
      const start = dayjs(startDate);
      const end = dayjs(endDate);

      if (start.isAfter(end)) {
        setEndDate(startDate);
      }
    }, [startDate, endDate]);

    useEffect(() => {
      if (!value || isFirstRender) return;
      setStartDate(value.startDate || new Date());
      setEndDate(value.endDate || new Date());
    }, [value, isFirstRender]);

    return (
      <Popover
        placement="bottom-start"
        radius="sm"
        isOpen={isOpen}
        onClose={onClose}
      >
        <PopoverTrigger>{Component}</PopoverTrigger>
        <PopoverContent className="py-3">
          <div className="flex items-stretch flex-row gap-4" ref={ref}>
            {!hiddenStartDate && (
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
            )}
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
            onClick={() => {
              onChange?.(startDate, endDate);
              onClose();
            }}
          >
            <span className="text-sm">Apply</span>
          </Button>
        </PopoverContent>
      </Popover>
    );
  }
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
