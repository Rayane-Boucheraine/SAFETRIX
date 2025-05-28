"use client";

import React, { useState } from "react";
import {
  Globe,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Target,
  Lock,
  Wifi,
  Database,
  Code,
  Shield,
  Download,
  RotateCcw,
} from "lucide-react";

interface TestResult {
  id: string;
  url: string;
  status: "running" | "completed" | "failed";
  score: number;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  testTypes: string[];
  timestamp: Date;
  duration?: number;
}

const TestingPage = () => {
  const [url, setUrl] = useState("");
  const [selectedTests, setSelectedTests] = useState<string[]>([
    "ssl",
    "xss",
    "sqli",
    "csrf",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

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
    if (!url || selectedTests.length === 0) return;

    setIsLoading(true);

    const newTest: TestResult = {
      id: Date.now().toString(),
      url,
      status: "running",
      score: 0,
      vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
      testTypes: selectedTests,
      timestamp: new Date(),
    };

    setResults((prev) => [newTest, ...prev]);

    // Simulate test completion after 3 seconds
    setTimeout(() => {
      const completedTest: TestResult = {
        ...newTest,
        status: "completed",
        score: Math.floor(Math.random() * 100),
        vulnerabilities: {
          critical: Math.floor(Math.random() * 3),
          high: Math.floor(Math.random() * 5),
          medium: Math.floor(Math.random() * 8),
          low: Math.floor(Math.random() * 12),
        },
        duration: 3000,
      };

      setResults((prev) =>
        prev.map((test) => (test.id === newTest.id ? completedTest : test))
      );
      setIsLoading(false);
      setUrl("");
    }, 3000);
  };

  const exportResults = (result: TestResult) => {
    const data = {
      url: result.url,
      timestamp: result.timestamp,
      score: result.score,
      vulnerabilities: result.vulnerabilities,
      testTypes: result.testTypes,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `security-report-${result.id}.json`;
    a.click();
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Clock className="h-4 w-4 text-yellow-400 animate-spin" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
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

      {/* Testing Form */}
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-green-800/30 p-8">
        <div className="space-y-6">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target URL
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
          </div>

          {/* Test Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-gray-300">
                Select Tests ({selectedTests.length} selected)
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
            disabled={!url || selectedTests.length === 0 || isLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Zap className="h-5 w-5 animate-pulse" />
                Running Tests...
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
      {results.length > 0 && (
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-green-800/30 p-8">
          <h2 className="text-xl font-bold text-white mb-6">
            Test Results ({results.length})
          </h2>

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
                      <h3 className="font-medium text-white">{result.url}</h3>
                      <p className="text-sm text-gray-400">
                        {result.timestamp.toLocaleDateString()} •{" "}
                        {result.testTypes.length} tests
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {result.status === "completed" && (
                      <div className="text-right">
                        <div
                          className={`text-2xl font-bold ${getScoreColor(
                            result.score
                          )}`}
                        >
                          {result.score}/100
                        </div>
                        <p className="text-sm text-gray-400">Security Score</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => exportResults(result)}
                        className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                        title="Export Report"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
                        title="Rerun"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {result.status === "completed" && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-3">
                      <div className="text-red-400 font-bold text-lg">
                        {result.vulnerabilities.critical}
                      </div>
                      <div className="text-sm text-gray-400">Critical</div>
                    </div>
                    <div className="bg-orange-900/20 border border-orange-800/30 rounded-lg p-3">
                      <div className="text-orange-400 font-bold text-lg">
                        {result.vulnerabilities.high}
                      </div>
                      <div className="text-sm text-gray-400">High</div>
                    </div>
                    <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-3">
                      <div className="text-yellow-400 font-bold text-lg">
                        {result.vulnerabilities.medium}
                      </div>
                      <div className="text-sm text-gray-400">Medium</div>
                    </div>
                    <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-3">
                      <div className="text-blue-400 font-bold text-lg">
                        {result.vulnerabilities.low}
                      </div>
                      <div className="text-sm text-gray-400">Low</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestingPage;
