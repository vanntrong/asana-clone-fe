import { getList } from "@/apis/tags/getList";
import { Response } from "@/types";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Tag } from "../types";
import { queryKey } from "./key";

const useGetTags = (
  projectId: string,
  options?: UseQueryOptions<Response<Tag[]>, AxiosError>
) => {
  const key = queryKey.getList(projectId);

  return useQuery<Response<Tag[]>, AxiosError>(
    key,
    () => getList(projectId),
    options
  );
};

export default useGetTags;
