"use client";

import Image from "next/image";
import logo from "../../../public/Logo.svg";
import Link from "next/link";

const ForgotPasswordPage = () => {
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your password reset logic here
    console.log("Password reset requested");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-custom">
      <div className="flex flex-col items-center justify-center h-full w-[664.53px] mx-auto max-md:w-[90%]">
        {/* Logo */}
        <Image src={logo} alt="logo" className="mb-6 w-[60px]" />

        {/* Title */}
        <h2 className="text-[36px] font-bold text-white mb-4">
          Forgot Password?
        </h2>

        {/* Description */}
        <p className="text-[#FAFAFA] text-[14px] mb-8 text-center">
          Enter your email address below, and we&apos;ll send you a link to
          reset your password.
        </p>

        {/* Forgot Password Form */}
        <form onSubmit={handleResetPassword} className="w-full">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#0ACF83] text-white rounded-lg hover:bg-[#00945B] transition duration-300 cursor-pointer"
          >
            Reset Password
          </button>
        </form>

        {/* Back to Login Link */}
        <p className="text-[#FAFAFA] text-[14px] mt-6">
          Remember your password?{" "}
          <Link
            href="/signin"
            className="text-[#0ACF83] hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;