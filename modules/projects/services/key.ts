import { GetProjectMembersParams } from "@/apis/projects/getProjectMembers";
import { GetSectionsParams } from "@/apis/sections/getSections";

export const queryKey = {
  myProjects: () => ["myProjects"],
  getSections: (params: GetSectionsParams) => ["sections", params],
  createSection: () => ["createSection"],
  getProjectMembers: (params: GetProjectMembersParams) => [
    "projectMembers",
    params,
  ],
  updateSection: () => ["updateSection"],
  createProject: () => ["createProject"],
  addMembers: () => ["addMembers"],
  deleteSection: () => ["deleteSection"],
};
