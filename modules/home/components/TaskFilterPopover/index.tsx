import React, { FC } from "react";
import { SortIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

interface TaskFilterPopoverProps {
  button?: React.ReactNode;
  title: string;
  count: number;
  onClear?: () => void;
  children: React.ReactNode;
}

const TaskFilterPopover: FC<TaskFilterPopoverProps> = ({
  button,
  title,
  count,
  onClear,
  children,
}) => {
  return (
    <Popover placement="bottom-start" radius="sm">
      <PopoverTrigger>{button}</PopoverTrigger>

      <PopoverContent aria-label="Sort task">
        <div className="w-[450px] pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h4>{title}</h4>
              <span className="dark:text-gray-400 text-black text-xs">
                {count} applied
              </span>
            </div>
            <Button
              size="sm"
              variant="light"
              className="dark:text-gray-400 text-black text-xs"
              onClick={onClear}
            >
              Clear
            </Button>
          </div>

          {children}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TaskFilterPopover;
