"use client";

import Image from "next/image";
import logo from "../../../public/Logo.svg";
import GoogleAuthButton from "../comp/GoogleAuthButton";
import { useState } from "react";
import Link from "next/link";
import { CaretLeft } from "phosphor-react";

const Page = () => {
  const [selectedRole, setSelectedRole] = useState<"startup" | "hacker" | null>(
    null
  );

  const handleRoleSelection = (role: "startup" | "hacker") => {
    setSelectedRole(role);
  };

  const handleBack = () => {
    setSelectedRole(null); // Reset the selected role
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-custom">
      <div className="flex flex-col items-center justify-center h-full w-[664.53px] mx-auto max-md:w-[90%]">
        {/* Logo */}
        <Image src={logo} alt="logo" className="mb-6 w-[60px]" />

        {/* Title */}
        <h2 className="text-[36px] font-bold text-white mb-4">Register</h2>

        {/* Description */}
        <p className="text-[#FAFAFA] text-[14px] mb-8 text-center">
          Join the elite community today! Complete the form below, and embark on
          your journey with us.
        </p>

        {/* Role Selection */}
        {!selectedRole && (
          <div className="flex gap-6 mb-8">
            <button
              onClick={() => handleRoleSelection("startup")}
              className="px-8 py-2 bg-[#0ACF83] text-white rounded-lg text-lg font-semibold hover:bg-[#00945B] transition duration-300 cursor-pointer"
            >
              Register as Startup
            </button>
            <button
              onClick={() => handleRoleSelection("hacker")}
              className="px-8 py-2 bg-[#0ACF83] text-white rounded-lg text-lg font-semibold hover:bg-[#00945B] transition duration-300 cursor-pointer"
            >
              Register as Hacker
            </button>
          </div>
        )}

        {/* Registration Form */}
        {selectedRole && (
          <div className="flex w-full flex-col items-center justify-center bg-transparent max-md:w-[90%]">
            <form className="w-full">
              {/* Back Arrow and Title */}
              <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                <CaretLeft
                  size={20}
                  className="cursor-pointer"
                  onClick={handleBack} // Add onClick handler for the back arrow
                />
                Register as {selectedRole === "startup" ? "Startup" : "Hacker"}
              </h3>

              {/* Email Input */}
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
              />

              {/* Password Input */}
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
              />

              {/* Sign-Up Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#0ACF83] text-white rounded-lg hover:bg-[#00945B] transition duration-300 cursor-pointer"
              >
                Sign Up
              </button>
            </form>

            {/* Divider */}
            <span className="text-[#FAFAFA] text-[14px] my-4">or</span>

            {/* Google Auth Button */}
            <GoogleAuthButton />
          </div>
        )}

        {/* Login Link */}
        <p className="text-[#FAFAFA] text-[14px] mt-6">
          Already registered?{" "}
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

export default Page;
