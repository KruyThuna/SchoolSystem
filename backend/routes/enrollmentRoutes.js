const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ================= GET ALL ENROLLMENTS =================
router.get("/", (req, res) => {
  db.query("SELECT * FROM Enrollments", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

// ================= CREATE ENROLLMENT =================
router.post("/", (req, res) => {
  const { enrollment_id, student_id, course_id, enroll_date } = req.body;

  const sql = `
    INSERT INTO Enrollments (enrollment_id, student_id, course_id, enroll_date)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [enrollment_id, student_id, course_id, enroll_date], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    res.json({ message: "Enrollment added successfully" });
  });
});

// ================= UPDATE ENROLLMENT =================
router.put("/:id", (req, res) => {
  const { student_id, course_id, enroll_date } = req.body;

  const sql = `
    UPDATE Enrollments
    SET student_id=?, course_id=?, enroll_date=?
    WHERE enrollment_id=?
  `;

  db.query(sql, [student_id, course_id, enroll_date, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.json({ message: "Enrollment updated successfully" });
  });
});

// ================= DELETE ENROLLMENT =================
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM Enrollments WHERE enrollment_id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Enrollment not found" });
      }

      res.json({ message: "Enrollment deleted successfully" });
    }
  );
});

module.exports = router;