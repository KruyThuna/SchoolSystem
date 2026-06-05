import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  /* =========================
     THEME SWITCH
  ========================= */
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

  /* =========================
     CLOSE OUTSIDE MENU
  ========================= */
  useEffect(() => {
    function handleClickOutside(e) {
      if (burgerMenuRef.current && !burgerMenuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  /* =========================
     NAVIGATION
  ========================= */
  const goDashboard = () => {
    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "student") navigate("/student/dashboard");
    else if (role === "teacher") navigate("/teacher/dashboard");
    else navigate("/login");
  };

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = () => {
    sessionStorage.removeItem("academy_role");
    sessionStorage.removeItem("academy_user");

    setCurrentUser({
      name: "Guest",
      role: "GUEST",
      isLoggedIn: false,
    });

    navigate("/login");
  };

  return (
    <>
      {/* =========================
          NAVBAR
      ========================= */}
      <nav className="global-navbar">
        {/* LEFT SIDE */}
        <div className="nav-left">
          {/* THEME BUTTON (NOW LEFT ✅) */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="theme-toggle-action-btn"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>

          {/* BURGER MENU */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`burger-trigger-btn ${showMenu ? "active" : ""}`}
          >
            <div className="line-top"></div>
            <div className="line-mid"></div>
            <div className="line-bot"></div>
          </button>

          {/* LOGO */}
          <Link to="/" className="logo-link">
            🎓 <span>AcademyOS</span>
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="nav-right">
          {currentUser.isLoggedIn ? (
            <div className="user-session-frame">
              <div className="avatar-circle" onClick={goDashboard}>
                {currentUser.name.charAt(0).toUpperCase()}
              </div>

              <div className="user-info-text" onClick={goDashboard}>
                <span className="user-name-display">{currentUser.name}</span>
                <small className="user-role-badge">{currentUser.role}</small>
              </div>

              <button className="sign-in-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="sign-in-btn" onClick={() => navigate("/login")}>
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* =========================
          OVERLAY
      ========================= */}
      {showMenu && (
        <div className="drawer-overlay" onClick={() => setShowMenu(false)} />
      )}

      {/* =========================
          DRAWER
      ========================= */}
      
      
    </>
  );
}
