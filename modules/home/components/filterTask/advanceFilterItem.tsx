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
import { AdvanceFilterType, AdvanceFilter } from "../../types/homeType";

interface AdvanceFilterItemProps {
  title: AdvanceFilterType;
  value: AdvanceFilterType;
  icon: React.ReactNode;
  filterOptions: Array<AdvanceFilter>;
  onChangeFilterType: (value: AdvanceFilterType) => void;
}

const AdvanceFilterItem: FC<AdvanceFilterItemProps> = ({
  title,
  value,
  icon,
  filterOptions,
  onChangeFilterType,
}) => {
  const filterContents: Record<string, React.ReactNode> = {
    [AdvanceFilterType.CompletionStatus]: <AdvanceFilterCompletionStatus />,
    [AdvanceFilterType.Assigned]: <AdvanceFilterPerson />,
    // [AdvanceFilterType.StartDate]: <AdvanceFilterPerson />,
    // [AdvanceFilterType.DueDate]: <AdvanceFilterPerson />,
    [AdvanceFilterType.CreatedBy]: <AdvanceFilterPerson />,
  };
  return (
    <div className="flex items-center justify-between">
      <div className="space-x-4">
        <Dropdown radius="sm">
          <DropdownTrigger>
            <Button size="sm" variant="ghost" startContent={icon}>
              {title}
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            {filterOptions.map((filter) => (
              <DropdownItem
                key={filter.title}
                startContent={filter.icon}
                onClick={() => onChangeFilterType(filter.value)}
              >
                {filter.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <span>is</span>
      </div>
      <div className="flex-1 max-w-[200px] flex items-center">
        {filterContents[value]}
        <Button isIconOnly variant="light" size="sm" className="ml-3">
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
    <Dropdown radius="sm" placement="bottom-start">
      <DropdownTrigger>
        <Button className="text-xs w-full" size="sm" variant="ghost">
          {options[0].title}
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {options.map((filter) => (
          <DropdownItem key={filter.title}>{filter.title}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
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
