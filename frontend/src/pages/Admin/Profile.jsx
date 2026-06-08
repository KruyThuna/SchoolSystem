import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/api";

export default function Profile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios.get(`${API}/student/profile`)
      .then(res => setProfile(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="card">
      <h2>👤 Student Profile</h2>

      <p><b>ID:</b> {profile.student_id}</p>
      <p><b>Name:</b> {profile.first_name} {profile.last_name}</p>
      <p><b>Email:</b> {profile.email}</p>
      <p><b>Phone:</b> {profile.phone}</p>
    </div>
  );
}