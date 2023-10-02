"use client";

import { DotsIcon, PlusIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import React, { FC } from "react";
import Task from "../task";
import InlineInput from "@/components/inlineInput";
import { Section } from "@/modules/projects/types";
import AddTask from "../addTask";
import { CreateTaskPayload } from "@/modules/tasks/schemas/createTaskSchema";
import { useHomeStore } from "@/modules/home/stores";
import { Draggable, Droppable } from "react-beautiful-dnd";
import clsx from "clsx";

interface BoardProps {
  section: Section;
  projectId: string;
  onCreateTask: (data: CreateTaskPayload) => void;
  onUpdateBoard: (data: Section) => void;
}

const Board: FC<BoardProps> = ({
  section,
  projectId,
  onCreateTask,
  onUpdateBoard,
}) => {
  const [title, setTitle] = React.useState(section.name);
  const { setSelectedTask } = useHomeStore();

  return (
    <div className="w-[300px] cursor-pointer border border-transparent px-2 rounded-lg transition-colors pb-1 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <InlineInput
          Title={<h3>{title}</h3>}
          size="sm"
          className="outline-none focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onConfirm={() => onUpdateBoard({ ...section, name: title })}
        />
        <div className="flex items-center gap-2">
          <Tooltip content="Add new task">
            <Button size="sm" variant="light" isIconOnly>
              <PlusIcon size={20} />
            </Button>
          </Tooltip>
          <Tooltip content="More actions">
            <Button size="sm" variant="light" isIconOnly>
              <DotsIcon size={20} />
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="h-auto grow overflow-y-auto mt-2 flex pr-2 custom-scrollbar">
        <div className="flex flex-col pb-5 h-max gap-4 w-full">
          <Droppable droppableId={section.id}>
            {(droppableProvided) => (
              <div
                className={clsx("flex flex-col pb-5 h-max gap-4 w-full")}
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
              >
                {section.tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(draggableProvided, snapshot) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <Task
                          task={task}
                          onSelect={setSelectedTask}
                          isDragging={snapshot.isDragging}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}

                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
          <AddTask
            sectionId={section.id}
            projectId={projectId}
            onSubmit={onCreateTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
