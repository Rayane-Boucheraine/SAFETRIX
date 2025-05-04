"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  UserPlus,
  Mail,
  CheckSquare,
  ShieldQuestion,
  ChevronDown,
  Search,
  X,
  ShieldCheck,
  MoreVertical,
  UserCircle,
  Activity,
  CheckCircle,
} from "lucide-react";

// --- Using the same Mock Team Data ---
const mockTeam: TeamMember[] = [
  {
    id: "user-001",
    name: "Alice Morgan",
    email: "alice.m@startup.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2023-10-29T10:00:00Z",
    avatar: null,
    reportsTriaged: 150,
    rewardsApproved: 85000,
    avgTimeToTriage: 12,
    /* hours */ currentLoad: 3 /* active reports */,
  },
  {
    id: "user-002",
    name: "Bob Chen",
    email: "bob.c@startup.com",
    role: "Analyst",
    status: "Active",
    lastLogin: "2023-10-28T14:30:00Z",
    avatar: null,
    reportsTriaged: 95,
    rewardsApproved: 35000,
    avgTimeToTriage: 20,
    currentLoad: 5,
  },
  {
    id: "user-003",
    name: "Charlie Davis",
    email: "charlie.d@startup.com",
    role: "Analyst",
    status: "Invited",
    lastLogin: null,
    avatar: null,
    reportsTriaged: 0,
    rewardsApproved: 0,
    avgTimeToTriage: null,
    currentLoad: 0,
  },
  {
    id: "user-004",
    name: "Diana Evans",
    email: "diana.e@startup.com",
    role: "Read-Only",
    status: "Active",
    lastLogin: "2023-10-27T09:15:00Z",
    avatar: null,
    reportsTriaged: 0,
    rewardsApproved: 0,
    avgTimeToTriage: null,
    currentLoad: 0,
  },
  {
    id: "user-005",
    name: "Ethan Garcia",
    email: "ethan.g@startup.com",
    role: "Admin",
    status: "Suspended",
    lastLogin: "2023-10-15T11:00:00Z",
    avatar: null,
    reportsTriaged: 120,
    rewardsApproved: 60000,
    avgTimeToTriage: 18,
    currentLoad: 0,
  },
];
type TeamMemberRole = "Admin" | "Analyst" | "Read-Only";
type TeamMemberStatus = "Active" | "Invited" | "Suspended";
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamMemberRole;
  status: TeamMemberStatus;
  lastLogin: string | null;
  avatar: string | null;
  reportsTriaged: number;
  rewardsApproved: number;
  avgTimeToTriage: number | null;
  currentLoad: number;
}
// --- End Mock Data ---

// --- Styling and Formatting Helpers ---
const getStatusStyles = (
  status: TeamMemberStatus
): {
  icon: React.ElementType;
  textColor: string;
  bgColor: string;
  borderColor: string;
} => {
  switch (status) {
    case "Active":
      return {
        icon: CheckSquare,
        textColor: "text-green-300",
        bgColor: "bg-green-900/60",
        borderColor: "border-green-700/70",
      };
    case "Invited":
      return {
        icon: Mail,
        textColor: "text-blue-300",
        bgColor: "bg-blue-900/60",
        borderColor: "border-blue-700/70",
      };
    case "Suspended":
      return {
        icon: X,
        textColor: "text-red-300",
        bgColor: "bg-red-900/60",
        borderColor: "border-red-700/70",
      };
    default:
      return {
        icon: ShieldQuestion,
        textColor: "text-gray-300",
        bgColor: "bg-gray-800/60",
        borderColor: "border-gray-700/70",
      };
  }
};
const getRolePillStyles = (role: TeamMemberRole): string => {
  switch (role) {
    case "Admin":
      return "bg-purple-500/20 text-purple-300 border-purple-600/50";
    case "Analyst":
      return "bg-blue-500/20 text-blue-300 border-blue-600/50";
    case "Read-Only":
      return "bg-slate-600/30 text-slate-300 border-slate-500/50";
    default:
      return "bg-slate-700 text-slate-300 border-slate-600";
  }
};
const formatTimeAgoTeam = (dateString: string | null): string => {
  if (!dateString) return "N/A";
  const d = new Date(dateString);
  const n = new Date();
  const diffS = Math.round((n.getTime() - d.getTime()) / 1000);
  const diffM = Math.round(diffS / 60);
  const diffH = Math.round(diffM / 60);
  const diffD = Math.round(diffH / 24);
  if (diffS < 60) return `${diffS}s ago`;
  if (diffM < 60) return `${diffM}m ago`;
  if (diffH < 24) return `${diffH}h ago`;
  return `${diffD}d ago`;
};

