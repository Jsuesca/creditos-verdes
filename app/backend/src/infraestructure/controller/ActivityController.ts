import { Request, Response } from "express";
import { ActivityApplication } from "../../application/ActivityApplication";

export class ActivityController {
  constructor(private app: ActivityApplication) {}

  async createActivity(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      if (!user || !["admin", "institution"].includes(user.role)) {
        return res.status(403).json({ error: "No autorizado para crear actividades" });
      }

      const payload = req.body;
      payload.createdBy = user.id;
      const id = await this.app.createActivity(payload);
      return res.status(201).json({ id });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async listActivities(req: Request, res: Response) {
    try {
      const list = await this.app.listActivities(true);
      return res.json(list);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getActivity(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });
      const a = await this.app.getActivity(id);
      if (!a) return res.status(404).json({ error: "Actividad no encontrada" });
      return res.json(a);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async submitEvidence(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const payload = req.body;
      payload.userId = user.id;
      // require activityId param or body
      if (req.params.id) payload.activityId = Number(req.params.id);
      const result = await this.app.submitEvidence(payload);
      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async listEvidenceByActivity(req: Request, res: Response) {
    try {
      const activityId = Number(req.params.activityId);
      const list = await this.app.listEvidenceByActivity(activityId);
      return res.json(list);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async listEvidenceByUser(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const list = await this.app.listEvidenceByUser(userId);
      return res.json(list);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
