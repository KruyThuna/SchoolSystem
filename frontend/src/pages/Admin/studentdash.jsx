import { useState } from "react";
import StudentTable from "./bts/tbStudents";
import EnrollmentsTable from "./bts/tbEnrollments";
import ClassesTable from "./bts/tbClasses";
import AttendanceTable from "./bts/tbAttendance";
import GradesTable from "./bts/tbGrades";
import "../../styles/StudentDashboard.css";

const StudentDash = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <StudentTable />;
      case "classes":
        return <ClassesTable />;
      case "enrollments":
        return <EnrollmentsTable />;
      case "attendance":
        return <AttendanceTable />;
      case "grades":
        return <GradesTable />;
      default:
        return <StudentTable />;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`tab-btn ${activeTab === "classes" ? "active" : ""}`}
            onClick={() => setActiveTab("classes")}
          >
            Classes
          </button>
          <button
            className={`tab-btn ${activeTab === "enrollments" ? "active" : ""}`}
            onClick={() => setActiveTab("enrollments")}
          >
            Enrollments
          </button>
          <button
            className={`tab-btn ${activeTab === "attendance" ? "active" : ""}`}
            onClick={() => setActiveTab("attendance")}
          >
            Attendance
          </button>
          <button
            className={`tab-btn ${activeTab === "grades" ? "active" : ""}`}
            onClick={() => setActiveTab("grades")}
          >
            Grades
          </button>
        </div>
      </div>

      <div className="tab-content">{renderContent()}</div>
    </div>
  );
};

export default StudentDash;