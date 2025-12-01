import { prisma } from "../config/database.js";

export const relatorioController = {

  async gerar(req, res) {
    try {
      const totalAeronaves = await prisma.aeronave.count();
      const totalPecas = await prisma.peca.count();
      const totalEtapas = await prisma.etapa.count();
      const totalTestes = await prisma.teste.count();

      const testesAprovados = await prisma.teste.count({
        where: { resultado: "Aprovado" }
      });

      const testesReprovados = await prisma.teste.count({
        where: { resultado: "Reprovado" }
      });

      return res.json({
        totalAeronaves,
        totalPecas,
        totalEtapas,
        totalTestes,
        testesAprovados,
        testesReprovados
      });

    } catch (err) {
      console.log(err);
      res.status(500).json({ erro: "Erro ao gerar relatório" });
    }
  }

};
