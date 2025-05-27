"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  Trophy,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  Shield,
  Search,
  ChevronDown,
  X,
  Gift,
  ExternalLink,
} from "lucide-react";

// --- Enhanced Mock Rewards Data ---
const mockRewards: Reward[] = [
  {
    id: "PAYOUT-001",
    reportId: "RPT-1230",
    program: "ACME Corp",
    programId: "prog-acme",
    amount: 800,
    status: "Paid",
    payoutDate: "2023-10-28T09:00:00Z",
    reportTitle: "IDOR on Order Details",
    bonus: 50,
  },
  {
    id: "PAYOUT-002",
    reportId: "RPT-1199",
    program: "DataCorp AI",
    programId: "prog-ai",
    amount: 250,
    status: "Paid",
    payoutDate: "2023-10-21T12:00:00Z",
    reportTitle: "SQL Injection via Search",
  },
  {
    id: "PAYOUT-003",
    reportId: "RPT-1245",
    program: "CloudSecure",
    programId: "prog-cloudsec-k8s",
    amount: 2500,
    status: "Paid",
    payoutDate: "2023-10-29T10:00:00Z",
    reportTitle: "Auth Bypass via JWT",
    bonus: 200,
    featuredReport: true,
  },
  {
    id: "PAYOUT-004",
    reportId: "RPT-1190",
    program: "DevOps Central",
    programId: "prog-devops",
    amount: 1200,
    status: "Paid",
    payoutDate: "2023-10-18T16:40:00Z",
    reportTitle: "SSRF in Import Feature",
  },
  {
    id: "PAYOUT-005",
    reportId: "RPT-1240",
    program: "SecureApp",
    programId: "prog-secureapp",
    amount: 250,
    status: "Pending",
    payoutDate: null,
    reportTitle: "Rate Limiting Bypass",
  },
  {
    id: "PAYOUT-006",
    reportId: "RPT-1099",
    program: "FinTech Innovations",
    programId: "prog-fintech",
    amount: 150,
    status: "Paid",
    payoutDate: "2023-09-05T11:00:00Z",
    reportTitle: "Minor UI Glitch - Info",
  },
  {
    id: "PAYOUT-007",
    reportId: "RPT-1050",
    program: "GamerConnect",
    programId: "prog-gamer",
    amount: 500,
    status: "Paid",
    payoutDate: "2023-08-15T09:00:00Z",
    reportTitle: "Account Takeover Chain",
    bonus: 100,
    featuredReport: true,
  },
];

type PayoutStatus = "Paid" | "Pending" | "Processing" | "Failed";

interface Reward {
  id: string;
  reportId: string;
  program: string;
  programId: string;
  amount: number;
  status: PayoutStatus;
  payoutDate: string | null;
  reportTitle: string;
  bonus?: number;
  featuredReport?: boolean;
}
// --- End Mock Data ---

// --- Calculate Stats ---
const totalEarned = mockRewards
  .filter((r) => r.status === "Paid")
  .reduce((sum, r) => sum + r.amount + (r.bonus || 0), 0);
const pendingPayouts = mockRewards.filter((r) => r.status === "Pending").length;
const totalBonus = mockRewards
  .filter((r) => r.status === "Paid")
  .reduce((sum, r) => sum + (r.bonus || 0), 0);
const uniqueProgramsPaid = new Set(
  mockRewards.filter((r) => r.status === "Paid").map((r) => r.program)
).size;

