// src/middleware/checkRole.js

export function checkRole(...rolesPermitidos) {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!rolesPermitidos.includes(userRole)) {
      return res.status(403).json({ erro: "Acesso negado" });
    }

    next();
  };
}
