"use client";

import Image from "next/image";
import logo from "../../../../public/Logo.svg";
import Link from "next/link";

const ResetPasswordPage = () => {
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset submitted");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-custom">
      <div className="flex flex-col items-center justify-center h-full w-[664.53px] mx-auto max-md:w-[90%]">
        <Image src={logo} alt="logo" className="mb-6 w-[60px]" />
        <h2 className="text-[36px] font-bold text-white mb-4">
          Reset Password
        </h2>
        <p className="text-[#FAFAFA] text-[14px] mb-8 text-center">
          Enter the code sent to your email and your new password below to reset
          your password.
        </p>
        <form onSubmit={handleResetPassword} className="w-full">
          <input
            type="text"
            placeholder="Enter code from email"
            className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
            required
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
            required
          />

          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#0ACF83] text-white rounded-lg hover:bg-[#00945B] transition duration-300 cursor-pointer"
          >
            Reset Password
          </button>
        </form>

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

export default ResetPasswordPage;
