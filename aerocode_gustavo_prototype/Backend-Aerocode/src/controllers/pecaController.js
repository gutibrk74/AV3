import { prisma } from "../config/database.js";

export const pecaController = {

  // LISTAR
  async listar(req, res) {
    const pecas = await prisma.peca.findMany({
      include: { aeronave: true }
    });
    res.json(pecas);
  },

  // CRIAR
  async criar(req, res) {
    const { nome, codigo, aeronaveId } = req.body;

    const novaPeca = await prisma.peca.create({
      data: { 
        nome, 
        codigo, 
        aeronaveId: Number(aeronaveId) 
      }
    });

    res.json(novaPeca);
  },

  // EDITAR
  async editar(req, res) {
    const { id } = req.params;
    const { nome, codigo, aeronaveId } = req.body;

    try {
      const editada = await prisma.peca.update({
        where: { id: Number(id) },
        data: { 
          nome, 
          codigo,
          aeronaveId: Number(aeronaveId)
        }
      });

      res.json(editada);
    } catch (e) {
      res.status(500).json({ erro: "Erro ao editar peça" });
    }
  },

  // EXCLUIR
  async excluir(req, res) {
    const { id } = req.params;

    try {
      await prisma.peca.delete({
        where: { id: Number(id) }
      });

      res.json({ mensagem: "Peça excluída" });
    } catch (e) {
      res.status(500).json({ erro: "Erro ao excluir peça" });
    }
  }

};
