import { PlusIcon } from "@/components/icons";
import { advanceFilters } from "@/modules/home/configs/homeConfig";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import React, { useMemo } from "react";
import AdvanceFilterItem from "./advanceFilterItem";

const AdvanceFilters = () => {
  const [advanceFilterSelected, setAdvanceFilterSelected] = React.useState<
    Array<string>
  >([]);

  const availableAdvanceFilters = useMemo(() => {
    return advanceFilters.filter(
      (filter) => !advanceFilterSelected.includes(filter.value)
    );
  }, [advanceFilterSelected]);

  return (
    <div>
      {advanceFilterSelected.length > 0 && (
        <div className="mb-3 flex flex-col gap-3">
          {advanceFilterSelected.map((filter) => {
            const filterItem = advanceFilters.find(
              (item) => item.value === filter
            );

            if (!filterItem) return null;

            return (
              <AdvanceFilterItem
                key={filterItem.value}
                value={filterItem.value}
                title={filterItem.title}
                icon={filterItem.icon}
                filterOptions={advanceFilters}
                onChangeFilterType={(value) =>
                  setAdvanceFilterSelected((prev) =>
                    prev.map((item) => (item === filter ? value : item))
                  )
                }
                onRemoveFilter={(value) =>
                  setAdvanceFilterSelected((prev) =>
                    prev.filter((item) => item !== value)
                  )
                }
              />
            );
          })}
        </div>
      )}
      <Dropdown radius="sm">
        <DropdownTrigger>
          <Button
            className="dark:text-gray-400 text-black text-xs"
            size="sm"
            variant="light"
            startContent={<PlusIcon size={16} />}
          >
            Add Filter
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {availableAdvanceFilters.map((filter) => (
            <DropdownItem
              key={filter.title}
              startContent={filter.icon}
              onClick={() =>
                setAdvanceFilterSelected((prev) => [...prev, filter.value])
              }
            >
              {filter.title}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default AdvanceFilters;
