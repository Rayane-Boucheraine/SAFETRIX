"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  X,
  Compass,
  Lock,
  Globe,
  DollarSign,
  Cpu,
  Layers,
  CheckCircle,
  Star,
  Tag,
  Clock,
  Award,
  GitCommit,
  Gauge,
} from "lucide-react";

const mockPrograms: Program[] = [
  {
    id: "prog-fintech-01",
    name: "FinTech Innovations Core Banking",
    type: "Public",
    company: "FinBank Corp",
    scope:
      "Web Application (core.finbank.com), API (api.finbank.com/v3), Internal Dashboard (Requires Invite)",
    rewardRange: "$100 - $15,000+",
    avgReward: 1250,
    avgResponseTime: 48,
    reportsResolved: 235,
    acceptanceRate: 78,
    targets: ["Web App", "API", "Cloud Config", "Source Code Review"],
    tags: ["finance", "owasp-top-10", "pci-dss", "ssr", "critical"],
    vrt: "Financial Services",
    lastActivity: "2023-10-28T10:00:00Z",
    featured: true,
    payoutPolicy: "CVSS v3.1 Based",
    accepts: ["XSS", "SQLi", "Auth Bypass", "IDOR", "SSRF", "RCE"],
  },
  {
    id: "prog-gamer-net",
    name: "GamerConnect Social Platform",
    type: "Public",
    company: "Playco",
    scope: "Mobile App (iOS/Android), Backend API (api.gamerconnect.gg)",
    rewardRange: "$50 - $2,500",
    avgReward: 300,
    avgResponseTime: 72,
    reportsResolved: 152,
    acceptanceRate: 65,
    targets: ["Mobile App", "API", "Websocket"],
    tags: ["gaming", "social", "ios", "android", "privacy", "gdpr"],
    vrt: "Social Media & Platforms",
    lastActivity: "2023-10-25T14:00:00Z",
    payoutPolicy: "Tiered - Severity",
    accepts: ["Data Exposure", "Account Takeover", "Abuse", "Cheating"],
  },
  {
    id: "prog-ai-core",
    name: "DataCorp AI Inference Engine",
    type: "Private",
    company: "DataCorp",
    scope: "API (ai.datacorp.io/v2/inference), Model Access (API)",
    rewardRange: "$500 - $25,000",
    avgReward: 4500,
    avgResponseTime: 24,
    reportsResolved: 45,
    acceptanceRate: 92,
    targets: ["API", "ML/AI"],
    tags: ["ai", "ml", "api-security", "python", "confidential", "beta"],
    vrt: "AI & Machine Learning",
    lastActivity: "2023-10-29T08:00:00Z",
    payoutPolicy: "Impact & Novelty",
    accepts: [
      "Model Evasion",
      "Data Poisoning",
      "Prompt Injection",
      "Auth Flaws",
    ],
  },
  {
    id: "prog-iot-fw",
    name: "SmartHome Connect Firmware",
    type: "Public",
    company: "HomeSys Inc.",
    scope: "IoT Device Firmware (Model SHC-V3), Control Hub API",
    rewardRange: "$200 - $8,000",
    avgReward: 1500,
    avgResponseTime: 96,
    reportsResolved: 88,
    acceptanceRate: 71,
    targets: ["IoT", "Firmware", "API", "Hardware"],
    tags: ["iot", "hardware", "embedded", "mqtt"],
    vrt: "IoT Devices",
    lastActivity: "2023-10-22T11:00:00Z",
    payoutPolicy: "CVSS + Device Impact",
    accepts: ["RCE", "Auth Bypass", "Device Tampering"],
  },
  {
    id: "prog-cloudsec-k8s",
    name: "SecureApp Cloud Infra Audit",
    type: "Private",
    company: "SecureApp Ltd.",
    scope: "AWS/GCP Configuration, Kubernetes Cluster (*.secureapp.cloud)",
    rewardRange: "$1,000 - $20,000",
    avgReward: 6000,
    avgResponseTime: 36,
    reportsResolved: 62,
    acceptanceRate: 85,
    targets: ["Cloud Config", "Kubernetes", "Infra"],
    tags: [
      "cloud",
      "aws",
      "gcp",
      "k8s",
      "devsecops",
      "terraform",
      "high-impact",
    ],
    vrt: "Cloud Infrastructure",
    lastActivity: "2023-10-29T12:00:00Z",
    featured: true,
    payoutPolicy: "Severity & Scope",
    accepts: ["Misconfiguration", "IAM Escalation", "Container Escape"],
  },
];
interface Program {
  id: string;
  name: string;
  type: ProgramType;
  company: string;
  scope: string;
  rewardRange: string;
  avgReward: number;
  avgResponseTime: number;
  reportsResolved: number;
  acceptanceRate: number;
  targets: string[];
  tags: string[];
  vrt: string;
  lastActivity: string;
  featured?: boolean;
  payoutPolicy?: string;
  accepts?: string[];
}
type ProgramType = "Public" | "Private";

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

