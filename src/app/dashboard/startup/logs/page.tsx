"use client";

import React, { useState } from "react";
import {
  ScrollText,
  Search,
  Shield,
  ChevronDown,
  X,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
  User,
  FileText,
  Filter,
  Settings,
  ExternalLink,
  Download,
  Globe,
  Cpu,
  Database,
  Activity,
  AlertTriangle,
  Key,
} from "lucide-react";

// --- Mock Logs Data ---
const mockLogs: Log[] = [
  {
    id: "log-12345",
    timestamp: "2023-10-29T14:05:23Z",
    type: "auth",
    action: "login_success",
    user: "alice.m@startup.com",
    ipAddress: "192.168.1.105",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/118.0.0.0",
    severity: "info",
    details: "Successful login from recognized device",
  },
  {
    id: "log-12346",
    timestamp: "2023-10-29T13:45:12Z",
    type: "report",
    action: "report_status_change",
    user: "bob.c@startup.com",
    ipAddress: "192.168.1.110",
    reportId: "RPT-1234",
    oldStatus: "New",
    newStatus: "Triaged",
    severity: "info",
    details: "Report status updated",
  },
  {
    id: "log-12347",
    timestamp: "2023-10-29T13:30:45Z",
    type: "payout",
    action: "bounty_approved",
    user: "alice.m@startup.com",
    ipAddress: "192.168.1.105",
    reportId: "RPT-1230",
    amount: 800,
    severity: "info",
    details: "Bounty approved for report",
  },
  {
    id: "log-12348",
    timestamp: "2023-10-29T12:15:32Z",
    type: "system",
    action: "backup_completed",
    severity: "info",
    details: "Automated system backup completed successfully",
  },
  {
    id: "log-12349",
    timestamp: "2023-10-29T11:05:15Z",
    type: "auth",
    action: "login_failed",
    ipAddress: "45.23.126.112",
    attempts: 3,
    severity: "warning",
    details: "Multiple failed login attempts for user admin@startup.com",
  },
  {
    id: "log-12350",
    timestamp: "2023-10-29T10:30:22Z",
    type: "program",
    action: "program_updated",
    user: "alice.m@startup.com",
    ipAddress: "192.168.1.105",
    programId: "prog-fintech-01",
    severity: "info",
    details: "Program scope and rewards updated",
  },
  {
    id: "log-12351",
    timestamp: "2023-10-29T10:25:18Z",
    type: "report",
    action: "report_submitted",
    reportId: "RPT-1245",
    severity: "info",
    details: "New report submitted by researcher",
  },
  {
    id: "log-12352",
    timestamp: "2023-10-29T09:15:44Z",
    type: "system",
    action: "api_rate_limit",
    ipAddress: "45.23.126.112",
    severity: "error",
    details: "API rate limit exceeded from IP",
  },
  {
    id: "log-12353",
    timestamp: "2023-10-29T08:45:21Z",
    type: "program",
    action: "hacker_invited",
    user: "bob.c@startup.com",
    ipAddress: "192.168.1.110",
    programId: "prog-fintech-01",
    severity: "info",
    details: "New researcher invited to private program",
  },
  {
    id: "log-12354",
    timestamp: "2023-10-29T08:30:17Z",
    type: "auth",
    action: "password_changed",
    user: "charlie.d@startup.com",
    ipAddress: "192.168.1.115",
    severity: "info",
    details: "User changed their password",
  },
];

type LogType = "auth" | "report" | "payout" | "system" | "program";
type LogSeverity = "info" | "warning" | "error";
type TimeFrame = "last-hour" | "today" | "yesterday" | "last-7-days" | "all";

interface Log {
  id: string;
  timestamp: string;
  type: LogType;
  action: string;
  user?: string;
  ipAddress?: string;
  userAgent?: string;
  reportId?: string;
  programId?: string;
  severity: LogSeverity;
  details: string;
  oldStatus?: string;
  newStatus?: string;
  amount?: number;
  attempts?: number;
}

// This function is replaced by getTypeIcon below
// Removing to fix "assigned a value but never used" error

