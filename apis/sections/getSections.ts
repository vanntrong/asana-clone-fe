import { Section } from "@/modules/projects/types";
import { axiosInstance } from "@/utils/axios";

export interface GetSectionsParams {
  project_id: string | null;
}

export type GetSectionsResponse = {
  sections: Array<Section>;
};

export const getSectionsApi = (params: GetSectionsParams) =>
  axiosInstance.get<GetSectionsResponse>("/sections/", {
    params,
  });
