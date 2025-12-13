// src/infrastructure/entities/Session.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('sesiones')
export class Session {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "integer" })
  usuario_id!: number;

  @Column({ type: "varchar", length: 512 })
  token!: string;

  @Column({ type: "timestamp", nullable: true })
  fecha_expiracion?: Date;

  @CreateDateColumn({ type: "timestamp" })
  fecha_inicio!: Date;
}
