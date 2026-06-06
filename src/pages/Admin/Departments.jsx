import { useState } from "react";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ department_id: "", department_name: "", office_location: "", phone: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const addOrUpdate = () => {
    if (!form.department_id) return alert("ID required");
    if (editId) {
      setDepartments(departments.map(d => d.department_id === editId ? form : d));
      setEditId(null);
    } else setDepartments([...departments, form]);
    setForm({ department_id: "", department_name: "", office_location: "", phone: "" });
  };
  const handleEdit = (d) => { setForm(d); setEditId(d.department_id); };
  const handleDelete = (id) => { setDepartments(departments.filter(d => d.department_id !== id)); if(editId === id) setEditId(null); };

  return (
    <div className="table-card">
      <h2>Departments CRUD</h2>
      <div className="crud-form">
        <input name="department_id" placeholder="ID" value={form.department_id} onChange={handleChange}/>
        <input name="department_name" placeholder="Name" value={form.department_name} onChange={handleChange}/>
        <input name="office_location" placeholder="Office" value={form.office_location} onChange={handleChange}/>
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange}/>
        <button onClick={addOrUpdate}>{editId ? "Update" : "Add"}</button>
      </div>
      <table>
        <thead><tr><th>Name</th><th>Office</th><th>Phone</th><th>Actions</th></tr></thead>
        <tbody>
          {departments.map(d => (
            <tr key={d.department_id}>
              <td>{d.department_name}</td>
              <td>{d.office_location}</td>
              <td>{d.phone}</td>
              <td>
                <button onClick={() => handleEdit(d)}>Edit</button>
                <button onClick={() => handleDelete(d.department_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}