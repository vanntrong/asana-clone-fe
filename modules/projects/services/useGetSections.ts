import {
  GetSectionsParams,
  GetSectionsResponse,
  getSectionsApi,
} from "@/apis/sections/getSections";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { queryKey } from "./key";

const useGetSections = (
  params: GetSectionsParams,
  options?: UseQueryOptions<GetSectionsResponse, AxiosError>
) => {
  const key = queryKey.getSections(params);

  return useQuery<GetSectionsResponse, AxiosError>(
    key,
    () => getSectionsApi(params),
    {
      enabled: !!params.project_id,
      ...options,
    }
  );
};

export default useGetSections;
