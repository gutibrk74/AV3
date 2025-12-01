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
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/aeronaves">Aeronaves</NavLink>
            <NavLink to="/pecas">Peças</NavLink>
            <NavLink to="/etapas">Etapas</NavLink>

            {role !== "OPERADOR" && (
              <NavLink to="/testes">Testes</NavLink>
            )}

            {role === "ADMIN" && (
              <NavLink to="/funcionarios">Funcionários</NavLink>
            )}

            {role !== "OPERADOR" && (
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