// -------- Main Team Page Component --------
export default function CreativeTeamPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    role: TeamMemberRole | null;
    status: TeamMemberStatus | null;
  }>({ role: null, status: null });

  const filteredTeam = mockTeam.filter((member) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      member.name.toLowerCase().includes(searchLower) ||
      member.email.toLowerCase().includes(searchLower);
    const matchesRole =
      !activeFilters.role || member.role === activeFilters.role;
    const matchesStatus =
      !activeFilters.status || member.status === activeFilters.status;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const uniqueRoles: TeamMemberRole[] = ["Admin", "Analyst", "Read-Only"];
  const uniqueStatuses: TeamMemberStatus[] = ["Active", "Invited", "Suspended"];

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
    setActiveFilters({ role: null, status: null });
  };

  const themeAccentText = `text-purple-400`; 
  const layoutGradient =
    "bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#2A0D45_6.63%,#080808_100%)]";

  return (
      <div className={`min-h-full p-6 md:p-8 text-slate-200 ${layoutGradient}`}>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-purple-900/40 pb-6 relative">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-purple-800/40 shadow-lg backdrop-blur-sm">
                <Users size={28} className={themeAccentText} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-100 tracking-tight">
                  Team Command Roster
                </h1>
                <p className="text-slate-400 mt-1 text-sm">
                  Assign roles, monitor activity, and manage platform operators.
                </p>
              </div>
            </div>
            <button className="z-10 inline-flex items-center group gap-2 px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-700/60 text-purple-200 text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-purple-500/15">
              <UserPlus size={16} /> Invite New Operator
            </button>
          </div>

          {/* Filter and Search */}
          <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700/50 rounded-xl p-4 flex flex-wrap gap-4 items-center shadow-lg">
            <div className="relative flex-grow w-full md:w-auto min-w-[250px]">
              <input
                type="text"
                placeholder="Search Operators (Name, Email)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-100 placeholder-slate-400/80 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm shadow-inner"
              />
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
            <div className="flex flex-wrap gap-2 items-center shrink-0">
              <TeamFilterDropdownV2
                label="Role"
                options={["All", ...uniqueRoles]}
                value={activeFilters.role || "All"}
                onChange={(v) => handleFilterChange("role", v)}
                icon={<ShieldCheck size={14} />}
              />
              <TeamFilterDropdownV2
                label="Status"
                options={["All", ...uniqueStatuses]}
                value={activeFilters.status || "All"}
                onChange={(v) => handleFilterChange("status", v)}
                icon={<Activity size={14} />}
              />
              {(activeFilters.role || activeFilters.status || searchTerm) && (
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

          {/* Team Member Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeam.length > 0 ? (
              filteredTeam.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))
            ) : (
              <div className="md:col-span-2 lg:col-span-3 text-center py-16 bg-gradient-to-b from-slate-800/40 to-slate-900/50 rounded-lg border border-slate-700/40 backdrop-blur-sm shadow-inner">
                <Users
                  size={56}
                  strokeWidth={1}
                  className="mx-auto text-slate-600 mb-4 opacity-50"
                />
                <h3 className="text-xl font-semibold text-slate-300 mb-2">
                  No Matching Operators
                </h3>
                <p className="text-slate-400 max-w-lg mx-auto">
                  Your search and filter combination yielded no results in the
                  operator roster.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 px-5 py-2 bg-purple-600/30 text-purple-300 rounded-md hover:bg-purple-600/50 border border-purple-700/50 hover:border-purple-600/80 transition-all text-sm shadow-md"
                >
                  Reset Search Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}

// ===== Redesigned Team Member Card Component =====
const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const statusStyles = getStatusStyles(member.status);
  const rolePillStyle = getRolePillStyles(member.role);

  // Example bar width calculations (normalize to 100)
  const triagePercentage = Math.min(
    100,
    Math.max(0, (member.reportsTriaged / 200) * 100)
  ); // Assume 200 is a high benchmark
  const rewardPercentage = Math.min(
    100,
    Math.max(0, (member.rewardsApproved / 100000) * 100)
  ); // Assume $100k is high

  return (
    <div className="bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-black/60 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-lg p-5 relative isolate overflow-hidden transition-all duration-300 hover:border-purple-600/50 hover:shadow-purple-500/10 group">
      {/* Decorative background elements */}
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-gradient-radial from-purple-900/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>

      {/* Actions Menu Button */}
      <div className="absolute top-3 right-3 z-20">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1.5 rounded-full text-slate-500 hover:bg-slate-700/50 hover:text-purple-300 transition-colors"
        >
          <MoreVertical size={16} />
        </button>
        {/* Actions Dropdown */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-1 w-36 bg-slate-800/95 backdrop-blur-md border border-slate-700 rounded-md shadow-xl py-1 text-xs z-30 animate-fadeIn">
            <Link
              href="#"
              className="block px-3 py-1.5 hover:bg-slate-700/70 text-slate-300 hover:text-white"
            >
              View Profile
            </Link>
            <Link
              href="#"
              className="block px-3 py-1.5 hover:bg-slate-700/70 text-slate-300 hover:text-blue-300"
            >
              Edit Role
            </Link>
            <Link
              href="#"
              className="block px-3 py-1.5 hover:bg-slate-700/70 text-slate-300 hover:text-orange-400"
            >
              {member.status === "Active" ? "Suspend User" : "Re-enable"}
            </Link>
            <Link
              href="#"
              className="block px-3 py-1.5 hover:bg-red-900/50 text-red-400 hover:text-red-300 border-t border-slate-700 mt-1 pt-1"
            >
              Remove User
            </Link>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 mb-4 relative z-10">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md">
          {member.avatar ? (
            <Image
              src={member.avatar}
              alt={member.name}
              width={48}
              height={48}
              className="object-cover"
            />
          ) : (
            <UserCircle size={24} className="text-slate-400" />
          )}
        </div>
        {/* Info */}
        <div>
          <h3 className="font-semibold text-slate-100 truncate group-hover:text-purple-300 transition-colors">
            {member.name}
          </h3>
          <p className="text-xs text-slate-400 truncate">{member.email}</p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`px-2 py-0.5 text-[10px] font-medium rounded border ${rolePillStyle}`}
            >
              {member.role}
            </span>
            {React.createElement(statusStyles.icon, {
              size: 12,
              className: statusStyles.textColor,
            })}{" "}
            <span className={`text-[11px] ${statusStyles.textColor}`}>
              {member.status}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="space-y-3 text-xs relative z-10 border-t border-slate-700/50 pt-4 mt-auto">
        <div className="flex justify-between items-center text-slate-400">
          <span>Reports Triaged:</span>
          <span className="font-medium text-slate-200">
            {member.reportsTriaged}
          </span>
        </div>
        <div className="w-full bg-slate-700/50 h-1 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-full rounded-full"
            style={{ width: `${triagePercentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center text-slate-400">
          <span>Rewards Approved:</span>
          <span className="font-medium text-emerald-300">
            ${member.rewardsApproved.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-slate-700/50 h-1 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full"
            style={{ width: `${rewardPercentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center text-slate-400">
          <span>Current Load:</span>
          <span className="font-medium text-slate-200">
            {member.currentLoad} reports
          </span>
        </div>
        <div className="flex justify-between items-center text-slate-400 pt-2 border-t border-slate-800/50">
          <span>Last Login:</span>
          <span>{formatTimeAgoTeam(member.lastLogin)}</span>
        </div>
      </div>
    </div>
  );
};

// -------- Refined Filter Dropdown Component --------
const TeamFilterDropdownV2: React.FC<{
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
        className="flex items-center gap-2 bg-gradient-to-r from-slate-700/70 to-slate-800/80 border border-slate-600/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 hover:border-purple-600/60 focus:outline-none focus:ring-1 focus:ring-purple-500/80 transition-all shadow-sm hover:shadow-md"
      >
        <span className="text-purple-400 opacity-80">{icon}</span>
        <span className="hidden sm:inline">{label}:</span>
        <span className="font-medium text-white">{value}</span>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-1.5 max-h-60 w-40 overflow-auto bg-slate-800/95 backdrop-blur-md border border-slate-700/70 rounded-lg shadow-xl py-1 text-xs scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800/50 animate-fadeIn">
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-3.5 py-2 hover:bg-purple-700/30 cursor-pointer flex items-center justify-between text-slate-300 ${
                value === option
                  ? "bg-purple-800/60 text-purple-300 font-medium"
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

/* Remember Keyframes if needed */
