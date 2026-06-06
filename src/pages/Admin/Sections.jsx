import { useState } from "react";

export default function Sections() {
  const [sections, setSections] = useState([]);
  const [form, setForm] = useState({
    section_id: "",
    course_id: "",
    teacher_id: "",
    section_name: "",
    academic_year: "",
    semester: "",
    room_id: "",
    schedule: "",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addOrUpdate = () => {
    if (!form.section_id) return alert("ID required");

    if (editId) {
      setSections(
        sections.map((s) =>
          s.section_id === editId ? form : s
        )
      );
      setEditId(null);
    } else {
      setSections([...sections, form]);
    }

    setForm({
      section_id: "",
      course_id: "",
      teacher_id: "",
      section_name: "",
      academic_year: "",
      semester: "",
      room_id: "",
      schedule: "",
    });
  };

  const handleEdit = (s) => {
    setForm(s);
    setEditId(s.section_id);
  };

  const handleDelete = (id) => {
    setSections(sections.filter((s) => s.section_id !== id));
    if (editId === id) setEditId(null);
  };

  return (
    <div className="table-card">
      <h2>Sections CRUD</h2>

      <div className="crud-form">
        <input name="section_id" placeholder="ID" value={form.section_id} onChange={handleChange} />
        <input name="course_id" placeholder="Course ID" value={form.course_id} onChange={handleChange} />
        <input name="teacher_id" placeholder="Teacher ID" value={form.teacher_id} onChange={handleChange} />
        <input name="section_name" placeholder="Name" value={form.section_name} onChange={handleChange} />
        <input name="academic_year" placeholder="Year" value={form.academic_year} onChange={handleChange} />
        <input name="semester" placeholder="Semester" value={form.semester} onChange={handleChange} />
        <input name="room_id" placeholder="Room" value={form.room_id} onChange={handleChange} />
        <input name="schedule" placeholder="Schedule" value={form.schedule} onChange={handleChange} />

        <button onClick={addOrUpdate}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Teacher</th>
            <th>Section</th>
            <th>Schedule</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sections.map((s) => (
            <tr key={s.section_id}>
              <td>{s.course_id}</td>
              <td>{s.teacher_id}</td>
              <td>{s.section_name}</td>
              <td>{s.schedule}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s.section_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}