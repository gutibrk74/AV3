import { Router } from "express";
import { aeronaveController } from "../controllers/aeronaveController.js";
import { auth as authMiddleware } from "../middleware/auth.js";
import { checkRole } from "../middleware/checkRole.js";

const router = Router();

// todos podem visualizar (desde que logados)
router.get("/", authMiddleware, aeronaveController.listar);
router.get("/:id/detalhes", authMiddleware, aeronaveController.detalhes);

// apenas ADMIN cria / edita / exclui
router.post("/", authMiddleware, checkRole("ADMIN"), aeronaveController.criar);
router.put("/:id", authMiddleware, checkRole("ADMIN"), aeronaveController.editar);
router.delete("/:id", authMiddleware, checkRole("ADMIN"), aeronaveController.excluir);

export default router;
