import { Input, InputProps } from "@nextui-org/input";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Divider } from "@nextui-org/react";

export interface InputWithSearchProps<T> extends InputProps {
  Component?: React.ReactNode;
  data?: T[];
  renderItem?: (item: T) => React.ReactNode;
}

const InputWithSearch = <T,>({
  data,
  renderItem,
  ...props
}: InputWithSearchProps<T>) => {
  return (
    <Popover placement="bottom-start" radius="sm">
      <PopoverTrigger>
        {props.Component ? props.Component : <Input {...props} />}
      </PopoverTrigger>

      <PopoverContent className="w-96 py-3">
        <Input {...props} />
        <Divider className="my-4" />
        <div className="flex flex-col gap-y-2 w-full">
          {data?.map((item) => renderItem?.(item))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default InputWithSearch;
