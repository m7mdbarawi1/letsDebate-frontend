import { useNavigate } from "react-router-dom";
import "../assets/Navbar.css";
import logo from '../assets/logo.png';

export default function GuestNavbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <img
        src={logo}
        alt="Logo"
        className="logo"
        onClick={() => navigate("/")}
      />
      <div className="nav-buttons">
        <button onClick={() => navigate("/login")}>LOGIN</button>
        <button onClick={() => navigate("/signup")}>SIGN UP</button>
      </div>
    </div>
  );
}
