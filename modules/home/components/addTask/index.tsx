"use client";

import { CalendarIcon, PersonIcon, PlusIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { Checkbox, Input } from "@nextui-org/react";
import InputWithSearch from "@/components/inputWithSearch";
import DatePicker from "@/components/datePicker";

const AddTask = () => {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);

  return (
    <>
      <Button className="mx-auto" size="sm" variant="light">
        <PlusIcon size={20} />
        <span className="ml-2">Add new task</span>
      </Button>

      <div className="p-2 rounded-lg border dark:border-[#2a2b2d] bg-gray-100 dark:bg-task-dark-bg group">
        <div className="flex items-center gap-1">
          <Checkbox color="success" radius="full" size="sm" />
          <Input variant="underlined" size="sm" />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <InputWithSearch
            Component={
              <Button
                size="sm"
                isIconOnly
                className="min-w-6 w-6 h-6 border border-gray-500 border-dashed"
                radius="full"
              >
                <PersonIcon size={12} />
              </Button>
            }
          />

          <DatePicker
            isOpen={isOpenDatePicker}
            onClose={() => setIsOpenDatePicker(false)}
            Component={
              <Button
                size="sm"
                isIconOnly
                className="min-w-6 w-6 h-6 border border-gray-500 border-dashed"
                radius="full"
                onClick={() => setIsOpenDatePicker(true)}
              >
                <CalendarIcon size={12} />
              </Button>
            }
          />
        </div>
      </div>
    </>
  );
};

export default AddTask;
