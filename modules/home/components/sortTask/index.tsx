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
import SortTaskItem from "./sortTaskItem";
import { sortOptions } from "@/modules/home/configs/homeConfig";
import React from "react";

const SortTask = () => {
  const [advanceSortSelected, setAdvanceSortSelected] = React.useState<
    Array<string>
  >([]);

  const availableAdvanceSorts = React.useMemo(() => {
    return sortOptions.filter(
      (sort) => !advanceSortSelected.includes(sort.value)
    );
  }, [advanceSortSelected]);

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
      {advanceSortSelected.length > 0 && (
        <div className="mt-3 flex flex-col gap-3">
          {advanceSortSelected.map((sort) => {
            const sortItem = sortOptions.find((item) => item.value === sort);

            if (!sortItem) return null;

            return (
              <SortTaskItem
                {...sortItem}
                key={sortItem.value}
                onRemove={(value) => {
                  setAdvanceSortSelected((prev) =>
                    prev.filter((item) => item !== value)
                  );
                }}
              />
            );
          })}
        </div>
      )}
      {/* <Divider className="mt-4" /> */}
      <Dropdown radius="sm">
        <DropdownTrigger>
          <Button
            className="dark:text-gray-400 text-black text-xs mt-4"
            size="sm"
            variant="light"
            startContent={<PlusIcon size={16} />}
          >
            Add Sort
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {availableAdvanceSorts.map((sort) => (
            <DropdownItem
              key={sort.title}
              onClick={() =>
                setAdvanceSortSelected((prev) => [...prev, sort.value])
              }
            >
              {sort.title}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </TaskFilterPopover>
  );
};

export default SortTask;
