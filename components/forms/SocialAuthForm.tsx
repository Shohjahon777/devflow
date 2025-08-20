"use client"

import Image from "next/image";
import { signIn } from "next-auth/react";
import React from "react";
import { Toaster, toast } from "sonner"; // ✅ import both

import ROUTES from "@/constants/routes";

import { Button } from "../ui/button";


const SocialAuthForm = () => {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5 cursor-pointer";

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
          callbackUrl: ROUTES.HOME
      })
    } catch (error) {
      console.log(error);

      toast.error("Sign-in failed", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during sign-in",
      });
    }
  };

  return (
    <>
      {/* ✅ Toaster must be rendered once, usually in RootLayout or at the top-level */}
      <Toaster richColors position="top-center" />

      <div className="mt-10 flex flex-wrap gap-2.5">
        <Button onClick={() => handleSignIn("github")} className={buttonClass}>
          <Image
            src={"/icons/github.svg"}
            alt="Github Logo"
            width={20}
            height={20}
            className="invert-colors mr-2.5 object-contain"
          />
          <span>Log in with GitHub</span>
        </Button>

        <Button onClick={() => handleSignIn("google")} className={buttonClass}>
          <Image
            src={"/icons/google.svg"}
            alt="Google Logo"
            width={20}
            height={20}
            className="mr-2.5 object-contain"
          />
          <span>Log in with Google</span>
        </Button>
      </div>
    </>
  );
};

export default SocialAuthForm;
