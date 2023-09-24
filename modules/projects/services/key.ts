import { GetSectionsParams } from "@/apis/sections/getSections";

export const queryKey = {
  myProjects: () => ["myProjects"],
  getSections: (params: GetSectionsParams) => ["sections", params],
  createSection: () => ["createSection"],
};
