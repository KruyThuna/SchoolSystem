import { useState, useEffect } from "react";
import "../../../styles/Dashboard.css";

const API_BASE_URL = "http://localhost:8080/api";
const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    student_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    enrollment_date: "",
    status: "Active",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/students`);
      setStudents(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.student_id.trim()) return alert("Student ID is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/students/${editId}`
        : `${API_BASE_URL}/students`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchStudents();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (s) => {
    setForm({ ...s, enrollment_date: formatDate(s.enrollment_date) });
    setEditId(s.student_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await fetch(`${API_BASE_URL}/students/${id}`, { method: "DELETE" });
      fetchStudents();
      if (editId === id) cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const cancel = () => {
    setEditId(null);
    setForm({
      student_id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      enrollment_date: "",
      status: "Active",
    });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Students</h2>
      <div className="crud-form">
        <input
          name="student_id"
          placeholder="Student ID"
          value={form.student_id}
          onChange={handleChange}
          disabled={editId !== null}
        />
        <input
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
        />
        <input
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="date"
          name="enrollment_date"
          value={form.enrollment_date}
          onChange={handleChange}
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Student"}
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
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Enrolled</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-row">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s.student_id}>
                  <td>
                    <span className="id-badge">{s.student_id}</span>
                  </td>
                  <td className="name-cell">
                    {s.first_name} {s.last_name}
                  </td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{formatDate(s.enrollment_date)}</td>
                  <td>{s.status}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(s)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(s.student_id)}
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

export default StudentTable;
