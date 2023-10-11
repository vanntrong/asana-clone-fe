"use client";

import {
  CalendarIcon,
  CheckIcon,
  FilterIcon,
  PersonIcon,
} from "@/components/icons";
import useQueryParams from "@/hooks/useQueryParams";
import { useAuthStore } from "@/stores/global";
import { toBoolean } from "@/utils/converter";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { useEffect, useMemo, useState } from "react";
import TaskFilterPopover from "../TaskFilterPopover";
import AdvanceFilters from "./advanceFilters";
import FilterItem, { FilterItemProps } from "./filterItem";
import { formatTimeToString, timeToEndOfDay } from "@/utils/time";
import { useFilterTaskContext } from "@/modules/home/contexts/filterTaskContext";
import { omit } from "lodash";
import { FilterParamKeys } from "../../types/homeType";
dayjs.extend(weekday);

const FilterTask = () => {
  const {
    searchParams,
    setSearchParams,
    removeSearchParams,
    resetSearchParams,
  } = useQueryParams();
  const { user } = useAuthStore();
  const { isAdvancedFilter, setIsAdvancedFilter } = useFilterTaskContext();

  const filters: Array<FilterItemProps> = useMemo(
    () => [
      {
        title: "Incomplete tasks",
        icon: <CheckIcon size={14} className="dark:text-gray-500 text-black" />,
        key: "is_done",
        value: false,
        converter: toBoolean,
      },
      {
        title: "Complete tasks",
        icon: <CheckIcon size={14} className="dark:text-gray-500 text-black" />,
        key: "is_done",
        value: true,
        converter: toBoolean,
      },
      {
        title: "Just my tasks",
        icon: (
          <PersonIcon size={14} className="dark:text-gray-500 text-black" />
        ),
        key: "assignee_ids",
        value: user?.id,
      },
      {
        title: "Due this week",
        icon: (
          <CalendarIcon size={14} className="dark:text-gray-500 text-black" />
        ),
        key: "due_date",
        value: formatTimeToString(timeToEndOfDay(dayjs().weekday(7).toDate())),
      },
      {
        title: "Due next week",
        icon: (
          <CalendarIcon size={14} className="dark:text-gray-500 text-black" />
        ),
        key: "due_date",
        value: formatTimeToString(timeToEndOfDay(dayjs().weekday(14).toDate())),
      },
    ],
    [user]
  );

  const toggleAdvancedFilter = () => {
    resetSearchParams(
      {
        [FilterParamKeys.IS_ADVANCE_FILTER]: `${!isAdvancedFilter}`,
      },
      [FilterParamKeys.PROJECT_ID, FilterParamKeys.IS_ADVANCE_FILTER]
    );
    setIsAdvancedFilter?.((prev) => !prev);
  };

  const handleBasicFilter = (filter: FilterItemProps) => {
    if (isActiveBasicFilter(filter)) {
      removeSearchParams(filter.key);
      return;
    }

    setSearchParams({
      [filter.key]: filter.value,
    });
  };

  const isActiveBasicFilter = (filter: FilterItemProps) => {
    if (!searchParams.has(filter.key)) return false;
    const value = filter.converter
      ? filter.converter(searchParams.get(filter.key) || "")
      : searchParams.get(filter.key);

    return value === filter.value;
  };

  const handleClear = () => {
    const removeFields = filters.map((filter) => filter.key);
    removeSearchParams(removeFields);
  };

  const searchParamsSize = useMemo(() => {
    const searchParamsObject = Object.fromEntries(searchParams.entries());

    return Object.keys(
      omit(searchParamsObject, [
        FilterParamKeys.PROJECT_ID,
        FilterParamKeys.IS_ADVANCE_FILTER,
      ])
    ).length;
  }, [searchParams]);

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
      count={searchParamsSize}
      onClear={handleClear}
      // isOpen
    >
      {isAdvancedFilter ? (
        <div className="mt-3">
          <AdvanceFilters />
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <FilterItem
              {...filter}
              key={filter.title}
              isActive={isActiveBasicFilter(filter)}
              onClick={() => handleBasicFilter(filter)}
            />
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
