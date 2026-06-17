import { useState, useEffect } from "react";
import "../../../styles/Dashboard.css";

const API_BASE_URL = "http://localhost:8080/api";
const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");
const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ department_id: "", department_name: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/departments`);
      setDepartments(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.department_id.trim()) return alert("Department ID is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/departments/${editId}`
        : `${API_BASE_URL}/departments`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchDepartments();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (d) => {
    setForm({ ...d });
    setEditId(d.department_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this department?")) return;
    await fetch(`${API_BASE_URL}/departments/${id}`, { method: "DELETE" });
    fetchDepartments();
    if (editId === id) cancel();
  };

  const cancel = () => {
    setEditId(null);
    setForm({ department_id: "", department_name: "" });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Departments Management</h2>
      <div className="crud-form">
        <input
          name="department_id"
          placeholder="Department ID"
          value={form.department_id}
          onChange={handleChange}
          disabled={editId !== null}
        />
        <input
          name="department_name"
          placeholder="Department Name"
          value={form.department_name}
          onChange={handleChange}
        />
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Department"}
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
              <th>Department Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.length === 0 ? (
              <tr>
                <td colSpan="3" className="empty-row">
                  No departments found
                </td>
              </tr>
            ) : (
              departments.map((d) => (
                <tr key={d.department_id}>
                  <td>
                    <span className="id-badge">{d.department_id}</span>
                  </td>
                  <td className="name-cell">{d.department_name}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(d)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(d.department_id)}
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

export default Departments;
