import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  
  //  Cargamos el estado del usuario solo al inicio
  const [user, setUser] = useState<boolean>(() => {
    return !!localStorage.getItem("authToken");
  });

  function signOut() {
    localStorage.removeItem("authToken"); // Borra el token
    setUser(false); // Actualiza el estado
    navigate("/signin"); // Redirige a SignIn
  }

  //  Solo redirigir si el estado del usuario cambia y no hay sesión
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  return { user, signOut };
}
