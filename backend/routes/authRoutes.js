const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM Users WHERE username=?",
    [username]
  );

  if (!rows.length)
    return res.status(401).json({
      message: "User not found",
    });

  const user = rows[0];

  const valid = await bcrypt.compare(
    password,
    user.password
  );

  if (!valid)
    return res.status(401).json({
      message: "Invalid password",
    });

  const token = jwt.sign(
    {
      id: user.user_id,
      role: user.role,
    },
    "SECRET_KEY",
    { expiresIn: "1d" }
  );

  res.json({
    token,
    role: user.role,
  });
});

module.exports = router;