import { useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";

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

/* =========================
   PAGE MAP (CLEAN + SCALABLE)
   ========================= */
const pageMap = {
  students: <TbStudents />,
  teachers: <TbTeachers />,
  courses: <TbCourses />,
  departments: <TbDepartments />,
  rooms: <TbClass />,
  "academic-years": <TbAcademicYears />,
  guardians: <TbGuardians />,
  payments: <TbPayments />,
  enrollments: <TbEnrollments />,
  sections: <TbSections />
};

/* =========================
   MAIN COMPONENT
   ========================= */
export default function SchoolSystem() {
  const [active, setActive] = useState("students");

  return (
    <div className="dashboard-container">

      {/* Sidebar Navigation */}
      <Sidebar active={active} setActive={setActive} />

      {/* Main Content Area */}
      <main className="main-content">
        {pageMap[active] || <TbStudents />}
      </main>

    </div>
  );
}
