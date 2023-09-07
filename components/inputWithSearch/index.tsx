import { Button } from "@nextui-org/button";
import { Input, InputProps } from "@nextui-org/input";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Avatar, Divider } from "@nextui-org/react";

const InputWithSearch = (props: InputProps) => {
  return (
    <Popover placement="bottom-start" radius="sm">
      <PopoverTrigger>
        <Input {...props} />
      </PopoverTrigger>

      <PopoverContent className="w-96 py-3">
        <Input {...props} />
        <Divider className="my-4" />
        <Button fullWidth>
          <div className="flex items-center gap-2">
            <Avatar
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
            <span className="text-sm">Vo Van Trong</span>
            <span className="text-xs dark:text-gray-400 text-black">
              vovantrong@nexondv.com
            </span>
          </div>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default InputWithSearch;
