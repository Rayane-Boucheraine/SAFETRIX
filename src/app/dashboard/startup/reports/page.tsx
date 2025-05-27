"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Calendar,
  Filter,
  X,
  Shield,
  FileText,
  AlertTriangle,
  Bug,
  BarChart3,
  Settings,
  Eye,
  Clock,
  Activity,
} from "lucide-react";

// --- Mock Reports Data ---
const mockReports: Report[] = [
  {
    id: "RPT-1234",
    title: "XSS Vulnerability in User Profile",
    submittedBy: "CyberNinja",
    program: "FinTech Innovations",
    status: "Triaged" as ReportStatus,
    severity: "High" as ReportSeverity,
    submittedAt: "2023-10-26T10:00:00Z",
    updatedAt: "2023-10-27T15:30:00Z",
  },
  {
    id: "RPT-1230",
    title: "Insecure Direct Object Reference (IDOR) on Order Details",
    submittedBy: "ByteGhost",
    program: "ACME Corp",
    status: "Resolved" as ReportStatus,
    severity: "Medium" as ReportSeverity,
    submittedAt: "2023-10-25T14:15:00Z",
    updatedAt: "2023-10-28T09:00:00Z",
    reward: 800,
  },
  {
    id: "RPT-1235",
    title: "CSRF Token Bypass on Settings Update",
    submittedBy: "SecurityWizard",
    program: "GamerConnect",
    status: "Needs Info" as ReportStatus,
    severity: "Medium" as ReportSeverity,
    submittedAt: "2023-10-28T11:00:00Z",
    updatedAt: "2023-10-28T11:00:00Z",
  },
  {
    id: "RPT-1199",
    title: "SQL Injection possibility via Search Parameter",
    submittedBy: "DataSeeker",
    program: "DataCorp AI",
    status: "Duplicate" as ReportStatus,
    severity: "Critical" as ReportSeverity,
    submittedAt: "2023-10-20T08:00:00Z",
    updatedAt: "2023-10-21T12:00:00Z",
  },
  {
    id: "RPT-1245",
    title: "Authentication Bypass via JWT Manipulation",
    submittedBy: "TokenBreaker",
    program: "CloudSecure",
    status: "New" as ReportStatus,
    severity: "Critical" as ReportSeverity,
    submittedAt: "2023-10-28T14:22:00Z",
    updatedAt: "2023-10-28T14:22:00Z",
  },
];

type ReportStatus = "New" | "Triaged" | "Needs Info" | "Resolved" | "Duplicate";
type ReportSeverity = "Critical" | "High" | "Medium" | "Low";

interface Report {
  id: string;
  title: string;
  submittedBy: string;
  program: string;
  status: ReportStatus;
  severity: ReportSeverity;
  submittedAt: string;
  updatedAt: string;
  reward?: number;
}

// --- Styling Helpers ---
const getStatusStyles = (status: ReportStatus) => {
  switch (status) {
    case "New":
      return {
        color: "text-emerald-400",
        bgColor: "bg-emerald-900/50",
        borderColor: "border-emerald-700/50",
      };
    case "Triaged":
      return {
        color: "text-blue-400",
        bgColor: "bg-blue-900/50",
        borderColor: "border-blue-700/50",
      };
    case "Needs Info":
      return {
        color: "text-amber-400",
        bgColor: "bg-amber-900/50",
        borderColor: "border-amber-700/50",
      };
    case "Resolved":
      return {
        color: "text-green-400",
        bgColor: "bg-green-900/50",
        borderColor: "border-green-700/50",
      };
    case "Duplicate":
      return {
        color: "text-slate-400",
        bgColor: "bg-slate-800/50",
        borderColor: "border-slate-700/50",
      };
    default:
      return {
        color: "text-slate-400",
        bgColor: "bg-slate-800/50",
        borderColor: "border-slate-700/50",
      };
  }
};

const getSeverityStyles = (severity: ReportSeverity) => {
  switch (severity) {
    case "Critical":
      return {
        color: "text-red-400",
        bgColor: "bg-red-900/50",
        borderColor: "border-red-700/50",
      };
    case "High":
      return {
        color: "text-orange-400",
        bgColor: "bg-orange-900/50",
        borderColor: "border-orange-700/50",
      };
    case "Medium":
      return {
        color: "text-amber-400",
        bgColor: "bg-amber-900/50",
        borderColor: "border-amber-700/50",
      };
    case "Low":
      return {
        color: "text-blue-400",
        bgColor: "bg-blue-900/50",
        borderColor: "border-blue-700/50",
      };
    default:
      return {
        color: "text-slate-400",
        bgColor: "bg-slate-800/50",
        borderColor: "border-slate-700/50",
      };
  }
};

