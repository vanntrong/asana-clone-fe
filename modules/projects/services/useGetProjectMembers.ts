import {
  GetProjectMembersParams,
  GetProjectMembersResponse,
  getProjectMembersApi,
} from "@/apis/projects/getProjectMembers";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKey } from "./key";

const useGetProjectMembers = (
  params: GetProjectMembersParams,
  options?: UseQueryOptions<GetProjectMembersResponse, AxiosError>
) => {
  const key = queryKey.getProjectMembers(params);

  return useQuery<GetProjectMembersResponse, AxiosError>(
    key,
    () => getProjectMembersApi(params),
    options
  );
};

export default useGetProjectMembers;
