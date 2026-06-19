import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import "../../../styles/Dashboard.css";

import {
  FaUsers,
  FaGraduationCap,
  FaUserTie,
  FaShieldAlt,
  FaSearch,
  FaEye,
  FaPen,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
} from "react-icons/fa";

export default function TbUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 5;

  // ✅ FIXED API URL
const API_URL = "http://localhost:500/api/users";

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setUsers(res.data || []);
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE USER ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      // ✅ FIXED FIELD (user_id)
      setUsers((prev) => prev.filter((u) => u.user_id !== id));
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  /* ================= STATS ================= */
  const stats = useMemo(() => {
    return {
      total: users.length,
      students: users.filter((u) => u.role === "student").length,
      teachers: users.filter((u) => u.role === "teacher").length,
      admins: users.filter((u) => u.role === "admin").length,
    };
  }, [users]);

  /* ================= FILTER USERS ================= */
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const name = u?.fullName?.toLowerCase() || "";
      const email = u?.email?.toLowerCase() || "";
      const role = u?.role?.toLowerCase() || "";
      const status = u?.status?.toLowerCase() || "";
      const searchText = search.toLowerCase();

      const matchesSearch =
        name.includes(searchText) ||
        email.includes(searchText) ||
        role.includes(searchText);

      const matchesRole =
        selectedRole === "All Roles" || u.role === selectedRole;

      const matchesStatus =
        selectedStatus === "All Status" ||
        status === selectedStatus.toLowerCase();

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, selectedRole, selectedStatus]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / itemsPerPage)
  );

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedRole, selectedStatus]);

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">All Users</h1>
          <p className="dashboard-subtitle">
            Manage users from MySQL database
          </p>
        </div>

        <button className="btn-add">+ Add New User</button>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <FaUsers /> <div>{stats.total}</div>
          <small>Total Users</small>
        </div>

        <div className="stat-card">
          <FaGraduationCap /> <div>{stats.students}</div>
          <small>Students</small>
        </div>

        <div className="stat-card">
          <FaUserTie /> <div>{stats.teachers}</div>
          <small>Teachers</small>
        </div>

        <div className="stat-card">
          <FaShieldAlt /> <div>{stats.admins}</div>
          <small>Admins</small>
        </div>
      </div>

      {/* FILTERS */}
      <div className="main-card">
        <div className="filters">

          <div className="search-box">
            <FaSearch />
            <input
              placeholder="Search user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option>All Roles</option>
            <option>student</option>
            <option>teacher</option>
            <option>admin</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>active</option>
            <option>inactive</option>
          </select>

          <button className="btn-export">
            <FaDownload /> Export
          </button>
        </div>

        {/* TABLE */}
        <div className="table-wrapper">

          {loading ? (
            <p style={{ padding: 20 }}>Loading users...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((u, index) => (
                    <tr key={u.user_id}>

                      <td>
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>

                      <td>
                        <div className="user-info">
                          <img
                            src={u.avatar || "https://i.pravatar.cc/40"}
                            alt=""
                          />
                          <span>{u.fullName}</span>
                        </div>
                      </td>

                      <td>
                        <span className="badge">{u.role}</span>
                      </td>

                      <td>{u.email}</td>
                      <td>{u.phone}</td>

                      <td>
                        <span
                          className={`badge ${
                            u.status === "active"
                              ? "badge-green"
                              : "badge-red"
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>

                      <td>
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>

                      <td>
                        <div className="actions">
                          <FaEye />
                          <FaPen />
                          <FaTrash
                            onClick={() => handleDelete(u.user_id)}
                          />
                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* PAGINATION */}
        <div className="pagination">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <FaChevronLeft />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <FaChevronRight />
          </button>

        </div>

      </div>
    </div>
  );
}