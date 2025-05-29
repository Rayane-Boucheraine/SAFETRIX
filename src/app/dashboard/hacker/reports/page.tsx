"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Info,
  Bug,
  Send,
  ChevronRight,
  Activity,
  Zap,
  Shield,
  Filter,
  X,
  BarChart,
  Loader,
  AlertCircle,
} from "lucide-react";
import reportService, {
  Report,
  ReportStatus,
  ReportSeverity,
} from "@/services/reportService";
import rewardService from "@/services/rewardService";
import Link from "next/link";

// -------- Main Dashboard Component --------
export default function EnhancedReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    fetchMyReports();
  }, []);

  const fetchMyReports = async () => {
    try {
      setLoading(true);
      setError(null);

      const reportsData = await reportService.getMyReports();
      // Ensure reportsData is always an array
      let reportsArray: Report[] = [];
      if (Array.isArray(reportsData)) {
        reportsArray = reportsData;
      } else if (reportsData?.data && Array.isArray(reportsData.data)) {
        reportsArray = reportsData.data;
      } else {
        reportsArray = [];
      }
      setReports(reportsArray);
    } catch (error: unknown) {
      console.error("Failed to fetch reports:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch reports"
      );
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats from actual data
  const statsData = {
    totalReports: reports.length,
    reportsByStatus: {
      [ReportStatus.PENDING]: reports.filter(
        (r) => r.status === ReportStatus.PENDING
      ).length,
      [ReportStatus.ACCEPTED]: reports.filter(
        (r) => r.status === ReportStatus.ACCEPTED
      ).length,
      [ReportStatus.REJECTED]: reports.filter(
        (r) => r.status === ReportStatus.REJECTED
      ).length,
      [ReportStatus.DUPLICATE]: reports.filter(
        (r) => r.status === ReportStatus.DUPLICATE
      ).length,
      [ReportStatus.INFORMATIVE]: reports.filter(
        (r) => r.status === ReportStatus.INFORMATIVE
      ).length,
      [ReportStatus.FIXED]: reports.filter(
        (r) => r.status === ReportStatus.FIXED
      ).length,
    },
    reportsBySeverity: {
      [ReportSeverity.CRITICAL]: reports.filter(
        (r) => r.severity === ReportSeverity.CRITICAL
      ).length,
      [ReportSeverity.HIGH]: reports.filter(
        (r) => r.severity === ReportSeverity.HIGH
      ).length,
      [ReportSeverity.MEDIUM]: reports.filter(
        (r) => r.severity === ReportSeverity.MEDIUM
      ).length,
      [ReportSeverity.LOW]: reports.filter(
        (r) => r.severity === ReportSeverity.LOW
      ).length,
    },
    avgResponseTime: 0, // Would need additional data from backend
  };

  const filteredReports = reports.filter((report) => {
    // First apply search filter
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description?.toLowerCase().includes(searchTerm.toLowerCase());

    // Then apply dropdown filters
    const matchesStatus =
      !activeFilters.status || report.status === activeFilters.status;
    const matchesSeverity =
      !activeFilters.severity || report.severity === activeFilters.severity;
    const matchesProgram =
      !activeFilters.program ||
      (report.program && report.program.title === activeFilters.program);

    return matchesSearch && matchesStatus && matchesSeverity && matchesProgram;
  });

  // Get unique programs for filter dropdown
  const uniquePrograms = [
    ...new Set(
      reports
        .filter((report) => report.program && report.program.title)
        .map((report) => report.program.title)
    ),
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-4">
          <Loader className="animate-spin text-purple-500" size={36} />
          <p className="text-slate-400">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="mx-auto text-red-400 mb-4" size={36} />
        <h3 className="text-xl font-semibold text-slate-300 mb-2">
          Error Loading Reports
        </h3>
        <p className="text-slate-400 max-w-lg mx-auto mb-4">{error}</p>
        <button
          className="px-4 py-2 bg-purple-600/30 text-purple-300 rounded-md hover:bg-purple-600/50 border border-purple-700/50"
          onClick={fetchMyReports}
        >
          Try Again
        </button>
      </div>
    );
  }

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
                  {reports.length} Total
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
              <Link href="/dashboard/hacker/reports/create">
                <span>New Report</span>
              </Link>
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
            </div>

            {/* Accepted Reports */}
            <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-sm">Accepted</p>
                  <h3 className="text-3xl font-bold text-slate-100 mt-1">
                    {statsData.reportsByStatus[ReportStatus.ACCEPTED]}
                  </h3>
                </div>
                <div className="p-2 bg-emerald-900/30 rounded-lg">
                  <CheckCircle size={20} className="text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Critical/High Reports */}
            <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-sm">Critical/High Issues</p>
                  <h3 className="text-3xl font-bold text-slate-100 mt-1">
                    {(statsData.reportsBySeverity[ReportSeverity.CRITICAL] ||
                      0) +
                      (statsData.reportsBySeverity[ReportSeverity.HIGH] || 0)}
                  </h3>
                </div>
                <div className="p-2 bg-red-900/30 rounded-lg">
                  <Zap size={20} className="text-red-400" />
                </div>
              </div>
            </div>

            {/* Pending Reports */}
            <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-sm">Pending Review</p>
                  <h3 className="text-3xl font-bold text-slate-100 mt-1">
                    {statsData.reportsByStatus[ReportStatus.PENDING]}
                  </h3>
                </div>
                <div className="p-2 bg-amber-900/30 rounded-lg">
                  <Clock size={20} className="text-amber-400" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search and Filter Bar */}
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
              ReportStatus.PENDING,
              ReportStatus.ACCEPTED,
              ReportStatus.REJECTED,
              ReportStatus.DUPLICATE,
              ReportStatus.INFORMATIVE,
              ReportStatus.FIXED,
            ]}
            value={activeFilters.status || "All"}
            onChange={(value) => handleFilterChange("status", value)}
          />

          {/* Severity Filter */}
          <FilterDropdown
            label="Severity"
            options={[
              "All",
              ReportSeverity.CRITICAL,
              ReportSeverity.HIGH,
              ReportSeverity.MEDIUM,
              ReportSeverity.LOW,
            ]}
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

          {/* Clear Filters Button */}
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

      {/* Display Reports based on View Mode */}
      <div className="space-y-5">
        {/* Results Count */}
        <div className="flex justify-between items-center">
          <p className="text-slate-400 text-sm">
            Showing{" "}
            <span className="text-slate-200 font-medium">
              {filteredReports.length}
            </span>{" "}
            of {reports.length} reports
          </p>
        </div>

        {/* List View */}
        {viewMode === "list" && filteredReports.length > 0 && (
          <div className="space-y-5">
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onClick={() => setSelectedReport(report)}
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
                report={report}
                onClick={() => setSelectedReport(report)}
              />
            ))}
          </div>
        )}

        {/* Stats View */}
        {viewMode === "stats" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Distribution */}
            <StatsCard
              title="Reports by Status"
              icon={<Activity size={18} className="text-blue-400" />}
              data={[
                {
                  name: "Pending",
                  value: statsData.reportsByStatus[ReportStatus.PENDING],
                  color: "bg-amber-400",
                },
                {
                  name: "Accepted",
                  value: statsData.reportsByStatus[ReportStatus.ACCEPTED],
                  color: "bg-green-400",
                },
                {
                  name: "Fixed",
                  value: statsData.reportsByStatus[ReportStatus.FIXED],
                  color: "bg-emerald-400",
                },
                {
                  name: "Rejected",
                  value: statsData.reportsByStatus[ReportStatus.REJECTED],
                  color: "bg-red-400",
                },
                {
                  name: "Duplicate",
                  value: statsData.reportsByStatus[ReportStatus.DUPLICATE],
                  color: "bg-gray-400",
                },
                {
                  name: "Informative",
                  value: statsData.reportsByStatus[ReportStatus.INFORMATIVE],
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
                  value:
                    statsData.reportsBySeverity[ReportSeverity.CRITICAL] || 0,
                  color: "bg-red-400",
                },
                {
                  name: "High",
                  value: statsData.reportsBySeverity[ReportSeverity.HIGH] || 0,
                  color: "bg-orange-400",
                },
                {
                  name: "Medium",
                  value:
                    statsData.reportsBySeverity[ReportSeverity.MEDIUM] || 0,
                  color: "bg-yellow-400",
                },
                {
                  name: "Low",
                  value: statsData.reportsBySeverity[ReportSeverity.LOW] || 0,
                  color: "bg-blue-400",
                },
              ]}
            />
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
        <ReportDetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
}

