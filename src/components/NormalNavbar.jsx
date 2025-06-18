import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Navbar.css";
import logo from "../assets/logo.png";

export default function NormalNavbar() {
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
        <button onClick={() => navigate("/my-reservations")}>MY RESERVATIONS</button>
      </div>
    </header>
  );
}
