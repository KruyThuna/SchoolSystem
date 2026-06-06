import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Simulated users database
  const users = {
    admin: {
      password: "123",
      role: "admin",
      redirect: "/admin/schoolsystem",
    },
    teacher: {
      password: "123",
      role: "teacher",
      redirect: "/admin/teacherdash",
    },
    student: {
      password: "123",
      role: "student",
      redirect: "/admin/studentdash",
    },
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isRegisterMode) {
      console.log("Registering user:", { username, email, password });

      sessionStorage.setItem("academy_role", "user");
      navigate("/admin/schoolsystem");
      return;
    }

    const user = users[username.toLowerCase()];

    if (user && user.password === password) {
      sessionStorage.setItem("academy_role", user.role);
      navigate(user.redirect);
    } else {
      setError("Invalid username or password system validation credentials");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="ambient-glow glow-top" />
      <div className="ambient-glow glow-bottom" />

      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <span className="logo-spark">🌌</span> AcademyOS
          </div>

          <h2>
            {isRegisterMode ? "Create Access Shell" : "Authorize Terminal"}
          </h2>

          <p>
            {isRegisterMode
              ? "Register credential profiles to connect"
              : "Input multi-tenant keys to initiate login parameters"}
          </p>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleAuthSubmit} className="auth-form-cluster">
          <div className="input-group">
            <label className="input-label">Username Key</label>
            <div className="input-field-wrapper">
              <User className="input-icon" />
              <input
                type="text"
                placeholder="e.g. admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {isRegisterMode && (
            <div className="input-group animate-fade-in">
              <label className="input-label">Routing Email Address</label>
              <div className="input-field-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  placeholder="name@academy.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Secure Access Password</label>
            <div className="input-field-wrapper">
              <Lock className="input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-submit-btn">
            {isRegisterMode
              ? "Generate Profile Identity"
              : "Verify Integrity Clearance"}
            <ArrowRight className="w-4 h-4 ml-2 inline-block" />
          </button>
        </form>

        <div className="auth-mode-toggle">
          {isRegisterMode
            ? "Already verified on our layers? "
            : "New administrative instance? "}

          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setError("");
            }}
            className="toggle-link"
          >
            {isRegisterMode ? "Sign In Here" : "Create Access Credentials"}
          </button>
        </div>
      </div>
    </div>
  );
}