// app/auth/reset-password/startup/[token]/page.tsx
"use client";

// import React, { useState, FormEvent } from "react";
// import { useRouter } from "next/navigation"; // Use navigation hooks
// import Link from "next/link";
import Image from "next/image";
// Adjust path based on your  structure
import passIcon from "../../../../../../public/signup/pass.svg";

const StartupResetPasswordPage = () => {

  return (
    // --- Startup Theme ---
    <div className="bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#195033_6.63%,#080808_100%)] w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 md:p-10 rounded-[16px] border border-white/40 bg-[rgba(64,127,103,0.1)] shadow-[0px_4px_30px_0px_rgba(255,255,255,0.15)] backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          Set New Password
        </h2>
        <p className="text-gray-300 mb-6 text-sm text-center">
          Create a new strong password for your company account.
        </p>

        <form  className="space-y-4">
          {/* New Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-300 mb-1"
            >
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src={passIcon} alt="Password" width={16} height={16} />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                required
                autoComplete="new-password"
                // --- Startup Input Style ---
                className="w-full text-sm bg-black/30 border border-white/20 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500 disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Confirm New Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-medium text-gray-300 mb-1"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image
                  src={passIcon}
                  alt="Confirm Password"
                  width={16}
                  height={16}
                />
              </div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"

                required
                autoComplete="new-password"
                // --- Startup Input Style ---
                className="w-full text-sm bg-black/30 border border-white/20 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500 disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>
          </div>

         

          
        </form>

       
      </div>
    </div>
  );
};

export default StartupResetPasswordPage;
