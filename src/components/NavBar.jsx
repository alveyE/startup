import { Link } from "react-router-dom";
import "../main.css";

function Navbar({ activePage }) {
  return (
    <div className="navbar">
      <Link className={activePage === "home" ? "active" : ""} to="/">
        Aisle Hawk
      </Link>
      <Link className={activePage === "list" ? "active" : ""} to="/list">
        My List
      </Link>
      <Link className={activePage === "sales" ? "active" : ""} to="/sales">
        Sales
      </Link>
    </div>
  );
}

export default Navbar;
