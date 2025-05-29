"use client";

import React, { useState, useEffect } from "react";
import {
  Award,
  BarChart3,
  Clock,
  CreditCard,
  Landmark,
  PlusCircle,
  Wallet,
  Loader,
  Check,
  X,
  AlertCircle,
  DollarSign,
} from "lucide-react";
import rewardService, { Reward, RewardStatus } from "@/services/rewardService";

export default function RewardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingRewards, setPendingRewards] = useState<Reward[]>([]);
  const [completedRewards, setCompletedRewards] = useState<Reward[]>([]);

  // Payment Methods - static for now
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

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await rewardService.getRewards();

      // Handle different response structures
      let rewardsArray: Reward[] = [];
      if (Array.isArray(response)) {
        rewardsArray = response;
      } else if (response?.data && Array.isArray(response.data)) {
        rewardsArray = response.data;
      } else {
        console.error("Unexpected rewards response structure:", response);
        rewardsArray = [];
      }

      // Filter rewards by status
      setPendingRewards(
        rewardsArray.filter((reward) => reward.status === RewardStatus.PENDING)
      );

      setCompletedRewards(
        rewardsArray
          .filter((reward) =>
            [RewardStatus.APPROVED, RewardStatus.PAID].includes(reward.status)
          )
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
      );
    } catch (error) {
      console.error("Failed to fetch rewards:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch rewards"
      );
      // Set empty arrays on error
      setPendingRewards([]);
      setCompletedRewards([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveReward = async (id: string) => {
    if (!confirm("Are you sure you want to approve this reward?")) return;

    try {
      await rewardService.approveReward(id, "Approved by startup");
      fetchRewards(); // Refresh rewards list
    } catch (error) {
      console.error("Failed to approve reward:", error);
      alert(
        error instanceof Error ? error.message : "Failed to approve reward"
      );
    }
  };

  const handleRejectReward = async (id: string) => {
    const reason = prompt("Please provide a reason for rejecting this reward:");
    if (!reason) return;

    try {
      await rewardService.rejectReward(id, reason);
      fetchRewards(); // Refresh rewards list
    } catch (error) {
      console.error("Failed to reject reward:", error);
      alert(error instanceof Error ? error.message : "Failed to reject reward");
    }
  };

  const handleMarkAsPaid = async (id: string) => {
    if (!confirm("Are you sure you want to mark this reward as paid?")) return;

    try {
      await rewardService.markAsPaid(id);
      fetchRewards(); // Refresh rewards list
    } catch (error) {
      console.error("Failed to mark reward as paid:", error);
      alert(
        error instanceof Error ? error.message : "Failed to mark reward as paid"
      );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getStatusBadge = (status: RewardStatus) => {
    switch (status) {
      case RewardStatus.PENDING:
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-900/30 text-yellow-400 rounded-full">
            Pending
          </span>
        );
      case RewardStatus.APPROVED:
        return (
          <span className="px-2 py-1 text-xs font-medium bg-blue-900/30 text-blue-400 rounded-full">
            Approved
          </span>
        );
      case RewardStatus.REJECTED:
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-900/30 text-red-400 rounded-full">
            Rejected
          </span>
        );
      case RewardStatus.PAID:
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-900/30 text-green-400 rounded-full">
            Paid
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium bg-slate-900/30 text-slate-400 rounded-full">
            {status}
          </span>
        );
    }
  };

  const gradientBg =
    "bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#195033_6.63%,#080808_100%)]";
  const cardBaseStyle =
    "bg-slate-900/70 backdrop-blur-md border border-green-900/30 shadow-xl rounded-xl p-5 relative overflow-hidden isolate group";
  const headerStyle =
    "text-lg font-bold text-slate-100 mb-4 flex items-center gap-2 relative z-10";
  const themeAccentText = "text-emerald-400";

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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center gap-4">
              <Loader className="animate-spin text-emerald-500" size={36} />
              <p className="text-slate-400">Loading rewards...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle
              className="text-red-400 flex-shrink-0 mt-0.5"
              size={20}
            />
            <div>
              <h3 className="text-red-300 font-medium">
                Error Loading Rewards
              </h3>
              <p className="text-red-200 text-sm mt-1">{error}</p>
              <button
                onClick={fetchRewards}
                className="mt-2 px-3 py-1 bg-red-900/30 text-red-300 rounded hover:bg-red-800/40 text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Pending Rewards Section */}
            <div className={cardBaseStyle}>
              <h2 className={headerStyle}>
                <Clock className={themeAccentText} size={20} /> Pending Rewards
              </h2>

              {pendingRewards.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left border-b border-slate-700/50">
                        <th className="pb-3 font-medium text-slate-400">ID</th>
                        <th className="pb-3 font-medium text-slate-400">
                          Amount
                        </th>
                        <th className="pb-3 font-medium text-slate-400">
                          Researcher
                        </th>
                        <th className="pb-3 font-medium text-slate-400">
                          Program
                        </th>
                        <th className="pb-3 font-medium text-slate-400">
                          Submitted
                        </th>
                        <th className="pb-3 font-medium text-slate-400">
                          Status
                        </th>
                        <th className="pb-3 font-medium text-slate-400">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingRewards.map((reward) => (
                        <tr
                          key={reward.id}
                          className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="py-3 font-mono text-xs text-emerald-400">
                            {reward.id.slice(0, 8)}
                          </td>
                          <td className="py-3 font-semibold text-emerald-300">
                            ${reward.amount.toLocaleString()}
                          </td>
                          <td className="py-3 text-slate-300">
                            {reward.reporter.alias ||
                              reward.reporter.username ||
                              "Unknown"}
                          </td>
                          <td className="py-3 text-slate-300">
                            {reward.program.title}
                          </td>
                          <td className="py-3 text-slate-300">
                            {formatDate(reward.createdAt)}
                          </td>
                          <td className="py-3">
                            {getStatusBadge(reward.status)}
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleApproveReward(reward.id)}
                                className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-900/30 rounded"
                                title="Approve Reward"
                              >
                                <Check size={16} />
                              </button>
                              <button
                                onClick={() => handleRejectReward(reward.id)}
                                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-900/30 rounded"
                                title="Reject Reward"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700/50 text-center">
                  <Clock size={32} className="mx-auto text-slate-600 mb-3" />
                  <p className="text-slate-400">
                    No pending rewards at this time
                  </p>
                </div>
              )}
            </div>

            {/* Completed Rewards Section */}
            <div className={cardBaseStyle}>
              <h2 className={headerStyle}>
                <Check className={themeAccentText} size={20} /> Completed
                Rewards
              </h2>

              {completedRewards.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left border-b border-slate-700/50">
                        <th className="pb-3 font-medium text-slate-400">ID</th>
                        <th className="pb-3 font-medium text-slate-400">
                          Amount
                        </th>
                        <th className="pb-3 font-medium text-slate-400">
                          Researcher
                        </th>
                        <th className="pb-3 font-medium text-slate-400">
                          Program
                        </th>
                        <th className="pb-3 font-medium text-slate-400">
                          Date
                        </th>
                        <th className="pb-3 font-medium text-slate-400">
                          Status
                        </th>
                        <th className="pb-3 font-medium text-slate-400">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedRewards.map((reward) => (
                        <tr
                          key={reward.id}
                          className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="py-3 font-mono text-xs text-emerald-400">
                            {reward.id.slice(0, 8)}
                          </td>
                          <td className="py-3 font-semibold text-emerald-300">
                            ${reward.amount.toLocaleString()}
                          </td>
                          <td className="py-3 text-slate-300">
                            {reward.reporter.alias ||
                              reward.reporter.username ||
                              "Unknown"}
                          </td>
                          <td className="py-3 text-slate-300">
                            {reward.program.title}
                          </td>
                          <td className="py-3 text-slate-300">
                            {formatDate(reward.approvedAt || reward.updatedAt)}
                          </td>
                          <td className="py-3">
                            {getStatusBadge(reward.status)}
                          </td>
                          <td className="py-3">
                            {reward.status === RewardStatus.APPROVED && (
                              <button
                                onClick={() => handleMarkAsPaid(reward.id)}
                                className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-900/30 rounded flex items-center gap-1.5"
                                title="Mark as Paid"
                              >
                                <DollarSign size={16} />
                                <span className="text-xs">Mark Paid</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700/50 text-center">
                  <Award size={32} className="mx-auto text-slate-600 mb-3" />
                  <p className="text-slate-400">No completed rewards yet</p>
                </div>
              )}
            </div>

            {/* Payment Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={cardBaseStyle}>
                <h2 className={headerStyle}>
                  <Wallet className={themeAccentText} size={20} /> Payment
                  Methods
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
                          {method.type === "PayPal"
                            ? method.email
                            : method.info}
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

              {/* Reward Statistics */}
              <div className={cardBaseStyle}>
                <h2 className={headerStyle}>
                  <BarChart3 className={themeAccentText} size={20} /> Reward
                  Statistics
                </h2>

                <div className="space-y-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="text-sm text-slate-400 mb-1">
                      Total Rewards Paid
                    </div>
                    <div className="text-2xl font-bold text-emerald-300">
                      $
                      {completedRewards
                        .filter((r) => r.status === RewardStatus.PAID)
                        .reduce((sum, reward) => sum + reward.amount, 0)
                        .toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="text-sm text-slate-400 mb-1">
                      Pending Approvals
                    </div>
                    <div className="text-2xl font-bold text-amber-300">
                      $
                      {pendingRewards
                        .reduce((sum, reward) => sum + reward.amount, 0)
                        .toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="text-sm text-slate-400 mb-1">
                      Approved (Unpaid)
                    </div>
                    <div className="text-2xl font-bold text-blue-300">
                      $
                      {completedRewards
                        .filter((r) => r.status === RewardStatus.APPROVED)
                        .reduce((sum, reward) => sum + reward.amount, 0)
                        .toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
