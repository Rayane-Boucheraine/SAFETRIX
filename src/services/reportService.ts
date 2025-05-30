import BaseUrl from "@/components/BaseUrl";

// Enums matching the backend
export enum ReportStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  DUPLICATE = "DUPLICATE",
  INFORMATIVE = "INFORMATIVE",
  FIXED = "FIXED",
}

export enum ReportSeverity {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

// Interfaces matching backend DTOs
export interface CreateReportDto {
  title: string;
  description: string;
  programId: string;
  severity: ReportSeverity;
  impact?: string;
  stepsToReproduce: string;
  proofUrls?: string[];
  fixRecommendation?: string;
}

export interface UpdateReportDto {
  title?: string;
  description?: string;
  severity?: ReportSeverity;
  impact?: string;
  stepsToReproduce?: string;
  proofUrls?: string[];
  fixRecommendation?: string;
  status?: ReportStatus;
  reviewNotes?: string;
}

export interface UpdateReportStatusParams {
  status: ReportStatus;
  reviewNotes: string;
  rewardAmount?: number;
}

// Report data structure matching backend entity
export interface Report {
  id: string;
  title: string;
  description: string;
  severity: ReportSeverity;
  impact?: string;
  stepsToReproduce: string;
  proofUrls?: string[];
  fixRecommendation?: string;
  status: ReportStatus;
  reviewNotes?: string;
  createdAt: string;
  updatedAt: string;
  reviewedAt?: string;
  fixedAt?: string;
  reporter: {
    id: string;
    username?: string;
    alias?: string;
  };
  program: {
    id: string;
    title: string;
    startup?: {
      id: string;
      name?: string;
    };
  };
}

// Data shape for the API response
interface ApiResponse<T> {
  message: string;
  status: number;
  data: T;
}

// Type alias for CreateReportData to match the CreateReportDto
export type CreateReportData = CreateReportDto;

class ReportService {
  async createReport(
    reportData: CreateReportData
  ): Promise<ApiResponse<Report>> {
    const response = await BaseUrl.post("/reports", reportData);
    return response.data;
  }

  // Get all reports with optional status filter
  async getReports(status?: ReportStatus): Promise<ApiResponse<Report[]>> {
    const params = status ? `?status=${status}` : "";
    const response = await BaseUrl.get(`/reports${params}`);
    return response.data;
  }

  // Get reports submitted by current user
  async getMyReports(): Promise<ApiResponse<Report[]>> {
    const response = await BaseUrl.get("/reports/my-reports");
    return response.data;
  }

  // Get reports for a specific startup's programs
  async getStartupReports(): Promise<ApiResponse<Report[]>> {
    const response = await BaseUrl.get("/reports/startup");
    return response.data;
  }

  // Get reports for a specific program
  async getProgramReports(programId: string): Promise<ApiResponse<Report[]>> {
    const response = await BaseUrl.get(`/reports/program/${programId}`);
    return response.data;
  }

  // Get a specific report by ID
  async getReport(id: string): Promise<ApiResponse<Report>> {
    const response = await BaseUrl.get(`/reports/${id}`);
    return response.data;
  }

  // Update a report
  async updateReport(
    id: string,
    updateData: UpdateReportDto
  ): Promise<ApiResponse<Report>> {
    const response = await BaseUrl.patch(`/reports/${id}`, updateData);
    return response.data;
  }

  // Update report status
  async updateReportStatus(
    reportId: string,
    status: ReportStatus,
    reviewNotes: string,
    rewardAmount?: number
  ): Promise<any> {
    try {
      console.log(
        `Updating report ${reportId} with status: ${status}, rewardAmount: ${rewardAmount}`
      );
      const response = await BaseUrl.patch(`/reports/${reportId}/status`, {
        status,
        reviewNotes,
        rewardAmount,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating report status:", error);
      throw error;
    }
  }

  async payReward(reportId: string): Promise<any> {
    try {
      const response = await BaseUrl.patch(`/reports/${reportId}/pay-reward`);
      return response.data;
    } catch (error) {
      console.error("Error paying reward for report:", error);
      throw error;
    }
  }

  // Delete a report
  async deleteReport(id: string): Promise<ApiResponse<void>> {
    const response = await BaseUrl.delete(`/reports/${id}`);
    return response.data;
  }
}

const reportService = new ReportService();
export default reportService;
