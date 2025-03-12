"use client";

import Image from "next/image";
import logo from "../../../../public/Logo.svg";

const VerificationPage = () => {
  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your verification logic here
    console.log("Verification code submitted");
  };

  const handleResendCode = () => {
    // Add your resend code logic here
    console.log("Resend code requested");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-custom">
      <div className="flex flex-col items-center justify-center h-full w-[664.53px] mx-auto max-md:w-[90%]">
        {/* Logo */}
        <Image src={logo} alt="logo" className="mb-6 w-[60px]" />

        {/* Title */}
        <h2 className="text-[36px] font-bold text-white mb-4">
          Verify Your Email
        </h2>

        {/* Description */}
        <p className="text-[#FAFAFA] text-[14px] mb-8 text-center">
          We’ve sent a verification code to your email. Please enter the code
          below to verify your account.
        </p>

        {/* Verification Form */}
        <form onSubmit={handleVerification} className="w-full">
          {/* Verification Code Input */}
          <input
            type="text"
            placeholder="Enter verification code"
            className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#0ACF83] text-white rounded-lg hover:bg-[#00945B] transition duration-300 cursor-pointer"
          >
            Verify
          </button>
        </form>

        {/* Resend Code Link */}
        <p className="text-[#FAFAFA] text-[14px] mt-6">
          Didn’t receive the code?{" "}
          <button
            onClick={handleResendCode}
            className="text-[#0ACF83] hover:underline cursor-pointer"
          >
            Resend Code
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerificationPage;