import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/Home.css";

export default function Home() {
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    fetchSessions();
    fetchCategories();
    fetchWeather();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/sessions");
      const data = await res.json();
      setSessions(data);
    } catch {
      console.error("Error loading sessions");
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

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        "http://api.weatherapi.com/v1/forecast.json?key=5b12923c5afb4d46b15134919251806&q=London&days=1&aqi=no&alerts=no"
      );
      const data = await res.json();
      const hourly = data.forecast?.forecastday[0]?.hour?.slice(0, 24) || [];
      setWeather(hourly);
    } catch {
      console.error("Error loading weather");
    }
  };

  const filteredSessions = sessions.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) &&
      (!category || s.category_id == category)
  );

  return (
    <div className="home-page">
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>

      <main className="session-grid">
        {filteredSessions.map((session, index) => (
          <Link
            to={`/sessions/${session.session_id}`}
            key={session.session_id}
            className="session-card"
          >
            <img src={session.photo} alt={session.title} />
            <h4>{session.title}</h4>
            <p>
              {
                categories.find(
                  (c) => c.category_id === session.category_id
                )?.categoryName || "Unknown"
              }
            </p>
            {weather[index] && (
              <p>
                {weather[index].temp_c}°C
              </p>
            )}
          </Link>
        ))}
      </main>
    </div>
  );
}
