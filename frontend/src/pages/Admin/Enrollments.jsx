import { useState } from "react";

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [form, setForm] = useState({
    enrollment_id: "",
    student_id: "",
    section_id: "",
    enrollment_date: "",
    academic_year: "",
    status: "",
    final_grade: "",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addOrUpdate = () => {
    if (!form.enrollment_id) return alert("ID required");

    if (editId) {
      setEnrollments(
        enrollments.map((e) =>
          e.enrollment_id === editId ? form : e
        )
      );
      setEditId(null);
    } else {
      setEnrollments([...enrollments, form]);
    }

    setForm({
      enrollment_id: "",
      student_id: "",
      section_id: "",
      enrollment_date: "",
      academic_year: "",
      status: "",
      final_grade: "",
    });
  };

  const handleEdit = (e) => {
    setForm(e);
    setEditId(e.enrollment_id);
  };

  const handleDelete = (id) => {
    setEnrollments(enrollments.filter((e) => e.enrollment_id !== id));
    if (editId === id) setEditId(null);
  };

  return (
    <div className="table-card">
      <h2>Enrollments CRUD</h2>

      <div className="crud-form">
        <input name="enrollment_id" placeholder="ID" value={form.enrollment_id} onChange={handleChange} />
        <input name="student_id" placeholder="Student ID" value={form.student_id} onChange={handleChange} />
        <input name="section_id" placeholder="Section ID" value={form.section_id} onChange={handleChange} />
        <input type="date" name="enrollment_date" value={form.enrollment_date} onChange={handleChange} />
        <input name="academic_year" placeholder="Year" value={form.academic_year} onChange={handleChange} />
        <input name="status" placeholder="Status" value={form.status} onChange={handleChange} />
        <input name="final_grade" placeholder="Grade" value={form.final_grade} onChange={handleChange} />

        <button onClick={addOrUpdate}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Section</th>
            <th>Year</th>
            <th>Status</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {enrollments.map((e) => (
            <tr key={e.enrollment_id}>
              <td>{e.student_id}</td>
              <td>{e.section_id}</td>
              <td>{e.academic_year}</td>
              <td>{e.status}</td>
              <td>{e.final_grade}</td>
              <td>
                <button onClick={() => handleEdit(e)}>Edit</button>
                <button onClick={() => handleDelete(e.enrollment_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}