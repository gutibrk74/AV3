import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import "../styles.css";

export default function AeronaveDetalhe() {

  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const resp = await api.get(`/aeronaves/${id}/detalhes`);
        setData(resp.data);
      } catch (e) {
        alert("Erro ao carregar detalhes");
      }
    }
    carregar();
  }, [id]);

  if (!data) return <p>Carregando...</p>;

  return (
    <div className="detalhes-container">

      <h2 className="titulo-pagina">
        Detalhes da Aeronave — {data.nome}
      </h2>

      <div className="detalhes-grid">

        {/* CARD 1 – Dados da aeronave */}
        <div className="detalhes-card">
          <h3>Dados da Aeronave</h3>
          <p><b>Nome:</b> {data.nome}</p>
          <p><b>Tipo:</b> {data.tipo}</p>
        </div>

        {/* CARD 2 – Etapas */}
        <div className="detalhes-card">
          <h3>Etapas vinculadas</h3>
          {data.etapas.length > 0 ? (
            data.etapas.map(e => (
              <p key={e.id}>{e.nome} — {e.dias} dias</p>
            ))
          ) : (
            <p className="vazio">Nenhuma etapa.</p>
          )}
        </div>

        {/* CARD 3 – Peças */}
        <div className="detalhes-card">
          <h3>Peças vinculadas</h3>
          {data.pecas.length > 0 ? (
            data.pecas.map(p => (
              <p key={p.id}>{p.nome} — {p.codigo}</p>
            ))
          ) : (
            <p className="vazio">Nenhuma peça.</p>
          )}
        </div>

        {/* CARD 4 – Testes */}
        <div className="detalhes-card">
          <h3>Testes realizados</h3>
          {data.testes.length > 0 ? (
            data.testes.map(t => (
              <p key={t.id}>{t.tipo} — {t.resultado}</p>
            ))
          ) : (
            <p className="vazio">Nenhum teste.</p>
          )}
        </div>

      </div>

    </div>
  );
}
