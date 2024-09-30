// import "./users-pass.json";
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require('bcrypt');
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
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
  console.log(31, "Connected to the MySQL database");
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
        console.error(133, "Error fetching data: no user", err);
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
        console.error(154, "Error fetching data:", err);
        res.status(500).send("Error fetching data from the database");
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
    // I add the c.id  and we need to check that there is no bug on it...
    `SELECT c.id, c.post_id, u.name, u.email, c.body
                    FROM comments c
                    join users u on c.name = u.id
                    WHERE c.post_id=?;`,
    [post_id],
    (err, results) => {
      if (err) {
        console.error(176, "Error fetching data:", err);
        res.status(500).send("Error fetching data from the database");
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
        console.error(192, "Error fetching data:", err);
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
        console.error(210, "Error fetching data:", err);
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
        console.log(232, results);
        connection.query(
          `DELETE FROM posts
           WHERE id=?;`,
          [delTodo],
          (err, results) => {
            if (err) {
              console.error(239, "Error fetching data:", err);
              res.status(500).send("Error fetching data from the database");
            } else {
              console.log(242, results);
              res.send("The deletion is complete (from posts and comments).");
            }
          }
        );
      }
    }
  );
});

/*------------- delete comment ------------------ */
app.delete("/:id/comments", (req, res) => {
  let delComment = req.query["commentId"];
  console.log(223, "hi");
  connection.query(
    `DELETE FROM comments
     WHERE id=?;`,
    [delComment],
    (err, results) => {
      if (err) {
        console.error(261, "Error fetching data:", err);
        res.status(500).send("Error fetching data from the database");
      } else {
        console.log(264, results);
        res.send("The deletion is complete.");
      }
    }
  );
});

/*------------- update todos -------------------- */
app.put("/:id/todos", (req, res) => {
  let { id, title, completed } = req.body;
  connection.query(
    `UPDATE todos SET title=?, completed=? WHERE id=?`,
    [title, completed, id],
    (err, results) => {
      if (err) {
        console.error(260, "Error fetching data:", err);
        res.status(500).send("Error fetching data from the database");
      } else {
        console.log(results);
        res.send("The update is complete.");
      }
    }
  );
});

/*------------- update posts -------------------- */
app.put("/:id/posts", (req, res) => {
  let { id, title, body } = req.body;
  connection.query(
    `UPDATE posts SET title=?, body=? WHERE id=?`,
    [title, body, id],
    (err, results) => {
      if (err) {
        console.error(278, "Error fetching data:", err);
        res.status(500).send("Error fetching data from the database");
      } else {
        console.log(results);
        res.send("The update is complete.");
      }
    }
  );
});

/*-------------- update comments ------------ */
app.put("/:id/comments", (req, res) => {
  let { id, post_id, body } = req.body;
  let user_id = req.params.id;
  connection.query(
    `UPDATE comments SET post_id=?, name=?, email=?, body=? WHERE id=?`,
    [post_id, user_id, user_id, body, id],
    (err, results) => {
      if (err) {
        console.error(297, "Error fetching data:", err);
        res.status(500).send("Error fetching data from the database");
      } else {
        console.log(results);
        res.send("The update is complete.");
      }
    }
  );
});

/*------------- add todos -------------------- */
app.post("/:id/todos", (req, res) => {
  let { title, completed } = req.body;
  let user_id = req.params.id;
  connection.query(
    `INSERT INTO todos (user_id, title, completed) VALUES (?, ?, ?);`,
    [user_id, title, completed],
    (err, results) => {
      if (err) {
        console.error(316, "Error fetching data:", err);
        res.status(500).send("Error fetching data from the database");
      } else {
        console.log(results);
        res.send("The addition is complete.");
      }
    }
  );
});

/*------------- add posts -------------------- */
app.post("/:id/posts", (req, res) => {
  let { title, body } = req.body;
  let user_id = req.params.id;
  connection.query(
    `INSERT INTO posts (user_id, title, body) VALUES (?, ?, ?);`,
    [user_id, title, body],
    (err, results) => {
      if (err) {
        console.error(335, "Error fetching data:", err);
        res.status(500).send("Error fetching data from the database");
      } else {
        console.log(results);
        res.send("The addition is complete.");
      }
    }
  );
});

/*------------- add comments ------------------ */
app.post("/:id/comments", (req, res) => {
  let { post_id, body } = req.body;
  let user_id = req.params.id;
  connection.query(
    `INSERT INTO comments (post_id, name, email, body)
     VALUES (?, ?, ?, ?);`,
    [post_id, user_id, user_id, body],
    (err, results) => {
      if (err) {
        console.error(355, "Error adding comment:", err);
        res.status(500).send("Error adding comment to the database");
      } else {
        console.log(results);
        res.send("The comment has been added successfully.");
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




// Function to hash a password
async function hashPassword(normalPassword) {
  const numOfRounds = 10;
  try {
    const hash = await bcrypt.hash(normalPassword, numOfRounds);
    console.log(409,'Hashed password:', hash);
    return hash;
  } catch (error) {
    console.error(412, 'Error hashing password:', error);
  }
}

// Function to verify a password
async function verifyPassword(normalPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(normalPassword, hashedPassword);
    console.log(420, 'Password match:', isMatch);
    return isMatch;
  } catch (error) {
    console.error(423, 'Error verifying password:', error);
  }
}


/* Example usage
async function example() {
  const password = 'mySecurePassword123';
  
  // Hash the password
  const hashedPassword = await hashPassword(password);
  
  // Verify the password (should return true)
  await verifyPassword(password, hashedPassword);
  
  // Verify with wrong password (should return false)
  await verifyPassword('wrongPassword', hashedPassword);
}

example();      */

