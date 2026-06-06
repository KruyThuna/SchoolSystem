const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM Students", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.create = (req, res) => {
  const data = req.body;
  db.query("INSERT INTO Students SET ?", data, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Student added" });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  db.query("UPDATE Students SET ? WHERE student_id=?", [req.body, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Student updated" });
  });
};

exports.remove = (req, res) => {
  db.query("DELETE FROM Students WHERE student_id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Student deleted" });
  });
};