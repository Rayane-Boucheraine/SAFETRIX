import BaseUrl from "@/components/BaseUrl";

export enum RewardStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PAID = "PAID",
}

export interface Reward {
  id: string;
  amount: number;
  status: RewardStatus;
  description?: string;
  approvalNote?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
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
  approvedBy?: {
    id: string;
    name: string;
  };
}

export interface CreateRewardDto {
  amount: number;
  programId: string;
  description?: string;
}

export interface UpdateRewardDto {
  amount?: number;
  status?: RewardStatus;
  description?: string;
  approvalNote?: string;
  rejectionReason?: string;
}

export interface RewardResponse {
  message: string;
  status: number;
  data: Reward | Reward[];
}

export interface IRewardService {
  getMyRewards(): Promise<Reward[]>;
  getAllRewards(status?: RewardStatus, programId?: string): Promise<Reward[]>;
  getRewardById(id: string): Promise<Reward>;
  createReward(rewardData: CreateRewardDto): Promise<Reward>;
  updateReward(id: string, rewardData: UpdateRewardDto): Promise<Reward>;
  approveReward(id: string, approvalNote: string): Promise<Reward>;
  rejectReward(id: string, rejectionReason: string): Promise<Reward>;
  markAsPaid(id: string): Promise<Reward>;
  deleteReward(id: string): Promise<void>;
}

class RewardService implements IRewardService {
  async getMyRewards(): Promise<Reward[]> {
    try {
      const response = await BaseUrl.get("/rewards/my-rewards");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching my rewards:", error);
      throw error;
    }
  }

  async getAllRewards(
    status?: RewardStatus,
    programId?: string
  ): Promise<Reward[]> {
    try {
      const params = new URLSearchParams();
      if (status) params.append("status", status);
      if (programId) params.append("programId", programId);

      const response = await BaseUrl.get(`/rewards?${params.toString()}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching rewards:", error);
      throw error;
    }
  }

  async getRewardById(id: string): Promise<Reward> {
    try {
      const response = await BaseUrl.get(`/rewards/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching reward with id ${id}:`, error);
      throw error;
    }
  }

  async createReward(rewardData: CreateRewardDto): Promise<Reward> {
    try {
      const response = await BaseUrl.post("/rewards", rewardData);
      return response.data.data;
    } catch (error) {
      console.error("Error creating reward:", error);
      throw error;
    }
  }

  async updateReward(id: string, rewardData: UpdateRewardDto): Promise<Reward> {
    try {
      const response = await BaseUrl.patch(`/rewards/${id}`, rewardData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating reward with id ${id}:`, error);
      throw error;
    }
  }

  async approveReward(id: string, approvalNote: string): Promise<Reward> {
    try {
      const response = await BaseUrl.patch(`/rewards/${id}/approve`, {
        approvalNote,
      });
      return response.data.data;
    } catch (error) {
      console.error(`Error approving reward with id ${id}:`, error);
      throw error;
    }
  }

  async rejectReward(id: string, rejectionReason: string): Promise<Reward> {
    try {
      const response = await BaseUrl.patch(`/rewards/${id}/reject`, {
        rejectionReason,
      });
      return response.data.data;
    } catch (error) {
      console.error(`Error rejecting reward with id ${id}:`, error);
      throw error;
    }
  }

  async markAsPaid(id: string): Promise<Reward> {
    try {
      const response = await BaseUrl.patch(`/rewards/${id}/mark-as-paid`);
      return response.data.data;
    } catch (error) {
      console.error(`Error marking reward as paid with id ${id}:`, error);
      throw error;
    }
  }

  async deleteReward(id: string): Promise<void> {
    try {
      await BaseUrl.delete(`/rewards/${id}`);
    } catch (error) {
      console.error(`Error deleting reward with id ${id}:`, error);
      throw error;
    }
  }
}

export const rewardService = new RewardService();
export default rewardService;
