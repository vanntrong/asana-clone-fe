"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  loginPasswordSchema,
  LoginPasswordSchema,
} from "@/modules/auth/schemas/loginSchema";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";

// fill replace with user data
interface LoginPasswordFormProps {
  onSubmit?: (password: string) => void;
  isLoading?: boolean;
}

const LoginPasswordForm: FC<LoginPasswordFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginPasswordSchema>({
    resolver: zodResolver(loginPasswordSchema),
  });
  const [isVisible, setIsVisible] = React.useState(false);

  const onSubmitForm = (data: LoginPasswordSchema) => {
    onSubmit?.(data.password);
  };

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmitForm)}>
      <Input
        placeholder="Password"
        labelPlacement="outside"
        radius="sm"
        label="Password"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-gray-300" />
            ) : (
              <EyeFilledIcon className="text-gray-300" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        variant="bordered"
        fullWidth
        errorMessage={errors.password?.message}
        {...register("password")}
      />

      <Button
        className="mt-4"
        fullWidth
        radius="sm"
        color="primary"
        type="submit"
        isLoading={isLoading}
      >
        <span>Login</span>
      </Button>
    </form>
  );
};

export default LoginPasswordForm;
