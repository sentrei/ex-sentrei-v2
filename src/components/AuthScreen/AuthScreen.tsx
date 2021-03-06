import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {useEffect} from "react";

import {Props as AuthFormProps} from "@/components/AuthForm";
import ContainerCenter from "@/components/ContainerCenter";
import ContainerRoot from "@/components/ContainerRoot";
import HeaderRoot from "@/components/HeaderRoot";
import SeoApp from "@/components/SeoApp";
import useAuth from "@/hooks/useAuth";

const AuthForm = dynamic(() => import("@/components/AuthForm"), {ssr: false});
const OneTap = dynamic(() => import("@/components/OneTap"), {ssr: false});

export type Props = AuthFormProps;

export default function AuthScreen({type}: Props): JSX.Element {
  const {isLoggedIn} = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function pushDemo() {
      if (isLoggedIn) {
        await router.push("/dashboard");
      }
    }
    // eslint-disable-next-line no-void
    void pushDemo();
  }, [router, isLoggedIn]);

  return (
    <>
      <SeoApp
        title={
          // eslint-disable-next-line no-nested-ternary
          type === "login"
            ? "Login"
            : type === "signup"
            ? "Sign Up"
            : "Reset Password"
        }
      />
      <OneTap />
      <HeaderRoot />
      <ContainerRoot>
        <ContainerCenter>
          <AuthForm type={type} />
        </ContainerCenter>
      </ContainerRoot>
    </>
  );
}
