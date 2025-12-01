import { prisma } from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginController = {

  async login(req, res) {

    const { usuario, senha } = req.body; 

    try {
      const user = await prisma.usuario.findUnique({
        where: { usuario } 
      });

      if (!user)
        return res.status(401).json({ erro: "Usuário não encontrado" });

      const senhaOK = await bcrypt.compare(senha, user.senha);
      if (!senhaOK)
        return res.status(401).json({ erro: "Senha incorreta" });

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
          usuario: user.usuario
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      return res.json({
        token,
        usuario: {
          id: user.id,
          usuario: user.usuario,
          role: user.role
        }
      });

    } catch (e) {
      console.log(e);
      return res.status(500).json({ erro: "Erro no login" });
    }
  }

};
