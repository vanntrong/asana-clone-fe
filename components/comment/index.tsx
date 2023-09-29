import { Avatar } from "@nextui-org/react";
import React from "react";

const Comment = () => {
  return (
    <div className="flex items-start gap-x-2">
      <Avatar size="sm" className="shrink-0" />
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <h3 className="font-medium">Vo Van Trong</h3>
          <span className="text-xs dark:text-gray-300">7 minutes ago</span>
        </div>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
          illo velit? Enim ea sapiente, harum sint officiis aliquam possimus ad
          blanditiis qui rem, eveniet dicta repellendus quas. Ex, exercitationem
          molestias.
        </p>
      </div>
    </div>
  );
};

export default Comment;
