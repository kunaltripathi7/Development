// 2 ways -> creating connection / creating pool (consists of connections used to execute a query and then restored in pool)
// execute -> new+ eff -> used for parameterized queries

const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost", // computer where server is running
  user: "root",
  password: "12345678",
  database: "node-complete",
});

module.exports = pool.promise();
