import { AppDataSource } from "../config/data-base";
import { UserActivityPort } from "../../domain/UserActivityPort";
import { UserActivity, UserActivityStatus } from "../../domain/UserActivity";
import { UserActivityEntity } from "../entities/UserActivityEntity";

export class UserActivityAdapter implements UserActivityPort {
  private repo = AppDataSource.getRepository(UserActivityEntity);

  async assignActivity(userId: number, activityId: number): Promise<number> {
    const entity = this.repo.create({
      user_id: userId,
      activity_id: activityId,
      status: "assigned",
      points: null,
    });

    const saved = await this.repo.save(entity);
    return saved.id;
  }

  async listByUser(userId: number): Promise<UserActivity[]> {
    const entities = await this.repo.find({
      where: { user_id: userId },
      order: { assignedAt: "DESC" }, // ✅ camelCase
    });

    return entities.map((e) => ({
      id: e.id,
      userId: e.user_id,
      activityId: e.activity_id,
      status: e.status as UserActivityStatus,
      points: e.points,
      assignedAt: e.assignedAt,
      completedAt: e.completedAt,
    }));
  }

  async updateStatus(
    id: number,
    status: UserActivityStatus,
    points?: number
  ): Promise<boolean> {
    const updateData: Partial<UserActivityEntity> = {
      status,
    };

    // ✅ SOLO agregamos points si existe
    if (points !== undefined) {
      updateData.points = points;
    }

    const result = await this.repo.update(id, updateData);
    return result.affected === 1;
  }
}
