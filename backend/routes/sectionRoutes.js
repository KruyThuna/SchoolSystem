const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ================= GET ALL SECTIONS =================
router.get("/", (req, res) => {
  db.query("SELECT * FROM Sections", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

// ================= CREATE SECTION =================
router.post("/", (req, res) => {
  const { section_id, section_name, course_id, class_id } = req.body;

  const sql = `
    INSERT INTO Sections (section_id, section_name, course_id, class_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [section_id, section_name, course_id, class_id], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    res.json({ message: "Section added successfully" });
  });
});

// ================= UPDATE SECTION =================
router.put("/:id", (req, res) => {
  const { section_name, course_id, class_id } = req.body;

  const sql = `
    UPDATE Sections
    SET section_name=?, course_id=?, class_id=?
    WHERE section_id=?
  `;

  db.query(sql, [section_name, course_id, class_id, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json({ message: "Section updated successfully" });
  });
});

// ================= DELETE SECTION =================
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM Sections WHERE section_id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Section not found" });
      }

      res.json({ message: "Section deleted successfully" });
    }
  );
});

module.exports = router;