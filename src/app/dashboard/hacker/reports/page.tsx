"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  FileText,
  AlertTriangle,
  CheckCircle,
  GitBranch,
  Clock,
  Users,
  Info,
  Bug,
  Send,
  ChevronRight,
  Activity,
  Award,
  Zap,
  Shield,
  Filter,
  X,
  Star,
  BarChart,
  TrendingUp,
  Compass,
  Calendar,
} from "lucide-react";

// --- Enhanced Mock Report Data ---
const mockReports = [
  {
    id: "RPT-1234",
    title: "XSS Vulnerability in User Profile",
    program: "FinTech Innovations",
    status: "Triaged",
    severity: "High",
    submittedAt: "2023-10-26T10:00:00Z",
    updatedAt: "2023-10-27T15:30:00Z",
    description:
      "Discovered a stored XSS vulnerability in the user profile bio section that allows execution of arbitrary JavaScript",
    impact: "Account takeover, data theft",
    techniques: ["DOM Manipulation", "Payload Injection"],
    responseTime: 4,
  },
  {
    id: "RPT-1230",
    title: "Insecure Direct Object Reference (IDOR) on Order Details",
    program: "ACME Corp",
    status: "Resolved",
    severity: "Medium",
    submittedAt: "2023-10-25T14:15:00Z",
    updatedAt: "2023-10-28T09:00:00Z",
    reward: 800,
    description:
      "By modifying order IDs in the URL, any user can access order details of other customers",
    impact: "Privacy violation, information disclosure",
    techniques: ["Parameter Tampering", "Access Control Bypass"],
    responseTime: 12,
    bonusPoints: 50,
  },
  {
    id: "RPT-1235",
    title: "CSRF Token Bypass on Settings Update",
    program: "GamerConnect",
    status: "Needs More Info",
    severity: "Medium",
    submittedAt: "2023-10-28T11:00:00Z",
    updatedAt: "2023-10-28T11:00:00Z",
    description:
      "The CSRF protection can be bypassed when updating email preferences",
    impact: "Forced actions, account modifications",
    techniques: ["Token Analysis", "Request Forgery"],
    responseTime: 2,
    featured: true,
  },
  {
    id: "RPT-1199",
    title: "SQL Injection possibility via Search Parameter",
    program: "DataCorp AI",
    status: "Duplicate",
    severity: "Critical",
    submittedAt: "2023-10-20T08:00:00Z",
    updatedAt: "2023-10-21T12:00:00Z",
    description:
      "The search functionality is vulnerable to SQL injection attacks through the 'q' parameter",
    impact: "Database exfiltration, authentication bypass",
    techniques: ["Error-based SQLi", "Union-based Attacks"],
    responseTime: 28,
  },
  {
    id: "RPT-1150",
    title: "Open Redirect Vulnerability",
    program: "FinTech Innovations",
    status: "Informative",
    severity: "Low",
    submittedAt: "2023-09-15T18:30:00Z",
    updatedAt: "2023-09-16T10:15:00Z",
    description:
      "The redirect parameter in the login process can be manipulated to cause redirects to external domains",
    impact: "Phishing potential, trust exploitation",
    techniques: ["URL Manipulation"],
    responseTime: 16,
  },
  {
    id: "RPT-1240",
    title: "Rate Limiting Bypass on Login Endpoint",
    program: "SecureApp",
    status: "New",
    severity: "Medium",
    submittedAt: "2023-10-29T09:45:00Z",
    updatedAt: "2023-10-29T09:45:00Z",
    description:
      "By manipulating request headers, the rate limiting on login attempts can be bypassed",
    impact: "Brute force attacks, account compromise",
    techniques: ["Header Manipulation", "IP Rotation"],
    responseTime: 0,
    reward: 250,
  },
  {
    id: "RPT-1245",
    title: "Authentication Bypass via JWT Manipulation",
    program: "CloudSecure",
    status: "Triaged",
    severity: "Critical",
    submittedAt: "2023-10-28T14:22:00Z",
    updatedAt: "2023-10-29T08:10:00Z",
    description:
      "The JWT verification process accepts tokens with 'none' algorithm, allowing authentication bypass",
    impact: "Unauthorized access to all accounts, full system compromise",
    techniques: ["JWT Algorithm Confusion", "Cryptographic Weakness"],
    responseTime: 18,
    reward: 2500,
    featured: true,
  },
  {
    id: "RPT-1190",
    title: "Server-Side Request Forgery in Import Feature",
    program: "DevOps Central",
    status: "Resolved",
    severity: "High",
    submittedAt: "2023-10-15T11:32:00Z",
    updatedAt: "2023-10-18T16:40:00Z",
    description:
      "The import-from-URL feature allows SSRF attacks that can target internal services",
    impact: "Internal service exploitation, data exposure",
    techniques: ["URL Manipulation", "Service Discovery"],
    responseTime: 72,
    reward: 1200,
  },
];

