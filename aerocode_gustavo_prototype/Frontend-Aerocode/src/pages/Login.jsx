import { useState, useContext } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  async function acessar() {
    try {
      const resp = await api.post("/login", { usuario, senha });

      login(
        resp.data.token,
        resp.data.usuario.nome,
        resp.data.usuario.role
      );

      navigate("/dashboard");

    } catch (e) {
      alert("Usuário ou senha inválidos");
    }
  }

  return (
    <div className="login-page">
      <div className="card login-card">
        <h2>Entrar no Aerocode</h2>

        <div className="form">

          <div className="field">
            <label>Usuário</label>
            <input 
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              placeholder="seu.usuario"
            />
          </div>

          <div className="field">
            <label>Senha</label>
            <input 
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="senha"
            />
          </div>

          <button className="btn primary" onClick={acessar}>
            Acessar
          </button>

        </div>
      </div>
    </div>
  );
}
