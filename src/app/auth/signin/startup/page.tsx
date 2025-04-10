// Add 'use client' directive if using Next.js App Router and state
"use client";

import Image from "next/image";
import startup from "../../../../../public/Landing/startup.svg";
import emailIcon from "../../../../../public/signup/email.svg";
import passIcon from "../../../../../public/signup/pass.svg";
import Link from "next/link";
import GoogleAuthButton from "../../comp/GoogleAuthButton";
import { useState } from "react";
import { Switch } from "@headlessui/react";

function classNames(
  ...classes: (string | boolean | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}

const StartupSigninPage = () => {
  const [rememberMe, setRememberMe] = useState(false); 

  return (
    <div className="bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#195033_6.63%,#080808_100%)] w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-[16px] border border-white/40 bg-[rgba(64,127,103,0.05)] shadow-[0px_4px_30px_0px_rgba(255,255,255,0.20)] overflow-hidden max-h-[90vh] md:max-h-[700px]">
        {/* Image Section */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-green-900/20 to-black/10">
          <Image
            src={startup}
            alt="Startup illustration"
            className="object-contain w-full max-w-md"
            priority
            width={470} // Consider adding explicit width/height for performance
            height={470} // Adjust values based on actual image aspect ratio
          />
        </div>

        {/* Form Section */}
        <div className="w-full bg-[#1a4530] flex flex-col justify-center items-center md:w-1/2 p-6 md:p-8 bg-[rgba(64,127,103,0.08)] overflow-y-auto">
          <div className="w-full max-w-sm">
            <h2 className="text-[26px] font-bold text-white mb-1 text-center">
              Startup Sign In
            </h2>
            <p className="text-gray-300 mb-6 text-sm text-center">
              Access your company dashboard
            </p>
            <form className="space-y-4">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Company Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Image src={emailIcon} alt="Email" width={16} height={16} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="w-full text-sm bg-black/30 border border-white/20 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500"
                    placeholder="admin@company.com"
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
                    <Image
                      src={passIcon}
                      alt="Password"
                      width={16}
                      height={16}
                    />
                  </div>
                  <input
                    type="password"
                    id="password"
                    className="w-full text-sm bg-black/30 border border-white/20 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* --- Headless UI Switch Section --- */}
              <div className="flex justify-between items-center pt-1">
                <Switch.Group as="div" className="flex items-center">
                  <Switch
                    checked={rememberMe}
                    onChange={setRememberMe}
                    className={classNames(
                      rememberMe
                        ? "bg-green-600"
                        : "bg-black/50 border border-gray-600",
                      "relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-[#1a4530]" // Adjusted offset color
                    )}
                  >
                    <span className="sr-only">Remember me</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        rememberMe ? "translate-x-4" : "translate-x-0",
                        "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                  <Switch.Label as="span" className="ml-2 cursor-pointer">
                    <span className="text-xs text-gray-300 group-hover:text-white">
                      Remember me
                    </span>
                  </Switch.Label>
                </Switch.Group>

                <Link
                  href="/auth/reset/startup"
                  className="text-xs text-green-400 hover:underline hover:text-green-300"
                >
                  Forgot password?
                </Link>
              </div>
              {/* --- End Headless UI Switch Section --- */}

              <button
                type="submit"
                className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a4530] focus:ring-green-500"
              >
                Access Company Dashboard
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-5">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-3 text-gray-400 text-xs">OR</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            {/* Google Auth */}
            <div className="mb-5">
              <GoogleAuthButton />
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-xs text-gray-400">
              New to SAFETRIX?{" "}
              <Link
                href="/auth/signup/startup"
                className="font-medium text-green-400 hover:underline hover:text-green-300"
              >
                Create company account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupSigninPage;
