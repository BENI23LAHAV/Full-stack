import React, { useState, useEffect, useRef } from "react";
import Fetch, { FetchPost } from "./Components/fetch";
import Post from "./Components/Post";
import NewPost from "./Components/NewPost";

let prevLen = 0;

const Posts = () => {
  // const url = "https://jsonplaceholder.typicode.com/posts?userId=1";
  const url = "http://localhost:4000/2/posts";

  const [posts, setPosts] = useState([]);
  const [miniPosts, setMiniPosts] = useState([]);
  const [clickedPost, setClickedPost] = useState(-1);
  const [newPost, setNewPost] = useState(false);
  let search = useRef(0);
  let titlePost = useRef("");
  let bodyPost = useRef("");
  useEffect(() => {
    Fetch(url, setPosts);
  }, []);
  useEffect(() => {
    setMiniPosts(posts);
  }, [posts]);

  return (
    <>
      <h1>Posts</h1>
      <input
        onChange={() => {
          if (search.current.value.length < prevLen) {
            setMiniPosts(() => [...posts]);
          }
          prevLen = search.current.value.length;
          searchMe(setMiniPosts, search.current.value);
        }}
        type="text"
        placeholder="input search value / id"
        ref={search}
      />
      <button
        onClick={() => {
          // setEditodo(false);
          setNewPost(!newPost);
        }}>
        Creat New Post
      </button>
      {/* {newPost && (
        <NewPost setPosts={setPosts} length={posts.length + 1} posts={posts} />
      )} */}

      {newPost && (
        <>
          <input ref={titlePost} type="text" placeholder="Enter a title" />
          <input ref={bodyPost} type="text" placeholder="Enter a body" />
          <button
            onClick={() => {
              setNewPost((prev) => !prev);
              FetchPost(url, {
                title: titlePost.current.value,
                body: bodyPost.current.value,
              });
              window.location.reload();
            }}>
            Submit
          </button>
        </>
      )}
      {miniPosts?.map((post) => (
        <Post
          title={post.title}
          body={post.body}
          key={post.id}
          id={post.id}
          setPosts={setPosts}
        />
      ))}
    </>
  );
};

export default Posts;

function searchMe(setMiniPosts, value) {
  setMiniPosts((prev) =>
    [...prev]?.filter(
      (item) => item.title?.includes(value) || `${item.id}`.includes(value)
    )
  );
}
