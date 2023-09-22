import React from "react";
import { queryKey } from "./key";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axios";
import { Section } from "../types";
import { AxiosError, AxiosResponse } from "axios";
import {
  GetSectionsParams,
  GetSectionsResponse,
  getSectionsApi,
} from "@/apis/sections/getSections";

const useGetSections = (
  params: GetSectionsParams,
  options?: UseQueryOptions<AxiosResponse<GetSectionsResponse>, AxiosError>
) => {
  const key = queryKey.getSections(params);

  return useQuery<AxiosResponse<GetSectionsResponse>, AxiosError>(
    key,
    () => getSectionsApi(params),
    {
      enabled: !!params.project_id,
      ...options,
    }
  );
};

export default useGetSections;
