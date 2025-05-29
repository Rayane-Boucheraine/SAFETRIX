"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Shield,
  Calendar,
  FileText,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import programService from "@/services/programService";
import { CreateProgramDto, ProgramRewardType } from "@/types/program";

const vulnerabilityTypeOptions = [
  "Cross-Site Scripting (XSS)",
  "SQL Injection",
  "Cross-Site Request Forgery (CSRF)",
  "Server-Side Request Forgery (SSRF)",
  "Remote Code Execution (RCE)",
  "Local File Inclusion (LFI)",
  "Remote File Inclusion (RFI)",
  "Authentication Bypass",
  "Authorization Issues",
  "Information Disclosure",
  "Denial of Service (DoS)",
  "Business Logic Vulnerabilities",
  "Cryptographic Issues",
  "Session Management",
  "Input Validation",
  "Other",
];

export default function CreateProgramPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateProgramDto>({
    title: "",
    description: "",
    startDate: new Date(),
    endDate: undefined,
    rewardType: ProgramRewardType.CASH,
    minReward: 0,
    maxReward: 1000,
    scope: "",
    outOfScope: "",
    rules: "",
    vulnerabilityTypes: [],
  });

  const gradientBg =
    "bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#195033_6.63%,#080808_100%)]";

  const handleInputChange = (
    field: keyof CreateProgramDto,
    value: CreateProgramDto[keyof CreateProgramDto]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVulnerabilityTypeToggle = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      vulnerabilityTypes: prev.vulnerabilityTypes.includes(type)
        ? prev.vulnerabilityTypes.filter((t) => t !== type)
        : [...prev.vulnerabilityTypes, type],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.vulnerabilityTypes.length === 0) {
      setError("Please select at least one vulnerability type");
      return;
    }

    if (formData.minReward >= formData.maxReward) {
      setError("Maximum reward must be greater than minimum reward");
      return;
    }

    // Improved date validation
    if (formData.startDate && formData.endDate) {
      // Set time parts to noon to avoid timezone issues
      const startDate = new Date(formData.startDate);
      startDate.setHours(12, 0, 0, 0);

      const endDate = new Date(formData.endDate);
      endDate.setHours(12, 0, 0, 0);

      if (endDate <= startDate) {
        setError("End date must be after start date");
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);

      // Pass the original form data with Date objects to the service
      await programService.createProgram(formData);

      // Redirect to programs list or the created program
      router.push("/dashboard/startup/programs");
    } catch (error: unknown) {
      console.error("Failed to create program:", error);
      setError(
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message ||
          (error as Error).message ||
          "Failed to create program"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-full p-8 text-slate-200 ${gradientBg}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/startup/programs"
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <Shield size={24} className="text-emerald-400" />
            <div>
              <h1 className="text-2xl font-bold text-slate-200">
                Create New Program
              </h1>
              <p className="text-slate-400 mt-1">
                Set up your bug bounty program
              </p>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle
              className="text-red-400 flex-shrink-0 mt-0.5"
              size={20}
            />
            <div>
              <h3 className="text-red-300 font-medium">
                Error Creating Program
              </h3>
              <p className="text-red-200 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-slate-900/70 backdrop-blur-md border border-green-900/30 shadow-xl rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
              <FileText className="text-emerald-400" size={20} />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Program Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
                  placeholder="Enter program title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
                  placeholder="Describe your program and what you're looking for"
                />
              </div>
            </div>
          </div>

          {/* Dates and Rewards */}
          <div className="bg-slate-900/70 backdrop-blur-md border border-green-900/30 shadow-xl rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
              <Calendar className="text-emerald-400" size={20} />
              Timeline & Rewards
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate.toISOString().split("T")[0]}
                  onChange={(e) =>
                    handleInputChange("startDate", new Date(e.target.value))
                  }
                  className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  End Date (Optional)
                </label>
                <input
                  type="date"
                  value={
                    formData.endDate
                      ? formData.endDate.toISOString().split("T")[0]
                      : ""
                  }
                  min={formData.startDate.toISOString().split("T")[0]} // Prevent selecting dates before start date
                  onChange={(e) =>
                    handleInputChange(
                      "endDate",
                      e.target.value ? new Date(e.target.value) : undefined
                    )
                  }
                  className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Must be after the start date
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Reward Type *
                </label>
                <select
                  required
                  value={formData.rewardType}
                  onChange={(e) =>
                    handleInputChange(
                      "rewardType",
                      e.target.value as ProgramRewardType
                    )
                  }
                  className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
                >
                  <option value={ProgramRewardType.CASH}>Cash</option>
                  <option value={ProgramRewardType.SWAG}>Swag</option>
                  <option value={ProgramRewardType.BOTH}>Both</option>
                  <option value={ProgramRewardType.KUDOS}>Kudos</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Min Reward *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.minReward}
                    onChange={(e) =>
                      handleInputChange("minReward", Number(e.target.value))
                    }
                    className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Max Reward *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.maxReward}
                    onChange={(e) =>
                      handleInputChange("maxReward", Number(e.target.value))
                    }
                    className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scope and Rules */}
          <div className="bg-slate-900/70 backdrop-blur-md border border-green-900/30 shadow-xl rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-100 mb-6">
              Scope & Rules
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  In Scope *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.scope}
                  onChange={(e) => handleInputChange("scope", e.target.value)}
                  className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
                  placeholder="Define what's in scope for testing"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Out of Scope (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.outOfScope || ""}
                  onChange={(e) =>
                    handleInputChange("outOfScope", e.target.value)
                  }
                  className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
                  placeholder="Define what's out of scope"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Rules and Guidelines *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.rules}
                  onChange={(e) => handleInputChange("rules", e.target.value)}
                  className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
                  placeholder="Define the rules and guidelines for researchers"
                />
              </div>
            </div>
          </div>

          {/* Vulnerability Types */}
          <div className="bg-slate-900/70 backdrop-blur-md border border-green-900/30 shadow-xl rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-100 mb-6">
              Vulnerability Types *
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {vulnerabilityTypeOptions.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-emerald-700/50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.vulnerabilityTypes.includes(type)}
                    onChange={() => handleVulnerabilityTypeToggle(type)}
                    className="rounded border-slate-600 text-emerald-500 focus:ring-emerald-500/30"
                  />
                  <span className="text-sm text-slate-300">{type}</span>
                </label>
              ))}
            </div>

            {formData.vulnerabilityTypes.length === 0 && (
              <p className="text-amber-400 text-sm mt-3">
                Please select at least one vulnerability type
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6">
            <Link
              href="/dashboard/startup/programs"
              className="px-6 py-2.5 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 rounded-md transition-all duration-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 border border-emerald-500 hover:border-emerald-400 text-white rounded-md transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Create Program
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
