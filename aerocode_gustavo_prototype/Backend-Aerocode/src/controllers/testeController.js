import { prisma } from "../config/database.js";

export const testeController = {

  async listar(req, res) {
    const testes = await prisma.teste.findMany({
      include: { aeronave: true }
    });
    res.json(testes);
  },

  async criar(req, res) {
    const { aeronaveId, tipo, resultado, observacoes } = req.body;

    const novo = await prisma.teste.create({
      data: {
        aeronaveId,
        tipo,
        resultado,
        observacoes
      }
    });

    res.json(novo);
  },

  async editar(req, res) {
    const id = Number(req.params.id);
    const { aeronaveId, tipo, resultado, observacoes } = req.body;

    const atualizado = await prisma.teste.update({
      where: { id },
      data: {
        aeronaveId,
        tipo,
        resultado,
        observacoes
      }
    });

    res.json(atualizado);
  },

  async excluir(req, res) {
    const id = Number(req.params.id);

    await prisma.teste.delete({
      where: { id }
    });

    res.json({ mensagem: "Teste excluído" });
  }

};
