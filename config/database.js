const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_db",
});
module.exports = connection;
connection.connect();
//connection.end();
// connection.query("SELECT 1 + 1 AS solution", function (err, rows, fields) {
//   if (err) throw err;

//   console.log("The solution is: ", rows[0].solution);
// });
//console.log("connected");
