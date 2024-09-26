import React, { useEffect, useState, useRef } from "react";
import Fetch from "./fetch";
import Todo from "./Todo";
import NewTodo from "./NewTodo";
let prevLen = 0;

const Todos = (props) => {
  const [newTodo, setNewTodo] = useState(false);
  // const [editTodo, setEditodo] = useState(false);
  const [todoClicked, setTodoCLicked] = useState(-1);
  const [todos, setTodos] = useState([]);
  // const url = "https://jsonplaceholder.typicode.com/todos?userId=1";
  const url = "http://localhost:4000/2/todos";

  useEffect(() => {
    Fetch(url, setTodos);
  }, []);
  const [miniTodos, setMiniTodos] = useState([]);
  useEffect(() => {
    setMiniTodos(todos);
  }, [todos]);
  let search = useRef(0);
  // let editText = useRef("");
  return (
    <>
      <h2>Todos</h2>
      <div className="sort">
        <button onClick={() => setMiniTodos([...todos])}>All</button>
        <button
          onClick={() => {
            setMiniTodos((prev) => {
              const sortedTodos = [...prev].sort((a, b) => a.id - b.id);
              return sortedTodos;
            });
          }}>
          1 to 2
        </button>
        <button
          onClick={() => {
            setMiniTodos((prev) => {
              const sortedTodos = [...prev].sort((a, b) =>
                a.title.localeCompare(b.title)
              );
              return sortedTodos;
            });
          }}>
          A to B
        </button>

        <button
          onClick={() => {
            setMiniTodos((prev) => {
              const sortedTodos = [...prev].filter((x) => x.completed);
              const falseTodos = [...prev].filter((x) => !x.completed);
              return [...sortedTodos, ...falseTodos];
            });
          }}>
          checked first
        </button>
        <button
          onClick={() => {
            setMiniTodos((prev) => {
              let temp = [...prev];
              let currentIndex = temp.length;
              // While there remain elements to shuffle...
              while (currentIndex !== 0) {
                // Pick a remaining element...
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [temp[currentIndex], temp[randomIndex]] = [
                  temp[randomIndex],
                  temp[currentIndex],
                ];
              }
              return temp;
            });
          }}>
          Random
        </button>
        <div>
          <input
            onChange={() => {
              if (search.current.value.length < prevLen) {
                setMiniTodos(() => [...todos]);
              }
              prevLen = search.current.value.length;
              searchMe(setMiniTodos, search.current.value);
            }}
            type="text"
            placeholder="input search value / id"
            ref={search}
          />
          <button
            onClick={() => {
              setMiniTodos(() => [...todos]);
              setMiniTodos((prev) => [...prev].filter((x) => x.completed));
            }}>
            Checked only
          </button>
          <button
            onClick={() => {
              setMiniTodos(() => [...todos]);
              setMiniTodos((prev) => [...prev].filter((x) => !x.completed));
            }}>
            Not checked only
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              // setEditodo(false);
              setNewTodo(!newTodo);
            }}>
            Creat New Todo
          </button>
        </div>
      </div>
      <div>
        {newTodo && <NewTodo setTodos={setTodos} length={todos.length + 1} />}
        <button
          onClick={() => {
            setNewTodo(false);
            // setEditodo(false);
            if (todoClicked !== -1) {
              setTodos((prev) =>
                [...prev].filter((todo) => todo.id !== todoClicked)
              );
              console.log("deleted", todoClicked);
              setTodoCLicked(-1);
            }
          }}>
          Delet
        </button>
        {/* <button
          onClick={() => {
            setNewTodo(false);
            // setEditodo((prev) => !prev);
          }}>
          {/* Edit */}
        {/* </button> */}
        {/* {editTodo && <input type="text" ref={editText} /> && (
          <button
            onClick={() => {
              toEdit(
                todoClicked,
                setTodoCLicked,
                setTodos,
                setEditodo,
                editText
              );
            }}>
            Change
          </button>
        )} */}
      </div>
      {miniTodos.map((item, i) => (
        <Todo setTodoCLicked={setTodoCLicked} todo={item} key={i} />
      ))}
    </>
  );
};

function searchMe(setMiniTodos, value) {
  setMiniTodos((prev) =>
    [...prev]?.filter(
      (item) => item.title?.includes(value) || `${item.id}`.includes(value)
    )
  );
}

export default Todos;

// function toEdit(todoClicked, setTodoCLicked, setTodos, setEditodo, editText) {
//   if (todoClicked !== -1) {
//     // return;
//     setTodos((prev) => {
//       const todoEdit = [...prev].find((item) => item.id === todoClicked);
//       todoEdit.title = editText.current.value;
//       [...prev].splice(todoClicked - 1, 1);
//       return [...prev, todoEdit];
//     });

//     setEditodo(false);
//     setTodoCLicked(-1);
//   }
// }
