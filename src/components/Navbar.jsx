
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import "../styles/Navbar.css";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navigate = useNavigate();
  const burgerMenuRef = useRef(null);

  const role = sessionStorage.getItem("academy_role");

  const [currentUser, setCurrentUser] = useState({
    name: sessionStorage.getItem("academy_user") || "Guest",
    role: role ? role.toUpperCase() : "GUEST",
    isLoggedIn: !!role,
  });

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("academy_theme") || "dark";

    setIsDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add("theme-dark");
      root.classList.remove("theme-light");
      localStorage.setItem("academy_theme", "dark");
    } else {
      root.classList.add("theme-light");
      root.classList.remove("theme-dark");
      localStorage.setItem("academy_theme", "light");
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="global-navbar">
        <div className="nav-left">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="burger-trigger-btn"
          >
            ☰
          </button>

          <Link to="/" className="logo-link">
            🎓 AcademyOS
          </Link>
        </div>

        <div className="nav-center">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="nav-right">
          <button
            className="theme-toggle-action-btn"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>

          {currentUser.isLoggedIn ? (
            <>
              <div className="avatar-circle">
                {currentUser.name[0]}
              </div>

              <button
                className="sign-in-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="sign-in-btn"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
