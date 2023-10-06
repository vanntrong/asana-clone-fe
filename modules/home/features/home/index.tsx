"use client";

import { GetSectionsResponse } from "@/apis/sections/getSections";
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
import useUpdateSection from "@/modules/projects/services/useUpdateSection";
import { useProjectsStore } from "@/modules/projects/store";
import { UpdateTaskPayload } from "@/modules/tasks/schemas/updateTaskSchema";
import { queryKey as taskKey } from "@/modules/tasks/services/key";
import useCreateTask from "@/modules/tasks/services/useCreateTask";
import useGetTasks from "@/modules/tasks/services/useGetTasks";
import useUpdateOrderTasks from "@/modules/tasks/services/useUpdateOrderTasks";
import useUpdateTask from "@/modules/tasks/services/useUpdateTask";
import { Divider } from "@nextui-org/divider";
import { useCallback, useMemo } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TaskDetailDrawer from "../../components/taskDetailDrawer";
import { useHomeStore } from "../../stores";

const HomePage = () => {
  const { searchParams } = useQueryParams();
  const projectId = searchParams.get("projectId");
  const { projects } = useProjectsStore();

  const currentProject = useMemo(
    () => projects.find((project) => project.id === projectId),
    [projects, projectId]
  );

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

  const { mutate: createSection } = useCreateSection();

  const { mutate: updateSection } = useUpdateSection();

  const { mutate: createTask } = useCreateTask();

  const { mutate: updateTask } = useUpdateTask();

  const { mutate: updateOrderTask } = useUpdateOrderTasks();

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

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || !projectId) return;

    if (source.droppableId === destination.droppableId) {
      handleDragSameSection(
        source.droppableId,
        source.index,
        destination.index
      );
      return;
    }
    handleDragDiffSection(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    );
  };

  const handleDragSameSection = useCallback(
    (sourceId: string, sourceIndex: number, descIndex: number) => {
      const sourceSection = sectionsData?.find(
        (section) => section.id === sourceId
      );
      if (!sourceSection || !projectId) return;

      const newTasks = [...sourceSection.tasks];
      const [removed] = newTasks.splice(sourceIndex, 1);
      newTasks.splice(descIndex, 0, removed);
      const key = taskKey.getTasks({
        project_id: projectId,
        section_id: sourceSection.id,
      });
      queryClient.setQueryData(key, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: [...newTasks],
        };
      });
      updateOrderTask({
        section_id: sourceSection.id,
        project_id: projectId,
        tasks: newTasks.map((task) => task.id),
      });
    },
    [projectId, sectionsData, updateOrderTask]
  );

  const handleDragDiffSection = useCallback(
    (
      sourceId: string,
      descId: string,
      sourceIndex: number,
      descIndex: number
    ) => {
      const sourceSection = sectionsData?.find(
        (section) => section.id === sourceId
      );
      const descSection = sectionsData?.find(
        (section) => section.id === descId
      );
      if (!sourceSection || !descSection || !projectId) return;

      const newSourceTasks = [...sourceSection.tasks];
      const newDescTasks = [...descSection.tasks];
      const [removed] = newSourceTasks.splice(sourceIndex, 1);
      newDescTasks.splice(descIndex, 0, removed);

      const sourceKey = taskKey.getTasks({
        project_id: projectId,
        section_id: sourceSection.id,
      });
      const descKey = taskKey.getTasks({
        project_id: projectId,
        section_id: descSection.id,
      });
      queryClient.setQueryData(sourceKey, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: [...newSourceTasks],
        };
      });
      queryClient.setQueryData(descKey, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: [...newDescTasks],
        };
      });
      updateOrderTask({
        section_id: sourceSection.id,
        project_id: projectId,
        tasks: newSourceTasks.map((task) => task.id),
      });
      updateOrderTask({
        section_id: descSection.id,
        project_id: projectId,
        tasks: newDescTasks.map((task) => task.id),
      });
    },
    [projectId, sectionsData, updateOrderTask]
  );

  return (
    <section className="flex">
      <Sidebar />
      <div className="pt-2 lg:pt-4 w-full overflow-hidden flex flex-col h-[calc(100vh-48px)]">
        <ProjectHeader project={currentProject} />
        <Divider className="my-2" />
        <ProjectSort />
        <Divider className="mt-2" />
        <div className="px-4 min-h-0 flex gap-x-4 relative h-full">
          <DragDropContext onDragEnd={onDragEnd}>
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
            onLikeClick={() => {
              if (!selectedTask) return;
              setSelectedTask({
                ...selectedTask,
                is_liked: !selectedTask.is_liked,
              });
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
