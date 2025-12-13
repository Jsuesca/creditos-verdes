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
  user_id!: number;

  @Column()
  activity_id!: number;

  @Column({ type: "varchar", length: 20 })
  status!: string;

  @Column({ type: "int", nullable: true })
  points!: number | null;

  @CreateDateColumn()
  assignedAt!: Date;

  @Column({ type: "timestamp", nullable: true })
  completedAt!: Date | null;
}
