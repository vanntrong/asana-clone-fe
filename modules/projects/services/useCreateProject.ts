import React from "react";
import { queryKey } from "./key";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { CreateProjectPayload } from "../schemas/createProjectSchema";
import { createProjectApi } from "@/apis/projects/createProject";
import { Response } from "@/types";
import { Project } from "../types";
import { AxiosError } from "axios";

const useCreateProject = (
  options?: UseMutationOptions<
    Response<Project>,
    AxiosError,
    CreateProjectPayload
  >
) => {
  const key = queryKey.createProject();

  return useMutation<Response<Project>, AxiosError, CreateProjectPayload>(
    key,
    (payload: CreateProjectPayload) => createProjectApi(payload),
    options
  );
};

export default useCreateProject;
