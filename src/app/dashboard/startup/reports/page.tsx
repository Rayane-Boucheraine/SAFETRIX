"use client";

import React, { useState } from "react";
import {
  Trophy,
  DollarSign,
  CheckCircle,
  Clock,
  Shield,
  Search,
  ChevronDown,
  X,
  Activity,
  Users,
  Filter,
  TrendingUp,
  BarChart2,
  Award,
  Building,
  Star,
} from "lucide-react";

// --- Data Interfaces & Mock Data (Keep as is) ---
type PayoutStatus = "Paid" | "Pending" | "Processing" | "Failed";
type Severity = "Critical" | "High" | "Medium" | "Low" | "Info";
interface Reward {
  id: string;
  reportId: string;
  program: string;
  programId: string;
  programLogoUrl?: string;
  hacker: string;
  amount: number;
  status: PayoutStatus;
  severity: Severity;
  payoutDate: string | null;
  reportTitle: string;
  bonus?: number;
  featuredReport?: boolean;
}
const mockRewards: Reward[] = [
  // ... (Keep the same mock data)
  {
    id: "PAYOUT-001",
    reportId: "RPT-1230",
    program: "ACME Corp",
    programId: "prog-acme",
    hacker: "ByteGhost",
    amount: 800,
    status: "Paid",
    severity: "High",
    payoutDate: "2023-10-28T09:00:00Z",
    reportTitle: "IDOR allows viewing other users' order details",
    bonus: 50,
  },
  {
    id: "PAYOUT-002",
    reportId: "RPT-1199",
    program: "DataCorp AI",
    programId: "prog-ai",
    hacker: "SecureSam",
    amount: 250,
    status: "Paid",
    severity: "Medium",
    payoutDate: "2023-10-21T12:00:00Z",
    reportTitle: "Reflected XSS via Search Parameter",
  },
  {
    id: "PAYOUT-003",
    reportId: "RPT-1245",
    program: "CloudSecure",
    programId: "prog-cloudsec-k8s",
    hacker: "CodeWizard",
    amount: 2500,
    status: "Paid",
    severity: "Critical",
    payoutDate: "2023-10-29T10:00:00Z",
    reportTitle: "Authentication Bypass via Insecure JWT Signature Validation",
    bonus: 200,
    featuredReport: true,
  },
  {
    id: "PAYOUT-004",
    reportId: "RPT-1190",
    program: "DevOps Central",
    programId: "prog-devops",
    hacker: "ZeroDayHero",
    amount: 1200,
    status: "Paid",
    severity: "High",
    payoutDate: "2023-10-18T16:40:00Z",
    reportTitle:
      "Server-Side Request Forgery (SSRF) in CI Pipeline Import Feature",
  },
  {
    id: "PAYOUT-005",
    reportId: "RPT-1240",
    program: "SecureApp",
    programId: "prog-secureapp",
    hacker: "NetSpectre",
    amount: 250,
    status: "Pending",
    severity: "Medium",
    payoutDate: null,
    reportTitle: "Rate Limiting Bypass on Login Endpoint",
  },
  {
    id: "PAYOUT-006",
    reportId: "RPT-1099",
    program: "FinTech Innovations",
    programId: "prog-fintech",
    hacker: "ScriptKid",
    amount: 150,
    status: "Paid",
    severity: "Low",
    payoutDate: "2023-09-05T11:00:00Z",
    reportTitle: "Minor Content Spoofing via URL Parameter",
  },
  {
    id: "PAYOUT-007",
    reportId: "RPT-1050",
    program: "GamerConnect",
    programId: "prog-gamer",
    hacker: "PixelPwnr",
    amount: 500,
    status: "Processing",
    severity: "High",
    payoutDate: null,
    reportTitle: "Chained Vulnerability Leading to Account Takeover",
    bonus: 100,
    featuredReport: true,
  },
  {
    id: "PAYOUT-008",
    reportId: "RPT-1255",
    program: "CloudSecure",
    programId: "prog-cloudsec-k8s",
    hacker: "CodeWizard",
    amount: 1800,
    status: "Paid",
    severity: "High",
    payoutDate: "2023-11-01T14:00:00Z",
    reportTitle: "Privilege Escalation in User Roles Module",
  },
  {
    id: "PAYOUT-009",
    reportId: "RPT-1260",
    program: "ACME Corp",
    programId: "prog-acme",
    hacker: "SecureSam",
    amount: 300,
    status: "Pending",
    severity: "Medium",
    payoutDate: null,
    reportTitle: "Open Redirect on Logout Functionality",
  },
  {
    id: "PAYOUT-010",
    reportId: "RPT-1270",
    program: "DataCorp AI",
    programId: "prog-ai",
    hacker: "ZeroDayHero",
    amount: 4000,
    status: "Paid",
    severity: "Critical",
    payoutDate: "2023-11-02T10:30:00Z",
    reportTitle:
      "Remote Code Execution via Unsanitized Input in AI Model Training Endpoint",
    bonus: 500,
  },
];

