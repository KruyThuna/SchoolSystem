import { useState, useEffect } from "react";
import "../../../styles/Dashboard.css";

const API_BASE_URL = "http://localhost:8080/api";
const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

const AttendanceTable = () => {
  const [attendance, setAttendance] = useState([]);
  const [form, setForm] = useState({
    attendance_id: "",
    student_id: "",
    date: "",
    status: "Present",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance`);
      setAttendance(await res.json());
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
      fetchAttendance();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (a) => {
    setForm({ ...a, date: formatDate(a.date) });
    setEditId(a.attendance_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      await fetch(`${API_BASE_URL}/attendance/${id}`, { method: "DELETE" });
      fetchAttendance();
      if (editId === id) cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const cancel = () => {
    setEditId(null);
    setForm({
      attendance_id: "",
      student_id: "",
      date: "",
      status: "Present",
    });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Attendance</h2>
      <div className="crud-form">
        <input
          name="attendance_id"
          placeholder="Attendance ID"
          value={form.attendance_id}
          onChange={handleChange}
          disabled={editId !== null}
        />
        <input
          name="student_id"
          placeholder="Student ID"
          value={form.student_id}
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
            {editId ? "Update" : "Add Attendance"}
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
              <th>Student ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendance.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  No records found
                </td>
              </tr>
            ) : (
              attendance.map((a) => (
                <tr key={a.attendance_id}>
                  <td>
                    <span className="id-badge">{a.attendance_id}</span>
                  </td>
                  <td>{a.student_id}</td>
                  <td>{formatDate(a.date)}</td>
                  <td>{a.status}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(a)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(a.attendance_id)}
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

export default AttendanceTable;
