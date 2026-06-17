import { useState, useEffect } from "react";
import "../../../styles/Dashboard.css";

const API_BASE_URL = "http://localhost:8080/api";
const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

const TeacherAttendanceTable = () => {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    attendance_id: "",
    teacher_id: "",
    date: "",
    status: "Present",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance`);
      setRecords(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.attendance_id.trim()) return alert("Attendance ID is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/attendance/${editId}`
        : `${API_BASE_URL}/attendance`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchRecords();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (r) => {
    setForm({ ...r, date: formatDate(r.date) });
    setEditId(r.attendance_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      await fetch(`${API_BASE_URL}/attendance/${id}`, { method: "DELETE" });
      fetchRecords();
      if (editId === id) cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const cancel = () => {
    setEditId(null);
    setForm({
      attendance_id: "",
      teacher_id: "",
      date: "",
      status: "Present",
    });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Teacher Attendance</h2>
      <div className="crud-form">
        <input
          name="attendance_id"
          placeholder="Attendance ID"
          value={form.attendance_id}
          onChange={handleChange}
          disabled={editId !== null}
        />
        <input
          name="teacher_id"
          placeholder="Teacher ID"
          value={form.teacher_id}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
        </select>
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Record"}
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
              <th>Teacher ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  No records found
                </td>
              </tr>
            ) : (
              records.map((r) => (
                <tr key={r.attendance_id}>
                  <td>
                    <span className="id-badge">{r.attendance_id}</span>
                  </td>
                  <td>{r.teacher_id}</td>
                  <td>{formatDate(r.date)}</td>
                  <td>{r.status}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(r)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(r.attendance_id)}
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

export default TeacherAttendanceTable;
