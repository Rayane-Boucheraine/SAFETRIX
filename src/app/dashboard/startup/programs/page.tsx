"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader,
  Pencil,
  Trash2,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import programService from "@/services/programService";
import { Program, ProgramStatus, ProgramRewardType } from "@/types/program";

interface BackendProgram {
  id: string;
  title: string;
  description: string;
  status: ProgramStatus;
  minReward: number;
  maxReward: number;
  createdAt: string;
  startup?: {
    id?: string;
    name: string;
  };
}

export default function StartupProgramsPage() {
  const gradientBg =
    "bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#195033_6.63%,#080808_100%)]";
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProgramStatus | "ALL">(
    "ALL"
  );

  const fetchMyPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await programService.getMyPrograms();

      console.log("Programs response:", response);

      // Improved handling of response structure
      let programsData: BackendProgram[] = [];

      if (response) {
        if (
          typeof response === "object" &&
          "data" in response &&
          Array.isArray(response.data)
        ) {
          programsData = response.data;
        } else if (Array.isArray(response)) {
          programsData = response as BackendProgram[];
        }
      }

      // Transform data to match frontend structure with proper type checking
      const transformedPrograms: Program[] = programsData.map(
        (program: BackendProgram): Program => ({
          id: program.id,
          title: program.title,
          description: program.description,
          status: program.status,
          minReward: program.minReward,
          maxReward: program.maxReward,
          createdAt: program.createdAt,
          updatedAt: program.createdAt,
          name: program.title,
          company: program.startup?.name || "Your Company",
          rewardRange: `$${program.minReward} - $${program.maxReward}`,
          type: "Public" as const,
          startDate: program.createdAt,
          rewardType: "MONETARY" as ProgramRewardType,
          scope: "",
          rules: "", // Ensure rules is present
          vulnerabilityTypes: [], // Add missing property
          startup: program.startup
            ? {
                id: program.startup.id || "",
                name: program.startup.name || "Your Company",
              }
            : { id: "", name: "Your Company" },
        })
      );

      setPrograms(transformedPrograms);
    } catch (error: unknown) {
      console.error("Failed to fetch programs:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch programs"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProgram = async (id: string) => {
    if (!confirm("Are you sure you want to delete this program?")) return;

    try {
      await programService.deleteProgram(id);
      await fetchMyPrograms(); // Refresh the list
    } catch (error: unknown) {
      alert(
        error instanceof Error ? error.message : "Failed to delete program"
      );
    }
  };

  useEffect(() => {
    fetchMyPrograms();
  }, []);

  const handleStatusChange = async (id: string, status: ProgramStatus) => {
    try {
      await programService.updateProgramStatus(id, status);
      await fetchMyPrograms(); // Refresh the list
    } catch (error: unknown) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to update program status"
      );
    }
  };

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      !searchTerm ||
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || program.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: ProgramStatus) => {
    switch (status) {
      case ProgramStatus.DRAFT:
        return <Clock className="text-gray-400" size={16} />;
      case ProgramStatus.ACTIVE:
        return <CheckCircle className="text-green-400" size={16} />;
      case ProgramStatus.PAUSED:
        return <AlertCircle className="text-yellow-400" size={16} />;
      case ProgramStatus.COMPLETED:
        return <CheckCircle className="text-blue-400" size={16} />;
      case ProgramStatus.ARCHIVED:
        return <Shield className="text-gray-400" size={16} />;
      default:
        return <Clock className="text-gray-400" size={16} />;
    }
  };

  const getStatusColor = (status: ProgramStatus) => {
    switch (status) {
      case ProgramStatus.DRAFT:
        return "bg-gray-900/60 text-gray-300 border-gray-700/70";
      case ProgramStatus.ACTIVE:
        return "bg-green-900/60 text-green-300 border-green-700/70";
      case ProgramStatus.PAUSED:
        return "bg-yellow-900/60 text-yellow-300 border-yellow-700/70";
      case ProgramStatus.COMPLETED:
        return "bg-blue-900/60 text-blue-300 border-blue-700/70";
      case ProgramStatus.ARCHIVED:
        return "bg-gray-900/60 text-gray-300 border-gray-700/70";
      default:
        return "bg-gray-900/60 text-gray-300 border-gray-700/70";
    }
  };

  return (
    <div className={`min-h-full p-8 text-slate-200 ${gradientBg}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Shield size={24} className="text-emerald-400" />
            <div>
              <h1 className="text-2xl font-bold text-slate-200">My Programs</h1>
              <p className="text-slate-400 mt-1">
                Manage your bug bounty programs
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/startup/programs/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 border border-emerald-500 hover:border-emerald-400 text-white rounded-md transition-all duration-200 shadow-md"
          >
            <Plus size={16} />
            Create Program
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-slate-900/70 backdrop-blur-md border border-green-900/30 shadow-xl rounded-xl p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as ProgramStatus | "ALL")
              }
              className="bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <option value="ALL">All Status</option>
              <option value={ProgramStatus.DRAFT}>Draft</option>
              <option value={ProgramStatus.ACTIVE}>Active</option>
              <option value={ProgramStatus.PAUSED}>Paused</option>
              <option value={ProgramStatus.COMPLETED}>Completed</option>
              <option value={ProgramStatus.ARCHIVED}>Archived</option>
            </select>
          </div>
        </div>

        {/* Programs List */}
        <div className="bg-slate-900/70 backdrop-blur-md border border-green-900/30 shadow-xl rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center gap-4">
                <Loader className="animate-spin text-emerald-500" size={36} />
                <p className="text-slate-400">Loading programs...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <AlertCircle className="mx-auto text-red-400 mb-4" size={36} />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">
                Error Loading Programs
              </h3>
              <p className="text-slate-400 max-w-lg mx-auto mb-4">{error}</p>
              <button
                className="px-4 py-2 bg-emerald-600/30 text-emerald-300 rounded-md hover:bg-emerald-600/50 border border-emerald-700/50"
                onClick={fetchMyPrograms}
              >
                Try Again
              </button>
            </div>
          ) : filteredPrograms.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50 border-b border-slate-700/50">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-slate-300">
                      Program
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-slate-300">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-slate-300">
                      Reward Range
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-slate-300">
                      Created
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-slate-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrograms.map((program) => (
                    <tr
                      key={program.id}
                      className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <h3 className="font-semibold text-slate-200">
                            {program.title}
                          </h3>
                          <p className="text-sm text-slate-400 line-clamp-1">
                            {program.description}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusColor(
                            program.status
                          )}`}
                        >
                          {getStatusIcon(program.status)}
                          {program.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-emerald-300 font-medium">
                          {program.rewardRange}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-slate-400">
                          {new Date(program.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/startup/programs/${program.id}`}
                            className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-700/50 rounded"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </Link>

                          {program.status === ProgramStatus.DRAFT && (
                            <button
                              onClick={() => handleDeleteProgram(program.id)}
                              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded"
                              title="Delete Program"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                          <div className="relative group">
                            <button className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded">
                              <MoreHorizontal size={16} />
                            </button>
                            <div className="absolute right-0 top-8 bg-slate-800 border border-slate-700 rounded-md shadow-lg py-1 hidden group-hover:block z-10 min-w-32">
                              {program.status === ProgramStatus.DRAFT && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(
                                      program.id,
                                      ProgramStatus.ACTIVE
                                    )
                                  }
                                  className="w-full text-left px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700"
                                >
                                  Publish
                                </button>
                              )}
                              {program.status === ProgramStatus.ACTIVE && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(
                                      program.id,
                                      ProgramStatus.PAUSED
                                    )
                                  }
                                  className="w-full text-left px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700"
                                >
                                  Pause
                                </button>
                              )}
                              {program.status === ProgramStatus.PAUSED && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(
                                      program.id,
                                      ProgramStatus.ACTIVE
                                    )
                                  }
                                  className="w-full text-left px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700"
                                >
                                  Resume
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <Shield
                size={48}
                className="mx-auto text-slate-500 mb-4 opacity-50"
              />
              <h3 className="text-xl font-medium text-slate-300 mb-2">
                No Programs Found
              </h3>
              <p className="text-slate-400 max-w-md mx-auto mb-6">
                You haven&apos;t created any programs yet. Start by creating
                your first bug bounty program.
              </p>
              <Link
                href="/dashboard/startup/programs/create"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors"
              >
                <Plus size={16} />
                Create Your First Program
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
