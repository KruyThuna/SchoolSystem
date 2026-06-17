import { useState, useEffect } from "react";
import "../../../styles/Dashboard.css";

const API_BASE_URL = "http://localhost:8080/api";
const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

const EnrollmentsTable = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [form, setForm] = useState({
    enrollment_id: "",
    student_id: "",
    course_id: "",
    enrollment_date: "",
    status: "Active",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/enrollments`);
      setEnrollments(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.enrollment_id.trim()) return alert("Enrollment ID is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/enrollments/${editId}`
        : `${API_BASE_URL}/enrollments`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchEnrollments();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (e) => {
    setForm({ ...e, enrollment_date: formatDate(e.enrollment_date) });
    setEditId(e.enrollment_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this enrollment?")) return;
    try {
      await fetch(`${API_BASE_URL}/enrollments/${id}`, { method: "DELETE" });
      fetchEnrollments();
      if (editId === id) cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const cancel = () => {
    setEditId(null);
    setForm({
      enrollment_id: "",
      student_id: "",
      course_id: "",
      enrollment_date: "",
      status: "Active",
    });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Enrollments</h2>
      <div className="crud-form">
        <input
          name="enrollment_id"
          placeholder="Enrollment ID"
          value={form.enrollment_id}
          onChange={handleChange}
          disabled={editId !== null}
        />
        <input
          name="student_id"
          placeholder="Student ID"
          value={form.student_id}
          onChange={handleChange}
        />
        <input
          name="course_id"
          placeholder="Course ID"
          value={form.course_id}
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
            {editId ? "Update" : "Add Enrollment"}
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
              <th>Student ID</th>
              <th>Course ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-row">
                  No enrollments found
                </td>
              </tr>
            ) : (
              enrollments.map((e) => (
                <tr key={e.enrollment_id}>
                  <td>
                    <span className="id-badge">{e.enrollment_id}</span>
                  </td>
                  <td>{e.student_id}</td>
                  <td>{e.course_id}</td>
                  <td>{formatDate(e.enrollment_date)}</td>
                  <td>{e.status}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(e)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(e.enrollment_id)}
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

export default EnrollmentsTable;
