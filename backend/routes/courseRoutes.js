const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ================= GET ALL COURSES =================
router.get("/", (req, res) => {
  db.query("SELECT * FROM Courses", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

// ================= ADD COURSE =================
router.post("/", (req, res) => {
  const { course_id, course_name, department_id } = req.body;

  db.query(
    "INSERT INTO Courses(course_id, course_name, department_id) VALUES(?,?,?)",
    [course_id, course_name, department_id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Course added successfully" });
    }
  );
});

// ================= UPDATE COURSE =================
router.put("/:id", (req, res) => {
  const { course_name, department_id } = req.body;

  db.query(
    "UPDATE Courses SET course_name=?, department_id=? WHERE course_id=?",
    [course_name, department_id, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Course not found" });
      }

      res.json({ message: "Course updated successfully" });
    }
  );
});

// ================= DELETE COURSE =================
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM Courses WHERE course_id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Course not found" });
      }

      res.json({ message: "Course deleted successfully" });
    }
  );
});

module.exports = router;