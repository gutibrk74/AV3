//src/routes/pecaRoutes.js
import { Router } from "express";
import { pecaController } from "../controllers/pecaController.js";
import { auth as authMiddleware } from "../middleware/auth.js";
import { checkRole } from "../middleware/checkRole.js";

const router = Router();

// visualizar — TODOS
router.get("/", authMiddleware, pecaController.listar);

// criar — ADMIN e ENGENHEIRO
router.post("/", authMiddleware, checkRole("ADMIN", "ENGENHEIRO"), pecaController.criar);

// editar — somente ADMIN
router.put("/:id", authMiddleware, checkRole("ADMIN"), pecaController.editar);

// excluir — somente ADMIN
router.delete("/:id", authMiddleware, checkRole("ADMIN"), pecaController.excluir);

export default router;
