import { prisma } from "../config/database.js";

export const etapaController = {

  async listar(req, res) {
    const etapas = await prisma.etapa.findMany({
      include: { aeronave: true }
    });
    res.json(etapas);
  },

  async criar(req, res) {
    const { aeronaveId, nome, dias, responsavel } = req.body;

    const novaEtapa = await prisma.etapa.create({
      data: {
        aeronaveId,
        nome,
        dias,
        responsavel
      }
    });

    res.json(novaEtapa);
  },

  async editar(req, res) {
    const id = Number(req.params.id);
    const { aeronaveId, nome, dias, responsavel } = req.body;

    const etapa = await prisma.etapa.update({
      where: { id },
      data: {
        aeronaveId,
        nome,
        dias,
        responsavel
      }
    });

    res.json(etapa);
  },

  async excluir(req, res) {
    const id = Number(req.params.id);

    await prisma.etapa.delete({
      where: { id }
    });

    res.json({ mensagem: "Etapa excluída" });
  }

};
