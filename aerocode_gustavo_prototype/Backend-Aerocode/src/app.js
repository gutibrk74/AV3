import express from "express";
import cors from "cors";

import { performanceMiddleware } from "./middleware/performanceMiddleware.js";
import loginRoutes from "./routes/loginRoutes.js";

import aeronaveRoutes from "./routes/aeronaveRoutes.js";
import pecaRoutes from "./routes/pecaRoutes.js";
import funcionarioRoutes from "./routes/funcionarioRoutes.js";
import etapaRoutes from "./routes/etapaRoutes.js";
import testeRoutes from "./routes/testeRoutes.js";
import relatorioRoutes from "./routes/relatorioRoutes.js";

const app = express();

// Essencial — req.body funcionando
app.use(express.json());
app.use(cors());

// Middleware global para medir desempenho
app.use(performanceMiddleware);

// ROTAS PÚBLICAS (não precisam de token)
app.get("/", (req, res) => res.json({ message: "API Aerocode OK!" }));
app.use("/login", loginRoutes);   // LOGIN DEVE VIR ANTES DAS ROTAS PROTEGIDAS

// ROTAS PROTEGIDAS (verificam token + permissões)
app.use("/aeronaves", aeronaveRoutes);
app.use("/pecas", pecaRoutes);
app.use("/funcionarios", funcionarioRoutes);
app.use("/etapas", etapaRoutes);
app.use("/testes", testeRoutes);
app.use("/relatorio", relatorioRoutes);

export default app;