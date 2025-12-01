// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  console.log("🌱 Iniciando seed...");

  // -------------------------------------
  // 1) Criar usuários do sistema (login)
  // -------------------------------------
  const senhaAdmin = await bcrypt.hash("admin123", 10);
  const senhaEng = await bcrypt.hash("eng123", 10);
  const senhaOp = await bcrypt.hash("op123", 10);

  await prisma.usuario.createMany({
    data: [
      {
        nome: "Administrador",
        usuario: "admin",
        senha: senhaAdmin,
        role: "ADMIN",
      },
      {
        nome: "Engenheiro Chefe",
        usuario: "eng",
        senha: senhaEng,
        role: "ENGENHEIRO",
      },
      {
        nome: "Operador de Linha",
        usuario: "operador",
        senha: senhaOp,
        role: "OPERADOR",
      }
    ]
  });

  // -------------------------------------
  // 2) Cadastrar Aeronaves
  // -------------------------------------
  const aeronaves = await prisma.aeronave.createMany({
    data: [
      { nome: "F-39E Gripen", tipo: "Caça" },
      { nome: "F-35 Lightning II", tipo: "Caça multirole furtivo" },
      { nome: "F-22 Raptor", tipo: "Caça de superioridade aérea furtivo" },
      { nome: "Su-57 T-50 (Felon)", tipo: "Caça stealth de 5ª geração" },
      { nome: "Embraer EMB-314 Super Tucano", tipo: "Treinamento / Ataque leve" },
      { nome: "Polikarpov I-16", tipo: "Caça leve histórico" }
    ]
  });

  console.log("✈ Aeronaves criadas:", aeronaves.count);

  // Obter IDs das aeronaves
  const gripen = await prisma.aeronave.findFirst({ where: { nome: "F-39E Gripen" }});
  const f35    = await prisma.aeronave.findFirst({ where: { nome: "F-35 Lightning II" }});
  const f22    = await prisma.aeronave.findFirst({ where: { nome: "F-22 Raptor" }});
  const su57   = await prisma.aeronave.findFirst({ where: { nome: "Su-57 T-50 (Felon)" }});
  const tucano = await prisma.aeronave.findFirst({ where: { nome: "Embraer EMB-314 Super Tucano" }});
  const i16    = await prisma.aeronave.findFirst({ where: { nome: "Polikarpov I-16" }});

  // -------------------------------------
  // 3) Peças (motores e turbinas)
  // -------------------------------------
  await prisma.peca.createMany({
    data: [
      // Gripen (1 motor)
      { nome: "Volvo RM12", codigo: "RM12-001", aeronaveId: gripen.id },

      // F-35 (1 motor)
      { nome: "Pratt & Whitney F135", codigo: "PW-F135-900", aeronaveId: f35.id },

      // F-22 (2 motores)
      { nome: "Pratt & Whitney F119 LEFT",  codigo: "PW-F119-L", aeronaveId: f22.id },
      { nome: "Pratt & Whitney F119 RIGHT", codigo: "PW-F119-R", aeronaveId: f22.id },

      // Su-57 (usa conjunto atual + conjunto futuro)
      { nome: "Saturno AL-41F1 (Atual)",  codigo: "AL41F1-L", aeronaveId: su57.id },
      { nome: "Saturno AL-41F1 (Atual)",  codigo: "AL41F1-R", aeronaveId: su57.id },
      { nome: "Izdeliye 30 (Futuro)",      codigo: "I30-L", aeronaveId: su57.id },
      { nome: "Izdeliye 30 (Futuro)",      codigo: "I30-R", aeronaveId: su57.id },

      // Tucano (1 turbina pequena)
      { nome: "Pratt & Whitney PT6A-68", codigo: "PT6A-68", aeronaveId: tucano.id },

      // I-16 (motor radial antigo)
      { nome: "Motor Shvetsov M-25", codigo: "M25-I16", aeronaveId: i16.id }
    ]
  });

  console.log("⚙ Peças criadas");

  // -------------------------------------
  // 4) Etapas (ex.: problema no F-22)
  // -------------------------------------
  await prisma.etapa.create({
    data: {
      aeronaveId: f22.id,
      nome: "Montagem do Sistema de Oxigênio",
      dias: 45,
      responsavel: "Eng. João Silva"
    }
  });

  console.log("📌 Etapas criadas");

  // -------------------------------------
  // 5) Testes
  // -------------------------------------
  await prisma.teste.create({
    data: {
      aeronaveId: f22.id,
      tipo: "Teste do Sistema de Oxigênio",
      resultado: "Reprovado",
      observacoes: "Falha no fluxo de O2 detectada"
    }
  });

  console.log("🧪 Testes criados");

  // -------------------------------------
  // 6) Funcionários
  // -------------------------------------
  await prisma.funcionario.createMany({
    data: [
      { nome: "Gustavo Felipe", cargo: "Piloto de Testes" },
      { nome: "João Silva", cargo: "Engenheiro Responsável" }
    ]
  });

  console.log("👷 Funcionários criados!");

  console.log("\n🌱 SEED FINALIZADO COM SUCESSO!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
