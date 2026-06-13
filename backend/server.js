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
// =====================
// COURSES CRUD
// =====================

app.get("/api/courses", (req, res) => {
  db.query("SELECT * FROM Courses", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

app.post("/api/courses", (req, res) => {
  const { course_id, course_name, department_id } = req.body;

  db.query(
    "INSERT INTO Courses(course_id,course_name,department_id) VALUES(?,?,?)",
    [course_id, course_name, department_id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Course added successfully" });
    }
  );
});

app.put("/api/courses/:id", (req, res) => {
  const { course_name, department_id } = req.body;

  db.query(
    "UPDATE Courses SET course_name=?, department_id=? WHERE course_id=?",
    [course_name, department_id, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Course updated successfully" });
    }
  );
});

app.delete("/api/courses/:id", (req, res) => {
  db.query(
    "DELETE FROM Courses WHERE course_id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Course deleted successfully" });
    }
  );
});


// =====================
// DEPARTMENTS CRUD
// =====================

app.get("/api/departments", (req, res) => {
  db.query("SELECT * FROM Departments", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

app.post("/api/departments", (req, res) => {
  const { department_id, department_name } = req.body;

  db.query(
    "INSERT INTO Departments(department_id,department_name) VALUES(?,?)",
    [department_id, department_name],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Department added successfully" });
    }
  );
});

app.put("/api/departments/:id", (req, res) => {
  const { department_name } = req.body;

  db.query(
    "UPDATE Departments SET department_name=? WHERE department_id=?",
    [department_name, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Department updated successfully" });
    }
  );
});

app.delete("/api/departments/:id", (req, res) => {
  db.query(
    "DELETE FROM Departments WHERE department_id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Department deleted successfully" });
    }
  );
});
// =====================
// CLASS CRUD
// =====================

app.get("/api/class", (req, res) => {
  db.query("SELECT * FROM Class", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

app.post("/api/class", (req, res) => {
  const { class_id, class_number, building } = req.body;

  db.query(
    "INSERT INTO Class(class_id,class_number,building) VALUES(?,?,?)",
    [class_id, class_number, building],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Class added successfully" });
    }
  );
});

app.put("/api/class/:id", (req, res) => {
  const { class_number, building } = req.body;

  db.query(
    "UPDATE Class SET class_number=?, building=? WHERE class_id=?",
    [class_number, building, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Class updated successfully" });
    }
  );
});

app.delete("/api/class/:id", (req, res) => {
  db.query(
    "DELETE FROM Class WHERE class_id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Class deleted successfully" });
    }
  );
});

app.get("/api/academicyears", (req, res) => {
  db.query("SELECT * FROM AcademicYears", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

app.post("/api/academicyears", (req, res) => {
  const { year_id, year_name, start_date, end_date } = req.body;

  db.query(
    "INSERT INTO AcademicYears VALUES(?,?,?,?)",
    [year_id, year_name, start_date, end_date],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Academic Year added" });
    }
  );
});

app.put("/api/academicyears/:id", (req, res) => {
  const { year_name, start_date, end_date } = req.body;

  db.query(
    "UPDATE AcademicYears SET year_name=?, start_date=?, end_date=? WHERE year_id=?",
    [year_name, start_date, end_date, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Academic Year updated" });
    }
  );
});

app.delete("/api/academicyears/:id", (req, res) => {
  db.query(
    "DELETE FROM AcademicYears WHERE year_id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Academic Year deleted" });
    }
  );
});

app.get("/api/payments", (req, res) => {
  db.query("SELECT * FROM Payments", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

app.post("/api/payments", (req, res) => {
  const { invoice_no, student_id, amount, payment_date, method } = req.body;

  db.query(
    "INSERT INTO Payments VALUES(?,?,?,?,?)",
    [invoice_no, student_id, amount, payment_date, method],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Payment added" });
    }
  );
});

app.put("/api/payments/:id", (req, res) => {
  const { student_id, amount, payment_date, method } = req.body;

  db.query(
    "UPDATE Payments SET student_id=?, amount=?, payment_date=?, method=? WHERE invoice_no=?",
    [student_id, amount, payment_date, method, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Payment updated" });
    }
  );
});

app.delete("/api/payments/:id", (req, res) => {
  db.query(
    "DELETE FROM Payments WHERE invoice_no=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Payment deleted" });
    }
  );
});

app.get("/api/enrollments", (req, res) => {
  db.query("SELECT * FROM Enrollments", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

app.post("/api/enrollments", (req, res) => {
  const { enrollment_id, student_id, course_id, enroll_date } = req.body;

  db.query(
    "INSERT INTO Enrollments VALUES(?,?,?,?)",
    [enrollment_id, student_id, course_id, enroll_date],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Enrollment added" });
    }
  );
});

app.put("/api/enrollments/:id", (req, res) => {
  const { student_id, course_id, enroll_date } = req.body;

  db.query(
    "UPDATE Enrollments SET student_id=?, course_id=?, enroll_date=? WHERE enrollment_id=?",
    [student_id, course_id, enroll_date, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Enrollment updated" });
    }
  );
});

app.delete("/api/enrollments/:id", (req, res) => {
  db.query(
    "DELETE FROM Enrollments WHERE enrollment_id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Enrollment deleted" });
    }
  );
});

app.get("/api/sections", (req, res) => {
  db.query("SELECT * FROM Sections", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

app.post("/api/sections", (req, res) => {
  const { section_id, section_name, course_id, class_id } = req.body;

  db.query(
    "INSERT INTO Sections VALUES(?,?,?,?)",
    [section_id, section_name, course_id, class_id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Section added" });
    }
  );
});

app.put("/api/sections/:id", (req, res) => {
  const { section_name, course_id, class_id } = req.body;

  db.query(
    "UPDATE Sections SET section_name=?, course_id=?, class_id=? WHERE section_id=?",
    [section_name, course_id, class_id, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Section updated" });
    }
  );
});

app.delete("/api/sections/:id", (req, res) => {
  db.query(
    "DELETE FROM Sections WHERE section_id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Section deleted" });
    }
  );
});


// GET ALL
app.get("/api/guardians", (req, res) => {
  db.query("SELECT * FROM Guardians ORDER BY guardian_id DESC", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

// INSERT
app.post("/api/guardians", (req, res) => {
  const { guardian_id, name, phone, relationship } = req.body;
  
  // Basic validation: Ensure required fields exist
  if (!guardian_id || !name) return res.status(400).json({ error: "Missing required fields" });

  db.query(
    "INSERT INTO Guardians (guardian_id, name, phone, relationship) VALUES (?,?,?,?)",
    [guardian_id, name, phone, relationship],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.status(201).json({ message: "Guardian added successfully" });
    }
  );
});

// UPDATE
app.put("/api/guardians/:id", (req, res) => {
  const { name, phone, relationship } = req.body;

  db.query(
    "UPDATE Guardians SET name=?, phone=?, relationship=? WHERE guardian_id=?",
    [name, phone, relationship, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Guardian not found" });
      res.json({ message: "Guardian updated successfully" });
    }
  );
});
// ======================================================
// START SERVER
// ======================================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});