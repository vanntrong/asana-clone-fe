"use client";

import { GoogleIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import LoginForm from "@/modules/auth/components/loginForm";
import { useState } from "react";
import LoginPasswordForm from "@/modules/auth/components/loginPasswordForm";
import UserData from "../../components/userData";

const LoginPage = () => {
  const [email, setEmail] = useState<string | null>();

  return (
    <section>
      <div className="flex flex-col justify-center items-center h-full mt-16">
        <h1 className="text-2xl font-bold text-center">Welcome to Asana</h1>
        <p className="text-center text-slate-500 text-base mt-2">
          To get started, please sign in
        </p>
        <div className="flex flex-col items-center justify-center mt-6 max-w-[350px] mx-auto w-full">
          {email ? (
            <UserData email={email} onClear={() => setEmail(null)} />
          ) : (
            <Button
              variant="bordered"
              startContent={<GoogleIcon />}
              fullWidth
              radius="sm"
            >
              <span>Continue with Google</span>
            </Button>
          )}

          <Divider className="my-4" />

          {email ? (
            <LoginPasswordForm />
          ) : (
            <LoginForm onSubmit={(email) => setEmail(email)} />
          )}
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
