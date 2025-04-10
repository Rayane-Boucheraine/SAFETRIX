// app/auth/set-profile/hacker/page.tsx
"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import Link from "next/link";

// Adjust path to your illustration
import hackerIllustration from "../../../../../public/Landing/hacker.svg";

const HackerSetProfilePage = () => {
  const router = useRouter();
  // --- State for Form Fields ---
  const [alias, setAlias] = useState("");
  const [fullName, setFullName] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  // --- State for UI ---
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!alias || !fullName || !skills) {
      setErrorMessage("Please fill in Alias, Full Name, and Skills.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/set-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileData: {
            alias,
            fullName,
            skills,
            bio,
            website,
            githubUrl,
            linkedinUrl,
          },
          // Assuming backend knows user is 'hacker' from session/auth token
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

      router.push("/dashboard/hacker"); // Redirect on success
    } catch (error: unknown) {
      console.error("Password reset failed (Hacker Flow):", error);
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#2A0D45_6.63%,#080808_100%)] w-full min-h-screen flex items-center justify-center p-4">
      {/* --- Main Card Container --- */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-[16px] border border-white/40 bg-[rgba(74,20,120,0.05)] shadow-[0px_4px_30px_0px_rgba(255,255,255,0.15)] overflow-hidden h-[77vh] md:max-h-[700px]">
        {/* --- Image Section (Left) --- */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-purple-900/20 to-black/10 relative">
          <Image
            src={hackerIllustration}
            alt="Hacker Profile Setup Illustration"
            className="object-contain w-full max-w-md"
            priority
            width={470}
            height={470}
          />
        </div>

        {/* --- Form Section (Right - SCROLLABLE) --- */}
        <div className="w-full bg-[#2A0D45]/90 flex flex-col justify-start items-center md:w-1/2 p-6 md:p-8 bg-[rgba(74,20,120,0.15)] backdrop-blur-sm scrollbar-hide overflow-y-auto">
          {" "}
          {/* KEY: overflow-y-auto */}
          {/* Inner container */}
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-white mb-1 text-center">
              Setup Hacker Profile
            </h2>
            <p className="text-gray-300 mb-6 text-sm text-center">
              Showcase your skills to get started.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Alias */}
              <div>
                <label
                  htmlFor="alias"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Hacker Alias
                </label>
                <input
                  type="text"
                  id="alias"
                  name="alias"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                />
              </div>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                />
              </div>

              {/* Skills */}
              <div>
                <label
                  htmlFor="skills"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Key Skills
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  rows={3}
                  required
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  disabled={isLoading}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="e.g., Web App Security, Pentesting..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter skills separated by commas.
                </p>
              </div>

              {/* Bio */}
              <div>
                <label
                  htmlFor="bio"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Bio / About <span className="text-gray-500">(Opt.)</span>
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  disabled={isLoading}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="Your experience..."
                />
              </div>

              {/* Website/Portfolio */}
              <div>
                <label
                  htmlFor="website"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Website/Portfolio{" "}
                  <span className="text-gray-500">(Opt.)</span>
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  disabled={isLoading}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="https://your-portfolio.com"
                />
              </div>

              {/* GitHub URL */}
              <div>
                <label
                  htmlFor="githubUrl"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  GitHub <span className="text-gray-500">(Opt.)</span>
                </label>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  disabled={isLoading}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="https://github.com/yourusername"
                />
              </div>

              {/* LinkedIn URL */}
              <div>
                <label
                  htmlFor="linkedinUrl"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  LinkedIn <span className="text-gray-500">(Opt.)</span>
                </label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  disabled={isLoading}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="https://linkedin.com/in/yourprofile"
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
                className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a2e] focus:ring-purple-500 disabled:opacity-60 disabled:cursor-not-allowed"
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

export default HackerSetProfilePage;
