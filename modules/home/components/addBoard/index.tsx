"use client";

import { PlusIcon } from "@/components/icons";
import InlineInput from "@/components/inlineInput";
import { Button } from "@nextui-org/button";
import React, { FC, useState } from "react";

interface AddBoardProps {
  onSubmit: (value: string) => void;
}

const AddBoard: FC<AddBoardProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>("");

  const handleConfirm = () => {
    if (title.trim().length === 0) return;
    onSubmit(title);
    setTitle("");
  };

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
        errorMessage={title.length === 0 ? "Board name is required" : undefined}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        onConfirm={handleConfirm}
        size="sm"
      />
      <div className="grow mt-2 "></div>
    </div>
  );
};

export default AddBoard;