const getResponseTypeIndicator = (hours: number): React.ReactNode => {
  let color = "bg-red-500"; // Slowest
  if (hours <= 72) color = "bg-yellow-500"; // Medium
  if (hours <= 36) color = "bg-emerald-500"; // Fast
  return (
    <div
      className="flex items-center gap-1.5 group relative"
      title={`Avg Response: ${hours}h`}
    >
      <span
        className={`inline-block w-2 h-2 rounded-full ${color} opacity-50 group-hover:opacity-100 transition-opacity`}
      ></span>
      <span
        className={`inline-block w-2 h-2 rounded-full ${color} ${
          hours <= 72 ? "opacity-50" : "opacity-20"
        } group-hover:opacity-100 transition-opacity delay-75`}
      ></span>
      <span
        className={`inline-block w-2 h-2 rounded-full ${color} ${
          hours <= 36 ? "opacity-50" : "opacity-20"
        } group-hover:opacity-100 transition-opacity delay-150`}
      ></span>
      {/* Optional: Show time on hover */}
      {/* <span className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">{hours}h</span> */}
    </div>
  );
};
const getAcceptanceRateIndicator = (rate: number): React.ReactNode => {
  let color = "bg-red-500"; // Low
  if (rate >= 65) color = "bg-yellow-500"; // Medium
  if (rate >= 80) color = "bg-emerald-500"; // High
  const width = `${rate}%`;
  return (
    <div
      className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden group relative"
      title={`Acceptance Rate: ${rate}%`}
    >
      <div
        className={`h-full ${color} rounded-full transition-all duration-500 group-hover:shadow-[0_0_5px_1px_var(--bg-color)]`}
        style={{
          width: width,
          ...({
            "--bg-color": color.replace("bg-", "rgba(").replace("-500", ", 1)"),
          } as React.CSSProperties),
        }}
      ></div>
      {/* <span className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-900 text-white text-xs px-2 py-1 rounded shadow-lg">{rate}%</span> */}
    </div>
  );
};

