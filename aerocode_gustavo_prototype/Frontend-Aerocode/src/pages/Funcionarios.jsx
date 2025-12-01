import { useEffect, useState } from "react";
import { api } from "../services/api";
import ModalForm from "../components/ModalForm.jsx";
import { useRole } from "../hooks/UseRole";
import { useNavigate } from "react-router-dom";

export default function Funcionarios() {

  const role = useRole();
  const navigate = useNavigate();

  const [funcionarios, setFuncionarios] = useState([]);

  const [open, setOpen] = useState(false);

  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");

  const [editId, setEditId] = useState(null);
  const [editNome, setEditNome] = useState("");
  const [editCargo, setEditCargo] = useState("");

  // 🔒 BLOQUEAR ACESSO PARA NÃO ADMIN
  useEffect(() => {
    if (role !== "ADMIN") {
      alert("Apenas Administradores podem acessar funcionários.");
      navigate("/dashboard");
    }
  }, [role]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const resp = await api.get("/funcionarios");
    setFuncionarios(resp.data);
  }

  async function criar(e) {
    e.preventDefault();

    if (!nome || !cargo)
      return alert("Preencha todos os campos!");

    await api.post("/funcionarios", { nome, cargo });

    setNome("");
    setCargo("");
    setOpen(false);

    carregar();
  }

  function ativarEdicao(f) {
    setEditId(f.id);
    setEditNome(f.nome);
    setEditCargo(f.cargo);
  }

  async function salvarEdicao(id) {
    await api.put(`/funcionarios/${id}`, {
      nome: editNome,
      cargo: editCargo
    });

    setEditId(null);
    carregar();
  }

  async function excluir(id) {
    if (!confirm("Excluir funcionário?")) return;

    await api.delete(`/funcionarios/${id}`);
    carregar();
  }

  return (
    <div>

      {/* Cabeçalho */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2>Funcionários</h2>

        {/* Criar → somente ADMIN */}
        {role === "ADMIN" && (
          <button className="btn" onClick={() => setOpen(true)}>
            + Registrar Funcionário
          </button>
        )}
      </div>

      {/* Modal */}
      {open && (
        <ModalForm title="Registrar Funcionário" onClose={() => setOpen(false)}>

          <form className="form" onSubmit={criar}>

            <div className="field">
              <label>Nome</label>
              <input
                value={nome}
                placeholder="Ex: Carlos Almeida"
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Cargo</label>
              <input
                value={cargo}
                placeholder="Ex: Engenheiro Estrutural"
                onChange={(e) => setCargo(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
              <button type="button" className="btn" onClick={() => setOpen(false)}>Cancelar</button>
              <button className="btn primary">Salvar</button>
            </div>

          </form>

        </ModalForm>
      )}

      {/* Tabela */}
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {funcionarios.map((f) => (
              <tr key={f.id}>
                
                <td>{f.id}</td>

                <td>
                  {editId === f.id ? (
                    <input value={editNome} onChange={(e) => setEditNome(e.target.value)} />
                  ) : f.nome}
                </td>

                <td>
                  {editId === f.id ? (
                    <input value={editCargo} onChange={(e) => setEditCargo(e.target.value)} />
                  ) : f.cargo}
                </td>

                <td>
                  {editId === f.id ? (
                    <>
                      <button className="btn-sm primary" onClick={() => salvarEdicao(f.id)}>Salvar</button>
                      <button className="btn-sm danger" onClick={() => setEditId(null)}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      {/* ADMIN pode editar */}
                      <button className="btn-sm primary" onClick={() => ativarEdicao(f)}>Editar</button>

                      {/* ADMIN pode excluir */}
                      <button className="btn-sm danger" onClick={() => excluir(f.id)}>Excluir</button>
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
