import { useEffect, useState } from 'react';
import ModalForm from '../components/ModalForm.jsx';
import { api } from '../services/api';
import { useRole } from "../hooks/UseRole";

export default function Testes() {

  const role = useRole();

  const [testes, setTestes] = useState([]);
  const [aeronaves, setAeronaves] = useState([]);

  const [open, setOpen] = useState(false);

  const [aeroId, setAeroId] = useState("");
  const [tipo, setTipo] = useState("");
  const [resultado, setResultado] = useState("");
  const [obs, setObs] = useState("");

  const [editId, setEditId] = useState(null);
  const [editAero, setEditAero] = useState("");
  const [editTipo, setEditTipo] = useState("");
  const [editResultado, setEditResultado] = useState("");
  const [editObs, setEditObs] = useState("");

  useEffect(() => {
    carregarTudo();
  }, []);

  async function carregarTudo() {
    const t = await api.get("/testes");
    const a = await api.get("/aeronaves");

    setTestes(t.data);
    setAeronaves(a.data);
  }

  async function criar(e) {
    e.preventDefault();

    await api.post("/testes", {
      aeronaveId: Number(aeroId),
      tipo,
      resultado,
      observacoes: obs
    });

    setAeroId("");
    setTipo("");
    setResultado("");
    setObs("");
    setOpen(false);

    carregarTudo();
  }

  function ativarEdicao(t) {
    setEditId(t.id);
    setEditAero(t.aeronaveId);
    setEditTipo(t.tipo);
    setEditResultado(t.resultado);
    setEditObs(t.observacoes || "");
  }

  async function salvarEdicao(id) {
    await api.put(`/testes/${id}`, {
      aeronaveId: Number(editAero),
      tipo: editTipo,
      resultado: editResultado,
      observacoes: editObs
    });

    setEditId(null);
    carregarTudo();
  }

  async function excluir(id) {
    if (!confirm("Excluir teste?")) return;
    await api.delete(`/testes/${id}`);
    carregarTudo();
  }

  return (
    <div>

      {/* Título + botão de criar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2>Testes</h2>

        {/* Criar → ADMIN e ENGENHEIRO */}
        {role !== "OPERADOR" && (
          <button className="btn" onClick={() => setOpen(true)}>
            + Registrar Teste
          </button>
        )}
      </div>

      {/* Modal */}
      {open && (
        <ModalForm title="Registrar Teste" onClose={() => setOpen(false)}>
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
              <label>Tipo de teste</label>
              <input
                placeholder="Ex: Verificação estrutural"
                value={tipo}
                onChange={e => setTipo(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Resultado</label>
              <select value={resultado} onChange={e => setResultado(e.target.value)}>
                <option value="">Selecione...</option>
                <option>Aprovado</option>
                <option>Reprovado</option>
              </select>
            </div>

            <div className="field">
              <label>Observações</label>
              <textarea
                rows="3"
                placeholder="Ex: Pequenas fissuras encontradas na asa esquerda"
                value={obs}
                onChange={e => setObs(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
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
              <th>Aeronave</th>
              <th>Tipo</th>
              <th>Resultado</th>
              <th>Observações</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {testes.map(t => (
              <tr key={t.id}>

                <td>{t.id}</td>

                <td>
                  {editId === t.id ? (
                    <select value={editAero} onChange={e => setEditAero(e.target.value)}>
                      {aeronaves.map(a => (
                        <option key={a.id} value={a.id}>{a.nome}</option>
                      ))}
                    </select>
                  ) : t.aeronave?.nome}
                </td>

                <td>
                  {editId === t.id ? (
                    <input value={editTipo} onChange={e => setEditTipo(e.target.value)} />
                  ) : t.tipo}
                </td>

                <td>
                  {editId === t.id ? (
                    <select value={editResultado} onChange={e => setEditResultado(e.target.value)}>
                      <option>Aprovado</option>
                      <option>Reprovado</option>
                    </select>
                  ) : t.resultado}
                </td>

                <td>
                  {editId === t.id ? (
                    <textarea
                      value={editObs}
                      onChange={e => setEditObs(e.target.value)}
                      rows={2}
                    />
                  ) : (
                    t.observacoes || "-"
                  )}
                </td>

                <td>
                  {editId === t.id ? (
                    <>
                      {/* ADMIN + ENGENHEIRO podem salvar */}
                      {role !== "OPERADOR" && (
                        <button className="btn-sm primary" onClick={() => salvarEdicao(t.id)}>
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
                        <button className="btn-sm primary" onClick={() => ativarEdicao(t)}>
                          Editar
                        </button>
                      )}

                      {/* EXCLUIR: somente ADMIN */}
                      {role === "ADMIN" && (
                        <button className="btn-sm danger" onClick={() => excluir(t.id)}>
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
