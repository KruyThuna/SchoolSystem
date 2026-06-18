import React from "react";
import "./Sidebar.css";

export default function Sidebar({ active, setActive }) {
  return (
    <div className="sidebar">
      <h2>School Admin</h2>
       <button className={active === "users" ? "active" : ""} onClick={() => setActive("users")}>
        Users
      </button>
      <button className={active === "students" ? "active" : ""} onClick={() => setActive("students")}>
        Students
      </button>

      <button className={active === "teachers" ? "active" : ""} onClick={() => setActive("teachers")}>
        Teachers
      </button>

      <button className={active === "courses" ? "active" : ""} onClick={() => setActive("courses")}>
        Courses
      </button>

      <button className={active === "departments" ? "active" : ""} onClick={() => setActive("departments")}>
        Departments
      </button>

      <button className={active === "rooms" ? "active" : ""} onClick={() => setActive("rooms")}>
        Rooms
      </button>

      <button className={active === "academic-years" ? "active" : ""} onClick={() => setActive("academic-years")}>
        Academic Years
      </button>

      <button className={active === "guardians" ? "active" : ""} onClick={() => setActive("guardians")}>
        Guardians
      </button>

      <button className={active === "payments" ? "active" : ""} onClick={() => setActive("payments")}>
        Payments
      </button>

      <button className={active === "enrollments" ? "active" : ""} onClick={() => setActive("enrollments")}>
        Enrollments
      </button>

      <button className={active === "sections" ? "active" : ""} onClick={() => setActive("sections")}>
        Sections
      </button>
    </div>
  );
}