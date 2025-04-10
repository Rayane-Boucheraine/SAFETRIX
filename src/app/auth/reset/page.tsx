// app/auth/forgot-password/page.tsx
"use client";

import React, { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import emailIcon from "../../../../public/signup/email.svg"; // Adjust path if needed

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setSubmitted(false);

    if (!email) {
      setMessage("Please enter your email address.");
      setIsLoading(false);
      return;
    }

    try {
      // API Call - Stays the same backend endpoint
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      setSubmitted(true);
      setEmail("");

      if (!response.ok) {
        console.error("Forgot password API error:", response.statusText);
      }
    } catch (error) {
      console.error("Forgot password request failed:", error);
      setMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // --- Blended Theme Background ---
    <div className="bg-[radial-gradient(70%_70%_at_50%_50%,#2A0D45_0%,#195033_30%,#080808_100%)] w-full min-h-screen flex items-center justify-center p-4">
      {/* --- Slightly Themed Card --- */}
      <div className="w-full max-w-md p-6 md:p-10 rounded-[16px] border border-white/20 bg-black/50 shadow-[0px_4px_30px_0px_rgba(150,255,200,0.1)] backdrop-blur-md">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          Reset Your Password
        </h2>
        <p className="text-gray-300 mb-6 text-sm text-center">
          Enter the email associated with your account, and we&apos;ll send
          instructions to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field - Using Purple Focus */}
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
                disabled={isLoading}
                required
                // --- Input: Dark base, Purple Focus Ring ---
                className="w-full text-sm bg-black/40 border border-white/25 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-600 placeholder-gray-500 disabled:opacity-50"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Confirmation/Error Messages (Keep standard status colors) */}
          {submitted && (
            <div className="text-center text-sm text-green-300 bg-green-900/40 border border-green-700/60 p-3 rounded-lg">
              If an account exists for{" "}
              <span className="font-medium">{email || "this address"}</span>,
              you will receive an email with password reset instructions
              shortly. Please check your inbox (and spam folder).
            </div>
          )}
          {message && !submitted && (
            <div className="text-center text-sm text-red-300 bg-red-900/40 border border-red-700/60 p-3 rounded-lg">
              {message}
            </div>
          )}

          {/* --- Submit Button - Green Base, Purple Hover/Focus --- */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer bg-green-600 hover:bg-green-700 border border-transparent
                       text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-purple-500
                       disabled:opacity-60 disabled:cursor-not-allowed group" // Added group for potential internal icon styling
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mx-auto"
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
            ) : (
              "Send Password Reset Link"
            )}
          </button>
        </form>

        {/* Back to Sign In Link - Purple Base, Green Hover */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Remembered your password?{" "}
          <Link
            href="/auth/signin" // General Sign In Selection Page
            className="font-medium text-purple-400 hover:text-green-400 hover:underline transition-colors duration-150"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
