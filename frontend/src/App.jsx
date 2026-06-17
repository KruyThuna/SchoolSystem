import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Login from "./Authentication/Login";
import Home from "./pages/Home";

import SchoolSystem from "./pages/Admin/SchoolSystem";
import StudentDash from "./pages/Admin/StudentDash";
import TeacherDash from "./pages/Admin/TeacherDash";

import Layout from "./components/Layout";

/* ===================== PROTECTED ROUTE ===================== */
function ProtectedRoute({ allowedRoles }) {
  const role = localStorage.getItem("role")?.toUpperCase();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

/* ===================== APP ===================== */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* PUBLIC */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* ADMIN */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route element={<Layout />}>
            <Route path="/admin/schoolsystem" element={<SchoolSystem />} />
            <Route path="/admin/dashboard" element={<StudentDash />} />
          </Route>
        </Route>

        {/* STUDENT */}
        <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>
          <Route element={<Layout />}>
            <Route path="/student/dashboard" element={<StudentDash />} />
          </Route>
        </Route>

        {/* TEACHER */}
        <Route element={<ProtectedRoute allowedRoles={["TEACHER"]} />}>
          <Route element={<Layout />}>
            <Route path="/teacher/dashboard" element={<TeacherDash />} />
          </Route>
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}