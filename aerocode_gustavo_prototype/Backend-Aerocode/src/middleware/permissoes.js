// src/middleware/permissoes.js

export function permitir(...rolesPermitidos) {
  // rolesPermitidos exemplo: ("ADMIN", "ENGENHEIRO")
  return (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(401).json({ erro: "Usuário não autenticado" });

    // role esperado no token: user.role (string)
    if (!rolesPermitidos.includes(user.role)) {
      return res.status(403).json({ erro: "Acesso negado: permissões insuficientes" });
    }

    next();
  };
}
