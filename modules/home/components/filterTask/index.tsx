"use client";

import {
  CalendarIcon,
  CheckIcon,
  FilterIcon,
  PersonIcon,
} from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import Filter, { FilterProps } from "./filter";
import { Divider } from "@nextui-org/divider";
import { useState } from "react";
import AdvanceFilters from "./advanceFilters";

const FilterTask = () => {
  const [isAdvancedFilter, setIsAdvancedFilter] = useState<boolean>(false);

  const filters: Array<FilterProps> = [
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
    <Popover placement="bottom-start" radius="sm" isOpen>
      <PopoverTrigger>
        <Button
          size="sm"
          variant="light"
          startContent={<FilterIcon size={14} />}
        >
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent aria-label="Filter task">
        <div className="w-[450px] pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h4>Filters</h4>
              <span className="dark:text-gray-400 text-black text-xs">
                0 applied
              </span>
            </div>
            <Button
              size="sm"
              variant="light"
              className="dark:text-gray-400 text-black text-xs"
            >
              Clear
            </Button>
          </div>

          {isAdvancedFilter ? (
            <div className="mt-3">
              <AdvanceFilters />
            </div>
          ) : (
            <div className="mt-3 flex flex-wrap gap-3">
              {filters.map((filter) => (
                <Filter {...filter} key={filter.title} />
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
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterTask;
