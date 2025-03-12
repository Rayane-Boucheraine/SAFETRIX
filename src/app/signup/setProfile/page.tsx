"use client";

import { Suspense } from "react";
import Image from "next/image";
import logo from "../../../../public/Logo.svg";
import { useSearchParams } from "next/navigation";

const ProfileDetailsPageContent = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-custom">
      <div className="flex flex-col items-center justify-center h-full w-[664.53px] mx-auto max-md:w-[90%]">
        {/* Logo */}
        <Image src={logo} alt="logo" className="mb-6 w-[60px]" />

        {/* Title */}
        <h2 className="text-[36px] font-bold text-white mb-4">
          Complete Your Profile
        </h2>

        {/* Description */}
        <p className="text-[#FAFAFA] text-[14px] mb-8 text-center">
          Please fill in the details below to complete your{" "}
          {role === "hacker" ? "hacker" : "startup"} profile.
        </p>

        {/* Profile Details Form */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* Role-Specific Fields */}
          {role === "hacker" ? (
            <>
              {/* Hacker-Specific Fields */}
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
                required
              />
              <input
                type="text"
                placeholder="Skills (e.g., JavaScript, Python)"
                className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
                required
              />
              <input
                type="text"
                placeholder="Portfolio Link"
                className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
              />
              <input
                type="text"
                placeholder="Actual Job (e.g., Pentester, malware analyst)"
                className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
              />
              <textarea
                placeholder="Bio"
                className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
                rows={4}
              />
            </>
          ) : (
            <>
              {/* Startup-Specific Fields */}
              <input
                type="text"
                placeholder="Company Name"
                className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
                required
              />
              <input
                type="text"
                placeholder="Industry (e.g., Technology, Healthcare)"
                className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
                required
              />
              <input
                type="text"
                placeholder="Website URL"
                className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
              />
              <input
                type="text"
                placeholder="Yearly Revenue (e.g., $1M)"
                className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
              />
              <textarea
                placeholder="Company Description"
                className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
                rows={4}
              />
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#0ACF83] text-white rounded-lg hover:bg-[#00945B] transition duration-300 cursor-pointer"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

const ProfileDetailsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileDetailsPageContent />
    </Suspense>
  );
};

export default ProfileDetailsPage;