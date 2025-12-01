import { useEffect, useState } from "react";
import { api } from "../services/api";
import ModalForm from "../components/ModalForm.jsx";
import { useNavigate } from "react-router-dom";
import { useRole } from "../hooks/UseRole";

export default function Aeronaves() {

  const navigate = useNavigate();
  const role = useRole(); 

  const [aeronaves, setAeronaves] = useState([]);

  const [open, setOpen] = useState(false);

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");

  const [editId, setEditId] = useState(null);
  const [editNome, setEditNome] = useState("");
  const [editTipo, setEditTipo] = useState("");

  useEffect(() => {
    carregarAeronaves();
  }, []);

  async function carregarAeronaves() {
    const resp = await api.get("/aeronaves");
    setAeronaves(resp.data);
  }

  async function criarAeronave(e) {
    e.preventDefault();

    if (!nome || !tipo) return alert("Preencha todos os campos!");

    await api.post("/aeronaves", { nome, tipo });

    setNome("");
    setTipo("");
    setOpen(false);

    carregarAeronaves();
  }

  function ativarEdicao(aero) {
    setEditId(aero.id);
    setEditNome(aero.nome);
    setEditTipo(aero.tipo);
  }

  async function salvarEdicao(id) {
    await api.put(`/aeronaves/${id}`, { nome: editNome, tipo: editTipo });

    setEditId(null);
    carregarAeronaves();
  }

  async function excluir(id) {
    if (!confirm("Deseja excluir a aeronave?")) return;

    await api.delete(`/aeronaves/${id}`);
    carregarAeronaves();
  }

  return (
    <div>

      {/* CABEÇALHO */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2>Aeronaves</h2>

        {/* ADMIN e ENGENHEIRO podem criar */}
        {role !== "OPERADOR" && (
          <button className="btn" onClick={() => setOpen(true)}>
            + Registrar Aeronave
          </button>
        )}
      </div>

      {/* MODAL */}
      {open && (
        <ModalForm title="Registrar Aeronave" onClose={() => setOpen(false)}>
          <form className="form" onSubmit={criarAeronave}>

            <div className="field">
              <label>Nome da aeronave</label>
              <input
                value={nome}
                placeholder="Ex: F-39E Gripen"
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Tipo</label>
              <input
                value={tipo}
                placeholder="Ex: Caça"
                onChange={(e) => setTipo(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
              <button type="button" className="btn" onClick={() => setOpen(false)}>Cancelar</button>
              <button className="btn primary">Salvar</button>
            </div>

          </form>
        </ModalForm>
      )}

      {/* TABELA */}
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {aeronaves.map((a) => (
              <tr key={a.id}>

                <td>{a.id}</td>

                <td>
                  {editId === a.id ? (
                    <input value={editNome} onChange={(e) => setEditNome(e.target.value)} />
                  ) : (
                    a.nome
                  )}
                </td>

                <td>
                  {editId === a.id ? (
                    <input value={editTipo} onChange={(e) => setEditTipo(e.target.value)} />
                  ) : (
                    a.tipo
                  )}
                </td>

                <td>
                  {editId === a.id ? (
                    <>
                      {role !== "OPERADOR" && (
                        <button className="btn-sm primary" onClick={() => salvarEdicao(a.id)}>
                          Salvar
                        </button>
                      )}
                      <button className="btn-sm danger" onClick={() => setEditId(null)}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      {/* TODOS podem visualizar */}
                      <button className="btn-sm primary" onClick={() => navigate(`/aeronaves/${a.id}`)}>
                        Detalhes
                      </button>

                      {/* EDITAR: ADMIN e ENGENHEIRO */}
                      {role !== "OPERADOR" && (
                        <button className="btn-sm" onClick={() => ativarEdicao(a)}>
                          Editar
                        </button>
                      )}

                      {/* EXCLUIR: SÓ ADMIN */}
                      {role === "ADMIN" && (
                        <button className="btn-sm danger" onClick={() => excluir(a.id)}>
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
