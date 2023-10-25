import { PlusIcon } from "@/components/icons";
import useQueryParams from "@/hooks/useQueryParams";
import { advanceFilters } from "@/modules/home/configs/homeConfig";
import { useFilterTaskContext } from "@/modules/home/contexts/filterTaskContext";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { FC, useMemo } from "react";
import AdvanceFilterItem from "./advanceFilterItem";
import { FilterParamKeys } from "../../types/homeType";

interface AdvanceFiltersProps {}

const AdvanceFilters: FC<AdvanceFiltersProps> = ({}) => {
  const { resetSearchParams } = useQueryParams();

  const { advanceFilterSelected = [], setAdvanceFilterSelected } =
    useFilterTaskContext();

  const availableAdvanceFilters = useMemo(() => {
    return advanceFilters.filter(
      (filter) =>
        advanceFilterSelected.findIndex((item) => item.key === filter.value) ===
        -1
    );
  }, [advanceFilterSelected]);

  const handleApply = () => {
    const params = advanceFilterSelected.reduce((prev, curr) => {
      return {
        ...prev,
        [curr.key]: curr.value,
      };
    }, {} as any);
    resetSearchParams(params, [
      FilterParamKeys.PROJECT_ID,
      FilterParamKeys.IS_ADVANCE_FILTER,
    ]);
  };

  return (
    <div>
      {advanceFilterSelected.length > 0 && (
        <div className="mb-3 flex flex-col gap-3">
          {advanceFilterSelected.map((filter, index) => {
            const filterItem = advanceFilters.find(
              (item) => item.value === filter.key
            );

            if (!filterItem) return null;

            return (
              <AdvanceFilterItem
                key={filterItem.value}
                value={filterItem.value}
                data={filter.value}
                title={filterItem.title}
                icon={filterItem.icon}
                filterOptions={advanceFilters}
                onChangeFilterType={(value) =>
                  setAdvanceFilterSelected?.((prev) =>
                    prev.map((item, i) => (index === i ? { key: value } : item))
                  )
                }
                onRemoveFilter={() =>
                  setAdvanceFilterSelected?.((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
                onDataChange={(data) =>
                  setAdvanceFilterSelected?.((prev) => {
                    const newFilters = [...prev];
                    newFilters[index] = {
                      ...newFilters[index],
                      value: data,
                    };
                    return newFilters;
                  })
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
                setAdvanceFilterSelected?.((prev) => [
                  ...prev,
                  { key: filter.value },
                ])
              }
            >
              {filter.title}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      <div className="flex justify-end">
        <Button
          size="sm"
          radius="sm"
          color="primary"
          isDisabled={advanceFilterSelected.length === 0}
          onClick={handleApply}
        >
          <span>Apply</span>
        </Button>
      </div>
    </div>
  );
};

export default AdvanceFilters;
