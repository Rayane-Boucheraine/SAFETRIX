"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Shield,
  DollarSign,
  Calendar,
  Users,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader,
} from "lucide-react";
import Link from "next/link";
import programService from "@/services/programService";
import { Program, ProgramStatus } from "@/types/program";

export default function ProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const programId = params.id as string;

  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const gradientBg =
    "bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#195033_6.63%,#080808_100%)]";

  useEffect(() => {
    if (programId) {
      fetchProgram();
    }
  }, [programId]);

  const fetchProgram = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await programService.getProgram(programId);
      if (response) {
        setProgram(response as Program);
      } else {
        setError("Program not found");
      }
    } catch (error: unknown) {
      console.error("Failed to fetch program:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch program details");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status: ProgramStatus) => {
    if (!program) return;

    try {
      await programService.updateProgramStatus(program.id, status);
      await fetchProgram(); // Refresh data
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Failed to update program status");
    }
  };

  const handleDelete = async () => {
    if (!program || !confirm("Are you sure you want to delete this program?"))
      return;

    try {
      await programService.deleteProgram(program.id);
      router.push("/dashboard/startup/programs");
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Failed to delete program");
    }
  };

  if (loading) {
    return (
      <div className={`min-h-full p-8 text-slate-200 ${gradientBg}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center gap-4">
              <Loader className="animate-spin text-emerald-500" size={36} />
              <p className="text-slate-400">Loading program details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className={`min-h-full p-8 text-slate-200 ${gradientBg}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16">
            <AlertCircle className="mx-auto text-red-400 mb-4" size={48} />
            <h2 className="text-xl font-semibold text-slate-300 mb-2">
              Error Loading Program
            </h2>
            <p className="text-slate-400 mb-4">
              {error || "Program not found"}
            </p>
            <Link
              href="/dashboard/startup/programs"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            >
              <ArrowLeft size={16} />
              Back to Programs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: ProgramStatus) => {
    switch (status) {
      case ProgramStatus.DRAFT:
        return <Clock className="text-gray-400" size={20} />;
      case ProgramStatus.ACTIVE:
        return <CheckCircle className="text-green-400" size={20} />;
      case ProgramStatus.PAUSED:
        return <AlertCircle className="text-yellow-400" size={20} />;
      case ProgramStatus.COMPLETED:
        return <CheckCircle className="text-blue-400" size={20} />;
      default:
        return <Shield className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: ProgramStatus) => {
    switch (status) {
      case ProgramStatus.DRAFT:
        return "text-gray-300 bg-gray-900/60 border-gray-700";
      case ProgramStatus.ACTIVE:
        return "text-green-300 bg-green-900/60 border-green-700";
      case ProgramStatus.PAUSED:
        return "text-yellow-300 bg-yellow-900/60 border-yellow-700";
      case ProgramStatus.COMPLETED:
        return "text-blue-300 bg-blue-900/60 border-blue-700";
      default:
        return "text-gray-300 bg-gray-900/60 border-gray-700";
    }
  };

  return (
    <div className={`min-h-full p-8 text-slate-200 ${gradientBg}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/startup/programs"
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-3">
              <Shield size={24} className="text-emerald-400" />
              <div>
                <h1 className="text-2xl font-bold text-slate-200">
                  {program.title}
                </h1>
                <p className="text-slate-400 mt-1">Program Details</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/dashboard/startup/programs/${program.id}/edit`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-md transition-colors"
            >
              <Edit size={16} />
              Edit
            </Link>
            {program.status === ProgramStatus.DRAFT && (
              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                <Trash2 size={16} />
                Delete
              </button>
            )}
          </div>
        </div>

        {/* Program Status Card */}
        <div className="bg-slate-900/70 backdrop-blur-md border border-green-900/30 shadow-xl rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-100">
              Program Status
            </h2>
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStatusColor(
                program.status
              )}`}
            >
              {getStatusIcon(program.status)}
              {program.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="text-emerald-400" size={20} />
                <h3 className="font-medium text-slate-200">Reward Range</h3>
              </div>
              <p className="text-2xl font-bold text-emerald-300">
                ${program.minReward} - ${program.maxReward}
              </p>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="text-blue-400" size={20} />
                <h3 className="font-medium text-slate-200">Start Date</h3>
              </div>
              <p className="text-lg text-slate-300">
                {new Date(program.startDate).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="text-purple-400" size={20} />
                <h3 className="font-medium text-slate-200">Reward Type</h3>
              </div>
              <p className="text-lg text-slate-300">{program.rewardType}</p>
            </div>
          </div>
        </div>

        {/* Program Details */}
        <div className="bg-slate-900/70 backdrop-blur-md border border-green-900/30 shadow-xl rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-6">
            Program Information
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-slate-200 mb-2">
                Description
              </h3>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <p className="text-slate-300">{program.description}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-200 mb-2">Scope</h3>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <p className="text-slate-300">{program.scope}</p>
              </div>
            </div>

            {program.outOfScope && (
              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">
                  Out of Scope
                </h3>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <p className="text-slate-300">{program.outOfScope}</p>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-medium text-slate-200 mb-2">
                Rules & Guidelines
              </h3>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <p className="text-slate-300">{program.rules}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-200 mb-2">
                Vulnerability Types
              </h3>
              <div className="flex flex-wrap gap-2">
                {program.vulnerabilityTypes.map((type, index) => (
                  <span
                    key={index}
                    className="bg-slate-800 text-slate-300 text-sm px-3 py-1 rounded-full border border-slate-700"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status Actions */}
        {program.status !== ProgramStatus.ARCHIVED && (
          <div className="bg-slate-900/70 backdrop-blur-md border border-green-900/30 shadow-xl rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-100 mb-4">
              Program Actions
            </h2>

            <div className="flex flex-wrap gap-3">
              {program.status === ProgramStatus.DRAFT && (
                <button
                  onClick={() => handleStatusChange(ProgramStatus.ACTIVE)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                >
                  Publish Program
                </button>
              )}

              {program.status === ProgramStatus.ACTIVE && (
                <button
                  onClick={() => handleStatusChange(ProgramStatus.PAUSED)}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors"
                >
                  Pause Program
                </button>
              )}

              {program.status === ProgramStatus.PAUSED && (
                <button
                  onClick={() => handleStatusChange(ProgramStatus.ACTIVE)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                >
                  Resume Program
                </button>
              )}

              {(program.status === ProgramStatus.ACTIVE ||
                program.status === ProgramStatus.PAUSED) && (
                <button
                  onClick={() => handleStatusChange(ProgramStatus.COMPLETED)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
