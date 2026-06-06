const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "SchoolSystem",
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB Connection Failed:");
    console.log(err.message);
  } else {
    console.log("✅ MySQL Connected Successfully");
  }
});

module.exports = db;