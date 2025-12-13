import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("actividades_usuario")
export class UserActivityEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  activityId!: number;

  @Column({
    type: "varchar",
    length: 20,
    default: "assigned",
  })
  status!: "assigned" | "in_progress" | "completed" | "approved";

  @Column({ type: "integer", nullable: true })
  points!: number | null;

  @CreateDateColumn()
  assignedAt!: Date;

  @Column({ type: "timestamp", nullable: true })
  completedAt!: Date | null;
}
