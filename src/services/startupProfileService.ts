import BaseUrl from "@/components/BaseUrl";

export interface StartupProfile {
  id: string;
  avatar: string;
  name: string;
  industry: string;
  description: string;
  location: string;
  team_size: number;
  security_needs: string[];
  yearly_revenue: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStartupProfileDto {
  name: string;
  industry: string;
  description: string;
  location: string;
  team_size: number;
  security_needs: string[];
  yearly_revenue: number;
  avatar?: string;
}

export interface UpdateStartupProfileDto {
  name?: string;
  industry?: string;
  description?: string;
  location?: string;
  team_size?: number;
  security_needs?: string[];
  yearly_revenue?: number;
  avatar?: string;
}

export interface StartupProfileResponse {
  message: string;
  status: number;
  data: StartupProfile;
}

export interface IStartupProfileService {
  getStartupProfile(): Promise<StartupProfile>;
  createStartupProfile(profileData: CreateStartupProfileDto): Promise<void>;
  updateStartupProfile(profileData: UpdateStartupProfileDto): Promise<void>;
}

class StartupProfileService implements IStartupProfileService {
  async getStartupProfile(): Promise<StartupProfile> {
    try {
      const response = await BaseUrl.get("/user/startup/profile");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching startup profile:", error);
      throw error;
    }
  }

  async createStartupProfile(
    profileData: CreateStartupProfileDto
  ): Promise<void> {
    try {
      await BaseUrl.post("/user/startup/profile", profileData);
    } catch (error) {
      console.error("Error creating startup profile:", error);
      throw error;
    }
  }

  async updateStartupProfile(
    profileData: UpdateStartupProfileDto
  ): Promise<void> {
    try {
      await BaseUrl.patch("/user/startup/profile", profileData);
    } catch (error) {
      console.error("Error updating startup profile:", error);
      throw error;
    }
  }
}

export const startupProfileService = new StartupProfileService();
export default startupProfileService;
