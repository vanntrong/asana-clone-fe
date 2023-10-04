import { Chip } from "@nextui-org/chip";
import { Avatar } from "@nextui-org/avatar";
import React, { FC } from "react";
import { Button } from "@nextui-org/button";
import { LikeFilledIcon, LikeIcon } from "@/components/icons/like";
import { CommentIcon } from "@/components/icons";
import { Tooltip } from "@nextui-org/tooltip";
import InlineInput from "@/components/inlineInput";
import { Task, Task as TaskType } from "@/modules/projects/types";
import dayjs from "dayjs";
import clsx from "clsx";

interface TaskProps {
  task: TaskType;
  onSelect?: (task: Task) => void;
  isDragging?: boolean;
  onLikeClick?: (taskId: string) => void;
}

const Task: FC<TaskProps> = ({ task, onSelect, isDragging, onLikeClick }) => {
  return (
    <div
      className={clsx(
        "p-2 rounded-lg border dark:border-[#2a2b2d] bg-gray-100 dark:bg-task-dark-bg group",
        {
          "border-blue-500 dark:border-blue-500": isDragging,
        }
      )}
      onClick={() => onSelect?.(task)}
    >
      <InlineInput
        Title={
          <h2
            className="text-sm font-medium dark:text-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {task.title}
          </h2>
        }
        size="sm"
        className="outline-none focus:outline-none p-0"
        value={task.title}
        Variant="textarea"
        minRows={1}
        onClick={(e) => e.stopPropagation()}
      />

      <div className="my-3">
        {task.tags && (
          <Chip color="primary" radius="full" size="sm" className="text-xs">
            {task.tags}
          </Chip>
        )}

        <div className="mt-3 flex items-center">
          <Avatar
            size="sm"
            src={task.assignee.avatar}
            name={task.assignee.name}
          />
          <span className="text-xs text-gray-500 ml-2">
            {dayjs(task.start_date).format("DD-MMM")} -{" "}
            {dayjs(task.due_date).format("DD-MMM")}
          </span>

          <div className="ml-auto space-x-2 flex items-center">
            <Tooltip
              content={task.is_liked ? "Unlike this task" : "Like this task"}
            >
              <Button
                size="sm"
                variant="light"
                className={clsx(
                  "opacity-0 transition-all group-hover:opacity-100",
                  {
                    "opacity-100": task.is_liked,
                  }
                )}
                isIconOnly
                onClick={() => onLikeClick?.(task.id)}
              >
                <span className="mr-1">{task.like_count}</span>
                {task.is_liked ? (
                  <LikeFilledIcon size={16} color="#0096c7" />
                ) : (
                  <LikeIcon size={16} />
                )}
              </Button>
            </Tooltip>
            <Tooltip content="Comment">
              <Button size="sm" variant="light" className="" isIconOnly>
                <CommentIcon size={16} />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
