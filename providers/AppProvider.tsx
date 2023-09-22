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
      setUser(data.data.user);
    },
  });
  useGetMyProjects({
    enabled: isSuccess,
    onSuccess(data) {
      setProjects(data.data.projects);
      if (!currentProjectId) {
        setSearchParams({ projectId: data.data.projects[0].id });
      }
    },
  });

  return <>{children}</>;
};

export default AppProvider;
