const fs = require("fs");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
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
        res.send(JSON.stringify(results[0]));
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
        res
          .status(500)
          .send(JSON.stringify("Error fetching data from the database"));
      } else {
        res.send(JSON.stringify(results));
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
        res
          .status(500)
          .send(JSON.stringify("Error fetching data from the database"));
      } else {
        res.send(JSON.stringify(results));
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
        res.send(JSON.stringify(results));
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
        res
          .status(500)
          .send(JSON.stringify("Error fetching data from the database"));
      } else {
        console.log(221, results);
        res.send(JSON.stringify("The deletion is complete."));
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
        res
          .status(500)
          .send(JSON.stringify("Error fetching data from the database"));
      } else {
        console.log(232, results);
        connection.query(
          `DELETE FROM posts
           WHERE id=?;`,
          [delTodo],
          (err, results) => {
            if (err) {
              console.error(239, "Error fetching data:", err);
              res
                .status(500)
                .send(JSON.stringify("Error fetching data from the database"));
            } else {
              console.log(242, results);
              res.send(
                JSON.stringify(
                  "The deletion is complete (from posts and comments)."
                )
              );
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
        res
          .status(500)
          .send(JSON.stringify("Error fetching data from the database"));
      } else {
        console.log(264, results);
        res.send(JSON.stringify("The deletion is complete."));
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
        res
          .status(500)
          .send(JSON.stringify("Error fetching data from the database"));
      } else {
        console.log(results);
        res.send(JSON.stringify("The update is complete."));
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
        res
          .status(500)
          .send(JSON.stringify("Error fetching data from the database"));
      } else {
        console.log(results);
        res.send(JSON.stringify("The update is complete."));
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
        res
          .status(500)
          .send(JSON.stringify("Error fetching data from the database"));
      } else {
        console.log(results);
        res.send(JSON.stringify("The update is complete."));
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
        res
          .status(500)
          .send(JSON.stringify("Error fetching data from the database"));
      } else {
        console.log(results);
        res.send(JSON.stringify("The addition is complete."));
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
        res
          .status(500)
          .send(JSON.stringify("Error fetching data from the database"));
      } else {
        console.log(results);
        res.send(JSON.stringify("The addition is complete."));
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
        res
          .status(500)
          .send(JSON.stringify("Error adding comment to the database"));
      } else {
        console.log(results);
        res.send(JSON.stringify("The comment has been added successfully."));
      }
    }
  );
});
/**-------------todo: I am here !!!!!!!!!!!!! need to push the sql the data gets about the user------------- */
/*---------------------- create a new user --------------- */
app.post("/register", (req, res) => {
  let state = {
    user_id: null,
    message: "",
  };
  try {
    let { name, password } = req.body;
    let { userName, email, phone, address } = req.body;
    let { street, suite, city } = address;
    const listOfUsers = JSON.parse(
      fs.readFileSync("./users-pass.json", "utf8")
    );
    if (Object.keys(listOfUsers).includes(userName)) {
      state.message = "alredy have that username.";
      res.send(JSON.stringify(state));
    } else {
      try {
        connection.query(
          `INSERT INTO address(street, suite, city) VALUES (?, ?, ?);`,
          [street, suite, city],
          (err, result) => {
            if (err) {
              console.error(378, "Error inserting address:", err);
              state.message = "Error inserting address";
              return res.status(500).send(JSON.stringify(state));
            }
            connection.query(
              `SELECT id FROM address WHERE id=(SELECT max(id) FROM address);`,
              (err, addressResult) => {
                if (err) {
                  console.error(378, "Error inserting address:", err);
                  state.message = "Error inserting address";
                  return res.status(500).send(JSON.stringify(state));
                }
                const addressId = addressResult[0].id;
                console.log(391, addressId);
                connection.query(
                  `INSERT INTO users(name, user_name, email, phone, address_id) VALUES (?, ?, ?, ?, ?);`,
                  [name, userName, email, phone, addressId],
                  (err, userResult) => {
                    if (err) {
                      console.error(390, "Error inserting user:", err);
                      state.message = "Error inserting user";
                      return res.status(500).send(JSON.stringify(state));
                    }

                    // Both queries succeeded
                    createUser(password, userName, listOfUsers);
                    state.user_id = true;
                    state.message = "Added a new user.";
                    res.send(JSON.stringify(state));
                  }
                );
              }
            );
          }
        );
      } catch (error) {
        console.log(380, error);
      }
    }
  } catch (error) {
    console.log(384, error);
    state.message = "no data.";
    res.send(JSON.stringify(state));
  }
});

/*---------------------- verify password -------------------------- */
app.post("/login", (req, res) => {
  let state = {
    user_id: null,
    message: "",
  };
  try {
    let { userName, password } = req.body;
    const listOfUsers = JSON.parse(
      fs.readFileSync("./users-pass.json", "utf8")
    );
    if (Object.keys(listOfUsers).includes(userName)) {
      console.log(436, "hi");
      connection.query(
        `SELECT id FROM users WHERE user_name=?`,
        [userName],
        (err, results) => {
          if (err) {
            console.error(335, "Error fetching data:", err);
            state.message = "Error fetching data from the database";
            res.status(500).send(JSON.stringify(state));
          } else {
            console.log(results[0]["id"]);
            state.user_id = results[0]["id"];
            state.message = `hi ${userName}, welcom.`;
            checkPassword(password, listOfUsers[userName], res, state);
          }
        }
      );
    } else {
      state.message = "no user in that name.";
      res.send(JSON.stringify(state));
    }
  } catch (error) {
    state.message = "no data";
    res.send(JSON.stringify(state));
  }
});

/*-----------------set listener open on port 4000 ------------------ */
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
/*------------------end of the express -------------------------- */

/*------------------------ function place ----------------------- */

// Function to hash a password
async function hashPassword(normalPassword) {
  const numOfRounds = 10;
  try {
    const hash = await bcrypt.hash(normalPassword, numOfRounds);
    return hash;
  } catch (error) {
    console.error(412, "Error hashing password:", error);
  }
}

// Function to verify a password
async function verifyPassword(normalPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(normalPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error(423, "Error verifying password:", error);
  }
}

// Function to create a user with hash password
async function createUser(password, userName, listOfUsers) {
  let hash = await hashPassword(password);
  listOfUsers[userName] = hash;
  fs.writeFileSync("./users-pass.json", JSON.stringify(listOfUsers, null, 2));
}

// Function to verify a password from the post
async function checkPassword(normalPassword, hashedPassword, res, state) {
  let isMatch = await verifyPassword(normalPassword, hashedPassword);
  if (!isMatch) {
    state.user_id = null;
    state.message = "wrong password, try again.";
  }
  res.send(JSON.stringify(state));
}

/*------------ testing functions -----------------*/

async function addPassword() {
  let hash = await hashPassword("123456");
  console.log(hash);
}

// addPassword();
