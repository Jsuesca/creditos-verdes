import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("evidencias")
export class EvidenceEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "integer" })
  activity_id!: number;

  @Column({ type: "integer" })
  user_id!: number;

  @Column({ type: "varchar", length: 20 })
  type!: string; // photo, video, gps, text

  @Column({ type: "varchar", length: 1024, nullable: true })
  url?: string | null;

  @Column({ type: "jsonb", nullable: true })
  gps?: { lat: number; lng: number } | null;

  @Column({ type: "text", nullable: true })
  text?: string | null;

  @Column({ type: "varchar", length: 20, default: "pending" })
  status!: string; // pending|accepted|rejected

  @Column({ type: "integer", nullable: true })
  points_awarded?: number | null;

  @Column({ type: "integer", nullable: true })
  ia_validation_id?: number | null;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
}
