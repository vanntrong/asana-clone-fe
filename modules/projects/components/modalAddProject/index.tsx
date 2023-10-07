"use client";

import { FC, useEffect } from "react";

import {
  CreateProjectPayload,
  createProjectSchema,
} from "@/modules/projects/schemas/createProjectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import AddProjectSelectUsers from "./addProjectSelectUsers";
import useCreateProject from "../../services/useCreateProject";
import { queryKey } from "../../services/key";
import { queryClient } from "@/app/providers";
import { useRouter } from "next/navigation";
import { PATHS } from "@/configs/path";

interface ModalAddProjectProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModalAddProject: FC<ModalAddProjectProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const router = useRouter();
  const { mutate: createProject, isLoading: isCreatingProject } =
    useCreateProject({
      onSuccess(data) {
        onOpenChange(false);
        const key = queryKey.myProjects();
        queryClient.invalidateQueries(key);
        router.push(`${PATHS.HOME}/?projectId=${data.data.id}`);
      },
    });
  const {
    register,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateProjectPayload>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      managers: [],
      members: [],
    },
  });

  const managers = watch("managers");
  const members = watch("members");

  useEffect(() => {
    setValue(
      "members",
      members.filter((item) => !managers.includes(item))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [managers, setValue]);

  const handelClose = () => {
    reset();
    onOpenChange(false);
  };

  const onSubmit = (data: CreateProjectPayload) => {
    createProject(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      onClose={handelClose}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add New Project
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Project Name"
                placeholder="Enter your project name"
                variant="flat"
                labelPlacement="outside"
                radius="sm"
                isRequired
                {...register("name")}
                errorMessage={errors.name?.message}
              />

              <Controller
                control={control}
                name="managers"
                render={({ field: { value, onChange } }) => (
                  <AddProjectSelectUsers
                    value={value}
                    onChange={onChange}
                    label="Managers"
                  />
                )}
              />

              <Controller
                control={control}
                name="members"
                render={({ field: { value, onChange } }) => (
                  <AddProjectSelectUsers
                    value={value}
                    onChange={onChange}
                    label="Members"
                    disabledItems={managers}
                  />
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={handelClose}>
                Close
              </Button>
              <Button
                color="primary"
                onClick={handleSubmit(onSubmit)}
                isLoading={isCreatingProject}
              >
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalAddProject;
