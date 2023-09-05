"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { PlusIcon } from "../icons";

const CreateDropdown = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly radius="full" size="sm">
          <PlusIcon className="text-black dark:text-white" size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="task">Task</DropdownItem>
        <DropdownItem key="project">Project</DropdownItem>
        <DropdownItem key="invite" className="text-primary" color="primary">
          Invite
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default CreateDropdown;
