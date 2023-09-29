import { Chip } from "@nextui-org/chip";
import { Avatar } from "@nextui-org/avatar";
import React, { FC } from "react";
import { Button } from "@nextui-org/button";
import { LikeIcon } from "@/components/icons/like";
import { CommentIcon } from "@/components/icons";
import { Tooltip } from "@nextui-org/tooltip";
import InlineInput from "@/components/inlineInput";
import { Task, Task as TaskType } from "@/modules/projects/types";
import dayjs from "dayjs";

interface TaskProps {
  task: TaskType;
  onSelect?: (task: Task) => void;
}

const Task: FC<TaskProps> = ({ task, onSelect }) => {
  return (
    <div
      className="p-2 rounded-lg border dark:border-[#2a2b2d] bg-gray-100 dark:bg-task-dark-bg group"
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

          <div className="ml-auto space-x-2">
            <Tooltip content="Like this task">
              <Button
                size="sm"
                variant="light"
                className="opacity-0 transition-all group-hover:opacity-100"
                isIconOnly
              >
                <LikeIcon size={16} />
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
