"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  X,
  Compass,
  DollarSign,
  Cpu,
  Layers,
  CheckCircle,
  Star,
  Tag,
  Clock,
  PlusCircle,
  Activity,
  Users,
  ArrowRight,
  ShieldCheck,
  LayoutGrid,
  Inbox,
} from "lucide-react";

// --- Types and Mock Data (Keep as is) ---
type ProgramType = "Public" | "Private";
type ProgramStatus = "Active" | "Paused" | "Archived";
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
  pendingReports: number;
  acceptanceRate: number;
  targets: string[];
  tags: string[];
  vrt: string;
  lastActivity: string;
  status: ProgramStatus;
  activeHackers: number;
  featured?: boolean;
  payoutPolicy?: string;
  accepts?: string[];
}
const mockPrograms: Program[] = [
  /* ... Keep mock data ... */
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
    pendingReports: 15,
    acceptanceRate: 78,
    targets: ["Web App", "API", "Cloud Config", "Source Code Review"],
    tags: ["finance", "owasp-top-10", "pci-dss", "ssr", "critical"],
    vrt: "Financial Services",
    lastActivity: "2023-10-28T10:00:00Z",
    status: "Active",
    activeHackers: 120,
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
    pendingReports: 8,
    acceptanceRate: 65,
    targets: ["Mobile App", "API", "Websocket"],
    tags: ["gaming", "social", "ios", "android", "privacy", "gdpr"],
    vrt: "Social Media & Platforms",
    lastActivity: "2023-10-25T14:00:00Z",
    status: "Active",
    activeHackers: 85,
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
    pendingReports: 3,
    acceptanceRate: 92,
    targets: ["API", "ML/AI"],
    tags: ["ai", "ml", "api-security", "python", "confidential", "beta"],
    vrt: "AI & Machine Learning",
    lastActivity: "2023-10-29T08:00:00Z",
    status: "Active",
    activeHackers: 35,
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
    pendingReports: 0,
    acceptanceRate: 71,
    targets: ["IoT", "Firmware", "API", "Hardware"],
    tags: ["iot", "hardware", "embedded", "mqtt"],
    vrt: "IoT Devices",
    lastActivity: "2023-10-22T11:00:00Z",
    status: "Paused",
    activeHackers: 15,
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
    pendingReports: 6,
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
    status: "Active",
    activeHackers: 45,
    featured: true,
    payoutPolicy: "Severity & Scope",
    accepts: ["Misconfiguration", "IAM Escalation", "Container Escape"],
  },
];

const ResponseIndicator = ({ hours }: { hours: number }) => {
  /* ... */
  let color = "bg-red-500";
  let text = "Slow";
  if (hours <= 72) {
    color = "bg-yellow-500";
    text = "Moderate";
  }
  if (hours <= 36) {
    color = "bg-green-500";
    text = "Fast";
  }
  return (
    <div
      className="flex items-center gap-1"
      title={`Average Response: ~${hours} hours (${text})`}
    >
      <span className={`block w-1.5 h-1.5 rounded-full ${color}`}></span>
      <span className="text-xs text-slate-300">{hours}h</span>
    </div>
  );
};
const AcceptanceIndicator = ({ rate }: { rate: number }) => {
  /* ... */
  let color = "bg-red-600";
  if (rate >= 65) color = "bg-yellow-500";
  if (rate >= 80) color = "bg-green-500";
  return (
    <div
      className="flex items-center gap-1.5"
      title={`Acceptance Rate: ${rate}%`}
    >
      <div className="w-12 h-1.5 bg-slate-600/70 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full`}
          style={{ width: `${rate}%` }}
        ></div>
      </div>
      <span className="text-xs font-medium text-slate-200">{rate}%</span>
    </div>
  );
};
const getStatusStyles = (status: ProgramStatus) => {
  /* ... (keep implementation) */
  switch (status) {
    case "Active":
      return {
        text: "text-green-400",
        border: "border-green-400/50",
        bg: "bg-green-500/10",
        icon: <Activity size={11} />,
      };
    case "Paused":
      return {
        text: "text-amber-400",
        border: "border-amber-400/50",
        bg: "bg-amber-500/10",
        icon: <Clock size={11} />,
      };
    case "Archived":
      return {
        text: "text-slate-500",
        border: "border-slate-600/50",
        bg: "bg-slate-700/20",
        icon: <X size={11} />,
      };
    default:
      return { text: "", border: "", bg: "", icon: null };
  }
};

