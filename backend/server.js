// =====================
// IMPORTS (ONLY ONCE)
// =====================
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const jwt = require("jsonwebtoken");

// =====================
// APP INIT
// =====================
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET;

// =====================
// MIDDLEWARE
// =====================
app.use(cors());
app.use(express.json());

// =====================
// TEST ROUTE
// =====================
app.get("/", (req, res) => {
  res.send("🚀 School System API Running...");
});


// ======================================================
// AUTH - REGISTER
// ======================================================
app.post("/api/register", (req, res) => {
  const { fullName, email, role, password } = req.body;

  const sql =
    "INSERT INTO Users (fullName, email, role, password) VALUES (?, ?, ?, ?)";

  db.query(sql, [fullName, email, role, password], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    res.json({ message: "Register success" });
  });
});


// ======================================================
// AUTH - LOGIN
// ======================================================
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM Users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid login" });
    }

    const user = result[0];

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
// STUDENTS CRUD
// ======================================================
app.get("/api/students", (req, res) => {
  db.query("SELECT * FROM Students", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

app.post("/api/students", (req, res) => {
  const {
    student_id,
    first_name,
    last_name,
    email,
    phone,
    enrollment_date,
    status,
  } = req.body;

  const sql = `
    INSERT INTO Students
    (student_id, first_name, last_name, email, phone, enrollment_date, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      student_id,
      first_name,
      last_name,
      email,
      phone,
      enrollment_date,
      status,
    ],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      res.json({ message: "Student added successfully" });
    }
  );
});

app.put("/api/students/:id", (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    enrollment_date,
    status,
  } = req.body;

  const sql = `
    UPDATE Students SET
    first_name=?, last_name=?, email=?, phone=?, enrollment_date=?, status=?
    WHERE student_id=?
  `;

  db.query(
    sql,
    [
      first_name,
      last_name,
      email,
      phone,
      enrollment_date,
      status,
      req.params.id,
    ],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      res.json({ message: "Student updated successfully" });
    }
  );
});

app.delete("/api/students/:id", (req, res) => {
  db.query(
    "DELETE FROM Students WHERE student_id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      res.json({ message: "Student deleted successfully" });
    }
  );
});


// ======================================================
// TEACHERS CRUD
// ======================================================
app.get("/api/teachers", (req, res) => {
  db.query("SELECT * FROM Teachers", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

app.post("/api/teachers", (req, res) => {
  const {
    teacher_id,
    first_name,
    last_name,
    email,
    phone,
    hire_date,
    department_id,
  } = req.body;

  const sql = `
    INSERT INTO Teachers
    (teacher_id, first_name, last_name, email, phone, hire_date, department_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      teacher_id,
      first_name,
      last_name,
      email,
      phone,
      hire_date,
      department_id,
    ],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      res.json({ message: "Teacher added successfully" });
    }
  );
});

app.put("/api/teachers/:id", (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    hire_date,
    department_id,
  } = req.body;

  const sql = `
    UPDATE Teachers SET
    first_name=?, last_name=?, email=?, phone=?, hire_date=?, department_id=?
    WHERE teacher_id=?
  `;

  db.query(
    sql,
    [
      first_name,
      last_name,
      email,
      phone,
      hire_date,
      department_id,
      req.params.id,
    ],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      res.json({ message: "Teacher updated successfully" });
    }
  );
});

app.delete("/api/teachers/:id", (req, res) => {
  db.query(
    "DELETE FROM Teachers WHERE teacher_id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      res.json({ message: "Teacher deleted successfully" });
    }
  );
});


// ======================================================
// COURSES
// ======================================================
app.get("/api/courses", (req, res) => {
  db.query("SELECT * FROM Courses", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});


// ======================================================
// DEPARTMENTS
// ======================================================
app.get("/api/departments", (req, res) => {
  db.query("SELECT * FROM Departments", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});


// ======================================================
// START SERVER
// ======================================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});