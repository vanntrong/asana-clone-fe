import { Response } from "@/types";
import { axiosInstance } from "@/utils/axios";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Project } from "../types";
import { queryKey } from "./key";

const useGetMyProjects = (
  options?: UseQueryOptions<Response<Array<Project>>, AxiosError>
) => {
  const key = queryKey.myProjects();

  return useQuery<Response<Array<Project>>, AxiosError>(
    key,
    () => axiosInstance.get("/projects/me"),
    options
  );
};

export default useGetMyProjects;
