"use client";

import { GetCommentsParams } from "@/apis/comments/getComments";
import { queryClient } from "@/app/providers";
import { LikeFilledIcon, LikeIcon } from "@/components/icons/like";
import InlineInput from "@/components/inlineInput";
import useDebounceValue from "@/hooks/useDebounceValue";
import useQueryParams from "@/hooks/useQueryParams";
import useUpdateFormValues from "@/hooks/useUpdateFormValue";
import Comment from "@/modules/comments/components/comment";
import useCreateComment from "@/modules/comments/services/useCreateComment";
import useGetComments from "@/modules/comments/services/useGetComments";
import useGetProjectMembers from "@/modules/projects/services/useGetProjectMembers";
import { Task } from "@/modules/projects/types";
import {
  UpdateTaskPayload,
  updateTaskSchema,
} from "@/modules/tasks/schemas/updateTaskSchema";
import { queryKey } from "@/modules/tasks/services/key";
import useDeleteTask from "@/modules/tasks/services/useDeleteTask";
import useLikeTask from "@/modules/tasks/services/useLikeTask";
import { User } from "@/modules/users/types";
import { useAuthStore } from "@/stores/global";
import { PaginationParams } from "@/types";
import { formatTimeToString, timeToEndOfDay } from "@/utils/time";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import {
  Avatar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import clsx from "clsx";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { BsArrowBarRight, BsLink } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";
import { getTaskLink } from "../../utils";
import InputWithSearchUser from "../inputWithSearchUser";
import AddComment from "./addComment";
import DetailDueDate from "./detailDueDate";
import DetailTags from "./detailTags";
import LabelInput from "./labelInput";

interface TaskDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onLikeClick?: (taskId: string) => void;
  onSubmit?: (data: UpdateTaskPayload) => void;
}

const TaskDetailDrawer: FC<TaskDetailDrawerProps> = ({
  isOpen,
  onClose,
  task,
  onSubmit: _onSubmit,
  onLikeClick,
}) => {
  const { searchParams } = useQueryParams();
  const { user } = useAuthStore();
  const deleteButtonRef = useRef<HTMLElement>(null);

  const { mutate: likeTask } = useLikeTask({
    onSuccess: () => {
      if (!task) return;
      onLikeClick?.(task.id);
    },
  });

  const { mutate: deleteTask } = useDeleteTask({
    onSuccess: () => {
      onClose();
      deleteButtonRef.current?.click();
      const key = queryKey.getTasks({
        project_id: task?.project_id || "",
        section_id: task?.section_id || "",
      });

      queryClient.invalidateQueries(key);
    },
  });

  const [query, setQuery] = useState<PaginationParams>({});
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const getCommentsParams: GetCommentsParams = useMemo(
    () => ({
      ...query,
      task_id: task?.id || "",
    }),
    [query, task?.id]
  );

  const { data: comments, isLoading } = useGetComments(getCommentsParams, {
    enabled: !!task,
  });

  const { mutate: createComment } = useCreateComment();

  const taskValues = useMemo(() => {
    return {
      ...task,
      tags: task?.tags_list?.map((tag) => tag.id),
    };
  }, [task]);

  const { register, handleSubmit, setValue, watch, control } =
    useForm<UpdateTaskPayload>({
      resolver: zodResolver(updateTaskSchema),
      defaultValues: taskValues,
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

  const [selectedAssignee, setSelectedAssignee] = useState<User | undefined>();
  const title = watch("title");
  const selectedAssigneeId = watch("assignee_id");

  useUpdateFormValues(setValue, taskValues);

  const onSubmit = (data: UpdateTaskPayload) => {
    _onSubmit?.({
      ...data,
      start_date: formatTimeToString(data.start_date),
      due_date: formatTimeToString(timeToEndOfDay(data.due_date)),
    });
  };

  const handleLikeClick = () => {
    if (!task) return;
    likeTask({
      project_id: task.project_id,
      task_id: task.id,
      section_id: task.section_id,
    });
  };

  const handleCopyTaskLink = () => {
    if (!task) return;
    const filter = getTaskLink(searchParams, task);
    const url = `${window.location.origin}${window.location.pathname}?${filter}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
  };

  useEffect(() => {
    if (selectedAssigneeId) {
      const assignee = data?.data?.find(
        (item) => item.id === selectedAssigneeId
      );

      if (assignee) {
        setSelectedAssignee(assignee);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAssigneeId]);

  useEffect(() => {
    setSelectedAssignee(task?.assignee);
  }, [task]);

  useEffect(() => {
    if (!isCopied) return;

    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [isCopied]);

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
          "fixed right-0 top-0 h-screen dark:bg-task-dark-bg w-[600px] flex justify-between flex-col transition-all duration-500 ease z-50",
          {
            "translate-x-0 opacity-1 visible": isOpen,
            "translate-x-full opacity-0 invisible": !isOpen,
          }
        )}
      >
        <div>
          <div className="px-4 py-3 flex items-center justify-between border-b border-b-gray-600">
            <Button size="sm" radius="sm" startContent={<FiCheck />}>
              Mask completed
            </Button>
            <div className="flex items-center gap-x-3">
              <Button
                size="sm"
                radius="sm"
                isIconOnly
                variant="light"
                onClick={handleLikeClick}
              >
                {task?.is_liked ? (
                  <LikeFilledIcon size={16} color="#0096c7" />
                ) : (
                  <LikeIcon size={16} />
                )}
              </Button>
              <Tooltip content={isCopied ? "Copied" : "Copy to clipboard"}>
                <Button
                  size="sm"
                  radius="sm"
                  isIconOnly
                  variant="light"
                  onClick={handleCopyTaskLink}
                >
                  <BsLink size={18} />
                </Button>
              </Tooltip>
              <Popover triggerRef={deleteButtonRef}>
                <PopoverTrigger>
                  <Button size="sm" radius="sm" isIconOnly variant="light">
                    <AiOutlineDelete size={18} />
                  </Button>
                </PopoverTrigger>

                <PopoverContent>
                  <div className="py-1 px-2">
                    <h3 className="text-md font-medium dark:text-white">
                      Delete task
                    </h3>
                    <p className="text-sm text-gray-400">
                      Are you sure you want to delete this task?
                    </p>

                    <div className="mt-4 flex justify-end">
                      <Button
                        size="sm"
                        radius="sm"
                        color="danger"
                        onClick={() => {
                          if (!task) return;
                          deleteTask(task.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
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

          <div className="flex flex-col p-4 min-h-[400px]">
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
                      onChange={(e) => setKeyword(e.target.value)}
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
                  render={({ field: { onChange, value } }) => (
                    <DetailDueDate dueDate={value} onChange={onChange} />
                  )}
                />
              </LabelInput>

              <LabelInput label="Tags">
                <Controller
                  control={control}
                  name="tags"
                  render={({ field: { value, onChange } }) => (
                    <DetailTags
                      value={value}
                      onChange={onChange}
                      projectId={task?.project_id || ""}
                    />
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

          <div className="mt-6 flex flex-col gap-y-3 max-h-[400px] overflow-auto custom-scrollbar">
            {comments?.data.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
        <div className="py-3 px-4 border-t border-t-gray-600">
          <div className="flex items-start gap-x-2">
            <Avatar className="mt-[6px]" src={user?.avatar} name={user?.name} />
            <AddComment taskId={task?.id} onSubmit={createComment} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetailDrawer;
