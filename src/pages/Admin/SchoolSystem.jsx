import { useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";

/* =========================
   1. STUDENTS COMPONENT
========================= */
const Students = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    student_id: "", first_name: "", last_name: "", email: "", phone: "", enrollment_date: "", status: "Active",
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    if (!form.student_id.trim()) return alert("ID required");
    if (editId) {
      setStudents(students.map(s => s.student_id === editId ? form : s));
      setEditId(null);
    } else {
      if (students.some(s => s.student_id === form.student_id)) return alert("Student ID already exists!");
      setStudents([...students, form]);
    }
    cancel();
  };

  const edit = (s) => { setForm({ ...s }); setEditId(s.student_id); };

  const remove = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter(s => s.student_id !== id));
      if (editId === id) cancel();
    }
  };

  const cancel = () => {
    setEditId(null);
    setForm({ student_id: "", first_name: "", last_name: "", email: "", phone: "", enrollment_date: "", status: "Active" });
  };

  return (
    <div className="table-card">
      <h2>Students Management</h2>
      <div className="crud-form">
        <input name="student_id" placeholder="ID" value={form.student_id} onChange={handleChange} disabled={editId !== null} />
        <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} />
        <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input type="date" name="enrollment_date" value={form.enrollment_date} onChange={handleChange} />
        <button onClick={save}>{editId ? "Update" : "Add"}</button>
        {editId && <button onClick={cancel} style={{ backgroundColor: "gray", color: "white", marginLeft: "5px" }}>Cancel</button>}
      </div>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Date</th><th>Action</th></tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr><td colSpan="6" style={{ textAlign: "center" }}>No students found</td></tr>
          ) : (
            students.map(s => (
              <tr key={s.student_id}>
                <td>{s.student_id}</td><td>{s.first_name} {s.last_name}</td><td>{s.email}</td><td>{s.phone}</td><td>{s.enrollment_date}</td>
                <td>
                  <button onClick={() => edit(s)}>Edit</button>
                  <button onClick={() => remove(s.student_id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

/* =========================
   2. TEACHERS COMPONENT
========================= */
const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ teacher_id: "", first_name: "", last_name: "", email: "", phone: "", hire_date: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    if (!form.teacher_id.trim()) return alert("ID required");
    if (editId) {
      setTeachers(teachers.map(t => t.teacher_id === editId ? form : t));
      setEditId(null);
    } else {
      if (teachers.some(t => t.teacher_id === form.teacher_id)) return alert("Teacher ID already exists!");
      setTeachers([...teachers, form]);
    }
    cancel();
  };

  const edit = (t) => { setForm({ ...t }); setEditId(t.teacher_id); };

  const remove = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter(t => t.teacher_id !== id));
      if (editId === id) cancel();
    }
  };

  const cancel = () => {
    setEditId(null);
    setForm({ teacher_id: "", first_name: "", last_name: "", email: "", phone: "", hire_date: "" });
  };

  return (
    <div className="table-card">
      <h2>Teachers Management</h2>
      <div className="crud-form">
        <input name="teacher_id" placeholder="ID" onChange={handleChange} value={form.teacher_id} disabled={editId !== null} />
        <input name="first_name" placeholder="First Name" onChange={handleChange} value={form.first_name} />
        <input name="last_name" placeholder="Last Name" onChange={handleChange} value={form.last_name} />
        <input name="email" placeholder="Email" onChange={handleChange} value={form.email} />
        <input name="phone" placeholder="Phone" onChange={handleChange} value={form.phone} />
        <input type="date" name="hire_date" onChange={handleChange} value={form.hire_date} />
        <button onClick={save}>{editId ? "Update" : "Add"}</button>
        {editId && <button onClick={cancel} style={{ backgroundColor: "gray", color: "white", marginLeft: "5px" }}>Cancel</button>}
      </div>
      <table>
        <thead>
          <tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone</th><th>Action</th></tr>
        </thead>
        <tbody>
          {teachers.length === 0 ? (
            <tr><td colSpan="6" style={{ textAlign: "center" }}>No teachers found</td></tr>
          ) : (
            teachers.map(t => (
              <tr key={t.teacher_id}>
                <td>{t.teacher_id}</td><td>{t.first_name}</td><td>{t.last_name}</td><td>{t.email}</td><td>{t.phone}</td>
                <td>
                  <button onClick={() => edit(t)}>Edit</button>
                  <button onClick={() => remove(t.teacher_id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

/* =========================
   3. COURSES COMPONENT
========================= */
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ course_id: "", course_name: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    if (!form.course_id.trim()) return alert("ID required");
    if (editId) {
      setCourses(courses.map(c => c.course_id === editId ? form : c));
      setEditId(null);
    } else {
      if (courses.some(c => c.course_id === form.course_id)) return alert("Course ID already exists!");
      setCourses([...courses, form]);
    }
    cancel();
  };

  const edit = (c) => { setForm({ ...c }); setEditId(c.course_id); };

  const remove = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(c => c.course_id !== id));
      if (editId === id) cancel();
    }
  };

  const cancel = () => { setEditId(null); setForm({ course_id: "", course_name: "" }); };

  return (
    <div className="table-card">
      <h2>Courses Management</h2>
      <div className="crud-form">
        <input name="course_id" placeholder="Course ID" onChange={handleChange} value={form.course_id} disabled={editId !== null} />
        <input name="course_name" placeholder="Course Name" onChange={handleChange} value={form.course_name} />
        <button onClick={save}>{editId ? "Update" : "Add"}</button>
        {editId && <button onClick={cancel} style={{ backgroundColor: "gray", color: "white", marginLeft: "5px" }}>Cancel</button>}
      </div>
      <table>
        <thead><tr><th>ID</th><th>Course Name</th><th>Action</th></tr></thead>
        <tbody>
          {courses.length === 0 ? (
            <tr><td colSpan="3" style={{ textAlign: "center" }}>No courses found</td></tr>
          ) : (
            courses.map(c => (
              <tr key={c.course_id}>
                <td>{c.course_id}</td><td>{c.course_name}</td>
                <td>
                  <button onClick={() => edit(c)}>Edit</button>
                  <button onClick={() => remove(c.course_id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

/* =========================
   4. DEPARTMENTS COMPONENT
========================= */
const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ department_id: "", department_name: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    if (!form.department_id.trim()) return alert("ID required");
    if (editId) {
      setDepartments(departments.map(d => d.department_id === editId ? form : d));
      setEditId(null);
    } else {
      if (departments.some(d => d.department_id === form.department_id)) return alert("ID already exists!");
      setDepartments([...departments, form]);
    }
    cancel();
  };

  const edit = (d) => { setForm({ ...d }); setEditId(d.department_id); };
  
  const remove = (id) => {
    if (window.confirm("Delete this department?")) {
      setDepartments(departments.filter(d => d.department_id !== id));
      if (editId === id) cancel();
    }
  };

  const cancel = () => { setEditId(null); setForm({ department_id: "", department_name: "" }); };

  return (
    <div className="table-card">
      <h2>Departments Management</h2>
      <div className="crud-form">
        <input name="department_id" placeholder="Dept ID" onChange={handleChange} value={form.department_id} disabled={editId !== null} />
        <input name="department_name" placeholder="Department Name" onChange={handleChange} value={form.department_name} />
        <button onClick={save}>{editId ? "Update" : "Add"}</button>
        {editId && <button onClick={cancel} style={{ backgroundColor: "gray", color: "white", marginLeft: "5px" }}>Cancel</button>}
      </div>
      <table>
        <thead><tr><th>ID</th><th>Department Name</th><th>Action</th></tr></thead>
        <tbody>
          {departments.length === 0 ? (
            <tr><td colSpan="3" style={{ textAlign: "center" }}>No departments found</td></tr>
          ) : (
            departments.map(d => (
              <tr key={d.department_id}>
                <td>{d.department_id}</td><td>{d.department_name}</td>
                <td>
                  <button onClick={() => edit(d)}>Edit</button>
                  <button onClick={() => remove(d.department_id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

/* =========================
   5. ROOMS COMPONENT
========================= */
const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ room_id: "", room_number: "", building: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    if (!form.room_id.trim()) return alert("ID required");
    if (editId) {
      setRooms(rooms.map(r => r.room_id === editId ? form : r));
      setEditId(null);
    } else {
      if (rooms.some(r => r.room_id === form.room_id)) return alert("Room ID already exists!");
      setRooms([...rooms, form]);
    }
    cancel();
  };

  const edit = (r) => { setForm({ ...r }); setEditId(r.room_id); };

  const remove = (id) => {
    if (window.confirm("Delete this room?")) {
      setRooms(rooms.filter(r => r.room_id !== id));
      if (editId === id) cancel();
    }
  };

  const cancel = () => { setEditId(null); setForm({ room_id: "", room_number: "", building: "" }); };

  return (
    <div className="table-card">
      <h2>Rooms Management</h2>
      <div className="crud-form">
        <input name="room_id" placeholder="Room ID" onChange={handleChange} value={form.room_id} disabled={editId !== null} />
        <input name="room_number" placeholder="Room Number" onChange={handleChange} value={form.room_number} />
        <input name="building" placeholder="Building" onChange={handleChange} value={form.building} />
        <button onClick={save}>{editId ? "Update" : "Add"}</button>
        {editId && <button onClick={cancel} style={{ backgroundColor: "gray", color: "white", marginLeft: "5px" }}>Cancel</button>}
      </div>
      <table>
        <thead><tr><th>ID</th><th>Room Number</th><th>Building</th><th>Action</th></tr></thead>
        <tbody>
          {rooms.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: "center" }}>No rooms found</td></tr>
          ) : (
            rooms.map(r => (
              <tr key={r.room_id}>
                <td>{r.room_id}</td><td>{r.room_number}</td><td>{r.building}</td>
                <td>
                  <button onClick={() => edit(r)}>Edit</button>
                  <button onClick={() => remove(r.room_id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

/* =========================
   6. ACADEMIC YEARS COMPONENT
========================= */
const AcademicYears = () => {
  const [years, setYears] = useState([]);
  const [form, setForm] = useState({ year_id: "", name: "", start_date: "", end_date: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    if (!form.year_id.trim()) return alert("ID required");
    if (editId) {
      setYears(years.map(y => y.year_id === editId ? form : y));
      setEditId(null);
    } else {
      if (years.some(y => y.year_id === form.year_id)) return alert("ID exists!");
      setYears([...years, form]);
    }
    cancel();
  };

  const edit = (y) => { setForm({ ...y }); setEditId(y.year_id); };

  const remove = (id) => {
    if (window.confirm("Delete this academic year?")) {
      setYears(years.filter(y => y.year_id !== id));
      if (editId === id) cancel();
    }
  };

  const cancel = () => { setEditId(null); setForm({ year_id: "", name: "", start_date: "", end_date: "" }); };

  return (
    <div className="table-card">
      <h2>Academic Years</h2>
      <div className="crud-form">
        <input name="year_id" placeholder="ID" onChange={handleChange} value={form.year_id} disabled={editId !== null} />
        <input name="name" placeholder="Year Name (e.g., 2025-2026)" onChange={handleChange} value={form.name} />
        <input type="date" name="start_date" onChange={handleChange} value={form.start_date} />
        <input type="date" name="end_date" onChange={handleChange} value={form.end_date} />
        <button onClick={save}>{editId ? "Update" : "Add"}</button>
        {editId && <button onClick={cancel} style={{ backgroundColor: "gray", color: "white", marginLeft: "5px" }}>Cancel</button>}
      </div>
      <table>
        <thead><tr><th>ID</th><th>Year Name</th><th>Start</th><th>End</th><th>Action</th></tr></thead>
        <tbody>
          {years.length === 0 ? (
            <tr><td colSpan="5" style={{ textAlign: "center" }}>No academic years found</td></tr>
          ) : (
            years.map(y => (
              <tr key={y.year_id}>
                <td>{y.year_id}</td><td>{y.name}</td><td>{y.start_date}</td><td>{y.end_date}</td>
                <td>
                  <button onClick={() => edit(y)}>Edit</button>
                  <button onClick={() => remove(y.year_id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

/* =========================
   7. GUARDIANS COMPONENT
========================= */
const Guardians = () => {
  const [guardians, setGuardians] = useState([]);
  const [form, setForm] = useState({ guardian_id: "", name: "", phone: "", relationship: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    if (!form.guardian_id.trim()) return alert("ID required");
    if (editId) {
      setGuardians(guardians.map(g => g.guardian_id === editId ? form : g));
      setEditId(null);
    } else {
      if (guardians.some(g => g.guardian_id === form.guardian_id)) return alert("ID already exists!");
      setGuardians([...guardians, form]);
    }
    cancel();
  };

  const edit = (g) => { setForm({ ...g }); setEditId(g.guardian_id); };

  const remove = (id) => {
    if (window.confirm("Delete this guardian?")) {
      setGuardians(guardians.filter(g => g.guardian_id !== id));
      if (editId === id) cancel();
    }
  };

  const cancel = () => { setEditId(null); setForm({ guardian_id: "", name: "", phone: "", relationship: "" }); };

  return (
    <div className="table-card">
      <h2>Guardians Management</h2>
      <div className="crud-form">
        <input name="guardian_id" placeholder="ID" onChange={handleChange} value={form.guardian_id} disabled={editId !== null} />
        <input name="name" placeholder="Full Name" onChange={handleChange} value={form.name} />
        <input name="phone" placeholder="Phone" onChange={handleChange} value={form.phone} />
        <input name="relationship" placeholder="Relationship (Father/Mother)" onChange={handleChange} value={form.relationship} />
        <button onClick={save}>{editId ? "Update" : "Add"}</button>
        {editId && <button onClick={cancel} style={{ backgroundColor: "gray", color: "white", marginLeft: "5px" }}>Cancel</button>}
      </div>
      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Phone</th><th>Relationship</th><th>Action</th></tr></thead>
        <tbody>
          {guardians.length === 0 ? (
            <tr><td colSpan="5" style={{ textAlign: "center" }}>No guardians found</td></tr>
          ) : (
            guardians.map(g => (
              <tr key={g.guardian_id}>
                <td>{g.guardian_id}</td><td>{g.name}</td><td>{g.phone}</td><td>{g.relationship}</td>
                <td>
                  <button onClick={() => edit(g)}>Edit</button>
                  <button onClick={() => remove(g.guardian_id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

/* =========================
   8. PAYMENTS COMPONENT
========================= */
const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ invoice_no: "", student_id: "", amount: "", payment_date: "", method: "Cash" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    if (!form.invoice_no.trim()) return alert("Invoice No required");
    if (editId) {
      setPayments(payments.map(p => p.invoice_no === editId ? form : p));
      setEditId(null);
    } else {
      if (payments.some(p => p.invoice_no === form.invoice_no)) return alert("Invoice No already exists!");
      setPayments([...payments, form]);
    }
    cancel();
  };

  const edit = (p) => { setForm({ ...p }); setEditId(p.invoice_no); };

  const remove = (id) => {
    if (window.confirm("Delete this payment?")) {
      setPayments(payments.filter(p => p.invoice_no !== id));
      if (editId === id) cancel();
    }
  };

  const cancel = () => { setEditId(null); setForm({ invoice_no: "", student_id: "", amount: "", payment_date: "", method: "Cash" }); };

  return (
    <div className="table-card">
      <h2>Payments Management</h2>
      <div className="crud-form">
        <input name="invoice_no" placeholder="Invoice No" onChange={handleChange} value={form.invoice_no} disabled={editId !== null} />
        <input name="student_id" placeholder="Student ID" onChange={handleChange} value={form.student_id} />
        <input type="number" name="amount" placeholder="Amount ($)" onChange={handleChange} value={form.amount} />
        <input type="date" name="payment_date" onChange={handleChange} value={form.payment_date} />
        <select name="method" onChange={handleChange} value={form.method}>
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Card">Card</option>
        </select>
        <button onClick={save}>{editId ? "Update" : "Add"}</button>
        {editId && <button onClick={cancel} style={{ backgroundColor: "gray", color: "white", marginLeft: "5px" }}>Cancel</button>}
      </div>
      <table>
        <thead><tr><th>Invoice No</th><th>StudentID</th><th>Amount</th><th>Date</th><th>Method</th><th>Action</th></tr></thead>
        <tbody>
          {payments.length === 0 ? (
            <tr><td colSpan="6" style={{ textAlign: "center" }}>No payments found</td></tr>
          ) : (
            payments.map(p => (
              <tr key={p.invoice_no}>
                <td>{p.invoice_no}</td><td>{p.student_id}</td><td>${p.amount}</td><td>{p.payment_date}</td><td>{p.method}</td>
                <td>
                  <button onClick={() => edit(p)}>Edit</button>
                  <button onClick={() => remove(p.invoice_no)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

/* =========================
   9. ENROLLMENTS COMPONENT
========================= */
const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [form, setForm] = useState({ enrollment_id: "", student_id: "", course_id: "", enroll_date: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    if (!form.enrollment_id.trim()) return alert("Enrollment ID required");
    if (editId) {
      setEnrollments(enrollments.map(e => e.enrollment_id === editId ? form : e));
      setEditId(null);
    } else {
      if (enrollments.some(e => e.enrollment_id === form.enrollment_id)) return alert("Enrollment ID already exists!");
      setEnrollments([...enrollments, form]);
    }
    cancel();
  };

  const edit = (e) => { setForm({ ...e }); setEditId(e.enrollment_id); };

  const remove = (id) => {
    if (window.confirm("Delete this enrollment?")) {
      setEnrollments(enrollments.filter(e => e.enrollment_id !== id));
      if (editId === id) cancel();
    }
  };

  const cancel = () => { setEditId(null); setForm({ enrollment_id: "", student_id: "", course_id: "", enroll_date: "" }); };

  return (
    <div className="table-card">
      <h2>Enrollments Management</h2>
      <div className="crud-form">
        <input name="enrollment_id" placeholder="Enroll ID" onChange={handleChange} value={form.enrollment_id} disabled={editId !== null} />
        <input name="student_id" placeholder="Student ID" onChange={handleChange} value={form.student_id} />
        <input name="course_id" placeholder="Course ID" onChange={handleChange} value={form.course_id} />
        <input type="date" name="enroll_date" onChange={handleChange} value={form.enroll_date} />
        <button onClick={save}>{editId ? "Update" : "Add"}</button>
        {editId && <button onClick={cancel} style={{ backgroundColor: "gray", color: "white", marginLeft: "5px" }}>Cancel</button>}
      </div>
      <table>
        <thead><tr><th>Enroll ID</th><th>Student ID</th><th>Course ID</th><th>Date</th><th>Action</th></tr></thead>
        <tbody>
          {enrollments.length === 0 ? (
            <tr><td colSpan="5" style={{ textAlign: "center" }}>No enrollments found</td></tr>
          ) : (
            enrollments.map(e => (
              <tr key={e.enrollment_id}>
                <td>{e.enrollment_id}</td><td>{e.student_id}</td><td>{e.course_id}</td><td>{e.enroll_date}</td>
                <td>
                  <button onClick={() => edit(e)}>Edit</button>
                  <button onClick={() => remove(e.enrollment_id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

/* =========================
   10. SECTIONS COMPONENT
========================= */
const Sections = () => {
  const [sections, setSections] = useState([]);
  const [form, setForm] = useState({ section_id: "", section_name: "", course_id: "", room_id: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    if (!form.section_id.trim()) return alert("Section ID required");
    if (editId) {
      setSections(sections.map(s => s.section_id === editId ? form : s));
      setEditId(null);
    } else {
      if (sections.some(s => s.section_id === form.section_id)) return alert("Section ID already exists!");
      setSections([...sections, form]);
    }
    cancel();
  };

  const edit = (s) => { setForm({ ...s }); setEditId(s.section_id); };

  const remove = (id) => {
    if (window.confirm("Delete this section?")) {
      setSections(sections.filter(s => s.section_id !== id));
      if (editId === id) cancel();
    }
  };

  const cancel = () => { setEditId(null); setForm({ section_id: "", section_name: "", course_id: "", room_id: "" }); };

  return (
    <div className="table-card">
      <h2>Sections Management</h2>
      <div className="crud-form">
        <input name="section_id" placeholder="Section ID" onChange={handleChange} value={form.section_id} disabled={editId !== null} />
        <input name="section_name" placeholder="Section Name (e.g., Class A)" onChange={handleChange} value={form.section_name} />
        <input name="course_id" placeholder="Course ID" onChange={handleChange} value={form.course_id} />
        <input name="room_id" placeholder="Room ID" onChange={handleChange} value={form.room_id} />
        <button onClick={save}>{editId ? "Update" : "Add"}</button>
        {editId && <button onClick={cancel} style={{ backgroundColor: "gray", color: "white", marginLeft: "5px" }}>Cancel</button>}
      </div>
      <table>
        <thead><tr><th>Section ID</th><th>Name</th><th>Course ID</th><th>Room ID</th><th>Action</th></tr></thead>
        <tbody>
          {sections.length === 0 ? (
            <tr><td colSpan="5" style={{ textAlign: "center" }}>No sections found</td></tr>
          ) : (
            sections.map(s => (
              <tr key={s.section_id}>
                <td>{s.section_id}</td><td>{s.section_name}</td><td>{s.course_id}</td><td>{s.room_id}</td>
                <td>
                  <button onClick={() => edit(s)}>Edit</button>
                  <button onClick={() => remove(s.section_id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

/* =========================
   11. MAIN DASHBOARD
========================= */
export default function SchoolSystem() {
  const [active, setActive] = useState("students");

  const renderPage = () => {
    switch (active) {
      case "students": return <Students />;
      case "teachers": return <Teachers />;
      case "courses": return <Courses />;
      case "departments": return <Departments />;
      case "rooms": return <Rooms />;
      case "academic-years": return <AcademicYears />;
      case "guardians": return <Guardians />;
      case "payments": return <Payments />;
      case "enrollments": return <Enrollments />;
      case "sections": return <Sections />;
      default: return <Students />;
    }
  };

  return (
    <div className="dashboard-app">
      <Sidebar active={active} setActive={setActive} />
      <div className="main-content">
        <main>{renderPage()}</main>
      </div>
    </div>
  );
}