import BaseUrl from "@/components/BaseUrl";

export interface StartupProfile {
  id: string;
  name: string;
  email: string;
  company?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id?: string | number;
  username?: string;
  email?: string;
  name?: string;
  alias?: string;
  createdAt?: string;
  updatedAt?: string;
  role?: string;
  avatar?: string;
}

// Interface for creating hacker profile to match backend DTO
export interface CreateProfileDto {
  name: string;
  alias?: string;
  bio?: string;
  skills?: string[];
  avatar?: string;
}

// Interface for updating hacker profile to match backend DTO
export interface UpdateProfileDto {
  name?: string;
  alias?: string;
  bio?: string;
  skills?: string[];
  avatar?: string;
}

export interface IUserService {
  getStartupProfile(): Promise<StartupProfile>;
  getUserProfile(): Promise<UserProfile>;
  createProfile(data: CreateProfileDto): Promise<void>;
  updateProfile(data: UpdateProfileDto): Promise<void>;
}

class UserService implements IUserService {
  async getStartupProfile(): Promise<StartupProfile> {
    try {
      const response = await BaseUrl.get("/user/startup/profile");

      console.log("Startup profile response:", response.data);

      // Handle response structure
      if (response.data?.data) {
        return response.data.data;
      } else {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching startup profile:", error);
      throw error;
    }
  }

  /**
   * Get the current authenticated user's profile
   * @returns UserProfile object with user information
   */
  async getUserProfile(): Promise<UserProfile> {
    try {
      const response = await BaseUrl.get("/user/hacker/profile");
      // The backend returns data in { message, status, data } format
      return response.data.data || {};
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }

  /**
   * Create a new profile for the current user
   * @param data Profile creation data
   * @returns Response message
   */
  async createProfile(data: CreateProfileDto): Promise<void> {
    try {
      const response = await BaseUrl.post("/user/hacker/profile", data);
      return response.data;
    } catch (error) {
      console.error("Error creating profile:", error);
      throw error;
    }
  }

  /**
   * Update the current user's profile information
   * @param data Updated user data
   * @returns Updated UserProfile
   */
  async updateProfile(data: UpdateProfileDto): Promise<void> {
    try {
      const response = await BaseUrl.patch("/user/hacker/profile", data);
      return response.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }

  /**
   * Change the user's password
   * @param currentPassword Current password
   * @param newPassword New password
   * @returns Success status
   */
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await BaseUrl.post("/user/change-password", {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  }

  async updateStartupProfile(formData: FormData) {
    try {
      const response = await BaseUrl.post("/users/startup/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating startup profile:", error);
      throw error;
    }
  }
}

export const userService = new UserService();
export default userService;
