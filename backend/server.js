// ===================== IMPORTS =====================
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ===================== APP INIT =====================
const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// ===================== MIDDLEWARE =====================
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// ===================== TEST ROUTE =====================
app.get("/", (req, res) => {
  res.send("🚀 School System API Running...");
});

// ======================================================
// AUTH - REGISTER
// ======================================================
app.post("/api/register", (req, res) => {
  const { fullName, email, role, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const sql =
    "INSERT INTO Users (fullName, email, role, password) VALUES (?, ?, ?, ?)";

  db.query(sql, [fullName, email, role || "student", password], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    res.json({ message: "Register success" });
  });
});

// ======================================================
// AUTH - LOGIN
// ======================================================
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const sql = "SELECT * FROM Users WHERE email=?";

  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid login" });
    }

    const user = result[0];

    // ⚠️ TEMP (NOT SAFE) - you should use bcrypt later
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid login" });
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      role: user.role,
      username: user.fullName,
    });
  });
});

// ======================================================
// ROUTES
// ======================================================
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/teachers", require("./routes/teacherRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/class", require("./routes/classRoutes"));
app.use("/api/academicyears", require("./routes/academicYearRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/enrollments", require("./routes/enrollmentRoutes"));
app.use("/api/sections", require("./routes/sectionRoutes"));
app.use("/api/guardians", require("./routes/guardianRoutes"));

// ======================================================
// START SERVER
// ======================================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});