import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const API = "http://localhost:8080/api";

export default function Auth() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  // ================= LOGIN STATE =================
  const [login, setLogin] = useState({ email: "", password: "" });

  // ================= REGISTER STATE =================
  const [register, setRegister] = useState({
    fullName: "",
    email: "",
    role: "",
    password: "",
  });

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/login`, {
        email: login.email,
        password: login.password,
      });

      const token = res.data.token;
      const role = res.data.role?.toUpperCase();
      const username = res.data.username;

      if (!role) {
        alert("Role missing from backend");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);

      const routes = {
        ADMIN: "/admin/schoolsystem",
        STUDENT: "/student/dashboard",
        TEACHER: "/teacher/dashboard",
      };

      if (!routes[role]) {
        alert("Invalid role: " + role);
        return;
      }

      alert("Login Success");
      navigate(routes[role]);
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  // ================= REGISTER =================
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/register`, register);
      alert(res.data.message || "Register Success");
      setIsRegister(false);
      setLogin({ email: register.email, password: "" });
    } catch (err) {
      alert(err.response?.data?.error || "Register Failed");
    }
  };

  // ================= LOGO COMPONENT =================
  const BrandHeader = () => (
    <div className="brand-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '15px' }}>
      {/* SVG Placeholder Logo: graduation cap icon */}
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#4a90e2' }}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
      </svg>
      <h1 className="brand-title" style={{ margin: '5px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Systemschool</h1>
    </div>
  );

  return (
    <div className="auth-body">
      <div
        className={`container ${isRegister ? "right-panel-active" : ""}`}
        id="container"
      >
        {/* ================= REGISTER FORM ================= */}
        <div className="form-container register-container">
          <form onSubmit={handleRegister}>
            {/* Added Title + Logo */}
            <BrandHeader />
            <h2>Create Account</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={register.fullName}
              onChange={(e) =>
                setRegister({ ...register, fullName: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={register.email}
              onChange={(e) =>
                setRegister({ ...register, email: e.target.value })
              }
              required
            />
            <select
              value={register.role}
              onChange={(e) =>
                setRegister({ ...register, role: e.target.value })
              }
              required
            >
              <option value="">Select Role</option>
              <option value="ADMIN">ADMIN</option>
              <option value="STUDENT">STUDENT</option>
              <option value="TEACHER">TEACHER</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={register.password}
              onChange={(e) =>
                setRegister({ ...register, password: e.target.value })
              }
              required
            />
            <button type="submit">Sign Up</button>
            <p className="mobile-toggle" onClick={() => setIsRegister(false)}>
              Already have an account? Sign In
            </p>
          </form>
        </div>

        {/* ================= LOGIN FORM ================= */}
        <div className="form-container login-container">
          <form onSubmit={handleLogin}>
            {/* Added Title + Logo */}
            <BrandHeader />
            <h2>Sign In</h2>
            <input
              type="email"
              placeholder="Email"
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              required
            />
            <button type="submit">Sign In</button>
            <p className="mobile-toggle" onClick={() => setIsRegister(true)}>
              Don't have an account? Sign Up
            </p>
          </form>
        </div>

        {/* ================= OVERLAY PANELS ================= */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h2>Welcome Back!</h2>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" onClick={() => setIsRegister(false)}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2>Hello, Friend!</h2>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={() => setIsRegister(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}