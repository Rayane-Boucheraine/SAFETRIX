// app/auth/verify-email/hacker/page.tsx
import React from "react";
import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/24/outline"; // Using Heroicons

const HackerVerifyEmailPage = () => {
  return (
    // --- Hacker Theme ---
    <div className="bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#2A0D45_6.63%,#080808_100%)] w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 md:p-10 text-center rounded-[16px] border border-white/40 bg-[rgba(74,20,120,0.1)] shadow-[0px_4px_30px_0px_rgba(255,255,255,0.15)] backdrop-blur-sm">
        <EnvelopeIcon className="h-16 w-16 text-purple-400 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-white mb-3">
          Check Your Inbox!
        </h2>
        <p className="text-gray-300 mb-4 text-base">
          Awesome! We&apos;ve sent a verification link to the email address you
          provided during signup.
        </p>
        <p className="text-gray-300 mb-6 text-base">
          Please click the link in that email to activate your account and start
          hacking ethically!
        </p>

        <p className="text-xs text-gray-400 mb-6">
          Didn&apos;t receive the email? Please check your spam or junk folder.
          It might take a few minutes to arrive.
        </p>

        {/* Optional: Add a resend button here later if needed */}

        <p className="text-center text-xs text-gray-500">
          Already verified? Go to{" "}
          <Link
            href="/auth/signin/hacker" // Link to Hacker Sign In
            className="font-medium text-purple-400 hover:underline hover:text-purple-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HackerVerifyEmailPage;

// Remember to install Heroicons: npm install @heroicons/react
