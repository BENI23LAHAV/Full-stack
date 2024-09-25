import React, { useState, useEffect, useRef } from "react";
const Todo = ({ todo, setTodoCLicked }) => {
  const [completed, setCompleted] = useState();
  const [needInput, setNeedInput] = useState(false);
  const [title, setTitle] = useState(todo.title);
  let value = useRef("");
  useEffect(() => setCompleted(todo.completed), [todo]);
  return (
    <div
      tabIndex={0}
      className="todo"
      onClick={() => {
        setTodoCLicked(todo.id);
      }}
    >
      <div>
        <button onClick={() => setNeedInput(!needInput)}>Edit</button>
        {needInput && (
          <p>
            <input type="text" ref={value} />
            <button
              onClick={() => {
                if (value.current.value) {
                setTitle(value.current.value);
              }
                setNeedInput(!needInput);
               
              }}
            >
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
