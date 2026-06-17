import { useState } from "react";
import TeacherTable from "./tbt/tbTeachers";
import CoursesTable from "./tbt/tbCourses";
import TeacherAttendanceTable from "./tbt/tbAttendance";
import TeacherGradesTable from "./tbt/tbGrades";
import "../../styles/TeacherDashboard.css";

const TeacherDash = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <TeacherTable />;
      case "courses":
        return <CoursesTable />;
      case "attendance":
        return <TeacherAttendanceTable />;
      case "grades":
        return <TeacherGradesTable />;
      default:
        return <TeacherTable />;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Teacher Dashboard</h1>
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
            className={`tab-btn ${activeTab === "courses" ? "active" : ""}`}
            onClick={() => setActiveTab("courses")}
          >
            Courses
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

export default TeacherDash;