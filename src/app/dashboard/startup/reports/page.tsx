"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  Calendar,
  Filter,
  X,
  Shield,
  FileText,
  AlertTriangle,
  Bug,
  BarChart3,
  Settings,
  Eye,
  Clock,
  Activity,
  CheckCircle,
  Users,
  Info,
  Save,
  Loader,
  DollarSign,
  Gift,
} from "lucide-react";
import reportService from "@/services/reportService";
import rewardService, {
  CreateRewardData,
  Reward,
  RewardStatus,
} from "@/services/rewardService";

// Updated enums to match backend
export enum ReportStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  DUPLICATE = "DUPLICATE",
  INFORMATIVE = "INFORMATIVE",
  FIXED = "FIXED",
}

export enum ReportSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

// Updated interface to match backend structure
interface Report {
  id: string;
  title: string;
  description: string;
  status: ReportStatus;
  severity: ReportSeverity;
  impact?: string;
  stepsToReproduce: string;
  proofUrls?: string[];
  fixRecommendation?: string;
  reviewedAt?: string;
  fixedAt?: string;
  reviewNotes?: string;
  createdAt: string;
  updatedAt: string;
  program: {
    id: string;
    title: string;
  };
  reporter: {
    id: string;
    username?: string;
    alias?: string;
  };
  reviewedBy?: {
    id: string;
    username?: string;
  };
}

// --- Styling Helpers ---
const getStatusStyles = (status: ReportStatus) => {
  switch (status) {
    case ReportStatus.PENDING:
      return { color: "text-amber-400", bgColor: "bg-amber-900/50" };
    case ReportStatus.ACCEPTED:
      return { color: "text-green-400", bgColor: "bg-green-900/50" };
    case ReportStatus.REJECTED:
      return { color: "text-red-400", bgColor: "bg-red-900/50" };
    case ReportStatus.DUPLICATE:
      return { color: "text-gray-400", bgColor: "bg-gray-800/50" };
    case ReportStatus.INFORMATIVE:
      return { color: "text-slate-400", bgColor: "bg-slate-800/50" };
    case ReportStatus.FIXED:
      return { color: "text-emerald-400", bgColor: "bg-emerald-900/50" };
    default:
      return { color: "text-gray-400", bgColor: "bg-gray-800/50" };
  }
};

const getSeverityStyles = (severity: ReportSeverity) => {
  switch (severity) {
    case ReportSeverity.CRITICAL:
      return { color: "text-red-400", bgColor: "bg-red-900/50" };
    case ReportSeverity.HIGH:
      return { color: "text-orange-400", bgColor: "bg-orange-900/50" };
    case ReportSeverity.MEDIUM:
      return { color: "text-amber-400", bgColor: "bg-amber-900/50" };
    case ReportSeverity.LOW:
      return { color: "text-blue-400", bgColor: "bg-blue-900/50" };
    default:
      return { color: "text-gray-400", bgColor: "bg-gray-800/50" };
  }
};

