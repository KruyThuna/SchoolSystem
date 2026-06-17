import { useState, useEffect } from "react";
import "../../../styles/Dashboard.css";

const API_BASE_URL = "http://localhost:8080/api";
const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [form, setForm] = useState({
    enrollment_id: "",
    student_id: "",
    course_id: "",
    enroll_date: "",
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

  const edit = (en) => {
    setForm({ ...en, enroll_date: formatDate(en.enroll_date) });
    setEditId(en.enrollment_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this enrollment?")) return;
    await fetch(`${API_BASE_URL}/enrollments/${id}`, { method: "DELETE" });
    fetchEnrollments();
    if (editId === id) cancel();
  };

  const cancel = () => {
    setEditId(null);
    setForm({
      enrollment_id: "",
      student_id: "",
      course_id: "",
      enroll_date: "",
    });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Enrollments Management</h2>
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
          name="enroll_date"
          value={form.enroll_date}
          onChange={handleChange}
        />
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
              <th>Enroll ID</th>
              <th>Student ID</th>
              <th>Course ID</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  No enrollments found
                </td>
              </tr>
            ) : (
              enrollments.map((en) => (
                <tr key={en.enrollment_id}>
                  <td>
                    <span className="id-badge">{en.enrollment_id}</span>
                  </td>
                  <td>{en.student_id}</td>
                  <td>{en.course_id}</td>
                  <td>{formatDate(en.enroll_date)}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(en)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(en.enrollment_id)}
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

export default Enrollments;