const getLogSeverityStyles = (severity: LogSeverity) => {
  switch (severity) {
    case "error":
      return {
        color: "text-red-400",
        bg: "bg-red-900/20",
        border: "border-red-800/50",
        icon: AlertCircle,
      };
    case "warning":
      return {
        color: "text-amber-400",
        bg: "bg-amber-900/20",
        border: "border-amber-800/50",
        icon: AlertCircle,
      };
    case "info":
    default:
      return {
        color: "text-emerald-400",
        bg: "bg-emerald-900/20",
        border: "border-emerald-800/50",
        icon: Info,
      };
  }
};

const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    type: LogType | null;
    severity: LogSeverity | null;
    timeFrame: TimeFrame | null;
  }>({
    type: null,
    severity: null,
    timeFrame: null,
  });

  // Filter logs based on search term and filters
  const filteredLogs = mockLogs.filter((log) => {
    // Search filter
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      log.action.toLowerCase().includes(searchLower) ||
      log.details.toLowerCase().includes(searchLower) ||
      log.id.toLowerCase().includes(searchLower) ||
      (log.user && log.user.toLowerCase().includes(searchLower)) ||
      (log.reportId && log.reportId.toLowerCase().includes(searchLower)) ||
      (log.ipAddress && log.ipAddress.toLowerCase().includes(searchLower));

    // Type filter
    const matchesType = !activeFilters.type || log.type === activeFilters.type;

    // Severity filter
    const matchesSeverity =
      !activeFilters.severity || log.severity === activeFilters.severity;

    // Time frame filter
    let matchesTimeFrame = true;
    if (activeFilters.timeFrame) {
      const now = new Date();
      const logDate = new Date(log.timestamp);

      switch (activeFilters.timeFrame) {
        case "last-hour":
          matchesTimeFrame =
            now.getTime() - logDate.getTime() <= 60 * 60 * 1000;
          break;
        case "today":
          matchesTimeFrame = logDate.toDateString() === now.toDateString();
          break;
        case "yesterday":
          const yesterday = new Date(now);
          yesterday.setDate(yesterday.getDate() - 1);
          matchesTimeFrame =
            logDate.toDateString() === yesterday.toDateString();
          break;
        case "last-7-days":
          const lastWeek = new Date(now);
          lastWeek.setDate(lastWeek.getDate() - 7);
          matchesTimeFrame = logDate >= lastWeek;
          break;
        case "all":
        default:
          matchesTimeFrame = true;
      }
    }

    return matchesSearch && matchesType && matchesSeverity && matchesTimeFrame;
  });

  // Handle filter change
  const handleFilterChange = (
    filterType: keyof typeof activeFilters,
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
      type: null,
      severity: null,
      timeFrame: null,
    });
  };

  // Theme styling
  const gradientBg =
    "bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#195033_6.63%,#080808_100%)]";
  const themeAccentText = "text-emerald-400";

  return (
    <div className={`min-h-full p-8 text-slate-200 ${gradientBg}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header Section */}
        <div className="bg-slate-900/70 backdrop-blur-md border border-green-900/30 shadow-xl rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-20 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2"></div>

          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-emerald-800/30 to-slate-900 rounded-xl border border-emerald-600/60 shadow-lg">
                <ScrollText size={28} className={themeAccentText} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight">
                  Activity Logs
                </h1>
                <p className="text-slate-400 mt-1 text-sm">
                  Monitor and audit all system activities and events across your
                  security programs.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-600/30 text-emerald-200 border border-emerald-600/50 rounded-lg hover:bg-emerald-600/40 transition-colors shadow-sm">
                <Download size={16} />
                <span className="hidden sm:inline">Export Logs</span>
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-2 bg-slate-700/70 text-slate-300 border border-slate-600/50 rounded-lg hover:bg-slate-700 transition-colors shadow-sm">
                <Settings size={16} />
                <span className="hidden sm:inline">Configure</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <EnhancedStatCard
            title="Total Logs"
            value={mockLogs.length}
            icon={ScrollText}
            color="emerald"
            bgGradient="from-emerald-900/20 to-emerald-800/5"
            trend={+12}
          />
          <EnhancedStatCard
            title="Auth Events"
            value={mockLogs.filter((log) => log.type === "auth").length}
            icon={Shield}
            color="blue"
            bgGradient="from-blue-900/20 to-blue-800/5"
            trend={+5}
          />
          <EnhancedStatCard
            title="Warnings"
            value={mockLogs.filter((log) => log.severity === "warning").length}
            icon={AlertTriangle}
            color="amber"
            bgGradient="from-amber-900/20 to-amber-800/5"
            trend={-2}
          />
          <EnhancedStatCard
            title="Errors"
            value={mockLogs.filter((log) => log.severity === "error").length}
            icon={AlertCircle}
            color="red"
            bgGradient="from-red-900/20 to-red-800/5"
            trend={+3}
          />
        </div>

        {/* Enhanced Search & Filter Bar */}
        <div className="bg-slate-900/70 backdrop-blur-md border border-green-900/30 shadow-xl rounded-xl p-5 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-emerald-900/10 to-transparent opacity-50"></div>

          <div className="relative z-10 flex flex-wrap gap-4 items-center">
            <div className="relative flex-grow min-w-[250px]">
              <input
                type="text"
                placeholder="Search logs by ID, action, details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-transparent text-sm shadow-inner"
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={18}
              />
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <div className="hidden sm:flex items-center text-slate-400 mr-1">
                <Filter size={16} className="mr-1.5" /> Filters:
              </div>

                <EnhancedFilterDropdown
                label="Type"
                options={[
                  "All",
                  "auth",
                  "report",
                  "payout",
                  "system",
                  "program",
                ]}
                value={activeFilters.type || "All"}
                onChange={(value: string) => handleFilterChange("type", value)}
                icon={<Database size={14} className="text-emerald-400" />}
                />

                <EnhancedFilterDropdown
                label="Severity"
                options={["All", "info", "warning", "error"]}
                value={activeFilters.severity || "All"}
                onChange={(value: string) => handleFilterChange("severity", value)}
                icon={<Activity size={14} className="text-emerald-400" />}
                />

                <EnhancedFilterDropdown
                label="Time"
                options={[
                  "All",
                  "last-hour",
                  "today",
                  "yesterday",
                  "last-7-days",
                ]}
                value={activeFilters.timeFrame || "All"}
                onChange={(value: string) => handleFilterChange("timeFrame", value)}
                icon={<Clock size={14} className="text-emerald-400" />}
                />

              {/* Clear Filters */}
              {(activeFilters.type ||
                activeFilters.severity ||
                activeFilters.timeFrame ||
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
        {(activeFilters.type ||
          activeFilters.severity ||
          activeFilters.timeFrame) && (
          <div className="flex flex-wrap gap-2 items-center text-sm">
            <span className="text-slate-400">Active filters:</span>

            {activeFilters.type && (
              <FilterTag
                label={`Type: ${activeFilters.type}`}
                onClear={() => handleFilterChange("type", "All")}
                color="bg-slate-800 border-emerald-700/40 text-emerald-300"
              />
            )}

            {activeFilters.severity && (
              <FilterTag
                label={`Severity: ${activeFilters.severity}`}
                onClear={() => handleFilterChange("severity", "All")}
                color="bg-slate-800 border-emerald-700/40 text-emerald-300"
              />
            )}

            {activeFilters.timeFrame && (
              <FilterTag
                label={`Time: ${activeFilters.timeFrame.replace(/-/g, " ")}`}
                onClear={() => handleFilterChange("timeFrame", "All")}
                color="bg-slate-800 border-emerald-700/40 text-emerald-300"
              />
            )}
          </div>
        )}

        {/* Enhanced Logs Table */}
        <div>
          <p className="text-slate-400 text-sm mb-4">
            Displaying{" "}
            <span className="font-medium text-emerald-300">
              {filteredLogs.length}
            </span>{" "}
            of {mockLogs.length} logs
          </p>

          {filteredLogs.length > 0 ? (
            <div className="bg-slate-900/70 backdrop-blur-md border border-green-900/30 shadow-xl rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-800/80 border-b border-slate-700/50">
                      <th className="py-3 px-4 font-medium text-slate-400 text-left">
                        Time
                      </th>
                      <th className="py-3 px-4 font-medium text-slate-400 text-left">
                        Type
                      </th>
                      <th className="py-3 px-4 font-medium text-slate-400 text-left">
                        Action
                      </th>
                      <th className="py-3 px-4 font-medium text-slate-400 text-left hidden md:table-cell">
                        User
                      </th>
                      <th className="py-3 px-4 font-medium text-slate-400 text-left">
                        Details
                      </th>
                      <th className="py-3 px-4 font-medium text-slate-400 text-left">
                        Severity
                      </th>
                      <th className="py-3 px-4 font-medium text-slate-400 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map((log, index) => {
                      const typeIcon = getTypeIcon(log.type);
                      const severityStyle = getLogSeverityStyles(log.severity);

                      return (
                        <tr
                          key={log.id}
                          className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${
                            index % 2 === 0 ? "bg-slate-800/10" : ""
                          }`}
                        >
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-slate-500" />
                              <span>{formatTimestamp(log.timestamp)}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5">
                              <div className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                                {React.createElement(typeIcon, {
                                  size: 14,
                                  className: getTypeColor(log.type),
                                })}
                              </div>
                              <span className="capitalize">{log.type}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-medium text-slate-300">
                              {formatAction(log.action)}
                            </span>
                          </td>
                          <td className="py-3 px-4 hidden md:table-cell">
                            {log.user ? (
                              <span className="flex items-center gap-1.5 text-slate-300">
                                <User size={14} className="text-slate-400" />
                                {log.user}
                              </span>
                            ) : (
                              <span className="text-slate-500 italic">
                                System
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 max-w-xs truncate">
                            <span className="text-slate-400">
                              {log.details}
                            </span>
                            {log.reportId && (
                              <span className="ml-1 text-emerald-400 font-mono text-xs">
                                {log.reportId}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${severityStyle.bg} ${severityStyle.color} border ${severityStyle.border}`}
                            >
                              {React.createElement(severityStyle.icon, {
                                size: 12,
                              })}
                              {log.severity}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button className="p-1.5 bg-slate-800/70 hover:bg-slate-700 text-slate-400 hover:text-emerald-400 rounded-lg border border-slate-700/60 hover:border-emerald-600/40 transition-colors">
                              <ExternalLink size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800/30 border-t border-slate-700/40">
                <div className="text-xs text-slate-400">
                  Showing {filteredLogs.length} entries
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 bg-slate-800/70 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded border border-slate-700/60 text-xs">
                    Previous
                  </button>
                  <span className="px-2 py-1 bg-emerald-900/40 text-emerald-300 rounded border border-emerald-700/40 text-xs">
                    1
                  </span>
                  <button className="px-3 py-1 bg-slate-800/70 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded border border-slate-700/60 text-xs">
                    Next
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/70 backdrop-blur-md border border-green-900/30 rounded-xl shadow-lg">
              <ScrollText
                size={48}
                className="mx-auto text-slate-500 mb-4 opacity-50"
              />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">
                No Logs Found
              </h3>
              <p className="text-slate-400 max-w-md mx-auto">
                No logs match your current search criteria. Try adjusting your
                filters or search term.
              </p>
              <button
                onClick={clearFilters}
                className="mt-6 px-5 py-2 bg-emerald-600/40 text-emerald-300 rounded-md hover:bg-emerald-600/60 border border-emerald-600/50 transition-all text-sm shadow-md"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Enhanced Stat Card Component ---
interface EnhancedStatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  trend?: number;
}

const EnhancedStatCard = ({
  title,
  value,
  icon: Icon,
  color,
  bgGradient,
  trend,
}: EnhancedStatCardProps) => {
  // Calculate appropriate text and background colors based on the provided color
  const textColor = `text-${color}-400`;
  const bgColor = `bg-${color}-500/10`;
  const borderColor = `border-${color}-500/30`;

  return (
    <div className="bg-slate-900/70 backdrop-blur-md border border-slate-700/60 hover:border-green-900/40 rounded-lg p-5 shadow-lg transition-all duration-300 hover:shadow-xl group relative overflow-hidden">
      {/* Background gradient effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-20 ${bgGradient}`}
      ></div>

      {/* Header with icon */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <h3 className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
          {title}
        </h3>
        <div className={`p-2 rounded-lg ${bgColor} ${borderColor}`}>
          <Icon size={18} className={textColor} />
        </div>
      </div>

      {/* Value with trend indicator */}
      <div className="flex items-end gap-3 relative z-10">
        <p className="text-3xl font-bold text-slate-100 mt-1 group-hover:text-white transition-colors">
          {value}
        </p>
        {trend !== undefined && (
          <div
            className={`flex items-center text-xs mb-1 px-1.5 py-0.5 rounded ${
              trend >= 0
                ? "text-emerald-400 bg-emerald-900/30"
                : "text-red-400 bg-red-900/30"
            }`}
          >
            {trend >= 0 ? "+" : ""}
            {trend}%
          </div>
        )}
      </div>

      {/* Bottom highlight/glow */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 opacity-0 ${textColor.replace(
          "text",
          "bg"
        )} group-hover:opacity-50 transition-all duration-300`}
      ></div>
    </div>
  );
};

// --- Filter Tag Component ---
interface FilterTagProps {
  label: string;
  onClear: () => void;
  color: string;
}

const FilterTag = ({ label, onClear, color }: FilterTagProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md ${color}`}
    >
      {label}
      <X
        size={14}
        className="cursor-pointer hover:text-red-400"
        onClick={onClear}
      />
    </span>
  );
};

// --- Enhanced Filter Dropdown Component ---
interface EnhancedFilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
}

const EnhancedFilterDropdown = ({ label, options, value, onChange, icon }: EnhancedFilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Format option labels for display
  const formatOptionLabel = (option: string): string => {
    if (option === "All") return option;
    return option.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 hover:border-emerald-600/60 hover:bg-slate-700/80 focus:outline-none focus:ring-1 focus:ring-emerald-500/80 transition-all shadow-sm"
      >
        {icon}
        <span className="hidden sm:inline">{label}:</span>{" "}
        <span className="font-medium text-white">
          {formatOptionLabel(value)}
        </span>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-1.5 max-h-60 w-48 overflow-auto bg-slate-800/95 backdrop-blur-lg border border-emerald-900/30 rounded-lg shadow-xl py-1 text-xs">
          {options.map((option: string, idx: number) => (
            <div
              key={idx}
              onClick={() => {
          onChange(option);
          setIsOpen(false);
              }}
              className={`px-3.5 py-2 hover:bg-emerald-700/20 cursor-pointer flex items-center justify-between text-slate-300 ${
          value === option
            ? `bg-emerald-800/40 text-emerald-300 font-medium`
            : "hover:text-white"
              }`}
            >
              <span>{formatOptionLabel(option)}</span>
              {value === option && (
          <CheckCircle size={12} className="text-emerald-400" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper functions for log type icons and colors
const getTypeIcon = (type: LogType): React.ElementType => {
  switch (type) {
    case "auth":
      return Key;
    case "report":
      return FileText;
    case "payout":
      return CheckCircle;
    case "system":
      return Cpu;
    case "program":
      return Globe;
    default:
      return Info;
  }
};

const getTypeColor = (type: LogType): string => {
  switch (type) {
    case "auth":
      return "text-amber-400";
    case "report":
      return "text-blue-400";
    case "payout":
      return "text-emerald-400";
    case "system":
      return "text-purple-400";
    case "program":
      return "text-sky-400";
    default:
      return "text-slate-400";
  }
};

// Format action string for better display
const formatAction = (action: string): string => {
  return action.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};
