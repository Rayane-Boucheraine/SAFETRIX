"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutGrid,
  FileText,
  AlertTriangle,
  Award,
  Users,
  ArrowRight,
  Zap,
  BarChart3,
  UserCheck,
  Clock,
} from "lucide-react";

// Global Styles & Data
const cardBaseStyle =
  "bg-slate-900/70 backdrop-blur-md border border-green-900/30 shadow-xl rounded-xl p-5 relative overflow-hidden isolate group";

const headerStyle =
  "text-lg font-bold text-slate-100 mb-4 flex items-center gap-2 relative z-10";

const themeAccentText = "text-emerald-400";

const overviewStats = {
  newReports: 5,
  criticalIssues: 2,
  pendingPayout: 1550,
  avgResponseTime: 42,
  activeHackers: 88,
};

const recentCriticalReports = [
  {
    id: "RPT-1245",
    title: "Auth Bypass via JWT",
    program: "CloudSecure",
    submitted: "1d ago",
  },
  {
    id: "RPT-1199",
    title: "SQL Injection possibility",
    program: "DataCorp AI",
    submitted: "9d ago",
  },
];

const recentHackerActivity = [
  {
    hacker: "CodeWizard",
    action: "Submitted Report",
    detail: "#RPT-1250",
    time: "1h ago",
  },
  {
    hacker: "ByteGhost",
    action: "Joined Program",
    detail: "FinTech Core",
    time: "3h ago",
  },
  {
    hacker: "ZeroDayHero",
    action: "Received Payout",
    detail: "$1200",
    time: "5h ago",
  },
];