// --- Main Reports Dashboard Page ---
export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    status: ReportStatus | null;
    severity: ReportSeverity | null;
    program: string | null;
  }>({
    status: null,
    severity: null,
    program: null,
  });
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [reportRewards, setReportRewards] = useState<Reward[]>([]);
  const [loadingRewards, setLoadingRewards] = useState(false);

  // Fetch reports from the API
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await reportService.getStartupReports();

      let reportsData: Report[] = [];
      if (Array.isArray(response)) {
        reportsData = response;
      } else if (response?.data && Array.isArray(response.data)) {
        reportsData = response.data;
      } else {
        reportsData = [];
      }

      setReports(reportsData);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch reports"
      );
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setShowDetailModal(true);
    fetchReportRewards(report.id);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
    setShowDetailModal(false);
  };

  const fetchReportRewards = async (reportId: string) => {
    try {
      setLoadingRewards(true);
      const response = await rewardService.getRewards();
      let rewardsData: Reward[] = [];

      if (Array.isArray(response)) {
        rewardsData = response;
      } else if (response?.data && Array.isArray(response.data)) {
        rewardsData = response.data;
      } else {
        rewardsData = [];
      }

      // Filter rewards for this specific report
      const filteredRewards = rewardsData.filter(
        (reward) => reward.reportId === reportId
      );
      setReportRewards(filteredRewards);
    } catch (error) {
      console.error("Failed to fetch rewards:", error);
      setReportRewards([]);
    } finally {
      setLoadingRewards(false);
    }
  };

  const handleCreateReward = async (
    reportId: string,
    amount: number,
    description: string
  ) => {
    try {
      if (!selectedReport?.program?.id) {
        throw new Error("Program information not available");
      }

      const rewardData: CreateRewardData = {
        amount,
        description,
        reportId,
        programId: selectedReport.program.id,
      };

      await rewardService.createReward(rewardData);
      await fetchReportRewards(reportId); // Refresh rewards list
    } catch (error) {
      console.error("Failed to create reward:", error);
      throw error;
    }
  };

  const handleStatusUpdate = async (
    reportId: string,
    status: ReportStatus,
    reviewNotes: string,
    rewardAmount?: number // Add optional rewardAmount parameter
  ) => {
    try {
      // Pass the reward amount to the service call
      await reportService.updateReportStatus(
        reportId,
        status,
        reviewNotes,
        rewardAmount
      );
      await fetchReports(); // Refresh the list
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update report status:", error);
      alert("Failed to update report status");
    }
  };

  const handleApproveReward = async (
    rewardId: string,
    approvalNote: string
  ) => {
    try {
      await rewardService.approveReward(rewardId, approvalNote);
      if (selectedReport) {
        await fetchReportRewards(selectedReport.id); // Refresh rewards list
      }
    } catch (error) {
      console.error("Failed to approve reward:", error);
      throw error;
    }
  };

  const handleRejectReward = async (
    rewardId: string,
    rejectionReason: string
  ) => {
    try {
      await rewardService.rejectReward(rewardId, rejectionReason);
      if (selectedReport) {
        await fetchReportRewards(selectedReport.id); // Refresh rewards list
      }
    } catch (error) {
      console.error("Failed to reject reward:", error);
      throw error;
    }
  };

  const handleMarkAsPaid = async (rewardId: string) => {
    try {
      await rewardService.markAsPaid(rewardId);
      if (selectedReport) {
        await fetchReportRewards(selectedReport.id); // Refresh rewards list
      }
    } catch (error) {
      console.error("Failed to mark reward as paid:", error);
      throw error;
    }
  };

  // Get unique programs for filter dropdown
  const reportsArray = Array.isArray(reports) ? reports : [];
  const uniquePrograms = Array.from(
    new Set(
      reportsArray.map((report) => report.program?.title ?? "Unknown Program")
    )
  );

  // Filter reports based on search and filters
  const filteredReports = reportsArray.filter((report) => {
    const matchesSearch =
      !searchTerm ||
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.reporter?.alias || report.reporter?.username || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      !activeFilters.status || report.status === activeFilters.status;
    const matchesSeverity =
      !activeFilters.severity || report.severity === activeFilters.severity;
    const matchesProgram =
      !activeFilters.program ||
      (report.program?.title ?? "Unknown Program") === activeFilters.program;

    return matchesSearch && matchesStatus && matchesSeverity && matchesProgram;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-emerald-500" size={36} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <AlertTriangle className="mx-auto text-red-400 mb-4" size={36} />
        <h3 className="text-xl font-semibold text-slate-300 mb-2">
          Error Loading Reports
        </h3>
        <p className="text-slate-400 max-w-lg mx-auto mb-4">{error}</p>
        <button
          className="px-4 py-2 bg-emerald-600/30 text-emerald-300 rounded-md hover:bg-emerald-600/50 border border-emerald-700/50"
          onClick={fetchReports}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-slate-200 max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Bug size={24} className="text-emerald-400" />
        <h1 className="text-2xl font-bold text-slate-100">
          Vulnerability Reports
        </h1>
        <span className="text-sm bg-slate-700/50 text-slate-300 px-2 py-0.5 rounded-full">
          {filteredReports.length} Total
        </span>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length > 0 ? (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onView={() => handleViewReport(report)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <FileText
              size={48}
              className="mx-auto text-slate-500 mb-3 opacity-50"
            />
            <h3 className="text-xl font-medium text-slate-300 mb-2">
              No reports found
            </h3>
            <p className="text-slate-400 max-w-md mx-auto">
              No vulnerability reports have been submitted yet.
            </p>
          </div>
        )}
      </div>

      {/* Report Detail Modal */}
      {showDetailModal && selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          onClose={handleCloseModal}
          onStatusUpdate={handleStatusUpdate}
          rewards={reportRewards}
          loadingRewards={loadingRewards}
          onCreateReward={handleCreateReward}
          onApproveReward={handleApproveReward}
          onRejectReward={handleRejectReward}
          onMarkAsPaid={handleMarkAsPaid}
        />
      )}
    </div>
  );
}

