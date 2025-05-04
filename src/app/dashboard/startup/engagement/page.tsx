"use client";
import React, { useState } from "react";
import {
  GitCompareArrows,
  Users,
  Search,
  ChevronDown,
  X,
  Clock,
  ShieldCheck,
  UserPlus,
  MessageSquare,
  TrendingUp,
  Filter,
  Activity,
} from "lucide-react";

// Mock Hacker Data
const mockHackers = [
  {
    id: "hckr-001",
    username: "CodeWizard",
    rank: 5,
    reputation: 12500,
    totalRewards: 25800,
    reports: 35,
    acceptance: 88,
    lastActive: "2023-10-29T11:00:00Z",
    programs: ["FinTech", "CloudSecure"],
    specialized: ["Web App", "API", "Cloud"],
  },
  {
    id: "hckr-002",
    username: "ByteGhost",
    rank: 12,
    reputation: 9800,
    totalRewards: 15200,
    reports: 28,
    acceptance: 75,
    lastActive: "2023-10-28T18:00:00Z",
    programs: ["ACME", "GamerConnect"],
    specialized: ["Mobile", "Reverse Eng", "Network"],
  },
  {
    id: "hckr-003",
    username: "ZeroDayHero",
    rank: 3,
    reputation: 18500,
    totalRewards: 35000,
    reports: 42,
    acceptance: 91,
    lastActive: "2023-10-27T09:30:00Z",
    programs: ["DataCorp AI", "DevOps", "CloudSecure"],
    specialized: ["AI/ML", "Cloud Security", "Critical Infra"],
  },
  {
    id: "hckr-004",
    username: "NetSpectre",
    rank: 25,
    reputation: 6500,
    totalRewards: 8800,
    reports: 18,
    acceptance: 70,
    lastActive: "2023-10-29T14:00:00Z",
    programs: ["SecureApp", "HomeSys"],
    specialized: ["Network", "IoT", "Firmware"],
  },
  {
    id: "hckr-005",
    username: "PixelPwnr",
    rank: 18,
    reputation: 7200,
    totalRewards: 9500,
    reports: 22,
    acceptance: 82,
    lastActive: "2023-10-26T16:00:00Z",
    programs: ["GamerConnect"],
    specialized: ["Game Hacking", "Client-Side", "Websocket"],
  },
];

