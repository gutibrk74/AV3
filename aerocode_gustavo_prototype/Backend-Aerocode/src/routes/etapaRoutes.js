// src/routes/etapaRoutes.js
import { Router } from "express";
import { etapaController } from "../controllers/etapaController.js";
import { auth } from "../middleware/auth.js";
import { permitir } from "../middleware/permissoes.js";

const router = Router();

router.get("/", auth, permitir("ADMIN","ENGENHEIRO","OPERADOR"), etapaController.listar);
router.post("/", auth, permitir("ADMIN","ENGENHEIRO"), etapaController.criar);
router.put("/:id", auth, permitir("ADMIN","ENGENHEIRO"), etapaController.editar);
router.delete("/:id", auth, permitir("ADMIN"), etapaController.excluir);

export default router;
