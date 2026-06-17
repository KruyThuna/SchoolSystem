import { useState, useEffect } from "react";
import "../../../styles/Dashboard.css";

const API_BASE_URL = "http://localhost:8080/api";
const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

const Guardians = () => {
  const [guardians, setGuardians] = useState([]);
  const [form, setForm] = useState({
    guardian_id: "",
    name: "",
    phone: "",
    relationship: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchGuardians();
  }, []);

  const fetchGuardians = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/guardians`);
      setGuardians(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.guardian_id.trim()) return alert("Guardian ID is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/guardians/${editId}`
        : `${API_BASE_URL}/guardians`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchGuardians();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (g) => {
    setForm({ ...g });
    setEditId(g.guardian_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this guardian?")) return;
    await fetch(`${API_BASE_URL}/guardians/${id}`, { method: "DELETE" });
    fetchGuardians();
    if (editId === id) cancel();
  };

  const cancel = () => {
    setEditId(null);
    setForm({ guardian_id: "", name: "", phone: "", relationship: "" });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Guardians Management</h2>
      <div className="crud-form">
        <input
          name="guardian_id"
          placeholder="Guardian ID"
          value={form.guardian_id}
          onChange={handleChange}
          disabled={editId !== null}
        />
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="relationship"
          placeholder="Relationship"
          value={form.relationship}
          onChange={handleChange}
        />
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Guardian"}
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
              <th>Phone</th>
              <th>Relationship</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {guardians.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  No guardians found
                </td>
              </tr>
            ) : (
              guardians.map((g) => (
                <tr key={g.guardian_id}>
                  <td>
                    <span className="id-badge">{g.guardian_id}</span>
                  </td>
                  <td className="name-cell">{g.name}</td>
                  <td>{g.phone}</td>
                  <td>
                    <span className="tag">{g.relationship}</span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(g)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(g.guardian_id)}
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

export default Guardians;