// -------- Main Rewards Page Component --------
export default function RewardsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    status: PayoutStatus | null;
    program: string | null;
    dateRange: string | null; // e.g., 'last-30-days', 'last-90-days', null for 'all-time'
  }>({ status: null, program: null, dateRange: null });

  // Simple filtering logic (add date range logic if implementing)
  const filteredRewards = mockRewards.filter((reward) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      reward.program.toLowerCase().includes(searchLower) ||
      reward.reportId.toLowerCase().includes(searchLower) ||
      reward.reportTitle.toLowerCase().includes(searchLower);
    const matchesStatus =
      !activeFilters.status || reward.status === activeFilters.status;
    const matchesProgram =
      !activeFilters.program || reward.program === activeFilters.program;
    // const matchesDateRange = ... logic ...;
    return (
      matchesSearch && matchesStatus && matchesProgram /* && matchesDateRange */
    );
  });

  // Unique Programs for filter
  const uniquePrograms = [...new Set(mockRewards.map((r) => r.program))];

  // Filter change handler
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
    setActiveFilters({ status: null, program: null, dateRange: null });
  };

  const themeAccentText = `text-purple-400`;

  return (
    <div className="space-y-8 text-slate-200 max-w-7xl mx-auto">
      {/* Page Header with Stats */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-tr from-slate-900 via-slate-800/50 to-slate-900 border border-purple-800/30 p-6 shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(147,51,234,0.15)_0%,transparent_60%)] opacity-70 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-600/20 to-purple-800/30 rounded-xl border border-purple-500/30 shadow-inner">
              <Trophy
                size={28}
                className={themeAccentText + " drop-shadow-lg"}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-100 tracking-tight leading-tight">
                Bounty Rewards Ledger
              </h1>
              <p className="text-slate-400 mt-1 text-sm">
                Overview of your earned bounties and payout status.
              </p>
            </div>
          </div>
          {/* Header Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm shrink-0 w-full md:w-auto pt-4 md:pt-0 border-t border-slate-700/50 md:border-none">
            <div className="text-left sm:text-right">
              <p className="text-slate-400 text-xs uppercase tracking-wider">
                Total Earned
              </p>
              <p className="text-2xl font-semibold text-emerald-300 mt-1">
                ${totalEarned.toLocaleString()}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-slate-400 text-xs uppercase tracking-wider">
                Pending
              </p>
              <p className="text-2xl font-semibold text-amber-400 mt-1">
                {pendingPayouts}
              </p>
            </div>
            <div className="text-left sm:text-right col-span-2 sm:col-span-1 mt-2 sm:mt-0">
              <p className="text-slate-400 text-xs uppercase tracking-wider">
                Bonus/Programs
              </p>
              <p className="text-base font-medium text-white mt-1">
                ${totalBonus.toLocaleString()} Bonus / {uniqueProgramsPaid}{" "}
                Programs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex flex-wrap gap-4 items-center backdrop-blur-sm shadow-lg">
        <div className="relative flex-grow w-full md:w-auto min-w-[250px]">
          <input
            type="text"
            placeholder="Search by Report ID, Title, Program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-700/80 border border-slate-600/70 rounded-lg py-2.5 pl-11 pr-4 text-slate-100 placeholder-slate-400/80 focus:outline-none focus:ring-2 focus:ring-purple-500/80 focus:border-transparent text-sm shadow-inner focus:bg-slate-700"
          />
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none peer-focus:text-purple-400 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center shrink-0">
          <RewardFilterDropdown
            label="Status"
            options={["All", "Paid", "Pending", "Processing"]}
            value={activeFilters.status || "All"}
            onChange={(v) => handleFilterChange("status", v as PayoutStatus)}
            icon={<Activity size={14} />}
          />
          <RewardFilterDropdown
            label="Program"
            options={["All", ...uniquePrograms]}
            value={activeFilters.program || "All"}
            onChange={(v) => handleFilterChange("program", v)}
            icon={<Shield size={14} />}
          />
          <RewardFilterDropdown
            label="Date Range"
            options={["All Time", "Last 30 Days", "Last 90 Days"]}
            value={activeFilters.dateRange || "All Time"}
            onChange={(v) => handleFilterChange("dateRange", v)}
            icon={<Calendar size={14} />}
          />
          {(activeFilters.status ||
            activeFilters.program ||
            activeFilters.dateRange ||
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

      {/* Rewards List */}
      <div>
        <p className="text-slate-400 text-sm mb-5">
          Displaying{" "}
          <span className="font-semibold text-purple-300">
            {filteredRewards.length}
          </span>{" "}
          payout records.
        </p>
        {filteredRewards.length > 0 ? (
          <div className="space-y-4">
            {filteredRewards.map((reward) => (
              <RewardItem key={reward.id} reward={reward} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gradient-to-b from-slate-800/50 to-slate-900/60 rounded-lg border border-slate-700/50 backdrop-blur-sm shadow-inner">
            <DollarSign
              size={56}
              strokeWidth={1}
              className="mx-auto text-slate-600 mb-4 opacity-50"
            />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              No Reward Records Found
            </h3>
            <p className="text-slate-400 max-w-lg mx-auto">
              No payout records match the current filters or search query.
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 px-5 py-2 bg-purple-600/30 text-purple-300 rounded-md hover:bg-purple-600/50 border border-purple-700/50 hover:border-purple-600/80 transition-all text-sm shadow-md"
            >
              Clear Parameters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// -------- Reward Item Component --------
const RewardItem: React.FC<{ reward: Reward }> = ({ reward }) => {
  const getStatusChip = (status: PayoutStatus): React.ReactNode => {
    let colorClasses = "bg-gray-700 text-gray-300 border-gray-600"; // Default (e.g., Processing)
    let Icon = Clock;
    if (status === "Paid") {
      colorClasses = "bg-green-900/60 text-green-300 border-green-700/70";
      Icon = CheckCircle;
    }
    if (status === "Pending") {
      colorClasses = "bg-amber-900/60 text-amber-300 border-amber-700/70";
      Icon = Clock;
    }
    if (status === "Failed") {
      colorClasses = "bg-red-900/60 text-red-300 border-red-700/70";
      Icon = AlertTriangle;
    }

    return (
      <span
        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${colorClasses}`}
      >
        <Icon size={12} /> {status}
      </span>
    );
  };

  return (
    <div
      className={`
        bg-slate-800/70 border border-slate-700/50 rounded-lg shadow-md p-4
        flex flex-col sm:flex-row sm:items-center sm:gap-4
        transition-all duration-200 hover:border-purple-600/40 hover:bg-slate-800/90
        relative overflow-hidden group isolate
      `}
    >
      {/* Decorative glow on hover */}
      <div className="absolute -inset-px bg-gradient-to-br from-transparent via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg -z-10"></div>

      {/* Column 1: Reward Amount & Bonus */}
      <div className="flex items-center gap-3 mb-3 sm:mb-0 sm:border-r sm:border-slate-700/50 sm:pr-4 flex-shrink-0">
        <div
          className={`p-2 rounded-lg bg-gradient-to-br from-purple-800/30 to-purple-950/40 border border-purple-700/30 ${
            reward.status === "Paid" ? "opacity-100" : "opacity-60"
          }`}
        >
          <Gift size={24} className="text-purple-400" />
        </div>
        <div className="text-left">
          <p className="text-xl font-bold text-purple-300">
            ${reward.amount.toLocaleString()}
          </p>
          {reward.bonus && (
            <p className="text-xs text-yellow-400 font-medium">
              + ${reward.bonus} Bonus
            </p>
          )}
        </div>
      </div>

      {/* Column 2: Report & Program Info */}
      <div className="flex-grow space-y-1 text-sm mb-3 sm:mb-0">
        <p
          className="font-medium text-slate-100 group-hover:text-white transition-colors line-clamp-1"
          title={reward.reportTitle}
        >
          Report: {reward.reportTitle}
        </p>
        <p className="text-xs text-slate-400">
          Program:{" "}
          <span className="font-medium text-slate-300">{reward.program}</span>
        </p>
        <p className="text-xs font-mono text-slate-500">
          Report ID: <span className="text-purple-500">{reward.reportId}</span>{" "}
          | Payout ID: <span className="text-slate-400">{reward.id}</span>
        </p>
      </div>

      {/* Column 3: Status & Date */}
      <div className="flex-shrink-0 flex flex-col sm:items-end gap-1 text-xs text-slate-400">
        {getStatusChip(reward.status)}
        {reward.payoutDate ? (
          <span className="flex items-center gap-1">
            <Calendar size={12} />{" "}
            {new Date(reward.payoutDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        ) : (
          <span>Awaiting Payout</span>
        )}
      </div>

      {/* Column 4: Action Button (Placeholder) */}
      <div className="flex-shrink-0 sm:ml-4 mt-3 sm:mt-0">
        {/* Could link to report or transaction detail */}
        <Link
          href={`/dashboard/hacker/reports/${reward.reportId}`}
          className="flex items-center gap-1 px-3 py-1 bg-slate-700/50 border border-slate-600/70 rounded text-xs text-slate-300 hover:bg-slate-700 hover:border-slate-500 hover:text-purple-400 transition-all"
        >
          View Report <ExternalLink size={12} />
        </Link>
      </div>

      {/* Featured Indicator corner */}
      {reward.featuredReport && (
        <div className="absolute top-0 left-0 w-0 h-0 border-r-[24px] border-r-transparent border-t-[24px] border-t-amber-500/50 group-hover:border-t-amber-500/70 transition-colors"></div>
      )}
    </div>
  );
};

// -------- Simple Filter Dropdown Component V2 (Refined for consistency) --------
const RewardFilterDropdown: React.FC<{
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
        className="flex items-center gap-2 bg-slate-700/60 border border-slate-600/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 hover:border-purple-600/60 hover:bg-slate-700/80 focus:outline-none focus:ring-1 focus:ring-purple-500/80 transition-all shadow-sm"
      >
        {icon && <span className="text-purple-400 opacity-80">{icon}</span>}
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
        <div className="absolute z-20 mt-1.5 max-h-60 w-48 overflow-auto bg-slate-800/95 backdrop-blur-md border border-slate-700/70 rounded-lg shadow-xl py-1 text-xs scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800/50 animate-fadeIn">
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-3.5 py-2 hover:bg-purple-700/20 cursor-pointer flex items-center justify-between text-slate-300 ${
                value === option
                  ? "bg-purple-800/50 text-purple-300 font-medium"
                  : "hover:text-white"
              }`}
            >
              <span>{option}</span>
              {value === option && (
                <CheckCircle size={13} className="text-purple-400" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Add Fade-in Animation to Global CSS or Tailwind Config ---
/*
@keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
.animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
*/
