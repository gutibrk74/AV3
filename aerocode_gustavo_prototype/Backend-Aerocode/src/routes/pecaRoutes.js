import { Router } from "express";
import { pecaController } from "../controllers/pecaController.js";
import { auth as authMiddleware } from "../middleware/auth.js";
import { checkRole } from "../middleware/checkRole.js";

const router = Router();

// visualizar — TODOS (logados)
router.get("/", authMiddleware, pecaController.listar);

// criar — ADMIN e ENGENHEIRO
router.post("/", authMiddleware, checkRole("ADMIN", "ENGENHEIRO"), pecaController.criar);

// editar — ADMIN e ENGENHEIRO (ajustado)
router.put("/:id", authMiddleware, checkRole("ADMIN", "ENGENHEIRO"), pecaController.editar);

// excluir — ADMIN e ENGENHEIRO (ajustado)
router.delete("/:id", authMiddleware, checkRole("ADMIN", "ENGENHEIRO"), pecaController.excluir);

export default router;
