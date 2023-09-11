import { PlusIcon } from "@/components/icons";
import InlineInput from "@/components/inlineInput";
import { Button } from "@nextui-org/button";
import React from "react";

const AddBoard = () => {
  return (
    <div className="w-[300px] flex flex-col h-full">
      <InlineInput
        Title={
          <Button
            size="sm"
            variant="light"
            startContent={<PlusIcon size={20} />}
          >
            <h3 className="text-base">Add new board</h3>
          </Button>
        }
        size="sm"
      />
      <div className="grow mt-2 "></div>
    </div>
  );
};

export default AddBoard;
