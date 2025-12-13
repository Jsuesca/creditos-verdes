import { AppDataSource } from "../config/data-base";
import { UserActivityPort } from "../../domain/UserActivityPort";
import { UserActivity } from "../../domain/UserActivity";
import { UserActivityEntity } from "../entities/UserActivityEntity";

export class UserActivityAdapter implements UserActivityPort {
  private repo = AppDataSource.getRepository(UserActivityEntity);

  // Asignar actividad a usuario
  async assignActivity(userId: number, activityId: number): Promise<number> {
    const entity = this.repo.create({
      userId,
      activityId,
      status: "assigned",
      points: null,
    });

    const saved = await this.repo.save(entity);
    return saved.id;
  }

  // Listar actividades por usuario
  async listByUser(userId: number): Promise<UserActivity[]> {
    const list = await this.repo.find({
      where: { userId },
      order: { assignedAt: "DESC" },
    });

    return list.map((e) => ({
      id: e.id,
      userId: e.userId,
      activityId: e.activityId,
      status: e.status,
      points: e.points,
      assignedAt: e.assignedAt,
      completedAt: e.completedAt,
    }));
  }

// Actualizar estado
async updateStatus(
  id: number,
  status: UserActivity["status"],
  points?: number
): Promise<boolean> {
  const updateData: Partial<UserActivityEntity> = {
    status,
    // ✅ NUNCA undefined
    points: points ?? null,
  };

  if (status === "completed" || status === "approved") {
    updateData.completedAt = new Date();
  }

  const result = await this.repo.update(id, updateData);
  return result.affected !== 0;
}

}
