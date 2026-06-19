const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// ================= REGISTER =================
router.post("/register", (req, res) => {
  const { fullName, email, role, password } = req.body;

  // Validation
  if (!fullName || !email || !password) {
    return res.status(400).json({
      message: "fullName, email, password are required",
    });
  }

  // Check duplicate email
  db.query("SELECT * FROM Users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    if (result.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql =
      "INSERT INTO Users (fullName, email, role, password) VALUES (?, ?, ?, ?)";

    db.query(
      sql,
      [fullName, email, role || "student", hashedPassword],
      (err) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });

        res.status(201).json({
          message: "Register success",
        });
      }
    );
  });
});

// ================= LOGIN =================
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      message: "email and password are required",
    });
  }

  // Find user
  db.query("SELECT * FROM Users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result[0];

    // Check password
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.user_id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      role: user.role,
      username: user.fullName,
    });
  });
});

module.exports = router;