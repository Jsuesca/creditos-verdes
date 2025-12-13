export type UserActivityStatus =
  | "assigned"
  | "in_progress"
  | "completed"
  | "approved";

export interface UserActivity {
  id: number;
  userId: number;
  activityId: number;
  status: UserActivityStatus;
  points?: number | null;
  assignedAt: Date;
  completedAt?: Date | null;
}
