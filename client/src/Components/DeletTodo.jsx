import React, { useRef } from "react";

const DeletTodo = (props) => {
  let id = useRef(-1);

  const setTodos = props.setTodos;
  const length = props.length;
  return (
    <>
      <div>DeletTodo</div>
      <input
        ref={id}
        type="number"
        placeholder="Choose your todo"
        min={1}
        max={length}
      />

      <button
        onClick={() => {
          let posDel = -1;
          posDel = Number(id.current.value);
          console.log(typeof posDel);

          if (posDel !== -1) {
            setTodos((prev) => [...prev].filter((todo) => todo.id !== posDel));
            console.log("deleted", posDel);
          }
        }}>
        Delet
      </button>
    </>
  );
};

export default DeletTodo;
