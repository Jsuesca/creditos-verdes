export interface IAResult {
  valid: boolean;
  confidence: number;          // 0..1
  labels: string[];            // detected labels
  fraudDetected: boolean;
  score: number;               // recommendation points
  message?: string;
  extra?: any;
}
