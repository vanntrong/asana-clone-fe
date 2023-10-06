import {
  UpdateSectionPayload,
  updateSectionApi,
} from "@/apis/sections/updateSection";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKey } from "./key";
import { queryClient } from "@/app/providers";
import { GetSectionsResponse } from "@/apis/sections/getSections";

const useUpdateSection = (
  options?: UseMutationOptions<any, AxiosError, UpdateSectionPayload>
) => {
  const key = queryKey.updateSection();

  return useMutation<any, AxiosError, UpdateSectionPayload>(
    key,
    (payload: UpdateSectionPayload) => updateSectionApi(payload),
    {
      onSuccess: (data, variable) => {
        const key = queryKey.getSections({ project_id: variable.project_id });
        queryClient.setQueryData(key, (old?: GetSectionsResponse) => {
          if (!old) return old;

          old.data = old.data.map((section) =>
            section.id !== data.data.id ? section : data.data
          );

          return {
            ...old,
            data: [...old.data],
          };
        });
      },
      ...options,
    }
  );
};

export default useUpdateSection;
