"use client";

import { Input } from "@nextui-org/input";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";

import { Logo, MenuIcon, PlusIcon, SearchIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

import { Button } from "@nextui-org/button";
import MenuDropdown from "../menuDropdown";
import Link from "next/link";
import CreateDropdown from "../createDropdown";
import { useLayoutStore } from "@/stores/global";

interface NavbarProps {
  isAuth?: boolean;
}

const Navbar = ({ isAuth }: NavbarProps) => {
  const { toggleIsShowSidebar } = useLayoutStore((state) => state);

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
          <CreateDropdown />
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

      {searchInput}

      <NavbarContent as="div" justify="end" className="basis-1 pl-4">
        <MenuDropdown />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2"></div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

export default Navbar;
