const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM Students"
  );

  res.json(rows);
});

router.post("/", async (req, res) => {
  const {
    student_id,
    first_name,
    last_name,
    email,
    phone,
    enrollment_date,
    status,
  } = req.body;

  await db.query(
    `INSERT INTO Students
     VALUES (?,?,?,?,?,?,?)`,
    [
      student_id,
      first_name,
      last_name,
      email,
      phone,
      enrollment_date,
      status,
    ]
  );

  res.json({
    message: "Student added",
  });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  await db.query(
    `UPDATE Students
     SET first_name=?,
         last_name=?,
         email=?,
         phone=?,
         enrollment_date=?,
         status=?
     WHERE student_id=?`,
    [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.phone,
      req.body.enrollment_date,
      req.body.status,
      id,
    ]
  );

  res.json({
    message: "Student updated",
  });
});

router.delete("/:id", async (req, res) => {
  await db.query(
    "DELETE FROM Students WHERE student_id=?",
    [req.params.id]
  );

  res.json({
    message: "Student deleted",
  });
});

module.exports = router;