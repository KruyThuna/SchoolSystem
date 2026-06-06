import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/students/dashboard"
      );

      setDashboard(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!dashboard) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container mt-4">
      <h1>
        Welcome {dashboard.studentName}
      </h1>

      <div className="row">

        <div className="col-md-3">
          <div className="card p-3">
            <h3>{dashboard.subjects}</h3>
            <p>Subjects</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h3>{dashboard.attendance}%</h3>
            <p>Attendance</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h3>{dashboard.assignments}</h3>
            <p>Assignments</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h3>{dashboard.grade}</h3>
            <p>Grade</p>
          </div>
        </div>

      </div>
    </div>
  );
}