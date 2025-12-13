import { Router } from "express";
import { authenticateToken } from "../web/authMiddleware";
import { UserActivityAdapter } from "../adapter/UserActivityAdapter";
import { UserActivityApplication } from "../../application/UserActivityApplication";
import { UserActivityController } from "../controller/UserActivityController";

const router = Router();

// Inyección de dependencias
const adapter = new UserActivityAdapter();
const app = new UserActivityApplication(adapter);
const controller = new UserActivityController(app);

// Asignar actividad a usuario
router.post("/assign", authenticateToken, (req, res) =>
  controller.assign(req, res)
);

// Listar actividades de un usuario
router.get("/user/:userId", authenticateToken, (req, res) =>
  controller.listByUser(req, res)
);

// Cambiar estado (approved, completed, etc.)
router.put("/:id/status", authenticateToken, (req, res) =>
  controller.updateStatus(req, res)
);

export default router;
