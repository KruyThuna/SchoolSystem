import { useState } from "react";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ course_id: "", course_code: "", course_name: "", description: "", credit_hours: 0 });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const addOrUpdate = () => {
    if (!form.course_id) return alert("ID required");
    if (editId) { setCourses(courses.map((c) => (c.course_id === editId ? form : c))); setEditId(null); }
    else setCourses([...courses, form]);
    setForm({ course_id: "", course_code: "", course_name: "", description: "", credit_hours: 0 });
  };
  const handleEdit = (c) => { setForm(c); setEditId(c.course_id); };
  const handleDelete = (id) => { setCourses(courses.filter((c) => c.course_id !== id)); if(editId === id) setEditId(null); };

  return (
    <div className="table-card">
      <h2>Courses CRUD</h2>
      <div className="crud-form">
        <input name="course_id" placeholder="ID" value={form.course_id} onChange={handleChange}/>
        <input name="course_code" placeholder="Code" value={form.course_code} onChange={handleChange}/>
        <input name="course_name" placeholder="Name" value={form.course_name} onChange={handleChange}/>
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange}/>
        <input type="number" name="credit_hours" placeholder="Credits" value={form.credit_hours} onChange={handleChange}/>
        <button onClick={addOrUpdate}>{editId ? "Update" : "Add"}</button>
      </div>
      <table>
        <thead>
          <tr><th>Code</th><th>Name</th><th>Description</th><th>Credits</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.course_id}>
              <td>{c.course_code}</td>
              <td>{c.course_name}</td>
              <td>{c.description}</td>
              <td>{c.credit_hours}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c.course_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}