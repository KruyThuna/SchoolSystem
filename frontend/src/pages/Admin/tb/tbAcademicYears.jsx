import { useState, useEffect } from "react";
import "../../../styles/Dashboard.css";

const API_BASE_URL = "http://localhost:8080/api";
const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

const AcademicYears = () => {
  const [years, setYears] = useState([]);
  const [form, setForm] = useState({
    year_id: "",
    year_name: "",
    start_date: "",
    end_date: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchYears();
  }, []);

  const fetchYears = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/academicyears`);
      setYears(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.year_id.trim()) return alert("Year ID is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/academicyears/${editId}`
        : `${API_BASE_URL}/academicyears`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchYears();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (y) => {
    setForm({
      ...y,
      start_date: formatDate(y.start_date),
      end_date: formatDate(y.end_date),
    });
    setEditId(y.year_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this academic year?")) return;
    await fetch(`${API_BASE_URL}/academicyears/${id}`, { method: "DELETE" });
    fetchYears();
    if (editId === id) cancel();
  };

  const cancel = () => {
    setEditId(null);
    setForm({ year_id: "", year_name: "", start_date: "", end_date: "" });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Academic Years</h2>
      <div className="crud-form">
        <input
          name="year_id"
          placeholder="Year ID"
          value={form.year_id}
          onChange={handleChange}
          disabled={editId !== null}
        />
        <input
          name="year_name"
          placeholder="Year Name (e.g., 2025-2026)"
          value={form.year_name}
          onChange={handleChange}
        />
        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
        />
        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
        />
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Year"}
          </button>
          {editId && (
            <button className="btn-secondary" onClick={cancel}>
              Cancel
            </button>
          )}
        </div>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Year Name</th>
              <th>Start</th>
              <th>End</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {years.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  No academic years found
                </td>
              </tr>
            ) : (
              years.map((y) => (
                <tr key={y.year_id}>
                  <td>
                    <span className="id-badge">{y.year_id}</span>
                  </td>
                  <td className="name-cell">{y.year_name}</td>
                  <td>{formatDate(y.start_date)}</td>
                  <td>{formatDate(y.end_date)}</td>
                  <td>
                    <div className="action-btns">
                      {/* BUG FIX: was onClick={(y) => edit(r)} — wrong params */}
                      <button className="btn-edit" onClick={() => edit(y)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(y.year_id)}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcademicYears;
