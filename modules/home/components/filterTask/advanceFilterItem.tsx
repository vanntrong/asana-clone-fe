import { CheckIcon, CloseIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { FC } from "react";
import InputWithSearch from "@/components/inputWithSearch";
import {
  AdvanceFilterType,
  AdvanceFilter,
} from "@/modules/home/types/homeType";
import { Select, SelectItem } from "@nextui-org/react";

interface AdvanceFilterItemProps {
  title: AdvanceFilterType;
  value: AdvanceFilterType;
  icon: React.ReactNode;
  filterOptions: Array<AdvanceFilter>;
  onChangeFilterType: (value: AdvanceFilterType) => void;
  onRemoveFilter: (value: AdvanceFilterType) => void;
}

const AdvanceFilterItem: FC<AdvanceFilterItemProps> = ({
  title,
  value,
  icon,
  filterOptions,
  onChangeFilterType,
  onRemoveFilter,
}) => {
  const filterContents: Record<string, React.ReactNode> = {
    [AdvanceFilterType.CompletionStatus]: <AdvanceFilterCompletionStatus />,
    [AdvanceFilterType.Assigned]: <AdvanceFilterPerson />,
    [AdvanceFilterType.StartDate]: <AdvanceFilterDate />,
    [AdvanceFilterType.DueDate]: <AdvanceFilterDate />,
    [AdvanceFilterType.CreatedBy]: <AdvanceFilterPerson />,
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4 basis-1/2">
        <Select
          size={"sm"}
          labelPlacement="outside"
          className="flex-1"
          startContent={icon}
          selectedKeys={new Set([value])}
          disabledKeys={new Set([value])}
        >
          {filterOptions.map((filter) => (
            <SelectItem
              key={filter.title}
              value={filter.value}
              startContent={filter.icon}
              onClick={() => onChangeFilterType(filter.value)}
            >
              {filter.title}
            </SelectItem>
          ))}
        </Select>

        <span>is</span>
      </div>
      <div className="flex-1 max-w-[200px] flex items-center">
        {filterContents[value]}
        <Button
          isIconOnly
          variant="light"
          size="sm"
          className="ml-3"
          onClick={() => onRemoveFilter(value)}
        >
          <CloseIcon width={16} height={16} />
        </Button>
      </div>
    </div>
  );
};

export default AdvanceFilterItem;

const AdvanceFilterCompletionStatus = () => {
  const options = [
    {
      title: "Complete",
    },
    {
      title: "Incomplete",
    },
  ];

  return (
    <Select
      size={"sm"}
      labelPlacement="outside"
      defaultSelectedKeys={new Set([options[0].title])}
    >
      {options.map((value) => (
        <SelectItem key={value.title} value={value.title}>
          {value.title}
        </SelectItem>
      ))}
    </Select>
  );
};

const AdvanceFilterPerson = () => {
  return (
    <InputWithSearch
      size="sm"
      radius="sm"
      fullWidth
      placeholder="Search people"
    />
  );
};

const AdvanceFilterDate = () => {
  const options = [
    {
      title: "Before today",
    },
    {
      title: "Today",
    },
    {
      title: "Tomorrow",
    },
    {
      title: "This week",
    },
    {
      title: "Next week",
    },
    {
      title: "Next 14 days",
    },
  ];
  return (
    <Select
      size={"sm"}
      labelPlacement="outside"
      defaultSelectedKeys={new Set([options[0].title])}
    >
      {options.map((value) => (
        <SelectItem key={value.title} value={value.title}>
          {value.title}
        </SelectItem>
      ))}
    </Select>
  );
};
