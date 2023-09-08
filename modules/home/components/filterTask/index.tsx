"use client";

import {
  CalendarIcon,
  CheckIcon,
  FilterIcon,
  PersonIcon,
} from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import FilterItem, { FilterItemProps } from "./filterItem";
import { Divider } from "@nextui-org/divider";
import { useState } from "react";
import AdvanceFilters from "./advanceFilters";
import TaskFilterPopover from "../TaskFilterPopover";

const FilterTask = () => {
  const [isAdvancedFilter, setIsAdvancedFilter] = useState<boolean>(false);

  const filters: Array<FilterItemProps> = [
    {
      title: "Incomplete tasks",
      icon: <CheckIcon size={14} className="dark:text-gray-500 text-black" />,
    },
    {
      title: "Complete tasks",
      icon: <CheckIcon size={14} className="dark:text-gray-500 text-black" />,
    },
    {
      title: "Just my tasks",
      icon: <PersonIcon size={14} className="dark:text-gray-500 text-black" />,
    },
    {
      title: "Due this week",
      icon: (
        <CalendarIcon size={14} className="dark:text-gray-500 text-black" />
      ),
    },
    {
      title: "Due next week",
      icon: (
        <CalendarIcon size={14} className="dark:text-gray-500 text-black" />
      ),
    },
  ];

  const toggleAdvancedFilter = () => {
    setIsAdvancedFilter((prev) => !prev);
  };
  return (
    <TaskFilterPopover
      button={
        <Button
          size="sm"
          variant="light"
          startContent={<FilterIcon size={14} />}
        >
          Filter
        </Button>
      }
      title="Filter"
      count={0}
    >
      {isAdvancedFilter ? (
        <div className="mt-3">
          <AdvanceFilters />
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <FilterItem {...filter} key={filter.title} />
          ))}
        </div>
      )}

      <Divider className="mt-4" />
      <div className="mt-4">
        <Button
          variant="light"
          className="dark:text-gray-400 text-black text-xs"
          onClick={toggleAdvancedFilter}
        >
          {isAdvancedFilter
            ? "Switch to quick filtering"
            : "Switch to advanced filtering"}
        </Button>
      </div>
    </TaskFilterPopover>
  );
};

export default FilterTask;
