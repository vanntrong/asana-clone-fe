import { GetProjectMembersResponse } from "@/apis/projects/getProjectMembers";
import InlineInput from "@/components/inlineInput";
import { Project } from "@/modules/projects/types";
import { User } from "@/modules/users/types";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Tooltip } from "@nextui-org/react";
import React, { FC } from "react";

interface ProjectHeaderProps {
  project?: Project;
  members?: GetProjectMembersResponse;
}

const ProjectHeader: FC<ProjectHeaderProps> = ({ project, members }) => {
  return (
    <div className="flex items-stretch gap-2 px-6">
      <Avatar
        radius="sm"
        size="lg"
        src={project?.avatar}
        name={project?.name}
      />

      <div className="ml-2 flex flex-col gap-y-1">
        <h1 className="text-2xl mb-0 font-medium uppercase leading-none">
          {project?.name}
        </h1>
        <AvatarGroup
          max={3}
          total={(members?.pagination.total || 3) - 3}
          size="sm"
          className="justify-start"
        >
          {members?.data?.map((member) => (
            <Tooltip key={member.id} content={member.name}>
              <Avatar src={member.avatar} name={member.name} size="sm" />
            </Tooltip>
          ))}
        </AvatarGroup>
      </div>
    </div>
  );
};

export default ProjectHeader;
