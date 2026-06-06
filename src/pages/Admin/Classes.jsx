import React, { useState } from "react";

export default function Classes() {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Accounting",
      color: "#ff6b6b",
    },
    {
      id: 2,
      name: "Finance",
      color: "#4dabf7",
    },
    {
      id: 3,
      name: "Data Science",
      color: "#51cf66",
    },
    {
      id: 4,
      name: "Engineering",
      color: "#845ef7",
    },
  ]);

  const [newClass, setNewClass] = useState("");

  const addClass = () => {
    if (!newClass) return;

    setClasses([
      ...classes,
      {
        id: Date.now(),
        name: newClass,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      },
    ]);

    setNewClass("");
  };

  const deleteClass = (id) => {
    setClasses(classes.filter((c) => c.id !== id));
  };

  return (
    <div className="table-card">
      <h3>Class Categories</h3>

      {/* Add Class */}
      <div className="crud-form">
        <input
          type="text"
          placeholder="Add new class (e.g. AI, MBA)"
          value={newClass}
          onChange={(e) => setNewClass(e.target.value)}
        />
        <button onClick={addClass}>Add</button>
      </div>

      {/* Cards */}
      <div className="class-grid">
        {classes.map((c) => (
          <div
            key={c.id}
            className="class-card"
            style={{ background: c.color }}
          >
            <h4>{c.name}</h4>
            <button onClick={() => deleteClass(c.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}