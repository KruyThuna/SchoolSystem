const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ================= GET ALL DEPARTMENTS =================
router.get("/", (req, res) => {
  db.query("SELECT * FROM Departments", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

// ================= ADD DEPARTMENT =================
router.post("/", (req, res) => {
  const { department_id, department_name } = req.body;

  db.query(
    "INSERT INTO Departments(department_id, department_name) VALUES(?, ?)",
    [department_id, department_name],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Department added successfully" });
    }
  );
});

// ================= UPDATE DEPARTMENT =================
router.put("/:id", (req, res) => {
  const { department_name } = req.body;

  db.query(
    "UPDATE Departments SET department_name=? WHERE department_id=?",
    [department_name, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Department not found" });
      }

      res.json({ message: "Department updated successfully" });
    }
  );
});

// ================= DELETE DEPARTMENT =================
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM Departments WHERE department_id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Department not found" });
      }

      res.json({ message: "Department deleted successfully" });
    }
  );
});

module.exports = router;