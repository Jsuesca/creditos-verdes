import { ActivityPort } from "../domain/ActivityPort";
import { Activity } from "../domain/Activity";
import { IAService } from "../infraestructure/ia/IAService";
import { IAResult } from "../domain/IAResult";

export class ActivityApplication {
  constructor(private port: ActivityPort, private iaService: IAService) {}

  async createActivity(payload: Omit<Activity, "id" | "createdAt">): Promise<number> {
    return this.port.createActivity(payload);
  }

  async getActivity(id: number): Promise<Activity | null> {
    return this.port.getActivityById(id);
  }

  async listActivities(activeOnly = true): Promise<Activity[]> {
    return this.port.listActivities(activeOnly);
  }

  async submitEvidence(evidence: Omit<any, "id" | "createdAt" | "status">): Promise<{ evidenceId: number; iaResultId?: number }> {
    const evidenceId = await this.port.createEvidence(evidence);

    let iaResult: IAResult;
    if (evidence.type === "photo" && evidence.url) {
      iaResult = await this.iaService.analyzeImage(evidence.url, "generic");
    } else if (evidence.type === "video" && evidence.url) {
      iaResult = await this.iaService.analyzeVideo(evidence.url, "generic");
    } else if (evidence.type === "gps" && evidence.gps) {
      iaResult = await this.iaService.analyzeGPS(evidence.gps, "generic");
    } else if (evidence.type === "text" && evidence.text) {
      iaResult = await this.iaService.analyzeText(evidence.text, "generic");
    } else {
      iaResult = {
        valid: false,
        confidence: 0,
        labels: [],
        fraudDetected: false,
        score: 0,
        message: "No se pudo analizar la evidencia"
      };
    }

    const iaResultId = await this.port.saveIAResult(evidenceId, iaResult);

    const status = iaResult.valid && !iaResult.fraudDetected ? "accepted" : "rejected";
    const points = iaResult.valid && !iaResult.fraudDetected ? Math.max(0, Math.round(iaResult.score)) : 0;

    await this.port.updateEvidenceStatus(evidenceId, status, points, iaResultId);

    return { evidenceId, iaResultId };
  }

  async listEvidenceByActivity(activityId: number) {
    return this.port.listEvidenceByActivity(activityId);
  }

  async listEvidenceByUser(userId: number) {
    return this.port.listEvidenceByUser(userId);
  }
}
