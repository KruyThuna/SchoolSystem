import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="global-footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-column brand">
          <h3>
            Academy<span>OS</span>
          </h3>
          <p>
            Production-grade academic infrastructure for next-gen learning
            systems.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div className="footer-column">
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="#">Documentation</a>
            </li>
            <li>
              <a href="#">System Guide</a>
            </li>
            <li>
              <a href="#">API Reference</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-column">
          <h4>Contact</h4>
          <ul>
            <li>Email: support@academyos.com</li>
            <li>Phone: +855 000 000 000</li>
            <li>Phnom Penh, Cambodia</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>© 2026 AcademyOS Engine</p>
        <p>v2.4.0-stable</p>
      </div>
    </footer>
  );
}
