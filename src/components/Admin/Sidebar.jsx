import React from "react";

export default function Sidebar({ active, setActive }) {
  const menu = [
    "students",
    "teachers",
    "courses",
    "departments",
    "rooms",
    "academic-years",
    "guardians",
    "payments",
    "enrollments",
    "sections",
  ];

  return (
    <div className="sidebar">
      <h2>AcademyOS</h2>

      <ul>
        {menu.map((item) => (
          <li
            key={item}
            className={active === item ? "active" : ""}
            onClick={() => setActive(item)}
          >
            {item.replace("-", " ").toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
}