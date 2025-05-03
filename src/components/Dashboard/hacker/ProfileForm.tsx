// Suggested location: components/forms/ProfileForm.tsx
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
} from "lucide-react"; // Renamed Info import

// Mock function placeholders - Replace with your actual API calls
const fetchUserProfile = async (): Promise<UserProfileData> => {
  console.log("Fetching user profile...");
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
  // --- MOCK DATA ---
  return {
    username: "CyberNinja",
    fullName: "Alex Ryder",
    email: "alex.ryder@example.com",
    website: "https://alexryder.dev",
    location: "Sector 7G",
    bio: "Passionate about application security and finding edge cases.",
  };
  // --- END MOCK DATA ---
};

const updateUserProfile = async (
  data: Partial<UserProfileData>
): Promise<{ success: boolean }> => {
  console.log("Updating user profile with:", data);
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
  // --- MOCK RESPONSE ---
  return { success: Math.random() > 0.1 }; // Simulate potential failure
  // --- END MOCK RESPONSE ---
};

// Define the structure of the profile data
interface UserProfileData {
  username: string;
  fullName: string;
  email: string;
  website?: string;
  location?: string;
  bio?: string;
}

// -------- Main Profile Form Component --------
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
          changedData[key] = formData[key];
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
        setSuccessMessage("Profile synchronized successfully.");
        setInitialData({ ...formData }); // Update the initial data state after successful save
      } else {
        setError("Update rejected by server. Please try again.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Network communication failure. Unable to sync profile.");
    } finally {
      setIsSaving(false);
      // Optional: Auto-clear success message
      // if (successMessage) { setTimeout(() => setSuccessMessage(null), 5000); }
    }
  };

  // Loading State UI
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center p-10 bg-slate-800/80 rounded-lg shadow-lg min-h-[300px] border border-slate-700 text-center">
        <Loader2 className="animate-spin text-emerald-400 mb-3" size={32} />
        <span className="font-medium text-slate-200">
          Accessing User Matrix
        </span>
        <span className="text-sm text-slate-400">
          Establishing connection...
        </span>
      </div>
    );
  }

  // Main Form UI
  return (
    <div className="bg-slate-800/90 p-6 sm:p-8 rounded-lg shadow-xl border border-slate-700/50">
      <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
        <User size={20} className="text-emerald-400" /> Profile Configuration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <DarkInputFieldRefined
          label="Operator Callsign"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          icon={User}
          placeholder="Your unique handle"
        />
        <DarkInputFieldRefined
          label="Registered Name"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          icon={User}
          placeholder="Full legal name"
        />
        <DarkInputFieldRefined
          label="Secure Comm Link"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          icon={Mail}
          readOnly={true}
          onChange={() => {}}
          helpText="Primary channel cannot be modified via this interface."
        />
        <DarkInputFieldRefined
          label="Personal Web Node"
          id="website"
          name="website"
          type="url"
          value={formData.website || ""}
          onChange={handleInputChange}
          icon={Globe}
          placeholder="https://your-site.web"
        />
        <DarkInputFieldRefined
          label="Registered Location"
          id="location"
          name="location"
          value={formData.location || ""}
          onChange={handleInputChange}
          icon={Briefcase}
          placeholder="City, Sector, or Grid Coordinate"
        />

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Operator Dossier / Bio
          </label>
          <div className="mt-1 relative rounded-md shadow-sm group/textarea">
            <span
              className={`absolute top-3 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 group-focus-within/textarea:text-emerald-400`}
            >
              <InfoIconLucide
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              className={`block w-full pl-10 pr-3 py-2 border border-slate-600 bg-slate-700/60 text-slate-100 rounded-md placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out resize-none`}
              placeholder="Brief background, skills, and objectives..."
              value={formData.bio || ""}
              onChange={handleInputChange}
            />
            <div className="absolute bottom-1.5 right-1.5 h-3 w-3 border-l border-b border-emerald-700/40 opacity-40 group-focus-within/textarea:border-emerald-500 transition-colors"></div>
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
            <div className="flex items-center p-3 bg-green-900/50 border border-green-700/50 rounded-md text-sm shadow">
              <CheckCircle
                className="text-green-400 mr-2 flex-shrink-0"
                size={18}
              />
              <span className="text-green-300">{successMessage}</span>
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
              className={`inline-flex items-center group justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-600 transition-all duration-200 ease-in-out`}
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
        className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-150 group-focus-within:text-emerald-400`}
      >
        <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
      <input
        type={type}
        name={name}
        id={id}
        className={`block w-full pl-10 pr-3 py-2 border rounded-md sm:text-sm transition duration-150 ease-in-out focus:outline-none placeholder-slate-400 text-slate-100 bg-slate-700/60 ${
          readOnly
            ? "border-slate-700 text-slate-400 cursor-not-allowed ring-0 focus:ring-0"
            : "border-slate-600 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
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
