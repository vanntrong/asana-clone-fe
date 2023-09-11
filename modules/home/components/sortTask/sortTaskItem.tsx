import { AscendingIcon, CloseIcon, DescendingIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import React, { FC } from "react";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";

const sortIcon = {
  ascending: <AscendingIcon size={18} />,
  descending: <DescendingIcon size={18} />,
};

export const sortValues = [
  {
    title: "Ascending",
    value: "ascending",
    icon: sortIcon.ascending,
  },
  {
    title: "Descending",
    value: "descending",
    icon: sortIcon.descending,
  },
];

interface SortTaskItemProps {
  title: string;
  value: string;
  onRemove: (value: string) => void;
}

const SortTaskItem: FC<SortTaskItemProps> = ({ title, value, onRemove }) => {
  return (
    <div>
      <h3 className="text-xs dark:text-gray-400 text-black">{title}</h3>

      <div className="flex items-center gap-x-4 mt-2">
        <Select
          size={"sm"}
          labelPlacement="outside"
          className="w-40"
          startContent={sortIcon.ascending}
          selectedKeys={new Set(["ascending"])}
        >
          {sortValues.map((value) => (
            <SelectItem
              key={value.value}
              value={value.value}
              startContent={value.icon}
            >
              {value.title}
            </SelectItem>
          ))}
        </Select>

        <Button
          isIconOnly
          size="sm"
          variant="light"
          onClick={() => onRemove(value)}
        >
          <CloseIcon width={16} height={16} />
        </Button>
      </div>
    </div>
  );
};

export default SortTaskItem;
