import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/StudentDashboard.css";

const API = "http://localhost:8080/api";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [profile, setProfile] = useState({});
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchClasses();
    fetchCourses();
    fetchAttendance();
    fetchGrades();
    fetchEnrollments();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API}/student/profile`);
      setProfile(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchClasses = async () => {
    try {
      const res = await axios.get(`${API}/student/classes`);
      setClasses(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API}/student/courses`);
      setCourses(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`${API}/student/attendance`);
      setAttendance(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchGrades = async () => {
    try {
      const res = await axios.get(`${API}/student/grades`);
      setGrades(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchEnrollments = async () => {
    try {
      const res = await axios.get(`${API}/student/enrollments`);
      setEnrollments(res.data);
    } catch (err) { console.error(err); }
  };

  const navItems = [
    { key: "profile",     icon: "👤", label: "Profile" },
    { key: "classes",     icon: "🏫", label: "Classes" },
    { key: "courses",     icon: "📚", label: "Courses" },
    { key: "enrollments", icon: "📋", label: "Enrollments" },
    { key: "attendance",  icon: "📝", label: "Attendance" },
    { key: "grades",      icon: "📊", label: "Grades" },
  ];

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="sd-container">

      {/* NAVBAR (mobile) */}
      <nav className="sd-navbar">
        <button className="sd-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
        <span className="sd-nav-brand">🎓 Student Panel</span>
      </nav>

      {/* OVERLAY */}
      {sidebarOpen && <div className="sd-overlay" onClick={closeSidebar} />}

      <div className="sd-body">

        {/* SIDEBAR */}
        <aside className={`sd-sidebar ${sidebarOpen ? "open" : ""}`}>
          <h2 className="sd-sidebar-title">🎓 Student Panel</h2>
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`sd-sidebar-btn ${activeTab === item.key ? "active" : ""}`}
              onClick={() => { setActiveTab(item.key); closeSidebar(); }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </aside>

        {/* MAIN */}
        <main className="sd-main">

          {/* PROFILE */}
          {activeTab === "profile" && (
            <div className="sd-card">
              <h2 className="sd-card-title">👤 Student Profile</h2>
              <div className="sd-profile">
                <div className="sd-avatar">
                  {profile.name ? profile.name[0].toUpperCase() : "S"}
                </div>
                <div className="sd-profile-info">
                  <div className="sd-info-row"><span className="sd-label">Name</span><span>{profile.name || "—"}</span></div>
                  <div className="sd-info-row"><span className="sd-label">Email</span><span>{profile.email || "—"}</span></div>
                  <div className="sd-info-row"><span className="sd-label">Student ID</span><span>{profile.studentId || "—"}</span></div>
                  <div className="sd-info-row"><span className="sd-label">Department</span><span>{profile.department || "—"}</span></div>
                  <div className="sd-info-row"><span className="sd-label">Enrolled</span><span>{profile.enrollmentDate || "—"}</span></div>
                  <div className="sd-info-row">
                    <span className="sd-label">Status</span>
                    <span className={`sd-badge ${profile.status === "Active" ? "badge-green" : "badge-red"}`}>
                      {profile.status || "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CLASSES */}
          {activeTab === "classes" && (
            <div className="sd-card">
              <h2 className="sd-card-title">🏫 My Classes</h2>
              <div className="sd-table-wrapper">
                <table className="sd-table">
                  <thead>
                    <tr><th>Class ID</th><th>Class Name</th><th>Room</th><th>Teacher</th></tr>
                  </thead>
                  <tbody>
                    {classes.length === 0 ? (
                      <tr><td colSpan="4" className="sd-empty">No classes found</td></tr>
                    ) : (
                      classes.map((c, i) => (
                        <tr key={i}>
                          <td>{c.classId}</td>
                          <td>{c.className}</td>
                          <td>{c.room}</td>
                          <td>{c.teacherName}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* COURSES */}
          {activeTab === "courses" && (
            <div className="sd-card">
              <h2 className="sd-card-title">📚 My Courses</h2>
              <div className="sd-table-wrapper">
                <table className="sd-table">
                  <thead>
                    <tr><th>Course ID</th><th>Course Name</th><th>Credits</th><th>Teacher</th></tr>
                  </thead>
                  <tbody>
                    {courses.length === 0 ? (
                      <tr><td colSpan="4" className="sd-empty">No courses found</td></tr>
                    ) : (
                      courses.map((c, i) => (
                        <tr key={i}>
                          <td>{c.courseId}</td>
                          <td>{c.courseName}</td>
                          <td>{c.credits}</td>
                          <td>{c.teacherName}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ENROLLMENTS */}
          {activeTab === "enrollments" && (
            <div className="sd-card">
              <h2 className="sd-card-title">📋 My Enrollments</h2>
              <div className="sd-table-wrapper">
                <table className="sd-table">
                  <thead>
                    <tr><th>Enrollment ID</th><th>Course</th><th>Date</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {enrollments.length === 0 ? (
                      <tr><td colSpan="4" className="sd-empty">No enrollments found</td></tr>
                    ) : (
                      enrollments.map((e, i) => (
                        <tr key={i}>
                          <td>{e.enrollmentId}</td>
                          <td>{e.courseName}</td>
                          <td>{e.date}</td>
                          <td>
                            <span className={`sd-badge ${e.status === "Active" ? "badge-green" : "badge-yellow"}`}>
                              {e.status}
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

          {/* ATTENDANCE */}
          {activeTab === "attendance" && (
            <div className="sd-card">
              <h2 className="sd-card-title">📝 My Attendance</h2>
              <div className="sd-table-wrapper">
                <table className="sd-table">
                  <thead>
                    <tr><th>Date</th><th>Course</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {attendance.length === 0 ? (
                      <tr><td colSpan="3" className="sd-empty">No attendance records found</td></tr>
                    ) : (
                      attendance.map((a, i) => (
                        <tr key={i}>
                          <td>{a.date}</td>
                          <td>{a.courseName}</td>
                          <td>
                            <span className={`sd-badge ${a.status === "Present" ? "badge-green" : "badge-red"}`}>
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
            <div className="sd-card">
              <h2 className="sd-card-title">📊 My Grades</h2>
              <div className="sd-table-wrapper">
                <table className="sd-table">
                  <thead>
                    <tr><th>Course</th><th>Midterm</th><th>Final</th><th>Grade</th><th>Score</th></tr>
                  </thead>
                  <tbody>
                    {grades.length === 0 ? (
                      <tr><td colSpan="5" className="sd-empty">No grades found</td></tr>
                    ) : (
                      grades.map((g, i) => (
                        <tr key={i}>
                          <td>{g.courseName}</td>
                          <td>{g.midterm}</td>
                          <td>{g.final}</td>
                          <td>
                            <span className={`sd-badge ${
                              g.grade === "A" ? "badge-green" :
                              g.grade === "B" ? "badge-blue" :
                              g.grade === "C" ? "badge-yellow" : "badge-red"
                            }`}>{g.grade}</span>
                          </td>
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