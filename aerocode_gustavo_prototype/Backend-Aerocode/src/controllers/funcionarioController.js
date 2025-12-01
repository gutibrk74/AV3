import { prisma } from "../config/database.js";

export const funcionarioController = {

  async listar(req, res) {
    const funcionarios = await prisma.funcionario.findMany();
    res.json(funcionarios);
  },

  async criar(req, res) {
    const { nome, cargo } = req.body;

    const novoFuncionario = await prisma.funcionario.create({
      data: { nome, cargo }
    });

    res.json(novoFuncionario);
  },

  async editar(req, res) {
    const { id } = req.params;
    const { nome, cargo } = req.body;

    try {
      const atualizado = await prisma.funcionario.update({
        where: { id: Number(id) },
        data: { nome, cargo }
      });

      res.json(atualizado);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao editar funcionário" });
    }
  },

  async excluir(req, res) {
    const { id } = req.params;

    try {
      await prisma.funcionario.delete({
        where: { id: Number(id) }
      });

      res.json({ mensagem: "Funcionário excluído" });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao excluir funcionário" });
    }
  }

};
