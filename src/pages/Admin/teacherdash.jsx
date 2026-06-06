import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  BookOpen,
  ClipboardList,
  GraduationCap,
} from "lucide-react";

export default function TeacherDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/teachers/dashboard"
      );

      setDashboard(response.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  if (!dashboard) {
    return (
      <div className="dashboard-loading">
        Loading Teacher Dashboard...
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>
        👨‍🏫 Welcome, {dashboard.teacherName}
      </h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <Users size={40} />
          <h2>{dashboard.students}</h2>
          <p>Total Students</p>
        </div>

        <div className="dashboard-card">
          <BookOpen size={40} />
          <h2>{dashboard.subjects}</h2>
          <p>Subjects</p>
        </div>

        <div className="dashboard-card">
          <ClipboardList size={40} />
          <h2>{dashboard.attendance}%</h2>
          <p>Attendance Rate</p>
        </div>

        <div className="dashboard-card">
          <GraduationCap size={40} />
          <h2>{dashboard.exams}</h2>
          <p>Exams</p>
        </div>
      </div>

      <div className="dashboard-table">
        <h3>Recent Classes</h3>

        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Subject</th>
              <th>Students</th>
            </tr>
          </thead>

          <tbody>
            {dashboard.classes.map((item, index) => (
              <tr key={index}>
                <td>{item.className}</td>
                <td>{item.subject}</td>
                <td>{item.students}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}