type ReportStatus =
  | "New"
  | "Triaged"
  | "Needs More Info"
  | "Resolved"
  | "Duplicate"
  | "Informative";
type ReportSeverity = "Critical" | "High" | "Medium" | "Low";

interface Report {
  id: string;
  title: string;
  program: string;
  status: ReportStatus;
  severity: ReportSeverity;
  submittedAt: string;
  updatedAt: string;
  reward?: number;
  description?: string;
  impact?: string;
  techniques?: string[];
  responseTime?: number;
  bonusPoints?: number;
  featured?: boolean;
}

// --- Stats Data ---
const statsData = {
  totalReports: mockReports.length,
  reportsByStatus: {
    New: mockReports.filter((r) => r.status === "New").length,
    Triaged: mockReports.filter((r) => r.status === "Triaged").length,
    "Needs More Info": mockReports.filter((r) => r.status === "Needs More Info")
      .length,
    Resolved: mockReports.filter((r) => r.status === "Resolved").length,
    Duplicate: mockReports.filter((r) => r.status === "Duplicate").length,
    Informative: mockReports.filter((r) => r.status === "Informative").length,
  },
  reportsBySeverity: {
    Critical: mockReports.filter((r) => r.severity === "Critical").length,
    High: mockReports.filter((r) => r.severity === "High").length,
    Medium: mockReports.filter((r) => r.severity === "Medium").length,
    Low: mockReports.filter((r) => r.severity === "Low").length,
  },
  totalRewards: mockReports.reduce(
    (sum, report) => sum + (report.reward || 0),
    0
  ),
  avgResponseTime: Math.round(
    mockReports
      .filter((r) => r.responseTime !== undefined)
      .reduce((sum, report) => sum + (report.responseTime || 0), 0) /
      mockReports.filter((r) => r.responseTime !== undefined).length
  ),
};

// -------- Styling Helpers --------
const getStatusStyles = (status: ReportStatus) => {
  switch (status) {
    case "New":
      return {
        icon: FileText,
        color: "text-sky-400",
        bgColor: "bg-sky-900/50",
        gradient: "from-sky-900/20 to-sky-800/5",
      };
    case "Triaged":
      return {
        icon: GitBranch,
        color: "text-blue-400",
        bgColor: "bg-blue-900/50",
        gradient: "from-blue-900/20 to-blue-800/5",
      };
    case "Needs More Info":
      return {
        icon: AlertTriangle,
        color: "text-amber-400",
        bgColor: "bg-amber-900/50",
        gradient: "from-amber-900/20 to-amber-800/5",
      };
    case "Resolved":
      return {
        icon: CheckCircle,
        color: "text-green-400",
        bgColor: "bg-green-900/50",
        gradient: "from-green-900/20 to-green-800/5",
      };
    case "Duplicate":
      return {
        icon: Users,
        color: "text-gray-400",
        bgColor: "bg-gray-800/50",
        gradient: "from-gray-800/20 to-gray-700/5",
      };
    case "Informative":
      return {
        icon: Info,
        color: "text-slate-400",
        bgColor: "bg-slate-800/50",
        gradient: "from-slate-800/20 to-slate-700/5",
      };
    default:
      return {
        icon: FileText,
        color: "text-gray-400",
        bgColor: "bg-gray-800/50",
        gradient: "from-gray-800/20 to-gray-700/5",
      };
  }
};

