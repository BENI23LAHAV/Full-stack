import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import Fetch from "./fetch";
import Album from "./Album";
import { AlbumId } from "../App";

// saving the prev length of the search bar.
let prevLen = 0;

const Albums = (props) => {
  // the main state.
  const [albums, setAlbums] = useState([]);
  //  to set the albumId when clicked on it.
  const [albumId, setAlbumId] = useContext(AlbumId);
  // const url = "https://jsonplaceholder.typicode.com/albums?userId=1";
  const url = "http://localhost:4000/2/albums";

  useEffect(() => {
    Fetch(url, setAlbums);
  }, []);
  const [miniAlbums, setMiniAlbums] = useState([]);
  useEffect(() => {
    setMiniAlbums(albums);
  }, [albums]);

  let search = useRef(0);
  return (
    <div>
      <div>
        <input
          onChange={() => {
            if (search.current.value.length < prevLen) {
              setMiniAlbums(() => [...albums]);
            }
            prevLen = search.current.value.length;
            searchMe(setMiniAlbums, search.current.value);
          }}
          type="text"
          placeholder="input search value / id"
          ref={search}
        />
      </div>
      <h1>Albums:</h1>

      {miniAlbums.map((item, i) => (
        <Link
          className="link"
          to={`/photos?album:${item.id}`}
          onClick={() => setAlbumId(item.id)}
          key={i}>
          <Album album={item} key={i} />
        </Link>
      ))}
    </div>
  );
};

function searchMe(setMiniAlbums, value) {
  setMiniAlbums((prev) =>
    [...prev]?.filter(
      (item) => item.title?.includes(value) || `${item.id}`.includes(value)
    )
  );
}

export default Albums;
