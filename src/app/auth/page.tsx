import Link from "next/link";
import React from "react";

const SignupPage = () => {
  return (
    <div className="bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#195033_6.63%,#080808_100%)] w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-[16px] border border-white/40 bg-[rgba(64,127,103,0.05)] shadow-[0px_4px_30px_0px_rgba(255,255,255,0.20)] overflow-hidden">
        <div className="w-full md:w-1/2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/40 bg-[rgba(106,64,127,0.05)]">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              For Security Researchers
            </h3>
            <p className="text-white/80 mb-4">
              Join our{" "}
              <span className="text-purple-300 font-medium">
                elite hacker community
              </span>{" "}
              and gain access to:
            </p>
            <ul className="text-white/70 mb-6 space-y-2 text-left max-w-xs">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">✓</span>
                Private bug bounty programs with premium rewards
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">✓</span>
                Early access to zero-day vulnerabilities
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">✓</span>
                Exclusive hacker networking events
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">✓</span>
                Dedicated security research resources
              </li>
            </ul>
            <Link
              href="/auth/signup/hacker"
              className="px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors border border-purple-400/50 mt-4"
            >
              Join as Security Researcher
            </Link>
            <p className="text-white/60 text-sm mt-3">
              Already part of the community?{" "}
              <Link
                href="/auth/signin/hacker"
                className="text-purple-300 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 bg-[rgba(64,127,103,0.08)]">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              For Cybersecurity Startups
            </h3>
            <p className="text-white/80 mb-4">
              <span className="text-green-300 font-medium">
                Fortify your startup
              </span>{" "}
              with enterprise-grade protection:
            </p>
            <ul className="text-white/70 mb-6 space-y-2 text-left max-w-xs">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Military-grade encryption tailored for startups
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                24/7 threat monitoring and incident response
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Compliance frameworks (GDPR, HIPAA, SOC2)
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Dedicated security architect support
              </li>
            </ul>
            <Link
              href="/auth/signup/startup"
              className="px-8 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium transition-colors border border-green-400/50 mt-4"
            >
              Protect Your Startup
            </Link>
            <p className="text-white/60 text-sm mt-3">
              Existing customer?{" "}
              <Link
                href="/auth/signin/startup"
                className="text-green-300 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
