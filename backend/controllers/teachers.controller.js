const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM Teachers", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.create = (req, res) => {
  db.query("INSERT INTO Teachers SET ?", req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Teacher added" });
  });
};

exports.update = (req, res) => {
  db.query("UPDATE Teachers SET ? WHERE teacher_id=?", [req.body, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Teacher updated" });
  });
};

exports.remove = (req, res) => {
  db.query("DELETE FROM Teachers WHERE teacher_id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Teacher deleted" });
  });
};