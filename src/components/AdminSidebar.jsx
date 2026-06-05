import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaBook,
  FaBookOpen,
  FaClipboardList,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "User Management", path: "/admin/users", icon: <FaUsers /> },
    { name: "Students", path: "/admin/students", icon: <FaUserGraduate /> },
    { name: "Teachers", path: "/admin/teachers", icon: <FaChalkboardTeacher /> },
    { name: "Classes", path: "/admin/classes", icon: <FaSchool /> },
    { name: "Subjects", path: "/admin/subjects", icon: <FaBook /> },
    { name: "Courses", path: "/admin/courses", icon: <FaBookOpen /> },
    { name: "Exams", path: "/admin/exams", icon: <FaClipboardList /> },
    { name: "Attendance", path: "/admin/attendance", icon: <FaCalendarCheck /> },
    { name: "Fees", path: "/admin/fees", icon: <FaMoneyBillWave /> },
    { name: "Payroll", path: "/admin/payroll", icon: <FaMoneyCheckAlt /> },
    { name: "Reports", path: "/admin/reports", icon: <FaChartBar /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>AcademyOS</h2>
      </div>

      <ul>
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;