import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Profile.css";

export default function Profile({ setUser }) {
  const [form, setForm] = useState({
    user_id: "",
    fName: "",
    lName: "",
    email: "",
    password: "",
    photo: "",
    birthdate: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setForm({
        user_id: user.user_id,
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        password: user.password,
        photo: user.photo,
        birthdate: user.birthdate
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`http://localhost:3001/api/users/${form.user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fName: form.fName,
          lName: form.lName,
          email: form.email,
          password: form.password,
          photo: form.photo,
          birthdate: form.birthdate
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Profile updated!");
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        setMessage(data.message || "Update failed");
      }
    } catch {
      setMessage("Server error");
    }
  };

  const handleLogout = () => {
  localStorage.removeItem("user");
  setUser(null);
  navigate("/login");
};

  const handleDelete = async () => {
    if (!form.user_id) {
      setMessage("User ID is required to delete account.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/users/${form.user_id}`, {
        method: "DELETE"
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Account deleted.");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/signup");
      } else {
        setMessage(data.message || "Delete failed");
      }
    } catch {
      setMessage("Server error");
    }
  };

  return (
    <div className="profile-page">
      <main className="profile-container">
        <form className="profile-form" onSubmit={handleUpdate}>
          <label>User ID</label>
          <input name="user_id" value={form.user_id} readOnly />

          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required />

          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required />

          <label>Photo</label>
          <input name="photo" value={form.photo} onChange={handleChange} />

          <label>First Name</label>
          <input name="fName" value={form.fName} onChange={handleChange} required />

          <label>Last Name</label>
          <input name="lName" value={form.lName} onChange={handleChange} required />

          <label>Birthdate</label>
          <input name="birthdate" type="date" value={form.birthdate} onChange={handleChange} required />

          <button type="submit" className="submit-btn black">Update Profile</button>
        </form>

        <button onClick={handleLogout} className="submit-btn blue">LOGOUT</button>
        <button onClick={handleDelete} className="submit-btn red">DELETE ACCOUNT</button>

        {message && <p>{message}</p>}
      </main>
    </div>
  );
}
