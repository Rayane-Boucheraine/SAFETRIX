"use client";

import React, { useState, useEffect } from "react";
import { AxiosError } from "axios";
import {
  Globe,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Lock,
  Wifi,
  Database,
  Code,
  Shield,
  Download,
  RotateCcw,
  Loader,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import testingService, {
  ScanStatus,
  VulnerabilitySeverity,
  TestingResult,
  CreateTestingDto,
  TestingStatistics,
  UserTestingStatistics,
} from "@/services/testingService";

const TestingPage = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [vulnerabilityType, setVulnerabilityType] = useState("Web Application");
  const [selectedTests, setSelectedTests] = useState<string[]>([
    "ssl",
    "xss",
    "sqli",
    "csrf",
  ]);
  const [severity, setSeverity] = useState<VulnerabilitySeverity>(
    VulnerabilitySeverity.MEDIUM
  );
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<TestingResult[]>([]);
  const [stats, setStats] = useState<TestingStatistics | null>(null);
  const [userStats, setUserStats] = useState<UserTestingStatistics | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoadingResults, setIsLoadingResults] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    fetchTestResults();
    fetchStatistics();
    fetchUserStats();
  }, []);

  const fetchTestResults = async () => {
    try {
      setIsLoadingResults(true);
      setError(null);
      const data = await testingService.getMyTests();
      setResults(data);
    } catch (err) {
      console.error("Error fetching test results:", err);
      setError("Failed to load vulnerability test results");
    } finally {
      setIsLoadingResults(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      setIsLoadingStats(true);
      const statistics = await testingService.getStatistics();
      setStats(statistics);
    } catch (err) {
      console.error("Error fetching statistics:", err);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const statistics = await testingService.getUserTestingStatistics();
      setUserStats(statistics);
    } catch (err) {
      console.error("Error fetching user statistics:", err);
    }
  };

  const testTypes = [
    { id: "ssl", name: "SSL/TLS Security", icon: Lock, color: "emerald" },
    { id: "xss", name: "XSS Vulnerabilities", icon: Code, color: "red" },
    { id: "sqli", name: "SQL Injection", icon: Database, color: "orange" },
    { id: "csrf", name: "CSRF Protection", icon: Shield, color: "blue" },
    { id: "headers", name: "Security Headers", icon: Wifi, color: "purple" },
    { id: "ports", name: "Port Scanning", icon: Search, color: "indigo" },
  ];

  const handleTestToggle = (testId: string) => {
    setSelectedTests((prev) =>
      prev.includes(testId)
        ? prev.filter((id) => id !== testId)
        : [...prev, testId]
    );
  };

  const handleStartTest = async () => {
    if (!url || !title || selectedTests.length === 0 || !vulnerabilityType) {
      setError(
        "Please provide a title, URL, vulnerability type, and select at least one test type"
      );
      return;
    }

    // Validate URL format
    try {
      // Make sure URL has http or https protocol
      let formattedUrl = url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        formattedUrl = `https://${url}`;
      }

      // Validate as URL
      new URL(formattedUrl);

      try {
        setIsLoading(true);
        setError(null);

        // Create test request data with corrected field names
        const createTestDto: CreateTestingDto = {
          title,
          description,
          targetUrl: formattedUrl,
          vulnerabilityType,
          severity,
          testTypes: selectedTests,
        };

        // Submit the test to the API
        await testingService.submitTest(createTestDto);

        // Reset form and refresh results
        setUrl("");
        setTitle("");
        setDescription("");
        setVulnerabilityType("Web Application");
        setSeverity(VulnerabilitySeverity.MEDIUM);

        // Refresh data
        await fetchTestResults();
        await fetchStatistics();
        await fetchUserStats();
      } catch (err: unknown) {
        console.error("Error starting test:", err);

        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as AxiosError<{ message: string | string[] }>;
          // Check if there are validation error messages
          if (Array.isArray(axiosError.response?.data?.message)) {
            setError(axiosError.response.data.message.join(", "));
          } else {
            setError(
              axiosError.response?.data?.message ||
                "Failed to start vulnerability test"
            );
          }
        } else {
          setError("Failed to start vulnerability test");
        }
      } finally {
        setIsLoading(false);
      }
    } catch {
      setError("Please enter a valid URL");
    }
  };

  const handleVerifyTest = async (id: string) => {
    try {
      await testingService.verifyTest(id);
      await fetchTestResults();
      await fetchStatistics();
      await fetchUserStats();
    } catch (err) {
      console.error("Error verifying test:", err);
      alert("Failed to verify test");
    }
  };

  const handleUpdateStatus = async (id: string, status: ScanStatus) => {
    try {
      await testingService.updateStatus(id, status);
      await fetchTestResults();
      await fetchUserStats();
    } catch (err) {
      console.error("Error updating test status:", err);
      alert("Failed to update test status");
    }
  };

  const exportResults = async (result: TestingResult) => {
    try {
      // Get detailed results before exporting
      const details = await testingService.getTestDetails(result.id);

      const data = {
        id: result.id,
        title: result.title,
        url: result.targetUrl,
        severity: result.severity,
        status: result.status,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        isVerified: result.isVerified,
        testTypes: result.testTypes,
        results: details?.detailedResults || result.results,
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `security-report-${result.id}.json`;
      a.click();
    } catch (err) {
      console.error("Error exporting results:", err);
      alert("Failed to export test results");
    }
  };

  const getScoreColor = (severity: VulnerabilitySeverity) => {
    switch (severity) {
      case VulnerabilitySeverity.LOW:
        return "text-blue-400";
      case VulnerabilitySeverity.MEDIUM:
        return "text-yellow-400";
      case VulnerabilitySeverity.HIGH:
        return "text-orange-400";
      case VulnerabilitySeverity.CRITICAL:
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status: ScanStatus) => {
    switch (status) {
      case ScanStatus.PENDING:
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case ScanStatus.IN_PROGRESS:
        return <Clock className="h-4 w-4 text-yellow-400 animate-spin" />;
      case ScanStatus.COMPLETED:
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case ScanStatus.FAILED:
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-xl border border-green-600/40">
          <Target className="h-8 w-8 text-green-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">
            Vulnerability Testing
          </h1>
          <p className="text-gray-400">
            Comprehensive security assessment for your web applications
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      {!isLoadingStats && stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-green-800/30 p-4">
            <p className="text-sm text-gray-400">Total Tests</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>

          <div className="bg-red-900/20 border border-red-800/30 rounded-xl p-4">
            <p className="text-sm text-gray-400">Critical</p>
            <p className="text-2xl font-bold text-red-400">
              {stats.bySeverity.critical}
            </p>
          </div>

          <div className="bg-orange-900/20 border border-orange-800/30 rounded-xl p-4">
            <p className="text-sm text-gray-400">High</p>
            <p className="text-2xl font-bold text-orange-400">
              {stats.bySeverity.high}
            </p>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-xl p-4">
            <p className="text-sm text-gray-400">Medium</p>
            <p className="text-2xl font-bold text-yellow-400">
              {stats.bySeverity.medium}
            </p>
          </div>

          <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-4">
            <p className="text-sm text-gray-400">Low</p>
            <p className="text-2xl font-bold text-blue-400">
              {stats.bySeverity.low}
            </p>
          </div>
        </div>
      )}

      {/* User Stats Overview */}
      {userStats && (
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-green-800/30 p-4">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-green-400" size={20} />
            <h2 className="text-lg font-semibold text-white">
              Testing Overview
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Completed Tests</p>
              <p className="text-xl font-semibold text-green-400">
                {userStats.testsByStatus.completed}
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">In Progress</p>
              <p className="text-xl font-semibold text-yellow-400">
                {userStats.testsByStatus.inProgress}
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">
                Total Vulnerabilities
              </p>
              <p className="text-xl font-semibold text-purple-400">
                {userStats.vulnerabilitiesByType.total}
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Critical Findings</p>
              <p className="text-xl font-semibold text-red-400">
                {userStats.vulnerabilitiesByType.critical}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle
            className="text-red-500 flex-shrink-0 mt-0.5"
            size={20}
          />
          <div>
            <h3 className="text-red-400 font-medium">Error</h3>
            <p className="text-red-300 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Testing Form */}
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-green-800/30 p-8">
        <div className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Test Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title of the vulnerability test"
              className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
            />
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target URL <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
              />
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Must be a valid URL with http:// or https://
            </p>
          </div>

          {/* Vulnerability Type Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Vulnerability Type <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={vulnerabilityType}
              onChange={(e) => setVulnerabilityType(e.target.value)}
              placeholder="E.g., XSS, CSRF, SQL Injection"
              className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about what to test"
              rows={3}
              className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
            />
          </div>

          {/* Severity Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Severity <span className="text-red-400">*</span>
            </label>
            <select
              value={severity}
              onChange={(e) =>
                setSeverity(e.target.value as VulnerabilitySeverity)
              }
              className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
            >
              <option value={VulnerabilitySeverity.LOW}>Low</option>
              <option value={VulnerabilitySeverity.MEDIUM}>Medium</option>
              <option value={VulnerabilitySeverity.HIGH}>High</option>
              <option value={VulnerabilitySeverity.CRITICAL}>Critical</option>
              <option value={VulnerabilitySeverity.INFO}>Info</option>
            </select>
          </div>

          {/* Test Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-gray-300">
                Select Tests ({selectedTests.length} selected){" "}
                <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTests(testTypes.map((t) => t.id))}
                  className="text-xs px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Select All
                </button>
                <button
                  onClick={() => setSelectedTests([])}
                  className="text-xs px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testTypes.map((test) => {
                const Icon = test.icon;
                const isSelected = selectedTests.includes(test.id);
                return (
                  <button
                    key={test.id}
                    onClick={() => handleTestToggle(test.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-green-500 bg-green-900/20"
                        : "border-gray-700 bg-gray-800/40 hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          isSelected ? "bg-green-900/40" : "bg-gray-700/50"
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${
                            isSelected ? "text-green-400" : "text-gray-400"
                          }`}
                        />
                      </div>
                      <span
                        className={`font-medium ${
                          isSelected ? "text-white" : "text-gray-300"
                        }`}
                      >
                        {test.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Start Test Button */}
          <button
            onClick={handleStartTest}
            disabled={!url || !title || selectedTests.length === 0 || isLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                Submitting Test...
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Start Security Test
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-green-800/30 p-8">
        <h2 className="text-xl font-bold text-white mb-6">
          Test Results {results?.length > 0 && `(${results.length})`}
        </h2>

        {isLoadingResults ? (
          <div className="flex justify-center items-center h-48">
            <div className="flex flex-col items-center gap-2">
              <Loader className="h-8 w-8 text-green-400 animate-spin" />
              <p className="text-gray-400">Loading test results...</p>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="flex justify-center items-center h-48">
            <div className="flex flex-col items-center gap-2">
              <Search className="h-8 w-8 text-gray-500" />
              <p className="text-gray-400">No vulnerability tests found</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result) => (
              <div
                key={result.id}
                className="bg-gray-800/60 rounded-xl border border-gray-700 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result.status)}
                    <div>
                      <h3 className="font-medium text-white">{result.title}</h3>
                      <p className="text-sm text-gray-400">
                        {result.targetUrl} • Created:{" "}
                        {formatDate(result.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className={`${getScoreColor(
                        result.severity
                      )} text-lg font-bold`}
                    >
                      {result.severity}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => exportResults(result)}
                        className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                        title="Export Report"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      {!result.isVerified && (
                        <button
                          onClick={() => handleVerifyTest(result.id)}
                          className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                          title="Verify Test"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() =>
                          handleUpdateStatus(
                            result.id,
                            result.status === ScanStatus.PENDING
                              ? ScanStatus.IN_PROGRESS
                              : ScanStatus.COMPLETED
                          )
                        }
                        className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
                        title="Update Status"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {result.description && (
                  <div className="bg-gray-900/50 rounded-lg p-3 mb-4 text-sm text-gray-300">
                    {result.description}
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="bg-gray-900/50 border border-gray-800/80 rounded-lg p-3">
                    <div className="text-sm text-gray-400">Status</div>
                    <div className="text-white font-medium">
                      {result.status}
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-800/80 rounded-lg p-3">
                    <div className="text-sm text-gray-400">Type</div>
                    <div className="text-white font-medium">
                      {result.vulnerabilityType}
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-800/80 rounded-lg p-3">
                    <div className="text-sm text-gray-400">Verified</div>
                    <div className="text-white font-medium">
                      {result.isVerified ? (
                        <span className="text-green-400">Yes</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-800/80 rounded-lg p-3">
                    <div className="text-sm text-gray-400">Last Updated</div>
                    <div className="text-white text-sm">
                      {formatDate(result.updatedAt)}
                    </div>
                  </div>
                </div>

                {/* Result summary if available */}
                {result.results?.summary && (
                  <div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-gray-800/80">
                    <div className="text-sm font-medium text-white mb-2">
                      Findings Summary
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div className="text-red-400">
                        Critical: {result.results.summary.critical || 0}
                      </div>
                      <div className="text-orange-400">
                        High: {result.results.summary.high || 0}
                      </div>
                      <div className="text-yellow-400">
                        Medium: {result.results.summary.medium || 0}
                      </div>
                      <div className="text-blue-400">
                        Low: {result.results.summary.low || 0}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestingPage;
