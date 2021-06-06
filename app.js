var mysql = require("mysql");
var express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dilsad123",
  database: "world",
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/insert", (req, res) => {
  const roll = req.body.roll;
  const name = req.body.name;
  const email = req.body.email;
  let sql =
    "insert into customer.person values(" +
    roll +
    ",'" +
    name +
    "','" +
    email +
    "')";
  connection.query(sql, function (err, result) {
    if (err) throw err;

    console.log("1 row inserted");
    res.send("<h1>Inserted Sucefully...</h1>");
  });
});
app.post("/del", (req, res) => {
  const roll = req.body.roll;
  let sql = "DELETE FROM customer.person WHERE ID = '" + roll + "'";
  connection.query(sql, function (err, result) {
    if (err) throw err;

    console.log("1 row deleted");
    res.send("<h1>Deleted Sucefully...</h1>");
  });
});

app.get("/getDetails", (req, res) => {
  let sql = "SELECT * FROM customer.person order by ID";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { result: result });
    }
  });
});


app.listen("3000", () => {
  console.log("server running on port 3000...");
});

