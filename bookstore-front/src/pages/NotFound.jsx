import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div style={{ textAlign: "center", marginTop: "10vh" }}>
    <h1>404 - Pagina No encontrada</h1>
    <p>Lo sentimos, la pagina a la que estas intentando acceder, no existe.</p>
    <Link to="/">Volver al Inicio</Link>
  </div>
);

export default NotFound;
