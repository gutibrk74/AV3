import { useEffect, useState } from "react";
import { api } from "../services/api";
import ModalForm from "../components/ModalForm.jsx";
import { useRole } from "../hooks/UseRole";

export default function Etapas() {

  const role = useRole();

  const [etapas, setEtapas] = useState([]);
  const [aeronaves, setAeronaves] = useState([]);

  const [open, setOpen] = useState(false);

  const [aeroId, setAeroId] = useState("");
  const [nome, setNome] = useState("");
  const [dias, setDias] = useState("");
  const [resp, setResp] = useState("");

  const [editId, setEditId] = useState(null);
  const [editAero, setEditAero] = useState("");
  const [editNome, setEditNome] = useState("");
  const [editDias, setEditDias] = useState("");
  const [editResp, setEditResp] = useState("");

  useEffect(() => {
    carregarTudo();
  }, []);

  async function carregarTudo() {
    const e = await api.get("/etapas");
    const a = await api.get("/aeronaves");

    setEtapas(e.data);
    setAeronaves(a.data);
  }

  async function criar(e) {
    e.preventDefault();

    if (!aeroId || !nome || !dias || !resp)
      return alert("Preencha todos os campos!");

    await api.post("/etapas", {
      aeronaveId: Number(aeroId),
      nome,
      dias: Number(dias),
      responsavel: resp
    });

    setAeroId("");
    setNome("");
    setDias("");
    setResp("");

    setOpen(false);
    carregarTudo();
  }

  function ativarEdicao(et) {
    setEditId(et.id);
    setEditAero(et.aeronaveId);
    setEditNome(et.nome);
    setEditDias(et.dias);
    setEditResp(et.responsavel);
  }

  async function salvarEdicao(id) {
    await api.put(`/etapas/${id}`, {
      aeronaveId: Number(editAero),
      nome: editNome,
      dias: Number(editDias),
      responsavel: editResp
    });

    setEditId(null);
    carregarTudo();
  }

  async function excluir(id) {
    if (!confirm("Excluir etapa?")) return;
    await api.delete(`/etapas/${id}`);
    carregarTudo();
  }

  return (
    <div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2>Etapas</h2>

        {role !== "OPERADOR" && (
          <button className="btn" onClick={() => setOpen(true)}>
            + Registrar Etapa
          </button>
        )}
      </div>

      {open && (
        <ModalForm title="Registrar Etapa" onClose={() => setOpen(false)}>
          <form className="form" onSubmit={criar}>

            <div className="field">
              <label>Aeronave</label>
              <select value={aeroId} onChange={e => setAeroId(e.target.value)}>
                <option value="">Selecione a aeronave...</option>
                {aeronaves.map(a => (
                  <option key={a.id} value={a.id}>{a.nome}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Nome da etapa</label>
              <input
                placeholder="Ex: Montagem das asas"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Dias estimados</label>
              <input
                type="number"
                placeholder="Ex: 12 dias"
                value={dias}
                onChange={e => setDias(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Responsável</label>
              <input
                placeholder="Ex: Eng. Roberto Almeida"
                value={resp}
                onChange={e => setResp(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
              <button type="button" className="btn" onClick={() => setOpen(false)}>Cancelar</button>
              <button className="btn primary">Salvar</button>
            </div>

          </form>
        </ModalForm>
      )}

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Aeronave</th>
              <th>Nome</th>
              <th>Dias</th>
              <th>Responsável</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {etapas.map(et => (
              <tr key={et.id}>
                <td>{et.id}</td>

                <td>
                  {editId === et.id ? (
                    <select value={editAero} onChange={e => setEditAero(e.target.value)}>
                      {aeronaves.map(a => (
                        <option key={a.id} value={a.id}>{a.nome}</option>
                      ))}
                    </select>
                  ) : et.aeronave?.nome}
                </td>

                <td>
                  {editId === et.id ? (
                    <input value={editNome} onChange={e => setEditNome(e.target.value)} />
                  ) : et.nome}
                </td>

                <td>
                  {editId === et.id ? (
                    <input value={editDias} onChange={e => setEditDias(e.target.value)} />
                  ) : et.dias}
                </td>

                <td>
                  {editId === et.id ? (
                    <input value={editResp} onChange={e => setEditResp(e.target.value)} />
                  ) : et.responsavel}
                </td>

                <td>
                  {editId === et.id ? (
                    <>
                      {role !== "OPERADOR" && (
                        <button className="btn-sm primary" onClick={() => salvarEdicao(et.id)}>
                          Salvar
                        </button>
                      )}
                      <button className="btn-sm danger" onClick={() => setEditId(null)}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      {role !== "OPERADOR" && (
                        <button className="btn-sm primary" onClick={() => ativarEdicao(et)}>
                          Editar
                        </button>
                      )}

                      {role === "ADMIN" && (
                        <button className="btn-sm danger" onClick={() => excluir(et.id)}>
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
