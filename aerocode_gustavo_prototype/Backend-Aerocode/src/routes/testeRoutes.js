// src/routes/testeRoutes.js
import { Router } from "express";
import { testeController } from "../controllers/testeController.js";
import { auth as authMiddleware } from "../middleware/auth.js";
import { checkRole } from "../middleware/checkRole.js";

const router = Router();

// VISUALIZAR — TODOS
router.get("/", authMiddleware, testeController.listar);

// CRIAR — ADMIN, ENGENHEIRO e OPERADOR
router.post("/", authMiddleware, checkRole("ADMIN", "ENGENHEIRO", "OPERADOR"), testeController.criar);

// EDITAR — ADMIN, ENGENHEIRO e OPERADOR
router.put("/:id", authMiddleware, checkRole("ADMIN", "ENGENHEIRO", "OPERADOR"), testeController.editar);

// EXCLUIR — apenas ADMIN
router.delete("/:id", authMiddleware, checkRole("ADMIN"), testeController.excluir);

export default router;
