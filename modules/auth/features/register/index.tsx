"use client";

import { PATHS } from "@/configs/path";
import { Divider } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import SignUpForm from "@/modules/auth/components/signUpForm";
import { useRouter, useSearchParams } from "next/navigation";
import useSignUp from "../../services/useSignUp";
import { TokenName, setToken } from "@/utils/token";

const Register = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const nextUrl = searchParams.get("nextUrl") || PATHS.HOME;

  const { mutate: signUp, isLoading: isSignUpLoading } = useSignUp({
    onSuccess: (d) => {
      const { access_token, refresh_token } = d.data;
      setToken(TokenName.ACCESS_TOKEN, access_token);
      setToken(TokenName.REFRESH_TOKEN, refresh_token);
      router.push(nextUrl);
    },
  });

  return (
    <section>
      <div className="flex flex-col justify-center items-center h-full mt-16">
        <h1 className="text-2xl font-bold text-center">Welcome to Asana</h1>
        <p className="text-center text-slate-500 text-base mt-2">
          To get started, please sign up
        </p>
        <div className="flex flex-col items-center justify-center mt-6 max-w-[350px] mx-auto w-full">
          <SignUpForm onSubmit={signUp} isLoading={isSignUpLoading} />

          <Divider className="my-4" />

          <p className="text-center text-slate-500 text-sm">
            Already have an account?{" "}
            <Link
              href={`${PATHS.LOGIN}?nextUrl=${nextUrl}`}
              className="w-full mt-2 text-primary hover:underline"
            >
              <span>Sign In</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
