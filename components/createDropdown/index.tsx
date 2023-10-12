"use client";

import React, { FC } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { PlusIcon } from "../icons";

interface CreateDropdownProps {
  onClickAddProject: () => void;
  onClickAddMembers: () => void;
}

const CreateDropdown: FC<CreateDropdownProps> = ({
  onClickAddProject,
  onClickAddMembers,
}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly radius="full" size="sm">
          <PlusIcon className="text-black dark:text-white" size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="project" onClick={onClickAddProject}>
          Project
        </DropdownItem>
        <DropdownItem
          key="invite"
          className="text-primary"
          color="primary"
          onClick={onClickAddMembers}
        >
          Invite
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default CreateDropdown;
