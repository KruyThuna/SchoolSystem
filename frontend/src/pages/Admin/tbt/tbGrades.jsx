import { useState, useEffect } from "react";
import "../../../styles/Dashboard.css";

const API_BASE_URL = "http://localhost:8080/api";

const TeacherGradesTable = () => {
  const [grades, setGrades] = useState([]);
  const [form, setForm] = useState({
    grade_id: "",
    teacher_id: "",
    student_id: "",
    course_id: "",
    score: "",
    grade: "A",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/grades`);
      setGrades(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.grade_id.trim()) return alert("Grade ID is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/grades/${editId}`
        : `${API_BASE_URL}/grades`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchGrades();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (g) => {
    setForm(g);
    setEditId(g.grade_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this grade?")) return;
    try {
      await fetch(`${API_BASE_URL}/grades/${id}`, { method: "DELETE" });
      fetchGrades();
      if (editId === id) cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const cancel = () => {
    setEditId(null);
    setForm({
      grade_id: "",
      teacher_id: "",
      student_id: "",
      course_id: "",
      score: "",
      grade: "A",
    });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Grades</h2>
      <div className="crud-form">
        <input
          name="grade_id"
          placeholder="Grade ID"
          value={form.grade_id}
          onChange={handleChange}
          disabled={editId !== null}
        />
        <input
          name="teacher_id"
          placeholder="Teacher ID"
          value={form.teacher_id}
          onChange={handleChange}
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
          name="score"
          placeholder="Score"
          type="number"
          value={form.score}
          onChange={handleChange}
        />
        <select name="grade" value={form.grade} onChange={handleChange}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Grade"}
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
              <th>Teacher ID</th>
              <th>Student ID</th>
              <th>Course ID</th>
              <th>Score</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {grades.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-row">
                  No grades found
                </td>
              </tr>
            ) : (
              grades.map((g) => (
                <tr key={g.grade_id}>
                  <td>
                    <span className="id-badge">{g.grade_id}</span>
                  </td>
                  <td>{g.teacher_id}</td>
                  <td>{g.student_id}</td>
                  <td>{g.course_id}</td>
                  <td>{g.score}</td>
                  <td>
                    <span className={`status-badge grade-${g.grade}`}>
                      {g.grade}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(g)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(g.grade_id)}
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

export default TeacherGradesTable;
