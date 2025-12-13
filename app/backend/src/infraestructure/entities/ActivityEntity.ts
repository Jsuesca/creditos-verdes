import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("actividades_usuario")
export class ActivityEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 200 })
  title!: string;

  @Column({ type: "text", nullable: true })
  description?: string | null;

  @Column({ type: "jsonb", nullable: true })
  checklist?: string[] | null;

  @Column({ type: "integer", default: 10 })
  base_points!: number;

  @Column({ type: "timestamp", nullable: true })
  deadline?: Date | null;

  @Column({ type: "varchar", length: 20, default: "basic" })
  level!: string;

  @Column({ type: "integer" })
  created_by!: number;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
}


