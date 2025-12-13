import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("catalogo_actividades")
export class CatalogoActividad {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 80 })
  clave!: string;

  @Column({ type: "varchar", length: 120 })
  nombre!: string;

  @Column({ type: "text" })
  descripcion!: string;
}
