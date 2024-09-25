const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const port = 4000;
const user_id = 1;

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
  database: "easy",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});
/**-----------Function to select the database column----------- */
function selectColumn(columnName) {
  switch (columnName) {
    case "users":
      return "users";
    case "address":
      return "address";
    case "albums":
      return "albums";
    case "photos":
      return "photos";
    case "comments":
      return "comments";
    case "posts":
      return "posts";
    case "todos":
      return "todos";
    default:
      return "column not found";
  }
}

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/select/:id", (req, res) => {
  console.log(req.params.id);

  const id = req.params.id;
  if (selectColumn(id) !== "column not found") {
    connection.query(`SELECT * FROM ${id}`, (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data from the database");
      } else {
        res.json(results);
      }
    });
  } else {
    res.status(404).send("Column not found");
    console.log("Column not found");
  }
});
app.get("/select/:id/:pos", (req, res) => {
  console.log(req.params.id, req.params.pos);

  const id = req.params.id;
  const pos = req.params.pos;
  if (selectColumn(id) !== "column not found" && pos >= 0) {
    connection.query(`SELECT * FROM ${id}`, (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data from the database");
      } else if (pos >= results.length) {
        res.status(404).send("position not found");
        console.log("position not found");
      } else {
        res.json(results[pos]);
      }
    });
  } else {
    res.status(404).send("Column not found");
    console.log("Column not found");
  }
});

app.get("/:id/posts", (req, res) => {
 
  connection.query("SELECT id, title, body FROM posts WHERE user_id=?;", [req.params.id], (err, results) => {
  if (err) {
    console.error(103, "Error fetching data:", err);
    res.status(500).send("Error fetching data from the database");
  }
  else if(!results[0]) {
    console.error(108, "Error fetching data:");
    res.status(500).send("no database found.");
  }
  else{
    res.send(results);
  }
});

});

app.get("/:id/photos", (req, res) => {
  let album_id = req.query["albumId"];
  console.log(req.query);
  connection.query("SELECT * FROM photos WHERE album_id=?;", [album_id], (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data from the database");
    }
    else if(!results[0]) {
      console.error(125, "Error fetching data:");
      res.status(500).send("no database found.");
    }
   
    else{
      res.send(results);
    }
  });
});
// 
app.get("/:id/:folder", (req, res) => {
 
// const user_id = req.params.folder === "photos" ? "album_id" : "user_id"  

  connection.query(`SELECT * FROM ${req.params.folder} WHERE user_id=?;`, [req.params.id], (err, results) => {
    if (err) {
      req.query
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data from the database");
    }
    else if(!results[0]) {
      console.error(108, "Error fetching data:");
      res.status(500).send("no database found.");
    }
    else{
      res.send(results);
    }
  });
});

// app.get("/users", (req, res) => {
//   connection.query("SELECT * FROM users", (err, results) => {
//     if (err) {
//       console.error("Error fetching data:", err);
//       res.status(500).send("Error fetching data from the database");
//     } else {
//       res.json(results);
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
