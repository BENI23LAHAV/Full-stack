import React, { useRef } from "react";

let temp = null;
const NewPost = (props) => {
  const setPosts = props.setPosts;
  const id = props.length;
  const posts = props.posts;

  let title = useRef("");
  let body = useRef("");

  return (
    <>
      <h2>New Post</h2>
      <input ref={title} type="text" placeholder="Enter a title" />
      <input ref={body} type="text" placeholder="Enter a body" />
      <button
        onClick={() => {
          temp = {
            title: title.current.value,
            body: body.current.value,
            id: id,
          };

          console.log("im temp: ", temp);

          console.log(title.current.value);

          setPosts((prev) => [...prev, temp]);
        }}>
        Submit
      </button>
    </>
  );
};

export default NewPost;
