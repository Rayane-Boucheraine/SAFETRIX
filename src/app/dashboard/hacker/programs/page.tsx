"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  CheckCircle,
  Shield,
  Award,
  Target,
  Code,
  ExternalLink,
  Users,
  Loader,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import programService from "@/services/programService";
import { Program, ProgramStatus } from "@/types/program";

// Helper functions
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
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      <span className="text-xs text-slate-400">{hours}h</span>
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
        className={`h-full ${color} transition-all duration-300`}
        style={{ width }}
      ></div>
    </div>
  );
};

// -------- Main Programs Page Component --------
export default function CreativeProgramsPageV2() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    type: "Public" | "Private" | null;
    vrt: string | null;
    target: string | null;
  }>({ type: null, vrt: null, target: null });

  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter] = useState<ProgramStatus | null>(
    ProgramStatus.ACTIVE
  );

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await programService.getAllPrograms(
          statusFilter || undefined
        );

        // Handle different response structures
        let programsData: Program[];
        if (Array.isArray(response)) {
          programsData = response;
        } else if (response?.data && Array.isArray(response.data)) {
          programsData = response.data;
        } else {
          console.error("Unexpected programs response structure:", response);
          programsData = [];
        }

        // Map backend data to frontend format for compatibility
        const mappedPrograms = programsData.map((program) => ({
          ...program,
          name: program.title,
          company: program.startup?.name || "Unknown Company",
          rewardRange: `$${program.minReward} - $${program.maxReward}`,
          type: "Public" as const,
          targets: [program.scope],
          tags: program.vulnerabilityTypes || [],
          vrt: program.vulnerabilityTypes?.[0] || "General",
          featured: false,
          avgReward: Math.floor((program.minReward + program.maxReward) / 2),
          avgResponseTime: Math.floor(Math.random() * 120) + 24, // Mock data
          reportsResolved: Math.floor(Math.random() * 50) + 10, // Mock data
          acceptanceRate: Math.floor(Math.random() * 40) + 60, // Mock data
        }));

        setPrograms(mappedPrograms);
      } catch (error) {
        console.error("Failed to fetch programs:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch programs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [statusFilter]);

  // Filter programs based on search and filter criteria
  const filteredPrograms = programs.filter((program) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      program.name?.toLowerCase().includes(searchLower) ||
      program.company?.toLowerCase().includes(searchLower) ||
      program.title?.toLowerCase().includes(searchLower) ||
      program.scope?.toLowerCase().includes(searchLower) ||
      program.tags?.some((tag) => tag.toLowerCase().includes(searchLower)) ||
      program.vrt?.toLowerCase().includes(searchLower);

    const matchesType =
      !activeFilters.type || program.type === activeFilters.type;
    const matchesVrt = !activeFilters.vrt || program.vrt === activeFilters.vrt;
    const matchesTarget =
      !activeFilters.target ||
      program.targets?.some((target) =>
        target.toLowerCase().includes(activeFilters.target!.toLowerCase())
      );

    return matchesSearch && matchesType && matchesVrt && matchesTarget;
  });

  // Get unique values for filters
  const uniqueTypes = ["Public", "Private"];
  const uniqueVRTs = [...new Set(programs.map((p) => p.vrt || "General"))];
  const uniqueTargets = [...new Set(programs.flatMap((p) => p.targets || []))];

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-4">
          <Loader className="animate-spin text-purple-500" size={36} />
          <p className="text-slate-400">Loading programs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="mx-auto text-red-400 mb-4" size={36} />
        <h3 className="text-xl font-semibold text-slate-300 mb-2">
          Error Loading Programs
        </h3>
        <p className="text-slate-400 max-w-lg mx-auto mb-4">{error}</p>
        <button
          className="px-4 py-2 bg-purple-600/30 text-purple-300 rounded-md hover:bg-purple-600/50 border border-purple-700/50"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-slate-200 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-purple-700/50 p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <Shield size={26} className="text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-100 tracking-tight">
                Bug Bounty Programs
                <span className="text-sm font-normal bg-slate-700/50 text-slate-300 px-2 py-0.5 rounded-full ml-3">
                  {filteredPrograms.length} Available
                </span>
              </h1>
              <p className="text-slate-400 mt-1">
                Discover and participate in security programs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-4 flex flex-wrap gap-4 items-center backdrop-blur-sm shadow-md">
        {/* Search Input */}
        <div className="relative flex-grow min-w-[200px] sm:min-w-[300px]">
          <input
            type="text"
            placeholder="Search programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-700/70 border border-slate-600 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="hidden sm:flex items-center text-slate-400 mr-1">
            <Filter size={16} className="mr-1.5" /> Filters:
          </div>

          <CreativeFilterDropdownV2
            label="Type"
            options={["All", ...uniqueTypes]}
            value={activeFilters.type || "All"}
            onChange={(value) => handleFilterChange("type", value)}
            icon={<Shield size={14} />}
          />

          <CreativeFilterDropdownV2
            label="VRT"
            options={["All", ...uniqueVRTs]}
            value={activeFilters.vrt || "All"}
            onChange={(value) => handleFilterChange("vrt", value)}
            icon={<Code size={14} />}
          />

          <CreativeFilterDropdownV2
            label="Target"
            options={["All", ...uniqueTargets.slice(0, 10)]}
            value={activeFilters.target || "All"}
            onChange={(value) => handleFilterChange("target", value)}
            icon={<Target size={14} />}
          />

          {(activeFilters.type ||
            activeFilters.vrt ||
            activeFilters.target ||
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

      {/* Programs Grid */}
      <div className="space-y-5">
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPrograms.map((program) => (
              <CreativeProgramCardV2 key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <Shield
              size={48}
              className="mx-auto text-slate-500 mb-3 opacity-50"
            />
            <h3 className="text-xl font-medium text-slate-300 mb-2">
              No programs found
            </h3>
            <p className="text-slate-400 max-w-md mx-auto">
              We couldn&apos;t find any programs matching your criteria.
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
    </div>
  );
}

// -------- Creative Program Card Component V2 --------
const CreativeProgramCardV2: React.FC<{ program: Program }> = ({ program }) => {
  const cardBaseStyle = `bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 shadow-lg rounded-xl relative isolate overflow-hidden transition-all duration-300 h-full flex flex-col group`;
  const cardHoverStyle = `hover:border-purple-600/60 hover:shadow-purple-500/20 hover:shadow-2xl hover:scale-[1.015]`;

  return (
    <div className={`${cardBaseStyle} ${cardHoverStyle}`}>
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-100 mb-1 group-hover:text-purple-300 transition-colors">
              {program.title}
            </h3>
            <p className="text-sm text-slate-400">{program.company}</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-900/50 text-emerald-300 border border-emerald-700/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span>
              Active
            </span>
          </div>
        </div>

        {/* Program Details */}
        <div className="space-y-3 mb-4 flex-grow">
          <DetailItem
            icon={<Award size={16} className="text-emerald-400" />}
            label="Reward Range"
            value={`$${program.minReward} - $${program.maxReward}`}
            valueClass="text-emerald-300 font-semibold"
          />

          <DetailItem
            icon={<Target size={16} className="text-blue-400" />}
            label="Scope"
            value={program.scope}
          />

          <DetailItem
            icon={<Code size={16} className="text-purple-400" />}
            label="Focus"
            value={program.vrt}
          />

          <DetailItem
            icon={<Users size={16} className="text-orange-400" />}
            label="Stats"
          >
            <div className="flex items-center gap-4 text-xs">
              <span className="text-slate-300">
                {program.reportsResolved} reports
              </span>
              {getAcceptanceRateIndicator(program.acceptanceRate || 75)}
              {getResponseTypeIndicator(program.avgResponseTime || 48)}
            </div>
          </DetailItem>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-700/50">
          <span className="text-xs text-slate-500">
            Updated {formatTimeAgo(program.updatedAt)}
          </span>
          <Link
            href={`/dashboard/hacker/programs/${program.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600/20 text-purple-300 rounded-md hover:bg-purple-600/30 transition-colors text-sm"
          >
            View Details
            <ExternalLink size={14} />
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
  <div className="flex items-start gap-2">
    <div className="flex-shrink-0 mt-0.5">{icon}</div>
    <div className="min-w-0 flex-1">
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      {children ? (
        children
      ) : (
        <p className={`text-sm ${valueClass} line-clamp-1`}>{value}</p>
      )}
    </div>
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
        className="flex items-center gap-2 bg-slate-700/80 border border-slate-600 rounded-md px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-600/80 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
      >
        {icon && <span className="text-purple-400">{icon}</span>}
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
