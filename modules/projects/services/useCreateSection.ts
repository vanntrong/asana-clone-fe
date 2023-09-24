import React from "react";
import { queryKey } from "./key";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import {
  CreateSectionPayload,
  createSectionApi,
} from "@/apis/sections/createSection";
import { AxiosError } from "axios";

const useCreateSection = (
  options?: UseMutationOptions<any, AxiosError, CreateSectionPayload>
) => {
  const key = queryKey.createSection();

  return useMutation<any, AxiosError, CreateSectionPayload>(
    key,
    (payload: CreateSectionPayload) => createSectionApi(payload),
    options
  );
};

export default useCreateSection;
