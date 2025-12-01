// src/middleware/auth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function auth(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) return res.status(401).json({ erro: "Token não enviado" });

  // header: "Bearer <token>"
  const parts = authHeader.split(" ");
  if (parts.length !== 2) return res.status(401).json({ erro: "Formato inválido" });

  const scheme = parts[0];
  const token = parts[1];

  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ erro: "Formato inválido do token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // anexar usuário no request para middlewares/handlers seguintes
    req.user = payload; // payload deve conter id, username, role
    next();
  } catch (e) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}
