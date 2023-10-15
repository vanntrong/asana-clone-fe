"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React, { FC, useEffect } from "react";
import { SketchPicker } from "react-color";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateTag from "@/modules/tags/services/useCreateTag";
import { AddTagSchema, addTagSchema } from "@/modules/tags/validations/addTag";

interface ModalAddTagProps {
  projectId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModalAddTag: FC<ModalAddTagProps> = ({
  projectId,
  isOpen,
  onOpenChange,
}) => {
  const { mutate } = useCreateTag();

  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddTagSchema>({
    resolver: zodResolver(addTagSchema),
    defaultValues: {
      name: "",
      color: "#ffffff",
      project_id: projectId,
    },
  });
  const color = watch("color");

  useEffect(() => {
    setValue("project_id", projectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const onSubmit = (data: AddTagSchema) => {
    mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add new tag
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Name"
                placeholder="Enter tag name"
                variant="flat"
                radius="sm"
                size="sm"
                isRequired
                {...register("name")}
                errorMessage={errors.name?.message}
              />

              <Popover placement="right">
                <PopoverTrigger className="justify-start">
                  <Input
                    autoFocus
                    label="Color"
                    placeholder="Select color"
                    variant="flat"
                    radius="sm"
                    size="sm"
                    isRequired
                    value={color}
                    classNames={{
                      input: "text-left",
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <Controller
                    name="color"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <SketchPicker
                        color={value}
                        onChange={(color) => onChange?.(color.hex)}
                      />
                    )}
                  />
                </PopoverContent>
              </Popover>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={onClose}>
                Close
              </Button>
              <Button color="primary" onClick={handleSubmit(onSubmit)}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalAddTag;
