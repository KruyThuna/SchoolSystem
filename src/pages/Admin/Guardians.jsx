import { useState } from "react";

export default function Guardians() {
  const [guardians, setGuardians] = useState([]);
  const [form, setForm] = useState({
    guardian_id: "",
    student_id: "",
    first_name: "",
    last_name: "",
    relationship: "",
    phone: "",
    email: "",
    address: "",
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addOrUpdate = () => {
    if (!form.guardian_id) return alert("ID required");

    if (editId) {
      setGuardians(
        guardians.map((g) =>
          g.guardian_id === editId ? form : g
        )
      );
      setEditId(null);
    } else {
      setGuardians([...guardians, form]);
    }

    setForm({
      guardian_id: "",
      student_id: "",
      first_name: "",
      last_name: "",
      relationship: "",
      phone: "",
      email: "",
      address: "",
    });
  };

  const handleEdit = (g) => {
    setForm(g);
    setEditId(g.guardian_id);
  };

  const handleDelete = (id) => {
    setGuardians(guardians.filter((g) => g.guardian_id !== id));
    if (editId === id) setEditId(null);
  };

  return (
    <div className="table-card">
      <h2>Guardians CRUD</h2>

      <div className="crud-form">
        <input name="guardian_id" placeholder="ID" value={form.guardian_id} onChange={handleChange} />
        <input name="student_id" placeholder="Student ID" value={form.student_id} onChange={handleChange} />
        <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} />
        <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} />
        <input name="relationship" placeholder="Relationship" value={form.relationship} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />

        <button onClick={addOrUpdate}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Name</th>
            <th>Relation</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {guardians.map((g) => (
            <tr key={g.guardian_id}>
              <td>{g.student_id}</td>
              <td>{g.first_name} {g.last_name}</td>
              <td>{g.relationship}</td>
              <td>{g.phone}</td>
              <td>{g.email}</td>
              <td>
                <button onClick={() => handleEdit(g)}>Edit</button>
                <button onClick={() => handleDelete(g.guardian_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}