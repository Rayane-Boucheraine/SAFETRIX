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
  description: string;
  status: RewardStatus;
  reportId: string;
  program: {
    id: string;
    title: string;
  };
  reporter: {
    id: string;
    username?: string;
    alias?: string;
  };
  approvedBy?: {
    id: string;
    username?: string;
  };
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
  approvalNote?: string;
  rejectionReason?: string;
}

export interface CreateRewardData {
  amount: number;
  description: string;
  reportId: string;
  programId: string;
}

class RewardService {
  async createReward(data: CreateRewardData) {
    const response = await BaseUrl.post("/rewards", data);
    return response.data;
  }

  async getRewards(filters?: { status?: RewardStatus; programId?: string }) {
    const params = new URLSearchParams();
    if (filters?.status) params.append("status", filters.status);
    if (filters?.programId) params.append("programId", filters.programId);

    const response = await BaseUrl.get(`/rewards?${params.toString()}`);
    return response.data;
  }

  async getMyRewards() {
    const response = await BaseUrl.get("/rewards/my-rewards");
    return response.data;
  }

  async getReward(id: string) {
    const response = await BaseUrl.get(`/rewards/${id}`);
    return response.data;
  }

  async approveReward(id: string, approvalNote: string) {
    const response = await BaseUrl.patch(`/rewards/${id}/approve`, {
      approvalNote,
    });
    return response.data;
  }

  async rejectReward(id: string, rejectionReason: string) {
    const response = await BaseUrl.patch(`/rewards/${id}/reject`, {
      rejectionReason,
    });
    return response.data;
  }

  async markAsPaid(id: string) {
    const response = await BaseUrl.patch(`/rewards/${id}/mark-as-paid`);
    return response.data;
  }

  async updateReward(id: string, data: Partial<CreateRewardData>) {
    const response = await BaseUrl.patch(`/rewards/${id}`, data);
    return response.data;
  }

  async deleteReward(id: string) {
    const response = await BaseUrl.delete(`/rewards/${id}`);
    return response.data;
  }

  async getRewardsByReportId(reportId: string): Promise<any> {
    try {
      const response = await BaseUrl.get(`/rewards/by-report/${reportId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching rewards for report:", error);
      throw error;
    }
  }
}

export default new RewardService();
