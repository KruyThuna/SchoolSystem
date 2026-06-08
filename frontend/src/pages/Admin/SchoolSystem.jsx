import { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import '../../styles/Dashboard.css';


const API_BASE_URL = "http://localhost:8080/api";

const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

/* ==========================================================================
   1. STUDENTS
   ========================================================================== */
const Students = () => {
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

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/students`);
      setStudents(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.student_id.trim()) return alert("Student ID is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/students/${editId}`
        : `${API_BASE_URL}/students`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchStudents();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (s) => {
    setForm({ ...s, enrollment_date: formatDate(s.enrollment_date) });
    setEditId(s.student_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    await fetch(`${API_BASE_URL}/students/${id}`, { method: "DELETE" });
    fetchStudents();
    if (editId === id) cancel();
  };

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

  return (
    <div className="table-card">
      <h2 className="section-title">Students Management</h2>
      <div className="crud-form">
        <input
          name="student_id"
          placeholder="Student ID"
          value={form.student_id}
          onChange={handleChange}
          disabled={editId !== null}
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
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Student"}
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
              <th>Email</th>
              <th>Phone</th>
              <th>Enrolled</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-row">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s.student_id}>
                  <td>
                    <span className="id-badge">{s.student_id}</span>
                  </td>
                  <td className="name-cell">
                    {s.first_name} {s.last_name}
                  </td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{formatDate(s.enrollment_date)}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(s)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(s.student_id)}
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

/* ==========================================================================
   2. TEACHERS
   ========================================================================== */
const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    teacher_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    hire_date: "",
    department_id: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/teachers`);
      setTeachers(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.teacher_id.trim()) return alert("Teacher ID is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/teachers/${editId}`
        : `${API_BASE_URL}/teachers`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchTeachers();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (t) => {
    setForm({ ...t, hire_date: formatDate(t.hire_date) });
    setEditId(t.teacher_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this teacher?")) return;
    await fetch(`${API_BASE_URL}/teachers/${id}`, { method: "DELETE" });
    fetchTeachers();
    if (editId === id) cancel();
  };

  const cancel = () => {
    setEditId(null);
    setForm({
      teacher_id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      hire_date: "",
      department_id: "",
    });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Teachers Management</h2>
      <div className="crud-form">
        <input
          name="teacher_id"
          placeholder="Teacher ID"
          value={form.teacher_id}
          onChange={handleChange}
          disabled={editId !== null}
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
          name="hire_date"
          value={form.hire_date}
          onChange={handleChange}
        />
        <input
          name="department_id"
          placeholder="Department ID"
          value={form.department_id}
          onChange={handleChange}
        />
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Teacher"}
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
              <th>Email</th>
              <th>Phone</th>
              <th>Dept ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-row">
                  No teachers found
                </td>
              </tr>
            ) : (
              teachers.map((t) => (
                <tr key={t.teacher_id}>
                  <td>
                    <span className="id-badge">{t.teacher_id}</span>
                  </td>
                  <td className="name-cell">
                    {t.first_name} {t.last_name}
                  </td>
                  <td>{t.email}</td>
                  <td>{t.phone}</td>
                  <td>{t.department_id}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(t)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(t.teacher_id)}
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

/* ==========================================================================
   3. COURSES
   ========================================================================== */
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    course_id: "",
    course_name: "",
    department_id: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/courses`);
      setCourses(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.course_id.trim()) return alert("Course ID is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/courses/${editId}`
        : `${API_BASE_URL}/courses`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchCourses();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (c) => {
    setForm({ ...c });
    setEditId(c.course_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    await fetch(`${API_BASE_URL}/courses/${id}`, { method: "DELETE" });
    fetchCourses();
    if (editId === id) cancel();
  };

  const cancel = () => {
    setEditId(null);
    setForm({ course_id: "", course_name: "", department_id: "" });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Courses Management</h2>
      <div className="crud-form">
        <input
          name="course_id"
          placeholder="Course ID"
          value={form.course_id}
          onChange={handleChange}
          disabled={editId !== null}
        />
        <input
          name="course_name"
          placeholder="Course Name"
          value={form.course_name}
          onChange={handleChange}
        />
        <input
          name="department_id"
          placeholder="Department ID"
          value={form.department_id}
          onChange={handleChange}
        />
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Course"}
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
              <th>Course Name</th>
              <th>Dept ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-row">
                  No courses found
                </td>
              </tr>
            ) : (
              courses.map((c) => (
                <tr key={c.course_id}>
                  <td>
                    <span className="id-badge">{c.course_id}</span>
                  </td>
                  <td className="name-cell">{c.course_name}</td>
                  <td>{c.department_id}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(c)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(c.course_id)}
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

/* ==========================================================================
   4. DEPARTMENTS
   ========================================================================== */
const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ department_id: "", department_name: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/departments`);
      setDepartments(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.department_id.trim()) return alert("Department ID is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/departments/${editId}`
        : `${API_BASE_URL}/departments`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchDepartments();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (d) => {
    setForm({ ...d });
    setEditId(d.department_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this department?")) return;
    await fetch(`${API_BASE_URL}/departments/${id}`, { method: "DELETE" });
    fetchDepartments();
    if (editId === id) cancel();
  };

  const cancel = () => {
    setEditId(null);
    setForm({ department_id: "", department_name: "" });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Departments Management</h2>
      <div className="crud-form">
        <input
          name="department_id"
          placeholder="Department ID"
          value={form.department_id}
          onChange={handleChange}
          disabled={editId !== null}
        />
        <input
          name="department_name"
          placeholder="Department Name"
          value={form.department_name}
          onChange={handleChange}
        />
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Department"}
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
              <th>Department Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.length === 0 ? (
              <tr>
                <td colSpan="3" className="empty-row">
                  No departments found
                </td>
              </tr>
            ) : (
              departments.map((d) => (
                <tr key={d.department_id}>
                  <td>
                    <span className="id-badge">{d.department_id}</span>
                  </td>
                  <td className="name-cell">{d.department_name}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(d)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(d.department_id)}
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

/* ==========================================================================
   5. ROOMS (mapped to 'class' table)
   ========================================================================== */
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

/* ==========================================================================
   6. ACADEMIC YEARS  ← BUG FIXED: onClick={(y) => edit(r)} → onClick={() => edit(y)}
   ========================================================================== */
const AcademicYears = () => {
  const [years, setYears] = useState([]);
  const [form, setForm] = useState({
    year_id: "",
    year_name: "",
    start_date: "",
    end_date: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchYears();
  }, []);

  const fetchYears = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/academicyears`);
      setYears(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.year_id.trim()) return alert("Year ID is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/academicyears/${editId}`
        : `${API_BASE_URL}/academicyears`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchYears();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (y) => {
    setForm({
      ...y,
      start_date: formatDate(y.start_date),
      end_date: formatDate(y.end_date),
    });
    setEditId(y.year_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this academic year?")) return;
    await fetch(`${API_BASE_URL}/academicyears/${id}`, { method: "DELETE" });
    fetchYears();
    if (editId === id) cancel();
  };

  const cancel = () => {
    setEditId(null);
    setForm({ year_id: "", year_name: "", start_date: "", end_date: "" });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Academic Years</h2>
      <div className="crud-form">
        <input
          name="year_id"
          placeholder="Year ID"
          value={form.year_id}
          onChange={handleChange}
          disabled={editId !== null}
        />
        <input
          name="year_name"
          placeholder="Year Name (e.g., 2025-2026)"
          value={form.year_name}
          onChange={handleChange}
        />
        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
        />
        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
        />
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Year"}
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
              <th>Year Name</th>
              <th>Start</th>
              <th>End</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {years.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  No academic years found
                </td>
              </tr>
            ) : (
              years.map((y) => (
                <tr key={y.year_id}>
                  <td>
                    <span className="id-badge">{y.year_id}</span>
                  </td>
                  <td className="name-cell">{y.year_name}</td>
                  <td>{formatDate(y.start_date)}</td>
                  <td>{formatDate(y.end_date)}</td>
                  <td>
                    <div className="action-btns">
                      {/* BUG FIX: was onClick={(y) => edit(r)} — wrong params */}
                      <button className="btn-edit" onClick={() => edit(y)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(y.year_id)}
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

/* ==========================================================================
   7. GUARDIANS
   ========================================================================== */
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

/* ==========================================================================
   8. PAYMENTS
   ========================================================================== */
const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({
    invoice_no: "",
    student_id: "",
    amount: "",
    payment_date: "",
    method: "Cash",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/payments`);
      setPayments(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.invoice_no.trim()) return alert("Invoice No is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/payments/${editId}`
        : `${API_BASE_URL}/payments`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchPayments();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (p) => {
    setForm({ ...p, payment_date: formatDate(p.payment_date) });
    setEditId(p.invoice_no);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this payment?")) return;
    await fetch(`${API_BASE_URL}/payments/${id}`, { method: "DELETE" });
    fetchPayments();
    if (editId === id) cancel();
  };

  const cancel = () => {
    setEditId(null);
    setForm({
      invoice_no: "",
      student_id: "",
      amount: "",
      payment_date: "",
      method: "Cash",
    });
  };

  const methodClass = (m) =>
    m === "Cash"
      ? "tag tag-green"
      : m === "Card"
        ? "tag tag-blue"
        : "tag tag-amber";

  return (
    <div className="table-card">
      <h2 className="section-title">Payments Management</h2>
      <div className="crud-form">
        <input
          name="invoice_no"
          placeholder="Invoice No"
          value={form.invoice_no}
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
          type="number"
          name="amount"
          placeholder="Amount ($)"
          value={form.amount}
          onChange={handleChange}
        />
        <input
          type="date"
          name="payment_date"
          value={form.payment_date}
          onChange={handleChange}
        />
        <select name="method" value={form.method} onChange={handleChange}>
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Card">Card</option>
        </select>
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Payment"}
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
              <th>Invoice No</th>
              <th>Student ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-row">
                  No payments found
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p.invoice_no}>
                  <td>
                    <span className="id-badge">{p.invoice_no}</span>
                  </td>
                  <td>{p.student_id}</td>
                  <td className="amount-cell">
                    ${Number(p.amount).toLocaleString()}
                  </td>
                  <td>{formatDate(p.payment_date)}</td>
                  <td>
                    <span className={methodClass(p.method)}>{p.method}</span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(p)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(p.invoice_no)}
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

/* ==========================================================================
   9. ENROLLMENTS
   ========================================================================== */
const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [form, setForm] = useState({
    enrollment_id: "",
    student_id: "",
    course_id: "",
    enroll_date: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/enrollments`);
      setEnrollments(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.enrollment_id.trim()) return alert("Enrollment ID is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/enrollments/${editId}`
        : `${API_BASE_URL}/enrollments`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchEnrollments();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (en) => {
    setForm({ ...en, enroll_date: formatDate(en.enroll_date) });
    setEditId(en.enrollment_id);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this enrollment?")) return;
    await fetch(`${API_BASE_URL}/enrollments/${id}`, { method: "DELETE" });
    fetchEnrollments();
    if (editId === id) cancel();
  };

  const cancel = () => {
    setEditId(null);
    setForm({
      enrollment_id: "",
      student_id: "",
      course_id: "",
      enroll_date: "",
    });
  };

  return (
    <div className="table-card">
      <h2 className="section-title">Enrollments Management</h2>
      <div className="crud-form">
        <input
          name="enrollment_id"
          placeholder="Enrollment ID"
          value={form.enrollment_id}
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
          name="course_id"
          placeholder="Course ID"
          value={form.course_id}
          onChange={handleChange}
        />
        <input
          type="date"
          name="enroll_date"
          value={form.enroll_date}
          onChange={handleChange}
        />
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Enrollment"}
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
              <th>Enroll ID</th>
              <th>Student ID</th>
              <th>Course ID</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  No enrollments found
                </td>
              </tr>
            ) : (
              enrollments.map((en) => (
                <tr key={en.enrollment_id}>
                  <td>
                    <span className="id-badge">{en.enrollment_id}</span>
                  </td>
                  <td>{en.student_id}</td>
                  <td>{en.course_id}</td>
                  <td>{formatDate(en.enroll_date)}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(en)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(en.enrollment_id)}
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

/* ==========================================================================
   10. SECTIONS
   ========================================================================== */
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

/* ==========================================================================
   11. MAIN ROUTER
   ========================================================================== */
export default function SchoolSystem() {
  const [active, setActive] = useState("students");

  const renderPage = () => {
    switch (active) {
      case "students":
        return <Students />;
      case "teachers":
        return <Teachers />;
      case "courses":
        return <Courses />;
      case "departments":
        return <Departments />;
      case "rooms":
        return <Rooms />;
      case "academicyears":
        return <AcademicYears />;
      case "guardians":
        return <Guardians />;
      case "payments":
        return <Payments />;
      case "enrollments":
        return <Enrollments />;
      case "sections":
        return <Sections />;
      default:
        return <Students />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar active={active} setActive={setActive} />
      <main className="main-content">{renderPage()}</main>
    </div>
  );
}
