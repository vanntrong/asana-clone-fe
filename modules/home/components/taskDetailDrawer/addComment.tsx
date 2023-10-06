"use client";

import {
  CreateCommentData,
  createCommentSchema,
} from "@/modules/comments/schemas/createCommentSchema";
import { formatCommentContent } from "@/utils/string";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/react";
import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddCommentProps {
  taskId?: string;
  onSubmit: (data: CreateCommentData) => void;
}

const AddComment: FC<AddCommentProps> = ({ taskId, onSubmit: _onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CreateCommentData>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      task_id: taskId,
    },
  });

  useEffect(() => {
    if (taskId) {
      setValue("task_id", taskId);
    }
  }, [setValue, taskId]);

  const onSubmit = handleSubmit((data) => {
    if (!data.task_id) return;
    data.content = formatCommentContent(data.content);
    _onSubmit(data);
    reset({
      task_id: taskId,
      content: "",
    });
  });

  return (
    <div className="flex-1">
      <Textarea
        placeholder="Add a comment"
        radius="sm"
        label={null}
        className="h-full hover:bg-inherit"
        {...register("content")}
        errorMessage={errors.content?.message}
      />
      <div className="mt-2 flex justify-end">
        <Button color="primary" size="sm" radius="sm" onClick={onSubmit}>
          Add comment
        </Button>
      </div>
    </div>
  );
};

export default AddComment;
