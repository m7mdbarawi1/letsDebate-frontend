import { useState, useEffect } from "react";
import "../assets/DeleteSession.css";

export default function DeleteSession() {
  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/sessions");
      const data = await res.json();
      setSessions(data);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this session?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3001/api/sessions/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSessions((prev) => prev.filter((s) => s.session_id !== id));
        setMessage("Session deleted successfully.");
      } else {
        const data = await res.json();
        setMessage(data.message || "Failed to delete session.");
      }
    } catch (err) {
      console.error("Error deleting session:", err);
      setMessage("Server error while deleting session.");
    }
  };

  return (
    <div className="delete-session-page">
      <h2>Delete Debate Sessions</h2>
      {message && <p className="message">{message}</p>}

      <div className="session-list">
        {sessions.length === 0 && <p>No sessions found.</p>}
        {sessions.map((session) => (
          <div key={session.session_id} className="session-item">
            <img src={session.photo} alt={session.title} className="session-photo" />
            <div className="session-info">
              <h4>{session.title}</h4>
              <p>{session.description}</p>
              <button
                className="delete-btn"
                onClick={() => handleDelete(session.session_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
