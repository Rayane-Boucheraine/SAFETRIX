// app/auth/set-profile/startup/page.tsx
"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import startupIllustration from "../../../../../public/Landing/startup.svg";

const StartupSetProfilePage = () => {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");

  // --- State for UI ---
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!companyName || !website || !description) {
      setErrorMessage("Please fill in Company Name, Website, and Description.");
      return;
    }
    // Add more specific validation if needed (e.g., URL format)

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/set-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileData: { companyName, website, industry, tagline, description },
          // Assuming backend knows user is 'startup' from session/auth token
        }),
      });

      if (!response.ok) {
        let errorMsg = "Failed to update profile.";
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) {
          console.log(e);
        }
        throw new Error(errorMsg);
      }

      router.push("/dashboard/startup"); // Redirect on success
    }  catch (error: unknown) {
  console.error("Password reset failed (Hacker Flow):", error);
  setErrorMessage(
    error instanceof Error 
      ? error.message 
      : "An unexpected error occurred."
  );
}
  };

  return (
    <div className="bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#195033_6.63%,#080808_100%)] w-full min-h-screen flex items-center justify-center p-4">
      {/* --- Main Card Container --- */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-[16px] border border-white/40 bg-[rgba(64,127,103,0.05)] shadow-[0px_4px_30px_0px_rgba(255,255,255,0.15)] overflow-hidden h-[77vh] md:max-h-[700px]">
        {/* --- Image Section (Left) --- */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-green-900/20 to-black/10 relative">
          {/* Ensure the illustration itself fits */}
          <Image
            src={startupIllustration}
            alt="Startup Profile Setup Illustration"
            className="object-contain w-full max-w-md h-full"
            priority // Load image sooner if it's important LCP
            width={470} // Provide hints
            height={470}
          />
        </div>

        {/* --- Form Section (Right - SCROLLABLE) --- */}
        <div className="w-full bg-[#1a4530]/90 flex flex-col justify-start items-center scrollbar-hide md:w-1/2 p-6 md:p-8 bg-[rgba(64,127,103,0.15)] backdrop-blur-sm overflow-y-auto">
          {/* Inner container for content padding & max-width */}
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-white mb-1 text-center">
              Setup Company Profile
            </h2>
            <p className="text-gray-300 mb-6 text-sm text-center">
              Complete your setup to access the dashboard.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500 disabled:opacity-50"
                />
              </div>

              {/* Website */}
              <div>
                <label
                  htmlFor="website"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Company Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="https://www.yourstartup.com"
                />
              </div>

              {/* Industry */}
              <div>
                <label
                  htmlFor="industry"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Industry <span className="text-gray-500">(Opt.)</span>
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  disabled={isLoading}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500 disabled:opacity-50"
                />
              </div>

              {/* Tagline */}
              <div>
                <label
                  htmlFor="tagline"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Short Tagline <span className="text-gray-500">(Opt.)</span>
                </label>
                <input
                  type="text"
                  id="tagline"
                  name="tagline"
                  maxLength={100}
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  disabled={isLoading}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500 disabled:opacity-50"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Company Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isLoading}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="What your company does..."
                />
              </div>

              {/* Error Message Display */}
              {errorMessage && (
                <div className="text-center text-sm text-red-300 border border-red-700/60 p-2 rounded-md mt-1">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#102c1f] focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Complete Profile & Enter Dashboard"}
              </button>
            </form>
            {/* Optional: Add skip link or logout */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupSetProfilePage;
