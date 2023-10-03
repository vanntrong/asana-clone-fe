import InlineInput from "@/components/inlineInput";
import { Project } from "@/modules/projects/types";
import { Avatar } from "@nextui-org/avatar";
import React, { FC } from "react";

interface ProjectHeaderProps {
  project?: Project;
}

const ProjectHeader: FC<ProjectHeaderProps> = ({ project }) => {
  return (
    <div className="flex items-stretch gap-2 px-6">
      <Avatar
        radius="sm"
        size="lg"
        src={project?.avatar}
        name={project?.name}
      />

      <div className="ml-2">
        <h1 className="text-2xl mb-0 font-medium uppercase leading-none">
          {project?.name}
        </h1>
      </div>
    </div>
  );
};

export default ProjectHeader;
