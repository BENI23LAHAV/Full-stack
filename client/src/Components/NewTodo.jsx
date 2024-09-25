import React, { useRef } from "react";

const NewTodo = (props) => {
  const setTodos = props.setTodos;
  const id = props.length;

  const completed = false;
  let title = useRef("");
  return (
    <>
      <h2>NewTodo</h2>
      <input ref={title} type="text" placeholder="Enter a title" />
      <button
        onClick={() => {
          setTodos((prev) => [
            ...prev,
            { title: title.current.value, id, completed, key: id },
          ]);
          title.current.value = "";
        }}>
        Submit
      </button>
    </>
  );
};

export default NewTodo;
