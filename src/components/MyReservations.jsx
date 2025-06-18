import { useEffect, useState } from "react";
import "../assets/MyReservations.css";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchReservations();
    fetchCategories();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/reservations");
      const allReservations = await res.json();

      const sessionRes = await fetch("http://localhost:3001/api/sessions");
      const sessions = await sessionRes.json();

      const matched = allReservations
        .filter(r => r.user_id === user.user_id)
        .map(r => {
          const s = sessions.find(ses => ses.session_id === r.session_id);
          return {
            ...r,
            title: s?.title,
            photo: s?.photo,
            category_id: s?.category_id,
          };
        });

      setReservations(matched);
    } catch (err) {
      console.error("Error loading reservations:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch {
      console.error("Error loading categories");
    }
  };

  const handleCancel = async (session_id) => {
    await fetch(`http://localhost:3001/api/reservations/${user.user_id}/${session_id}`, {
      method: "DELETE",
    });
    setReservations(prev => prev.filter(r => r.session_id !== session_id));
  };

  const filtered = reservations.filter(
    r =>
      r.title?.toLowerCase().includes(search.toLowerCase()) &&
      (!category || r.category_id == category)
  );

  return (
    <div className="my-reservations-page">
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>

      <main className="reservation-grid">
        {filtered.map((r) => (
          <div key={r.session_id} className="reservation-card">
            <img src={r.photo} alt={r.title} />
            <h4>{r.title}</h4>
            <p>{categories.find(c => c.category_id === r.category_id)?.categoryName || "N/A"}</p>
            <button className="cancel-btn" onClick={() => handleCancel(r.session_id)}>
              CANCEL
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
