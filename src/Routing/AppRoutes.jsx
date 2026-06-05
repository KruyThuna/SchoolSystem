import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Auth from "../pages/Auth/Login";

// Admin
import SchoolSystem from "../pages/Admin/SchoolSystem";

// Student
import StudentDashboard from "../pages/Students/StudentDashboard";

// Teacher
import TeacherHome from "../pages/Teachers/TeacherDashboard";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Auth />} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* ================= ADMIN ================= */}
        <Route path="/admin" element={<SchoolSystem />} />

        {/* ================= STUDENT ================= */}
        <Route path="/student" element={<StudentDashboard />} />

        {/* ================= TEACHER ================= */}
        <Route path="/teacher" element={<TeacherHome />} />

      </Routes>
    </Router>
  );
}