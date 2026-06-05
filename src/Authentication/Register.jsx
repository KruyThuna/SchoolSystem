import React from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

export default function Register() {
  return (
    <div className="auth-viewport">
      {/* LEFT PANEL: Branding Information */}
      <div className="auth-brand-side">
        <div className="auth-logo">🎓 AcademyOS</div>
        <div className="auth-brand-message">
          <h1>
            Join the Learning <span>Network.</span>
          </h1>
          <p>
            Create an account to claim your institutional dashboard and deploy
            learning workspaces immediately.
          </p>
        </div>
        <div className="auth-system-status">
          <span /> Node Node-01 Operational
        </div>
      </div>

      {/* RIGHT PANEL: Registration Form */}
      <div className="auth-form-side">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2>Create Account</h2>
            <p>
              Already registered? <Link to="/login">Sign in here</Link>
            </p>
          </div>

          <form
            className="auth-form-stack"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="auth-input-group">
              <label htmlFor="fullName">Full Legal Name</label>
              <input
                id="fullName"
                type="text"
                className="auth-input-field"
                placeholder="Alex Mercer"
                required
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="email">Institutional Email</label>
              <input
                id="email"
                type="email"
                className="auth-input-field"
                placeholder="name@institute.edu"
                required
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="role">Platform Security Role</label>
              <select
                id="role"
                className="auth-input-field auth-select-field"
                defaultValue=""
              >
                <option value="" disabled>
                  Select access clearance level...
                </option>
                <option value="student">Student Learner</option>
                <option value="teacher">Faculty Instructor</option>
                <option value="admin">System Administrator</option>
              </select>
            </div>

            <div className="auth-input-group">
              <label htmlFor="password">Security Password</label>
              <input
                id="password"
                type="password"
                className="auth-input-field"
                placeholder="Minimum 8 characters"
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              Register Credentials
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
