"use client";

import Image from "next/image";
import logo from "../../../public/Logo.svg";
import GoogleAuthButton from "../comp/GoogleAuthButton";
import Link from "next/link";

const SignInPage = () => {
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-custom">
      <div className="flex flex-col items-center justify-center h-full w-[655.53px] mx-auto max-md:w-[90%]">
        <Image src={logo} alt="logo" className="mb-6 w-[60px]" />

        <h2 className="text-[36px] font-bold text-white mb-4">Sign In</h2>

        <p className="text-[#FAFAFA] text-[14px] mb-8 text-center">
          Welcome back! Sign in to pick up where you left off.
        </p>

        <form onSubmit={handleSignIn} className="w-full">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-2 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
            required
          />

          <div className="text-right mb-4"></div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#0ACF83] text-white rounded-lg hover:bg-[#00945B] transition duration-300 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <span className="text-[#FAFAFA] text-[14px] my-4">or</span>

        <GoogleAuthButton />

        <div className="w-full flex items-center justify-between mt-6">
          <p className="text-[#FAFAFA] text-[14px]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#0ACF83] hover:underline cursor-pointer"
            >
              Register
            </Link>
          </p>
          <Link
            href="/forgot-password"
            className="text-[#0ACF83] text-[14px] hover:underline cursor-pointer"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
