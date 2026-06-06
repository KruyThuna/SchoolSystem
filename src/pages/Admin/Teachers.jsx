import { useState } from "react";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    teacher_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    hire_date: "",
    status: "Active",
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const addOrUpdate = () => {
    if (!form.teacher_id) return alert("ID required");
    if (editId) {
      setTeachers(teachers.map((t) => (t.teacher_id === editId ? form : t)));
      setEditId(null);
    } else setTeachers([...teachers, form]);
    setForm({ teacher_id: "", first_name: "", last_name: "", email: "", phone: "", hire_date: "", status: "Active" });
  };
  const handleEdit = (t) => { setForm(t); setEditId(t.teacher_id); };
  const handleDelete = (id) => { setTeachers(teachers.filter((t) => t.teacher_id !== id)); if(editId === id) setEditId(null); };

  return (
    <div className="table-card">
      <h2>Teachers CRUD</h2>
      <div className="crud-form">
        <input name="teacher_id" placeholder="ID" value={form.teacher_id} onChange={handleChange}/>
        <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange}/>
        <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange}/>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange}/>
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange}/>
        <input type="date" name="hire_date" value={form.hire_date} onChange={handleChange}/>
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <button onClick={addOrUpdate}>{editId ? "Update" : "Add"}</button>
      </div>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Hire Date</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {teachers.map((t) => (
            <tr key={t.teacher_id}>
              <td>{t.teacher_id}</td>
              <td>{t.first_name} {t.last_name}</td>
              <td>{t.email}</td>
              <td>{t.phone}</td>
              <td>{t.hire_date}</td>
              <td>{t.status}</td>
              <td>
                <button onClick={() => handleEdit(t)}>Edit</button>
                <button onClick={() => handleDelete(t.teacher_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}