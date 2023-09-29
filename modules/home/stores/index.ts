import { Task } from "@/modules/projects/types";
import { create } from "zustand";

export const useHomeStore = create<{
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
}>((set) => ({
  selectedTask: null,
  setSelectedTask: (task: Task | null) => set({ selectedTask: task }),
}));
