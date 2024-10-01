import React, { useState, useRef, useEffect, useContext } from "react";
import Fetch, { FetchDelete, FetchPut, FetchPost } from "./fetch";
import { useReducer } from "react";
import { UserContext } from "../App";
const Post = (props) => {
  /**-----------Hooks for Showing posts,comments & staff----------- */

  const [clicked, setClicked] = useState(false);
  const [comentsClicked, setComentsClicked] = useState(false);
  const [specifyComment, setSpecifyComment] = useState(-1);
  const [commentsArr, setComentsArr] = useState([]);
  const [editPost, setEditPost] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [editComment, setEditComment] = useState(false);

  /**------------User context------------------- */
  const [userID, setUserID] = useContext(UserContext);
  /**------------Refs for Post------------------- */
  let titlePost = useRef("");
  let bodyPost = useRef("");
  let bodyComment = useRef("");
  /**------------Props for Post------------------- */
  const title = props.title;
  const body = props.body;
  const id = props.id;
  /**------------URLs for Fetching-------------------- */
  const commentsUrl = `http://localhost:4000/${userID}/comments?postId=${id}`;
  const postUrl = `http://localhost:4000/${userID}/posts/?postId=${id}`;
  const urlComment = `http://localhost:4000/${userID}/comments`;

  // const [some, setSome] = useState(null);
  // useEffect(() => {
  //   console.log("some: ", some);
  // }, [some]);
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
          }}>
          Show comments
        </button>

        {
          <button
            onClick={() => {
              setAddComment((prev) => !prev);
            }}>
            Add comment
          </button>
        }
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
          <input ref={titlePost} type="text" placeholder="Enter a title" />

          <input ref={bodyPost} type="text" placeholder="Enter a body" />

          <button
            onClick={() => {
              const cuteddUrl = postUrl.slice(0, postUrl.lastIndexOf("/"));

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
      {addComment && (
        <>
          <input ref={bodyComment} type="text" placeholder="Enter a coment" />
          <button
            onClick={() => {
              setAddComment((prev) => !prev);

              FetchPost(urlComment, {
                post_id: id,
                body: bodyComment.current.value,
              });

              window.location.reload();
            }}>
            Submit
          </button>
        </>
      )}

      <ul>
        {comentsClicked &&
          commentsArr.map((item, index) => {
            return (
              <>
                {" "}
                <li
                  key={index}
                  onClick={() => {
                    setSpecifyComment(() => {
                      // console.log("item.id: " + item.id);
                      return item.id;
                    });
                  }}>
                  <ul>
                    <li style={{ fontSize: "10px" }}>name: {item.name} </li>
                    <li style={{ fontSize: "10px" }}>email: {item.email} </li>
                    <li style={{ fontSize: "20px" }}>comments: {item.body} </li>
                  </ul>
                </li>
              </>
            );
          })}
        <button
          onClick={() => {
            Delete_Selected_Comment(
              urlComment,
              specifyComment,
              setSpecifyComment
            );
          }}>
          Delete selected comment
        </button>
        <button
          onClick={() => {
            setEditComment((prev) => !prev);
          }}>
          Edit selected comment
        </button>
        {editComment && (
          <>
            {" "}
            <input ref={bodyComment} type="text" placeholder="Enter a coment" />
            <button
              onClick={() => {
                FetchPut(urlComment, {
                  id: specifyComment,
                  post_id: id,
                  body: bodyComment.current.value,
                });
                setEditComment((prev) => !prev);
                setSpecifyComment(-1);
                window.location.reload();
              }}>
              Change
            </button>
          </>
        )}
      </ul>
    </div>
  );
};

export default Post;

function Delete_Selected_Comment(
  urlComment,
  specifyComment,
  setSpecifyComment
) {
  const urlDeleteComment = urlComment + `?commentId=${specifyComment}`;
  FetchDelete(urlDeleteComment);
  setSpecifyComment(-1);
  window.location.reload();
}
