"use client";

import { useState, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation"; // Use navigation router in App Router
import { isAxiosError } from "axios"; // Import the type guard

// Import your configured Axios instance
import BaseUrl from "@/components/BaseUrl"; // Adjust the path to your BaseUrl file

// Import Assets & Components
import hacker from "../../../../../public/Landing/hacker.svg"; // Adjust path if this component lives inside src/app/...
import emailIcon from "../../../../../public/signup/email.svg"; // Adjust path
import passIcon from "../../../../../public/signup/pass.svg"; // Adjust path
import GoogleAuthButton from "../../comp/GoogleAuthButton"; // Adjust path if this component lives inside src/app/...
// import toast from 'react-hot-toast'; // Optional: For notifications

// Define interfaces directly here if not importing from a types file
interface SignupPayload {
  email: string;
  password: string;
}

interface SignupResponse {
  message: string; // Or whatever success indicator your API provides
  // Add other potential success fields if needed
}

// Define a more specific error structure if your API returns predictable errors
interface ApiErrorResponse {
  message: string;
  // other error details...
}

const HackerSignupPage = () => {
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
          "/auth/signup/hacker", // Your Hacker signup endpoint
          payload
        );
        return response.data; // Return data on success (handles 200/201)
      } catch (error) {
        let errorMessage = "Hacker signup failed. Please try again."; // Default message

        // Use Axios type guard to safely access error properties
        if (isAxiosError<ApiErrorResponse>(error)) {
          // Check if the server provided a specific message
          errorMessage =
            error.response?.data?.message || error.message || errorMessage;
          console.error(
            "Axios Error Details:",
            error.response?.status,
            error.response?.data,
            error.message
          );
        } else if (error instanceof Error) {
          // Handle generic JavaScript Errors
          errorMessage = error.message;
          console.error("Generic Error:", error.message);
        } else {
          // Handle cases where something else was thrown (less common)
          console.error("Unknown Error Type:", error);
        }

        // Always throw an Error object for React Query's onError
        throw new Error(errorMessage);
      }
    },
    onSuccess: (data) => {
      console.log("Hacker Signup Success:", data.message);
      setFormError(null);
      // toast.success(data.message || 'Account created successfully!');
      // --- Redirect after successful signup ---
      // Example redirect using App Router:
      // router.push("/auth/signin/hacker?signup=success");
      // Or perhaps redirect to a profile setup or dashboard
      alert("Signup Successful! You would normally be redirected now."); // Placeholder
    },
    onError: (error: Error) => {
      // error is guaranteed to be an Error object here because we threw one
      console.error("Mutation Error:", error.message);
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
      // Example: minimum length
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
    // --- JSX Structure (check paths for images/components if needed) ---
    <div className="bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#2A0D45_6.63%,#080808_100%)] w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl lg:w-[62.8%] flex flex-col md:flex-row rounded-[16px] border border-white/40 bg-[rgba(74,20,120,0.05)] shadow-[0px_4px_30px_0px_rgba(255,255,255,0.20)] overflow-hidden h-auto max-h-[90vh] md:max-h-[700px] md:h-auto">
        {" "}
        {/* Adjusted height */}
        {/* Left Image Section */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[rgba(74,20,120,0.05)] p-6">
          {" "}
          {/* Added padding */}
          <Image
            src={hacker} // Ensure this path is correct relative to the `public` folder
            alt="Hacker illustration navigating digital space"
            className="max-w-full h-auto" // Make image responsive
            priority
            width={450} // Maintain aspect ratio
            height={450}
            style={{ objectFit: "contain" }} // Ensure image fits well
          />
        </div>
        {/* Right Form Section */}
        <div className="w-full md:w-1/2 bg-[#2A0D45] bg-opacity-90 backdrop-blur-sm flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 overflow-y-auto">
          {" "}
          {/* Responsive padding */}
          {/* Added min-h-[400px] to ensure minimum content height */}
          <div className="w-full max-w-sm min-h-[400px] flex flex-col justify-center">
            <div>
              {" "}
              {/* Content wrapper */}
              <h2 className="text-2xl sm:text-[26px] font-bold text-white mb-1 text-center">
                Hacker Sign Up
              </h2>
              <p className="text-gray-300 mb-6 text-sm text-center">
                Join our security researcher community
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Email Input */}
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

                {/* Password Input */}
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

                {/* Confirm Password Input */}
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

                {/* Error Display Area */}
                {/* Wrap error in a div to prevent layout shift */}
                <div className="h-4 mt-1">
                  {" "}
                  {/* Reserve space for error */}
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
              {/* OR Separator */}
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-600"></div>
                <span className="mx-3 text-gray-400 text-xs">OR</span>
                <div className="flex-grow border-t border-gray-600"></div>
              </div>
              {/* Google Auth Button */}
              <div className="mb-4">
                <GoogleAuthButton />{" "}
                {/* Assume this handles its own logic/mutation */}
              </div>
              {/* Sign In Link */}
              <p className="text-center text-xs text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/auth/signin/hacker" // Adjust if necessary
                  className="text-purple-400 hover:underline"
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

export default HackerSignupPage;