// -------- Report Card Component --------
const ReportCard: React.FC<{
  report: Report;
  onView: () => void;
}> = ({ report, onView }) => {
  const statusStyles = getStatusStyles(report.status);
  const severityStyles = getSeverityStyles(report.severity);

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

  return (
    <div className="bg-slate-800/80 border border-slate-700/50 rounded-lg p-4 hover:border-emerald-700/40 hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Left: Status indicator */}
        <div className="flex-shrink-0">
          <div
            className={`w-3 h-3 rounded-full ${statusStyles.color.replace(
              "text-",
              "bg-"
            )}`}
          ></div>
        </div>

        {/* Center: Report details */}
        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <span className="text-xs font-mono text-emerald-400">
              {report.id}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${severityStyles.bgColor} ${severityStyles.color} font-medium`}
            >
              {report.severity}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${statusStyles.bgColor} ${statusStyles.color}`}
            >
              {report.status}
            </span>
          </div>
          <h3 className="font-medium text-slate-100 mb-1">{report.title}</h3>
          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Shield size={12} /> {report.program?.title ?? "Unknown Program"}
            </span>
            <span className="flex items-center gap-1">
              <Activity size={12} />{" "}
              {report.reporter?.alias ||
                report.reporter?.username ||
                "Anonymous"}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} /> Submitted {formatTimeAgo(report.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> Updated {formatTimeAgo(report.updatedAt)}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex-shrink-0 flex md:flex-col gap-2 justify-end">
          <button
            onClick={onView}
            className="px-3 py-1 bg-emerald-600/20 text-emerald-300 rounded border border-emerald-600/40 hover:bg-emerald-600/40 transition-colors text-xs flex items-center gap-1"
          >
            <Eye size={12} /> View
          </button>
          <button
            onClick={onView}
            className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded border border-slate-600/50 hover:bg-slate-700 transition-colors text-xs flex items-center gap-1"
          >
            <Settings size={12} /> Manage
          </button>
        </div>
      </div>
    </div>
  );
};

