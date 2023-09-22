import { create } from "zustand";
import { Project } from "../types";

export const useProjectsStore = create<{
  projects: Array<Project>;
  setProjects: (projects: Array<Project>) => void;
}>((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
}));
