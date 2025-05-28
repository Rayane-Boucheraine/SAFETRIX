"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  User,
  Building,
  MapPin,
  Users,
  DollarSign,
  Shield,
  AlertCircle,
  Loader,
} from "lucide-react";
import startupProfileService, {
  StartupProfile,
  UpdateStartupProfileDto,
} from "@/services/startupProfileService";

const securityNeedsOptions = [
  "Web Application Security",
  "Mobile Application Security",
  "API Security",
  "Cloud Security",
  "Network Security",
  "Database Security",
  "Infrastructure Security",
  "Compliance & Governance",
  "Incident Response",
  "Security Training",
];

const ProfileSettings: React.FC = () => {
  const [profile, setProfile] = useState<StartupProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<UpdateStartupProfileDto>({
    name: "",
    industry: "",
    description: "",
    location: "",
    team_size: 0,
    security_needs: [],
    yearly_revenue: 0,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const profileData = await startupProfileService.getStartupProfile();
      console.log(profileData);
      
      setProfile(profileData);
      setFormData({
        name: profileData.name,
        industry: profileData.industry,
        description: profileData.description,
        location: profileData.location,
        team_size: profileData.team_size,
        security_needs: profileData.security_needs,
        yearly_revenue: profileData.yearly_revenue,
      });
    } catch (error: unknown) {
      console.error("Failed to fetch profile:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof UpdateStartupProfileDto,
    value: string | number | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSecurityNeedToggle = (need: string) => {
    setFormData((prev) => ({
      ...prev,
      security_needs: prev.security_needs?.includes(need)
        ? prev.security_needs.filter((n) => n !== need)
        : [...(prev.security_needs || []), need],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      await startupProfileService.updateStartupProfile(formData);
      setSuccess("Profile updated successfully!");

      // Refresh profile data
      await fetchProfile();
    } catch (error: unknown) {
      console.error("Failed to update profile:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-4">
          <Loader className="animate-spin text-emerald-500" size={36} />
          <p className="text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="mx-auto text-red-400 mb-4" size={36} />
        <h3 className="text-xl font-semibold text-slate-300 mb-2">
          Error Loading Profile
        </h3>
        <p className="text-slate-400 max-w-lg mx-auto mb-4">{error}</p>
        <button
          className="px-4 py-2 bg-emerald-600/30 text-emerald-300 rounded-md hover:bg-emerald-600/50 border border-emerald-700/50"
          onClick={fetchProfile}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Messages */}
      {error && (
        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle
            className="text-red-400 flex-shrink-0 mt-0.5"
            size={20}
          />
          <div>
            <h3 className="text-red-300 font-medium">Error</h3>
            <p className="text-red-200 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 flex items-start gap-3">
          <div className="bg-green-500 rounded-full p-1">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div>
            <h3 className="text-green-300 font-medium">Success</h3>
            <p className="text-green-200 text-sm mt-1">{success}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <User size={16} className="inline mr-2" />
              Company Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Building size={16} className="inline mr-2" />
              Industry *
            </label>
            <input
              type="text"
              required
              value={formData.industry}
              onChange={(e) => handleInputChange("industry", e.target.value)}
              className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
              placeholder="e.g., Technology, Healthcare, Finance"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <MapPin size={16} className="inline mr-2" />
              Location *
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
              placeholder="Enter company location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Users size={16} className="inline mr-2" />
              Team Size *
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.team_size}
              onChange={(e) =>
                handleInputChange("team_size", Number(e.target.value))
              }
              className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
              placeholder="Number of employees"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <DollarSign size={16} className="inline mr-2" />
              Yearly Revenue *
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.yearly_revenue}
              onChange={(e) =>
                handleInputChange("yearly_revenue", Number(e.target.value))
              }
              className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
              placeholder="Annual revenue in USD"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Company Description *
          </label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
            placeholder="Describe your company and what you do"
          />
        </div>

        {/* Security Needs */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-4">
            <Shield size={16} className="inline mr-2" />
            Security Needs *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {securityNeedsOptions.map((need) => (
              <label
                key={need}
                className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-emerald-700/50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={formData.security_needs?.includes(need) || false}
                  onChange={() => handleSecurityNeedToggle(need)}
                  className="rounded border-slate-600 text-emerald-500 focus:ring-emerald-500/30"
                />
                <span className="text-sm text-slate-300">{need}</span>
              </label>
            ))}
          </div>
          {(!formData.security_needs ||
            formData.security_needs.length === 0) && (
            <p className="text-amber-400 text-sm mt-3">
              Please select at least one security need
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-slate-700/50">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 border border-emerald-500 hover:border-emerald-400 text-white rounded-md transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
