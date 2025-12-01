// src/routes/testeRoutes.js
import { Router } from "express";
import { testeController } from "../controllers/testeController.js";
import { auth as authMiddleware } from "../middleware/auth.js";
import { checkRole } from "../middleware/checkRole.js";

const router = Router();

// visualizar — TODOS
router.get("/", authMiddleware, testeController.listar);

// criar — ADMIN ou ENGENHEIRO
router.post("/", authMiddleware, checkRole("ADMIN", "ENGENHEIRO"), testeController.criar);

// editar — só ADMIN
router.put("/:id", authMiddleware, checkRole("ADMIN"), testeController.editar);

// excluir — só ADMIN
router.delete("/:id", authMiddleware, checkRole("ADMIN"), testeController.excluir);

export default router;
