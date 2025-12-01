import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useRole } from "../hooks/UseRole";

export default function Pecas() {

  const role = useRole();

  const [pecas, setPecas] = useState([]);
  const [aeronaves, setAeronaves] = useState([]);

  // criação
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [aeronaveId, setAeronaveId] = useState("");

  // edição
  const [editId, setEditId] = useState(null);
  const [editNome, setEditNome] = useState("");
  const [editCodigo, setEditCodigo] = useState("");
  const [editAero, setEditAero] = useState("");

  useEffect(() => {
    carregarTudo();
  }, []);

  async function carregarTudo() {
    const p = await api.get("/pecas");
    const a = await api.get("/aeronaves");
    setPecas(p.data);
    setAeronaves(a.data);
  }

  async function criarPeca(e) {
    e.preventDefault();
    await api.post("/pecas", {
      nome,
      codigo,
      aeronaveId: Number(aeronaveId)
    });

    setNome("");
    setCodigo("");
    setAeronaveId("");

    carregarTudo();
  }

  async function salvarEdicao(id) {
    await api.put(`/pecas/${id}`, {
      nome: editNome,
      codigo: editCodigo,
      aeronaveId: Number(editAero)
    });

    setEditId(null);
    carregarTudo();
  }

  async function excluir(id) {
    if (!confirm("Excluir peça?")) return;
    await api.delete(`/pecas/${id}`);
    carregarTudo();
  }

  return (
    <div>
      <h2>Peças</h2>

      {/* FORM DE CRIAÇÃO — não aparece para OPERADOR */}
      {role !== "OPERADOR" && (
        <form onSubmit={criarPeca} className="form" style={{ marginBottom: 20 }}>

          <div className="field">
            <label>Nome</label>
            <input
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Ex: Painel de Controle"
            />
          </div>

          <div className="field">
            <label>Código</label>
            <input
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              placeholder="Ex: PCX-3321"
            />
          </div>

          <div className="field">
            <label>Aeronave</label>
            <select value={aeronaveId} onChange={e => setAeronaveId(e.target.value)}>
              <option value="">Selecione...</option>
              {aeronaves.map(a => (
                <option key={a.id} value={a.id}>{a.nome}</option>
              ))}
            </select>
          </div>

          <button className="btn primary">Salvar</button>

        </form>
      )}

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Código</th>
              <th>Aeronave</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {pecas.map(p => (
              <tr key={p.id}>

                <td>{p.id}</td>

                {/* Nome */}
                <td>
                  {editId === p.id ? (
                    <input
                      value={editNome}
                      onChange={e => setEditNome(e.target.value)}
                    />
                  ) : (
                    p.nome
                  )}
                </td>

                {/* Código */}
                <td>
                  {editId === p.id ? (
                    <input
                      value={editCodigo}
                      onChange={e => setEditCodigo(e.target.value)}
                    />
                  ) : (
                    p.codigo
                  )}
                </td>

                {/* Aeronave */}
                <td>
                  {editId === p.id ? (
                    <select value={editAero} onChange={e => setEditAero(e.target.value)}>
                      {aeronaves.map(a => (
                        <option key={a.id} value={a.id}>{a.nome}</option>
                      ))}
                    </select>
                  ) : (
                    p.aeronave?.nome
                  )}
                </td>

                {/* Ações */}
                <td>
                  {editId === p.id ? (
                    <>
                      {role !== "OPERADOR" && (
                        <button className="btn-sm primary" onClick={() => salvarEdicao(p.id)}>
                          Salvar
                        </button>
                      )}
                      <button className="btn-sm danger" onClick={() => setEditId(null)}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      {/* EDITAR: ADMIN e ENGENHEIRO */}
                      {role !== "OPERADOR" && (
                        <button className="btn-sm primary" onClick={() => setEditId(p.id)}>
                          Editar
                        </button>
                      )}

                      {/* EXCLUIR: apenas ADMIN */}
                      {role === "ADMIN" && (
                        <button className="btn-sm danger" onClick={() => excluir(p.id)}>
                          Excluir
                        </button>
                      )}
                    </>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
