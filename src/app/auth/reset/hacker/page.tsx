// app/auth/forgot-password/hacker/page.tsx
"use client";

import React, { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

import BaseUrl from "@/components/BaseUrl"; // Assuming BaseUrl is correctly configured
import emailIcon from "../../../../../public/signup/email.svg";

interface ForgotPasswordPayload {
  email: string;
}

interface ApiResponse {
  message: string; // Assuming a simple message on success
}

interface ApiErrorResponse {
  message: string;
}

const HackerForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null); // To display the submitted email

  const forgotPasswordMutation = useMutation<
    ApiResponse,
    Error,
    ForgotPasswordPayload
  >({
    mutationFn: async (payload) => {
      try {
        const response = await BaseUrl.post<ApiResponse>(
          "/auth/user/forgot-password/request", // Correct endpoint
          payload
        );
        return response.data;
      } catch (error) {
        if (isAxiosError<ApiErrorResponse>(error)) {
          console.error(
            "Forgot Password Request Error:",
            error.response?.data?.message || error.message
          );
        } else if (error instanceof Error) {
          console.error("Forgot Password Request Error:", error.message);
        } else {
          console.error("Unknown Forgot Password Request Error:", error);
        }
        return { message: "If an account exists, an email will be sent." }; 
      }
    },
    onSuccess: (data) => {
      toast.success(
        data.message || "Password reset instructions sent if account exists."
      );
      setSubmittedEmail(email);
      setEmail("");
    },
    onError: (error: Error) => {
      toast.error(error.message || "An unexpected error occurred.");
      setSubmittedEmail(null); 
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedEmail(null);

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    forgotPasswordMutation.mutate({ email });
  };

  return (
    <div className="bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#2A0D45_6.63%,#080808_100%)] w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 md:p-10 rounded-[16px] border border-white/40 bg-[rgba(74,20,120,0.1)] shadow-[0px_4px_30px_0px_rgba(255,255,255,0.15)] backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          Forgot Your Password?
        </h2>
        <p className="text-gray-300 mb-6 text-sm text-center">
          No worries! Enter your email below and we&apos;ll send you a link to
          reset it.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!submittedEmail ? ( // Show form only if not submitted
            <>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Image src={emailIcon} alt="Email" width={16} height={16} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={forgotPasswordMutation.isPending}
                    required
                    className="w-full text-sm bg-black/30 border border-white/20 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={forgotPasswordMutation.isPending}
                className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#2A0D45] focus:ring-purple-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {forgotPasswordMutation.isPending ? (
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
                    Sending Link...
                  </span>
                ) : (
                  "Send Password Reset Link"
                )}
              </button>
            </>
          ) : (
            // Show confirmation message after submission
            <div className="text-center text-sm text-green-300 bg-green-900/40 border border-green-700/60 p-3 rounded-lg">
              If an account exists for{" "}
              <span className="font-medium">{submittedEmail}</span>, you will
              receive an email with password reset instructions shortly. Please
              check your inbox (and spam folder).
            </div>
          )}
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          {submittedEmail
            ? "Instructions sent? "
            : "Remembered your password? "}
          <Link
            href="/auth/signin/hacker"
            className="font-medium text-purple-400 hover:underline hover:text-purple-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HackerForgotPasswordPage;
