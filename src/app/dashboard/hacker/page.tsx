"use client"

import React, { useState, useEffect } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Award,
  CheckCircle,
  FileText,
  Gift,
  MessageSquare,
  Send,
  Target,
  TrendingUp,
  Users,
  Shield,
  Zap,
  Sparkles,
  Code,
  ChevronRight,
  BarChart3,
  Terminal,
  Lock,
  Eye,
  ExternalLink,
} from "lucide-react";

const hackerStats = {
  reportsSubmitted: 125,
  reportsAccepted: 85,
  pendingReview: 15,
  totalRewards: 5830.5,
  currentRank: 42,
  programsJoined: 7,
};

const recentActivity = [
  {
    id: 1,
    type: "report_update",
    text: "Report #RPT-1234 status changed to Triaged.",
    time: "2h ago",
    icon: CheckCircle,
    iconColor: "text-blue-500",
  },
  {
    id: 2,
    type: "new_message",
    text: "New message from ACME Corp regarding Report #RPT-1230.",
    time: "5h ago",
    icon: MessageSquare,
    iconColor: "text-green-500",
  },
  {
    id: 3,
    type: "reward_paid",
    text: "Reward of $250 paid out for Report #RPT-1199.",
    time: "1d ago",
    icon: Gift,
    iconColor: "text-emerald-500",
  },
  {
    id: 4,
    type: "report_update",
    text: "Report #RPT-1235 needs more information.",
    time: "1d ago",
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
  },
  {
    id: 5,
    type: "new_program",
    text: 'You were invited to the "SecureApp" private program.',
    time: "2d ago",
    icon: Users,
    iconColor: "text-purple-500",
  },
  {
    id: 6,
    type: "report_update",
    text: "Report #RPT-1235 needs more information.",
    time: "1d ago",
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
  },
];

const featuredPrograms = [
  {
    id: 1,
    name: "FinTech Innovations Public Program",
    scope: "Web Application, API",
    rewardRange: "$100 - $5,000",
    difficulty: "Medium",
    securityFocus: "Authentication, Data Protection",
  },
  {
    id: 2,
    name: "GamerConnect Bug Bounty",
    scope: "Mobile App (iOS/Android)",
    rewardRange: "$50 - $2,500",
    difficulty: "Easy",
    securityFocus: "Input Validation, Session Management",
  },
  {
    id: 3,
    name: "DataCorp AI Challenge",
    scope: "API, Machine Learning Model",
    rewardRange: "$500 - $10,000",
    difficulty: "Hard",
    securityFocus: "ML/AI Security, API Abuse",
  },
];

