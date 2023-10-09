import { CloseIcon } from "@/components/icons";
import useDebounceValue from "@/hooks/useDebounceValue";
import useQueryParams from "@/hooks/useQueryParams";
import {
  AdvanceFilter,
  AdvanceFilterType,
  FilterItem,
} from "@/modules/home/types/homeType";
import useGetProjectMembers from "@/modules/projects/services/useGetProjectMembers";
import { User } from "@/modules/users/types";
import { Button } from "@nextui-org/button";
import { Input, Select, SelectItem } from "@nextui-org/react";
import dayjs from "dayjs";
import { FC, useMemo, useState } from "react";
import InputWithSearchUser from "../inputWithSearchUser";

interface AdvanceFilterItemProps {
  title: AdvanceFilterType;
  value: FilterItem;
  icon: React.ReactNode;
  filterOptions: Array<AdvanceFilter>;
  onChangeFilterType: (value: FilterItem) => void;
  onRemoveFilter: () => void;
  data?: string | string[];
  onDataChange: (data: string | string[]) => void;
}

interface FilterItemProps {
  data?: string | string[];
  onDataChange: (data: string | string[]) => void;
}

const AdvanceFilterItem: FC<AdvanceFilterItemProps> = ({
  title,
  value,
  icon,
  filterOptions,
  onChangeFilterType,
  onRemoveFilter,
  ...itemProps
}) => {
  const filterContents: Record<string, React.ReactNode> = {
    [FilterItem.CompletionStatus]: (
      <AdvanceFilterCompletionStatus {...itemProps} />
    ),
    [FilterItem.Assigned]: <AdvanceFilterPerson {...itemProps} />,
    [FilterItem.StartDate]: <AdvanceFilterDate {...itemProps} />,
    [FilterItem.DueDate]: <AdvanceFilterDate {...itemProps} />,
    [FilterItem.CreatedBy]: <AdvanceFilterPerson {...itemProps} />,
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
          renderValue={() => title}
        >
          {filterOptions.map((filter) => (
            <SelectItem
              key={filter.value}
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
          onClick={() => onRemoveFilter()}
        >
          <CloseIcon width={16} height={16} />
        </Button>
      </div>
    </div>
  );
};

export default AdvanceFilterItem;

const AdvanceFilterCompletionStatus = (props: FilterItemProps) => {
  const { data, onDataChange } = props;

  const options = [
    {
      title: "Complete",
      value: "true",
    },
    {
      title: "Incomplete",
      value: "false",
    },
  ];

  const selectedKeys = typeof data === "string" ? [data] : data;

  return (
    <Select
      size={"sm"}
      labelPlacement="outside"
      selectedKeys={new Set(selectedKeys)}
      onChange={(event) => {
        onDataChange(event.target.value);
      }}
    >
      {options.map((value) => (
        <SelectItem key={value.value} value={value.value}>
          {value.title}
        </SelectItem>
      ))}
    </Select>
  );
};

const AdvanceFilterPerson = (props: FilterItemProps) => {
  const { data, onDataChange } = props;

  const [keyword, setKeyword] = useState<string>("");
  const keywordDebounce = useDebounceValue(keyword);
  const { searchParams } = useQueryParams();
  const project_id = searchParams.get("project_id") || "";

  const { data: members } = useGetProjectMembers({
    id: project_id,
    keyword: keywordDebounce,
  });

  const handleItemClick = (item: User) => {
    if (!Array.isArray(data) && data !== undefined) {
      onDataChange(item.id);
      return;
    }

    const isExist = data?.includes(item.id);
    if (isExist) {
      onDataChange(data?.filter((id) => id !== item.id) || []);
      return;
    }
    onDataChange([...(data || []), item.id]);
  };

  const userSelected = members?.data
    ?.filter((item) => data?.includes(item.id))
    .map((item) => item.name);

  return (
    <InputWithSearchUser
      size="sm"
      radius="sm"
      fullWidth
      placeholder="Search people"
      Component={
        <Input size="sm" radius="sm" value={userSelected?.join(", ")} />
      }
      onItemClick={handleItemClick}
      data={members?.data}
      onChange={(e) => setKeyword(e.target.value)}
      selectedItem={data}
    />
  );
};

const AdvanceFilterDate = (props: FilterItemProps) => {
  const { data, onDataChange } = props;

  const options = useMemo(
    () => [
      {
        title: "Before today",
        value: dayjs().subtract(1, "day").toDate().toLocaleString(),
      },
      {
        title: "Today",
        value: dayjs().toDate().toLocaleString(),
      },
      {
        title: "Tomorrow",
        value: dayjs().add(1, "day").toDate().toLocaleString(),
      },
      {
        title: "This week",
        value: dayjs().weekday(7).toDate().toLocaleString(),
      },
      {
        title: "Next week",
        value: dayjs().weekday(14).toDate().toLocaleString(),
      },
      {
        title: "Next 14 days",
        value: dayjs().add(14, "day").toDate().toLocaleString(),
      },
    ],
    []
  );

  const selected = typeof data === "string" ? [data] : data;
  return (
    <Select
      size={"sm"}
      labelPlacement="outside"
      selectedKeys={new Set(selected)}
      onChange={(e) => onDataChange(e.target.value)}
    >
      {options.map((value) => (
        <SelectItem
          key={value.value}
          value={value.value}
          textValue={value.title}
        >
          {value.title}
        </SelectItem>
      ))}
    </Select>
  );
};
