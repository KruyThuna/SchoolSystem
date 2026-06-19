const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ================= GET ALL PAYMENTS =================
router.get("/", (req, res) => {
  db.query("SELECT * FROM Payments", (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(result);
  });
});

// ================= CREATE PAYMENT =================
router.post("/", (req, res) => {
  const { invoice_no, student_id, amount, payment_date, method } = req.body;

  const sql = `
    INSERT INTO Payments (invoice_no, student_id, amount, payment_date, method)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [invoice_no, student_id, amount, payment_date, method],
    (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      res.json({ message: "Payment added successfully" });
    }
  );
});

// ================= UPDATE PAYMENT =================
router.put("/:id", (req, res) => {
  const { student_id, amount, payment_date, method } = req.body;

  const sql = `
    UPDATE Payments
    SET student_id=?, amount=?, payment_date=?, method=?
    WHERE invoice_no=?
  `;

  db.query(sql, [student_id, amount, payment_date, method, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json({ message: "Payment updated successfully" });
  });
});

// ================= DELETE PAYMENT =================
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM Payments WHERE invoice_no=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Payment not found" });
      }

      res.json({ message: "Payment deleted successfully" });
    }
  );
});

module.exports = router;