"use client";

import Sidebar from "@/components/sidebar";
import ProjectHeader from "@/modules/home/components/projectHeader";
import ProjectSort from "@/modules/home/components/projectSort";
import { Divider } from "@nextui-org/divider";
import Board from "@/modules/home/components/board";
import AddBoard from "@/modules/home/components/addBoard";
import useGetSections from "@/modules/projects/services/useGetSections";
import { useSearchParams } from "next/navigation";
import useQueryParams from "@/hooks/useQueryParams";
import useCreateSection from "@/modules/projects/services/useCreateSection";
import { queryClient } from "@/app/providers";
import { queryKey } from "@/modules/projects/services/key";

const HomePage = () => {
  const { searchParams } = useQueryParams();
  const projectId = searchParams.get("projectId");
  const { data: sections } = useGetSections(
    { project_id: projectId },
    {
      enabled: !!projectId,
    }
  );
  const { mutate: createSection } = useCreateSection({
    onSuccess: () => {
      const key = queryKey.getSections({ project_id: projectId });
      queryClient.invalidateQueries(key);
    },
  });

  const handleSubmit = (name: string) => {
    if (!projectId) return;
    createSection({ name, project_id: projectId });
  };

  return (
    <section className="flex">
      <Sidebar />
      <div className="pt-2 lg:pt-4 w-full flex flex-col h-[calc(100vh-48px)]">
        <ProjectHeader />
        <Divider className="my-2" />
        <ProjectSort />
        <Divider className="my-2" />
        <div className="px-4 min-h-0 flex gap-x-4">
          {sections?.data.sections.map((section) => (
            <Board key={section.id} section={section} />
          ))}
          <AddBoard onSubmit={handleSubmit} />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
