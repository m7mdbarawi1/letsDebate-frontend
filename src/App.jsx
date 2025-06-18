import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import About from "./components/About.jsx";
import Home from "./components/Home";
import AddSession from "./components/AddSession";
import SessionDetails from "./components/SessionDetails";
import UpdateSession from "./components/UpdateSession";
import DeleteSession from "./components/DeleteSession"; 
import Profile from "./components/Profile";
import Footer from "./components/Footer.jsx";
import GuestNavbar from "./components/GuestNavbar";
import NormalNavbar from "./components/NormalNavbar";
import AdminNavbar from "./components/AdminNavbar";
import MyReservations from "./components/MyReservations";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const renderNavbar = () => {
    if (!user) return <GuestNavbar />;
    if (user.role === "admin") return <AdminNavbar />;
    return <NormalNavbar />;
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {renderNavbar()}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/sessions/:id" element={<SessionDetails />} />
            <Route path="/add-session" element={<AddSession />} />
            <Route path="/delete-session" element={<DeleteSession />} />
            <Route path="/update-session" element={<UpdateSession />} />
            <Route path="/profile" element={<Profile setUser={setUser} />} />
            <Route path="/my-reservations" element={<MyReservations />} />
          </Routes>
        </main> 
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;