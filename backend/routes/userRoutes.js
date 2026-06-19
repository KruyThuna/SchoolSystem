const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* ======================================================
   GET USERS (SERVER-SIDE PAGINATION + SEARCH)
====================================================== */
router.get("/", (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 5;
  let search = req.query.search || "";

  let offset = (page - 1) * limit;

  const searchQuery = `
    WHERE fullName LIKE ? OR email LIKE ? OR role LIKE ?
  `;

  const searchValue = `%${search}%`;

  const countSql = `
    SELECT COUNT(*) AS total FROM Users
    ${search ? searchQuery : ""}
  `;

  const dataSql = `
    SELECT user_id, fullName, email, phone, role, status, avatar, created_at
    FROM Users
    ${search ? searchQuery : ""}
    ORDER BY user_id DESC
    LIMIT ? OFFSET ?
  `;

  db.query(
    countSql,
    search ? [searchValue, searchValue, searchValue] : [],
    (err, countResult) => {
      if (err) return res.status(500).json({ error: err.message });

      const total = countResult[0].total;

      db.query(
        dataSql,
        search
          ? [searchValue, searchValue, searchValue, limit, offset]
          : [limit, offset],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });

          res.json({
            data: result,
            pagination: {
              total,
              page,
              limit,
              totalPages: Math.ceil(total / limit),
            },
          });
        }
      );
    }
  );
});

/* ======================================================
   GET USER BY ID
====================================================== */
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM Users WHERE user_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(result[0]);
    }
  );
});

/* ======================================================
   CREATE USER
====================================================== */
router.post("/", (req, res) => {
  const { fullName, email, phone, role, status, avatar, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  db.query(
    `INSERT INTO Users (fullName, email, phone, role, status, avatar, password)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      fullName,
      email,
      phone || "",
      role || "student",
      status || "active",
      avatar || "",
      password,
    ],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "User created successfully" });
    }
  );
});

/* ======================================================
   UPDATE USER
====================================================== */
router.put("/:id", (req, res) => {
  const { fullName, email, phone, role, status, avatar } = req.body;

  db.query(
    `UPDATE Users 
     SET fullName=?, email=?, phone=?, role=?, status=?, avatar=?
     WHERE user_id=?`,
    [fullName, email, phone, role, status, avatar, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User updated successfully" });
    }
  );
});

/* ======================================================
   DELETE USER
====================================================== */
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM Users WHERE user_id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User deleted successfully" });
    }
  );
});

module.exports = router;