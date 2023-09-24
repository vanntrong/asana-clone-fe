import { Chip } from "@nextui-org/chip";
import { Avatar } from "@nextui-org/avatar";
import React, { FC } from "react";
import { Button } from "@nextui-org/button";
import { LikeIcon } from "@/components/icons/like";
import { CommentIcon } from "@/components/icons";
import { Tooltip } from "@nextui-org/tooltip";
import InlineInput from "@/components/inlineInput";
import { Task as TaskType } from "@/modules/projects/types";

interface TaskProps {
  task: TaskType;
}

const Task: FC<TaskProps> = ({ task }) => {
  return (
    <div className="p-2 rounded-lg border dark:border-[#2a2b2d] bg-gray-100 dark:bg-task-dark-bg group">
      <InlineInput
        Title={
          <h2 className="text-sm font-medium dark:text-gray-200">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </h2>
        }
        size="sm"
        className="outline-none focus:outline-none p-0"
        value={"Lorem ipsum dolor sit amet consectetur, adipisicing elit."}
        Variant="textarea"
        minRows={1}
      />

      <div className="my-3">
        <Chip color="primary" radius="full" size="sm" className="text-xs">
          abcxyz123
        </Chip>

        <div className="mt-3 flex items-center">
          <Avatar
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
          <span className="text-xs text-gray-500 ml-2">Mar 24- 29</span>

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
