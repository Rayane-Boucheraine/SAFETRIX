// app/auth/set-profile/hacker/page.tsx
"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

import BaseUrl from "@/components/BaseUrl";
import hackerIllustration from "../../../../../public/Landing/hacker.svg";

interface HackerProfilePayload {
  name?: string;
  alias?: string;
  description?: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
  skills: string[];
  field: string;
  avatar?: string; // Added avatar field
}

interface ApiResponse {
  message: string;
}

interface ApiErrorResponse {
  message: string;
}

const HackerSetProfilePage = () => {
  const router = useRouter();

  // Default avatar URL for users - moved inside component
  const defaultAvatar =
    "https://res.cloudinary.com/dgxaezwuv/image/upload/v1748310953/hacker_tkfbzg.avif";

  // --- State for Form Fields ---
  const [alias, setAlias] = useState(""); // Keep for potential future use or display, but not sent in this payload
  const [fullName, setFullName] = useState(""); // Keep for potential future use or display, but not sent in this payload
  const [skills, setSkills] = useState(""); // Comma-separated input
  const [field, setField] = useState(""); // NEW: Field/Specialization
  const [bio, setBio] = useState(""); // Keep for potential future use or display, but not sent in this payload
  const [website, setWebsite] = useState(""); // Keep for potential future use or display, but not sent in this payload
  const [githubUrl, setGithubUrl] = useState(""); // Input for GitHub URL
  const [linkedinUrl, setLinkedinUrl] = useState(""); // Input for LinkedIn URL
  const [avatar, setAvatar] = useState(defaultAvatar); // New avatar state with default value

  // --- State for UI (managed by useMutation) ---
  // const [isLoading, setIsLoading] = useState(false); // Replaced by mutation.isPending

  const updateProfileMutation = useMutation<
    ApiResponse,
    Error,
    HackerProfilePayload
  >({
    mutationFn: async (payload) => {
      // Assuming BaseUrl instance has interceptor to add Auth token
      try {
        // Use PATCH for updating profile data
        const response = await BaseUrl.post<ApiResponse>(
          "/user/hacker/profile",
          payload
        );
        return response.data;
      } catch (error) {
        let errorMessage = "Failed to update profile.";
        if (isAxiosError<ApiErrorResponse>(error)) {
          errorMessage =
            error.response?.data?.message || error.message || errorMessage;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        throw new Error(errorMessage);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message || "Profile updated successfully!");
      router.push("/dashboard/hacker"); // Redirect on success
    },
    onError: (error: Error) => {
      toast.error(error.message || "An unexpected error occurred.");
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate required fields for the API payload
    if (!skills || !field) {
      const errorMsg = "Please fill in Skills and Field/Specialization.";
      toast.error(errorMsg);
      return;
    }

    // --- Prepare Payload ---
    const skillsArray = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== ""); // Convert CSV string to array, trim whitespace, remove empty strings

    if (skillsArray.length === 0) {
      const errorMsg = "Please enter at least one valid skill.";
      toast.error(errorMsg);
      return;
    }

    const payload: HackerProfilePayload = {
      skills: skillsArray,
      field: field.trim(), // Trim whitespace
      avatar: avatar, // Always include avatar (either default or user-provided)
    };

    // Add optional fields only if they have values
    if (fullName.trim()) {
      payload.name = fullName.trim();
    }

    if (alias.trim()) {
      payload.alias = alias.trim();
    }

    if (bio.trim()) {
      payload.description = bio.trim();
    }

    if (website.trim()) {
      payload.portfolio = website.trim();
    }

    if (githubUrl.trim()) {
      payload.github = githubUrl.trim();
    }

    if (linkedinUrl.trim()) {
      payload.linkedin = linkedinUrl.trim();
    }

    // Trigger the mutation
    updateProfileMutation.mutate(payload);
  };

  return (
    <div className="bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#2A0D45_6.63%,#080808_100%)] w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-[16px] border border-white/40 bg-[rgba(74,20,120,0.05)] shadow-[0px_4px_30px_0px_rgba(255,255,255,0.15)] overflow-hidden h-[77vh] md:max-h-[700px]">
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

        <div className="w-full bg-[#2A0D45]/90 flex flex-col justify-start items-center md:w-1/2 p-6 md:p-8 bg-[rgba(74,20,120,0.15)] backdrop-blur-sm scrollbar-hide overflow-y-auto">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-white mb-1 text-center">
              Setup Hacker Profile
            </h2>
            <p className="text-gray-300 mb-6 text-sm text-center">
              Showcase your skills to get started.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Avatar URL field - new */}
              <div>
                <label
                  htmlFor="avatar"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Avatar URL
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="url"
                    id="avatar"
                    name="avatar"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    disabled={updateProfileMutation.isPending}
                    className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                    placeholder="https://example.com/your-avatar.jpg"
                  />
                  <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border border-white/20">
                    <img
                      src={avatar || defaultAvatar}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = defaultAvatar;
                      }}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter a URL to your profile picture or leave as default
                </p>
              </div>

              {/* --- Fields NOT sent in this payload, kept for potential UI use --- */}
              {/* Alias */}
              <div>
                <label
                  htmlFor="alias"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Hacker Alias (Display Only)
                </label>
                <input
                  type="text"
                  id="alias"
                  name="alias"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  disabled={updateProfileMutation.isPending}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="Your unique hacker name"
                />
              </div>
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Full Name (Display Only)
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={updateProfileMutation.isPending}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                />
              </div>
              {/* Bio */}
              <div>
                <label
                  htmlFor="bio"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Bio / About (Optional)
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  disabled={updateProfileMutation.isPending}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="Your experience..."
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Website/Portfolio (Optional)
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  disabled={updateProfileMutation.isPending}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="https://your-portfolio.com"
                />
              </div>

              <div>
                <label
                  htmlFor="skills"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Key Skills <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  rows={3}
                  required
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  disabled={updateProfileMutation.isPending}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="e.g., Web App Security, Pentesting, Reverse Engineering"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter skills separated by commas.
                </p>
              </div>

              {/* Field/Specialization (NEW) */}
              <div>
                <label
                  htmlFor="field"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Field / Specialization <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="field"
                  name="field"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  required
                  disabled={updateProfileMutation.isPending}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="e.g., Web Security, Cloud Security, Mobile Security"
                />
              </div>

              {/* GitHub URL */}
              <div>
                <label
                  htmlFor="githubUrl"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  GitHub (Optional)
                </label>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  disabled={updateProfileMutation.isPending}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="https://github.com/yourusername"
                />
              </div>

              <div>
                <label
                  htmlFor="linkedinUrl"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  LinkedIn (Optional)
                </label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  disabled={updateProfileMutation.isPending}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              {updateProfileMutation.error && (
                <div className="text-center text-sm text-red-300 border border-red-700/60 p-2 rounded-md mt-1">
                  {updateProfileMutation.error.message}
                </div>
              )}

              <button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#2A0D45] focus:ring-purple-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {updateProfileMutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Complete Profile & Enter Dashboard"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackerSetProfilePage;
