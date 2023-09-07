import { DotsIcon, PlusIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import React from "react";
import Task from "../task";

const Board = () => {
  return (
    <div className="w-[300px] cursor-pointer border border-transparent px-2 rounded-lg transition-colors pb-1">
      <div className="flex items-center justify-between">
        <h3>Title</h3>
        <div className="flex items-center gap-2">
          <Tooltip content="Add new task">
            <Button size="sm" variant="light" isIconOnly>
              <PlusIcon size={20} />
            </Button>
          </Tooltip>
          <Tooltip content="More actions">
            <Button size="sm" variant="light" isIconOnly>
              <DotsIcon size={20} />
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="mt-2">
        <Task />
      </div>
    </div>
  );
};

export default Board;
