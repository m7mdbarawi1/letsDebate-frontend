import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Navbar.css";
import logo from "../assets/logo.png";

export default function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <img
        src={logo}
        alt="Logo"
        className="logo"
        onClick={() => navigate("/")}
      />
      <div className="nav-buttons">
        <button onClick={() => navigate("/profile")}>PROFILE</button>
        <button onClick={() => navigate("/delete-session")}>DELETE SESSION</button>
        <button onClick={() => navigate("/update-session")}>UPDATE SESSION</button>
        <button onClick={() => navigate("/add-session")}>ADD SESSION</button>
      </div>
    </header>
  );
}
