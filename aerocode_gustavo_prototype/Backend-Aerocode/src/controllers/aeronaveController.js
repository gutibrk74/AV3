import { prisma } from "../config/database.js";

export const aeronaveController = {

  // LISTAR
  async listar(req, res) {
    const aeronaves = await prisma.aeronave.findMany();
    res.json(aeronaves);
  },

  // CRIAR
  async criar(req, res) {
    const { nome, tipo } = req.body;

    const novaAeronave = await prisma.aeronave.create({
      data: { nome, tipo }
    });

    res.json(novaAeronave);
  },

  // 🔍 DETALHES COMPLETOS DA AERONAVE (OTIMIZADO)
  async detalhes(req, res) {
    const { id } = req.params;

    try {
      const aeronave = await prisma.aeronave.findUnique({
        where: { id: Number(id) },
        include: {
          etapas: true,
          pecas: true,
          testes: true,
        }
      });

      if (!aeronave) {
        return res.status(404).json({ erro: "Aeronave não encontrada" });
      }

      return res.json(aeronave);

    } catch (e) {
      console.error(e);
      return res.status(500).json({ erro: "Erro ao obter detalhes da aeronave" });
    }
  },

  // EDITAR
  async editar(req, res) {
    const { id } = req.params;
    const { nome, tipo } = req.body;

    try {
      const editada = await prisma.aeronave.update({
        where: { id: Number(id) },
        data: { nome, tipo }
      });

      res.json(editada);
    } catch (e) {
      res.status(500).json({ erro: "Erro ao editar aeronave" });
    }
  },

  // EXCLUIR
  async excluir(req, res) {
    const { id } = req.params;

    try {
      await prisma.aeronave.delete({
        where: { id: Number(id) }
      });

      res.json({ mensagem: "Aeronave excluída" });
    } catch (e) {
      res.status(500).json({ erro: "Erro ao excluir aeronave" });
    }
  }

};
