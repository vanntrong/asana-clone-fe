import { CloseIcon } from "@/components/icons";
import useDebounceValue from "@/hooks/useDebounceValue";
import useQueryParams from "@/hooks/useQueryParams";
import {
  AdvanceFilter,
  AdvanceFilterType,
  FilterItem,
  FilterParamKeys,
} from "@/modules/home/types/homeType";
import useGetProjectMembers from "@/modules/projects/services/useGetProjectMembers";
import { User } from "@/modules/users/types";
import { Button } from "@nextui-org/button";
import { Input, Select, SelectItem } from "@nextui-org/react";
import dayjs from "dayjs";
import { FC, useMemo, useState } from "react";
import InputWithSearchUser from "../inputWithSearchUser";
import {
  formatTimeToString,
  timeToEndOfDay,
  timeToStartOfDay,
} from "@/utils/time";

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
    [FilterItem.StartDate]: (
      <AdvanceFilterDate {...itemProps} type="start_date" />
    ),
    [FilterItem.DueDate]: <AdvanceFilterDate {...itemProps} type="due_date" />,
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
  const project_id = searchParams.get(FilterParamKeys.PROJECT_ID) || "";

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

const AdvanceFilterDate = (
  props: FilterItemProps & { type: "start_date" | "due_date" }
) => {
  const { data, onDataChange, type } = props;

  const options = useMemo(() => {
    const formatter = type === "start_date" ? timeToStartOfDay : timeToEndOfDay;

    return [
      {
        title: "Before today",
        value: formatTimeToString(
          formatter(dayjs().subtract(1, "day").toDate())
        ),
      },
      {
        title: "Today",
        value: formatTimeToString(formatter(dayjs().toDate())),
      },
      {
        title: "Tomorrow",
        value: formatTimeToString(formatter(dayjs().add(1, "day").toDate())),
      },
      {
        title: "This week",
        value: formatTimeToString(formatter(dayjs().weekday(7).toDate())),
      },
      {
        title: "Next week",
        value: formatTimeToString(formatter(dayjs().weekday(14).toDate())),
      },
      {
        title: "Next 14 days",
        value: formatTimeToString(formatter(dayjs().add(14, "day").toDate())),
      },
    ];
  }, [type]);

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
