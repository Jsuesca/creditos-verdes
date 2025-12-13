export type EvidenceType = "photo" | "video" | "gps" | "text";
export type EvidenceStatus = "pending" | "accepted" | "rejected";

export interface Evidence {
  id: number;
  activityId: number;
  userId: number;
  type: EvidenceType;
  url?: string | null;
  gps?: { lat: number; lng: number } | null;
  text?: string | null;
  createdAt: Date;

  status: EvidenceStatus;

  pointsAwarded?: number | null;
  iaValidationId?: number | null;
}
