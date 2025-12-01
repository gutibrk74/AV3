// src/routes/funcionarioRoutes.js
import { Router } from "express";
import { funcionarioController } from "../controllers/funcionarioController.js";
import { auth as authMiddleware } from "../middleware/auth.js";
import { checkRole } from "../middleware/checkRole.js";

const router = Router();

// listar funcionários — ADMIN SOMENTE
router.get("/", authMiddleware, checkRole("ADMIN"), funcionarioController.listar);

// criar — ADMIN
router.post("/", authMiddleware, checkRole("ADMIN"), funcionarioController.criar);

// editar — ADMIN
router.put("/:id", authMiddleware, checkRole("ADMIN"), funcionarioController.editar);

// excluir — ADMIN
router.delete("/:id", authMiddleware, checkRole("ADMIN"), funcionarioController.excluir);

export default router;
