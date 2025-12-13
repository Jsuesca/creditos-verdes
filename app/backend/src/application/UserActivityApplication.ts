import { UserActivityPort } from "../domain/UserActivityPort";
import { UserActivityStatus } from "../domain/UserActivity";

export class UserActivityApplication {
  constructor(private port: UserActivityPort) {}

  async assignActivity(userId: number, activityId: number): Promise<number> {
    return this.port.assignActivity(userId, activityId);
  }

  async listByUser(userId: number) {
    return this.port.listByUser(userId);
  }

  async updateStatus(
    id: number,
    status: UserActivityStatus,
    points?: number
  ): Promise<boolean> {
    return this.port.updateStatus(id, status, points);
  }
}
