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

              <Route path="/" element={<Navigate to="/dashboard" />} />

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
  )
}
