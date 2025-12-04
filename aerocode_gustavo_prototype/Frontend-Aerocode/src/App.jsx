import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Aeronaves from './pages/Aeronaves.jsx'
import AeronaveDetalhe from './pages/AeronaveDetalhe.jsx'
import Pecas from './pages/Pecas.jsx'
import Etapas from './pages/Etapas.jsx'
import Funcionarios from './pages/Funcionarios.jsx'
import Testes from './pages/Testes.jsx'
import Relatorio from './pages/Relatorio.jsx'

import PrivateRoute from "./components/PrivateRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";


// 🔥 NOVA ROTA /home QUE DECIDE O REDIRECIONAMENTO PELO CARGO
function HomeRedirect() {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;

  if (user.role === "ADMIN") return <Navigate to="/dashboard" />;
  if (user.role === "ENGENHEIRO") return <Navigate to="/aeronaves" />;
  if (user.role === "OPERADOR") return <Navigate to="/aeronaves" />;

  return <Navigate to="/login" />;
}


export default function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Sidebar />
        <div>
          <Header title="Aerocode — Protótipo " />
          <main className="content">
            <Routes>

              <Route path="/login" element={<Login />} />

              {/* 🔥 AGORA A ROTA / REDIRECIONA PARA /home */}
              <Route path="/" element={<Navigate to="/home" />} />

              {/* 🔥 ESTA É A ROTA QUE LÊ O CARGO E REDIRECIONA */}
              <Route path="/home" element={<HomeRedirect />} />

              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/aeronaves"
                element={
                  <PrivateRoute>
                    <Aeronaves />
                  </PrivateRoute>
                }
              />

              <Route
                path="/pecas"
                element={
                  <PrivateRoute>
                    <Pecas />
                  </PrivateRoute>
                }
              />

              <Route
                path="/etapas"
                element={
                  <PrivateRoute>
                    <Etapas />
                  </PrivateRoute>
                }
              />

              <Route
                path="/funcionarios"
                element={
                  <PrivateRoute>
                    <Funcionarios />
                  </PrivateRoute>
                }
              />

              <Route
                path="/testes"
                element={
                  <PrivateRoute>
                    <Testes />
                  </PrivateRoute>
                }
              />

              <Route
                path="/relatorio"
                element={
                  <PrivateRoute>
                    <Relatorio />
                  </PrivateRoute>
                }
              />

              <Route
                path="/aeronaves/:id"
                element={
                  <PrivateRoute>
                    <AeronaveDetalhe />
                  </PrivateRoute>
                }
              />

            </Routes>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
