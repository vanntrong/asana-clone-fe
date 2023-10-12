"use client";

import { GetListUsersParams } from "@/apis/users/getListUser";
import useDebounceValue from "@/hooks/useDebounceValue";
import InputWithSearchUser from "@/modules/home/components/inputWithSearchUser";
import useGetListUser from "@/modules/users/services/useGetList";
import { User } from "@/modules/users/types";
import { Button } from "@nextui-org/button";
import { Chip, Spinner } from "@nextui-org/react";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";

interface AddProjectSelectUsersProps {
  value?: string[];
  onChange: (value: string[]) => void;
  label: string;
  disabledItems?: string[];
  excludeInProject?: string;
}

const AddProjectSelectUsers: FC<AddProjectSelectUsersProps> = ({
  value = [],
  onChange,
  label,
  excludeInProject,
  ...props
}) => {
  const [keyword, setKeyword] = useState<string>("");
  const keywordDebounce = useDebounceValue(keyword);

  const [params, setParams] = useState<GetListUsersParams>({
    page: 1,
    limit: 10,
    keyword: keywordDebounce,
    exclude_in_project: excludeInProject,
  });
  const { data } = useGetListUser(params);

  useEffect(() => {
    setParams((prev) => ({ ...prev, keyword: keywordDebounce }));
  }, [keywordDebounce]);
  const [usersSelected, setUsersSelected] = useState<User[]>([]);

  const handleItemClick = (item: User) => {
    if (value.includes(item.id)) {
      onChange(value.filter((id) => id !== item.id));
      setUsersSelected((prev) => prev.filter((user) => user.id !== item.id));
      return;
    }
    onChange([...value, item.id]);
    const user = data?.data.find((user) => user.id === item.id);
    if (user) setUsersSelected((prev) => [...prev, user]);
  };

  const users = data?.data?.filter((item) => value.includes(item.id));
  return (
    <>
      <label className="block text-small font-medium text-foreground pb-1 after:content-['*'] after:text-danger after:ml-0.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none">
        {label}
      </label>
      <InputWithSearchUser
        onItemClick={handleItemClick}
        onChange={(e) => setKeyword(e.target.value)}
        selectedItem={value}
        data={data?.data}
        Component={
          <Button
            radius="sm"
            variant="light"
            className="text-gray-300 dark:bg-[#27272A] dark:hover:bg-[#3F3F46] justify-start -mt-3"
          >
            <div className="flex flex-wrap gap-2">
              {usersSelected?.map((item) => (
                <Chip key={item.id}>{item.name}</Chip>
              ))}
            </div>
          </Button>
        }
        {...props}
      />
    </>
  );
};

export default AddProjectSelectUsers;
