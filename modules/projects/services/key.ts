import { UseGetSectionsParams } from "./useGetSections";

export const queryKey = {
  myProjects: () => ["myProjects"],
  getSections: (params: UseGetSectionsParams) => ["sections", params],
};
