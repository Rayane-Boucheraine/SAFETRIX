import BaseUrl from "@/components/BaseUrl";

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

export interface Report {
  id: string;
  title: string;
  description: string;
  status: ReportStatus;
  severity?: ReportSeverity;
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
    startup: {
      id: string;
      name: string;
    };
  };
  reporter: {
    id: string;
    name: string;
  };
  reviewedBy?: {
    id: string;
    name: string;
  };
}

export interface CreateReportDto {
  title: string;
  description: string;
  programId: string;
  severity?: ReportSeverity;
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

export interface ReportResponse {
  message: string;
  status: number;
  data: Report | Report[];
}

export interface IReportService {
  getMyReports(): Promise<Report[]>;
  getAllReports(status?: ReportStatus): Promise<Report[]>;
  getReportsByProgram(programId: string): Promise<Report[]>;
  getReportById(id: string): Promise<Report>;
  createReport(reportData: CreateReportDto): Promise<Report>;
  updateReport(id: string, reportData: UpdateReportDto): Promise<Report>;
  updateReportStatus(
    id: string,
    status: ReportStatus,
    reviewNotes?: string
  ): Promise<Report>;
  deleteReport(id: string): Promise<void>;
}

class ReportService implements IReportService {
  async getMyReports(): Promise<Report[]> {
    try {
      const response = await BaseUrl.get("/reports/my-reports");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching my reports:", error);
      throw error;
    }
  }

  async getAllReports(status?: ReportStatus): Promise<Report[]> {
    try {
      const params = status ? `?status=${status}` : "";
      const response = await BaseUrl.get(`/reports${params}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }
  }

  async getReportsByProgram(programId: string): Promise<Report[]> {
    try {
      const response = await BaseUrl.get(`/reports/program/${programId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching reports for program ${programId}:`, error);
      throw error;
    }
  }

  async getReportById(id: string): Promise<Report> {
    try {
      const response = await BaseUrl.get(`/reports/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching report with id ${id}:`, error);
      throw error;
    }
  }

  async createReport(reportData: CreateReportDto): Promise<Report> {
    try {
      const response = await BaseUrl.post("/reports", reportData);
      return response.data.data;
    } catch (error) {
      console.error("Error creating report:", error);
      throw error;
    }
  }

  async updateReport(id: string, reportData: UpdateReportDto): Promise<Report> {
    try {
      const response = await BaseUrl.patch(`/reports/${id}`, reportData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating report with id ${id}:`, error);
      throw error;
    }
  }

  async updateReportStatus(
    id: string,
    status: ReportStatus,
    reviewNotes?: string
  ): Promise<Report> {
    try {
      const response = await BaseUrl.patch(`/reports/${id}/status`, {
        status,
        reviewNotes,
      });
      return response.data.data;
    } catch (error) {
      console.error(`Error updating report status with id ${id}:`, error);
      throw error;
    }
  }

  async deleteReport(id: string): Promise<void> {
    try {
      await BaseUrl.delete(`/reports/${id}`);
    } catch (error) {
      console.error(`Error deleting report with id ${id}:`, error);
      throw error;
    }
  }
}

export const reportService = new ReportService();
export default reportService;
