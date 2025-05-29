"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Bug,
  Shield,
  AlertCircle,
  Plus,
  X,
  Upload,
} from "lucide-react";
import Link from "next/link";
import reportService from "@/services/reportService";
import programService from "@/services/programService";
import { CreateReportData, ReportSeverity } from "@/services/reportService";
import { Program, ProgramRewardType, ProgramStatus } from "@/types/program"; // Add ProgramRewardType and ProgramStatus import

interface ApiProgramData {
  id: string;
  title: string;
  description: string;
  status: string; // API might send status as string
  minReward?: number;
  maxReward?: number;
  createdAt: string;
  updatedAt?: string;
  startDate?: string;
  rewardType?: ProgramRewardType;
  scope?: string;
  rules?: string; // Add rules if it can come from API
  vulnerabilityTypes?: string[]; // Add vulnerabilityTypes if it can come from API
  startup?: { id: string; name: string };
  rewardRange?: string;
}

export default function CreateReportPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [programsLoading, setProgramsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);

  // Initialize form data with proofUrls already included
  const [formData, setFormData] = useState<CreateReportData>({
    title: "",
    description: "",
    programId: "",
    severity: ReportSeverity.MEDIUM,
    impact: "",
    stepsToReproduce: "",
    proofUrls: [""],
    fixRecommendation: "",
  });

  useEffect(() => {
    fetchActivePrograms();
  }, []);

  // Corrected fetchActivePrograms function
  const fetchActivePrograms = async () => {
    try {
      setProgramsLoading(true);
      setError(null);
      const response = await programService.getActivePrograms();

      let programsData: Program[] = [];

      const mapApiProgToProgram = (apiProg: ApiProgramData): Program => ({
        id: apiProg.id,
        title: apiProg.title,
        description: apiProg.description,
        status: apiProg.status as ProgramStatus, // Cast API string status to ProgramStatus enum
        minReward: apiProg.minReward ?? 0,
        maxReward: apiProg.maxReward ?? 0,
        createdAt: apiProg.createdAt,
        updatedAt: apiProg.updatedAt || apiProg.createdAt,
        name: apiProg.title,
        type: "Public" as const,
        startDate: apiProg.startDate || apiProg.createdAt,
        rewardType: apiProg.rewardType || ("MONETARY" as ProgramRewardType),
        scope: typeof apiProg.scope === "string" ? apiProg.scope : "",
        rules: apiProg.rules || "", // Provide default if not in API response
        vulnerabilityTypes: Array.isArray(apiProg.vulnerabilityTypes)
          ? apiProg.vulnerabilityTypes.filter(
              (item): item is string => typeof item === "string"
            )
          : [], // Provide default if not in API response
        startup: apiProg.startup || { id: "", name: "Unknown Company" },
        rewardRange:
          apiProg.rewardRange ||
          `$${apiProg.minReward ?? 0} - $${apiProg.maxReward ?? 0}`,
      });

      if (response) {
        if (
          typeof response === "object" &&
          response !== null &&
          "data" in response &&
          Array.isArray((response as { data: unknown }).data)
        ) {
          programsData = ((response as { data: ApiProgramData[] }).data as ApiProgramData[]).map(
            mapApiProgToProgram
          );
        } else if (Array.isArray(response)) {
          programsData = (response as ApiProgramData[]).map(
            mapApiProgToProgram
          );
        }
      }

      setPrograms(programsData);
    } catch (error: unknown) {
      console.error("Failed to fetch programs:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load available programs"
      );
    } finally {
      setProgramsLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof CreateReportData,
    value: CreateReportData[keyof CreateReportData]
  ) => {
    setFormData((prev: CreateReportData) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProofUrlChange = (index: number, value: string) => {
    // Always ensure proofUrls is an array
    const newUrls = [...(formData.proofUrls || [])];
    newUrls[index] = value;

    setFormData((prev) => ({
      ...prev,
      proofUrls: newUrls,
    }));
  };

  const addProofUrl = () => {
    setFormData((prev) => ({
      ...prev,
      proofUrls: [...(prev.proofUrls || []), ""],
    }));
  };

  const removeProofUrl = (index: number) => {
    if ((formData.proofUrls || []).length > 1) {
      const newUrls = (formData.proofUrls || []).filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        proofUrls: newUrls,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.programId) {
      setError("Please select a program");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Filter out empty proof URLs before submission
      const submissionData = {
        ...formData,
        proofUrls: (formData.proofUrls || []).filter(
          (url) => url.trim() !== ""
        ),
      };

      await reportService.createReport(submissionData);
      router.push("/dashboard/hacker/reports");
    } catch (error: unknown) {
      console.error("Failed to create report:", error);
      setError(
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message ||
          (error instanceof Error ? error.message : "Failed to create report")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 text-slate-200 max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/hacker/reports"
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-900/30 rounded-lg border border-purple-500/30">
            <Bug size={24} className="text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100">
              Submit Vulnerability Report
            </h1>
            <p className="text-slate-400 mt-1">
              Report a security vulnerability you&apos;ve discovered
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
            <h3 className="text-red-300 font-medium">Error Creating Report</h3>
            <p className="text-red-200 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Programs Loading */}
      {programsLoading && (
        <div className="bg-slate-800/50 rounded-lg p-4 flex items-center gap-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-400"></div>
          <span className="text-slate-300">Loading available programs...</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Program Selection */}
        <div className="bg-slate-800/70 border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
            <Shield className="text-purple-400" size={20} />
            Program Selection
          </h2>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Select Program *
            </label>
            <select
              required
              value={formData.programId}
              onChange={(e) => handleInputChange("programId", e.target.value)}
              className="w-full bg-slate-700/70 border border-slate-600/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
            >
              <option value="">Choose a program...</option>
              {programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.title} - {program.startup?.name || "Unknown Company"}
                </option>
              ))}
            </select>
            {programs.length === 0 && !programsLoading && (
              <p className="text-amber-400 text-sm mt-2">
                No active programs available at the moment.
              </p>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-slate-800/70 border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-6">
            Vulnerability Details
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Vulnerability Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full bg-slate-700/70 border border-slate-600/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                placeholder="e.g., XSS Vulnerability in User Profile"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Severity *
                </label>
                <select
                  required
                  value={formData.severity}
                  onChange={(e) =>
                    handleInputChange(
                      "severity",
                      e.target.value as ReportSeverity
                    )
                  }
                  className="w-full bg-slate-700/70 border border-slate-600/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                >
                  <option value={ReportSeverity.LOW}>Low</option>
                  <option value={ReportSeverity.MEDIUM}>Medium</option>
                  <option value={ReportSeverity.HIGH}>High</option>
                  <option value={ReportSeverity.CRITICAL}>Critical</option>
                </select>
              </div>
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
                className="w-full bg-slate-700/70 border border-slate-600/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                placeholder="Provide a detailed description of the vulnerability"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Impact
              </label>
              <textarea
                rows={3}
                value={formData.impact || ""}
                onChange={(e) => handleInputChange("impact", e.target.value)}
                className="w-full bg-slate-700/70 border border-slate-600/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                placeholder="Describe the potential impact of this vulnerability"
              />
            </div>
          </div>
        </div>

        {/* Steps to Reproduce */}
        <div className="bg-slate-800/70 border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-6">
            Reproduction Steps
          </h2>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Steps to Reproduce *
            </label>
            <textarea
              required
              rows={6}
              value={formData.stepsToReproduce}
              onChange={(e) =>
                handleInputChange("stepsToReproduce", e.target.value)
              }
              className="w-full bg-slate-700/70 border border-slate-600/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
              placeholder="1. Go to...
2. Click on...
3. Enter...
4. Observe..."
            />
          </div>
        </div>

        {/* Proof of Concept */}
        <div className="bg-slate-800/70 border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
            <Upload className="text-purple-400" size={20} />
            Proof of Concept
          </h2>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Proof URLs (Screenshots, Videos, etc.)
            </label>

            {/* Render the proof URLs from formData instead of a separate state */}
            {(formData.proofUrls || []).map((url, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleProofUrlChange(index, e.target.value)}
                  className="flex-1 bg-slate-700/70 border border-slate-600/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                  placeholder="https://example.com/screenshot.png"
                />
                {(formData.proofUrls || []).length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProofUrl(index)}
                    className="p-2.5 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addProofUrl}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm"
            >
              <Plus size={16} />
              Add another URL
            </button>
          </div>
        </div>

        {/* Fix Recommendation */}
        <div className="bg-slate-800/70 border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-6">
            Remediation
          </h2>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Fix Recommendation
            </label>
            <textarea
              rows={4}
              value={formData.fixRecommendation || ""}
              onChange={(e) =>
                handleInputChange("fixRecommendation", e.target.value)
              }
              className="w-full bg-slate-700/70 border border-slate-600/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
              placeholder="Suggest how this vulnerability can be fixed"
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <Link
            href="/dashboard/hacker/reports"
            className="px-6 py-2.5 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 rounded-md transition-all duration-200"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading || programsLoading}
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 border border-purple-500 hover:border-purple-400 text-white rounded-md transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Submitting...
              </>
            ) : (
              <>
                <Save size={16} />
                Submit Report
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
