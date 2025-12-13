import { Request, Response } from "express";
import { CatalogoActividadAdapter } from "../adapter/CatalogoActividadAdapter";

export class CatalogoActividadController {
    private adapter: CatalogoActividadAdapter;

    constructor() {
        this.adapter = new CatalogoActividadAdapter();
    }

    async list(req: Request, res: Response) {
        try {
            const data = await this.adapter.list();
            res.json(data);
        } catch (error) {
            console.error("CATALOGO ERROR:", error);
            res.status(500).json({
                error: "Error obteniendo catálogo",
                details: error instanceof Error ? error.message : error
            });
        }
    }
}
