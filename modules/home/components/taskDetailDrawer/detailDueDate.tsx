"use client";

import DatePicker from "@/components/datePicker";
import { CalendarIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import dayjs from "dayjs";
import React, { useState } from "react";

interface DetailDueDateProps {
  dueDate?: Date | string;
  onChange?: (date: string) => void;
}

const DetailDueDate = ({ dueDate, onChange }: DetailDueDateProps) => {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);

  return (
    <DatePicker
      isOpen={isOpenDatePicker}
      onClose={() => setIsOpenDatePicker(false)}
      hiddenStartDate
      onChange={(_, endDate) =>
        onChange?.(
          endDate ? endDate.toLocaleString() : new Date().toLocaleString()
        )
      }
      value={{
        startDate: null,
        endDate: dueDate ? new Date(dueDate) : null,
      }}
      Component={
        <div className="">
          <Button
            size="sm"
            radius="sm"
            variant="light"
            onClick={() => setIsOpenDatePicker(true)}
            startContent={
              <div className="border border-gray-500 border-dashed w-6 h-6 flex items-center justify-center rounded-full">
                <CalendarIcon size={14} />
              </div>
            }
            className="text-gray-300"
          >
            {dueDate ? dayjs(dueDate).format("DD-MM-YYYY") : "No due date"}
          </Button>
        </div>
      }
    />
  );
};

export default DetailDueDate;
