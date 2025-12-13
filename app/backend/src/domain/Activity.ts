export type ActivityLevel = "basic" | "medium" | "pro";

export interface Activity {
  id: number;
  title: string;
  description: string | null;     // null seguro
  checklist: string[] | null;     // null seguro
  basePoints: number;
  deadline: Date | null;
  level: ActivityLevel;
  createdBy: number;
  active: boolean;
  createdAt: Date;
}
