import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./Authentication/Login";

import SchoolSystem from "./pages/Admin/SchoolSystem";
import TeacherDash from "./pages/Admin/teacherdash";
import StudentDash from "./pages/Admin/studentdash";

import "./styles/Dashboard.css";

// Protected Route
function ProtectedRoute({ children, allowedRole }) {
  const role = sessionStorage.getItem("academy_role");

  return role === allowedRole ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}

export default function App() {
  return (
    <Router>
      <Routes>

        {/* LOGIN (NO LAYOUT) */}
        <Route path="/login" element={<Login />} />

        {/* ALL DASHBOARDS INSIDE LAYOUT */}
        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />

          <Route
            path="admin/schoolsystem"
            element={
              <ProtectedRoute allowedRole="admin">
                <SchoolSystem />
              </ProtectedRoute>
            }
          />

          <Route
            path="admin/teacherdash"
            element={
              <ProtectedRoute allowedRole="teacher">
                <TeacherDash />
              </ProtectedRoute>
            }
          />

          <Route
            path="admin/studentdash"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentDash />
              </ProtectedRoute>
            }
          />

        </Route>

      </Routes>
    </Router>
  );
}