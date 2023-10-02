"use client";

import { LikeIcon } from "@/components/icons/like";
import InputWithSearch from "@/components/inputWithSearch";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsArrowBarRight, BsLink } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";
import LabelInput from "./labelInput";
import DetailDueDate from "./detailDueDate";
import { Textarea } from "@nextui-org/input";
import Comment from "@/components/comment";
import { FC, useEffect, useState } from "react";
import clsx from "clsx";
import { Task } from "@/modules/projects/types";
import { Controller, useForm } from "react-hook-form";
import {
  UpdateTaskPayload,
  updateTaskSchema,
} from "@/modules/tasks/schemas/updateTaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InlineInput from "@/components/inlineInput";
import useUpdateFormValues from "@/hooks/useUpdateFormValue";
import InputWithSearchUser from "../inputWithSearchUser";
import useGetProjectMembers from "@/modules/projects/services/useGetProjectMembers";
import useDebounceValue from "@/hooks/useDebounceValue";

interface TaskDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onSubmit?: (data: UpdateTaskPayload) => void;
}

const TaskDetailDrawer: FC<TaskDetailDrawerProps> = ({
  isOpen,
  onClose,
  task,
  onSubmit: _onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<UpdateTaskPayload>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      ...task,
    },
  });
  const [keyword, setKeyword] = useState<string>("");
  const keywordDebounce = useDebounceValue(keyword);
  const { data } = useGetProjectMembers(
    {
      id: task?.project_id,
      keyword: keywordDebounce,
    },
    {
      enabled: !!task?.project_id,
    }
  );
  const title = watch("title");
  const selectedAssigneeId = watch("assignee_id");

  const selectedAssignee = data?.data.find(
    (item) => item.id === selectedAssigneeId
  );

  useUpdateFormValues(setValue, task);

  const onSubmit = (data: UpdateTaskPayload) => {
    _onSubmit?.({
      ...data,
      start_date: new Date(data.start_date || "").toLocaleString(),
      due_date: new Date(data.due_date || "").toLocaleString(),
    });
  };

  return (
    <>
      <div
        className={clsx("fixed inset-0 w-full h-full bg-transparent z-10", {
          hidden: !isOpen,
          block: isOpen,
        })}
        onClick={onClose}
      />
      <div
        className={clsx(
          "absolute right-0 top-0 h-full dark:bg-task-dark-bg w-[600px] flex justify-between flex-col transition-all duration-500 ease z-20",
          {
            "translate-x-0": isOpen,
            "translate-x-full": !isOpen,
          }
        )}
      >
        <div>
          <div className="px-4 py-3 flex items-center justify-between border-b border-b-gray-600">
            <Button size="sm" radius="sm" startContent={<FiCheck />}>
              Mask completed
            </Button>
            <div className="flex items-center gap-x-3">
              <Button size="sm" radius="sm" isIconOnly variant="light">
                <LikeIcon size={16} />
              </Button>
              <Button size="sm" radius="sm" isIconOnly variant="light">
                <BsLink size={18} />
              </Button>
              <Button size="sm" radius="sm" isIconOnly variant="light">
                <AiOutlineDelete size={18} />
              </Button>
              <Button
                size="sm"
                radius="sm"
                isIconOnly
                variant="light"
                onClick={onClose}
              >
                <BsArrowBarRight size={18} />
              </Button>
            </div>
          </div>

          <div className="flex flex-col p-4 min-h-[500px]">
            <InlineInput
              Title={
                <h2 className="text-xl font-medium dark:text-white">{title}</h2>
              }
              {...register("title")}
            />

            <div className="mt-6 flex flex-col gap-y-3">
              <LabelInput label="Assignee">
                <Controller
                  name="assignee_id"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputWithSearchUser
                      onItemClick={(item) => onChange(item.id)}
                      selectedItem={value}
                      data={data?.data}
                      Component={
                        <Button
                          size="sm"
                          radius="sm"
                          variant="light"
                          startContent={
                            <Avatar
                              className="w-6 h-6 border border-dashed border-gray-200"
                              src={selectedAssignee?.avatar}
                            />
                          }
                          className="text-gray-300"
                        >
                          {selectedAssignee
                            ? selectedAssignee.name
                            : "No assignee"}
                        </Button>
                      }
                    />
                  )}
                />
              </LabelInput>
              <LabelInput label="Due date">
                <Controller
                  control={control}
                  name="due_date"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <DetailDueDate dueDate={value} onChange={onChange} />
                  )}
                />
              </LabelInput>
              <LabelInput label="Description" vertical>
                <Textarea
                  radius="sm"
                  placeholder="What is task about"
                  variant="bordered"
                  minRows={6}
                  {...register("description")}
                />
              </LabelInput>

              <div className="flex justify-end">
                <Button
                  size="sm"
                  radius="sm"
                  // isDisabled={!isValid}
                  color="primary"
                  onClick={handleSubmit(onSubmit)}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 mt-auto">
          <h2 className="text-md font-medium dark:text-gray-500">Comment</h2>

          <div className="mt-6 flex flex-col gap-y-3">
            <Comment />
            <Comment />
            <Comment />
          </div>
        </div>
        <div className="py-3 px-4 border-t border-t-gray-600">
          <div className="flex items-start gap-x-2">
            <Avatar className="mt-[6px]" />
            <Textarea placeholder="Add a comment" radius="sm" label={null} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetailDrawer;
