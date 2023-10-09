"use client";

import { PATHS } from "@/configs/path";
import useQueryParams from "@/hooks/useQueryParams";
import { useProjectsStore } from "@/modules/projects/store";
import { useAuthStore, useLayoutStore } from "@/stores/global";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import clsx from "clsx";
import Link from "next/link";

const Sidebar = () => {
  const { isShowSidebar } = useLayoutStore((state) => state);
  const { projects } = useProjectsStore();
  const { searchParams, setSearchParams } = useQueryParams();
  const { user } = useAuthStore();

  const project_id = searchParams.get("project_id");

  const handleSelectMyTasks = () => {
    if (!user || !project_id) return;
    setSearchParams({
      project_id: project_id,
      assignee_ids: [user.id],
    });
  };

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
      <Listbox variant="flat" aria-label="Listbox menu with descriptions">
        <ListboxSection showDivider>
          <ListboxItem key="home">Home</ListboxItem>
          <ListboxItem key="my-tasks" onClick={handleSelectMyTasks}>
            My tasks
          </ListboxItem>
          <ListboxItem key="inbox">Inbox</ListboxItem>
        </ListboxSection>

        <ListboxSection title="Projects">
          {projects.map((project) => (
            <ListboxItem
              key={project.id}
              className={clsx({
                "bg-gray-200 dark:bg-gray-600": project_id === project.id,
              })}
            >
              <Link
                href={`${PATHS.HOME}/?project_id=${project.id}`}
                className={clsx("w-full h-full flex items-center")}
              >
                {project.name}
              </Link>
            </ListboxItem>
          ))}
        </ListboxSection>
      </Listbox>
    </div>
  );
};

export default Sidebar;
