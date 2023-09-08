"use client";

import { PlusIcon, SortIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import TaskFilterPopover from "../TaskFilterPopover";

const SortTask = () => {
  const sortOptions = [
    {
      title: "Start date",
    },
    {
      title: "Due date",
    },
    {
      title: "Created date",
    },
    {
      title: "Last modified on",
    },
    {
      title: "Likes",
    },
    {
      title: "Alphabetical",
    },
  ];

  return (
    <TaskFilterPopover
      button={
        <Button size="sm" variant="light" startContent={<SortIcon size={14} />}>
          Sort
        </Button>
      }
      title="Sorts"
      count={0}
    >
      <div></div>
      <Dropdown radius="sm">
        <DropdownTrigger>
          <Button
            className="dark:text-gray-400 text-black text-xs"
            size="sm"
            variant="light"
            startContent={<PlusIcon size={16} />}
          >
            Add Sort
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {sortOptions.map((sort) => (
            <DropdownItem key={sort.title}>{sort.title}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </TaskFilterPopover>
  );
};

export default SortTask;
