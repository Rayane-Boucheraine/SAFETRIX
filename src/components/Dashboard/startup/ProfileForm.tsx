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
  Terminal,
} from "lucide-react";

interface UserProfileData {
  username: string;
  fullName: string;
  email: string;
  website?: string;
  location?: string;
  bio?: string;
}

const fetchUserProfile = async (): Promise<UserProfileData> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    username: "StartupAdmin",
    fullName: "Admin User",
    email: "admin@startup.com",
    website: "https://startup.com",
    location: "HQ - Sector 4",
    bio: "Platform administrator managing programs and operations.",
  };
};
const updateUserProfile = async (
  data: Partial<UserProfileData>
): Promise<{ success: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  console.log("Updating Startup Profile:", data);
  return { success: Math.random() > 0.1 };
};

const ProfileForm: React.FC = () => {
  const [formData, setFormData] = useState<UserProfileData>({
    username: "",
    fullName: "",
    email: "",
    website: "",
    location: "",
    bio: "",
  });
  const [initialData, setInitialData] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchUserProfile()
      .then((data) => {
        setFormData(data);
        setInitialData(data);
        setError(null);
      })
      .catch(() => {
        setError("System error: Unable to load profile.");
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    const changedData: Partial<UserProfileData> = {};
    if (initialData) {
      (Object.keys(formData) as Array<keyof UserProfileData>).forEach((key) => {
        if (formData[key] !== initialData[key]) {
          changedData[key] = formData[key];
        }
      });
    }
    if (Object.keys(changedData).length === 0) {
      setSuccessMessage("No changes detected.");
      setIsSaving(false);
      setTimeout(() => setSuccessMessage(null), 3000);
      return;
    }
    try {
      const result = await updateUserProfile(changedData);
      if (result.success) {
        setSuccessMessage("User profile updated successfully.");
        setInitialData({ ...formData });
      } else {
        setError("Update failed. Server rejected changes.");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setError("Network failure. Profile update could not be completed.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center p-10 bg-slate-900/60 backdrop-blur-md rounded-xl shadow-lg min-h-[300px] border border-slate-700/50">
        <Loader2 className="animate-spin text-emerald-400 mb-3" size={32} />
        <span className="font-medium text-slate-200">
          Loading Profile Data...
        </span>
      </div>
    );
  }

  const cardBaseStyle = `bg-gradient-to-br from-slate-900/70 via-black/60 to-slate-900/70 backdrop-blur-xl p-6 sm:p-8 rounded-xl shadow-xl border border-emerald-900/40 relative isolate overflow-hidden`;
  const themeAccentRingFocus = `focus:ring-${"emerald"}-500`;
  const themeAccentBorderFocus = `focus:border-${"emerald"}-500`;

  return (
    <div className={`${cardBaseStyle} group`}>
      <div className="absolute top-0 left-0 w-1/2 h-px bg-gradient-to-r from-emerald-500/50 to-transparent opacity-80"></div>
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <DarkInputFieldCyberV2
          label="Username"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          icon={Terminal}
          placeholder="Internal User ID"
          themeAccentRingFocus={themeAccentRingFocus}
          themeAccentBorderFocus={themeAccentBorderFocus}
        />
        <DarkInputFieldCyberV2
          label="Full Name"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          icon={User}
          placeholder="Team Member Full Name"
          themeAccentRingFocus={themeAccentRingFocus}
          themeAccentBorderFocus={themeAccentBorderFocus}
        />
        <DarkInputFieldCyberV2
          label="Contact Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          icon={Mail}
          readOnly={true}
          onChange={() => {}}
          helpText="Login email address (cannot be changed)."
          themeAccentRingFocus={themeAccentRingFocus}
          themeAccentBorderFocus={themeAccentBorderFocus}
        />
        <DarkInputFieldCyberV2
          label="Associated Website"
          id="website"
          name="website"
          type="url"
          value={formData.website || ""}
          onChange={handleInputChange}
          icon={Globe}
          placeholder="https://company-website.com"
          themeAccentRingFocus={themeAccentRingFocus}
          themeAccentBorderFocus={themeAccentBorderFocus}
        />
        <DarkInputFieldCyberV2
          label="Department / Location"
          id="location"
          name="location"
          value={formData.location || ""}
          onChange={handleInputChange}
          icon={Briefcase}
          placeholder="e.g., Security Operations - HQ"
          themeAccentRingFocus={themeAccentRingFocus}
          themeAccentBorderFocus={themeAccentBorderFocus}
        />
        <div>
          <label
            htmlFor="bio"
            className="block text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1.5"
          >
            User Bio / Notes
          </label>
          <div className="mt-1 relative rounded-md shadow-sm group/textarea">
            <span
              className={`absolute top-3 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-200 group-focus-within/textarea:text-emerald-400`}
            >
              <InfoIconLucide
                className="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            </span>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              className={`block w-full pl-11 pr-4 py-2.5 border border-emerald-900/50 rounded-md sm:text-sm shadow-inner resize-none bg-gradient-to-b from-slate-800/80 to-black/70 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 ${themeAccentRingFocus} focus:border-transparent transition duration-150 ease-in-out`}
              placeholder="Internal notes about the user..."
              value={formData.bio || ""}
              onChange={handleInputChange}
            />
            <div className="absolute bottom-1.5 right-1.5 h-3 w-3 border-l border-b border-emerald-700/40 opacity-40 group-focus-within/textarea:border-emerald-500 transition-colors"></div>
          </div>
        </div>
        <div className="pt-5 space-y-4">
          {error && (
            <div className="flex items-start p-3 bg-red-900/70 border border-red-600/50 rounded-lg text-sm shadow-md backdrop-blur-sm">
              <AlertTriangle
                className="text-red-400 mr-2.5 mt-0.5 flex-shrink-0"
                size={18}
              />
              <div>
                <span className="font-medium text-red-300 block">
                  Update Failed
                </span>
                <span className="text-red-400 text-xs">{error}</span>
              </div>
            </div>
          )}
          {successMessage && (
            <div className="flex items-start p-3 bg-green-900/70 border border-green-600/50 rounded-lg text-sm shadow-md backdrop-blur-sm">
              <CheckCircle
                className="text-green-400 mr-2.5 mt-0.5 flex-shrink-0"
                size={18}
              />
              <div>
                <span className="font-medium text-green-300 block">
                  Confirmation
                </span>
                <span className="text-green-400 text-xs">{successMessage}</span>
              </div>
            </div>
          )}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={
                isLoading ||
                isSaving ||
                !initialData ||
                JSON.stringify(formData) === JSON.stringify(initialData)
              }
              className={`inline-flex items-center group justify-center px-6 py-2.5 border border-emerald-600/70 text-sm font-semibold rounded-lg shadow-lg text-emerald-100 bg-gradient-to-br from-emerald-700/50 to-emerald-800/70 hover:from-emerald-600/60 hover:to-emerald-700/80 hover:text-white hover:shadow-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900/80 ${themeAccentRingFocus} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:from-emerald-700/50 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]`}
            >
              {" "}
              {isSaving ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />{" "}
                  Saving...
                </>
              ) : (
                <>
                  <Save className="-ml-1 mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-105" />{" "}
                  Save Profile Changes
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-emerald-900/50 rounded-br-xl pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
    </div>
  );
};

interface DarkInputFieldCyberPropsV2 {
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
  themeAccentRingFocus: string;
  themeAccentBorderFocus: string;
}

const DarkInputFieldCyberV2: React.FC<DarkInputFieldCyberPropsV2> = ({
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
  themeAccentRingFocus,
}) => (
  <div className="relative">
    <label
      htmlFor={id}
      className="block text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1.5"
    >
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm group/input">
      <span
        className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-200 group-focus-within/input:text-emerald-400`}
      >
        <Icon className="h-5 w-5 text-gray-500" aria-hidden="true" />
      </span>
      <input
        type={type}
        name={name}
        id={id}
        className={`block w-full pl-11 pr-4 py-2.5 border border-emerald-900/50 rounded-md sm:text-sm shadow-inner transition duration-150 ease-in-out focus:outline-none placeholder-slate-500/90 text-slate-100 bg-gradient-to-b from-slate-800/80 to-black/70 hover:border-emerald-800/70 ${
          readOnly
            ? "border-slate-700/80 bg-slate-900/90 text-slate-400 cursor-not-allowed ring-0 focus:ring-0 focus:border-slate-700/80"
            : `focus:ring-1 ${themeAccentRingFocus} focus:border-transparent`
        } `}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        disabled={readOnly}
        aria-describedby={helpText ? `${id}-help` : undefined}
      />
      <div className="absolute top-1.5 right-1.5 h-3 w-3 border-r border-t border-emerald-700/40 opacity-40 group-focus-within/input:border-emerald-500 transition-colors"></div>
    </div>
    {helpText && (
      <p
        className="mt-1.5 text-[11px] text-slate-400 opacity-80"
        id={`${id}-help`}
      >
        {helpText}
      </p>
    )}
  </div>
);

export default ProfileForm;
