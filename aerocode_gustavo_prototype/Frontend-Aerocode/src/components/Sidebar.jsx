import { NavLink } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {

  const { user, logout } = useContext(AuthContext);
  const role = user?.role;

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">AG</div>
        <strong>AEROCODE</strong>
      </div>

      {!user && (
        <nav className="menu">
          <NavLink to="/login">Login</NavLink>
        </nav>
      )}

      {user && (
        <>
          <nav className="menu">

            {/* ADMIN vê dashboard — engenheiro e operador NÃO */}
            {role === "ADMIN" && (
              <NavLink to="/dashboard">Dashboard</NavLink>
            )}

            {/* AERONAVES — todos veem */}
            <NavLink to="/aeronaves">Aeronaves</NavLink>

            {/* PEÇAS — só ADMIN e ENGENHEIRO veem */}
            {role === "ADMIN" || role === "ENGENHEIRO" ? (
              <NavLink to="/pecas">Peças</NavLink>
            ) : null}

            {/* ETAPAS — todos veem */}
            <NavLink to="/etapas">Etapas</NavLink>

            {/* TESTES — todos veem */}
            <NavLink to="/testes">Testes</NavLink>

            {/* FUNCIONÁRIOS — só ADMIN */}
            {role === "ADMIN" && (
              <NavLink to="/funcionarios">Funcionários</NavLink>
            )}

            {/* RELATÓRIO — só ADMIN */}
            {role === "ADMIN" && (
              <NavLink to="/relatorio">Relatório</NavLink>
            )}

          </nav>

          <button
            className="btn danger"
            style={{ margin: "20px" }}
            onClick={logout}
          >
            Sair
          </button>
        </>
      )}
    </aside>
  )
}
