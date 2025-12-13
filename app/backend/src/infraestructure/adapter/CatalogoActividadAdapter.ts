import { AppDataSource } from "../config/data-base";
import { CatalogoActividad } from "../entities/CatalogoActividad";

export class CatalogoActividadAdapter {
  private repo = AppDataSource.getRepository(CatalogoActividad);

  async list() {
    return this.repo.find();
  }
}
