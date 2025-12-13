import { UserActivity, UserActivityStatus } from "./UserActivity";

export interface UserActivityPort {
  assignActivity(
    userId: number,
    activityId: number
  ): Promise<number>;

  listByUser(
    userId: number
  ): Promise<UserActivity[]>;

  updateStatus(
    id: number,
    status: UserActivityStatus,
    points?: number
  ): Promise<boolean>;
}
