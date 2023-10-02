"use client";

import { queryClient } from "@/app/providers";
import Sidebar from "@/components/sidebar";
import useQueryParams from "@/hooks/useQueryParams";
import AddBoard from "@/modules/home/components/addBoard";
import Board from "@/modules/home/components/board";
import ProjectHeader from "@/modules/home/components/projectHeader";
import ProjectSort from "@/modules/home/components/projectSort";
import { queryKey } from "@/modules/projects/services/key";
import useCreateSection from "@/modules/projects/services/useCreateSection";
import useGetSections from "@/modules/projects/services/useGetSections";
import { queryKey as taskKey } from "@/modules/tasks/services/key";
import useCreateTask from "@/modules/tasks/services/useCreateTask";
import useGetTasks from "@/modules/tasks/services/useGetTasks";
import { Divider } from "@nextui-org/divider";
import { useMemo, useState } from "react";
import TaskDetailDrawer from "../../components/taskDetailDrawer";
import { useHomeStore } from "../../stores";
import useUpdateTask from "@/modules/tasks/services/useUpdateTask";
import { UpdateTaskPayload } from "@/modules/tasks/schemas/updateTaskSchema";
import useUpdateSection from "@/modules/projects/services/useUpdateSection";
import { GetSectionsResponse } from "@/apis/sections/getSections";
import { DragDropContext } from "react-beautiful-dnd";

const HomePage = () => {
  const { searchParams } = useQueryParams();
  const projectId = searchParams.get("projectId");
  const { data: sections } = useGetSections(
    { project_id: projectId },
    {
      enabled: !!projectId,
    }
  );
  const tasks = useGetTasks(
    sections?.data.map((section) => ({
      section_id: section.id,
      project_id: projectId || "",
    }))
  );
  const { mutate: createSection } = useCreateSection({
    onSuccess: () => {
      const key = queryKey.getSections({ project_id: projectId });
      queryClient.invalidateQueries(key);
    },
  });

  const { mutate: updateSection } = useUpdateSection({
    onSuccess: (data) => {
      const key = queryKey.getSections({ project_id: projectId });
      queryClient.setQueryData(key, (old?: GetSectionsResponse) => {
        if (!old) return old;

        old.data = old.data.map((section) =>
          section.id !== data.data.id ? section : data.data
        );

        return {
          ...old,
          data: [...old.data],
        };
      });
    },
  });

  const { mutate: createTask } = useCreateTask({
    onSuccess(_, variables) {
      const key = taskKey.getTasks({
        project_id: variables.project_id,
        section_id: variables.section_id,
      });
      queryClient.invalidateQueries(key);
    },
  });

  const { mutate: updateTask } = useUpdateTask({
    onSuccess: () => {
      if (!projectId || !selectedTask) return;
      const key = taskKey.getTasks({
        project_id: projectId,
        section_id: selectedTask.section_id,
      });
      queryClient.invalidateQueries(key);
    },
  });

  const { selectedTask, setSelectedTask } = useHomeStore();

  const sectionsData = useMemo(() => {
    return sections?.data.map((section, index) => {
      const taskList = tasks?.[index]?.data?.data;
      return {
        ...section,
        tasks: taskList || [],
      };
    });
  }, [sections, tasks]);

  const handleSubmit = (name: string) => {
    if (!projectId) return;
    createSection({ name, project_id: projectId });
  };

  const handleUpdateTask = (data: UpdateTaskPayload) => {
    if (!selectedTask) return;

    updateTask({ id: selectedTask.id, data });
  };

  return (
    <section className="flex">
      <Sidebar />
      <div className="pt-2 lg:pt-4 w-full overflow-hidden flex flex-col h-[calc(100vh-48px)]">
        <ProjectHeader />
        <Divider className="my-2" />
        <ProjectSort />
        <Divider className="mt-2" />
        <div className="px-4 min-h-0 flex gap-x-4 relative h-full">
          <DragDropContext
            onDragEnd={(result) => {
              console.log(result);
            }}
          >
            {sectionsData?.map((section) => (
              <div key={section.id} className="mt-2">
                <Board
                  key={section.id}
                  section={section}
                  projectId={projectId || ""}
                  onCreateTask={createTask}
                  onUpdateBoard={updateSection}
                />
              </div>
            ))}
          </DragDropContext>
          <div className="mt-2">
            <AddBoard onSubmit={handleSubmit} />
          </div>
          <TaskDetailDrawer
            isOpen={!!selectedTask}
            onClose={() => setSelectedTask(null)}
            task={selectedTask}
            onSubmit={handleUpdateTask}
          />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
