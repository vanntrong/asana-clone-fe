"use client";

import { useProjectsStore } from "@/modules/projects/store";
import { useLayoutStore } from "@/stores/global";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import clsx from "clsx";

const Sidebar = () => {
  const { isShowSidebar } = useLayoutStore((state) => state);
  const { projects } = useProjectsStore();

  return (
    <div
      className={clsx(
        "transition-all overflow-hidden bg-white dark:bg-dark-bg h-[calc(100vh-48px)]",
        {
          "w-60 px-6 pt-2": isShowSidebar,
          "w-0": !isShowSidebar,
        }
      )}
    >
      <Listbox
        variant="flat"
        aria-label="Listbox menu with descriptions"
        selectedKeys={["home"]}
      >
        <ListboxSection showDivider>
          <ListboxItem
            key="home"

            // startContent={<AddNoteIcon className={iconClasses} />}
          >
            Home
          </ListboxItem>
          <ListboxItem
            key="my-tasks"
            // startContent={<CopyDocumentIcon className={iconClasses} />}
          >
            My tasks
          </ListboxItem>
          <ListboxItem
            key="inbox"
            // startContent={<EditDocumentIcon className={iconClasses} />}
          >
            Inbox
          </ListboxItem>
        </ListboxSection>

        <ListboxSection title="Projects">
          {projects.map((project) => (
            <ListboxItem key={project.id}>{project.name}</ListboxItem>
          ))}
        </ListboxSection>
      </Listbox>
    </div>
  );
};

export default Sidebar;
