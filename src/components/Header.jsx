import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <button className="menu-icon" aria-label="Menu">
        ☰
      </button>
      <h1 className="app-title">
        <Link to="/">NC-News</Link>
      </h1>
      <button className="user-icon" aria-label="User">
        👤
      </button>
    </header>
  );
}

export default Header;
