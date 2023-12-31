import React from "react";
import InputWithSearch, {
  InputWithSearchProps,
} from "@/components/inputWithSearch";
import { User } from "@/modules/users/types";
import { Button } from "@nextui-org/button";
import { CheckIcon, PersonIcon } from "@/components/icons";
import { Avatar } from "@nextui-org/react";
import clsx from "clsx";

export interface InputWithSearchUserProps
  extends Omit<InputWithSearchProps<User>, "renderItem"> {
  onItemClick: (item: User) => void;
  selectedItem?: string | string[];
  disabledItems?: string[];
}

const InputWithSearchUser = ({
  onItemClick,
  selectedItem,
  disabledItems,
  ...props
}: InputWithSearchUserProps) => {
  const selected = Array.isArray(selectedItem) ? selectedItem : [selectedItem];

  return (
    <InputWithSearch<User>
      renderItem={(item) => (
        <Button
          fullWidth
          onClick={() => onItemClick(item)}
          endContent={
            selected.includes(item.id) ? <CheckIcon size={16} /> : null
          }
          className={clsx({
            "bg-gray-100 dark:bg-[#3F3F46]": selected.includes(item.id),
          })}
          isDisabled={disabledItems?.includes(item.id)}
        >
          <div className="flex items-center gap-2">
            <Avatar size="sm" src={item.avatar} />
            <span className="text-sm">{item.name}</span>
            <span className="text-xs dark:text-gray-400 text-black">
              {item.email}
            </span>
          </div>
        </Button>
      )}
      Component={
        <Button
          size="sm"
          isIconOnly
          className="min-w-6 w-6 h-6 border border-gray-500 border-dashed"
          radius="full"
        >
          <PersonIcon size={12} />
        </Button>
      }
      {...props}
    />
  );
};

export default InputWithSearchUser;