export default function Page() {
  const gradientBg =
    "bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#195033_6.63%,#080808_100%)]";

  return (
    <div className={`min-h-full p-8 text-slate-200 ${gradientBg}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Banner */}
        <div className="relative bg-green-900/20 backdrop-blur-sm border border-green-800/30 rounded-xl p-6 mb-6 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-100">
            Welcome Back, Admin!
          </h2>
          <p className="text-slate-400 mt-1">
            Here&apos;s what&apos;s happening in your security programs today.
          </p>
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl opacity-40 -z-10"></div>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3 mb-4">
          <LayoutGrid className={themeAccentText} /> Startup Command Center
        </h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          <OverviewStatCard
            title="New Reports"
            value={overviewStats.newReports}
            icon={FileText}
            color="text-sky-400"
          />
          <OverviewStatCard
            title="Critical/High Active"
            value={overviewStats.criticalIssues}
            icon={AlertTriangle}
            color="text-red-400"
          />
          <OverviewStatCard
            title="Pending Payouts"
            value={`$${overviewStats.pendingPayout.toLocaleString("en-US")}`}
            icon={Award}
            color="text-amber-400"
          />
          <OverviewStatCard
            title="Avg. Response (H)"
            value={overviewStats.avgResponseTime}
            icon={Clock}
            color="text-emerald-400"
          />
          <OverviewStatCard
            title="Active Researchers"
            value={overviewStats.activeHackers}
            icon={Users}
            color="text-blue-400"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Critical Alerts Section */}
          <div className={`${cardBaseStyle} lg:col-span-2`}>
            <h2 className={headerStyle}>
              <Zap className={`${themeAccentText} animate-pulse`} size={20} />{" "}
              Critical Alerts
            </h2>
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl opacity-40 z-[-1]"></div>
            <ul className="space-y-2 text-sm max-h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {recentCriticalReports.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center justify-between p-2.5 bg-slate-800/50 rounded-md border border-slate-700/50 hover:border-red-500/40 hover:bg-slate-800 transition-all"
                >
                  <div>
                    <span className="font-mono text-red-400 mr-2 text-xs">
                      {r.id}
                    </span>
                    <Link
                      href={`/dashboard/startup/reports?id=${r.id}`}
                      className="font-medium text-slate-200 hover:text-purple-300 line-clamp-1"
                    >
                      {r.title}
                    </Link>
                    <p className="text-xs text-slate-400">{r.program}</p>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {r.submitted}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right">
              <Link
                href="/dashboard/startup/reports?severity=Critical,High"
                className={`text-xs font-medium ${themeAccentText} hover:text-emerald-300 inline-flex items-center gap-1`}
              >
                View All High Priority <ArrowRight size={12} />
              </Link>
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 border-l-2 border-b-2 border-green-800/20 rounded-bl-xl pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity"></div>
          </div>

          {/* Hacker Activity Section */}
          <div className={cardBaseStyle}>
            <h2 className={headerStyle}>
              <UserCheck className={themeAccentText} size={20} /> Hacker
              Activity
            </h2>
            <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl opacity-40 z-[-1]"></div>
            <ul className="space-y-2 text-xs max-h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {recentHackerActivity.map((a, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 p-1.5 border-b border-slate-800/50 last:border-none"
                >
                  <span className="font-medium text-slate-300 w-16 truncate">
                    {a.hacker}
                  </span>
                  <span className="text-slate-400 text-[11px] flex-grow line-clamp-1">
                    {a.action}:{" "}
                    <span
                      className={
                        a.action === "Received Payout"
                          ? "text-purple-400 font-semibold"
                          : "text-slate-300"
                      }
                    >
                      {a.detail}
                    </span>
                  </span>
                  <span className="text-slate-500 text-[10px] whitespace-nowrap">
                    {a.time}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right">
              <Link
                href="/dashboard/startup/engagement"
                className={`text-xs font-medium ${themeAccentText} hover:text-emerald-300 inline-flex items-center gap-1`}
              >
                Go to Engagement Hub <ArrowRight size={12} />
              </Link>
            </div>
            <div className="absolute bottom-1 right-1 h-6 w-6 border-l border-t border-green-800/20 rounded-tl opacity-30 group-hover:opacity-60 transition-opacity"></div>
          </div>
        </div>

        {/* Program Insights Section */}
        <div className={`${cardBaseStyle}`}>
          <h2 className={headerStyle}>
            <BarChart3 className={themeAccentText} size={20} /> Program Insights
            (Demo)
          </h2>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-900/15 to-transparent z-[-1] opacity-70 pointer-events-none"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
            <div className="p-4 bg-slate-800/60 rounded-lg border border-slate-700/50">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Avg. Acceptance
              </p>
              <p className="text-3xl font-bold text-emerald-300 mt-1">79%</p>
            </div>
            <div className="p-4 bg-slate-800/60 rounded-lg border border-slate-700/50">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Avg. Bounty Payout
              </p>
              <p className="text-3xl font-bold text-emerald-300 mt-1">$985</p>
            </div>
            <div className="p-4 bg-slate-800/60 rounded-lg border border-slate-700/50">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Top VRT
              </p>
              <p className="text-lg font-medium text-slate-200 mt-1">
                A1: Injection
              </p>
              <p className="text-xs text-slate-500">(Across all programs)</p>
            </div>
          </div>
          <div className="mt-5 text-right">
            <Link
              href="/dashboard/startup/programs"
              className={`text-xs font-medium ${themeAccentText} hover:text-emerald-300 inline-flex items-center gap-1`}
            >
              Analyze All Programs <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Custom Chart Placeholder */}
        <div className={`${cardBaseStyle}`}>
          <h2 className={headerStyle}>
            <BarChart3 className={themeAccentText} size={20} /> Vulnerability
            Trends
          </h2>
          <div className="h-64 flex items-center justify-center text-slate-500 text-sm">
            [Chart Placeholder: Monthly vulnerability report trends]
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className={`${cardBaseStyle}`}>
          <h2 className={headerStyle}>
            <Zap className={themeAccentText} size={20} /> Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
            {[
              { label: "New Report", href: "/dashboard/startup/reports/new" },
              { label: "View Programs", href: "/dashboard/startup/programs" },
              {
                label: "Engagement Hub",
                href: "/dashboard/startup/engagement",
              },
              { label: "Settings", href: "/dashboard/startup/settings" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 px-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-center text-sm font-medium text-slate-300 hover:text-emerald-300 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
const OverviewStatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}> = ({ title, value, icon: Icon, color }) => {
  const baseColor = color.replace("text-", "");

  return (
    <div
      className={`bg-slate-800/80 backdrop-blur-sm border border-slate-700/60 rounded-lg p-4 shadow-lg transition-all duration-300 hover:bg-slate-800 hover:border-${baseColor}-600/50 group isolate relative overflow-hidden`}
    >
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-radial from-${baseColor}-900/20 via-transparent to-transparent pointer-events-none -z-10`}
      ></div>
      <div className="flex justify-between items-start mb-1">
        <span
          className={`text-[11px] uppercase tracking-wider font-semibold text-slate-400 group-hover:${color.replace(
            "400",
            "300"
          )} transition-colors`}
        >
          {title}
        </span>
        <Icon
          size={16}
          className={`${color} opacity-70 group-hover:opacity-100 transition-opacity`}
        />
      </div>
      <p className="text-3xl font-bold text-slate-50 mt-1 group-hover:text-white transition-colors">
        {value}
      </p>
      <div
        className={`absolute bottom-0 left-0 right-0 h-1.5 opacity-20 group-hover:opacity-50 transition-opacity bg-${baseColor}-500/50 blur-[2px]`}
      ></div>
    </div>
  );
};
