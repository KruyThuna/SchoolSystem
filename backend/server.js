const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8080;

/* ======================================================
   TEST SERVER
====================================================== */
app.get("/", (req, res) => {
  res.send("🚀 School System API is running...");
});

/* ======================================================
   STUDENTS (CRUD)
====================================================== */
app.get("/api/students", (req, res) => {
  db.query(
    `SELECT student_id, first_name, last_name, email, phone,
    DATE(enrollment_date) AS enrollment_date, status
    FROM Students`,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json(result);
    }
  );
});

app.post("/api/students", (req, res) => {
  const sql = `
    INSERT INTO Students 
    (student_id, first_name, last_name, email, phone, enrollment_date, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, Object.values(req.body), (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ message: "Student added" });
  });
});

app.put("/api/students/:id", (req, res) => {
  const sql = `
    UPDATE Students SET
    first_name=?, last_name=?, email=?, phone=?, enrollment_date=?, status=?
    WHERE student_id=?
  `;

  db.query(sql, [...Object.values(req.body), req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ message: "Student updated" });
  });
});

app.delete("/api/students/:id", (req, res) => {
  db.query("DELETE FROM Students WHERE student_id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ message: "Student deleted" });
  });
});

/* ======================================================
   TEACHERS (CRUD)
====================================================== */
app.get("/api/teachers", (req, res) => {
  db.query("SELECT * FROM Teachers", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

app.post("/api/teachers", (req, res) => {
  const sql = `
    INSERT INTO Teachers 
    (teacher_id, first_name, last_name, email, phone, hire_date, department_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, Object.values(req.body), (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ message: "Teacher added" });
  });
});

app.put("/api/teachers/:id", (req, res) => {
  const sql = `
    UPDATE Teachers SET
    first_name=?, last_name=?, email=?, phone=?, hire_date=?, department_id=?
    WHERE teacher_id=?
  `;
  db.query(sql, [...Object.values(req.body), req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ message: "Teacher updated" });
  });
});

app.delete("/api/teachers/:id", (req, res) => {
  db.query("DELETE FROM Teachers WHERE teacher_id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ message: "Teacher deleted" });
  });
});

/* ======================================================
   COURSES (CRUD)
====================================================== */
app.get("/api/courses", (req, res) => {
  db.query("SELECT * FROM Courses", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

app.post("/api/courses", (req, res) => {
  const sql = `
    INSERT INTO Courses (course_id, course_name, department_id)
    VALUES (?, ?, ?)
  `;
  db.query(sql, Object.values(req.body), (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ message: "Course added" });
  });
});

app.put("/api/courses/:id", (req, res) => {
  const sql = `
    UPDATE Courses SET
    course_name=?, department_id=?
    WHERE course_id=?
  `;
  db.query(sql, [...Object.values(req.body), req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ message: "Course updated" });
  });
});

app.delete("/api/courses/:id", (req, res) => {
  db.query("DELETE FROM Courses WHERE course_id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ message: "Course deleted" });
  });
});

/* ======================================================
   DEPARTMENTS (CRUD)
====================================================== */
app.get("/api/departments", (req, res) => {
  db.query("SELECT * FROM Departments", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

app.post("/api/departments", (req, res) => {
  const sql = `
    INSERT INTO Departments (department_id, department_name)
    VALUES (?, ?)
  `;
  db.query(sql, Object.values(req.body), (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ message: "Department added" });
  });
});

app.put("/api/departments/:id", (req, res) => {
  const sql = `
    UPDATE Departments SET department_name=?
    WHERE department_id=?
  `;
  db.query(sql, [...Object.values(req.body), req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ message: "Department updated" });
  });
});

app.delete("/api/departments/:id", (req, res) => {
  db.query("DELETE FROM Departments WHERE department_id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ message: "Department deleted" });
  });
});

/* ======================================================
   CLASS (ROOMS) FULL CRUD
====================================================== */
app.get("/api/class", (req, res) => {
  db.query("SELECT * FROM Class", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

app.post("/api/class", (req, res) => {
  const sql = `
    INSERT INTO Class (class_id, class_number, building, capacity, class_type)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, Object.values(req.body), (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ message: "Class added" });
  });
});

app.put("/api/class/:id", (req, res) => {
  const sql = `
    UPDATE Class SET
    class_number=?, building=?, capacity=?, class_type=?
    WHERE class_id=?
  `;
  db.query(sql, [...Object.values(req.body), req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ message: "Class updated" });
  });
});

app.delete("/api/class/:id", (req, res) => {
  db.query("DELETE FROM Class WHERE class_id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ message: "Class deleted" });
  });
});

/* ======================================================
   SECTIONS
====================================================== */
app.get("/api/sections", (req, res) => {
  db.query("SELECT * FROM Sections", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

/* ======================================================
   ENROLLMENTS
====================================================== */
app.get("/api/enrollments", (req, res) => {
  db.query("SELECT * FROM Enrollments", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

/* ======================================================
   GUARDIANS
====================================================== */
app.get("/api/guardians", (req, res) => {
  db.query("SELECT * FROM Guardians", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

/* ======================================================
   PAYMENTS
====================================================== */
app.get("/api/payments", (req, res) => {
  db.query(
    `SELECT invoice_no, student_id, amount,
     DATE(payment_date) AS payment_date, method
     FROM Payments`,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json(result);
    }
  );
});

/* ======================================================
   JOIN (IMPORTANT)
====================================================== */
app.get("/api/join/students-courses", (req, res) => {
  const sql = `
    SELECT 
      s.student_id,
      s.first_name,
      c.course_name,
      e.enroll_date
    FROM Students s
    JOIN Enrollments e ON s.student_id = e.student_id
    JOIN Courses c ON e.course_id = c.course_id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

/* ======================================================
   LOGIN
====================================================== */
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM Users WHERE username=? AND password=?",
    [username, password],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid login" });
      }

      const user = result[0];

      res.json({
        token: "fake-token",
        role: user.role,
        username: user.username,
      });
    }
  );
});

/* ======================================================
   START SERVER
====================================================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});