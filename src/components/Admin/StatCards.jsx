import React from "react";

export default function StatCards() {
  const stats = [
    { title: "Students", count: 120 },
    { title: "Teachers", count: 15 },
    { title: "Classes", count: 8 },
    { title: "Events", count: 5 },
  ];

  return (
    <div className="stat-cards">
      {stats.map((s) => (
        <div key={s.title} className="card">
          <h3>{s.title}</h3>
          <p>{s.count}</p>
        </div>
      ))}
    </div>
  );
}