// --- Main Reports Dashboard Page ---
export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    status: ReportStatus | null;
    severity: ReportSeverity | null;
    program: string | null;
  }>({
    status: null,
    severity: null,
    program: null,
  });
  const [viewMode, setViewMode] = useState<"list" | "grid" | "stats">("list");

  // Filter reports based on search and filters
  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      !searchTerm ||
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      !activeFilters.status || report.status === activeFilters.status;
    const matchesSeverity =
      !activeFilters.severity || report.severity === activeFilters.severity;
    const matchesProgram =
      !activeFilters.program || report.program === activeFilters.program;

    return matchesSearch && matchesStatus && matchesSeverity && matchesProgram;
  });

  // Get unique programs for filter dropdown
  const uniquePrograms = [
    ...new Set(mockReports.map((report) => report.program)),
  ];

  // Handle filter change
  const handleFilterChange = (
    filterType: "status" | "severity" | "program",
    value: string
  ) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value === "All" ? null : value,
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setActiveFilters({
      status: null,
      severity: null,
      program: null,
    });
  };

  // Theme styles
  const gradientBg =
    "bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#195033_6.63%,#080808_100%)]";
  const themeAccentText = "text-emerald-400";
  const cardBaseStyle =
    "bg-slate-900/70 backdrop-blur-md border border-green-900/30 shadow-xl rounded-xl p-5 relative overflow-hidden isolate group";

  return (
    <div className={`min-h-full p-8 text-slate-200 ${gradientBg}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-green-800/40 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-emerald-800/30 to-slate-900 rounded-xl border border-emerald-600/60 shadow-lg">
              <Bug size={28} className={themeAccentText} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-100 tracking-tight">
                Vulnerability Reports
              </h1>
              <p className="text-slate-400 mt-1 text-sm">
                Review, triage, and respond to security vulnerabilities.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode("stats")}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200
                ${
                  viewMode === "stats"
                    ? "bg-emerald-600/30 text-emerald-200 border border-emerald-500/50"
                    : "border border-slate-700 text-slate-300 hover:bg-slate-700/50"
                }`}
            >
              <BarChart3 size={16} />
              <span className="hidden sm:inline">Stats</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200
                ${
                  viewMode === "grid"
                    ? "bg-emerald-600/30 text-emerald-200 border border-emerald-500/50"
                    : "border border-slate-700 text-slate-300 hover:bg-slate-700/50"
                }`}
            >
              <Shield size={16} />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200
                ${
                  viewMode === "list"
                    ? "bg-emerald-600/30 text-emerald-200 border border-emerald-500/50"
                    : "border border-slate-700 text-slate-300 hover:bg-slate-700/50"
                }`}
            >
              <FileText size={16} />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className={cardBaseStyle + " p-4"}>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-grow min-w-[250px]">
              <input
                type="text"
                placeholder="Search reports by ID, title, or reporter..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800/70 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-400/80 focus:outline-none focus:ring-1 focus:ring-emerald-500/80 focus:border-transparent text-sm shadow-inner"
              />
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <div className="hidden sm:flex items-center text-slate-400 mr-1">
                <Filter size={16} className="mr-1.5" /> Filters:
              </div>

              {/* Status Filter */}
              <FilterDropdown
                label="Status"
                options={[
                  "All",
                  "New",
                  "Triaged",
                  "Needs Info",
                  "Resolved",
                  "Duplicate",
                ]}
                value={activeFilters.status || "All"}
                onChange={(value) => handleFilterChange("status", value)}
                themeColor="emerald"
              />

              {/* Severity Filter */}
              <FilterDropdown
                label="Severity"
                options={["All", "Critical", "High", "Medium", "Low"]}
                value={activeFilters.severity || "All"}
                onChange={(value) => handleFilterChange("severity", value)}
                themeColor="emerald"
              />

              {/* Program Filter */}
              <FilterDropdown
                label="Program"
                options={["All", ...uniquePrograms]}
                value={activeFilters.program || "All"}
                onChange={(value) => handleFilterChange("program", value)}
                themeColor="emerald"
              />

              {/* Clear Filters Button */}
              {(activeFilters.status ||
                activeFilters.severity ||
                activeFilters.program ||
                searchTerm) && (
                <button
                  onClick={clearFilters}
                  title="Clear Filters"
                  className="p-2 rounded-md bg-slate-700/60 text-slate-400 hover:bg-red-900/50 hover:text-red-400 border border-slate-600/60 hover:border-red-700/70 transition-colors duration-150"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Active Filter Indicators */}
        {(activeFilters.status ||
          activeFilters.severity ||
          activeFilters.program) && (
          <div className="flex flex-wrap gap-2 items-center text-sm">
            <span className="text-slate-400">Active filters:</span>

            {activeFilters.status && (
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                Status: {activeFilters.status}
                <X
                  size={14}
                  className="cursor-pointer hover:text-red-400"
                  onClick={() => handleFilterChange("status", "All")}
                />
              </span>
            )}

            {activeFilters.severity && (
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                Severity: {activeFilters.severity}
                <X
                  size={14}
                  className="cursor-pointer hover:text-red-400"
                  onClick={() => handleFilterChange("severity", "All")}
                />
              </span>
            )}

            {activeFilters.program && (
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                Program: {activeFilters.program}
                <X
                  size={14}
                  className="cursor-pointer hover:text-red-400"
                  onClick={() => handleFilterChange("program", "All")}
                />
              </span>
            )}
          </div>
        )}

        {/* Reports List */}
        <div>
          <p className="text-slate-400 text-sm mb-5">
            Showing{" "}
            <span className="font-semibold text-emerald-300">
              {filteredReports.length}
            </span>{" "}
            of {mockReports.length} reports
          </p>

          {filteredReports.length > 0 ? (
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-800/50 rounded-lg border border-slate-700/50 backdrop-blur-sm">
              <AlertTriangle
                size={48}
                className="mx-auto text-slate-500 mb-4 opacity-50"
              />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">
                No Reports Found
              </h3>
              <p className="text-slate-400 max-w-lg mx-auto">
                No reports match your current search criteria. Try adjusting
                your filters or search term.
              </p>
              <button
                onClick={clearFilters}
                className="mt-6 px-5 py-2 bg-emerald-600/40 text-emerald-300 rounded-md hover:bg-emerald-600/60 border border-emerald-600/50 transition-all text-sm shadow-md"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// -------- Report Card Component --------
const ReportCard: React.FC<{ report: Report }> = ({ report }) => {
  const statusStyles = getStatusStyles(report.status);
  const severityStyles = getSeverityStyles(report.severity);

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);

    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700/50 rounded-lg p-4 hover:border-emerald-700/40 hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Left: Status indicator */}
        <div className="flex-shrink-0">
          <div
            className={`w-3 h-3 rounded-full ${statusStyles.color.replace(
              "text-",
              "bg-"
            )}`}
          ></div>
        </div>

        {/* Center: Report details */}
        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <span className="text-xs font-mono text-emerald-400">
              {report.id}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${severityStyles.bgColor} ${severityStyles.color} font-medium`}
            >
              {report.severity}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${statusStyles.bgColor} ${statusStyles.color}`}
            >
              {report.status}
            </span>
          </div>
          <h3 className="font-medium text-slate-100 mb-1">{report.title}</h3>
          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Shield size={12} /> {report.program}
            </span>
            <span className="flex items-center gap-1">
              <Activity size={12} /> {report.submittedBy}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} /> Submitted{" "}
              {formatTimeAgo(report.submittedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> Updated {formatTimeAgo(report.updatedAt)}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex-shrink-0 flex md:flex-col gap-2 justify-end">
          <button className="px-3 py-1 bg-emerald-600/20 text-emerald-300 rounded border border-emerald-600/40 hover:bg-emerald-600/40 transition-colors text-xs flex items-center gap-1">
            <Eye size={12} /> View
          </button>
          <button className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded border border-slate-600/50 hover:bg-slate-700 transition-colors text-xs flex items-center gap-1">
            <Settings size={12} /> Manage
          </button>
        </div>
      </div>
    </div>
  );
};

// -------- Filter Dropdown Component --------
const FilterDropdown: React.FC<{
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  themeColor: string;
}> = ({ label, options, value, onChange, themeColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 bg-slate-700/60 border border-slate-600/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 hover:border-${themeColor}-600/60 hover:bg-slate-700/80 focus:outline-none focus:ring-1 focus:ring-${themeColor}-500/80 transition-all shadow-sm`}
      >
        <span className="hidden sm:inline">{label}:</span>{" "}
        <span className="font-medium text-white">{value}</span>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute z-20 mt-1.5 max-h-60 w-48 overflow-auto bg-slate-800/95 backdrop-blur-md border border-slate-700/70 rounded-lg shadow-xl py-1 text-xs`}
        >
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-3.5 py-2 hover:bg-${themeColor}-700/20 cursor-pointer text-slate-300 ${
                value === option
                  ? `bg-${themeColor}-800/40 text-${themeColor}-300 font-medium`
                  : "hover:text-white"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
