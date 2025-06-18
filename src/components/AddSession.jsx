import { useState } from "react";
import "../assets/AddSession.css";
const BASE_URL = import.meta.env.VITE_SERVER_URL;

export default function AddSession() {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const res = await fetch(`${BASE_URL}/api/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Session created successfully!");
        setForm({
          session_id: "",
          title: "",
          description: "",
          photo: "",
          date: "",
          category_id: "",
          price: "",
          address: ""
        });
      } else {
        setMessage(data.message || "Failed to create session");
      }
    } catch (err) {
      setMessage("Server error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-session-page">
      <main className="form-container">
        <form className="session-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Create New Session</h2>
          
          <div className="form-group">
            <label htmlFor="session_id">Session ID</label>
            <input 
              id="session_id"
              name="session_id" 
              type="text"
              placeholder="Enter session ID..." 
              onChange={handleChange} 
              value={form.session_id}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input 
              id="title"
              name="title" 
              type="text"
              placeholder="Enter title..." 
              onChange={handleChange} 
              value={form.title}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter description..."
              onChange={handleChange}
              value={form.description}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="photo">Photo URL</label>
            <input 
              id="photo"
              name="photo" 
              type="url"
              placeholder="Enter photo URL..." 
              onChange={handleChange} 
              value={form.photo}
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date & Time</label>
            <input 
              id="date"
              name="date" 
              type="datetime-local" 
              onChange={handleChange} 
              value={form.date}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category_id">Category</label>
            <select
              id="category_id"
              name="category_id"
              onChange={handleChange}
              value={form.category_id}
              required
            >
              <option value="">Select a category</option>
              <option value="1">Politics</option>
              <option value="2">Sports</option>
              <option value="3">Technology</option>
              <option value="4">Health</option>
              <option value="5">Finance</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (JOD)</label>
            <input 
              id="price"
              name="price" 
              type="number" 
              min="0"
              step="0.01"
              placeholder="Enter price..." 
              onChange={handleChange} 
              value={form.price}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input 
              id="address"
              name="address" 
              type="text"
              placeholder="Enter address..." 
              onChange={handleChange} 
              value={form.address}
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "CREATE SESSION"}
          </button>

          {message && (
            <div className={`message ${message.includes("success") ? "success" : "error"}`}>
              {message}
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
