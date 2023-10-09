import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  AddMembersData,
  addMembersSchema,
} from "../../schemas/addMembersSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import AddProjectSelectUsers from "../modalAddProject/addProjectSelectUsers";

interface ModalAddMembersProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading?: boolean;
  onSubmit: (data: AddMembersData) => void;
  project_id: string;
}

const ModalAddMembers: FC<ModalAddMembersProps> = ({
  isOpen,
  onOpenChange,
  isLoading,
  onSubmit,
  project_id,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMembersData>({
    resolver: zodResolver(addMembersSchema),
    defaultValues: {
      members: [],
    },
  });
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Members
            </ModalHeader>
            <ModalBody>
              <Controller
                control={control}
                name="members"
                render={({ field: { value, onChange } }) => (
                  <AddProjectSelectUsers
                    value={value}
                    onChange={onChange}
                    label="Members"
                    excludeInProject={project_id}
                  />
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat">
                Close
              </Button>
              <Button
                color="primary"
                onClick={handleSubmit(onSubmit)}
                isLoading={isLoading}
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

export default ModalAddMembers;
