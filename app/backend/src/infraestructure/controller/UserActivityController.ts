import { Request, Response } from "express";
import { UserActivityApplication } from "../../application/UserActivityApplication";

export class UserActivityController {
  constructor(private app: UserActivityApplication) {}

  // Asignar actividad a un usuario (ADMIN)
  async assignActivity(req: Request, res: Response) {
    try {
      const { userId, activityId } = req.body;

      if (!userId || !activityId) {
        return res.status(400).json({ error: "userId y activityId son obligatorios" });
      }

      const result = await this.app.assignActivity(userId, activityId);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Listar actividades de un usuario
  async listByUser(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const list = await this.app.listByUser(userId);
      return res.json(list);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

