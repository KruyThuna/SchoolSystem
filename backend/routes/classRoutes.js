const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ================= GET ALL CLASSES =================
router.get("/", (req, res) => {
  db.query("SELECT * FROM Class", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

// ================= ADD CLASS =================
router.post("/", (req, res) => {
  const { class_id, class_number, building } = req.body;

  db.query(
    "INSERT INTO Class(class_id, class_number, building) VALUES(?, ?, ?)",
    [class_id, class_number, building],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Class added successfully" });
    }
  );
});

// ================= UPDATE CLASS =================
router.put("/:id", (req, res) => {
  const { class_number, building } = req.body;

  db.query(
    "UPDATE Class SET class_number=?, building=? WHERE class_id=?",
    [class_number, building, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Class not found" });
      }

      res.json({ message: "Class updated successfully" });
    }
  );
});

// ================= DELETE CLASS =================
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM Class WHERE class_id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Class not found" });
      }

      res.json({ message: "Class deleted successfully" });
    }
  );
});

module.exports = router;