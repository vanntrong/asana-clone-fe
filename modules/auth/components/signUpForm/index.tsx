"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  SignUpSchema,
  signUpSchema,
} from "@/modules/auth/schemas/signUpSchema";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";

interface SignUpFormProps {
  onSubmit: (payload: SignUpSchema) => void;
  isLoading?: boolean;
}

const SignUpForm: FC<SignUpFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);

  const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-4">
        <Input
          placeholder="Name"
          label="Name"
          labelPlacement="outside"
          radius="sm"
          variant="bordered"
          fullWidth
          errorMessage={errors.name?.message}
          {...register("name")}
        />
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
        <Input
          placeholder="Password"
          label="Password"
          labelPlacement="outside"
          radius="sm"
          variant="bordered"
          fullWidth
          errorMessage={errors.password?.message}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisiblePassword ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisiblePassword ? "text" : "password"}
          {...register("password")}
        />
      </div>

      <Button
        className="mt-4"
        fullWidth
        radius="sm"
        color="primary"
        type="submit"
        isLoading={isLoading}
      >
        <span>Continue</span>
      </Button>
    </form>
  );
};

export default SignUpForm;
