import { PlusIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import React from "react";
import Task from "../task";

const Board = () => {
  return (
    <div className="w-[300px] cursor-pointer border border-transparent hover:border-gray-50 px-2 rounded-lg transition-colors">
      <div className="flex items-center justify-between">
        <h3>Title</h3>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="light" isIconOnly>
            <PlusIcon size={20} />
          </Button>
          <Button size="sm" variant="light" isIconOnly>
            <PlusIcon size={20} />
          </Button>
        </div>
      </div>

      <div>
        <Task />
      </div>
    </div>
  );
};

export default Board;