const getSeverityStyles = (severity: ReportSeverity) => {
  switch (severity) {
    case "Critical":
      return {
        color: "text-red-400",
        borderColor: "border-red-500",
        bgColor: "bg-red-500/10",
        icon: Zap,
        glow: "shadow-red-500/20",
      };
    case "High":
      return {
        color: "text-orange-400",
        borderColor: "border-orange-500",
        bgColor: "bg-orange-500/10",
        icon: AlertTriangle,
        glow: "shadow-orange-500/20",
      };
    case "Medium":
      return {
        color: "text-yellow-400",
        borderColor: "border-yellow-500",
        bgColor: "bg-yellow-500/10",
        icon: Shield,
        glow: "shadow-yellow-500/20",
      };
    case "Low":
      return {
        color: "text-blue-400",
        borderColor: "border-blue-500",
        bgColor: "bg-blue-500/10",
        icon: Info,
        glow: "shadow-blue-500/20",
      };
    default:
      return {
        color: "text-gray-400",
        borderColor: "border-gray-500",
        bgColor: "bg-gray-500/10",
        icon: Info,
        glow: "shadow-gray-500/10",
      };
  }
};

// -------- Main Dashboard Component --------
export default function EnhancedReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    status: string | null;
    severity: string | null;
    program: string | null;
  }>({
    status: null,
    severity: null,
    program: null,
  });
  const [viewMode, setViewMode] = useState<"list" | "grid" | "stats">("list");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const filteredReports = mockReports.filter((report) => {
    // First apply search filter
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description?.toLowerCase().includes(searchTerm.toLowerCase());

    // Then apply dropdown filters
    const matchesStatus =
      !activeFilters.status ||
      activeFilters.status === "All" ||
      report.status === activeFilters.status;
    const matchesSeverity =
      !activeFilters.severity ||
      activeFilters.severity === "All" ||
      report.severity === activeFilters.severity;
    const matchesProgram =
      !activeFilters.program ||
      activeFilters.program === "All" ||
      report.program === activeFilters.program;

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

  return (
    <div className="space-y-8 text-slate-200 max-w-7xl mx-auto">
      {/* Interactive Header with Dashboard Stats */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-purple-700/50 p-6 shadow-lg">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-20 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2"></div>

        {/* Header Content */}
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-900/30 rounded-lg border border-purple-500/30 shadow-inner shadow-purple-500/10">
              <Bug size={26} className="text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
                Vulnerability Reports
                <span className="text-sm font-normal bg-slate-700/50 text-slate-300 px-2 py-0.5 rounded-full">
                  {mockReports.length} Total
                </span>
              </h1>
              <p className="text-slate-400 mt-1">
                Track, manage and respond to security vulnerabilities
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode("stats")}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200
                ${
                  viewMode === "stats"
                    ? "bg-purple-600/30 text-purple-200 border border-purple-500/50"
                    : "border border-slate-700 text-slate-300 hover:bg-slate-700/50"
                }`}
            >
              <BarChart size={16} />
              <span className="hidden sm:inline">Stats</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200
                ${
                  viewMode === "grid"
                    ? "bg-purple-600/30 text-purple-200 border border-purple-500/50"
                    : "border border-slate-700 text-slate-300 hover:bg-slate-700/50"
                }`}
            >
              <Users size={16} />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200
                ${
                  viewMode === "list"
                    ? "bg-purple-600/30 text-purple-200 border border-purple-500/50"
                    : "border border-slate-700 text-slate-300 hover:bg-slate-700/50"
                }`}
            >
              <FileText size={16} />
              <span className="hidden sm:inline">List</span>
            </button>
            <button className="inline-flex items-center group gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-purple-100 text-sm font-medium rounded-md hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 shadow-md hover:shadow-purple-500/20">
              <Send
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
              <span>New Report</span>
            </button>
          </div>
        </div>

        {/* Dashboard Stats - Conditional rendering based on viewMode */}
        {viewMode === "stats" && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Reports */}
            <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-sm">Total Reports</p>
                  <h3 className="text-3xl font-bold text-slate-100 mt-1">
                    {statsData.totalReports}
                  </h3>
                </div>
                <div className="p-2 bg-blue-900/30 rounded-lg">
                  <FileText size={20} className="text-blue-400" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-xs text-slate-400">
                <TrendingUp size={14} className="text-green-400" />
                <span className="text-green-400">+4%</span> from last month
              </div>
            </div>

            {/* Total Rewards */}
            <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-sm">Total Rewards</p>
                  <h3 className="text-3xl font-bold text-slate-100 mt-1">
                    ${statsData.totalRewards.toLocaleString()}
                  </h3>
                </div>
                <div className="p-2 bg-emerald-900/30 rounded-lg">
                  <Award size={20} className="text-emerald-400" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-xs text-slate-400">
                <TrendingUp size={14} className="text-green-400" />
                <span className="text-green-400">+12%</span> from last month
              </div>
            </div>

            {/* Critical/High Reports */}
            <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-sm">Critical/High Issues</p>
                  <h3 className="text-3xl font-bold text-slate-100 mt-1">
                    {statsData.reportsBySeverity.Critical +
                      statsData.reportsBySeverity.High}
                  </h3>
                </div>
                <div className="p-2 bg-red-900/30 rounded-lg">
                  <Zap size={20} className="text-red-400" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-xs">
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300">
                  {statsData.reportsBySeverity.Critical} Critical
                </span>
                <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300">
                  {statsData.reportsBySeverity.High} High
                </span>
              </div>
            </div>

            {/* Average Response Time */}
            <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-sm">Avg Response Time</p>
                  <h3 className="text-3xl font-bold text-slate-100 mt-1">
                    {statsData.avgResponseTime}h
                  </h3>
                </div>
                <div className="p-2 bg-purple-900/30 rounded-lg">
                  <Clock size={20} className="text-purple-400" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-xs text-slate-400">
                <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
                <span className="text-green-400 ml-1">Good</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search and Filter Bar - Now with active filter indicators */}
      <div className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-4 flex flex-wrap gap-4 items-center backdrop-blur-sm shadow-md">
        {/* Search Input */}
        <div className="relative flex-grow min-w-[200px] sm:min-w-[300px]">
          <input
            type="text"
            placeholder="Search reports by title, ID, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-700/70 border border-slate-600 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

        {/* Filter Section */}
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
              "Needs More Info",
              "Resolved",
              "Duplicate",
              "Informative",
            ]}
            value={activeFilters.status || "All"}
            onChange={(value) => handleFilterChange("status", value)}
          />

          {/* Severity Filter */}
          <FilterDropdown
            label="Severity"
            options={["All", "Critical", "High", "Medium", "Low"]}
            value={activeFilters.severity || "All"}
            onChange={(value) => handleFilterChange("severity", value)}
          />

          {/* Program Filter */}
          <FilterDropdown
            label="Program"
            options={["All", ...uniquePrograms]}
            value={activeFilters.program || "All"}
            onChange={(value) => handleFilterChange("program", value)}
          />

          {/* Clear Filters Button - only show if filters are active */}
          {(activeFilters.status ||
            activeFilters.severity ||
            activeFilters.program ||
            searchTerm) && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600/50 text-xs"
            >
              <X size={14} /> Clear
            </button>
          )}
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

      {/* Featured Reports - Only show in list view if there are featured reports */}
      {viewMode === "list" && mockReports.some((r) => r.featured) && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
            <Star size={18} className="text-amber-400" /> Featured Reports
          </h2>

          <div className="space-y-4">
            {mockReports
              .filter((report) => report.featured)
              .map((report) => (
                <FeaturedReportCard key={report.id} report={report as Report} />
              ))}
          </div>
        </div>
      )}

      {/* Display Reports based on View Mode */}
      <div className="space-y-5">
        {/* Results Count */}
        <div className="flex justify-between items-center">
          <p className="text-slate-400 text-sm">
            Showing{" "}
            <span className="text-slate-200 font-medium">
              {filteredReports.length}
            </span>{" "}
            of {mockReports.length} reports
          </p>

          {/* Sort Options - For demonstration only */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">Sort by:</span>
            <select className="bg-slate-800 border border-slate-700 rounded-md px-2 py-1 text-slate-300 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500">
              <option>Newest</option>
              <option>Oldest</option>
              <option>Highest Severity</option>
              <option>Highest Reward</option>
            </select>
          </div>
        </div>

        {/* List View */}
        {viewMode === "list" && filteredReports.length > 0 && (
          <div className="space-y-5">
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report as Report}
                onClick={() => setSelectedReport(report as Report)}
              />
            ))}
          </div>
        )}

        {/* Grid View */}
        {viewMode === "grid" && filteredReports.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredReports.map((report) => (
              <ReportGridCard
                key={report.id}
                report={report as Report}
                onClick={() => setSelectedReport(report as Report)}
              />
            ))}
          </div>
        )}

        {/* Stats View - Additional statistics that expand on the header stats */}
        {viewMode === "stats" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Distribution */}
            <StatsCard
              title="Reports by Status"
              icon={<Activity size={18} className="text-blue-400" />}
              data={[
                {
                  name: "New",
                  value: statsData.reportsByStatus.New,
                  color: "bg-sky-400",
                },
                {
                  name: "Triaged",
                  value: statsData.reportsByStatus.Triaged,
                  color: "bg-blue-400",
                },
                {
                  name: "Needs More Info",
                  value: statsData.reportsByStatus["Needs More Info"],
                  color: "bg-amber-400",
                },
                {
                  name: "Resolved",
                  value: statsData.reportsByStatus.Resolved,
                  color: "bg-green-400",
                },
                {
                  name: "Duplicate",
                  value: statsData.reportsByStatus.Duplicate,
                  color: "bg-gray-400",
                },
                {
                  name: "Informative",
                  value: statsData.reportsByStatus.Informative,
                  color: "bg-slate-400",
                },
              ]}
            />

            {/* Severity Distribution */}
            <StatsCard
              title="Reports by Severity"
              icon={<AlertTriangle size={18} className="text-orange-400" />}
              data={[
                {
                  name: "Critical",
                  value: statsData.reportsBySeverity.Critical,
                  color: "bg-red-400",
                },
                {
                  name: "High",
                  value: statsData.reportsBySeverity.High,
                  color: "bg-orange-400",
                },
                {
                  name: "Medium",
                  value: statsData.reportsBySeverity.Medium,
                  color: "bg-yellow-400",
                },
                {
                  name: "Low",
                  value: statsData.reportsBySeverity.Low,
                  color: "bg-blue-400",
                },
              ]}
            />

            {/* Recent Program Activity */}
            <div className="bg-slate-800/80 rounded-xl border border-slate-700/50 p-5 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                  <Compass size={18} className="text-purple-400" /> Recent
                  Program Activity
                </h3>
                <button className="text-xs text-slate-400 hover:text-purple-400">
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {mockReports.slice(0, 5).map((report, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 py-2 border-b border-slate-700/50 last:border-0"
                  >
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                    <div className="flex-grow">
                      <p className="text-sm text-slate-300">{report.program}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(report.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <span
                        className={`${
                          getSeverityStyles(report.severity as ReportSeverity)
                            .color
                        } font-medium`}
                      >
                        {report.severity}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span
                        className={`${
                          getStatusStyles(report.status as ReportStatus).color
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar/Timeline View */}
            <div className="bg-slate-800/80 rounded-xl border border-slate-700/50 p-5 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                  <Calendar size={18} className="text-indigo-400" /> Submission
                  Timeline
                </h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-block w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span className="text-slate-400">Reports</span>
                  <span className="inline-block w-3 h-3 rounded-full bg-blue-400 ml-2"></span>
                  <span className="text-slate-400">Resolutions</span>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 28 }).map((_, idx) => {
                  const hasReport = Math.random() > 0.7;
                  const hasResolution = Math.random() > 0.85;

                  return (
                    <div
                      key={idx}
                      className={`aspect-square rounded-md border border-slate-700/50 flex items-center justify-center group relative
                                ${hasReport ? "bg-emerald-900/30" : ""}
                                ${hasResolution ? "border-blue-500/50" : ""}`}
                    >
                      <span className="text-xs text-slate-400">{idx + 1}</span>

                      {(hasReport || hasResolution) && (
                        <div className="absolute bottom-1 right-1 flex gap-0.5">
                          {hasReport && (
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                          )}
                          {hasResolution && (
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                          )}
                        </div>
                      )}

                      {(hasReport || hasResolution) && (
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 z-10 bg-slate-800/90 flex items-center justify-center transition-opacity">
                          <div className="text-center text-xs p-1">
                            {hasReport && (
                              <p className="text-emerald-400">2 reports</p>
                            )}
                            {hasResolution && (
                              <p className="text-blue-400">1 resolved</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {filteredReports.length === 0 && (
          <div className="text-center py-12 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <FileText
              size={48}
              className="mx-auto text-slate-500 mb-3 opacity-50"
            />
            <h3 className="text-xl font-medium text-slate-300 mb-2">
              No reports found
            </h3>
            <p className="text-slate-400 max-w-md mx-auto">
              We couldn&apos;t find any reports matching your search criteria.
              Try adjusting your filters or search term.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-purple-600/30 text-purple-300 rounded-md hover:bg-purple-600/50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center">
              <h2 className="text-lg font-medium text-slate-200">
                {selectedReport.id}: Report Detail
              </h2>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-slate-400 hover:text-slate-200 p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-6">
              {/* Title & Severity */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                <h1 className="text-xl font-semibold text-slate-100">
                  {selectedReport.title}
                </h1>
                <div className="flex items-center gap-2">
                  {selectedReport.featured && (
                    <span className="flex items-center gap-1 bg-amber-900/30 text-amber-400 text-xs px-2 py-0.5 rounded-full">
                      <Star size={12} /> Featured
                    </span>
                  )}
                  <span
                    className={`flex items-center gap-1 ${
                      getSeverityStyles(selectedReport.severity).bgColor
                    } ${
                      getSeverityStyles(selectedReport.severity).color
                    } text-xs px-2 py-0.5 rounded-full font-medium`}
                  >
                    {React.createElement(
                      getSeverityStyles(selectedReport.severity).icon,
                      { size: 12 }
                    )}
                    {selectedReport.severity}
                  </span>
                </div>
              </div>

              {/* Meta Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Status</p>
                  <p
                    className={`flex items-center gap-1.5 ${
                      getStatusStyles(selectedReport.status).color
                    } font-medium`}
                  >
                    {React.createElement(
                      getStatusStyles(selectedReport.status).icon,
                      { size: 16 }
                    )}
                    {selectedReport.status}
                  </p>
                </div>

                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Program</p>
                  <p className="text-slate-100">{selectedReport.program}</p>
                </div>

                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Submitted</p>
                  <p className="text-slate-100">
                    {new Date(selectedReport.submittedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Updated</p>
                  <p className="text-slate-100">
                    {new Date(selectedReport.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-slate-300 font-medium mb-2">Description</h3>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                  <p className="text-slate-300">{selectedReport.description}</p>
                </div>
              </div>

              {/* Impact */}
              {selectedReport.impact && (
                <div>
                  <h3 className="text-slate-300 font-medium mb-2">Impact</h3>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                    <p className="text-slate-300">{selectedReport.impact}</p>
                  </div>
                </div>
              )}

              {/* Techniques */}
              {selectedReport.techniques && (
                <div>
                  <h3 className="text-slate-300 font-medium mb-2">
                    Techniques Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedReport.techniques.map((technique, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-full border border-slate-700/50"
                      >
                        {technique}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Reward if available */}
              {selectedReport.reward && (
                <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 p-4 rounded-lg border border-emerald-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award size={20} className="text-emerald-400" />
                      <span className="text-slate-300">Bounty Reward</span>
                    </div>
                    <span className="text-xl font-bold text-emerald-300">
                      ${selectedReport.reward.toLocaleString()}
                    </span>
                  </div>
                  {selectedReport.bonusPoints && (
                    <div className="mt-2 text-xs text-slate-400 flex items-center justify-end gap-1">
                      <span className="text-emerald-400">
                        +{selectedReport.bonusPoints}
                      </span>{" "}
                      bonus points awarded
                    </div>
                  )}
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button className="px-4 py-2 border border-slate-700 rounded-md text-slate-300 hover:bg-slate-800">
                  View Timeline
                </button>
                <button className="px-4 py-2 bg-emerald-600 text-emerald-100 rounded-md hover:bg-emerald-500">
                  Respond
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -------- Report Card Component (List View) --------
const ReportCard: React.FC<{ report: Report; onClick: () => void }> = ({
  report,
  onClick,
}) => {
  const {
    icon: StatusIcon,
    color: statusColor,
    bgColor: statusBgColor,
  } = getStatusStyles(report.status);

  const {
    color: severityColor,
    borderColor: severityBorderColor,
    glow: severityGlow,
  } = getSeverityStyles(report.severity);

  const formatTime = (dateString: string): string => {
    // Simple relative time formatter
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
    <div
      onClick={onClick}
      className={`
        bg-gradient-to-br from-slate-800/80 to-slate-900/90
        rounded-lg border border-slate-700/60 p-5 shadow-lg
        transition-all duration-200 ease-out hover:shadow-lg ${severityGlow}
        hover:border-purple-600/40 hover:-translate-y-0.5
        flex flex-col md:flex-row md:items-center gap-4 md:gap-6
        relative isolate overflow-hidden cursor-pointer
      `}
    >
      {/* Severity Indicator Bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${severityBorderColor.replace(
          "border-",
          "bg-"
        )} opacity-80 group-hover:opacity-100 transition-opacity duration-200`}
      ></div>

      {/* Featured Indicator */}
      {report.featured && (
        <div className="absolute -right-8 top-4 bg-amber-500 text-amber-950 text-xs font-medium py-0.5 px-8 rotate-45">
          Featured
        </div>
      )}

      {/* Main Info */}
      <div className="flex-grow pl-3 md:pl-0">
        {/* Report Title and ID */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
          <h3 className="text-base font-semibold text-slate-100 hover:text-emerald-300 transition-colors duration-200 line-clamp-1">
            {report.title}
          </h3>

          {report.reward && (
            <span className="text-xs font-medium bg-emerald-900/30 text-emerald-400 px-2 py-0.5 rounded-full">
              ${report.reward}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-400 font-mono mb-2">
          ID: <span className="text-emerald-400">{report.id}</span> | Program:{" "}
          <span className="text-slate-300">{report.program}</span>
        </p>

        {/* Description Excerpt */}
        {report.description && (
          <p className="text-sm text-slate-400 line-clamp-1 mb-2">
            {report.description}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${statusBgColor} ${statusColor} font-medium`}
          >
            <StatusIcon size={12} /> {report.status}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 font-semibold ${severityColor}`}
          >
            {React.createElement(getSeverityStyles(report.severity).icon, {
              size: 12,
            })}
            {report.severity}
          </span>
          <span className="text-slate-500 flex items-center gap-1">
            <Clock size={12} /> {formatTime(report.submittedAt)}
          </span>
          {report.responseTime !== undefined && (
            <span className="text-slate-500 flex items-center gap-1">
              <Activity size={12} /> Response: {report.responseTime}h
            </span>
          )}
        </div>
      </div>

      {/* View Details Action */}
      <div className="flex-shrink-0 flex items-center justify-end text-right md:ml-auto">
        <span className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200">
          View Details <ChevronRight size={16} />
        </span>
      </div>

      {/* Decorative corner */}
      <div className="absolute bottom-0 right-0 h-6 w-6 border-l border-t border-purple-800/30 rounded-tl-lg opacity-30 group-hover:opacity-70 transition-opacity duration-200"></div>
    </div>
  );
};

// -------- Featured Report Card --------
const FeaturedReportCard: React.FC<{ report: Report }> = ({ report }) => {
  const { color: severityColor, icon: SeverityIcon } = getSeverityStyles(
    report.severity
  );
  const { icon: StatusIcon, color: statusColor } = getStatusStyles(
    report.status
  );

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/70 p-5 shadow-lg hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
      {/* Background glow effect */}
      <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-emerald-500/10 blur-3xl"></div>
      <div className="absolute -left-20 -bottom-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"></div>

      {/* Featured badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1 bg-amber-900/30 text-amber-400 text-xs px-2 py-0.5 rounded-full">
        <Star size={12} /> Featured
      </div>

      <div className="relative z-10">
        {/* Report ID and Program */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
          <span className="text-emerald-400 font-mono">{report.id}</span>
          <span>•</span>
          <span>{report.program}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium text-slate-100 mb-3">
          {report.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {report.description}
        </p>

        {/* Stats & Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="bg-slate-800/50 rounded-lg p-2 text-center">
            <p className="text-xs text-slate-500 mb-1">Severity</p>
            <p
              className={`${severityColor} font-medium flex items-center justify-center gap-1`}
            >
              <SeverityIcon size={14} /> {report.severity}
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-2 text-center">
            <p className="text-xs text-slate-500 mb-1">Status</p>
            <p
              className={`${statusColor} font-medium flex items-center justify-center gap-1`}
            >
              <StatusIcon size={14} /> {report.status}
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-2 text-center">
            <p className="text-xs text-slate-500 mb-1">Submitted</p>
            <p className="text-slate-300">
              {new Date(report.submittedAt).toLocaleDateString()}
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-2 text-center">
            <p className="text-xs text-slate-500 mb-1">Reward</p>
            <p className="text-emerald-400 font-semibold">
              ${report.reward || "—"}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 hover:text-emerald-300 rounded-lg transition-all duration-200 text-sm">
            View Report <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// -------- Grid Card Component --------
const ReportGridCard: React.FC<{ report: Report; onClick: () => void }> = ({
  report,
  onClick,
}) => {
  const {
    icon: StatusIcon,
    color: statusColor,
    gradient: statusGradient,
  } = getStatusStyles(report.status);
  const { color: severityColor, icon: SeverityIcon } = getSeverityStyles(
    report.severity
  );

  return (
    <div
      onClick={onClick}
      className={`
        bg-slate-800/80 hover:bg-gradient-to-br hover:${statusGradient}
        rounded-xl border border-slate-700/60 p-5
        shadow-md hover:shadow-lg transition-all duration-300
        flex flex-col h-full cursor-pointer
      `}
    >
      {/* Header with ID and Program */}
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-mono text-emerald-400">{report.id}</span>
        <span
          className={`inline-flex items-center gap-1 ${statusColor} text-xs px-2 py-0.5 rounded-full bg-opacity-20`}
        >
          <StatusIcon size={12} /> {report.status}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-medium text-slate-100 mb-2 line-clamp-2">
        {report.title}
      </h3>

      {/* Program */}
      <p className="text-sm text-slate-400 mb-3">{report.program}</p>

      {/* Description */}
      {report.description && (
        <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-grow">
          {report.description}
        </p>
      )}

      {/* Footer with Meta */}
      <div className="mt-auto">
        {/* Divider */}
        <div className="border-t border-slate-700/50 my-3"></div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <SeverityIcon size={16} className={severityColor} />
            <span className={`text-xs font-medium ${severityColor}`}>
              {report.severity}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {report.reward && (
              <span className="text-emerald-400 font-medium">
                ${report.reward}
              </span>
            )}
            <span className="text-xs text-slate-500">
              {new Date(report.submittedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------- Stats Card Component --------
interface StatItem {
  name: string;
  value: number;
  color: string;
}

const StatsCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  data: StatItem[];
}> = ({ title, icon, data }) => {
  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-slate-800/80 rounded-xl border border-slate-700/50 p-5 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-slate-200 flex items-center gap-2">
          {icon} {title}
        </h3>
        <span className="text-slate-400 text-xs">Total: {total}</span>
      </div>

      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300">{item.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">{item.value}</span>
                <span className="text-xs text-slate-500">
                  {Math.round((item.value / total) * 100)}%
                </span>
              </div>
            </div>

            <div className="w-full bg-slate-700/50 rounded-full h-1.5">
              <div
                className={`${item.color} h-1.5 rounded-full`}
                style={{ width: `${(item.value / total) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// -------- Enhanced Filter Dropdown Component --------
const FilterDropdown: React.FC<{
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}> = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-700/80 border border-slate-600 rounded-md px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-600/80 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
      >
        {label}: <span className="font-medium text-white">{value}</span>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-40 bg-slate-800 border border-slate-700 rounded-md shadow-lg py-1 text-xs">
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-3 py-1.5 hover:bg-slate-700 cursor-pointer flex items-center justify-between
                ${value === option ? "text-emerald-400" : "text-slate-300"}`}
            >
              {option}
              {value === option && <CheckCircle size={12} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
