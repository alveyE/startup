import { Link } from "react-router-dom";
import "../main.css";
import React from "react";

function Navbar(props) {
  return (
    <div className="navbar">
      <Link className={props.activePage === "home" ? "active" : ""} to="/">
        Aisle Hawk
      </Link>
      {props.username && (
        <Link
          className={props.activePage === "list" ? "active" : ""}
          to="/list"
        >
          My List
        </Link>
      )}
      <Link
        className={props.activePage === "sales" ? "active" : ""}
        to="/sales"
      >
        Sales
      </Link>
      {props.username && (
        <div className="navbar-right">
          <button className="logout" onClick={props.onLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
