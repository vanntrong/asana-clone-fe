import { Section } from "@/modules/projects/types";
import { Response } from "@/types";
import { axiosInstance } from "@/utils/axios";

export interface GetSectionsParams {
  project_id: string | null;
}

export type GetSectionsResponse = Response<Array<Section>>;

export const getSectionsApi = (
  params: GetSectionsParams
): Promise<GetSectionsResponse> =>
  axiosInstance.get("/sections/", {
    params,
  });
