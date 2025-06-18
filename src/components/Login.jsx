import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Login.css";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        onLogin(data.user); // update App state
        navigate("/"); // go to homepage
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch {
      setMessage("Server error");
    }
  };

  return (
    <div className="login-page">
      <main className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter email..." onChange={handleChange} required />

            <label>Password</label>
            <input type="password" name="password" placeholder="Enter password..." onChange={handleChange} required />

            <button type="submit" className="submit-btn">LOGIN</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </main>
    </div>
  );
}
