import React from "react";
import { queryKey } from "./key";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AddTagSchema } from "../validations/addTag";
import { createTagApi } from "@/apis/tags/createTag";
import { Response } from "@/types";
import { Tag } from "../types";
import { AxiosError } from "axios";
import { queryClient } from "@/app/providers";

const useCreateTag = (
  options?: UseMutationOptions<Response<Tag>, AxiosError, AddTagSchema>
) => {
  const key = queryKey.addTag();

  return useMutation<Response<Tag>, AxiosError, AddTagSchema>(
    key,
    (data: AddTagSchema) => createTagApi(data),
    {
      ...options,
      onSuccess(data, variables, context) {
        const key = queryKey.getList(variables.project_id);

        queryClient.invalidateQueries(key);
      },
    }
  );
};

export default useCreateTag;
