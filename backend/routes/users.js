const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* ================= GET ALL USERS ================= */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

/* ================= GET USER BY ID ================= */
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json(result[0]);
  });
});

/* ================= ADD USER ================= */
router.post("/", (req, res) => {
  const { name, email, phone, role, status, avatar, date } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email required" });
  }

  const sql =
    "INSERT INTO users (name, email, phone, role, status, avatar, date) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [name, email, phone, role, status, avatar, date],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "User added successfully" });
    }
  );
});

/* ================= UPDATE USER ================= */
router.put("/:id", (req, res) => {
  const { name, email, phone, role, status, avatar, date } = req.body;

  const sql =
    "UPDATE users SET name=?, email=?, phone=?, role=?, status=?, avatar=?, date=? WHERE id=?";

  db.query(
    sql,
    [name, email, phone, role, status, avatar, date, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "User not found" });

      res.json({ message: "User updated successfully" });
    }
  );
});

/* ================= DELETE USER ================= */
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: "User deleted successfully" });
  });
});

module.exports = router;