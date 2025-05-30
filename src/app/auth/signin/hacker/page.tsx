// src/app/auth/signin/hacker/page.tsx
"use client";

import Image from "next/image";
import hacker from "../../../../../public/Landing/hacker.svg";
import emailIcon from "../../../../../public/signup/email.svg";
import passIcon from "../../../../../public/signup/pass.svg";
import Link from "next/link";
// import GoogleAuthButton from "../../comp/GoogleAuthButton";
import { useState, FormEvent } from "react";
import { Switch } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import BaseUrl from "@/components/BaseUrl";

interface SigninPayload {
  email: string;
  password: string;
}

interface SigninResponse {
  message: string;
  token: string;
}

interface ApiErrorResponse {
  message: string;
}

function classNames(
  ...classes: (string | boolean | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}

const HackerSigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const signinMutation = useMutation<SigninResponse, Error, SigninPayload>({
    mutationFn: async (payload: SigninPayload) => {
      try {
        const response = await BaseUrl.post<SigninResponse>(
          "/auth/user/signin",
          payload
        );
        return response.data;
      } catch (error) {
        let errorMessage = "Sign in failed. Please check your credentials.";
        if (isAxiosError<ApiErrorResponse>(error)) {
          errorMessage =
            error.response?.data?.message || error.message || errorMessage;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        throw new Error(errorMessage);
      }
    },
    onSuccess: (data) => {
      try {
        secureLocalStorage.setItem("token", data.token);
        toast.success(data.message || "Sign in successful!");
        router.push("/dashboard/hacker");
      } catch {
        toast.error(
          "Login succeeded but failed to save session. Please try again."
        );
      }
    },
    onError: (error: Error) => {
      const errorMessage = error.message || "An unexpected error occurred.";
      toast.error(errorMessage);
      try {
        secureLocalStorage.removeItem("token");
      } catch (storageError) {
        console.error("Failed to remove token from storage:", storageError);}
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      const errorMsg = "Email and password are required.";
      toast.error(errorMsg);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      const errorMsg = "Please enter a valid email address.";
      toast.error(errorMsg);
      return;
    }

    
    signinMutation.mutate({ email, password });
  };

  return (
    <div className="bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#2A0D45_6.63%,#080808_100%)] w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-[16px] border border-white/40 bg-[rgba(74,20,120,0.05)] shadow-[0px_4px_30px_0px_rgba(255,255,255,0.20)] overflow-hidden max-h-[90vh] md:max-h-[700px]">
        <div className="hidden md:flex md:w-1/2 items-center justify-center  bg-gradient-to-br from-purple-900/20 to-black/10">
          <Image
            src={hacker}
            alt="Hacker illustration"
            className="object-contain w-full max-w-md"
            priority
            width={470}
            height={470}
          />
        </div>

        <div className="w-full bg-[#2A0D45] flex flex-col justify-center items-center md:w-1/2 p-6 md:p-8 bg-[rgba(74,20,120,0.08)] overflow-y-auto">
          <div className="w-full max-w-sm">
            <h2 className="text-[26px] font-bold text-white mb-1 text-center">
              Hacker Sign In
            </h2>
            <p className="text-gray-300 mb-6 text-sm text-center">
              Access your security researcher dashboard
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Email or Alias
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Image src={emailIcon} alt="Email" width={16} height={16} />
                  </div>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={signinMutation.isPending}
                    className="w-full text-sm bg-black/30 border border-white/20 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                    placeholder="your@email.com or hacker_alias"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Image
                      src={passIcon}
                      alt="Password"
                      width={16}
                      height={16}
                    />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={signinMutation.isPending}
                    className="w-full text-sm bg-black/30 border border-white/20 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <Switch.Group as="div" className="flex items-center">
                  <Switch
                    checked={rememberMe}
                    onChange={setRememberMe}
                    disabled={signinMutation.isPending}
                    className={classNames(
                      rememberMe
                        ? "bg-purple-600"
                        : "bg-black/50 border border-gray-600",
                      "relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#2A0D45]",
                      signinMutation.isPending
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    )}
                  >
                    <span className="sr-only">Remember me</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        rememberMe ? "translate-x-4" : "translate-x-0",
                        "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                  <Switch.Label
                    as="span"
                    className={`ml-2 ${
                      signinMutation.isPending
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <span className="text-xs text-gray-300 group-hover:text-white">
                      Remember me
                    </span>
                  </Switch.Label>
                </Switch.Group>

                <Link
                  href="/auth/reset/hacker"
                  className={`text-xs text-purple-400 hover:underline hover:text-purple-300 ${
                    signinMutation.isPending
                      ? "pointer-events-none opacity-50"
                      : ""
                  }`}
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={signinMutation.isPending}
                className={`w-full cursor-pointer bg-purple-600 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#2A0D45] focus:ring-purple-500 ${
                  signinMutation.isPending
                    ? "bg-purple-800 cursor-not-allowed opacity-70"
                    : "hover:bg-purple-700"
                }`}
              >
                {signinMutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  "Access Dashboard"
                )}
              </button>
            </form>

            {/* <div className="flex items-center my-5">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-3 text-gray-400 text-xs">OR</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div> */}

            {/* <div className="mb-5">
              <GoogleAuthButton disabled={signinMutation.isPending} />
            </div> */}

            <p className="text-center text-xs text-gray-400 mt-6">
              New to our platform?{" "}
              <Link
                href="/auth/signup/hacker"
                className={`font-medium text-purple-400 hover:underline hover:text-purple-300 ${
                  signinMutation.isPending
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
              >
                Join as Hacker
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackerSigninPage;
