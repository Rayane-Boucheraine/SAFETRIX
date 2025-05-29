import BaseUrl from "@/components/BaseUrl";
import { ProgramStatus } from "@/types/program";

// Program interface matching the backend
export interface Program {
  id: string;
  title: string;
  description: string;
  status: ProgramStatus;
  minReward: number;
  maxReward: number;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  scope?: string;
  rewardType?: string;
  startup?: {
    id: string;
    name?: string;
  };
  participantsCount?: number;
  submissionsCount?: number;
}

class ProgramService {
  // Get all programs with optional status filter
  async getPrograms(status?: ProgramStatus): Promise<Program[]> {
    try {
      const params = status ? `?status=${status}` : "";
      const response = await BaseUrl.get(`/programs${params}`);

      // Handle different response structures
      if (response.data?.data) {
        return response.data.data;
      } else if (Array.isArray(response.data)) {
        return response.data;
      }

      console.warn("Unexpected programs response structure:", response.data);
      return [];
    } catch (error) {
      console.error("Error fetching programs:", error);
      return [];
    }
  }

  // Get active programs
  async getActivePrograms(): Promise<Program[]> {
    try {
      const response = await BaseUrl.get("/programs/active");

      // Handle different response structures
      if (response.data?.data) {
        return response.data.data;
      } else if (Array.isArray(response.data)) {
        return response.data;
      }

      console.warn(
        "Unexpected active programs response structure:",
        response.data
      );
      return [];
    } catch (error) {
      console.error("Error fetching active programs:", error);
      return [];
    }
  }

  // Get programs created by current user (startup role)
  async getMyPrograms(): Promise<Program[]> {
    try {
      const response = await BaseUrl.get("/programs/my-programs");

      // Handle different response structures
      if (response.data?.data) {
        return response.data.data;
      } else if (Array.isArray(response.data)) {
        return response.data;
      }

      console.warn("Unexpected my programs response structure:", response.data);
      return [];
    } catch (error) {
      console.error("Error fetching my programs:", error);
      return [];
    }
  }

  // Get a specific program by ID
  async getProgram(id: string): Promise<Program | null> {
    try {
      const response = await BaseUrl.get(`/programs/${id}`);
      return response.data?.data || response.data || null;
    } catch (error) {
      console.error(`Error fetching program ${id}:`, error);
      return null;
    }
  }

  // Create a new program
  async createProgram(programData: Partial<Program>): Promise<Program | null> {
    try {
      const response = await BaseUrl.post("/programs", programData);
      return response.data?.data || response.data || null;
    } catch (error) {
      console.error("Error creating program:", error);
      throw error;
    }
  }

  // Update a program
  async updateProgram(
    id: string,
    programData: Partial<Program>
  ): Promise<Program | null> {
    try {
      const response = await BaseUrl.patch(`/programs/${id}`, programData);
      return response.data?.data || response.data || null;
    } catch (error) {
      console.error(`Error updating program ${id}:`, error);
      throw error;
    }
  }

  // Update program status
  async updateProgramStatus(
    id: string,
    status: ProgramStatus
  ): Promise<Program | null> {
    try {
      const response = await BaseUrl.patch(`/programs/${id}/status`, {
        status,
      });
      return response.data?.data || response.data || null;
    } catch (error) {
      console.error(`Error updating program status ${id}:`, error);
      throw error;
    }
  }

  // Delete a program
  async deleteProgram(id: string): Promise<boolean> {
    try {
      await BaseUrl.delete(`/programs/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting program ${id}:`, error);
      throw error;
    }
  }

  // Join a program
  async joinProgram(
    id: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await BaseUrl.post(`/programs/${id}/join`, {});
      return {
        success: true,
        message: response.data?.message || "Successfully joined program",
      };
    } catch (error) {
      console.error(`Error joining program ${id}:`, error);
      throw error;
    }
  }

  // Leave a program
  async leaveProgram(
    id: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await BaseUrl.post(`/programs/${id}/leave`, {});
      return {
        success: true,
        message: response.data?.message || "Successfully left program",
      };
    } catch (error) {
      console.error(`Error leaving program ${id}:`, error);
      throw error;
    }
  }

  // Check if current user is a participant
  async checkParticipation(id: string): Promise<boolean> {
    try {
      const response = await BaseUrl.get(`/programs/${id}/check-participation`);
      return response.data?.data?.isParticipant || false;
    } catch (error) {
      console.error(`Error checking participation ${id}:`, error);
      return false;
    }
  }

  // Get participant count
  async getParticipantsCount(id: string): Promise<number> {
    try {
      const response = await BaseUrl.get(`/programs/${id}/participants`);
      return response.data?.data?.participantsCount || 0;
    } catch (error) {
      console.error(`Error getting participants count ${id}:`, error);
      return 0;
    }
  }
}

const programService = new ProgramService();
export default programService;
