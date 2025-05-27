// app/auth/set-profile/startup/page.tsx
"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

import BaseUrl from "@/components/BaseUrl";
import startupIllustration from "../../../../../public/Landing/startup.svg";

interface StartupProfilePayload {
  name: string;
  industry: string;
  description: string;
  location: string;
  team_size: number;
  security_needs: string[];
  yearly_revenue: number;
  avatar?: string; // Added avatar field
}

interface ApiResponse {
  message: string;
}

interface ApiErrorResponse {
  message: string;
}

const StartupSetProfilePage = () => {
  const router = useRouter();

  // Default avatar URL for startups
  const defaultAvatar =
    "https://res.cloudinary.com/dgxaezwuv/image/upload/v1748310953/startup_bfgxaf.jpg";

  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [securityNeeds, setSecurityNeeds] = useState("");
  const [yearlyRevenue, setYearlyRevenue] = useState("");
  const [avatar, setAvatar] = useState(defaultAvatar); // New avatar state with default value

  const [formError, setFormError] = useState<string | null>(null);

  const updateProfileMutation = useMutation<
    ApiResponse,
    Error,
    StartupProfilePayload
  >({
    mutationFn: async (payload) => {
      try {
        const response = await BaseUrl.post<ApiResponse>(
          "/user/startup/profile",
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
      router.push("/dashboard/startup");
    },
    onError: (error: Error) => {
      toast.error(error.message || "An unexpected error occurred.");
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (
      !companyName ||
      !industry ||
      !description ||
      !location ||
      !teamSize ||
      !securityNeeds ||
      !yearlyRevenue
    ) {
      const errorMsg = "Please fill in all required fields (*).";
      setFormError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    const teamSizeNum = parseInt(teamSize, 10);
    const yearlyRevenueNum = parseFloat(yearlyRevenue);

    if (isNaN(teamSizeNum) || teamSizeNum <= 0) {
      const errorMsg = "Please enter a valid team size (positive number).";
      setFormError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (isNaN(yearlyRevenueNum) || yearlyRevenueNum < 0) {
      const errorMsg = "Please enter a valid yearly revenue (number).";
      setFormError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    const securityNeedsArray = securityNeeds
      .split(",")
      .map((need) => need.trim())
      .filter((need) => need !== "");
    if (securityNeedsArray.length === 0) {
      const errorMsg = "Please list at least one security need.";
      setFormError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    const payload: StartupProfilePayload = {
      name: companyName.trim(),
      industry: industry.trim(),
      description: description.trim(),
      location: location.trim(),
      team_size: teamSizeNum,
      security_needs: securityNeedsArray,
      yearly_revenue: yearlyRevenueNum,
      avatar: avatar, // Include avatar in payload
    };

    updateProfileMutation.mutate(payload);
  };

  return (
    <div className="bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#195033_6.63%,#080808_100%)] w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-[16px] border border-white/40 bg-[rgba(64,127,103,0.05)] shadow-[0px_4px_30px_0px_rgba(255,255,255,0.15)] overflow-hidden h-[77vh] md:max-h-[700px]">
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-green-900/20 to-black/10 relative">
          <Image
            src={startupIllustration}
            alt="Startup Profile Setup Illustration"
            className="object-contain w-full max-w-md h-full"
            priority
            width={470}
            height={470}
          />
        </div>

        <div className="w-full bg-[#1a4530]/90 flex flex-col justify-start items-center scrollbar-hide md:w-1/2 p-6 md:p-8 bg-[rgba(64,127,103,0.15)] backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-white mb-1 text-center">
              Setup Company Profile
            </h2>
            <p className="text-gray-300 mb-6 text-sm text-center">
              Complete your setup to access the dashboard.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Avatar URL field - new */}
              <div>
                <label
                  htmlFor="avatar"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Company Logo (Optional)
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="url"
                    id="avatar"
                    name="avatar"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    disabled={updateProfileMutation.isPending}
                    className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500 disabled:opacity-50"
                    placeholder="https://example.com/your-logo.png"
                  />
                  <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border border-white/20">
                    <img
                      src={avatar || defaultAvatar}
                      alt="Company logo preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = defaultAvatar;
                      }}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter a URL to your company logo or leave as default
                </p>
              </div>

              <div>
                <label
                  htmlFor="companyName"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Company Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  disabled={updateProfileMutation.isPending}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Company Website (Optional)
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  disabled={updateProfileMutation.isPending}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="https://www.yourstartup.com"
                />
              </div>

              <div>
                <label
                  htmlFor="industry"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Industry <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  required
                  disabled={updateProfileMutation.isPending}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="e.g., Fintech, SaaS, E-commerce"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Location <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  disabled={updateProfileMutation.isPending}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="e.g., Algiers, San Francisco"
                />
              </div>

              <div>
                <label
                  htmlFor="teamSize"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Team Size <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  id="teamSize"
                  name="teamSize"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  required
                  min="1"
                  step="1"
                  disabled={updateProfileMutation.isPending}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="e.g., 12"
                />
              </div>

              <div>
                <label
                  htmlFor="yearlyRevenue"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Estimated Yearly Revenue ($){" "}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  id="yearlyRevenue"
                  name="yearlyRevenue"
                  value={yearlyRevenue}
                  onChange={(e) => setYearlyRevenue(e.target.value)}
                  required
                  min="0"
                  step="any"
                  disabled={updateProfileMutation.isPending}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="e.g., 500000"
                />
              </div>

              <div>
                <label
                  htmlFor="securityNeeds"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Primary Security Needs <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="securityNeeds"
                  name="securityNeeds"
                  rows={3}
                  required
                  value={securityNeeds}
                  onChange={(e) => setSecurityNeeds(e.target.value)}
                  disabled={updateProfileMutation.isPending}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="e.g., Penetration Testing, Security Training, Compliance Audit"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter needs separated by commas.
                </p>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Company Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={updateProfileMutation.isPending}
                  className="w-full text-sm bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500 disabled:opacity-50"
                  placeholder="What your company does..."
                />
              </div>

              {formError && !updateProfileMutation.error && (
                <div className="text-center text-sm text-red-300 border border-red-700/60 p-2 rounded-md mt-1">
                  {formError}
                </div>
              )}

              {updateProfileMutation.error && (
                <div className="text-center text-sm text-red-300 border border-red-700/60 p-2 rounded-md mt-1">
                  {updateProfileMutation.error.message}
                </div>
              )}

              <button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a4530] focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
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

export default StartupSetProfilePage;
