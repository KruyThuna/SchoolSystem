import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

const API = "http://localhost:8080/api";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/register`, form);
      alert(res.data.message);

      // reset form
      setForm({
        fullName: "",
        email: "",
        role: "",
        password: "",
      });
    } catch (err) {
      alert(err.response?.data?.error || "Register failed");
    }
  };

  return (
    <div className="auth-viewport">
      {/* LEFT PANEL */}
      <div className="auth-brand-side">
        <div className="auth-logo">🎓 AcademyOS</div>
        <div className="auth-brand-message">
          <h1>
            Join the Learning <span>Network.</span>
          </h1>
          <p>
            Create an account to access your dashboard system.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-form-side">
        <div className="auth-form-container">
          <h2>Create Account</h2>

          <form className="auth-form-stack" onSubmit={handleSubmit}>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />

            <button type="submit" className="auth-submit-btn">
              Register
            </button>
          </form>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}