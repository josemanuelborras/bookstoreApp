import React from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <h1>Bienvenido a Bookstore</h1>
      <div style={{ marginTop: "40px", display: "flex", gap: "20px" }}>
        <button onClick={() => navigate("/login")}>Iniciar Sesion</button>
        <button onClick={() => navigate("/register")}>Registrarse</button>
      </div>
    </div>
  );
};

export default Main;
