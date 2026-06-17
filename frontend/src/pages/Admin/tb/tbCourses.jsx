import { useState, useEffect } from "react";
import "../../../styles/Dashboard.css";

const API_BASE_URL = "http://localhost:8080/api";
const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    course_id: "",
    course_name: "",
    department_id: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/courses`);
      setCourses(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.course_id.trim()) return alert("Course ID is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/courses/${editId}`
        : `${API_BASE_URL}/courses`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchCourses();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (c) => {
    setForm({ ...c });
    setEditId(c.course_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    await fetch(`${API_BASE_URL}/courses/${id}`, { method: "DELETE" });
    fetchCourses();
    if (editId === id) cancel();
  };

  const cancel = () => {
    setEditId(null);
    setForm({ course_id: "", course_name: "", department_id: "" });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Courses Management</h2>
      <div className="crud-form">
        <input
          name="course_id"
          placeholder="Course ID"
          value={form.course_id}
          onChange={handleChange}
          disabled={editId !== null}
        />
        <input
          name="course_name"
          placeholder="Course Name"
          value={form.course_name}
          onChange={handleChange}
        />
        <input
          name="department_id"
          placeholder="Department ID"
          value={form.department_id}
          onChange={handleChange}
        />
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Course"}
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
              <th>Course Name</th>
              <th>Dept ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-row">
                  No courses found
                </td>
              </tr>
            ) : (
              courses.map((c) => (
                <tr key={c.course_id}>
                  <td>
                    <span className="id-badge">{c.course_id}</span>
                  </td>
                  <td className="name-cell">{c.course_name}</td>
                  <td>{c.department_id}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(c)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(c.course_id)}
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

export default Courses;
