// src/app/auth/signup/hacker/page.tsx
"use client";

import React, { useState, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import BaseUrl from "@/components/BaseUrl";
import hacker from "../../../../../public/Landing/hacker.svg";
import emailIcon from "../../../../../public/signup/email.svg";
import passIcon from "../../../../../public/signup/pass.svg";
import GoogleAuthButton from "../../comp/GoogleAuthButton";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role: "hacker";
  avatar: string;
}

interface SignupResponse {
  message: string;
  token: string; // Add the token property
}

interface ApiErrorResponse {
  message: string;
}

const HackerSignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const defaultAvatar = "https://avatar.iran.liara.run/public/boy";
  const staticName = "Hacker User";

  const signupMutation = useMutation<SignupResponse, Error, SignupPayload>({
    mutationFn: async (payload: SignupPayload) => {
      try {
        const response = await BaseUrl.post<SignupResponse>(
          "/auth/user/signup",
          payload
        );
        return response.data;
      } catch (error) {
        let errorMessage = "Signup failed. Please try again.";
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
      toast.success(
        data.message || "Account created successfully!"
      );
      
      secureLocalStorage.setItem("token", data.token)
      router.push("/auth/verify/hacker");
    },
    onError: (error: Error) => {
      const errorMessage = error.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password || !confirmPassword) {
      toast.error("Email and password fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    signupMutation.mutate({
      name: staticName,
      email,
      password,
      role: "hacker",
      avatar: defaultAvatar,
    });
  };

  return (
    <div className="bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#2A0D45_6.63%,#080808_100%)] w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl lg:w-[62.8%] flex flex-col md:flex-row rounded-[16px] border border-white/40 bg-[rgba(74,20,120,0.05)] shadow-[0px_4px_30px_0px_rgba(255,255,255,0.20)] overflow-hidden h-auto max-h-[90vh] md:max-h-[700px] md:h-auto">
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[rgba(74,20,120,0.05)]">
          <Image
            src={hacker}
            alt="Hacker illustration navigating digital space"
            priority
            width={450}
            height={450}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="w-full md:w-1/2 bg-[#2A0D45] bg-opacity-90 backdrop-blur-sm flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 overflow-y-auto">
          <div className="w-full max-w-sm min-h-[400px] flex flex-col justify-center">
            <div>
              <h2 className="text-2xl sm:text-[26px] font-bold text-white mb-1 text-center">
                Hacker Sign Up
              </h2>
              <p className="text-gray-300 mb-6 text-sm text-center">
                Join our security researcher community
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label
                    htmlFor="email-hacker"
                    className="block text-xs font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image src={emailIcon} alt="" width={16} height={16} />
                    </div>
                    <input
                      type="email"
                      id="email-hacker"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={signupMutation.isPending}
                      className="w-full text-sm bg-black/30 border border-white/20 rounded-lg pl-9 pr-3 py-[8px] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50 transition-colors"
                      placeholder="your@email.com"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password-hacker"
                    className="block text-xs font-medium text-gray-300 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image src={passIcon} alt="" width={16} height={16} />
                    </div>
                    <input
                      type="password"
                      id="password-hacker"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={signupMutation.isPending}
                      className="w-full text-sm bg-black/30 border border-white/20 rounded-lg pl-9 pr-3 py-[8px] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50 transition-colors"
                      placeholder="••••••••"
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword-hacker"
                    className="block text-xs font-medium text-gray-300 mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image src={passIcon} alt="" width={16} height={16} />
                    </div>
                    <input
                      type="password"
                      id="confirmPassword-hacker"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={signupMutation.isPending}
                      className="w-full text-sm bg-black/30 border border-white/20 rounded-lg pl-9 pr-3 py-[8px] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50 transition-colors"
                      placeholder="••••••••"
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={signupMutation.isPending}
                  className={`w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors mt-2 ${
                    signupMutation.isPending
                      ? "bg-purple-800 cursor-not-allowed opacity-70"
                      : "hover:bg-purple-700"
                  }`}
                >
                  {signupMutation.isPending ? (
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
                      Joining...
                    </span>
                  ) : (
                    "Join as Hacker"
                  )}
                </button>
              </form>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-600"></div>
                <span className="mx-3 text-gray-400 text-xs">OR</span>
                <div className="flex-grow border-t border-gray-600"></div>
              </div>

              <div className="mb-4">
                <GoogleAuthButton />
              </div>

              <p className="text-center text-xs text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/auth/signin/hacker"
                  className="text-purple-400 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackerSignupPage;
