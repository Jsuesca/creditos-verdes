import { IAResult } from "../../domain/IAResult";

export interface IAService {
  analyzeImage(urlOrPath: string, activityType?: string): Promise<IAResult>;
  analyzeVideo(urlOrPath: string, activityType?: string): Promise<IAResult>;
  analyzeGPS(gps: { lat: number; lng: number }, activityType?: string): Promise<IAResult>;
  analyzeText(text: string, activityType?: string): Promise<IAResult>;
}
