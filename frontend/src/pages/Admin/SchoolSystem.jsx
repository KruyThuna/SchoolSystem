import { useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import TbUsers from "./tb/tbUsers";
import TbStudents from "./tb/tbStudents";
import TbTeachers from "./tb/tbTeachers";
import TbCourses from "./tb/tbCourses";
import TbDepartments from "./tb/tbDepartments";
import TbClass from "./tb/tbClass";
import TbAcademicYears from "./tb/tbAcademicYears";
import TbGuardians from "./tb/tbGuardians";
import TbPayments from "./tb/tbPayments";
import TbEnrollments from "./tb/tbEnrollments";
import TbSections from "./tb/tbSections";

import "../../styles/Dashboard.css";

const pageMap = {
  users: TbUsers,
  students: TbStudents,
  teachers: TbTeachers,
  courses: TbCourses,
  departments: TbDepartments,
  rooms: TbClass,
  "academic-years": TbAcademicYears,
  guardians: TbGuardians,
  payments: TbPayments,
  enrollments: TbEnrollments,
  sections: TbSections,
};

/* =========================
   MAIN COMPONENT
   ========================= */
export default function SchoolSystem() {
  const [active, setActive] = useState("users");
  // const [active, setActive] = useState("students");

  const ActivePage = pageMap[active] || TbStudents;

  return (
    <div className="dashboard-container">
      <Sidebar active={active} setActive={setActive} />

      <main className="main-content">
        <ActivePage />
      </main>
    </div>
  );
}
