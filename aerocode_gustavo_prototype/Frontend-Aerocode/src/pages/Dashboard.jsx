import { useEffect, useState } from "react";
import { api } from "../services/api";
import Chart from "chart.js/auto";
import {
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  PieController,
  ArcElement,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  PieController,
  ArcElement
);

export default function Dashboard() {
  const [aeronaves, setAeronaves] = useState([]);
  const [pecas, setPecas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    const aero = await api.get("/aeronaves");
    const pc = await api.get("/pecas");
    const func = await api.get("/funcionarios");

    setAeronaves(aero.data);
    setPecas(pc.data);
    setFuncionarios(func.data);

    gerarGraficoPecas(pc.data);
    gerarGraficoTipos(aero.data);
  }

  // GRAFICO DE BARRAS
  function gerarGraficoPecas(pecas) {
    const ctx = document.getElementById("grafPecas");
    if (!ctx) return;

    const agrupado = {};
    pecas.forEach((p) => {
      const nome = p.aeronave?.nome || "Desconhecida";
      if (!agrupado[nome]) agrupado[nome] = 0;
      agrupado[nome]++;
    });

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(agrupado),
        datasets: [
              {
                label: "Qtde Peças",
                data: Object.values(agrupado),
                backgroundColor: "#4A90E2",
                borderColor: "rgba(0,0,0,0.35)",
                borderWidth: 1.4,
                borderRadius: 6
              }
            ],
      },
      options: {
        maintainAspectRatio: false,
      }
    });
  }

  // GRAFICO DE PIZZA
  function gerarGraficoTipos(aeronaves) {
  const ctx = document.getElementById("grafTipos");
  if (!ctx) return;

  const tipos = {};

  aeronaves.forEach((a) => {
    if (!tipos[a.tipo]) tipos[a.tipo] = 0;
    tipos[a.tipo]++;
  });

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(tipos),
      datasets: [
        {
          data: Object.values(tipos),
          backgroundColor: [
            "#4A90E2", // Azul Saab (clean)
            "#50E3C2", // Verde radar
            "#003057", // Azul marinho (estilo Lockheed)
            "#B8E986", // Verde stealth suave
            "#376534", // Verde escuro militar
          ],
          borderColor: "rgba(255,255,255,0.85)", // borda leve
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 12,
            color: "#003057",     // Azul Saab nos textos
            font: {
              size: 13,
              family: "Inter, sans-serif",
              weight: "600",
            },
            boxWidth: 14,
          },
        },
      },
    },
  });
}

  return (
    <div>
      <h2>Dashboard Geral</h2>

      {/* CARDS */}
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <div className="card">
          Aeronaves: <span>{aeronaves.length}</span>
        </div>

        <div className="card">
          Peças: <span>{pecas.length}</span>
        </div>

        <div className="card">
          Funcionários: <span>{funcionarios.length}</span>
        </div>
      </div>

      {/* GRAFICO 1 */}
      <div className="chart-box chart-border-light">
        <div className="chart-title">Peças por Aeronave</div>
        <canvas id="grafPecas"></canvas>
      </div>

      {/* GRAFICO 2 */}
      <div className="chart-box chart-border-light">
        <div className="chart-title">Distribuição de Tipos de Aeronaves</div>
        <canvas id="grafTipos"></canvas>
      </div>
    </div>
  );
}
