import { useState } from "react";
import "../assets/UpdateSession.css";

export default function UpdateSession() {
  const [form, setForm] = useState({
    session_id: "",
    title: "",
    description: "",
    photo: "",
    date: "",
    category_id: "",
    price: "",
    address: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.session_id) {
      setMessage("Please enter the session ID.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/sessions/${form.session_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Session updated successfully!");
      } else {
        setMessage(data.message || "Update failed");
      }
    } catch {
      setMessage("Server error");
    }
  };

  return (
    <div className="update-session-page">
      <h2>Update Session</h2>

      {message && <p className="message">{message}</p>}

      <form className="update-form" onSubmit={handleUpdate}>
        <label>Session ID</label>
        <input name="session_id" placeholder="Enter session ID..." value={form.session_id} onChange={handleChange} />

        <label>Title</label>
        <input name="title" placeholder="Enter title..." value={form.title} onChange={handleChange} />

        <label>Description</label>
        <input name="description" placeholder="Enter description..." value={form.description} onChange={handleChange} />

        <label>Category ID</label>
        <input name="category_id" placeholder="Enter category ID..." value={form.category_id} onChange={handleChange} />

        <label>Price</label>
        <input name="price" type="number" placeholder="Enter price..." value={form.price} onChange={handleChange} />

        <label>Photo URL</label>
        <input name="photo" placeholder="Enter photo URL..." value={form.photo} onChange={handleChange} />

        <label>Date</label>
        <input name="date" type="datetime-local" placeholder="Enter date..." value={form.date} onChange={handleChange} />

        <label>Address</label>
        <input name="address" placeholder="Enter address..." value={form.address} onChange={handleChange} />

        <button type="submit" className="update-btn">Update SESSION</button>
      </form>
    </div>
  );
}
