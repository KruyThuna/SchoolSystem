const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ================= GET ALL ACADEMIC YEARS =================
router.get("/", (req, res) => {
  db.query("SELECT * FROM AcademicYears", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

// ================= CREATE ACADEMIC YEAR =================
router.post("/", (req, res) => {
  const { year_id, year_name, start_date, end_date } = req.body;

  const sql = `
    INSERT INTO AcademicYears (year_id, year_name, start_date, end_date)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [year_id, year_name, start_date, end_date], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    res.json({ message: "Academic Year added successfully" });
  });
});

// ================= UPDATE ACADEMIC YEAR =================
router.put("/:id", (req, res) => {
  const { year_name, start_date, end_date } = req.body;

  const sql = `
    UPDATE AcademicYears
    SET year_name=?, start_date=?, end_date=?
    WHERE year_id=?
  `;

  db.query(sql, [year_name, start_date, end_date, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Academic Year not found" });
    }

    res.json({ message: "Academic Year updated successfully" });
  });
});

// ================= DELETE ACADEMIC YEAR =================
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM AcademicYears WHERE year_id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Academic Year not found" });
      }

      res.json({ message: "Academic Year deleted successfully" });
    }
  );
});

module.exports = router;