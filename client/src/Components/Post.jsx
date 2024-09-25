import React, { useState, useRef } from "react";

const Post = (props) => {
  const [clicked, setClicked] = useState(false);
  const [comentsClicked, setComentsClicked] = useState(false);
  const [comentsEdit, setComentsEdit] = useState(false);
  const [addComent, setAddComent] = useState(true);
  const [addComentButon, setAddComentButon] = useState(false);
  const title = props.title;
  const body = props.body;
  const id = props.id;
  const [coments, setComents] = useState([]);
  let coment = useRef("");
  //   console.log("id" + id);
  //   console.log("title" + title);
  //   console.log("body" + body);

  return (
    <div
      className="post"
      onClick={(e) => {
        if (e.target.className === "title") {
          setClicked((prev) => !prev);
        }
      }}
    >
      <h2>Message: {id}</h2>
      <h3 className="title">Title: {title}</h3>
      {clicked && <p>{body}</p>}
      <div className="buttons">
        <button
          disabled={coments.length === 0}
          onClick={() => {
            setComentsClicked((prev) => !prev);
            setAddComent((prev) => !prev);
          }}
        >
          Show coments
        </button>
        {addComent && (
          <button
            onClick={() => {
              setAddComentButon((prev) => !prev);
            }}
          >
            Add coment
          </button>
        )}
        {addComentButon && (
          <input ref={coment} type="text" placeholder="Enter a coment" />
        )}
        {addComentButon && (
          <button
            onClick={() => {
              setComents((prev) => [...prev, coment.current.value]);
              // setComentsClicked((prev) => !prev);
              // setAddComent((prev) => !prev);
              setAddComentButon((prev) => !prev);
              setClicked((prev) => !prev);
            }}
          >
            Submit
          </button>
        )}
      </div>
      <ul>
        {comentsClicked &&
          coments.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
      </ul>
    </div>
  );
};

export default Post;
