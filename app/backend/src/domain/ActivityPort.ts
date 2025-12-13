import { Activity } from "./Activity";
import { Evidence } from "./Evidence";
import { IAResult } from "./IAResult";

export interface ActivityPort {
  // Activities
  createActivity(activity: Omit<Activity, "id" | "createdAt">): Promise<number>;
  getActivityById(id: number): Promise<Activity | null>;
  listActivities(activeOnly?: boolean): Promise<Activity[]>;

  // Evidence
  createEvidence(evidence: Omit<Evidence, "id" | "createdAt" | "status">): Promise<number>;
  listEvidenceByActivity(activityId: number): Promise<Evidence[]>;
  listEvidenceByUser(userId: number): Promise<Evidence[]>;
  updateEvidenceStatus(evidenceId: number, status: Evidence["status"], points?: number, iaValidationId?: number): Promise<boolean>;

  // IA log
  saveIAResult(evidenceId: number, result: IAResult): Promise<number>;
  getIAResult(id: number): Promise<IAResult | null>;
}
