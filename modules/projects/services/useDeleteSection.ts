import { deleteSectionApi } from "@/apis/sections/deleteSection";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKey } from "./key";

const useDeleteSection = (
  options?: UseMutationOptions<unknown, AxiosError, string>
) => {
  const key = queryKey.deleteSection();

  return useMutation(key, (id: string) => deleteSectionApi(id), options);
};

export default useDeleteSection;
