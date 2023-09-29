"use client";

import DatePicker from "@/components/datePicker";
import { CalendarIcon, PersonIcon, PlusIcon } from "@/components/icons";
import InputWithSearch from "@/components/inputWithSearch";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import {
  CreateTaskPayload,
  createTaskSchema,
} from "@/modules/tasks/schemas/createTaskSchema";
import { useAuthStore } from "@/stores/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Checkbox, Input } from "@nextui-org/react";
import React, { FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface AddTaskProps {
  projectId: string;
  sectionId: string;
  onSubmit: (data: CreateTaskPayload) => void;
}

const AddTask: FC<AddTaskProps> = ({ projectId, sectionId, onSubmit }) => {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const [isShowAddTask, setIsShowAddTask] = useState(false);
  const { user } = useAuthStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const datePickRef = useRef<HTMLDivElement>(null);

  const defaultValues = {
    title: "",
    is_done: false,
    due_date: new Date(),
    start_date: new Date(),
    project_id: projectId,
    section_id: sectionId,
    assignee_id: user?.id,
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateTaskPayload>({
    resolver: zodResolver(createTaskSchema),
    defaultValues,
  });

  const startDate = watch("start_date");
  const dueDate = watch("due_date");

  const _onSubmit = (data: CreateTaskPayload) => {
    data.due_date = data.due_date.toLocaleString();
    data.start_date = data.start_date?.toLocaleString();
    onSubmit(data);
    reset(defaultValues);
  };

  const handleSubmitForm = handleSubmit(_onSubmit);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmitForm();
    }
  };

  const handleClickOutSide = () => {
    handleSubmitForm();
    setIsShowAddTask(false);
  };

  useOnClickOutside([containerRef, datePickRef], handleClickOutSide);

  return (
    <>
      {!isShowAddTask ? (
        <Button
          className="mx-auto"
          size="sm"
          variant="light"
          onClick={() => setIsShowAddTask(true)}
        >
          <PlusIcon size={20} />
          <span className="ml-2">Add new task</span>
        </Button>
      ) : (
        <div
          className="p-2 rounded-lg border dark:border-[#2a2b2d] bg-gray-100 dark:bg-task-dark-bg group"
          ref={containerRef}
        >
          <div className="flex items-center gap-1">
            <Checkbox
              color="success"
              radius="full"
              size="sm"
              {...register("is_done")}
            />
            <Input
              variant="underlined"
              size="sm"
              {...register("title")}
              onKeyDown={handleKeyDown}
              errorMessage={errors.title?.message}
            />
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
              ref={datePickRef}
              onClose={() => setIsOpenDatePicker(false)}
              value={{
                startDate: new Date(startDate || ""),
                endDate: new Date(dueDate || ""),
              }}
              onChange={(startDate, endDate) => {
                setValue("start_date", startDate?.toLocaleString());
                setValue(
                  "due_date",
                  endDate?.toLocaleString() || new Date().toLocaleString()
                );
              }}
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
      )}
    </>
  );
};

export default AddTask;
