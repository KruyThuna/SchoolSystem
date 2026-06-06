import { useState } from "react";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ room_id: "", room_number: "", building: "", capacity: "", room_type: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const addOrUpdate = () => {
    if (!form.room_id) return alert("ID required");
    if (editId) { setRooms(rooms.map(r => r.room_id === editId ? form : r)); setEditId(null); }
    else setRooms([...rooms, form]);
    setForm({ room_id: "", room_number: "", building: "", capacity: "", room_type: "" });
  };
  const handleEdit = (r) => { setForm(r); setEditId(r.room_id); };
  const handleDelete = (id) => { setRooms(rooms.filter(r => r.room_id !== id)); if(editId === id) setEditId(null); };

  return (
    <div className="table-card">
      <h2>Class CRUD</h2>
      <div className="crud-form">
        <input name="room_id" placeholder="ID" value={form.room_id} onChange={handleChange}/>
        <input name="room_number" placeholder="Room Number" value={form.room_number} onChange={handleChange}/>
        <input name="building" placeholder="Building" value={form.building} onChange={handleChange}/>
        <input name="capacity" placeholder="Capacity" type="number" value={form.capacity} onChange={handleChange}/>
        <input name="room_type" placeholder="Type" value={form.room_type} onChange={handleChange}/>
        <button onClick={addOrUpdate}>{editId ? "Update" : "Add"}</button>
      </div>
      <table>
        <thead><tr><th>Number</th><th>Building</th><th>Capacity</th><th>Type</th><th>Actions</th></tr></thead>
        <tbody>
          {rooms.map(r => (
            <tr key={r.room_id}>
              <td>{r.room_number}</td>
              <td>{r.building}</td>
              <td>{r.capacity}</td>
              <td>{r.room_type}</td>
              <td>
                <button onClick={() => handleEdit(r)}>Edit</button>
                <button onClick={() => handleDelete(r.room_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}