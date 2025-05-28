import BaseUrl from "@/components/BaseUrl";
import { ProgramStatus, CreateProgramDto } from "@/types/program";

export interface UpdateProgramDto {
  [key: string]: string | number | boolean | ProgramStatus | undefined;
}

export interface Program {
  id: string;
  title: string;
  company?: string;
  description?: string;
  scope?: string[];
  rewards?: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  status: ProgramStatus;
  startDate?: string;
  endDate?: string;
  participantsCount?: number;
  submissionsCount?: number;
  website?: string;
  contactEmail?: string;
  rules?: string[];
  outOfScope?: string[];
}

export interface IProgramService {
  getAllPrograms(status?: ProgramStatus): Promise<Program[]>;
  updateProgram(id: string, programData: UpdateProgramDto): Promise<Program>;
  getProgramById(id: string): Promise<Program>;
  getMyPrograms(): Promise<Program[]>; // For startup users
  createProgram(programData: CreateProgramDto): Promise<Program>;
  updateProgramStatus(id: string, status: ProgramStatus): Promise<Program>;
  deleteProgram(id: string): Promise<void>;
  joinProgram(id: string): Promise<void>;
  checkParticipation(
    id: string
  ): Promise<{ program: Program; isParticipating: boolean }>;
}

class ProgramService implements IProgramService {
  async getAllPrograms(status?: ProgramStatus) {
    try {
      const query = status ? `?status=${status}` : "";
      const response = await BaseUrl.get(`/programs${query}`);

      // Handle response structure
      if (response.data?.data && Array.isArray(response.data.data)) {
        return response.data.data;
      } else if (Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error("Unexpected programs response structure:", response.data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
      throw error;
    }
  }

  async getActivePrograms() {
    try {
      const response = await BaseUrl.get("/programs/active");

      // Handle response structure
      if (response.data?.data && Array.isArray(response.data.data)) {
        return response.data.data;
      } else if (Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error(
          "Unexpected active programs response structure:",
          response.data
        );
        return [];
      }
    } catch (error) {
      console.error("Error fetching active programs:", error);
      throw error;
    }
  }

  async getProgramById(id: string) {
    try {
      const response = await BaseUrl.get(`/programs/${id}`);

      // Handle response structure
      if (response.data?.data) {
        return response.data.data;
      } else {
        return response.data;
      }
    } catch (error) {
      console.error(`Error fetching program with id ${id}:`, error);
      throw error;
    }
  }

  async getMyPrograms() {
    try {
      const response = await BaseUrl.get("/programs/my-programs");

      // Handle response structure
      if (response.data?.data && Array.isArray(response.data.data)) {
        return response.data.data;
      } else if (Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error(
          "Unexpected my programs response structure:",
          response.data
        );
        return [];
      }
    } catch (error) {
      console.error("Error fetching my programs:", error);
      throw error;
    }
  }

  async createProgram(programData: CreateProgramDto): Promise<Program> {
    try {
      const response = await BaseUrl.post("/programs", programData);

      // Handle response structure
      if (response.data?.data) {
        return response.data.data;
      } else {
        return response.data;
      }
    } catch (error) {
      console.error("Error creating program:", error);
      throw error;
    }
  }

  async updateProgram(
    id: string,
    programData: UpdateProgramDto
  ): Promise<Program> {
    try {
      const response = await BaseUrl.patch(`/programs/${id}`, programData);

      // Handle response structure
      if (response.data?.data) {
        return response.data.data;
      } else {
        return response.data;
      }
    } catch (error) {
      console.error(`Error updating program with id ${id}:`, error);
      throw error;
    }
  }

  async updateProgramStatus(
    id: string,
    status: ProgramStatus
  ): Promise<Program> {
    try {
      const response = await BaseUrl.patch(`/programs/${id}/status`, {
        status,
      });

      // Handle response structure
      if (response.data?.data) {
        return response.data.data;
      } else {
        return response.data;
      }
    } catch (error) {
      console.error(`Error updating status for program with id ${id}:`, error);
      throw error;
    }
  }

  async deleteProgram(id: string): Promise<void> {
    try {
      await BaseUrl.delete(`/programs/${id}`);
    } catch (error) {
      console.error(`Error deleting program with id ${id}:`, error);
      throw error;
    }
  }

  async joinProgram(id: string): Promise<void> {
    try {
      await BaseUrl.post(`/programs/${id}/join`);
    } catch (error) {
      console.error(`Error joining program with id ${id}:`, error);
      throw error;
    }
  }

  async checkParticipation(
    id: string
  ): Promise<{ program: Program; isParticipating: boolean }> {
    try {
      // Since the backend doesn't have this endpoint, we'll fetch the program and assume not participating
      const program = await this.getProgramById(id);

      return {
        program,
        isParticipating: false, // This would need to be implemented in the backend
      };
    } catch (error) {
      console.error(
        `Error checking participation for program with id ${id}:`,
        error
      );
      throw error;
    }
  }
}

export const programService = new ProgramService();
export default programService;
