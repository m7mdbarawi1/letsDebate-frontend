import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/SessionDetails.css";
const BASE_URL = import.meta.env.VITE_SERVER_URL;

export default function SessionDetails() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchSession();
  }, [id]);

  const fetchSession = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/sessions/${id}`);
      const data = await res.json();
      setSession(data);

      const catRes = await fetch(`${BASE_URL}/api/categories/${data.category_id}`);
      const catData = await catRes.json();
      setCategory(catData.categoryName);
    } catch {
      console.error("Error loading session");
    }
  };

  const handleReserve = async () => {
    if (!user) {
      setMessage("Please log in to reserve.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.user_id,
          session_id: session.session_id
        })
      });

      if (res.ok) {
        setMessage("Reservation successful!");
      } else {
        const err = await res.json();
        setMessage(err.message || "Reservation failed.");
      }
    } catch {
      setMessage("Server error.");
    }
  };

  if (!session) return <p>Loading...</p>;

  const formattedTime = new Date(session.date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="session-details-page">
      <img src={session.photo} alt={session.title} className="session-banner" />

      <div className="session-meta">
        <span><strong>Category:</strong> {category}</span>
        <span><strong>Title:</strong> {session.title}</span>
        <span><strong>Price:</strong> {session.price}JD</span>
        <button className="reserve-btn" onClick={handleReserve}>
          RESERVE SEAT
        </button>
        {message && <p style={{ color: message.includes("successful") ? "green" : "red" }}>{message}</p>}
      </div>

      <div className="session-description">
        <h3>Description:</h3>
        <p>{session.description}</p>
        <p>📍 <strong>Location:</strong> {session.address}</p>
        <p>⏰ <strong>Time:</strong> {formattedTime}</p>
      </div>
    </div>
  );
}
