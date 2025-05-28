import BaseUrl from "@/components/BaseUrl";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  // Add other user profile fields as needed
}

export interface IUserService {
  getUserProfile(): Promise<UserProfile>;
}

class UserService implements IUserService {
  async getUserProfile(): Promise<UserProfile> {
    try {
      const response = await BaseUrl.get("/user/hacker/profile");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }
}

export const userService = new UserService();
export default userService;
