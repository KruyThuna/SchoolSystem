import { useState, useEffect } from "react";
import "../../../styles/Dashboard.css";

const API_BASE_URL = "http://localhost:8080/api";
const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    class_id: "",
    class_number: "",
    building: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/class`);
      setRooms(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.class_id.trim()) return alert("Room ID is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/class/${editId}`
        : `${API_BASE_URL}/class`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchRooms();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (r) => {
    setForm({ ...r });
    setEditId(r.class_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this room?")) return;
    await fetch(`${API_BASE_URL}/class/${id}`, { method: "DELETE" });
    fetchRooms();
    if (editId === id) cancel();
  };

  const cancel = () => {
    setEditId(null);
    setForm({ class_id: "", class_number: "", building: "" });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Rooms Management</h2>
      <div className="crud-form">
        <input
          name="class_id"
          placeholder="Room ID"
          value={form.class_id}
          onChange={handleChange}
          disabled={editId !== null}
        />
        <input
          name="class_number"
          placeholder="Room Number"
          value={form.class_number}
          onChange={handleChange}
        />
        <input
          name="building"
          placeholder="Building"
          value={form.building}
          onChange={handleChange}
        />
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Room"}
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
              <th>Room Number</th>
              <th>Building</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-row">
                  No rooms found
                </td>
              </tr>
            ) : (
              rooms.map((r) => (
                <tr key={r.class_id}>
                  <td>
                    <span className="id-badge">{r.class_id}</span>
                  </td>
                  <td>{r.class_number}</td>
                  <td>{r.building}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(r)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(r.class_id)}
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

export default Rooms;
