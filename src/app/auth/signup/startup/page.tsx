"use client";

import { useState, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation"; // Use navigation router in App Router
import { isAxiosError } from "axios"; // Import the type guard

// Import your configured Axios instance
import BaseUrl from "@/components/BaseUrl"; // Assuming BaseUrl is in src/components

// Import Assets & Components (Adjust paths based on actual location)
// Assuming this file is at src/app/auth/signup/startup/page.tsx
import startup from "../../../../../public/Landing/startup.svg"; // Path from public folder root
import emailIcon from "../../../../../public/signup/email.svg"; // Path from public folder root
import passIcon from "../../../../../public/signup/pass.svg"; // Path from public folder root
import GoogleAuthButton from "../../comp/GoogleAuthButton"; // Relative path to component
// import toast from 'react-hot-toast'; // Optional: For notifications

// --- Interfaces ---
interface SignupPayload {
  email: string;
  password: string;
}

interface SignupResponse {
  message: string; // Or whatever success indicator your API provides
}

// Define a more specific error structure if your API returns predictable errors
interface ApiErrorResponse {
  message: string;
  // other error details...
}

// --- Component ---
const StartupSignupPage = () => {
  // const router = useRouter(); // Use from 'next/navigation' if in App Router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // --- React Query Mutation ---
  const signupMutation = useMutation<
    SignupResponse, // Type of data expected on success
    Error, // Type of error expected on failure (always wrap as Error)
    SignupPayload // Type of variables passed to mutate function
  >({
    mutationFn: async (payload: SignupPayload) => {
      try {
        const response = await BaseUrl.post<SignupResponse>(
          "/auth/signup/startup", // Your Startup signup endpoint
          payload
        );
        return response.data; // Return data on success (handles 200/201)
      } catch (error: unknown) {
        // <-- Changed from 'any' to 'unknown'
        let errorMessage = "Startup signup failed. Please try again."; // Default message

        // Use Axios type guard to safely access error properties
        if (isAxiosError<ApiErrorResponse>(error)) {
          errorMessage =
            error.response?.data?.message || error.message || errorMessage;
          console.error(
            "Axios Error Details (Startup):",
            error.response?.status,
            error.response?.data,
            error.message
          );
        } else if (error instanceof Error) {
          // Handle generic JavaScript Errors
          errorMessage = error.message;
          console.error("Generic Error (Startup):", error.message);
        } else {
          // Handle cases where something else was thrown
          console.error("Unknown Error Type (Startup):", error);
        }

        // Always throw an Error object for React Query's onError
        throw new Error(errorMessage); // <-- Ensures onError receives an Error object
      }
    },
    onSuccess: (data) => {
      console.log("Startup Signup Success:", data.message);
      setFormError(null);
      // toast.success(data.message || 'Account created successfully!');
      // Redirect after successful signup
      alert("Signup Successful! You would normally be redirected now."); // Placeholder
      // Example redirect:
      // router.push("/auth/signin/startup?signup=success");
    },
    onError: (error: Error) => {
      // <-- error is guaranteed to be an Error object
      console.error("Mutation Error (Startup):", error.message);
      setFormError(error.message); // Display the extracted error message
      // toast.error(error.message);
    },
  });

  // --- Form Submission Handler ---
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null); // Clear previous errors

    // Client-side validation
    if (!email || !password || !confirmPassword) {
      setFormError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      // Example length check
      setFormError("Password must be at least 6 characters long.");
      return;
    }
    // Basic email format check (optional, can be more robust)
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    // Validation passed, trigger the mutation
    signupMutation.mutate({ email, password });
  };

  return (
    // --- JSX Structure ---
    // (Using green theme from your example)
    <div className="bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#195033_6.63%,#080808_100%)] w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl lg:w-[62.8%] flex flex-col md:flex-row rounded-[16px] border border-white/40 bg-[rgba(64,127,103,0.05)] shadow-[0px_4px_30px_0px_rgba(255,255,255,0.20)] overflow-hidden h-auto max-h-[90vh] md:max-h-[700px] md:h-auto">
        {" "}
        {/* Adjusted height */}
        {/* Left Image Section */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[rgba(64,127,103,0.05)] p-6">
          {" "}
          {/* Added padding */}
          <Image
            src={startup} // Use root path for public assets
            alt="Startup illustration showing growth"
            className="max-w-full h-auto" // Responsive image
            priority
            width={450} // Maintain aspect ratio
            height={450}
            style={{ objectFit: "contain" }} // Ensure image fits well
          />
        </div>
        {/* Right Form Section */}
        <div className="w-full md:w-1/2 bg-[#1a4530] bg-opacity-90 backdrop-blur-sm flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 overflow-y-auto">
          {" "}
          {/* Responsive padding */}
          {/* Added min-h-[400px] to ensure minimum content height */}
          <div className="w-full max-w-sm min-h-[400px] flex flex-col justify-center">
            <div>
              {" "}
              {/* Content wrapper */}
              <h2 className="text-2xl sm:text-[26px] font-bold text-white mb-1 text-center">
                Startup Sign Up
              </h2>
              <p className="text-gray-300 mb-6 text-sm text-center">
                Register your company account
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email-startup"
                    className="block text-xs font-medium text-gray-300 mb-1"
                  >
                    {" "}
                    Email{" "}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image src={emailIcon} alt="" width={16} height={16} />
                    </div>
                    <input
                      type="email"
                      id="email-startup"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={signupMutation.isPending}
                      className="w-full text-sm bg-black/30 border border-white/20 rounded-lg pl-9 pr-3 py-[8px] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50 transition-colors"
                      placeholder="your@company.com"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password-startup"
                    className="block text-xs font-medium text-gray-300 mb-1"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image src={passIcon} alt="" width={16} height={16} />
                    </div>
                    <input
                      type="password"
                      id="password-startup"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={signupMutation.isPending}
                      className="w-full text-sm bg-black/30 border border-white/20 rounded-lg pl-9 pr-3 py-[8px] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50 transition-colors"
                      placeholder="••••••••"
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label
                    htmlFor="confirmPassword-startup"
                    className="block text-xs font-medium text-gray-300 mb-1"
                  >
                    {" "}
                    Confirm Password{" "}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image src={passIcon} alt="" width={16} height={16} />
                    </div>
                    <input
                      type="password"
                      id="confirmPassword-startup"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={signupMutation.isPending}
                      className="w-full text-sm bg-black/30 border border-white/20 rounded-lg pl-9 pr-3 py-[8px] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50 transition-colors"
                      placeholder="••••••••"
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                {/* Error Display Area */}
                <div className="h-4 mt-1">
                  {" "}
                  {/* Reserve space */}
                  {formError && (
                    <p className="text-xs text-red-400 text-center">
                      {formError}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={signupMutation.isPending}
                  className={`w-full cursor-pointer bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors mt-2 ${
                    signupMutation.isPending
                      ? "bg-green-800 cursor-not-allowed opacity-70"
                      : "hover:bg-green-700"
                  }`} // Green button theme
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
                      Creating...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>
              {/* OR Separator */}
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-600"></div>
                <span className="mx-3 text-gray-400 text-xs">OR</span>
                <div className="flex-grow border-t border-gray-600"></div>
              </div>
              {/* Google Auth Button */}
              <div className="mb-4">
                <GoogleAuthButton />{" "}
                {/* Ensure this component exists and path is correct */}
              </div>
              {/* Sign In Link */}
              <p className="text-center text-xs text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/auth/signin/startup" // Link to startup signin
                  className="text-green-400 hover:underline" // Green link theme
                >
                  Sign In
                </Link>
              </p>
            </div>{" "}
            {/* End content wrapper */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupSignupPage;
