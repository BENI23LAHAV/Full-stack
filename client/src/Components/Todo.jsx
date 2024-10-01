import React, { useState, useEffect, useRef, useContext } from "react";
import Fetch, { FetchPut } from "./fetch";
import { UserContext } from "../App";
const Todo = ({ todo, setTodoCLicked }) => {
  const [completed, setCompleted] = useState();
  const [needInput, setNeedInput] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [userID, setUserID] = useContext(UserContext);
  let value = useRef("");
  const url = `http://localhost:4000/${userID}/todos`;
  useEffect(() => setCompleted(todo.completed), [todo]);
  return (
    <div
      tabIndex={0}
      className="todo"
      onClick={() => {
        setTodoCLicked(todo.id);
        // console.log(todo.id);
      }}>
      <div>
        <button onClick={() => setNeedInput(!needInput)}>Edit</button>
        {needInput && (
          <p>
            <input type="text" ref={value} />
            <button
              onClick={() => {
                if (value.current.value) {
                  FetchPut(url, {
                    title: value.current.value,
                    id: todo.id,
                    completed: completed,
                  });
                  // setTitle(value.current.value);
                }
                setNeedInput(!needInput);
                window.location.reload();
              }}>
              Change
            </button>
          </p>
        )}
      </div>

      <h3>Todo: {todo.id}</h3>
      <input
        onChange={() =>
          setCompleted(() => {
            todo.completed = !completed;
            return !completed;
          })
        }
        type="checkbox"
        checked={completed}
      />
      <p>{title}</p>
    </div>
  );
};

export default Todo;
