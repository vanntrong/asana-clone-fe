"use client";

import { GetTasksParams } from "@/apis/tasks/getTasks";
import { queryClient } from "@/app/providers";
import Sidebar from "@/components/sidebar";
import useQueryParams from "@/hooks/useQueryParams";
import AddBoard from "@/modules/home/components/addBoard";
import Board from "@/modules/home/components/board";
import NoProject from "@/modules/home/components/noProject";
import ProjectHeader from "@/modules/home/components/projectHeader";
import ProjectSort from "@/modules/home/components/projectSort";
import TaskDetailDrawer from "@/modules/home/components/taskDetailDrawer";
import { useHomeStore } from "@/modules/home/stores";
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
import { toBoolean } from "@/utils/converter";
import { Divider } from "@nextui-org/divider";
import { useCallback, useMemo } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { FilterParamKeys } from "../../types/homeType";
import useGetProjectMembers from "@/modules/projects/services/useGetProjectMembers";

const HomePage = () => {
  const { searchParams } = useQueryParams();
  const project_id = searchParams.get(FilterParamKeys.PROJECT_ID);
  const assignee_ids = searchParams.getAll("assignee_ids");
  const is_done = searchParams.get("is_done");
  const due_date = searchParams.get("due_date");

  const query = useMemo(() => {
    return {
      project_id: project_id || "",
      assignee_ids: assignee_ids,
      is_done: is_done ? toBoolean(is_done) : undefined,
      due_date: due_date ? due_date : undefined,
    };
  }, [project_id, assignee_ids, is_done, due_date]);

  const { projects } = useProjectsStore();

  const currentProject = useMemo(
    () => projects.find((project) => project.id === project_id),
    [projects, project_id]
  );

  const { data: members } = useGetProjectMembers(
    {
      id: project_id || "",
    },
    {
      enabled: !!project_id,
    }
  );

  const { data: sections } = useGetSections(
    { project_id: project_id },
    {
      enabled: !!project_id,
    }
  );

  const tasks = useGetTasks(
    sections?.data.map((section) => ({
      ...query,
      section_id: section.id,
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
    if (!project_id) return;
    createSection({ name, project_id: project_id });
  };

  const handleUpdateTask = (data: UpdateTaskPayload) => {
    if (!selectedTask) return;

    updateTask({ id: selectedTask.id, data });
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || !project_id) return;

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
      if (!sourceSection || !project_id) return;

      const newTasks = [...sourceSection.tasks];
      const [removed] = newTasks.splice(sourceIndex, 1);
      newTasks.splice(descIndex, 0, removed);
      const key = taskKey.getTasks({
        ...query,
        project_id: project_id,
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
        project_id: project_id,
        tasks: newTasks.map((task) => task.id),
      });
    },
    [project_id, sectionsData, updateOrderTask, query]
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
      if (!sourceSection || !descSection || !project_id) return;

      const newSourceTasks = [...sourceSection.tasks];
      const newDescTasks = [...descSection.tasks];
      const [removed] = newSourceTasks.splice(sourceIndex, 1);
      newDescTasks.splice(descIndex, 0, removed);

      const sourceKey = taskKey.getTasks({
        ...query,
        project_id: project_id,
        section_id: sourceSection.id,
      });
      const descKey = taskKey.getTasks({
        ...query,
        project_id: project_id,
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
        project_id: project_id,
        tasks: newSourceTasks.map((task) => task.id),
      });
      updateOrderTask({
        section_id: descSection.id,
        project_id: project_id,
        tasks: newDescTasks.map((task) => task.id),
      });
    },
    [project_id, sectionsData, updateOrderTask, query]
  );

  return (
    <section className="flex">
      <Sidebar />
      <div className="pt-2 lg:pt-4 w-full overflow-hidden flex flex-col h-[calc(100vh-48px)]">
        {currentProject ? (
          <>
            <ProjectHeader project={currentProject} members={members} />
            <Divider className="my-2" />
            <ProjectSort />
            <Divider className="mt-2" />
            <div className="px-4 min-h-0 flex gap-x-4 relative h-full overflow-x-auto custom-scrollbar">
              <DragDropContext onDragEnd={onDragEnd}>
                {sectionsData?.map((section) => (
                  <div key={section.id} className="mt-2">
                    <Board
                      key={section.id}
                      section={section}
                      project_id={project_id || ""}
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
          </>
        ) : (
          <NoProject />
        )}
      </div>
    </section>
  );
};

export default HomePage;
