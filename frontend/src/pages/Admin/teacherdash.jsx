import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/TeacherDashboard.css";

const API = "http://localhost:8080/api";

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [profile, setProfile] = useState({});
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchClasses();
    fetchStudents();
    fetchAttendance(); // ✅ fixed: was never called
    fetchGrades();     // ✅ fixed: was never called
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API}/teacher/profile`);
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await axios.get(`${API}/teacher/classes`);
      setClasses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API}/teacher/students`);
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ fixed: now actually fetches attendance
  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`${API}/teacher/attendance`);
      setAttendance(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ fixed: now actually fetches grades
  const fetchGrades = async () => {
    try {
      const res = await axios.get(`${API}/teacher/grades`);
      setGrades(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = [
    { key: "profile",    icon: "👤", label: "Profile" },
    { key: "classes",    icon: "🏫", label: "Classes" },
    { key: "students",   icon: "🎓", label: "Students" },
    { key: "attendance", icon: "📝", label: "Attendance" },
    { key: "grades",     icon: "📊", label: "Grades" },
  ];

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="td-container">

      {/* NAVBAR (mobile only) */}
      <nav className="td-navbar">
        <button className="td-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </button>
        <span className="td-nav-brand">👨‍🏫 Teacher Panel</span>
      </nav>

      {/* OVERLAY */}
      {sidebarOpen && <div className="td-overlay" onClick={closeSidebar} />}

      <div className="td-body">

        {/* SIDEBAR */}
        <aside className={`td-sidebar ${sidebarOpen ? "open" : ""}`}>
          <h2 className="td-sidebar-title">👨‍🏫 Teacher Panel</h2>
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`td-sidebar-btn ${activeTab === item.key ? "active" : ""}`}
              onClick={() => { setActiveTab(item.key); closeSidebar(); }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </aside>

        {/* MAIN */}
        <main className="td-main">

          {/* PROFILE */}
          {activeTab === "profile" && (
            <div className="td-card">
              <h2 className="td-card-title">👤 Teacher Profile</h2>
              <div className="td-profile">
                <div className="td-avatar">{profile.name ? profile.name[0] : "T"}</div>
                <div className="td-profile-info">
                  <div className="td-info-row"><span className="td-label">Name</span><span>{profile.name || "—"}</span></div>
                  <div className="td-info-row"><span className="td-label">Email</span><span>{profile.email || "—"}</span></div>
                  <div className="td-info-row"><span className="td-label">Subject</span><span>{profile.subject || "—"}</span></div>
                  <div className="td-info-row"><span className="td-label">Dept</span><span>{profile.department || "—"}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* CLASSES */}
          {activeTab === "classes" && (
            <div className="td-card">
              <h2 className="td-card-title">🏫 My Classes</h2>
              <div className="td-table-wrapper">
                <table className="td-table">
                  <thead>
                    <tr><th>Class ID</th><th>Name</th><th>Room</th></tr>
                  </thead>
                  <tbody>
                    {classes.length === 0 ? (
                      <tr><td colSpan="3" className="td-empty">No classes found</td></tr>
                    ) : (
                      classes.map((c, i) => (
                        <tr key={i}>
                          <td>{c.classId}</td>
                          <td>{c.className}</td>
                          <td>{c.room}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* STUDENTS */}
          {activeTab === "students" && (
            <div className="td-card">
              <h2 className="td-card-title">🎓 Students List</h2>
              <div className="td-table-wrapper">
                <table className="td-table">
                  <thead>
                    <tr><th>ID</th><th>Name</th><th>Email</th><th>Class</th></tr>
                  </thead>
                  <tbody>
                    {students.length === 0 ? (
                      <tr><td colSpan="4" className="td-empty">No students found</td></tr>
                    ) : (
                      students.map((s, i) => (
                        <tr key={i}>
                          <td>{s.studentId}</td>
                          <td>{s.name}</td>
                          <td>{s.email}</td>
                          <td>{s.className}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ATTENDANCE */}
          {activeTab === "attendance" && (
            <div className="td-card">
              <h2 className="td-card-title">📝 Attendance</h2>
              <div className="td-table-wrapper">
                <table className="td-table">
                  <thead>
                    <tr><th>Student</th><th>Date</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {attendance.length === 0 ? (
                      <tr><td colSpan="3" className="td-empty">No attendance records found</td></tr>
                    ) : (
                      attendance.map((a, i) => (
                        <tr key={i}>
                          <td>{a.studentName}</td>
                          <td>{a.date}</td>
                          <td>
                            <span className={`td-badge ${a.status === "Present" ? "badge-green" : "badge-red"}`}>
                              {a.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* GRADES */}
          {activeTab === "grades" && (
            <div className="td-card">
              <h2 className="td-card-title">📊 Grades</h2>
              <div className="td-table-wrapper">
                <table className="td-table">
                  <thead>
                    <tr><th>Student</th><th>Subject</th><th>Grade</th><th>Score</th></tr>
                  </thead>
                  <tbody>
                    {grades.length === 0 ? (
                      <tr><td colSpan="4" className="td-empty">No grades found</td></tr>
                    ) : (
                      grades.map((g, i) => (
                        <tr key={i}>
                          <td>{g.studentName}</td>
                          <td>{g.subject}</td>
                          <td>{g.grade}</td>
                          <td>{g.score}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}