export default function EngagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    rank: string | null;
    specialization: string | null;
  }>({ rank: null, specialization: null });

  const uniqueSpecializations = [
    ...new Set(mockHackers.flatMap((h) => h.specialized)),
  ];

  const filteredHackers = mockHackers.filter((hacker) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      hacker.username.toLowerCase().includes(s) ||
      hacker.specialized.some((sp) => sp.toLowerCase().includes(s));
    const matchesRank =
      !activeFilters.rank ||
      (activeFilters.rank === "Top 10" && hacker.rank <= 10) ||
      (activeFilters.rank === "Top 50" && hacker.rank <= 50) ||
      activeFilters.rank === "All";
    const matchesSpecialization =
      !activeFilters.specialization ||
      activeFilters.specialization === "All" ||
      hacker.specialized.includes(activeFilters.specialization);
    return matchesSearch && matchesRank && matchesSpecialization;
  });

  const handleFilterChange = (
    filterType: "rank" | "specialization",
    value: string
  ) => {
    setActiveFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveFilters({ rank: null, specialization: null });
  };

  // Keep original radial gradient background
  const layoutGradient =
    "bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#2A0D45_6.63%,#080808_100%)]";
  const themeAccentText = "text-purple-400";

  return (
    <div className={`min-h-full p-6 md:p-8 text-slate-200 ${layoutGradient}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header - Redesigned with glass card effect */}
        <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 border border-purple-800/30 shadow-xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-900/20 rounded-full blur-2xl"></div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-900/70 to-slate-900 rounded-xl border border-purple-500/30 shadow-lg">
                <GitCompareArrows
                  size={28}
                  className={`${themeAccentText} drop-shadow-md`}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  Hacker Engagement Hub
                </h1>
                <p className="text-slate-400 mt-1">
                  Connect with, manage, and analyze researcher activity.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-700/80 text-slate-200 font-medium rounded-xl hover:bg-slate-800/70 transition-all duration-200 shadow-md">
                <MessageSquare size={18} /> Communicate
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-700/80 to-purple-900/80 border border-purple-500/50 text-white font-medium rounded-xl hover:from-purple-600/80 hover:to-purple-800/80 transition-all duration-200 shadow-lg">
                <UserPlus size={18} /> Invite to Private
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview - Redesigned with side icons and better spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard
            title="Active Researchers"
            value={mockHackers.length}
            icon={Users}
            trend="+5 this month"
          />
          <StatCard
            title="Avg. Reputation"
            value="~11,500"
            icon={Activity}
            trend="Stable"
          />
          <StatCard
            title="Top 10 Ranked"
            value={mockHackers.filter((h) => h.rank <= 10).length}
            icon={TrendingUp}
            trend="Increasing"
          />
        </div>

        {/* Filters - Redesigned with cleaner look */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-5 shadow-lg border border-slate-700/40">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-grow min-w-[250px]">
              <input
                type="text"
                placeholder="Search hackers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/80 border-2 border-slate-700/80 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-500/70 text-sm shadow-inner"
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={18}
              />
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <FilterDropdown
                label="Rank Tier"
                options={["All", "Top 10", "Top 50", "Top 100"]}
                value={activeFilters.rank || "All"}
                onChange={(v) => handleFilterChange("rank", v)}
                icon={<Clock size={16} />}
              />
              <FilterDropdown
                label="Specialty"
                options={["All", ...uniqueSpecializations]}
                value={activeFilters.specialization || "All"}
                onChange={(v) => handleFilterChange("specialization", v)}
                icon={<ShieldCheck size={16} />}
              />
              {(activeFilters.rank ||
                activeFilters.specialization ||
                searchTerm) && (
                <button
                  onClick={clearFilters}
                  title="Clear Filters"
                  className="p-2.5 rounded-lg bg-red-900/30 text-red-300 hover:bg-red-800/50 border border-red-700/40 transition-all duration-150 flex items-center gap-2"
                >
                  <X size={16} /> <span className="text-sm">Clear</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Hacker List - Completely redesigned with cards */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-slate-300">
              Displaying{" "}
              <span className="font-semibold text-purple-300">
                {filteredHackers.length}
              </span>{" "}
              researchers matching criteria
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Filter size={16} />
              <span>
                Active filters:{" "}
                {Object.values(activeFilters).filter(Boolean).length || "None"}
              </span>
            </div>
          </div>

          {filteredHackers.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredHackers.map((hacker) => (
                <HackerCard key={hacker.id} hacker={hacker} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gradient-to-b from-slate-800/40 to-slate-900/60 rounded-xl border border-slate-700/50 backdrop-blur-sm shadow-lg">
              <Users
                size={64}
                className="mx-auto text-slate-600 mb-4 opacity-50"
              />
              <h3 className="text-2xl font-semibold text-slate-300 mb-2">
                No Researchers Found
              </h3>
              <p className="text-slate-400 max-w-lg mx-auto">
                Adjust your search or filters to find hackers in the database.
              </p>
              <button
                onClick={clearFilters}
                className="mt-6 px-6 py-2.5 bg-purple-700/40 text-purple-200 rounded-xl hover:bg-purple-600/50 border border-purple-600/50 transition-all text-sm shadow-lg"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== COMPONENTS =====

// Stat Card Component - Redesigned
const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
}: {
  title: string;
  value: number | string;
  icon: React.ElementType;
  trend: string;
}) => {
  const isPositive = trend.includes("+") || trend.includes("Increasing");
  const isStable = trend === "Stable";
  const trendColor = isPositive
    ? "text-green-400"
    : isStable
    ? "text-blue-400"
    : "text-red-400";

  return (
    <div className="bg-slate-900/70 backdrop-blur-md rounded-xl overflow-hidden border border-slate-700/40 shadow-lg group hover:shadow-xl transition-all duration-300 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/80 to-purple-900/50"></div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-slate-300">{title}</p>
          <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
            <Icon size={18} className="text-purple-400" />
          </div>
        </div>
        <p className="text-3xl font-bold text-white mt-2 group-hover:scale-105 origin-left transition-transform">
          {value}
        </p>
        <div
          className={`text-sm mt-3 flex items-center gap-1.5 ${trendColor} font-medium`}
        >
          {isPositive ? (
            <TrendingUp size={16} />
          ) : isStable ? (
            <Activity size={16} />
          ) : (
            <TrendingUp size={16} className="rotate-180" />
          )}
          {trend}
        </div>
      </div>
    </div>
  );
};

// New Hacker Card Component - Complete redesign
const HackerCard = ({ hacker }: { hacker: (typeof mockHackers)[0] }) => {
  const rankColor =
    hacker.rank <= 10
      ? "text-purple-400 font-semibold"
      : hacker.rank <= 50
      ? "text-blue-400"
      : "text-slate-400";
  const acceptanceColor =
    hacker.acceptance >= 80
      ? "text-green-400"
      : hacker.acceptance >= 65
      ? "text-yellow-400"
      : "text-orange-400";

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:border-purple-700/30 transition-all duration-300">
      <div className="p-4 flex flex-col sm:flex-row gap-4 relative">
        {/* Left section with avatar and basic info */}
        <div className="flex gap-4 items-center sm:w-1/3">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-slate-300 text-lg shadow-inner border border-slate-600/50">
            {hacker.username.substring(0, 1).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-white text-lg">{hacker.username}</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {hacker.specialized.slice(0, 2).map((specialty, i) => (
                <span
                  key={i}
                  className="inline-block text-xs rounded-md px-2 py-0.5 bg-slate-800/80 border border-slate-700/60 text-slate-300"
                >
                  {specialty}
                </span>
              ))}
              {hacker.specialized.length > 2 && (
                <span className="inline-block text-xs rounded-md px-1.5 py-0.5 bg-slate-800/80 border border-slate-700/60 text-slate-400">
                  +{hacker.specialized.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center section with stats */}
        <div className="flex flex-wrap justify-between sm:w-2/3 gap-2">
          <StatBadge
            label="Rank"
            value={`#${hacker.rank}`}
            color={rankColor}
            subValue={`${hacker.reputation.toLocaleString()} rep`}
          />

          <StatBadge
            label="Rewards"
            value={`$${hacker.totalRewards.toLocaleString()}`}
            color="text-emerald-300"
          />

          <StatBadge
            label="Acceptance"
            value={`${hacker.acceptance}%`}
            color={acceptanceColor}
          />

          <StatBadge
            label="Activity"
            value={formatTimeAgo(hacker.lastActive)}
            color="text-slate-300"
            icon={<Clock size={14} className="text-slate-400" />}
          />
        </div>

        {/* Hover gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );
};

// New Stat Badge Component
const StatBadge = ({
  label,
  value,
  subValue,
  color,
  icon,
}: {
  label: string;
  value: string;
  subValue?: string;
  color: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="bg-slate-800/70 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[100px] border border-slate-700/50">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <div className="flex items-center gap-1">
        {icon}
        <p className={`font-semibold ${color}`}>{value}</p>
      </div>
      {subValue && <p className="text-xs text-slate-500 mt-0.5">{subValue}</p>}
    </div>
  );
};

// Time Ago Formatter
const formatTimeAgo = (dateString: string): string => {
  if (!dateString) return "Never";
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

// Dropdown Filter Component - Redesigned
const FilterDropdown = ({
  label,
  options,
  value,
  onChange,
  icon,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-800/80 border-2 border-slate-700/60 rounded-lg px-4 py-2 text-sm text-slate-200 hover:border-purple-600/60 focus:outline-none transition-all duration-150 shadow-md"
      >
        {icon && <span className="text-purple-400">{icon}</span>}
        <span className="hidden sm:inline">{label}:</span>{" "}
        <span className="font-medium text-white">{value}</span>
        <ChevronDown
          size={16}
          className={`ml-1 text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 overflow-hidden bg-slate-800/95 border border-slate-700/70 rounded-lg shadow-2xl z-10">
          <div className="max-h-60 overflow-auto py-1">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`px-4 py-2.5 cursor-pointer text-sm ${
                  value === option
                    ? "bg-purple-800/60 text-purple-200 font-medium"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/80"
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
