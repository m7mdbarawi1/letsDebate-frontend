import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Signup.css";

export default function Signup() {
  const [form, setForm] = useState({
    user_id: "",
    fName: "",
    lName: "",
    email: "",
    password: "",
    photo: "",
    birthdate: "",
    role: "",
    gender: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Add this

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Signup successful!");
        // Optional: navigate to login after signup
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch {
      setMessage("Server error");
    }
  };

  return (
    <div className="signup-page">

      <main className="signup-container">
        <div className="signup-card">
          <h2>Sign up</h2>
          <form onSubmit={handleSignup}>
            {/* all inputs same as before */}
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} required />
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} required />
            <label>First Name</label>
            <input name="fName" onChange={handleChange} required />
            <label>Last Name</label>
            <input name="lName" onChange={handleChange} required />
            <label>Phone</label>
            <input name="phone" onChange={handleChange} required />
            <label>Photo</label>
            <input name="photo" onChange={handleChange} />
            <label>Birthdate</label>
            <input type="date" name="birthdate" onChange={handleChange} required />
            <label>Role</label>
            <input name="role" onChange={handleChange} required />
            <label>Gender</label>
            <input name="gender" onChange={handleChange} required />
            <label>User ID</label>
            <input name="user_id" onChange={handleChange} required />
            <button type="submit" className="submit-btn">SIGN UP</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </main>
    </div>
  );
}