// --- Style Variables ---
const themeAccentText = "text-emerald-400";
const themeAccentColor = "emerald";
const cardBaseStyle =
  "bg-slate-900/70 backdrop-blur-md border border-green-900/30 shadow-xl rounded-xl p-5 relative overflow-hidden isolate group";
const gradientBg =
  "bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#195033_6.63%,#080808_100%)]";

// --- Main Page Component ---
export default function ProgramsDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    type: ProgramType | null;
    vrt: string | null;
    target: string | null;
    status: ProgramStatus | null;
  }>({ type: null, vrt: null, target: null, status: null });

  // Filtering Logic (keep)
  const filteredPrograms = mockPrograms.filter((program) => {
    /* ... */
    const s = searchTerm.toLowerCase();
    const mS =
      !s ||
      program.name.toLowerCase().includes(s) ||
      program.company.toLowerCase().includes(s) ||
      program.tags.some((t) => t.toLowerCase().includes(s));
    const mT = !activeFilters.type || program.type === activeFilters.type;
    const mV = !activeFilters.vrt || program.vrt === activeFilters.vrt;
    const mt =
      !activeFilters.target ||
      program.targets.some(
        (t) => t.toLowerCase() === activeFilters.target?.toLowerCase()
      );
    const mSt =
      !activeFilters.status || program.status === activeFilters.status;
    return mS && mT && mV && mt && mSt;
  });

  // Filter Options (keep)
  const uniqueTypes: ProgramType[] = ["Public", "Private"];
  const uniqueVRTs = ["All", ...new Set(mockPrograms.map((p) => p.vrt))];
  const uniqueTargets = [
    "All",
    ...new Set(mockPrograms.flatMap((p) => p.targets)),
  ];
  const uniqueStatuses: ProgramStatus[] = ["Active", "Paused", "Archived"];

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
    setActiveFilters({ type: null, vrt: null, target: null, status: null });
  };

  const hasActiveFilters =
    Object.values(activeFilters).some((v) => v !== null) || searchTerm;

  const themeAccent = {
    // Consistent theme helper
    text: themeAccentText,
    colorName: themeAccentColor,
    border: `border-${themeAccentColor}-500`, // Default border
    borderLighter: `border-${themeAccentColor}-600/60`, // Lighter/subtler
    borderCard: `border-${themeAccentColor}-900/30`, // Card border from example
    ring: `ring-${themeAccentColor}-500`,
    focusRing: `focus:ring-${themeAccentColor}-500/60`,
    hoverBorder: `hover:border-${themeAccentColor}-400`, // e.g., for buttons
    hoverCardBorder: `hover:border-${themeAccentColor}-700/60`, // Subtle card hover border
    buttonBg: `bg-${themeAccentColor}-600`,
    buttonHoverBg: `hover:bg-${themeAccentColor}-700`,
    linkHoverText: `hover:text-${themeAccentColor}-300`,
  };

  return (
    <div className={`min-h-screen p-8 text-slate-200 ${gradientBg}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header - Matched styling */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-green-800/40 pb-6">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 bg-gradient-to-br from-${themeAccent.colorName}-800/30 to-slate-900 rounded-xl border ${themeAccent.borderLighter}`}
            >
              <LayoutGrid size={28} className={themeAccent.text} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-100 tracking-tight">
                Program Dashboard
              </h1>
              <p className="text-slate-400 mt-1 text-sm">
                Oversee and manage all bug bounty programs.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/startup/programs/new"
            className={`inline-flex items-center group gap-2 px-4 py-2 ${themeAccent.buttonBg} border ${themeAccent.border}/80 text-white text-sm font-medium rounded-md ${themeAccent.buttonHoverBg} ${themeAccent.hoverBorder} transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap`}
          >
            <PlusCircle size={16} /> Create Program
          </Link>
        </div>

        {/* Filters Bar - Using card base style */}
        <div className={`${cardBaseStyle} p-4`}>
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="relative flex-grow w-full md:w-auto">
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full bg-slate-800/70 border border-slate-700 rounded-lg py-2 pl-10 pr-3 text-slate-100 placeholder:text-slate-400/70 focus:outline-none focus:border-${themeAccent.colorName}-600/80 ${themeAccent.focusRing}/50 text-sm shadow-sm transition duration-150`}
              />
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400/80 pointer-events-none"
              />
            </div>
            <div className="flex flex-wrap gap-2 items-center shrink-0">
              {/* Pass themeColor */}
              <FilterDropdown
                label="Type"
                options={["All", ...uniqueTypes]}
                value={activeFilters.type || "All"}
                onChange={(v) => handleFilterChange("type", v as ProgramType)}
                icon={<Layers size={13} />}
                themeColor={themeAccentColor}
              />
              <FilterDropdown
                label="Status"
                options={["All", ...uniqueStatuses]}
                value={activeFilters.status || "All"}
                onChange={(v) =>
                  handleFilterChange("status", v as ProgramStatus)
                }
                icon={<Activity size={13} />}
                themeColor={themeAccentColor}
              />
              <FilterDropdown
                label="Target"
                options={uniqueTargets}
                value={activeFilters.target || "All"}
                onChange={(v) => handleFilterChange("target", v)}
                icon={<Cpu size={13} />}
                themeColor={themeAccentColor}
              />
              <FilterDropdown
                label="VRT"
                options={uniqueVRTs}
                value={activeFilters.vrt || "All"}
                onChange={(v) => handleFilterChange("vrt", v)}
                icon={<Tag size={13} />}
                themeColor={themeAccentColor}
              />

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  title="Clear Filters"
                  className="p-2 rounded-md bg-slate-700/50 text-slate-400 hover:bg-red-800/40 hover:text-red-300 border border-slate-600/80 hover:border-red-700/50 transition-colors duration-150"
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Program List */}
        <div>
          <p className="text-slate-400 text-sm mb-5 px-1">
            Showing{" "}
            <span className={`font-semibold ${themeAccent.text}`}>
              {filteredPrograms.length}
            </span>{" "}
            program{filteredPrograms.length !== 1 ? "s" : ""} matching criteria.
          </p>
          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPrograms.map((program) => (
                // Use updated ProgramCard
                <ProgramCard
                  key={program.id}
                  program={program}
                  themeColor={themeAccentColor}
                />
              ))}
            </div>
          ) : (
            <div className={`${cardBaseStyle} text-center py-16`}>
              <Compass
                size={56}
                strokeWidth={1}
                className="mx-auto text-slate-600 mb-4 opacity-60"
              />
              <h3 className="text-xl font-semibold text-slate-200 mb-2">
                No Programs Found
              </h3>
              <p className="text-slate-400 max-w-md mx-auto mb-6">
                Try adjusting your search filters.
              </p>
              <button
                onClick={clearFilters}
                className={`px-5 py-2 bg-${themeAccent.colorName}-700/40 text-${themeAccent.colorName}-200 rounded-md hover:bg-${themeAccent.colorName}-600/50 border border-${themeAccent.colorName}-600/50 transition-all text-sm shadow-md`}
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

// --- Program Card Component (UPDATED Featured Style) ---
const ProgramCard: React.FC<{ program: Program; themeColor: string }> = ({
  program,
  themeColor,
}) => {
  const statusStyles = getStatusStyles(program.status);
  const themeAccent = {
    text: `text-${themeColor}-400`,
    linkHoverText: `hover:text-${themeColor}-300`,
    hoverCardBorder: `hover:border-${themeColor}-700/60`,
    borderCard: `border-${themeColor}-900/30`,
  };

  // Base card style now includes hover, adjusted border
  const cardCombinedBaseStyle = `${cardBaseStyle} hover:${themeAccent.hoverCardBorder} hover:shadow-lg`;

  // NEW: Define featured style - Subtle border change and slight glow
  const featuredStyle = program.featured
    ? `border-${themeColor}-700/70 shadow-${themeColor}-500/5` // Change border color, add subtle shadow/glow
    : themeAccent.borderCard; // Use the standard card border otherwise

  return (
    // Apply the base style and conditionally add the *specific* featured border style
    <div
      className={`${cardCombinedBaseStyle.replace(
        themeAccent.borderCard,
        ""
      )} ${featuredStyle} flex flex-col`}
    >
      {/* Subtle corner accent */}
      <div
        className={`absolute -bottom-2 -left-2 w-12 h-12 border-l-2 border-b-2 border-${themeColor}-800/20 rounded-bl-xl pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity`}
      ></div>

      <div className="p-5 flex-grow flex flex-col z-10">
        {" "}
        {/* Keep p-5 to match command center */}
        {/* Header */}
        <div className="flex justify-between items-start gap-3 mb-3">
          <div>
            {/* Inline Star Indicator */}
            <div className="flex items-center gap-1.5 mb-0.5">
              <span
                className={`inline-block text-[10px] font-semibold uppercase tracking-wider ${
                  program.type === "Public"
                    ? `text-blue-400`
                    : `text-orange-400`
                }`}
              >
                {program.type}
              </span>
              {/* Show star ONLY if featured */}
              {program.featured && (
                <span title="Featured Program">
                  <Star size={10} className={`fill-current text-yellow-400`} />
                </span>
              )}
            </div>
            <h3
              className="text-lg font-semibold text-slate-100 leading-tight line-clamp-1 group-hover:text-white"
              title={program.name}
            >
              <Link
                href={`/dashboard/startup/programs/${program.id}`}
                className={themeAccent.linkHoverText}
              >
                {program.name}
              </Link>
            </h3>
            <p className="text-sm text-slate-400">{program.company}</p>
          </div>
          {/* Status Tag - keep as is */}
          <span
            className={`mt-1 flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${statusStyles.border} ${statusStyles.bg} ${statusStyles.text}`}
          >
            {statusStyles.icon} {program.status}
          </span>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs mb-4">
          {" "}
          {/* Slightly more y-gap */}
          <CardStatItem
            icon={<DollarSign size={13} className="text-green-400" />}
            label="Avg Reward"
            value={`$${program.avgReward.toLocaleString()}`}
          />
          <CardStatItem icon={<CheckCircle size={13} />} label="Accept Rate">
            <AcceptanceIndicator rate={program.acceptanceRate} />
          </CardStatItem>
          <CardStatItem icon={<Clock size={13} />} label="Response">
            <ResponseIndicator hours={program.avgResponseTime} />{" "}
          </CardStatItem>
          <CardStatItem
            icon={<Users size={13} />}
            label="Active Hackers"
            value={program.activeHackers.toLocaleString()}
          />
          <CardStatItem
            icon={<Inbox size={13} className="text-orange-400" />}
            label="Pending"
            value={program.pendingReports.toLocaleString()}
          />
          <CardStatItem
            icon={<ShieldCheck size={13} />}
            label="Resolved"
            value={program.reportsResolved.toLocaleString()}
          />
        </div>
        {/* Scope - keep style */}
        <div className="mb-3 flex-grow">
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Scope Highlights
          </label>
          <p
            className="text-sm text-slate-300 leading-relaxed line-clamp-2"
            title={program.scope}
          >
            {program.scope}
          </p>
        </div>
        {/* Targets - keep style */}
        {program.targets?.length > 0 && (
          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Targets
            </label>
            <div className="flex flex-wrap items-center gap-1">
              {program.targets.slice(0, 4).map((t) => (
                <TagChip key={t} text={t} />
              ))}
              {program.targets.length > 4 && (
                <span className="text-[11px] text-slate-500">
                  +{program.targets.length - 4}
                </span>
              )}
            </div>
          </div>
        )}
        {/* Action Button - Match example card button */}
        <div className="mt-auto pt-4 border-t border-purple-800/30">
          <Link
            href={`/dashboard/startup/programs/${program.id}`}
            className={`w-full block text-center px-3 py-2 text-sm ${themeAccent.text} border border-${themeColor}-800/50 bg-${themeColor}-900/30 hover:bg-${themeColor}-800/40 hover:border-${themeColor}-700/60 font-semibold rounded-md transition-all duration-200 group/link flex items-center justify-center gap-1.5 ${themeAccent.linkHoverText}`}
          >
            {" "}
            Manage Program{" "}
            <ArrowRight
              size={14}
              className="transition-transform duration-150 group-hover/link:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components (StatItem, TagChip - Adjust font sizes if needed) ---
const CardStatItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value?: string | number;
  children?: React.ReactNode;
}> = ({ icon, label, value, children }) => (
  <div className="flex items-start gap-1.5">
    <span className="text-slate-400 mt-0.5">{icon}</span>{" "}
    {/* Adjusted alignment */}
    <div>
      <p className="text-[11px] font-medium text-slate-400 leading-tight mb-0.5 uppercase tracking-wider">
        {label}
      </p>{" "}
      {/* Adjusted size/spacing */}
      {children ? (
        children
      ) : (
        <p className="text-sm font-medium text-slate-100 leading-tight">
          {value}
        </p>
      )}{" "}
      {/* Base size for value */}
    </div>
  </div>
);
const TagChip: React.FC<{ text: string; icon?: React.ReactNode }> = ({
  text,
  icon,
}) => (
  <span className="inline-flex items-center gap-1 text-[10px] bg-slate-700/60 text-slate-300 px-1.5 py-0.5 rounded border border-slate-600/50 whitespace-nowrap">
    {icon} {text}
  </span>
);

// --- Filter Dropdown (Style already matches) ---
const FilterDropdown: React.FC<{
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  className?: string;
  themeColor: string;
}> = ({
  label,
  options,
  value,
  onChange,
  icon,
  className = "",
  themeColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`relative ${className}`}>
      {/* Button style matched Rewards/Command Center */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 bg-slate-700/50 border border-slate-600/80 rounded px-2.5 py-1 text-[11px] font-medium text-slate-200 hover:border-${themeColor}-600/60 hover:bg-slate-700/70 focus:outline-none focus:ring-1 focus:ring-${themeColor}-500/60 transition-all shadow-sm whitespace-nowrap`}
      >
        {icon && (
          <span className={`text-${themeColor}-400/90 mr-0.5`}>{icon}</span>
        )}
        <span className="text-slate-300 hidden sm:inline">{label}:</span>
        <span className="text-white">{value}</span>
        <ChevronDown
          size={12}
          className={`ml-1 text-slate-400/90 transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div
          className={`absolute left-0 sm:left-auto right-0 z-20 mt-1 min-w-[170px] max-h-52 overflow-auto bg-slate-800/95 backdrop-blur-md border border-slate-700 rounded shadow-xl py-1 text-xs scrollbar-thin scrollbar-thumb-slate-600/80 animate-fadeIn`}
        >
          {" "}
          {/* Adjusted min-width slightly */}
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-3 py-1.5 hover:bg-${themeColor}-700/50 cursor-pointer flex items-center justify-between text-slate-300 transition-colors duration-100 ${
                value === option
                  ? `bg-${themeColor}-800/70 !text-${themeColor}-100 font-semibold`
                  : "hover:text-white"
              }`}
            >
              {" "}
              {/* Adjusted styles */}
              <span>{option}</span>
              {value === option && (
                <CheckCircle size={11} className={`text-${themeColor}-300`} />
              )}
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.15s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
