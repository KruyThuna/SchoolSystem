import { useState } from "react";

export default function Students() {
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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const addOrUpdate = () => {
    if (!form.student_id) return alert("ID required");
    if (editId) {
      setStudents(students.map((s) => (s.student_id === editId ? form : s)));
      setEditId(null);
    } else setStudents([...students, form]);
    setForm({ student_id: "", first_name: "", last_name: "", email: "", phone: "", enrollment_date: "", status: "Active" });
  };
  const handleEdit = (s) => { setForm(s); setEditId(s.student_id); };
  const handleDelete = (id) => { setStudents(students.filter((s) => s.student_id !== id)); if(editId === id) setEditId(null); };

  return (
    <div className="table-card">
      <h2>Students CRUD</h2>
      <div className="crud-form">
        <input name="student_id" placeholder="ID" value={form.student_id} onChange={handleChange}/>
        <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange}/>
        <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange}/>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange}/>
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange}/>
        <input type="date" name="enrollment_date" value={form.enrollment_date} onChange={handleChange}/>
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <button onClick={addOrUpdate}>{editId ? "Update" : "Add"}</button>
      </div>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Enroll Date</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.student_id}>
              <td>{s.student_id}</td>
              <td>{s.first_name} {s.last_name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.enrollment_date}</td>
              <td>{s.status}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s.student_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}