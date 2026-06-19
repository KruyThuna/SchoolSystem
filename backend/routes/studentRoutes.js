const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ================= GET ALL STUDENTS =================
router.get("/", (req, res) => {
  db.query("SELECT * FROM Students", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

// ================= CREATE STUDENT =================
router.post("/", (req, res) => {
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

// ================= UPDATE STUDENT =================
router.put("/:id", (req, res) => {
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

// ================= DELETE STUDENT =================
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM Students WHERE student_id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Student deleted successfully" });
    }
  );
});

module.exports = router;