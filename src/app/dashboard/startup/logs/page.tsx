"use client";

import React, { useState } from "react";
import {
  ClipboardList,
  Clock,
  AlertTriangle,
  Info,
  Settings,
  Download,
  Search,
} from "lucide-react";

export default function LogsPage() {
  const gradientBg =
    "bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#2A0D45_6.63%,#080808_100%)]";
  const themeAccentText = "text-purple-400";

  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("All");

  // Dummy Logs Data
    const rawLogs: {
      id: string;
      timestamp: string;
      level: "info" | "warn" | "error" | "debug";
      message: string;
      actor: string;
      ip: string;
    }[] = [
      {
        id: "LOG-001",
        timestamp: "2024-10-01T14:23:10Z",
        level: "info",
        message: "User logged in successfully",
        actor: "admin@startup.com",
        ip: "192.168.1.10",
      },
    {
      id: "LOG-002",
      timestamp: "2024-10-01T14:25:42Z",
      level: "warn",
      message: "Failed login attempt detected",
      actor: "hacker@example.com",
      ip: "192.168.1.100",
    },
    {
      id: "LOG-003",
      timestamp: "2024-10-01T14:30:12Z",
      level: "error",
      message: "Database connection failed",
      actor: "system",
      ip: "N/A",
    },
    {
      id: "LOG-004",
      timestamp: "2024-10-01T14:35:01Z",
      level: "debug",
      message: "API rate limit reset for user",
      actor: "system",
      ip: "N/A",
    },
    {
      id: "LOG-005",
      timestamp: "2024-10-01T14:40:33Z",
      level: "info",
      message: "New report submitted",
      actor: "researcher@hackerone.com",
      ip: "192.168.1.55",
    },
    {
      id: "LOG-006",
      timestamp: "2024-10-01T14:45:00Z",
      level: "warn",
      message: "High volume of reports received",
      actor: "system",
      ip: "N/A",
    },
    {
      id: "LOG-007",
      timestamp: "2024-10-01T14:50:20Z",
      level: "error",
      message: "Internal server error on /reports endpoint",
      actor: "system",
      ip: "N/A",
    },
  ];

  const filteredLogs = rawLogs.filter(
    (log) => filterLevel === "All" || log.level === filterLevel
  );

  return (
    <div className={`min-h-full p-6 md:p-8 text-slate-200 ${gradientBg}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-purple-900/40 pb-6 relative isolate">
          <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-gradient-to-br from-black/20 via-transparent to-transparent rounded-full blur-2xl opacity-60"></div>
          <div className="flex items-center gap-4 z-10">
            <div className="p-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-purple-800/30 shadow-lg">
              <ClipboardList className={themeAccentText} size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-100 tracking-tight">
                System Logs
              </h1>
              <p className="text-slate-400 mt-1 text-sm">
                Monitor system events, errors, and activity.
              </p>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 text-slate-300 rounded-md text-sm transition-all">
            <Download size={16} /> Export Logs
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <LogStatCard
            title="Total Logs"
            value={rawLogs.length}
            icon={Clock}
            color="text-slate-400"
          />
          <LogStatCard
            title="Errors"
            value={rawLogs.filter((l) => l.level === "error").length}
            icon={AlertTriangle}
            color="text-red-400"
          />
          <LogStatCard
            title="Warnings"
            value={rawLogs.filter((l) => l.level === "warn").length}
            icon={AlertTriangle}
            color="text-yellow-400"
          />
          <LogStatCard
            title="System Actions"
            value={rawLogs.filter((l) => l.actor === "system").length}
            icon={Settings}
            color="text-purple-400"
          />
        </div>

        {/* Filters + Search */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-grow">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
              size={14}
            />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-4 py-2 bg-slate-800/70 border border-slate-700 rounded-md text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-thin scrollbar-thumb-slate-700">
            {["All", "error", "warn", "info", "debug"].map((level) => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border ${
                  filterLevel === level
                    ? `bg-${level}-500/20 border-${level}-500/40 text-${level}-300`
                    : "border-slate-700/50 text-slate-400 hover:text-slate-200"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 shadow-inner">
          <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <ClipboardList className={themeAccentText} size={18} /> Recent Logs
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-300">
              <thead className="text-xs uppercase text-slate-500 border-b border-slate-700/50">
                <tr>
                  <th scope="col" className="py-3 px-4">
                    Timestamp
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Level
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Actor
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Message
                  </th>
                  <th scope="col" className="py-3 px-4">
                    IP Address
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => <LogItem key={log.id} {...log} />)
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-slate-500">
                      No matching logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 shadow-inner">
          <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <Clock className={themeAccentText} size={18} /> Activity Timeline
          </h2>
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <LogTimelineItem key={log.id} {...log} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== COMPONENTS =====

// Stat Card Component
const LogStatCard: React.FC<{
  title: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
}> = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-3xl font-bold text-slate-50 mt-1 group-hover:text-white transition-colors">
            {value}
          </p>
        </div>
        <Icon className={color} size={24} />
      </div>
    </div>
  );
};

// Log Item for Table View
const LogItem: React.FC<{
  id: string;
  timestamp: string;
  level: "error" | "warn" | "info" | "debug";
  message: string;
  actor: string;
  ip: string;
}> = ({ timestamp, level, message, actor, ip }) => {
  const getLevelColor = () => {
    switch (level) {
      case "error":
        return "bg-red-500/20 text-red-400 border border-red-500/40";
      case "warn":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40";
      case "info":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/40";
      case "debug":
        return "bg-slate-500/20 text-slate-400 border border-slate-500/40";
      default:
        return "";
    }
  };

  const getLevelIcon = () => {
    switch (level) {
      case "error":
        return <AlertTriangle size={14} className="text-red-400" />;
      case "warn":
        return <AlertTriangle size={14} className="text-yellow-400" />;
      case "info":
        return <Info size={14} className="text-blue-400" />;
      case "debug":
        return <Settings size={14} className="text-slate-400" />;
      default:
        return null;
    }
  };

  return (
    <tr className="hover:bg-slate-800/50 transition-colors group">
      <td className="py-3 px-4 font-mono text-xs">
        {new Date(timestamp).toLocaleString()}
      </td>
      <td
        className={`py-2 px-3 rounded-md ${getLevelColor()} inline-block w-fit text-xs font-medium`}
      >
        <span className="flex items-center gap-1">
          {getLevelIcon()} {level.toUpperCase()}
        </span>
      </td>
      <td className="py-3 px-4">{actor}</td>
      <td className="py-3 px-4 font-medium text-slate-200 line-clamp-1">
        {message}
      </td>
      <td className="py-3 px-4">{ip}</td>
    </tr>
  );
};

// Log Item for Timeline View
const LogTimelineItem: React.FC<{
  id: string;
  timestamp: string;
  level: "error" | "warn" | "info" | "debug";
  message: string;
  actor: string;
  ip: string;
}> = ({ timestamp, level, message, actor, ip }) => {
  const getLevelDotStyle = () => {
    switch (level) {
      case "error":
        return "bg-red-500";
      case "warn":
        return "bg-yellow-500";
      case "info":
        return "bg-blue-500";
      case "debug":
        return "bg-slate-500";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <div className="flex items-start gap-3 group">
      <div className={`mt-1.5 w-3 h-3 rounded-full ${getLevelDotStyle()}`} />
      <div className="flex-grow">
        <div className="font-mono text-xs text-slate-500">
          {new Date(timestamp).toLocaleTimeString()}
        </div>
        <div className="text-slate-200 font-medium">{message}</div>
        <div className="text-xs text-slate-500 mt-1">
          <span className="text-slate-400">{actor}</span> • IP: {ip}
        </div>
      </div>
    </div>
  );
};

