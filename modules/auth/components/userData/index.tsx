import { CloseIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/react";
import { FC } from "react";

interface UserDataProps {
  email: string;
  avatar?: string;
  onClear?: () => void;
}

const UserData: FC<UserDataProps> = ({ email, avatar, onClear }) => {
  return (
    <div className="w-full py-1 rounded bg-slate-50 flex items-center justify-center pr-2 relative dark:bg-slate-700">
      <div className="flex items-center space-x-2">
        <Avatar size="sm" src={avatar} />
        <span className="text-sm">{email}</span>
      </div>
      <CloseIcon
        width={10}
        height={10}
        onClick={onClear}
        className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default UserData;
