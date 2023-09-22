import React from "react";
import { queryKey } from "./key";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axios";
import { Project } from "../types";
import { AxiosError, AxiosResponse } from "axios";

type GetMyProjectsResponse = {
  projects: Array<Project>;
};

const useGetMyProjects = (
  options?: UseQueryOptions<AxiosResponse<GetMyProjectsResponse>, AxiosError>
) => {
  const key = queryKey.myProjects();

  return useQuery<AxiosResponse<GetMyProjectsResponse>, AxiosError>(
    key,
    () => axiosInstance.get<GetMyProjectsResponse>("/projects/me"),
    options
  );
};

export default useGetMyProjects;
