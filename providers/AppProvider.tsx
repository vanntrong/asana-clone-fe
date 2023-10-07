"use client";

import useQueryParams from "@/hooks/useQueryParams";
import useGetMyProjects from "@/modules/projects/services/useGetMyProjects";
import { useProjectsStore } from "@/modules/projects/store";
import useGetMe from "@/modules/users/services/useGetMe";
import { useAuthStore } from "@/stores/global";
import React from "react";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useAuthStore();
  const { setProjects } = useProjectsStore();
  const { searchParams, setSearchParams } = useQueryParams();
  const currentProjectId = searchParams.get("projectId");
  const { isSuccess } = useGetMe({
    onSuccess: (data) => {
      setUser(data.data);
    },
  });
  useGetMyProjects({
    enabled: isSuccess,
    onSuccess(data) {
      setProjects(data.data);
      if (currentProjectId || data.data.length === 0) {
        return;
      }
      setSearchParams({ projectId: data.data[0].id });
    },
  });

  return <>{children}</>;
};

export default AppProvider;
