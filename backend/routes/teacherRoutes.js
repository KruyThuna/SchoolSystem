const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET
router.get("/", (req, res) => {
  db.query("SELECT * FROM Teachers", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

// INSERT
router.post("/", (req, res) => {
  const {
    teacher_id,
    first_name,
    last_name,
    email,
    phone,
    hire_date,
    department_id,
  } = req.body;

  db.query(
    `INSERT INTO Teachers
    (teacher_id,first_name,last_name,email,phone,hire_date,department_id)
    VALUES (?,?,?,?,?,?,?)`,
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

// UPDATE
router.put("/:id", (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    hire_date,
    department_id,
  } = req.body;

  db.query(
    `UPDATE Teachers SET
    first_name=?,last_name=?,email=?,phone=?,hire_date=?,department_id=?
    WHERE teacher_id=?`,
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

// DELETE
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM Teachers WHERE teacher_id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Teacher deleted successfully" });
    }
  );
});

module.exports = router;