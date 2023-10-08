"use client";

import { Input } from "@nextui-org/input";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";

import { Logo, MenuIcon, SearchIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

import useQueryParams from "@/hooks/useQueryParams";
import ModalAddMembers from "@/modules/projects/components/modalAddMembers";
import ModalAddProject from "@/modules/projects/components/modalAddProject";
import { AddMembersData } from "@/modules/projects/schemas/addMembersSchema";
import useAddMembers from "@/modules/projects/services/useAddMembers";
import { useLayoutStore } from "@/stores/global";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateDropdown from "../createDropdown";
import MenuDropdown from "../menuDropdown";

interface NavbarProps {
  isAuth?: boolean;
}

const Navbar = ({ isAuth }: NavbarProps) => {
  const { toggleIsShowSidebar } = useLayoutStore((state) => state);
  const router = useRouter();
  const { searchParams } = useQueryParams();
  const projectId = searchParams.get("projectId");
  const [isShowAddProjectModal, setIsShowAddProjectModal] =
    useState<boolean>(false);

  const [isShowAddMemberModal, setIsShowAddMemberModal] =
    useState<boolean>(false);

  const { mutate: addMembers, isLoading: isAddingMembers } = useAddMembers({
    onSuccess() {
      setIsShowAddProjectModal(false);
    },
  });

  const handleAddMembers = (data: AddMembersData) => {
    if (!projectId) return;
    addMembers({ ...data, projectId });
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      radius="full"
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar
      maxWidth="full"
      position="sticky"
      className="bg-white dark:bg-dark-bg h-12"
      isBordered
    >
      {isAuth ? (
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <Link className="flex justify-start items-center gap-1" href="/">
              <Logo />
              <p className="font-bold text-inherit hidden sm:block">ASANA</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>
      ) : (
        <NavbarContent>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onClick={toggleIsShowSidebar}
          >
            <MenuIcon />
          </Button>
          <CreateDropdown
            onClickAddProject={() => setIsShowAddProjectModal(true)}
            onClickAddMembers={() => setIsShowAddMemberModal(true)}
          />
        </NavbarContent>
      )}

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {!isAuth && searchInput}

      {!isAuth && (
        <NavbarContent as="div" justify="end" className="basis-1 pl-4">
          <MenuDropdown />
        </NavbarContent>
      )}

      <NavbarMenu>
        {!isAuth && searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2"></div>
      </NavbarMenu>

      <ModalAddProject
        isOpen={isShowAddProjectModal}
        onOpenChange={(open) => setIsShowAddProjectModal(open)}
      />

      <ModalAddMembers
        isOpen={isShowAddMemberModal}
        onOpenChange={(open) => setIsShowAddMemberModal(open)}
        onSubmit={handleAddMembers}
        isLoading={isAddingMembers}
        projectId={projectId as string}
      />
    </NextUINavbar>
  );
};

export default Navbar;
