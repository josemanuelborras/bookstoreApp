import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <h1>Bookstore</h1>
      <nav>
        {user ? (
          <ul>
            <li><button onClick={() => handleLogout()}>Salir</button></li>
          </ul>
        ) : (
          <ul>
            <li>
              <a href="/register">Registrarse</a>
            </li>
            <li>
              <a href="/login">Iniciar Sesion</a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
