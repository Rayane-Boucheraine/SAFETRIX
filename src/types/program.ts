export enum ProgramStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  CLOSED = "CLOSED",
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  COMPLETED = "COMPLETED",
  ARCHIVED = "ARCHIVED",
}

export enum ProgramRewardType {
  CASH = "cash",
  SWAG = "swag",
  BOTH = "both",
  KUDOS = "kudos",
}

export interface Startup {
  id: string;
  name?: string;
  email?: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  status: ProgramStatus;
  rewardType: ProgramRewardType;
  minReward: number;
  maxReward: number;
  scope: string;
  outOfScope?: string;
  rules: string;
  vulnerabilityTypes: string[];
  startup: Startup;
  createdAt: string;
  updatedAt: string;

  // Frontend-specific computed fields
  name?: string; // For compatibility
  company?: string;
  rewardRange?: string;
  type?: "Public" | "Private";
  targets?: string[];
  tags?: string[];
  vrt?: string;
  featured?: boolean;
  avgReward?: number;
  avgResponseTime?: number;
  reportsResolved?: number;
  acceptanceRate?: number;
}

export interface CreateProgramDto {
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  rewardType: ProgramRewardType;
  minReward: number;
  maxReward: number;
  scope: string;
  outOfScope?: string;
  rules: string;
  vulnerabilityTypes: string[];
}

export interface ProgramsResponse {
  message: string;
  status: number;
  data: Program[];
}

export interface ProgramResponse {
  message: string;
  status: number;
  data: Program;
}
