"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Globe,
  Info as InfoIconLucide,
  Save,
  Loader2,
  Briefcase,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
} from "lucide-react"; // Removed ImageIcon
import BaseUrl from "@/components/BaseUrl";

// Update the interface to match the API data structure
interface UserProfileData {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  avatar?: string;
  name: string;
  alias: string;
  description?: string;
  field?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  skills?: string[];
  email?: string; // We'll keep this for form compatibility
}

// API functions using BaseUrl
const fetchUserProfile = async (): Promise<UserProfileData> => {
  try {
    const response = await BaseUrl.get("/user/hacker/profile");
    console.log("Profile data received:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile data");
  }
};

// Define Axios error response interface
interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const updateUserProfile = async (
  data: Partial<UserProfileData>
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await BaseUrl.patch("/user/hacker/profile", data);
    return {
      success: true,
      message: response.data.message || "Profile updated successfully",
    };
  } catch (error: unknown) {
    console.error("Error updating profile:", error);
    const message =
      error instanceof Error && "response" in error
        ? (error as Error & AxiosErrorResponse).response?.data?.message ||
          "Failed to update profile"
        : "Failed to update profile";
    return { success: false, message };
  }
};

// -------- Main Profile Form Component --------
const ProfileForm: React.FC = () => {
  // Initialize formData with the new structure
  const [formData, setFormData] = useState<UserProfileData>({
    name: "",
    alias: "",
    description: "",
    field: "",
    github: "",
    linkedin: "",
    portfolio: "",
    skills: [],
    email: "",
  });
  const [initialData, setInitialData] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<boolean>(false);

  useEffect(() => {
    fetchUserProfile()
      .then((data) => {
        setFormData(data);
        setInitialData(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile data.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccessMessage(null);
    setError(null);
  };

  const handleAvatarError = () => {
    console.error("Avatar failed to load");
    setAvatarError(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSaving || isLoading) return; // Prevent double submit

    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    const changedData: Partial<UserProfileData> = {};
    if (initialData) {
      (Object.keys(formData) as Array<keyof UserProfileData>).forEach((key) => {
        if (formData[key] !== initialData[key]) {
          // Handle skills field specially to avoid type errors
          if (key === "skills") {
            // Ensure skills is always an array
            changedData[key] = Array.isArray(formData[key])
              ? formData[key]
              : formData[key]
              ? [formData[key] as string]
              : [];
          } else {
            // For all other fields, use normal assignment
            changedData[key] = formData[key];
          }
        }
      });
    }

    if (Object.keys(changedData).length === 0) {
      setSuccessMessage("No modifications detected.");
      setIsSaving(false);
      setTimeout(() => setSuccessMessage(null), 3000); // Clear message after a delay
      return;
    }

    try {
      const result = await updateUserProfile(changedData);
      if (result.success) {
        setSuccessMessage(result.message);
        setInitialData({ ...formData }); // Update the initial data state after successful save
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Network communication failure. Unable to sync profile.");
    } finally {
      setIsSaving(false);
    }
  };

  // Add a function to refresh profile data
  const refreshProfileData = () => {
    setIsLoading(true);
    setError(null);

    fetchUserProfile()
      .then((data) => {
        setFormData(data);
        setInitialData(data);
        setSuccessMessage("Profile data refreshed successfully");
        setTimeout(() => setSuccessMessage(null), 3000);
      })
      .catch((err) => {
        console.error("Failed to refresh profile:", err);
        setError("Failed to refresh profile data. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Loading State UI
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center p-10 bg-[#1a0a2e]/80 rounded-lg shadow-lg min-h-[300px] border border-purple-900/40 text-center">
        <Loader2 className="animate-spin text-purple-400 mb-3" size={32} />
        <span className="font-medium text-slate-200">Accessing User Data</span>
        <span className="text-sm text-slate-400">
          Retrieving profile information...
        </span>
      </div>
    );
  }

  // Error State UI - Show when failed to load profile with retry option
  if (error && !formData.alias) {
    return (
      <div className="flex flex-col justify-center items-center p-10 bg-[#1a0a2e]/80 rounded-lg shadow-lg min-h-[300px] border border-purple-900/40 text-center">
        <AlertTriangle className="text-red-400 mb-3" size={32} />
        <span className="font-medium text-slate-200 mb-2">
          Failed to Load Profile
        </span>
        <span className="text-sm text-slate-400 mb-4">{error}</span>
        <button
          onClick={refreshProfileData}
          className="flex items-center px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-md text-white transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </button>
      </div>
    );
  }

  // Main Form UI
  return (
    <div className="bg-[#1a0a2e]/90 p-6 sm:p-8 rounded-lg shadow-xl border border-purple-900/30">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
          <User size={20} className="text-purple-400" /> Profile Configuration
        </h2>

        <button
          type="button"
          onClick={refreshProfileData}
          disabled={isLoading || isSaving}
          className="text-purple-400 hover:text-purple-300 p-1 rounded-full hover:bg-purple-900/50 transition-colors"
          title="Refresh profile data"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Enhanced Avatar Display with improved background */}
        <div className="flex justify-center mb-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-3 border-purple-600/70 shadow-lg shadow-purple-900/30 bg-gradient-to-b from-[#2A0D45] to-[#180729]">
            {formData.avatar && !avatarError ? (
              <img
                src={formData.avatar}
                alt={`${formData.name}'s Avatar`}
                className="w-full h-full object-cover"
                onError={handleAvatarError}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-[#2A0D45] via-[#220A38] to-[#180729] text-purple-300">
                <User size={52} />
              </div>
            )}
          </div>
        </div>

        <DarkInputFieldRefined
          label="Operator Callsign"
          id="alias"
          name="alias"
          value={formData.alias || ""}
          onChange={handleInputChange}
          icon={User}
          placeholder="Your unique handle"
        />
        <DarkInputFieldRefined
          label="Registered Name"
          id="name"
          name="name"
          value={formData.name || ""}
          onChange={handleInputChange}
          icon={User}
          placeholder="Full legal name"
        />
        {formData.email && (
          <DarkInputFieldRefined
            label="Secure Comm Link"
            id="email"
            name="email"
            type="email"
            value={formData.email || ""}
            icon={Mail}
            readOnly={true}
            onChange={() => {}}
            helpText="Primary channel cannot be modified via this interface."
          />
        )}
        <DarkInputFieldRefined
          label="Field of Expertise"
          id="field"
          name="field"
          value={formData.field || ""}
          onChange={handleInputChange}
          icon={Briefcase}
          placeholder="Your main area of expertise"
        />
        <DarkInputFieldRefined
          label="Portfolio Website"
          id="portfolio"
          name="portfolio"
          type="url"
          value={formData.portfolio || ""}
          onChange={handleInputChange}
          icon={Globe}
          placeholder="https://your-site.web"
        />
        <DarkInputFieldRefined
          label="GitHub Profile"
          id="github"
          name="github"
          type="url"
          value={formData.github || ""}
          onChange={handleInputChange}
          icon={Globe}
          placeholder="https://github.com/yourusername"
        />
        <DarkInputFieldRefined
          label="LinkedIn Profile"
          id="linkedin"
          name="linkedin"
          type="url"
          value={formData.linkedin || ""}
          onChange={handleInputChange}
          icon={Globe}
          placeholder="https://linkedin.com/in/yourusername"
        />

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Operator Dossier / Bio
          </label>
          <div className="mt-1 relative rounded-md shadow-sm group/textarea">
            <span
              className={`absolute top-3 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 group-focus-within/textarea:text-purple-400`}
            >
              <InfoIconLucide
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
            <textarea
              id="description"
              name="description"
              rows={4}
              className={`block w-full pl-10 pr-3 py-2 border border-purple-900/50 bg-[#180729]/60 text-slate-100 rounded-md placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out resize-none`}
              placeholder="Brief background, skills, and objectives..."
              value={formData.description || ""}
              onChange={handleInputChange}
            />
            <div className="absolute bottom-1.5 right-1.5 h-3 w-3 border-l border-b border-purple-700/40 opacity-40 group-focus-within/textarea:border-purple-500 transition-colors"></div>
          </div>
        </div>

        <div className="pt-4 space-y-4">
          {error && (
            <div className="flex items-center p-3 bg-red-900/50 border border-red-700/50 rounded-md text-sm shadow">
              <AlertTriangle
                className="text-red-400 mr-2 flex-shrink-0"
                size={18}
              />
              <span className="text-red-300">{error}</span>
            </div>
          )}
          {successMessage && (
            <div className="flex items-center p-3 bg-purple-900/50 border border-purple-700/50 rounded-md text-sm shadow">
              <CheckCircle
                className="text-purple-400 mr-2 flex-shrink-0"
                size={18}
              />
              <span className="text-purple-300">{successMessage}</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={
                isLoading ||
                isSaving ||
                !initialData ||
                JSON.stringify(formData) === JSON.stringify(initialData)
              }
              className={`inline-flex items-center group justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-700 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#180729] focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-700 transition-all duration-200 ease-in-out`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />{" "}
                  Synchronizing...
                </>
              ) : (
                <>
                  <Save className="-ml-1 mr-1.5 h-4 w-4" /> Commit Changes
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

interface DarkInputFieldRefinedProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ElementType;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  helpText?: string;
}

const DarkInputFieldRefined: React.FC<DarkInputFieldRefinedProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  icon: Icon,
  type = "text",
  placeholder,
  readOnly = false,
  helpText,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-slate-300 mb-1.5"
    >
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm group">
      <span
        className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-150 group-focus-within:text-purple-400`}
      >
        <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
      <input
        type={type}
        name={name}
        id={id}
        className={`block w-full pl-10 pr-3 py-2 border rounded-md sm:text-sm transition duration-150 ease-in-out focus:outline-none placeholder-slate-400 text-slate-100 bg-[#180729]/60 ${
          readOnly
            ? "border-[#180729] text-slate-400 cursor-not-allowed ring-0 focus:ring-0"
            : "border-purple-900/50 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        disabled={readOnly}
        aria-describedby={helpText ? `${id}-help` : undefined}
      />
    </div>
    {helpText && (
      <p className="mt-1.5 text-xs text-slate-400" id={`${id}-help`}>
        {helpText}
      </p>
    )}
  </div>
);

export default ProfileForm;
