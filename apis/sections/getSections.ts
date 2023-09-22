import { Section } from "@/modules/projects/types";
import { axiosInstance } from "@/utils/axios";
import axios from "axios";

export interface GetSectionsParams {
  project_id: string | null;
}

export type GetSectionsResponse = {
  sections: Array<Section>;
};

export const getSectionsApi = (params: GetSectionsParams) =>
  axios.get<GetSectionsResponse>("/sections", {
    params,
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  });
