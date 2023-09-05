import { Avatar } from "@nextui-org/avatar";
import React from "react";

const ProjectHeader = () => {
  return (
    <div className="flex items-stretch gap-2 px-6">
      <Avatar
        radius="sm"
        size="lg"
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
      />

      <div className="ml-2">
        <h1 className="text-2xl mb-0 font-medium uppercase leading-none">
          Trendi
        </h1>
      </div>
    </div>
  );
};

export default ProjectHeader;
