import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./Authentication/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

/* Import individual dashboard management panels */
import SchoolSystem from "./pages/Admin/SchoolSystem";
import StudentDash from "./pages/Admin/StudentDash";
import TeacherDash from "./pages/Admin/TeacherDash";

/* ==========================================================================
   PROTECTED ROUTE SECURITY GATEWAY
   ========================================================================== */
function ProtectedRoute({ allowedRoles }) {
  let role = localStorage.getItem("role");
  role = role?.toUpperCase();

  if (!role) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

/* ==========================================================================
   MAIN SYSTEM LAYOUT FRAME (Combines Navbar with Content Slots)
   ========================================================================== */
function MainLayout() {
  return (
    <div className="system-root-wrapper">
      {/* Universal navigation headers loaded smoothly across views */}
      <Navbar /> 

      {/* Dynamic Content Target Area Container */}
      <div className="view-content-canvas">
        <Outlet /> 
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC OPEN ACCESS FORTS */}
        <Route path="/login" element={<Login />} />

        {/* SHARED VISUAL FRAMEWORK ACTIVE ZONE */}
        <Route element={<MainLayout />}>
          {/* Landing page shows up instantly without logging in */}
          <Route path="/" element={<Home />} />

          {/* ================= PROTECTED ADMIN DATA TIERS ================= */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/admin/schoolsystem" element={<SchoolSystem />} />
          </Route>

          {/* ================= PROTECTED STUDENT TIERS ================= */}
          <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>
            <Route path="/admin/studentdash" element={<StudentDash />} />
          </Route>

          {/* ================= PROTECTED TEACHER TIERS ================= */}
          <Route element={<ProtectedRoute allowedRoles={["TEACHER"]} />}>
            <Route path="/admin/teacherdash" element={<TeacherDash />} />
          </Route>
        </Route>

        {/* CATCH-ALL SYSTEM FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}