// -------- Main Programs Page Component --------
export default function CreativeProgramsPageV2() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    type: ProgramType | null;
    vrt: string | null;
    target: string | null;
  }>({ type: null, vrt: null, target: null });

  const filteredPrograms = mockPrograms.filter((program) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      program.name.toLowerCase().includes(searchLower) ||
      program.company.toLowerCase().includes(searchLower) ||
      program.scope.toLowerCase().includes(searchLower) ||
      program.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
      program.vrt.toLowerCase().includes(searchLower);
    const matchesType =
      !activeFilters.type || program.type === activeFilters.type;
    const matchesVrt = !activeFilters.vrt || program.vrt === activeFilters.vrt;
    const matchesTarget =
      !activeFilters.target ||
      program.targets.some(
        (t) => t.toLowerCase() === activeFilters.target?.toLowerCase()
      );
    return matchesSearch && matchesType && matchesVrt && matchesTarget;
  });

  const uniqueTypes: ProgramType[] = ["Public", "Private"];
  const uniqueVRTs = [...new Set(mockPrograms.map((p) => p.vrt))];
  const uniqueTargets = [...new Set(mockPrograms.flatMap((p) => p.targets))];

  const handleFilterChange = (
    filterType: keyof typeof activeFilters,
    value: string
  ) =>
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value === "All" ? null : value,
    }));
  const clearFilters = () => {
    setSearchTerm("");
    setActiveFilters({ type: null, vrt: null, target: null });
  };

  const themeAccentText = `text-purple-400`;

  return (
    <div className="space-y-8 text-slate-200 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-purple-900/50 pb-8 relative">
        {/* Background decoration */}
        <div className="absolute -top-4 -left-4 w-48 h-48 bg-gradient-to-br from-purple-950/30 via-black/10 to-transparent rounded-full blur-2xl opacity-40 pointer-events-none"></div>
        <div className="flex items-center gap-4 z-10">
          <div className="p-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-purple-700/30 shadow-lg">
            <Compass
              size={28}
              className={`${themeAccentText} drop-shadow-[0_0_5px_rgba(147,51,234,0.5)]`}
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-100 tracking-tight leading-tight">
              Program Database
            </h1>
            <p className="text-slate-400 mt-1 text-sm">
              Catalog of active bounty & disclosure targets.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm shrink-0 z-10 p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg backdrop-blur-sm">
          <div className="text-center border-r border-slate-700 pr-4">
            <p className="text-slate-400 text-xs uppercase tracking-wider">
              Targets
            </p>
            <p className="text-2xl font-semibold text-white">
              {mockPrograms.length}
            </p>
          </div>
          <div className="text-center border-r border-slate-700 pr-4">
            <p className="text-slate-400 text-xs uppercase tracking-wider">
              Public
            </p>
            <p className="text-2xl font-semibold text-white">
              {mockPrograms.filter((p) => p.type === "Public").length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-slate-400 text-xs uppercase tracking-wider">
              Featured
            </p>
            <p className="text-2xl font-semibold text-amber-400">
              {mockPrograms.filter((p) => p.featured).length}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex flex-wrap gap-4 items-center backdrop-blur-md shadow-lg relative z-10">
        <div className="relative flex-grow w-full md:w-auto">
          <input
            type="text"
            placeholder="Scan for programs (name, company, tag...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-700/80 border border-slate-600/70 rounded-lg py-2.5 pl-11 pr-4 text-slate-100 placeholder-slate-400/80 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-transparent text-sm shadow-inner focus:bg-slate-700"
          />
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none peer-focus:text-emerald-400 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center shrink-0">
          <CreativeFilterDropdownV2
            label="Type"
            options={["All", ...uniqueTypes]}
            value={activeFilters.type || "All"}
            onChange={(v) => handleFilterChange("type", v)}
            icon={<Layers size={14} />}
          />
          <CreativeFilterDropdownV2
            label="VRT"
            options={["All", ...uniqueVRTs]}
            value={activeFilters.vrt || "All"}
            onChange={(v) => handleFilterChange("vrt", v)}
            icon={<Tag size={14} />}
          />
          <CreativeFilterDropdownV2
            label="Target"
            options={["All", ...uniqueTargets]}
            value={activeFilters.target || "All"}
            onChange={(v) => handleFilterChange("target", v)}
            icon={<Cpu size={14} />}
          />
          {(activeFilters.type ||
            activeFilters.vrt ||
            activeFilters.target ||
            searchTerm) && (
            <button
              onClick={clearFilters}
              title="Clear Filters"
              className="p-2 rounded-md bg-slate-700/60 text-slate-400 hover:bg-red-900/50 hover:text-red-400 border border-slate-600/60 hover:border-red-700/70 transition-all duration-150"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center">
        <p className="text-slate-400 text-sm">
          Found{" "}
          <span className="font-semibold text-emerald-300">
            {filteredPrograms.length}
          </span>{" "}
          active programs based on current query.
        </p>
        {/* Future: Add sort control here */}
      </div>

      {/* Program Cards Grid */}
      <div>
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPrograms.map((program) => (
              <CreativeProgramCardV2 key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gradient-to-b from-slate-800/50 to-slate-900/60 rounded-lg border border-slate-700/50 backdrop-blur-sm shadow-inner">
            <Compass
              size={56}
              strokeWidth={1}
              className="mx-auto text-slate-600 mb-4 opacity-50"
            />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              No Programs Match Query
            </h3>
            <p className="text-slate-400 max-w-lg mx-auto">
              The target grid yielded no results for the specified parameters.
              Consider adjusting your search query or filter configuration.
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 px-5 py-2 bg-purple-600/30 text-purple-300 rounded-md hover:bg-purple-600/50 border border-purple-700/50 hover:border-purple-600/80 transition-all text-sm shadow-md"
            >
              Reset Parameters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// -------- Update Creative Program Card Component V2 with purple theme --------
const CreativeProgramCardV2: React.FC<{ program: Program }> = ({ program }) => {
  const cardBaseStyle = `bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 shadow-lg rounded-xl relative isolate overflow-hidden transition-all duration-300 h-full flex flex-col group`;
  const cardHoverStyle = `hover:border-purple-600/60 hover:shadow-purple-500/20 hover:shadow-2xl hover:scale-[1.015]`;
  const themeAccentText = `text-purple-400`;

  return (
    <div className={`${cardBaseStyle} ${cardHoverStyle}`}>
      {/* Angled Background Element */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-purple-900/30 to-transparent z-[-1] clip-path-polygon-[0%_0%,_100%_0%,_100%_80%,_0%_100%]"></div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-purple-700/30 group-hover:border-t-purple-600/40 transition-colors rounded-tr-xl"></div>
      {program.featured && (
        <div
          className="absolute top-1.5 right-1.5 text-amber-300 group-hover:animate-pulse"
          title="Featured Program"
        >
          <Star size={14} fill="currentColor" />
        </div>
      )}

      {/* Card Content */}
      <div className="p-5 flex-grow flex flex-col z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {program.type === "Public" ? (
              <Globe size={15} className="text-blue-400 flex-shrink-0" />
            ) : (
              <Lock size={15} className="text-orange-400 flex-shrink-0" />
            )}
            <h3 className="text-lg font-semibold text-slate-100 line-clamp-1">
              {program.name}
            </h3>
          </div>
          <p className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
            {program.company}
          </p>
        </div>

        {/* Grid for Stats & Info */}
        <div className="grid grid-cols-3 gap-x-4 gap-y-3 text-xs mb-4 flex-grow">
          {/* Column 1: Core Info */}
          <div className="col-span-3 sm:col-span-1 border-r border-slate-700/50 sm:pr-4 space-y-2">
            <DetailItem
              icon={<Layers size={13} />}
              label="Scope"
              value={program.scope}
              valueClass="line-clamp-2"
            />
            <DetailItem
              icon={<Cpu size={13} />}
              label="Targets"
              value={program.targets.join(" / ")}
            />
            <DetailItem icon={<Tag size={13} />} label="Tags">
              <div className="flex flex-wrap gap-1 mt-0.5">
                {program.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {program.tags.length > 3 && (
                  <span className="text-[10px] text-slate-500">
                    +{program.tags.length - 3}
                  </span>
                )}
              </div>
            </DetailItem>
          </div>

          {/* Column 2: Rewards & Response */}
          <div className="col-span-3 sm:col-span-1 border-r border-slate-700/50 sm:pr-4 space-y-2">
            <DetailItem
              icon={<DollarSign size={13} className="text-emerald-400" />}
              label="Reward Range"
              value={program.rewardRange}
              valueClass="font-semibold text-emerald-300"
            />
            <DetailItem
              icon={<Award size={13} className="text-emerald-400" />}
              label="Avg. Reward"
              value={`$${program.avgReward.toLocaleString()}`}
              valueClass="font-medium text-emerald-300"
            />
            <DetailItem icon={<Clock size={13} />} label="Avg. Response">
              {" "}
              {getResponseTypeIndicator(program.avgResponseTime)}{" "}
            </DetailItem>
          </div>

          {/* Column 3: Program Stats */}
          <div className="col-span-3 sm:col-span-1 space-y-2">
            <DetailItem
              icon={<CheckCircle size={13} />}
              label="Resolved Reports"
              value={program.reportsResolved}
              valueClass="font-medium text-slate-100"
            />
            <DetailItem icon={<Gauge size={13} />} label="Acceptance Rate">
              {" "}
              {getAcceptanceRateIndicator(program.acceptanceRate)}{" "}
            </DetailItem>
            <DetailItem
              icon={<GitCommit size={13} />}
              label="Last Activity"
              value={formatTimeAgo(program.lastActivity)}
            />
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-auto pt-4 border-t border-slate-700/50">
          <Link
            href={`/dashboard/hacker/programs/${program.id}`}
            className={`w-full block text-center px-4 py-2 text-sm ${themeAccentText} font-semibold border border-purple-700/50 rounded-md bg-purple-900/20 hover:bg-purple-800/40 hover:border-purple-600/70 hover:text-purple-300 transition-all duration-200 shadow-sm`}
          >
            Analyze Target & Engage
          </Link>
        </div>
      </div>
    </div>
  );
};

// Detail Item Helper
const DetailItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value?: string | number | React.ReactNode;
  valueClass?: string;
  children?: React.ReactNode;
}> = ({ icon, label, value, valueClass = "text-slate-300", children }) => (
  <div>
    <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-0.5">
      {icon} {label}
    </p>
    {children ? (
      <div className="text-xs">{children}</div>
    ) : (
      <p className={`text-xs ${valueClass}`}>{value}</p>
    )}
  </div>
);

// -------- Creative Filter Dropdown V2--------
const CreativeFilterDropdownV2: React.FC<{
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}> = ({ label, options, value, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gradient-to-r from-slate-700/60 to-slate-800/70 border border-slate-600/80 rounded-lg px-3.5 py-1.5 text-xs text-slate-200 hover:border-emerald-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/80 transition-all shadow-sm hover:shadow-md"
      >
        {icon && <span className="text-emerald-400 opacity-80">{icon}</span>}
        <span className="hidden sm:inline">{label}:</span>{" "}
        <span className="font-medium text-white">{value}</span>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-1.5 max-h-60 w-64 overflow-auto bg-slate-900/90 backdrop-blur-lg border border-slate-700/70 rounded-lg shadow-xl py-1 text-xs scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800/50 animate-fadeIn">
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-3.5 py-2 hover:bg-emerald-700/20 cursor-pointer flex items-center justify-between text-slate-300 ${
                value === option
                  ? "bg-emerald-800/40 text-emerald-300 font-medium"
                  : "hover:text-white"
              }`}
            >
              <span>{option}</span>
              {value === option && (
                <CheckCircle size={13} className="text-emerald-400" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
