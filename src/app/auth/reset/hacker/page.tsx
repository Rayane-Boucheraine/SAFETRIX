// app/auth/forgot-password/hacker/page.tsx
"use client";

import React, { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
// Adjust the path based on your actual file structure
import emailIcon from "../../../../../public/signup/email.svg";

const HackerForgotPasswordPage = () => {
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
      // API Call - SAME backend endpoint for both user types
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // Always show confirmation for security
      setSubmitted(true);
      setEmail(""); // Clear field

      if (!response.ok) {
        // Log errors internally if needed
        console.error(
          "Forgot password API error (Hacker Flow):",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Forgot password request failed (Hacker Flow):", error);
      // Show generic error for network issues etc.
      setMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // --- Hacker Theme ---
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
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-300 mb-1"
            >
              Email Address{" "}
              {/* Could be Email or Alias if your login supports it */}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src={emailIcon} alt="Email" width={16} height={16} />
              </div>
              <input
                type="email" // Keep as email type for validation hint
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                // --- Hacker Input Style ---
                className="w-full text-sm bg-black/30 border border-white/20 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                placeholder="your@email.com" // Adjust placeholder if Alias is more common
              />
            </div>
          </div>

          {/* Confirmation/Error Messages */}
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

          <button
            type="submit"
            disabled={isLoading}
            // --- Hacker Button Style ---
            className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a2e] focus:ring-purple-500 disabled:opacity-60 disabled:cursor-not-allowed" // Dark purple/black offset
          >
            {isLoading ? "Sending Link..." : "Send Password Reset Link"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Remembered your password? {/* --- Link Back to Hacker Sign In --- */}
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