// ------------- Component for the Enhanced Dashboard --------------
const EnhancedDashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const hackerName = "CyberNinja";

  // Animation effect on load
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  return (
    <div
      className={`space-y-10 text-white transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* --------- Enhanced Header Section with Futuristic Design --------- */}
      <div className="relative mb-8">
        {/* Background decorative elements */}
        <div className="absolute -left-8 top-0 w-20 h-20 rounded-full bg-emerald-500/5 blur-xl"></div>
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
        <div className="bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 rounded-2xl p-8 border border-slate-700/50 shadow-lg relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            {/* Welcome text with animated typing effect */}
            <div className="pl-2">
              <div className="flex items-center">
                <Terminal size={24} className="text-emerald-400 mr-3" />
                <h1 className="text-3xl font-bold text-emerald-50">
                  Welcome back,{" "}
                  <span className="text-emerald-400 inline-block relative">
                    {hackerName}
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-emerald-400 to-transparent"></span>
                  </span>
                </h1>
              </div>
              <p className="mt-2 text-slate-400 max-w-md">
                <span className="text-emerald-400">$</span> Secure the digital
                world, one vulnerability at a time. Your mission awaits.
              </p>
            </div>

            {/* Action buttons with enhanced styling */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg 
                shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 
                flex items-center justify-center gap-2 group"
              >
                <Send size={18} className="group-hover:animate-pulse" />
                <span className="font-medium">Submit Report</span>
              </button>

              <button
                className="px-5 py-2.5 bg-transparent text-emerald-400 border border-emerald-500/50 
                hover:border-emerald-400 rounded-lg shadow-lg transition-all duration-300 
                flex items-center justify-center gap-2 hover:bg-emerald-900/20"
              >
                <Eye size={18} />
                <span className="font-medium">View Programs</span>
              </button>
            </div>
          </div>

          {/* Animated cyber-themed decorative pattern */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#10B981"
                strokeWidth="1"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="#10B981"
                strokeWidth="0.5"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="20"
                stroke="#10B981"
                strokeWidth="0.25"
                fill="none"
              />
              <line
                x1="0"
                y1="50"
                x2="100"
                y2="50"
                stroke="#10B981"
                strokeWidth="0.5"
              />
              <line
                x1="50"
                y1="0"
                x2="50"
                y2="100"
                stroke="#10B981"
                strokeWidth="0.5"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* --------- Enhanced Stats Section with Advanced Visualization --------- */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-5">
          <BarChart3 size={22} className="text-emerald-400" />
          <h2 className="text-2xl font-bold text-slate-200">
            Performance Matrix
          </h2>
          <span className="inline-block w-24 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent"></span>
        </div>

        {/* Stats cards with upgraded design */}
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
            chartColor="#10B981"
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
            value={`$${hackerStats.totalRewards.toLocaleString()}`}
            icon={Award}
            iconColor="text-emerald-400"
            isSpecial={true}
            trend={+850}
            chartData={[
              1500, 2400, 1800, 3000, 2500, 3500, 4000, 4500, 5000, 5830,
            ]}
            chartColor="#10B981"
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

      {/* --------- Reimagined Activity Section with Timeline Style --------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Timeline */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <Zap size={22} className="text-emerald-400" />
            <h2 className="text-2xl font-bold text-slate-200">
              Activity Timeline
            </h2>
            <span className="inline-block w-24 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent"></span>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 rounded-2xl p-6 border border-slate-700/50 shadow-lg relative overflow-hidden h-[calc(100%-52px)]">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl"></div>

            {/* Activity items with timeline visual */}
            <div className="relative z-10 flex flex-col h-full">
              <ul className="space-y-1 flex-grow">
                {recentActivity.map((activity, index) => (
                  <li
                    key={activity.id}
                    className="relative pl-8 pb-8 last:pb-0"
                  >
                    {/* Timeline vertical line */}
                    {index < recentActivity.length - 1 && (
                      <div className="absolute left-4 top-4 bottom-0 w-0.5 bg-gradient-to-b from-slate-600/70 to-slate-700/30"></div>
                    )}

                    {/* Timeline activity */}
                    <div className="group relative">
                      {/* Timeline node */}
                      <div
                        className={`absolute -left-8 top-1 w-8 h-8 rounded-full flex items-center justify-center border-2 border-slate-800 ${activity.iconColor} bg-slate-900 shadow-lg`}
                      >
                        <activity.icon
                          size={16}
                          className={activity.iconColor}
                        />
                      </div>

                      {/* Activity content */}
                      <a 
                        href={`/activity/${activity.id}`} 
                        className="block bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 p-4 transition-all duration-300 hover:border-slate-600/50 hover:shadow-lg"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-medium text-slate-200">
                            {activity.text}
                          </p>
                          <span className="text-xs text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full">
                            {activity.time}
                          </span>
                        </div>

                        {/* Action buttons */}
                        <div className="flex justify-end mt-2 gap-2">
                          <span className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors duration-200">
                            <span>Details</span>
                            <ChevronRight size={14} />
                          </span>
                        </div>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>

              {/* View all link */}
              <div className="mt-5 text-right">
                <a
                  href="/dashboard/hacker/activity"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors duration-200 text-sm font-medium group"
                >
                  <span>View All Activity</span>
                  <ArrowRight
                    size={16}
                    className="transform transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* --------- Reimagined Featured Programs Section --------- */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <Shield size={22} className="text-emerald-400" />
            <h2 className="text-2xl font-bold text-slate-200">
              Featured Programs
            </h2>
            <span className="inline-block w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent"></span>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 rounded-2xl p-6 border border-slate-700/50 shadow-lg relative overflow-hidden h-[calc(100%-52px)]">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]"></div>

            {/* Featured programs list */}
            <div className="relative z-10 space-y-4 flex flex-col h-full">
              <div className="flex-grow space-y-4">
                {featuredPrograms.map((program) => (
                  <div key={program.id} className="relative group">
                    {/* Program card with enhanced visual detail */}
                    <a
                      href={`/program/${program.id}`}
                      className="block bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 p-4 transition-all duration-300 
                         hover:border-emerald-500/30 hover:shadow-lg overflow-hidden"
                    >
                      {/* Difficulty indicator */}
                      <div
                        className={`absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full flex items-center gap-1
                        ${
                          program.difficulty === "Easy"
                            ? "bg-emerald-900/70 text-emerald-300"
                            : program.difficulty === "Medium"
                            ? "bg-amber-900/70 text-amber-300"
                            : "bg-red-900/70 text-red-300"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            program.difficulty === "Easy"
                              ? "bg-emerald-300"
                              : program.difficulty === "Medium"
                              ? "bg-amber-300"
                              : "bg-red-300"
                          }`}
                        ></span>
                        {program.difficulty}
                      </div>

                      {/* Program name with animation */}
                      <h3 className="font-medium text-slate-100 pr-24 mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                        {program.name}
                      </h3>

                      {/* Program details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Code size={14} className="text-slate-400" />
                          <span className="text-slate-300">{program.scope}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Award size={14} className="text-emerald-400" />
                          <span className="text-emerald-300 font-medium">
                            {program.rewardRange}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Lock size={14} className="text-slate-400" />
                          <span className="text-slate-300">
                            {program.securityFocus}
                          </span>
                        </div>
                      </div>

                      {/* View program button - now part of the anchor tag */}
                      <div className="mt-4 flex justify-end">
                        <span className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors duration-200">
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
                    </a>
                  </div>
                ))}
              </div>

              {/* View all link */}
              <div className="mt-5 text-right">
                <a
                  href="/programs"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors duration-200 text-sm font-medium group"
                >
                  <span>Explore All Programs</span>
                  <ArrowRight
                    size={16}
                    className="transform transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --------- Footer Section with Quick Actions --------- */}
      <div className="mt-12">
        <div className="bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 rounded-2xl p-6 border border-slate-700/50 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]"></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles size={20} className="text-emerald-400" />
              <h3 className="text-lg font-medium text-slate-200">
                Ready to hunt more bugs?
              </h3>
            </div>

            <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
              <button
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg 
                shadow-lg transition-all duration-300 text-sm flex items-center gap-2"
              >
                <Target size={16} />
                <span>Find New Programs</span>
              </button>

              <button
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg 
                shadow-lg transition-all duration-300 text-sm flex items-center gap-2"
              >
                <MessageSquare size={16} />
                <span>Messages</span>
              </button>
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
  iconColor = "text-emerald-500",
  trend = 0,
  chartData = [],
  chartColor = "#10B981",
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
          ? "border-emerald-500/30 bg-gradient-to-br from-emerald-900/30 to-slate-900/90 shadow-[0_0_25px_-5px_rgba(16,185,129,0.3)]"
          : "border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/90 shadow-lg"
      }
      transition-all duration-300 hover:shadow-xl group
    `}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]"></div>

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
                  ? "bg-emerald-900/50 text-emerald-300"
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
              isSpecial ? "text-emerald-300" : "text-white"
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

export default EnhancedDashboard;