// -------- Report Detail Modal Component --------
const ReportDetailModal: React.FC<{
  report: Report;
  onClose: () => void;
  onStatusUpdate: (
    reportId: string,
    status: ReportStatus,
    reviewNotes: string,
    rewardAmount?: number
  ) => Promise<void>;
  rewards: Reward[];
  loadingRewards: boolean;
  onCreateReward: (
    reportId: string,
    amount: number,
    description: string
  ) => Promise<void>;
  onApproveReward: (rewardId: string, approvalNote: string) => Promise<void>;
  onRejectReward: (rewardId: string, rejectionReason: string) => Promise<void>;
  onMarkAsPaid: (rewardId: string) => Promise<void>;
}> = ({
  report,
  onClose,
  onStatusUpdate,
  rewards,
  loadingRewards,
  onCreateReward,
  onApproveReward,
  onRejectReward,
  onMarkAsPaid,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<ReportStatus>(
    report.status
  );
  const [reviewNotes, setReviewNotes] = useState(report.reviewNotes || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [showCreateReward, setShowCreateReward] = useState(false);
  const [rewardAmount, setRewardAmount] = useState("");
  const [rewardDescription, setRewardDescription] = useState("");
  const [creatingReward, setCreatingReward] = useState(false);
  const [directReward, setDirectReward] = useState<string>(""); // New state for direct reward amount

  // Add direct reward toggle
  const [useDirectReward, setUseDirectReward] = useState(false);

  const handleStatusUpdate = async () => {
    if (
      selectedStatus === report.status &&
      reviewNotes === (report.reviewNotes || "") &&
      !useDirectReward
    ) {
      return; // No changes
    }

    setIsUpdating(true);
    try {
      // Pass reward amount if using direct reward
      const rewardAmountValue = useDirectReward
        ? parseFloat(directReward)
        : undefined;
      await onStatusUpdate(
        report.id,
        selectedStatus,
        reviewNotes,
        rewardAmountValue
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCreateRewardSubmit = async () => {
    if (!rewardAmount || !rewardDescription) return;

    setCreatingReward(true);
    try {
      await onCreateReward(
        report.id,
        parseFloat(rewardAmount),
        rewardDescription
      );
      setShowCreateReward(false);
      setRewardAmount("");
      setRewardDescription("");
    } catch (error) {
      alert("Failed to create reward");
    } finally {
      setCreatingReward(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center">
          <h2 className="text-lg font-medium text-slate-200">
            Report Details - {report.id}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Title & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <h1 className="text-xl font-semibold text-slate-100">
              {report.title}
            </h1>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-medium ${
                  getStatusStyles(report.status).color
                }`}
              >
                {report.status}
              </span>
              <span
                className={`text-sm font-medium ${
                  getSeverityStyles(report.severity).color
                }`}
              >
                {report.severity}
              </span>
            </div>
          </div>

          {/* Meta Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
              <p className="text-xs text-slate-400 mb-1">Program</p>
              <p className="text-slate-100">
                {report.program?.title ?? "Unknown Program"}
              </p>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
              <p className="text-xs text-slate-400 mb-1">Reporter</p>
              <p className="text-slate-100">
                {report.reporter?.alias ||
                  report.reporter?.username ||
                  "Anonymous"}
              </p>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
              <p className="text-xs text-slate-400 mb-1">Submitted</p>
              <p className="text-slate-100">
                {new Date(report.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
              <p className="text-xs text-slate-400 mb-1">Updated</p>
              <p className="text-slate-100">
                {new Date(report.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-slate-300 font-medium mb-2">Description</h3>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
              <p className="text-slate-300">{report.description}</p>
            </div>
          </div>

          {/* Steps to Reproduce */}
          <div>
            <h3 className="text-slate-300 font-medium mb-2">
              Steps to Reproduce
            </h3>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
              <p className="text-slate-300 whitespace-pre-line">
                {report.stepsToReproduce}
              </p>
            </div>
          </div>

          {/* Rewards Section */}
          {(report.status === ReportStatus.ACCEPTED || rewards.length > 0) && (
            <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-emerald-300 font-medium flex items-center gap-2">
                  <DollarSign size={18} />
                  Rewards Management
                </h3>
                {report.status === ReportStatus.ACCEPTED &&
                  !showCreateReward && (
                    <button
                      onClick={() => setShowCreateReward(true)}
                      className="px-3 py-1.5 bg-emerald-600/30 text-emerald-300 rounded-md hover:bg-emerald-600/50 text-sm flex items-center gap-1"
                    >
                      <Gift size={14} />
                      Create Reward
                    </button>
                  )}
              </div>

              {/* Create Reward Form */}
              {showCreateReward && (
                <div className="bg-slate-800/50 rounded-lg p-4 mb-4 border border-slate-700/50">
                  <h4 className="text-slate-300 font-medium mb-3">
                    Create New Reward
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">
                        Amount ($)
                      </label>
                      <input
                        type="number"
                        value={rewardAmount}
                        onChange={(e) => setRewardAmount(e.target.value)}
                        className="w-full bg-slate-700/70 border border-slate-600/60 text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        placeholder="Enter reward amount"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={rewardDescription}
                        onChange={(e) => setRewardDescription(e.target.value)}
                        className="w-full bg-slate-700/70 border border-slate-600/60 text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        placeholder="Reward description"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCreateRewardSubmit}
                        disabled={
                          creatingReward || !rewardAmount || !rewardDescription
                        }
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {creatingReward ? (
                          <>
                            <Loader className="animate-spin" size={16} />
                            Creating...
                          </>
                        ) : (
                          "Create Reward"
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setShowCreateReward(false);
                          setRewardAmount("");
                          setRewardDescription("");
                        }}
                        className="px-4 py-2 border border-slate-700 rounded-md text-slate-300 hover:bg-slate-800"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Existing Rewards */}
              <div className="space-y-3">
                {loadingRewards ? (
                  <div className="flex items-center gap-2 text-slate-400">
                    <Loader className="animate-spin" size={16} />
                    Loading rewards...
                  </div>
                ) : rewards.length > 0 ? (
                  rewards.map((reward) => (
                    <RewardCard
                      key={reward.id}
                      reward={reward}
                      onApprove={onApproveReward}
                      onReject={onRejectReward}
                      onMarkAsPaid={onMarkAsPaid}
                    />
                  ))
                ) : (
                  <p className="text-slate-400 text-sm">
                    No rewards created yet.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Status Management */}
          <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-lg p-6">
            <h3 className="text-emerald-300 font-medium mb-4">
              Report Management
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) =>
                    setSelectedStatus(e.target.value as ReportStatus)
                  }
                  className="w-full bg-slate-700/70 border border-slate-600/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value={ReportStatus.PENDING}>Pending</option>
                  <option value={ReportStatus.ACCEPTED}>Accepted</option>
                  <option value={ReportStatus.REJECTED}>Rejected</option>
                  <option value={ReportStatus.DUPLICATE}>Duplicate</option>
                  <option value={ReportStatus.INFORMATIVE}>Informative</option>
                  <option value={ReportStatus.FIXED}>Fixed</option>
                </select>
              </div>

              {/* Direct reward section - only shown when accepting a report */}
              {selectedStatus === ReportStatus.ACCEPTED && (
                <div className="bg-emerald-900/30 rounded-lg p-4 border border-emerald-800/40">
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id="direct-reward-toggle"
                      checked={useDirectReward}
                      onChange={() => setUseDirectReward(!useDirectReward)}
                      className="mr-2 accent-emerald-500"
                    />
                    <label
                      htmlFor="direct-reward-toggle"
                      className="text-sm font-medium text-emerald-300 cursor-pointer"
                    >
                      Add Direct Reward with Status Update
                    </label>
                  </div>

                  {useDirectReward && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-slate-300 mb-1">
                          Reward Amount ($)
                        </label>
                        <input
                          type="number"
                          value={directReward}
                          onChange={(e) => setDirectReward(e.target.value)}
                          className="w-full bg-slate-700/70 border border-slate-600/60 text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                          placeholder="Enter reward amount"
                        />
                        <p className="text-xs text-emerald-400/70 mt-1">
                          This reward will be processed directly with the report
                          status update
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Review Notes
                </label>
                <textarea
                  rows={4}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="w-full bg-slate-700/70 border border-slate-600/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  placeholder="Add review notes for the reporter..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-700 rounded-md text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusUpdate}
                  disabled={
                    isUpdating ||
                    (useDirectReward &&
                      (!directReward || parseFloat(directReward) <= 0))
                  }
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isUpdating ? (
                    <>
                      <Loader className="animate-spin" size={16} />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      {useDirectReward
                        ? `Update & Add $${directReward || 0} Reward`
                        : "Update Report"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------- Reward Card Component --------
const RewardCard: React.FC<{
  reward: Reward;
  onApprove: (rewardId: string, approvalNote: string) => Promise<void>;
  onReject: (rewardId: string, rejectionReason: string) => Promise<void>;
  onMarkAsPaid: (rewardId: string) => Promise<void>;
}> = ({ reward, onApprove, onReject, onMarkAsPaid }) => {
  const [processing, setProcessing] = useState(false);

  const handleApprove = async () => {
    const note = prompt("Add approval note (optional):") || "";
    setProcessing(true);
    try {
      await onApprove(reward.id, note);
    } catch (error) {
      alert("Failed to approve reward");
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    const reason = prompt("Rejection reason:");
    if (!reason) return;

    setProcessing(true);
    try {
      await onReject(reward.id, reason);
    } catch (error) {
      alert("Failed to reject reward");
    } finally {
      setProcessing(false);
    }
  };

  const handleMarkPaid = async () => {
    if (!confirm("Mark this reward as paid?")) return;
    setProcessing(true);
    try {
      await onMarkAsPaid(reward.id);
    } catch (error) {
      alert("Failed to mark reward as paid");
    } finally {
      setProcessing(false);
    }
  };

  const getRewardStatusColor = (status: RewardStatus) => {
    switch (status) {
      case RewardStatus.PENDING:
        return "text-amber-400 bg-amber-900/50";
      case RewardStatus.APPROVED:
        return "text-green-400 bg-green-900/50";
      case RewardStatus.REJECTED:
        return "text-red-400 bg-red-900/50";
      case RewardStatus.PAID:
        return "text-emerald-400 bg-emerald-900/50";
      default:
        return "text-gray-400 bg-gray-900/50";
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-emerald-300">
            ${reward.amount.toLocaleString()}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${getRewardStatusColor(
              reward.status
            )}`}
          >
            {reward.status}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {reward.status === RewardStatus.PENDING && (
            <>
              <button
                onClick={handleApprove}
                disabled={processing}
                className="px-3 py-1 bg-green-600/30 text-green-300 rounded text-sm hover:bg-green-600/50 disabled:opacity-50"
              >
                Approve
              </button>
              <button
                onClick={handleReject}
                disabled={processing}
                className="px-3 py-1 bg-red-600/30 text-red-300 rounded text-sm hover:bg-red-600/50 disabled:opacity-50"
              >
                Reject
              </button>
            </>
          )}
          {reward.status === RewardStatus.APPROVED && (
            <button
              onClick={handleMarkPaid}
              disabled={processing}
              className="px-3 py-1 bg-emerald-600/30 text-emerald-300 rounded text-sm hover:bg-emerald-600/50 disabled:opacity-50"
            >
              {processing ? "Processing..." : "Mark Paid"}
            </button>
          )}
        </div>
      </div>

      <p className="text-slate-300 text-sm mb-2">{reward.description}</p>

      <div className="text-xs text-slate-400">
        Created: {new Date(reward.createdAt).toLocaleDateString()}
        {reward.approvedAt && (
          <span className="ml-3">
            Approved: {new Date(reward.approvedAt).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Approval/Rejection Notes */}
      {reward.approvalNote && (
        <div className="mt-2 text-xs text-green-300">
          Approval note: {reward.approvalNote}
        </div>
      )}
      {reward.rejectionReason && (
        <div className="mt-2 text-xs text-red-300">
          Rejection reason: {reward.rejectionReason}
        </div>
      )}
    </div>
  );
};

// -------- Filter Dropdown Component --------
const FilterDropdown: React.FC<{
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  themeColor: string;
}> = ({ label, options, value, onChange, themeColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className="relative">
      <div
        onClick={handleToggle}
        className={`flex items-center gap-2 bg-slate-700/60 border border-slate-600/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 hover:border-${themeColor}-600/60 hover:bg-slate-700/80 focus:outline-none focus:ring-1 focus:ring-${themeColor}-500/80 transition-all ${
          isOpen ? "ring-1 ring-emerald-500/80" : ""
        }`}
      >
        <span className="font-medium text-white">{value}</span>
        <span className="hidden sm:inline">{label}:</span>{" "}
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div
          className={`absolute z-20 mt-1.5 max-h-60 w-48 overflow-auto bg-slate-800/95 backdrop-blur-md border border-slate-700/70 rounded-lg shadow-xl py-1 text-xs`}
        >
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => handleOptionClick(option)}
              className={`px-3.5 py-2 hover:bg-${themeColor}-700/20 cursor-pointer text-slate-300 ${
                value === option
                  ? `bg-${themeColor}-800/40 text-${themeColor}-300 font-medium`
                  : "hover:text-white"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
