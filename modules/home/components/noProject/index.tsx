"use client";

import ModalAddProject from "@/modules/projects/components/modalAddProject";
import { Button } from "@nextui-org/button";
import React, { FC, useState } from "react";

const NoProject: FC = () => {
  const [isShowAddProjectModal, setIsShowAddProjectModal] =
    useState<boolean>(false);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <h3>You don&apos;t have any project</h3>
        <Button
          radius="sm"
          color="primary"
          onClick={() => setIsShowAddProjectModal(true)}
        >
          Create a new project
        </Button>
      </div>
      <ModalAddProject
        isOpen={isShowAddProjectModal}
        onOpenChange={(open) => setIsShowAddProjectModal(open)}
      />
    </div>
  );
};

export default NoProject;
