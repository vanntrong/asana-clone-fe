"use client";

import { GoogleIcon } from "@/components/icons";
import { PATHS } from "@/configs/path";
import LoginForm from "@/modules/auth/components/loginForm";
import LoginPasswordForm from "@/modules/auth/components/loginPasswordForm";
import UserData from "@/modules/auth/components/userData";
import useCheckEmail from "@/modules/auth/services/useCheckEmail";
import useLogin from "@/modules/auth/services/useLogin";
import { TokenName, setToken } from "@/utils/token";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { useRouter, useSearchParams } from "next/navigation";

const LoginPage = () => {
  const {
    data: checkEmailData,
    mutate: checkEmail,
    isLoading: isCheckEmailLoading,
  } = useCheckEmail();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { mutate: login, isLoading: isLoginLoading } = useLogin({
    onSuccess: (d) => {
      const {
        data: {
          token: { access_token, refresh_token },
        },
      } = d;
      setToken(TokenName.ACCESS_TOKEN, access_token);
      setToken(TokenName.REFRESH_TOKEN, refresh_token);
      router.push(searchParams.get("nextUrl") || PATHS.HOME);
    },
  });

  return (
    <section>
      <div className="flex flex-col justify-center items-center h-full mt-16">
        <h1 className="text-2xl font-bold text-center">Welcome to Asana</h1>
        <p className="text-center text-slate-500 text-base mt-2">
          To get started, please sign in
        </p>
        <div className="flex flex-col items-center justify-center mt-6 max-w-[350px] mx-auto w-full">
          {checkEmailData?.data ? (
            <UserData
              email={checkEmailData.data.info.email}
              onClear={() => {}}
            />
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

          {checkEmailData?.data ? (
            <LoginPasswordForm
              isLoading={isLoginLoading}
              onSubmit={(password) =>
                login({
                  email: checkEmailData.data.info.email,
                  password: password,
                })
              }
            />
          ) : (
            <LoginForm
              onSubmit={(email) => {
                checkEmail({ email });
              }}
              isLoading={isCheckEmailLoading}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
