import React, { useState, useRef } from "react";
import Fetch, { FetchDelete, FetchPut } from "./fetch";

const Post = (props) => {
  const [clicked, setClicked] = useState(false);
  const [comentsClicked, setComentsClicked] = useState(false);
  const [comentsEdit, setComentsEdit] = useState(false);
  const [addComent, setAddComent] = useState(true);
  const [addComentButon, setAddComentButon] = useState(false);
  const title = props.title;
  const body = props.body;
  const id = props.id;
  const setPosts = props.setPosts;
  /**comments zone */
  const commentsUrl = `http://localhost:4000/2/comments?postId=${id}`;
  const postUrl = `http://localhost:4000/2/posts/?postId=${id}`;
  const [commentsArr, setComentsArr] = useState([]);

  /** end of comments */
  const [coments, setComents] = useState([]);
  const [editPost, setEditPost] = useState(false);
  let coment = useRef("");
  let titlePost = useRef("");
  let bodyPost = useRef("");
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
      }}>
      <h2>Message: {id}</h2>
      <h3 className="title">Title: {title}</h3>
      {clicked && <p>{body}</p>}
      <div className="buttons">
        <button
          // disabled={coments.length === 0}
          onClick={() => {
            Fetch(commentsUrl, setComentsArr);

            setComentsClicked((prev) => !prev);
            setAddComent((prev) => !prev);
          }}>
          Show coments
        </button>
        {addComent && (
          <button
            onClick={() => {
              setAddComentButon((prev) => !prev);
            }}>
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
            }}>
            Submit
          </button>
        )}
        {
          <button
            onClick={() => {
              FetchDelete(postUrl);
              window.location.reload();
            }}>
            🗑️ post
          </button>
        }
        {
          <button
            onClick={() => {
              setEditPost((prev) => !prev);
            }}>
            Edit post
          </button>
        }
      </div>
      {editPost && (
        <>
          <input
            ref={titlePost}
            type="text"
            placeholder="Enter a title"
            // defaultValue="Enter a title"
          />

          <input
            ref={bodyPost}
            type="text"
            placeholder="Enter a body"
            // defaultValue="Enter a body"
          />

          <button
            onClick={() => {
              const cuteddUrl = postUrl.slice(0, postUrl.lastIndexOf("/"));
              // console.log("cutedUrl: " + cutedUrl);

              FetchPut(cuteddUrl, {
                title: titlePost.current.value,
                body: bodyPost.current.value,
                id: id,
              });

              setEditPost((prev) => !prev);
              window.location.reload();
            }}>
            Change
          </button>
        </>
      )}
      {/* {editPost && (
        <button
          onClick={() => {
            FetchPut(postUrl, { title: title, body: coment.current.value });
            setEditPost((prev) => !prev);
            setClicked((prev) => !prev);
          }}>
          Submit
        </button>
      )} */}
      <ul>
        {comentsClicked &&
          commentsArr.map((item, index) => {
            return (
              <li key={index}>
                <ul>
                  <li style={{ fontSize: "10px" }}>name: {item.name} </li>
                  <li style={{ fontSize: "10px" }}>email: {item.email} </li>
                  <li style={{ fontSize: "20px" }}>comments: {item.body} </li>
                </ul>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Post;
