"use client";

import React from "react";
import Link from "next/link";
import {
  Trophy,
  Award,
  DollarSign,
  BadgeCheck,
  Clock,
  ArrowRight,
  Calendar,
  Download,
  CreditCard,
  ChevronUp,
} from "lucide-react";

export default function RewardPage() {
  const gradientBg =
    "bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#2A0D45_6.63%,#080808_100%)]";

  const cardBaseStyle =
    "bg-slate-900/70 backdrop-blur-md border border-purple-900/30 shadow-xl rounded-xl p-5 relative overflow-hidden isolate group";

  const headerStyle =
    "text-lg font-bold text-slate-100 mb-4 flex items-center gap-2 relative z-10";

  const themeAccentText = "text-purple-400";

  // Reward Data
  const recentPayouts = [
    {
      id: "PAY-2345",
      amount: "$1,250",
      date: "Apr 28, 2025",
      method: "PayPal",
      status: "Completed",
    },
    {
      id: "PAY-2290",
      amount: "$750",
      date: "Apr 12, 2025",
      method: "Bank Transfer",
      status: "Completed",
    },
    {
      id: "PAY-2188",
      amount: "$2,000",
      date: "Mar 26, 2025",
      method: "PayPal",
      status: "Completed",
    },
  ];

  const pendingPayouts = [
    {
      id: "PAY-2350",
      amount: "$950",
      requestDate: "May 01, 2025",
      estimatedDate: "May 07, 2025",
      status: "Processing",
    },
  ];

  // Payment Methods
  const paymentMethods = [
    {
      type: "PayPal",
      email: "user@example.com",
      primary: true,
    },
    {
      type: "Bank Account",
      info: "****5678 - National Bank",
      primary: false,
    },
  ];

  return (
    <div className={`min-h-full p-8 text-slate-200 ${gradientBg}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3 mb-6">
          <Trophy className={themeAccentText} /> Rewards & Payments
        </h1>

        {/* Balance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <OverviewStatCard
            title="Total Earned"
            value="$7,850"
            icon={Award}
            color="text-amber-400"
          />
          <OverviewStatCard
            title="Available Balance"
            value="$2,300"
            icon={DollarSign}
            color="text-green-400"
          />
          <OverviewStatCard
            title="Last Payout"
            value="$1,250"
            icon={BadgeCheck}
            color="text-blue-400"
          />
          <OverviewStatCard
            title="Pending"
            value="$950"
            icon={Clock}
            color="text-purple-400"
          />
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Payouts Section */}
          <div className={`${cardBaseStyle} lg:col-span-2`}>
            <h2 className={headerStyle}>
              <Calendar className={themeAccentText} size={20} /> Recent Payouts
            </h2>
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl opacity-40 -z-10"></div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left pb-2 text-xs font-medium text-slate-400">
                      ID
                    </th>
                    <th className="text-left pb-2 text-xs font-medium text-slate-400">
                      Date
                    </th>
                    <th className="text-left pb-2 text-xs font-medium text-slate-400">
                      Amount
                    </th>
                    <th className="text-left pb-2 text-xs font-medium text-slate-400">
                      Method
                    </th>
                    <th className="text-left pb-2 text-xs font-medium text-slate-400">
                      Status
                    </th>
                    <th className="text-left pb-2 text-xs font-medium text-slate-400">
                      Receipt
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayouts.map((payout) => (
                    <tr
                      key={payout.id}
                      className="border-b border-slate-800/30 hover:bg-slate-800/30"
                    >
                      <td className="py-3 text-xs font-mono text-purple-300">
                        {payout.id}
                      </td>
                      <td className="py-3">{payout.date}</td>
                      <td className="py-3 font-medium text-green-400">
                        {payout.amount}
                      </td>
                      <td className="py-3">{payout.method}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300">
                          {payout.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="p-1 hover:bg-slate-700/50 rounded">
                          <Download
                            size={14}
                            className="text-slate-400 hover:text-purple-300"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-right">
              <Link
                href="/dashboard/startup/rewards/history"
                className={`text-xs font-medium ${themeAccentText} hover:text-purple-300 inline-flex items-center gap-1`}
              >
                View All Payment History <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className={cardBaseStyle}>
            <h2 className={headerStyle}>
              <CreditCard className={themeAccentText} size={20} /> Payment
              Methods
            </h2>
            <div className="space-y-3 text-sm">
              {paymentMethods.map((method, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{method.type}</div>
                    <div className="text-xs text-slate-400">
                      {method.email || method.info}
                    </div>
                    {method.primary && (
                      <span className="text-[10px] mt-1 inline-block px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                  <button className="p-1.5 hover:bg-slate-700/70 rounded-md">
                    <BadgeCheck
                      size={16}
                      className="text-slate-400 hover:text-purple-300"
                    />
                  </button>
                </div>
              ))}

              <Link
                href="/dashboard/startup/settings/payment"
                className="mt-2 block text-center py-2 border border-dashed border-slate-700/70 rounded-lg hover:border-purple-500/50 hover:bg-slate-800/50 text-slate-400 hover:text-purple-300"
              >
                + Add Payment Method
              </Link>
            </div>
          </div>
        </div>

        {/* Pending Payouts */}
        <div className={cardBaseStyle}>
          <h2 className={headerStyle}>
            <Clock className={themeAccentText} size={20} /> Pending Payouts
          </h2>

          {pendingPayouts.length > 0 ? (
            <div className="space-y-3">
              {pendingPayouts.map((payout) => (
                <div
                  key={payout.id}
                  className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs text-purple-300">
                      {payout.id}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-500/20 text-amber-300">
                      {payout.status}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div>
                      <div className="text-sm">
                        Requested: {payout.requestDate}
                      </div>
                      <div className="text-xs text-slate-400">
                        Est. Completion: {payout.estimatedDate}
                      </div>
                    </div>
                    <div className="text-xl font-bold text-green-400">
                      {payout.amount}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              No pending payouts at this time
            </div>
          )}
        </div>

        {/* Request Payout Section */}
        <div className={cardBaseStyle}>
          <h2 className={headerStyle}>
            <DollarSign className={themeAccentText} size={20} /> Request Payout
          </h2>

          <div className="bg-slate-800/70 rounded-lg border border-slate-700/50 p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm font-medium">Available Balance</p>
                <p className="text-2xl font-bold text-green-400">$2,300</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 text-right">
                  Minimum payout: $50
                </p>
                <p className="text-xs text-slate-400 text-right">
                  Processing time: 3-5 business days
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Amount
                </label>
                <input
                  type="text"
                  defaultValue="$2,300"
                  className="w-full bg-slate-900/70 border border-slate-700/50 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Payment Method
                </label>
                <select className="w-full bg-slate-900/70 border border-slate-700/50 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:border-purple-500/50">
                  <option>PayPal - user@example.com (Primary)</option>
                  <option>Bank Account - ****5678</option>
                </select>
              </div>

              <button className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors">
                Request Payout
              </button>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-400">
            <p>
              Note: All payouts are subject to review and may take 3-5 business
              days to process.
            </p>
          </div>
        </div>

        {/* Year-to-Date Summary */}
        <div className={cardBaseStyle}>
          <h2 className={headerStyle}>
            <Calendar className={themeAccentText} size={20} /> 2025 Payment
            Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
            <div className="p-4 bg-slate-800/60 rounded-lg border border-slate-700/50">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                YTD Earnings
              </p>
              <p className="text-3xl font-bold text-purple-300 mt-1">$7,850</p>
              <p className="text-xs text-green-400 flex items-center justify-center mt-1">
                <ChevronUp size={12} /> +22% from last year
              </p>
            </div>
            <div className="p-4 bg-slate-800/60 rounded-lg border border-slate-700/50">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Total Payouts
              </p>
              <p className="text-3xl font-bold text-purple-300 mt-1">5</p>
              <p className="text-xs text-green-400 flex items-center justify-center mt-1">
                <ChevronUp size={12} /> +2 from last year
              </p>
            </div>
            <div className="p-4 bg-slate-800/60 rounded-lg border border-slate-700/50">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Average Payout
              </p>
              <p className="text-3xl font-bold text-purple-300 mt-1">$1,570</p>
              <p className="text-xs text-green-400 flex items-center justify-center mt-1">
                <ChevronUp size={12} /> +12% from last year
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <Link
              href="/dashboard/startup/rewards/tax"
              className="text-xs text-slate-400 hover:text-purple-300 inline-flex items-center gap-1"
            >
              <Download size={14} /> Download Tax Statement
            </Link>
            <Link
              href="/dashboard/startup/rewards/analytics"
              className={`text-xs font-medium ${themeAccentText} hover:text-purple-300 inline-flex items-center gap-1`}
            >
              View Detailed Analytics <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component - maintaining consistent styling
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
