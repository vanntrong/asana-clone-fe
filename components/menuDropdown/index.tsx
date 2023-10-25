"use client";

import {
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import React from "react";
import { ThemeSwitch } from "../theme-switch";
import { useAuthStore } from "@/stores/global";
import useLogout from "@/modules/auth/services/useLogout";

const MenuDropdown = () => {
  const { user } = useAuthStore();
  const { logout } = useLogout();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          className="transition-transform"
          color="secondary"
          name={user?.name}
          size="sm"
          src={user?.avatar}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem>
          <ThemeSwitch />
        </DropdownItem>
        {/* <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
        <DropdownItem key="logout" color="danger" onClick={logout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default MenuDropdown;