// -------- Report Card Component (List View) --------
const ReportCard: React.FC<{ report: Report; onClick: () => void }> = ({
  report,
  onClick,
}) => {
  const getStatusStyles = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.PENDING:
        return {
          icon: Clock,
          color: "text-amber-400",
          bgColor: "bg-amber-900/50",
        };
      case ReportStatus.ACCEPTED:
        return {
          icon: CheckCircle,
          color: "text-green-400",
          bgColor: "bg-green-900/50",
        };
      case ReportStatus.REJECTED:
        return {
          icon: X,
          color: "text-red-400",
          bgColor: "bg-red-900/50",
        };
      case ReportStatus.DUPLICATE:
        return {
          icon: Users,
          color: "text-gray-400",
          bgColor: "bg-gray-800/50",
        };
      case ReportStatus.INFORMATIVE:
        return {
          icon: Info,
          color: "text-slate-400",
          bgColor: "bg-slate-800/50",
        };
      case ReportStatus.FIXED:
        return {
          icon: CheckCircle,
          color: "text-emerald-400",
          bgColor: "bg-emerald-900/50",
        };
      default:
        return {
          icon: FileText,
          color: "text-gray-400",
          bgColor: "bg-gray-800/50",
        };
    }
  };

  const getSeverityStyles = (severity?: ReportSeverity) => {
    if (!severity) return { color: "text-gray-400", icon: Info };

    switch (severity) {
      case ReportSeverity.CRITICAL:
        return { color: "text-red-400", icon: Zap };
      case ReportSeverity.HIGH:
        return { color: "text-orange-400", icon: AlertTriangle };
      case ReportSeverity.MEDIUM:
        return { color: "text-yellow-400", icon: Shield };
      case ReportSeverity.LOW:
        return { color: "text-blue-400", icon: Info };
      default:
        return { color: "text-gray-400", icon: Info };
    }
  };

  const {
    icon: StatusIcon,
    color: statusColor,
    bgColor: statusBgColor,
  } = getStatusStyles(report.status);

  const { color: severityColor, icon: SeverityIcon } = getSeverityStyles(
    report.severity
  );

  const formatTime = (dateString: string): string => {
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
      className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 rounded-lg border border-slate-700/60 p-5 shadow-lg transition-all duration-200 ease-out hover:shadow-lg hover:border-purple-600/40 hover:-translate-y-0.5 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 relative isolate overflow-hidden cursor-pointer"
    >
      {/* Severity Indicator Bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${severityColor.replace(
          "text-",
          "bg-"
        )} opacity-80`}
      ></div>

      {/* Main Info */}
      <div className="flex-grow pl-3 md:pl-0">
        {/* Report Title and ID */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
          <h3 className="text-base font-semibold text-slate-100 hover:text-emerald-300 transition-colors duration-200 line-clamp-1">
            {report.title}
          </h3>
        </div>

        <p className="text-xs text-slate-400 font-mono mb-2">
          ID: <span className="text-emerald-400">{report.id}</span> | Program:{" "}
          <span className="text-slate-300">
            {report.program?.title || "Unknown"}
          </span>
        </p>

        {/* Description Excerpt */}
        <p className="text-sm text-slate-400 line-clamp-1 mb-2">
          {report.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${statusBgColor} ${statusColor} font-medium`}
          >
            <StatusIcon size={12} /> {report.status}
          </span>
          {report.severity && (
            <span
              className={`inline-flex items-center gap-1.5 font-semibold ${severityColor}`}
            >
              <SeverityIcon size={12} />
              {report.severity}
            </span>
          )}
          <span className="text-slate-500 flex items-center gap-1">
            <Clock size={12} /> {formatTime(report.createdAt)}
          </span>
        </div>
      </div>

      {/* View Details Action */}
      <div className="flex-shrink-0 flex items-center justify-end text-right md:ml-auto">
        <span className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200">
          View Details <ChevronRight size={16} />
        </span>
      </div>
    </div>
  );
};

// -------- Grid Card Component --------
const ReportGridCard: React.FC<{ report: Report; onClick: () => void }> = ({
  report,
  onClick,
}) => {
  const getStatusStyles = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.PENDING:
        return { icon: Clock, color: "text-amber-400" };
      case ReportStatus.ACCEPTED:
        return { icon: CheckCircle, color: "text-green-400" };
      case ReportStatus.REJECTED:
        return { icon: X, color: "text-red-400" };
      case ReportStatus.DUPLICATE:
        return { icon: Users, color: "text-gray-400" };
      case ReportStatus.INFORMATIVE:
        return { icon: Info, color: "text-slate-400" };
      case ReportStatus.FIXED:
        return { icon: CheckCircle, color: "text-emerald-400" };
      default:
        return { icon: FileText, color: "text-gray-400" };
    }
  };

  const getSeverityStyles = (severity?: ReportSeverity) => {
    if (!severity) return { color: "text-gray-400", icon: Info };

    switch (severity) {
      case ReportSeverity.CRITICAL:
        return { color: "text-red-400", icon: Zap };
      case ReportSeverity.HIGH:
        return { color: "text-orange-400", icon: AlertTriangle };
      case ReportSeverity.MEDIUM:
        return { color: "text-yellow-400", icon: Shield };
      case ReportSeverity.LOW:
        return { color: "text-blue-400", icon: Info };
      default:
        return { color: "text-gray-400", icon: Info };
    }
  };

  const { icon: StatusIcon, color: statusColor } = getStatusStyles(
    report.status
  );
  const { color: severityColor, icon: SeverityIcon } = getSeverityStyles(
    report.severity
  );

  return (
    <div
      onClick={onClick}
      className="bg-slate-800/80 rounded-xl border border-slate-700/60 p-5 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer"
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
      <p className="text-sm text-slate-400 mb-3">{report.program.title}</p>

      {/* Description */}
      <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-grow">
        {report.description}
      </p>

      {/* Footer with Meta */}
      <div className="mt-auto">
        <div className="border-t border-slate-700/50 my-3"></div>
        <div className="flex justify-between items-center">
          {report.severity && (
            <div className="flex items-center gap-1">
              <SeverityIcon size={16} className={severityColor} />
              <span className={`text-xs font-medium ${severityColor}`}>
                {report.severity}
              </span>
            </div>
          )}
          <span className="text-xs text-slate-500">
            {new Date(report.createdAt).toLocaleDateString()}
          </span>
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
                  {total > 0 ? Math.round((item.value / total) * 100) : 0}%
                </span>
              </div>
            </div>

            <div className="w-full bg-slate-700/50 rounded-full h-1.5">
              <div
                className={`${item.color} h-1.5 rounded-full`}
                style={{
                  width: `${total > 0 ? (item.value / total) * 100 : 0}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
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

// -------- Report Detail Modal Component --------
const ReportDetailModal: React.FC<{
  report: Report;
  onClose: () => void;
}> = ({ report, onClose }) => {
  const [rewards, setRewards] = useState<any[]>([]);
  const [loadingRewards, setLoadingRewards] = useState(false);

  useEffect(() => {
    fetchReportRewards();
  }, [report.id]);

  const fetchReportRewards = async () => {
    try {
      setLoadingRewards(true);
      const response = await rewardService.getRewardsByReportId(report.id);

      let rewardsData: any[] = [];
      if (Array.isArray(response)) {
        rewardsData = response;
      } else if (response?.data && Array.isArray(response.data)) {
        rewardsData = response.data;
      } else {
        rewardsData = [];
      }

      setRewards(rewardsData);
    } catch (error) {
      console.error("Failed to fetch rewards:", error);
    } finally {
      setLoadingRewards(false);
    }
  };

  const getSeverityStyles = (severity?: ReportSeverity) => {
    if (!severity)
      return { color: "text-gray-400", bgColor: "bg-gray-500/10", icon: Info };

    switch (severity) {
      case ReportSeverity.CRITICAL:
        return { color: "text-red-400", bgColor: "bg-red-500/10", icon: Zap };
      case ReportSeverity.HIGH:
        return {
          color: "text-orange-400",
          bgColor: "bg-orange-500/10",
          icon: AlertTriangle,
        };
      case ReportSeverity.MEDIUM:
        return {
          color: "text-yellow-400",
          bgColor: "bg-yellow-500/10",
          icon: Shield,
        };
      case ReportSeverity.LOW:
        return {
          color: "text-blue-400",
          bgColor: "bg-blue-500/10",
          icon: Info,
        };
      default:
        return {
          color: "text-gray-400",
          bgColor: "bg-gray-500/10",
          icon: Info,
        };
    }
  };

  const getStatusStyles = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.PENDING:
        return {
          color: "text-amber-400",
          bgColor: "bg-amber-500/10",
          icon: Clock,
        };
      case ReportStatus.ACCEPTED:
        return {
          color: "text-green-400",
          bgColor: "bg-green-500/10",
          icon: CheckCircle,
        };
      case ReportStatus.REJECTED:
        return { color: "text-red-400", bgColor: "bg-red-500/10", icon: X };
      case ReportStatus.DUPLICATE:
        return {
          color: "text-gray-400",
          bgColor: "bg-gray-500/10",
          icon: Users,
        };
      case ReportStatus.INFORMATIVE:
        return {
          color: "text-slate-400",
          bgColor: "bg-slate-500/10",
          icon: Info,
        };
      case ReportStatus.FIXED:
        return {
          color: "text-emerald-400",
          bgColor: "bg-emerald-500/10",
          icon: CheckCircle,
        };
      default:
        return {
          color: "text-gray-400",
          bgColor: "bg-gray-500/10",
          icon: FileText,
        };
    }
  };

  const severityStyles = getSeverityStyles(report.severity);
  const statusStyles = getStatusStyles(report.status);

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center">
          <h2 className="text-lg font-medium text-slate-200">
            {report.id}: Report Detail
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Title & Severity */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <h1 className="text-xl font-semibold text-slate-100">
              {report.title}
            </h1>
            <div className="flex items-center gap-2">
              <span
                className={`flex items-center gap-1 ${statusStyles.bgColor} ${statusStyles.color} text-xs px-2 py-0.5 rounded-full font-medium`}
              >
                {React.createElement(statusStyles.icon, { size: 12 })}
                {report.status}
              </span>
              {report.severity && (
                <span
                  className={`flex items-center gap-1 ${severityStyles.bgColor} ${severityStyles.color} text-xs px-2 py-0.5 rounded-full font-medium`}
                >
                  {React.createElement(severityStyles.icon, { size: 12 })}
                  {report.severity}
                </span>
              )}
            </div>
          </div>

          {/* Meta Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
              <p className="text-xs text-slate-400 mb-1">Program</p>
              <p className="text-slate-100">
                {report.program?.title || "Unknown"}
              </p>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
              <p className="text-xs text-slate-400 mb-1">Submitted</p>
              <p className="text-slate-100">
                {new Date(report.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
              <p className="text-xs text-slate-400 mb-1">Updated</p>
              <p className="text-slate-100">
                {new Date(report.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
              <p className="text-xs text-slate-400 mb-1">Reporter</p>
              <p className="text-slate-100">
                {report.reporter?.name || "Unknown"}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-slate-300 font-medium mb-2">Description</h3>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
              <p className="text-slate-300">{report.description}</p>
            </div>
          </div>

          {/* Steps to Reproduce */}
          <div>
            <h3 className="text-slate-300 font-medium mb-2">
              Steps to Reproduce
            </h3>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
              <p className="text-slate-300 whitespace-pre-line">
                {report.stepsToReproduce}
              </p>
            </div>
          </div>

          {/* Impact */}
          {report.impact && (
            <div>
              <h3 className="text-slate-300 font-medium mb-2">Impact</h3>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <p className="text-slate-300">{report.impact}</p>
              </div>
            </div>
          )}

          {/* Fix Recommendation */}
          {report.fixRecommendation && (
            <div>
              <h3 className="text-slate-300 font-medium mb-2">
                Fix Recommendation
              </h3>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <p className="text-slate-300">{report.fixRecommendation}</p>
              </div>
            </div>
          )}

          {/* Proof URLs */}
          {report.proofUrls && report.proofUrls.length > 0 && (
            <div>
              <h3 className="text-slate-300 font-medium mb-2">
                Proof of Concept
              </h3>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <div className="space-y-2">
                  {report.proofUrls.map((url, index) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-400 hover:text-blue-300 underline break-all"
                    >
                      {url}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Review Notes */}
          {report.reviewNotes && (
            <div>
              <h3 className="text-slate-300 font-medium mb-2">Review Notes</h3>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <p className="text-slate-300">{report.reviewNotes}</p>
                {report.reviewedBy && (
                  <p className="text-xs text-slate-400 mt-2">
                    Reviewed by: {report.reviewedBy.name || "Unknown"}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Rewards Section - Only show if rewards exist */}
          {rewards.length > 0 && (
            <div>
              <h3 className="text-slate-300 font-medium mb-2 flex items-center gap-2">
                <Award size={18} className="text-purple-400" />
                Rewards
              </h3>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-purple-700/30">
                {loadingRewards ? (
                  <div className="flex justify-center py-4">
                    <Loader className="animate-spin text-purple-500" size={24} />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {rewards.map((reward) => (
                      <div
                        key={reward.id}
                        className="bg-slate-800/80 border border-slate-700/50 rounded-lg p-3"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-purple-300">
                              ${reward.amount?.toLocaleString()}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                reward.status === "approved"
                                  ? "bg-green-900/30 text-green-400"
                                  : reward.status === "paid"
                                  ? "bg-emerald-900/30 text-emerald-400"
                                  : reward.status === "rejected"
                                  ? "bg-red-900/30 text-red-400"
                                  : "bg-amber-900/30 text-amber-400"
                              }`}
                            >
                              {reward.status.charAt(0).toUpperCase() +
                                reward.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-300">
                          {reward.description}
                        </p>
                        <div className="text-xs text-slate-500 mt-2">
                          {new Date(reward.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {report.reviewedAt && (
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                <p className="text-xs text-slate-400 mb-1">Reviewed At</p>
                <p className="text-slate-100">
                  {new Date(report.reviewedAt).toLocaleString()}
                </p>
              </div>
            )}
            {report.fixedAt && (
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                <p className="text-xs text-slate-400 mb-1">Fixed At</p>
                <p className="text-slate-100">
                  {new Date(report.fixedAt).toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-700 rounded-md text-slate-300 hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
