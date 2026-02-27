import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <button className="menu-icon" aria-label="Menu">
        ☰
      </button>
      <h1 className="app-title">
        <Link to="/">NC-News</Link>
      </h1>
      <button
        className="user-icon"
        aria-label="User"
        onClick={() => navigate("/users/guest")}
      >
        👤
      </button>
    </header>
  );
}

export default Header;
