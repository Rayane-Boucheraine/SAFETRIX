"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  DollarSign,
  Users,
  ExternalLink,
  Calendar,
  Shield,
  Award,
  Target,
} from "lucide-react";
import programService from "@/services/programService";
import { Program, ProgramRewardType } from "@/types/program";

const getErrorMessage = (err: unknown): string => {
  if (err && typeof err === "object" && "response" in err) {
    const response = (err as { response?: { data?: { message?: string } } })
      .response;
    if (response?.data?.message) return response.data.message;
  }
  if (err instanceof Error) return err.message;
  return "An error occurred";
};

const Page = () => {
  const params = useParams();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isParticipating, setIsParticipating] = useState(false);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use the correct method name - this should match your programService implementation
        // Based on your backend, this should be a method that calls GET /programs/:id
        const programResponse = await programService.getProgram(
          params.id as string
        );

        let programData;
        if (programResponse?.data) {
          programData = programResponse.data;
        } else {
          programData = programResponse;
        }

        // Transform backend data to match frontend Program interface
        const transformedProgram: Program = {
          id: programData.id,
          title: programData.title,
          description: programData.description,
          status: programData.status,
          minReward: programData.minReward || 0,
          maxReward: programData.maxReward || 0,
          createdAt: programData.createdAt,
          updatedAt: programData.updatedAt || programData.createdAt,
          name: programData.title,
          company:
            programData.startup?.name ||
            programData.companyName ||
            "Unknown Company",
          rewardRange: `$${programData.minReward || 0} - $${
            programData.maxReward || 0
          }`,
          type: "Public" as const,
          startDate: programData.startDate || programData.createdAt,
          rewardType: "MONETARY" as ProgramRewardType,
          scope: programData.scope || "",
          rules: programData.rules || "",
          vulnerabilityTypes: programData.vulnerabilityTypes || [],
          startup: programData.startup || { id: "", name: "Unknown Company" },
          // Additional properties that might be expected by the UI
          rewards: {
            low: programData.minReward || 0,
            high: programData.maxReward || 0,
          },
          participantsCount: programData.participantsCount || 0,
          submissionsCount: programData.submissionsCount || 0,
          website: programData.website,
          contactEmail: programData.contactEmail,
          endDate: programData.endDate,
        };

        setProgram(transformedProgram);

        // Check participation status separately
        try {
          const participationResponse = await programService.checkParticipation(
            params.id as string
          );
          const participationData =
            participationResponse?.data || participationResponse;
          setIsParticipating(participationData.isParticipant || false);
        } catch (participationError) {
          // If participation check fails, assume not participating
          console.warn(
            "Could not check participation status:",
            participationError
          );
          setIsParticipating(false);
        }
      } catch (err: unknown) {
        console.error("Failed to fetch program:", err);
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProgram();
    }
  }, [params.id]);

  const handleJoinProgram = async () => {
    try {
      await programService.joinProgram(params.id as string);
      setIsParticipating(true);
    } catch (err: unknown) {
      setError(getErrorMessage(err) || "Failed to join program");
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  if (!program) {
    return <div className="p-4">Program not found</div>;
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-800/30 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{program.title}</h1>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                    {program.company || "Unknown Company"}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      program.status === "ACTIVE"
                        ? "bg-green-500"
                        : program.status === "DRAFT"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {program.status}
                  </span>
                </div>
              </div>
              <div className="text-right">
                {program.startDate && (
                  <div className="flex items-center gap-2 text-white/80 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      {new Date(program.startDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="p-6 bg-gradient-to-r from-gray-900/90 to-purple-900/30 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {program.rewards && (
                <div className="flex items-center gap-4 p-4 bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-sm border border-purple-700/30">
                  <div className="p-3 bg-purple-900/50 rounded-lg">
                    <DollarSign className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">
                      Reward Range
                    </p>
                    <p className="text-lg font-bold text-purple-400">
                      ${program.rewards.low || 0} - ${program.rewards.high || 0}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 p-4 bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-sm border border-purple-700/30">
                <div className="p-3 bg-indigo-900/50 rounded-lg">
                  <Users className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">
                    Participants
                  </p>
                  <p className="text-lg font-bold text-indigo-400">
                    {program.participantsCount || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-sm border border-purple-700/30">
                <div className="p-3 bg-violet-900/50 rounded-lg">
                  <Target className="h-6 w-6 text-violet-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">
                    Submissions
                  </p>
                  <p className="text-lg font-bold text-violet-400">
                    {program.submissionsCount || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Program Details */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-800/30 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-900/50 rounded-lg">
                  <Shield className="h-5 w-5 text-purple-400" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Program Description
                </h2>
              </div>

              <div className="prose prose-gray max-w-none">
                <p className="text-gray-300 leading-relaxed text-base">
                  {program.description || "No description available"}
                </p>
              </div>

              {program.scope &&
                Array.isArray(program.scope) &&
                program.scope.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Scope
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {program.scope.map((item, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-900/30 text-purple-300 border border-purple-600/40 rounded-lg text-sm font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {program.rules &&
                Array.isArray(program.rules) &&
                program.rules.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Rules
                    </h3>
                    <ul className="space-y-2">
                      {program.rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-300">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>

          {/* Action Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-800/30 p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="p-4 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-purple-600/40">
                  <Award className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Join the Hunt
                </h3>
                <p className="text-sm text-gray-400">
                  Start your security research journey
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleJoinProgram}
                  disabled={isParticipating}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                    isParticipating
                      ? "bg-purple-900/30 text-purple-400 cursor-not-allowed border border-purple-600/50"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
                >
                  {isParticipating ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      Joined
                    </span>
                  ) : (
                    "Join Program"
                  )}
                </button>

                {program.website && (
                  <button
                    onClick={() => window.open(program.website, "_blank")}
                    className="w-full py-3 px-6 border-2 border-purple-700/50 rounded-xl hover:border-purple-500 hover:bg-purple-900/30 transition-all duration-200 flex items-center justify-center gap-3 text-gray-300 font-medium hover:text-purple-400"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visit Website
                  </button>
                )}

                {program.contactEmail && (
                  <div className="pt-4 border-t border-purple-800/30">
                    <p className="text-xs text-gray-500 mb-2">Contact</p>
                    <p className="text-sm text-gray-300 font-medium">
                      {program.contactEmail}
                    </p>
                  </div>
                )}

                {program.endDate && (
                  <div className="pt-4 border-t border-purple-800/30">
                    <p className="text-xs text-gray-500 mb-2">Program Ends</p>
                    <p className="text-sm text-gray-300 font-medium">
                      {new Date(program.endDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
