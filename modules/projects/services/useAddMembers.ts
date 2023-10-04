import { addMembersApi } from "@/apis/projects/addMembers";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AddMembersData } from "../schemas/addMembersSchema";
import { queryKey } from "./key";

const useAddMembers = (
  options?: UseMutationOptions<
    unknown,
    AxiosError,
    AddMembersData & { projectId: string }
  >
) => {
  const key = queryKey.addMembers();

  return useMutation<
    unknown,
    AxiosError,
    AddMembersData & { projectId: string }
  >(key, (payload) => addMembersApi(payload), options);
};

export default useAddMembers;