// --- Calculations & Constants (Keep as is) ---
const paidRewards = mockRewards.filter((r) => r.status === "Paid");
const totalEarned = paidRewards.reduce(
  (sum, r) => sum + r.amount + (r.bonus || 0),
  0
);
const pendingPayoutsTotal = mockRewards
  .filter((r) => r.status === "Pending" || r.status === "Processing")
  .reduce((sum, r) => sum + r.amount + (r.bonus || 0), 0);
const totalBonusPaid = paidRewards.reduce((sum, r) => sum + (r.bonus || 0), 0);
const averagePayout =
  paidRewards.length > 0 ? totalEarned / paidRewards.length : 0;
const largestPayout = Math.max(
  ...paidRewards.map((r) => r.amount + (r.bonus || 0)),
  0
);

const layoutGradient =
  "bg-gradient-to-br from-[#0f0f15] via-[#141019] to-[#0c0c11]"; // Subtle gradient
const themeAccentColor = "purple"; // Keeping purple for consistency

// --- Main Component ---
export default function RewardsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    status: PayoutStatus | null;
    program: string | null;
    hacker: string | null;
    severity: Severity | null;
  }>({ status: null, program: null, hacker: null, severity: null });

  // --- Filtering Logic ---
  const filteredRewards = mockRewards.filter((reward) => {
    const sLower = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      [reward.program, reward.reportId, reward.reportTitle, reward.hacker].some(
        (field) => field?.toLowerCase().includes(sLower)
      );
    const matchesStatus =
      !activeFilters.status || reward.status === activeFilters.status;
    const matchesProgram =
      !activeFilters.program || reward.program === activeFilters.program;
    const matchesHacker =
      !activeFilters.hacker || reward.hacker === activeFilters.hacker;
    const matchesSeverity =
      !activeFilters.severity || reward.severity === activeFilters.severity;
    return (
      matchesSearch &&
      matchesStatus &&
      matchesProgram &&
      matchesHacker &&
      matchesSeverity
    );
  });

  const uniquePrograms = ["All", ...new Set(mockRewards.map((r) => r.program))];
  const uniqueHackers = ["All", ...new Set(mockRewards.map((r) => r.hacker))];
  const uniqueSeverities: (Severity | "All")[] = [
    "All",
    "Critical",
    "High",
    "Medium",
    "Low",
    "Info",
  ];
  const payoutStatuses: (PayoutStatus | "All")[] = [
    "All",
    "Paid",
    "Pending",
    "Processing",
    "Failed",
  ];

  const handleFilterChange = (
    filterType: keyof typeof activeFilters,
    value: string
  ) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value === "All" ? null : value,
    }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveFilters({
      status: null,
      program: null,
      hacker: null,
      severity: null,
    });
  };

  const themeAccent = {
    text: `text-${themeAccentColor}-400`,
    border: `border-${themeAccentColor}-500`,
    ring: `ring-${themeAccentColor}-500`,
    focusRing: `focus:ring-${themeAccentColor}-500/70`,
    hoverBorder: `hover:border-${themeAccentColor}-600/60`,
  };

  const hasActiveFilters =
    Object.values(activeFilters).some((v) => v !== null) || searchTerm;

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 md:p-8 text-slate-300 ${layoutGradient}`}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Elegant Header with Glass Effect */}
        <div className="relative overflow-hidden bg-slate-800/70 backdrop-blur-xl rounded-xl border border-slate-700/60 shadow-2xl">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-20 -left-32 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>

          <div className="p-6 relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-600/30 to-indigo-600/30 border border-purple-500/40 shadow-lg shadow-purple-900/20">
                  <Trophy size={26} className="text-purple-300" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Rewards Ledger
                  </h1>
                  <p className="text-slate-400 text-sm mt-1">
                    Track your bounties and payouts in one place
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                <StatCard
                  label="Total Earned"
                  value={`$${totalEarned.toLocaleString()}`}
                  icon={DollarSign}
                  color="emerald"
                />
                <StatCard
                  label="Pending"
                  value={`$${pendingPayoutsTotal.toLocaleString()}`}
                  icon={Clock}
                  color="amber"
                />
                <StatCard
                  label="Average"
                  value={`$${averagePayout.toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}`}
                  icon={TrendingUp}
                  color="blue"
                />
                <StatCard
                  label="Bonuses"
                  value={`$${totalBonusPaid.toLocaleString()}`}
                  icon={Star}
                  color="yellow"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filter Bar */}
        <div className="bg-slate-800/70 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-slate-700/60">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="relative flex-grow min-w-[240px] lg:max-w-sm">
              <input
                type="text"
                placeholder="Search by title, program or hacker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full bg-slate-900/80 border border-slate-600/90 rounded-lg py-2.5 pl-10 pr-3 text-slate-200 placeholder:text-slate-500 focus:outline-none ${themeAccent.focusRing} focus:${themeAccent.border} text-sm shadow-inner transition-colors duration-150`}
              />
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <ElegantFilterDropdown
                label="Status"
                options={payoutStatuses}
                value={activeFilters.status || "All"}
                onChange={(v) => handleFilterChange("status", v)}
                icon={<Activity size={14} />}
              />
              <ElegantFilterDropdown
                label="Severity"
                options={uniqueSeverities}
                value={activeFilters.severity || "All"}
                onChange={(v) => handleFilterChange("severity", v)}
                icon={<Shield size={14} />}
              />
              <ElegantFilterDropdown
                label="Program"
                options={uniquePrograms}
                value={activeFilters.program || "All"}
                onChange={(v) => handleFilterChange("program", v)}
                icon={<Building size={14} />}
              />
              <ElegantFilterDropdown
                label="Hacker"
                options={uniqueHackers}
                value={activeFilters.hacker || "All"}
                onChange={(v) => handleFilterChange("hacker", v)}
                icon={<Users size={14} />}
              />

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  title="Clear Filters"
                  className="p-2 rounded-lg bg-red-900/30 text-red-300 hover:bg-red-800/50 border border-red-700/50 hover:border-red-600 transition-all duration-150 flex items-center gap-1.5"
                >
                  <X size={14} />{" "}
                  <span className="hidden sm:inline text-sm">Clear</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Insights Dashboard */}
        <div className="bg-slate-800/70 backdrop-blur-xl rounded-xl p-5 border border-slate-700/60 shadow-lg">
          <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart2 size={18} className="text-purple-400" />
            Reward Analytics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-700/40 p-4 rounded-lg border border-slate-600/50 shadow-inner">
              <p className="text-slate-300 font-medium mb-2">
                Status Breakdown
              </p>
              <div className="space-y-2">
                {Object.entries(
                  mockRewards.reduce<Record<PayoutStatus, number>>(
                    (acc, r) => {
                      acc[r.status] = (acc[r.status] || 0) + 1;
                      return acc;
                    },
                    { Paid: 0, Pending: 0, Processing: 0, Failed: 0 }
                  )
                ).map(([status, count]) => (
                  <div
                    key={status}
                    className="flex justify-between items-center"
                  >
                    <span className="text-slate-400">{status}</span>
                    <span
                      className={`font-medium ${
                        status === "Paid"
                          ? "text-green-400"
                          : status === "Pending"
                          ? "text-amber-400"
                          : status === "Processing"
                          ? "text-blue-400"
                          : "text-red-400"
                      }`}
                    >
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-700/40 p-4 rounded-lg border border-slate-600/50 shadow-inner">
              <p className="text-slate-300 font-medium mb-2 flex items-center gap-1.5">
                <Award size={14} className="text-purple-400" />
                Largest Payout
              </p>
              <p className="text-2xl font-semibold text-emerald-300">
                ${largestPayout.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Highest single payout received
              </p>
            </div>

            <div className="bg-slate-700/40 p-4 rounded-lg border border-slate-600/50 shadow-inner">
              <p className="text-slate-300 font-medium mb-2 flex items-center gap-1.5">
                <Star size={14} className="text-purple-400" />
                Performance
              </p>
              <p className="text-2xl font-semibold text-yellow-300">
                ${totalBonusPaid.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Total bonus earnings
              </p>
            </div>
          </div>
        </div>

        {/* Reward List */}
        <div>
          <div className="flex justify-between items-center mb-3 px-1">
            <p className="text-xs text-slate-400">
              <span className="font-medium text-purple-400">
                {filteredRewards.length}
              </span>{" "}
              of {mockRewards.length} rewards
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Filter size={12} />
              <span>
                {Object.values(activeFilters).filter(Boolean).length || "No"}{" "}
                active filters
              </span>
            </div>
          </div>

          {filteredRewards.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredRewards.map((reward) => (
                <div
                  key={reward.id}
                  className="bg-slate-800/50 rounded-lg border border-slate-700/60 hover:border-purple-600/40 transition-all p-2.5"
                >
                  <div className="flex items-center gap-3">
                    {/* Program logo */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-md overflow-hidden">
                      {reward.programLogoUrl ? (
                        <img
                          src={reward.programLogoUrl}
                          alt=""
                          className="w-full h-full object-cover bg-slate-700/50"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-700/50 flex items-center justify-center">
                          <Building size={14} className="text-slate-500" />
                        </div>
                      )}
                    </div>

                    {/* Main content */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between">
                        <h3
                          className="text-sm font-medium text-white truncate"
                          title={reward.reportTitle}
                        >
                          {reward.reportTitle}
                        </h3>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-[15px] font-bold text-emerald-300">
                            ${reward.amount.toLocaleString()}
                          </p>
                          {reward.bonus && (
                            <p className="text-[12px] text-yellow-400 flex items-center justify-end gap-0.5 -mt-0.5">
                              <Star size={8} fill="currentColor" /> +$
                              {reward.bonus}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-2 ">
                        <span className="text-xs text-slate-400">
                          {reward.hacker}
                        </span>
                        <span className="text-slate-600 text-xs">•</span>
                        <span className="text-xs text-slate-400">
                          {reward.program}
                        </span>

                        <div className="flex items-center gap-1 ml-auto">
                          {/* Severity tag */}
                          <span
                            className={`inline-flex items-center text-[12px] px-1.5 py-0.5 rounded ${
                              reward.severity === "Critical"
                                ? "bg-red-900/60 text-red-300 border border-red-700/50"
                                : reward.severity === "High"
                                ? "bg-orange-900/60 text-orange-300 border border-orange-700/50"
                                : reward.severity === "Medium"
                                ? "bg-yellow-900/60 text-yellow-300 border border-yellow-700/50"
                                : "bg-blue-900/60 text-blue-300 border border-blue-700/50"
                            }`}
                          >
                            {reward.severity}
                          </span>

                          {/* Status tag */}
                          <span
                            className={`inline-flex items-center text-[12px] px-1.5 py-0.5 rounded ${
                              reward.status === "Paid"
                                ? "bg-green-900/60 text-green-300 border border-green-700/50"
                                : reward.status === "Pending"
                                ? "bg-amber-900/60 text-amber-300 border border-amber-700/50"
                                : reward.status === "Processing"
                                ? "bg-blue-900/60 text-blue-300 border border-blue-700/50"
                                : "bg-red-900/60 text-red-300 border border-red-700/50"
                            }`}
                          >
                            {reward.status}
                          </span>

                          {/* Date */}
                          <span className="text-[12px] text-slate-500 ml-1">
                            {reward.payoutDate
                              ? new Date(reward.payoutDate).toLocaleDateString(
                                  "en-CA"
                                )
                              : "Pending"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 px-4 bg-slate-800/40 rounded-lg border border-dashed border-slate-700/60 shadow-inner">
              <Trophy
                size={32}
                strokeWidth={1.5}
                className="mx-auto text-slate-600/90 mb-3 opacity-80"
              />
              <h3 className="text-base font-semibold text-white mb-1">
                No Matching Rewards
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                Adjust your search criteria or filters.
              </p>
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 bg-purple-700/60 text-purple-200 rounded-md hover:bg-purple-600/70 border border-purple-600/50 transition-all text-xs shadow-md flex items-center gap-1.5 mx-auto"
              >
                <X size={12} /> Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Elegant components

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

const StatCard = ({ label, value, icon: Icon, color }: StatCardProps) => (
  <div
    className={`bg-slate-700/40 p-3 rounded-lg border border-slate-600/70 shadow-inner`}
  >
    <p
      className={`text-xs text-${color}-400 uppercase tracking-wide font-medium flex items-center gap-1.5 mb-1`}
    >
      <Icon size={14} strokeWidth={2} /> {label}
    </p>
    <p className="text-base sm:text-lg font-bold text-white leading-tight">
      {value}
    </p>
  </div>
);

const ElegantFilterDropdown: React.FC<{
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}> = ({ label, options, value, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const themeColor = "purple";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 bg-slate-700/60 border border-slate-600/80 rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:border-${themeColor}-600/60 hover:bg-slate-700/80 focus:outline-none focus:ring-1 focus:ring-${themeColor}-500/60 transition-all shadow-sm`}
      >
        {icon && <span className={`text-${themeColor}-400`}>{icon}</span>}
        <span className="text-slate-300 hidden sm:inline">{label}:</span>
        <span className="text-white">{value}</span>
        <ChevronDown
          size={14}
          className={`ml-1 text-slate-400 transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 sm:left-auto right-0 z-20 mt-1 min-w-[180px] max-h-60 overflow-auto bg-slate-800/95 backdrop-blur-xl border border-slate-600/90 rounded-lg shadow-2xl py-1 text-sm scrollbar-thin scrollbar-thumb-slate-600/80 animate-fadeIn">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-3 py-2 hover:bg-${themeColor}-700/50 cursor-pointer flex items-center justify-between text-slate-300 transition-colors duration-100 ${
                value === option
                  ? `bg-${themeColor}-800/70 !text-${themeColor}-100 font-semibold`
                  : "hover:text-white"
              }`}
            >
              <span>{option}</span>
              {value === option && (
                <CheckCircle size={14} className={`text-${themeColor}-300`} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};