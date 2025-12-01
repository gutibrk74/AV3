import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null); // { nome, role }
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tk = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const nome = localStorage.getItem("nome");

    if (tk && role && nome) {
      setToken(tk);
      setUser({ nome, role });
    }
  }, []);

  function login(token, nome, role) {
    localStorage.setItem("token", token);
    localStorage.setItem("nome", nome);
    localStorage.setItem("role", role);
    setUser({ nome, role });
    setToken(token);
  }

  function logout() {
    localStorage.clear();
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
