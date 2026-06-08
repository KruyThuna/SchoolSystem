import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:5000/api/students";

const formatDate = (dateStr) =>
  dateStr ? dateStr.split("T")[0] : "";

export default function Students() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    student_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    enrollment_date: "",
    status: "Active",
  });

  const [editId, setEditId] = useState(null);

  // ================= LOAD DATA =================
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(API_BASE_URL);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SAVE (INSERT + UPDATE) =================
  const save = async () => {
    try {
      if (!form.student_id || !form.first_name || !form.last_name) {
        return alert("Please fill required fields");
      }

      const payload = {
        student_id: form.student_id,
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        enrollment_date: form.enrollment_date,
        status: form.status,
      };

      const url = editId
        ? `${API_BASE_URL}/${editId}`
        : API_BASE_URL;

      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Save failed");

      fetchStudents();
      cancel();
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  // ================= EDIT =================
  const edit = (s) => {
    setForm({
      student_id: s.student_id,
      first_name: s.first_name,
      last_name: s.last_name,
      email: s.email,
      phone: s.phone,
      enrollment_date: formatDate(s.enrollment_date),
      status: s.status || "Active",
    });

    setEditId(s.student_id);
  };

  // ================= DELETE =================
  const remove = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      fetchStudents();

      if (editId === id) cancel();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= RESET FORM =================
  const cancel = () => {
    setEditId(null);
    setForm({
      student_id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      enrollment_date: "",
      status: "Active",
    });
  };

  // ================= UI =================
  return (
    <div className="table-card">
      <h2>Students Management</h2>

      {/* FORM */}
      <div className="crud-form">
        <input
          name="student_id"
          placeholder="Student ID"
          value={form.student_id}
          onChange={handleChange}
        />

        <input
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
        />

        <input
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="date"
          name="enrollment_date"
          value={form.enrollment_date}
          onChange={handleChange}
        />

        <button onClick={save}>
          {editId ? "Update" : "Add"}
        </button>

        {editId && (
          <button onClick={cancel} style={{ marginLeft: "5px" }}>
            Cancel
          </button>
        )}
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No students found
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s.student_id}>
                <td>{s.student_id}</td>
                <td>
                  {s.first_name} {s.last_name}
                </td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{formatDate(s.enrollment_date)}</td>
                <td>
                  <button onClick={() => edit(s)}>Edit</button>
                  <button onClick={() => remove(s.student_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}