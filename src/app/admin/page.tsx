// app/auth/signin/admin/page.tsx
"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import emailIcon from "../../../public/signup/email.svg";
import passIcon from "../../../public/signup/pass.svg";

const AdminSigninPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      // --- API Call to Admin Signin Endpoint ---
      // IMPORTANT: Create a dedicated backend route or ensure your
      // general signin route handles an 'admin' user type/role.
      const response = await fetch("/api/auth/signin/admin", {
        // Example endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ email, password, rememberMe }),
      });

      if (!response.ok) {
        let errorMsg = "Authentication failed.";
        try {
          const errorData = await response.json();
          // Provide more specific backend messages if available
          errorMsg =
            errorData.message || "Invalid credentials or unauthorized access.";
        } catch (e) {
console.log(e)        }
        throw new Error(errorMsg);
      }
      router.push("/admin/dashboard");
    } catch (error: unknown) {
  console.error("Password reset failed (Hacker Flow):", error);
  setErrorMessage(
    error instanceof Error 
      ? error.message 
      : "An unexpected error occurred."
  );
}
    // Don't reset loading on success as we redirect
  };

  return (
    // --- Neutral Admin Theme ---
    <div className="bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 md:p-10 rounded-lg border border-gray-700 bg-gray-900/80 shadow-xl backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          Admin Access Portal
        </h2>
        <p className="text-gray-400 mb-6 text-sm text-center">
          Sign in to manage the platform.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-300 mb-1"
            >
              Admin Email
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
                autoComplete="email"
                // --- Neutral Input Style ---
                className="w-full text-sm bg-gray-800 border border-gray-600 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 disabled:opacity-50"
                placeholder="admin@safetrix.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src={passIcon} alt="Password" width={16} height={16} />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                autoComplete="current-password"
                // --- Neutral Input Style ---
                className="w-full text-sm bg-gray-800 border border-gray-600 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>
          </div>

    
          {/* Error Message Display */}
          {errorMessage && (
            <div className="text-center text-sm text-red-300 bg-red-900/30 border border-red-600/50 p-3 rounded-lg">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            // --- Neutral Button Style ---
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors mt-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
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
                <span>Signing In...</span>
              </>
            ) : (
              "Access Admin Panel"
            )}
          </button>
        </form>
        {/* No Sign Up Link for Admin */}
      </div>
    </div>
  );
};

export default AdminSigninPage;
