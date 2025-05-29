"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Terminal,
  Send,
  Eye,
  FileText,
  CheckCircle,
  Award,
  TrendingUp,
  Target,
  BarChart3,
  Bug,
  Sparkles,
  Clock,
  Activity,
  Zap,
  AlertTriangle,
  Shield,
  Info,
  Users,
  X,
  Loader,
  ChevronRight,
  Code,
  Lock,
  ExternalLink,
} from "lucide-react";
import userService from "@/services/userService";
import reportService, {
  Report,
  ReportStatus,
  ReportSeverity,
} from "@/services/reportService";
import programService from "@/services/programService";

interface UserProfile {
  alias?: string;
  username?: string;
  name?: string;
}

interface Program {
  id: string | number;
  title: string;
  status?: string;
  scope?: string;
  minReward: number;
  maxReward: number;
  rewardType?: string;
}

const hackerStats = {
  reportsSubmitted: 125,
  reportsAccepted: 85,
  pendingReview: 15,
  totalRewards: 5830.5,
  currentRank: 42,
  programsJoined: 7,
};

const EnhancedDashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userName, setUserName] = useState("CyberNinja"); // Default fallback
  const [userLoading, setUserLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportsError, setReportsError] = useState<string | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [programsLoading, setProgramsLoading] = useState(true);
  const [programsError, setProgramsError] = useState<string | null>(null);

  // Animation effect on load
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
    fetchUserName();
    fetchRecentReports();
    fetchFeaturedPrograms();
  }, []);

  const fetchUserName = async () => {
    try {
      setUserLoading(true);
      const userProfile = await userService.getUserProfile();
      setUserName(
        (userProfile as UserProfile)?.alias ||
          userProfile?.name ||
          "Security Researcher"
      );
    } catch (error) {
      console.error("Failed to fetch user name:", error);
      // Keep default name on error
    } finally {
      setUserLoading(false);
    }
  };

  const fetchRecentReports = async () => {
    try {
      setReportsLoading(true);
      setReportsError(null);
      const reportsData = await reportService.getMyReports();

      // Handle different response structures
      let reportsArray: Report[] = [];
      if (Array.isArray(reportsData)) {
        reportsArray = reportsData;
      } else if (reportsData?.data && Array.isArray(reportsData.data)) {
        reportsArray = reportsData.data;
      } else {
        console.error("Unexpected reports response structure:", reportsData);
        reportsArray = [];
      }

      // Get the 5 most recent reports
      const sortedReports = reportsArray.sort(
        (a: Report, b: Report) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setReports(sortedReports.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch reports:", error);
      setReportsError(
        error instanceof Error ? error.message : "Failed to fetch reports"
      );
      setReports([]); // Set empty array on error
    } finally {
      setReportsLoading(false);
    }
  };

  const fetchFeaturedPrograms = async () => {
    try {
      setProgramsLoading(true);
      setProgramsError(null);
      const response = await programService.getActivePrograms();

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

      // Get the 3 most recent active programs
      const featuredPrograms = programsData.slice(0, 3);
      setPrograms(featuredPrograms);
    } catch (error) {
      console.error("Failed to fetch programs:", error);
      setProgramsError(
        error instanceof Error ? error.message : "Failed to fetch programs"
      );
      setPrograms([]); // Set empty array on error
    } finally {
      setProgramsLoading(false);
    }
  };

  return (
    <div
      className={`space-y-10 text-white transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* --------- Enhanced Header Section with Futuristic Design --------- */}
      <div className="relative mb-8">
        {/* Background decorative elements */}
        <div className="absolute -left-8 top-0 w-20 h-20 rounded-full bg-purple-500/5 blur-xl"></div>
        <div className="absolute -right-8 bottom-0 w-32 h-32 rounded-full bg-blue-500/5 blur-xl"></div>

        {/* Hexagonal grid pattern - decorative */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L50 17.5V42.5L30 55L10 42.5V17.5L30 5z' stroke='%23ffffff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        {/* Main header content */}
        <div className="bg-gradient-to-r from-[#180729]/90 via-[#2A0D45]/90 to-[#180729]/90 rounded-2xl p-8 border border-purple-900/50 shadow-lg relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            {/* Welcome text with animated typing effect */}
            <div className="pl-2">
              <div className="flex items-center">
                <Terminal size={24} className="text-purple-400 mr-3" />
                <h1 className="text-3xl font-bold text-purple-50">
                  Welcome back,{" "}
                  <span className="text-purple-400 inline-block relative">
                    {userLoading ? (
                      <span className="inline-flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400 mr-2"></div>
                        Loading...
                      </span>
                    ) : (
                      userName
                    )}
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-purple-400 to-transparent"></span>
                  </span>
                </h1>
              </div>
              <p className="mt-2 text-slate-400 max-w-md">
                <span className="text-purple-400">$</span> Secure the digital
                world, one vulnerability at a time. Your mission awaits.
              </p>
            </div>

            {/* Action buttons with enhanced styling */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard/hacker/reports/create"
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg 
                shadow-lg hover:shadow-purple-500/20 transition-all duration-300 
                flex items-center justify-center gap-2 group"
              >
                <Send size={18} className="group-hover:animate-pulse" />
                <span className="font-medium">Submit Report</span>
              </Link>

              <Link
                href="/dashboard/hacker/programs"
                className="px-5 py-2.5 bg-transparent text-purple-400 border border-purple-500/50 
                hover:border-purple-400 rounded-lg shadow-lg transition-all duration-300 
                flex items-center justify-center gap-2 hover:bg-purple-900/20"
              >
                <Eye size={18} />
                <span className="font-medium">View Programs</span>
              </Link>
            </div>
          </div>

          {/* Animated cyber-themed decorative pattern */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#9333EA"
                strokeWidth="1"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="#9333EA"
                strokeWidth="0.5"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="20"
                stroke="#9333EA"
                strokeWidth="0.25"
                fill="none"
              />
              <line
                x1="0"
                y1="50"
                x2="100"
                y2="50"
                stroke="#9333EA"
                strokeWidth="0.5"
              />
              <line
                x1="50"
                y1="0"
                x2="50"
                y2="100"
                stroke="#9333EA"
                strokeWidth="0.5"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* --------- Enhanced Stats Section with Advanced Visualization --------- */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-5">
          <BarChart3 size={22} className="text-purple-400" />
          <h2 className="text-2xl font-bold text-slate-200">
            Performance Matrix
          </h2>
          <span className="inline-block w-24 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></span>
        </div>

        {/* Stats cards with updated purple theme color scheme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Enhanced stat cards */}
          <StatCard
            title="Reports Submitted"
            value={hackerStats.reportsSubmitted}
            icon={FileText}
            iconColor="text-cyan-500"
            trend={+15}
            chartData={[35, 45, 30, 25, 35, 55, 65, 40, 45, 50]}
            chartColor="#22D3EE"
          />

          <StatCard
            title="Accepted Reports"
            value={hackerStats.reportsAccepted}
            icon={CheckCircle}
            iconColor="text-green-500"
            trend={+22}
            chartData={[25, 40, 50, 45, 60, 55, 65, 70, 65, 85]}
            chartColor="#9333EA"
          />

          <StatCard
            title="Pending Review"
            value={hackerStats.pendingReview}
            icon={Activity}
            iconColor="text-yellow-500"
            trend={-5}
            chartData={[15, 25, 20, 30, 15, 25, 10, 15, 20, 15]}
            chartColor="#FBBF24"
          />

          <StatCard
            title="Total Rewards"
            value={`$${hackerStats.totalRewards.toLocaleString("en-US")}`}
            icon={Award}
            iconColor="text-purple-400"
            isSpecial={true}
            trend={+850}
            chartData={[
              1500, 2400, 1800, 3000, 2500, 3500, 4000, 4500, 5000, 5830,
            ]}
            chartColor="#A855F7"
          />

          <StatCard
            title="Current Rank"
            value={`#${hackerStats.currentRank}`}
            icon={TrendingUp}
            iconColor="text-purple-400"
            trend={+12}
            chartData={[80, 75, 65, 60, 55, 48, 45, 44, 42, 42]}
            chartColor="#C084FC"
            invertTrend={true}
          />

          <StatCard
            title="Programs Joined"
            value={hackerStats.programsJoined}
            icon={Target}
            iconColor="text-blue-400"
            trend={+2}
            chartData={[1, 2, 3, 3, 4, 5, 5, 6, 7, 7]}
            chartColor="#60A5FA"
          />
        </div>
      </div>

      {/* --------- Reimagined Reports Section with Dynamic Data --------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Reports */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <Bug size={22} className="text-purple-400" />
            <h2 className="text-2xl font-bold text-slate-200">
              Recent Reports
            </h2>
            <span className="inline-block w-24 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></span>
          </div>

          <div className="bg-gradient-to-br from-[#2A0D45]/80 to-[#180729]/90 rounded-2xl p-6 border border-purple-900/50 shadow-lg relative overflow-hidden h-[calc(100%-52px)]">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_70%)]"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl"></div>

            {/* Reports content */}
            <div className="relative z-10 flex flex-col h-full">
              {reportsLoading ? (
                <div className="flex-grow flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <Loader
                      className="animate-spin text-purple-400"
                      size={24}
                    />
                    <p className="text-slate-400 text-sm">Loading reports...</p>
                  </div>
                </div>
              ) : reportsError ? (
                <div className="flex-grow flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <AlertTriangle className="text-red-400" size={24} />
                    <p className="text-red-400 text-sm">
                      Failed to load reports
                    </p>
                    <button
                      onClick={fetchRecentReports}
                      className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : reports.length === 0 ? (
                <div className="flex-grow flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <FileText className="text-slate-500 opacity-50" size={32} />
                    <p className="text-slate-400">No reports yet</p>
                    <Link
                      href="/dashboard/hacker/reports/create"
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Submit your first report
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <ul className="space-y-1 flex-grow">
                    {reports.map((report, index) => (
                      <li
                        key={report.id}
                        className="relative pl-8 pb-6 last:pb-0"
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-purple-500 border-2 border-slate-800 shadow-lg"></div>
                        {/* Timeline line */}
                        {index < reports.length - 1 && (
                          <div className="absolute left-1.5 top-4 bottom-0 w-0.5 bg-slate-700"></div>
                        )}

                        <Link
                          href={`/dashboard/hacker/reports`}
                          className="block bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 hover:bg-slate-800/70 transition-all duration-200 border border-slate-700/50 hover:border-purple-600/40"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-slate-200 line-clamp-1">
                              {report.title}
                            </h4>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadgeStyle(
                                report.status
                              )}`}
                            >
                              {report.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mb-1">
                            Program:{" "}
                            <span className="text-slate-300">
                              {report.program?.title ?? "Unknown Program"}
                            </span>
                          </p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 flex items-center gap-1">
                              <Clock size={10} />
                              {formatTimeAgo(report.createdAt)}
                            </span>
                            {report.severity && (
                              <span
                                className={`flex items-center gap-1 ${getSeverityColor(
                                  report.severity
                                )}`}
                              >
                                {getSeverityIcon(report.severity, 10)}
                                {report.severity}
                              </span>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* View all link */}
                  <div className="mt-5 text-right">
                    <Link
                      href="/dashboard/hacker/reports"
                      className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors duration-200 text-sm font-medium group"
                    >
                      <span>View All Reports</span>
                      <ChevronRight
                        size={16}
                        className="transform transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* --------- Reimagined Featured Programs Section --------- */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <Shield size={22} className="text-purple-400" />
            <h2 className="text-2xl font-bold text-slate-200">
              Featured Programs
            </h2>
            <span className="inline-block w-16 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></span>
          </div>

          <div className="bg-gradient-to-br from-[#2A0D45]/80 to-[#180729]/90 rounded-2xl p-6 border border-purple-900/50 shadow-lg relative overflow-hidden h-[calc(100%-52px)]">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_70%)]"></div>

            {/* Featured programs list */}
            <div className="relative z-10 space-y-4 flex flex-col h-full">
              {programsLoading ? (
                <div className="flex-grow flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <Loader
                      className="animate-spin text-purple-400"
                      size={24}
                    />
                    <p className="text-slate-400 text-sm">
                      Loading programs...
                    </p>
                  </div>
                </div>
              ) : programsError ? (
                <div className="flex-grow flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <AlertTriangle className="text-red-400" size={24} />
                    <p className="text-red-400 text-sm">
                      Failed to load programs
                    </p>
                    <button
                      onClick={fetchFeaturedPrograms}
                      className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : programs.length === 0 ? (
                <div className="flex-grow flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Shield className="text-slate-500 opacity-50" size={32} />
                    <p className="text-slate-400">No programs available</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-grow space-y-4">
                    {programs.map((program) => (
                      <div key={program.id} className="relative group">
                        {/* Program card with enhanced visual detail */}
                        <Link
                          href={`/dashboard/hacker/programs/${program.id}`}
                          className="block bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 p-4 transition-all duration-300 
                           hover:border-purple-500/30 hover:shadow-lg overflow-hidden"
                        >
                          {/* Status indicator */}
                          <div className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full flex items-center gap-1 bg-emerald-900/70 text-emerald-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
                            {program.status || "Active"}
                          </div>

                          {/* Program name with animation */}
                          <h3 className="font-medium text-slate-100 pr-24 mb-3 group-hover:text-purple-300 transition-colors duration-300">
                            {program.title}
                          </h3>

                          {/* Program details */}
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Code size={14} className="text-slate-400" />
                              <span className="text-slate-300 line-clamp-1">
                                {program.scope || "Web Application"}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Award size={14} className="text-emerald-400" />
                              <span className="text-emerald-300 font-medium">
                                ${program.minReward} - ${program.maxReward}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Lock size={14} className="text-slate-400" />
                              <span className="text-slate-300 line-clamp-1">
                                {program.rewardType || "Cash Rewards"}
                              </span>
                            </div>
                          </div>

                          {/* View program button */}
                          <div className="mt-4 flex justify-end">
                            <span className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors duration-200">
                              <span>View Program</span>
                              <ExternalLink size={12} />
                            </span>
                          </div>

                          {/* Decorative circuit pattern */}
                          <div className="absolute -bottom-6 -right-6 w-24 h-24 opacity-5">
                            <svg
                              viewBox="0 0 100 100"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="currentColor"
                                strokeWidth="0.5"
                                fill="none"
                              />
                              <path
                                d="M30,50 L70,50 M50,30 L50,70"
                                stroke="currentColor"
                                strokeWidth="0.5"
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="0.5"
                                fill="none"
                              />
                            </svg>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* View all link */}
                  <div className="mt-5 text-right">
                    <Link
                      href="/dashboard/hacker/programs"
                      className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors duration-200 text-sm font-medium group"
                    >
                      <span>Explore All Programs</span>
                      <ChevronRight
                        size={16}
                        className="transform transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --------- Footer Section with Quick Actions --------- */}
      <div className="mt-12">
        <div className="bg-gradient-to-r from-[#180729]/90 via-[#2A0D45]/90 to-[#180729]/90 rounded-2xl p-6 border border-purple-900/50 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.05),transparent_70%)]"></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles size={20} className="text-purple-400" />
              <h3 className="text-lg font-medium text-slate-200">
                Ready to hunt more bugs?
              </h3>
            </div>

            <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
              <Link
                href="/dashboard/hacker/programs"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg 
                shadow-lg transition-all duration-300 text-sm flex items-center gap-2"
              >
                <Target size={16} />
                <span>Find New Programs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ------------- Enhanced Stat Card with Mini Chart -------------
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  iconColor?: string;
  trend?: number;
  chartData?: number[];
  chartColor?: string;
  isSpecial?: boolean;
  invertTrend?: boolean;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-purple-500",
  trend = 0,
  chartData = [],
  chartColor = "#A855F7", // Default to purple
  isSpecial = false,
  invertTrend = false,
}: StatCardProps) => {
  // Calculate chart points
  const getChartPath = () => {
    if (chartData.length === 0) return "";

    const max = Math.max(...chartData);
    const min = Math.min(...chartData);
    const range = max - min || 1;

    const width = 80;
    const height = 40;
    const points = chartData
      .map((point, i) => {
        const x = (i / (chartData.length - 1)) * width;
        const y = height - ((point - min) / range) * height;
        return `${x},${y}`;
      })
      .join(" ");

    return `M ${points}`;
  };

  return (
    <div
      className={`
      relative overflow-hidden rounded-2xl border p-5
      ${
        isSpecial
          ? "border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-slate-900/90 shadow-[0_0_25px_-5px_rgba(147,51,234,0.3)]"
          : "border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/90 shadow-lg"
      }
      transition-all duration-300 hover:shadow-xl group
    `}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_70%)]"></div>

      {/* Card content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          {/* Title and icon */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconColor} bg-slate-800/80`}
            >
              <Icon size={20} />
            </div>
            <h3 className="text-sm font-medium text-slate-400">{title}</h3>
          </div>

          {/* Trend indicator */}
          {trend !== 0 && (
            <div
              className={`
              flex items-center gap-1 text-xs px-2 py-0.5 rounded-full
              ${
                (invertTrend ? trend < 0 : trend > 0)
                  ? "bg-purple-900/50 text-purple-300"
                  : "bg-red-900/50 text-red-300"
              }
            `}
            >
              {(invertTrend ? trend < 0 : trend > 0) ? "+" : ""}
              {trend}
              <TrendingUp
                size={12}
                className={
                  invertTrend
                    ? trend < 0
                      ? "rotate-0"
                      : "rotate-180"
                    : trend > 0
                    ? "rotate-0"
                    : "rotate-180"
                }
              />
            </div>
          )}
        </div>

        {/* Value with large display */}
        <div className="flex items-end justify-between">
          <h2
            className={`text-2xl font-bold mb-1 ${
              isSpecial ? "text-purple-300" : "text-white"
            }`}
          >
            {value}
          </h2>
        </div>

        {/* Mini chart */}
        <div className="mt-4 h-10">
          <svg
            width="100%"
            height="40"
            viewBox={`0 0 80 40`}
            preserveAspectRatio="none"
          >
            <path
              d={getChartPath()}
              fill="none"
              stroke={chartColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-75"
            />
            <path
              d={getChartPath() + ` L ${80},${40} L 0,${40} Z`}
              fill={chartColor}
              className="opacity-10"
            />
          </svg>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-5">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="85" cy="15" r="15" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};

// Helper functions for report status and severity styling
const getReportStatusColor = (status: ReportStatus): string => {
  switch (status) {
    case ReportStatus.PENDING:
      return "text-amber-400";
    case ReportStatus.ACCEPTED:
      return "text-green-400";
    case ReportStatus.REJECTED:
      return "text-red-400";
    case ReportStatus.DUPLICATE:
      return "text-gray-400";
    case ReportStatus.INFORMATIVE:
      return "text-slate-400";
    case ReportStatus.FIXED:
      return "text-emerald-400";
    default:
      return "text-gray-400";
  }
};

const getReportStatusIcon = (status: ReportStatus, size: number) => {
  const iconProps = { size, className: getReportStatusColor(status) };

  switch (status) {
    case ReportStatus.PENDING:
      return <Clock {...iconProps} />;
    case ReportStatus.ACCEPTED:
      return <CheckCircle {...iconProps} />;
    case ReportStatus.REJECTED:
      return <X {...iconProps} />;
    case ReportStatus.DUPLICATE:
      return <Users {...iconProps} />;
    case ReportStatus.INFORMATIVE:
      return <Info {...iconProps} />;
    case ReportStatus.FIXED:
      return <CheckCircle {...iconProps} />;
    default:
      return <FileText {...iconProps} />;
  }
};

const getStatusBadgeStyle = (status: ReportStatus): string => {
  switch (status) {
    case ReportStatus.PENDING:
      return "bg-amber-900/50 text-amber-300";
    case ReportStatus.ACCEPTED:
      return "bg-green-900/50 text-green-300";
    case ReportStatus.REJECTED:
      return "bg-red-900/50 text-red-300";
    case ReportStatus.DUPLICATE:
      return "bg-gray-800/50 text-gray-300";
    case ReportStatus.INFORMATIVE:
      return "bg-slate-800/50 text-slate-300";
    case ReportStatus.FIXED:
      return "bg-emerald-900/50 text-emerald-300";
    default:
      return "bg-gray-800/50 text-gray-300";
  }
};

const getSeverityColor = (severity: ReportSeverity): string => {
  switch (severity) {
    case ReportSeverity.CRITICAL:
      return "text-red-400";
    case ReportSeverity.HIGH:
      return "text-orange-400";
    case ReportSeverity.MEDIUM:
      return "text-yellow-400";
    case ReportSeverity.LOW:
      return "text-blue-400";
    default:
      return "text-gray-400";
  }
};

const getSeverityIcon = (severity: ReportSeverity, size: number) => {
  const iconProps = { size, className: getSeverityColor(severity) };

  switch (severity) {
    case ReportSeverity.CRITICAL:
      return <Zap {...iconProps} />;
    case ReportSeverity.HIGH:
      return <AlertTriangle {...iconProps} />;
    case ReportSeverity.MEDIUM:
      return <Shield {...iconProps} />;
    case ReportSeverity.LOW:
      return <Info {...iconProps} />;
    default:
      return <Info {...iconProps} />;
  }
};

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

export default EnhancedDashboard;
