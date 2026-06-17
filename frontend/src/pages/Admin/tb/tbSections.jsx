import { useState, useEffect } from "react";
import "../../../styles/Dashboard.css";

const API_BASE_URL = "http://localhost:8080/api";
const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

const Sections = () => {
  const [sections, setSections] = useState([]);
  const [form, setForm] = useState({
    section_id: "",
    section_name: "",
    course_id: "",
    class_id: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/sections`);
      setSections(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.section_id.trim()) return alert("Section ID is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/sections/${editId}`
        : `${API_BASE_URL}/sections`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchSections();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (s) => {
    setForm({ ...s });
    setEditId(s.section_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this section?")) return;
    await fetch(`${API_BASE_URL}/sections/${id}`, { method: "DELETE" });
    fetchSections();
    if (editId === id) cancel();
  };

  const cancel = () => {
    setEditId(null);
    setForm({ section_id: "", section_name: "", course_id: "", class_id: "" });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Sections Management</h2>
      <div className="crud-form">
        <input
          name="section_id"
          placeholder="Section ID"
          value={form.section_id}
          onChange={handleChange}
          disabled={editId !== null}
        />
        <input
          name="section_name"
          placeholder="Section Name (e.g., Class A)"
          value={form.section_name}
          onChange={handleChange}
        />
        <input
          name="course_id"
          placeholder="Course ID"
          value={form.course_id}
          onChange={handleChange}
        />
        <input
          name="class_id"
          placeholder="Class ID"
          value={form.class_id}
          onChange={handleChange}
        />
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Section"}
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
              <th>Section ID</th>
              <th>Name</th>
              <th>Course ID</th>
              <th>Class ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sections.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  No sections found
                </td>
              </tr>
            ) : (
              sections.map((s) => (
                <tr key={s.section_id}>
                  <td>
                    <span className="id-badge">{s.section_id}</span>
                  </td>
                  <td className="name-cell">{s.section_name}</td>
                  <td>{s.course_id}</td>
                  <td>{s.class_id}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(s)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(s.section_id)}
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

export default Sections;
