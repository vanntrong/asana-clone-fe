"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  loginEmailSchema,
  LoginEmailSchema,
} from "@/modules/auth/schemas/loginSchema";

// fill replace with user data
interface LoginFormProps {
  onSubmit?: (email: string) => void;
}

const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginEmailSchema>({
    resolver: zodResolver(loginEmailSchema),
  });

  const onSubmitForm = (data: LoginEmailSchema) => {
    console.log(data);
    onSubmit?.(data.email);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmitForm)}>
      <Input
        placeholder="Email"
        label="Email address"
        labelPlacement="outside"
        radius="sm"
        variant="bordered"
        fullWidth
        errorMessage={errors.email?.message}
        {...register("email")}
      />

      <Button
        className="mt-4"
        fullWidth
        radius="sm"
        color="primary"
        type="submit"
      >
        <span>Continue</span>
      </Button>
    </form>
  );
};

export default LoginForm;
