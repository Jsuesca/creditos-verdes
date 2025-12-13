import { Router } from "express";
import { authenticateToken } from "../web/authMiddleware";
import { ActivityController } from "../controller/ActivityController";
import { CatalogoActividadController } from "../controller/CatalogoActividadController";
import { ActivityAdapter } from "../adapter/ActivityAdapter";
import { IAServiceStub } from "../ia/IAServiceStub";
import { ActivityApplication } from "../../application/ActivityApplication";

const router = Router();

// Inyección de dependencias
const adapter = new ActivityAdapter();
const ia = new IAServiceStub();
const app = new ActivityApplication(adapter, ia);
const activityController = new ActivityController(app);
const catalogController = new CatalogoActividadController();

/* =======================
   CATÁLOGO (PÚBLICO)
   ======================= */
router.get("/catalog", (req, res) =>
  catalogController.list(req, res)
);

/* =======================
   ACTIVIDADES
   ======================= */
router.post("/", authenticateToken, (req, res) =>
  activityController.createActivity(req, res)
);

router.get("/", authenticateToken, (req, res) =>
  activityController.listActivities(req, res)
);

router.get("/:id", authenticateToken, (req, res) =>
  activityController.getActivity(req, res)
);

export default router; // 🔥 ESTO ES CLAVE
