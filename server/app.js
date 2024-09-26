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

/*----------------create the conection to the DB and kipp it open ----------- */
connection.connect((err) => {
  if (err) {
    console.error(28, "Error connecting to the database:", err);
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

/*------------------- home page ------------------- */
app.get("/", (req, res) => {
  res.send("Hello, World!");
  console.log(59, "hi");
});

/*-------------- testing zone ------------------ */
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

// app.get("/:id/posts", (req, res) => {

//   connection.query("SELECT id, title, body FROM posts WHERE user_id=?;", [req.params.id], (err, results) => {
//   if (err) {
//     console.error(103, "Error fetching data:", err);
//     res.status(500).send("Error fetching data from the database");
//   }
//   else if(!results[0]) {
//     console.error(108, "Error fetching data:");
//     res.status(500).send("no database found.");
//   }
//   else{
//     res.send(results);
//   }
// });
//
// });

/*----------------------get the user info ---------------*/
app.get("/:id", (req, res) => {
  let id = req.params.id;
  connection.query(
    `SELECT  u.name, u.user_name, u.email, u.phone, a.street, a.suite, a.city
                    FROM users u
                    join address a on u.id = a.id
                    WHERE a.id=?;`,
    [id],
    (err, results) => {
      if (err) {
        console.error(131, "Error fetching data: no user", err);
        res.status(500).send("Error fetching data from the database");
      } else if (!results[0]) {
        console.error(135, "Error fetching data: no user");
        res.status(500).send("no database found.");
      } else {
        res.send(results[0]);
      }
    }
  );
});

/*---------------- get photos from albums id --------------------- */
app.get("/:id/photos", (req, res) => {
  let album_id = req.query["albumId"];
  console.log(req.query);
  connection.query(
    "SELECT id, title, thumbail_url FROM photos WHERE album_id=?;",
    [album_id],
    (err, results) => {
      if (err) {
        console.error(151, "Error fetching data:", err);
        res.status(500).send("Error fetching data from the database");
      } else if (!results[0]) {
        console.error(155, "Error fetching data:");
        res.status(500).send("no database found.");
      } else {
        res.send(results);
      }
    }
  );
});

/*-------------------- get comments from post id -----------------------*/
app.get("/:id/comments", (req, res) => {
  let post_id = req.query["postId"];
  console.log(req.query);
  connection.query(
    `SELECT c.post_id, u.name, u.email, c.body
                    FROM comments c
                    join users u on c.name = u.id
                    WHERE c.post_id=?;`,
    [post_id],
    (err, results) => {
      if (err) {
        console.error(176, "Error fetching data:", err);
        res.status(500).send("Error fetching data from the database");
      } else if (!results[0]) {
        console.error(180, "Error fetching data:");
        res.status(500).send("no database found.");
      } else {
        res.send(results);
      }
    }
  );
});

/*-------------------------get posts / albums / todos, from user id ------------------ */
app.get("/:id/:folder", (req, res) => {
  connection.query(
    `SELECT * FROM ${req.params.folder} WHERE user_id=?;`,
    [req.params.id],
    (err, results) => {
      if (err) {
        console.error(198, "Error fetching data:", err);
        res.status(500).send("Error fetching data from the database");
      } else {
        res.send(results);
      }
    }
  );
});

/*------------- delete todos -------------------- */
app.delete("/:id/todos/", (req, res) => {
  let delTodo = req.query["todoId"];
  connection.query(
    `DELETE FROM todos
     WHERE id=?;`,
    [delTodo],
    (err, results) => {
      if (err) {
        console.error(218, "Error fetching data:", err);
        res.status(500).send("Error fetching data from the database");
      } else {
        console.log(221, results);
        res.send("The deletion is complete.");
      }
    }
  );
});

/*------------- delete posts -------------------- */
app.delete("/:id/posts", (req, res) => {
  let delTodo = req.query["postId"];
  connection.query(
    `DELETE FROM comments
     WHERE post_id=?;`,
    [delTodo],
    (err, results) => {
      if (err) {
        console.error(239, "Error fetching data:", err);
        res.status(500).send("Error fetching data from the database");
      } else {
        console.log(242, results);
        connection.query(
          `DELETE FROM posts
           WHERE id=?;`,
          [delTodo],
          (err, results) => {
            if (err) {
              console.error(250, "Error fetching data:", err);
              res.status(500).send("Error fetching data from the database");
            } else {
              console.log(252, results);
              res.send("The deletion is complete (from posts and comments).");
            }
          }
        );
      }
    }
  );
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

/*-----------------set listener open on port 4000 ------------------ */
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
