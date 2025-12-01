import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useRole } from "../hooks/UseRole";

export default function Relatorio() {

  const role = useRole();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const resp = await api.get("/relatorio");
        setData(resp.data);
      } catch (e) {
        alert("Erro ao carregar relatório");
      }
    }
    carregar();
  }, []);

  if (!data) return <p>Carregando relatório...</p>;

  return (
    <div className="detalhes-container">

      <h2 className="titulo-pagina">
        Relatório Geral do Sistema
      </h2>

      <div className="detalhes-grid">

        {/* CARD 1 – Aeronaves */}
        <div className="detalhes-card">
          <h3>Aeronaves</h3>
          <p><b>Total:</b> {data.totalAeronaves}</p>
        </div>

        {/* CARD 2 – Peças */}
        <div className="detalhes-card">
          <h3>Peças</h3>
          <p><b>Total:</b> {data.totalPecas}</p>
        </div>

        {/* CARD 3 – Etapas */}
        <div className="detalhes-card">
          <h3>Etapas</h3>
          <p><b>Total:</b> {data.totalEtapas}</p>
        </div>

        {/* CARD 4 – Testes */}
        <div className="detalhes-card">
          <h3>Testes</h3>

          <p><b>Total:</b> {data.totalTestes}</p>

          <div style={{ marginTop: "12px" }}>
            <p>✔ <b>Aprovados:</b> {data.testesAprovados}</p>
            <p>❌ <b>Reprovados:</b> {data.testesReprovados}</p>
          </div>
          
        </div>

      </div>

    </div>
  );
}
