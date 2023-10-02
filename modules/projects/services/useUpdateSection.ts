import {
  UpdateSectionPayload,
  updateSectionApi,
} from "@/apis/sections/updateSection";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKey } from "./key";

const useUpdateSection = (
  options?: UseMutationOptions<any, AxiosError, UpdateSectionPayload>
) => {
  const key = queryKey.updateSection();

  return useMutation<any, AxiosError, UpdateSectionPayload>(
    key,
    (payload: UpdateSectionPayload) => updateSectionApi(payload),
    options
  );
};

export default useUpdateSection;
