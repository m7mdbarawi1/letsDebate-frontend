import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Footer.css";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <span>letsdebate@gmail.com</span>
      <span>+9626522334011</span>
      <span onClick={() => navigate("/about")}>
        About us
      </span>
    </footer>
  );
}
