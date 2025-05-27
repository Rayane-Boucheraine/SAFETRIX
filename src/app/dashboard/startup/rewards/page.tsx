"use client";

import React from "react";
import {
  Award,
  BarChart3,
  Clock,
  CreditCard,
  Landmark,
  PlusCircle,
  Wallet,
} from "lucide-react";

export default function RewardPage() {
  const gradientBg =
    "bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#195033_6.63%,#080808_100%)]";

  const cardBaseStyle =
    "bg-slate-900/70 backdrop-blur-md border border-green-900/30 shadow-xl rounded-xl p-5 relative overflow-hidden isolate group";

  const headerStyle =
    "text-lg font-bold text-slate-100 mb-4 flex items-center gap-2 relative z-10";

  const themeAccentText = "text-emerald-400";

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
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-green-800/40 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-emerald-800/30 to-slate-900 rounded-xl border border-emerald-600/60 shadow-lg">
              <Award size={28} className={themeAccentText} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-100 tracking-tight">
                Rewards & Payouts
              </h1>
              <p className="text-slate-400 mt-1 text-sm">
                Manage your bounty rewards, payment methods and payout history.
              </p>
            </div>
          </div>
          <button className="inline-flex items-center group gap-2 px-4 py-2 bg-emerald-600 border border-emerald-500/80 text-white text-sm font-medium rounded-md hover:bg-emerald-700 hover:border-emerald-400 transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap">
            <Wallet size={16} /> Add Payment Method
          </button>
        </div>

        {/* Recent Payouts Section */}
        <div className={cardBaseStyle}>
          <h2 className={headerStyle}>
            <CreditCard className={themeAccentText} size={20} /> Recent Payouts
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-slate-700/50">
                  <th className="pb-3 font-medium text-slate-400">ID</th>
                  <th className="pb-3 font-medium text-slate-400">Amount</th>
                  <th className="pb-3 font-medium text-slate-400">Date</th>
                  <th className="pb-3 font-medium text-slate-400">Method</th>
                  <th className="pb-3 font-medium text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPayouts.map((payout) => (
                  <tr
                    key={payout.id}
                    className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-3 font-mono text-xs text-emerald-400">
                      {payout.id}
                    </td>
                    <td className="py-3 font-semibold text-emerald-300">
                      {payout.amount}
                    </td>
                    <td className="py-3 text-slate-300">{payout.date}</td>
                    <td className="py-3 text-slate-300">{payout.method}</td>
                    <td className="py-3">
                      <span className="px-2 py-1 text-xs font-medium bg-green-900/30 text-green-400 rounded-full">
                        {payout.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Payouts & Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pending Payouts */}
          <div className={cardBaseStyle}>
            <h2 className={headerStyle}>
              <Clock className={themeAccentText} size={20} /> Pending Payouts
            </h2>

            {pendingPayouts.length > 0 ? (
              <div className="space-y-4">
                {pendingPayouts.map((payout) => (
                  <div
                    key={payout.id}
                    className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-xs text-emerald-400">
                        {payout.id}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-900/30 text-yellow-400 rounded-full">
                        {payout.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-slate-300">Amount:</span>
                      <span className="text-xl font-semibold text-emerald-300">
                        {payout.amount}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">
                        Requested: {payout.requestDate}
                      </span>
                      <span className="text-slate-300">
                        Est. Completion: {payout.estimatedDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700/50 text-center">
                <Clock size={32} className="mx-auto text-slate-600 mb-3" />
                <p className="text-slate-400">
                  No pending payouts at this time
                </p>
              </div>
            )}
          </div>

          {/* Payment Methods */}
          <div className={cardBaseStyle}>
            <h2 className={headerStyle}>
              <Wallet className={themeAccentText} size={20} /> Payment Methods
            </h2>

            <div className="space-y-4">
              {paymentMethods.map((method, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 flex justify-between items-center"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      {method.type === "PayPal" ? (
                        <CreditCard size={18} className="text-blue-400" />
                      ) : (
                        <Landmark size={18} className="text-slate-400" />
                      )}
                      <span className="font-medium text-slate-200">
                        {method.type}
                      </span>
                      {method.primary && (
                        <span className="bg-emerald-900/30 text-emerald-400 text-xs px-2 py-0.5 rounded-full">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">
                      {method.type === "PayPal" ? method.email : method.info}
                    </p>
                  </div>
                  <button className="text-xs border border-slate-600 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 px-2.5 py-1 rounded transition-colors">
                    Edit
                  </button>
                </div>
              ))}

              <button className="w-full py-2.5 border border-dashed border-slate-600 hover:border-emerald-500/50 rounded-lg text-slate-400 hover:text-emerald-400 text-sm flex items-center justify-center gap-2 transition-colors">
                <PlusCircle size={16} />
                Add New Method
              </button>
            </div>
          </div>
        </div>

        {/* Payout History Chart Placeholder */}
        <div className={cardBaseStyle}>
          <h2 className={headerStyle}>
            <BarChart3 className={themeAccentText} size={20} /> Payout History
          </h2>
          <div className="h-64 flex items-center justify-center text-slate-500 text-sm bg-slate-800/40 rounded-lg border border-slate-700/50">
            [Chart Placeholder: Monthly payout history visualization]
          </div>
        </div>
      </div>
    </div>
  );
}
