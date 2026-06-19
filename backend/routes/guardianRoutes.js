const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ================= GET ALL GUARDIANS =================
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM Guardians ORDER BY guardian_id DESC",
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json(result);
    }
  );
});

// ================= GET ONE GUARDIAN (optional but recommended) =================
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM Guardians WHERE guardian_id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      if (result.length === 0) {
        return res.status(404).json({ error: "Guardian not found" });
      }

      res.json(result[0]);
    }
  );
});

// ================= CREATE GUARDIAN =================
router.post("/", (req, res) => {
  const { name, phone, relationship } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  db.query(
    "INSERT INTO Guardians (name, phone, relationship) VALUES (?,?,?)",
    [name, phone, relationship],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      res.status(201).json({ message: "Guardian added successfully" });
    }
  );
});

// ================= UPDATE GUARDIAN =================
router.put("/:id", (req, res) => {
  const { name, phone, relationship } = req.body;

  db.query(
    "UPDATE Guardians SET name=?, phone=?, relationship=? WHERE guardian_id=?",
    [name, phone, relationship, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Guardian not found" });
      }

      res.json({ message: "Guardian updated successfully" });
    }
  );
});

// ================= DELETE GUARDIAN =================
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM Guardians WHERE guardian_id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Guardian not found" });
      }

      res.json({ message: "Guardian deleted successfully" });
    }
  );
});

module.exports = router;