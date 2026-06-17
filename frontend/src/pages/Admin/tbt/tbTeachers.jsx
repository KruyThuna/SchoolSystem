import { useState, useEffect } from "react";
import "../../../styles/Dashboard.css";

const API_BASE_URL = "http://localhost:8080/api";
const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

const TeacherTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    teacher_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    subject: "",
    status: "Active",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/teachers`);
      setTeachers(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.teacher_id.trim()) return alert("Teacher ID is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/teachers/${editId}`
        : `${API_BASE_URL}/teachers`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchTeachers();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (t) => {
    setForm(t);
    setEditId(t.teacher_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this teacher?")) return;
    try {
      await fetch(`${API_BASE_URL}/teachers/${id}`, { method: "DELETE" });
      fetchTeachers();
      if (editId === id) cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const cancel = () => {
    setEditId(null);
    setForm({
      teacher_id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      subject: "",
      status: "Active",
    });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Teachers</h2>
      <div className="crud-form">
        <input
          name="teacher_id"
          placeholder="Teacher ID"
          value={form.teacher_id}
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
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Teacher"}
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
              <th>Subject</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-row">
                  No teachers found
                </td>
              </tr>
            ) : (
              teachers.map((t) => (
                <tr key={t.teacher_id}>
                  <td>
                    <span className="id-badge">{t.teacher_id}</span>
                  </td>
                  <td className="name-cell">
                    {t.first_name} {t.last_name}
                  </td>
                  <td>{t.email}</td>
                  <td>{t.phone}</td>
                  <td>{t.subject}</td>
                  <td>{t.status}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(t)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(t.teacher_id)}
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

export default TeacherTable;
