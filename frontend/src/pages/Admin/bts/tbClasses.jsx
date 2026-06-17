import { useState, useEffect } from "react";
import "../../../styles/Dashboard.css";

const API_BASE_URL = "http://localhost:8080/api";

const ClassesTable = () => {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    class_id: "",
    class_name: "",
    room: "",
    teacher_id: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/classes`);
      setClasses(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.class_id.trim()) return alert("Class ID is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/classes/${editId}`
        : `${API_BASE_URL}/classes`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchClasses();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (c) => {
    setForm(c);
    setEditId(c.class_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this class?")) return;
    try {
      await fetch(`${API_BASE_URL}/classes/${id}`, { method: "DELETE" });
      fetchClasses();
      if (editId === id) cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const cancel = () => {
    setEditId(null);
    setForm({
      class_id: "",
      class_name: "",
      room: "",
      teacher_id: "",
    });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Classes</h2>
      <div className="crud-form">
        <input
          name="class_id"
          placeholder="Class ID"
          value={form.class_id}
          onChange={handleChange}
          disabled={editId !== null}
        />
        <input
          name="class_name"
          placeholder="Class Name"
          value={form.class_name}
          onChange={handleChange}
        />
        <input
          name="room"
          placeholder="Room"
          value={form.room}
          onChange={handleChange}
        />
        <input
          name="teacher_id"
          placeholder="Teacher ID"
          value={form.teacher_id}
          onChange={handleChange}
        />
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Class"}
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
              <th>Name</th>
              <th>Room</th>
              <th>Teacher ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  No classes found
                </td>
              </tr>
            ) : (
              classes.map((c) => (
                <tr key={c.class_id}>
                  <td>
                    <span className="id-badge">{c.class_id}</span>
                  </td>
                  <td className="name-cell">{c.class_name}</td>
                  <td>{c.room}</td>
                  <td>{c.teacher_id}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(c)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(c.class_id)}
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

export default ClassesTable;
