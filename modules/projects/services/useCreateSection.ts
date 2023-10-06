import {
  CreateSectionPayload,
  createSectionApi,
} from "@/apis/sections/createSection";
import { queryClient } from "@/app/providers";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKey } from "./key";

const useCreateSection = (
  options?: UseMutationOptions<any, AxiosError, CreateSectionPayload>
) => {
  const key = queryKey.createSection();

  return useMutation<any, AxiosError, CreateSectionPayload>(
    key,
    (payload: CreateSectionPayload) => createSectionApi(payload),
    {
      onSuccess: (_, variable) => {
        const key = queryKey.getSections({ project_id: variable.project_id });
        queryClient.invalidateQueries(key);
      },
      ...options,
    }
  );
};

export default useCreateSection;
