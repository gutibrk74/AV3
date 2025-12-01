import { Router } from "express";
import { relatorioController } from "../controllers/relatorioController.js";

const router = Router();

router.get("/", relatorioController.gerar);

export default router;
