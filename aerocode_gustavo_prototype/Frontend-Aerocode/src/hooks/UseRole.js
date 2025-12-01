//\src\hooks\UseRole.js

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useRole() {
  const { user } = useContext(AuthContext);
  return user?.role || null;
}
