import BaseUrl from "@/components/BaseUrl";
import { AxiosError } from "axios";

// Define interface for API error responses
interface ApiErrorResponse {
  message: string | string[];
  statusCode?: number;
}

// Match backend enums exactly - ensure case matches backend
export enum ScanStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum VulnerabilitySeverity {
  CRITICAL = "critical",
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
  INFO = "info",
}

// Vulnerability interface definition
export interface Vulnerability {
  id?: string;
  name?: string;
  description?: string;
  location?: string;
  severity?: VulnerabilitySeverity;
  details?: Record<string, unknown>;
  remediation?: string;
}

// Interface for scan results from backend
export interface ScanResults {
  summary?: {
    critical?: number;
    high?: number;
    medium?: number;
    low?: number;
  };
  vulnerabilities?: Array<Vulnerability>;
  analysis?: {
    totalVulnerabilities?: number;
    uniqueVulnerabilityTypes?: number;
    recommendedActions?: string[];
    scanDurationMs?: number;
  };
  vulnerabilitiesByType?: Record<string, Vulnerability[]>;
  analysisTimestamp?: string;
  total?: {
    vulnerabilities: number;
    criticalCount: number;
    highCount: number;
    mediumCount: number;
    lowCount: number;
  };
  securityScore?: number;
}

// Interface for backend testing entity
export interface TestingResult {
  id: string;
  title: string;
  description: string;
  targetUrl: string;
  vulnerabilityType: string;
  status: ScanStatus;
  severity: VulnerabilitySeverity;
  scanStartedAt?: string;
  scanCompletedAt?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  tester: {
    id: string;
    username?: string;
    alias?: string;
  };
  results?: ScanResults;
  errorMessage?: string;
  testTypes?: string[];
}

// DTOs matching backend
export interface CreateTestingDto {
  title: string;
  description?: string;
  targetUrl: string;
  vulnerabilityType: string;
  severity: VulnerabilitySeverity;
  testTypes: string[]; // Now required
  // New fields
  stepsToReproduce?: string;
  proofOfConcept?: string;
  impact?: string;
  recommendation?: string;
  attachments?: string[];
  cvssScore?: number;
}

export interface UpdateTestingDto {
  title?: string;
  description?: string;
  severity?: VulnerabilitySeverity;
  vulnerabilityType?: string;
  isVerified?: boolean;
}

// Statistics interface for API response
export interface TestingStatistics {
  total: number;
  bySeverity: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  verified: number;
  unverified: number;
}

export interface UserTestingStatistics {
  totalTests: number;
  testsByStatus: {
    completed: number;
    pending: number;
    failed: number;
    inProgress: number;
  };
  vulnerabilitiesByType: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    total: number;
  };
  mostRecentTests: TestingResult[];
}

class TestingService {
  async submitTest(createTestingDto: CreateTestingDto): Promise<TestingResult> {
    const response = await BaseUrl.post("/testing", createTestingDto);
    return response.data.data;
  }

  async getTests(
    filters: {
      testerId?: string;
      status?: ScanStatus;
      severity?: VulnerabilitySeverity;
    } = {}
  ): Promise<TestingResult[]> {
    const queryParams = new URLSearchParams();

    if (filters.status) queryParams.append("status", filters.status);
    if (filters.severity) queryParams.append("severity", filters.severity);
    if (filters.testerId) queryParams.append("testerId", filters.testerId);

    const endpoint = `/testing${
      queryParams.toString() ? "?" + queryParams.toString() : ""
    }`;
    const response = await BaseUrl.get(endpoint);
    return response.data.data;
  }

  async getMySubmissions(): Promise<TestingResult[]> {
    const response = await BaseUrl.get("/testing/my-submissions");
    return response.data.data;
  }

  async getMyTests(): Promise<TestingResult[]> {
    const response = await BaseUrl.get("/testing/my-tests");
    return response.data.data;
  }

  async getTest(id: string): Promise<TestingResult> {
    const response = await BaseUrl.get(`/testing/${id}`);
    return response.data.data;
  }

  async getTestDetails(id: string): Promise<{
    test: TestingResult;
    detailedResults: ScanResults;
  }> {
    const response = await BaseUrl.get(`/testing/${id}/details`);
    return response.data.data;
  }

  async updateTest(
    id: string,
    updateTestingDto: UpdateTestingDto
  ): Promise<TestingResult> {
    const response = await BaseUrl.patch(`/testing/${id}`, updateTestingDto);
    return response.data.data;
  }

  async updateStatus(id: string, status: ScanStatus): Promise<TestingResult> {
    try {
      // Validate status is a valid enum value before sending
      if (!Object.values(ScanStatus).includes(status)) {
        throw new Error(
          `Invalid status value. Must be one of: ${Object.values(
            ScanStatus
          ).join(", ")}`
        );
      }

      const response = await BaseUrl.patch(`/testing/${id}/status`, { status });
      return response.data.data;
    } catch (error) {
      console.error(`Error updating status for test ID ${id}:`, error);

      // Extract error message from response if available
      const errorMessage =
        (error as AxiosError<ApiErrorResponse>).response?.data?.message ||
        (error instanceof Error ? error.message : String(error)) ||
        "Failed to update test status";

      throw new Error(
        typeof errorMessage === "string"
          ? errorMessage
          : Array.isArray(errorMessage)
          ? errorMessage.join(", ")
          : "Unknown error"
      );
    }
  }

  async verifyTest(id: string): Promise<TestingResult> {
    const response = await BaseUrl.patch(`/testing/${id}/verify`, {});
    return response.data.data;
  }

  async deleteTest(id: string): Promise<void> {
    await BaseUrl.delete(`/testing/${id}`);
  }

  async getStatistics(): Promise<TestingStatistics> {
    // No longer accepts programId parameter as per backend changes
    const response = await BaseUrl.get("/testing/statistics");
    return response.data.data;
  }

  async getUserTestingStatistics(): Promise<UserTestingStatistics> {
    const response = await BaseUrl.get("/testing/summary");
    return response.data.data;
  }
}

const testingService = new TestingService();
export default testingService;
