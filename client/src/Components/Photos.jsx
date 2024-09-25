import { useState, useEffect, useContext } from "react";
import Photo from "./Photo";
import Fetch from "./fetch";
import { AlbumId } from "../App";
const Photos = (props) => {
  const [photos, setPhotos] = useState([]);
  const [counter, setCounter] = useState(0);
  const [albumId, setAlbumId] = useContext(AlbumId);
  const url = `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`;
  useEffect(() => {
    Fetch(url, setPhotos);
  }, []);
 
  return (
    <div>
      <h2>Photos:</h2>
      <button
        disabled={counter <= 0}
        onClick={() => setCounter((counter) => counter - chunkSize)}
      >
        Back
      </button>
      <button
        disabled={counter >= photos.length - chunkSize}
        onClick={() => setCounter((counter) => counter + chunkSize)}
      >
        Forward
      </button>
      {getChunk(photos, counter)?.map((item, i) => (
        <Photo photo={item} key={i} />
      ))}
    </div>
  );
};
const chunkSize = 3;
function getChunk(photos, counter) {
  const chunk = photos.slice(counter, counter + chunkSize);
  return chunk;
}

export default Photos;
