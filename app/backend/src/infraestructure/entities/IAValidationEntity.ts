import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("validaciones_ia")
export class IAValidationEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "integer" })
  evidence_id!: number;

  @Column({ type: "jsonb" })
  result!: any;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
}
